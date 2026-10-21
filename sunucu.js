// BMH231 Ödev 1 – Bölüm C3
// Yalnızca Node.js'in http modülü ve dayjs paketi kullanılmıştır (Express yok).

const http = require('http');

const PORT = 3000;

// Yanıt göndermeyi tek yerde topluyoruz: durum kodu, Content-Type ve gövde.
function gonder(res, durumKodu, icerikTuru, govde, ekBasliklar = {}) {
  res.writeHead(durumKodu, {
    'Content-Type': `${icerikTuru}; charset=utf-8`,
    ...ekBasliklar,
  });
  res.end(govde);
}

const anaSayfa = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>BMH231 Ödev 1</title>
</head>
<body>
  <h1>BMH231 Web Programlama – Ödev 1</h1>
  <p>Node.js http modülüyle yazılmış küçük bir sunucu.</p>
  <p><a href="/hakkimda">Hakkımda</a></p>
</body>
</html>`;

const sunucu = http.createServer((req, res) => {
  // Sorgu dizesini (ör. ?a=1) yoldan ayırıyoruz.
  const yol = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;

  // Her isteğin yöntemini ve yolunu uçbirime yaz.
  console.log(`${req.method} ${yol}`);

  switch (yol) {
    case '/':
      return gonder(res, 200, 'text/html', anaSayfa);

    default:
      return gonder(res, 404, 'text/plain', 'Sayfa bulunamadı');
  }
});

sunucu.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});