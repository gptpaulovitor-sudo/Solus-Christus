import { getComentarioCapitulo } from '../src/data/comentariosEstudo.js';

const testPassages = [
  ['genesis', 1],
  ['genesis', 2],
  ['genesis', 5],
  ['genesis', 6],
  ['genesis', 7],
  ['exodo', 3],
  ['levitico', 1],
  ['levitico', 2],
  ['levitico', 3],
  ['numeros', 6],
  ['deuteronomio', 8],
  ['1samuel', 1],
  ['salmos', 23],
  ['salmos', 91],
  ['salmos', 121],
  ['proverbios', 3],
  ['mateus', 5],
  ['mateus', 8],
  ['lucas', 15],
  ['joao', 4],
  ['romanos', 8],
  ['apocalipse', 22]
];

console.log('=== REAL PASSAGE INTERPRETER TEST (comentariosEstudo.js) ===\n');

for (const [livro, cap] of testPassages) {
  const res = getComentarioCapitulo(livro, cap);
  console.log(`📌 [${res.referencia.toUpperCase()}]`);
  console.log(`   🏷️  Título:    ${res.titulo}`);
  console.log(`   📖 Reflexão:  ${res.textoExplicativo}`);
  console.log(`   💡 Aplicação: ${res.aplicacao}\n`);
}
