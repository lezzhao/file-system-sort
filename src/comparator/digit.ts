import { CompareInfo } from "../type"

// regexp for mathc continuous number
const numberRe = /\d+/
// check str whether is valid number string
export const isDigit = (s: string) => numberRe.test(s)
// number compare handler
export const digitComparator = (prev: CompareInfo, cur: CompareInfo) => {
    const prevStr = prev.originalStr.slice(prev.index)
    const curStr = cur.originalStr.slice(cur.index)
    if (isDigit(prevStr[0]) && isDigit(curStr[0])) {
        const res1 = prevStr.match(numberRe)
        const res2 = curStr.match(numberRe)

        const l1 = res1![0]!.length
        const l2 = res2![0]!.length

        if (res1![0] === res2![0]) {
            return { step: l1 }
        } else {
            // judge whether is pure number，if it is, sort before
            if (l1 + prev.index >= prev.originalStr.length && l2 + cur.index < cur.originalStr.length) return -1
            if (l2 + cur.index >= cur.originalStr.length && l1 + prev.index < prev.originalStr.length) return 1
            return Number(res1![0]) - Number(res2![0])
        }
    } else if (isDigit(prevStr[0])) {
        return -1
    } else if (isDigit(curStr[0])) {
        return 1
    } else {
        return 0
    }
}