/**
 * 38. rightSideView - 单元测试
 */
import { rightSideView, TreeNode } from '../../src/solutions/38';

describe('rightSideView', () => {
  it('should return the right side view of a binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(4);

    const result = rightSideView(root);
    expect(result).toEqual([1, 3, 4]);
  });

  it('should return an empty array for an empty tree', () => {
    const root = null;
    const result = rightSideView(root);
    expect(result).toEqual([]);
  });

  it('should return the right side view of a binary tree with only one node', () => {
    const root = new TreeNode(1);
    const result = rightSideView(root);
    expect(result).toEqual([1]);
  });
});
