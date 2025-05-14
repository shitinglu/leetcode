/**
 * 43. predictPartyVictory - 单元测试
 */
import { predictPartyVictory } from '../../src/solutions/43';

describe('predictPartyVictory', () => {
  it('示例1', () => {
    const senate = 'RD';
    const result = predictPartyVictory(senate);
    expect(result).toBe('Radiant');
  });

  it('示例2', () => {
    const senate = 'RDD';
    const result = predictPartyVictory(senate);
    expect(result).toBe('Dire');
  });
});
