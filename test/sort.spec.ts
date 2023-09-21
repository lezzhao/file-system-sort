import { describe, expect, it } from 'vitest'
import { sort } from '../src'
import { arr } from './fixture'

describe('sort', () => {
    it('test', () => {
        arr.map(a => sort(a))
        expect(arr).toMatchInlineSnapshot(`
          [
            [
              "01 电子教材_物态变化 温度 教材",
              "02 电子教材_熔化与凝固 教材",
              "03 电子教材_气化与液化 教材",
              "04 电子教材_升华与凝华 教材",
            ],
            [
              " 01 教学设计_物态变化 温度(第2课时)教案",
              "01 教学设计_物态变化 温度(第1课时)教案",
              "01 教学设计_物态变化 温度(第3课时)教案",
              "01 教学设计_物态变化 温度(第4课时)教案",
            ],
            [
              "第1节 物态变化 温度",
              "第2节 熔化与凝固",
              "第3节 气化和液化",
              "第4节 升华与凝华",
              "第5节 生活和技术中的舞物态变化",
            ],
            [
              "第01章 物态及其变化",
              "第02章 物态及其变化",
              "第03章 物态及其变化",
            ],
            [
              "GK Unit 1 Lesson 1",
              "GK Unit 1 Lesson 2",
              "GK Unit 1 Lesson 3",
              "GK Unit 1 Lesson 4",
            ],
            [
              "1",
              "1a",
              "1d",
              "ashi",
              "a比赛",
              "七上",
              "八下",
              "比赛",
              "第 二 章",
              "第一章",
              "第三章",
            ],
            [
              "七年级上册",
              "七年级中册",
              "七年级下册",
              "八年级上册",
              "八年级中册",
              "八年级下册",
            ],
            [
              "第一章 有理数",
              "第二章 整式的加减",
              "第三章 一元一次方程",
              "第四章 几何图形初步",
              "第十章 物理书",
              "第十一章 二元方程",
              "第二十章 三元方程",
              "第二十一章 三元方程",
              "第一百零一章 三元方程",
            ],
            [
              "1. 有理数",
              "2. 几何图形初步",
              "04. 4则运算",
              "5. 一元一次方程",
              "10. 整式的加减",
              "12. 物理书",
              "23. 二元方程",
              "103. 除法",
              "215 乘法",
            ],
            [
              "1.1 有理数",
              "1.2 几何图形初步",
              "1.4 4则运算",
              "1.5 一元一次方程",
              "1.10 整式的加减",
              "1.12 物理书",
              "1.23 二元方程",
            ],
            [
              "七上",
              "七中",
              "七下",
              "八上",
              "八中",
              "八下",
            ],
            [
              "1（2）",
              "1大视频",
              "2",
              "2分多",
              "test-776681",
            ],
          ]
        `)
    })


    it('test1', () => {
        const arr = ['1d', ' 比赛', '七上', '11', '1a', '十', '第一章', '八下', 'ashi', '第三章', '2十', '200', '第二章', '1', '0-1', 'a比赛', '101', '10']

        expect(sort(arr)).toMatchInlineSnapshot(`
          [
            " 比赛",
            "0-1",
            "1",
            "1a",
            "1d",
            "2十",
            "10",
            "11",
            "101",
            "200",
            "ashi",
            "a比赛",
            "七上",
            "八下",
            "十",
            "第一章",
            "第二章",
            "第三章",
          ]
        `)
    })

    it('test2', () => {
        const arr = [
            "2",
            "1（2）",
            "1大视频",
            "2分多",
            "test-776681",
        ]

        expect(sort(arr)).toMatchInlineSnapshot(`
          [
            "1（2）",
            "1大视频",
            "2",
            "2分多",
            "test-776681",
          ]
        `)
    })

    it('test3', () => {
        const arr = [
            'Abd', 'abc', 'acb',
        ]

        expect(sort(arr, { ignoreCase: true })).toMatchInlineSnapshot(`
          [
            "abc",
            "Abd",
            "acb",
          ]
        `)
    })

    it('test4', () => {
        const arr = [
            '1大视频', '1（2）', '.', '2', '2分多', 'test-776681', 'Abd', 'abc', 'acb', '-', '你们好', '大家好', '_', '+', '*', '%'
        ]

        expect(sort(arr, { ignoreCase: true })).toMatchInlineSnapshot(`
          [
            "_",
            "-",
            ".",
            "*",
            "%",
            "+",
            "1（2）",
            "1大视频",
            "2",
            "2分多",
            "abc",
            "Abd",
            "acb",
            "test-776681",
            "你们好",
            "大家好",
          ]
        `)
    })

    it('test5', () => {
        const arr = [
          "1（1）.jpg",
          "1.mp4",
          "001（1）.doc",
          '193930000',
          '19393ooo'
        ]

        expect(sort(arr, { ignoreCase: true })).toMatchInlineSnapshot(`
          [
            "1.mp4",
            "001（1）.doc",
            "1（1）.jpg",
            "19393ooo",
            "193930000",
          ]
        `)
    })
})