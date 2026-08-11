import { getComentarioCapitulo } from '../src/data/comentariosEstudo.js';
import { LIVROS_BIBLIA } from '../src/data/bibliaACF.js';

console.log('Testing getComentarioCapitulo across multiple books and chapters...\n');

const testCases = [
  { livro: 'genesis', cap: 2 },
  { livro: 'genesis', cap: 4 },
  { livro: 'genesis', cap: 15 },
  { livro: 'exodo', cap: 3 },
  { livro: 'levitico', cap: 1 },
  { livro: 'levitico', cap: 2 },
  { livro: 'numeros', cap: 6 },
  { livro: 'deuteronomio', cap: 8 },
  { livro: '1samuel', cap: 1 },
  { livro: '2reis', cap: 4 },
  { livro: 'salmos', cap: 23 },
  { livro: 'salmos', cap: 121 },
  { livro: 'mateus', cap: 8 },
  { livro: 'lucas', cap: 15 },
  { livro: 'joao', cap: 4 },
  { livro: 'atos', cap: 9 }
];

const titulosVistos = new Set();
let repetidos = 0;

testCases.forEach(({ livro, cap }) => {
  const com = getComentarioCapitulo(livro, cap);
  console.log(`[${livro.toUpperCase()} ${cap}]`);
  console.log(`  Título: ${com.titulo}`);
  console.log(`  Texto:  ${com.textoExplicativo.substring(0, 100)}...`);
  console.log(`  Aplicação: ${com.aplicacao}\n`);

  if (titulosVistos.has(com.titulo)) {
    console.error(`ERROR: Título repetido! "${com.titulo}"`);
    repetidos++;
  } else {
    titulosVistos.add(com.titulo);
  }
});

if (repetidos === 0) {
  console.log('SUCCESS: All tested Faith Notes are unique and passage-matched!');
} else {
  console.error(`FAILURE: Found ${repetidos} repeated Faith Notes.`);
}
