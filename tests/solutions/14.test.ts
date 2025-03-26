/**
 * 14. reverseVowels - 单元测试
 */
import { reverseVowels } from '../../src/solutions/14';

describe('reverseVowels', () => {
  it('示例1', () => {
    const result = reverseVowels('IceCreAm');
    expect(result).toBe('AceCreIm');
  });

  it('示例2', () => {
    const result = reverseVowels('leetcode');
    expect(result).toBe('leotcede');
  });
});
