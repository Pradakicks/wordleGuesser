const fs = require('fs');
const prompt = require('prompt-sync')();
const checkNew = require('./helper')


// Normal
// let words = fs.readFileSync("./allowed_words.txt", "utf8");

// Somewhat Cheating
// let words = fs.readFileSync("./possible_words.txt", "utf8");

// Cheating
let words = fs.readFileSync("./bestWords.txt", "utf8");


let wordList = words.split("\n");
let probWordList = false;
let hidden = {
    hiddenWord : ['','','','','',],
    knownLettersNotPos : {},
    lettersInWord : [],
    lettersNotInWord : []
}
async function calculateWords(currentWord){
    let newList = []
    const response = prompt('Response? ');
    for(let i = 0; i < 5; i++) {
        if(response[i] == "r"){
            hidden.hiddenWord[i] = currentWord[i]
            if(!hidden.knownLettersNotPos[currentWord[i]]) {
                hidden.knownLettersNotPos[currentWord[i]] = ['o','o','o','o','o']
            }
            hidden.knownLettersNotPos[currentWord[i]][i] = "x"
        } else if (response[i] == "b" || response[i] == "y"){
            hidden.lettersInWord.push(currentWord[i])
            if(!hidden.knownLettersNotPos[currentWord[i]]) {
                hidden.knownLettersNotPos[currentWord[i]] = ['x','x','x','x','x']
            }
            hidden.knownLettersNotPos[currentWord[i]][i] = "o"
        } else if(response[i] === "g"){
            if(!hidden.lettersInWord.includes(currentWord[i]) && !hidden.hiddenWord.includes(currentWord[i])){
                hidden.lettersNotInWord.push(currentWord[i])
            } else {
                hidden.knownLettersNotPos[currentWord[i]][i] = "o"
            }
        }
    }
    // console.log(hidden)
    let isPresentLetter = false;
    for(let i = 0; i < 5; i++){
        if(hidden.hiddenWord[i]){
            isPresentLetter = true;
            break;
        }
   }
//    console.log(isPresentLetter);
   for(const word of wordList){
    fitCriteria = true;
    if(isPresentLetter){
        for(let i = 0; i < 5; i++){
            if(hidden.hiddenWord[i]){
                if(hidden.hiddenWord[i] != word[i]){
                    fitCriteria = false
                }
            }
       }

       if(!fitCriteria){
           continue;
       }
    }
    let doesIncludeLetters = await checkLettersInWord(word);
    let doesNotIncludeLetters = await checkLettersNotInWord(word);
    let doesNotHaveInIndex = await checkPosIndex(word);
    // console.log(doesIncludeLetters, doesNotIncludeLetters, doesNotHaveInIndex)
       if(doesIncludeLetters && doesNotIncludeLetters && doesNotHaveInIndex){
            newList.push(word)
       }
   }
 

    // console.log(newList.length)
    wordList = newList
} 

async function checkLettersInWord(word){
    let doesIncludeLetters = true;
    if(hidden.lettersInWord.length > 0){
        hidden.lettersInWord.forEach(letterInWord => {
            if(!word.includes(letterInWord)){
                doesIncludeLetters = false;
            }
        })
    }
    return doesIncludeLetters;
}

async function checkLettersNotInWord(word){
    let doesNotIncludeLetters = true;
    if (hidden.lettersNotInWord.length > 0){
        hidden.lettersNotInWord.forEach(letterNotInWord => {
            if(word.includes(letterNotInWord)){
                doesNotIncludeLetters = false;
                // console.log(word, letterNotInWord)
            }
        })
    }
    return doesNotIncludeLetters;
};
async function checkPosIndex(word){
    let doesNotHaveInIndex = true;
    let keys = Object.keys(hidden.knownLettersNotPos)
    keys.forEach(key => {
        let letterPos = hidden.knownLettersNotPos[key]
        for(let i = 0; i < 5; i++){
            let posMarked = letterPos[i]
            if(posMarked == "o" && word[i] == key){
                // console.log(word, key, letterPos)
                doesNotHaveInIndex = false;
            }  
        }
          
    })   
    // console.log(word, doesNotHaveInIndex)
    return doesNotHaveInIndex;
};

(async () =>{
    let isFinished = 0
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
    while(isFinished < 6){
        const response = prompt('Word = ');
        let currentWord = response
        if(currentWord.length < 5){
            isFinished += 6
            return;
        }
        await calculateWords(currentWord)
        probWordList = await checkNew(wordList, probWordList);
        // console.log(probWordList.length, wordList.length)
        if(!probWordList.length > 0 ){
            console.log(wordList);
        }
      isFinished++
    }
})()



