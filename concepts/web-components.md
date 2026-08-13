# 웹 컴포넌트 / 커스텀 엘리먼트

`HTMLElement`를 상속한 클래스를 브라우저에 등록해 `<goods-detail>` 같은 **표준 커스텀 태그**로 쓰게 하는 웹 표준.

## `defineCustomElement` (Vue)가 하는 일

흔한 오해: "빌드하면 그냥 정적 HTML 태그로 바뀐다."
→ 아니다. **진짜 커스텀 엘리먼트 클래스**가 나오고, 그 안엔 **Vue 런타임이 그대로 들어있어** 반응성·라이프사이클이 계속 돈다.

바뀌는 건 **"쓰는 쪽의 계약"뿐** — React/JSP는 Vue를 몰라도 표준 태그 하나만 놓으면 된다.

> 비유: **통조림.** 안은 Vue 요리, 뚜껑(인터페이스)만 표준 규격.

## iframe과 결정적으로 다른 점

웹 컴포넌트는 부모와 **같은 JS 실행 컨텍스트(같은 `window`)**에서 돈다.

| | 웹 컴포넌트 | iframe |
|---|---|---|
| 실행 컨텍스트 | 부모와 **같은** window | **별개** window |
| 넘길 수 있는 것 | 살아있는 JS 객체를 **참조로** (함수·클로저·axios 인스턴스) | `postMessage`로 **직렬화 가능한 데이터만** |

→ **"같은 실행 컨텍스트인가"가 무엇을 넘길 수 있는지를 결정한다.**

## SSR/SEO 한계

크롤러는 최초 HTML(`<goods-detail></goods-detail>`)만 보면 빈 껍데기 → JS 실행 후에야 콘텐츠가 채워진다. 로그인 이후 화면이면 크롤러가 도달조차 못 하므로 이 한계가 발동하지 않는다.

**관련:** [Shadow DOM](shadow-dom.md)
**나온 곳:** [올리브영 Vue Web Components](../reviews/2026-08-04-oliveyoung-vue-web-components.md) · [실습](../examples/web-components/)
