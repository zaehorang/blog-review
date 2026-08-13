'use strict';

const assert = require('node:assert/strict');
const { createMerger } = require('../lib/mini-tailwind-merge');

const yfPaddingGroups = [
  { group: 'yf-p', test: (value) => /^yf-p-/.test(value) },
  { group: 'yf-px', test: (value) => /^yf-px-/.test(value) },
  { group: 'yf-py', test: (value) => /^yf-py-/.test(value) },
  { group: 'yf-pt', test: (value) => /^yf-pt-/.test(value) },
  { group: 'yf-pb', test: (value) => /^yf-pb-/.test(value) },
  { group: 'yf-pl', test: (value) => /^yf-pl-/.test(value) },
  { group: 'yf-pr', test: (value) => /^yf-pr-/.test(value) },
];

const twMerge = createMerger({
  classGroups: yfPaddingGroups,
  conflictingClassGroups: {
    'yf-p': ['yf-px', 'yf-py', 'yf-pt', 'yf-pb', 'yf-pl', 'yf-pr'],
    'yf-px': ['yf-pl', 'yf-pr'],
    'yf-py': ['yf-pt', 'yf-pb'],
  },
});

const wholeLast = twMerge('yf-px-8 yf-p-16');
const partialLast = twMerge('yf-p-16 yf-px-8');
const axisLast = twMerge('yf-pt-4 yf-pb-4 yf-py-20');

console.log('좌우 8 → 전체 16:', wholeLast);
console.log('전체 16 → 좌우 8:', partialLast);
console.log('위 4 + 아래 4 → 세로 20:', axisLast);

assert.equal(wholeLast, 'yf-p-16');
assert.equal(partialLast, 'yf-p-16 yf-px-8');
assert.equal(axisLast, 'yf-py-20');

console.log('\n✅ 뒤의 클래스가 앞의 효과를 완전히 없앨 때만 앞을 지운다.');
