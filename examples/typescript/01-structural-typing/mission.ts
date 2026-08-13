interface Point {
  x: number;
  y: number;
}

function printPosition(p: Point) {
  console.log(`위치: ${p.x}, ${p.y}`);
}

// 미션 A: 객체 리터럴을 "그 자리에서 직접" 넘긴다.
printPosition({ x: 10, y: 20 });

// 미션 B: 완전히 같은 모양인데, 변수에 담았다가 넘긴다.
const myObj = { x: 10, y: 20, z: 30 };
printPosition(myObj);

class MyPoint {
  x: number;
  y: number
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function printPosition2(p: MyPoint) {
  console.log(`위치: ${p.x}, ${p.y}`);
}

// 미션 C: 클래스 인스턴스를 넘긴다.
const point = new MyPoint(100, 200);
printPosition2(point);

printPosition({x: 100, yy: 200});