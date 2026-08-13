# 06. 구조적 보안 — 훔쳐가도 무용지물

> 어느 리뷰에서: [`../../../reviews/2026-08-04-oliveyoung-vue-web-components.md`](../../../reviews/2026-08-04-oliveyoung-vue-web-components.md)

## 확인하는 것
원문의 핵심 문장을 직접 재현: **"CDN에 배포된 JS 파일은 그저 껍데기뿐인 화면 렌더링 로직... 실제 key나 Axios 인스턴스는 오직 부모 시스템의 메모리 상에서만 동적으로 주입됩니다."**

`widget.js`는 두 페이지에서 완전히 동일하게 로드됩니다. 차이는 오직 "부모가 `api`를 주입했는가"뿐입니다.

## 실행
의존성 없이 파일을 그냥 열면 됩니다.

```bash
open legit-parent.html
open rogue-page.html
```

## 볼 것
1. `legit-parent.html`에서 버튼 클릭 → `✅ [인증됨] ...` 성공.
2. `rogue-page.html`에서 같은 버튼 클릭 → `❌ 실패: 부모가 인증된 api 인스턴스를 안 줬음`.
3. `widget.js` 파일을 열어봐도 토큰이나 key가 어디에도 없다는 것 확인 — 훔쳐갈 게 애초에 없음.

02번(같은 메모리 vs iframe)이 "왜 cross-origin으로는 이 객체를 못 빼돌리는가"였다면, 이건 "그래서 파일 자체를 훔쳐도 왜 무용지물인가"의 나머지 반쪽입니다.
