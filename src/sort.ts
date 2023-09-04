import {  alphabetComparator, getContinuousChineseNumber, singleChineseNumberComparator, singleDigitComparator, specialCharacterComparator } from "./comparator"
import { isValidChineseNumber } from "./transform"
import { SortOptions } from "./type"
import { findDiffIndex, handleStr, isString, processComparator } from "./util"


export function sort<T = string>(source: T[], options?: SortOptions<T>): T[] {
    if(source.length <= 1) return source
    return source.sort((p: T, c: T) => {
        let prev = isString(p) ? p as string : p[options?.key!] as string
        let cur = isString(c) ? c as string : c[options?.key!] as string
        if(options?.ignoreCase) {
            prev = prev.toLowerCase()
            cur = cur.toLowerCase()
        }
        return sortHandler(prev, cur)
    })
}

function sortHandler(p: string, c: string) {
    const [_p, _c] = handleStr(p, c)
    const index = findDiffIndex(_p, _c)
    
    let compareP = _p.slice(index, index + 1)
    let compareC = _c.slice(index, index + 1)
    if(index !== 0) { 
        const a = _p.slice(index - 1, index)
        const b = _c.slice(index - 1, index)
        if(isValidChineseNumber(a) && isValidChineseNumber(b)) {
            if(isValidChineseNumber(compareP) && !isValidChineseNumber(compareC)) {
                return 1
            } else if(!isValidChineseNumber(compareP) && isValidChineseNumber(compareC)) {
                return -1
            }
        }
    }
    if(isValidChineseNumber(compareP) && isValidChineseNumber(compareC)) {
        compareP = getContinuousChineseNumber(index, _p) 
        compareC = getContinuousChineseNumber(index, _c)
    }
    return processComparator({
        comparators: [ specialCharacterComparator, singleDigitComparator, alphabetComparator, singleChineseNumberComparator ],
        params: [compareP, compareC]
    })
}