/**
 * https://leetcode.cn/problems/kids-with-the-greatest-number-of-candies/description/?envType=study-plan-v2&envId=leetcode-75
 * 4. kidsWithCandies
 * 
 * 有 n 个有糖果的孩子。给你一个数组 candies，其中 candies[i] 代表第 i 个孩子拥有的糖果数目，和一个整数 extraCandies 表示你所有的额外糖果的数量。
 * 返回一个长度为 n 的布尔数组 result，如果把所有的 extraCandies 给第 i 个孩子之后，他会拥有所有孩子中 最多 的糖果，那么 result[i] 为 true，否则为 false。
 * 注意，允许有多个孩子同时拥有 最多 的糖果数目。
 * 示例 1：

 * 输入：candies = [2,3,5,1,3], extraCandies = 3
 * 输出：[true,true,true,false,true] 
 * 解释：如果你把额外的糖果全部给：
 * 孩子 1，将有 2 + 3 = 5 个糖果，是孩子中最多的。
 * 孩子 2，将有 3 + 3 = 6 个糖果，是孩子中最多的。
 * 孩子 3，将有 5 + 3 = 8 个糖果，是孩子中最多的。
 * 孩子 4，将有 1 + 3 = 4 个糖果，不是孩子中最多的。
 * 孩子 5，将有 3 + 3 = 6 个糖果，是孩子中最多的。
 * 示例 2：

 * 输入：candies = [4,2,1,1,2], extraCandies = 1
 * 输出：[true,false,false,false,false] 
 * 解释：只有 1 个额外糖果，所以不管额外糖果给谁，只有孩子 1 可以成为拥有糖果最多的孩子。
 * 示例 3：

 * 输入：candies = [12,1,12], extraCandies = 10
 * 输出：[true,false,true]
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 判断每个孩子在获得额外糖果后是否能成为拥有最多糖果的孩子
 *    - 需要考虑多个孩子可能同时拥有最多糖果的情况
 *
 * 2. 模拟解法
 *    - 遍历每个孩子
 *    - 模拟分配额外糖果后的情况
 *    - 比较是否成为最多糖果拥有者
 *
 * 3. 具体执行流程 (以 candies=[2,3,5,1,3], extraCandies=3 为例)：
 *    a) 遍历第一个孩子(2个糖果)：
 *       - 分配额外糖果：2+3=5
 *       - 检查是否是最多：是
 *       - result[0]=true
 *    b) 遍历第二个孩子(3个糖果)：
 *       - 分配额外糖果：3+3=6
 *       - 检查是否是最多：是
 *       - result[1]=true
 *    c) 以此类推...
 *
 * 4. 关键点：
 *    - 每次模拟后需要恢复原始糖果数量
 *    - 使用Math.max()找出当前最大值
 *    - 允许有多个孩子同时拥有最多糖果
 *
 * 5. 复杂度：
 *    - 时间：O(n²)，每个孩子都需要遍历一次数组找最大值
 *    - 空间：O(n)，存储结果数组
 */

export function solution(candies: number[], extraCandies: number): boolean[] {
  const arr: boolean[] = [];

  candies.forEach((n: number, index: number) => {
    const m = n + extraCandies;

    candies[index] = m;

    const maxNumber = Math.max(...candies);

    if (maxNumber === m) {
      arr[index] = true;
    } else {
      arr[index] = false;
    }
    candies[index] = n;
  });
  return arr;
}

export default {
  run: () => {
    const examples = [
      { candies: [2, 3, 5, 1, 3], extraCandies: 3 },
      { candies: [4, 2, 1, 1, 2], extraCandies: 1 },
      { candies: [12, 1, 12], extraCandies: 10 },
    ];

    examples.forEach((example, index) => {
      const result = solution(example.candies, example.extraCandies);
      console.log(`示例 ${index + 1}:`);
      console.log(`输入: candies = ${example.candies}, extraCandies = ${example.extraCandies}`);
      console.log(`输出: ${result}`);
      console.log('---');
    });
  },
};
