/**
 * 28. deleteMiddle - 单元测试
 */
import { deleteMiddle, ListNode } from '../../src/solutions/28';

describe('deleteMiddle', () => {
  test('示例1', () => {
    const head = new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    );
    const result = deleteMiddle(head);
    expect(result).toEqual(new ListNode(1, new ListNode(2, new ListNode(4, new ListNode(5)))));
  });

  test('示例2', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
    const result = deleteMiddle(head);
    expect(result).toEqual(new ListNode(1, new ListNode(2, new ListNode(4))));
  });

  test('示例3', () => {
    const head = new ListNode(2, new ListNode(1));
    const result = deleteMiddle(head);
    expect(result).toEqual(new ListNode(2));
  });

  test('示例4', () => {
    const head = new ListNode(1);
    const result = deleteMiddle(head);
    expect(result).toEqual(null);
  });
});
