/**
 * 42. RecentCounter - 单元测试
 */
import { RecentCounter } from '../../src/solutions/42';

describe('RecentCounter', () => {
  it('示例1', () => {
    const recentCounter = new RecentCounter();
    expect(recentCounter.ping(1)).toBe(1);
    expect(recentCounter.ping(100)).toBe(2);
    expect(recentCounter.ping(3001)).toBe(3);
    expect(recentCounter.ping(3002)).toBe(3);
  });
});
