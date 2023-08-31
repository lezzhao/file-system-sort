import { ChineseToDigit, isValidChineseNumber } from "../transform"

// get continuous chinese number string
export const getContinuousChineseNumber = (start: number, originalStr: string) => {
    let index = start
    while (isValidChineseNumber(originalStr[index])) {
        index++
    }

    let result = originalStr.slice(start, index === start ? 1 : index)

    return result
}
export const singleChineseNumberComparator = (prev: string, cur: string) => {
    if (isValidChineseNumber(prev) && isValidChineseNumber(cur)) {
        const p1 = ChineseToDigit(prev)
        const p2 = ChineseToDigit(cur)

        return p1 > p2 ? 1 : -1
    } else {
        return 0
    }

}



