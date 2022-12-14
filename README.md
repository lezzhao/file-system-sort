## a tools of sort and transform Chinese Number string to digit

### Install

```shell
npm install unplugin-sort-string
```

### Example

```Typescript
import { sortUtil } from 'unplugin-sort-string'

const arr = [
    "1d",
    "101",
    "2十",
    "1",
    "10",
    "11",
    "1a",
    "200",
    "ashi"
]

sortUtil(arr) // ["1","10","11","101","200","1a","1d","2十","ashi"]
```