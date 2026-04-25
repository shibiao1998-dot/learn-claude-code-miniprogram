module.exports = {
  "version": "tips",
  "slug": "tips-daily",
  "locale": "zh",
  "title": "日常习惯 实用技巧",
  "kind": "tips",
  "content": "# 日常习惯\n\n> 本分类共 6 条技巧\n\n## 1. 自定义快捷键\n\nClaude Code 中的每个快捷键都可以自定义。运行 `/keybindings` 重新映射任何按键。设置会实时加载，你可以立即感受效果。\n\n---\n\n## 2. 使用输出风格\n\n运行 `/config` 设置输出风格，让 Claude 以不同的语气或格式回复。\n\n- **Explanatory**（解释型）—— 建议在熟悉新代码库时使用，让 Claude 在工作时解释框架和代码模式\n- **Learning**（学习型）—— 让 Claude 指导你进行代码修改\n- **Custom**（自定义）—— 创建自定义输出风格以调整 Claude 的语调\n\n---\n\n## 3. Cowork Dispatch\n\nBoris 每天都使用 Dispatch 来查看 Slack 和邮件、管理文件，以及在不在电脑前时在笔记本电脑上做事。当他不在写代码时，他就在使用 Dispatch。\n\n- Dispatch 是 Claude Desktop 应用的**安全远程控制**\n- 它可以使用你的 MCP、浏览器和电脑，需要你的许可\n- 把它想象成一种从任何地方把非编码任务委托给 Claude 的方式\n\n---\n\n## 4. 使用 Chrome 扩展做前端工作\n\n使用 Claude Code 最重要的技巧：**给 Claude 一种验证其输出的方式。** 一旦你做到了这一点，Claude 就会不断迭代直到结果令人满意。\n\n- 想象一下让某人搭建一个网站，但不让他使用浏览器——结果大概不会好看\n- 给 Claude 一个浏览器，它就会写代码并不断迭代直到看起来满意\n- Boris 每次做 Web 代码时都使用 Chrome 扩展——它比其他类似的 MCP 工作得更可靠\n\n---\n\n## 5. 分叉你的会话\n\n经常有人问如何分叉现有会话。有两种方式：\n\n1. 在会话中运行 `/branch`\n2. 从 CLI 运行 `claude --resume <session-id> --fork-session`\n\n`/branch` 创建一个分支对话——你现在在分支中。要恢复原始会话，使用 `claude -r <original-session-id>`。\n\n---\n\n## 6. 使用 --add-dir 让 Claude 访问更多文件夹\n\n当跨多个仓库工作时，Boris 通常在一个仓库中启动 Claude，然后使用 `--add-dir`（或 `/add-dir`）让 Claude 看到另一个仓库。\n\n- 这不仅告诉 Claude 这个仓库的存在，还**赋予它在该仓库中工作的权限**\n- 或者在团队的 `settings.json` 中添加 `\"additionalDirectories\"`，在启动 Claude Code 时始终加载额外的文件夹\n\n---"
};
