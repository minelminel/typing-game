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

var wordCountDefault = 4;
var wordCountPreference = localStorage.getItem('wordCountPreference') | wordCountDefault;
// this is where the prompt text is displayed
var wordBox = document.getElementById('wordbox');
// keep track of the `wordBox` word separately for doing the comparison
let targetWord;
// keep track of time from first typed letter to correct entry
let timeTakenInMS;
var clockBox = document.getElementById('clockbox');
var speedBox = document.getElementById('speedbox');
// this is where the user enters their text
var typeBox = document.getElementById('typebox');
// figure out how many words to display
var rangeSlider = document.getElementById('rangeSlider');
var wordCount = document.getElementById('wordCountLabel');
rangeSlider.oninput = function() {
    wordCountPreference = rangeSlider.value;
    wordCount.innerText = wordCountPreference;
    localStorage.setItem('wordCountPreference', wordCountPreference);
    // update the prompt without reloading
    targetWord = getRandom(vocabulary, wordCountPreference).join(' ');
    wordBox.innerHTML = targetWord;
}

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
    rangeSlider.value = wordCountPreference;
    wordCount.innerText = rangeSlider.value;
    typeBox.focus();
    targetWord = getRandom(vocabulary, rangeSlider.value).join(' ');
    wordBox.innerHTML = targetWord;
}

// fires every time a character is typed
typeBox.oninput = function() {
    if (typeBox.value == targetWord) {
        // calculate the WPM
        var timeTaken = (Date.now() - timeTakenInMS) / 1000;
        var numberOfEquivalentWords = targetWord.length / 5;
        var WPM = Math.round(numberOfEquivalentWords / (timeTaken / 60), 1);
        clockBox.innerText = `⏱ ${timeTaken} sec`;
        speedBox.innerText = `📊 ${WPM} WPM`;
        targetWord = getRandom(vocabulary, wordCountPreference).join(' ')
        wordBox.innerHTML = targetWord;
        typeBox.value = '';
        typeBox.style.borderColor = '';
        timeTakenInMS = undefined;
    } else {
        if (! timeTakenInMS) {
            timeTakenInMS = Date.now();
        }
        var correctSoFar = true;
        for (let i=0; i<targetWord.length; i++) {
            if (i < typeBox.value.length) {
                if (typeBox.value[i] == targetWord[i] && correctSoFar == true) {
                    typeBox.style.backgroundColor = 'var(--light)';
                } else {
                    correctSoFar = false;
                    typeBox.style.backgroundColor = 'var(--light-red)';
                }
            }
        }
    }
}