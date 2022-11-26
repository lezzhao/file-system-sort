import { expect, it } from 'vitest'
import { ChineseToDigit } from '../src/transform'
import { transformArr } from './fixture'

it('chinese', () => {
    const res = transformArr.map(a => ChineseToDigit(a))
    expect(res).toMatchInlineSnapshot(`
      [
        100,
        101,
        10,
        210,
        309,
        5005,
        90,
        11005,
        -1,
        -1,
      ]
    `)
})
