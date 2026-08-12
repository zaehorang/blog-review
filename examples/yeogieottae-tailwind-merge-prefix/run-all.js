'use strict';

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const demos = [
  '01-default-vs-prefix',
  '02-strip-prefix-limit',
  '03-class-groups',
  '04-conflicting-class-groups',
  '05-variants-and-wrapper',
];

for (const demo of demos) {
  console.log(`\n${'='.repeat(72)}\n${demo}\n${'='.repeat(72)}`);
  const result = spawnSync(process.execPath, [path.join(__dirname, demo, 'demo.js')], {
    stdio: 'inherit',
  });

  if (result.status !== 0) process.exit(result.status || 1);
}

console.log('\n모든 실습의 예상 결과를 확인했습니다.');
