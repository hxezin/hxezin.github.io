---
title: "[Nomad Coders] #4 CLASSES AND INTERFACES"
date: 2022-07-05 22:37:00 +/- 0900
categories: [Frontend, TypeScript]
tags: [typescript] # TAG는 반드시 소문자로 이루어져야함!
---

# 4.0 Classes

---

## class

- 파라미터를 써주기만 하면, 타입스크립트가 알아서 constructor 함수를 생성한다.
- 필드의 접근 제어자, 이름, 타입을 써주기만 하면 된다.

  ```tsx
  class Player {
    constructor(
      protected firstName: string,
      protected lastName: string,
      public nickname: string
    ) {}
  }

  const hyejin = new Player("hyejin", "lee", "혜진");

  // 자바스크립트에 protected, public이 반영되지 않더라도 타입스크립트에서 보호해준다.
  // protected 및 public은 property 뿐만 아니라 method에서도 작동한다.
  // firstname은 protected이기 때문에 작동하지 않는다.
  nico.firstName;
  nico.nickname;
  ```

<br /><br />

## 추상 클래스(Abstract class)

- 다른 클래스가 상속받을 수만 있는 클래스
- 직접 새로운 인스턴스를 만들 수는 없다.

  ```tsx
  abstract class User{
  	constructor(
  		protected firstName:string,
  		protected lastName:string,
  		protected nickname:string
  	){}
  }

  class Player extends User

  const hyejin = new Player("hyejin", "lee", "혜진")

  // 추상 클래스는 인스턴스를 만들 수 없기 때문에 작동하지 않는다.
  const hyejin = new User("hyejin", "lee", "혜진") //---> X
  ```

<br /><br />

## 추상 메소드

- 추상 클래스를 상속받은 자식들이 구현해야하는 메소드
- 추상 메소드는 추상 클래스 안에서 만들 수 있으며,
  메소드를 직접 구현해서는 안되고, **메소드의 call signature만 적는다.**

  ```tsx
  abstract class User {
    constructor(
      protected firstName: string,
      protected lastName: string,
      protected nickname: string
    ) {}
    // 추상 메소드는 call signature만 적는다.
    abstract getNickName(): void;
  }

  class Player extends User {
    // 추상 클래스의 자식 클래스에서 구현해야 한다.
    getNickName() {
      console.log(this.nickname);
    }
  }
  ```

<br /><br />

## 접근 제어자

- `public`: 기본값
- `protected`: 외부에서 접근할 수 없지만, 자식 클래스에서 접근할 수 있다.
- `private`: 인스턴스 밖에서 접근할 수 없고, 다른 자식 클래스에서도 접근할 수 없다.

  ```tsx
  abstract class User {
    constructor(
      protected firstName: string,
      protected lastName: string,
      protected nickname: string
    ) {}
    abstract getNickName(): void;

    protected getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  class Player extends User {
    getNickName() {
      // protected property는 자식 클래스에서 접근할 수 있다.
      this.getFullName(); //---> O
      console.log(this.nickname);
    }
  }

  const hyejin = new Player("hyejin", "lee", "혜진");

  // 외부에서는 접근할 수 없다.
  hyejin.getFullName(); //---> X
  ```

<br /><br /><br /><br />

# 4.1 Recap

---

- 단어 사전 구현

  ```tsx
  // Words 타입이 string만을 property로 가지는 객체라고 선언
  // 제한된 양의 property 혹은 key를 가지는 타입을 정의해주는 방법
  type Words = {
    [key: string]: string;
  };

  class Dict {
    private words: Words;
    constructor() {
      this.words = {};
    }

    // class를 타입처럼 사용할 수 있다.
    add(word: Word) {
      if (this.words[word.term] === undefined) {
        this.words[word.term] = word.def;
      }
    }

    def(term: string) {
      return this.words[term];
    }
  }

  class Word {
    constructor(public term: string, public def: string) {}
  }

  const kimchi = new Word("kimchi", "한국의 음식");

  const dict = new Dict();

  dict.add(kimchi);
  dict.def("kimchi");
  ```

<br />

