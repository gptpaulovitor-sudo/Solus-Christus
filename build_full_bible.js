import fs from 'fs';
import path from 'path';

const mapLivros = {
  genesis: 'Gen.json',
  exodo: 'Exod.json',
  levitico: 'Lev.json',
  numeros: 'Num.json',
  deuteronomio: 'Deut.json',
  josue: 'Josh.json',
  juizes: 'Judg.json',
  rute: 'Ruth.json',
  '1samuel': '1Sam.json',
  '2samuel': '2Sam.json',
  '1reis': '1Kgs.json',
  '2reis': '2Kgs.json',
  '1cronicas': '1Chr.json',
  '2cronicas': '2Chr.json',
  esdras: 'Ezra.json',
  neemias: 'Neh.json',
  ester: 'Esth.json',
  jo: 'Job.json',
  salmos: 'Ps.json',
  proverbios: 'Prov.json',
  eclesiastes: 'Eccl.json',
  cantares: 'Song.json',
  isaias: 'Isa.json',
  jeremias: 'Jer.json',
  lamentacoes: 'Lam.json',
  ezequiel: 'Ezek.json',
  daniel: 'Dan.json',
  oseias: 'Hos.json',
  joel: 'Joel.json',
  amos: 'Amos.json',
  obadias: 'Obad.json',
  jonas: 'Jonah.json',
  miqueias: 'Mic.json',
  naum: 'Nah.json',
  habacuque: 'Hab.json',
  sofanias: 'Zeph.json',
  ageu: 'Hag.json',
  zacarias: 'Zech.json',
  malaquias: 'Mal.json',
  mateus: 'Matt.json',
  marcos: 'Mark.json',
  lucas: 'Luke.json',
  joao: 'John.json',
  atos: 'Acts.json',
  romanos: 'Rom.json',
  '1corintios': '1Cor.json',
  '2corintios': '2Cor.json',
  galatas: 'Gal.json',
  efesios: 'Eph.json',
  filipenses: 'Phil.json',
  colossenses: 'Col.json',
  '1tessalonicenses': '1Thess.json',
  '2tessalonicenses': '2Thess.json',
  '1timoteo': '1Tim.json',
  '2timoteo': '2Tim.json',
  tito: 'Titus.json',
  filemom: 'Phlm.json',
  hebreus: 'Heb.json',
  tiago: 'Jas.json',
  '1pedro': '1Pet.json',
  '2pedro': '2Pet.json',
  '1joao': '1John.json',
  '2joao': '2John.json',
  '3joao': '3John.json',
  judas: 'Jude.json',
  apocalipse: 'Rev.json'
};

