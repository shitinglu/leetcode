/**
 * 2336. 无限集中的最小数字
 * 题目链接: https://leetcode.cn/problems/smallest-number-in-infinite-set/
 *
 * 现有一个包含所有正整数的集合 [1, 2, 3, 4, 5, ...] 。
 *
 * 实现 SmallestInfiniteSet 类:
 * - SmallestInfiniteSet() 初始化 SmallestInfiniteSet 对象以包含所有正整数。
 * - int popSmallest() 移除并返回该无限集中的最小整数。
 * - void addBack(int num) 如果正整数 num 不 存在于无限集中，则将一个 num 添加到该无限集中。
 *
 * 示例：
 * 输入：
 * ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
 * [[], [2], [], [], [], [1], [], [], []]
 * 输出：
 * [null, null, 1, 2, 3, null, 1, 4, 5]
 *
 * 解释：
 * SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
 * smallestInfiniteSet.addBack(2);    // 2 已经在集合中，所以没有变化。
 * smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 是最小的整数，并将其从集合中移除。
 * smallestInfiniteSet.popSmallest(); // 返回 2 ，并将其从集合中移除。
 * smallestInfiniteSet.popSmallest(); // 返回 3 ，并将其从集合中移除。
 * smallestInfiniteSet.addBack(1);    // 将 1 添加到该集合中。
 * smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 在上一步中被添加到集合中，
 *                                    // 且 1 是最小的整数，并将其从集合中移除。
 * smallestInfiniteSet.popSmallest(); // 返回 4 ，并将其从集合中移除。
 * smallestInfiniteSet.popSmallest(); // 返回 5 ，并将其从集合中移除。
 *
 * 提示：
 * - 1 <= num <= 1000
 * - 最多调用 popSmallest 和 addBack 方法 共计 1000 次
 */

/**
 * 问题: 2336. 无限集中的最小数字
 *
 * 解题思路：
 * 1. 问题本质
 *   - 管理一个无限的正整数集合
 *   - 需要支持移除最小元素和添加元素的操作
 *   - 初始状态包含所有正整数
 *
 * 2. 解决方案（三种主要方法）
 *
 * A. 标记删除法
 *   - 使用Set记录被删除的元素
 *   - 使用指针追踪当前可能的最小元素
 *   - 通过检查元素是否在删除集合中确定最小值
 *
 * B. 记录添加法
 *   - 使用一个指针记录当前未被移除的最小正整数
 *   - 使用小顶堆或有序集合记录被添加回来的小于指针的元素
 *   - 实际集合为[current, +∞) + addedBack
 *
 * C. 直接模拟法
 *   - 使用Set记录当前集合中所有元素
 *   - 每次操作都直接操作这个集合
 *   - 适用于元素范围有限的情况
 *
 * 3. 具体执行流程(以标记删除法为例)：
 * 初始状态：removed={}，current=1
 * addBack(2): 2还未移除，无变化
 * popSmallest(): 返回1，removed={1}，current=2
 * popSmallest(): 返回2，removed={1,2}，current=3
 * popSmallest(): 返回3，removed={1,2,3}，current=4
 * addBack(1): 从removed移除1，removed={2,3}，更新current=1
 * popSmallest(): 返回1，removed={1,2,3}，current=4（跳过2和3因为它们在removed中）
 * popSmallest(): 返回4，removed={1,2,3,4}，current=5
 * popSmallest(): 返回5，removed={1,2,3,4,5}，current=6
 *
 * 4. 关键点
 * - 不需要真正存储所有正整数，只需记录已移除的元素
 * - 使用指针追踪当前最小值，避免每次都要遍历
 * - 添加回元素时需要更新current指针
 * - 实际上是在模拟一个特殊的优先队列
 *
 * 5. 复杂度分析
 * - 标记删除法：
 *   - 时间：popSmallest O(m)，m为已删除元素数量；addBack O(1)
 *   - 空间：O(n)，n为操作次数
 *
 * - 记录添加法：
 *   - 时间：popSmallest O(log m)，m为添加回的元素数量；addBack O(log m)
 *   - 空间：O(m)，m为添加回的元素数量
 *
 * - 直接模拟法（限定范围）：
 *   - 时间：popSmallest O(n)，addBack O(1)
 *   - 空间：O(n)，n为操作或元素上限
 *
 * 6. 方法选择
 * - 标记删除法实现简单，适合大多数场景
 * - 记录添加法在大量元素被删除后再添加回的场景效率更高
 * - 直接模拟法适合元素范围有限的场景
 */

class SmallestInfiniteSet {
  private removed: Set<number>;
  private current: number;
  constructor() {
    this.removed = new Set<number>();
    this.current = 1; // 初始最小值为1
  }

  popSmallest(): number {
    // 找出当前最小值
    while (this.removed.has(this.current)) {
      this.current++;
    }
    this.removed.add(this.current);
    return this.current++;
  }

  addBack(num: number): void {
    if (this.removed.has(num)) {
      this.removed.delete(num);

      if (num < this.current) {
        this.current = num;
      }
    }
  }
}

export default {
  run: () => {
    const examples = [
      {
        operations: [
          'SmallestInfiniteSet',
          'addBack',
          'popSmallest',
          'popSmallest',
          'popSmallest',
          'addBack',
          'popSmallest',
          'popSmallest',
          'popSmallest',
        ],
        params: [[], [2], [], [], [], [1], [], [], []],
        expected: [null, null, 1, 2, 3, null, 1, 4, 5],
      },
    ];

    for (const example of examples) {
      const { operations, params, expected } = example;
      let obj: SmallestInfiniteSet | null = null;
      const results: (number | null)[] = [];

      for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        const args = params[i];

        if (op === 'SmallestInfiniteSet') {
          obj = new SmallestInfiniteSet();
          results.push(null);
        } else if (op === 'popSmallest') {
          results.push(obj!.popSmallest());
        } else if (op === 'addBack') {
          obj!.addBack(args[0]);
          results.push(null);
        }
      }

      console.log('输入:', operations);
      console.log('参数:', params);
      console.log('输出:', results);
      console.log('期望:', expected);
      console.log(
        '测试结果:',
        JSON.stringify(results) === JSON.stringify(expected) ? '通过' : '失败'
      );
    }
  },
};
