/**
 * 37. lowestCommonAncestor - 单元测试
 */
import { lowestCommonAncestor, TreeNode } from '../../src/solutions/37';

describe('lowestCommonAncestor', () => {
  it('should return the lowest common ancestor of two nodes', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(0);
    root.right.right = new TreeNode(8);

    const p = root.left;
    const q = root.left.right;

    const result = lowestCommonAncestor(root, p, q);

    expect(result.val).toBe(5);
  });
});
