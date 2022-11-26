import { numberDigit } from "./a"

const record: Record<string, number> = {
    零: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10,
    百: 100,
    千: 1000,
    万: 10000,
    亿: 100000000,
}

const isNumber = (s: string) => /\d/.test(s)
const isLetter = (s: string) => /[a-z]/.test(s)

const getContinuousNumber = (start: number, originalStr: string) => {
    let index = start
    while(isNumber(originalStr[index])) {
        index++
    }
    
    let result = originalStr.slice(start, index)
    let length = index - start
    if(Number(result) === 0) {
        result = originalStr[start]
        length = 0
    }

    if(index === start) {
        const { result: res, length: len1 } = chineseNumberHandler(start, originalStr)
        result = res
        length = len1
    }

    return {
        length,
        result
    }
}

const chineseNumberHandler = (start: number, originalStr: string) => {
    const chineseNumber = Object.keys(record)
    let index = start
    while(chineseNumber.includes(originalStr[index])) {
        index++
    }
    
    let result = originalStr.slice(start, index === start ? 1 : index)

    return {
        length: index - start,
        result
    }
}

const checkIsIncludeChineseNumber = (s: string) => {
    const chineseNumber = Object.keys(record)
    return s.split('').some(i => chineseNumber.includes(i))
}

const chineseNumberCompare = (a: string, b: string) => {
    if(!checkIsIncludeChineseNumber(a) || !checkIsIncludeChineseNumber(b)) return null
    const condition = Math.min(a.length, b.length)
    const num1 = numberDigit(a)
    const num2 = numberDigit(b)
    
    
    return num1 - num2
}

const sortHandler = (prev: string, cur: string) => {
    const len1 = prev.length
    const len2 = cur.length
    let start1 = 0
    let start2 = 0

    const chineseNumber = Object.keys(record)

    while(start1 < len1 && start2 < len2) {
        const { result: str1, length: step1 } = getContinuousNumber(start1, prev)
        const { result: str2, length: step2 } = getContinuousNumber(start2, cur)

        const res = chineseNumberCompare(str1, str2)
        if(res!==null && res !== 0) return res
        if(str1 === str2) {
            start1 += (step1 + 1)
            start2 += (step2 + 1)
            continue
        }

        if (isNumber(str1) && isNumber(str2)) {
            return Number(str1) - Number(str2)
        } else if (isNumber(str1)) {
            return -1
        } else if (isNumber(str2)) {
            return 1
        } else {if(chineseNumber.includes(str1) && chineseNumber.includes(str2)) {
                return record[str1] - record[str2]
            } else {
                    return str1 > str2 ? 1 : -1
            }
        }
    }
    return (len1 - start1) - (len2 - start2)
}

export function sortUtil(list: string[], key?: string) {

    list.sort(sortHandler)

    return list
}