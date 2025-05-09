/**
 * 2130. 链表最大孪生和
 *
 * 在一个大小为 n 的链表中，n 是偶数，索引从 0 开始。
 *
 * 链表中的节点按照奇偶链表的形式存储。形式上，如果索引是奇数，节点位于奇数链表中；如果索引是偶数，节点位于偶数链表中。
 *
 * 我们称链表中第 i 个节点和第 n-1-i 个节点为孪生节点。比方说，n = 4 的链表中，节点 0 和节点 3 是孪生节点，节点 1 和节点 2 是孪生节点。
 *
 * 孪生和 定义为孪生节点的值之和。
 *
 * 给你一个长度为偶数的链表的头节点 head ，请你返回链表的 最大孪生和 。
 *
 * 示例：
 * 输入：head = [5,4,2,1]
 * 输出：6
 * 解释：
 * 节点 0 和节点 3 为孪生节点，值之和为 5 + 1 = 6 。
 * 节点 1 和节点 2 为孪生节点，值之和为 4 + 2 = 6 。
 * 孪生和的最大值为 6 。
 *
 * 输入：head = [4,2,2,3]
 * 输出：7
 * 解释：
 * 节点 0 和节点 3 为孪生节点，值之和为 4 + 3 = 7 。
 * 节点 1 和节点 2 为孪生节点，值之和为 2 + 2 = 4 。
 * 孪生和的最大值为 7 。
 *
 * 输入：head = [1,100000]
 * 输出：100001
 * 解释：
 * 节点 0 和节点 1 为孪生节点，值之和为 1 + 100000 = 100001 。
 * 孪生和的最大值为 100001 。
 *
 * 提示：
 * - 链表的节点数目是 [2, 10^5] 范围内的偶数。
 * - 1 <= Node.val <= 10^5
 */

/**
 * 问题: 2130. 链表最大孪生和
 *
 * 解题思路：
 * 1. 问题本质
 * - 在长度为偶数的链表中找到对称位置节点值之和的最大值
 * - 对于节点i和节点n-1-i，它们是孪生节点（对称的位置）
 * - 需要计算所有孪生节点对的和，并找出最大值
 *
 * 2. 解决方案（三种主要方法）
 *
 * A. 转换为数组法
 * - 将链表所有元素存入数组
 * - 计算对应索引位置的和，找出最大值
 * - 简单直观但需要O(n)额外空间
 *
 * B. 快慢指针 + 反转链表法（最优解）
 * - 使用快慢指针找到链表中点
 * - 同时反转前半部分链表
 * - 遍历前半部分（已反转）和后半部分计算孪生和
 * - 空间复杂度为O(1)
 *
 * C. 栈方法
 * - 使用快慢指针找到链表中点
 * - 将前半部分元素入栈
 * - 遍历后半部分时从栈顶弹出元素计算和
 * - 需要O(n/2)额外空间
 *
 * 3. 具体执行流程(以快慢指针+反转链表为例)：
 * 以 head = [5,4,2,1] 为例：
 * - 初始状态：slow=5, fast=5, prev=null
 * - 第1次迭代：
 *   - fast移动到2
 *   - 保存next=4
 *   - 反转5：5.next=null
 *   - prev=5, slow=4
 *   - 链表变为：[prev(5->null)], [slow(4->2->1)]
 * - 第2次迭代：
 *   - fast移动到null
 *   - 保存next=2
 *   - 反转4：4.next=5
 *   - prev=4, slow=2
 *   - 链表变为：[prev(4->5->null)], [slow(2->1)]
 * - 计算孪生和：
 *   - 第一对：4+2=6
 *   - 第二对：5+1=6
 *   - 最大孪生和为6
 *
 * 4. 关键点
 * - 快慢指针寻找中点：快指针移动速度是慢指针的两倍
 * - 链表反转：将链表前半部分反转可以方便配对
 * - 时间复杂度分析：整体算法只需要遍历链表一次，O(n)
 * - 空间复杂度分析：只使用常数额外空间，O(1)
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n)，只需要一次遍历
 * - 空间复杂度：O(1)，只使用常数额外空间
 *
 * 6. 方法选择
 * - 快慢指针+反转链表法是最优解，空间复杂度为O(1)
 * - 数组法和栈法虽然更直观，但需要额外空间
 * - 当空间受限时，应首选快慢指针+反转链表法
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

export function pairSum(head: ListNode | null): number {
  if (!head) return 0;

  // 使用快慢指针找到链表中点
  let slow: ListNode | null = head; // 慢指针，初始指向头节点5
  let fast: ListNode | null = head; // 快指针，初始指向头节点5

  // 前半部分链表
  let prev: ListNode | null = null; // 用于链表反转，初始为null

  // 找中点的同时反转前半部分链表
  while (fast && fast.next) {
    fast = fast.next.next; // 快指针每次前进两步
    // 反转前半部分链表
    const next: ListNode | null = slow!.next; // 保存slow的下一个节点
    slow!.next = prev; // 反转链表操作：让当前节点指向前一个节点
    prev = slow; // prev指针前进一步
    slow = next; // slow指针前进一步
  }

  // 此时prev指向前半部分的最后一个节点（反转后的头结点）
  // slow指向后半部分的第一个节点

  let maxSum = 0;
  while (prev && slow) {
    maxSum = Math.max(maxSum, prev.val + slow.val);
    prev = prev.next;
    slow = slow.next;
  }

  return maxSum;
}

// 辅助函数: 从数组创建链表
function createLinkedList(arr: number[]): ListNode | null {
  if (!arr.length) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

export default {
  run: () => {
    const examples = [
      {
        input: [5, 4, 2, 1],
        output: 6,
      },
      {
        input: [4, 2, 2, 3],
        output: 7,
      },
      {
        input: [1, 100000],
        output: 100001,
      },
    ];

    for (const example of examples) {
      const list = createLinkedList(example.input);
      const result = pairSum(list);
      console.log(`输入: head = [${example.input}], 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
