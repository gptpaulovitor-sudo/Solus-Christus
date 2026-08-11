import { TEXTOS_BIBLIA, LIVROS_BIBLIA } from '../src/data/bibliaACF.js';

function limparTextoVersiculo(t) {
  if (!t) return '';
  return t.replace(/^["'«]/, '').replace(/["'»]$/, '').trim();
}

export function analisarJuizes20() {
  const versiculos = TEXTOS_BIBLIA['juizes']?.[20] || [];
  
  console.log('=== JUÍZES 20:1-5 TEST ANALYSIS ===\n');

  for (let i = 0; i < 5; i++) {
    const item = versiculos[i];
    console.log(`Versículo ${item.v}: ${item.t}`);
  }
}

analisarJuizes20();
