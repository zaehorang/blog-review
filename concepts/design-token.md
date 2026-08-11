# 디자인 토큰 (design token)

**디자인 결정(색·타이포·간격·모서리)에 이름을 붙여 컴포넌트 코드 바깥에 모아둔 값.**
컴포넌트는 `#3B82F6`이나 `14px`를 직접 들고 있지 않고, `color-primary` / `typo-ui-14` 같은 **이름만 참조**한다.

```js
// 토큰 정의 (설정/플러그인)
.typo-ui-14 { font-size: 14px; line-height: 17px }

// 간격 스케일: 1~999를 그대로 px로 매핑
range(1, 1000).reduce((acc, n) => { acc[n] = n + 'px'; return acc }, {})
```

```html
<!-- 컴포넌트는 이름만 쓴다 -->
<button class="typo-ui-14 h-40 px-12 rounded-8">
```

## 원래 목적 vs 부수 효과

- **원래 목적:** 일관성. 값이 한 군데 있으니 브랜드 컬러를 바꾸면 전부 바뀐다.
- **부수 효과:** **이식성.** 컴포넌트가 들고 있는 게 값이 아니라 *이름*이므로, 새 프레임워크에서 같은 이름에 같은 값을 정의해두면 **컴포넌트 코드를 그대로 옮겨도 결과가 같다.**

이식이 성립하려면 **이름이 가리키는 값의 의미가 안 바뀌어야** 한다. 양쪽 다 `p-16`이 16px이면 클래스 문자열을 복사해도 되고, 한쪽만 4px 단위 스케일(`p-4` = 16px)이면 전부 다시 계산해야 한다.

## "디자인이 컴포넌트 바깥에 얼마나 나와 있는가"

토큰이 컴포넌트 안에 하드코딩돼 있으면 → 옮길 때 값을 하나하나 대조해야 한다 = 사실상 재구현.
토큰이 설정에 나와 있으면 → 옮길 단위가 **코드가 아니라 문자열**이 된다.

> 토큰화는 디자인 일관성을 위해 하는 일인데, **몇 년 뒤 프레임워크 교체 가능 여부까지 결정한다.**

## 다른 스택에서 같은 판정 — UIKit → SwiftUI

같은 코드베이스 안에서도 갈린다. **프레임워크가 아니라 보관 위치가 가른다:**

```swift
// ✅ 옮겨진다 — 값이 Assets Catalog(선언적 데이터)에 있음
static let brandBlue = UIColor(named: "BrandBlue")!
// SwiftUI에서 Color("BrandBlue") — 같은 파일, 같은 값, 다크모드 대응까지 그대로

// ❌ 안 옮겨진다 — 값이 컴포넌트 레이아웃 코드에 박혀 있음
stackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 18)
heightAnchor.constraint(equalToConstant: 48)
```

**`UIColor`라는 타입은 UIKit이지만 값은 UIKit 안에 없다.** extension은 데이터를 읽는 얇은 어댑터 한 겹일 뿐이라 다시 쓰면 그만이고, 색은 하나도 안 바뀐다.
반대로 `18`, `48`은 Auto Layout이 UIKit이라서 못 옮기는 게 아니다 — `Spacing.buttonHorizontal` 같은 상수였다면 UIKit 코드여도 값은 살아남는다.

> **타입이 프레임워크 것인지와, 자산이 프레임워크 안에 갇혔는지는 다른 질문이다.**


---

**관련 개념:** [플러그인](framework-plugin.md) · [웹 컴포넌트](web-components.md)
**처음 나온 노트:** [여기어때 — Vue2 디자인 시스템을 React로 옮기기 (2/10)](../reviews/2026-08-11-yeogieottae-vue2-to-react-design-system.md)
