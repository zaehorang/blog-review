# 02. prefix를 떼는 1세대 해법의 한계

> 어느 리뷰에서: [`../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md`](../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md)

## 예상해보기

`yf-`를 잠깐 떼면 기본 `bg-*` 병합은 살아난다. 그렇다면 기본 Tailwind에 없는 `yds6-TypoUi-*`도 병합될까?

## 실행

```bash
node demo.js
```

## 확인할 것

- `yf-bg-*`는 prefix를 뗀 순간 기본 분류표에 다시 들어가므로 병합된다.
- `yf-yds6-TypoUi-*`는 `yds6-TypoUi-*`가 되어도 분류표에 없으므로 둘 다 남는다.
- 무차별 `replaceAll`은 임의값 안의 `yf-`까지 지운다. 문자열을 속이는 방법은 클래스 구조를 이해하지 않으므로 적용 범위에 한계가 있다.
