const fs = require('fs');

const distPath = 'G:/Meu Drive/Projetos/Leitura Biblia/dist/index.html';
let content = fs.readFileSync(distPath, 'utf8');

const oldMainContainer = `i.jsxs("div",{class:"md:pl-64 transition-all",children:[e==="home"&&i.jsx(Iv,{}),e==="reader"&&i.jsx(Qv,{}),e==="plans"&&i.jsx(Vv,{}),e==="profile"&&i.jsx(Lv,{})]})`;

const newMobileFooterJS = `i.jsxs("footer",{style:{padding:"24px 16px",borderTop:"1px solid #E4E4E7",marginTop:"32px",display:"flex",flexDirection:"column",gap:"6px",textAlign:"center",marginBottom:"72px"},class:"md:hidden border-t border-[#E4E4E7] dark:border-[#27272A]",children:[i.jsx("span",{style:{fontFamily:"'Cinzel', serif",color:"#7A151C",fontSize:"15px",fontWeight:"bold",textTransform:"uppercase"},class:"dark:text-[#EAE6DF]",children:"Solus Christus"}),i.jsx("span",{style:{fontFamily:"'Inter', sans-serif",color:"#52525B",fontSize:"11px",fontStyle:"italic",lineHeight:"1.4"},class:"dark:text-[#A1A1AA]",children:"“Cristo no centro. A Palavra como fundamento. A fé como caminho.”"}),i.jsx("span",{style:{fontFamily:"'Inter', sans-serif",color:"#A1A1AA",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.5px",marginTop:"4px"},class:"dark:text-[#71717A]",children:"Paulo Vitor Ribeiro de Sousa"})]})`;

const newMainContainer = `i.jsxs("div",{class:"md:pl-64 transition-all min-h-[calc(100vh-64px)] flex flex-col justify-between",children:[i.jsxs("div",{children:[e==="home"&&i.jsx(Iv,{}),e==="reader"&&i.jsx(Qv,{}),e==="plans"&&i.jsx(Vv,{}),e==="profile"&&i.jsx(Lv,{})]}),${newMobileFooterJS}]})`;

console.log('Existe container principal antigo?', content.includes(oldMainContainer));
if (content.includes(oldMainContainer)) {
  content = content.replace(oldMainContainer, newMainContainer);
  fs.writeFileSync(distPath, content, 'utf8');
  console.log('Rodape mobile adicionado com SUCESSO ao dist/index.html!');
} else {
  console.log('Container principal antigo ja foi modificado.');
}
