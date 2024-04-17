## A sort tool similar to a file system 

* support transforming Chinese Number string to digit

<br>

### Install

<br>

```shell
npm install file-system-sort
```

### Example
<br>

```Typescript
import { sort } from 'file-system-sort'

const arr = ['1d', '七上', '11', '1a', '十', '八下', 'ashi', '2十', '200', '1', '0-1', 'a比赛', '101', '10']

sort(arr) // ["0-1","1","1a","1d","2十","10","11","101","200","ashi","a比赛","七上","八下","十"]
```