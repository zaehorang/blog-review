'use strict';

/**
 * 학습용 최소 병합기.
 * 실제 tailwind-merge 전체 문법을 구현하지 않고 이 리뷰에 필요한 모델만 보여준다.
 */
function createMerger({ classGroups, conflictingClassGroups = {} }) {
  return function merge(...classLists) {
    const tokens = classLists
      .filter(Boolean)
      .join(' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const kept = [];

    for (const token of tokens) {
      const parsed = parseToken(token);
      const group = findGroup(parsed.utility, classGroups);

      // 모르는 문자열은 충돌을 판정하지 못하므로 그대로 둔다.
      if (!group) {
        kept.push({ ...parsed, token, group: null });
        continue;
      }

      const groupsRemovedByCurrent = new Set([
        group,
        ...(conflictingClassGroups[group] || []),
      ]);

      for (let index = kept.length - 1; index >= 0; index -= 1) {
        const previous = kept[index];
        const sameVariantScope = previous.modifiers === parsed.modifiers;

        if (
          sameVariantScope &&
          previous.group &&
          groupsRemovedByCurrent.has(previous.group)
        ) {
          kept.splice(index, 1);
        }
      }

      kept.push({ ...parsed, token, group });
    }

    return kept.map(({ token }) => token).join(' ');
  };
}

function parseToken(token) {
  const lastColon = token.lastIndexOf(':');

  if (lastColon < 0) {
    return { modifiers: '', utility: token };
  }

  return {
    modifiers: token.slice(0, lastColon),
    utility: token.slice(lastColon + 1),
  };
}

function findGroup(utility, classGroups) {
  for (const { group, test } of classGroups) {
    if (test(utility)) return group;
  }
  return null;
}

const defaultClassGroups = [
  { group: 'bg-color', test: (value) => /^bg-/.test(value) },
  { group: 'p', test: (value) => /^p-/.test(value) },
  { group: 'px', test: (value) => /^px-/.test(value) },
  { group: 'py', test: (value) => /^py-/.test(value) },
  { group: 'pt', test: (value) => /^pt-/.test(value) },
  { group: 'pb', test: (value) => /^pb-/.test(value) },
  { group: 'pl', test: (value) => /^pl-/.test(value) },
  { group: 'pr', test: (value) => /^pr-/.test(value) },
];

const defaultConflicts = {
  p: ['px', 'py', 'pt', 'pb', 'pl', 'pr'],
  px: ['pl', 'pr'],
  py: ['pt', 'pb'],
};

module.exports = {
  createMerger,
  defaultClassGroups,
  defaultConflicts,
  parseToken,
};
