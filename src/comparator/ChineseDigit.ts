import { ChineseToDigit, isValidChineseNumber } from "../transform"
import { CompareInfo } from "../type"

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
export const ChineseNumberComparator = (prev: CompareInfo, cur: CompareInfo) => {
    const prevStr = getContinuousChineseNumber(prev.index, prev.originalStr)
    const curStr = getContinuousChineseNumber(cur.index, cur.originalStr)
    if (isValidChineseNumber(prevStr) && isValidChineseNumber(curStr)) {
        const p1 = ChineseToDigit(prevStr)
        const p2 = ChineseToDigit(curStr)

        return p1 - p2 === 0 ? { step: prevStr.length } : p1 - p2
    } else if (isValidChineseNumber(prevStr)) {
        return -1
    } else if (isValidChineseNumber(curStr)) {
        return 1
    } else {
        return 0
    }

}
