/**
 * 29. oddEvenList - 单元测试
 */
import { oddEvenList, ListNode } from '../../src/solutions/29';

describe('oddEvenList', () => {
  test('示例1', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
    const result = oddEvenList(head);
    expect(result).toEqual(new ListNode(1, new ListNode(3, new ListNode(5, new ListNode(2, new ListNode(4))))));
  });

  test('示例2', () => {
    const head = new ListNode(2, new ListNode(1, new ListNode(3, new ListNode(5, new ListNode(6, new ListNode(4, new ListNode(7)))))));
    const result = oddEvenList(head);
    expect(result).toEqual(new ListNode(2, new ListNode(3, new ListNode(6, new ListNode(7, new ListNode(1, new ListNode(5, new ListNode(4)))))));
  });
  
  
});
