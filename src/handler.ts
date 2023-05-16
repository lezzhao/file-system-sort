import { ChineseToDigit, isValidChineseNumber } from "./transform"
import { CompareInfo } from "./type"

// regexp for mathc continuous number
const numberRe = /\d+/
const notNumberRe = /\D/
// check str whether is valid number string
export const isNumber = (s: string) => numberRe.test(s)
// number compare handler
export const numberCompare = (prev: CompareInfo, cur: CompareInfo) => {
    console.log(prev, cur)
    const prevStr = prev.originalStr.slice(prev.index)
    const curStr = cur.originalStr.slice(cur.index)
    if (isNumber(prevStr[0]) && isNumber(curStr[0])) {
        const res1 = prevStr.match(numberRe)
        const res2 = curStr.match(numberRe)

        const l1 = res1![0]!.length
        const l2 = res2![0]!.length
        console.log(l1, l2, res1, res2);
        
        if (res1![0] === res2![0]) {
            return { step: l1 }
        } else {
            // judge whether is pure number，if it is, sotr before
            if(!notNumberRe.test(prev.originalStr) && notNumberRe.test(cur.originalStr)) {
                return -1
            } 
              if(!notNumberRe.test(cur.originalStr) && notNumberRe.test(prev.originalStr)) {
                return 1
            }
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

const isLetter = (s: string) => /[a-zA-Z]/.test(s)
export const letterCompare = (p: string, c: string) => {
    if (isLetter(p) && isLetter(c)) {
        return p.localeCompare(c)
    } else if (isLetter(p)) {
        return -1
    } else if (isLetter(c)) {
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

// handler special character, space has highest weight, others is lowest
const isSpecialCharacter = /[^\u4e00-\u9fa5A-Za-z0-9]/
const isSpace= /\s/
export const specialCharacterCompare = (p: string, c: string) => {
    if (isSpace.test(p)) {
        return -1
    }
    if (isSpace.test(c)) {
        return 1
    }
    if (isSpecialCharacter.test(p) && isSpecialCharacter.test(c)) {
        return p > c ? 1 : -1
    } else if (isSpecialCharacter.test(p)) {
        return 1
    } else if (isSpecialCharacter.test(c)) {
        return -1
    } else {
        return 0
    }
}