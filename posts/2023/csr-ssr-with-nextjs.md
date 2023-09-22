---
title: 'CSR / SSR with Next.js'
description: 'CSR과 SSR의 개념과, Next.js 프로젝트의 npm run start 스크립트 실행 과정을 알아봅니다.'
date: '2023-06-29'
category: 'TIL'
tags: ['Next.js']
---

## CSR이란 무엇인가?

![](230629.png)

 CSR은 웹 페이지의 렌더링 프로세스 중 클라이언트, 즉 사용자의 브라우저에서 수행되는 방식을 말합니다. 브라우저에서 서버로 요청을 보내면 서버는 브라우저에 웹 페이지의 골격이 될 단일 페이지(Single Page)와 페이지에 필요한 자바스크립트를 전송합니다. 브라우저는 웹 페이지와 함께 전달된 자바스크립트 파일을 사용하여 DOM을 업데이트하고 페이지를 렌더링합니다.

 웹 페이지에 필요한 내용이 데이터베이스에 저장된 데이터인 경우, 브라우저는 Fetch와 같은 API를 사용해 데이터베이스에 저장된 데이터를 가져와 웹 페이지에 렌더링합니다.

 애플리케이션을 처음 로드할 때 사용자가 전체 페이지를 보기까지 약간의 지연이 발생할 수 있는데, 이는 모든 자바스크립트가 다운로드, 구문 분석 및 실행될 때까지 페이지가 완전히 렌더링되지 않기 때문입니다. 브라우저가 다른 경로로 이동할 경우, CSR에서는 SSR과 다르게 서버가 웹 페이지를 다시 보내지 않습니다. 브라우저는 브라우저가 요청한 경로에 따라 페이지를 다시 렌더링합니다. 이때 보이는 웹 페이지의 파일은 맨 처음 서버로부터 전달받은 웹 페이지 파일과 동일한 파일입니다.

### CSR의 장점

- **뛰어난 사용자 경험**: CSR은 초기 페이지 로딩 후, 페이지 갱신이 필요한 부분만 업데이트하므로 빠른 상호작용과 부드러운 사용자 경험을 제공할 수 있습니다.
- **상호작용적인 애플리케이션**: 동적인 웹 애플리케이션 개발에 적합합니다. 사용자 입력에 실시간으로 반응하고 업데이트할 수 있어 복잡한 사용자 상호작용을 다루기 용이합니다.
- **브라우저 캐싱 활용**: CSR은 초기에 필요한 데이터를 불러온 후, 이후에는 브라우저 캐싱을 통해 콘텐츠를 로드할 수 있습니다. 이는 반복적인 페이지 로딩 시간을 단축할 수 있습니다.
- **서버 부하 감소**: 서버 측에서는 미리 완성된 HTML을 생성하거나 데이터를 처리하지 않아도 되므로 서버 부하가 상대적으로 적습니다.

## SPA로 구성된 앱에서 SSR이 필요한 이유

싱글 페이지 애플리케이션(SPA)은 CSR 방식으로 구현되어 페이지 로딩 및 전환 시에 자연스럽고 빠른 상호작용을 제공합니다. 그러나 몇 가지 경우에 서버 사이드 렌더링이 필요한 이유가 있습니다.

- **SEO(검색 엔진 최적화)**: 검색 엔진은 주로 HTML 콘텐츠를 기반으로 웹 페이지를 색인하고 랭킹을 매기는데, CSR 방식의 SPA는 초기 페이지 로딩 시에 검색 엔진 크롤러가 제대로 렌더링된 콘텐츠를 인식하지 못할 수 있습니다. 이로 인해 SEO에 불리한 영향을 미칠 수 있습니다. SSR은 서버에서 사전에 렌더링된 HTML을 제공하여 검색 엔진이 페이지 내용을 더 잘 인식하고 색인할 수 있도록 돕습니다.
- **소셜 미디어 공유**: 소셜 미디어 플랫폼은 웹 페이지의 메타 데이터를 활용하여 미리보기 및 공유 정보를 구성합니다. CSR 방식의 SPA는 초기 로딩 시 메타 데이터가 미비하여 공유 리킁 시에 적절한 정보를 제공하지 못할 수 있습니다. SSR을 통해 페이지가 로드되어 공유 시에도 적절한 미리보기 정보를 제공할 수 있습니다.
- **성능 및 초기 로딩 속도 개선**: CSR은 초기 로딩 시에 모든 리소스를 로드하고 렌더링해야 하기 때문에 초기 로딩 속도가 지연될 수 있습니다. 특히 초기 로딩에 필요한 자바스크립트 파일의 크기가 크면 사용자 경험에 영향을 줄 수 있습니다. SSR은 서버에서 사전에 렌더링하여 사용자에게 빠른 초기 페이지 로딩을 제공하며, 이후 필요한 자바스크립트 파일을 로드하여 상호작용성을 유지합니다.
- **캐싱 및 성능 최적화**: SSR은 서버 측에서 콘텐츠를 사전에 렌더링하므로 클라이언트에게 미리 캐시된 콘텐츠를 전송할 수 있습니다. 이는 초기 로딩 시간을 줄이고 서버 부하를 감소시킬 수 있습니다.
- **접근성**: 일부 검색 엔진 봇이나 브라우저에서 자바스크립트를 지원하지 않는 경우에도 적절한 콘텐츠를 제공하기 위해 SSR을 사용할 수 있습니다.

