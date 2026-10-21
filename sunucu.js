// BMH231 Ödev 1 – Bölüm C3
// Yalnızca Node.js'in http modülü ve dayjs paketi kullanılmıştır (Express yok).

const http = require('http');
const dayjs = require('dayjs');

const PORT = 3000;

// Yanıt göndermeyi tek yerde topluyoruz: durum kodu, Content-Type ve gövde.
function gonder(res, durumKodu, icerikTuru, govde, ekBasliklar = {}) {
  res.writeHead(durumKodu, {
    'Content-Type': `${icerikTuru}; charset=utf-8`,
    ...ekBasliklar,
  });
  res.end(govde);
}

// JavaScript nesnesini JSON metnine çevirip gönderir.
function json(res, durumKodu, veri) {
  gonder(res, durumKodu, 'application/json', JSON.stringify(veri, null, 2));
}

const anaSayfa = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>BMH231 Ödev 1</title>
</head>
<body>
    <h1>BMH231 Ödev 1 – Node.js Sunucusu</h1> Web Programlama – Ödev 1</h1>
  <p>Node.js http modülüyle yazılmış küçük bir sunucu.</p>
  <p><a href="/hakkimda">Hakkımda</a></p>
</body>
</html>`;

const hakkimdaSayfasi = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>Hakkımda</title>
</head>
<body>
  <h1>Hakkımda</h1>
  <p>Merhaba, ben Rumeysa Ak. Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği 2. sınıf öğrencisiyim.</p>
    <p>Yazılımla uğraşmayı seviyorum ve kendimi bu alanda geliştirmek istiyorum.</p>
  <p><a href="/">Ana sayfaya dön</a></p>
</body>
</html>`;

const sunucu = http.createServer((req, res) => {
  // Sorgu dizesini (ör. ?a=1) yoldan ayırıyoruz.
  const yol = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;

  // Her isteğin yöntemini ve yolunu uçbirime yaz.
  console.log(`${req.method} ${yol}`);

  // GET dışındaki yöntemler: 405 + Allow başlığı
  if (req.method !== 'GET') {
    return gonder(res, 405, 'text/plain', 'Yöntem desteklenmiyor', { Allow: 'GET' });
  }

  switch (yol) {
    case '/':
      return gonder(res, 200, 'text/html', anaSayfa);

    case '/hakkimda':
      return gonder(res, 200, 'text/html', hakkimdaSayfasi);

    case '/api/ders':
      return json(res, 200, {
        kod: 'BMH231',
        ad: 'Web Programlama',
        gun: 'Pazartesi',
      });

    case '/api/agep': {
      const sonTeslim = dayjs('2026-11-01');
      const bugun = dayjs().startOf('day');
      return json(res, 200, {
        sonTeslim: sonTeslim.format('DD.MM.YYYY'),
        bugun: bugun.format('DD.MM.YYYY'),
        kalanGun: sonTeslim.diff(bugun, 'day'),
      });
    }

    default:
      return gonder(res, 404, 'text/plain', 'Sayfa bulunamadı');
  }
});

sunucu.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});