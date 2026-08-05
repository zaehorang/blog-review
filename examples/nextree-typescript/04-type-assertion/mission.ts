// --- 위험한 as: any를 거치면 컴파일러가 눈감아준다 ---
const raw: any = "문자열인데";
const num = raw as number;
console.log(num.toFixed(2));

// --- 안전한 as: as const로 타입을 "좁혀서" 오히려 실수를 막는다 ---
type Method = "GET" | "POST";

function request(method: Method) {
  console.log(`${method} 요청`);
}

let method1 = "GET"; // 타입: string으로 추론됨
let method2 = "GET" as const; // 타입: "GET" 리터럴로 고정됨

request(method1); // 컴파일될까?
request(method2); // 컴파일될까?
