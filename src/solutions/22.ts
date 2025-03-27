/**
 * https://leetcode.cn/problems/unique-number-of-occurrences/?envType=study-plan-v2&envId=leetcode-75
 * 22. uniqueOccurrences
 *
 * 1207. 独一无二的出现次数
 * 给你一个整数数组 arr，如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。
 *
 * 示例 1：
 * 输入：arr = [1,2,2,1,1,3]
 * 输出：true
 * 解释：在该数组中，1 出现了 3 次，2 出现了 2 次，3 只出现了 1 次。没有两个数的出现次数相同。
 *
 * 示例 2：
 * 输入：arr = [1,2]
 * 输出：false
 *
 * 示例 3：
 * 输入：arr = [-3,0,1,-3,1,1,1,-3,10,0]
 * 输出：true
 *
 * */

/**
 * 解题思路：
 * 1. 问题本质
 * - 统计数组中每个数字出现的次数
 * - 判断这些出现次数是否都是唯一的
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. Map + Set方法（当前实现）
 * - 使用Map统计每个数字的出现次数
 * - 使用Set检查出现次数是否唯一
 *
 * B. 对象 + 数组方法
 * - 使用对象统计频次
 * - 将频次转为数组并排序
 * - 检查相邻元素是否有重复
 *
 * 3. 具体执行流程(以Map+Set方法为例)：
 * 以 arr = [1,2,2,1,1,3] 为例：
 * - 第一步：统计频次
 *   - 1 -> count: 3
 *   - 2 -> count: 2
 *   - 3 -> count: 1
 * - 第二步：检查频次唯一性
 *   - Set中添加: 3,2,1
 *   - 所有频次都不重复，返回true
 *
 * 4. 关键点
 * - Map的key为原数组元素，value为出现次数
 * - Set用于快速判断频次是否重复
 * - 需要考虑负数情况
 *
 * 5. 复杂度分析
 * - Map+Set方法：
 *   - 时间：O(n)，n为数组长度
 *   - 空间：O(k)，k为不同数字的个数
 *
 * - 对象+数组方法：
 *   - 时间：O(nlogn)，排序所需时间
 *   - 空间：O(k)，k为不同数字的个数
 *
 * 6. 方法选择
 * - Map+Set方法时间复杂度更优
 * - 对于小规模数据，两种方法差异不大
 * - Map+Set方法代码更简洁清晰
 */

export function uniqueOccurrences(arr: number[]) {
  const count = new Map<number, number>();

  arr.forEach((n: number) => {
    count.set(n, (count.get(n) || 0) + 1);
  });

  const occurrences = new Set<number>();
  for (const freq of count.values()) {
    if (occurrences.has(freq)) {
      return false;
    }
    occurrences.add(freq);
  }

  return true;
}

export default {
  run: () => {
    const examples = [
      {
        input: [1, 2, 2, 1, 1, 3],
        output: true,
      },
      {
        input: [1, 2],
        output: false,
      },
      {
        input: [-3, 0, 1, -3, 1, 1, 1, -3, 10, 0],
        output: true,
      },
    ];

    for (const example of examples) {
      const result = uniqueOccurrences(example.input);
      console.log(`输入: ${JSON.stringify(example.input)}, 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
      console.log(`------------------------------`);
    }
  },
};
