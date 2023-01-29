
// regexp match alphabet
const isAlphabet = (s: string) => /[a-zA-Z]/.test(s)

export const alphabetComparator = (p: string, c: string) => {
    if (isAlphabet(p) && isAlphabet(c)) {
        return p.localeCompare(c)
    } else if (isAlphabet(p)) {
        return -1
    } else if (isAlphabet(c)) {
        return 1
    } else {
        return 0
    }
}