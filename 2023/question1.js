import Bun from 'bun'

const input = Bun.file('input1.txt')

const contents = await input.text()

const lines = contents.split('\n')

let sum = 0;
lines.forEach(originalLine => {
    let line = originalLine

    line = line.replaceAll('one', 'o1e')
    line = line.replaceAll('two', 't2o')
    line = line.replaceAll('three', 't3e')
    line = line.replaceAll('four', 'f4r')
    line = line.replaceAll('five', 'f5e')
    line = line.replaceAll('six', 's6x')
    line = line.replaceAll('seven', 's7n')
    line = line.replaceAll('eight', 'e8t')
    line = line.replaceAll('nine', 'n9e')

    const digits = line.replaceAll(/\D/g, '')
    const num = digits[0] + digits[digits.length - 1]
    const parsedNum = parseInt(num)
    console.log({ originalLine, line, digits, num, parsedNum })
    if (!isNaN(parsedNum))
        sum += parsedNum
})

console.log({ sum })