## Next.js 프로젝트의 npm run start 스크립트 실행 과정

```jsx
// package.json
{
	"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
  },
}
```

Next.js에서 `npm run start` 스크립트를 실행했을 때 `next start` 명령어가 실행됩니다. [Next.js github 레포지토리](https://github.com/vercel/next.js)의 **packages/next/src/cli/next-start.ts**에서 `next start` 실행 코드를 찾을 수 있었습니다.

이 코드는 `npm run start` 스크립트가 실행될 때 호출되는 메인 함수인 `nextStart`가 선언되어 있습니다. nextStart 함수는 Next.js 애플리케이션을 프로덕션 모드로 실행할 때 필요한 커맨드 라인 옵션을 처리하고, 서버를 시작하여 애플리케이션을 호스팅하는 역할을 합니다.

```jsx
const nextStart: CliCommand = async (argv) => {
  const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
    '--port': Number,
    '--hostname': String,
    '--keepAliveTimeout': Number,
    '--experimental-test-proxy': Boolean,

    // Aliases
    '-h': '--help',
    '-p': '--port',
    '-H': '--hostname',
  }
  const args = getValidatedArgs(validArgs, argv)
  if (args['--help']) {
    console.log(`
      Description
        Starts the application in production mode.
        The application should be compiled with \`next build\` first.

      Usage
        $ next start <dir> -p <port>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        --port, -p          A port number on which to start the application
        --hostname, -H      Hostname on which to start the application (default: 0.0.0.0)
        --keepAliveTimeout  Max milliseconds to wait before closing inactive connections
        --help, -h          Displays this message
    `)
    process.exit(0)
  }

	...
```

상단에는 커맨드 라인 옵션들을 정의하고, 옵션을 처리할 수 있도록 구성되어 있습니다. 만약 사용자가 `--help` 옵션을 사용한다면 스크립트의 사용법과 옵션 설명이 출력됩니다.

```jsx
const nextStart: CliCommand = async (argv) => {
	...

  const dir = getProjectDir(args._[0])
  const host = args['--hostname']
  const port = getPort(args)

  const isExperimentalTestProxy = args['--experimental-test-proxy']

  const keepAliveTimeoutArg: number | undefined = args['--keepAliveTimeout']
  if (
    typeof keepAliveTimeoutArg !== 'undefined' &&
    (Number.isNaN(keepAliveTimeoutArg) ||
      !Number.isFinite(keepAliveTimeoutArg) ||
      keepAliveTimeoutArg < 0)
  ) {
    printAndExit(
      `Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`,
      1
    )
  }

  const keepAliveTimeout = keepAliveTimeoutArg
    ? Math.ceil(keepAliveTimeoutArg)
    : undefined

  await startServer({
    dir,
    isDev: false,
    isExperimentalTestProxy,
    hostname: host,
    port,
    keepAliveTimeout,
  })
}
```

`dir`, `host`, `port`, `keepAliveTime` 등을 설정하고 `startServer` 함수를 호출하여 Next.js 애플리케이션을 프로덕션 모드로 실행합니다.

## 배운 점

매일 명령어를 입력하면서 이 명령어가 어떤 로직으로 구동되는지 전혀 궁금해하지 않고 사용했던 것이 부끄러웠습니다 🥲 공식 레포지토리를 볼 생각은 한 적이 없는데, 전부 이해하진 못했지만 개발 공부를 어떻게 해야 하는지 알 수 있었던 의미 있는 경험이었습니다.