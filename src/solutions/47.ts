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
