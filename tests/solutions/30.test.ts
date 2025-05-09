/**
 * 30. reverseList - 单元测试
 */
import { reverseList, ListNode } from '../../src/solutions/30';

describe('reverseList', () => {
  test('示例1', () => {
    const head = new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    );
    const result = reverseList(head);
    expect(result).toEqual(
      new ListNode(5, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(1)))))
    );
  });

  test('示例2', () => {
    const head = new ListNode(1, new ListNode(2));
    const result = reverseList(head);
    expect(result).toEqual(new ListNode(2, new ListNode(1)));
  });

  test('示例3', () => {
    const head = null;
    const result = reverseList(head);
    expect(result).toEqual(null);
  });

  test('示例4', () => {
    const head = new ListNode(1);
    const result = reverseList(head);
    expect(result).toEqual(new ListNode(1));
  });
});
