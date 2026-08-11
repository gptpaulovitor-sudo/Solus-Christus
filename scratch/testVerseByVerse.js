import { TEXTOS_BIBLIA, LIVROS_BIBLIA } from '../src/data/bibliaACF.js';

function limparTextoVersiculo(t) {
  if (!t) return '';
  return t.replace(/^["'«]/, '').replace(/["'»]$/, '').trim();
}

export function gerarEstudoVersiculoPorVersiculo(livroId, capituloNum) {
  const cap = parseInt(capituloNum, 10);
  const versiculos = TEXTOS_BIBLIA[livroId]?.[cap] || [];
  const livroObj = LIVROS_BIBLIA.find(l => l.id === livroId) || { nome: livroId };
  const livroNome = livroObj.nome;
  const totalV = versiculos.length;

  let autorEDestinatarios = '';
  let ideiaCentral = '';

  if (['genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio'].includes(livroId)) {
    autorEDestinatarios = `Escrito por Moisés para o povo de Israel durante a jornada do Êxodo e do deserto.`;
    ideiaCentral = `O capítulo ${cap} de ${livroNome} instrui o povo de Deus a viver em santidade, reconhecendo a soberania divina e o valor da aliança. Esta passagem nos lembra que a obediência aos mandamentos gera bênção e proteção para a vida da família.`;
  } else if (['mateus', 'marcos', 'lucas', 'joao'].includes(livroId)) {
    autorEDestinatarios = `Escrito pelo evangelista ${livroNome} para revelar Jesus Cristo aos discípulos e à igreja dos primeiros séculos.`;
    ideiaCentral = `Em ${livroNome} ${cap}, Jesus revela os mistérios e valores do Reino de Deus através de Seus ensinamentos e milagres. A passagem convida o leitor a confiar no poder redentor de Cristo e a praticar o amor verdadeiro no cotidiano.`;
  } else if (['atos', 'romanos', '1corintios', '2corintios', 'galatas', 'efesios', 'filipenses', 'colossenses', '1tessalonicenses', '2tessalonicenses', '1timoteo', '2timoteo', 'tito', 'filemon', 'hebreus', 'tiago', '1pedro', '2pedro', '1joao', '2joao', '3joao', 'judas'].includes(livroId)) {
    autorEDestinatarios = `Escrito pelos apóstolos para as igrejas cristãs do século I, fornecendo instrução espiritual e encorajamento pastoral.`;
    ideiaCentral = `Este capítulo de ${livroNome} apresenta doutrinas essenciais sobre a salvação, exortando a igreja a viver em unidade, retidão e maturidade. O ensinamento capacita o cristão a enfrentar provações com firmeza e fé consciente.`;
  } else if (livroId === 'salmos') {
    autorEDestinatarios = `Composto por salmistas fiéis (como Davi e os filhos de Corá) para o louvor litúrgico e a devoção do povo de Deus.`;
    ideiaCentral = `O Salmo ${cap} é um poema de profunda comunhão espiritual, onde o salmista expressa louvor, confiança e dependência do Senhor. A mensagem garante que Deus é o refúgio seguro em meio às dificuldades da existência humana.`;
  } else if (livroId === 'proverbios') {
    autorEDestinatarios = `Formulado por Salomão e sábios de Israel para orientar os jovens e o povo na conduta moral e prática.`;
    ideiaCentral = `Provérbios ${cap} fornece conselhos valiosos sobre autodomínio, honestidade e relacionamento com o próximo. O capítulo enfatiza que o temor ao Senhor é o princípio de toda a verdadeira sabedoria.`;
  } else {
    autorEDestinatarios = `Escrito pelos profetas e historiadores de Israel sob a inspiração do Espírito Santo para o povo de Deus.`;
    ideiaCentral = `No capítulo ${cap} de ${livroNome}, a Palavra registra a providência divina conduzindo os acontecimentos e cobrando fidelidade. A passagem reforça que Deus cumpre Suas promessas e convoca Seu povo ao arrependimento sincero.`;
  }

  // Análise detalhada dos primeiros 10 versículos (para evitar sobrecarga visual quando capítulos têm 50+ versículos)
  const limiteV = Math.min(totalV, 12);
  const analiseVersiculos = [];

  for (let i = 0; i < limiteV; i++) {
    const item = versiculos[i];
    const num = item.v;
    const txt = limparTextoVersiculo(item.t);
    const txtLower = txt.toLowerCase();

    let significado = '';
    let aplicacao = '';
    let pergunta = '';

    if (txtLower.includes('senhor') || txtLower.includes('deus') || txtLower.includes('pai')) {
      significado = `Afirma o caráter, a autoridade ou a soberania de Deus (Theos/Adonai) no governo das nossas vidas.`;
      aplicacao = `Submeta suas vontades ao controle de Deus hoje, reconhecendo a autoridade d'Ele em seus planos.`;
      pergunta = `Você tem entregado o governo das suas decisões a Deus ou tenta resolver tudo pela força própria?`;
    } else if (txtLower.includes('jesus') || txtLower.includes('cristo') || txtLower.includes('filho')) {
      significado = `Revela a pessoa e a obra redentora de Jesus Cristo (Christos), Nosso Salvador e Mestre.`;
      aplicacao = `Siga o exemplo prático de amor, humildade e compaixão demonstrado por Cristo em suas atitudes de hoje.`;
      pergunta = `Suas reações diante das pessoas refletem a mansidão e a verdade de Jesus?`;
    } else if (txtLower.includes('amor') || txtLower.includes('irmãos') || txtLower.includes('próximo')) {
      significado = `Destaca a virtude do amor (Agape) como a marca fundamental da vida espiritual cristã.`;
      aplicacao = `Demonstre uma ação concreta de bondade ou perdão a alguém do seu convívio hoje.`;
      pergunta = `Existe alguém a quem você precisa estender o perdão ou demonstrar maior compaixão?`;
    } else if (txtLower.includes('orou') || txtLower.includes('orai') || txtLower.includes('clamou') || txtLower.includes('pede')) {
      significado = `Instrui sobre a importância da oração (Proseuchē) constante e transparente com o Criador.`;
      aplicacao = `Separe um tempo reservado hoje para conversar com Deus em oração sincera de entrega.`;
      pergunta = `Como está a constância e a sinceridade da sua vida de oração secreta com Deus?`;
    } else if (txtLower.includes('sabedoria') || txtLower.includes('prudente') || txtLower.includes('entendimento')) {
      significado = `Ressalta a busca pela sabedoria bíblica (Hokhmah/Sophia) em oposição aos impulsos da insensatez.`;
      aplicacao = `Pondere suas palavras e atitudes antes de agir, buscando o bom senso e o autodomínio.`;
      pergunta = `Você costuma agir com sabedoria e paciência ou reage de forma impulsiva nos momentos de estresse?`;
    } else if (txtLower.includes('fé') || txtLower.includes('creu') || txtLower.includes('confia')) {
      significado = `Enfatiza a fé viva (Pistis), que é a convicção convicta na fidelidade da Palavra de Deus.`;
      aplicacao = `Confie no cuidado providencial de Deus mesmo quando as circunstâncias visíveis parecerem contrárias.`;
      pergunta = `Sua fé se mantém firme diante dos imprevistos ou oscila com as dificuldades diárias?`;
    } else {
      significado = `Apresenta o ensino sagrado sobre a retidão moral, a vigilância espiritual e a conduta perante o Senhor.`;
      aplicacao = `Pratique a verdade deste versículo em suas obrigações diárias com honestidade e empenho.`;
      pergunta = `Como você pode aplicar o princípio de integridade deste versículo no seu ambiente de trabalho ou lar?`;
    }

    analiseVersiculos.push({
      numero: num,
      texto: txt,
      significado,
      aplicacao,
      pergunta
    });
  }

  const v1Txt = limparTextoVersiculo(versiculos[0]?.t);

  return {
    id: `com_${livroId}_${cap}`,
    livroId,
    capitulo: cap,
    referencia: `${livroNome} ${cap}:1-${totalV}`,
    titulo: `Análise Versículo por Versículo — ${livroNome} ${cap}`,
    contextoGeral: {
      autorEDestinatarios,
      ideiaCentral
    },
    analiseVersiculos,
    conclusaoRapida: {
      oracaoCurta: `Senhor meu Deus, muito obrigado por revelar a Tua verdade através de ${livroNome} ${cap}. Dá-me sabedoria e força para colocar cada ensinamento em prática com integridade no meu dia a dia. Em Nome de Jesus, amém.`,
      fraseChave: `A Palavra de Deus meditada e praticada diariamente é o firme fundamento para a vitória da alma.`
    }
  };
}
