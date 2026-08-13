'use strict';

const assert = require('node:assert/strict');
const { createMerger, defaultClassGroups } = require('../lib/mini-tailwind-merge');

const plainMerge = createMerger({ classGroups: defaultClassGroups });

function stripPrefixMerge(classList, prefix = 'yf-') {
  const stripped = classList.replaceAll(prefix, '');
  const merged = plainMerge(stripped);

  return merged
    .split(' ')
    .map((token) => {
      const lastColon = token.lastIndexOf(':');
      if (lastColon < 0) return `${prefix}${token}`;
      return `${token.slice(0, lastColon + 1)}${prefix}${token.slice(lastColon + 1)}`;
    })
    .join(' ');
}

const basic = stripPrefixMerge('yf-bg-blue-500 yf-bg-red-500');
const custom = stripPrefixMerge('yf-yds6-TypoUi-14 yf-yds6-TypoUi-16');
const arbitraryValue = 'yf-content-["logo-yf-dark"]'.replaceAll('yf-', '');

console.log('기본 유틸리티:', basic);
console.log('커스텀 유틸리티:', custom);
console.log('임의값 무차별 치환:', arbitraryValue);

assert.equal(basic, 'yf-bg-red-500');
assert.equal(custom, 'yf-yds6-TypoUi-14 yf-yds6-TypoUi-16');
assert.equal(arbitraryValue, 'content-["logo-dark"]');

console.log('\n✅ prefix를 떼도 기본 분류표가 모르는 커스텀 역할은 여전히 모른다.');