- 주로 다른 사람이 데이터를 덮어 씌우는 것을 방지하기 위해서 private나 protected 프로퍼티를 사용하는데, `public readonly`를 사용하면 데이터가 수정되는 것을 막을 수 있다.

  ```jsx
  class Word {
  	constructor(
      // readonly 프로퍼티를 사용하면 읽기만 가능하다.
  		public readonly term:string,
  		public readonly def :string
  	){}
  }

  const kimchi = new Word("kimchi", "한국의 음식")
  kimchi.def = "xxx" //---> X
  ```

<br /><br />

## static

- static은 자바스크립트에서 볼 수 있다.

  ![img](/assets/img/blog/220705-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8.png)

<br /><br /><br /><br />

# 4.2 Interfaces

---

## type 사용

```tsx
// 1. alias type
type Nickname = string;
type Health = number;
type Friends = Array<string>;

// 2. 오브젝트 모양을 설정할 수 있다.
type Player = {
  nickname: Nickname;
  healthBar: Health;
};

const hyejin: Player = {
  nickname: "hyejin",
  healthBar: 10,
};

// 3.변수 타입을 설정할 수 있다.
type Food = string;

const kimchi: Food = "delicious";

// 타입에 concrete 타입의 특정 값을 지정할 수도 있다.
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;
type Player = {
  nickname: string;
  team: Team;
  health: Health;
};

const hyejin: Player = {
  nickname: "hyejin",
  team: "red",
  // Health 타입은 1, 5, 10 중에서만 들어갈 수 있다.
  health: 50, //---> X
};
```

<br /><br />

## interface

- 오로지 **객체의 모양을 특정할 때**만 사용한다.

  ```tsx
  interface Hello = string //---> X

  interface Player{
    nickname: string,
    team: string,
    health: number
  }

  const hyejin : Player = {
    nickname: "hyejin",
    team: "red",
    health: 10
  }
  ```

<br />

- interface는 **클래스처럼 상속이 가능**하다.

  - interface는 객체 지향 프로그래밍의 개념을 활용해서 디자인되었다.

  ```tsx
  // interface Ver.
  interface User {
    // readonly property를 쓰면 읽기 전용이 된다.
    // type과 유사한 점
    readonly name: string;
  }

  interface Player extends User {}

  const hyejin: Player = {
    name: "hyejin",
  };
  ```

  ```tsx
  // type Ver.
  type User = {
    readonly name:string
  }

  type Player = User & {

  }

  const hyejin : Player = {
    name:"hyejin"
  ```

<br />

- interface는 **property들을 축적**시킬 수 있다.

  ```tsx
  interface User {
    name: string;
  }

  // 이름이 같은 인터페이스 중복 선언이 가능하다.
  interface User {
    lastName: string;
  }

  interface User {
    health: number;
  }

  // 같은 인터페이스에 다른 이름을 가진 property들을 타입스크립트가 알아서 하나로 합춰준다.
  // type으로는 할 수 없다.
  const nico: User = {
    name: "hyejin",
    lastName: "lee",
    health: 10,
  };
  ```

<br /><br /><br /><br />

# 4.3 Interfaces part Two

---

## 추상 클래스와 interface

- 추상 클래스는 다른 클래스에 표준화된 property와 메소드를 지정하기 위해서 사용한다.
- **추상 클래스는 자바스크립트에서 일반 클래스로 바뀌어버린다.**

  → 그래서 인터페이스를 사용해야 한다.

  **인터페이스는 컴파일하면 자바스크립트로 바뀌지 않고 사라진다.**

  ```tsx
  // 추상 클래스 Ver.
  abstract class User {
    constructor(protected firstName: string, protected lastName: string) {}
    abstract sayHi(name: string): string;
    abstract fullName(): string;
  }

  class Player extends User {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name: string) {
      return `Hello ${name}. My name is ${this.fullName()}`;
    }
  }
  ```

  ![img](/assets/img/blog/220705-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B82.png)

  <br />

  ```tsx
  // 인터페이스 Ver
  interface User {
    firstName: string;
    lastName: string;
    sayHi(name: string): string;
    fullName(): string;
  }

  // 인터페이스는 타입스크립트에서만 존재하고,자바스크립트에선 존재하지 않게 되기 때문에
  // 인터페이스를 쓰면 코드가 가벼워진다.
  interface Human {
    health: number;
  }

  // 하나 이상의 인터페이스를 동시에 상속할 수 있다.
  // 인터페이스를 상속할 때에는 public 프로퍼티를 사용해야 한다.
  class Player implements User, Human {
    constructor(
      public firstName: string,
      public lastName: string,
      public health: number
    ) {}
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name: string) {
      return `Hello ${name}. My name is ${this.fullName()}`;
    }
  }

  // 인터페이스를 type으로 사용할 수도 있다.
  function makeUser(user: User) {
    return "hi";
  }

  makeUser({
    firstName: "hyejin",
    lastName: "lee",
    fullName: () => "xx",
    sayHi: (name) => "String",
  });
  ```

  ![스크린샷 2022-07-05 오후 10.18.21.png](/assets/img/blog/220705-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B83.png)
  <br />
  → 자바스크립트에서 인터페이스가 사라진다.

