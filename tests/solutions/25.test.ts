/**
 * 25. removeStars - 单元测试
 */
import { removeStars } from '../../src/solutions/25';

describe('removeStars', () => {
  it('示例1', () => {
    const result = removeStars('leet**cod*e');
    expect(result).toBe('lecoe');
  });

  it('示例2', () => {
    const result = removeStars('erase*****');
    expect(result).toBe('');
  });

  it('示例3', () => {
    const result = removeStars('abb*cdfg*****x*');
    expect(result).toBe('a');
  });
});