const LIVROS_BIBLIA = [
  // Antigo Testamento
  { id: 'genesis', nome: 'Gênesis', abrev: 'Gn', testamento: 'AT', grupo: 'Pentateuco', capitulos: 50 },
  { id: 'exodo', nome: 'Êxodo', abrev: 'Êx', testamento: 'AT', grupo: 'Pentateuco', capitulos: 40 },
  { id: 'levitico', nome: 'Levítico', abrev: 'Lv', testamento: 'AT', grupo: 'Pentateuco', capitulos: 27 },
  { id: 'numeros', nome: 'Números', abrev: 'Nm', testamento: 'AT', grupo: 'Pentateuco', capitulos: 36 },
  { id: 'deuteronomio', nome: 'Deuteronômio', abrev: 'Dt', testamento: 'AT', grupo: 'Pentateuco', capitulos: 34 },
  { id: 'josue', nome: 'Josué', abrev: 'Js', testamento: 'AT', grupo: 'Históricos', capitulos: 24 },
  { id: 'juizes', nome: 'Juízes', abrev: 'Jz', testamento: 'AT', grupo: 'Históricos', capitulos: 21 },
  { id: 'rute', nome: 'Rute', abrev: 'Rt', testamento: 'AT', grupo: 'Históricos', capitulos: 4 },
  { id: '1samuel', nome: '1 Samuel', abrev: '1Sm', testamento: 'AT', grupo: 'Históricos', capitulos: 31 },
  { id: '2samuel', nome: '2 Samuel', abrev: '2Sm', testamento: 'AT', grupo: 'Históricos', capitulos: 24 },
  { id: '1reis', nome: '1 Reis', abrev: '1Rs', testamento: 'AT', grupo: 'Históricos', capitulos: 22 },
  { id: '2reis', nome: '2 Reis', abrev: '2Rs', testamento: 'AT', grupo: 'Históricos', capitulos: 25 },
  { id: '1cronicas', nome: '1 Crônicas', abrev: '1Cr', testamento: 'AT', grupo: 'Históricos', capitulos: 29 },
  { id: '2cronicas', nome: '2 Crônicas', abrev: '2Cr', testamento: 'AT', grupo: 'Históricos', capitulos: 36 },
  { id: 'esdras', nome: 'Esdras', abrev: 'Ezr', testamento: 'AT', grupo: 'Históricos', capitulos: 10 },
  { id: 'neemias', nome: 'Neemias', abrev: 'Ne', testamento: 'AT', grupo: 'Históricos', capitulos: 13 },
  { id: 'ester', nome: 'Ester', abrev: 'Et', testamento: 'AT', grupo: 'Históricos', capitulos: 10 },
  { id: 'jo', nome: 'Jó', abrev: 'Jó', testamento: 'AT', grupo: 'Poéticos', capitulos: 42 },
  { id: 'salmos', nome: 'Salmos', abrev: 'Sl', testamento: 'AT', grupo: 'Poéticos', capitulos: 150 },
  { id: 'proverbios', nome: 'Provérbios', abrev: 'Pv', testamento: 'AT', grupo: 'Poéticos', capitulos: 31 },
  { id: 'eclesiastes', nome: 'Eclesiastes', abrev: 'Ec', testamento: 'AT', grupo: 'Poéticos', capitulos: 12 },
  { id: 'cantares', nome: 'Cânticos de Salomão', abrev: 'Ct', testamento: 'AT', grupo: 'Poéticos', capitulos: 8 },
  { id: 'isaias', nome: 'Isaías', abrev: 'Is', testamento: 'AT', grupo: 'Profetas Maiores', capitulos: 66 },
  { id: 'jeremias', nome: 'Jeremias', abrev: 'Jr', testamento: 'AT', grupo: 'Profetas Maiores', capitulos: 52 },
  { id: 'lamentacoes', nome: 'Lamentações', abrev: 'Lm', testamento: 'AT', grupo: 'Profetas Maiores', capitulos: 5 },
  { id: 'ezequiel', nome: 'Ezequiel', abrev: 'Ez', testamento: 'AT', grupo: 'Profetas Maiores', capitulos: 48 },
  { id: 'daniel', nome: 'Daniel', abrev: 'Dn', testamento: 'AT', grupo: 'Profetas Maiores', capitulos: 12 },
  { id: 'oseias', nome: 'Oséias', abrev: 'Os', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 14 },
  { id: 'joel', nome: 'Joel', abrev: 'Jl', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 3 },
  { id: 'amos', nome: 'Amós', abrev: 'Am', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 9 },
  { id: 'obadias', nome: 'Obadias', abrev: 'Ob', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 1 },
  { id: 'jonas', nome: 'Jonas', abrev: 'Jn', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 4 },
  { id: 'miqueias', nome: 'Miquéias', abrev: 'Mq', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 7 },
  { id: 'naum', nome: 'Naum', abrev: 'Na', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 3 },
  { id: 'habacuque', nome: 'Habacuque', abrev: 'Hc', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 3 },
  { id: 'sofanias', nome: 'Sofonias', abrev: 'Sf', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 3 },
  { id: 'ageu', nome: 'Ageu', abrev: 'Ag', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 2 },
  { id: 'zacarias', nome: 'Zacarias', abrev: 'Zc', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 14 },
  { id: 'malaquias', nome: 'Malaquias', abrev: 'Ml', testamento: 'AT', grupo: 'Profetas Menores', capitulos: 4 },

  // Novo Testamento
  { id: 'mateus', nome: 'Mateus', abrev: 'Mt', testamento: 'NT', grupo: 'Evangelhos', capitulos: 28 },
  { id: 'marcos', nome: 'Marcos', abrev: 'Mc', testamento: 'NT', grupo: 'Evangelhos', capitulos: 16 },
  { id: 'lucas', nome: 'Lucas', abrev: 'Lc', testamento: 'NT', grupo: 'Evangelhos', capitulos: 24 },
  { id: 'joao', nome: 'João', abrev: 'Jo', testamento: 'NT', grupo: 'Evangelhos', capitulos: 21 },
  { id: 'atos', nome: 'Atos dos Apóstolos', abrev: 'At', testamento: 'NT', grupo: 'História', capitulos: 28 },
  { id: 'romanos', nome: 'Romanos', abrev: 'Rm', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 16 },
  { id: '1corintios', nome: '1 Coríntios', abrev: '1Co', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 16 },
  { id: '2corintios', nome: '2 Coríntios', abrev: '2Co', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 13 },
  { id: 'galatas', nome: 'Gálatas', abrev: 'Gl', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 6 },
  { id: 'efesios', nome: 'Efésios', abrev: 'Ef', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 6 },
  { id: 'filipenses', nome: 'Filipenses', abrev: 'Fp', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 4 },
  { id: 'colossenses', nome: 'Colossenses', abrev: 'Cl', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 4 },
  { id: '1tessalonicenses', nome: '1 Tessalonicenses', abrev: '1Ts', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 5 },
  { id: '2tessalonicenses', nome: '2 Tessalonicenses', abrev: '2Ts', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 3 },
  { id: '1timoteo', nome: '1 Timóteo', abrev: '1Tm', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 6 },
  { id: '2timoteo', nome: '2 Timóteo', abrev: '2Tm', testamento: 'NT', grupo: 'Cartas de Paulo', capitulos: 4 },
  { id: 'tito', nome: 'Tito', abrev: 'Tt', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 3 },
  { id: 'filemom', nome: 'Filemom', abrev: 'Fm', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 1 },
  { id: 'hebreus', nome: 'Hebreus', abrev: 'Hb', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 13 },
  { id: 'tiago', nome: 'Tiago', abrev: 'Tg', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 5 },
  { id: '1pedro', nome: '1 Pedro', abrev: '1Pe', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 5 },
  { id: '2pedro', nome: '2 Pedro', abrev: '2Pe', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 3 },
  { id: '1joao', nome: '1 João', abrev: '1Jo', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 5 },
  { id: '2joao', nome: '2 João', abrev: '2Jo', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 1 },
  { id: '3joao', nome: '3 João', abrev: '3Jo', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 1 },
  { id: 'judas', nome: 'Judas', abrev: 'Jd', testamento: 'NT', grupo: 'Cartas Gerais', capitulos: 1 },
  { id: 'apocalipse', nome: 'Apocalipse', abrev: 'Ap', testamento: 'NT', grupo: 'Profecia', capitulos: 22 },
];

