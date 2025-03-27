/**
 * 24. closeStrings - 单元测试
 */
import { closeStrings } from '../../src/solutions/24';

describe('closeStrings', () => {
  it('示例1', () => {
    const result = closeStrings('abc', 'bca');
    expect(result).toBe(true);
  });

  it('示例2', () => {
    const result = closeStrings('a', 'aa');
    expect(result).toBe(false);
  });

  it('示例3', () => {
    const result = closeStrings('cabbba', 'abbccc');
    expect(result).toBe(true);
  });
});