<br /><br /><br /><br />

# 4.4 Recap

---

- 추상 클래스를 사용하면 자바스크립트에서 일반적인 클래스로 바뀐다. <br />
  → 파일 크기가 좀 더 커지고, 추가 클래스가 만들어진다. <br />
  → 추상 클래스를 **다른 클래스들이 특정 모양을 따르도록 하기 위한 용도**로 사용한다면,
  같은 역할을 하는 `인터페이스`를 사용하는 것이 더 좋다.

<br /><br />

## 타입과 인터페이스

- 공통점: 객체 모양을 설정할 수 있다.
- 차이점: 상속하는 방법이 다르다.

  ```tsx
  // 타입 Ver.
  type PlayerA = {
    name:string
  }

  type PlayerAA = PlayerA & {
    lastName:string
  }

  const playerA: PlayerAA ={
    name:"nico",
    lastName:"xxx"
  }

  // 타입은 새 property를 추가하기 위해 다시 선언될 수 없다.
  const PlayerAA{ //---> X
    health:number
  }

  // 인터페이스 Ver.
  // 인터페이스를 상속하는 방법은 객체지향 프로그래밍의 컨셉과 매우 유사하다.
  interface PlayerB {
    name:string
  }

  interface PlayerBB extends PlayerB{
    lastName:string
  }

  // 인터페이스의 경우 프로퍼티를 추가할 수 있다.
  // 따라서 상속 없이 interface PlayerB로 써도 잘 동작한다.
  interface PlayerBB{
    health:number
  }

  const playerB: PlayerBB = {
    name:"nico",
    lastName:"xxx",
    health:10
  }
  ```

<br />

- 인터페이스와 타입 모두 **추상 클래스를 대체**해서 사용할 수 있다.

  ```tsx
  type PlayerA = {
    firstName: string;
  };

  interface PlayerB {
    firstName: string;
  }

  // 타입 PlayerA와 인터페이스 PlayerB 모두 상속 가능하다.
  class User implements PlayerB {
    constructor(public firstName: string) {}
  }
  ```

<br />

- **클래스나 오브젝트의 모양을 정의**하고 싶으면 인터페이스, 그 외 모든 경우에는 타입을 사용하자

<br /><br /><br /><br />

# 4.5 Polymorphism

- `다형성`을 이룰 수 있는 방법은 `제네릭`을 사용하는 것이다.

  - 제네릭은 placeholder 타입을 쓸 수 있도록 해준다. (concrete 타입 X)
  - 제네릭은 다른 타입에 상속할 수 있다.

  ```tsx
  // 3. 인터페이스는 제네릭을 사용한다.
  interface SStorage<T> {
    [key: string]: T;
  }

  // 1. 제네릭을 클래스에 보내고,
  class LocalStorage<T> {
    // 2. 클래스는 제네릭을 인터페이스로 보냈다.
    private storage: SStorage<T> = {};
    set(key: string, value: T) {
      this.storage[key] = value;
    }
    remove(key: string) {
      delete this.storage[key];
    }
    get(key: string): T {
      return this.storage[key];
    }
    clear() {
      this.storage = {};
    }
  }

  const stringsStorage = new LocalStorage<string>();
  stringsStorage.get("ket");

  const booleansStorage = new LocalStorage<boolean>();
  booleansStorage.get("xxx");
  ```

<br /><br /><br /><br />

# 참고

---

[타입스크립트로 블록체인 만들기](https://nomadcoders.co/typescript-for-beginners)
