import Bun from "bun";

const input = Bun.file("input3.txt");
const contents = await input.text();
const lines = contents.split("\n");

const allNumbers = []

lines.forEach((line, lineIndex) => {
    const numbers = [...line.matchAll(/\d+/g)]
    numbers.forEach(match => {
        console.log({ match }, match.index)

        allNumbers.push({
            string: match[0],
            number: parseInt(match[0]),
            y1: lineIndex,
            x1: match.index
        })
    })
});

const containsSymbol = (x1, x2, y) => {
    const line = lines[y] ?? ''
    const string = line.substring(x1, x2)

    const isMatch = string.match(/[^.\d]/) !== null
}

const getAdjacentSymbol = ({ string, x1, y1 }) => {
    const x2 = x1 + string.length - 1 // TODO

    const isAdjacent = containsSymbol(x1 - 1, x1, y1)
        || containsSymbol(x2 + 1, x2 + 2, y1)
        || containsSymbol(x1 - 1, x2 + 2, y1 - 1)
        || containsSymbol(x1 - 1, x2 + 2, y1 + 1)

    console.log({ string, isAdjacent, x1, x2, y1 })

    return isAdjacent
}


const goodNumbers = allNumbers.filter(x => {
    const adjacent = getAdjacentSymbol(x);

    return adjacent;
});
console.log({ allNumbers })

let sum = 0
goodNumbers.forEach(_ => sum += _.number)

console.log({ sum })
