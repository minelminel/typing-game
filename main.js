// this is where the prompt text is displayed
var wordBox = document.getElementById('wordbox');
// keep track of the `wordBox` word separately for doing the comparison
let targetWord;
// keep track of time from first typed letter to correct entry
let timeTakenInMS;
var clockBox = document.getElementById('clockbox');
// this is where the user enters their text
var typeBox = document.getElementById('typebox');

// all the possible words we can choose from
const vocabulary = [
    'harm',
    'stretch',
    'jar',
    'illustrious',
    'high',
    'pitched',
    'discovery',
    'tire',
    'tank',
    'selfish',
    'oven',
    'stay',
    'nondescript',
    // quotes
    'democratic socialism means that we must create an economy that works for all, not just the very wealthy',
    'compassion is not weakness, and concern for the unfortunate is not socialism',
    'capitalism is war, socialism is peace',
];

function sample(array) {
    return array[~~(Math.random() * array.length)];
}

// on page load, set the first word
window.onload = function() {
    typeBox.focus();
    var rand = sample(vocabulary);
    wordBox.innerHTML = rand;
    targetWord = rand;
}

typeBox.oninput = function() {
    if (typeBox.value == targetWord) {
        clockBox.innerText = `⏱ ${(Date.now() - timeTakenInMS) / 1000} sec`;
        targetWord = sample(vocabulary);
        wordBox.innerHTML = targetWord;
        typeBox.value = '';
        timeTakenInMS = undefined;
    } else {
        if (! timeTakenInMS) {
            timeTakenInMS = Date.now();
        }
        wordBox.innerHTML = '';
        let letterColor, letterHtml;
        for (let i=0; i<targetWord.length; i++) {
            if (i < typeBox.value.length) {
                if (typeBox.value[i] == targetWord[i]) {
                    letterColor = 'var(--green)';
                } else {
                    // as soon as there is an incorrect letter typed,
                    // the rest of the letters up till the length of
                    // entered chars should be red to show the mistake
                    letterColor = 'var(--red)';
                }
            }
            else {
                letterColor = 'var(--gray)';
            }
            letterHtml = `<span style="color: ${letterColor};">${targetWord[i]}</span>`;
            wordBox.innerHTML += letterHtml;
        }
    }
}