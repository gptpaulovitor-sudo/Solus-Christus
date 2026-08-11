const fs = require('fs');
const file = 'G:/Meu Drive/Projetos/Leitura Biblia/dist/index.html';

// Ler como buffer para não ter problemas de encoding com arquivo grande
const content = fs.readFileSync(file, 'utf8');

// Verificar final do arquivo
const last200 = content.slice(-200);
console.log('--- FINAL DO ARQUIVO ---');
console.log(last200);
console.log('------------------------');

// Verificar se ja tem serviceWorker no final
const swCount = (content.match(/serviceWorker/g) || []).length;
console.log('Ocorrencias de serviceWorker:', swCount);

// O arquivo termina com:  </script>\n  </body>\n</html>\n
// Vamos substituir APENAS essa sequencia especifica no final
const swScript = `<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js')
        .then(function(r) { console.log('Solus Christus SW ok:', r.scope); })
        .catch(function(e) { console.log('SW erro:', e); });
    });
  }
</script>\n  </body>\n</html>`;

// Substituir apenas a terminacao do arquivo (ultimos 30 chars antes do </body></html>)
const endMarker = '  </body>\n</html>';
const endMarkerCRLF = '  </body>\r\n</html>';

let newContent;
if (content.endsWith(endMarker + '\n')) {
  newContent = content.slice(0, content.lastIndexOf(endMarker)) + swScript + '\n';
} else if (content.includes(endMarkerCRLF)) {
  const idx = content.lastIndexOf(endMarkerCRLF);
  newContent = content.slice(0, idx) + swScript + '\r\n';
} else {
  // fallback: find last </body>
  const idx = content.lastIndexOf('</body>');
  newContent = content.slice(0, idx) + '\n<script>\n  if (\'serviceWorker\' in navigator) {\n    window.addEventListener(\'load\', function() {\n      navigator.serviceWorker.register(\'./sw.js\');\n    });\n  }\n</script>\n</body></html>';
}

fs.writeFileSync(file, newContent, 'utf8');

const finalSize = fs.statSync(file).size;
console.log('Tamanho final:', finalSize, 'bytes');
console.log('Final do arquivo:');
console.log(newContent.slice(-300));
