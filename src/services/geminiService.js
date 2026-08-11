import { getComentarioCapitulo } from '../data/comentariosEstudo';

export const geminiService = {
  getApiKey() {
    return localStorage.getItem('solus_gemini_api_key') || '';
  },

  saveApiKey(key) {
    localStorage.setItem('solus_gemini_api_key', (key || '').trim());
  },

  async explicarVersiculo({ livroNome, capitulo, versiculo, texto }) {
    const apiKey = this.getApiKey();

    const prompt = `Atue como um teólogo exegético e pastor cristão reformado. Analise o seguinte versículo bíblico (${livroNome} ${capitulo}:${versiculo}):
"${texto}"

Por favor, forneça uma explicação profunda e específica para este versículo dividida estritamente nas seguintes 3 seções formatadas com markdown:

### 1. 🧠 Contexto & Lógica do Texto
Explique a lógica textual específica de "${texto}", o contexto de ${livroNome} ${capitulo} e o pensamento do autor.

### 2. ✝️ Conexão Teológica (Cristo no Centro)
Explique como esta passagem específica (${livroNome} ${capitulo}:${versiculo}) se conecta com a pessoa, a obra e o evangelho de Jesus Cristo (Solus Christus).

### 3. 🛡️ Aplicação Prática para a Vida Diária
Forneça 3 passos/reflexões extremamente práticos e específicos para aplicar este ensino hoje.`;

    if (apiKey) {
      // Testar modelos em ordem
      const models = ['gemini-1.5-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-pro'];

      for (const model of models) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
              })
            }
          );

          if (response.ok) {
            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
              return { text: textResponse, source: 'gemini_api', modelUsed: model };
            }
          } else {
            const errJson = await response.json().catch(() => ({}));
            console.warn(`Gemini API (${model}) status ${response.status}:`, errJson);
          }
        } catch (err) {
          console.warn(`Erro de conexão com Gemini API (${model}):`, err);
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
      source: apiKey ? 'api_error_fallback' : 'local' 
    };
  }
};
