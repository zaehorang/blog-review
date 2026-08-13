# 04. `conflictingClassGroups` — 전체와 부분의 단방향 충돌

> 어느 리뷰에서: [`../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md`](../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md)

## 예상해보기

다음 두 줄은 클래스 순서만 반대다. 결과도 서로 반대인 한 개씩이 될까?

```txt
yf-px-8 yf-p-16
yf-p-16 yf-px-8
```

## 실행

```bash
node demo.js
```

## 확인할 것

- 뒤의 `p`는 앞의 `px` 효과를 완전히 덮으므로 `px`를 지운다.
- 뒤의 `px`는 좌우만 바꾼다. 앞의 `p`를 지우면 위아래 padding까지 사라지므로 둘 다 남긴다.
- 따라서 `p → px` 충돌 관계는 대칭이 아니라 **단방향**이다.
