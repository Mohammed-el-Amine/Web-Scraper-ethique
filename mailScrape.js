const request = require('request'); // importation de la bibliothèque request
const cheerio = require('cheerio'); // importation de la bibliothèque cheerio
const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\.\b|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}[A-Za-z]\b/; // expression régulière pour extraire les adresses e-mails

// fonction pour créer et écrire dans un fichier
function createAndWriteToFile(fileName, fileContent) {

  const fs = require('fs'); // importation de la bibliothèque fs

  fs.writeFileSync(fileName, fileContent);
  console.log(`Le fichier ${fileName} a été créé avec succès et le contenu ${fileContent} a été ajouté à l'intérieur.`);
}

const urls = [
  'ExempleURL.com',
  'ExempleURL.com',
  'ExempleURL.com',
];

// utilisation d'un Set pour stocker les adresses e-mails sans doublons
const emails = new Set();

// boucle pour parcourir la liste des URLs
urls.forEach((url) => {

  request(url, (error, response, html) => { // envoi de la demande à la page

    if (!error && response.statusCode == 200) {

      const $ = cheerio.load(html); // chargement de la page HTML dans cheerio

      $(':contains("@")').each((i, el) => { // utilisation de la méthode .find() pour chercher tous les éléments contenant un "@"

        const email = $(el).text().match(regex); // utilisation de la regex pour extraire les adresses e-mails de ces éléments

        if (email) {
          emails.add(email[0]); // ajout de l'adresse e-mail au Set
        }

      });

      console.log([...emails]); // affichage des adresses e-mails stockées dans le Set

      let dataString = [...emails].join('\n'); // utilisation de la méthode join pour convertir le tableau en chaîne de caractères avec une ligne vide entre chaque adresse e-mail
      createAndWriteToFile(`emailWeb.txt`, `${dataString}\n`);
    }
  });
});

