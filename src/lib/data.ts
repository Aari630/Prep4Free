import type { Language, Problem } from './types';

export const languages: Language[] = [
  { id: 71, name: 'Python (3.8.1)', monacoId: 'python' },
  { id: 62, name: 'Java (OpenJDK 13.0.1)', monacoId: 'java' },
  { id: 63, name: 'JavaScript (Node.js 12.14.0)', monacoId: 'javascript' },
  { id: 54, name: 'C++ (GCC 9.2.0)', monacoId: 'cpp' },
];

export const problems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    slug: 'two-sum',
    description: `
Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3,2,4], target = 6
Output: [1,2]

**Constraints:**
- \`2 <= nums.length <= 104\`
- \`-109 <= nums[i] <= 109\`
- \`-109 <= target <= 109\`
- **Only one valid answer exists.**
    `,
    difficulty: 'EASY',
    boilerplateCode: `function twoSum(nums, target) {\n  // Your code here\n};`,
    testCases: [
      { id: 't1-1', input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isHidden: false },
      { id: 't1-2', input: '[3,2,4]\n6', expectedOutput: '[1,2]', isHidden: false },
      { id: 't1-3', input: '[3,3]\n6', expectedOutput: '[0,1]', isHidden: true },
    ],
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description: `
Given a string \`s\` containing just the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\` and \`]\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
Input: s = "()"
Output: true

**Example 2:**
Input: s = "()[]{}"
Output: true

**Constraints:**
- \`1 <= s.length <= 104\`
- \`s\` consists of parentheses only \`()[]{}\`.
    `,
    difficulty: 'EASY',
    boilerplateCode: `function isValid(s) {\n  // Your code here\n};`,
    testCases: [
      { id: 't2-1', input: '"()"', expectedOutput: 'true', isHidden: false },
      { id: 't2-2', input: '"()[]{}"', expectedOutput: 'true', isHidden: false },
      { id: 't2-3', input: '"(]"', expectedOutput: 'false', isHidden: true },
      { id: 't2-4', input: '"{[]}"', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    description: `
Given a string \`s\`, find the length of the **longest substring** without repeating characters.

**Example 1:**
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

**Example 2:**
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

**Constraints:**
- \`0 <= s.length <= 5 * 104\`
- \`s\` consists of English letters, digits, symbols and spaces.
    `,
    difficulty: 'MEDIUM',
    boilerplateCode: `function lengthOfLongestSubstring(s) {\n  // Your code here\n};`,
    testCases: [
        { id: 't3-1', input: '"abcabcbb"', expectedOutput: '3', isHidden: false },
        { id: 't3-2', input: '"bbbbb"', expectedOutput: '1', isHidden: false },
        { id: 't3-3', input: '"pwwkew"', expectedOutput: '3', isHidden: true },
    ],
  },
    {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    description: `
Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.

**Example 1:**
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

**Constraints:**
- \`nums1.length == m\`
- \`nums2.length == n\`
- \`0 <= m <= 1000\`
- \`0 <= n <= 1000\`
- \`1 <= m + n <= 2000\`
- \`-10^6 <= nums1[i], nums2[i] <= 10^6\`
    `,
    difficulty: 'HARD',
    boilerplateCode: `function findMedianSortedArrays(nums1, nums2) {\n  // Your code here\n};`,
    testCases: [
        { id: 't4-1', input: '[1,3]\n[2]', expectedOutput: '2.0', isHidden: false },
        { id: 't4-2', input: '[1,2]\n[3,4]', expectedOutput: '2.5', isHidden: false },
    ],
  },
];
