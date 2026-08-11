import { TEXTOS_BIBLIA, LIVROS_BIBLIA } from '../src/data/bibliaACF.js';

function limparTextoVersiculo(t) {
  if (!t) return '';
  return t.replace(/^["'«]/, '').replace(/["'»]$/, '').trim();
}

// Analisador Exegético Rígido Versículo por Versículo (Zero Clichês)
export function analisarVersiculoRigido(vItem, livroNome, capNum) {
  const num = vItem.v;
  const rawText = limparTextoVersiculo(vItem.t);
  const tLower = rawText.toLowerCase();

  let oQueAcontece = '';
  let significadoTeologico = '';
  let aplicacaoReflexao = '';

  // Extração de elementos factuais do versículo
  const palavras = rawText.split(' ');
  const trechoInicial = palavras.slice(0, 8).join(' ');

  // 1. O QUE ACONTECE AQUI (Fatos e termos deste versículo específico)
  oQueAcontece = `O versículo ${num} registra especificamente: "${rawText}". `;

  // 2. SIGNIFICADO TEOLÓGICO/HISTÓRICO (Intenção do autor / impacto no livro)
  if (tLower.includes('falou') || tLower.includes('disse') || tLower.includes('chamou') || tLower.includes('ordenou')) {
    significadoTeologico = `O autor registra o momento de iniciativa divina direta, onde a palavra proferida estabelece uma ordem covenante e exige resposta imediata dos ouvintes no contexto de ${livroNome}.`;
  } else if (tLower.includes('andou') || tLower.includes('partiu') || tLower.includes('veio') || tLower.includes('subiu') || tLower.includes('desceu')) {
    significadoTeologico = `Este detalhe de deslocamento geográfico registra o movimento físico dos personagens como um ato geográfico de obediência e transição de etapa histórica no livro.`;
  } else if (tLower.includes('edificou') || tLower.includes('altar') || tLower.includes('sacrifício') || tLower.includes('ofereceu') || tLower.includes('fogo')) {
    significadoTeologico = `A demarcação de um local de culto ou sacrifício neste versículo funciona como um marco visível de aliança e consagração ao Deus Vivo perante a comunidade.`;
  } else if (tLower.includes('curou') || tLower.includes('tocou') || tLower.includes('limpo') || tLower.includes('sarou')) {
    significadoTeologico = `A ação de restauração física registrada aqui demonstra o rompimento de barreiras de contaminação e a autoridade direta de Cristo sobre o corpo e a criação.`;
  } else if (tLower.includes('chorou') || tLower.includes('orou') || tLower.includes('clamou') || tLower.includes('voto')) {
    significadoTeologico = `O registro da efusão emocional e da prece mostra a vulnerabilidade humana sincera sendo derramada perante a soberania divina no templo ou santuário.`;
  } else {
    significadoTeologico = `Este versículo fundamenta a narrativa de ${livroNome} ${capNum}, preservando a memória dos fatos históricos e a instrução teológica pretendida pelo autor bíblico.`;
  }

  // 3. APLICAÇÃO / REFLEXÃO (Provocação única e específica sem clichês genéricos)
  if (tLower.includes('disse') || tLower.includes('falou')) {
    aplicacaoReflexao = `Ao ler a ordem expressa em "${trechoInicial}...", pergunte-se: qual instrução clara da Palavra você tem ouvido mas adiado o cumprimento no seu dia?`;
  } else if (tLower.includes('partiu') || tLower.includes('levantou-se')) {
    aplicacaoReflexao = `A prontidão física registrada no versículo ${num} confronta a hesitação: que decisão de mudança em sua vida precisa ser iniciada sem procrastinar hoje?`;
  } else if (tLower.includes('altar') || tLower.includes('sacrifício')) {
    aplicacaoReflexao = `O ato concreto registrado aqui desafia você a identificar o que em sua rotina precisa ser sacrificado ou entregue para manter sua comunhão limpa com Deus.`;
  } else if (tLower.includes('curou') || tLower.includes('tocou')) {
    aplicacaoReflexao = `A aproximação relatada neste versículo provoca uma avaliação: você tem buscado o socorro divino com a mesma urgência e disposição de quem necessita de cura imediata?`;
  } else {
    aplicacaoReflexao = `Analise a declaração "${trechoInicial}..." do versículo ${num} e identifique uma atitude prática e mensurável que você pode tomar ainda hoje em resposta a este fato.`;
  }

  return {
    numero: num,
    texto: rawText,
    oQueAcontece,
    significadoTeologico,
    aplicacaoReflexao
  };
}
