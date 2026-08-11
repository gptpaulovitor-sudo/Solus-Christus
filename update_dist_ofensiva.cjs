const fs = require('fs');

const distPath = 'G:/Meu Drive/Projetos/Leitura Biblia/dist/index.html';
let content = fs.readFileSync(distPath, 'utf8');

const oldDestructuring = `const{posicao:e,toggleCapituloLido:a,planoAtivo:o,setActiveTab:s,irParaCapitulo:r,progressoCapitulos:t,versiculosMarcados:d}=Me();`;
const newDestructuring = `const{posicao:e,toggleCapituloLido:a,planoAtivo:o,setActiveTab:s,irParaCapitulo:r,progressoCapitulos:t,versiculosMarcados:d,ofensivaDias:y}=Me();`;

const oldOfensivaDiv = `i.jsx("div",{class:"text-sm font-extrabold text-[#232323] dark:text-[#EAE6DF]",children:"7 Dias Seguidos"})`;
const newOfensivaDiv = `i.jsxs("div",{class:"text-sm font-extrabold text-[#232323] dark:text-[#EAE6DF]",children:[y," ",y===1?"Dia Seguido":"Dias Seguidos"]})`;

console.log('Destructuring antigo existe?', content.includes(oldDestructuring));
console.log('Ofensiva Div antiga existe?', content.includes(oldOfensivaDiv));

if (content.includes(oldDestructuring) && content.includes(oldOfensivaDiv)) {
  content = content.replace(oldDestructuring, newDestructuring);
  content = content.replace(oldOfensivaDiv, newOfensivaDiv);
  fs.writeFileSync(distPath, content, 'utf8');
  console.log('Ofensiva dinamica injetada com SUCESSO no dist/index.html!');
} else {
  console.log('Nao foi possivel encontrar os alvos para substituicao no dist/index.html');
}
