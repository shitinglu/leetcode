/**
 * 206. 反转链表
 *
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 *
 * 示例：
 * 输入：head = [1,2,3,4,5]
 * 输出：[5,4,3,2,1]
 *
 * 输入：head = [1,2]
 * 输出：[2,1]
 *
 * 输入：head = []
 * 输出：[]
 *
 * 提示：
 * - 链表中节点的数目范围是 [0, 5000]
 * - -5000 <= Node.val <= 5000
 *
 * 进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？
 */

/**
 * 问题: 206. 反转链表
 *
 * 解题思路：
 * 1. 问题本质
 * - 将单向链表的指向完全反转
 * - 原链表中每个节点的next指向下一个节点，需要改为指向前一个节点
 * - 最终返回新的头节点（即原链表的尾节点）
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 迭代法
 * - 使用三个指针（prev、current、next）遍历链表
 * - 每次迭代中改变current节点的next指向prev
 * - 然后移动prev和current指针向前一步
 *
 * B. 递归法
 * - 递归到链表末尾
 * - 在回溯过程中改变指针指向
 * - 将子问题的结果（反转后的链表头）向上传递
 *
 * 3. 具体执行流程(以迭代法为例)：
 * 以 head = [1,2,3,4,5] 为例：
 * - 初始状态: prev = null, current = 1->2->3->4->5, next = null
 * - 第一步: next = 2->3->4->5, 1->null, prev = 1->null, current = 2->3->4->5
 * - 第二步: next = 3->4->5, 2->1->null, prev = 2->1->null, current = 3->4->5
 * - 第三步: next = 4->5, 3->2->1->null, prev = 3->2->1->null, current = 4->5
 * - 第四步: next = 5, 4->3->2->1->null, prev = 4->3->2->1->null, current = 5
 * - 第五步: next = null, 5->4->3->2->1->null, prev = 5->4->3->2->1->null, current = null
 * - 最终返回: prev = 5->4->3->2->1->null
 *
 * 4. 关键点
 * - 需要保存下一个节点的引用，因为在改变current.next后会丢失原始链表的后续部分
 * - 终止条件为当前节点为null
 * - 最终需要返回的是prev而不是current，因为循环结束时current已经为null
 * - 特殊情况处理：空链表或单节点链表
 *
 * 5. 复杂度分析
 * - 迭代法：
 *   - 时间复杂度：O(n)，其中n是链表的长度，需要遍历整个链表
 *   - 空间复杂度：O(1)，只使用了常数额外空间
 *
 * - 递归法：
 *   - 时间复杂度：O(n)，需要递归处理每个节点
 *   - 空间复杂度：O(n)，递归调用栈的深度与链表长度成正比
 *
 * 6. 方法选择
 * - 迭代法更为高效，尤其是在处理长链表时节省空间
 * - 递归法思路更简洁，但有栈溢出的风险
 * - 在实际应用中，通常优先选择迭代法
 */

// 定义链表节点类型
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;

  while (current !== null) {
    // 保存下一个节点
    const next = current.next;
    // 反转当前节点的指针
    current.next = prev;

    // 移动指针
    prev = current;
    current = next;
  }
  return prev; // 新的头节点
}

export default {
  run: () => {
    // 创建示例链表: 1->2->3->4->5
    const list1 = new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    );
    // 创建示例链表: 1->2
    const list2 = new ListNode(1, new ListNode(2));
    // 空链表
    const list3 = null;

    // 打印结果
    console.log('示例1结果:');
    printList(reverseList(list1));

    console.log('示例2结果:');
    printList(reverseList(list2));

    console.log('示例3结果:');
    printList(reverseList(list3));

    // 辅助函数：打印链表
    function printList(head: ListNode | null) {
      const values = [];
      let current = head;
      while (current) {
        values.push(current.val);
        current = current.next;
      }
      console.log(values.join(' -> ') || 'empty');
    }
  },
};
