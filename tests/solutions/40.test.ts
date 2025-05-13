/**
 * 40. searchBST - 单元测试
 */
import { searchBST, TreeNode } from '../../src/solutions/40';

describe('searchBST', () => {
  it('should return the correct result', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    const result = searchBST(root, 2);
    expect(result).toEqual(new TreeNode(2));
  });

  it('should return null if the value is not found', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(1);
    const result = searchBST(root, 5);
    expect(result).toBeNull();
  });
});
