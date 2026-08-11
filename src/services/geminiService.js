import { getComentarioCapitulo } from '../data/comentariosEstudo';

// Helper de fetch com Timeout rigoroso de 3.5 segundos
const fetchWithTimeout = async (url, options = {}, timeoutMs = 3500) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export const geminiService = {
  getApiKey() {
    return localStorage.getItem('solus_gemini_api_key') || '';
  },

  saveApiKey(key) {
    const cleaned = (key || '').replace(/[\s\r\n"']/g, '').trim();
    localStorage.setItem('solus_gemini_api_key', cleaned);
    return cleaned;
  },

  async obterModelosCompativeis(apiKey) {
    if (!apiKey) return [];
    try {
      const response = await fetchWithTimeout(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {}, 2500);
      if (!response.ok) return [];
      const data = await response.json();
      if (Array.isArray(data.models)) {
        return data.models
          .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
          .map(m => m.name.replace('models/', ''));
      }
    } catch (err) {
      console.warn('Erro ao listar modelos do Gemini:', err);
    }
    return [];
  },

  async testarApiKey(key) {
    const cleanedKey = (key || '').replace(/[\s\r\n"']/g, '').trim();
    if (!cleanedKey) return { ok: false, error: 'Por favor, digite uma chave de API.' };

    let modelos = await this.obterModelosCompativeis(cleanedKey);
    if (modelos.length === 0) {
      modelos = ['gemini-2.0-flash', 'gemini-1.5-flash-8b', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.5-flash', 'gemini-pro'];
    }

    let ultimoErro = null;

    for (const model of modelos) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanedKey}`;
      try {
        const response = await fetchWithTimeout(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: 'Responda OK' }] }] })
        }, 3000);

        if (response.ok) {
          return { ok: true, modelUsed: model };
        } else {
          const data = await response.json().catch(() => ({}));
          ultimoErro = data.error?.message || `Erro HTTP ${response.status} no modelo ${model}`;
        }
      } catch (err) {
        ultimoErro = err.name === 'AbortError' ? 'Tempo de conexão esgotado (timeout).' : (err.message || 'Erro de conexão.');
      }
    }

    return { ok: false, error: ultimoErro || 'Sua chave de API foi recusada pelo Google Gemini.' };
  },

  async explicarVersiculo({ livroNome, capitulo, versiculo, texto }) {
    const rawKey = this.getApiKey();
    const apiKey = rawKey.replace(/[\s\r\n"']/g, '').trim();

    const prompt = `Atue como um teólogo exegético e pastor cristão reformado. Analise o seguinte versículo bíblico (${livroNome} ${capitulo}:${versiculo}):
"${texto}"

Por favor, forneça uma explicação profunda e específica para este versículo dividida estritamente nas seguintes 3 seções formatadas com markdown:

### 1. 🧠 Contexto & Lógica do Texto
Explique a lógica textual específica de "${texto}", o contexto de ${livroNome} ${capitulo} e o pensamento do autor.

### 2. ✝️ Conexão Teológica (Cristo no Centro)
Explique como esta passagem específica (${livroNome} ${capitulo}:${versiculo}) se conecta com a pessoa, a obra e o evangelho de Jesus Cristo (Solus Christus).

### 3. 🛡️ Aplicação Prática para a Vida Diária
Forneça 3 passos/reflexões extremamente práticos e específicos para aplicar este ensino hoje.`;

    let apiErrorMessage = null;

    if (apiKey) {
      let modelos = await this.obterModelosCompativeis(apiKey);
      if (modelos.length === 0) {
        modelos = ['gemini-2.0-flash', 'gemini-1.5-flash-8b', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.5-flash', 'gemini-pro'];
      }

      for (const model of modelos) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        try {
          const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
          }, 3500);

          if (response.ok) {
            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
              return { text: textResponse, source: 'gemini_api', modelUsed: model };
            }
          } else {
            const errData = await response.json().catch(() => ({}));
            apiErrorMessage = errData.error?.message || `Erro HTTP ${response.status} em ${model}`;
          }
        } catch (err) {
          apiErrorMessage = err.name === 'AbortError' ? 'Tempo de resposta da API esgotado (timeout)' : (err.message || 'Erro de conexão');
        }
      }
    }

    // Fallback Local Dinâmico e Personalizado por Versículo
    const comentario = getComentarioCapitulo(livroNome.toLowerCase(), capitulo);
    const trechoResumido = texto.length > 70 ? texto.substring(0, 70) + '...' : texto;

    let explicacaoLocal = `### 1. 🧠 Contexto & Lógica do Texto
Em **${livroNome} ${capitulo}:${versiculo}**, a Palavra declara: *"${texto}"*. 
No desenvolvimento de ${livroNome} ${capitulo}, a estrutura lógica conduz o leitor a reconhecer como os eventos e ordenanças revelam a sabedoria e a soberania divina nas circunstâncias históricas.

### 2. ✝️ Conexão Teológica (Cristo no Centro)
Sob a verdade de *Solus Christus*, a mensagem de ${livroNome} ${capitulo}:${versiculo} aponta para a necessidade humana de redenção e a fidelidade da aliança de Deus. Todas as promessas, vitórias e leis das Escrituras encontram seu fundamento supremo na pessoa e obra consumada de Jesus Cristo na cruz.

### 3. 🛡️ Aplicação Prática para a Vida Diária
1. **Foco e Meditação:** Ao recordar *"${trechoResumido}"*, medite sobre a presença constante de Deus em suas lutas diárias.
2. **Alinhamento de Atitudes:** Avalie se suas decisões hoje em ${livroNome} refletem a integridade e a sabedoria deste ensino.
3. **Oração de Resposta:** Transforme o versículo ${versiculo} em motivo de oração, entregando suas preocupações a Cristo e pedindo direção divina.`;

    if (comentario && comentario.exegese) {
      explicacaoLocal += `\n\n> 📖 **Nota Exegética de ${livroNome} ${capitulo}:** ${comentario.exegese}`;
    }

    return { 
      text: explicacaoLocal, 
      source: apiKey ? 'api_error_fallback' : 'local',
      errorMessage: apiErrorMessage
    };
  }
};
