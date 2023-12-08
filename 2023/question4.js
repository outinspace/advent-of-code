import Bun from "bun";

const input = Bun.file("input4.txt");
const contents = await input.text();
const lines = contents.split("\n");

let total = 0
lines.forEach((line, lineIndex) => {
    const cardNumbers = line.split(':')[1]

    if (!cardNumbers) return;

    let [winningNumbersStr, myNumbersStr] = cardNumbers.split('|')

    console.log({ winningNumbersStr, myNumbersStr })

    winningNumbersStr = winningNumbersStr.replaceAll(/\s+/g, ' ').trim()
    myNumbersStr = myNumbersStr.replaceAll(/\s+/g, ' ').trim()

    console.log({ winningNumbersStr, myNumbersStr })

    const winningNumbers = winningNumbersStr.split(' ').map(_ => parseInt(_))
    const myNumbers = myNumbersStr.split(' ').map(_ => parseInt(_))

    const winnersSet = new Set(winningNumbers)

    let score = 0;
    myNumbers.forEach(n => {
        if (winnersSet.has(n)) {
            if (score == 0) {
                score = 1
            } else {
                score = score * 2
            }
        }
    })

    total += score

    console.log({ line, winningNumbers, myNumbers, score, winningNumbersStr, myNumbersStr })

});

console.log({ total })
