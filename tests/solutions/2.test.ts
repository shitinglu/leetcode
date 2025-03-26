/**
 * 2. mergeAlternately - 单元测试
 */
import { solution } from '../../src/solutions/2';

describe('mergeAlternately', () => {
  test('示例1', () => {
    const word1 = 'abc';
    const word2 = 'pqr';
    const result = solution(word1, word2);
    expect(result).toBe('apbqcr');
  });
  test('示例2', () => {
    const word1 = 'ab';
    const word2 = 'pqrs';
    const result = solution(word1, word2);
    expect(result).toBe('apbqrs');
  });
  test('示例3', () => {
    const word1 = 'abcd';
    const word2 = 'pq';
    const result = solution(word1, word2);
    expect(result).toBe('apbqcd');
  });
});
