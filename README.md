# LeetCode 刷题项目

基于TypeScript的LeetCode刷题项目，使用pnpm管理依赖，Jest进行测试。目前已包含超过20道题目的解答。

## 目录结构

```
leetcode/
├── src/                # 源代码目录
│   ├── index.ts        # 主入口文件
│   └── solutions/      # 解题代码
│       ├── 1.ts        # 第1题: 两数之和
│       ├── 2.ts        # 第2题: 两数相加
│       └── ...         # 更多解题代码
├── tests/              # 测试目录
│   └── solutions/      # 解题测试
│       ├── 1.test.ts   # 第1题测试
│       ├── 2.test.ts   # 第2题测试
│       └── ...         # 更多测试文件
├── scripts/            # 辅助脚本
│   └── create-problem.js # 创建新题目模板脚本
├── package.json        # 包信息
├── tsconfig.json       # TypeScript配置
└── jest.config.js      # Jest测试配置
```

## 安装

```bash
pnpm install
```

## 使用方法

### 创建新题目

```bash
pnpm new [题号] [题目名称]
```

### 运行特定题目

```bash
pnpm solve src/solutions/[题号].ts
```

例如：
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

# 开发模式并实时格式化代码
pnpm dev:format

# 开发模式并实时格式化和检查代码
pnpm dev:all
```

### 代码质量

```bash
# 检查代码格式
pnpm format:check

# 格式化代码
pnpm format

# 检查代码风格
pnpm lint

# 修复代码风格问题
pnpm lint:fix
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
