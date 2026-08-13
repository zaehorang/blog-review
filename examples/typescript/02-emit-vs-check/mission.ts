function double(x: number): number {
  return x * 2;
}

// 일부러 타입 에러: 문자열을 number 자리에 넣는다.
const result: number = double("5");
console.log("result:", result);


