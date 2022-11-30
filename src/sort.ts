import { ChineseNumberCompare, letterCompare, numberCompare, specSymbolCompare } from "./handler"

export function sortUtil<T = string>(list: T[], key?: keyof T): T[] {
    if(typeof list[0] !== 'string' && !key) return list
    if(list.length <= 1) return list
    list.sort((p: T, c: T) => {
        let prev, cur
        if(typeof p === 'string') {
            prev = p as string
            cur = c as string
        } else {
            prev = p[key!] as string
            cur = c[key!] as string
        }
        const len1 = prev.length
        const len2 = cur.length
        let s1 = 0
        let s2 = 0
        while(s1 < len1 && s2 < len2) {
            const str1 = prev[s1]
            const str2 = cur[s2]

            if(str1 !== str2) {
                const symbolRes = specSymbolCompare(str1, str2)
                if(symbolRes !== 0) {
                    return symbolRes
                }
            }

            const res2 = numberCompare({ index: s1, originalStr: prev }, { index: s2, originalStr: cur })
            if(res2 !== 0 && typeof res2 === 'number') {
                return res2
            } else if (res2 !== 0) {
                s1 += (res2 as {step: number}).step
                s2 += (res2 as {step: number}).step
                continue
            }

            const res = letterCompare(str1, str2)
            if(res !== 0)  {
                return res
            }

            const res3 = ChineseNumberCompare({ index: s1, originalStr: prev }, { index: s2, originalStr: cur })
            if(res3 !== 0 && typeof res3 === 'number') {
                return res3
            } else if (res3 !== 0) {
                s1 += (res3 as {step: number}).step
                s2 += (res3 as {step: number}).step
                continue
            }

            if(str1 === str2) {
                s1++
                s2++
                continue
            }
            // console.log(str1, str2, str1.localeCompare(str2, 'zh') )
            return str1.localeCompare(str2, 'zh') 
            // return str1 > str2 ? 1 : -1
        }
        return (len1 - s1) - (len2 - s2)
    })

    return list
}