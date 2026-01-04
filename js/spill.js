function tilfeldigTall(value) {
  return Math.floor(Math.random() * value);
}

const spørsmålListe = [
  {
    spørsmål: "Hvor ligger Fiji geografisk?",
    alternativer: [
      "A. Sør for Australia",
      "B. Nord for New Zealand",
      "C. Øst for Japan",
      "D. Vest for Brasil",
    ],
    svar: 1,
  },
  {
    spørsmål: "Hva er hovedstaden i Fiji?",
    alternativer: ["A. Lautoka", "B. Nadi", "C. Suva", "D. Denarau"],
    svar: 2,
  },
  {
    spørsmål: "Omtrent hvor mange mennesker bor det i Fiji?",
    alternativer: ["200 000", "500 000", "1 000 000", "5 000 000"],
    svar: 2,
  },
  {
    spørsmål: "Hvilken øy bor de fleste innbyggerne på?",
    alternativer: ["Taveuni", "Vanua Levu", "Ovalau", "Viti Levu"],
    svar: 3,
  },
  {
    spørsmål: "Hvilke språk snakkes i Fiji?",
    alternativer: [
      "Fijian, fransk og engelsk",
      "Engelsk, spansk og hindi",
      "Fijian, engelsk og hindi",
      "Kun fijian",
    ],
    svar: 2,
  },
  {
    spørsmål: "Hva er Fiji kjent for når det gjelder lokalbefolkningen?",
    alternativer: [
      "Å være reserverte",
      "Å være svært formelle",
      "Å være lite imøtekommende",
      "Å være vennlige og gjestfrie",
    ],
    svar: 3,
  },
  {
    spørsmål: "Hva betyr Fiji sitt nasjonale motto oversatt til norsk?",
    alternativer: [
      "Frykt Gud og ære kongen/dronningen",
      "Samhold og styrke",
      "Fred og frihet",
      "Ett folk, ett land",
    ],
    svar: 0,
  },
  {
    spørsmål: "Når fikk Fiji demokratiet tilbake etter militærstyre?",
    alternativer: ["1990", "2005", "2010", "2014"],
    svar: 3,
  },
  {
    spørsmål: "Hva er det høyeste fjellet i Fiji?",
    alternativer: [
      "Mount Tomanivi",
      "Mount Korobaba",
      "Mount Taveuni",
      "Mount Levuka",
    ],
    svar: 0,
  },
  {
    spørsmål: "Hvordan er klimaet i Fiji?",
    alternativer: [
      "kalde vintre",
      "varmt i 2-3 måneder i året",
      "varmt året rundt",
      "4 tydelige årstider",
    ],
    svar: 2,
  },
  {
    spørsmål: "Hva er omtrent gjennomsnittstemperaturen om sommeren i Fiji?",
    alternativer: ["15 °C", "20 °C", "27 °C", "35 °C"],
    svar: 2,
  },
  {
    spørsmål: "Hvilke dyr er de eneste opprinnelige landpattedyrene i Fiji?",
    alternativer: ["flaggermus", "rotter", "katter", "aper"],
    svar: 0,
  },
  {
    spørsmål: "Hva er spesielt med Fiji-iguanen?",
    alternativer: [
      "den lever 80% av livet sitt i havet",
      "den er nattaktiv",
      "den er verdens største øgle",
      "den finnes kun på Fiji",
    ],
    svar: 3,
  },
  {
    spørsmål: "Hva er Fiji sitt nasjonalblomst?",
    alternativer: ["Hibiskus", "Orkidé", " Frangipani", "Rød Tagimoucia"],
    svar: 3,
  },
  {
    spørsmål: "Når ble Fiji uavhengig fra Storbritannia?",
    alternativer: ["1965", "1970", " 1980", "1995"],
    svar: 1,
  },
];
let spørsmålFått = [];

const spørsmålTittelElement = document.getElementById("spørsmålTittel");
const alternativKnapperElementer = document.querySelectorAll(".alternativ");
const sjekkSvarKnapp = document.getElementById("sjekkSvar");
const svarViserSpanElement = document.getElementById("answerStatus");
const spørsmålIgjenCounterElement = document.getElementById(
  "spørsmålIgjenCounter"
);

const youAreAnimalImgElement = document.getElementById("youAreAnimalImg");
const youAreAnimalHeaderElement = document.getElementById("youAreAnimalHeader");
const youAreAElement = document.getElementById("youAreA");
const scoreQuestionsElement = document.getElementById("scoreQuestions");
const scorePercentageElement = document.getElementById("scorePercentage");
const startPåNyttElement = document.getElementById("playAgainButton");

const prequizHolderElement = document.getElementById("prequizHolder");
const quizHolderElement = document.getElementById("quizHolder");
const summaryQuizHolderElement = document.getElementById("summaryQuizHolder");

