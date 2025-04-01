/**
 * 2095. 删除链表的中间节点
 *
 * 给你一个链表的头节点 head。删除链表的 中间节点 ，并返回修改后的链表的头节点 head。
 *
 * 长度为 n 的链表的中间节点是从头数起第 ⌊n / 2⌋ 个节点（下标从 0 开始），其中 ⌊x⌋ 表示小于或等于 x 的最大整数。
 *
 * - 对于 n = 1、2、3、4、5 的情况，中间节点的下标分别是 0、1、1、2、2。
 *
 * 示例1：
 * https://assets.leetcode.com/uploads/2021/11/16/eg1drawio.png
 * 输入：head = [1,3,4,7,1,2,6]
 * 输出：[1,3,4,1,2,6]
 * 解释：链表中的中间节点是值为 7 的节点（下标为 3），删除它后返回 [1,3,4,1,2,6]
 *
 * 示例2：
 * https://assets.leetcode.com/uploads/2021/11/16/eg2drawio.png
 * 输入：head = [1,2,3,4]
 * 输出：[1,2,4]
 * 解释：链表中的中间节点是值为 3 的节点（下标为 2），删除它后返回 [1,2,4]
 *
 * 示例3：
 * https://assets.leetcode.com/uploads/2021/11/16/eg3drawio.png
 * 输入：head = [2,1]
 * 输出：[2]
 * 解释：链表中的中间节点是值为 1 的节点（下标为 1），删除它后返回 [2]
 *
 * 提示：
 * - 链表中节点的数目在范围 [1, 105] 内
 * - 1 <= Node.val <= 105
 * */

/**
 * 解题思路：
 * 1. 问题本质
 * - 找到链表的中间节点并删除它
 * - 中间节点的定义：⌊n/2⌋，n为链表长度
 * - 需要找到中间节点的前一个节点以完成删除操作
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 两次遍历法
 * - 第一次遍历计算链表长度
 * - 第二次遍历到中间节点前一个位置进行删除
 * - 时间复杂度O(n)，需要遍历两次
 *
 * B. 快慢指针法（采用此方案）
 * - 使用快指针(fast)和慢指针(slow)
 * - fast每次移动2步，slow每次移动1步
 * - 同时维护prev指针指向slow的前一个节点
 * - 当fast到达末尾时，slow正好在中间位置
 *
 * 3. 具体执行流程(以快慢指针法为例)：
 * 以 [1,2,3,4] 为例：
 * - 初始：fast=1, slow=1, prev=null
 * - 第一步：fast=3, slow=2, prev=1
 * - 第二步：fast=null, slow=3, prev=2
 * - 删除操作：prev.next = slow.next
 * 最终结果：[1,2,4]
 *
 * 4. 关键点
 * - 特殊情况处理：空链表或单节点链表直接返回null
 * - prev指针的必要性：用于删除操作
 * - 快慢指针的移动比例：2:1确保找到中间位置
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n)，只需要一次遍历
 * - 空间复杂度：O(1)，只使用了几个指针变量
 *
 * 6. 方法选择
 * - 快慢指针法优于两次遍历法
 * - 只需要一次遍历就能找到中间节点
 * - 无需额外空间，实现简洁高效
 */

// Definition for singly-linked list.
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function deleteMiddle(head: ListNode | null): ListNode | null {
  // 特殊情况处理：如果链表为空或只有一个节点
  if (head === null || head.next === null) {
    return null;
  }

  // 使用快慢指针
  let slow = head;
  let fast = head;
  let prev = null; // 用于记录慢指针的前一个节点

  // 快指针每次走两步，慢指针每次走一步
  // 当快指针到达末尾时，慢指针正好在中间位置
  while (fast && fast.next) {
    fast = fast.next.next;
    prev = slow;
    slow = slow.next;
  }

  // 删除中间节点
  if (prev) {
    prev.next = slow.next;
  }

  return head;
}

export default {
  run: () => {
    // 测试用例1: [1,3,4,7,1,2,6]
    const test1 = new ListNode(1);
    test1.next = new ListNode(3);
    test1.next.next = new ListNode(4);
    test1.next.next.next = new ListNode(7);
    test1.next.next.next.next = new ListNode(1);
    test1.next.next.next.next.next = new ListNode(2);
    test1.next.next.next.next.next.next = new ListNode(6);

    // 测试用例2: [1,2,3,4]
    const test2 = new ListNode(1);
    test2.next = new ListNode(2);
    test2.next.next = new ListNode(3);
    test2.next.next.next = new ListNode(4);

    // 测试用例3: [2,1]
    const test3 = new ListNode(2);
    test3.next = new ListNode(1);

    const printList = (head: ListNode | null): number[] => {
      const result: number[] = [];
      let current = head;
      while (current !== null) {
        result.push(current.val);
        current = current.next;
      }
      return result;
    };

    console.log('测试用例1:');
    console.log('输入:', printList(test1));
    console.log('输出:', printList(deleteMiddle(test1)));

    console.log('\n测试用例2:');
    console.log('输入:', printList(test2));
    console.log('输出:', printList(deleteMiddle(test2)));

    console.log('\n测试用例3:');
    console.log('输入:', printList(test3));
    console.log('输出:', printList(deleteMiddle(test3)));
  },
};
