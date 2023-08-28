---
title: 'Next.js 앱 Github Pages에 배포하기'
description: 'static exports를 위한 Next.js 설정과 자동 배포를 위한 Github 설정에 대해 알아봅니다.'
date: '2023-08-23'
keyword: ['Next.js']
---

프로젝트를 Github Pages에 배포하는 것은 할 때마다 새로운 것 같습니다 🥲 최근 Next.js App router 기반의 블로그를 Github Pages에 배포하기 위해 많은 글을 찾아봤는데, Next.js의 이전 버전 글들이 많아 배포 과정에서 애를 먹었습니다. (예를 들어 Next.js v13.3.0 이후 `next export`가 더 이상 사용되지 않으며, `output: 'export'`로 대체됐습니다.)
우여곡절 끝에 배포에 성공해서 제가 참고한 글들을 정리해 공유하고자 합니다.

## 레포지토리 생성

1. `public`으로 설정된 레포지토리를 생성합니다.
2. 레포지토리 이름을 `username.github.io` 형태로 설정해야 기본 도메인에 반영됩니다.
3. 다른 형태의 레포지토리 이름은 `username.github.io/<repository>`처럼 하위 도메인에 반영됩니다.

## Next.js 설정하기

먼저 [static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)를 지원하도록 Next.js를 설정해야 합니다.

1. `next.config.js` 파일에 다음과 같이 작성합니다.
    
    ```jsx
    /**
     * @type {import('next').NextConfig}
     **/
    
    const nextConfig = {
      output: 'export',
      basePath: '',
      images: {
        unoptimized: true,
      },
    };
    
    module.exports = nextConfig;
    ```

    basePath에는 레포지토리 URL이 들어갑니다. 제 경우 도메인이 `https://hxezin.github.io`이기 때문에  basePath를 빈문자열로 뒀지만, 프로덕션 도메인이 `https://hxezin.github.io/nextjs-blog`일 경우 '/nextjs-blog'를 작성해야 합니다.
    
    static exports에서는 동적 기능이 작동하지 않으므로 이미지 최적화를 비활성화합니다. 그러나 [공식 문서](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization)를 찾아보니 custom image loader를 사용하면 이미지 최적화를 적용할 수 있다고 해서 추후에 적용해볼 예정입니다.
  
2. `/public` 디렉토리에 `.nojekyll` 파일을 생성하여 Github Pages가 Jekyll 웹사이트를 만들지 못하도록 합니다.
    
    ```bash
    .
    ├── app/
    └── public/
        └── .nojekyll
    ```

3. `next/image` 컴포넌트를 사용중일 때, `src` 앞에 `basePath`를 추가해야 합니다.
    예를 들어, `basePath`를 `/nextjs-blog`로 설정한 경우, `src`도 `/nextjs-blog/profile.png`가 되어야 이미지가 올바르게 제공됩니다.

    ```jsx
    import Image from 'next/image'
 
    function Home() {
      return (
          ...
          <Image
            src="/nextjs-blog/profile.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
          ...
      )
    }
    ```

## Github 설정하기

다음으로 Github Actions을 이용하여 배포 자동화를 하기 위해 Github를 설정합니다.

1. 해당 레포지토리에서 **Settings > Pages**로 이동합니다.

2. **Build and Deployment**에서 [Github Actions](https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/)을 선택합니다.
    
    ![](230823.png)
    
3. `Next.js By Github Actions`가 나오면 하단의 `Configure`를 클릭합니다.
    
    ![](230823-2.png)
    
4. 그럼 `.github/workflows/next.js` 파일이 생성됩니다. 필요한 경우 수정해줍니다.

이제 코드를 Github에 푸시하면 Github Action workflow가 트리거되고, 앱이 Github Pages에 배포된 것을 확인할 수 있습니다.

## 참고자료

[next.config.js Options: basePath](https://nextjs.org/docs/app/api-reference/next-config-js/basePath)

[gregrickaby/nextjs-github-pages](https://github.com/gregrickaby/nextjs-github-pages#configure-github-repository)

[How to deploy a Nextjs app to GitHub pages?](https://medium.com/frontendweb/how-to-deploy-a-nextjs-app-to-github-pages-1de4f6ed762e)