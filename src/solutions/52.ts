/**
 * 2462. 雇佣 K 位工人的总代价
 * 题目链接: https://leetcode.cn/problems/total-cost-to-hire-k-workers/
 *
 * 给你一个下标从 0 开始的整数数组 costs ，其中 costs[i] 是雇佣第 i 位工人的代价。
 *
 * 同时给你两个整数 k 和 candidates 。我们想根据以下规则恰好雇佣 k 位工人：
 * - 总共进行 k 轮雇佣，且每一轮恰好雇佣一位工人。
 * - 在每一轮雇佣中，从最前面 candidates 和最后面 candidates 人中选出代价最小的一位工人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
 * - 比方说，costs = [3,2,7,7,1,2] 且 candidates = 2 ，第一轮雇佣中，我们选择下标为 4 的工人，因为他的代价最小 [3,2,7,7,1,2] 。
 * - 第二轮雇佣，我们选择下标为 1 的工人，因为下标为 1 和 5 的工人代价都最小且相等，而下标为 1 的工人下标更小 [3,2,7,7,2] 。
 * - 如果剩余员工数目不足 candidates 人，那么下一轮雇佣他们中代价最小的一位工人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
 * - 一位工人只能被选择一次。
 *
 * 返回雇佣恰好 k 位工人的总代价。
 *
 * 示例 1：
 * 输入：costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
 * 输出：11
 * 解释：我们按以下方式雇佣 3 位工人：
 * - 第一轮雇佣，我们从 [17,12,10,2,7,2,11,20,8] 的前 4 位和后 4 位工人中选择。最小代价是 2 ，有两位工人，我们选择下标更小的一位，即第 3 位工人。总代价是 2 。
 * - 第二轮雇佣，我们从 [17,12,10,7,2,11,20,8] 的前 4 位和后 4 位工人中选择。最小代价是 2 ，下标为 4 ，总代价是 2 + 2 = 4 。
 * - 第三轮雇佣，我们从 [17,12,10,7,11,20,8] 的前 4 位和后 4 位工人中选择。最小代价是 7 ，下标为 3 ，总代价是 4 + 7 = 11 。
 * 总雇佣代价是 11 。
 *
 * 示例 2：
 * 输入：costs = [1,2,4,1], k = 3, candidates = 3
 * 输出：4
 * 解释：我们按以下方式雇佣 3 位工人：
 * - 第一轮雇佣，我们从 [1,2,4,1] 的前 3 位和后 3 位工人中选择。最小代价是 1 ，有两位工人，我们选择下标更小的一位，即第 0 位工人。总代价是 1 。
 * - 第二轮雇佣，我们从 [2,4,1] 的前 3 位和后 3 位工人中选择。最小代价是 1 ，下标为 2 ，总代价是 1 + 1 = 2 。
 * - 第三轮雇佣，我们从 [2,4] 的前 3 位和后 3 位工人中选择。最小代价是 2 ，下标为 0 ，总代价是 2 + 2 = 4 。
 * 总雇佣代价是 4 。
 *
 * 提示：
 * - 1 <= costs.length <= 10^5
 * - 1 <= costs[i] <= 10^5
 * - 1 <= k, candidates <= costs.length
 */

export function totalCost(costs: number[], k: number, candidates: number): number {
  // 复制原数组，避免修改原数组
  const workingCosts = [...costs];
  let totalCost = 0;

  for (let i = 0; i < k; i++) {
    const leftCandidates = workingCosts.slice(0, candidates);
    const rightCandidates = workingCosts.slice(Math.max(0, workingCosts.length - candidates));

    // 找出左侧候选人中的最小值及其索引
    const minLeftValue = Math.min(...leftCandidates);
    const minLeftIndex = workingCosts.indexOf(minLeftValue);

    // 找出右侧候选人中的最小值及其索引
    const minRightValue = Math.min(...rightCandidates);
    const minRightIndex = workingCosts.lastIndexOf(minRightValue);

    // 确定本轮要选择的工人
    let selectedIndex;
    if (minLeftValue < minRightValue) {
      selectedIndex = minLeftIndex;
    } else if (minLeftValue > minRightValue) {
      selectedIndex = minRightIndex;
    } else {
      // 如果最小值相同，选择索引较小的
      selectedIndex = Math.min(minLeftIndex, minRightIndex);
    }

    // 添加选中工人的成本
    totalCost += workingCosts[selectedIndex];

    // 从数组中移除选中的工人
    workingCosts.splice(selectedIndex, 1);
  }

  return totalCost;
}

export function totalCost2(costs: number[], k: number, candidates: number): number {
  // 复制原数组，避免修改原数组
  const workingCosts = [...costs];
  let totalCost = 0;

  for (let i = 0; i < k; i++) {
    const leftCandidates = workingCosts.slice(0, candidates);
    const rightCandidates = workingCosts.slice(Math.max(0, workingCosts.length - candidates));

    // 找出左侧候选人中的最小值及其索引
    const minLeftValue = Math.min(...leftCandidates);
    const minLeftIndex = workingCosts.indexOf(minLeftValue);

    // 找出右侧候选人中的最小值及其索引
    const minRightValue = Math.min(...rightCandidates);
    const minRightIndex = workingCosts.lastIndexOf(minRightValue);

    // 确定本轮要选择的工人
    let selectedIndex;
    if (minLeftValue < minRightValue) {
      selectedIndex = minLeftIndex;
    } else if (minLeftValue > minRightValue) {
      selectedIndex = minRightIndex;
    } else {
      // 如果最小值相同，选择索引较小的
      selectedIndex = Math.min(minLeftIndex, minRightIndex);
    }

    // 添加选中工人的成本
    totalCost += workingCosts[selectedIndex];

    // 从数组中移除选中的工人
    workingCosts.splice(selectedIndex, 1);
  }

  return totalCost;
}

export default {
  run: () => {
    const examples = [
      {
        input: {
          costs: [17, 12, 10, 2, 7, 2, 11, 20, 8],
          k: 3,
          candidates: 4,
        },
        output: 11,
      },
      {
        input: {
          costs: [1, 2, 4, 1],
          k: 3,
          candidates: 3,
        },
        output: 4,
      },
    ];

    for (const example of examples) {
      const { costs, k, candidates } = example.input;
      const result = totalCost(costs, k, candidates);
      console.log(
        `输入: costs = [${costs}], k = ${k}, candidates = ${candidates}, 输出: ${result}`
      );
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
