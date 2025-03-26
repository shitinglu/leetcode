/**
 * 19. maxArea - 单元测试
 */
import { maxArea } from '../../src/solutions/19';

describe('maxArea', () => {
  it('should return 49 for [1,8,6,2,5,4,8,3,7]', () => {
    const result = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
    expect(result).toBe(49);
  });

  it('should return 1 for [1,1]', () => {
    const result = maxArea([1, 1]);
    expect(result).toBe(1);
  });
});
