'use strict';

const assert = require('node:assert/strict');
const { createMerger } = require('../lib/mini-tailwind-merge');

const mergeConfiguredClasses = createMerger({
  classGroups: [
    { group: 'yf-bg-color', test: (value) => /^yf-bg-/.test(value) },
    { group: 'yf-flex', test: (value) => value === 'yf-flex' || value === 'yf-block' },
    { group: 'yf-items', test: (value) => /^yf-items-/.test(value) },
    { group: 'yf-gap', test: (value) => /^yf-gap-/.test(value) },
  ],
});

function tw(strings, ...values) {
  const raw = String.raw({ raw: strings }, ...values);
  return mergeConfiguredClasses(raw);
}

const sameVariant = mergeConfiguredClasses(
  'mobile:yf-bg-blue-500 mobile:yf-bg-red-500'
);
const differentVariants = mergeConfiguredClasses(
  'mobile:yf-bg-blue-500 desktop:yf-bg-red-500'
);
const hover = mergeConfiguredClasses(
  'hover:yf-bg-blue-500 hover:yf-bg-red-500 yf-bg-white'
);
const componentClass = tw`yf-flex yf-items-center yf-gap-4 yf-gap-8`;

console.log('같은 variant:', sameVariant);
console.log('다른 variant:', differentVariants);
console.log('hover와 기본 상태:', hover);
console.log('tw 래퍼 결과:', componentClass);

assert.equal(sameVariant, 'mobile:yf-bg-red-500');
assert.equal(differentVariants, 'mobile:yf-bg-blue-500 desktop:yf-bg-red-500');
assert.equal(hover, 'hover:yf-bg-red-500 yf-bg-white');
assert.equal(componentClass, 'yf-flex yf-items-center yf-gap-8');

console.log('\n✅ variant 범위가 같을 때만 충돌하고, 팀은 tw 사용법만 알면 된다.');
