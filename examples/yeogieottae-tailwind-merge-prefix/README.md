# 여기어때 tailwind-merge prefix — 실습 랩

> 어느 리뷰에서 왔나: [`../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md`](../../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md)
> 원문: https://techblog.gccompany.co.kr/%ED%95%AD%EA%B3%B5-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B5%AC%EC%B6%95%EA%B8%B0-3-10-prefix%EB%A5%BC-%EB%B6%99%EC%9D%B4%EC%9E%90-tailwind-merge%EA%B0%80-%EC%A1%B0%EC%9A%A9%ED%9E%88-%EA%B9%A8%EC%A1%8C%EB%8B%A4-f5b250afc2a9

리뷰에서 교정한 `tailwind-merge`의 분류 모델을 손으로 확인하는 실습 5개.
**의존성 0개** — Node.js만 있으면 되고 `npm install`은 필요 없다.

실제 `tailwind-merge` 패키지를 복제한 프로젝트가 아니다. 핵심인 **클래스 그룹·단방향 충돌·variant 범위**만 70줄짜리 `mini-tailwind-merge`로 구현해, 도구가 어떤 판단을 하는지 숨김없이 볼 수 있게 했다.

| # | 폴더 | 확인하는 것 |
|---|---|---|
| 1 | [`01-default-vs-prefix/`](./01-default-vs-prefix/) | 기본 클래스는 병합하지만 모르는 `yf-*`는 둘 다 남는 이유 |
| 2 | [`02-strip-prefix-limit/`](./02-strip-prefix-limit/) | prefix를 떼었다 붙이는 1세대 해법과 커스텀 유틸리티 한계 |
| 3 | [`03-class-groups/`](./03-class-groups/) | 같은 `yf-text-*`를 역할별로 세분화하지 않으면 생기는 오분류 |
| 4 | [`04-conflicting-class-groups/`](./04-conflicting-class-groups/) | `p → px → pl` 충돌이 왜 단방향인지 |
| 5 | [`05-variants-and-wrapper/`](./05-variants-and-wrapper/) | `hover:`·`mobile:` 범위와 팀용 `tw` 템플릿 태그 |

## 한 번에 실행

```bash
cd examples/yeogieottae-tailwind-merge-prefix
node run-all.js
```

각 폴더에서 `node demo.js`로 하나씩 실행해도 된다. 코드부터 읽지 말고 각 README의 **예상해보기**에 먼저 답한 다음 실행하는 것을 권장한다.

## 공통 엔진

[`lib/mini-tailwind-merge.js`](./lib/mini-tailwind-merge.js)는 다음 세 단계만 구현한다.

1. variant와 실제 유틸리티를 분리한다.
2. 유틸리티를 첫 번째로 일치하는 `classGroups` 규칙에 넣는다.
3. 같은 variant 범위에서 같은 그룹 또는 `conflictingClassGroups`에 걸린 앞 클래스를 제거한다.

따라서 실습 3의 규칙 순서를 바꾸거나 실습 4의 충돌표를 바꾸면 결과가 즉시 달라진다.
