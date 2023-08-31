// regexp for mathc continuous number
const numberRe = /\d+/
// check str whether is valid number string
export const isDigit = (s: string) => numberRe.test(s)
export const singleDigitComparator = (p: string, c: string) => {
    if (isDigit(p) && isDigit(c)) {
        return Number(p) > Number(c) ? 1: -1
    } else if (isDigit(p)) {
        return -1
    } else if (isDigit(c)) {
        return 1
    } else {
        return 0
    }
}