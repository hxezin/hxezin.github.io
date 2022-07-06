---
title: "Styled Components"
date: 2022-07-03 18:06:00 +/- 0900
categories: [Frontend, React]
tags: [react] # TAG는 반드시 소문자로 이루어져야함!
---

# Styled Components

---

- `CSS in JS`라는 개념이 대두되면서 나온 라이브러리로, CSS도 쉽게 JavaScript 안에 넣어줄 수 있으므로, HTML + JS + CSS까지 묶어서 하나의 JS파일 안에서 컴포넌트 단위로 개발할 수 있게 됐다.

<br /><br /><br /><br />

# Styled Components 설치하기

---

- 터미널에서 Styled Componenets 라이브러리 설치

  ```bash
  # with npm
  $ npm install --save styled-components

  # with yarn
  $ yarn add styled-components
  ```

<br />

- Styled Components 임포트
  ```jsx
  import styled from "styled-components";
  ```

<br /><br /><br /><br />

# Styled Components 문법

---

## 1. 컴포넌트 만들기

- `Template Literals`를 사용한다.
- 컴포넌트를 선언한 후 `styled.태그종류`를 할당하고, 백틱 안에 기존 CSS 문법과 똑같이 스타일 속성을 작성해주면 된다.

  ```jsx
  const 컴포넌트 = styled.태그종류`
    css속성1: 속성값;
    css속성2: 속성값;
  `;
  ```

    <br />
    
    ```jsx
    import styled from "styled-components";
    
    const Button = styled.button`
      color: black;
      background: white;
    
      &:hover{
        background: lightgray;
      }
    `;
    
    export default function App() {
      return <Button>Button</Button>
    }
    ```

  ![img](/assets/img/blog/Style_Components.png)

  - 가상선택자의 경우 `&` 기호를 사용한다.
    → 여기서 &는 `button`을 참조한다.

    <br />

  ![img](/assets/img/blog/Style_Components5.png)

  - 개발자 도구로 Styled Component가 동적으로 생성한 class를 확인할 수 있다.
    Styled Component가 생성한 모든 클래스는 `고유한 이름`을 갖기 때문에 중복될 일이 없어 다른 컴포넌트에 영향을 주지 않는다.

<br /><br />

## 2. 컴포넌트 재활용하기

- 이미 만들어진 컴포넌트를 재활용해서 새로운 컴포넌트를 만들 수 있다.
- 컴포넌트를 선언하고 styled()에 재활용할 컴포넌트를 전달해준 다음, 추가하고 싶은 스타일 속성을 작성해주면 된다.

  ```jsx
  const 컴포넌트 = styled(재활용할 컴포넌트)`
  	추가할 CSS속성1: 속성값;
  	추가할 CSS속성2: 속성값;
  `
  ```

    <br />

  ```jsx
  import styled from "styled-components";

  const Button = styled.button`
    color: black;
    background: white;

    &:hover {
      background: lightgray;
    }
  `;

  // 만들어진 컴포넌트를 재활용해 새로운 컴포넌트를 만들 수 있다.
  const BigBlueButton = styled(Button)`
    background: blue;
    color: white;
    padding: 10px;
    margin-top: 10px;
  `;

  // 재활용한 컴포넌트를 다시 재활용할 수도 있다.
  const BigRedButton = styled(BigBlueButton)`
    background-color: red;
  `;

  export default function App() {
    return (
      <>
        <Button>Button</Button>
        <br />
        <BigBlueButton>Big Blue Button</BigBlueButton>
        <br />
        <BigRedButton>Big Red Button</BigRedButton>
      </>
    );
  }
  ```

  ![img](/assets/img/blog/Style_Components2.png)

<br /><br />

## 3. Props 활용하기

- Styled Component로 만든 컴포넌트도 props로 내려줄 수 있다. 내려준 props 값에 따라서 컴포넌트를 렌더링 하는 것도 가능하다.
  ```jsx
  const 컴포넌트 = styled.태그종류`
  	CSS속성: ${(props) => 함수 코드}
  `
  ```
    <br />

### 1) Props로 조건부 렌더링하기

```jsx
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

// 받아온 prop에 따라 조건부 렌더링이 가능하다.
// skyBlue라는 props가 있는지 확인하고, 있으면 배경색으로 skyblue를, 없으면 white를 적용한다.
const Button1 = styled.button`
  background: ${(props) => (props.skyblue ? "skyblue" : "white")};
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Button1>Button1</Button1>
      <Button1 skyblue>Button1</Button1>
    </>
  );
}
```

![img](/assets/img/blog/Style_Components3.png)

<br />

### 2) Props 값으로 렌더링하기

```jsx
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

// 받아온 prop에 따라 조건부 렌더링이 가능하다.
const Button1 = styled.button`
  background: ${(props) => (props.color ? props.color : "white")};
`;

// 꼭 삼항연산자를 사용하지 않아도 된다.
const Button2 = styled(Button1)`
  background: ${(props) => props.color || "white"};
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Button1>Button1</Button1>
      <Button1 color="tomato">Button1</Button1>
      <br />
      <Button2>Button2</Button2>
      <Button2 color="turquoise">Button2</Button2>
    </>
  );
}
```

![img](/assets/img/blog/Style_Components4.png)

<br /><br />

## 4. 전역 스타일 설정하기

- 전역 스타일을 설정하기 위해서는 `createGlobalStyle` 함수를 임포트한다.

  ```jsx
  import { createGlobalStyle } from "styled-components";
  ```

    <br />

- 그 다음 이 함수를 사용해 CSS 파일에서 작성하듯 설정해주고 싶은 스타일을 작성한다.

  ```jsx
  const GlobalStyle = createGlobalStyle`
    button {
      padding : 5px;
      margin : 2px;
      border-radius : 5px;
    }
  `;
  ```

    <br />

- 이렇게 만들어진 `<GlobalStyle>` 컴포넌트를 최상위 컴포넌트에서 사용하면 전역 스타일이 적용된다.

  ```jsx
  function App() {
    return (
      <>
        <GlobalStyle />
        <Button>전역 스타일 적용하기</Button>
      </>
    );
  }
  ```

  <br /><br /><br /><br />

# 참고

---

[코드스테이츠 프론트엔드 부트캠프](https://www.codestates.com/)

[React 완벽 가이드 with Redux, Next.js, TypeScript](https://www.udemy.com/course/best-react/)
