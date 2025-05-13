/**
 * 933. 最近的请求次数
 * 题目链接 https://leetcode.cn/problems/number-of-recent-calls/
 *
 * 写一个 RecentCounter 类来计算特定时间范围内最近的请求。
 *
 * 请你实现 RecentCounter 类：
 * - RecentCounter() 初始化计数器，请求数为 0 。
 * - int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数。
 *
 * 保证 每次对 ping 的调用都使用比之前更大的 t 值。
 *
 * 示例：
 * 输入：
 * ["RecentCounter", "ping", "ping", "ping", "ping"]
 * [[], [1], [100], [3001], [3002]]
 * 输出：
 * [null, 1, 2, 3, 3]
 *
 * 解释：
 * RecentCounter recentCounter = new RecentCounter();
 * recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1
 * recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2
 * recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
 * recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3
 *
 * 提示：
 * - 1 <= t <= 10^9
 * - 保证每次对 ping 调用所使用的 t 值都 严格递增
 * - 至多调用 ping 方法 10^4 次
 */

/**
 * 问题: 933. 最近的请求次数
 *
 * 解题思路：
 * 1. 问题本质
 * - 设计一个计数器类，追踪时间窗口内的请求数量
 * - 每次ping操作都需要计算[t-3000, t]时间窗口内的请求数
 * - ping的参数t是严格递增的
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 队列法（最优解）
 * - 使用队列存储所有请求时间
 * - 对每次新请求，移除所有不在时间窗口内的旧请求
 * - 返回当前队列长度作为窗口内请求数
 *
 * B. 数组过滤法
 * - 存储所有请求时间
 * - 对每次新请求，过滤出在时间窗口内的请求
 * - 返回过滤后数组的长度
 *
 * 3. 具体执行流程(以队列法为例)：
 * 以示例 ["RecentCounter", "ping", "ping", "ping", "ping"] [[], [1], [100], [3001], [3002]] 为例：
 *
 * - 初始化：requests = []
 * - ping(1):
 *   添加1到队列 -> requests = [1]
 *   检查窗口[1-3000, 1] = [-2999, 1]内的请求
 *   所有元素都在窗口内，返回1
 *
 * - ping(100):
 *   添加100到队列 -> requests = [1, 100]
 *   检查窗口[100-3000, 100] = [-2900, 100]内的请求
 *   所有元素都在窗口内，返回2
 *
 * - ping(3001):
 *   添加3001到队列 -> requests = [1, 100, 3001]
 *   检查窗口[3001-3000, 3001] = [1, 3001]内的请求
 *   1在窗口内，但任何<1的元素将被移除，返回3
 *
 * - ping(3002):
 *   添加3002到队列 -> requests = [1, 100, 3001, 3002]
 *   检查窗口[3002-3000, 3002] = [2, 3002]内的请求
 *   1已不在窗口内被移除 -> requests = [100, 3001, 3002]
 *   返回3
 *
 * 4. 关键点
 * - 利用时间严格递增的特性优化算法
 * - 如果队列首部元素在时间窗口内，则所有元素都在窗口内
 * - 队列的先进先出特性完全符合时间窗口滑动的需求
 * - shift()操作可以高效移除过期元素
 *
 * 5. 复杂度分析
 * - 队列法：
 *   - 时间：平摊O(1)，每个元素最多进出队列各一次
 *   - 空间：O(k)，k为3000ms时间窗口内的请求数
 *
 * - 数组过滤法：
 *   - 时间：O(n)，n为总请求数
 *   - 空间：O(n)，存储所有请求
 *
 * 6. 方法选择
 * - 队列法更为高效，特别是在请求数量大的情况下
 * - 数组过滤法适用于不限定时间递增的情况
 * - 由于题目保证时间递增，队列法是最佳选择
 */

export class RecentCounter {
  private requests: number[];

  constructor() {
    this.requests = [];
  }

  ping(t: number): number {
    // 添加当前请求时间到队列
    this.requests.push(t);

    // 移除超过3000毫秒窗口的请求
    while (this.requests.length > 0 && this.requests[0] < t - 3000) {
      this.requests.shift(); // 这里会修改原数组
    }

    // 返回当前窗口内的请求数
    return this.requests.length;
  }
}

export default {
  run: () => {
    const examples = [
      {
        operations: ['RecentCounter', 'ping', 'ping', 'ping', 'ping'],
        inputs: [[], [1], [100], [3001], [3002]],
        expected: [null, 1, 2, 3, 3],
      },
    ];

    for (const example of examples) {
      const recentCounter = new RecentCounter();
      const results: (null | number)[] = [null];

      for (let i = 1; i < example.operations.length; i++) {
        if (example.operations[i] === 'ping') {
          const input: number = example.inputs[i][0] as number;
          results.push(recentCounter.ping(input));
        }
      }

      console.log(`输入: ${JSON.stringify(example.operations)}, ${JSON.stringify(example.inputs)}`);
      console.log(`输出: ${JSON.stringify(results)}`);
      console.log(
        `测试结果: ${JSON.stringify(results) === JSON.stringify(example.expected) ? '通过' : '失败'}`
      );
    }
  },
};
