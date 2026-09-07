# import map

브라우저 표준. `import 'react'` 처럼 이름만 적힌 모듈("bare specifier")을 **실제 URL로 잇는 전화번호부**를 HTML에 심는 것.

```html
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.example.com/pkg-7f3a9c/react.js",
    "antd":  "https://cdn.example.com/pkg-7f3a9c/antd.js"
  }
}
</script>
```

이후 페이지 안에서 `import 'react'` 를 만나면 브라우저가 이 표를 보고 해당 URL로 HTTP GET 한다.

## 왜 쓰나
[번들러](bundler.md)로 외부 패키지까지 전부 묶으면 번들이 커지고 매번 다시 빌드해야 한다. import map을 쓰면 **내 코드만 번들하고, 외부 패키지는 "이름 → 미리 만들어둔 파일 URL" 로 연결만** 하면 된다. 번들러는 외부 패키지를 `external`로 두고 손대지 않는다.

## 토스 TOI에서의 역할
- esbuild-wasm이 사용자 코드만 번들, `import 'antd'` 는 external로 남김.
- import map이 `antd` → S3의 사전 빌드 파일로 연결.
- URL에 [내용 해시](content-addressing.md)(`pkg-7f3a9c`)가 박혀 있어 캐시를 영구히 잡아도 안전.

**관련:** [번들러](bundler.md) · [패키지 매니저와 lockfile](package-manager-lockfile.md) · [내용 주소화](content-addressing.md) · [CDN](cdn.md)
**나온 곳:** [토스 AI 코드 Preview Runtime](../reviews/2026-09-07-toss-ai-code-preview-runtime.md)
