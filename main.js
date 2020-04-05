// this is where the prompt text is displayed
var wordBox = document.getElementById('wordbox');
// keep track of the `wordBox` word separately for doing the comparison
let targetWord;
// keep track of time from first typed letter to correct entry
let timeTakenInMS;
var clockBox = document.getElementById('clockbox');
// this is where the user enters their text
var typeBox = document.getElementById('typebox');
// figure out how many words to display
var rangeSlider = document.getElementById('rangeSlider');
var wordCount = document.getElementById('wordCountLabel');
rangeSlider.oninput = function() {
    wordCount.innerText = rangeSlider.value;
}

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
];

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// on page load, set the first word
window.onload = function() {
    // display the default range slider label
    wordCount.innerText = rangeSlider.value;
    typeBox.focus();
    targetWord = getRandom(vocabulary, 3).join(' ');
    wordBox.innerHTML = targetWord;
}

// fires every time a character is typed
typeBox.oninput = function() {
    if (typeBox.value == targetWord) {
        clockBox.innerText = `⏱ ${(Date.now() - timeTakenInMS) / 1000} sec`;
        targetWord = getRandom(vocabulary, 3).join(' ')
        wordBox.innerHTML = targetWord;
        typeBox.value = '';
        typeBox.style.borderColor = '';
        timeTakenInMS = undefined;
    } else {
        if (! timeTakenInMS) {
            timeTakenInMS = Date.now();
        }
        wordBox.innerHTML = '';
        let letterColor, letterHtml;
        var correctSoFar = true;
        for (let i=0; i<targetWord.length; i++) {
            if (i < typeBox.value.length) {
                if (typeBox.value[i] == targetWord[i] && correctSoFar == true) {
                    letterColor = 'var(--green)';
                    typeBox.style.backgroundColor = 'var(--light)';
                } else {
                    // as soon as there is an incorrect letter typed,
                    // the rest of the letters up till the length of
                    // entered chars should be red to show the mistake
                    letterColor = 'var(--red)';
                    correctSoFar = false;
                    typeBox.style.backgroundColor = 'var(--light-red)';
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