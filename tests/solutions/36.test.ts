/**
 * 36. longestZigZag - 单元测试
 */
import { longestZigZag, TreeNode } from '../../src/solutions/36';

describe('longestZigZag', () => {
  test('示例1', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(6);
    root.right.left.left = new TreeNode(7);
    root.right.left.right = new TreeNode(8);
    expect(longestZigZag(root)).toBe(3);
  });
});
