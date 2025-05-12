/**
 * 33. 到 - 单元测试
 */
import { leafSimilar, TreeNode } from '../../src/solutions/33';

describe('leafSimilar', () => {
  test('示例1', () => {
    const root1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    const root2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(leafSimilar(root1, root2)).toBe(true);
  });

  test('示例2', () => {
    const root1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    const root2 = new TreeNode(1, new TreeNode(3), new TreeNode(2));
    expect(leafSimilar(root1, root2)).toBe(false);
  });

  test('示例3', () => {
    const root1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    const root2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(leafSimilar(root1, root2)).toBe(true);
  });

  test('示例4', () => {
    const root1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    const root2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(leafSimilar(root1, root2)).toBe(true);
  });
});
