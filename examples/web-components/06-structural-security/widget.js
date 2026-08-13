// widget.js — "CDN에 배포된" 위젯. 이 파일 안에는 토큰도 key도 없다.
// 부모가 api 프로퍼티로 인증된 호출 수단을 쥐여줘야만 동작한다.
const OrderWidget = Vue.defineCustomElement({
  props: ['api'],
  data() {
    return { result: '아직 호출 안 함' };
  },
  template: `<div>
    <button @click="load">주문 데이터 불러오기</button>
    <p>{{ result }}</p>
  </div>`,
  methods: {
    load() {
      if (typeof this.api?.get !== 'function') {
        this.result = '❌ 실패: 부모가 인증된 api 인스턴스를 안 줬음 (파일만 훔쳐온 상태)';
        return;
      }
      this.result = this.api.get('/orders');
    },
  },
});
customElements.define('order-widget', OrderWidget);
