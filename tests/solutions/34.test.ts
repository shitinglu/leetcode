/**
 * 34. goodNodes - 单元测试
 */
import { goodNodes, TreeNode } from '../../src/solutions/34';

describe('goodNodes', () => {
  test('示例1', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(4);
    root.left.left = new TreeNode(3);
    root.right.left = new TreeNode(1);
    root.right.right = new TreeNode(5);
    expect(goodNodes(root)).toBe(4);
  });

  test('示例2', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(2);
    expect(goodNodes(root)).toBe(3);
  });

  test('示例3', () => {
    const root = new TreeNode(1);
    expect(goodNodes(root)).toBe(1);
  });
});
