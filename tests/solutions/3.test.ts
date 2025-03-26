/**
 * 3. gcdOfStrings - 单元测试
 */
import { solution } from '../../src/solutions/3';

describe('gcdOfStrings', () => {
  test('示例1', () => {
    const result = solution('ABCABC', 'ABC');
    expect(result).toBe('ABC');
  });

  test('示例2', () => {
    const result = solution('ABABAB', 'ABAB');
    expect(result).toBe('AB');
  });

  test('示例3', () => {
    const result = solution('LEET', 'CODE');
    expect(result).toBe('');
  });
});
