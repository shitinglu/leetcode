/**
 * https://leetcode.cn/problems/reverse-vowels-of-a-string/description/?envType=study-plan-v2&envId=leetcode-75
 * 14. reverseVowels
 *
 * 345. 反转字符串中的元音字母
 * 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。
 *
 * 元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。
 *
 * 示例 1：
 * 输入：s = "IceCreAm"
 * 输出："AceCreIm"
 * 解释：
 * s 中的元音是 ['I', 'e', 'e', 'A']。反转这些元音，s 变为 "AceCreIm".
 *
 * 示例 2：
 * 输入：s = "leetcode"
 * 输出："leotcede"
 *
 * 提示：
 * 1 <= s.length <= 3 * 10^5
 * s 由可打印的 ASCII 字符组成
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 找到字符串中的所有元音字母
 *    - 将这些元音字母按位置反转
 *    - 保持其他非元音字母位置不变
 *
 * 2. 解决方案（双指针法）
 *    - 使用左右双指针，分别从字符串两端向中间移动
 *    - 找到元音字母时进行交换
 *    - 非元音字母时继续移动对应指针
 *
 * 3. 具体执行流程 (以 s = "hello" 为例)：
 *    a) 转换字符串为数组方便操作
 *    b) left=0, right=4 开始
 *       - left找到'e'，right找到'o'，交换
 *       - 变成"holle"
 *    c) 继续移动指针直到left>=right
 *
 * 4. 关键点：
 *    - 使用Set存储元音字母集合，提高查找效率
 *    - 双指针同时向中间移动
 *    - 字符串转数组处理，最后再合并
 *
 * 5. 复杂度分析：
 *    - 时间：O(n)，只需要遍历一次字符串
 *    - 空间：O(n)，需要将字符串转换为数组
 *
 * 6. 优化方案：
 *    - 使用Set代替Array存储元音字母，将查找复杂度从O(n)降到O(1)
 *    - 使用解构赋值简化交换操作
 */

// 双指针方法，最优解法
export function reverseVowels(s: string) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  const arr = s.split('');
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // 从左边找到元音字母
    while (left < right && !vowels.has(arr[left])) {
      left++;
    }
    // 从右边找到元音字母
    while (left < right && !vowels.has(arr[right])) {
      right--;
    }
    // 交换两个元音字母
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr.join('');
}

// 我的第一种解法  非最优
export function reverseVowels2(s: string) {
  const vowelsArr: string[] = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  const arr: number[] = [];
  // 将字符串转换为数组
  const sArr = s.split('');

  for (let i = 0; i < s.length; i++) {
    const e = s[i];

    if (vowelsArr.indexOf(e) >= 0) {
      arr.push(i);
    }
  }

  for (let j = 0; j < Math.floor(arr.length / 2); j++) {
    const n1: number = arr[j];
    const n2: number = arr[arr.length - 1 - j];

    var temp = sArr[n2];
    sArr[n2] = sArr[n1];
    sArr[n1] = temp;
  }

  return sArr.join('');
}

export default {
  run: () => {
    const examples = ['IceCreAm', 'leetcode'];

    examples.forEach(example => {
      console.log(reverseVowels(example));
    });
  },
};
