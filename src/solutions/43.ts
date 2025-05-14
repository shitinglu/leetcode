/**
 * 649. Dota2 参议院
 * 题目链接: https://leetcode.cn/problems/dota2-senate/?envType=study-plan-v2&envId=leetcode-75
 *
 * Dota2 的世界里有两个阵营：Radiant（天辉）和 Dire（夜魇）。
 * Dota2 参议院由来自两派的参议员组成。现在参议院希望对一个 Dota2 游戏里的改变作出决定。
 * 他们以一个基于轮为过程的投票进行。在每一轮中，每一位参议员都可以行使两项权利中的 一项：
 *
 * 1. 禁止一名参议员的权利：参议员可以让另一位参议员在这一轮和随后的几轮中丧失所有的权利。
 * 2. 宣布胜利：如果这名参议员发现有权利投票的参议员都是同一个阵营的，他可以宣布胜利并决定在游戏中的改变。
 *
 * 给定一个字符串 senate 代表每个参议员的阵营。字母 'R' 和 'D' 分别代表了 Radiant（天辉）和 Dire（夜魇）。
 * 然后，如果有 n 个参议员，给定字符串的大小将是 n。
 *
 * 以轮为基础的过程从给定顺序的第一个参议员开始到最后一个参议员结束。这一过程将持续到投票结束。
 * 所有失去权利的参议员将在过程中被跳过。
 *
 * 假设每一位参议员都足够聪明，会为自己的政党做出最好的策略，你需要预测哪一方最终会宣布胜利并在 Dota2 游戏中决定改变。
 * 输出应该是 "Radiant" 或 "Dire"。
 *
 * 示例：
 * 输入：senate = "RD"
 * 输出："Radiant"
 * 解释：
 * 第 1 轮时，第一个参议员来自 Radiant 阵营，他可以使用第一项权利禁止第二个参议员的权利。
 * 这样第二个参议员将被跳过，因为他的权利被禁止。
 * 第 2 轮时，第一个参议员可以宣布胜利，因为他是唯一一个有投票权的人。
 *
 * 输入：senate = "RDD"
 * 输出："Dire"
 * 解释：
 * 第 1 轮时，第一个参议员来自 Radiant 阵营，他可以使用第一项权利禁止第二个参议员的权利。
 * 这样第二个参议员将被跳过，因为他的权利被禁止。
 * 第 2 轮时，第三个参议员来自 Dire 阵营，他可以使用第一项权利禁止第一个参议员的权利。
 * 这样第一个参议员将被跳过，因为他的权利被禁止。
 * 第 3 轮时，第三个参议员可以宣布胜利，因为他是唯一一个有投票权的人。
 *
 * 提示：
 * - n == senate.length
 * - 1 <= n <= 10^4
 * - senate[i] 为 'R' 或 'D'
 */

/**
 * 649. Dota2 参议院
 * 题目链接: https://leetcode.cn/problems/dota2-senate/?envType=study-plan-v2&envId=leetcode-75
 *
 * 问题理解：
 * - 两个阵营（Radiant和Dire）的参议员进行投票
 * - 每位参议员可以禁止一名对方参议员的权利，或者宣布胜利
 * - 每轮按顺序进行投票，被禁止的参议员将被跳过
 * - 参议员足够聪明，会采取最优策略
 * - 需要预测哪一方最终胜利
 *
 * 解题思路：
 * 1. 问题本质
 * - 这是一个基于轮次的模拟问题
 * - 关键在于理解"最优策略"：每个参议员应该禁止按顺序的下一个敌方参议员
 * - 当一方参议员全部被禁止时，另一方获胜
 *
 * 2. 解决方案（队列模拟法）
 * - 使用两个队列分别存储Radiant和Dire阵营参议员的索引位置
 * - 在每轮投票中，比较两队列头部参议员的索引
 * - 索引小的参议员先行使权力，禁止对方一名参议员，并进入下一轮
 * - 循环直到一方队列为空，另一方获胜
 *
 * 3. 具体执行流程(以senate = "RDD"为例)：
 * - 初始化：radiant队列 = [0], dire队列 = [1, 2]
 * - 第1轮：
 *   - r = 0, d = 1
 *   - r < d, 所以R禁止D, radiant队列 = [3], dire队列 = [2]
 * - 第2轮：
 *   - r = 3, d = 2
 *   - r > d, 所以D禁止R, radiant队列 = [], dire队列 = [5]
 * - 结果：radiant队列为空，dire获胜
 *
 * 4. 关键点
 * - 使用队列数据结构模拟轮次
 * - 索引顺序决定了参议员行使权力的顺序
 * - 被禁止的参议员不再参与后续轮次
 * - 索引加n表示参议员在下一轮的位置
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n)，最坏情况下需要O(n)轮才能决出胜负
 * - 空间复杂度：O(n)，需要两个队列存储参议员索引
 *
 * 6. 方法选择
 * - 队列模拟适合处理轮次顺序的问题
 * - 数组索引比较处理顺序问题直观易懂
 */

export function predictPartyVictory(senate: string): string {
  const radiant: number[] = [];
  const dire: number[] = [];

  for (let i = 0; i < senate.length; i++) {
    if (senate[i] === 'R') {
      radiant.push(i);
    } else {
      dire.push(i);
    }
  }

  const n = senate.length;

  while (radiant.length > 0 && dire.length > 0) {
    const r: number = radiant.shift()!;
    const d: number = dire.shift()!;
    // 索引小的参议员先行使权力，禁止对方参议员，并进入下一轮
    if (r < d) {
      // R阵营参议员行使权力后，参与下一轮 (位置变为n+r)
      radiant.push(r + n);
    } else {
      // D阵营参议员行使权力后，参与下一轮 (位置变为n+d)
      dire.push(d + n);
    }
  }

  // 判断胜利方
  return radiant.length > 0 ? 'Radiant' : 'Dire';
}

export default {
  run: () => {
    const examples = [
      {
        input: 'RD',
        output: 'Radiant',
      },
      {
        input: 'RDD',
        output: 'Dire',
      },
      {
        input: 'RDDR',
        output: 'Radiant',
      },
    ];

    for (const example of examples) {
      const result = predictPartyVictory(example.input);
      console.log(`输入: senate = "${example.input}", 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
