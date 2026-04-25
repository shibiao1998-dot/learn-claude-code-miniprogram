# 命令最佳实践

Claude Code 命令——frontmatter 字段与官方内置斜杠命令。

---

## Frontmatter 字段（13 个）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 否 | 显示名称和 `/slash-command` 标识符。省略时默认使用目录名 |
| `description` | string | 推荐 | 命令的功能描述。显示在自动补全中，也用于 Claude 的自动发现 |
| `argument-hint` | string | 否 | 自动补全时显示的提示（如 `[issue-number]`、`[filename]`） |
| `disable-model-invocation` | boolean | 否 | 设为 `true` 可阻止 Claude 自动调用此命令 |
| `user-invocable` | boolean | 否 | 设为 `false` 可从 `/` 菜单中隐藏——命令仅作为后台知识存在 |
| `paths` | string/list | 否 | 限制此技能激活时机的 glob 模式。接受逗号分隔的字符串或 YAML 列表。设置后，Claude 仅在处理匹配文件时自动加载该技能 |
| `allowed-tools` | string | 否 | 此命令激活时允许无需权限提示即可使用的工具 |
| `model` | string | 否 | 运行此命令时使用的模型（如 `haiku`、`sonnet`、`opus`） |
| `effort` | string | 否 | 调用时覆盖模型的推理努力级别（`low`、`medium`、`high`、`max`） |
| `context` | string | 否 | 设为 `fork` 可在隔离的子代理上下文中运行命令 |
| `agent` | string | 否 | 当 `context: fork` 时使用的子代理类型（默认：`general-purpose`） |
| `shell` | string | 否 | `` !`command` `` 代码块使用的 shell——接受 `bash`（默认）或 `powershell`。需要设置 `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` |
| `hooks` | object | 否 | 作用域限定于此命令的生命周期钩子 |

---

## 官方内置命令（69 个）

