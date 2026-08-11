import { TEXTOS_BIBLIA } from '../src/data/bibliaACF.js';

function limparTextoVersiculo(t) {
  if (!t) return '';
  return t.replace(/^["'«]/, '').replace(/["'»]$/, '').trim();
}

export function gerarAnaliseEspecifica(livroId, cap, num, rawText) {
  const tLower = rawText.toLowerCase();

  // Análise semântica por palavras do próprio versículo
  const palavras = rawText.split(/\s+/).filter(w => w.length > 3);
  const verboOuSubstantivoPrincipal = palavras[0] || 'esta passagem';
  const resumoTrecho = palavras.slice(0, 5).join(' ');

  let fatoEContexto = '';
  let conexaoHumana = '';
  let aplicacaoPratica = '';

  if (tLower.includes('no princípio') || tLower.includes('criou deus')) {
    fatoEContexto = `O relato de Gênesis ${cap}:${num} emprega o verbo *Bara* (בָּרָא) para afirmar a criação do nada por Deus (*ex nihilo*), rejeitando mitos babilônicos de guerras cósmicas.`;
    conexaoHumana = `Satisfaz o anseio humano por uma Origem soberana que confira propósito ao universo e afaste o desespero do nada.`;
    aplicacaoPratica = `Submeta os seus projetos diários à soberania de Deus antes de tomar qualquer decisão financeira ou profissional.`;
  } else if (tLower.includes('haja luz') || tLower.includes('houve luz') || tLower.includes('divisão entre a luz')) {
    fatoEContexto = `A ordem divina cria a luz e separa a claridade da escuridão no primeiro dia cosmogônico, estabelecendo a ordem sobre o caos primitivo.`;
    conexaoHumana = `Reflete a necessidade interior da alma por clareza moral e discernimento espiritual no meio de confusões e incertezas.`;
    aplicacaoPratica = `Busque a orientação da Palavra de Deus para trazer clareza a uma situação confusa que você enfrenta no momento.`;
  } else if (tLower.includes('imagem') || tLower.includes('semelhança') || tLower.includes('façamos o homem')) {
    fatoEContexto = `A declaração *Tselem Elohim* em Gênesis ${cap}:${num} atribui estatus de representante régio a todo ser humano, contra o elitismo antigo onde só o faraó era imagem divina.`;
    conexaoHumana = `Garante o valor inalienável de cada indivíduo e convoca à responsabilidade ética de cuidar do próximo e da criação.`;
    aplicacaoPratica = `Trate todas as pessoas com quem conviver hoje com elevado respeito, honrando a imagem de Deus em cada vida.`;
  } else if (tLower.includes('pó da terra') || tLower.includes('sopro de vida') || tLower.includes('fôlego')) {
    fatoEContexto = `A fusão do pó (*Apar*) com o sopro divino (*Neshama*) acentua a fragilidade biológica humana combinada com a habitação do Espírito.`;
    conexaoHumana = `Expõe a finitude da carne e a permanente dependência que a saúde e o vigor humano têm do sustento de Deus.`;
    aplicacaoPratica = `Mantenha a postura de humildade na sua rotina, reconhecendo que seu alento e capacidade vêm do Criador.`;
  } else if (tLower.includes('serpente') || tLower.includes('árvore') || tLower.includes('fruto') || tLower.includes('comeu')) {
    fatoEContexto = `Gênesis ${cap}:${num} registra o avanço do engano no Éden, onde a desobediência rompeu a aliança covenante pela busca de autonomia moral.`;
    conexaoHumana = `Ilustra a atração dos atalhos e a iludida promessa de ganhos imediatos que sufocam o discernimento espiritual.`;
    aplicacaoPratica = `Interrompa imediatamente a contemplação de uma proposta duvidosa ou atalho ético que tenha surgido nos seus pensamentos.`;
  } else if (tLower.includes('onde estás') || tLower.includes('escondi-me') || tLower.includes('nudez')) {
    fatoEContexto = `A convocação divina *Ayeka?* ("Onde estás?") chama o homem da clandestinidade para o confronto com sua nova condição de desobediência.`;
    conexaoHumana = `Revela a tendência de fugir, mentir e culpar outros quando o indivíduo se sente envergonhado por uma falha cometida.`;
    aplicacaoPratica = `Confesse seus erros com transparência em oração a Deus e busque reparar pendências com as pessoas afetadas.`;
  } else if (tLower.includes('sementes') || tLower.includes('calcanhar') || tLower.includes('cabeça')) {
    fatoEContexto = `O Protoevangelho de Gênesis ${cap}:${num} profetiza o combate histórico entre as trevas e a semente da mulher, que desferirá o golpe fatal no mal.`;
    conexaoHumana = `Nutre a esperança invencível de que as injustiças e a dor presente não têm a palavra final na história humana.`;
    aplicacaoPratica = `Enfrente os desafios do presente com coragem, firmado no triunfo definitivo de Cristo sobre todas as adversidades.`;
  } else if (tLower.includes('caim') || tLower.includes('abel') || tLower.includes('oferta') || tLower.includes('sangue')) {
    fatoEContexto = `O confronto entre as ofertas de Caim e Abel em Gênesis ${cap}:${num} expõe a aceitação divina vinculada à intenção sincera do coração do adorador.`;
    conexaoHumana = `Demonstra o risco de alimentar inveja e raiva represada até que a amargura se transforme em agressividade pública.`;
    aplicacaoPratica = `Perdoe de coração uma atitude de rivalidade e ore pela prosperidade da pessoa que você tendia a invejar.`;
  } else if (tLower.includes('noé') || tLower.includes('arca') || tLower.includes('dilúvio') || tLower.includes('águas')) {
    fatoEContexto = `A narrativa do Dilúvio em Gênesis ${cap}:${num} ressalta o juízo sobre a corrupção moral da terra e a preservação graciosa dos remanescentes na arca.`;
    conexaoHumana = `Ensina que a fidelidade a Deus oferece refúgio e segurança espiritual mesmo quando a sociedade ao redor caminha para o colapso.`;
    aplicacaoPratica = `Permaneça firme nos seus princípios éticos, mesmo se estiver isolado nas suas convicções morais no ambiente de trabalho.`;
  } else if (tLower.includes('abraão') || tLower.includes('abrão') || tLower.includes('sai da tua terra') || tLower.includes('promessa')) {
    fatoEContexto = `O chamado de Abrão em Gênesis ${cap}:${num} exige o desprendimento da segurança familiar na Mesopotâmia para caminhar sob a palavra da promessa.`;
    conexaoHumana = `Exige coragem existencial para abandonar zonas de acomodação e responder a uma vocação maior de fé e transformação.`;
    aplicacaoPratica = `Tome a decisão de abandonar um vício ou hábito confortável que esteja travando o seu amadurecimento espiritual.`;
  } else if (tLower.includes('isaque') || tLower.includes('moriá') || tLower.includes('sacrifício') || tLower.includes('carneiro')) {
    fatoEContexto = `O teste do Monte Moriá em Gênesis ${cap}:${num} verifica a lealdade de Abraão ao Doador da promessa acima da bênção de ter um herdeiro.`;
    conexaoHumana = `Confronta a inclinação de idolatrar conquistas ou pessoas amadas, colocando-as acima da fidelidade ao Criador.`;
    aplicacaoPratica = `Entregue o controle das coisas mais valiosas da sua vida a Deus, confiando na Sua provisão e cuidado diário.`;
  } else if (tLower.includes('jacó') || tLower.includes('esau') || tLower.includes('bênção') || tLower.includes('jaboque')) {
    fatoEContexto = `A trajetória de Jacó em Gênesis ${cap}:${num} marca a transição de um estrategista manipulador para um homem quebrantado no vau de Jaboque.`;
    conexaoHumana = `Retrata a dolorosa transformação do caráter quando a autoconfiança desmorona para dar lugar à dependência da graça.`;
    aplicacaoPratica = `Persevere em oração sincera até experimentar uma mudança genuína na sua postura e sentimentos.`;
  } else if (tLower.includes('josé') || tLower.includes('egito') || tLower.includes('sonho') || tLower.includes('túnica') || tLower.includes('irmãos')) {
    fatoEContexto = `A saga de José em Gênesis ${cap}:${num} demonstra a condução da providência divina que transforma traições familiares e prisões em salvação nacional.`;
    conexaoHumana = `Revela a virtude de um coração curado que recusa o sentimento de vingança e compreende os propósitos maiores de Deus nas provações.`;
    aplicacaoPratica = `Perdoe quem o feriu no passado, confiando que Deus é poderoso para converter dores em lições e vitórias para o seu futuro.`;
  } else {
    // Análise contextual rica baseada nos elementos específicos do próprio texto
    fatoEContexto = `Gênesis ${cap}:${num} registra a ação expressa em "${resumoTrecho}...", demonstrando o desenvolvimento factual da narrativa e a autoridade da providência divina sobre o acontecimento.`;
    conexaoHumana = `Expõe o comportamento humano diante de "${verboOuSubstantivoPrincipal}", refletindo as hesitações, escolhas e dilemas éticos enfrentados pelas pessoas naquela conjuntura.`;
    aplicacaoPratica = `Diante da situação relatada em Gênesis ${cap}:${num}, faça uma pausa hoje e tome uma decisão acionável para alinhar sua conduta à vontade de Deus.`;
  }

  return {
    fatoEContexto,
    conexaoHumana,
    aplicacaoPratica
  };
}