for (let i = 0; i < alternativKnapperElementer.length; i++) {
  const alternativKnapp = alternativKnapperElementer[i];
  alternativKnapp.addEventListener("click", () => {
    velgAlternativ(i);
  });
}

const form = document.getElementById("prequizForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop page reload

  const data = new FormData(form);

  navn = data.get("playerName");
  alder = data.get("playerAge");

  // Prepare quiz
  if (data.get("quizLength") === "short") spørsmålIgjen = 5;
  if (data.get("quizLength") === "medium") spørsmålIgjen = 10;
  if (data.get("quizLength") === "full") spørsmålIgjen = 15;

  // Show quiz frontend
  prequizHolderElement.style.display = "none";
  quizHolderElement.style.display = "flex";

  totaleSpørsmål = spørsmålIgjen;
  spørsmålIgjenCounterElement.textContent = `1/${spørsmålIgjen}`;
});

let valgtAlternativ = 4;
let svar = 0;
let spørsmålIgjen = 0;

let navn = "Bruker";
let alder = 16;

let totaleSpørsmål = 15;
let riktigeSvar = 0;

function nyttSpørsmål() {
  spørsmålIgjen -= 1;

  if (spørsmålIgjen === 0) {
    avsluttQuiz();
    return;
  }

  // Få et nytt spørsmål
  let rng = tilfeldigTall(spørsmålListe.length);
  for (let i = 0; i < spørsmålListe.length; i++) {
    if (spørsmålFått.includes(rng)) {
      rng = (rng + 1) % spørsmålListe.length;
    }
  }

  const nyttTilfeldigSpørsmål = spørsmålListe[rng];

  spørsmålFått.push(rng);

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
  alternativKnapperElementer[svar].classList.remove("correct");
  alternativKnapperElementer[valgtAlternativ].classList.remove("wrong");

  sjekkSvarKnapp.textContent = "Sjekk Svar";
  svarViserSpanElement.textContent = "";

  if (valgtAlternativ === svar) {
    riktigeSvar += 1;
  }

  alternativKnapperElementer.forEach(knapp => {
    knapp.classList.remove("selected");
  });

  valgtAlternativ = 4;
  svar = nyttSpørsmål();

  spørsmålIgjenCounterElement.textContent = `${totaleSpørsmål - spørsmålIgjen + 1
    }/${totaleSpørsmål}`;
}

function visRiktigSvar() {
  sjekkSvarKnapp.textContent = "Neste Spørsmål";

  alternativKnapperElementer[valgtAlternativ].classList.add("wrong");
  alternativKnapperElementer[svar].classList.add("correct");
}

function sjekkSvar() {
  if (sjekkSvarKnapp.textContent === "Sjekk Svar") {
    if (valgtAlternativ > alternativKnapperElementer.length - 1) {
      alert("Du må velge et alternativ først!");
      return;
    }

    if (valgtAlternativ === svar) {
      // Du har valgt riktig
      svarViserSpanElement.textContent = "✅";
    } else {
      // Du har valgt feil
      svarViserSpanElement.textContent = "❌";
    }

    visRiktigSvar();
  } else {
    resetSpørsmål();
  }
}

function avsluttQuiz() {
  const playerScore = riktigeSvar / totaleSpørsmål;

  let imagePath = "../imgs/animales/birb.jpg";
  let animal = "Noah AUGOOON";

  if (playerScore < 0.6) {
    imagePath = "../imgs/animales/birb.jpg";
    animal = "Birb";
  } else if (playerScore <= 0.6) {
    imagePath = "../imgs/animales/seaturtle.jpg";
    animal = "Havskilpadde";
  } else if (playerScore < 0.81) {
    imagePath = "../imgs/animales/iguan.jpg";
    animal = "Iguan";
  } else if (playerScore < 1) {
    imagePath = "../imgs/animales/dolphin.jpg";
    animal = "Delfin";
  } else if (playerScore === 1) {
    imagePath = "../imgs/animales/shark.jpg";
    animal = "Hai";
  } else {
    console.error("..what?");
  }

  youAreAElement.textContent = `Bra jobbet ${navn} (${alder})! Du er en`;
  youAreAnimalImgElement.src = imagePath;
  youAreAnimalHeaderElement.textContent = animal;

  scoreQuestionsElement.textContent = `${riktigeSvar}/${totaleSpørsmål}`;
  scorePercentageElement.textContent = `${Math.round(playerScore * 100)}%`;

  quizHolderElement.style.display = "none";
  summaryQuizHolderElement.style.display = "flex";
}

sjekkSvarKnapp.addEventListener("click", sjekkSvar);
startPåNyttElement.addEventListener("click", () => {
  location.reload();
});

svar = nyttSpørsmål();
