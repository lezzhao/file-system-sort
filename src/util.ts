export const isString = (s: any) => typeof s === 'string'


export function findDiffIndex(p: string, c: string) {
    const l1 = p.length
    const l2 = c.length
    const stop_condition = Math.min(l1,l2)
    for(let i = 0; i <= stop_condition; i++) {
        if(p[i] !== c[i]) {
            return i
        }
    }
    return l1 === l2 ? l1 : stop_condition
}



const specialChar = ['上', '中', '下']
export function processComparator(options: {
    comparators: Array<(p: string, c: string) => number>,
    params: [string, string]
}) {
    const { comparators, params } = options
    const [p, c] = params
    for(let i = 0; i < comparators.length; i++) {
        const res = comparators[i](p, c)
        if(res !== 0) {
            return res
        }
    }

    if(specialChar.includes(p) && specialChar.includes(c)) {
        return specialChar.indexOf(p) - specialChar.indexOf(c)
    }

    return p.localeCompare(c)
}



function transformNumber(str: string) {
    const res = str.matchAll(/\d+/g)
    const arr = []
    if(res) {
        for(const match of res) {
            arr.push(match[0])
        }
    }

    return arr
}
export function handleStr(p: string, c: string) {
    const arr1 = transformNumber(p)
    const arr2 = transformNumber(c)
    const len = Math.max(arr1.length, arr2.length)
    const map: Record<string, string> = {}
    for(let i= 0; i < len; i++) {
        if(arr1[i] && arr2[i]) {
            const isPrev = Number(arr1[i]) > Number(arr2[i])
            map[arr1[i]] = isPrev ? '1' : '0'
            map[arr2[i]] = isPrev ? '0' : '1'
        } else if(arr1[i]) {
            map[arr1[i]] = '1'
        } else {
            map[arr2[i]] = '1'
        }
    }

    const _p = p.replaceAll(/\d+/g, (k) => map[k])
    const _c = c.replaceAll(/\d+/g, (k) => map[k])
    return [_p, _c]
}