---
title: "[React Hook] useEffect"
date: 2022-06-14 20:05:00 +/- 0900
categories: [Frontend, React]
tags: [react, hooks] # TAG는 반드시 소문자로 이루어져야함!
---

# Side Effect?

---

- `사이드 이펙트`란? 어떤 액션에 대한 응답으로 실행되는 액션(보통 http 리퀘스트, 또는 email 필드의 키 입력에 대한 응답으로 해당 폼의 유효성을 확인하고 업데이트 하는 것)
  리액트에서는 컴포넌트 내에서 fetch를 사용해 API 정보를 가져오거나 이벤트를 활용해 DOM을 직접 조작할 때 Side Effect가 발생했다고 말한다.
- 사이드 이펙트는 직접적으로 컴포넌트 함수에 들어가면 버그나 무한 루프가 발생할 가능성이 높기 때문에 `useEffect()` 훅을 사용해야 한다.

<br /><br /><br /><br />

# useEffect() 훅 사용하기

---

- `useEffect(function, deps)`
  - 사이드 이펙트를 처리하는 훅
  - function: deps가 변경된 경우 실행되는 함수
  - deps: 배열 형태이며, 배열 안에는 검사하고자 하는 특정 값 or 빈 배열

<br />

```js
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
```

- App 컴포넌트에서 isLoggedIn을 state로 관리하고 있다. 리액트가 자바스크립트 변수로 관리하고 있다. 따라서 애플리케이션을 다시 로드할 때 전체 리액트 스크립트가 다시 시작되고, 최근 실행에서 얻은 변수는 모두 사라진다.
- 앱이 시작될 때마다 데이터가 유지되었는지 확인하고, 만약 그렇다면 자동으로 사용자를 다시 로그인 시키면 사용자가 세부 정보를 다시 입력할 필요가 없다. → `useEffect 사용`하면 된다.

<br />

```js
const loginHandler = (email, password) => {
  localStorage.setItem("isLoggedIn", "1");
  setIsLoggedIn(true);
};
```

- loginHandler에 localStorage를 사용해서 정보를 저장한다.
  - 사용자가 로그인했다는 뜻으로 isLoggedIn 키에 1을 저장한다.

<br />

```js
useEffect(() => {
  const storedUserLoggedInformaion = localStorage.getItem("isLoggedIn");

  if (storedUserLoggedInformaion === "1") {
    setIsLoggedIn(true);
  }
}, []);
```

- 앱이 다시 실행될 경우 localStorage에 키-값이 있는지 확인하는 코드를 작성한다.
  - getItem 메서드는 localStorage에 있는 isLoggedIn의 값을 반환한다. 만약 그 값이 1과 같다면, setLoggedIn을 호출하여 true로 설정할 수 있다.
- state 설정 함수를 호출할 때마다 이 컴포넌트 함수가 다시 실행되고, 다시 이 코드가 실행되는 무한 루프에 빠질 수 있기 때문에 useEffect를 사용해 `언제 실행할지 제어`해야 한다.
- 위에 작성된 useEffect는 deps가 없기 때문에 모든 컴포넌트 재평가 후에 실행된다. (이 컴포넌트 함수가 실행된 후에 이 함수가 실행된다.)

<br />

```js
const logoutHandler = () => {
  localStorage.removeItem("isLoggedIn");
  setIsLoggedIn(false);
};
```

- 로그아웃 버튼을 클릭할 땐 removeItem 메서드를 사용해 localStorage에서 isLoggedIn 키를 제거하고 setIsLoggedIn을 호출에 false로 설정한다.

<br /><br /><br /><br />

# useEffect & 종속성

---

```js
const [enteredEmail, setEnteredEmail] = useState("");
const [emailIsValid, setEmailIsValid] = useState();
const [formIsValid, setFormIsValid] = useState(false);

const emailChangeHandler = (event) => {
  setEnteredEmail(event.target.value);

  setFormIsValid(
    event.target.value.includes("@") && enteredPassword.trim().length > 6
  );
};

const validateEmailHandler = () => {
  setEmailIsValid(enteredEmail.includes("@"));
};
```

