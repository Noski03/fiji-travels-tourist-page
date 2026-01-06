/* =========================================
   CONSTANTS & DATA
   ========================================= */
const spørsmålListe = [
  {
    spørsmål: "Hvor ligger Fiji geografisk?",
    alternativer: [
      "Sør for Australia",
      "Nord for New Zealand",
      "Øst for Japan",
      "Vest for Brasil",
    ],
    svar: 1,
  },
  {
    spørsmål: "Hva er hovedstaden i Fiji?",
    alternativer: ["Lautoka", "Nadi", "Suva", "Denarau"],
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
      "Fijian, Fransk og Engelsk",
      "Engelsk, Spansk og Hindi",
      "Fijian, Engelsk og Hindi",
      "Kun Fijian",
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
      "Kalde vintre",
      "Varmt i 2-3 måneder i året",
      "Varmt året rundt",
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
    alternativer: ["Flaggermus", "Rotter", "Katter", "Aper"],
    svar: 0,
  },
  {
    spørsmål: "Hva er spesielt med Fiji-iguanen?",
    alternativer: [
      "Den lever 80% av livet sitt i havet",
      "Den er nattaktiv",
      "Den er verdens største øgle",
      "Den finnes kun på Fiji",
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

/* =========================================
   DOM ELEMENTS (Selectors)
   ========================================= */
// Containers
const prequizHolderElement = document.getElementById("prequizHolder");
const quizHolderElement = document.getElementById("quizHolder");
const summaryQuizHolderElement = document.getElementById("summaryQuizHolder");

// Input/Controls
const form = document.getElementById("prequizForm");
const sjekkSvarKnapp = document.getElementById("sjekkSvar");
const startPåNyttElement = document.getElementById("playAgainButton");
const alternativKnapperElementer = document.querySelectorAll(".alternativ");

// Text/Display
const spørsmålTittelElement = document.getElementById("spørsmålTittel");
const svarViserSpanElement = document.getElementById("answerStatus");
const spørsmålIgjenCounterElement = document.getElementById("spørsmålIgjenCounter");
const youAreAnimalImgElement = document.getElementById("youAreAnimalImg");
const youAreAnimalHeaderElement = document.getElementById("youAreAnimalHeader");
const youAreAElement = document.getElementById("youAreA");
const scoreQuestionsElement = document.getElementById("scoreQuestions");
const scorePercentageElement = document.getElementById("scorePercentage");

/* =========================================
   GLOBAL STATE (Variables)
   ========================================= */

// Quiz logic
let spørsmålFått = [];
let valgtAlternativ = 4; // 4 betyr at du ikke har valgt et alternativ
let svarIndex = 0;
let spørsmålIgjen = 0;

// Form data
let navn = "Bruker";
let alder = 16;

// Quiz result data
let totaleSpørsmål = 15;
let riktigeSvar = 0;

let harSvart = false;

/* =========================================
   UTILITY FUNCTIONS
   ========================================= */
function tilfeldigTall(value) {
  return Math.floor(Math.random() * value);
}

/* =========================================
   APP LOGIC
   ========================================= */
function nyttSpørsmål() {
  spørsmålIgjen -= 1;

  if (spørsmålIgjen === 0) {
    avsluttQuiz();
    return;
  }

  // Få et nytt spørsmål
  let rng = tilfeldigTall(spørsmålListe.length); // Får tall fra og med 0 til og med 14 (til 15)
  for (let i = 0; i < spørsmålListe.length; i++) { // Sjekk av vi ikke har fått spørsmålet før
    if (spørsmålFått.includes(rng)) { // Hvis vi har fått spørsmålet før
      rng = (rng + 1) % spørsmålListe.length; // Gå en videre (modulo: wrap rundt lengden til listen, altsa 14 + 1 = 0)
    }
  }

  // Legg det nye spørsmålet i et objekt
  const nyttTilfeldigSpørsmål = spørsmålListe[rng];
  spørsmålFått.push(rng); // Jeg til spørsmålet i 'spørsmålFått' listen sånn at vi ikke kan få det samme spørsmålet om igjen

  // Legge inn spørsmål og alternativer i html

  spørsmålTittelElement.textContent = nyttTilfeldigSpørsmål.spørsmål;

  for (let i = 0; i < nyttTilfeldigSpørsmål.alternativer.length; i++) {
    // Gå gjennom alle alternativene til spørsmålet, og sett teksten til knappene til det samme som spørsmålsalternativet
    alternativKnapperElementer[i].textContent =
      nyttTilfeldigSpørsmål.alternativer[i];
  }

  return nyttTilfeldigSpørsmål.svar;
}

function velgAlternativ(index) {
  if (harSvart) return; // Gjør at du ikke kan trykke på noen andre knapper hvis du har valgt å sjekke svaret ditt

  alternativKnapperElementer[
    Math.min(valgtAlternativ, alternativKnapperElementer.length - 1)
  ].classList.remove("selected");
  valgtAlternativ = index;
  alternativKnapperElementer[index].classList.add("selected");
}

function visRiktigSvar() {
  sjekkSvarKnapp.textContent = "Neste Spørsmål";

  alternativKnapperElementer[valgtAlternativ].classList.add("wrong"); // Sett fargen til det riktige alternativet til rødt
  alternativKnapperElementer[svarIndex].classList.add("correct"); // Sett fargen til det riktige alternativet til grønt

  // OBS! Vi har skrevet definisjonen til '.correct' etter definisjonen til '.wrong', som betyr at hvis du har valgt det riktige svaralternativet, vil den røde fargen bli overskrevet av den grønne
}

function sjekkSvar() {
  if (sjekkSvarKnapp.textContent === "Sjekk Svar") {
    // Hvis du trykker på knappen når det står "Sjekk Svar"

    if (valgtAlternativ > alternativKnapperElementer.length - 1) {
      alert("Du må velge et alternativ først!");
      return;
    }

    if (valgtAlternativ === svarIndex) {
      // Du har valgt riktig
      svarViserSpanElement.textContent = "✅";
    } else {
      // Du har valgt feil
      svarViserSpanElement.textContent = "❌";
    }

    harSvart = true; // Blokker bruker fra å trykke på noen andre svaralternativer, sjekk 'velgAlternativ'
    visRiktigSvar();
  } else {
    // Hvis du trykker på knappen når det står "Neste Spørsmål"
    resetSpørsmål();
  }
}

function resetSpørsmål() {
  alternativKnapperElementer[svarIndex].classList.remove("correct");
  alternativKnapperElementer[valgtAlternativ].classList.remove("wrong");

  sjekkSvarKnapp.textContent = "Sjekk Svar";
  svarViserSpanElement.textContent = "";

  if (valgtAlternativ === svarIndex) {
    riktigeSvar += 1;
  }

  alternativKnapperElementer.forEach((knapp) => {
    knapp.classList.remove("selected");
  });

  harSvart = false;
  valgtAlternativ = 4;
  svarIndex = nyttSpørsmål();

  spørsmålIgjenCounterElement.textContent = `${totaleSpørsmål - spørsmålIgjen + 1
    }/${totaleSpørsmål}`;
}

function avsluttQuiz() {
  const playerScore = riktigeSvar / totaleSpørsmål;

  // Set default values, in case something goes wrong
  let imagePath = "../imgs/animales/birb.jpg";
  let animal = "Noah AUGOOON";

  if (playerScore < 0.5) { // Mindre enn 50%
    imagePath = "../imgs/animales/birb.jpg";
    animal = "Birb";
  } else if (playerScore <= 0.6) { // Mellom 50% og 60%
    imagePath = "../imgs/animales/seaturtle.jpg";
    animal = "Havskilpadde";
  } else if (playerScore < 0.81) { // Mellom 60% og 81% (81 er ikke inklusiv)
    imagePath = "../imgs/animales/iguan.jpg";
    animal = "Iguan";
  } else if (playerScore < 1) { // Mellom 81% og 100%
    imagePath = "../imgs/animales/dolphin.jpg";
    animal = "Delfin";
  } else if (playerScore === 1) { // Perfekt score
    imagePath = "../imgs/animales/shark.jpg";
    animal = "Hai";
  } else {
    console.error("PlayerScore is above 100%: " + playerScore); // Grunnen til at vi la til default values, burde aldri skje. Kan bare skje hvis score er mer enn 100%
  }

  // Endre på DOM elementer for å oppdatere seg
  youAreAElement.textContent = `Bra jobbet ${navn} (${alder})! Du er en`;
  youAreAnimalImgElement.src = imagePath;
  youAreAnimalHeaderElement.textContent = animal;

  scoreQuestionsElement.textContent = `${riktigeSvar}/${totaleSpørsmål}`;
  scorePercentageElement.textContent = `${Math.round(playerScore * 100)}%`;

  quizHolderElement.style.display = "none";
  summaryQuizHolderElement.style.display = "flex";
}

/* =========================================
   EVENT LISTENERS
   ========================================= */

// Sette opp alternativ knapper
for (let i = 0; i < alternativKnapperElementer.length; i++) {
  const alternativKnapp = alternativKnapperElementer[i];
  alternativKnapp.addEventListener("click", () => {
    velgAlternativ(i);
  });
}

// Start game (Form submit)
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

// Når du trykker på sjekkSvar knappen
sjekkSvarKnapp.addEventListener("click", sjekkSvar);
startPåNyttElement.addEventListener("click", () => {
  location.reload();
});

/* =========================================
   INITIALIZATION
   ========================================= */
svarIndex = nyttSpørsmål();
