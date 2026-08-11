import { getComentarioCapitulo } from '../data/comentariosEstudo';

export const geminiService = {
  getApiKey() {
    return localStorage.getItem('solus_gemini_api_key') || '';
  },

  saveApiKey(key) {
    const cleaned = (key || '').replace(/[\s\r\n"']/g, '').trim();
    localStorage.setItem('solus_gemini_api_key', cleaned);
    return cleaned;
  },

  async testarApiKey(key) {
    const cleanedKey = (key || '').replace(/[\s\r\n"']/g, '').trim();
    if (!cleanedKey) return { ok: false, error: 'Por favor, digite uma chave de API.' };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanedKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Responda "OK"' }] }]
        })
      });

      if (response.ok) {
        return { ok: true };
      } else {
        const data = await response.json().catch(() => ({}));
        return { ok: false, error: data.error?.message || `Erro HTTP ${response.status}` };
      }
    } catch (err) {
      return { ok: false, error: err.message || 'Erro de conexão de rede ou bloqueio CORS.' };
    }
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
      // Testar endpoints oficiais do Gemini
      const endpoints = [
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`
      ];

      for (const url of endpoints) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          });

          if (response.ok) {
            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
              const modelMatch = url.match(/models\/([^:]+)/);
              const modelUsed = modelMatch ? modelMatch[1] : 'gemini-flash';
              return { text: textResponse, source: 'gemini_api', modelUsed };
            }
          } else {
            const errData = await response.json().catch(() => ({}));
            apiErrorMessage = errData.error?.message || `Erro HTTP ${response.status} na API Gemini`;
            console.warn(`Erro no endpoint ${url}:`, errData);
          }
        } catch (err) {
          apiErrorMessage = err.message || 'Erro de conexão com o servidor do Gemini';
          console.warn(`Erro ao conectar no endpoint ${url}:`, err);
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
