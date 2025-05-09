/**
 * 31. pairSum - 单元测试
 */
import { pairSum, ListNode } from '../../src/solutions/31';

describe('pairSum', () => {
  test('示例1', () => {
    const head = new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    );
    const result = pairSum(head);
    expect(result).toEqual(7);
  });

  test('示例2', () => {
    const head = new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6)))))
    );
    const result = pairSum(head);
    expect(result).toEqual(7);
  });

  test('示例3', () => {
    const head = new ListNode(
      1,
      new ListNode(
        2,
        new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, new ListNode(7)))))
      )
    );
    const result = pairSum(head);
    expect(result).toEqual(7);
  });
});
