'use strict';

const assert = require('node:assert/strict');
const {
  createMerger,
  defaultClassGroups,
  defaultConflicts,
} = require('../lib/mini-tailwind-merge');

const twMerge = createMerger({
  classGroups: defaultClassGroups,
  conflictingClassGroups: defaultConflicts,
});

const known = twMerge('bg-blue-500 bg-red-500');
const unknown = twMerge('yf-bg-blue-500 yf-bg-red-500');

console.log('기본 클래스:', known);
console.log('yf- 클래스:', unknown);

assert.equal(known, 'bg-red-500');
assert.equal(unknown, 'yf-bg-blue-500 yf-bg-red-500');

console.log('\n✅ prefix가 붙은 클래스를 모르면 충돌을 판정하지 못한다.');
