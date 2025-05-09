/**
 * 328. 奇偶链表
 *
 * 给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。
 * 第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。
 * 请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。
 * 你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。
 *
 * 示例：
 * 输入：head = [1,2,3,4,5]
 * https://assets.leetcode.com/uploads/2021/03/10/oddeven-linked-list.jpg
 * 输出：[1,3,5,2,4]
 *
 * 输入：head = [2,1,3,5,6,4,7]
 *
 * 输出：[2,3,6,7,1,5,4]
 * https://assets.leetcode.com/uploads/2021/03/10/oddeven2-linked-list.jpg
 * 提示：
 * - n == 链表中的节点数
 * - 0 <= n <= 10^4
 * - -10^6 <= Node.val <= 10^6
 */

/**
 * 328. 奇偶链表
 *
 * 解题思路：
 * 1. 问题本质
 * - 将链表分成两部分：奇数位置(1,3,5...)的节点和偶数位置(2,4,6...)的节点
 * - 然后将偶数部分链接到奇数部分末尾
 * - 需要保持各自部分内部的相对顺序不变
 *
 * 2. 解决方案
 * - 使用两个指针分别跟踪奇数和偶数位置的节点
 * - 同时遍历并重新构建链表结构
 * - 需要保存偶数链表的头节点，用于最后连接
 *
 * 3. 具体执行流程
 * 以 head = [1,2,3,4,5] 为例：
 * - 初始状态：odd->1, even->2, evenHead->2
 * - 第一轮循环：
 *   a. odd.next = even.next (1->3)
 *   b. odd = odd.next (odd->3)
 *   c. even.next = odd.next (2->4)
 *   d. even = even.next (even->4)
 * - 第二轮循环：
 *   a. odd.next = even.next (3->5)
 *   b. odd = odd.next (odd->5)
 *   c. even.next = odd.next (4->null)
 *   d. even = even.next (even->null)
 * - 跳出循环，连接两部分：odd.next = evenHead (5->2)
 * - 最终结果：1->3->5->2->4->null
 *
 * 4. 关键点
 * - 使用三个指针：odd, even, evenHead
 * - evenHead保存偶数链表的头节点，用于最后连接
 * - 链表操作的顺序很重要：先修改结构，再移动指针
 * - 边界情况：空链表或只有一个节点的链表直接返回
 * - 循环终止条件：even为空或even.next为空
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n)，需要遍历整个链表一次
 * - 空间复杂度：O(1)，只使用了几个指针变量，与链表长度无关
 *
 * 6. 方法选择
 * - 此题使用双指针技术是最优解法
 * - 无需额外空间，在原链表上操作
 * - 满足题目的O(1)空间复杂度和O(n)时间复杂度要求
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

export function oddEvenList(head: ListNode | null): ListNode | null {
  // 处理边界情况
  if (!head || !head.next) return head;

  let odd: ListNode | null = head; // 奇数位置节点
  let even: ListNode | null = head.next; // 偶数位置节点
  let evenHead: ListNode | null = even; // 保存偶数链表的头节点

  while (even && even.next) {
    // 奇数节点指向下一个奇数节点
    odd!.next = even.next; // 修改链表结构，更改当前奇数节点的next指针

    odd = odd!.next; // 移动odd指针到下一个奇数节点位置
    // 偶数节点指向下一个偶数节点
    even.next = odd.next;
    even = even.next;
  }

  // 连接奇偶链表
  odd!.next = evenHead;

  return head;
}

export default {
  run: () => {
    // 创建测试用例
    const createList = (arr: number[]): ListNode | null => {
      if (!arr.length) return null;
      const dummy = new ListNode(0);
      let current = dummy;
      for (const val of arr) {
        current.next = new ListNode(val);
        current = current.next;
      }
      return dummy.next;
    };

    // 将链表转换为数组以便打印
    const listToArray = (head: ListNode | null): number[] => {
      const result: number[] = [];
      let current = head;
      while (current) {
        result.push(current.val);
        current = current.next;
      }
      return result;
    };

    const examples = [
      {
        input: [1, 2, 3, 4, 5],
        output: [1, 3, 5, 2, 4],
      },
      {
        input: [2, 1, 3, 5, 6, 4, 7],
        output: [2, 3, 6, 7, 1, 5, 4],
      },
    ];

    for (const example of examples) {
      const inputList = createList(example.input);
      const result = oddEvenList(inputList);
      const resultArray = listToArray(result);
      console.log(`输入: head = [${example.input}], 输出: [${resultArray}]`);
      console.log(
        `测试结果: ${JSON.stringify(resultArray) === JSON.stringify(example.output) ? '通过' : '失败'}`
      );
    }
  },
};
