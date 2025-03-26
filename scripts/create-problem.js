#!/usr/bin/env node

/**
 * 创建新题目文件的脚本
 * 用法: node scripts/create-problem.js <题号> <题目名称>
 * 示例: node scripts/create-problem.js 2 "两数相加"
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 获取命令行参数
const problemNumber = process.argv[2];
const problemName = process.argv[3];

if (!problemNumber || !problemName) {
  console.error('请提供题号和题目名称!');
  console.error('用法: node scripts/create-problem.js <题号> <题目名称>');
  process.exit(1);
}

// 文件路径
const solutionPath = path.join(__dirname, '..', 'src', 'solutions', `${problemNumber}.ts`);
const testPath = path.join(__dirname, '..', 'tests', 'solutions', `${problemNumber}.test.ts`);

// 确保目录存在
const solutionDir = path.dirname(solutionPath);
const testDir = path.dirname(testPath);

if (!fs.existsSync(solutionDir)) {
  fs.mkdirSync(solutionDir, { recursive: true });
}

if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// 解题模板
const solutionTemplate = `/**
 * ${problemNumber}. ${problemName}
 * 
 * 题目描述...
 */

export function ${problemName}(/* 参数 */) {
  // 实现...
  return null;
}

export default {
  run: () => {
    // 示例运行代码
    console.log('请实现解题函数并添加示例运行代码');
  }
};
`;

// 测试模板
const testTemplate = `/**
 * ${problemNumber}. ${problemName} - 单元测试
 */
import { ${problemName} } from '../../src/solutions/${problemNumber}';

describe('${problemName}', () => {
  test('示例1', () => {
    // 实现测试...
    expect(true).toBe(true);
  });
});
`;

// 检查文件是否已存在并创建文件
function createFiles() {
  const solutionExists = fs.existsSync(solutionPath);
  const testExists = fs.existsSync(testPath);

  if (solutionExists || testExists) {
    console.log('以下文件已存在:');
    if (solutionExists) console.log(`- 解题文件: ${solutionPath}`);
    if (testExists) console.log(`- 测试文件: ${testPath}`);

    rl.question('是否覆盖这些文件? (y/n): ', answer => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        writeFiles();
        console.log('文件已覆盖!');
      } else {
        console.log('操作已取消');
      }
      rl.close();
    });
  } else {
    writeFiles();
    console.log(`创建成功!`);
    console.log(`- 解题文件: ${solutionPath}`);
    console.log(`- 测试文件: ${testPath}`);
    console.log(`请编辑文件添加题目描述和实现代码`);
    rl.close();
  }
}

// 写入文件
function writeFiles() {
  fs.writeFileSync(solutionPath, solutionTemplate);
  fs.writeFileSync(testPath, testTemplate);
}

// 执行创建
createFiles();
