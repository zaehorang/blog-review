# 03. `classGroups` — 이름이 아니라 CSS 역할로 나누기

> 어느 리뷰에서: [`../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md`](../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md)

## 예상해보기

아래 네 클래스를 `yf-text-*`라는 그룹 하나로 묶으면 무슨 일이 생길까?

```txt
yf-text-center              정렬
yf-text-14                  크기
yf-text-ellipsis            오버플로
yf-text-content-primary     색상
```

## 실행

```bash
node demo.js
```

## 확인할 것

나쁜 분류는 마지막 색상만 남겨 정렬·크기·말줄임을 지운다. 역할별로 그룹을 나누면 네 클래스가 모두 공존한다.

구체적인 규칙을 먼저 두고 `isAny` 같은 색상 catch-all을 마지막에 두는 것도 중요하다. 순서를 뒤집어 색상 규칙을 맨 앞으로 옮겨보면 다시 하나만 남는다.
