/**
 * LeetCode 解题项目入口文件
 */
console.log('欢迎使用 LeetCode 解题工具');

// 示例函数，用于导入和测试解题模块
export function run(problemNumber: number): void {
  try {
    // 动态导入解题模块
    const solutionModule = require(`./solutions/${problemNumber}`);
    console.log(`正在运行第 ${problemNumber} 题解答...`);

    // 执行题解
    if (solutionModule.default && typeof solutionModule.default.run === 'function') {
      solutionModule.default.run();
    } else {
      console.log(`第 ${problemNumber} 题解答模块格式不正确`);
    }
  } catch (error) {
    console.error(`无法找到或运行第 ${problemNumber} 题解答`, error);
  }
}

run(26);
