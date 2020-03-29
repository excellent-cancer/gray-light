<template>
  <el-container>

    <!-- 文档头部 -->

    <header-container :items="headerItems"></header-container>

    <el-container>

      <!-- 文章导航 -->

      <aside-container :items="asideItems"></aside-container>

      <!-- 文章展示 -->

      <main-container :source="source"></main-container>

    </el-container>

  </el-container>
</template>

<script>
  import HeaderContainer from "./HeaderContainer.vue"
  import AsideContainer from "./AsideContainer.vue"
  import MainContainer from "./MainContainer.vue"

  export default {
    name: "LayoutContainer",

    data() {
      return {
        headerItems: [
          <el-link type="primary">主要链接</el-link>,
          <el-link type="primary">主要链接</el-link>,
          <el-link type="primary">主要链接</el-link>
        ],
        asideItems: Array.of({
          title: "基础",
          items: [
            {
              title: "介绍",
              items: [
                {
                  title: "豪杰撒", href: "/"
                }
              ]
            }
          ]
        }),
        source: "# 正则表达式匹配\n" +
          "\n" +
          "- [题目链接](https://leetcode-cn.com/problems/regular-expression-matching/)\n" +
          "\n" +
          "## 解决方法\n" +
          "\n" +
          "`NFA` `动态规划`\n" +
          "\n" +
          "### NFA\n" +
          "\n" +
          "非确定有限状态自动机，当且仅当自动机达到停止状态时它才找到匹配状态，与KMP完全类似。\n" +
          "\n" +
          "#### 思路\n" +
          "\n" +
          "1. 构造一个状态机：输入正则表达式其中一个字符，可以得到输入字符可以到达的其他字符\n" +
          "2. 获取可到状态：输入已达状态字符，获取可到达的所有字符\n" +
          "    - 若无可到达状态，说明无法匹配\n" +
          "3. 匹配判断：按顺序取匹配字符串的字符与所有可到达正则字符匹配\n" +
          "    - 若匹配成功，将下一个状态置于已达状态\n" +
          "4. 重复步骤2，直至匹配字符串匹配完全\n" +
          "5. 匹配完全：若已达状态中，有任意一个状态到达结束状态，说明匹配成功\n" +
          "\n" +
          "\n" +
          "#### 局限\n" +
          "\n" +
          "若匹配一个字符，产生过多的可达状态，则需要逐一遍历匹配，造成过多消耗\n" +
          "\n" +
          "\n" +
          "#### 代码\n" +
          "\n" +
          "```java\n" +
          "public boolean isMatch(String s, String p) {\n" +
          "        // 建立状态图\n" +
          "        int[] graph = makeGraph(p);\n" +
          "        int endState = graph.length;\n" +
          "\n" +
          "        // 每轮遍历匹配的状态，matchLength记录状态个数\n" +
          "        int[] matchable = new int[endState + 1];\n" +
          "        int matchLength = 1;\n" +
          "        matchable[0] = 0;\n" +
          "\n" +
          "        // 下一轮遍历可以匹配的状态，reachLength记录状态个数\n" +
          "        int[] reachable = new int[endState + 1];\n" +
          "        int reachLength = reachable(graph, reachable, matchable, matchLength);\n" +
          "\n" +
          "        char current, regexp;\n" +
          "        for (int i = 0; i < s.length(); i++) {\n" +
          "            matchLength = 0;\n" +
          "            current = s.charAt(i);\n" +
          "\n" +
          "            // 判断current是否可以匹配状态，若匹配则记录下一个状态至matchable\n" +
          "            for (int j = reachLength - 1; j > -1; j--) {\n" +
          "                if (reachable[j] == endState) continue;\n" +
          "                regexp = p.charAt(reachable[j]);\n" +
          "                if (regexp == current || regexp == '.') {\n" +
          "                    matchable[matchLength++] = reachable[j] + 1;\n" +
          "                }\n" +
          "            }\n" +
          "\n" +
          "            reachLength = reachable(graph, reachable, matchable, matchLength);\n" +
          "\n" +
          "            // 若下一轮无状态匹配，宣告失败\n" +
          "            if (reachLength == 0) {\n" +
          "                return false;\n" +
          "            }\n" +
          "        }\n" +
          "\n" +
          "        // 是否有任意一个状态到达endState\n" +
          "        for (int i = 0; i < reachLength; i++) {\n" +
          "            if (reachable[i] == endState) {\n" +
          "                return true;\n" +
          "            }\n" +
          "        }\n" +
          "\n" +
          "        return false;\n" +
          "    }\n" +
          "```\n" +
          "\n" +
          "#### 运行情况\n" +
          "执行时间：`2 ms`\n" +
          "消耗内存：`35.7 MB`\n" +
          "\n" +
          "### 动态规划\n" +
          "将`n`长度的字符串与`m`长度的正则表达式的匹配情况，全部计算出来，最终得到是否匹配。其中：\n" +
          "- `n`: ```1 <= n <= StringLength```\n" +
          "- `m`: ```1 <= m <= RegexLength```\n" +
          "\n" +
          "#### 思路\n" +
          "1. 构造匹配情况表：`T(m, n)`\n" +
          "2. 依次枚举`m`和`n`所有情况：\n" +
          "    1. `*`: `T(m, n)` = `match(m - 1, n)` ? { `T(m - 2, n - 1)` || `T(m, n - 1)` || `T(m - 2, n)` } : `T(m - 2, n)`\n" +
          "    2. 非`*`: `T(m, n)` = `match(m, n)` | `T(m - 1, n - 1)`\n" +
          "3. 返回结果`T(RegexLength, StringLength)`\n" +
          "\n" +
          "\n" +
          "-------\n" +
          "其中：`Match(m, n)`表示，`m`位置正则是否与`n`位置字符匹配\n" +
          "\n" +
          "#### 局限\n" +
          "\n" +
          "动态规划需要稳定枚举出所有情况，才能通过推到得出其他情况\n" +
          "\n" +
          "#### 代码\n" +
          "```java\n" +
          "public boolean isMatch(String match, String regex) {\n" +
          "\n" +
          "        DynamicTable dynamicTable = new DynamicTable(match.length(), regex.length());\n" +
          "\n" +
          "        // 初始化长度为0的字符串与正则表达式匹配情况\n" +
          "        for (int i = 1; i < regex.length(); i++) {\n" +
          "            if (regex.charAt(i) == '*') {\n" +
          "                dynamicTable.matchWithEmptyMatch(i);\n" +
          "            }\n" +
          "        }\n" +
          "\n" +
          "        // 计算i(0 <= i <= regex.length())长度正则表达式与j(0<= j <= match.length())长度字符串的匹配情况\n" +
          "        for (int i = 0; i < regex.length(); i++) {\n" +
          "\n" +
          "            char regexp = regex.charAt(i);\n" +
          "\n" +
          "            for (int j = 0; j < match.length(); j++) {\n" +
          "\n" +
          "                char current = match.charAt(j);\n" +
          "\n" +
          "                switch (matches(current, regexp)) {\n" +
          "                    case MATCHED:\n" +
          "                        dynamicTable.matched(i, j);\n" +
          "                        break;\n" +
          "                    case ASTERISK:\n" +
          "                        if (matchesQuietly(current, regex.charAt(i - 1)) == MatchedState.MATCHED) {\n" +
          "                            dynamicTable.matchedWithAsterisk(i, j);\n" +
          "                        } else {\n" +
          "                            dynamicTable.unmatchWithAsterisk(i, j);\n" +
          "                        }\n" +
          "                        break;\n" +
          "                    default:\n" +
          "                        break;\n" +
          "                }\n" +
          "\n" +
          "            }\n" +
          "\n" +
          "        }\n" +
          "\n" +
          "        return dynamicTable.isMatched();\n" +
          "    }\n" +
          "```"
      }
    },

    components: {
      HeaderContainer,
      AsideContainer,
      MainContainer
    }
  }
</script>

<style scoped>

</style>