/**
 * 5. canPlaceFlowers - 单元测试
 */
import { canPlaceFlowers } from '../../src/solutions/5';

describe('canPlaceFlowers', () => {
  it('should return true if the flowers can be planted', () => {
    expect(canPlaceFlowers([1, 0, 0, 0, 1], 1)).toBe(true);
  });

  it('should return false if the flowers cannot be planted', () => {
    expect(canPlaceFlowers([1, 0, 0, 0, 1], 2)).toBe(false);
  });
});
