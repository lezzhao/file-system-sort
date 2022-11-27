import { ChineseToDigit, isValidChineseNumber } from "./transform"

interface CompareInfo {
    index: number
    originalStr: string
}
// handler space， space has highest weight
export const specSymbolCompare = (str1: string, str2: string) => {
    if (str1 === ' ') {
        return -1
    }
    if (str2 === ' ') {
        return 1
    }
    return 0
}
// regexp for mathc continuous number
const numberRe = /\d+/
// check str whether is valid number string
export const isNumber = (s: string) => numberRe.test(s)
// number compare handler
export const numberCompare = (prev: CompareInfo, cur: CompareInfo) => {
    const prevStr = prev.originalStr.slice(prev.index)
    const curStr = cur.originalStr.slice(cur.index)
    if (isNumber(prevStr[0]) && isNumber(curStr[0])) {
        const res1 = prevStr.match(numberRe)
        const res2 = curStr.match(numberRe)

        const l1 = res1![0]!.length
        const l2 = res2![0]!.length

        if (res1![0] === res2![0]) {
            return { step: l1 }
        } else {
            // judge whether is pure number，if it is, sotr before
            if(l1 + prev.index >= prev.originalStr.length && l2+ cur.index < cur.originalStr.length) return -1
            if(l2+ cur.index >= cur.originalStr.length && l1 + prev.index < prev.originalStr.length) return 1
            return Number(res1![0]) - Number(res2![0])
        }
    } else if (isNumber(prevStr[0])) {
        return -1
    } else if (isNumber(curStr[0])) {
        return 1
    } else {
        return 0
    }
}
// get continuous chinese number string
const getContinuousChineseNumber = (start: number, originalStr: string) => {
    let index = start
    while (isValidChineseNumber(originalStr[index])) {
        index++
    }

    let result = originalStr.slice(start, index === start ? 1 : index)

    return result
}
// chinese number compare handler
export const ChineseNumberCompare = (prev: CompareInfo, cur: CompareInfo) => {
    const prevStr = getContinuousChineseNumber(prev.index, prev.originalStr)
    const curStr = getContinuousChineseNumber(cur.index, cur.originalStr)
    if (!isValidChineseNumber(prevStr) || !isValidChineseNumber(curStr)) return 0

    const p1 = ChineseToDigit(prevStr)
    const p2 = ChineseToDigit(curStr)

    return p1 - p2 === 0 ? { step: prevStr.length + 1 } : p1 - p2
}