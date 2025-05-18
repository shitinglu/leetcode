/**
 * 901. 股票价格跨度
 * 题目链接 https://leetcode.cn/problems/online-stock-span/?envType=study-plan-v2&envId=leetcode-75
 *
 * 设计一个算法收集某些股票的每日报价，并返回该股票当日价格的跨度。
 *
 * 今天股票价格的跨度被定义为股票价格小于或等于今天价格的最大连续日数（从今天开始往回数，包括今天）。
 *
 * 例如，如果未来7天股票的价格是 [100, 80, 60, 70, 60, 75, 85]，那么股票跨度将是 [1, 1, 1, 2, 1, 4, 6]。
 *
 * 实现 StockSpanner 类：
 * - StockSpanner() 初始化类对象。
 * - int next(int price) 给出今天的股价 price，返回该股票当日价格的跨度。
 *
 * 示例：
 * 输入：
 * ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
 * [[], [100], [80], [60], [70], [60], [75], [85]]
 * 输出：
 * [null, 1, 1, 1, 2, 1, 4, 6]
 * 解释：
 * StockSpanner stockSpanner = new StockSpanner();
 * stockSpanner.next(100); // 返回 1
 * stockSpanner.next(80);  // 返回 1
 * stockSpanner.next(60);  // 返回 1
 * stockSpanner.next(70);  // 返回 2
 * stockSpanner.next(60);  // 返回 1
 * stockSpanner.next(75);  // 返回 4
 * stockSpanner.next(85);  // 返回 6
 *
 * 提示：
 * - 1 <= price <= 10^5
 * - 最多调用 next 方法 10^4 次
 */

/**
 * 问题: 901. 股票价格跨度
 * 解题思路：
 * 1. 问题本质
 * - 设计一个数据结构，记录股票价格并返回当日价格的"跨度"
 * - 跨度定义为：当日价格往前数，价格小于等于当日价格的最大连续日数
 * - 需要高效地计算每个新加入价格的跨度
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 暴力法（线性查找）
 * - 存储所有历史价格
 * - 每次加入新价格时，向前线性查找直到找到一个大于当前价格的日子
 * - 计算天数差值作为跨度
 *
 * B. 单调栈法（优化方案）
 * - 使用单调栈存储[价格, 跨度]对
 * - 维持栈中价格从底到顶严格递减
 * - 新价格到来时，弹出所有小于等于它的价格，并累加它们的跨度
 * - 将新价格和累加的跨度压入栈
 *
 * 3. 具体执行流程：
 * 以 [100, 80, 60, 70, 60, 75, 85] 为例：
 *
 * A. 暴力法执行过程：
 * - next(100): 没有前一天，返回1
 * - next(80): 80 < 100，返回1
 * - next(60): 60 < 80，返回1
 * - next(70): 从前一天查找，70 > 60，找到1天，返回2
 * - next(60): 60 < 70，返回1
 * - next(75): 从前一天查找，75 > 60, 75 > 70, 75 > 60, 75 < 80，找到3天，返回4
 * - next(85): 从前一天查找，85 > 75, 85 > 60, 85 > 70, 85 > 60, 85 > 80, 85 < 100，找到5天，返回6
 *
 * B. 单调栈法执行过程：
 * - next(100): 栈为空，压入[100,1]，返回1
 * - next(80): 80 < 100，压入[80,1]，栈为[[100,1],[80,1]]，返回1
 * - next(60): 60 < 80，压入[60,1]，栈为[[100,1],[80,1],[60,1]]，返回1
 * - next(70): 70 > 60，弹出[60,1]，累加跨度为2，栈为[[100,1],[80,1],[70,2]]，返回2
 * - next(60): 60 < 70，压入[60,1]，栈为[[100,1],[80,1],[70,2],[60,1]]，返回1
 * - next(75): 75 > 60，弹出[60,1]，累加跨度为2；75 > 70，弹出[70,2]，累加跨度为4，栈为[[100,1],[80,1],[75,4]]，返回4
 * - next(85): 85 > 75，弹出[75,4]，累加跨度为5；85 > 80，弹出[80,1]，累加跨度为6，栈为[[100,1],[85,6]]，返回6
 *
 * 4. 关键点
 * - 暴力法：
 *   - 简单直观，容易实现
 *   - 适用于小数据量场景
 *   - 每次查询需要遍历历史价格
 *
 * - 单调栈法：
 *   - 利用单调性优化查找效率
 *   - 每个价格最多入栈出栈各一次
 *   - 栈内元素数量永远不超过天数
 *   - 关键在于累加被弹出元素的跨度
 *
 * 5. 复杂度分析
 * - 暴力法：
 *   - 时间：O(n²)，其中n是天数，最坏情况下每次调用next需要O(n)时间
 *   - 空间：O(n)，存储所有历史价格
 *
 * - 单调栈法：
 *   - 时间：O(n)，虽然有嵌套循环，但每个元素最多入栈出栈各一次
 *   - 空间：O(n)，最坏情况下栈存储所有价格
 *
 * 6. 方法选择
 * - 如果对时间效率要求不高，暴力法更简单
 * - 如果数据量大，或需要频繁调用next，应选择单调栈法
 * - 单调栈法是该问题的最优解决方案
 */

export class StockSpanner2 {
  // 统计价格
  private prices: number[];
  // 统计跨度
  // private spans: number[];

  constructor() {
    // this.spans = [];

    this.prices = [];
  }

  next(price: number): number {
    // 先放入价格
    this.prices.push(price);

    // 当前日期索引
    let currentIndex = this.prices.length - 1;

    // 只需要处理当前价格，不需要外层循环
    let span = 1; // 至少包含当天
    let n = currentIndex;

    // 从当前价格往前找，直到找到大于当前价格的日子
    while (n > 0) {
      n--;
      if (this.prices[n] > price) {
        break;
      }
      span++;
    }

    return span;
  }
}

export class StockSpanner {
  private stack: [number, number][]; // 存储[价格, 跨度]对的栈

  constructor() {
    this.stack = [];
  }

  next(price: number): number {
    let span = 1; // 至少包含当天自己

    // 当栈不为空，且栈顶价格小于等于当前价格时
    while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
      // 弹出栈顶元素并累加其跨度
      const [_, prevSpan] = this.stack.pop()!;
      span += prevSpan;
    }

    // 将当前价格和计算出的跨度压入栈
    this.stack.push([price, span]);

    return span;
  }
}

export default {
  run: () => {
    const examples = [
      {
        operations: ['StockSpanner', 'next', 'next', 'next', 'next', 'next', 'next', 'next'],
        values: [[], [100], [80], [60], [70], [60], [75], [85]],
        expected: [null, 1, 1, 1, 2, 1, 4, 6],
      },
    ];

    for (const example of examples) {
      const result = [];
      let stockSpanner: StockSpanner | null = null;

      for (let i = 0; i < example.operations.length; i++) {
        const op = example.operations[i];
        const val = example.values[i];

        if (op === 'StockSpanner') {
          stockSpanner = new StockSpanner();
          result.push(null);
        } else if (op === 'next' && stockSpanner) {
          result.push(stockSpanner.next(val[0]));
        }
      }

      console.log(`输入: ${JSON.stringify(example.operations)}`);
      console.log(`值: ${JSON.stringify(example.values)}`);
      console.log(`输出: ${JSON.stringify(result)}`);
      console.log(`预期: ${JSON.stringify(example.expected)}`);
      console.log(
        `测试结果: ${JSON.stringify(result) === JSON.stringify(example.expected) ? '通过' : '失败'}`
      );
    }
  },
};
