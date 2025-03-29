const https = require("https");
const fs = require("fs");
const path = require("path");

// Ses dosyalarının URL'leri
const sounds = [
  {
    name: "intro-magic.mp3",
    url: "https://freesound.org/data/previews/411/411089_5121236-lq.mp3",
  },
  {
    name: "pop.mp3",
    url: "https://freesound.org/data/previews/66/66136_606079-lq.mp3",
  },
  {
    name: "woosh.mp3",
    url: "https://freesound.org/data/previews/523/523627_2487964-lq.mp3",
  },
  {
    name: "sparkle.mp3",
    url: "https://freesound.org/data/previews/315/315846_5385832-lq.mp3",
  },
];

// Dosyaları indirme fonksiyonu
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    console.log(`İndiriliyor: ${url} -> ${destination}`);

    const file = fs.createWriteStream(destination);

    https
      .get(url, (response) => {
        // Yönlendirme durumunda
        if (response.statusCode === 301 || response.statusCode === 302) {
          console.log(`Yönlendiriliyor: ${response.headers.location}`);
          return downloadFile(response.headers.location, destination)
            .then(resolve)
            .catch(reject);
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Dosya indirilemedi: ${response.statusCode}`));
          file.close();
          fs.unlinkSync(destination);
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close(() => {
            console.log(
              `İndirildi: ${destination} (${
                fs.statSync(destination).size
              } bytes)`
            );
            if (fs.statSync(destination).size < 1000) {
              // Dosya çok küçükse (muhtemelen hata html'i), indirme başarısız
              console.error(
                `Dosya çok küçük, geçersiz olabilir: ${destination}`
              );
              fs.unlinkSync(destination);
              reject(new Error("Dosya çok küçük, geçersiz"));
              return;
            }
            resolve();
          });
        });
      })
      .on("error", (err) => {
        fs.unlinkSync(destination);
        reject(err);
      });
  });
}

// Ana fonksiyon
async function downloadAllSounds() {
  console.log("Ses dosyaları indiriliyor...");

  try {
    for (const sound of sounds) {
      // Hem public/ hem de public/sounds/ klasörlerine indir
      const publicDestination = path.join(__dirname, "../", sound.name);
      const soundsDestination = path.join(__dirname, sound.name);

      try {
        await downloadFile(sound.url, publicDestination);
        console.log(`${sound.name} public/ klasörüne indirildi`);

        // Sounds klasörüne de kopyala
        fs.copyFileSync(publicDestination, soundsDestination);
        console.log(`${sound.name} public/sounds/ klasörüne kopyalandı`);
      } catch (err) {
        console.error(`${sound.name} indirilemedi:`, err.message);
      }
    }

    console.log("Ses dosyalarının durumu:");
    for (const sound of sounds) {
      const publicPath = path.join(__dirname, "../", sound.name);
      const soundsPath = path.join(__dirname, sound.name);

      console.log(`${sound.name}:`);
      console.log(
        `  public/: ${
          fs.existsSync(publicPath)
            ? `Var (${fs.statSync(publicPath).size} bytes)`
            : "Yok"
        }`
      );
      console.log(
        `  public/sounds/: ${
          fs.existsSync(soundsPath)
            ? `Var (${fs.statSync(soundsPath).size} bytes)`
            : "Yok"
        }`
      );
    }
  } catch (error) {
    console.error("Genel hata:", error);
  }

  console.log("İndirme işlemi tamamlandı!");
}

// Programı çalıştır
downloadAllSounds().catch(console.error);
