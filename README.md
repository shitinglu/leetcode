# LeetCode 刷题项目

基于TypeScript的LeetCode刷题项目，使用pnpm管理依赖，Jest进行测试。

## 目录结构

```
leetcode-solutions/
├── src/                # 源代码目录
│   ├── index.ts        # 主入口文件
│   └── solutions/      # 解题代码
│       └── 1.ts        # 第1题: 两数之和
├── tests/              # 测试目录
│   └── solutions/      # 解题测试
│       └── 1.test.ts   # 第1题测试
├── scripts/            # 辅助脚本
├── package.json        # 包信息
├── tsconfig.json       # TypeScript配置
└── jest.config.js      # Jest测试配置
```

## 安装

```bash
pnpm install
```

## 使用方法

### 运行特定题目

```bash
pnpm solve src/solutions/1.ts
```

### 测试

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test:watch
```

### 开发

```bash
# 启动开发模式
pnpm dev
```

## 解题模板

每个解题文件应包含:

1. 题目描述注释
2. 解题函数
3. 默认导出包含run方法用于示例运行

示例:

```typescript
/**
 * X. 题目名称
 *
 * 题目描述...
 */

export function solution(/* 参数 */) {
  // 实现...
}

export default {
  run: () => {
    // 示例运行代码
  },
};
```
