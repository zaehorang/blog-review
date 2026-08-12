# 05. variant 범위와 팀용 `tw` 래퍼

> 어느 리뷰에서: [`../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md`](../../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md)

## 예상해보기

병합기가 `mobile`이라는 breakpoint의 의미를 몰라도 아래 두 줄을 올바르게 처리할 수 있을까?

```txt
mobile:yf-bg-blue-500 mobile:yf-bg-red-500
mobile:yf-bg-blue-500 desktop:yf-bg-red-500
```

## 실행

```bash
node demo.js
```

## 확인할 것

병합기는 variant 이름의 의미 대신 **앞에 붙은 수식어 묶음이 같은지** 비교한다. 그래서 같은 `mobile:` 안에서는 병합하고 `mobile:`과 `desktop:`은 함께 남긴다.

마지막 예시는 복잡한 설정을 `tw` 템플릿 태그 뒤에 감춘다. 설정을 한곳에 숨기면 팀 사용법은 단순해지지만, 새 유틸리티를 분류표에 등록할 책임까지 사라지는 것은 아니다.
