import { TEXTOS_BIBLIA, LIVROS_BIBLIA } from '../src/data/bibliaACF.js';

// Utilitário para limpar pontuações e formatar trechos bíblicos
function limparTextoVersiculo(t) {
  if (!t) return '';
  return t.replace(/^["'«]/, '').replace(/["'»]$/, '').trim();
}

// Analisador Inteligente de Conteúdo por Capítulo
export function interpretarCapituloCompleto(livroId, capituloNum) {
  const cap = parseInt(capituloNum, 10);
  const versiculos = TEXTOS_BIBLIA[livroId]?.[cap] || [];
  const livroObj = LIVROS_BIBLIA.find(l => l.id === livroId) || { nome: livroId };
  const livroNome = livroObj.nome;
  const totalV = versiculos.length;

  if (totalV === 0) {
    return {
      id: `com_${livroId}_${cap}`,
      livroId,
      capitulo: cap,
      referencia: `${livroNome} ${cap}`,
      titulo: `${livroNome} ${cap}: Meditação na Palavra Divina`,
      textoExplicativo: `No capítulo ${cap} de ${livroNome}, somos convidados a meditar nos ensinamentos das Sagradas Escrituras, buscando compreender os propósitos divinos para nossa edificação e fé diária.`,
      aplicacao: `Guarde no coração as lições espirituais de ${livroNome} ${cap} e viva em constante alinhamento com os preceitos de Deus.`
    };
  }

  // Amostragem de versículos ao longo do capítulo (início, meio e fim)
  const v1 = limparTextoVersiculo(versiculos[0]?.t);
  const idxMeio = Math.floor(totalV / 2);
  const vMid = limparTextoVersiculo(versiculos[idxMeio]?.t);
  const vEnd = limparTextoVersiculo(versiculos[totalV - 1]?.t);

  const textoCapitulo = versiculos.map(v => v.t).join(' ');
  const tLower = textoCapitulo.toLowerCase();

  // 1. GERAÇÃO DE TÍTULO INTERPRETATIVO ÚNICO
  let titulo = `${livroNome} ${cap}: `;

  if (tLower.includes('holocausto') || tLower.includes('oferta de manjares') || tLower.includes('sacrifício de comunhão') || tLower.includes('expiação')) {
    titulo += `As Leis dos Sacrifícios e a Purificação no Altar`;
  } else if (tLower.includes('genealogia') || tLower.includes('gerou') || (livroId === 'genesis' && [5, 10, 11, 36, 46].includes(cap))) {
    titulo += `A Linhagem das Gerações e o Propósito Divino na História`;
  } else if (tLower.includes('guerra') || tLower.includes('exército') || tLower.includes('espada') || tLower.includes('valentes')) {
    titulo += `As Batalhas do Povo e a Soberania de Deus no Combate`;
  } else if (tLower.includes('curou') || tLower.includes('leproso') || tLower.includes('paralítico') || tLower.includes('ressuscitou')) {
    titulo += `A Manifestação da Compaixão e o Poder Restaurador de Cristo`;
  } else if (tLower.includes('parábola') || tLower.includes('reino dos céus') || tLower.includes('semeador') || tLower.includes('bem-aventurados')) {
    titulo += `Os Ensinamentos do Reino e os Princípios da Vida Cristã`;
  } else if (tLower.includes('orou') || tLower.includes('clamou') || tLower.includes('súplica') || tLower.includes('voto')) {
    titulo += `O Clamor Sincero da Alma e a Resposta do Criador`;
  } else if (tLower.includes('sabedoria') || tLower.includes('prudente') || tLower.includes('provérbio')) {
    titulo += `Instruções de Sabedoria Prática e Discernimento Moral`;
  } else if (livroId === 'salmos') {
    titulo += `Louvor, Oração e Refúgio no Senhor`;
  } else {
    // Título derivado do tema do primeiro versículo
    const palavrasV1 = v1.split(' ').slice(0, 7).join(' ');
    titulo += `Meditação e Ensinamento em "${palavrasV1}..."`;
  }

  // 2. GERAÇÃO DE REFLEXÃO ESPIRITUAL (3 a 4 sentenças integrando início, meio e fim do capítulo)
  const resumoV1 = v1.length > 110 ? v1.substring(0, 107) + '...' : v1;
  const resumoMid = vMid.length > 100 ? vMid.substring(0, 97) + '...' : vMid;
  const resumoEnd = vEnd.length > 100 ? vEnd.substring(0, 97) + '...' : vEnd;

  let textoExplicativo = `No capítulo ${cap} de ${livroNome}, a leitura se inicia com a declaração: "${resumoV1}". `;

  if (totalV > 3 && vMid && vMid !== v1) {
    textoExplicativo += `No decorrer da passagem, a Escritura destaca: "${resumoMid}". `;
  }

  textoExplicativo += `Ao término do capítulo, o texto conclui afirmando: "${resumoEnd}". `;

  // Síntese teológica e interpretativa
  if (tLower.includes('altar') || tLower.includes('sacrifício') || tLower.includes('oferta')) {
    textoExplicativo += `A interpretação desta passagem nos ensina que a verdadeira adoração exige entrega sincera, reverência e consagração diária na presença de Deus.`;
  } else if (tLower.includes('genealogia') || tLower.includes('gerou')) {
    textoExplicativo += `Este registro demonstra que Deus cuida de cada família e conduz a história da humanidade com fidelidade de geração em geração.`;
  } else if (tLower.includes('curou') || tLower.includes('milagre') || tLower.includes('autoridade')) {
    textoExplicativo += `A manifestação da autoridade de Jesus aqui revelada confirma que a fé humilde alcança a resposta e a restauração divina.`;
  } else if (livroId === 'salmos') {
    textoExplicativo += `Este salmo expressa a confiança inabalável que a alma deve ter no Senhor como seu protetor e refúgio seguro em meio às tribulações.`;
  } else if (livroId === 'proverbios') {
    textoExplicativo += `Estes conselhos reforçam que o temor ao Senhor e a prudência nas palavras e atitudes são as bases para uma vida abençoada e edificante.`;
  } else {
    textoExplicativo += `Esta mensagem exorta o leitor a reconhecer a liderança divina em suas decisões diárias, mantendo a fidelidade à Palavra de Deus.`;
  }

  // 3. GERAÇÃO DE APLICAÇÃO PRÁTICA ÚNICA
  let aplicacao = '';

  if (tLower.includes('orou') || tLower.includes('clamou') || tLower.includes('voto')) {
    aplicacao = `Apresente suas causas a Deus com a oração sincera de ${livroNome} ${cap}, confiando que Ele ouve o clamor do coração humilde.`;
  } else if (tLower.includes('oferta') || tLower.includes('sacrifício') || tLower.includes('altar')) {
    aplicacao = `Examine suas motivações em ${livroNome} ${cap} e ofereça ao Senhor atitudes puras, honrando a Deus no seu cotidiano.`;
  } else if (tLower.includes('curou') || tLower.includes('milagre')) {
    aplicacao = `Aproxime-se de Cristo com a fé evidenciada em ${livroNome} ${cap} e confie no Seu poder restaurador para a sua vida.`;
  } else if (tLower.includes('sabedoria') || tLower.includes('prudente')) {
    aplicacao = `Use a sabedoria prática de ${livroNome} ${cap} para ponderar suas palavras e agir com bom senso nas suas relações.`;
  } else if (livroId === 'salmos') {
    aplicacao = `Faça da mensagem do Salmo ${cap} a sua oração de hoje, descansando na proteção e na fidelidade do Senhor.`;
  } else if (livroId === 'proverbios') {
    aplicacao = `Pratique a prudência bíblica de Provérbios ${cap} no seu trabalho e no seu lar, evitando decisões precipitadas.`;
  } else {
    aplicacao = `Reflita sobre os ensinamentos de ${livroNome} ${cap} e coloque em prática a obediência e o amor ao próximo nas escolhas de hoje.`;
  }

  return {
    id: `com_${livroId}_${cap}`,
    livroId,
    capitulo: cap,
    referencia: `${livroNome} ${cap}:1-${totalV}`,
    titulo,
    textoExplicativo,
    aplicacao
  };
}
