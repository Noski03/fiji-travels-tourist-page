function tilfeldigTall(value) {
  return Math.floor(Math.random() * value);
}

const spørsmålListe = [
  {
    spørsmål: "1. Hvor ligger Fiji geografisk?",
    alternativer: [
      "A. Sør for Australia",
      "B. Nord for New Zealand",
      "C. Øst for Japan",
      "D. Vest for Brasil",
    ],
    svar: 1,
  },
  {
    spørsmål: "2. Hva er hovedstaden i Fiji?",
    alternativer: ["A. Lautoka", "B. Nadi", "C. Suva", "D. Denarau"],
    svar: 2,
  },
  {
    spørsmål: "3. Omtrent hvor mange mennesker bor det i Fiji?",
    alternativer: ["200 000", "500 000", "1 000 000", "5 000 000"],
    svar: 2,
  },
  {
    spørsmål: "4. Hvilken øy bor de fleste innbyggerne på?",
    alternativer: ["Taveuni", "Vanua Levu", "Ovalau", " Viti Levu"],
    svar: 3,
  },
  {
    spørsmål: "5. Hvilke språk snakkes i Fiji?",
    alternativer: [
      "Fijian, fransk og engelsk",
      "Engelsk, spansk og hindi",
      "Fijian, engelsk og hindi",
      "Kun fijian",
    ],
    svar: 2,
  },
  {
    spørsmål: "6. Hva er Fiji kjent for når det gjelder lokalbefolkningen?",
    alternativer: [
      "Å være reserverte",
      "Å være svært formelle",
      "Å være lite imøtekommende",
      "Å være vennlige og gjestfrie",
    ],
    svar: 3,
  },
  {
    spørsmål: "7. Hva betyr Fiji sitt nasjonale motto oversatt til norsk?",
    alternativer: [
      "Frykt Gud og ære kongen/dronningen",
      "Samhold og styrke",
      "Fred og frihet",
      "Ett folk, ett land",
    ],
    svar: 0,
  },
  {
    spørsmål: "8. Når fikk Fiji demokratiet tilbake etter militærstyre?",
    alternativer: ["1990", "2005", "2010", "2014"],
    svar: 3,
  },
  {
    spørsmål: "9. Hva er det høyeste fjellet i Fiji?",
    alternativer: [
      "Mount Tomanivi",
      "Mount Korobaba",
      "Mount Taveuni",
      "Mount Levuka",
    ],
    svar: 0,
  },
  {
    spørsmål: "10. Hvordan er klimaet i Fiji?",
    alternativer: [
      "kalde vintre",
      "varmt i 2-3 måneder i året",
      "varmt året rundt",
      "4 tydelige årstider",
    ],
    svar: 2,
  },
  {
    spørsmål:
      "11. Hva er omtrent gjennomsnittstemperaturen om sommeren i Fiji?",
    alternativer: ["15 °C", "20 °C", "27 °C", "35 °C"],
    svar: 2,
  },
  {
    spørsmål:
      "12. Hvilke dyr er de eneste opprinnelige landpattedyrene i Fiji?",
    alternativer: ["flaggermus", "rotter", "katter", "aper"],
    svar: 0,
  },
  {
    spørsmål: "13. Hva er spesielt med Fiji-iguanen?",
    alternativer: [
      "den lever 80% av livet sitt i havet",
      "den er nattaktiv",
      "den er verdens største øgle",
      "den finnes kun på Fiji",
    ],
    svar: 3,
  },
  {
    spørsmål: "14. Hva er Fiji sitt nasjonalblomst?",
    alternativer: ["Hibiskus", "Orkidé", " Frangipani", "Rød Tagimoucia"],
    svar: 3,
  },
  {
    spørsmål: "15. Når ble Fiji uavhengig fra Storbritannia?",
    alternativer: ["1965", "1970", " 1980", "1995"],
    svar: 1,
  },
];

const spørsmålTittelElement = document.getElementById("spørsmålTittel");
const alternativKnapperElementer = document.querySelectorAll(".alternativ");
const sjekkSvarKnapp = document.getElementById("sjekkSvar");

for (let i = 0; i < alternativKnapperElementer.length; i++) {
  const alternativKnapp = alternativKnapperElementer[i];
  alternativKnapp.addEventListener("click", () => {
    velgAlternativ(i);
  });
}

let valgtAlternativ = 4;
let svar = 0;

function nyttSpørsmål() {
  // Få et nytt spørsmål
  const rng = tilfeldigTall(spørsmålListe.length);
  const nyttTilfeldigSpørsmål = spørsmålListe[rng];

  // Legge inn spørsmål og alternativer i html
  spørsmålTittelElement.textContent = nyttTilfeldigSpørsmål.spørsmål;

  for (let i = 0; i < nyttTilfeldigSpørsmål.alternativer.length; i++) {
    alternativKnapperElementer[i].textContent =
      nyttTilfeldigSpørsmål.alternativer[i];
  }

  return nyttTilfeldigSpørsmål.svar;
}

function velgAlternativ(index) {
  alternativKnapperElementer[
    Math.min(valgtAlternativ, alternativKnapperElementer.length - 1)
  ].classList.remove("selected");
  valgtAlternativ = index;
  alternativKnapperElementer[index].classList.add("selected");
}

function resetSpørsmål() {
  alternativKnapperElementer[valgtAlternativ].classList.remove("selected");
  valgtAlternativ = 4;
  nyttSpørsmål();
}

function sjekkSvar() {
  if (valgtAlternativ > alternativKnapperElementer.length - 1) {
    alert("Du må velge et alternativ først!");
    return;
  }

  if (valgtAlternativ === svar) {
    // Du har valgt riktig
    spørsmålTittelElement.textContent = "✅";
  } else {
    // Du har valgt feil
    spørsmålTittelElement.textContent = "❌";
  }

  setTimeout(() => {
    resetSpørsmål();
  }, 5000);
}

sjekkSvarKnapp.addEventListener("click", sjekkSvar);

svar = nyttSpørsmål();
