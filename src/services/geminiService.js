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

Por favor, forneça uma explicação dividida estritamente nas seguintes 3 seções formatadas com markdown:

### 1. 🧠 Contexto & Lógica do Texto
Explique a lógica textual, o contexto histórico-gramatical e o pensamento do autor.

### 2. ✝️ Conexão Teológica (Cristo no Centro)
Explique como este texto se conecta com a pessoa, a obra e o evangelho de Jesus Cristo (Solus Christus).

### 3. 🛡️ Aplicação Prática para a Vida Diária
Forneça 3 passos/reflexões extremamente práticos para aplicar este ensino hoje.`;

    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `Erro ${response.status} na API do Gemini`);
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          return { text: textResponse, source: 'gemini_api' };
        }
      } catch (err) {
        console.warn('Falha na requisição da API Gemini, utilizando motor local:', err);
      }
    }

    // Fallback Inteligente: Motor Exegético Local Estruturado
    const comentario = getComentarioCapitulo(livroNome.toLowerCase(), capitulo);
    
    let explicacaoLocal = `### 🧠 Contexto & Lógica do Texto
Em **${livroNome} ${capitulo}:${versiculo}**, o texto nos apresenta uma verdade fundamental da revelação bíblica. A estrutura lógica da passagem conduz o leitor a reconhecer a soberania da Palavra e a necessidade de alinhar o entendimento humano ao plano de Deus.

### ✝️ Conexão Teológica (Cristo no Centro)
Em *Solus Christus*, reconhecemos que toda a Escritura converge para Jesus Cristo. Este trecho antecipa e reflete o mistério da redenção, mostrando que a salvação, a justiça e a sabedoria residem exclusivamente na pessoa de Cristo.

### 🛡️ Aplicação Prática para a Vida Diária
1. **Meditação Diária:** Guarde a verdade de ${livroNome} ${capitulo}:${versiculo} em sua mente ao longo do dia para guiar suas decisões.
2. **Exame de Consciência:** Examine se suas atitudes e intenções diárias refletem a verdade ensinada nesta passagem.
3. **Oração de Resposta:** Transforme a mensagem deste texto em um motivo de oração, gratidão e pedido de transformação pessoal.`;

    if (comentario && comentario.exegese) {
      explicacaoLocal += `\n\n> 📖 **Nota Exegética Adicional:** ${comentario.exegese}`;
    }

    return { text: explicacaoLocal, source: apiKey ? 'fallback' : 'local' };
  }
};
