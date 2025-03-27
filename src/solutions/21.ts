/**
 * https://leetcode.cn/problems/find-the-difference-of-two-arrays/?envType=study-plan-v2&envId=leetcode-75
 * 21. findDifference
 *
 * 2215. 找出两数组的不同
 *
 * 给你两个下标从 0 开始的整数数组 nums1 和 nums2 ，请你返回一个长度为 2 的列表 answer ，其中：
 *
 * answer[0] 是 nums1 中所有在 nums2 中不存在的元素组成的数组。
 * answer[1] 是 nums2 中所有在 nums1 中不存在的元素组成的数组。
 *
 * 注意：列表中的整数可以按 任意 顺序返回。
 *
 * 示例
 * 输入：nums1 = [1,2,3], nums2 = [2,4,6]
 * 输出：[[1,3],[4,6]]
 * 解释：
 * 对于 nums1 ，nums1[1] = 2 出现在 nums2 中下标 0 处，然而 nums1[0] = 1 和 nums1[2] = 3 没有出现在 nums2 中。因此，answer[0] = [1,3]。
 * 对于 nums2 ，nums2[0] = 2 出现在 nums1 中下标 1 处，然而 nums2[1] = 4 和 nums2[2] = 6 没有出现在 nums2 中。因此，answer[1] = [4,6]。
 *
 * 输入：nums1 = [1,2,3,3], nums2 = [1,1,2,2]
 * 输出：[[3],[]]
 * 解释：
 * 对于 nums1 ，nums1[2] = 3 和 nums1[3] = 3 出现在 nums2 中下标 0 和 1 处。然而 nums1[0] = 1 和 nums1[1] = 2 没有出现在 nums2 中。因此，answer[0] = [3,3]。
 * 对于 nums2 ，没有元素出现在 nums1 中，因此 answer[1] = []。
 *
 * 注意：
 *
 * 1 <= nums1.length, nums2.length <= 1000
 * 1 <= nums1[i], nums2[j] <= 1000
 *
 *
 */

/**
 * 解题思路：
 * 1. 问题本质
 * - 在n×n的矩阵中找出行和列完全相同的配对数量
 * - 行和列相等意味着它们包含的元素完全相同且顺序一致
 * - 需要考虑重复情况：同一行可能与多个列相等
 *
 * 2. 解决方案（三种主要方法）
 *
 * A. 暴力法（三重循环）
 * - 遍历每一行
 * - 对每一行，遍历每一列
 * - 比较行和列的每个元素是否相等
 *
 * B. 哈希表法（优化方案）
 * - 将每一行转换为字符串作为特征值
 * - 使用Map存储每种行的出现次数
 * - 遍历列并检查是否存在匹配的行
 *
 * C. 矩阵转置法
 * - 将矩阵转置（行列互换）
 * - 比较原矩阵的行与转置矩阵的行
 * - 统计匹配的数量
 *
 * 3. 具体执行流程(以哈希表法为例)：
 * 以 grid = [[3,2,1],[1,7,6],[2,7,7]] 为例：
 * - 第一步：处理行
 *   - "3,2,1" -> count: 1
 *   - "1,7,6" -> count: 1
 *   - "2,7,7" -> count: 1
 * - 第二步：检查列
 *   - 第0列 "3,1,2" -> 不匹配
 *   - 第1列 "2,7,7" -> 匹配一次
 *   - 第2列 "1,6,7" -> 不匹配
 * - 返回匹配总数：1
 *
 * 4. 关键点
 * - 使用字符串表示可以简化数组比较
 * - Map的查找效率为O(1)
 * - 需要正确处理重复匹配的情况
 * - 矩阵一定是方阵（n×n）
 *
 * 5. 复杂度分析
 * - 暴力法：
 *   - 时间：O(n³)，三重循环
 *   - 空间：O(1)，只需要常数空间
 *
 * - 哈希表法：
 *   - 时间：O(n² * k)，k为转字符串的开销
 *   - 空间：O(n²)，存储行的字符串表示
 *
 * - 矩阵转置法：
 *   - 时间：O(n²)，需要遍历矩阵两次
 *   - 空间：O(n²)，存储转置矩阵
 *
 * 6. 方法选择
 * - 对于小规模数据，暴力法简单直接
 * - 哈希表法在大规模数据时更优
 * - 转置法思路清晰但空间消耗较大
 */

export function findDifference(nums1: number[], nums2: number[]): number[][] {
  // Set法实现
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  const result: number[][] = [[], []];

  // 找出nums1中独有的元素
  for (const num of set1) {
    if (!set2.has(num)) {
      result[0].push(num);
    }
  }

  // 找出nums2中独有的元素
  for (const num of set2) {
    if (!set1.has(num)) {
      result[1].push(num);
    }
  }

  return result;
}

// Set法的简化版本
export function findDifferenceSimplified(nums1: number[], nums2: number[]): number[][] {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  return [
    Array.from(set1).filter(num => !set2.has(num)),
    Array.from(set2).filter(num => !set1.has(num)),
  ];
}

// 哈希表法
export function findDifferenceWithMap(nums1: number[], nums2: number[]): number[][] {
  const map1: Record<number, boolean> = {};
  const map2: Record<number, boolean> = {};

  // 记录nums1中元素
  for (const num of nums1) {
    map1[num] = true;
  }

  // 记录nums2中元素
  for (const num of nums2) {
    map2[num] = true;
  }

  const result: number[][] = [[], []];

  // 找出nums1中独有的元素
  for (const key in map1) {
    if (!map2[key]) {
      result[0].push(Number(key));
    }
  }

  // 找出nums2中独有的元素
  for (const key in map2) {
    if (!map1[key]) {
      result[1].push(Number(key));
    }
  }

  return result;
}

// 暴力法（原始方法）
export function findDifferenceWithBruteForce(nums1: number[], nums2: number[]): number[][] {
  const result: number[][] = [[], []];

  // 找出nums1中独有的元素
  for (const num of nums1) {
    if (nums2.indexOf(num) === -1 && result[0].indexOf(num) === -1) {
      result[0].push(num);
    }
  }

  // 找出nums2中独有的元素
  for (const num of nums2) {
    if (nums1.indexOf(num) === -1 && result[1].indexOf(num) === -1) {
      result[1].push(num);
    }
  }

  return result;
}

export function findDifference2(nums1: number[], nums2: number[]): number[][] {
  const result: number[][] = [[], []];

  nums1.forEach((n: number) => {
    if (nums2.indexOf(n) === -1) {
      if (result[0].indexOf(n) === -1) result[0].push(n);
    }
  });

  nums2.forEach((j: number) => {
    if (nums1.indexOf(j) === -1) {
      if (result[1].indexOf(j) === -1) result[1].push(j);
    }
  });

  return result;
}

export default {
  run: () => {
    console.log(findDifference2);
    const examples = [
      {
        input: { nums1: [1, 2, 3], nums2: [2, 4, 6] },
        output: [
          [1, 3],
          [4, 6],
        ],
      },
      {
        input: { nums1: [1, 2, 3, 3], nums2: [1, 1, 2, 2] },
        output: [[3], []],
      },
    ];

    for (const example of examples) {
      const result = findDifference(example.input.nums1, example.input.nums2);
      console.log(`输入: ${JSON.stringify(example.input)}, 输出: ${JSON.stringify(result)}`);
    }
  },
};
