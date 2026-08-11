const fs = require('fs');

const distPath = 'G:/Meu Drive/Projetos/Leitura Biblia/dist/index.html';
let content = fs.readFileSync(distPath, 'utf8');

const svgEmblem = `i.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 100 100",width:"32",height:"32",class:"shrink-0 rounded-xl shadow-xs",children:[i.jsx("rect",{width:"100",height:"100",rx:"20",fill:"#7A151C"}),i.jsx("path",{d:"M 25 70 Q 50 85 50 60 Q 50 85 75 70 L 75 75 Q 50 90 50 65 Q 50 90 25 75 Z",fill:"#F9F7F1"}),i.jsx("rect",{x:"46",y:"25",width:"8",height:"40",rx:"2",fill:"#F9F7F1"}),i.jsx("rect",{x:"34",y:"38",width:"32",height:"8",rx:"2",fill:"#F9F7F1"})]})`;

// 1. Substituir o logo do topo (Header Logo)
const oldHeaderLogo = `i.jsx("div",{class:"w-9 h-9 rounded-xl bg-[#7A151C] dark:bg-[#8B1C24] flex items-center justify-center text-[#EAE6DF] shadow-md shrink-0",children:i.jsx(Ra,{class:"w-5 h-5 text-[#EAE6DF]"})}),i.jsx("span",{class:"hidden sm:inline tracking-wider font-bold",children:"Solus Christus"})`;
const newHeaderLogo = `${svgEmblem},i.jsx("span",{class:"tracking-wider font-bold text-xs sm:text-sm md:text-base",children:"SOLUS CHRISTUS"})`;

// 2. Substituir o logo do drawer mobile (Drawer Header Logo)
const oldDrawerLogo = `i.jsx("div",{class:"w-8 h-8 rounded-xl bg-[#7A151C] dark:bg-[#8B1C24] flex items-center justify-center text-[#EAE6DF] shadow-md",children:i.jsx(Ra,{class:"w-4 h-4 text-[#EAE6DF]"})}),i.jsx("span",{children:"Solus Christus"})`;
const newDrawerLogo = `${svgEmblem},i.jsx("span",{children:"SOLUS CHRISTUS"})`;

// 3. Substituir os blocos de rodapé (Sidebar & Drawer Footer)
const oldFooter = `i.jsxs("div",{class:"text-[11px] text-[#52525B] dark:text-[#A1A1AA] border-t border-[#E4E4E7] dark:border-[#27272A] pt-3 space-y-1",children:[i.jsx("p",{class:"font-cinzel font-bold text-[#7A151C] dark:text-[#8B1C24] uppercase tracking-wider text-xs",children:"SOLUS CHRISTUS"}),i.jsx("p",{class:"font-crimson italic text-[#232323] dark:text-[#EAE6DF] text-[11px] leading-snug",children:"“Cristo no centro. A Palavra como fundamento. A fé como caminho.”"}),i.jsxs("p",{class:"font-sans font-medium text-[10px] text-[#52525B] dark:text-[#A1A1AA] pt-0.5",children:["Por ",i.jsx("span",{class:"font-semibold text-[#232323] dark:text-[#EAE6DF]",children:"Paulo Vitor Ribeiro de Sousa"})]})]})`;

const oldFooterMobile = `i.jsxs("div",{class:"text-[11px] text-[#52525B] dark:text-[#A1A1AA] border-t border-[#E4E4E7] dark:border-[#27272A] pt-4 space-y-1",children:[i.jsx("p",{class:"font-cinzel font-bold text-[#7A151C] dark:text-[#8B1C24] uppercase tracking-wider text-xs",children:"SOLUS CHRISTUS"}),i.jsx("p",{class:"font-crimson italic text-[#232323] dark:text-[#EAE6DF] text-[11px] leading-snug",children:"“Cristo no centro. A Palavra como fundamento. A fé como caminho.”"}),i.jsxs("p",{class:"font-sans font-medium text-[10px] text-[#52525B] dark:text-[#A1A1AA] pt-0.5",children:["Por ",i.jsx("span",{class:"font-semibold text-[#232323] dark:text-[#EAE6DF]",children:"Paulo Vitor Ribeiro de Sousa"})]})]})`;

const newFooter = `i.jsxs("div",{style:{padding:"16px 0px",borderTop:"1px solid #E4E4E7",marginTop:"auto",display:"flex",flexDirection:"column",gap:"4px"},children:[i.jsx("span",{style:{fontFamily:"'Cinzel', serif",color:"#7A151C",fontSize:"15px",fontWeight:"bold",textTransform:"uppercase"},children:"Solus Christus"}),i.jsx("span",{style:{fontFamily:"'Inter', sans-serif",color:"#52525B",fontSize:"11px",fontStyle:"italic",lineHeight:"1.4"},children:"“Cristo no centro. A Palavra como fundamento. A fé como caminho.”"}),i.jsx("span",{style:{fontFamily:"'Inter', sans-serif",color:"#A1A1AA",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.5px",marginTop:"4px"},children:"Paulo Vitor Ribeiro de Sousa"})]})`;

console.log('Substituindo Header Logo...', content.includes(oldHeaderLogo));
content = content.replace(oldHeaderLogo, newHeaderLogo);

console.log('Substituindo Drawer Logo...', content.includes(oldDrawerLogo));
content = content.replace(oldDrawerLogo, newDrawerLogo);

console.log('Substituindo Sidebar Footer...', content.includes(oldFooter));
content = content.replace(oldFooter, newFooter);

console.log('Substituindo Mobile Footer...', content.includes(oldFooterMobile));
content = content.replace(oldFooterMobile, newFooter);

fs.writeFileSync(distPath, content, 'utf8');
console.log('Atualizacao de emblema e rodape no dist/index.html concluida com SUCESSO!');
