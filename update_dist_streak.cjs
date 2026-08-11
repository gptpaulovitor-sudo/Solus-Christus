const fs = require('fs');

const distPath = 'G:/Meu Drive/Projetos/Leitura Biblia/dist/index.html';
let content = fs.readFileSync(distPath, 'utf8');

// Onde estava a string estatica 7 Dias Seguidos
const oldStreakStr = `i.jsx("div",{class:"text-sm font-extrabold text-[#232323] dark:text-[#EAE6DF]",children:"7 Dias Seguidos"})`;

// No bundle minificado, ofensivaDias pode ser interpolado
// Vamos verificar o contexto da renderizacao do Dashboard no dist
const idx = content.indexOf(oldStreakStr);
console.log('Target encontrado?', idx !== -1);

if (idx !== -1) {
  // Vamos ver o componente no bundle
  const startComp = Math.max(0, idx - 1500);
  const snippet = content.substring(startComp, idx + 200);
  console.log('Snippet de contexto:', snippet.slice(0, 300));
}
