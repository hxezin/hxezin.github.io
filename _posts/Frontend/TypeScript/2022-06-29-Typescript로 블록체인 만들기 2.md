---
title: "[Nomad Coders] #2 OVERVIEW OF TYPESCRIPT"
date: 2022-06-29 15:02:00 +/- 0900
categories: [Frontend, TypeScript]
tags: [typescript] # TAG는 반드시 소문자로 이루어져야함!
---

# 2.0 How Typescript Works

---

- TypeScript란?
  - JavaScript를 기반으로 하는 강 타입(strongly typed) 프로그래밍 언어
  - JavaScript로 컴파일하기 전에 에러가 발생할 것 같은 코드를 감지하면 그 코드는 컴파일되지 않는다.

<br /><br /><br /><br />

# 2.1 Implicit Types vs Explicit Types

---

- 다른 프로그래밍 언어는 변수를 생성할 때 변수의 타입을 정해줘야 한다.
- TypeScript는 두 가지 접근방식을 결합했다.
  - 데이터와 변수의 타입을 명시적으로 정의할 수 있고, JavaScript처럼 변수만 생성하고 넘어가도 된다.
    - 데이터 타입 명시:
      - `let a : boolean = true`
      - `let b : number[] = [1, 2]`
    - 타입 추론(type inference) - `let c = “hello”` : c는 string 타입으로 추론
      → 보통 명시적 표현은 최소한으로 사용하는 것이 좋다.

<br /><br /><br /><br />

# 2.2 Types of TS part One

---

## object의 타입 정의

```tsx
const player: {
  name: string;
  // 선택적 변수 지정하는 방법
  // ?를 붙이면 타입이 number 또는 undefined가 된다.
  age?: number;
} = {
  name: "hyejin",
};

// player.age가 존재하는지 확인을 거쳐야 한다.
if (player.age && player.age < 10) {
}
```

<br /><br />

## Type Alias(별칭)을 생성하는 방법

```tsx
// 첫번째 글자는 대문자로 시작한다.
type Player = {
  name: string;
  age?: number;
};

const hyejin: player = {
  name: "hyejin",
};

const lee: Player = {
  name: "lee",
  age: 12,
};

// 객체 key의 타입에 대한 다른 Alias를 만들 수도 있다.
// 유효하고 작동은 하지만 이런 식으로 과하게 재사용하는건 좋지 않다.
type Name = string;
type Age = number;
type Player = {
  name: Name;
  age?: Age;
};
```

<br /><br />

## return 값 타입 지정

```tsx
type Player = {
  name: string;
  age?: number;
};

// name:string -> 매개변수 타입 지정
// 타입스크립트에게 함수가 Player 타입을 리턴한다는 것을 알려준다.
function playerMaker(name: string): Player {
  return {
    name: name,
  };
}

// 위 함수를 화살표 함수로 바꿨을 때
const playerMaker = (name: string): Player => ({ name });
```

<br /><br /><br /><br />

# 2.3 Types of TS part Two

---

## readonly 속성

- 요소들을 `‘읽기 전용’`으로 만든다.

  ```tsx
  type Player = {
    // readonly 속성을 사용하면 수정할 수 없다.
    readonly name: string;
    age?: number;
  };

  const numbers: readonly number[] = [1, 2, 3, 4];
  numbers.push(1); //---> X
  ```

<br /><br />

## Tuple

- 길이와 각 요소의 타입이 고정된 배열

  ```tsx
  const player: [string, number, boolean] = ["hyejin", 1, true];
  player[0] = 1; //---> X

  //Tuple + readonly
  const player: readonly [string, number, boolean] = ["hyejin", 1, true];
  player[0] = "hi"; //---> X
  ```

<br /><br />

## any

- 어떠한 타입도 허용하는 타입
- any를 사용하면 타입 검사를 빠져나갈 수 있으므로, 사용하지 않는 것이 좋다.

  ```tsx
  // 비어있는 값을 쓰면 기본 타입이 any가 된다.
  let a = []; // === let a: any[] = [];

  // --> 사용하지 않는 것이 좋다.
  const a: any[] = [1, 2, 3, 4];
  const b: any = true;
  a + b; //---> 계산 가능
  ```

<br /><br /><br /><br />

# 2.4 Types of TS part Thre

---

## unknow

- **어떤 타입인지 모르는** 변수

  ```tsx
  // 변수의 타입을 미리 알지 못할 때 unknown을 사용한다.
  let a: unknown;

  let b = a + 1; //---> X

  // a의 타입을 확인해야 사용할 수 있다.
  if (typeof a === "number") {
    let b = a + 1; //---> O
  }

  let c = a.toUpperCase(); //---> X

  if (typeof a === "string") {
    let c = a.toUpperCase(); //---> O
  }
  ```

<br /><br />

## void

- **아무것도 return하지 않는 함수**를 대상으로 하며, 보통 void를 따로 지정해줄 필요는 없다.
  ```tsx
  function hello() {
    // === function hello(): void
    console.log("x");
  }
  ```

<br /><br />

## never

- 일반적으로 함수의 리턴 타입으로 사용되며, 항상 오류를 출력하거나 **리턴 값을 절대로 내보내지 않음**을 의미한다.

  ```tsx
  // 함수에서 오류가 발생할 때
  function hello(): never {
    return "X"; //---> X
  }

  // return하지 않고 오류를 발생시키는 함수
  function hello(): never {
    throw new Error("xxx"); //---> O
  }

  // 타입이 두 가지일 수도 있는 상황에서 사용한다.
  function hello(name: string | number) {
    if (typeof name === "string") {
      name; //---> name: string
    } else if (typeof name === "number") {
      name; //---> name: number
    } else {
      name; //---> name: never
    }
  }
  ```

<br /><br /><br /><br />

# 참고

---

[타입스크립트로 블록체인 만들기](https://nomadcoders.co/typescript-for-beginners)
