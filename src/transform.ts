const relationMap:Record<string, number> = {
    "零": 0,

    "一": 1,
    "壹": 1,

    "二": 2,
    "贰": 2,

    "三": 3,
    "叁": 3,

    "四": 4,
    "肆": 4,

    "五": 5,
    "伍": 5,

    "六": 6,
    "陆": 6,

    "七": 7,
    "柒": 7,

    "八": 8,
    "捌": 8,

    "九": 9,
    "玖": 9,

    "十": 10,
    "拾": 10,

    "百": 100,
    "佰": 100,

    "千": 1000,
    "仟": 1000,

    "万": 10000,
    "十万": 100000,
    "百万": 1000000,
    "千万": 10000000,
    "亿": 100000000
};
const singularKeys = ['一', '壹', '二', '贰', '三', '叁', '四', '肆', '五', '伍', '六', '陆', '七', '柒', '八', '捌', '九', '玖']
const evenKeys = ['十', '拾', '百', '佰', '千', '仟', '万', '十万', '百万', '千万', '亿']
// handle continuous chinese zero
const cnZeroHandler = (str: string) => {
    while (str.startsWith('零')) {
        str = str.slice(1)
    }

    return str
}
// validate Chinese number string 
export const isValidChineseNumber = (s: string) => {
    return s && s.split('').every(i => singularKeys.includes(i) || evenKeys.includes(i))
}
/**
 * transform Chinese number to digit
 * @param str 
 * @returns number
 */
export function ChineseToDigit(str: string) {
    let target = str
    let len = target.length
    if (len === 0) return -1
    if (len === 1) return relationMap[target] <= 10 ? relationMap[target] : -1
    target = cnZeroHandler(target)
    len = target.length
    if (len === 0) return 0
    if (len === 1) return relationMap[target] <= 10 ? relationMap[target] : -1

    if(target.startsWith('十')) target = '一' + target

    let start = 0
    let result = 0
    while (start < len) {
        const s = target[start]
        if(s === '零') {
            if(target[start + 1] === '零') {
                return -1
            } else {
                start++
                continue
            }
        }
        if(singularKeys.includes(s)) {
            if(target[start + 1] && evenKeys.includes(target[start + 1])) {
                result = result + (relationMap[s] * relationMap[target[start + 1]])
                start = start + 2
                continue
            } else if(!target[start + 1])  {
                result = result + relationMap[s]
                start++
                continue
            } else {
                return -1
            }
        } else {
            return -1
        }
    }

    return result
}

