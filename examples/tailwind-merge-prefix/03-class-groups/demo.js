'use strict';

const assert = require('node:assert/strict');
const { createMerger } = require('../lib/mini-tailwind-merge');

const classes = [
  'yf-text-center',
  'yf-text-14',
  'yf-text-ellipsis',
  'yf-text-content-primary',
].join(' ');

const coarseMerge = createMerger({
  classGroups: [
    { group: 'text-everything', test: (value) => /^yf-text-/.test(value) },
  ],
});

const refinedMerge = createMerger({
  classGroups: [
    { group: 'text-align', test: (value) => /^yf-text-(left|center|right)$/.test(value) },
    { group: 'text-size', test: (value) => /^yf-text-\d+$/.test(value) },
    { group: 'text-overflow', test: (value) => /^yf-text-(ellipsis|clip)$/.test(value) },
    // catch-all: 앞의 구체적 규칙에 안 걸린 yf-text-*만 색상으로 본다.
    { group: 'text-color', test: (value) => /^yf-text-/.test(value) },
  ],
});

const coarse = coarseMerge(classes);
const refined = refinedMerge(classes);

console.log('접두어 하나로 뭉친 결과:', coarse);
console.log('CSS 역할별로 나눈 결과:', refined);

assert.equal(coarse, 'yf-text-content-primary');
assert.equal(refined, classes);

console.log('\n✅ 같은 yf-text-*라도 역할이 다르면 서로 지우면 안 된다.');
