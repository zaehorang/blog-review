# 01. 기본 클래스 vs 사용자 정의 prefix

> 어느 리뷰에서: [`../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md`](../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md)

## 예상해보기

기본 분류표가 `bg-*`만 안다면 다음 두 결과는 각각 어떻게 될까?

```txt
bg-blue-500 bg-red-500
yf-bg-blue-500 yf-bg-red-500
```

## 실행

```bash
node demo.js
```

## 확인할 것

첫 줄은 두 클래스가 같은 배경색 그룹이므로 뒤의 하나만 남는다. 두 번째 줄의 `yf-*`는 분류표에 없는 문자열이라 **둘 다 남는다.** Tailwind가 CSS를 생성할 수 있는가와 병합기가 CSS 역할을 아는가는 별개다.
