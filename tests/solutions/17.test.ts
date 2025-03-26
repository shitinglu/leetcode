/**
 * 17. compress - 单元测试
 */
import { compress } from '../../src/solutions/17';

describe('compress', () => {
  test('示例1', () => {
    // 实现测试...
    expect(compress(['a', 'a', 'b', 'b', 'c', 'c', 'c'])).toEqual(6);
  });
  test('示例2', () => {
    expect(compress(['a'])).toEqual(1);
  });
  test('示例3', () => {
    expect(compress(['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'])).toEqual(4);
  });
});
