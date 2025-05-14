/**
 * 739. 每日温度
 * 题目链接 https://leetcode.cn/problems/daily-temperatures/
 *
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，
 * 其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 * 示例：
 * 输入：temperatures = [73,74,75,71,69,72,76,73]
 * 输出：[1,1,4,2,1,1,0,0]
 *
 * 输入：temperatures = [30,40,50,60]
 * 输出：[1,1,1,0]
 *
 * 输入：temperatures = [30,60,90]
 * 输出：[1,1,0]
 *
 * 提示：
 * - 1 <= temperatures.length <= 10^5
 * - 30 <= temperatures[i] <= 100
 */

/**
 * 问题：每日温度
 * 解题思路：
 * 1. 问题本质
 *   - 对于数组中的每个元素，找到其后第一个比它大的元素，计算两者的距离
 *   - 如果不存在更大的元素，则结果为0
 *   - 本质上是"下一个更大元素"类型的问题
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 暴力法（双循环）
 *   - 对于每个温度，向后遍历找到第一个更高的温度
 *   - 计算两者的索引差值作为结果
 *   - 如果遍历完没有找到更高温度，结果为0
 *
 * B. 单调栈法（最优解）
 *   - 维护一个单调递减的栈，存储元素的索引
 *   - 当遇到较高温度时，栈内较低温度找到了"下一个更高温度"
 *   - 计算索引差值并更新结果
 *
 * 3. 具体执行流程(以 temperatures = [73, 74, 75, 71, 69, 72, 76, 73] 为例)：
 *
 * 单调栈法:
 *   - 索引0(73): 入栈，stack=[0]
 *   - 索引1(74): 74>73，计算answer[0]=1-0=1，入栈，stack=[1]
 *   - 索引2(75): 75>74，计算answer[1]=2-1=1，入栈，stack=[2]
 *   - 索引3(71): 71<75，直接入栈，stack=[2,3]
 *   - 索引4(69): 69<71，直接入栈，stack=[2,3,4]
 *   - 索引5(72): 72>69，计算answer[4]=5-4=1
 *              72>71，计算answer[3]=5-3=2
 *              72<75，入栈，stack=[2,5]
 *   - 索引6(76): 76>72，计算answer[5]=6-5=1
 *              76>75，计算answer[2]=6-2=4，入栈，stack=[6]
 *   - 索引7(73): 73<76，直接入栈，stack=[6,7]
 *   - 结束，结果为[1,1,4,2,1,1,0,0]
 *
 * 暴力法:
 *   - 索引0(73): 向后查找，74>73，差值=1，结果为1
 *   - 索引1(74): 向后查找，75>74，差值=1，结果为1
 *   - 索引2(75): 向后查找，76>75，差值=4，结果为4
 *   - 索引3(71): 向后查找，72>71，差值=2，结果为2
 *   - 索引4(69): 向后查找，72>69，差值=1，结果为1
 *   - 索引5(72): 向后查找，76>72，差值=1，结果为1
 *   - 索引6(76): 向后查找，没有更高温度，结果为0
 *   - 索引7(73): 向后查找，没有更高温度，结果为0
 *   - 结束，结果为[1,1,4,2,1,1,0,0]
 *
 * 4. 关键点
 *   - 暴力法实现简单但效率低
 *   - 单调栈可以在线性时间内解决问题
 *   - 单调栈存储索引而非温度值本身
 *   - 出栈时计算索引差值即为等待天数
 *   - 栈内索引对应的温度保持单调递减
 *
 * 5. 复杂度分析
 *   - 暴力法:
 *     - 时间复杂度: O(n²)，最坏情况下需要两层循环
 *     - 空间复杂度: O(n)，需要存储结果数组
 *
 *   - 单调栈法:
 *     - 时间复杂度: O(n)，每个元素最多入栈出栈各一次
 *     - 空间复杂度: O(n)，最坏情况下栈存储所有元素
 *
 * 6. 方法选择
 *   - 数据规模较小时，暴力法够用且容易理解
 *   - 数据规模较大时，单调栈法效率远高于暴力法
 *   - 面试中推荐使用单调栈法，展示算法思维能力
 */

export function dailyTemperatures2(temperatures: number[]): number[] {
  const arr: number[] = [];

  for (let i = 0; i < temperatures.length; i++) {
    const temperature = temperatures[i];
    let n = i;
    let found = false; // 添加标志变量

    while (n < temperatures.length) {
      n++;
      if (temperatures[n] > temperature) {
        arr.push(n - i);
        found = true; // 标记已找到
        break;
      }
    }
    if (!found) {
      // 如果没找到更高温度
      arr.push(0); // 推入0
    }
  }

  return arr;
}

export function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const answer: number[] = new Array(n).fill(0); // 初始化结果数组，默认值为0
  const stack: number[] = []; // 用于存储下标的栈

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const preIndex = stack.pop()!; // 弹出栈顶元素（较低温度的下标）
      answer[preIndex] = i - preIndex; // 计算两天的间隔
    }

    // 将当前下标入栈
    stack.push(i);
  }

  return answer;
}

export default {
  run: () => {
    const examples = [
      {
        input: [73, 74, 75, 71, 69, 72, 76, 73],
        output: [1, 1, 4, 2, 1, 1, 0, 0],
      },
      {
        input: [30, 40, 50, 60],
        output: [1, 1, 1, 0],
      },
      {
        input: [30, 60, 90],
        output: [1, 1, 0],
      },
    ];

    for (const example of examples) {
      const result = dailyTemperatures(example.input);
      console.log(`输入: temperatures = [${example.input}], 输出: [${result}]`);
      console.log(
        `测试结果: ${JSON.stringify(result) === JSON.stringify(example.output) ? '通过' : '失败'}`
      );
    }
  },
};
