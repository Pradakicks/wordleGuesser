const fs = require('fs');
const { parse } = require('path');
let words = fs.readFileSync("./short_freqs.txt", "utf8");
// let words = fs.readFileSync("./long_freqs.txt", "utf8");
let wordList = words.split("\n");

function swap(arr, xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}
  
// An optimized version of Bubble Sort
async function bubbleSort( arr, n)
{
var i, j;
for (i = 0; i < n-1; i++)
{
    for (j = 0; j < n-i-1; j++)
    {
        let word = arr[j].split(" ")[0]
        let num = arr[j].split(" ")[1]

        let word1 = arr[j + 1].split(" ")[0]
        let num1 = arr[j+ 1].split(" ")[1]
        if (parseFloat(num) < parseFloat(num1))
        {
        swap(arr,j,j+1);
        }
    }
  
}
return
// fs.writeFileSync("./NewList.txt", JSON.)
}


 async function checkNewWordList(currentWords, probWordList){
     if(probWordList){
         wordList = probWordList;
     }
    let newArr = [];
    let newArrFine = [];
    for(const currentWord of currentWords){
        let index = wordList.findIndex(word => word.includes(currentWord))
        if(index > -1){
            newArr.push(wordList[index])
            newArrFine.push(wordList[index])
        }
    }
    await bubbleSort(newArr, newArr.length)
    if(newArr.length == 0){
        console.log(newArrFine)
    } else {
        console.log(newArr)
    }
    return newArr;
}

module.exports = checkNewWordList