| # | 命令 | 分类 | 说明 |
|---|------|------|------|
| 1 | `/login` | Auth | 登录你的 Anthropic 账户 |
| 2 | `/logout` | Auth | 退出你的 Anthropic 账户 |
| 3 | `/setup-bedrock` | Auth | 通过交互式向导配置 Amazon Bedrock 认证、区域和模型绑定。仅在设置 `CLAUDE_CODE_USE_BEDROCK=1` 时可见。首次使用 Bedrock 的用户也可从登录界面访问此向导 |
| 4 | `/setup-vertex` | Auth | 通过交互式向导配置 Google Vertex AI 认证、项目、区域和模型绑定。仅在设置 `CLAUDE_CODE_USE_VERTEX=1` 时可见。首次使用 Vertex AI 的用户也可从登录界面访问此向导 |
| 5 | `/upgrade` | Auth | 打开升级页面以切换到更高的计划等级 |
| 6 | `/color [color\|default]` | Config | 设置当前会话的提示栏颜色。可用颜色：`red`、`blue`、`green`、`yellow`、`purple`、`orange`、`pink`、`cyan`。使用 `default` 重置 |
| 7 | `/config` | Config | 打开设置界面以调整主题、模型、输出样式和其他偏好。别名：`/settings` |
| 8 | `/keybindings` | Config | 打开或创建快捷键配置文件 |
| 9 | `/permissions` | Config | 管理工具权限的允许、询问和拒绝规则。打开交互式对话框，可按作用域查看规则、添加或删除规则、管理工作目录，以及查看最近的自动模式拒绝记录。别名：`/allowed-tools` |
| 10 | `/privacy-settings` | Config | 查看和更新隐私设置。仅 Pro 和 Max 计划订阅者可用 |
| 11 | `/sandbox` | Config | 切换沙盒模式。仅在支持的平台上可用 |
| 12 | `/statusline` | Config | 配置 Claude Code 的状态栏。描述你想要的内容，或不带参数运行以从 shell 提示符自动配置 |
| 13 | `/stickers` | Config | 订购 Claude Code 贴纸 |
| 14 | `/terminal-setup` | Config | 配置终端快捷键，如 Shift+Enter 等。仅在需要的终端中可见，如 VS Code、Alacritty 或 Warp |
| 15 | `/theme` | Config | 更改颜色主题。包含浅色和深色变体、色盲友好（色觉矫正）主题，以及使用终端调色板的 ANSI 主题 |
| 16 | `/voice` | Config | 切换按键说话语音输入。需要 Claude.ai 账户 |
| 17 | `/context` | Context | 以彩色网格可视化当前上下文使用情况。显示上下文密集工具、记忆膨胀和容量警告的优化建议 |
| 18 | `/cost` | Context | 显示 token 使用统计。订阅相关详情请参阅费用追踪指南 |
| 19 | `/extra-usage` | Context | 配置额外用量，以便在触发速率限制时继续工作 |
| 20 | `/insights` | Context | 生成分析报告，包括项目领域、交互模式和摩擦点 |
| 21 | `/stats` | Context | 可视化每日使用情况、会话历史、连续使用天数和模型偏好 |
| 22 | `/status` | Context | 打开设置界面（状态标签页），显示版本、模型、账户和连接状态。可在 Claude 响应时使用，无需等待当前响应完成 |
| 23 | `/usage` | Context | 显示计划用量限制和速率限制状态 |
| 24 | `/doctor` | Debug | 诊断并验证你的 Claude Code 安装和设置 |
| 25 | `/feedback [report]` | Debug | 提交关于 Claude Code 的反馈。别名：`/bug` |
| 26 | `/help` | Debug | 显示帮助信息和可用命令 |
| 27 | `/powerup` | Debug | 通过快速交互式课程和动画演示发现 Claude Code 功能 |
| 28 | `/release-notes` | Debug | 在交互式版本选择器中查看更新日志。选择特定版本查看其发布说明，或选择显示所有版本 |
| 29 | `/tasks` | Debug | 列出和管理后台任务。别名：`/bashes` |
| 30 | `/copy [N]` | Export | 将最后一条助手回复复制到剪贴板。传入数字 `N` 可复制倒数第 N 条回复：`/copy 2` 复制倒数第二条。当存在代码块时，显示交互式选择器以选择单个代码块或完整回复。在选择器中按 `w` 可写入文件而非剪贴板，适用于 SSH 场景 |
| 31 | `/export [filename]` | Export | 将当前对话导出为纯文本。带文件名时直接写入该文件；不带时打开对话框选择复制到剪贴板或保存到文件 |
| 32 | `/agents` | Extensions | 管理代理配置 |
| 33 | `/chrome` | Extensions | 在 Chrome 设置中配置 Claude |
| 34 | `/hooks` | Extensions | 查看工具事件的钩子配置 |
| 35 | `/ide` | Extensions | 管理 IDE 集成并显示状态 |
| 36 | `/mcp` | Extensions | 管理 MCP 服务器连接和 OAuth 认证 |
| 37 | `/plugin` | Extensions | 管理 Claude Code 插件 |
| 38 | `/reload-plugins` | Extensions | 重新加载所有活动插件以应用待处理的更改，无需重启。报告每个重新加载组件的计数并标记任何加载错误 |
| 39 | `/skills` | Extensions | 列出可用的技能 |
| 40 | `/memory` | Memory | 编辑 `CLAUDE.md` 记忆文件，启用或禁用自动记忆，以及查看自动记忆条目 |
| 41 | `/effort [low\|medium\|high\|max\|auto]` | Model | 设置模型推理努力级别。`low`、`medium` 和 `high` 跨会话持久化。`max` 仅应用于当前会话且需要 Opus 4.6。`auto` 重置为模型默认值。不带参数时显示当前级别。立即生效，无需等待当前响应完成 |
| 42 | `/fast [on\|off]` | Model | 开启或关闭快速模式 |
| 43 | `/model [model]` | Model | 选择或更改 AI 模型。对于支持的模型，使用左/右箭头调整推理努力级别。更改立即生效，无需等待当前响应完成 |
| 44 | `/passes` | Model | 与朋友分享一周免费的 Claude Code。仅在账户符合条件时可见 |
| 45 | `/plan [description]` | Model | 从提示符直接进入计划模式。传入可选描述可进入计划模式并立即开始该任务，例如 `/plan fix the auth bug` |
| 46 | `/ultraplan <prompt>` | Model | 在 ultraplan 会话中起草计划，在浏览器中审阅，然后远程执行或发送回终端 |
| 47 | `/add-dir <path>` | Project | 为当前会话添加一个工作目录以便文件访问。添加的目录不会自动发现其中的大部分 `.claude/` 配置 |
| 48 | `/diff` | Project | 打开交互式差异查看器，显示未提交的更改和每轮差异。使用左/右箭头在当前 git diff 和单次 Claude 轮次之间切换，使用上/下箭头浏览文件 |
| 49 | `/init` | Project | 使用 `CLAUDE.md` 指南初始化项目。设置 `CLAUDE_CODE_NEW_INIT=1` 可启用交互式流程，同时引导设置技能、钩子和个人记忆文件 |
| 50 | `/review` | Project | 已弃用。请改为安装 `code-review` 插件：`claude plugin install code-review@claude-plugins-official` |
| 51 | `/security-review` | Project | 分析当前分支上的待处理更改是否存在安全漏洞。审查 git diff 并识别注入、认证问题和数据泄露等风险 |
| 52 | `/autofix-pr [prompt]` | Remote | 启动一个 Claude Code 网页会话，监控当前分支的 PR，在 CI 失败或审阅者留下评论时自动推送修复。通过 `gh pr view` 检测已签出分支的 PR；要监控其他 PR，请先签出其分支。需要 `gh` CLI 和 Claude Code 网页版访问权限 |
| 53 | `/desktop` | Remote | 在 Claude Code 桌面应用中继续当前会话。仅支持 macOS 和 Windows。别名：`/app` |
| 54 | `/install-github-app` | Remote | 为仓库设置 Claude GitHub Actions 应用。引导你选择仓库并配置集成 |
| 55 | `/install-slack-app` | Remote | 安装 Claude Slack 应用。打开浏览器完成 OAuth 流程 |
| 56 | `/mobile` | Remote | 显示二维码以下载 Claude 移动应用。别名：`/ios`、`/android` |
| 57 | `/remote-control` | Remote | 使此会话可从 claude.ai 远程控制。别名：`/rc` |
| 58 | `/remote-env` | Remote | 配置通过 `--remote` 启动的网页会话的默认远程环境 |
| 59 | `/schedule [description]` | Remote | 创建、更新、列出或运行云端定时任务。Claude 以对话方式引导你完成设置 |
| 60 | `/teleport` | Remote | 将 Claude Code 网页会话拉入此终端：打开选择器，然后获取分支和对话。也可使用 `/tp`。需要 claude.ai 订阅 |
| 61 | `/web-setup` | Remote | 使用本地 `gh` CLI 凭据将你的 GitHub 账户连接到 Claude Code 网页版。如果未连接 GitHub，`/schedule` 会自动提示此操作 |
| 62 | `/branch [name]` | Session | 在当前位置创建对话分支。别名：`/fork` |
| 63 | `/btw <question>` | Session | 快速提问而不添加到对话中 |
| 64 | `/clear` | Session | 清除对话历史并释放上下文。别名：`/reset`、`/new` |
| 65 | `/compact [instructions]` | Session | 压缩对话，可带可选的聚焦指令 |
| 66 | `/exit` | Session | 退出 CLI。别名：`/quit` |
| 67 | `/rename [name]` | Session | 重命名当前会话并在提示栏显示名称。不带名称时从对话历史自动生成 |
| 68 | `/resume [session]` | Session | 通过 ID 或名称恢复对话，或打开会话选择器。别名：`/continue` |
| 69 | `/rewind` | Session | 将对话和/或代码回退到之前的某个节点，或从选定消息开始总结。参阅检查点功能。别名：`/checkpoint` |

捆绑技能（如 `/debug`）也可能出现在斜杠命令菜单中，但它们不是内置命令。

---

## 参考来源

- [Claude Code 斜杠命令](https://code.claude.com/docs/en/slash-commands)
- [Claude Code 交互模式](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code 更新日志](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
