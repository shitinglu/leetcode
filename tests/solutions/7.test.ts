/**
 * 6. isSubsequence - 单元测试
 */
import { isSubsequence } from '../../src/solutions/7';

describe('isSubsequence', () => {
  test('示例1', () => {
    expect(isSubsequence('abc', 'ahbgdc')).toBe(true);
  });

  test('示例2', () => {
    expect(isSubsequence('axc', 'ahbgdc')).toBe(false);
  });
});
