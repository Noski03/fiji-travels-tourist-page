function tilfeldigTall(value) {
    return Math.floor(Math.random() * value);
}

const spørsmålListe = [
    { spørsmål: "Spørsmål nummer 1", alternativer: ["1", "2", "3", "4"], svar: 3 },
    {
        spørsmål: "Spørsmål nummer 2",
        alternativer: ["Andre 1", "Andre 2", "Andre 3", "Andre 4"], svar: 1
    },
    {
        spørsmål: "Spørsmål nummer 3",
        alternativer: ["Tredje 1", "Tredje 2", "Tredje 3", "Tredje 4"],
        svar: 2,
    },
];

const spørsmålTittelElement = document.getElementById('spørsmålTittel');
const alternativKnapperElementer = document.querySelectorAll('.alternativ');
const sjekkSvarKnapp = document.getElementById('sjekkSvar');

for (let i = 0; i < alternativKnapperElementer.length; i++) {
    const alternativKnapp = alternativKnapperElementer[i];
    alternativKnapp.addEventListener('click', () => { velgAlternativ(i); })
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
        alternativKnapperElementer[i].textContent = nyttTilfeldigSpørsmål.alternativer[i];
    }

    return nyttTilfeldigSpørsmål.svar;
}

function velgAlternativ(index) {
    alternativKnapperElementer[Math.min(valgtAlternativ, alternativKnapperElementer.length - 1)].classList.remove('selected')
    valgtAlternativ = index;
    alternativKnapperElementer[index].classList.add('selected');
}

function resetSpørsmål() {
    alternativKnapperElementer[valgtAlternativ].classList.remove('selected');
    valgtAlternativ = 4;
    nyttSpørsmål();
}

function sjekkSvar() {
    if (valgtAlternativ > alternativKnapperElementer.length - 1) {
        alert('Du må velge et alternativ først!');
        return;
    }

    if (valgtAlternativ === svar) {
        // Du har valgt riktig
        spørsmålTittelElement.textContent = '✅';
    } else {
        // Du har valgt feil
        spørsmålTittelElement.textContent = '❌';
    }

    /* setTimeout(() => {
        resetSpørsmål();
    }, 5000); */
}

sjekkSvarKnapp.addEventListener('click', sjekkSvar);

svar = nyttSpørsmål();
