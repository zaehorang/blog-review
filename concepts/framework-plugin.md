# 플러그인 (plugin) — 확장점에 기능 꽂기

**호스트(프레임워크·빌드툴)가 미리 열어둔 확장점에 기능을 끼워 넣는 것.** 본체는 그대로 두고 정해진 자리에 기능을 추가한다. Xcode 소스 에디터 익스텐션, Chrome 확장, Babel/Vite 플러그인, `Vue.use()` 전부 같은 뜻.

## 문제는 "플러그인"이 성질이 정반대인 두 가지를 가리킨다는 것

### ① 런타임 주입형 — 프레임워크와 함께 죽는다

```js
Vue.use(plugin)            // → Vue.prototype.$punycode = fn
// 이후 모든 컴포넌트에서
this.$punycode(value)
window.$numWithCommas(value)
```

`Vue.prototype`(모든 컴포넌트 인스턴스의 조상 객체)에 기능을 얹으면 어디서든 `this.$무언가`로 쓸 수 있다. Swift로 억지 비유하면 `extension UIViewController`로 전역 헬퍼를 달아두거나, 전역 싱글톤을 앱 전체가 부르는 상태.

**두 가지가 동시에 나쁘다:**
- **의존이 안 보인다.** `import` 문이 없어서 파일만 봐서는 이 컴포넌트가 뭘 필요로 하는지 알 수 없다. 의존성 목록에도 안 잡힌다.
- **호스트가 사라지면 통째로 증발한다.** `Vue.prototype`은 Vue가 실행 중일 때만 존재하는 객체다.

같은 부류: Express 미들웨어, DI 컨테이너에 등록된 전역 서비스, 런타임 몽키패칭.

**iOS 대응물** — UIKit 컴포넌트가 이러고 있으면 정확히 같은 종속이다:
```swift
UIApplication.shared.keyWindow?.endEditing(true)
AppDelegate.shared.analytics.log("shown")
UIViewController.topMost()?.present(self, animated: true)   // 사내 extension
```
`Package.swift`를 아무리 봐도 *"이 컴포넌트는 AppDelegate가 살아있어야 동작함"*은 안 적혀 있다.

### ② 빌드타임 생성형 — 결과물만 남고 자기는 사라진다

```js
// tailwind.config에 꽂힌 플러그인이 빌드 시점에 생성
.typo-ui-14 { font-size: 14px; line-height: 17px }
```

빌드할 때 한 번 돌아서 **정적 텍스트(CSS·소스 파일)를 뱉고 끝난다.** 색상 JSON을 읽어 `Colors.swift`를 생성하는 스크립트와 같은 구조. 스크립트는 빌드 후 사라지고 결과물만 남으므로, **프레임워크를 갈아치워도 결과물은 멀쩡하다.**

같은 부류: Babel/SWC 플러그인, 코드 생성기, PostCSS.

## 가르는 선

| | 런타임 주입형 | 빌드타임 생성형 |
|---|---|---|
| 언제 사는가 | 실행 중 | 빌드할 때만 |
| 남기는 것 | 메모리 위의 객체·함수 | 텍스트 파일 |
| 호스트를 걷어내면 | 같이 죽는다 | 멀쩡하다 |
| 의존이 보이나 | 안 보임 (`import` 없음) | 보임 (설정 파일에 명시) |

> **산출물이 "살아있는 객체"인가 "죽은 글자"인가.** 프레임워크 교체에서 살아남는 건 후자다.

## 왜 이게 함정인가

"우린 외부 UI 라이브러리를 안 썼으니 프레임워크에 독립적이야"는 **①을 놓친 판정**이다. UI 라이브러리는 `package.json`에 적혀 있어서 눈에 띄는데, `Vue.prototype`에 얹힌 전역은 어디에도 안 적혀 있다.

> **종속은 의존성 목록에 안 적힌 곳에 숨는다.**

---

**관련 개념:** [디자인 토큰](design-token.md) · [모노레포](monorepo.md) · [증분 빌드](incremental-build.md)
**처음 나온 노트:** [여기어때 — Vue2 디자인 시스템을 React로 옮기기 (2/10)](../reviews/2026-08-11-yeogieottae-vue2-to-react-design-system.md)
