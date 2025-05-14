/**
 * 208. 实现 Trie (前缀树)
 * 题目链接: https://leetcode.cn/problems/implement-trie-prefix-tree/
 *
 * Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。
 * 这一数据结构有相当多的应用情景，例如自动补完和拼写检查。
 *
 * 请你实现 Trie 类：
 * - Trie() 初始化前缀树对象。
 * - void insert(String word) 向前缀树中插入字符串 word 。
 * - boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
 * - boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
 *
 * 示例：
 * 输入：
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * 输出：
 * [null, null, true, false, true, null, true]
 *
 * 解释：
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // 返回 True
 * trie.search("app");     // 返回 False
 * trie.startsWith("app"); // 返回 True
 * trie.insert("app");
 * trie.search("app");     // 返回 True
 *
 * 提示：
 * - 1 <= word.length, prefix.length <= 2000
 * - word 和 prefix 仅由小写英文字母组成
 * - insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次
 */

/**
 * 208. 实现 Trie (前缀树)
 *
 * 解题思路：
 * 1. 问题本质
 * - 实现一种特殊的数据结构Trie（前缀树），用于高效存储和检索字符串集合
 * - 需要支持三个核心操作：插入字符串、查找完整字符串、检查前缀是否存在
 * - Trie结构的特点是在查找时间复杂度与字符串长度相关，而与存储的字符串数量无关
 *
 * 2. 解决方案（两种方法）
 *
 * A. 数组存储法（简单但低效）
 * - 使用数组存储所有插入的字符串
 * - 查找时遍历整个数组
 * - 前缀检查时遍历数组并检查每个字符串的前缀
 *
 * B. 树形结构法（标准Trie实现）
 * - 创建树形结构，每个节点表示一个字符
 * - 每个节点包含到子节点的映射和单词结束标记
 * - 从根节点到某个标记节点的路径表示一个完整单词
 * - 插入、查找和前缀检查都通过树的遍历实现
 *
 * 3. 具体执行流程(以树形结构法为例)：
 * 以 ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]] 为例：
 *
 * - 创建Trie: 初始化根节点
 * - 插入"apple": 创建路径 root->a->p->p->l->e，并在e节点标记单词结束
 * - 查找"apple": 遍历路径 root->a->p->p->l->e，e节点有单词结束标记，返回true
 * - 查找"app": 遍历路径 root->a->p->p，p节点无单词结束标记，返回false
 * - 检查前缀"app": 遍历路径 root->a->p->p，路径存在，返回true
 * - 插入"app": 遍历路径 root->a->p->p，在p节点标记单词结束
 * - 查找"app": 遍历路径 root->a->p->p，p节点现在有单词结束标记，返回true
 *
 * 4. 关键点
 * - TrieNode结构包含：
 *   a. children: 存储子节点的映射，键为字符，值为对应的子节点
 *   b. isEndOfWord: 标记当前节点是否是某个单词的结束
 * - 所有操作都从根节点开始，沿着字符路径遍历树
 * - 查找和前缀检查的区别在于是否需要检查最后一个节点的结束标记
 * - 可以使用Map或对象实现字符到子节点的映射
 *
 * 5. 复杂度分析
 * A. 数组存储法：
 *   - 时间复杂度：
 *     - 插入：O(1)
 *     - 查找：O(n)，n为存储的字符串数量
 *     - 前缀检查：O(n*m)，n为字符串数量，m为平均字符串长度
 *   - 空间复杂度：O(n*m)，存储所有字符串
 *
 * B. 树形结构法：
 *   - 时间复杂度：
 *     - 插入：O(m)，m为单词长度
 *     - 查找：O(m)，m为单词长度
 *     - 前缀检查：O(m)，m为前缀长度
 *   - 空间复杂度：最坏情况O(n*m)，但由于前缀共享，实际通常小于这个值
 *
 * 6. 方法选择
 * - 数组法适合小数据量、简单实现场景
 * - 树形结构法在大数据量、需要频繁查询的场景下性能更优
 * - 本题作为Trie专题，应当选择树形结构法的标准实现
 * - 实际应用中，Trie常用于自动补全、拼写检查、IP路由等场景
 */

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

export class Trie2 {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
  }

  search(word: string): boolean {
    const node = this.searchPrefix(word);
    return node !== null && node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    return this.searchPrefix(prefix) !== null;
  }

  private searchPrefix(prefix: string): TrieNode | null {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }

    return current;
  }
}

class Trie {
  arr: string[];

  constructor() {
    this.arr = [];
  }

  insert(word: string): void {
    this.arr.push(word);
  }

  search(word: string): boolean {
    return this.arr.indexOf(word) > -1 ? true : false;
  }

  startsWith(prefix: string): boolean {
    for (let i = 0; i < this.arr.length; i++) {
      let element = this.arr[i];
      console.log('element', element, element.slice(0, prefix.length));

      if (element.slice(0, prefix.length) === prefix) {
        return true;
      }
    }
    return false;
  }
}

export default {
  run: () => {
    const examples = [
      {
        operations: ['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'],
        parameters: [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']],
        expected: [null, null, true, false, true, null, true],
      },
    ];

    for (const example of examples) {
      const results = [];
      let trie = null;

      for (let i = 0; i < example.operations.length; i++) {
        const operation = example.operations[i];
        const params = example.parameters[i];

        if (operation === 'Trie') {
          trie = new Trie();
          results.push(null);
        } else if (operation === 'insert') {
          results.push(trie!.insert(params[0]));
        } else if (operation === 'search') {
          results.push(trie!.search(params[0]));
        } else if (operation === 'startsWith') {
          results.push(trie!.startsWith(params[0]));
        }
      }

      console.log(`输入: operations = ${JSON.stringify(example.operations)}`);
      console.log(`输入: parameters = ${JSON.stringify(example.parameters)}`);
      console.log(`输出: ${JSON.stringify(results)}`);
      console.log(`期望: ${JSON.stringify(example.expected)}`);
      console.log(
        `测试结果: ${JSON.stringify(results) === JSON.stringify(example.expected) ? '通过' : '失败'}`
      );
    }
  },
};
