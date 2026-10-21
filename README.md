# bmh231-odev1

BMH231 Web Programlama dersi Ödev 1 kapsamında, yalnızca Node.js'in yerleşik `http` modülü ve `dayjs` paketi kullanılarak (Express olmadan) yazılmış küçük bir web sunucusu.

## Gereksinimler

- [Node.js](https://nodejs.org/) (LTS sürümü) ve npm
- Git

## Kurulum ve çalıştırma

```bash
git clone https://github.com/Rumeysaaa730/bmh231-odev1.git
cd bmh231-odev1
npm install
npm start
```

Sunucu `http://localhost:3000` adresinde çalışır. Durdurmak için uçbirimde `Ctrl + C`.

## Desteklenen yollar

| Yöntem | Yol | Durum kodu | Yanıt |
|---|---|---|---|
| GET | `/` | 200 | HTML – başlık ve /hakkimda bağlantısı |
| GET | `/hakkimda` | 200 | HTML – tanıtım sayfası |
| GET | `/api/ders` | 200 | JSON – dersin kodu, adı ve günü |
| GET | `/api/agep` | 200 | JSON – AGEP son teslim tarihi (01.11.2026) ve kalan gün sayısı |
| GET | diğer tüm yollar | 404 | Düz metin – "Sayfa bulunamadı" |
| GET dışı (POST, PUT, DELETE…) | her yol | 405 | Düz metin, `Allow: GET` başlığıyla |

Sunucu her isteğin yöntemini ve yolunu uçbirime yazar (ör. `GET /api/ders`).

## Örnek

```bash
curl -i http://localhost:3000/api/agep
```