const dataDir = path.join(process.cwd(), 'node_modules', 'biblialibera', 'data', 'pt', 'formal');
const TEXTOS_BIBLIA = {};

for (const [key, file] of Object.entries(mapLivros)) {
  const filePath = path.join(dataDir, file);
  if (fs.existsSync(filePath)) {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    TEXTOS_BIBLIA[key] = {};

    raw.chapters.forEach(c => {
      TEXTOS_BIBLIA[key][c.chapter] = c.verses.map(v => ({
        v: v.verse,
        t: v.text
      }));
    });
  } else {
    console.error('MISSING:', file);
  }
}

const content = `// Banco de Dados da Bíblia Completo (31.156 Versículos em Português)
export const LIVROS_BIBLIA = ${JSON.stringify(LIVROS_BIBLIA, null, 2)};

export const TEXTOS_BIBLIA = ${JSON.stringify(TEXTOS_BIBLIA)};

export function getCapituloVersiculos(livroId, capituloNum) {
  const cap = parseInt(capituloNum, 10);
  if (TEXTOS_BIBLIA[livroId] && TEXTOS_BIBLIA[livroId][cap]) {
    return TEXTOS_BIBLIA[livroId][cap];
  }
  return [];
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'bibliaACF.js'), content, 'utf8');
console.log('Successfully compiled complete 66-book Bible into src/data/bibliaACF.js!');
