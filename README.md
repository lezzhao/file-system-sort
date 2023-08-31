## a tools of sort and transform Chinese Number string to digit

### Install

```shell
npm install unplugin-sort-string
```

### Example

```Typescript
import { sort } from 'unplugin-sort-string'

const arr = ['1d', '七上', '11', '1a', '十', '八下', 'ashi', '2十', '200', '1', '0-1', 'a比赛', '101', '10']

sortUtil(arr) // ["0-1","1","1a","1d","2十","10","11","101","200","ashi","a比赛","七上","八下","十"]
```