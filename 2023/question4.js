import Bun from "bun";

const input = Bun.file("input4.txt");
const contents = await input.text();
const lines = contents.split("\n");

let scores = []
let total = 0
lines.forEach((line, lineIndex) => {
    const cardNumbers = line.split(':')[1]

    if (!cardNumbers) return;

    let [winningNumbersStr, myNumbersStr] = cardNumbers.split('|')

    // console.log({ winningNumbersStr, myNumbersStr })

    winningNumbersStr = winningNumbersStr.replaceAll(/\s+/g, ' ').trim()
    myNumbersStr = myNumbersStr.replaceAll(/\s+/g, ' ').trim()

    // console.log({ winningNumbersStr, myNumbersStr })

    const winningNumbers = winningNumbersStr.split(' ').map(_ => parseInt(_))
    const myNumbers = myNumbersStr.split(' ').map(_ => parseInt(_))

    const winnersSet = new Set(winningNumbers)

    let score = 0;
    let matchingNumbers = 0
    myNumbers.forEach(n => {
        if (winnersSet.has(n)) {
            matchingNumbers++
            if (score == 0) {
                score = 1
            } else {
                score = score * 2
            }
        }
    })

    total += score

    console.log({ line, winningNumbers, myNumbers, score, winningNumbersStr, myNumbersStr })

    scores.push({
        cardId: lineIndex + 1,
        matches: matchingNumbers,
        copies: 1
    })
});

console.log({ scores })

scores.forEach((score, i) => {
    console.log('Processing card ', i + 1)
    console.log('Found ', score.matches, ' matches')
    for (let j = 0; j < score.matches; j++) {
        const copiedCard = scores[i + j + 1]
        if (copiedCard) {
            console.log('    Making', score.matches, 'copies of card', copiedCard.cardId)
            copiedCard.copies = copiedCard.copies + score.copies
        }
    }
})

console.log({ scores })
// console.log({ scores })

// let totalCards = scores.length
let totalCards = 0 //scores.length
scores.forEach(_ => totalCards += _.copies)

console.log({ totalCards })