- emailChangeHandler가 실행되면 폼의 유효성을 검사하는 setFormIsValid가 실행된다.
- useEffect를 사용하면 한 곳에서 하나의 로직으로 폼이 유효한지 표시할 수 있다. 이것은 이메일이나 비밀번호가 변경될 때마다 실행된다.

<br />

```js
useEffect(() => {
  setFormIsValid(
    enteredEmail.includes("@") && enteredPassword.trim().length > 6
  );
}, [enteredEmail, enteredPassword]);
```

- effect 함수에서 사용하는 것을 deps로 추가한다. (setFormIsValid, enteredEmail, enteredPassword)
  - deps에서 setFormIsValid는 생략 가능하다.
    → `state 업데이트 함수`는 기본적으로 리액트에 의해 `절대 변경되지 않도록 보장`되기 때문

<br /><br />

## 단 한 번만 실행되는 Effect 함수

1. 빈 배열 넣기

   `useEffect(함수, [])`

   - 빈 배열을 useEffect의 두 번째 인자로 사용하면, **컴포넌트가 처음 생성될 때**만 effect 함수가 실행된다. 처음 단 한 번, 외부 API를 통해 리소스를 받아오고 더 이상 API 호출이 필요하지 않을 때에 사용할 수 있다.

2. 아무것도 넣지 않기(기본 형태)

   `useEffect(함수)`

   - 기본 형태의 useEffect는 컴포넌트가 처음 생성되거나, props가 업데이트되거나, 상태(state)가 업데이트될 때 effect 함수가 실행된다.

<br /><br />

## 종속성으로 추가할 항목 및 추가하지 않을 항목

- effect 함수에 사용하는 모든 것(변수, 함수)을 종속성으로 추가해야 하지만, 몇 가지 예외가 있다.
  - state 업데이트 함수는 추가할 필요 없다.
  - 내장 API는 추가할 필요 없다.
    - fetch(), localStorage 등
    - 이러한 브라우저 API/전역 기능은 React 구성 요소 렌더링 주기와 관련이 없으며 변경되지 않는다.
  - 컴포넌트 외부에서 정의 된 변수나 함수
    - 예) 별도의 파일에서 새 도우미 함수를 만드는 경우

<br />

- 따라서, `effect 함수에서 사용되는 모든 것들을 추가`해야 한다. 구성 요소(또는 일부 상위 구성 요소)가 다시 렌더링 되어 이러한 것들이 변경될 수 있는 경우, 그렇기 때문에 컴포넌트 함수에 정의된 **변수나 state**, 컴포넌트 함수에 정의된 **props 또는 함수**는 종속성으로 추가되어야 한다.

<br /><br /><br /><br />

# useEffect에서 Clean-up 함수 사용하기

---

```js
useEffect(() => {
  const identifier = setTimeout(() => {
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  }, 500);

  return () => {
    clearTimeout(identifier);
  };
}, [enteredEmail, enteredPassword]);
```

- 키를 입력할 때마다 setFormIsValid 함수가 실행되는 것을 막기 위해 setTimeout 메서드를 사용해 키 입력 후 일정 시간 동안 일시 중지되는 것을 기다리게 만든다.
- 모든 키의 입력에 대해 타이머를 설정한 상태이기 때문에 사용자가 계속 입력하면 다른 모든 타이머는 계속 지워지고 마지막 타이머만 (여기선 500밀리초 후에) 완료되게 해야 한다. → `clean-up`을 사용
  - clean-up: useEffect에서 첫 번째 인수로 전달하는 함수가 반환하는 함수
- clean-up은 `effec 함수가 실행되기 전`에(처음 실행되는 경우 제외), 그리고 `컴포넌트가 언마운트 될 때(사라질 때)` 실행된다.
- clean-up에서 clearTimeout 메서드를 사용하면, clean-up이 실행될 때마다 그 전에 설정된 타이머를 지울 수 있다. 따라서 다음 effect 함수를 실행할 때가 되면 새로운 타이머를 설정할 수 있다.

<br /><br /><br /><br />

# 출처

---

[React 완벽 가이드 with Redux, Next.js, TypeScript](https://www.udemy.com/course/best-react/)

[React Hooks: useEffect 사용법](https://www.daleseo.com/react-hooks-use-effect/)
