---
title: '리액트로 별점 기능 구현하기'
description: 'React를 사용하여 별점 기능을 구현합니다.'
date: '2022-10-05'
category: '개발'
tags: ['React']
---

## 요구사항

- 사용자에게 별 모양의 아이콘을 통해 별점을 시각적으로 표시합니다.
- 사용자가 별점을 클릭하여 평가할 수 있습니다.
- 사용자가 클릭한 점수의 데이터를 구할 수 있습니다.

## 구현하기

먼저 길이가 5인 더미 배열을 렌더링합니다. 저는 `react-icons`를 사용해서 별 아이콘을 불러왔습니다.

```js
import { FaStar } from 'react-icons/fa'

const STARS = [0, 1, 2, 3, 4]

function App() {
  return (
    <div className="App">
      {STARS.map((star, index) => {
        return <FaStar key={index} size="30" />
      })}
    </div>
  )
}
```

![](221005.png)

`useState`를 사용하여 클릭 상태를 state에 저장합니다. 만약 세번째 별을 클릭했을 때 `clicked` 값이 [true, true, true, false, false]로 바뀌도록 이벤트 함수를 구현했습니다.

```js
const [clicked, setClicked] = useState([false, false, false, false, false])

const handleClickStar = clickedIndex => {
  const clickStates = [...clicked]
  for (let index = 0; index < 5; index++) {
    // 별 전체 index를 돌면서 클릭한 별의 index보다 작거나 같으면 true를 할당합니다.
    clickStates[index] = index <= clickedIndex ? true : false
  }
  setClicked(clickStates)
}
```

구현한 함수를 onClick 핸들러에 연결해 줍니다.

```js
{
  STARS.map((star, index) => {
    return (
      <FaStar key={index} onClick={() => starClickHandler(index)} />
    )
  })
}
```

선택된 별을 시각적으로 보여주기 위해, className을 조건부로 설정해줍니다.

```css
.click {
  color: gold;
}
```

```js
STARS.map((star, index) => {
  return (
    <FaStar
      key={index}
      onClick={() => starClickHandler(index)}
      className={clicked[index] ? 'click' : ''}
    />
  )
})
```

별점에 대한 데이터가 필요하면 filter를 이용해서 true 값을 가진 state의 길이만 반환하면 됩니다.

```js
const score = clicked.filter(Boolean).length
```

![](221005-2.gif)
