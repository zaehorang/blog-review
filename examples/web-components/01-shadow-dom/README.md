# 01. Shadow DOM 스타일 격리

> 어느 리뷰에서: [`../../../reviews/2026-08-04-oliveyoung-vue-web-components.md`](../../../reviews/2026-08-04-oliveyoung-vue-web-components.md)

## 확인하는 것
전역 CSS(`button { color: red }`)가 웹 컴포넌트의 Shadow DOM **안으로 새지 않는 것**, 그리고 그 반대(부모 스타일을 shadow 안에 수동 주입)를 직접 확인.

## 실행
의존성 없이 파일을 그냥 브라우저로 열면 됩니다.

```bash
open index.html
```

## 볼 것
1. 일반 `<button>`은 전역 CSS대로 빨강.
2. `<my-widget>` 안의 버튼은 **파랑 그대로** — 전역 스타일이 안 들어감.
3. "폰트 주입" 버튼을 누르면 컴포넌트 버튼 폰트만 바뀜 — **밖→안은 자동으로 안 되고 수동으로 넣어야** 한다는 것 확인.
