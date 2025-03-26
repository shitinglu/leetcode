/**
 * 9. maxVowels - 单元测试
 */
import { maxVowels } from '../../src/solutions/9';

describe('maxVowels', () => {
  it('示例1', () => {
    const result = maxVowels('abciiidef', 3);
    expect(result).toEqual(3);
  });

  it('示例2', () => {
    const result = maxVowels('aeiou', 2);
    expect(result).toEqual(2);
  });

  it('示例3', () => {
    const result = maxVowels('leetcode', 3);
    expect(result).toEqual(2);
  });

  it('示例4', () => {
    const result = maxVowels('rhythm', 3);
    expect(result).toEqual(0);
  });

  it('示例5', () => {
    const result = maxVowels('tryhard', 4);
    expect(result).toEqual(1);
  });
});
