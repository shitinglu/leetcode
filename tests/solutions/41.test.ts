/**
 * 41. deleteNode - 单元测试
 */
import { deleteNode, TreeNode } from '../../src/solutions/41';

describe('deleteNode', () => {
  test('示例1', () => {
    const root = new TreeNode(
      5,
      new TreeNode(3, new TreeNode(2), new TreeNode(4)),
      new TreeNode(6, null, new TreeNode(7))
    );
    const key = 3;
    const result = deleteNode(root, key);
    expect(result).toEqual(
      new TreeNode(5, new TreeNode(4, new TreeNode(2)), new TreeNode(6, null, new TreeNode(7)))
    );
  });

  test('示例2', () => {
    const root = new TreeNode(
      5,
      new TreeNode(3, new TreeNode(2), new TreeNode(4)),
      new TreeNode(6, null, new TreeNode(7))
    );
    const key = 0;
    const result = deleteNode(root, key);
    expect(result).toEqual(root);
  });

  test('示例3', () => {
    const root = new TreeNode(
      5,
      new TreeNode(3, new TreeNode(2), new TreeNode(4)),
      new TreeNode(6, null, new TreeNode(7))
    );
    const key = 7;
    const result = deleteNode(root, key);
    expect(result).toEqual(root);
  });
});
