# Momento 아키텍처 (사실만 기록, 지시 X)

> 여기엔 "이렇게 짜라"는 스타일 지시를 넣지 않는다.
> 모델이 절대 스스로 못 맞히는 **구조적 사실**만 적는다. (그래서 안 낡는다.)

## 모듈
- `Feature` — 화면. TCA Reducer + View.
- `Core` — 도메인 모델, UseCase, 네트워크/저장소.
- `DesignSystem` — 색/폰트/간격 토큰, 공용 컴포넌트.

## 의존 방향
- `Feature` → `Core` → (끝). 역참조 금지.
- `DesignSystem`은 누구나 참조 가능, 아무도 참조하지 않음.

## 규칙(구조적 사실)
- 화면 1개 = Reducer 1개 + View 1개.
- Reducer는 Core의 UseCase만 호출한다. 네트워크/파일 IO를 직접 하지 않는다.
- 이미지 원본은 로컬 파일시스템에 저장, 메타데이터만 Firestore에 저장.
