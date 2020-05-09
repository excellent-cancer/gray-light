export default {

  "1": "# 按既定顺序创建目标数组\n" +
    "\n" +
    "[题目链接](https://leetcode-cn.com/problems/create-target-array-in-the-given-order/)\n" +
    "\n" +
    "## 解决方法\n" +
    "`链表`\n" +
    "\n" +
    "### 链表\n" +
    "\n" +
    "#### 思路\n" +
    "\n" +
    "此题插入数组的行为和链表插入的行为一致，只是`LinkedList`不是`RandomAccess`，选择插入的位置需要消耗一些时间\n" +
    "\n" +
    "##### 代码\n" +
    "```java\n" +
    "public class Solution {\n" +
    "    public int[] createTargetArray(int[] nums, int[] index) {\n" +
    "        return IntStream.range(0, nums.length)\n" +
    "                .collect(LinkedList<Integer>::new, (list, value) -> list.add(index[value], nums[value]), (a, b) -> {})\n" +
    "                .stream()\n" +
    "                .mapToInt(Integer::intValue)\n" +
    "                .toArray();\n" +
    "    }\n" +
    "}\n" +
    "```",

  "2": "# 最长快乐前缀\n" +
    "[题目链接](https://leetcode-cn.com/problems/longest-happy-prefix/)\n" +
    "\n" +
    "## 新解决方法\n" +
    "`Rabin-Karp指纹字符串`\n" +
    "\n" +
    "### Rabin-Karp指纹字符串\n" +
    "\n" +
    "#### 思路\n" +
    "\n" +
    "* 制定`R`进制，其中`R` = 31\n" +
    "* 对于字符串`S`，从`i`下标到`j`下标的字符串哈希值为`H(i, j)`。那么：\n" +
    "    * `H(i, j + 1)` = `H(i, j)` * `R` + `H(j + 1, j + 1)`\n" +
    "    * `H(i - 1, j)` = `H(i, j)` + `H(i - 1, i - 1)` * `R`^(j - i + 1)\n" +
    "* 从字符串头部和尾部，遍历获取前缀对比哈希值，找到哈希值相等的最大长度\n" +
    "\n" +
    "#### 代码\n" +
    "```java\n" +
    "public class Solution {\n" +
    "\n" +
    "    public String longestPrefix(String s) {\n" +
    "        int length = 0;\n" +
    "        int a = 31;\n" +
    "        \n" +
    "        for (int i = 0, j = s.length() - 1, k = 0, n = 0, m = 1; i < s.length() - 1; i++,j--) {\n" +
    "            // H(i, j + 1) = H(i, j) * R + H(j + 1, j + 1)\n" +
    "            k = k * 31 + s.charAt(i);\n" +
    "            // H(i - 1, j) = H(i, j) + H(i - 1, i - 1) * R ^ (j - i + 1)\n" +
    "            n = n + s.charAt(j) * m;\n" +
    "\n" +
    "            m *= a;\n" +
    "\n" +
    "            if (k == n) {\n" +
    "                length = i + 1;\n" +
    "            }\n" +
    "\n" +
    "        }\n" +
    "\n" +
    "        return s.substring(0, length);\n" +
    "    }\n" +
    "\n" +
    "}\n" +
    "```\n" +
    "\n",

  "3": "# 检查网格中是否存在有效路径\n" +
    "\n" +
    "- [题目链接](https://leetcode-cn.com/problems/check-if-there-is-a-valid-path-in-a-grid/)\n" +
    "\n" +
    "## 解决方法\n" +
    "\n" +
    "`BFS`\n" +
    "\n" +
    "### BFS\n" +
    "\n" +
    "#### 思路\n" +
    "\n" +
    "经典搜索背公式，其中需要注意：\n" +
    "\n" +
    "- 建立一个街道方向表`T(in, street)`：输入街道`street`和进入街道方向`in`，获取是否有出去街道方向`out`\n" +
    "\n" +
    "#### 代码\n" +
    "* `T(in, street)`为代码中的`directionTable`\n" +
    "* `Street`代表表格中的一个街道，其中重要的成员变量：\n" +
    "    * `Street.in`：进入街道的方向\n" +
    "    * `Street.out`：离开街道的方向\n" +
    "    * `Street.row`：`grid`的纵坐标\n" +
    "    * `Street.column`：`grid`的横坐标\n" +
    "    \n" +
    "```java\n" +
    "// 经典搜索公式\n" +
    "while (!queue.isEmpty()) {\n" +
    "    Street street = queue.poll();\n" +
    "\n" +
    "    // 标记是否已经搜索过\n" +
    "    walked[street.row][street.column] = true;\n" +
    "    // \n" +
    "    int nextRow = street.nextRow();\n" +
    "    int nextColumn = street.nextColumn();\n" +
    "\n" +
    "    // 判断是否出界且是否搜索过\n" +
    "    if (nextColumn >= 0 && nextColumn < columns && nextRow >= 0 && nextRow < rows && !walked[nextRow][nextColumn]) {\n" +
    "\n" +
    "        //当前街道的出去方向，即下一个街道的输入方向\n" +
    "        // 获取下一个街道的出去方向\n" +
    "        Direction nextIn = street.out;\n" +
    "        Direction nextOut = directionTable.\n" +
    "                // 支持该入口方向的所有街道\n" +
    "                get(nextIn).\n" +
    "                // 下个一街道是否有出口\n" +
    "                get(grid[nextRow][nextColumn]);\n" +
    "\n" +
    "        if (nextOut != null) {\n" +
    "            // 判断是否到达右下角街道\n" +
    "            if (nextRow == rows - 1 && nextColumn == columns - 1) {\n" +
    "                return true;\n" +
    "            }\n" +
    "\n" +
    "            queue.add(new Street(nextRow, nextColumn, nextIn, nextOut));\n" +
    "\n" +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "return false;\n" +
    "```\n" +
    "\n" +
    "\n",
  "4": "最大得分的路径数目\n" +
    "======================\n" +
    "\n" +
    "- [题目链接](https://https://leetcode-cn.com/problems/number-of-paths-with-max-score/submissions/)\n" +
    "\n" +
    "# 解决方法\n" +
    "\n" +
    "`动态规划`\n" +
    "\n" +
    "## 动态规划\n" +
    "\n" +
    "### 思路\n" +
    "非常简单的动态规划：\n" +
    "\n" +
    "- 建立一个n*n的二维数组\n" +
    "- 计算到达`i，j`的最大分数和方案数\n" +
    "  - 分数等于`i - 1，j`，`i，j - 1`和`i - 1，j - 1`的最大值\n" +
    "  - 方案数等于\n" +
    "    - 最大分数的方案数\n" +
    "    - 相等分数的方案数和\n" +
    "- 用`long`类型作为二维数组的类型\n" +
    "  - 低32位表示分数\n" +
    "  - 高31位表示方案数\n" +
    "  \n" +
    "### 代码\n" +
    "\n" +
    "```java\n" +
    "public class Solution {\n" +
    "\n" +
    "    final static int MOD = (int) (1e9 + 7);\n" +
    "\n" +
    "    final static long SCORE_MASK = (1L << 32) - 1;\n" +
    "\n" +
    "    public int[] pathsWithMaxScore(List<String> board) {\n" +
    "        int size = board.size();\n" +
    "\n" +
    "        //这里用一个long类型记录信息\n" +
    "        // 1~31位：得分\n" +
    "        // 32~64位：方案数\n" +
    "        long[][] dp = new long[size][size];\n" +
    "\n" +
    "        // 方案数：1\n" +
    "        // 得分：0\n" +
    "        dp[0][0] = 1L << 32;\n" +
    "\n" +
    "        // 计算达到(i,j)的最大分数和方案数\n" +
    "        for (int i = 0; i < size; i++) {\n" +
    "            String mess = board.get(i);\n" +
    "            for (int j = i == 0 ? 1 : 0; j < size; j++) {\n" +
    "                // 默认为负数\n" +
    "                long ctl = 1L << 63;\n" +
    "                char c = mess.charAt(j);\n" +
    "\n" +
    "                if (c != 'X') {\n" +
    "\n" +
    "                    // 向左\n" +
    "                    if (j > 0 && dp[i][j - 1] >= 0) {\n" +
    "                        ctl = computeMaxScore(dp[i][j - 1], ctl);\n" +
    "                    }\n" +
    "\n" +
    "                    // 向上\n" +
    "                    if (i > 0 && dp[i - 1][j] >= 0) {\n" +
    "                        ctl = computeMaxScore(dp[i - 1][j], ctl);\n" +
    "                    }\n" +
    "\n" +
    "                    // 向左上\n" +
    "                    if (i > 0 && j > 0 && dp[i - 1][j - 1] >= 0) {\n" +
    "                        ctl = computeMaxScore(dp[i - 1][j - 1], ctl);\n" +
    "                    }\n" +
    "\n" +
    "                    // 如果有最大值则加之\n" +
    "                    if (ctl >= 0 && c != 'S') {\n" +
    "                        ctl += c - '0';\n" +
    "                    }\n" +
    "                }\n" +
    "\n" +
    "                dp[i][j] = ctl;\n" +
    "            }\n" +
    "        }\n" +
    "\n" +
    "        return dp[size - 1][size - 1] < 0 ?\n" +
    "                new int[] {0, 0} :\n" +
    "                new int[] {(int) dp[size - 1][size -1], (int) (dp[size - 1][size -1] >>> 32)};\n" +
    "    }\n" +
    "\n" +
    "    private static long computeMaxScore(long prev, long curr) {\n" +
    "        if (curr >= 0) {\n" +
    "            // 取低32位，即分数\n" +
    "            int currScore = (int) curr;\n" +
    "            int prevScore = (int) prev;\n" +
    "\n" +
    "            if (currScore < prevScore) {\n" +
    "                // 有最大值，分数和方案一致\n" +
    "                curr = prev;\n" +
    "            } else if (currScore == prevScore) {\n" +
    "                // 分数一样，则将方案相加，大于1e9+7则取余\n" +
    "                curr = (curr | SCORE_MASK) | sumAndMod(prev, curr);\n" +
    "            }\n" +
    "        } else {\n" +
    "            curr = prev;\n" +
    "        }\n" +
    "\n" +
    "        return curr;\n" +
    "    }\n" +
    "\n" +
    "    private static long sumAndMod(long a, long b) {\n" +
    "        long sum = (a >>> 32) + (b >>> 32);\n" +
    "        // 因为a和b都必不可能大于MOD\n" +
    "        return (sum > MOD) ? sum : sum - MOD;\n" +
    "    }\n" +
    "}\n" +
    "```\n" +
    "\n" +
    "### 运行情况\n" +
    "执行用时：`14 ms`\n" +
    "\n" +
    "#### 为什么是`14ms`？\n" +
    "\n" +
    "不管怎么样都是`O(n*n)`，最大长度就`100`，当执行这个用例也只用了`2ms`。\n" +
    "难道传入的`List`并不是`RandomAccess`？"

}