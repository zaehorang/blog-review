# tailwind-merge

**Tailwind 클래스 문자열을 실제 CSS 역할별로 분류하고, 뒤의 클래스가 앞의 효과를 완전히 덮으면 앞의 문자열을 제거하는 도구.** Tailwind가 CSS를 생성하는 것과는 별개다.

```ts
twMerge('bg-blue-500 bg-red-500')
// → 'bg-red-500'
```

실제 CSS를 덮어쓰는 게 아니라 `bg-blue-500`을 결과 문자열에서 지운다. 단순히 같은 접두어끼리 비교하지도 않는다.

```ts
twMerge('text-red-500 text-center')
// → 'text-red-500 text-center'
```

둘 다 `text-`로 시작하지만 하나는 색상, 하나는 정렬이라 함께 남아야 한다.

## `classGroups`와 `conflictingClassGroups`

- `classGroups`: **이 클래스는 무슨 역할인가?** 같은 역할이면 뒤의 하나만 남긴다.
- `conflictingClassGroups`: **이 그룹이 뒤에 오면 앞의 어느 그룹을 완전히 무효화하는가?** 서로 다른 그룹 사이의 단방향 관계를 적는다.

```ts
twMerge('p-8 p-16')
// → 'p-16' (같은 전체 padding 그룹)

twMerge('px-8 p-16')
// → 'p-16' (뒤의 p가 좌우까지 전부 덮음)

twMerge('p-16 px-8')
// → 'p-16 px-8' (전체 16을 남기고 좌우만 8로 바꿔야 함)
```

`p`와 `px`는 다른 그룹이지만 적용 영역이 겹친다. 관계가 단방향인 이유는 `px`가 `p`를 지우면 위아래 padding까지 사라지기 때문이다.

## 사용자 정의 prefix

Tailwind 프로젝트는 충돌 방지를 위해 `yf-` 같은 prefix를 설정할 수 있다.

```txt
bg-red-500 → yf-bg-red-500
```

하지만 Tailwind와 `tailwind-merge`는 별도 도구다. 사용하는 버전·설정에서 `yf-*`가 분류표에 연결되지 않으면 Tailwind는 CSS를 생성해도 병합기는 이를 모르는 문자열로 취급한다. 이때 prefix를 잠시 떼는 방법도 있지만, `yds6-TypoUi-14` 같은 커스텀 유틸리티는 prefix를 떼도 기본 분류표에 없으므로 여전히 병합되지 않는다.

직접 등록할 때는 이름이 아니라 CSS 역할로 나눠야 한다.

```txt
yf-text-center           → text-align
yf-text-14               → font-size
yf-text-ellipsis         → text-overflow
yf-text-content-primary  → color
```

한 `yf-text-*` 그룹으로 뭉치면 동시에 적용돼야 할 정렬과 색상이 서로를 지운다. 반대로 catch-all 규칙을 추가하면 구체적인 규칙보다 뒤에 두어야 한다. 결국 커스텀 분류표를 만든다는 것은 새 유틸리티 등록, 우선순위, 그룹 간 충돌 관계까지 직접 유지한다는 뜻이다.

## `clsx`와의 차이

`clsx`는 조건에 따라 클래스 문자열을 **이어 붙일 뿐**, 충돌을 판정하지 않는다. 인라인 스타일을 주입하는 도구도 아니다.

```ts
clsx('p-16', active && 'bg-blue-500', className)
```

`clsx`만 써서 덮어쓰기를 보장하지 못하면 `bgColor`, `textColor` 같은 prop과 인라인 스타일을 별도로 만들게 된다. 속성마다 prop이 늘고 `hover` 같은 상태는 인라인 스타일만으로 표현하기도 어렵다.

---

**관련 개념:** [디자인 토큰](design-token.md) · [플러그인](framework-plugin.md)
**처음 나온 노트:** [여기어때 — prefix를 붙이자 tailwind-merge가 조용히 깨졌다 (3/10)](../reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md)
