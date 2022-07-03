---
title: "Portals"
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

# 참고

---

[React 완벽 가이드 with Redux, Next.js, TypeScript](https://www.udemy.com/course/best-react/)
