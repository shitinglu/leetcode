/**
 * 39. maxLevelSum - 单元测试
 */
import { maxLevelSum, TreeNode } from '../../src/solutions/39';

describe('maxLevelSum', () => {
  it('should return the level with the maximum sum', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(7);
    root.right = new TreeNode(0);
    root.left.left = new TreeNode(7);
    root.left.right = new TreeNode(-8);

    const result = maxLevelSum(root);
    expect(result).toBe(2);
  });

  it('should return 1 for a single node tree', () => {
    const root = new TreeNode(1);
    const result = maxLevelSum(root);
    expect(result).toBe(1);
  });

  it('should return 2 for a tree with two levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);

    const result = maxLevelSum(root);
    expect(result).toBe(2);
  });

  it('should return 1 for a tree with negative values', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(-2);
    root.right = new TreeNode(-3);
    root.left.left = new TreeNode(-4);
    root.left.right = new TreeNode(-5);
    root.right.left = new TreeNode(-6);
    root.right.right = new TreeNode(-7);

    const result = maxLevelSum(root);
    expect(result).toBe(1);
  });
});
