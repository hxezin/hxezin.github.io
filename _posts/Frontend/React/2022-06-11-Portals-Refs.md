---
title: "Portals & Refs"
date: 2022-06-11 17:54:00 +/- 0900
categories: [Frontend, React]
tags: [react] # TAG는 반드시 소문자로 이루어져야함!
---

# 리액트 포털

---

![img](/assets/img/blog/220611-3.png)

- 예시에서 모달은 작동가능하나 시맨틱적인 관점이나 간결한 HTML 구조적 관점에서 좋지 않다.
- 기본적으로 모달은 전체 페이지 위에 표시되는 `오버레이`이기 때문에, `다른 HTML 코드 안에 중첩`되어 있다면 좋은 코드가 아니다.
  → 왜냐하면 만약 오버레이 내용이 중첩되어 있으면, 렌더링되는 HTML 코드를 해석할 때 오버레이라고 인식하지 못할 수도 있다.
- 비슷한 문제가 사이드 드로어나 다이얼로그와 같은 모든 종류의 오버레이나 관련 컴포넌트에서 일어날 수 있다.

<br />

![img](/assets/img/blog/220611-4.png)

- 포털을 사용하면 왼쪽 JSX 코드는 유지한 채, 원하는 구조로 실제 DOM을 작동할 수 있다.

<br /><br />

## 포털 작업하기

- 포털을 작업하기 위해서는 `1. 컴포넌트를 이동시킬 장소`가 필요하고, `2. 컴포넌트에게 그 곳에 포털을 가져가야 한다고 알려줄` 필요가 있다.

<br />

```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="backdrop-root"></div>
  <div id="overlay-root"></div>
  <div id="root"></div>
</body>
```

- 마지막에 렌더링되는 `public 폴더의 index.html 파일`에 <div id=””>를 추가해서 나중에 이 장소를 찾아오는 데 사용한다.

<br />

```js
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};
```

- ErrorModal 파일에 Backdrop 컴포넌트, ModalOverlay 컴포넌트를 추가했다. (재사용하기 위해서는 여러 컴포넌트 파일로 나누는 것이 좋다.)

<br />

```js
import ReactDOM from "react-dom";

const ErrorModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};
```

- react-dom에서 ReactDOM(다른 이름 가능)을 임포트하면, ReactDOM에서 createPortal 메소드를 호출할 수 있다.
- `createPortal` 메서드는 인수로 첫 번째는 `렌더링되어야 하는 노드`, 두 번째는 요소가 렌더링되어야 하는 `실제 DOM의 컨테이너를 가리키는 포인터`를 담는다.

<br /><br /><br /><br />

# ref로 작업하기

---

- 참조(reference)의 줄임말로, 매우 강력한 도구다.
- 다른 DOM 요소에 접근해서 그것들로 작업할 수 있게 해준다.

<br />

```js
import React, { useRef } from "react";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

	return(
	...
	<input id="username" type="text" ref={nameInputRef} />
	<input id="age" type="number" ref={ageInputRef} />
	...
```

- `ref={nameInputRef}`: nameInputRef에 저장된 값을 input 기반으로 렌더링된 네이티브 DOM 요소에 설정한다.
- 여기서 생성되는 ref의 값은 항상 객체이며, current prop을 갖는다. `current` prop은 그 ref가 연결된 실제 값을 갖는다.
- current에 저장된 값은 실제 DOM 노드고 여러가지 작업을 할 수 있으나, DOM은 리액트에 의해서만 조작되는 것이 좋다. 그러나 데이터를 읽는 것은 괜찮다.

<br />

```js
const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
		...
```

- state를 사용하지 않아도 `current.value`를 사용해서 현재 입력값에 대한 정보를 가져올 수 있다.
- DOM을 조작하기 위해 ref를 사용하는 것은 흔히 쓰이는 방법은 아니다. 값을 빠르게 읽고 싶을 때, 아무 것도 바꿀 계획이 없을 때 state보다 ref를 사용하는 것이 좋을 것 같다.

<br /><br /><br /><br />

# 제어되는 컴포넌트와 제어되지 않는 컴포넌트

- 제어되는 컴포넌트: 사용자의 입력을 받는 컴포넌트에 event 객체를 이용해 `setState()`로 값을 저장하는 방식. React에 의해 값이 제어된다. 제어 컴포넌트는 사용자가 입력한 값과 저장되는 값이 실시간으로 동기화된다.
- 제어되지 않는 컴포넌트: `ref`를 사용해서 값을 얻는다. 사용자가 직접 트리거하기 전까지는 리렌더링을 발생시키지도 않고, 값을 동기화 시키지도 않는다.

<br /><br /><br /><br />

# 참고

---

[React 완벽 가이드 with Redux, Next.js, TypeScript](https://www.udemy.com/course/best-react/)

[React: 제어 컴포넌트와 비제어 컴포넌트의 차이점](https://velog.io/@yukyung/React-%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EB%B9%84%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0)
