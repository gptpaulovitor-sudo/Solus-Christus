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

console.log('--- TESTING DYNAMIC INTERPRETATION ENGINE ---\n');

const titles = new Set();
const texts = new Set();
const applications = new Set();

let duplicates = 0;

for (const [livro, cap] of testPassages) {
  const com = getComentarioCapitulo(livro, cap);
  console.log(`[${livro.toUpperCase()} ${cap}]`);
  console.log(`  Título:    ${com.titulo}`);
  console.log(`  Reflexão:  ${com.textoExplicativo.substring(0, 110)}...`);
  console.log(`  Aplicação: ${com.aplicacao}`);
  console.log('');

  if (titles.has(com.titulo)) {
    console.error(`DUPLICATE TITLE FOUND: ${com.titulo}`);
    duplicates++;
  }
  if (texts.has(com.textoExplicativo)) {
    console.error(`DUPLICATE TEXT FOUND: ${com.textoExplicativo}`);
    duplicates++;
  }
  if (applications.has(com.aplicacao)) {
    console.error(`DUPLICATE APPLICATION FOUND: ${com.aplicacao}`);
    duplicates++;
  }

  titles.add(com.titulo);
  texts.add(com.textoExplicativo);
  applications.add(com.aplicacao);
}

if (duplicates === 0) {
  console.log('SUCCESS: All 22 test passages generated 100% unique titles, reflections, and applications!');
} else {
  console.log(`FAILED: Found ${duplicates} duplicates.`);
}
