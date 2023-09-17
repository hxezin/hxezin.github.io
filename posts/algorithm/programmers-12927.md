---
title: '[프로그래머스/JavaScript] 야근 지수'
description: '프로그래머스 야근 지수 문제를 JavaScript로 해결합니다.'
date: '2023-09-09'
keyword: ['algorithm', 'JavaScript']
---

## 문제 출처

[[프로그래머스] 야근 지수](https://school.programmers.co.kr/learn/courses/30/lessons/12927)

## 문제 설명

회사원 Demi는 가끔은 야근을 하는데요, 야근을 하면 야근 피로도가 쌓입니다. 야근 피로도는 야근을 시작한 시점에서 남은 일의 작업량을 제곱하여 더한 값입니다. Demi는 N시간 동안 야근 피로도를 최소화하도록 일할 겁니다.Demi가 1시간 동안 작업량 1만큼을 처리할 수 있다고 할 때, 퇴근까지 남은 N 시간과 각 일에 대한 작업량 works에 대해 야근 피로도를 최소화한 값을 리턴하는 함수 solution을 완성해주세요.

### 제한 사항

- `works`는 길이 1 이상, 20,000 이하인 배열입니다.
- `works`의 원소는 50000 이하인 자연수입니다.
- `n`은 1,000,000 이하인 자연수입니다.

### 입출력 예

| works | n | result |
| --- | --- | --- |
| [4, 3, 3] | 4 | 12 |
| [2, 1, 2] | 1 | 6 |
| [1,1] | 3 | 0 |

### 입출력 예 설명

입출력 예 #1

n=4 일 때, 남은 일의 작업량이 [4, 3, 3] 이라면 야근 지수를 최소화하기 위해 4시간동안 일을 한 결과는 [2, 2, 2]입니다. 이 때 야근 지수는 22 + 22 + 22 = 12 입니다.

입출력 예 #2

n=1일 때, 남은 일의 작업량이 [2,1,2]라면 야근 지수를 최소화하기 위해 1시간동안 일을 한 결과는 [1,1,2]입니다. 야근지수는 12 + 12 + 22 = 6입니다.

입출력 예 #3

남은 작업량이 없으므로 피로도는 0입니다.

## 문제 풀이

작업량이 많은 일부터 차례대로 줄여가는 방식으로 야근을 최소화했습니다.

```jsx
function solution(n, works) {
    works.sort((a, b) => b - a);

    while (n > 0) {
        if (works[0] === 0) break;
        works[0] -= 1;
        n -= 1;
        works.sort((a, b) => b - a);
    }
    
    let answer = works.reduce((acc, val) => acc + val ** 2, 0);
    return answer;
}
```

주어진 작업량 배열 `works`를 내림차순으로 정렬한 후, 가장 작업량이 많은 일부터 하나씩 작업량을 감소시키는 방식으로 야근 피로도를 최소화했습니다. 각 작업량을 감소시킬 때마다 배열을 다시 정렬하고, 모든 작업이 완료되었을 때 반복문을 종료합니다.

![](230909.png)

그러나 위 코드는 효율성 테스트를 통과하지 못했습니다 🥲

```jsx
while (n > 0) {
		if (works[0] === 0) break;
	  works[0] -= 1;
    n -= 1;
    works.sort((a, b) => b - a);
}
```

`while` 루프에서 작업량을 하나 감소시킨 후에도 배열을 다시 정렬하면서 `O(n^2)`의 시간이 소요됩니다. 이 부분때문에 성능이 저하 됐다고 판단하고 아래 코드로 수정했습니다.

```jsx
function solution(n, works) {
    if (works.reduce((acc, val) => acc + val, 0) <= n) {
        return 0;
    }

    works.sort((a, b) => a - b);

    while (n > 0) {
        works[works.length - 1] -= 1;
        n -= 1;
        
        let i = works.length - 1;
        while (i > 0 && works[i] < works[i - 1]) {
            [works[i], works[i - 1]] = [works[i - 1], works[i]];
            i -= 1;
        }
    }

   let answer = works.reduce((acc, val) => acc + val ** 2, 0);
   return answer;
}
```

모든 작업을 처리할 수 있는 경우를 먼저 처리했습니다. 그리고 `works`를 오름차순으로 정렬 후 가장 작업량이 많은 일을 선택하여 작업량을 감소시켰습니다. 그 다음 앞의 요소와 비교해 작업량이 적은 일을 배열의 앞으로 이동시켜 오름차순 정렬을 유지하는 방법으로 해결했습니다. 시간 복잡도는 `O(nlogn)`으로 효율적으로 작동합니다.

![](230909-2.png)