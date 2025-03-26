/**
 * 15. reverseWords - 单元测试
 */
import { reverseWords } from '../../src/solutions/15';

describe('reverseWords', () => {
  it('示例1', () => {
    const result = reverseWords('the sky is blue');
    expect(result).toBe('blue is sky the');
  });

  it('示例2', () => {
    const result = reverseWords('  hello world  ');
    expect(result).toBe('world hello');
  });

  it('示例3', () => {
    const result = reverseWords('a good   example');
    expect(result).toBe('example good a');
  });
});
