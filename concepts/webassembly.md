# WebAssembly (Wasm)

브라우저에서 JS 말고 다른 걸 돌리려던 시도 중 **유일하게 성공한 것.**

| 시도 | 결과 |
|---|---|
| Java Applet · Flash · Silverlight | 플러그인 기반 → 표준화·보안 문제로 **전부 폐기** |
| **WebAssembly** | **2019년 W3C 4번째 웹 표준** |

JS를 **대체**하는 게 아니라 **나란히 실행**되는 저수준 바이트코드. C/Rust/Go의 컴파일 산출물이 여기로 온다.

⚠️ DOM에 직접 접근은 아직 안 돼서 **JS가 glue 역할**을 한다.

**나온 곳:** [Nextree 타입스크립트](../reviews/2026-08-05-nextree-typescript.md)
