import Bun from "bun";

const input = Bun.file("input2.txt");

const contents = await input.text();

const lines = contents.split("\n");

let sum = 0
let powerSum = 0
lines.forEach((line) => {
    if (!line.includes('Game')) return

    const [gameLabel, roundsText] = line.split(':')
    const gameId = parseInt(gameLabel.split(' ')[1])

    const rounds = roundsText.split(/[;,]/)
    const parsedRounds = rounds.map(r => {
        r = r.trim()
        const [numStr, color] = r.split(' ')

        return { num: parseInt(numStr), color }
    })

    const redRounds = parsedRounds.filter(_ => _.color == 'red').map(_ => _.num)
    const maxRed = Math.max(0, ...redRounds)

    const greenRounds = parsedRounds.filter(_ => _.color == 'green').map(_ => _.num)
    const maxGreen = Math.max(0, ...greenRounds)

    const blueRounds = parsedRounds.filter(_ => _.color == 'blue').map(_ => _.num)
    const maxBlue = Math.max(0, ...blueRounds)

    const isValid = maxRed <= 12 && maxGreen <= 13 && maxBlue <= 14

    if (isValid) sum += gameId

    const power = maxRed * maxGreen * maxBlue
    powerSum += power

    console.log({ line, rounds, parsedRounds, gameId, isValid, power });
});

console.log({ sum, powerSum });
