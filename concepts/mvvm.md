# MVVM

View / ViewModel / Model(UseCase)로 나누는 프레젠테이션 아키텍처.

## 핵심: ViewModel은 UI 상태를 갖는 게 정상이다

```swift
final class PassengerPickerViewModel {
    @Published var adult = 1
    @Published var isPresented = false      // ← UI 상태. 잘못 아님
    @Published var focusedIndex: Int?       // ← UI 상태
    @Published var errorMessage: String?    // ← UI 상태
}
```

MVVM이 나눈 건 **"로직 vs 화면"이 아니라 "렌더링 vs 렌더링할 상태"**다. 흔한 오해가 여기서 나온다 — "ViewModel에 UI 상태가 있으면 설계가 틀렸다"는 건 MVVM이 그은 선을 잘못 읽은 것.

> **MVVM은 절단면(seam)이지 복제선(fork line)이 아니다.**
> 레이어를 나누는 선이지, 거기서 두 벌을 만들라는 선이 아니다.

MVVM에서 View도 실제론 상태를 갖는다(스크롤·애니메이션·포커스·키보드). MVVM은 그걸 그냥 View 것으로 두고 신경 안 쓴다 — **View가 한 벌이라 드리프트할 상대가 없어서.**

## 절단면이 뚫리는 지점

같은 ViewModel을 UIKit View와 SwiftUI View에 붙이면 폼 수준까진 되는데 **화면 전환에서 터진다.** `pushViewController` vs `NavigationStack(path:)`. ViewModel이 "다음으로 간다"를 어떻게 표현할지, **뒤로 갔을 때 route를 되돌리는 책임이 누구인지**가 애매해진다.
→ 도메인 로직은 잘 공유되는데 **네비게이션이 절단면을 뚫는다.**

**나온 곳:** [여기어때 항공 프론트엔드](../reviews/2026-08-10-yeogieottae-one-codebase-web-webview.md)
