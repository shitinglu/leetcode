/**
 * 35. pathSum - 单元测试
 */
import { pathSum, TreeNode } from '../../src/solutions/35';

describe('pathSum', () => {
  test('示例1', () => {
    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.right.right.left = new TreeNode(5);
    root.right.right.right = new TreeNode(1);
    expect(pathSum(root, 22)).toBe(true);
  });

  test('示例2', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(pathSum(root, 5)).toBe(false);
  });
});
