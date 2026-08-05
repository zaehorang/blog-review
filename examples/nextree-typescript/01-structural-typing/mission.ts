interface Point {
  x: number;
  y: number;
}

function printPosition(p: Point) {
  console.log(`위치: ${p.x}, ${p.y}`);
}

// 미션 A: 객체 리터럴을 "그 자리에서 직접" 넘긴다.
printPosition({ x: 10, y: 20, z: 30 });

// 미션 B: 완전히 같은 모양인데, 변수에 담았다가 넘긴다.
const myObj = { x: 10, y: 20, z: 30 };
printPosition(myObj);
