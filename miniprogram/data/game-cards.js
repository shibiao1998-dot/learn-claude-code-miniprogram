module.exports = {
  "cards": [
    {
      "id": "card_s01_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解く問題"
      },
      "desc": {
        "zh": "把“模型 + 工具”连接成一个能持续推进任务的主循环。",
        "en": "Imagine you have a brilliant assistant who can reason abo...",
        "ja": "model と tool を閉ループに接続し、仕事を継続的に前へ進める最小 agent を作ること"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "loop",
        "tool",
        "task"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s01_002",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Problem",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Without a loop, every tool call requires a human in the m...",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s01_003",
      "name": {
        "zh": "什么是 loop",
        "en": "The Solution",
        "ja": "loop とは何か"
      },
      "desc": {
        "zh": "`loop` 就是循环。",
        "en": "Here's the entire system in one picture:",
        "ja": "ここでの `loop` は「無意味な無限ループ」ではありません。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "loop"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s01_004",
      "name": {
        "zh": "什么是 turn",
        "en": "How It Works",
        "ja": "turn とは何か"
      },
      "desc": {
        "zh": "`turn` 可以理解成“一轮”。",
        "en": "Step 1.",
        "ja": "`turn` は 1 ラウンドです。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s01_005",
      "name": {
        "zh": "什么是 tool_result",
        "en": "What Changed",
        "ja": "tool_result とは何か"
      },
      "desc": {
        "zh": "`tool_result` 就是工具执行结果。",
        "en": "What Changed",
        "ja": "`tool_result` は terminal 上の一時ログではありません。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "tool"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s01_006",
      "name": {
        "zh": "什么是 state",
        "en": "Try It",
        "ja": "state とは何か"
      },
      "desc": {
        "zh": "`state` 是“当前运行状态”。",
        "en": "cd learn-claude-code",
        "ja": "`state` は、その loop が前へ進むために持ち続ける情報です。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s01_007",
      "name": {
        "zh": "最小心智模型",
        "en": "What You've Mastered",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "工具结果必须重新进入消息历史，成为下一轮推理的输入。",
        "en": "At this point, you can:",
        "ja": "tool の結果は message history に戻され、次の推論入力になる"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "tool"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s01_008",
      "name": {
        "zh": "关键数据结构",
        "en": "What's Next",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "Right now, the agent can only run bash commands. That mea...",
        "ja": "この章の核になるデータ構造"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s01_009",
      "name": {
        "zh": "1. Message",
        "en": "Key Takeaway",
        "ja": "1. Message"
      },
      "desc": {
        "zh": "消息历史不是聊天记录展示层，而是模型下一轮要读的工作上下文。",
        "en": "Key Takeaway",
        "ja": "message history は UI 表示用の chat transcript ではなく、次 turn の作業 context"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "context"
      ],
      "power": 52,
      "defense": 42
    },
    {
      "id": "card_s01_010",
      "name": {
        "zh": "2. Tool Result Block",
        "en": "2. Tool Result Block",
        "ja": "2. Tool Result Block"
      },
      "desc": {
        "zh": "当工具执行完后，你要把它包装回消息流：",
        "en": "当工具执行完后，你要把它包装回消息流：",
        "ja": "tool 実行後は、その出力を対応する block として messages へ戻します。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "tool"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s01_011",
      "name": {
        "zh": "3. LoopState",
        "en": "3. LoopState",
        "ja": "3. LoopState"
      },
      "desc": {
        "zh": "这章建议你不要只用一堆零散局部变量。",
        "en": "这章建议你不要只用一堆零散局部变量。",
        "ja": "この章では散らばった local variable だけで済ませるより、"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "loop"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s01_012",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s01_013",
      "name": {
        "zh": "第一步：准备初始消息",
        "en": "第一步：准备初始消息",
        "ja": "第 1 段階: 初期 message を作る"
      },
      "desc": {
        "zh": "用户的请求先进入 `messages`：",
        "en": "用户的请求先进入 `messages`：",
        "ja": "まず user request を history に入れます。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s01_014",
      "name": {
        "zh": "第二步：调用模型",
        "en": "第二步：调用模型",
        "ja": "第 2 段階: model を呼ぶ"
      },
      "desc": {
        "zh": "把消息历史、system prompt 和工具定义一起发给模型：",
        "en": "把消息历史、system prompt 和工具定义一起发给模型：",
        "ja": "messages、system prompt、tools をまとめて model に送ります。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s01_015",
      "name": {
        "zh": "第三步：追加 assistant 回复",
        "en": "第三步：追加 assistant 回复",
        "ja": "第 3 段階: assistant response 自体も history へ戻す"
      },
      "desc": {
        "zh": "messages.append({\"role\": \"assistant\", \"content\": response...",
        "en": "messages.append({\"role\": \"assistant\", \"content\": response...",
        "ja": "messages.append({"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s01_016",
      "name": {
        "zh": "第四步：如果模型调用了工具，就执行",
        "en": "第四步：如果模型调用了工具，就执行",
        "ja": "第 4 段階: tool_use があればจริง行する"
      },
      "desc": {
        "zh": "results = []",
        "en": "results = []",
        "ja": "results = []"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "tool"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s01_017",
      "name": {
        "zh": "第五步：把工具结果作为新消息写回去",
        "en": "第五步：把工具结果作为新消息写回去",
        "ja": "第 5 段階: tool_result を user-side message として write-back する"
      },
      "desc": {
        "zh": "messages.append({\"role\": \"user\", \"content\": results})",
        "en": "messages.append({\"role\": \"user\", \"content\": results})",
        "ja": "messages.append({"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "tool"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s01_018",
      "name": {
        "zh": "组合成一个完整循环",
        "en": "组合成一个完整循环",
        "ja": "全体を 1 つの loop にまとめる"
      },
      "desc": {
        "zh": "def agent_loop(state):",
        "en": "def agent_loop(state):",
        "ja": "model を呼び、tool を実行し、result を戻して、必要なら続く"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "loop"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s01_019",
      "name": {
        "zh": "它如何接进整个系统",
        "en": "它如何接进整个系统",
        "ja": "この章でわざと単純化していること"
      },
      "desc": {
        "zh": "往这个循环里增加新的状态、新的分支判断和新的执行能力。",
        "en": "往这个循环里增加新的状态、新的分支判断和新的执行能力。",
        "ja": "agent の最小閉ループ"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "loop"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s01_020",
      "name": {
        "zh": "为什么教学版先接受 `stop_reason == \"tool_use\"` 这个简化",
        "en": "为什么教学版先接受 `stop_reason == \"tool_use\"` 这个简化",
        "ja": "高完成度 system ではどう広がるか"
      },
      "desc": {
        "zh": "if response.stop_reason != \"tool_use\":",
        "en": "if response.stop_reason != \"tool_use\":",
        "ja": "agent は最後まで「結果を model に戻し続ける loop」であり、周囲に state 管理と continuation の理由が増えていく"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "tool"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s01_021",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "この章を読み終えたら何が言えるべきか"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "1. model だけでは agent にならず、tool result を戻す loop が必要"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s01_022",
      "name": {
        "zh": "1. 把工具结果打印出来，但不写回 `messages`",
        "en": "1. 把工具结果打印出来，但不写回 `messages`",
        "ja": "一文で覚える"
      },
      "desc": {
        "zh": "这样模型下一轮根本看不到真实执行结果。",
        "en": "这样模型下一轮根本看不到真实执行结果。",
        "ja": "agent loop とは、model の要求を現実の観察へ変え、その観察をまた model に返し続ける主循環です。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "tool"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s01_023",
      "name": {
        "zh": "2. 只保存用户消息，不保存 assistant 消息",
        "en": "2. 只保存用户消息，不保存 assistant 消息",
        "ja": "2. 只保存用户消息，不保存 assistant 消息"
      },
      "desc": {
        "zh": "这样上下文会断层，模型会越来越不像“接着刚才做”。",
        "en": "这样上下文会断层，模型会越来越不像“接着刚才做”。",
        "ja": "这样上下文会断层，模型会越来越不像“接着刚才做”。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s01_024",
      "name": {
        "zh": "3. 不给工具结果绑定 `tool_use_id`",
        "en": "3. 不给工具结果绑定 `tool_use_id`",
        "ja": "3. 不给工具结果绑定 `tool_use_id`"
      },
      "desc": {
        "zh": "模型会分不清哪条结果对应哪次调用。",
        "en": "模型会分不清哪条结果对应哪次调用。",
        "ja": "模型会分不清哪条结果对应哪次调用。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "tool"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s01_025",
      "name": {
        "zh": "4. 一上来就把流式、并发、恢复、压缩全塞进第一章",
        "en": "4. 一上来就把流式、并发、恢复、压缩全塞进第一章",
        "ja": "4. 一上来就把流式、并发、恢复、压缩全塞进第一章"
      },
      "desc": {
        "zh": "这会让主线变得非常难学。",
        "en": "这会让主线变得非常难学。",
        "ja": "这会让主线变得非常难学。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "stream",
        "error"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s01_026",
      "name": {
        "zh": "5. 以为 `messages` 只是聊天展示",
        "en": "5. 以为 `messages` 只是聊天展示",
        "ja": "5. 以为 `messages` 只是聊天展示"
      },
      "desc": {
        "zh": "在 agent 里，`messages` 更像“下一轮工作输入”。",
        "en": "在 agent 里，`messages` 更像“下一轮工作输入”。",
        "ja": "在 agent 里，`messages` 更像“下一轮工作输入”。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s01",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s02_001",
      "name": {
        "zh": "问题",
        "en": "What You'll Learn",
        "ja": "問題"
      },
      "desc": {
        "zh": "只有 `bash` 时, 所有操作都走 shell。`cat` 截断不可预测, `sed` 遇到特殊字符就崩, 每...",
        "en": "If you ran the s01 agent for more than a few minutes, you...",
        "ja": "`bash`だけでは、エージェントは何でもシェル経由で行う。`cat`は予測不能に切り詰め、`sed`は特殊文字で..."
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s02",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s02_002",
      "name": {
        "zh": "解决方案",
        "en": "The Problem",
        "ja": "解決策"
      },
      "desc": {
        "zh": "+--------+      +-------+      +------------------+",
        "en": "With only `bash`, the agent shells out for everything. Th...",
        "ja": "+--------+      +-------+      +------------------+"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s02",
      "tags": [
        "concept"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s02_003",
      "name": {
        "zh": "工作原理",
        "en": "The Solution",
        "ja": "仕組み"
      },
      "desc": {
        "zh": "kw: run_bash(kw[\"command\"]),\n    \"read_file\":  lambda",
        "en": "The answer is a dispatch map -- one dictionary that route...",
        "ja": "kw: run_bash(kw[\"command\"]),\n    \"read_file\":  lambda"
      },
      "rarity": "SSR",
      "region": "core",
      "chapter": "s02",
      "tags": [
        "concept"
      ],
      "power": 96,
      "defense": 86
    },
    {
      "id": "card_s02_004",
      "name": {
        "zh": "消息规范化",
        "en": "How It Works",
        "ja": "s01からの変更点"
      },
      "desc": {
        "zh": "教学版的 `messages` 列表直接发给 API, 所见即所发。但当系统变复杂后 (工具超时、用户取消、压缩替...",
        "en": "Step 1.",
        "ja": "s01からの変更点"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s02",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s02_005",
      "name": {
        "zh": "为什么需要",
        "en": "What Changed From s01",
        "ja": "試してみる"
      },
      "desc": {
        "zh": "严格交替",
        "en": "What Changed From s01",
        "ja": "cd learn-claude-code"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s02",
      "tags": [
        "concept"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s02_006",
      "name": {
        "zh": "实现",
        "en": "Try It",
        "ja": "教学上の簡略化"
      },
      "desc": {
        "zh": "关键洞察",
        "en": "cd learn-claude-code",
        "ja": "新しい tool を足しても主ループ自体は作り替えなくてよい"
      },
      "rarity": "SSR",
      "region": "core",
      "chapter": "s02",
      "tags": [
        "concept"
      ],
      "power": 94,
      "defense": 84
    },
    {
      "id": "card_s03_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解く問題"
      },
      "desc": {
        "zh": "显式、稳定、可反复更新",
        "en": "Have you ever asked an AI to do a complex task and watche...",
        "ja": "現在の plan を explicit に置いておく stable state がないこと"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "agent"
      ],
      "power": 71,
      "defense": 61
    },
    {
      "id": "card_s03_002",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Problem",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "On multi-step tasks, the model drifts. It repeats work, s...",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 54,
      "defense": 44
    },
    {
      "id": "card_s03_003",
      "name": {
        "zh": "什么是会话内规划",
        "en": "The Solution",
        "ja": "session 内 planning とは何か"
      },
      "desc": {
        "zh": "这里说的规划，不是长期项目管理，也不是磁盘上的任务系统。",
        "en": "Give the model a `todo` tool that maintains a structured ...",
        "ja": "ここで扱う planning は long-term project management ではありません。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "plan"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s03_004",
      "name": {
        "zh": "什么是 todo",
        "en": "How It Works",
        "ja": "todo とは何か"
      },
      "desc": {
        "zh": "`todo` 在这一章里只是一个载体。",
        "en": "Step 1.",
        "ja": "`todo` は特定 product の固有名詞として覚える必要はありません。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s03_005",
      "name": {
        "zh": "什么是 active step",
        "en": "What Changed From s02",
        "ja": "active step とは何か"
      },
      "desc": {
        "zh": "`active step` 可以理解成“当前正在做的那一步”。",
        "en": "What Changed From s02",
        "ja": "同時にあれもこれも進めて plan をぼかさないこと"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 50,
      "defense": 40
    },
    {
      "id": "card_s03_006",
      "name": {
        "zh": "什么是提醒",
        "en": "Try It",
        "ja": "reminder とは何か"
      },
      "desc": {
        "zh": "提醒不是替模型规划，而是当它连续几轮都忘记更新计划时，轻轻拉它回来。",
        "en": "cd learn-claude-code",
        "ja": "reminder は model の代わりに plan を作るものではありません。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 57,
      "defense": 47
    },
    {
      "id": "card_s03_007",
      "name": {
        "zh": "先立清边界：这章不是任务系统",
        "en": "What You've Mastered",
        "ja": "最初に強調したい境界"
      },
      "desc": {
        "zh": "这是这一章最重要的边界。",
        "en": "At this point, you can:",
        "ja": "この章は task system ではありません。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "task"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s03_008",
      "name": {
        "zh": "最小心智模型",
        "en": "What's Next",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "把这一章先想成一个很简单的结构：",
        "en": "Your agent can now plan its work and stay on track. But e...",
        "ja": "この章を最も簡単に捉えるなら、plan はこういう panel です。"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 72,
      "defense": 62
    },
    {
      "id": "card_s03_009",
      "name": {
        "zh": "关键数据结构",
        "en": "Key Takeaway",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "Key Takeaway",
        "ja": "この章の核になるデータ構造"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s03_010",
      "name": {
        "zh": "1. PlanItem",
        "en": "1. PlanItem",
        "ja": "1. PlanItem"
      },
      "desc": {
        "zh": "\"content\": \"Read the failing test\",",
        "en": "\"content\": \"Read the failing test\",",
        "ja": "最小の item は次のように考えられます。"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "plan"
      ],
      "power": 79,
      "defense": 69
    },
    {
      "id": "card_s03_011",
      "name": {
        "zh": "2. PlanningState",
        "en": "2. PlanningState",
        "ja": "2. PlanningState"
      },
      "desc": {
        "zh": "除了计划条目本身，还应该有一点最小运行状态：",
        "en": "除了计划条目本身，还应该有一点最小运行状态：",
        "ja": "item だけでは足りません。"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "plan"
      ],
      "power": 71,
      "defense": 61
    },
    {
      "id": "card_s03_012",
      "name": {
        "zh": "3. 状态约束",
        "en": "3. 状态约束",
        "ja": "3. 状態制約"
      },
      "desc": {
        "zh": "强制模型聚焦当前一步。",
        "en": "强制模型聚焦当前一步。",
        "ja": "current focus を system 側から明示できる"
      },
      "rarity": "SSR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 99,
      "defense": 89
    },
    {
      "id": "card_s03_013",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s03_014",
      "name": {
        "zh": "第一步：准备一个计划管理器",
        "en": "第一步：准备一个计划管理器",
        "ja": "第 1 段階: plan manager を用意する"
      },
      "desc": {
        "zh": "class TodoManager:",
        "en": "class TodoManager:",
        "ja": "class TodoManager:"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 80,
      "defense": 70
    },
    {
      "id": "card_s03_015",
      "name": {
        "zh": "第二步：允许模型整体更新当前计划",
        "en": "第二步：允许模型整体更新当前计划",
        "ja": "第 2 段階: plan 全体を更新できるようにする"
      },
      "desc": {
        "zh": "def update(self, items: list) -> str:",
        "en": "def update(self, items: list) -> str:",
        "ja": "現在の plan を丸ごと更新する"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 76,
      "defense": 66
    },
    {
      "id": "card_s03_016",
      "name": {
        "zh": "第三步：把计划渲染成可读文本",
        "en": "第三步：把计划渲染成可读文本",
        "ja": "第 3 段階: render して可読にする"
      },
      "desc": {
        "zh": "def render(self) -> str:",
        "en": "def render(self) -> str:",
        "ja": "def render(self) -> str:"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 75,
      "defense": 65
    },
    {
      "id": "card_s03_017",
      "name": {
        "zh": "第四步：把 `todo` 接成一个工具",
        "en": "第四步：把 `todo` 接成一个工具",
        "ja": "第 4 段階: `todo` を 1 つの tool として loop へ接ぐ"
      },
      "desc": {
        "zh": "TOOL_HANDLERS = {",
        "en": "TOOL_HANDLERS = {",
        "ja": "kw: TODO.update(kw[\"items\"]),\n}\n```\n\nここで重要なのは、plan 更新を特別扱いの hidden logic にせず、"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "tool"
      ],
      "power": 84,
      "defense": 74
    },
    {
      "id": "card_s03_018",
      "name": {
        "zh": "第五步：如果连续几轮没更新计划，就提醒",
        "en": "第五步：如果连续几轮没更新计划，就提醒",
        "ja": "第 5 段階: 数 turn 更新がなければ reminder を挿入する"
      },
      "desc": {
        "zh": "if rounds_since_update >= 3:",
        "en": "if rounds_since_update >= 3:",
        "ja": "if rounds_since_update >= 3:"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 77,
      "defense": 67
    },
    {
      "id": "card_s03_019",
      "name": {
        "zh": "它如何接到主循环里",
        "en": "它如何接到主循环里",
        "ja": "main loop に何が増えるのか"
      },
      "desc": {
        "zh": "把“当前要做什么”从模型脑内，移到系统可观察的状态里。",
        "en": "把“当前要做什么”从模型脑内，移到系统可观察的状态里。",
        "ja": "「いま何をしているか」を外から見える panel として維持する"
      },
      "rarity": "SSR",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "loop"
      ],
      "power": 99,
      "defense": 89
    },
    {
      "id": "card_s03_020",
      "name": {
        "zh": "为什么这章故意不讲成任务图",
        "en": "为什么这章故意不讲成任务图",
        "ja": "なぜここで task graph まで教えないのか"
      },
      "desc": {
        "zh": "如果你已经开始关心这些问题，说明你快进入：",
        "en": "如果你已经开始关心这些问题，说明你快进入：",
        "ja": "session 内の軽い plan と、長く残る durable work graph は別物"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "task"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s03_021",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者が混ぜやすいポイント"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者が混ぜやすいポイント"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 57,
      "defense": 47
    },
    {
      "id": "card_s03_022",
      "name": {
        "zh": "1. 把计划写得过长",
        "en": "1. 把计划写得过长",
        "ja": "1. plan を model の頭の中だけに置く"
      },
      "desc": {
        "zh": "如果一上来列十几步，模型很快就会失去维护意愿。",
        "en": "如果一上来列十几步，模型很快就会失去维护意愿。",
        "ja": "これでは multi-step work がすぐ漂います。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s03_023",
      "name": {
        "zh": "2. 不区分“当前一步”和“未来几步”",
        "en": "2. 不区分“当前一步”和“未来几步”",
        "ja": "2. `in_progress` を複数許してしまう"
      },
      "desc": {
        "zh": "如果同时有很多个 `in_progress`，焦点就会散。",
        "en": "如果同时有很多个 `in_progress`，焦点就会散。",
        "ja": "current focus がぼやけ、plan が checklist ではなく wish list になります。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s03_024",
      "name": {
        "zh": "3. 把会话计划当成长期任务系统",
        "en": "3. 把会话计划当成长期任务系统",
        "ja": "3. plan を一度書いたら更新しない"
      },
      "desc": {
        "zh": "这会让 `s03` 和 `s12` 的边界完全混掉。",
        "en": "这会让 `s03` 和 `s12` 的边界完全混掉。",
        "ja": "それでは plan は living state ではなく dead note です。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "task"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s03_025",
      "name": {
        "zh": "4. 只在开始时写一次计划，后面从不更新",
        "en": "4. 只在开始时写一次计划，后面从不更新",
        "ja": "4. reminder を system の強制 planning と誤解する"
      },
      "desc": {
        "zh": "那这份计划就失去价值了。",
        "en": "那这份计划就失去价值了。",
        "ja": "reminder は軽いナッジであって、plan の中身を system が代行するものではありません。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s03_026",
      "name": {
        "zh": "5. 以为 reminder 是可有可无的小装饰",
        "en": "5. 以为 reminder 是可有可无的小装饰",
        "ja": "5. session plan と durable task graph を同一視する"
      },
      "desc": {
        "zh": "提醒机制说明了一件很重要的事：",
        "en": "提醒机制说明了一件很重要的事：",
        "ja": "この章で扱うのは current request を進めるための軽量 state です。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s03",
      "tags": [
        "concept"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s04_001",
      "name": {
        "zh": "这一章到底要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解く問題"
      },
      "desc": {
        "zh": "把局部任务放进独立上下文里做，做完只把必要结果带回来。",
        "en": "Imagine you ask your agent \"What testing framework does t...",
        "ja": "局所 task を別 context に閉じ込め、親には必要な summary だけを持ち帰る"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "context",
        "task"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s04_002",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Problem",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "As the agent works, its `messages` array grows. Every fil...",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s04_003",
      "name": {
        "zh": "什么是“父智能体”",
        "en": "The Solution",
        "ja": "親 agent とは何か"
      },
      "desc": {
        "zh": "当前正在和用户对话、持有主 `messages` 的 agent，就是父智能体。",
        "en": "The parent agent delegates side tasks to a child agent th...",
        "ja": "いま user と直接やり取りし、main `messages` を持っている actor が親 agent です。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s04_004",
      "name": {
        "zh": "什么是“子智能体”",
        "en": "How It Works",
        "ja": "子 agent とは何か"
      },
      "desc": {
        "zh": "父智能体临时派生出来，专门处理某个子任务的 agent，就是子智能体。",
        "en": "Step 1.",
        "ja": "親が一時的に派生させ、特定の subtask だけを処理させる actor が子 agent、つまり subage..."
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s04_005",
      "name": {
        "zh": "什么叫“上下文隔离”",
        "en": "What Changed From s03",
        "ja": "context isolation とは何か"
      },
      "desc": {
        "zh": "什么叫“上下文隔离”",
        "en": "What Changed From s03",
        "ja": "context isolation とは何か"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "context"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s04_006",
      "name": {
        "zh": "最小心智模型",
        "en": "Try It",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "子智能体的价值，不是“多一个模型实例”本身，而是“多一个干净上下文”。",
        "en": "cd learn-claude-code",
        "ja": "subagent の価値は別 model instance ではなく、別 state boundary にある"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent",
        "context"
      ],
      "power": 75,
      "defense": 65
    },
    {
      "id": "card_s04_007",
      "name": {
        "zh": "最小实现长什么样",
        "en": "What You've Mastered",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "最小实现长什么样",
        "en": "context boundary",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s04_008",
      "name": {
        "zh": "第一步：给父智能体一个 `task` 工具",
        "en": "What's Next",
        "ja": "第 1 段階: 親に `task` tool を持たせる"
      },
      "desc": {
        "zh": "父智能体需要一个工具，让模型可以主动说：",
        "en": "So far you've learned to keep context clean by isolating ...",
        "ja": "親 agent は model が明示的に言える入口を持つ必要があります。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent",
        "tool",
        "task"
      ],
      "power": 57,
      "defense": 47
    },
    {
      "id": "card_s04_009",
      "name": {
        "zh": "第二步：子智能体使用自己的消息列表",
        "en": "Key Takeaway",
        "ja": "第 2 段階: subagent は自分専用の `messages` で始める"
      },
      "desc": {
        "zh": "def run_subagent(prompt: str) -> str:",
        "en": "Key Takeaway",
        "ja": "subagent の本体はここです。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s04_010",
      "name": {
        "zh": "第三步：子智能体只拿必要工具",
        "en": "第三步：子智能体只拿必要工具",
        "ja": "第 3 段階: 子に渡す tool は絞る"
      },
      "desc": {
        "zh": "子智能体通常不需要拥有和父智能体完全一样的能力。",
        "en": "子智能体通常不需要拥有和父智能体完全一样的能力。",
        "ja": "subagent は親と完全に同じ tool set を持つ必要はありません。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent",
        "tool"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s04_011",
      "name": {
        "zh": "第四步：只把结果带回父智能体",
        "en": "第四步：只把结果带回父智能体",
        "ja": "第 4 段階: 子は最後に summary だけ返す"
      },
      "desc": {
        "zh": "子智能体做完事后，不把全部内部历史写回去，而是返回一段总结。",
        "en": "子智能体做完事后，不把全部内部历史写回去，而是返回一段总结。",
        "ja": "一番大事なのはここです。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s04_012",
      "name": {
        "zh": "这一章最关键的数据结构",
        "en": "这一章最关键的数据结构",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "如果你只记一个结构，就记这个：",
        "en": "如果你只记一个结构，就记这个：",
        "ja": "自分の state と tool boundary を持つ小さな agent"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s04_013",
      "name": {
        "zh": "为什么它真的有用",
        "en": "为什么它真的有用",
        "ja": "なぜ本当に useful なのか"
      },
      "desc": {
        "zh": "为什么它真的有用",
        "en": "为什么它真的有用",
        "ja": "なぜ本当に useful なのか"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s04_014",
      "name": {
        "zh": "用处 1：给父上下文减负",
        "en": "用处 1：给父上下文减负",
        "ja": "1. 親 context を軽く保てる"
      },
      "desc": {
        "zh": "局部任务的中间噪声不会全都留在主对话里。",
        "en": "局部任务的中间噪声不会全都留在主对话里。",
        "ja": "局所 task の途中経過が main conversation に積み上がりません。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "context"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s04_015",
      "name": {
        "zh": "用处 2：让任务描述更清楚",
        "en": "用处 2：让任务描述更清楚",
        "ja": "2. subtask の prompt を鋭くできる"
      },
      "desc": {
        "zh": "一个子智能体接到的 prompt 可以非常聚焦：",
        "en": "一个子智能体接到的 prompt 可以非常聚焦：",
        "ja": "子に渡す prompt は次のように非常に集中できます。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "task"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s04_016",
      "name": {
        "zh": "用处 3：让后面的多 agent 协作有基础",
        "en": "用处 3：让后面的多 agent 协作有基础",
        "ja": "3. 後の multi-agent chapter の準備になる"
      },
      "desc": {
        "zh": "你可以把子智能体理解成多 agent 系统的最小起点。",
        "en": "你可以把子智能体理解成多 agent 系统的最小起点。",
        "ja": "subagent は long-lived teammate より前に学ぶべき最小の delegation mod..."
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s04_017",
      "name": {
        "zh": "从 0 到 1 的实现顺序",
        "en": "从 0 到 1 的实现顺序",
        "ja": "0-to-1 の実装順序"
      },
      "desc": {
        "zh": "从 0 到 1 的实现顺序",
        "en": "从 0 到 1 的实现顺序",
        "ja": "0-to-1 の実装順序"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s04_018",
      "name": {
        "zh": "版本 1：空白上下文子智能体",
        "en": "版本 1：空白上下文子智能体",
        "ja": "Version 1: blank-context subagent"
      },
      "desc": {
        "zh": "版本 1：空白上下文子智能体",
        "en": "版本 1：空白上下文子智能体",
        "ja": "最初はこれで十分です。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent",
        "context"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s04_019",
      "name": {
        "zh": "版本 2：限制工具集",
        "en": "版本 2：限制工具集",
        "ja": "Version 2: tool set を制限する"
      },
      "desc": {
        "zh": "给子智能体一个更小、更安全的工具集。",
        "en": "给子智能体一个更小、更安全的工具集。",
        "ja": "親より小さく安全な tool set を渡します。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "tool"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s04_020",
      "name": {
        "zh": "版本 3：加入最大轮数和失败保护",
        "en": "版本 3：加入最大轮数和失败保护",
        "ja": "Version 3: safety bound を足す"
      },
      "desc": {
        "zh": "版本 3：加入最大轮数和失败保护",
        "en": "版本 3：加入最大轮数和失败保护",
        "ja": "Version 3: safety bound を足す"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s04_021",
      "name": {
        "zh": "版本 4：再考虑 fork",
        "en": "版本 4：再考虑 fork",
        "ja": "Version 4: fork を検討する"
      },
      "desc": {
        "zh": "只有当你已经稳定跑通前面三步，才考虑 fork。",
        "en": "只有当你已经稳定跑通前面三步，才考虑 fork。",
        "ja": "この順番を守ることが大事です。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s04_022",
      "name": {
        "zh": "什么是 fork，为什么它是“下一步”，不是“起步”",
        "en": "什么是 fork，为什么它是“下一步”，不是“起步”",
        "ja": "fork とは何か、なぜ「次の段階」なのか"
      },
      "desc": {
        "zh": "继承上下文，而不是重头开始。",
        "en": "继承上下文，而不是重头开始。",
        "ja": "空白から始めるのではなく、親の既存 context を引き継いで子を始めること"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "context"
      ],
      "power": 76,
      "defense": 66
    },
    {
      "id": "card_s04_023",
      "name": {
        "zh": "初学者最容易踩的坑",
        "en": "初学者最容易踩的坑",
        "ja": "初学者が混ぜやすいポイント"
      },
      "desc": {
        "zh": "初学者最容易踩的坑",
        "en": "初学者最容易踩的坑",
        "ja": "初学者が混ぜやすいポイント"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s04_024",
      "name": {
        "zh": "坑 1：把子智能体当成“为了炫技的并发”",
        "en": "坑 1：把子智能体当成“为了炫技的并发”",
        "ja": "1. subagent を「並列アピール機能」だと思う"
      },
      "desc": {
        "zh": "子智能体首先是为了解决上下文问题，不是为了展示“我有很多 agent”。",
        "en": "子智能体首先是为了解决上下文问题，不是为了展示“我有很多 agent”。",
        "ja": "subagent の第一目的は concurrency 自慢ではなく、context hygiene です。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s04_025",
      "name": {
        "zh": "坑 2：把父历史全部原样灌回去",
        "en": "坑 2：把父历史全部原样灌回去",
        "ja": "2. 子の history を全部親へ戻してしまう"
      },
      "desc": {
        "zh": "如果你最后又把子智能体全量历史粘回父对话，那隔离价值就几乎没了。",
        "en": "如果你最后又把子智能体全量历史粘回父对话，那隔离价值就几乎没了。",
        "ja": "それでは isolation の価値がほとんど消えます。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s04_026",
      "name": {
        "zh": "坑 3：一上来就做特别复杂的角色系统",
        "en": "坑 3：一上来就做特别复杂的角色系统",
        "ja": "3. 最初から役割を増やしすぎる"
      },
      "desc": {
        "zh": "这些都可以做，但不应该先做。",
        "en": "这些都可以做，但不应该先做。",
        "ja": "clean context の一回限り worker"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s04_027",
      "name": {
        "zh": "坑 4：忘记给子智能体设置停止条件",
        "en": "坑 4：忘记给子智能体设置停止条件",
        "ja": "4. 子に `task` を持たせて無限に spawn させる"
      },
      "desc": {
        "zh": "子智能体很容易无限转。",
        "en": "子智能体很容易无限转。",
        "ja": "境界がないと recursion で system が荒れます。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s04_028",
      "name": {
        "zh": "和后续章节的关系",
        "en": "和后续章节的关系",
        "ja": "5. `max_turns` のような safety bound を持たない"
      },
      "desc": {
        "zh": "它们不是重复关系，而是递进关系。",
        "en": "它们不是重复关系，而是递进关系。",
        "ja": "局所 task だからこそ、終わらない子を放置しない設計が必要です。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s04_029",
      "name": {
        "zh": "这一章学完后，你应该能回答",
        "en": "这一章学完后，你应该能回答",
        "ja": "この章を読み終えたら何が言えるべきか"
      },
      "desc": {
        "zh": "一句话记住：子智能体的核心，不是多一个角色，而是多一个干净上下文。",
        "en": "一句话记住：子智能体的核心，不是多一个角色，而是多一个干净上下文。",
        "ja": "1. subagent の価値は clean context を作ることにある"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s04",
      "tags": [
        "agent",
        "context"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s05_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "問題"
      },
      "desc": {
        "zh": "把“长期可选知识”从 system prompt 主体里拆出来，改成按需加载。",
        "en": "You don't memorize every recipe in every cookbook you own...",
        "ja": "エージェントにドメイン固有のワークフローを遵守させたい: gitの規約、テストパターン、コードレビューチェックリス..."
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "prompt"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s05_002",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Problem",
        "ja": "解決策"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "You want your agent to follow domain-specific workflows: ...",
        "ja": "System prompt (Layer 1 -- always present):"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s05_003",
      "name": {
        "zh": "什么是 skill",
        "en": "The Solution",
        "ja": "仕組み"
      },
      "desc": {
        "zh": "这里的 `skill` 可以先简单理解成：",
        "en": "Split knowledge into two layers. Layer 1 lives in the sys...",
        "ja": "1. 各スキルは `SKILL.md` ファイルを含むディレクトリとして配置される。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s05_004",
      "name": {
        "zh": "什么是 discovery",
        "en": "How It Works",
        "ja": "s04からの変更点"
      },
      "desc": {
        "zh": "`discovery` 指“发现有哪些 skill 可用”。",
        "en": "Step 1.",
        "ja": "s04からの変更点"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s05_005",
      "name": {
        "zh": "什么是 loading",
        "en": "What Changed From s04",
        "ja": "試してみる"
      },
      "desc": {
        "zh": "`loading` 指“把某个 skill 的完整正文真正读进来”。",
        "en": "What Changed From s04",
        "ja": "cd learn-claude-code"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 53,
      "defense": 43
    },
    {
      "id": "card_s05_006",
      "name": {
        "zh": "最小心智模型",
        "en": "Try It",
        "ja": "高完成度システムではどう広がるか"
      },
      "desc": {
        "zh": "把这一章先理解成两层：",
        "en": "cd learn-claude-code",
        "ja": "専門知識は最初から全部抱え込まず、必要な時だけ深く読み込む"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 83,
      "defense": 73
    },
    {
      "id": "card_s05_007",
      "name": {
        "zh": "关键数据结构",
        "en": "What You've Mastered",
        "ja": "关键数据结构"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "At this point, you can:",
        "ja": "关键数据结构"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s05_008",
      "name": {
        "zh": "1. SkillManifest",
        "en": "What's Next",
        "ja": "1. SkillManifest"
      },
      "desc": {
        "zh": "先准备一份很轻的元信息：",
        "en": "You now know how to keep knowledge out of context until i...",
        "ja": "先准备一份很轻的元信息："
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 70,
      "defense": 60
    },
    {
      "id": "card_s05_009",
      "name": {
        "zh": "2. SkillDocument",
        "en": "Key Takeaway",
        "ja": "2. SkillDocument"
      },
      "desc": {
        "zh": "真正被加载时，再读取完整内容：",
        "en": "Key Takeaway",
        "ja": "真正被加载时，再读取完整内容："
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 84,
      "defense": 74
    },
    {
      "id": "card_s05_010",
      "name": {
        "zh": "3. SkillRegistry",
        "en": "3. SkillRegistry",
        "ja": "3. SkillRegistry"
      },
      "desc": {
        "zh": "你最好不要把 skill 散着读取。",
        "en": "你最好不要把 skill 散着读取。",
        "ja": "你最好不要把 skill 散着读取。"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 81,
      "defense": 71
    },
    {
      "id": "card_s05_011",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小实现"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小实现"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 50,
      "defense": 40
    },
    {
      "id": "card_s05_012",
      "name": {
        "zh": "第一步：把每个 skill 放成一个目录",
        "en": "第一步：把每个 skill 放成一个目录",
        "ja": "第一步：把每个 skill 放成一个目录"
      },
      "desc": {
        "zh": "code-review/",
        "en": "code-review/",
        "ja": "code-review/"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 73,
      "defense": 63
    },
    {
      "id": "card_s05_013",
      "name": {
        "zh": "第二步：从 `SKILL.md` 里读取最小元信息",
        "en": "第二步：从 `SKILL.md` 里读取最小元信息",
        "ja": "第二步：从 `SKILL.md` 里读取最小元信息"
      },
      "desc": {
        "zh": "class SkillRegistry:",
        "en": "class SkillRegistry:",
        "ja": "class SkillRegistry:"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 84,
      "defense": 74
    },
    {
      "id": "card_s05_014",
      "name": {
        "zh": "第三步：把 skill 目录放进 system prompt",
        "en": "第三步：把 skill 目录放进 system prompt",
        "ja": "第三步：把 skill 目录放进 system prompt"
      },
      "desc": {
        "zh": "目录信息",
        "en": "目录信息",
        "ja": "目录信息"
      },
      "rarity": "SSR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "prompt"
      ],
      "power": 90,
      "defense": 80
    },
    {
      "id": "card_s05_015",
      "name": {
        "zh": "第四步：提供一个 `load_skill` 工具",
        "en": "第四步：提供一个 `load_skill` 工具",
        "ja": "第四步：提供一个 `load_skill` 工具"
      },
      "desc": {
        "zh": "TOOL_HANDLERS = {",
        "en": "TOOL_HANDLERS = {",
        "ja": "TOOL_HANDLERS = {"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "tool"
      ],
      "power": 75,
      "defense": 65
    },
    {
      "id": "card_s05_016",
      "name": {
        "zh": "第五步：让 skill 正文只在当前需要时进入上下文",
        "en": "第五步：让 skill 正文只在当前需要时进入上下文",
        "ja": "第五步：让 skill 正文只在当前需要时进入上下文"
      },
      "desc": {
        "zh": "这一步的核心思想就是：",
        "en": "这一步的核心思想就是：",
        "ja": "这一步的核心思想就是："
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "context"
      ],
      "power": 52,
      "defense": 42
    },
    {
      "id": "card_s05_017",
      "name": {
        "zh": "skill、memory、CLAUDE.md 的边界",
        "en": "skill、memory、CLAUDE.md 的边界",
        "ja": "skill、memory、CLAUDE.md 的边界"
      },
      "desc": {
        "zh": "skill、memory、CLAUDE.md 的边界",
        "en": "skill、memory、CLAUDE.md 的边界",
        "ja": "skill、memory、CLAUDE.md 的边界"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "memory"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s05_018",
      "name": {
        "zh": "skill",
        "en": "skill",
        "ja": "skill"
      },
      "desc": {
        "zh": "只有在某类任务需要时才加载。",
        "en": "只有在某类任务需要时才加载。",
        "ja": "只有在某类任务需要时才加载。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s05_019",
      "name": {
        "zh": "memory",
        "en": "memory",
        "ja": "memory"
      },
      "desc": {
        "zh": "跨会话仍然有价值的信息。",
        "en": "跨会话仍然有价值的信息。",
        "ja": "跨会话仍然有价值的信息。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "memory"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s05_020",
      "name": {
        "zh": "CLAUDE.md",
        "en": "CLAUDE.md",
        "ja": "CLAUDE.md"
      },
      "desc": {
        "zh": "更稳定、更长期的规则说明。",
        "en": "更稳定、更长期的规则说明。",
        "ja": "更稳定、更长期的规则说明。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s05_021",
      "name": {
        "zh": "它如何接到主循环里",
        "en": "它如何接到主循环里",
        "ja": "它如何接到主循环里"
      },
      "desc": {
        "zh": "这一章以后，system prompt 不再只是一段固定身份说明。",
        "en": "这一章以后，system prompt 不再只是一段固定身份说明。",
        "ja": "这一章以后，system prompt 不再只是一段固定身份说明。"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "loop"
      ],
      "power": 79,
      "defense": 69
    },
    {
      "id": "card_s05_022",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 53,
      "defense": 43
    },
    {
      "id": "card_s05_023",
      "name": {
        "zh": "1. 把所有 skill 正文永远塞进 system prompt",
        "en": "1. 把所有 skill 正文永远塞进 system prompt",
        "ja": "1. 把所有 skill 正文永远塞进 system prompt"
      },
      "desc": {
        "zh": "这样会让 prompt 很快臃肿到难以维护。",
        "en": "这样会让 prompt 很快臃肿到难以维护。",
        "ja": "这样会让 prompt 很快臃肿到难以维护。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "prompt"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s05_024",
      "name": {
        "zh": "2. skill 目录信息写得太弱",
        "en": "2. skill 目录信息写得太弱",
        "ja": "2. skill 目录信息写得太弱"
      },
      "desc": {
        "zh": "如果只有名字，没有描述，模型就不知道什么时候该加载它。",
        "en": "如果只有名字，没有描述，模型就不知道什么时候该加载它。",
        "ja": "如果只有名字，没有描述，模型就不知道什么时候该加载它。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 57,
      "defense": 47
    },
    {
      "id": "card_s05_025",
      "name": {
        "zh": "3. 把 skill 当成“绝对规则”",
        "en": "3. 把 skill 当成“绝对规则”",
        "ja": "3. 把 skill 当成“绝对规则”"
      },
      "desc": {
        "zh": "skill 更像“可选工作手册”，不是所有轮次都必须用。",
        "en": "skill 更像“可选工作手册”，不是所有轮次都必须用。",
        "ja": "skill 更像“可选工作手册”，不是所有轮次都必须用。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 52,
      "defense": 42
    },
    {
      "id": "card_s05_026",
      "name": {
        "zh": "4. 把 skill 和 memory 混成一类",
        "en": "4. 把 skill 和 memory 混成一类",
        "ja": "4. 把 skill 和 memory 混成一类"
      },
      "desc": {
        "zh": "skill 解决的是“怎么做一类事”，memory 解决的是“记住长期事实”。",
        "en": "skill 解决的是“怎么做一类事”，memory 解决的是“记住长期事实”。",
        "ja": "skill 解决的是“怎么做一类事”，memory 解决的是“记住长期事实”。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "memory"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s05_027",
      "name": {
        "zh": "5. 一上来就讲太多多源加载细节",
        "en": "5. 一上来就讲太多多源加载细节",
        "ja": "5. 一上来就讲太多多源加载细节"
      },
      "desc": {
        "zh": "轻量发现，重内容按需加载。",
        "en": "轻量发现，重内容按需加载。",
        "ja": "轻量发现，重内容按需加载。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s05",
      "tags": [
        "concept"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s06_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "問題"
      },
      "desc": {
        "zh": "怎样在不丢掉主线连续性的前提下，把活跃上下文重新腾出空间。",
        "en": "Your agent from s05 is capable. It reads files, runs comm...",
        "ja": "コンテキストウィンドウは有限だ。1000行のファイルに対する`read_file`1回で約4000トークンを消費す..."
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "context"
      ],
      "power": 50,
      "defense": 40
    },
    {
      "id": "card_s06_002",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Problem",
        "ja": "解決策"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Every API call to the model includes the entire conversat...",
        "ja": "ツール出力時から手動トリガーまで、4つの圧縮レバー:"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s06_003",
      "name": {
        "zh": "什么是上下文窗口",
        "en": "The Solution",
        "ja": "仕組み"
      },
      "desc": {
        "zh": "你可以把上下文窗口理解成：",
        "en": "We use four levers, each working at a different stage of ...",
        "ja": "レバー 0 -- persisted-output"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "context"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s06_004",
      "name": {
        "zh": "什么是活跃上下文",
        "en": "How It Works",
        "ja": "s05からの変更点"
      },
      "desc": {
        "zh": "并不是历史上出现过的所有内容，都必须一直留在窗口里。",
        "en": "How It Works",
        "ja": "s05からの変更点"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "context"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s06_005",
      "name": {
        "zh": "什么是压缩",
        "en": "Step 1: Lever 0 -- Persisted Output",
        "ja": "試してみる"
      },
      "desc": {
        "zh": "这里的压缩，不是 ZIP 压缩文件。",
        "en": "The first line of defense runs at tool execution time, be...",
        "ja": "cd learn-claude-code"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s06_006",
      "name": {
        "zh": "最小心智模型",
        "en": "Step 2: Lever 1 -- Micro-Compact",
        "ja": "高完成度システムではどう広がるか"
      },
      "desc": {
        "zh": "这一章建议你先记三层，不要一上来记八层十层：",
        "en": "Before each LLM call, we scan for old tool results and re...",
        "ja": "compact は「履歴を捨てること」ではなく、「細部をアクティブ文脈の外へ移し、連続性を保つこと」"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s06_007",
      "name": {
        "zh": "关键数据结构",
        "en": "Step 3: Lever 2 -- Auto-Compact",
        "ja": "关键数据结构"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "When micro-compaction is not enough and the token count c...",
        "ja": "关键数据结构"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s06_008",
      "name": {
        "zh": "1. Persisted Output Marker",
        "en": "Step 4: Lever 3 -- Manual Compact",
        "ja": "1. Persisted Output Marker"
      },
      "desc": {
        "zh": "当工具输出太大时，不要把全文强塞进当前对话。",
        "en": "The `compact` tool lets the model itself trigger summariz...",
        "ja": "当工具输出太大时，不要把全文强塞进当前对话。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s06_009",
      "name": {
        "zh": "2. CompactState",
        "en": "Step 5: Integration in the Agent Loop",
        "ja": "2. CompactState"
      },
      "desc": {
        "zh": "最小教学版建议你显式维护一份压缩状态：",
        "en": "All four levers compose naturally inside the main loop:",
        "ja": "最小教学版建议你显式维护一份压缩状态："
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 54,
      "defense": 44
    },
    {
      "id": "card_s06_010",
      "name": {
        "zh": "3. Micro-Compact Boundary",
        "en": "What Changed From s05",
        "ja": "3. Micro-Compact Boundary"
      },
      "desc": {
        "zh": "不是所有历史都要原封不动地一直带着跑。",
        "en": "What Changed From s05",
        "ja": "不是所有历史都要原封不动地一直带着跑。"
      },
      "rarity": "SR",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 75,
      "defense": 65
    },
    {
      "id": "card_s06_011",
      "name": {
        "zh": "最小实现",
        "en": "Try It",
        "ja": "最小实现"
      },
      "desc": {
        "zh": "最小实现",
        "en": "cd learn-claude-code",
        "ja": "最小实现"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s06_012",
      "name": {
        "zh": "第一步：大工具结果先写磁盘",
        "en": "What You've Mastered",
        "ja": "第一步：大工具结果先写磁盘"
      },
      "desc": {
        "zh": "def persist_large_output(tool_use_id: str, output: str) -...",
        "en": "At this point, you can:",
        "ja": "def persist_large_output(tool_use_id: str, output: str) -..."
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "tool"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s06_013",
      "name": {
        "zh": "第二步：旧工具结果做微压缩",
        "en": "Stage 1 Complete",
        "ja": "第二步：旧工具结果做微压缩"
      },
      "desc": {
        "zh": "def micro_compact(messages: list) -> list:",
        "en": "You now have a complete single-agent system. Starting fro...",
        "ja": "def micro_compact(messages: list) -> list:"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "tool"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s06_014",
      "name": {
        "zh": "第三步：整体历史过长时，做一次完整压缩",
        "en": "Key Takeaway",
        "ja": "第三步：整体历史过长时，做一次完整压缩"
      },
      "desc": {
        "zh": "def compact_history(messages: list) -> list:",
        "en": "Key Takeaway",
        "ja": "def compact_history(messages: list) -> list:"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_s06_015",
      "name": {
        "zh": "第四步：在主循环里接入压缩",
        "en": "第四步：在主循环里接入压缩",
        "ja": "第四步：在主循环里接入压缩"
      },
      "desc": {
        "zh": "def agent_loop(state):",
        "en": "def agent_loop(state):",
        "ja": "def agent_loop(state):"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "loop"
      ],
      "power": 50,
      "defense": 40
    },
    {
      "id": "card_s06_016",
      "name": {
        "zh": "第五步：手动压缩和自动压缩复用同一条机制",
        "en": "第五步：手动压缩和自动压缩复用同一条机制",
        "ja": "第五步：手动压缩和自动压缩复用同一条机制"
      },
      "desc": {
        "zh": "教学版里，`compact` 工具不需要重新发明另一套逻辑。",
        "en": "教学版里，`compact` 工具不需要重新发明另一套逻辑。",
        "ja": "教学版里，`compact` 工具不需要重新发明另一套逻辑。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s06_017",
      "name": {
        "zh": "压缩后，真正要保住什么",
        "en": "压缩后，真正要保住什么",
        "ja": "压缩后，真正要保住什么"
      },
      "desc": {
        "zh": "让模型还能继续接着干活。",
        "en": "让模型还能继续接着干活。",
        "ja": "让模型还能继续接着干活。"
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 54,
      "defense": 44
    },
    {
      "id": "card_s06_018",
      "name": {
        "zh": "它如何接到主循环里",
        "en": "它如何接到主循环里",
        "ja": "它如何接到主循环里"
      },
      "desc": {
        "zh": "从这一章开始，主循环不再只是：",
        "en": "从这一章开始，主循环不再只是：",
        "ja": "从这一章开始，主循环不再只是："
      },
      "rarity": "R",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "loop"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s06_019",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s06_020",
      "name": {
        "zh": "1. 以为压缩等于删除",
        "en": "1. 以为压缩等于删除",
        "ja": "1. 以为压缩等于删除"
      },
      "desc": {
        "zh": "更准确地说，是把“不必常驻活跃上下文”的内容换一种表示。",
        "en": "更准确地说，是把“不必常驻活跃上下文”的内容换一种表示。",
        "ja": "更准确地说，是把“不必常驻活跃上下文”的内容换一种表示。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s06_021",
      "name": {
        "zh": "2. 只在撞到上限后才临时乱补",
        "en": "2. 只在撞到上限后才临时乱补",
        "ja": "2. 只在撞到上限后才临时乱补"
      },
      "desc": {
        "zh": "更好的做法是从一开始就有三层思路：",
        "en": "更好的做法是从一开始就有三层思路：",
        "ja": "更好的做法是从一开始就有三层思路："
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s06_022",
      "name": {
        "zh": "3. 摘要只写成一句空话",
        "en": "3. 摘要只写成一句空话",
        "ja": "3. 摘要只写成一句空话"
      },
      "desc": {
        "zh": "如果摘要没有保住文件、决定、下一步，它对继续工作没有帮助。",
        "en": "如果摘要没有保住文件、决定、下一步，它对继续工作没有帮助。",
        "ja": "如果摘要没有保住文件、决定、下一步，它对继续工作没有帮助。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s06_023",
      "name": {
        "zh": "4. 把压缩和 memory 混成一类",
        "en": "4. 把压缩和 memory 混成一类",
        "ja": "4. 把压缩和 memory 混成一类"
      },
      "desc": {
        "zh": "memory 解决的是：",
        "en": "memory 解决的是：",
        "ja": "memory 解决的是："
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "memory"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s06_024",
      "name": {
        "zh": "5. 一上来就给初学者讲过多产品化层级",
        "en": "5. 一上来就给初学者讲过多产品化层级",
        "ja": "5. 一上来就给初学者讲过多产品化层级"
      },
      "desc": {
        "zh": "教学主线先讲清最小正确模型，比堆很多层名词更重要。",
        "en": "教学主线先讲清最小正确模型，比堆很多层名词更重要。",
        "ja": "教学主线先讲清最小正确模型，比堆很多层名词更重要。"
      },
      "rarity": "N",
      "region": "core",
      "chapter": "s06",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s07_001",
      "name": {
        "zh": "这一章的核心目标",
        "en": "What You'll Learn",
        "ja": "この章の核心目標"
      },
      "desc": {
        "zh": "“意图”不能直接变成“执行”，中间必须经过权限检查。",
        "en": "Your agent from s06 is capable and long-lived. It reads f...",
        "ja": "「model の意図」がそのまま「実行」へ落ちる"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "permission"
      ],
      "power": 57,
      "defense": 47
    },
    {
      "id": "card_s07_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "併読すると楽になる資料"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Imagine your agent is helping refactor a codebase. It rea...",
        "ja": "併読すると楽になる資料"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s07_003",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Solution",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Every tool call now passes through a four-stage permissio...",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s07_004",
      "name": {
        "zh": "什么是权限系统",
        "en": "Read Together",
        "ja": "permission system とは何か"
      },
      "desc": {
        "zh": "权限系统不是“有没有权限”这样一个布尔值。",
        "en": "Read Together",
        "ja": "permission system は真偽値 1 個ではありません。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "permission"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s07_005",
      "name": {
        "zh": "什么是权限模式",
        "en": "How It Works",
        "ja": "permission mode とは何か"
      },
      "desc": {
        "zh": "权限模式是系统当前的总体风格。",
        "en": "Step 1.",
        "ja": "mode は、その session 全体の安全姿勢です。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "permission"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s07_006",
      "name": {
        "zh": "什么是规则",
        "en": "What Changed From s06",
        "ja": "rule とは何か"
      },
      "desc": {
        "zh": "规则就是“遇到某种工具调用时，该怎么处理”的小条款。",
        "en": "What Changed From s06",
        "ja": "を表す小さな条項です。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s07_007",
      "name": {
        "zh": "最小权限系统应该长什么样",
        "en": "Try It",
        "ja": "最小 permission system の形"
      },
      "desc": {
        "zh": "如果你是从 0 开始手写，一个最小但正确的权限系统只需要四步：",
        "en": "cd learn-claude-code",
        "ja": "0 から手で作るなら、最小で正しい pipeline は 4 段で十分です。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "permission"
      ],
      "power": 53,
      "defense": 43
    },
    {
      "id": "card_s07_008",
      "name": {
        "zh": "为什么顺序是这样",
        "en": "What You've Mastered",
        "ja": "なぜ順番がこの形なのか"
      },
      "desc": {
        "zh": "为什么顺序是这样",
        "en": "At this point, you can:",
        "ja": "なぜ順番がこの形なのか"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s07_009",
      "name": {
        "zh": "第 1 步先看 deny rules",
        "en": "What's Next",
        "ja": "1. deny を先に見る理由"
      },
      "desc": {
        "zh": "因为有些东西不应该交给“模式”去决定。",
        "en": "Your permission system controls what the agent is allowed...",
        "ja": "ある種の request は mode に関係なく危険です。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s07_010",
      "name": {
        "zh": "第 2 步看 mode",
        "en": "Key Takeaway",
        "ja": "2. mode を次に見る理由"
      },
      "desc": {
        "zh": "因为模式决定当前会话的大方向。",
        "en": "Key Takeaway",
        "ja": "mode はその session の大きな姿勢だからです。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s07_011",
      "name": {
        "zh": "第 3 步看 allow rules",
        "en": "第 3 步看 allow rules",
        "ja": "3. allow を後に見る理由"
      },
      "desc": {
        "zh": "有些安全、重复、常见的操作可以直接过。",
        "en": "有些安全、重复、常见的操作可以直接过。",
        "ja": "deny と mode を抜けたあとで、"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s07_012",
      "name": {
        "zh": "第 4 步才 ask",
        "en": "第 4 步才 ask",
        "ja": "4. ask を最後に置く理由"
      },
      "desc": {
        "zh": "前面都没命中的灰区，才交给用户。",
        "en": "前面都没命中的灰区，才交给用户。",
        "ja": "前段で明確に決められなかった灰色領域だけを user に回すためです。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s07_013",
      "name": {
        "zh": "推荐先实现的 3 种模式",
        "en": "推荐先实现的 3 种模式",
        "ja": "最初に実装すると良い 3 つの mode"
      },
      "desc": {
        "zh": "不要一上来就做特别多模式。",
        "en": "不要一上来就做特别多模式。",
        "ja": "最初から mode を増やしすぎる必要はありません。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s07_014",
      "name": {
        "zh": "这一章最重要的数据结构",
        "en": "这一章最重要的数据结构",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "这一章最重要的数据结构",
        "en": "这一章最重要的数据结构",
        "ja": "この章の核になるデータ構造"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s07_015",
      "name": {
        "zh": "1. 权限规则",
        "en": "1. 权限规则",
        "ja": "1. PermissionRule"
      },
      "desc": {
        "zh": "PermissionRule = {",
        "en": "PermissionRule = {",
        "ja": "PermissionRule = {"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "permission"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s07_016",
      "name": {
        "zh": "2. 权限模式",
        "en": "2. 权限模式",
        "ja": "2. Permission Mode"
      },
      "desc": {
        "zh": "mode = \"default\" | \"plan\" | \"auto\"",
        "en": "mode = \"default\" | \"plan\" | \"auto\"",
        "ja": "mode = \"default\" | \"plan\" | \"auto\""
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "permission"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s07_017",
      "name": {
        "zh": "3. 权限决策结果",
        "en": "3. 权限决策结果",
        "ja": "3. PermissionDecision"
      },
      "desc": {
        "zh": "\"behavior\": \"allow\" | \"deny\" | \"ask\",",
        "en": "\"behavior\": \"allow\" | \"deny\" | \"ask\",",
        "ja": "なぜそうなったかを説明できるべき"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "permission"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s07_018",
      "name": {
        "zh": "最小实现怎么写",
        "en": "最小实现怎么写",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "def check_permission(tool_name: str, tool_input: dict) ->...",
        "en": "def check_permission(tool_name: str, tool_input: dict) ->...",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "SR",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 84,
      "defense": 74
    },
    {
      "id": "card_s07_019",
      "name": {
        "zh": "Bash 为什么值得单独讲",
        "en": "Bash 为什么值得单独讲",
        "ja": "第 1 段階: 判定関数を書く"
      },
      "desc": {
        "zh": "bash 不是普通文本，而是可执行动作描述。",
        "en": "bash 不是普通文本，而是可执行动作描述。",
        "ja": "先に分類し、その後で分岐する"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s07_020",
      "name": {
        "zh": "初学者怎么把这章做对",
        "en": "初学者怎么把这章做对",
        "ja": "第 2 段階: tool 実行直前に接ぐ"
      },
      "desc": {
        "zh": "初学者怎么把这章做对",
        "en": "初学者怎么把这章做对",
        "ja": "tool_input)\n```\n\nこれで初めて、"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s07_021",
      "name": {
        "zh": "第一步：先做 3 个模式",
        "en": "第一步：先做 3 个模式",
        "ja": "`bash` を特別に気にする理由"
      },
      "desc": {
        "zh": "不要一开始就做 6 个模式、10 个来源、复杂 classifier。",
        "en": "不要一开始就做 6 个模式、10 个来源、复杂 classifier。",
        "ja": "bash は普通の text ではなく、可実行 action の記述"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s07_022",
      "name": {
        "zh": "第二步：先做 deny / allow 两类规则",
        "en": "第二步：先做 deny / allow 两类规则",
        "ja": "初学者が混ぜやすいポイント"
      },
      "desc": {
        "zh": "这已经足够表达很多现实需求。",
        "en": "这已经足够表达很多现实需求。",
        "ja": "初学者が混ぜやすいポイント"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s07_023",
      "name": {
        "zh": "第三步：给 bash 加最小安全检查",
        "en": "第三步：给 bash 加最小安全检查",
        "ja": "1. permission を yes/no の 2 値で考える"
      },
      "desc": {
        "zh": "哪怕只是模式匹配版，也比完全裸奔好很多。",
        "en": "哪怕只是模式匹配版，也比完全裸奔好很多。",
        "ja": "実際には `deny / allow / ask` の 3 分岐以上が必要です。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "security"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s07_024",
      "name": {
        "zh": "第四步：加拒绝计数",
        "en": "第四步：加拒绝计数",
        "ja": "2. mode を rule の代わりにしようとする"
      },
      "desc": {
        "zh": "如果 agent 连续多次被拒绝，说明它可能卡住了。",
        "en": "如果 agent 连续多次被拒绝，说明它可能卡住了。",
        "ja": "mode は全体 posture、rule は個別条項です。役割が違います。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s07_025",
      "name": {
        "zh": "这章不应该讲太多什么",
        "en": "这章不应该讲太多什么",
        "ja": "3. `bash` を普通の string と同じ感覚で通す"
      },
      "desc": {
        "zh": "任何工具调用，都不应该直接执行；中间必须先过一条权限管道。",
        "en": "任何工具调用，都不应该直接执行；中间必须先过一条权限管道。",
        "ja": "execution power が桁違いです。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "tool",
        "permission"
      ],
      "power": 50,
      "defense": 40
    },
    {
      "id": "card_s07_026",
      "name": {
        "zh": "这一章和后续章节的关系",
        "en": "这一章和后续章节的关系",
        "ja": "4. deny / allow より先に user へ全部投げる"
      },
      "desc": {
        "zh": "所以这章是后面很多机制的安全前提。",
        "en": "所以这章是后面很多机制的安全前提。",
        "ja": "それでは system 側の safety design を学べません。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s07_027",
      "name": {
        "zh": "学完这章后，你应该能回答",
        "en": "学完这章后，你应该能回答",
        "ja": "5. decision に reason を残さない"
      },
      "desc": {
        "zh": "一句话记住：权限系统不是为了让 agent 更笨，而是为了让 agent 的行动先经过一道可靠的安全判断。",
        "en": "一句话记住：权限系统不是为了让 agent 更笨，而是为了让 agent 的行动先经过一道可靠的安全判断。",
        "ja": "あとで「なぜ止まったか」が説明できなくなります。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s07",
      "tags": [
        "agent",
        "permission",
        "security"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s08_001",
      "name": {
        "zh": "这章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解決する問題"
      },
      "desc": {
        "zh": "主循环只负责暴露“时机”，真正的附加行为交给 hook。",
        "en": "Your agent from s07 has a permission system that controls...",
        "ja": "`s07` までで、agent はかなり実用的になりました。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "loop",
        "hook"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s08_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "主線とどう併読するか"
      },
      "desc": {
        "zh": "建议联读",
        "en": "You are running your agent in a team environment. Differe...",
        "ja": "主線とどう併読するか"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s08_003",
      "name": {
        "zh": "什么是 hook",
        "en": "The Solution",
        "ja": "Hook を最も簡単に言うと"
      },
      "desc": {
        "zh": "hook 让系统可扩展，但不要求主循环理解每个扩展需求。",
        "en": "The agent loop exposes three fixed extension points (life...",
        "ja": "主ループの決まった節目で、追加動作を差し込む拡張点"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "loop",
        "hook"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_s08_004",
      "name": {
        "zh": "最小心智模型",
        "en": "Read Together",
        "ja": "最小の心智モデル"
      },
      "desc": {
        "zh": "教学版先只讲 3 个事件：",
        "en": "Read Together",
        "ja": "tool_call from model"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 57,
      "defense": 47
    },
    {
      "id": "card_s08_005",
      "name": {
        "zh": "教学版统一返回约定",
        "en": "How It Works",
        "ja": "まず教えるべき 3 つのイベント"
      },
      "desc": {
        "zh": "这一章最容易把人讲乱的地方，就是“不同 hook 事件的返回语义”。",
        "en": "Step 1.",
        "ja": "これだけで教学版としては十分です。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s08_006",
      "name": {
        "zh": "关键数据结构",
        "en": "What Changed From s07",
        "ja": "重要な境界"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "What Changed From s07",
        "ja": "重要な境界"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s08_007",
      "name": {
        "zh": "1. HookEvent",
        "en": "Try It",
        "ja": "Hook は主状態遷移を置き換えない"
      },
      "desc": {
        "zh": "\"name\": \"PreToolUse\",",
        "en": "cd learn-claude-code",
        "ja": "Hook がやるのは「観察して補助すること」です。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "hook"
      ],
      "power": 54,
      "defense": 44
    },
    {
      "id": "card_s08_008",
      "name": {
        "zh": "2. HookResult",
        "en": "What You've Mastered",
        "ja": "Hook には整ったイベント情報を渡す"
      },
      "desc": {
        "zh": "\"exit_code\": 0,",
        "en": "At this point, you can:",
        "ja": "理想的には、各 Hook は同じ形の情報を受け取ります。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "hook"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s08_009",
      "name": {
        "zh": "3. HookRunner",
        "en": "What's Next",
        "ja": "最小実装"
      },
      "desc": {
        "zh": "主循环知道事件名，hook runner 知道怎么调扩展逻辑。",
        "en": "Your agent can now execute tools safely (s07) and be exte...",
        "ja": "最小実装"
      },
      "rarity": "SR",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "loop",
        "hook"
      ],
      "power": 72,
      "defense": 62
    },
    {
      "id": "card_s08_010",
      "name": {
        "zh": "最小执行流程",
        "en": "Key Takeaway",
        "ja": "1. 設定を読む"
      },
      "desc": {
        "zh": "先看最重要的 `PreToolUse` / `PostToolUse`：",
        "en": "Key Takeaway",
        "ja": "\"PreToolUse\": [...],"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s08_011",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "2. 実行関数を作る"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "def run_hooks(event_name: str, ctx: dict):"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s08_012",
      "name": {
        "zh": "第一步：准备一个事件到处理器的映射",
        "en": "第一步：准备一个事件到处理器的映射",
        "ja": "3. ループに接続する"
      },
      "desc": {
        "zh": "\"SessionStart\": [on_session_start],",
        "en": "\"SessionStart\": [on_session_start],",
        "ja": "run_hooks(\"PreToolUse\", ctx)"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_s08_013",
      "name": {
        "zh": "第二步：统一运行 hook",
        "en": "第二步：统一运行 hook",
        "ja": "初学者が混乱しやすい点"
      },
      "desc": {
        "zh": "def run_hooks(event_name: str, payload: dict) -> dict:",
        "en": "def run_hooks(event_name: str, payload: dict) -> dict:",
        "ja": "初学者が混乱しやすい点"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "hook"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s08_014",
      "name": {
        "zh": "第三步：接进主循环",
        "en": "第三步：接进主循环",
        "ja": "1. Hook を第二の主ループのように考える"
      },
      "desc": {
        "zh": "hook 不是主循环的替代品，hook 是主循环在固定时机对外发出的调用。",
        "en": "hook 不是主循环的替代品，hook 是主循环在固定时机对外发出的调用。",
        "ja": "そうすると制御が分裂して、一気に分かりにくくなります。"
      },
      "rarity": "SR",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "loop",
        "hook"
      ],
      "power": 79,
      "defense": 69
    },
    {
      "id": "card_s08_015",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "2. Hook ごとに別のデータ形を渡す"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "新しい Hook を足すたびに、読む側の心智コストが増えてしまいます。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s08_016",
      "name": {
        "zh": "1. 把 hook 当成“到处插 if”",
        "en": "1. 把 hook 当成“到处插 if”",
        "ja": "3. 何でも Hook に入れようとする"
      },
      "desc": {
        "zh": "如果还是散落在主循环里写条件分支，那还不是真正的 hook 设计。",
        "en": "如果还是散落在主循环里写条件分支，那还不是真正的 hook 设计。",
        "ja": "Hook は便利ですが、メインの状態遷移まで押し込む場所ではありません。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "hook"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s08_017",
      "name": {
        "zh": "2. 没有统一的返回结构",
        "en": "2. 没有统一的返回结构",
        "ja": "Try It"
      },
      "desc": {
        "zh": "今天返回字符串，明天返回布尔值，后天返回整数，最后主循环一定会变乱。",
        "en": "今天返回字符串，明天返回布尔值，后天返回整数，最后主循环一定会变乱。",
        "ja": "cd learn-claude-code"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s08_018",
      "name": {
        "zh": "3. 一上来就把所有事件做全",
        "en": "3. 一上来就把所有事件做全",
        "ja": "3. 一上来就把所有事件做全"
      },
      "desc": {
        "zh": "1. 先学会 3 个事件",
        "en": "1. 先学会 3 个事件",
        "ja": "1. 先学会 3 个事件"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s08_019",
      "name": {
        "zh": "4. 忘了说明“教学版统一语义”和“高完成度细化语义”的区别",
        "en": "4. 忘了说明“教学版统一语义”和“高完成度细化语义”的区别",
        "ja": "4. 忘了说明“教学版统一语义”和“高完成度细化语义”的区别"
      },
      "desc": {
        "zh": "先学统一模型，再学事件细化。",
        "en": "先学统一模型，再学事件细化。",
        "ja": "先学统一模型，再学事件细化。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 53,
      "defense": 43
    },
    {
      "id": "card_s08_020",
      "name": {
        "zh": "学完这一章，你应该真正掌握什么",
        "en": "学完这一章，你应该真正掌握什么",
        "ja": "学完这一章，你应该真正掌握什么"
      },
      "desc": {
        "zh": "学完以后，你应该能自己清楚说出下面几句话：",
        "en": "学完以后，你应该能自己清楚说出下面几句话：",
        "ja": "学完以后，你应该能自己清楚说出下面几句话："
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s08_021",
      "name": {
        "zh": "下一章学什么",
        "en": "下一章学什么",
        "ja": "下一章学什么"
      },
      "desc": {
        "zh": "下一章 `s09` 要解决的是：",
        "en": "下一章 `s09` 要解决的是：",
        "ja": "下一章 `s09` 要解决的是："
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s08",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s09_001",
      "name": {
        "zh": "这一章在解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解決する問題"
      },
      "desc": {
        "zh": "如果一个 agent 每次新会话都完全从零开始，它就会不断重复忘记这些事情：",
        "en": "Your agent from s08 is powerful and extensible. It can ex...",
        "ja": "memory がなければ、新しいセッションは毎回ゼロから始まります。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s09_002",
      "name": {
        "zh": "但先立一个边界：memory 不是什么都存",
        "en": "The Problem",
        "ja": "最初に立てるべき境界"
      },
      "desc": {
        "zh": "只有那些跨会话仍然有价值，而且不能轻易从当前仓库状态直接推出来的信息，才适合进入 memory。",
        "en": "Without memory, a new session starts from zero. The agent...",
        "ja": "何でも memory に入れない"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s09_003",
      "name": {
        "zh": "建议联读",
        "en": "The Solution",
        "ja": "主線とどう併読するか"
      },
      "desc": {
        "zh": "建议联读",
        "en": "A small file-based memory store saves durable facts as in...",
        "ja": "主線とどう併読するか"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s09_004",
      "name": {
        "zh": "先解释几个名词",
        "en": "Read Together",
        "ja": "初学者向けの 4 分類"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Read Together",
        "ja": "初学者向けの 4 分類"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s09_005",
      "name": {
        "zh": "什么是“跨会话”",
        "en": "How It Works",
        "ja": "1. `user`"
      },
      "desc": {
        "zh": "什么是“跨会话”",
        "en": "Step 1.",
        "ja": "安定したユーザーの好み。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s09_006",
      "name": {
        "zh": "什么是“不可轻易重新推导”",
        "en": "1. `user` -- Stable user preferences",
        "ja": "2. `feedback`"
      },
      "desc": {
        "zh": "这些东西，往往不是你重新扫一遍代码就能立刻知道的。",
        "en": "Examples: prefers `pnpm`, wants concise answers, dislikes...",
        "ja": "ユーザーが明示的に直した点。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s09_007",
      "name": {
        "zh": "最适合先教的 4 类 memory",
        "en": "2. `feedback` -- Corrections the user wants enforced",
        "ja": "3. `project`"
      },
      "desc": {
        "zh": "最适合先教的 4 类 memory",
        "en": "Examples: \"do not change test snapshots unless I ask\", \"a...",
        "ja": "コードを見ただけでは分かりにくい持続的事情。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s09_008",
      "name": {
        "zh": "1. `user`",
        "en": "3. `project` -- Durable project facts not obvious from the repo",
        "ja": "4. `reference`"
      },
      "desc": {
        "zh": "1. `user`",
        "en": "Examples: \"this old directory still cannot be deleted bec...",
        "ja": "外部資料や外部ボードへの参照先。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s09_009",
      "name": {
        "zh": "2. `feedback`",
        "en": "4. `reference` -- Pointers to external resources",
        "ja": "入れてはいけないもの"
      },
      "desc": {
        "zh": "用户明确纠正过你的地方。",
        "en": "Step 2.",
        "ja": "入れてはいけないもの"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s09_010",
      "name": {
        "zh": "3. `project`",
        "en": "Common Mistakes",
        "ja": "最小の心智モデル"
      },
      "desc": {
        "zh": "不容易从代码直接重新看出来",
        "en": "Mistake 1: Storing things the repo can tell you.",
        "ja": "conversation"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s09_011",
      "name": {
        "zh": "4. `reference`",
        "en": "What Changed From s08",
        "ja": "重要なデータ構造"
      },
      "desc": {
        "zh": "4. `reference`",
        "en": "What Changed From s08",
        "ja": "重要なデータ構造"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s09_012",
      "name": {
        "zh": "哪些东西不要存进 memory",
        "en": "Try It",
        "ja": "1. 1 メモリ = 1 ファイル"
      },
      "desc": {
        "zh": "这是比“该存什么”更重要的一张表：",
        "en": "cd learn-claude-code",
        "ja": "name: prefer_pnpm"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s09_013",
      "name": {
        "zh": "最小心智模型",
        "en": "What You've Mastered",
        "ja": "2. 小さな索引"
      },
      "desc": {
        "zh": "conversation",
        "en": "At this point, you can:",
        "ja": "索引は内容そのものではなく、「何があるか」を素早く知るための地図です。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s09_014",
      "name": {
        "zh": "这一章最关键的数据结构",
        "en": "What's Next",
        "ja": "最小実装"
      },
      "desc": {
        "zh": "这一章最关键的数据结构",
        "en": "Your agent now remembers things across sessions, but thos...",
        "ja": "MEMORY_TYPES = (\"user\", \"feedback\", \"project\", \"reference\")"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s09_015",
      "name": {
        "zh": "1. 单条 memory 文件",
        "en": "Key Takeaway",
        "ja": "近い概念との違い"
      },
      "desc": {
        "zh": "放在正文前面的结构化元数据。",
        "en": "Key Takeaway",
        "ja": "近い概念との違い"
      },
      "rarity": "SR",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 74,
      "defense": 64
    },
    {
      "id": "card_s09_016",
      "name": {
        "zh": "2. 索引文件 `MEMORY.md`",
        "en": "2. 索引文件 `MEMORY.md`",
        "ja": "memory"
      },
      "desc": {
        "zh": "最小实现里，再加一个索引文件就够了：",
        "en": "最小实现里，再加一个索引文件就够了：",
        "ja": "次回以降も役立つ事実。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 50,
      "defense": 40
    },
    {
      "id": "card_s09_017",
      "name": {
        "zh": "最小实现步骤",
        "en": "最小实现步骤",
        "ja": "task"
      },
      "desc": {
        "zh": "最小实现步骤",
        "en": "最小实现步骤",
        "ja": "いま何を完了したいか。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s09_018",
      "name": {
        "zh": "第一步：定义 memory 类型",
        "en": "第一步：定义 memory 类型",
        "ja": "plan"
      },
      "desc": {
        "zh": "MEMORY_TYPES = (\"user\", \"feedback\", \"project\", \"reference\")",
        "en": "MEMORY_TYPES = (\"user\", \"feedback\", \"project\", \"reference\")",
        "ja": "このターンでどう進めるか。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s09_019",
      "name": {
        "zh": "第二步：写一个 `save_memory` 工具",
        "en": "第二步：写一个 `save_memory` 工具",
        "ja": "`CLAUDE.md`"
      },
      "desc": {
        "zh": "第二步：写一个 `save_memory` 工具",
        "en": "第二步：写一个 `save_memory` 工具",
        "ja": "より安定した指示文書や standing rules。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "tool",
        "memory"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s09_020",
      "name": {
        "zh": "第三步：每条 memory 独立落盘",
        "en": "第三步：每条 memory 独立落盘",
        "ja": "初学者がよくやる間違い"
      },
      "desc": {
        "zh": "def save_memory(name, description, mem_type, content):",
        "en": "def save_memory(name, description, mem_type, content):",
        "ja": "初学者がよくやる間違い"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 54,
      "defense": 44
    },
    {
      "id": "card_s09_021",
      "name": {
        "zh": "第四步：会话开始时重新加载",
        "en": "第四步：会话开始时重新加载",
        "ja": "1. コードを読めば分かることまで保存する"
      },
      "desc": {
        "zh": "把 memory 文件重新读出来，拼成一段 memory section。",
        "en": "把 memory 文件重新读出来，拼成一段 memory section。",
        "ja": "それは memory ではなく、重複です。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s09_022",
      "name": {
        "zh": "第五步：把 memory section 接进系统输入",
        "en": "第五步：把 memory section 接进系统输入",
        "ja": "2. 現在の作業状況を memory に入れる"
      },
      "desc": {
        "zh": "这一步会在 `s10` 的 prompt 组装里系统化。",
        "en": "这一步会在 `s10` 的 prompt 组装里系统化。",
        "ja": "それは task / plan の責務です。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s09_023",
      "name": {
        "zh": "memory、task、plan、CLAUDE.md 的边界",
        "en": "memory、task、plan、CLAUDE.md 的边界",
        "ja": "3. memory を絶対真実のように扱う"
      },
      "desc": {
        "zh": "这是最值得初学者反复区分的一组概念。",
        "en": "这是最值得初学者反复区分的一组概念。",
        "ja": "memory は方向を与え、現在観測は真実を与える。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "task",
        "memory",
        "plan"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s09_024",
      "name": {
        "zh": "memory",
        "en": "memory",
        "ja": "Try It"
      },
      "desc": {
        "zh": "保存跨会话仍有价值的信息。",
        "en": "保存跨会话仍有价值的信息。",
        "ja": "cd learn-claude-code"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s09_025",
      "name": {
        "zh": "task",
        "en": "task",
        "ja": "task"
      },
      "desc": {
        "zh": "保存当前工作要做什么、依赖关系如何、进度如何。",
        "en": "保存当前工作要做什么、依赖关系如何、进度如何。",
        "ja": "保存当前工作要做什么、依赖关系如何、进度如何。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "task"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s09_026",
      "name": {
        "zh": "plan",
        "en": "plan",
        "ja": "plan"
      },
      "desc": {
        "zh": "保存“这一轮我要怎么做”的过程性安排。",
        "en": "保存“这一轮我要怎么做”的过程性安排。",
        "ja": "保存“这一轮我要怎么做”的过程性安排。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "plan"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s09_027",
      "name": {
        "zh": "CLAUDE.md",
        "en": "CLAUDE.md",
        "ja": "CLAUDE.md"
      },
      "desc": {
        "zh": "保存更稳定、更像长期规则的说明文本。",
        "en": "保存更稳定、更像长期规则的说明文本。",
        "ja": "保存更稳定、更像长期规则的说明文本。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s09_028",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s09_029",
      "name": {
        "zh": "错误 1：把代码结构也存进 memory",
        "en": "错误 1：把代码结构也存进 memory",
        "ja": "错误 1：把代码结构也存进 memory"
      },
      "desc": {
        "zh": "因为系统完全可以重新去读。",
        "en": "因为系统完全可以重新去读。",
        "ja": "因为系统完全可以重新去读。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory",
        "error"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s09_030",
      "name": {
        "zh": "错误 2：把当前任务状态存进 memory",
        "en": "错误 2：把当前任务状态存进 memory",
        "ja": "错误 2：把当前任务状态存进 memory"
      },
      "desc": {
        "zh": "这些是 task / plan，不是 memory。",
        "en": "这些是 task / plan，不是 memory。",
        "ja": "这些是 task / plan，不是 memory。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "task",
        "memory",
        "error"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s09_031",
      "name": {
        "zh": "错误 3：把 memory 当成绝对真相",
        "en": "错误 3：把 memory 当成绝对真相",
        "ja": "错误 3：把 memory 当成绝对真相"
      },
      "desc": {
        "zh": "memory 用来提供方向，不用来替代当前观察。",
        "en": "memory 用来提供方向，不用来替代当前观察。",
        "ja": "memory 用来提供方向，不用来替代当前观察。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory",
        "error"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s09_032",
      "name": {
        "zh": "从教学版到高完成度版：记忆系统还要补的 6 条边界",
        "en": "从教学版到高完成度版：记忆系统还要补的 6 条边界",
        "ja": "从教学版到高完成度版：记忆系统还要补的 6 条边界"
      },
      "desc": {
        "zh": "最小教学版只要先把“该存什么 / 不该存什么”讲清楚。",
        "en": "最小教学版只要先把“该存什么 / 不该存什么”讲清楚。",
        "ja": "最小教学版只要先把“该存什么 / 不该存什么”讲清楚。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s09_033",
      "name": {
        "zh": "1. 不是所有 memory 都该放在同一个作用域",
        "en": "1. 不是所有 memory 都该放在同一个作用域",
        "ja": "1. 不是所有 memory 都该放在同一个作用域"
      },
      "desc": {
        "zh": "更完整系统里，至少要分清：",
        "en": "更完整系统里，至少要分清：",
        "ja": "更完整系统里，至少要分清："
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s09_034",
      "name": {
        "zh": "2. 不只保存“你做错了”，也要保存“这样做是对的”",
        "en": "2. 不只保存“你做错了”，也要保存“这样做是对的”",
        "ja": "2. 不只保存“你做错了”，也要保存“这样做是对的”"
      },
      "desc": {
        "zh": "很多人讲 memory 时，只会想到纠错。",
        "en": "很多人讲 memory 时，只会想到纠错。",
        "ja": "很多人讲 memory 时，只会想到纠错。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s09_035",
      "name": {
        "zh": "3. 有些东西即使用户要求你存，也不该直接存",
        "en": "3. 有些东西即使用户要求你存，也不该直接存",
        "ja": "3. 有些东西即使用户要求你存，也不该直接存"
      },
      "desc": {
        "zh": "就算用户说“帮我记住”，下面这些东西也不应该直接写进 memory：",
        "en": "就算用户说“帮我记住”，下面这些东西也不应该直接写进 memory：",
        "ja": "就算用户说“帮我记住”，下面这些东西也不应该直接写进 memory："
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s09_036",
      "name": {
        "zh": "4. memory 会漂移，所以回答前要先核对当前状态",
        "en": "4. memory 会漂移，所以回答前要先核对当前状态",
        "ja": "4. memory 会漂移，所以回答前要先核对当前状态"
      },
      "desc": {
        "zh": "memory 记录的是“曾经成立过的事实”，不是永久真理。",
        "en": "memory 记录的是“曾经成立过的事实”，不是永久真理。",
        "ja": "memory 记录的是“曾经成立过的事实”，不是永久真理。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s09_037",
      "name": {
        "zh": "5. 用户说“忽略 memory”时，就当它是空的",
        "en": "5. 用户说“忽略 memory”时，就当它是空的",
        "ja": "5. 用户说“忽略 memory”时，就当它是空的"
      },
      "desc": {
        "zh": "在这一轮里，按 memory 为空来工作。",
        "en": "在这一轮里，按 memory 为空来工作。",
        "ja": "在这一轮里，按 memory 为空来工作。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 54,
      "defense": 44
    },
    {
      "id": "card_s09_038",
      "name": {
        "zh": "6. 推荐具体路径、函数、外部资源前，要再验证一次",
        "en": "6. 推荐具体路径、函数、外部资源前，要再验证一次",
        "ja": "6. 推荐具体路径、函数、外部资源前，要再验证一次"
      },
      "desc": {
        "zh": "memory 很适合保存：",
        "en": "memory 很适合保存：",
        "ja": "memory 很适合保存："
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s09_039",
      "name": {
        "zh": "学完这章后，你应该能回答",
        "en": "学完这章后，你应该能回答",
        "ja": "学完这章后，你应该能回答"
      },
      "desc": {
        "zh": "一句话记住：memory 保存的是“以后还可能有价值、但当前代码里不容易直接重新看出来”的信息。",
        "en": "一句话记住：memory 保存的是“以后还可能有价值、但当前代码里不容易直接重新看出来”的信息。",
        "ja": "一句话记住：memory 保存的是“以后还可能有价值、但当前代码里不容易直接重新看出来”的信息。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s09",
      "tags": [
        "memory"
      ],
      "power": 52,
      "defense": 42
    },
    {
      "id": "card_s10_001",
      "name": {
        "zh": "这一章为什么重要",
        "en": "What You'll Learn",
        "ja": "なぜこの章が必要か"
      },
      "desc": {
        "zh": "由多个来源共同组装出来的一条流水线。",
        "en": "When your agent had one tool and one job, a single hardco...",
        "ja": "最初は 1 本の system prompt 文字列でも動きます。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s10_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "主線とどう併読するか"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Imagine you want to add a new tool to your agent. You ope...",
        "ja": "主線とどう併読するか"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s10_003",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Solution",
        "ja": "最小の心智モデル"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Turn prompt construction into a pipeline. Each section ha...",
        "ja": "1. core identity"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s10_004",
      "name": {
        "zh": "什么是 system prompt",
        "en": "How It Works",
        "ja": "最も重要な境界"
      },
      "desc": {
        "zh": "system prompt 是给模型的系统级说明。",
        "en": "Step 1. Define the builder.",
        "ja": "最も重要な境界"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "prompt"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s10_005",
      "name": {
        "zh": "什么是“组装流水线”",
        "en": "What Changed from s09",
        "ja": "最小 builder"
      },
      "desc": {
        "zh": "它不是一个死字符串，而是一条构建过程。",
        "en": "What Changed from s09",
        "ja": "class SystemPromptBuilder:"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s10_006",
      "name": {
        "zh": "什么是动态信息",
        "en": "Read Together",
        "ja": "1 本の大文字列より良い理由"
      },
      "desc": {
        "zh": "有些信息经常变化，例如：",
        "en": "Read Together",
        "ja": "1 本の大文字列より良い理由"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s10_007",
      "name": {
        "zh": "最小心智模型",
        "en": "Common Beginner Mistakes",
        "ja": "1. どこから来た情報か分かる"
      },
      "desc": {
        "zh": "最容易理解的方式，是把 system prompt 想成 6 段：",
        "en": "Mistake 1: teaching the prompt as one fixed string.",
        "ja": "1. どこから来た情報か分かる"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s10_008",
      "name": {
        "zh": "为什么不能把所有东西都硬塞进一个大字符串",
        "en": "Try It",
        "ja": "2. 部分ごとにテストしやすい"
      },
      "desc": {
        "zh": "因为这样会有三个问题：",
        "en": "cd learn-claude-code",
        "ja": "2. 部分ごとにテストしやすい"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s10_009",
      "name": {
        "zh": "1. 不好维护",
        "en": "What You've Mastered",
        "ja": "3. 安定部分と動的部分を分けて育てられる"
      },
      "desc": {
        "zh": "1. 不好维护",
        "en": "At this point, you can:",
        "ja": "3. 安定部分と動的部分を分けて育てられる"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s10_010",
      "name": {
        "zh": "2. 不好测试",
        "en": "What's Next",
        "ja": "`system prompt` と `system reminder`"
      },
      "desc": {
        "zh": "如果 system prompt 是一大坨文本，你很难分别测试：",
        "en": "The prompt assembly pipeline means your agent now enters ...",
        "ja": "より分かりやすい考え方は:"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s10_011",
      "name": {
        "zh": "3. 不好做缓存和动态更新",
        "en": "Key Takeaway",
        "ja": "`CLAUDE.md` が独立した段なのはなぜか"
      },
      "desc": {
        "zh": "一些稳定内容其实不需要每轮大变。",
        "en": "Key Takeaway",
        "ja": "指示源は上書き一発ではなく、層として積める"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s10_012",
      "name": {
        "zh": "最小实现结构",
        "en": "最小实现结构",
        "ja": "memory とこの章の関係"
      },
      "desc": {
        "zh": "最小实现结构",
        "en": "最小实现结构",
        "ja": "memory は保存するだけでは意味がありません。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s10_013",
      "name": {
        "zh": "第一步：做一个 builder",
        "en": "第一步：做一个 builder",
        "ja": "初学者が混乱しやすい点"
      },
      "desc": {
        "zh": "class SystemPromptBuilder:",
        "en": "class SystemPromptBuilder:",
        "ja": "初学者が混乱しやすい点"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s10_014",
      "name": {
        "zh": "第二步：每一段只负责一种来源",
        "en": "第二步：每一段只负责一种来源",
        "ja": "1. system prompt を固定文字列だと思う"
      },
      "desc": {
        "zh": "这样每一段的职责就很清楚。",
        "en": "这样每一段的职责就很清楚。",
        "ja": "1. system prompt を固定文字列だと思う"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s10_015",
      "name": {
        "zh": "这一章最关键的结构化边界",
        "en": "这一章最关键的结构化边界",
        "ja": "2. 毎回変わる情報も全部同じ塊に入れる"
      },
      "desc": {
        "zh": "这一章最关键的结构化边界",
        "en": "这一章最关键的结构化边界",
        "ja": "2. 毎回変わる情報も全部同じ塊に入れる"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s10_016",
      "name": {
        "zh": "边界 1：稳定说明 vs 动态提醒",
        "en": "边界 1：稳定说明 vs 动态提醒",
        "ja": "3. skills、memory、`CLAUDE.md` を同じものとして扱う"
      },
      "desc": {
        "zh": "这两类东西不应该混为一谈。",
        "en": "这两类东西不应该混为一谈。",
        "ja": "似て見えても責務は違います。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s10_017",
      "name": {
        "zh": "边界 2：system prompt vs system reminder",
        "en": "边界 2：system prompt vs system reminder",
        "ja": "Try It"
      },
      "desc": {
        "zh": "system prompt 适合放：",
        "en": "system prompt 适合放：",
        "ja": "cd learn-claude-code"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "prompt"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s10_018",
      "name": {
        "zh": "一个实用的教学版本",
        "en": "一个实用的教学版本",
        "ja": "一个实用的教学版本"
      },
      "desc": {
        "zh": "上面更稳定，下面更容易变。",
        "en": "上面更稳定，下面更容易变。",
        "ja": "上面更稳定，下面更容易变。"
      },
      "rarity": "SR",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 84,
      "defense": 74
    },
    {
      "id": "card_s10_019",
      "name": {
        "zh": "CLAUDE.md 为什么要单独一段",
        "en": "CLAUDE.md 为什么要单独一段",
        "ja": "CLAUDE.md 为什么要单独一段"
      },
      "desc": {
        "zh": "因为它的角色不是“某一次任务的临时上下文”，而是更稳定的长期说明。",
        "en": "因为它的角色不是“某一次任务的临时上下文”，而是更稳定的长期说明。",
        "ja": "因为它的角色不是“某一次任务的临时上下文”，而是更稳定的长期说明。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s10_020",
      "name": {
        "zh": "memory 为什么要和 system prompt 有关系",
        "en": "memory 为什么要和 system prompt 有关系",
        "ja": "memory 为什么要和 system prompt 有关系"
      },
      "desc": {
        "zh": "把跨会话仍然有价值的信息，重新带回模型当前的工作环境。",
        "en": "把跨会话仍然有价值的信息，重新带回模型当前的工作环境。",
        "ja": "把跨会话仍然有价值的信息，重新带回模型当前的工作环境。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "prompt",
        "memory"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s10_021",
      "name": {
        "zh": "初学者最容易混淆的点",
        "en": "初学者最容易混淆的点",
        "ja": "初学者最容易混淆的点"
      },
      "desc": {
        "zh": "初学者最容易混淆的点",
        "en": "初学者最容易混淆的点",
        "ja": "初学者最容易混淆的点"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s10_022",
      "name": {
        "zh": "1. 把 system prompt 讲成一个固定字符串",
        "en": "1. 把 system prompt 讲成一个固定字符串",
        "ja": "1. 把 system prompt 讲成一个固定字符串"
      },
      "desc": {
        "zh": "这会让读者看不到系统是如何长大的。",
        "en": "这会让读者看不到系统是如何长大的。",
        "ja": "这会让读者看不到系统是如何长大的。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "prompt"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s10_023",
      "name": {
        "zh": "2. 把所有变化信息都塞进 system prompt",
        "en": "2. 把所有变化信息都塞进 system prompt",
        "ja": "2. 把所有变化信息都塞进 system prompt"
      },
      "desc": {
        "zh": "这会把稳定说明和临时提醒搅在一起。",
        "en": "这会把稳定说明和临时提醒搅在一起。",
        "ja": "这会把稳定说明和临时提醒搅在一起。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "prompt"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s10_024",
      "name": {
        "zh": "3. 把 CLAUDE.md、memory、skills 写成同一种东西",
        "en": "3. 把 CLAUDE.md、memory、skills 写成同一种东西",
        "ja": "3. 把 CLAUDE.md、memory、skills 写成同一种东西"
      },
      "desc": {
        "zh": "它们都可能进入 prompt，但来源和职责不同：",
        "en": "它们都可能进入 prompt，但来源和职责不同：",
        "ja": "它们都可能进入 prompt，但来源和职责不同："
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "memory"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s10_025",
      "name": {
        "zh": "如果你开始分不清 prompt、message、reminder",
        "en": "如果你开始分不清 prompt、message、reminder",
        "ja": "如果你开始分不清 prompt、message、reminder"
      },
      "desc": {
        "zh": "因为到了这一章，系统输入已经不再只有一个 system prompt 了。",
        "en": "因为到了这一章，系统输入已经不再只有一个 system prompt 了。",
        "ja": "因为到了这一章，系统输入已经不再只有一个 system prompt 了。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "prompt"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s10_026",
      "name": {
        "zh": "这章和后续章节的关系",
        "en": "这章和后续章节的关系",
        "ja": "这章和后续章节的关系"
      },
      "desc": {
        "zh": "所以 `s10` 的价值不是“新加一个功能”，",
        "en": "所以 `s10` 的价值不是“新加一个功能”，",
        "ja": "所以 `s10` 的价值不是“新加一个功能”，"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s10_027",
      "name": {
        "zh": "学完这章后，你应该能回答",
        "en": "学完这章后，你应该能回答",
        "ja": "学完这章后，你应该能回答"
      },
      "desc": {
        "zh": "一句话记住：system prompt 的关键不是“写一段很长的话”，而是“把不同来源的信息按清晰边界组装起来”。",
        "en": "一句话记住：system prompt 的关键不是“写一段很长的话”，而是“把不同来源的信息按清晰边界组装起来”。",
        "ja": "一句话记住：system prompt 的关键不是“写一段很长的话”，而是“把不同来源的信息按清晰边界组装起来”。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s10",
      "tags": [
        "prompt"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s11_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解く問題"
      },
      "desc": {
        "zh": "这一轮需要换一种继续方式。",
        "en": "Your agent is doing real work now -- reading files, writi...",
        "ja": "task そのものが失敗したのではなく、この turn の続け方を変える必要があるだけ"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "error"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s11_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "併読すると楽になる資料"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Your user asks the agent to refactor a large file. The mo...",
        "ja": "併読すると楽になる資料"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s11_003",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Solution",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Classify the failure first, choose the recovery branch se...",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s11_004",
      "name": {
        "zh": "什么叫恢复",
        "en": "How It Works",
        "ja": "recovery とは何か"
      },
      "desc": {
        "zh": "恢复，不是把所有错误都藏起来。",
        "en": "Step 1. Track recovery state.",
        "ja": "recovery は「error をなかったことにする」ことではありません。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "error"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s11_005",
      "name": {
        "zh": "什么叫重试预算",
        "en": "What Changed from s10",
        "ja": "retry budget とは何か"
      },
      "desc": {
        "zh": "重试预算，就是“最多试几次”。",
        "en": "What Changed from s10",
        "ja": "retry budget は、"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s11_006",
      "name": {
        "zh": "什么叫状态机",
        "en": "A Note on Real Systems",
        "ja": "state machine とは何か"
      },
      "desc": {
        "zh": "状态机这个词听起来很大，其实意思很简单：",
        "en": "Real agent systems also persist session state to disk, so...",
        "ja": "この章での state machine は難しい theory ではありません。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s11_007",
      "name": {
        "zh": "最小心智模型",
        "en": "Read Together",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "不要把错误恢复想得太神秘。",
        "en": "Read Together",
        "ja": "最初は 3 種類の failure だけ区別できれば十分です。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 53,
      "defense": 43
    },
    {
      "id": "card_s11_008",
      "name": {
        "zh": "关键数据结构",
        "en": "Common Beginner Mistakes",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "Mistake 1: using one retry rule for every error.",
        "ja": "この章の核になるデータ構造"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s11_009",
      "name": {
        "zh": "1. 恢复状态",
        "en": "Try It",
        "ja": "1. Recovery State"
      },
      "desc": {
        "zh": "recovery_state = {",
        "en": "cd learn-claude-code",
        "ja": "recovery_state = {"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "error"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s11_010",
      "name": {
        "zh": "2. 恢复决策",
        "en": "What You've Mastered",
        "ja": "2. Recovery Decision"
      },
      "desc": {
        "zh": "\"kind\": \"continue\" | \"compact\" | \"backoff\" | \"fail\",",
        "en": "At this point, you can:",
        "ja": "error の見た目と、次に選ぶ動作を分ける"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "error"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s11_011",
      "name": {
        "zh": "3. 续写提示",
        "en": "Stage 2 Complete",
        "ja": "3. Continuation Message"
      },
      "desc": {
        "zh": "CONTINUE_MESSAGE = (",
        "en": "s07 Permission System",
        "ja": "CONTINUE_MESSAGE = ("
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "prompt"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s11_012",
      "name": {
        "zh": "最小实现",
        "en": "Key Takeaway",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "def choose_recovery(stop_reason: str | None, error_text: ...",
        "en": "Key Takeaway",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "SR",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 77,
      "defense": 67
    },
    {
      "id": "card_s11_013",
      "name": {
        "zh": "三条恢复路径分别在补什么洞",
        "en": "三条恢复路径分别在补什么洞",
        "ja": "第 1 段階: recovery chooser を作る"
      },
      "desc": {
        "zh": "三条恢复路径分别在补什么洞",
        "en": "三条恢复路径分别在补什么洞",
        "ja": "まず分類し、そのあと branch を返す"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "error"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s11_014",
      "name": {
        "zh": "路径 1：输出被截断时，做续写",
        "en": "路径 1：输出被截断时，做续写",
        "ja": "第 2 段階: main loop に差し込む"
      },
      "desc": {
        "zh": "这个问题的本质不是“模型不会”，而是“这一轮输出空间不够”。",
        "en": "这个问题的本质不是“模型不会”，而是“这一轮输出空间不够”。",
        "ja": "while True:"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s11_015",
      "name": {
        "zh": "路径 2：上下文太长时，先压缩再重试",
        "en": "路径 2：上下文太长时，先压缩再重试",
        "ja": "3 つの主 recovery path が埋めている穴"
      },
      "desc": {
        "zh": "把旧对话从原文，变成一份仍然可继续工作的摘要。",
        "en": "把旧对话从原文，变成一份仍然可继续工作的摘要。",
        "ja": "3 つの主 recovery path が埋めている穴"
      },
      "rarity": "SR",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "context"
      ],
      "power": 72,
      "defense": 62
    },
    {
      "id": "card_s11_016",
      "name": {
        "zh": "路径 3：连接抖动时，退避重试",
        "en": "路径 3：连接抖动时，退避重试",
        "ja": "1. continuation"
      },
      "desc": {
        "zh": "“退避”这个词的意思是：",
        "en": "“退避”这个词的意思是：",
        "ja": "これは「model が言い終わる前に output budget が切れた」問題を埋めます。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s11_017",
      "name": {
        "zh": "如何接到主循环里",
        "en": "如何接到主循环里",
        "ja": "2. compact"
      },
      "desc": {
        "zh": "最干净的接法，是把恢复逻辑放在两个位置：",
        "en": "最干净的接法，是把恢复逻辑放在两个位置：",
        "ja": "過去を、そのままの原文ではなく、まだ続行可能な summary へ変換する"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "loop"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s11_018",
      "name": {
        "zh": "位置 1：模型调用外层",
        "en": "位置 1：模型调用外层",
        "ja": "3. backoff"
      },
      "desc": {
        "zh": "位置 1：模型调用外层",
        "en": "位置 1：模型调用外层",
        "ja": "時間を置けば通るかもしれない failure"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s11_019",
      "name": {
        "zh": "位置 2：拿到 response 以后",
        "en": "位置 2：拿到 response 以后",
        "ja": "compact と recovery を混ぜない"
      },
      "desc": {
        "zh": "也就是说，主循环现在不只是“调模型 -> 执行工具”，而是：",
        "en": "也就是说，主循环现在不只是“调模型 -> 执行工具”，而是：",
        "ja": "目的が違います。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s11_020",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "recovery は query の continuation 理由でもある"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "query transition を説明する状態"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s11_021",
      "name": {
        "zh": "1. 把所有错误都当成一种错误",
        "en": "1. 把所有错误都当成一种错误",
        "ja": "初学者が混ぜやすいポイント"
      },
      "desc": {
        "zh": "1. 把所有错误都当成一种错误",
        "en": "1. 把所有错误都当成一种错误",
        "ja": "初学者が混ぜやすいポイント"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "error"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s11_022",
      "name": {
        "zh": "2. 没有重试预算",
        "en": "2. 没有重试预算",
        "ja": "1. すべての failure に同じ retry をかける"
      },
      "desc": {
        "zh": "没有预算，主循环就可能永远卡在“继续”“继续”“继续”。",
        "en": "没有预算，主循环就可能永远卡在“继续”“继续”“继续”。",
        "ja": "truncation と transport error は同じ問題ではありません。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s11_023",
      "name": {
        "zh": "3. 续写提示写得太模糊",
        "en": "3. 续写提示写得太模糊",
        "ja": "2. retry budget を持たない"
      },
      "desc": {
        "zh": "只写一个“continue”通常不够。",
        "en": "只写一个“continue”通常不够。",
        "ja": "無限 loop の原因になります。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "prompt"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s11_024",
      "name": {
        "zh": "4. 压缩后没有告诉模型“这是续场”",
        "en": "4. 压缩后没有告诉模型“这是续场”",
        "ja": "3. compact と recovery を 1 つの話にしてしまう"
      },
      "desc": {
        "zh": "如果压缩后只给一份摘要，不告诉模型“这是前文摘要”，模型很可能重新向用户提问。",
        "en": "如果压缩后只给一份摘要，不告诉模型“这是前文摘要”，模型很可能重新向用户提问。",
        "ja": "context hygiene と failure recovery は目的が違います。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s11_025",
      "name": {
        "zh": "5. 恢复过程完全没有日志",
        "en": "5. 恢复过程完全没有日志",
        "ja": "4. continuation message を曖昧にする"
      },
      "desc": {
        "zh": "教学系统最好打印类似：",
        "en": "教学系统最好打印类似：",
        "ja": "「続けて」だけでは model が restart / repeat しやすいです。"
      },
      "rarity": "N",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "error"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s11_026",
      "name": {
        "zh": "这一章和前后章节怎么衔接",
        "en": "这一章和前后章节怎么衔接",
        "ja": "5. なぜ続行しているのかを state に残さない"
      },
      "desc": {
        "zh": "把 agent 从“能跑”推进到“遇到问题也能继续跑”。",
        "en": "把 agent 从“能跑”推进到“遇到问题也能继续跑”。",
        "ja": "debug も teaching も急に難しくなります。"
      },
      "rarity": "R",
      "region": "tools",
      "chapter": "s11",
      "tags": [
        "agent"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s12_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "問題"
      },
      "desc": {
        "zh": "把“会话里的 todo”升级成“可持久化的任务图”。",
        "en": "Back in s03 you gave the agent a TodoWrite tool -- a flat...",
        "ja": "s03のTodoManagerはメモリ上のフラットなチェックリストに過ぎない: 順序なし、依存関係なし、ステータス..."
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 84,
      "defense": 74
    },
    {
      "id": "card_s12_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "主線とどう併読するか"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Imagine you ask your agent to refactor a codebase: parse ...",
        "ja": "主線とどう併読するか"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s12_003",
      "name": {
        "zh": "先把几个词讲明白",
        "en": "The Solution",
        "ja": "解決策"
      },
      "desc": {
        "zh": "先把几个词讲明白",
        "en": "Promote the checklist into a task graph persisted to disk...",
        "ja": "タスクグラフ"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s12_004",
      "name": {
        "zh": "什么是任务",
        "en": "How It Works",
        "ja": "仕組み"
      },
      "desc": {
        "zh": "这里的 `task` 指的是：",
        "en": "Step 1.",
        "ja": "TaskManager"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s12_005",
      "name": {
        "zh": "什么是依赖",
        "en": "Read Together",
        "ja": "s06からの変更点"
      },
      "desc": {
        "zh": "什么是依赖",
        "en": "Read Together",
        "ja": "s06からの変更点"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s12_006",
      "name": {
        "zh": "什么是任务图",
        "en": "What Changed",
        "ja": "試してみる"
      },
      "desc": {
        "zh": "什么是任务图",
        "en": "What Changed",
        "ja": "cd learn-claude-code"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s12_007",
      "name": {
        "zh": "什么是 ready",
        "en": "Try It",
        "ja": "教学上の境界"
      },
      "desc": {
        "zh": "`ready` 的意思很简单：",
        "en": "cd learn-claude-code",
        "ja": "このリポジトリで本当に重要なのは、完全な製品向け保存層の再現ではありません。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s12_008",
      "name": {
        "zh": "最小心智模型",
        "en": "What You've Mastered",
        "ja": "最小心智模型"
      },
      "desc": {
        "zh": "本章最重要的，不是复杂调度算法，而是先回答 4 个问题：",
        "en": "At this point, you can:",
        "ja": "本章最重要的，不是复杂调度算法，而是先回答 4 个问题："
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s12_009",
      "name": {
        "zh": "关键数据结构",
        "en": "What's Next",
        "ja": "关键数据结构"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "Tasks now have structure and live on disk. But every tool...",
        "ja": "关键数据结构"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s12_010",
      "name": {
        "zh": "1. TaskRecord",
        "en": "Key Takeaway",
        "ja": "1. TaskRecord"
      },
      "desc": {
        "zh": "\"subject\": \"Write parser\",",
        "en": "Key Takeaway",
        "ja": "\"subject\": \"Write parser\","
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_s12_011",
      "name": {
        "zh": "2. TaskStatus",
        "en": "2. TaskStatus",
        "ja": "2. TaskStatus"
      },
      "desc": {
        "zh": "教学版先只保留最少 4 个状态：",
        "en": "教学版先只保留最少 4 个状态：",
        "ja": "教学版先只保留最少 4 个状态："
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_s12_012",
      "name": {
        "zh": "3. Ready Rule",
        "en": "3. Ready Rule",
        "ja": "3. Ready Rule"
      },
      "desc": {
        "zh": "任务系统的核心不是“保存清单”，而是“判断什么时候能开工”。",
        "en": "任务系统的核心不是“保存清单”，而是“判断什么时候能开工”。",
        "ja": "任务系统的核心不是“保存清单”，而是“判断什么时候能开工”。"
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 77,
      "defense": 67
    },
    {
      "id": "card_s12_013",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小实现"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小实现"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s12_014",
      "name": {
        "zh": "第一步：让任务落盘",
        "en": "第一步：让任务落盘",
        "ja": "第一步：让任务落盘"
      },
      "desc": {
        "zh": "不要只把任务放在 `messages` 里。",
        "en": "不要只把任务放在 `messages` 里。",
        "ja": "不要只把任务放在 `messages` 里。"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_s12_015",
      "name": {
        "zh": "第二步：把依赖关系写成双向",
        "en": "第二步：把依赖关系写成双向",
        "ja": "第二步：把依赖关系写成双向"
      },
      "desc": {
        "zh": "如果任务 A 完成后会解锁任务 B，最好同时维护两边：",
        "en": "如果任务 A 完成后会解锁任务 B，最好同时维护两边：",
        "ja": "如果任务 A 完成后会解锁任务 B，最好同时维护两边："
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s12_016",
      "name": {
        "zh": "第三步：完成任务时自动解锁后续任务",
        "en": "第三步：完成任务时自动解锁后续任务",
        "ja": "第三步：完成任务时自动解锁后续任务"
      },
      "desc": {
        "zh": "任务系统不是静态记录表，而是会随着完成事件自动推进的工作图。",
        "en": "任务系统不是静态记录表，而是会随着完成事件自动推进的工作图。",
        "ja": "任务系统不是静态记录表，而是会随着完成事件自动推进的工作图。"
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 80,
      "defense": 70
    },
    {
      "id": "card_s12_017",
      "name": {
        "zh": "第四步：把任务工具接给模型",
        "en": "第四步：把任务工具接给模型",
        "ja": "第四步：把任务工具接给模型"
      },
      "desc": {
        "zh": "教学版最小工具集建议先只做这 4 个：",
        "en": "教学版最小工具集建议先只做这 4 个：",
        "ja": "教学版最小工具集建议先只做这 4 个："
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "tool",
        "task"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s12_018",
      "name": {
        "zh": "如何接到主循环里",
        "en": "如何接到主循环里",
        "ja": "如何接到主循环里"
      },
      "desc": {
        "zh": "todo 更像本轮计划，task 更像长期工作板。",
        "en": "todo 更像本轮计划，task 更像长期工作板。",
        "ja": "todo 更像本轮计划，task 更像长期工作板。"
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "loop",
        "task"
      ],
      "power": 81,
      "defense": 71
    },
    {
      "id": "card_s12_019",
      "name": {
        "zh": "这一章和 s03、s13 的边界",
        "en": "这一章和 s03、s13 的边界",
        "ja": "这一章和 s03、s13 的边界"
      },
      "desc": {
        "zh": "这一层边界必须讲清楚，不然后面一定会混。",
        "en": "这一层边界必须讲清楚，不然后面一定会混。",
        "ja": "这一层边界必须讲清楚，不然后面一定会混。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s12_020",
      "name": {
        "zh": "和 `s03` 的区别",
        "en": "和 `s03` 的区别",
        "ja": "和 `s03` 的区别"
      },
      "desc": {
        "zh": "如果只是“先看文件，再改代码，再跑测试”，todo 往往就够。",
        "en": "如果只是“先看文件，再改代码，再跑测试”，todo 往往就够。",
        "ja": "如果只是“先看文件，再改代码，再跑测试”，todo 往往就够。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s12_021",
      "name": {
        "zh": "和 `s13` 的区别",
        "en": "和 `s13` 的区别",
        "ja": "和 `s13` 的区别"
      },
      "desc": {
        "zh": "本章的 `task` 指的是：",
        "en": "本章的 `task` 指的是：",
        "ja": "本章的 `task` 指的是："
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s12_022",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s12_023",
      "name": {
        "zh": "1. 只会创建任务，不会维护依赖",
        "en": "1. 只会创建任务，不会维护依赖",
        "ja": "1. 只会创建任务，不会维护依赖"
      },
      "desc": {
        "zh": "那最后得到的还是一张普通清单，不是任务图。",
        "en": "那最后得到的还是一张普通清单，不是任务图。",
        "ja": "那最后得到的还是一张普通清单，不是任务图。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s12_024",
      "name": {
        "zh": "2. 任务只放内存，不落盘",
        "en": "2. 任务只放内存，不落盘",
        "ja": "2. 任务只放内存，不落盘"
      },
      "desc": {
        "zh": "系统一重启，整个工作结构就没了。",
        "en": "系统一重启，整个工作结构就没了。",
        "ja": "系统一重启，整个工作结构就没了。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s12_025",
      "name": {
        "zh": "3. 完成任务后不自动解锁后续任务",
        "en": "3. 完成任务后不自动解锁后续任务",
        "ja": "3. 完成任务后不自动解锁后续任务"
      },
      "desc": {
        "zh": "这样系统永远不知道下一步谁可以开工。",
        "en": "这样系统永远不知道下一步谁可以开工。",
        "ja": "这样系统永远不知道下一步谁可以开工。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "task"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s12_026",
      "name": {
        "zh": "4. 把工作目标和运行中的执行混成一层",
        "en": "4. 把工作目标和运行中的执行混成一层",
        "ja": "4. 把工作目标和运行中的执行混成一层"
      },
      "desc": {
        "zh": "这会导致后面 `s13` 的后台任务系统很难讲清。",
        "en": "这会导致后面 `s13` 的后台任务系统很难讲清。",
        "ja": "这会导致后面 `s13` 的后台任务系统很难讲清。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s12_027",
      "name": {
        "zh": "学完这一章，你应该真正掌握什么",
        "en": "学完这一章，你应该真正掌握什么",
        "ja": "学完这一章，你应该真正掌握什么"
      },
      "desc": {
        "zh": "学完以后，你应该能独立说清这几件事：",
        "en": "学完以后，你应该能独立说清这几件事：",
        "ja": "学完以后，你应该能独立说清这几件事："
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s12_028",
      "name": {
        "zh": "下一章学什么",
        "en": "下一章学什么",
        "ja": "下一章学什么"
      },
      "desc": {
        "zh": "下一章 `s13` 要解决的是：",
        "en": "下一章 `s13` 要解决的是：",
        "ja": "下一章 `s13` 要解决的是："
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s12",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s13_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解く問題"
      },
      "desc": {
        "zh": "把“慢执行”移到后台，让主循环继续推进别的事情。",
        "en": "You have a task graph now, and every task can express wha...",
        "ja": "遅い実行を background へ逃がし、main loop は次の仕事へ進めるようにすること"
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "loop"
      ],
      "power": 75,
      "defense": 65
    },
    {
      "id": "card_s13_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "併読すると楽になる資料"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Consider a realistic workflow: the user asks the agent to...",
        "ja": "併読すると楽になる資料"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s13_003",
      "name": {
        "zh": "先把几个词讲明白",
        "en": "The Solution",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先把几个词讲明白",
        "en": "Keep the main loop single-threaded, but run slow subproce...",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s13_004",
      "name": {
        "zh": "什么叫前台",
        "en": "How It Works",
        "ja": "foreground とは何か"
      },
      "desc": {
        "zh": "什么叫前台",
        "en": "Step 1.",
        "ja": "ここで言う foreground は、"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s13_005",
      "name": {
        "zh": "什么叫后台",
        "en": "Read Together",
        "ja": "background とは何か"
      },
      "desc": {
        "zh": "什么叫后台",
        "en": "Read Together",
        "ja": "background は謎の裏世界ではありません。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s13_006",
      "name": {
        "zh": "什么叫通知队列",
        "en": "What Changed",
        "ja": "通知キューとは何か"
      },
      "desc": {
        "zh": "通知队列就是一条“稍后再告诉主循环”的收件箱。",
        "en": "What Changed",
        "ja": "background task が終わっても、その完全な出力をいきなり model へ丸ごと押し込む必要はありません。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s13_007",
      "name": {
        "zh": "最小心智模型",
        "en": "Try It",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "主循环仍然只有一条，并行的是等待，不是主循环本身。",
        "en": "cd learn-claude-code",
        "ja": "並行になるのは実行と待機であって、main loop 自体が増えるわけではありません。"
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "loop"
      ],
      "power": 80,
      "defense": 70
    },
    {
      "id": "card_s13_008",
      "name": {
        "zh": "关键数据结构",
        "en": "What You've Mastered",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "At this point, you can:",
        "ja": "この章の核になるデータ構造"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s13_009",
      "name": {
        "zh": "1. RuntimeTaskRecord",
        "en": "What's Next",
        "ja": "1. RuntimeTaskRecord"
      },
      "desc": {
        "zh": "\"id\": \"a1b2c3d4\",",
        "en": "Background tasks solve the problem of slow work that star...",
        "ja": "この章で扱う background task は durable task board の task とは別物です。"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "task"
      ],
      "power": 53,
      "defense": 43
    },
    {
      "id": "card_s13_010",
      "name": {
        "zh": "2. Notification",
        "en": "Key Takeaway",
        "ja": "2. Notification"
      },
      "desc": {
        "zh": "notification = {",
        "en": "Key Takeaway",
        "ja": "background result はまず notification queue に入ります。"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_s13_011",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s13_012",
      "name": {
        "zh": "第一步：登记后台任务",
        "en": "第一步：登记后台任务",
        "ja": "第 1 段階: background manager を持つ"
      },
      "desc": {
        "zh": "class BackgroundManager:",
        "en": "class BackgroundManager:",
        "ja": "最低限必要なのは次の 2 つの状態です。"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "task"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s13_013",
      "name": {
        "zh": "第二步：启动后台执行线",
        "en": "第二步：启动后台执行线",
        "ja": "第 2 段階: `run()` はすぐ返す"
      },
      "desc": {
        "zh": "主循环拿到 `task_id` 后就可以先继续往前走。",
        "en": "主循环拿到 `task_id` 后就可以先继续往前走。",
        "ja": "main loop が結果ではなく `task_id` を受け取り、先に進める"
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "loop",
        "task"
      ],
      "power": 71,
      "defense": 61
    },
    {
      "id": "card_s13_014",
      "name": {
        "zh": "第三步：完成后写通知",
        "en": "第三步：完成后写通知",
        "ja": "第 3 段階: subprocess が終わったら notification を積む"
      },
      "desc": {
        "zh": "后台执行负责产出结果，通知队列负责把结果送回主循环。",
        "en": "后台执行负责产出结果，通知队列负责把结果送回主循环。",
        "ja": "def _execute(self, task_id: str, command: str):"
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "loop"
      ],
      "power": 82,
      "defense": 72
    },
    {
      "id": "card_s13_015",
      "name": {
        "zh": "第四步：下一轮前排空通知",
        "en": "第四步：下一轮前排空通知",
        "ja": "第 4 段階: 次の model call 前に queue を drain する"
      },
      "desc": {
        "zh": "def before_model_call(messages: list):",
        "en": "def before_model_call(messages: list):",
        "ja": "次の model call の入口でまとめて注入される"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s13_016",
      "name": {
        "zh": "为什么完整输出不要直接塞回 prompt",
        "en": "为什么完整输出不要直接塞回 prompt",
        "ja": "第 5 段階: preview と full output を分ける"
      },
      "desc": {
        "zh": "通知负责提醒，文件负责存原文。",
        "en": "通知负责提醒，文件负责存原文。",
        "ja": "教材コードでは `result_preview` と `output_file` を分けています。"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "prompt"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s13_017",
      "name": {
        "zh": "如何接到主循环里",
        "en": "如何接到主循环里",
        "ja": "第 6 段階: stalled task も見られるようにする"
      },
      "desc": {
        "zh": "从 `s13` 开始，主循环多出一个标准前置步骤：",
        "en": "从 `s13` 开始，主循环多出一个标准前置步骤：",
        "ja": "background 化したら「開始したまま返ってこないもの」を見張る観点が必要になる"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "loop"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s13_018",
      "name": {
        "zh": "这一章和任务系统的边界",
        "en": "这一章和任务系统的边界",
        "ja": "これは task board の task とは違う"
      },
      "desc": {
        "zh": "这是本章最容易和 `s12` 混掉的地方。",
        "en": "这是本章最容易和 `s12` 混掉的地方。",
        "ja": "ここは混ざりやすいので強調します。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "task"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s13_019",
      "name": {
        "zh": "`s12` 的 task 是什么",
        "en": "`s12` 的 task 是什么",
        "ja": "前の章とどうつながるか"
      },
      "desc": {
        "zh": "`s12` 里的 `task` 是：",
        "en": "`s12` 里的 `task` 是：",
        "ja": "goal と runtime slot を分けて見る癖"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "task"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s13_020",
      "name": {
        "zh": "`s13` 的 background task 是什么",
        "en": "`s13` 的 background task 是什么",
        "ja": "初学者が混ぜやすいポイント"
      },
      "desc": {
        "zh": "两者相关，但不是同一个东西。",
        "en": "两者相关，但不是同一个东西。",
        "ja": "初学者が混ぜやすいポイント"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "task"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s13_021",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "1. background execution を「もう 1 本の main loop」と考える"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "実際に増えているのは subprocess waiting lane であって、main conversation..."
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s13_022",
      "name": {
        "zh": "1. 以为“后台”就是更复杂的主循环",
        "en": "1. 以为“后台”就是更复杂的主循环",
        "ja": "2. result を queue ではなく即座に messages へ乱暴に書き込む"
      },
      "desc": {
        "zh": "主循环仍然尽量保持单主线。",
        "en": "主循环仍然尽量保持单主线。",
        "ja": "これでは model input の入口が分散し、system の流れが追いにくくなります。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "loop"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s13_023",
      "name": {
        "zh": "2. 只开线程，不登记状态",
        "en": "2. 只开线程，不登记状态",
        "ja": "3. full output と preview を分けない"
      },
      "desc": {
        "zh": "这样任务一多，你根本不知道：",
        "en": "这样任务一多，你根本不知道：",
        "ja": "長い log で context がすぐあふれます。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s13_024",
      "name": {
        "zh": "3. 把长日志全文塞进上下文",
        "en": "3. 把长日志全文塞进上下文",
        "ja": "4. runtime task と durable task を同一視する"
      },
      "desc": {
        "zh": "上下文很快就会被撑爆。",
        "en": "上下文很快就会被撑爆。",
        "ja": "「いま走っている command」と「長く残る work goal」は別物です。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "context"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s13_025",
      "name": {
        "zh": "4. 把 `s12` 的工作目标和本章的运行任务混为一谈",
        "en": "4. 把 `s12` 的工作目标和本章的运行任务混为一谈",
        "ja": "5. queue 操作に lock を使わない"
      },
      "desc": {
        "zh": "这会让后面多 agent 和调度章节全部打结。",
        "en": "这会让后面多 agent 和调度章节全部打结。",
        "ja": "background thread と main loop の競合で状態が壊れやすくなります。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "task"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s13_026",
      "name": {
        "zh": "学完这一章，你应该真正掌握什么",
        "en": "学完这一章，你应该真正掌握什么",
        "ja": "6. timeout / error を `completed` と同じように扱う"
      },
      "desc": {
        "zh": "学完以后，你应该能独立复述下面几句话：",
        "en": "学完以后，你应该能独立复述下面几句话：",
        "ja": "戻すべき情報は同じではありません。終了理由は explicit に残すべきです。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s13_027",
      "name": {
        "zh": "下一章学什么",
        "en": "下一章学什么",
        "ja": "教学上の境界"
      },
      "desc": {
        "zh": "下一章 `s14` 要解决的是：",
        "en": "下一章 `s14` 要解决的是：",
        "ja": "この章でまず理解すべき中心は、製品用の完全な async runtime ではありません。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s13",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s14_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解決する問題"
      },
      "desc": {
        "zh": "把一条未来要执行的意图，先记下来，等时间到了再触发。",
        "en": "In s13 you learned to run slow work in the background so ...",
        "ja": "未来の意図を今記録して、時刻が来たら新しい仕事として戻す"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 52,
      "defense": 42
    },
    {
      "id": "card_s14_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "教学上の境界"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Your agent can now manage a task graph and run commands i...",
        "ja": "schedule record が通知になり、通知が主ループへ戻る流れ"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s14_003",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Solution",
        "ja": "主線とどう併読するか"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Add three moving parts: schedule records that describe wh...",
        "ja": "主線とどう併読するか"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s14_004",
      "name": {
        "zh": "什么是调度器",
        "en": "How It Works",
        "ja": "最小の心智モデル"
      },
      "desc": {
        "zh": "调度器，就是一段专门负责“看时间、查任务、决定是否触发”的代码。",
        "en": "Step 1.",
        "ja": "scheduler 自体は第二の agent ではない"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s14_005",
      "name": {
        "zh": "什么是 cron 表达式",
        "en": "Read Together",
        "ja": "重要なデータ構造"
      },
      "desc": {
        "zh": "`cron` 是一种很常见的定时写法。",
        "en": "Read Together",
        "ja": "重要なデータ構造"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_s14_006",
      "name": {
        "zh": "什么是持久化调度",
        "en": "What Changed",
        "ja": "1. schedule record"
      },
      "desc": {
        "zh": "什么是持久化调度",
        "en": "What Changed",
        "ja": "schedule = {"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s14_007",
      "name": {
        "zh": "最小心智模型",
        "en": "Try It",
        "ja": "2. scheduled notification"
      },
      "desc": {
        "zh": "定时调度并不是另一套 agent。它最终还是回到同一条主循环。",
        "en": "cd learn-claude-code",
        "ja": "\"type\": \"scheduled_prompt\","
      },
      "rarity": "SR",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "loop",
        "agent"
      ],
      "power": 71,
      "defense": 61
    },
    {
      "id": "card_s14_008",
      "name": {
        "zh": "关键数据结构",
        "en": "What You've Mastered",
        "ja": "3. check interval"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "At this point, you can:",
        "ja": "教学版なら分単位で十分です。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s14_009",
      "name": {
        "zh": "1. ScheduleRecord",
        "en": "Stage 3 Complete",
        "ja": "最小実装"
      },
      "desc": {
        "zh": "schedule = {",
        "en": "s12",
        "ja": "def create(self, cron_expr: str, prompt: str, recurring: ..."
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s14_010",
      "name": {
        "zh": "2. 调度通知",
        "en": "Key Takeaway",
        "ja": "なぜ `s13` の後なのか"
      },
      "desc": {
        "zh": "\"type\": \"scheduled_prompt\",",
        "en": "Key Takeaway",
        "ja": "この 2 章は近い問いを扱います。"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s14_011",
      "name": {
        "zh": "3. 检查周期",
        "en": "3. 检查周期",
        "ja": "初学者がやりがちな間違い"
      },
      "desc": {
        "zh": "教学版建议先按“分钟级”思考，而不是“秒级严格精度”。",
        "en": "教学版建议先按“分钟级”思考，而不是“秒级严格精度”。",
        "ja": "初学者がやりがちな間違い"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s14_012",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "1. cron 構文だけに意識を取られる"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "1. cron 構文だけに意識を取られる"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s14_013",
      "name": {
        "zh": "第一步：允许创建一条调度记录",
        "en": "第一步：允许创建一条调度记录",
        "ja": "2. `last_fired_at` を持たない"
      },
      "desc": {
        "zh": "def create(self, cron_expr: str, prompt: str, recurring: ...",
        "en": "def create(self, cron_expr: str, prompt: str, recurring: ...",
        "ja": "2. `last_fired_at` を持たない"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 52,
      "defense": 42
    },
    {
      "id": "card_s14_014",
      "name": {
        "zh": "第二步：写一个定时检查循环",
        "en": "第二步：写一个定时检查循环",
        "ja": "3. スケジュールをメモリにしか置かない"
      },
      "desc": {
        "zh": "def check_loop(self):",
        "en": "def check_loop(self):",
        "ja": "3. スケジュールをメモリにしか置かない"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "loop"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s14_015",
      "name": {
        "zh": "第三步：时间到了就发通知",
        "en": "第三步：时间到了就发通知",
        "ja": "4. 未来トリガーの仕事を裏で黙って全部実行する"
      },
      "desc": {
        "zh": "def check_jobs(self, now):",
        "en": "def check_jobs(self, now):",
        "ja": "より分かりやすい主線は:"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s14_016",
      "name": {
        "zh": "第四步：主循环像处理后台通知一样处理定时通知",
        "en": "第四步：主循环像处理后台通知一样处理定时通知",
        "ja": "Try It"
      },
      "desc": {
        "zh": "notifications = scheduler.drain()",
        "en": "notifications = scheduler.drain()",
        "ja": "cd learn-claude-code"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "loop"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s14_017",
      "name": {
        "zh": "为什么这章放在后台任务之后",
        "en": "为什么这章放在后台任务之后",
        "ja": "为什么这章放在后台任务之后"
      },
      "desc": {
        "zh": "因为这两章解决的问题很接近，但不是同一件事。",
        "en": "因为这两章解决的问题很接近，但不是同一件事。",
        "ja": "因为这两章解决的问题很接近，但不是同一件事。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "task"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s14_018",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者最容易犯的错"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s14_019",
      "name": {
        "zh": "1. 一上来沉迷 cron 语法细节",
        "en": "1. 一上来沉迷 cron 语法细节",
        "ja": "1. 一上来沉迷 cron 语法细节"
      },
      "desc": {
        "zh": "调度记录如何进入通知队列，又如何回到主循环。",
        "en": "调度记录如何进入通知队列，又如何回到主循环。",
        "ja": "调度记录如何进入通知队列，又如何回到主循环。"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "loop"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s14_020",
      "name": {
        "zh": "2. 没有 `last_fired_at`",
        "en": "2. 没有 `last_fired_at`",
        "ja": "2. 没有 `last_fired_at`"
      },
      "desc": {
        "zh": "没有这个字段，系统很容易在短时间内重复触发同一条任务。",
        "en": "没有这个字段，系统很容易在短时间内重复触发同一条任务。",
        "ja": "没有这个字段，系统很容易在短时间内重复触发同一条任务。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s14_021",
      "name": {
        "zh": "3. 只放内存，不支持落盘",
        "en": "3. 只放内存，不支持落盘",
        "ja": "3. 只放内存，不支持落盘"
      },
      "desc": {
        "zh": "如果用户希望“明天再提醒我”，程序一重启就没了，这就不是真正的调度。",
        "en": "如果用户希望“明天再提醒我”，程序一重启就没了，这就不是真正的调度。",
        "ja": "如果用户希望“明天再提醒我”，程序一重启就没了，这就不是真正的调度。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s14_022",
      "name": {
        "zh": "4. 把调度触发结果直接在后台默默执行",
        "en": "4. 把调度触发结果直接在后台默默执行",
        "ja": "4. 把调度触发结果直接在后台默默执行"
      },
      "desc": {
        "zh": "教学主线里更清楚的做法是：",
        "en": "教学主线里更清楚的做法是：",
        "ja": "教学主线里更清楚的做法是："
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s14_023",
      "name": {
        "zh": "5. 误以为定时任务必须绝对准点",
        "en": "5. 误以为定时任务必须绝对准点",
        "ja": "5. 误以为定时任务必须绝对准点"
      },
      "desc": {
        "zh": "很多初学者会把调度想成秒表。",
        "en": "很多初学者会把调度想成秒表。",
        "ja": "很多初学者会把调度想成秒表。"
      },
      "rarity": "N",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "task"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s14_024",
      "name": {
        "zh": "如何接到整个系统里",
        "en": "如何接到整个系统里",
        "ja": "如何接到整个系统里"
      },
      "desc": {
        "zh": "都走通知队列，再在下一次模型调用前统一注入。",
        "en": "都走通知队列，再在下一次模型调用前统一注入。",
        "ja": "都走通知队列，再在下一次模型调用前统一注入。"
      },
      "rarity": "R",
      "region": "runtime",
      "chapter": "s14",
      "tags": [
        "concept"
      ],
      "power": 52,
      "defense": 42
    },
    {
      "id": "card_s15_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が本当に解きたい問題"
      },
      "desc": {
        "zh": "一批有身份、能长期存在、能反复协作的队友。",
        "en": "Sometimes one agent is not enough. A complex project -- s...",
        "ja": "名前・役割・inbox・状態を持った、長期的に存在する実行者の集まり"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 75,
      "defense": 65
    },
    {
      "id": "card_s15_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "併読のすすめ"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Subagents from s04 are disposable: you spawn one, it work...",
        "ja": "併読のすすめ"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_s15_003",
      "name": {
        "zh": "先把几个词讲明白",
        "en": "The Solution",
        "ja": "まず用語をはっきり分ける"
      },
      "desc": {
        "zh": "先把几个词讲明白",
        "en": "The harness maintains a team roster in a shared config fi...",
        "ja": "まず用語をはっきり分ける"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s15_004",
      "name": {
        "zh": "什么是队友",
        "en": "How It Works",
        "ja": "teammate とは何か"
      },
      "desc": {
        "zh": "这里的 `teammate` 指的是：",
        "en": "Step 1.",
        "ja": "持続する actor"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s15_005",
      "name": {
        "zh": "什么是名册",
        "en": "Read Together",
        "ja": "roster とは何か"
      },
      "desc": {
        "zh": "名册就是团队成员列表。",
        "en": "Read Together",
        "ja": "`roster` は team member の名簿です。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s15_006",
      "name": {
        "zh": "什么是邮箱",
        "en": "How It Plugs Into The Earlier System",
        "ja": "mailbox とは何か"
      },
      "desc": {
        "zh": "邮箱就是每个队友的收件箱。",
        "en": "This chapter is not just \"more model calls.\" It adds dura...",
        "ja": "`mailbox` は各 teammate が持つ受信箱です。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s15_007",
      "name": {
        "zh": "最小心智模型",
        "en": "Teammate vs Subagent vs Runtime Slot",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "subagent 是一次性执行单元，teammate 是长期存在的协作成员。",
        "en": "Teammate vs Subagent vs Runtime Slot",
        "ja": "この章をいちばん壊れにくく理解する方法は、各 teammate を次のように見ることです。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "agent"
      ],
      "power": 74,
      "defense": 64
    },
    {
      "id": "card_s15_008",
      "name": {
        "zh": "关键数据结构",
        "en": "What Changed From s14",
        "ja": "それまでの章にどう接続するか"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "What Changed From s14",
        "ja": "長く残る実行者層"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s15_009",
      "name": {
        "zh": "1. TeamMember",
        "en": "Try It",
        "ja": "主要データ構造"
      },
      "desc": {
        "zh": "\"name\": \"alice\",",
        "en": "cd learn-claude-code",
        "ja": "主要データ構造"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s15_010",
      "name": {
        "zh": "2. TeamConfig",
        "en": "What You've Mastered",
        "ja": "`TeamMember`"
      },
      "desc": {
        "zh": "\"team_name\": \"default\",",
        "en": "At this point, you can:",
        "ja": "\"name\": \"alice\","
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s15_011",
      "name": {
        "zh": "3. MessageEnvelope",
        "en": "What's Next",
        "ja": "`TeamConfig`"
      },
      "desc": {
        "zh": "message = {",
        "en": "Your teammates can now communicate freely, but they lack ...",
        "ja": "\"team_name\": \"default\","
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 53,
      "defense": 43
    },
    {
      "id": "card_s15_012",
      "name": {
        "zh": "最小实现",
        "en": "Key Takeaway",
        "ja": "`MessageEnvelope`"
      },
      "desc": {
        "zh": "最小实现",
        "en": "Key Takeaway",
        "ja": "message = {"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s15_013",
      "name": {
        "zh": "第一步：先有一份队伍名册",
        "en": "第一步：先有一份队伍名册",
        "ja": "最小実装の進め方"
      },
      "desc": {
        "zh": "class TeammateManager:",
        "en": "class TeammateManager:",
        "ja": "最小実装の進め方"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s15_014",
      "name": {
        "zh": "第二步：spawn 一个持久队友",
        "en": "第二步：spawn 一个持久队友",
        "ja": "Step 1: まず roster を持つ"
      },
      "desc": {
        "zh": "队友一旦被创建，就不只是一次性工具调用，而是一个有持续生命周期的成员。",
        "en": "队友一旦被创建，就不只是一次性工具调用，而是一个有持续生命周期的成员。",
        "ja": "class TeammateManager:"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "tool"
      ],
      "power": 73,
      "defense": 63
    },
    {
      "id": "card_s15_015",
      "name": {
        "zh": "第三步：给每个队友一个邮箱",
        "en": "第三步：给每个队友一个邮箱",
        "ja": "Step 2: teammate を spawn する"
      },
      "desc": {
        "zh": "教学版最简单的做法可以直接用 JSONL 文件：",
        "en": "教学版最简单的做法可以直接用 JSONL 文件：",
        "ja": "一度 spawn された teammate は、一回限りの tool call ではなく、継続する lifecycle を持つ"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 50,
      "defense": 40
    },
    {
      "id": "card_s15_016",
      "name": {
        "zh": "第四步：队友每轮先看邮箱，再继续工作",
        "en": "第四步：队友每轮先看邮箱，再继续工作",
        "ja": "Step 3: 各 teammate に mailbox を持たせる"
      },
      "desc": {
        "zh": "队友不是靠“被重新创建”来获得新任务，而是靠“下一轮先检查邮箱”来接收新工作。",
        "en": "队友不是靠“被重新创建”来获得新任务，而是靠“下一轮先检查邮箱”来接收新工作。",
        "ja": "協調は shared `messages[]` ではなく、mailbox boundary を通して起こる"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "task"
      ],
      "power": 82,
      "defense": 72
    },
    {
      "id": "card_s15_017",
      "name": {
        "zh": "如何接到前面章节的系统里",
        "en": "如何接到前面章节的系统里",
        "ja": "Step 4: teammate は毎ラウンド mailbox を先に確認する"
      },
      "desc": {
        "zh": "这章最容易出现的误解是：",
        "en": "这章最容易出现的误解是：",
        "ja": "def teammate_loop(name: str, role: str, prompt: str):"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s15_018",
      "name": {
        "zh": "Teammate、Subagent、Runtime Task 到底怎么区分",
        "en": "Teammate、Subagent、Runtime Task 到底怎么区分",
        "ja": "Teammate / Subagent / Runtime Slot をどう分けるか"
      },
      "desc": {
        "zh": "这是这一组章节里最容易混的点。",
        "en": "这是这一组章节里最容易混的点。",
        "ja": "この段階で最も混ざりやすいのはこの 3 つです。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "agent",
        "task"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s15_019",
      "name": {
        "zh": "第一层：结构化协议",
        "en": "第一层：结构化协议",
        "ja": "ここで教えるべき境界"
      },
      "desc": {
        "zh": "这部分放到下一章 `s16`。",
        "en": "这部分放到下一章 `s16`。",
        "ja": "この章でまず固めるべきは 3 つだけです。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "mcp"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s15_020",
      "name": {
        "zh": "第二层：自治认领",
        "en": "第二层：自治认领",
        "ja": "1. protocol request layer"
      },
      "desc": {
        "zh": "这部分放到 `s17`。",
        "en": "这部分放到 `s17`。",
        "ja": "これは `s16` の範囲です。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s15_021",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "2. autonomous claim layer"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "これは `s17` の範囲です。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s15_022",
      "name": {
        "zh": "1. 把队友当成“名字不同的 subagent”",
        "en": "1. 把队友当成“名字不同的 subagent”",
        "ja": "初学者が特によくやる間違い"
      },
      "desc": {
        "zh": "如果生命周期还是“执行完就销毁”，那本质上还不是 teammate。",
        "en": "如果生命周期还是“执行完就销毁”，那本质上还不是 teammate。",
        "ja": "初学者が特によくやる間違い"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "agent"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s15_023",
      "name": {
        "zh": "2. 队友之间共用同一份 messages",
        "en": "2. 队友之间共用同一份 messages",
        "ja": "1. teammate を「名前付き subagent」にする"
      },
      "desc": {
        "zh": "这样上下文会互相污染。",
        "en": "这样上下文会互相污染。",
        "ja": "名前が付いていても、実装が"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s15_024",
      "name": {
        "zh": "3. 没有持久名册",
        "en": "3. 没有持久名册",
        "ja": "2. team 全員で 1 本の `messages` を共有する"
      },
      "desc": {
        "zh": "如果系统关掉以后完全不知道“团队里曾经有谁”，那就很难继续做长期协作。",
        "en": "如果系统关掉以后完全不知道“团队里曾经有谁”，那就很难继续做长期协作。",
        "ja": "これは一見簡単ですが、文脈汚染がすぐ起きます。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s15_025",
      "name": {
        "zh": "4. 没有邮箱，靠共享变量直接喊话",
        "en": "4. 没有邮箱，靠共享变量直接喊话",
        "ja": "3. roster を durable にしない"
      },
      "desc": {
        "zh": "教学上不建议一开始就这么做。",
        "en": "教学上不建议一开始就这么做。",
        "ja": "system を止めた瞬間に「team に誰がいたか」を完全に失うなら、長期 actor layer としてはかな..."
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s15_026",
      "name": {
        "zh": "学完这一章，你应该真正掌握什么",
        "en": "学完这一章，你应该真正掌握什么",
        "ja": "4. mailbox なしで shared variable だけで会話させる"
      },
      "desc": {
        "zh": "学完以后，你应该能独立说清下面几件事：",
        "en": "学完以后，你应该能独立说清下面几件事：",
        "ja": "実装は短くできますが、teammate 間協調の境界が見えなくなります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s15_027",
      "name": {
        "zh": "下一章学什么",
        "en": "下一章学什么",
        "ja": "学び終わったら言えるべきこと"
      },
      "desc": {
        "zh": "下一章 `s16` 要解决的是：",
        "en": "下一章 `s16` 要解决的是：",
        "ja": "少なくとも次の 4 つを自分の言葉で説明できれば、この章の主線は掴めています。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s15",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s16_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解く問題"
      },
      "desc": {
        "zh": "一层结构化协议。",
        "en": "In s15 your teammates can send messages freely, but that ...",
        "ja": "追跡可能な request-response protocol"
      },
      "rarity": "SSR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 94,
      "defense": 84
    },
    {
      "id": "card_s16_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "併読すると楽になる資料"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Shutdown.",
        "ja": "併読すると楽になる資料"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 57,
      "defense": 47
    },
    {
      "id": "card_s16_003",
      "name": {
        "zh": "先把几个词讲明白",
        "en": "The Solution",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先把几个词讲明白",
        "en": "Both shutdown and plan approval follow one shape: send a ...",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s16_004",
      "name": {
        "zh": "什么是协议",
        "en": "How It Works",
        "ja": "protocol とは何か"
      },
      "desc": {
        "zh": "什么是协议",
        "en": "Step 1.",
        "ja": "ここでの `protocol` は難しい通信理論ではありません。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s16_005",
      "name": {
        "zh": "什么是 request_id",
        "en": "Read Together",
        "ja": "request_id とは何か"
      },
      "desc": {
        "zh": "`request_id` 就是请求编号。",
        "en": "Read Together",
        "ja": "`request_id` は request の一意な番号です。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s16_006",
      "name": {
        "zh": "什么是请求-响应模式",
        "en": "How It Plugs Into The Team System",
        "ja": "request-response pattern とは何か"
      },
      "desc": {
        "zh": "这个词听起来像高级概念，其实很简单：",
        "en": "The real upgrade in s16 is not \"two new message types.\" I...",
        "ja": "構造化 record として残す"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 70,
      "defense": 60
    },
    {
      "id": "card_s16_007",
      "name": {
        "zh": "最小心智模型",
        "en": "Message vs Protocol vs Request vs Task",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "从教学角度，你可以先把协议看成两层：",
        "en": "Do not collapse them:",
        "ja": "教学上は、protocol を 2 層で見ると分かりやすくなります。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 76,
      "defense": 66
    },
    {
      "id": "card_s16_008",
      "name": {
        "zh": "协议消息",
        "en": "What Changed From s15",
        "ja": "protocol envelope"
      },
      "desc": {
        "zh": "\"type\": \"shutdown_request\",",
        "en": "What Changed From s15",
        "ja": "これは inbox を流れる 1 通の構造化 message です。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 79,
      "defense": 69
    },
    {
      "id": "card_s16_009",
      "name": {
        "zh": "请求追踪表",
        "en": "Try It",
        "ja": "durable request record"
      },
      "desc": {
        "zh": "requests = {",
        "en": "cd learn-claude-code",
        "ja": "これは request の lifecycle を disk に追う record です。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 71,
      "defense": 61
    },
    {
      "id": "card_s16_010",
      "name": {
        "zh": "关键数据结构",
        "en": "What You've Mastered",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "At this point, you can:",
        "ja": "この章の核になるデータ構造"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s16_011",
      "name": {
        "zh": "1. ProtocolEnvelope",
        "en": "What's Next",
        "ja": "1. ProtocolEnvelope"
      },
      "desc": {
        "zh": "message = {",
        "en": "Your team now has structure and rules, but the lead still...",
        "ja": "protocol message は普通の message より多くのメタデータを持ちます。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 79,
      "defense": 69
    },
    {
      "id": "card_s16_012",
      "name": {
        "zh": "2. RequestRecord",
        "en": "Key Takeaway",
        "ja": "2. RequestRecord"
      },
      "desc": {
        "zh": "request = {",
        "en": "Key Takeaway",
        "ja": "request record は `.team/requests/` に durable に保存されます。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 77,
      "defense": 67
    },
    {
      "id": "card_s16_013",
      "name": {
        "zh": "3. 状态机",
        "en": "3. 状态机",
        "ja": "3. 状態機械"
      },
      "desc": {
        "zh": "本章里的状态机非常简单：",
        "en": "本章里的状态机非常简单：",
        "ja": "承認系の協調には「いまどの状態か」を explicit に持つ必要がある"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 73,
      "defense": 63
    },
    {
      "id": "card_s16_014",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s16_015",
      "name": {
        "zh": "协议 1：优雅关机",
        "en": "协议 1：优雅关机",
        "ja": "第 1 段階: team mailbox の上に protocol line を通す"
      },
      "desc": {
        "zh": "“优雅关机”的意思不是直接把线程硬砍掉。",
        "en": "“优雅关机”的意思不是直接把线程硬砍掉。",
        "ja": "この章の本質は新しい message type を 2 個足すことではありません。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 78,
      "defense": 68
    },
    {
      "id": "card_s16_016",
      "name": {
        "zh": "协议 2：计划审批",
        "en": "协议 2：计划审批",
        "ja": "第 2 段階: shutdown protocol を作る"
      },
      "desc": {
        "zh": "本章最重要的不是“关机”或“计划”本身，而是同一个协议模板可以反复复用。",
        "en": "本章最重要的不是“关机”或“计划”本身，而是同一个协议模板可以反复复用。",
        "ja": "graceful shutdown は「thread を即 kill する」ことではありません。"
      },
      "rarity": "SSR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 92,
      "defense": 82
    },
    {
      "id": "card_s16_017",
      "name": {
        "zh": "协议请求不是普通消息",
        "en": "协议请求不是普通消息",
        "ja": "第 3 段階: plan approval も同じ骨格で扱う"
      },
      "desc": {
        "zh": "邮箱里虽然都叫“消息”，但 `s16` 以后其实已经分成两类：",
        "en": "邮箱里虽然都叫“消息”，但 `s16` 以后其实已经分成两类：",
        "ja": "shutdown と plan approval は中身は違っても、request-response correlation の骨格は同じ"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_s16_018",
      "name": {
        "zh": "1. 普通消息",
        "en": "1. 普通消息",
        "ja": "Message / Protocol / Request / Task の境界"
      },
      "desc": {
        "zh": "1. 普通消息",
        "en": "1. 普通消息",
        "ja": "この章で最も混ざりやすい 4 つを表で分けます。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_s16_019",
      "name": {
        "zh": "2. 协议消息",
        "en": "2. 协议消息",
        "ja": "`s15` から何が増えたか"
      },
      "desc": {
        "zh": "2. 协议消息",
        "en": "2. 协议消息",
        "ja": "追跡可能な coordination system"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s16_020",
      "name": {
        "zh": "如何接到团队系统里",
        "en": "如何接到团队系统里",
        "ja": "初学者が混ぜやすいポイント"
      },
      "desc": {
        "zh": "这章真正补上的，不只是两个新工具名，而是一条新的协作回路：",
        "en": "这章真正补上的，不只是两个新工具名，而是一条新的协作回路：",
        "ja": "初学者が混ぜやすいポイント"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 72,
      "defense": 62
    },
    {
      "id": "card_s16_021",
      "name": {
        "zh": "MessageEnvelope、ProtocolEnvelope、RequestRecord、TaskRecord 的边界",
        "en": "MessageEnvelope、ProtocolEnvelope、RequestRecord、TaskRecord 的边界",
        "ja": "1. request を普通の text message と同じように扱う"
      },
      "desc": {
        "zh": "这 4 个对象很容易一起打结。最稳的记法是：",
        "en": "这 4 个对象很容易一起打结。最稳的记法是：",
        "ja": "これでは承認状態を追えません。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp",
        "task"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s16_022",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "2. request_id を持たせない"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "同時に複数 request が走った瞬間に対応関係が壊れます。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 56,
      "defense": 46
    },
    {
      "id": "card_s16_023",
      "name": {
        "zh": "1. 没有 `request_id`",
        "en": "1. 没有 `request_id`",
        "ja": "3. request の状態を memory 内 dict にしか置かない"
      },
      "desc": {
        "zh": "没有编号，多个请求同时存在时很快就会乱。",
        "en": "没有编号，多个请求同时存在时很快就会乱。",
        "ja": "プロセスをまたいで追えず、観測性も悪くなります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s16_024",
      "name": {
        "zh": "2. 收到请求以后只回一句自然语言",
        "en": "2. 收到请求以后只回一句自然语言",
        "ja": "4. approved / rejected を曖昧な文章だけで表す"
      },
      "desc": {
        "zh": "人类可能看得懂，但系统很难稳定处理。",
        "en": "人类可能看得懂，但系统很难稳定处理。",
        "ja": "state machine が読めなくなります。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 73,
      "defense": 63
    },
    {
      "id": "card_s16_025",
      "name": {
        "zh": "3. 没有请求状态表",
        "en": "3. 没有请求状态表",
        "ja": "5. protocol と task を混同する"
      },
      "desc": {
        "zh": "如果系统不记录 `pending` / `approved` / `rejected`，协议其实就没有真正落地。",
        "en": "如果系统不记录 `pending` / `approved` / `rejected`，协议其实就没有真正落地。",
        "ja": "plan approval request は「plan を実行してよいか」の協調であって、work item 本..."
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s16_026",
      "name": {
        "zh": "4. 把协议消息和普通消息混成一种结构",
        "en": "4. 把协议消息和普通消息混成一种结构",
        "ja": "前の章とどうつながるか"
      },
      "desc": {
        "zh": "这样后面一多，处理逻辑会越来越混。",
        "en": "这样后面一多，处理逻辑会越来越混。",
        "ja": "この章は `s15` の mailbox-based team を次の段階へ押し上げます。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "mcp"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s16_027",
      "name": {
        "zh": "学完这一章，你应该真正掌握什么",
        "en": "学完这一章，你应该真正掌握什么",
        "ja": "教学上の境界"
      },
      "desc": {
        "zh": "学完以后，你应该能独立复述下面几件事：",
        "en": "学完以后，你应该能独立复述下面几件事：",
        "ja": "この章でまず教えるべきのは、製品に存在しうる全 protocol の一覧ではありません。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_s16_028",
      "name": {
        "zh": "下一章学什么",
        "en": "下一章学什么",
        "ja": "下一章学什么"
      },
      "desc": {
        "zh": "下一章 `s17` 要解决的是：",
        "en": "下一章 `s17` 要解决的是：",
        "ja": "下一章 `s17` 要解决的是："
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s16",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s17_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解く問題"
      },
      "desc": {
        "zh": "很多事情仍然要靠 lead 手动分配。",
        "en": "Manual assignment does not scale. With ten unclaimed task...",
        "ja": "仕事の割り振りが lead に集中しすぎることです。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "task"
      ],
      "power": 79,
      "defense": 69
    },
    {
      "id": "card_s17_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "併読すると楽になる資料"
      },
      "desc": {
        "zh": "建议联读",
        "en": "In s15-s16, teammates only work when explicitly told to. ...",
        "ja": "併読すると楽になる資料"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s17_003",
      "name": {
        "zh": "先解释几个名词",
        "en": "The Solution",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Each teammate alternates between two phases: WORK (callin...",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s17_004",
      "name": {
        "zh": "什么叫自治",
        "en": "How It Works",
        "ja": "自治とは何か"
      },
      "desc": {
        "zh": "这里的自治，不是完全没人管。",
        "en": "Step 1.",
        "ja": "規則付きの自律再開"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s17_005",
      "name": {
        "zh": "什么叫认领",
        "en": "Read Together",
        "ja": "claim とは何か"
      },
      "desc": {
        "zh": "认领，就是把一条原本没人负责的任务，标记成“现在由我负责”。",
        "en": "Read Together",
        "ja": "owner を書き込み、他の teammate が同じ task を取らないようにする"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s17_006",
      "name": {
        "zh": "什么叫空闲阶段",
        "en": "What Changed From s16",
        "ja": "idle とは何か"
      },
      "desc": {
        "zh": "空闲阶段不是关机，也不是消失。",
        "en": "What Changed From s16",
        "ja": "`idle` は終了でも停止でもありません。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s17_007",
      "name": {
        "zh": "最小心智模型",
        "en": "Try It",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "空闲时，按规则检查两类新输入：邮箱和任务板。",
        "en": "cd learn-claude-code",
        "ja": "main loop を無限に回し続けることではなく、idle 中に何を見て、どの順番で resume するか"
      },
      "rarity": "SSR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "task"
      ],
      "power": 85,
      "defense": 75
    },
    {
      "id": "card_s17_008",
      "name": {
        "zh": "关键数据结构",
        "en": "What You've Mastered",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "At this point, you can:",
        "ja": "この章の核になるデータ構造"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s17_009",
      "name": {
        "zh": "1. Claimable Predicate",
        "en": "What's Next",
        "ja": "1. Claimable Predicate"
      },
      "desc": {
        "zh": "什么任务算“当前这个队友可以安全认领”的任务。",
        "en": "Your teammates now organize themselves, but they all shar...",
        "ja": "frontend role の teammate だけが claim 候補になります。"
      },
      "rarity": "SSR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "task",
        "security"
      ],
      "power": 86,
      "defense": 76
    },
    {
      "id": "card_s17_010",
      "name": {
        "zh": "2. 认领后的任务记录",
        "en": "Key Takeaway",
        "ja": "2. Claim 後の TaskRecord"
      },
      "desc": {
        "zh": "一旦认领成功，任务记录至少会发生这些变化：",
        "en": "Key Takeaway",
        "ja": "claim が成功すると、task record は少なくとも次のように更新されます。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "task"
      ],
      "power": 71,
      "defense": 61
    },
    {
      "id": "card_s17_011",
      "name": {
        "zh": "3. Claim Event Log",
        "en": "3. Claim Event Log",
        "ja": "3. Claim Event Log"
      },
      "desc": {
        "zh": "除了回写任务文件，这章还会把认领动作追加到：",
        "en": "除了回写任务文件，这章还会把认领动作追加到：",
        "ja": "task file の更新だけでは、今の最終状態しか見えません。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 78,
      "defense": 68
    },
    {
      "id": "card_s17_012",
      "name": {
        "zh": "4. Durable Request Record",
        "en": "4. Durable Request Record",
        "ja": "4. Durable Request Record"
      },
      "desc": {
        "zh": "不能从 `s16` 退回到“协议请求只放内存里”",
        "en": "不能从 `s16` 退回到“协议请求只放内存里”",
        "ja": "`s17` は autonomy を追加する章ですが、`s16` の protocol line を捨てる章ではあ..."
      },
      "rarity": "SSR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "mcp"
      ],
      "power": 85,
      "defense": 75
    },
    {
      "id": "card_s17_013",
      "name": {
        "zh": "5. 身份块",
        "en": "5. 身份块",
        "ja": "5. Identity Block"
      },
      "desc": {
        "zh": "当上下文被压缩后，队友有时会“忘记自己是谁”。",
        "en": "当上下文被压缩后，队友有时会“忘记自己是谁”。",
        "ja": "compact の後や idle からの復帰直後は、teammate が自分の identity を見失いやすくな..."
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 82,
      "defense": 72
    },
    {
      "id": "card_s17_014",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s17_015",
      "name": {
        "zh": "第一步：让队友拥有 `WORK -> IDLE` 的循环",
        "en": "第一步：让队友拥有 `WORK -> IDLE` 的循环",
        "ja": "第 1 段階: WORK と IDLE を分ける"
      },
      "desc": {
        "zh": "while True:",
        "en": "while True:",
        "ja": "まず teammate loop を 2 フェーズに分けます。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "loop"
      ],
      "power": 76,
      "defense": 66
    },
    {
      "id": "card_s17_016",
      "name": {
        "zh": "第二步：在 IDLE 里先看邮箱",
        "en": "第二步：在 IDLE 里先看邮箱",
        "ja": "第 2 段階: idle では先に inbox を見る"
      },
      "desc": {
        "zh": "def idle_phase(name: str, messages: list) -> bool:",
        "en": "def idle_phase(name: str, messages: list) -> bool:",
        "ja": "明示的に自分宛てに来た仕事の方が、board 上の一般 task より優先度が高い"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 71,
      "defense": 61
    },
    {
      "id": "card_s17_017",
      "name": {
        "zh": "第三步：如果邮箱没消息，再按“当前角色”扫描可认领任务",
        "en": "第三步：如果邮箱没消息，再按“当前角色”扫描可认领任务",
        "ja": "第 3 段階: inbox が空なら role 付きで task board を走査する"
      },
      "desc": {
        "zh": "unclaimed = scan_unclaimed_tasks(role)",
        "en": "unclaimed = scan_unclaimed_tasks(role)",
        "ja": "unclaimed = scan_unclaimed_tasks(role)"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "task"
      ],
      "power": 77,
      "defense": 67
    },
    {
      "id": "card_s17_018",
      "name": {
        "zh": "第四步：认领后先补身份，再把任务提示塞回主循环",
        "en": "第四步：认领后先补身份，再把任务提示塞回主循环",
        "ja": "第 4 段階: claim 後は identity と task hint を両方戻す"
      },
      "desc": {
        "zh": "ensure_identity_context(messages, name, role, team_name)",
        "en": "ensure_identity_context(messages, name, role, team_name)",
        "ja": "claim 成功後は、そのまま resume してはいけません。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "loop",
        "prompt",
        "task"
      ],
      "power": 83,
      "defense": 73
    },
    {
      "id": "card_s17_019",
      "name": {
        "zh": "第五步：长时间没事就退出",
        "en": "第五步：长时间没事就退出",
        "ja": "第 5 段階: 長時間なにもなければ shutdown する"
      },
      "desc": {
        "zh": "time.sleep(POLL_INTERVAL)",
        "en": "time.sleep(POLL_INTERVAL)",
        "ja": "idle からの再開条件と終了条件を明示すること"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 80,
      "defense": 70
    },
    {
      "id": "card_s17_020",
      "name": {
        "zh": "为什么认领必须是原子动作",
        "en": "为什么认领必须是原子动作",
        "ja": "なぜ claim は原子的でなければならないか"
      },
      "desc": {
        "zh": "“原子”这个词第一次看到可能不熟。",
        "en": "“原子”这个词第一次看到可能不熟。",
        "ja": "claim は「見てから書く」までを他の teammate に割り込まれずに一気に行う"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 84,
      "defense": 74
    },
    {
      "id": "card_s17_021",
      "name": {
        "zh": "身份重注入为什么重要",
        "en": "身份重注入为什么重要",
        "ja": "identity 再注入が重要な理由"
      },
      "desc": {
        "zh": "这是这章里一个很容易被忽视，但很关键的点。",
        "en": "这是这章里一个很容易被忽视，但很关键的点。",
        "ja": "これは地味ですが、自治の品質を大きく左右します。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s17_022",
      "name": {
        "zh": "为什么 s17 不能从 s16 退回“内存协议”",
        "en": "为什么 s17 不能从 s16 退回“内存协议”",
        "ja": "`s17` は `s16` を上書きしない"
      },
      "desc": {
        "zh": "这是一个很容易被漏讲，但其实非常重要的点。",
        "en": "这是一个很容易被漏讲，但其实非常重要的点。",
        "ja": "protocol がある team に autonomy を足す章"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "mcp"
      ],
      "power": 81,
      "defense": 71
    },
    {
      "id": "card_s17_023",
      "name": {
        "zh": "如何接到前面几章里",
        "en": "如何接到前面几章里",
        "ja": "前の章とどうつながるか"
      },
      "desc": {
        "zh": "从“被动协作”升级到“主动协作”。",
        "en": "从“被动协作”升级到“主动协作”。",
        "ja": "受け身の team から、自分で回り始める team への橋渡し"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 54,
      "defense": 44
    },
    {
      "id": "card_s17_024",
      "name": {
        "zh": "自治的是“长期队友”，不是“一次性 subagent”",
        "en": "自治的是“长期队友”，不是“一次性 subagent”",
        "ja": "自治するのは long-lived teammate であって subagent ではない"
      },
      "desc": {
        "zh": "这层边界如果不讲清，读者很容易把 `s04` 和 `s17` 混掉。",
        "en": "这层边界如果不讲清，读者很容易把 `s04` 和 `s17` 混掉。",
        "ja": "ここで `s04` と混ざる人が多いです。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "agent"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s17_025",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者が混ぜやすいポイント"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者が混ぜやすいポイント"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s17_026",
      "name": {
        "zh": "1. 只看 `pending`，不看 `blockedBy`",
        "en": "1. 只看 `pending`，不看 `blockedBy`",
        "ja": "1. `pending` だけ見て `blockedBy` を見ない"
      },
      "desc": {
        "zh": "如果一个任务虽然是 `pending`，但前置任务还没完成，它就不应该被认领。",
        "en": "如果一个任务虽然是 `pending`，但前置任务还没完成，它就不应该被认领。",
        "ja": "task が `pending` でも dependency が残っていればまだ取れません。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_s17_027",
      "name": {
        "zh": "2. 只看状态，不看 `claim_role` / `required_role`",
        "en": "2. 只看状态，不看 `claim_role` / `required_role`",
        "ja": "2. role 条件を無視する"
      },
      "desc": {
        "zh": "这会让错误的队友接走错误的任务。",
        "en": "这会让错误的队友接走错误的任务。",
        "ja": "`claim_role` や `required_role` を見ないと、間違った teammate が task..."
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s17_028",
      "name": {
        "zh": "3. 没有认领锁",
        "en": "3. 没有认领锁",
        "ja": "3. claim lock を置かない"
      },
      "desc": {
        "zh": "这会直接导致重复抢同一条任务。",
        "en": "这会直接导致重复抢同一条任务。",
        "ja": "同一 task の二重 claim が起こります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s17_029",
      "name": {
        "zh": "4. 空闲阶段只轮询任务板，不看邮箱",
        "en": "4. 空闲阶段只轮询任务板，不看邮箱",
        "ja": "4. idle 中に board しか見ない"
      },
      "desc": {
        "zh": "这样队友会错过别人明确发给它的消息。",
        "en": "这样队友会错过别人明确发给它的消息。",
        "ja": "これでは明示的な inbox message を取りこぼします。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "task"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s17_030",
      "name": {
        "zh": "5. 认领了任务，但没有写 claim event",
        "en": "5. 认领了任务，但没有写 claim event",
        "ja": "5. event log を書かない"
      },
      "desc": {
        "zh": "这样最后你只能看到“任务现在被谁做”，却看不到：",
        "en": "这样最后你只能看到“任务现在被谁做”，却看不到：",
        "ja": "「いま誰が持っているか」は分かっても、"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "task"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s17_031",
      "name": {
        "zh": "6. 队友永远不退出",
        "en": "6. 队友永远不退出",
        "ja": "6. idle teammate を永遠に残す"
      },
      "desc": {
        "zh": "教学版里，长时间无事可做时退出是合理的。",
        "en": "教学版里，长时间无事可做时退出是合理的。",
        "ja": "教材版では shutdown 条件を持たせた方が lifecycle を理解しやすくなります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s17_032",
      "name": {
        "zh": "7. 上下文压缩后不重注入身份",
        "en": "7. 上下文压缩后不重注入身份",
        "ja": "7. compact 後に identity を戻さない"
      },
      "desc": {
        "zh": "这很容易让队友后面的行为越来越不像“它本来的角色”。",
        "en": "这很容易让队友后面的行为越来越不像“它本来的角色”。",
        "ja": "長く動く teammate ほど、identity drift が起きやすくなります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s17",
      "tags": [
        "context"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s18_001",
      "name": {
        "zh": "这一章要解决什么问题",
        "en": "What You'll Learn",
        "ja": "この章が解く問題"
      },
      "desc": {
        "zh": "每个任务应该在哪个独立工作空间里执行。",
        "en": "When two agents both need to edit the same codebase at th...",
        "ja": "誰が何をやるか"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 54,
      "defense": 44
    },
    {
      "id": "card_s18_002",
      "name": {
        "zh": "建议联读",
        "en": "The Problem",
        "ja": "併読すると楽になる資料"
      },
      "desc": {
        "zh": "建议联读",
        "en": "By s17, your agents can claim tasks, coordinate through t...",
        "ja": "併読すると楽になる資料"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s18_003",
      "name": {
        "zh": "先解释几个名词",
        "en": "Read Together",
        "ja": "先に言葉をそろえる"
      },
      "desc": {
        "zh": "先解释几个名词",
        "en": "Read Together",
        "ja": "先に言葉をそろえる"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s18_004",
      "name": {
        "zh": "什么是 worktree",
        "en": "The Solution",
        "ja": "worktree とは何か"
      },
      "desc": {
        "zh": "如果你熟悉 git，可以把 worktree 理解成：",
        "en": "The system splits into two planes: a control plane (`.tas...",
        "ja": "Git に慣れている人なら、"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s18_005",
      "name": {
        "zh": "什么叫隔离执行",
        "en": "How It Works",
        "ja": "isolation とは何か"
      },
      "desc": {
        "zh": "什么叫隔离执行",
        "en": "Step 1.",
        "ja": "`isolation` は、"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s18_006",
      "name": {
        "zh": "什么叫绑定",
        "en": "What Changed From s17",
        "ja": "binding とは何か"
      },
      "desc": {
        "zh": "什么叫绑定",
        "en": "What Changed From s17",
        "ja": "`binding` は、"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_s18_007",
      "name": {
        "zh": "最小心智模型",
        "en": "Try It",
        "ja": "最小心智モデル"
      },
      "desc": {
        "zh": "任务记录工作目标，worktree 记录执行车道。",
        "en": "cd learn-claude-code",
        "ja": "この章は 2 枚の表を別物として見ると一気に分かりやすくなります。"
      },
      "rarity": "SSR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 85,
      "defense": 75
    },
    {
      "id": "card_s18_008",
      "name": {
        "zh": "关键数据结构",
        "en": "What You've Mastered",
        "ja": "この章の核になるデータ構造"
      },
      "desc": {
        "zh": "关键数据结构",
        "en": "At this point, you can:",
        "ja": "この章の核になるデータ構造"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s18_009",
      "name": {
        "zh": "1. TaskRecord 不再只记录 `worktree`",
        "en": "What's Next",
        "ja": "1. TaskRecord 側の lane 情報"
      },
      "desc": {
        "zh": "到当前教学代码这一步，任务记录里和车道相关的字段已经不只一个：",
        "en": "You now have agents that can work in complete isolation, ...",
        "ja": "いま結び付いている lane と、最後にどう閉じたかまで記録し始めています。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 82,
      "defense": 72
    },
    {
      "id": "card_s18_010",
      "name": {
        "zh": "2. WorktreeRecord 不只是路径映射",
        "en": "Key Takeaway",
        "ja": "2. WorktreeRecord"
      },
      "desc": {
        "zh": "可观察的执行车道",
        "en": "Key Takeaway",
        "ja": "directory mapping ではなく、観測可能な execution lane record"
      },
      "rarity": "SSR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 87,
      "defense": 77
    },
    {
      "id": "card_s18_011",
      "name": {
        "zh": "3. CloseoutRecord",
        "en": "3. CloseoutRecord",
        "ja": "3. CloseoutRecord"
      },
      "desc": {
        "zh": "这一章在当前代码里，一个完整的收尾记录大致是：",
        "en": "这一章在当前代码里，一个完整的收尾记录大致是：",
        "ja": "closeout は単なる cleanup コマンドではなく、execution lane の終わり方を明示する操作"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 77,
      "defense": 67
    },
    {
      "id": "card_s18_012",
      "name": {
        "zh": "4. EventRecord",
        "en": "4. EventRecord",
        "ja": "4. Event Record"
      },
      "desc": {
        "zh": "\"event\": \"worktree.closeout.keep\",",
        "en": "\"event\": \"worktree.closeout.keep\",",
        "ja": "そこへ至る途中の挙動"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 76,
      "defense": 66
    },
    {
      "id": "card_s18_013",
      "name": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "desc": {
        "zh": "最小实现",
        "en": "最小实现",
        "ja": "最小実装を段階で追う"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s18_014",
      "name": {
        "zh": "第一步：先有任务，再有 worktree",
        "en": "第一步：先有任务，再有 worktree",
        "ja": "第 1 段階: 先に task を作り、そのあと lane を作る"
      },
      "desc": {
        "zh": "不要先开目录再回头补任务。",
        "en": "不要先开目录再回头补任务。",
        "ja": "worktree は task の代替ではなく、task にぶら下がる execution lane"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 70,
      "defense": 60
    },
    {
      "id": "card_s18_015",
      "name": {
        "zh": "第二步：创建 worktree 并写入注册表",
        "en": "第二步：创建 worktree 并写入注册表",
        "ja": "第 2 段階: worktree を作り、registry に書く"
      },
      "desc": {
        "zh": "def create(self, name: str, task_id: int):",
        "en": "def create(self, name: str, task_id: int):",
        "ja": "def create(self, name: str, task_id: int):"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 79,
      "defense": 69
    },
    {
      "id": "card_s18_016",
      "name": {
        "zh": "第三步：同时更新任务记录，不只是写一个 `worktree`",
        "en": "第三步：同时更新任务记录，不只是写一个 `worktree`",
        "ja": "第 3 段階: task record 側も同時に更新する"
      },
      "desc": {
        "zh": "def bind_worktree(task_id: int, name: str):",
        "en": "def bind_worktree(task_id: int, name: str):",
        "ja": "lane registry を書くだけでは不十分です。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 80,
      "defense": 70
    },
    {
      "id": "card_s18_017",
      "name": {
        "zh": "第四步：显式进入车道，再在对应目录里执行命令",
        "en": "第四步：显式进入车道，再在对应目录里执行命令",
        "ja": "第 4 段階: lane に入ることと、lane で command を実行することを分ける"
      },
      "desc": {
        "zh": "同一个命令，在不同 `cwd` 里执行，影响范围就不一样。",
        "en": "同一个命令，在不同 `cwd` 里执行，影响范围就不一样。",
        "ja": "教材コードでは `enter` と `run` を分けています。"
      },
      "rarity": "SSR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 96,
      "defense": 86
    },
    {
      "id": "card_s18_018",
      "name": {
        "zh": "第五步：收尾时显式走 `worktree_closeout`",
        "en": "第五步：收尾时显式走 `worktree_closeout`",
        "ja": "第 5 段階: 終わるときは closeout を明示する"
      },
      "desc": {
        "zh": "当前更清楚的教学接口不是“分散记两个命令”，而是统一成一个 closeout 动作：",
        "en": "当前更清楚的教学接口不是“分散记两个命令”，而是统一成一个 closeout 动作：",
        "ja": "closeout decision -> keep / remove"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 82,
      "defense": 72
    },
    {
      "id": "card_s18_019",
      "name": {
        "zh": "为什么 `worktree_state` 和 `status` 要分开",
        "en": "为什么 `worktree_state` 和 `status` 要分开",
        "ja": "なぜ `status` と `worktree_state` を分けるのか"
      },
      "desc": {
        "zh": "任务状态和车道状态不能混成一个字段。",
        "en": "任务状态和车道状态不能混成一个字段。",
        "ja": "goal state と lane state は同じ field に潰してはいけません。"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 79,
      "defense": 69
    },
    {
      "id": "card_s18_020",
      "name": {
        "zh": "为什么 worktree 不是“只是一个 git 小技巧”",
        "en": "为什么 worktree 不是“只是一个 git 小技巧”",
        "ja": "なぜ worktree は「Git の小技」で終わらないのか"
      },
      "desc": {
        "zh": "把任务和执行目录做显式绑定，让并行工作有清楚的边界。",
        "en": "把任务和执行目录做显式绑定，让并行工作有清楚的边界。",
        "ja": "task と execution directory の対応関係を明示 record として持つこと"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 63,
      "defense": 53
    },
    {
      "id": "card_s18_021",
      "name": {
        "zh": "如何接到前面章节里",
        "en": "如何接到前面章节里",
        "ja": "前の章とどうつながるか"
      },
      "desc": {
        "zh": "这章和前面几章是强耦合的：",
        "en": "这章和前面几章是强耦合的：",
        "ja": "goal と lane を分けた協調システム"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 80,
      "defense": 70
    },
    {
      "id": "card_s18_022",
      "name": {
        "zh": "worktree 不是任务本身，而是任务的执行车道",
        "en": "worktree 不是任务本身，而是任务的执行车道",
        "ja": "worktree は task そのものではない"
      },
      "desc": {
        "zh": "这句话值得单独再说一次。",
        "en": "这句话值得单独再说一次。",
        "ja": "ここは何度でも繰り返す価値があります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s18_023",
      "name": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者が混ぜやすいポイント"
      },
      "desc": {
        "zh": "初学者最容易犯的错",
        "en": "初学者最容易犯的错",
        "ja": "初学者が混ぜやすいポイント"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s18_024",
      "name": {
        "zh": "1. 有 worktree 注册表，但任务记录里没有 `worktree`",
        "en": "1. 有 worktree 注册表，但任务记录里没有 `worktree`",
        "ja": "1. registry だけあって task record に `worktree` がない"
      },
      "desc": {
        "zh": "这样任务板就丢掉了最重要的一条执行信息。",
        "en": "这样任务板就丢掉了最重要的一条执行信息。",
        "ja": "task board から lane の情報が見えなくなります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s18_025",
      "name": {
        "zh": "2. 有任务 ID，但命令仍然在主目录执行",
        "en": "2. 有任务 ID，但命令仍然在主目录执行",
        "ja": "2. task ID はあるのに command が repo root で走っている"
      },
      "desc": {
        "zh": "如果 `cwd` 没切过去，worktree 形同虚设。",
        "en": "如果 `cwd` 没切过去，worktree 形同虚设。",
        "ja": "`cwd` が切り替わっていなければ isolation は成立していません。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "task"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s18_026",
      "name": {
        "zh": "3. 只会 `worktree_remove`，不会解释 closeout 的含义",
        "en": "3. 只会 `worktree_remove`，不会解释 closeout 的含义",
        "ja": "3. `remove` だけを覚えて closeout の意味を教えない"
      },
      "desc": {
        "zh": "这样读者最后只记住“删目录”这个动作，却不知道系统真正想表达的是：",
        "en": "这样读者最后只记住“删目录”这个动作，却不知道系统真正想表达的是：",
        "ja": "読者は「directory を消す小技」としか理解できなくなります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s18_027",
      "name": {
        "zh": "4. 删除 worktree 前不看未提交改动",
        "en": "4. 删除 worktree 前不看未提交改动",
        "ja": "4. remove 前に dirty state を気にしない"
      },
      "desc": {
        "zh": "删除前先检查是否有脏改动。",
        "en": "删除前先检查是否有脏改动。",
        "ja": "消す前に未コミット変更を確認する"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s18_028",
      "name": {
        "zh": "5. 没有 `worktree_state` / `closeout` 这类显式收尾状态",
        "en": "5. 没有 `worktree_state` / `closeout` 这类显式收尾状态",
        "ja": "5. `worktree_state` や `closeout` を持たない"
      },
      "desc": {
        "zh": "这样系统就会只剩下“现在目录还在不在”，而没有：",
        "en": "这样系统就会只剩下“现在目录还在不在”，而没有：",
        "ja": "lane の終わり方が state として残らなくなります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s18_029",
      "name": {
        "zh": "6. 把 worktree 当成长期垃圾堆",
        "en": "6. 把 worktree 当成长期垃圾堆",
        "ja": "6. lane を増やすだけで掃除しない"
      },
      "desc": {
        "zh": "如果从不清理，目录会越来越多，状态越来越乱。",
        "en": "如果从不清理，目录会越来越多，状态越来越乱。",
        "ja": "長く使うと registry も directory もすぐ乱れます。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s18_030",
      "name": {
        "zh": "7. 没有事件日志",
        "en": "7. 没有事件日志",
        "ja": "7. event log を持たない"
      },
      "desc": {
        "zh": "一旦创建失败、删除失败或任务关系错乱，没有事件日志会很难排查。",
        "en": "一旦创建失败、删除失败或任务关系错乱，没有事件日志会很难排查。",
        "ja": "create / remove failure や binding ミスの調査が極端にやりづらくなります。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s18",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_s19_001",
      "name": {
        "zh": "这一章到底在讲什么",
        "en": "What You'll Learn",
        "ja": "この章が本当に教えるもの"
      },
      "desc": {
        "zh": "前面所有章节里，工具基本都写在你自己的 Python 代码里。",
        "en": "Up to this point, every tool your agent uses -- bash, rea...",
        "ja": "前の章までは、ツールの多くが自分の Python コード内にありました。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_s19_002",
      "name": {
        "zh": "先用最简单的话解释 MCP",
        "en": "The Problem",
        "ja": "MCP を一番簡単に言うと"
      },
      "desc": {
        "zh": "一套让 agent 和外部工具程序对话的统一协议。",
        "en": "Your agent is powerful, but its capabilities are frozen a...",
        "ja": "agent が外部 capability server と会話するための標準的な方法"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "agent",
        "tool",
        "mcp"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s19_003",
      "name": {
        "zh": "为什么这一章放在最后",
        "en": "The Solution",
        "ja": "なぜ最後の章なのか"
      },
      "desc": {
        "zh": "把“工具来源”从“本地硬编码”升级成“外部可插拔”。",
        "en": "MCP gives your agent a standard way to connect to externa...",
        "ja": "新しい capability source"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "tool"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s19_004",
      "name": {
        "zh": "建议联读",
        "en": "Read Together",
        "ja": "主線とどう併読するか"
      },
      "desc": {
        "zh": "建议联读",
        "en": "Read Together",
        "ja": "主線とどう併読するか"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_s19_005",
      "name": {
        "zh": "最小心智模型",
        "en": "How It Works",
        "ja": "最小の心智モデル"
      },
      "desc": {
        "zh": "Agent tool router",
        "en": "Step 1.",
        "ja": "Agent tool router"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s19_006",
      "name": {
        "zh": "最小系统里最重要的三件事",
        "en": "How It Plugs Into The Full Harness",
        "ja": "重要な 3 要素"
      },
      "desc": {
        "zh": "最小系统里最重要的三件事",
        "en": "MCP gets confusing when it is treated like a separate uni...",
        "ja": "重要な 3 要素"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s19_007",
      "name": {
        "zh": "1. 有一个 MCP client",
        "en": "Plugin vs Server vs Tool",
        "ja": "1. `MCPClient`"
      },
      "desc": {
        "zh": "1. 有一个 MCP client",
        "en": "Shortest memory aid:",
        "ja": "1. `MCPClient`"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "mcp"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_s19_008",
      "name": {
        "zh": "2. 有一个工具名前缀规则",
        "en": "Key Data Structures",
        "ja": "2. 命名規則"
      },
      "desc": {
        "zh": "这是为了避免命名冲突。",
        "en": "Key Data Structures",
        "ja": "外部ツールとローカルツールが衝突しないように prefix を付けます。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "tool"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s19_009",
      "name": {
        "zh": "3. 有一个统一路由器",
        "en": "Server config",
        "ja": "3. 1 本の unified router"
      },
      "desc": {
        "zh": "3. 有一个统一路由器",
        "en": "\"command\": \"npx\",",
        "ja": "if tool_name.startswith(\"mcp__\"):"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s19_010",
      "name": {
        "zh": "Plugin 又是什么",
        "en": "Normalized external tool definition",
        "ja": "Plugin は何をするか"
      },
      "desc": {
        "zh": "如果 MCP 解决的是“外部工具怎么通信”，",
        "en": "\"name\": \"mcp__postgres__query\",",
        "ja": "を扱うなら、plugin は:"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s19_011",
      "name": {
        "zh": "最小配置长什么样",
        "en": "Client registry",
        "ja": "最小設定"
      },
      "desc": {
        "zh": "\"name\": \"my-db-tools\",",
        "en": "clients = {",
        "ja": "\"name\": \"my-db-tools\","
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 64,
      "defense": 54
    },
    {
      "id": "card_s19_012",
      "name": {
        "zh": "最小实现步骤",
        "en": "What Changed From s18",
        "ja": "システム全体へどう接続するか"
      },
      "desc": {
        "zh": "最小实现步骤",
        "en": "What Changed From s18",
        "ja": "MCP が急に難しく見えるのは、別世界の仕組みとして見てしまうときです。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s19_013",
      "name": {
        "zh": "第一步：写一个 `MCPClient`",
        "en": "Try It",
        "ja": "重要なデータ構造"
      },
      "desc": {
        "zh": "第一步：写一个 `MCPClient`",
        "en": "cd learn-claude-code",
        "ja": "重要なデータ構造"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "mcp"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_s19_014",
      "name": {
        "zh": "第二步：把外部工具标准化成 agent 能看懂的工具定义",
        "en": "What You've Mastered",
        "ja": "1. server config"
      },
      "desc": {
        "zh": "也就是说，把 MCP server 暴露的工具，转成 agent 工具池里的统一格式。",
        "en": "At this point, you can:",
        "ja": "\"command\": \"npx\","
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "agent",
        "tool"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_s19_015",
      "name": {
        "zh": "第三步：加前缀",
        "en": "The Full Picture",
        "ja": "2. 標準化された外部ツール定義"
      },
      "desc": {
        "zh": "第三步：加前缀",
        "en": "You have now walked through the complete design backbone ...",
        "ja": "\"name\": \"mcp__postgres__query\","
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_s19_016",
      "name": {
        "zh": "第四步：写一个 router",
        "en": "Key Takeaway",
        "ja": "3. client registry"
      },
      "desc": {
        "zh": "if tool_name.startswith(\"mcp__\"):",
        "en": "Key Takeaway",
        "ja": "clients = {"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s19_017",
      "name": {
        "zh": "第五步：仍然走同一条权限管道",
        "en": "第五步：仍然走同一条权限管道",
        "ja": "絶対に崩してはいけない境界"
      },
      "desc": {
        "zh": "MCP 工具虽然来自外部，但不能绕开 permission。",
        "en": "MCP 工具虽然来自外部，但不能绕开 permission。",
        "ja": "外部ツールも同じ permission 面を通る"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "tool",
        "permission",
        "mcp"
      ],
      "power": 75,
      "defense": 65
    },
    {
      "id": "card_s19_018",
      "name": {
        "zh": "如何接到整个系统里",
        "en": "如何接到整个系统里",
        "ja": "Plugin / Server / Tool を同じ層にしない"
      },
      "desc": {
        "zh": "进入方式不同，但进入后必须回到同一条控制面和执行面。",
        "en": "进入方式不同，但进入后必须回到同一条控制面和执行面。",
        "ja": "Plugin / Server / Tool を同じ層にしない"
      },
      "rarity": "SR",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 70,
      "defense": 60
    },
    {
      "id": "card_s19_019",
      "name": {
        "zh": "Plugin、MCP Server、MCP Tool 不要混成一层",
        "en": "Plugin、MCP Server、MCP Tool 不要混成一层",
        "ja": "初学者が迷いやすい点"
      },
      "desc": {
        "zh": "这是初学者最容易在本章里打结的地方。",
        "en": "这是初学者最容易在本章里打结的地方。",
        "ja": "初学者が迷いやすい点"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "tool",
        "mcp"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_s19_020",
      "name": {
        "zh": "这一章最关键的数据结构",
        "en": "这一章最关键的数据结构",
        "ja": "1. いきなりプロトコル細部へ入る"
      },
      "desc": {
        "zh": "这一章最关键的数据结构",
        "en": "这一章最关键的数据结构",
        "ja": "先に見るべきは capability routing です。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s19_021",
      "name": {
        "zh": "1. server 配置",
        "en": "1. server 配置",
        "ja": "2. MCP を別世界だと思う"
      },
      "desc": {
        "zh": "\"command\": \"npx\",",
        "en": "\"command\": \"npx\",",
        "ja": "実際には、同じ routing、同じ permission、同じ result append に戻します。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_s19_022",
      "name": {
        "zh": "2. 标准化后的工具定义",
        "en": "2. 标准化后的工具定义",
        "ja": "3. 正規化を省く"
      },
      "desc": {
        "zh": "\"name\": \"mcp__postgres__query\",",
        "en": "\"name\": \"mcp__postgres__query\",",
        "ja": "外部ツールをローカルツールと同じ形へ揃えないと、後の心智が急に重くなります。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "tool"
      ],
      "power": 62,
      "defense": 52
    },
    {
      "id": "card_s19_023",
      "name": {
        "zh": "3. client 注册表",
        "en": "3. client 注册表",
        "ja": "Try It"
      },
      "desc": {
        "zh": "clients = {",
        "en": "clients = {",
        "ja": "cd learn-claude-code"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 52,
      "defense": 42
    },
    {
      "id": "card_s19_024",
      "name": {
        "zh": "初学者最容易被带偏的地方",
        "en": "初学者最容易被带偏的地方",
        "ja": "初学者最容易被带偏的地方"
      },
      "desc": {
        "zh": "初学者最容易被带偏的地方",
        "en": "初学者最容易被带偏的地方",
        "ja": "初学者最容易被带偏的地方"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_s19_025",
      "name": {
        "zh": "1. 一上来讲太多协议细节",
        "en": "1. 一上来讲太多协议细节",
        "ja": "1. 一上来讲太多协议细节"
      },
      "desc": {
        "zh": "外部工具也能像本地工具一样接进 agent。",
        "en": "外部工具也能像本地工具一样接进 agent。",
        "ja": "外部工具也能像本地工具一样接进 agent。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "agent",
        "tool",
        "mcp"
      ],
      "power": 58,
      "defense": 48
    },
    {
      "id": "card_s19_026",
      "name": {
        "zh": "2. 把 MCP 当成一套完全不同的工具系统",
        "en": "2. 把 MCP 当成一套完全不同的工具系统",
        "ja": "2. 把 MCP 当成一套完全不同的工具系统"
      },
      "desc": {
        "zh": "它最终仍然应该汇入你原来的工具体系：",
        "en": "它最终仍然应该汇入你原来的工具体系：",
        "ja": "它最终仍然应该汇入你原来的工具体系："
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "tool",
        "mcp"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s19_027",
      "name": {
        "zh": "3. 忽略命名与路由",
        "en": "3. 忽略命名与路由",
        "ja": "3. 忽略命名与路由"
      },
      "desc": {
        "zh": "如果没有统一前缀和统一路由，系统会很快乱掉。",
        "en": "如果没有统一前缀和统一路由，系统会很快乱掉。",
        "ja": "如果没有统一前缀和统一路由，系统会很快乱掉。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_s19_028",
      "name": {
        "zh": "正文先停在 tools-first，平台层再看桥接文档",
        "en": "正文先停在 tools-first，平台层再看桥接文档",
        "ja": "正文先停在 tools-first，平台层再看桥接文档"
      },
      "desc": {
        "zh": "这一章的正文故意停在“外部工具如何接进 agent”这一层。",
        "en": "这一章的正文故意停在“外部工具如何接进 agent”这一层。",
        "ja": "这一章的正文故意停在“外部工具如何接进 agent”这一层。"
      },
      "rarity": "N",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "tool"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_s19_029",
      "name": {
        "zh": "这一章和全仓库的关系",
        "en": "这一章和全仓库的关系",
        "ja": "这一章和全仓库的关系"
      },
      "desc": {
        "zh": "如何把系统向外打开。",
        "en": "如何把系统向外打开。",
        "ja": "如何把系统向外打开。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "concept"
      ],
      "power": 60,
      "defense": 50
    },
    {
      "id": "card_s19_030",
      "name": {
        "zh": "学完这章后，你应该能回答",
        "en": "学完这章后，你应该能回答",
        "ja": "学完这章后，你应该能回答"
      },
      "desc": {
        "zh": "一句话记住：MCP 的本质，不是协议名词堆砌，而是把外部工具安全、统一地接进你的 agent。",
        "en": "一句话记住：MCP 的本质，不是协议名词堆砌，而是把外部工具安全、统一地接进你的 agent。",
        "ja": "一句话记住：MCP 的本质，不是协议名词堆砌，而是把外部工具安全、统一地接进你的 agent。"
      },
      "rarity": "R",
      "region": "network",
      "chapter": "s19",
      "tags": [
        "agent",
        "tool",
        "mcp"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_bp01_001",
      "name": {
        "zh": "1. 编写优秀的 CLAUDE.md",
        "en": "1. Writing a Good CLAUDE.md",
        "ja": "1. Writing a Good CLAUDE.md"
      },
      "desc": {
        "zh": "一份结构良好的 CLAUDE.md 是提升 Claude Code 输出质量的最有效方式。Humanlayer 提...",
        "en": "A well-structured CLAUDE.md is the single most impactful ...",
        "ja": "A well-structured CLAUDE.md is the single most impactful ..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp01_002",
      "name": {
        "zh": "2. 大型 Monorepo 中的 CLAUDE.md",
        "en": "2. CLAUDE.md in Large Monorepos",
        "ja": "2. CLAUDE.md in Large Monorepos"
      },
      "desc": {
        "zh": "在 monorepo 中使用 Claude Code 时，理解 CLAUDE.md 文件如何被加载到上下文中，对于...",
        "en": "When working with Claude Code in a monorepo, understandin...",
        "ja": "When working with Claude Code in a monorepo, understandin..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_bp01_003",
      "name": {
        "zh": "两种加载机制",
        "en": "The Two Loading Mechanisms",
        "ja": "The Two Loading Mechanisms"
      },
      "desc": {
        "zh": "启动时立即加载",
        "en": "upward",
        "ja": "upward"
      },
      "rarity": "R",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 57,
      "defense": 47
    },
    {
      "id": "card_bp01_004",
      "name": {
        "zh": "Monorepo 结构示例",
        "en": "Example Monorepo Structure",
        "ja": "Example Monorepo Structure"
      },
      "desc": {
        "zh": "考虑一个典型的 monorepo，其中包含多个独立组件目录：",
        "en": "Consider a typical monorepo with separate directories for...",
        "ja": "Consider a typical monorepo with separate directories for..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_bp01_005",
      "name": {
        "zh": "场景 1：从根目录启动 Claude Code",
        "en": "Scenario 1: Running Claude Code from the Root Directory",
        "ja": "Scenario 1: Running Claude Code from the Root Directory"
      },
      "desc": {
        "zh": "当你从 `/mymonorepo/` 启动 Claude Code 时：",
        "en": "When you run Claude Code from `/mymonorepo/`:",
        "ja": "When you run Claude Code from `/mymonorepo/`:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_bp01_006",
      "name": {
        "zh": "场景 2：从组件目录启动 Claude Code",
        "en": "Scenario 2: Running Claude Code from a Component Directory",
        "ja": "Scenario 2: Running Claude Code from a Component Directory"
      },
      "desc": {
        "zh": "当你从 `/mymonorepo/frontend/` 启动 Claude Code 时：",
        "en": "When you run Claude Code from `/mymonorepo/frontend/`:",
        "ja": "When you run Claude Code from `/mymonorepo/frontend/`:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_bp01_007",
      "name": {
        "zh": "核心要点",
        "en": "Key Takeaways",
        "ja": "Key Takeaways"
      },
      "desc": {
        "zh": "祖先目录总是在启动时加载",
        "en": "Ancestors always load at startup",
        "ja": "Ancestors always load at startup"
      },
      "rarity": "SR",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 82,
      "defense": 72
    },
    {
      "id": "card_bp01_008",
      "name": {
        "zh": "这种设计为何适合 Monorepo",
        "en": "Why This Design Works for Monorepos",
        "ja": "Why This Design Works for Monorepos"
      },
      "desc": {
        "zh": "共享指令向下传播",
        "en": "Shared instructions propagate down",
        "ja": "Shared instructions propagate down"
      },
      "rarity": "R",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "context"
      ],
      "power": 55,
      "defense": 45
    },
    {
      "id": "card_bp01_009",
      "name": {
        "zh": "最佳实践",
        "en": "Best Practices",
        "ja": "Best Practices"
      },
      "desc": {
        "zh": "将共享约定放在根级 CLAUDE.md 中",
        "en": "Put shared conventions in root CLAUDE.md",
        "ja": "Put shared conventions in root CLAUDE.md"
      },
      "rarity": "R",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_bp01_010",
      "name": {
        "zh": "参考来源",
        "en": "Sources",
        "ja": "Sources"
      },
      "desc": {
        "zh": "参考来源",
        "en": "Sources",
        "ja": "Sources"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp01",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp02_001",
      "name": {
        "zh": "Frontmatter 字段（13 个）",
        "en": "Frontmatter Fields (13)",
        "ja": "Frontmatter Fields (13)"
      },
      "desc": {
        "zh": "Frontmatter 字段（13 个）",
        "en": "Frontmatter Fields (13)",
        "ja": "Frontmatter Fields (13)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp02",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_bp02_002",
      "name": {
        "zh": "官方内置命令（69 个）",
        "en": "![Official](../!/tags/official.svg) **(69)**",
        "ja": "![Official](../!/tags/official.svg) **(69)**"
      },
      "desc": {
        "zh": "捆绑技能（如 `/debug`）也可能出现在斜杠命令菜单中，但它们不是内置命令。",
        "en": "Bundled skills such as `/debug` can also appear in the sl...",
        "ja": "Bundled skills such as `/debug` can also appear in the sl..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp02",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_bp02_003",
      "name": {
        "zh": "参考来源",
        "en": "Sources",
        "ja": "Sources"
      },
      "desc": {
        "zh": "参考来源",
        "en": "Command → Agent → Skill",
        "ja": "Command → Agent → Skill"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp02",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_bp03_001",
      "name": {
        "zh": "Frontmatter 字段（13 个）",
        "en": "Frontmatter Fields (13)",
        "ja": "Frontmatter Fields (13)"
      },
      "desc": {
        "zh": "Frontmatter 字段（13 个）",
        "en": "Frontmatter Fields (13)",
        "ja": "Frontmatter Fields (13)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp03",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_bp03_002",
      "name": {
        "zh": "官方捆绑技能（5 个）",
        "en": "![Official](../!/tags/official.svg) **(5)**",
        "ja": "![Official](../!/tags/official.svg) **(5)**"
      },
      "desc": {
        "zh": "另请参阅：[官方技能仓库](https://github.com/anthropics/skills/tree/m...",
        "en": "See also: [Official Skills Repository](https://github.com...",
        "ja": "See also: [Official Skills Repository](https://github.com..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp03",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp03_003",
      "name": {
        "zh": "参考来源",
        "en": "Sources",
        "ja": "Sources"
      },
      "desc": {
        "zh": "参考来源",
        "en": "Command → Agent → Skill",
        "ja": "Command → Agent → Skill"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp03",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_bp04_001",
      "name": {
        "zh": "1. 什么是 Hooks",
        "en": "Table of Contents",
        "ja": "Table of Contents"
      },
      "desc": {
        "zh": "Command hooks（命令钩子）",
        "en": "1. [Settings Hierarchy](#settings-hierarchy)",
        "ja": "1. [Settings Hierarchy](#settings-hierarchy)"
      },
      "rarity": "SR",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "agent",
        "prompt",
        "hook"
      ],
      "power": 70,
      "defense": 60
    },
    {
      "id": "card_bp04_002",
      "name": {
        "zh": "2. 配置格式",
        "en": "Settings Hierarchy",
        "ja": "Settings Hierarchy"
      },
      "desc": {
        "zh": "Hooks 在 `settings.json` 的 `hooks` 字段中配置。每个事件名称下包含一个匹配器数组，...",
        "en": "Managed settings",
        "ja": "Managed settings"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_bp04_003",
      "name": {
        "zh": "Hook 类型",
        "en": "Core Configuration",
        "ja": "Core Configuration"
      },
      "desc": {
        "zh": "Hook 类型",
        "en": "Core Configuration",
        "ja": "Core Configuration"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "hook"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_bp04_004",
      "name": {
        "zh": "子代理中的 Hooks",
        "en": "General Settings",
        "ja": "General Settings"
      },
      "desc": {
        "zh": "子代理也可以在 YAML frontmatter 字段中定义 Hooks，格式与 `settings.json` 相同：",
        "en": "(Managed only)",
        "ja": "(Managed only)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "hook"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp04_005",
      "name": {
        "zh": "`/hooks` 菜单",
        "en": "Plans & Memory Directories",
        "ja": "Plans & Memory Directories"
      },
      "desc": {
        "zh": "在 Claude Code 中输入 `/hooks` 可以打开一个只读浏览器，查看已配置的所有 Hooks。菜单显...",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "hook"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_bp04_006",
      "name": {
        "zh": "禁用 Hooks",
        "en": "Worktree Settings",
        "ja": "Worktree Settings"
      },
      "desc": {
        "zh": "移除单个 Hook",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "R",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "hook"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_bp04_007",
      "name": {
        "zh": "相关设置键",
        "en": "Attribution Settings",
        "ja": "Attribution Settings"
      },
      "desc": {
        "zh": "相关设置键",
        "en": "DEPRECATED",
        "ja": "DEPRECATED"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_bp04_008",
      "name": {
        "zh": "3. 输入与输出",
        "en": "Authentication Helpers",
        "ja": "Authentication Helpers"
      },
      "desc": {
        "zh": "3. 输入与输出",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp04_009",
      "name": {
        "zh": "通用输入字段",
        "en": "Company Announcements",
        "ja": "Company Announcements"
      },
      "desc": {
        "zh": "所有 Hook 事件都会收到以下 JSON 字段（除了各事件特有的字段）：",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp04_010",
      "name": {
        "zh": "退出码",
        "en": "Permissions",
        "ja": "Permissions"
      },
      "desc": {
        "zh": "示例——阻断危险 Bash 命令的 Hook 脚本：",
        "en": "Control what tools and operations Claude can perform.",
        "ja": "Control what tools and operations Claude can perform."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp04_011",
      "name": {
        "zh": "各事件退出码 2 的行为",
        "en": "Permission Structure",
        "ja": "Permission Structure"
      },
      "desc": {
        "zh": "各事件退出码 2 的行为",
        "en": "\"permissions\": {",
        "ja": "\"permissions\": {"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_bp04_012",
      "name": {
        "zh": "JSON 输出",
        "en": "Permission Keys",
        "ja": "Permission Keys"
      },
      "desc": {
        "zh": "退出码 0 时，可通过 stdout 输出 JSON 对象实现更精细的控制：",
        "en": "(Managed only)",
        "ja": "(Managed only)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_bp04_013",
      "name": {
        "zh": "HTTP 响应处理",
        "en": "Permission Modes",
        "ja": "Permission Modes"
      },
      "desc": {
        "zh": "2xx 空响应体",
        "en": "Permission Modes",
        "ja": "Permission Modes"
      },
      "rarity": "SSR",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 86,
      "defense": 76
    },
    {
      "id": "card_bp04_014",
      "name": {
        "zh": "4. 全部 Hook 事件（25 个）",
        "en": "Tool Permission Syntax",
        "ja": "Tool Permission Syntax"
      },
      "desc": {
        "zh": "4. 全部 Hook 事件（25 个）",
        "en": ")` |\n| `Edit` | `Edit(path pattern)` | `Edit(src/",
        "ja": ")` |\n| `Edit` | `Edit(path pattern)` | `Edit(src/"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "hook"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp04_015",
      "name": {
        "zh": "事件总览",
        "en": "Hooks",
        "ja": "Hooks"
      },
      "desc": {
        "zh": "事件总览",
        "en": "[claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks)",
        "ja": "[claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_bp04_016",
      "name": {
        "zh": "匹配器参考",
        "en": "MCP Servers",
        "ja": "MCP Servers"
      },
      "desc": {
        "zh": "匹配器参考",
        "en": "Configure Model Context Protocol servers for extended cap...",
        "ja": "Configure Model Context Protocol servers for extended cap..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp04_017",
      "name": {
        "zh": "5. 关键事件详解",
        "en": "MCP Settings",
        "ja": "MCP Settings"
      },
      "desc": {
        "zh": "5. 关键事件详解",
        "en": "MCP Settings",
        "ja": "MCP Settings"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_bp04_018",
      "name": {
        "zh": "SessionStart",
        "en": "MCP Server Matching (Managed Settings)",
        "ja": "MCP Server Matching (Managed Settings)"
      },
      "desc": {
        "zh": "额外输入字段",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "SSR",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 90,
      "defense": 80
    },
    {
      "id": "card_bp04_019",
      "name": {
        "zh": "UserPromptSubmit",
        "en": "Sandbox",
        "ja": "Sandbox"
      },
      "desc": {
        "zh": "额外输入字段",
        "en": "Configure bash command sandboxing for security.",
        "ja": "Configure bash command sandboxing for security."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "prompt"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp04_020",
      "name": {
        "zh": "PreToolUse",
        "en": "Sandbox Settings",
        "ja": "Sandbox Settings"
      },
      "desc": {
        "zh": "决策控制",
        "en": "Note:",
        "ja": "Note:"
      },
      "rarity": "R",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "tool"
      ],
      "power": 61,
      "defense": 51
    },
    {
      "id": "card_bp04_021",
      "name": {
        "zh": "PostToolUse",
        "en": "Plugins",
        "ja": "Plugins"
      },
      "desc": {
        "zh": "额外输入字段",
        "en": "Configure Claude Code plugins and marketplaces.",
        "ja": "Configure Claude Code plugins and marketplaces."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "tool"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp04_022",
      "name": {
        "zh": "Stop",
        "en": "Plugin Settings",
        "ja": "Plugin Settings"
      },
      "desc": {
        "zh": "Claude 完成响应时运行。退出码 2 可阻止 Claude 停止并继续对话——适合实现\"循环直到条件满足\"模式。",
        "en": "Marketplace source types:",
        "ja": "Marketplace source types:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp04_023",
      "name": {
        "zh": "Notification",
        "en": "Model Configuration",
        "ja": "Model Configuration"
      },
      "desc": {
        "zh": "Claude Code 发送通知时运行。匹配通知类型：`permission_prompt`、`idle_prom...",
        "en": "Model Configuration",
        "ja": "Model Configuration"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 31,
      "defense": 21
    },
    {
      "id": "card_bp04_024",
      "name": {
        "zh": "PermissionRequest",
        "en": "Model Aliases",
        "ja": "Model Aliases"
      },
      "desc": {
        "zh": "决策控制",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "permission"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp04_025",
      "name": {
        "zh": "FileChanged",
        "en": "Model Overrides",
        "ja": "Model Overrides"
      },
      "desc": {
        "zh": "被监视的文件在磁盘上变更时运行。`matcher` 字段指定要监视的文件名。支持 `CLAUDE_ENV_FILE...",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_bp04_026",
      "name": {
        "zh": "WorktreeCreate / WorktreeRemove",
        "en": "Effort Level",
        "ja": "Effort Level"
      },
      "desc": {
        "zh": "工作树创建和移除时运行。`WorktreeCreate` 中任何非零退出码都会导致工作树创建失败。Hook 命令通...",
        "en": "effort level",
        "ja": "effort level"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_bp04_027",
      "name": {
        "zh": "6. 决策控制模式总结",
        "en": "Model Environment Variables",
        "ja": "Model Environment Variables"
      },
      "desc": {
        "zh": "不同事件使用不同的决策控制模式：",
        "en": "Configure via `env` key:",
        "ja": "Configure via `env` key:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp04_028",
      "name": {
        "zh": "7. 实用示例",
        "en": "Display & UX",
        "ja": "Display & UX"
      },
      "desc": {
        "zh": "7. 实用示例",
        "en": "Display & UX",
        "ja": "Display & UX"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_bp04_029",
      "name": {
        "zh": "工具调用前验证 Bash 命令",
        "en": "Display Settings",
        "ja": "Display Settings"
      },
      "desc": {
        "zh": "\"PreToolUse\": [",
        "en": "Display Settings",
        "ja": "Display Settings"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "tool"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp04_030",
      "name": {
        "zh": "文件写入后自动运行 Lint",
        "en": "Global Config Settings (`~/.claude.json`)",
        "ja": "Global Config Settings (`~/.claude.json`)"
      },
      "desc": {
        "zh": "\"PostToolUse\": [",
        "en": "not",
        "ja": "not"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_bp04_031",
      "name": {
        "zh": "会话启动时加载项目上下文",
        "en": "Status Line Configuration",
        "ja": "Status Line Configuration"
      },
      "desc": {
        "zh": "\"SessionStart\": [",
        "en": "Status Line Input Fields:",
        "ja": "Status Line Input Fields:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "context"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp04_032",
      "name": {
        "zh": "使用 HTTP Hook",
        "en": "File Suggestion Configuration",
        "ja": "File Suggestion Configuration"
      },
      "desc": {
        "zh": "\"PostToolUse\": [",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "hook"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_bp04_033",
      "name": {
        "zh": "8. 来源",
        "en": "AWS & Cloud Credentials",
        "ja": "AWS & Cloud Credentials"
      },
      "desc": {
        "zh": "8. 来源",
        "en": "AWS & Cloud Credentials",
        "ja": "AWS & Cloud Credentials"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp04",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_bp05_001",
      "name": {
        "zh": "1. 什么是子代理",
        "en": "Frontmatter Fields (16)",
        "ja": "Frontmatter Fields (16)"
      },
      "desc": {
        "zh": "子代理是 Claude Code 中的专用 AI 代理，可以在主会话中被生成来执行特定任务。每个子代理可以拥有自己...",
        "en": "Frontmatter Fields (16)",
        "ja": "Frontmatter Fields (16)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp05_002",
      "name": {
        "zh": "2. Frontmatter 字段（16 个）",
        "en": "![Official](../!/tags/official.svg) **(5)**",
        "ja": "![Official](../!/tags/official.svg) **(5)**"
      },
      "desc": {
        "zh": "每个子代理通过 `.claude/agents/<name>.md` 文件定义，文件顶部的 YAML frontm...",
        "en": "![Official](../!/tags/official.svg) **(5)**",
        "ja": "![Official](../!/tags/official.svg) **(5)**"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_bp05_003",
      "name": {
        "zh": "3. 内置代理类型（5 个）",
        "en": "Sources",
        "ja": "Sources"
      },
      "desc": {
        "zh": "Claude Code 提供 5 个开箱即用的内置代理：",
        "en": "Command → Agent → Skill",
        "ja": "Command → Agent → Skill"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp05_004",
      "name": {
        "zh": "4. 创建自定义子代理",
        "en": "Weather Agent",
        "ja": "Weather Agent"
      },
      "desc": {
        "zh": "4. 创建自定义子代理",
        "en": "File",
        "ja": "File"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp05_005",
      "name": {
        "zh": "方式一：使用 `/agents` 命令",
        "en": "![How to Use](../!/tags/how-to-use.svg)",
        "ja": "![How to Use](../!/tags/how-to-use.svg)"
      },
      "desc": {
        "zh": "这会打开代理管理界面，可以创建、编辑和删除代理。",
        "en": "![How to Use](../!/tags/how-to-use.svg)",
        "ja": "![How to Use](../!/tags/how-to-use.svg)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "agent"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_bp05_006",
      "name": {
        "zh": "方式二：让 Claude 帮你创建",
        "en": "![How to Implement](../!/tags/how-to-implement.svg)",
        "ja": "![How to Implement](../!/tags/how-to-implement.svg)"
      },
      "desc": {
        "zh": "直接告诉 Claude 你需要什么样的代理，它会自动在 `.claude/agents/<name>.md` 中生...",
        "en": "Agent",
        "ja": "Agent"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_bp05_007",
      "name": {
        "zh": "方式三：手动创建文件",
        "en": "方式三：手动创建文件",
        "ja": "方式三：手动创建文件"
      },
      "desc": {
        "zh": "在 `.claude/agents/` 目录下创建一个 `.md` 文件，包含 YAML frontmatter ...",
        "en": "在 `.claude/agents/` 目录下创建一个 `.md` 文件，包含 YAML frontmatter ...",
        "ja": "在 `.claude/agents/` 目录下创建一个 `.md` 文件，包含 YAML frontmatter ..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_bp05_008",
      "name": {
        "zh": "5. 实践示例：天气代理",
        "en": "5. 实践示例：天气代理",
        "ja": "5. 实践示例：天气代理"
      },
      "desc": {
        "zh": "5. 实践示例：天气代理",
        "en": "5. 实践示例：天气代理",
        "ja": "5. 实践示例：天气代理"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_bp05_009",
      "name": {
        "zh": "代理定义",
        "en": "代理定义",
        "ja": "代理定义"
      },
      "desc": {
        "zh": "Fetch",
        "en": "Fetch",
        "ja": "Fetch"
      },
      "rarity": "SSR",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "memory"
      ],
      "power": 95,
      "defense": 85
    },
    {
      "id": "card_bp05_010",
      "name": {
        "zh": "使用方式",
        "en": "使用方式",
        "ja": "使用方式"
      },
      "desc": {
        "zh": "由于 `description` 中包含 `PROACTIVELY`，Claude 会自动识别并调用此代理来获取天...",
        "en": "由于 `description` 中包含 `PROACTIVELY`，Claude 会自动识别并调用此代理来获取天...",
        "ja": "由于 `description` 中包含 `PROACTIVELY`，Claude 会自动识别并调用此代理来获取天..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp05_011",
      "name": {
        "zh": "6. 编排架构：Command → Agent → Skill",
        "en": "6. 编排架构：Command → Agent → Skill",
        "ja": "6. 编排架构：Command → Agent → Skill"
      },
      "desc": {
        "zh": "Command → Agent → Skill",
        "en": "Command → Agent → Skill",
        "ja": "Command → Agent → Skill"
      },
      "rarity": "SR",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "agent"
      ],
      "power": 81,
      "defense": 71
    },
    {
      "id": "card_bp05_012",
      "name": {
        "zh": "工作流程",
        "en": "工作流程",
        "ja": "工作流程"
      },
      "desc": {
        "zh": "Agent Skill（代理技能）",
        "en": "Agent Skill（代理技能）",
        "ja": "Agent Skill（代理技能）"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "agent"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp05_013",
      "name": {
        "zh": "7. 权限控制",
        "en": "7. 权限控制",
        "ja": "7. 权限控制"
      },
      "desc": {
        "zh": "子代理的生成可以通过权限规则控制：",
        "en": "子代理的生成可以通过权限规则控制：",
        "ja": "子代理的生成可以通过权限规则控制："
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "permission"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_bp05_014",
      "name": {
        "zh": "8. 使用建议",
        "en": "8. 使用建议",
        "ja": "8. 使用建议"
      },
      "desc": {
        "zh": "合理选择模型",
        "en": "合理选择模型",
        "ja": "合理选择模型"
      },
      "rarity": "SSR",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "tool"
      ],
      "power": 94,
      "defense": 84
    },
    {
      "id": "card_bp05_015",
      "name": {
        "zh": "9. 来源",
        "en": "9. 来源",
        "ja": "9. 来源"
      },
      "desc": {
        "zh": "9. 来源",
        "en": "9. 来源",
        "ja": "9. 来源"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp05",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp06_001",
      "name": {
        "zh": "1. 什么是 MCP",
        "en": "MCP Servers for Daily Use",
        "ja": "MCP Servers for Daily Use"
      },
      "desc": {
        "zh": "MCP 是一个开放协议，让 Claude Code 能够与外部服务通信。通过 MCP 服务器，Claude 可以获...",
        "en": "Context7",
        "ja": "Context7"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "mcp"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp06_002",
      "name": {
        "zh": "2. 推荐的日常 MCP 服务器",
        "en": "Configuration",
        "ja": "Configuration"
      },
      "desc": {
        "zh": "文档化",
        "en": "MCP servers are configured in `.mcp.json` at the project ...",
        "ja": "MCP servers are configured in `.mcp.json` at the project ..."
      },
      "rarity": "R",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "mcp"
      ],
      "power": 59,
      "defense": 49
    },
    {
      "id": "card_bp06_003",
      "name": {
        "zh": "3. 配置",
        "en": "Server Types",
        "ja": "Server Types"
      },
      "desc": {
        "zh": "MCP 服务器在项目根目录的 `.mcp.json`（项目级）或 `~/.claude.json`（用户级）中配置。",
        "en": "stdio",
        "ja": "stdio"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_bp06_004",
      "name": {
        "zh": "传输类型",
        "en": "Example `.mcp.json`",
        "ja": "Example `.mcp.json`"
      },
      "desc": {
        "zh": "stdio",
        "en": "\"mcpServers\": {",
        "ja": "\"mcpServers\": {"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_bp06_005",
      "name": {
        "zh": "`.mcp.json` 配置示例",
        "en": "Settings for MCP Servers",
        "ja": "Settings for MCP Servers"
      },
      "desc": {
        "zh": "\"mcpServers\": {",
        "en": "These settings in `.claude/settings.json` control MCP ser...",
        "ja": "These settings in `.claude/settings.json` control MCP ser..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "mcp"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_bp06_006",
      "name": {
        "zh": "使用环境变量保护密钥",
        "en": "Permission Rules for MCP Tools",
        "ja": "Permission Rules for MCP Tools"
      },
      "desc": {
        "zh": "使用环境变量展开来引用密钥，避免在 `.mcp.json` 中硬编码 API Key：",
        "en": "MCP tools follow the `mcp__<server>__<tool>` naming conve...",
        "ja": "MCP tools follow the `mcp__<server>__<tool>` naming conve..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp06_007",
      "name": {
        "zh": "4. Settings 中的 MCP 配置",
        "en": "MCP Scopes",
        "ja": "MCP Scopes"
      },
      "desc": {
        "zh": "受管设置（Managed Settings）专用",
        "en": "Project",
        "ja": "Project"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "mcp"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_bp06_008",
      "name": {
        "zh": "受管设置中的服务器匹配",
        "en": "Sources",
        "ja": "Sources"
      },
      "desc": {
        "zh": "\"allowedMcpServers\": [",
        "en": "Sources",
        "ja": "Sources"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_bp06_009",
      "name": {
        "zh": "配置示例",
        "en": "配置示例",
        "ja": "配置示例"
      },
      "desc": {
        "zh": "\"enableAllProjectMcpServers\": true,",
        "en": "\"enableAllProjectMcpServers\": true,",
        "ja": "\"enableAllProjectMcpServers\": true,"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_bp06_010",
      "name": {
        "zh": "5. MCP 工具的权限规则",
        "en": "5. MCP 工具的权限规则",
        "ja": "5. MCP 工具的权限规则"
      },
      "desc": {
        "zh": "MCP 工具在权限规则中遵循 `mcp__<server>__<tool>` 命名约定：",
        "en": "MCP 工具在权限规则中遵循 `mcp__<server>__<tool>` 命名约定：",
        "ja": "MCP 工具在权限规则中遵循 `mcp__<server>__<tool>` 命名约定："
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "tool",
        "permission",
        "mcp"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_bp06_011",
      "name": {
        "zh": "6. MCP 作用域",
        "en": "6. MCP 作用域",
        "ja": "6. MCP 作用域"
      },
      "desc": {
        "zh": "项目级",
        "en": "项目级",
        "ja": "项目级"
      },
      "rarity": "SR",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "mcp"
      ],
      "power": 72,
      "defense": 62
    },
    {
      "id": "card_bp06_012",
      "name": {
        "zh": "7. 常用环境变量",
        "en": "7. 常用环境变量",
        "ja": "7. 常用环境变量"
      },
      "desc": {
        "zh": "7. 常用环境变量",
        "en": "7. 常用环境变量",
        "ja": "7. 常用环境变量"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_bp06_013",
      "name": {
        "zh": "8. 与子代理配合使用",
        "en": "8. 与子代理配合使用",
        "ja": "8. 与子代理配合使用"
      },
      "desc": {
        "zh": "子代理可以通过 frontmatter 中的 `mcpServers` 字段配置专属的 MCP 服务器：",
        "en": "子代理可以通过 frontmatter 中的 `mcpServers` 字段配置专属的 MCP 服务器：",
        "ja": "子代理可以通过 frontmatter 中的 `mcpServers` 字段配置专属的 MCP 服务器："
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_bp06_014",
      "name": {
        "zh": "9. 常用命令",
        "en": "9. 常用命令",
        "ja": "9. 常用命令"
      },
      "desc": {
        "zh": "9. 常用命令",
        "en": "9. 常用命令",
        "ja": "9. 常用命令"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp06_015",
      "name": {
        "zh": "10. 来源",
        "en": "10. 来源",
        "ja": "10. 来源"
      },
      "desc": {
        "zh": "10. 来源",
        "en": "10. 来源",
        "ja": "10. 来源"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp06",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp07_001",
      "name": {
        "zh": "1. 设置层级",
        "en": "Table of Contents",
        "ja": "Table of Contents"
      },
      "desc": {
        "zh": "受管设置",
        "en": "1. [Settings Hierarchy](#settings-hierarchy)",
        "ja": "1. [Settings Hierarchy](#settings-hierarchy)"
      },
      "rarity": "SSR",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 92,
      "defense": 82
    },
    {
      "id": "card_bp07_002",
      "name": {
        "zh": "2. 权限系统",
        "en": "Settings Hierarchy",
        "ja": "Settings Hierarchy"
      },
      "desc": {
        "zh": "2. 权限系统",
        "en": "Managed settings",
        "ja": "Managed settings"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "permission"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp07_003",
      "name": {
        "zh": "权限结构",
        "en": "Core Configuration",
        "ja": "Core Configuration"
      },
      "desc": {
        "zh": "\"permissions\": {",
        "en": "Core Configuration",
        "ja": "Core Configuration"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "permission"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp07_004",
      "name": {
        "zh": "权限模式",
        "en": "General Settings",
        "ja": "General Settings"
      },
      "desc": {
        "zh": "权限模式",
        "en": "(Managed only)",
        "ja": "(Managed only)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "permission"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp07_005",
      "name": {
        "zh": "工具权限语法",
        "en": "Plans & Memory Directories",
        "ja": "Plans & Memory Directories"
      },
      "desc": {
        "zh": ")` |\n| `Edit` | `Edit(path pattern)` | `Edit(src/",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "SSR",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "tool",
        "permission"
      ],
      "power": 98,
      "defense": 88
    },
    {
      "id": "card_bp07_006",
      "name": {
        "zh": "3. 模型配置",
        "en": "Worktree Settings",
        "ja": "Worktree Settings"
      },
      "desc": {
        "zh": "3. 模型配置",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp07_007",
      "name": {
        "zh": "模型别名",
        "en": "Attribution Settings",
        "ja": "Attribution Settings"
      },
      "desc": {
        "zh": "模型别名",
        "en": "DEPRECATED",
        "ja": "DEPRECATED"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_bp07_008",
      "name": {
        "zh": "Effort Level（推理深度）",
        "en": "Authentication Helpers",
        "ja": "Authentication Helpers"
      },
      "desc": {
        "zh": "effort level",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "R",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 51,
      "defense": 41
    },
    {
      "id": "card_bp07_009",
      "name": {
        "zh": "模型覆盖",
        "en": "Company Announcements",
        "ja": "Company Announcements"
      },
      "desc": {
        "zh": "将 Anthropic 模型 ID 映射到 Bedrock、Vertex 或 Foundry 部署的提供商特定模型...",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_bp07_010",
      "name": {
        "zh": "模型环境变量",
        "en": "Permissions",
        "ja": "Permissions"
      },
      "desc": {
        "zh": "通过 `env` 键配置：",
        "en": "Control what tools and operations Claude can perform.",
        "ja": "Control what tools and operations Claude can perform."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_bp07_011",
      "name": {
        "zh": "4. 显示与用户体验",
        "en": "Permission Structure",
        "ja": "Permission Structure"
      },
      "desc": {
        "zh": "4. 显示与用户体验",
        "en": "\"permissions\": {",
        "ja": "\"permissions\": {"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_bp07_012",
      "name": {
        "zh": "显示设置",
        "en": "Permission Keys",
        "ja": "Permission Keys"
      },
      "desc": {
        "zh": "显示设置",
        "en": "(Managed only)",
        "ja": "(Managed only)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_bp07_013",
      "name": {
        "zh": "状态栏配置",
        "en": "Permission Modes",
        "ja": "Permission Modes"
      },
      "desc": {
        "zh": "\"statusLine\": {",
        "en": "Permission Modes",
        "ja": "Permission Modes"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 40,
      "defense": 30
    },
    {
      "id": "card_bp07_014",
      "name": {
        "zh": "Spinner 自定义示例",
        "en": "Tool Permission Syntax",
        "ja": "Tool Permission Syntax"
      },
      "desc": {
        "zh": "\"spinnerVerbs\": {",
        "en": ")` |\n| `Edit` | `Edit(path pattern)` | `Edit(src/",
        "ja": ")` |\n| `Edit` | `Edit(path pattern)` | `Edit(src/"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_bp07_015",
      "name": {
        "zh": "全局配置（`~/.claude.json`）",
        "en": "Hooks",
        "ja": "Hooks"
      },
      "desc": {
        "zh": "以下偏好存储在 `~/.claude.json` 中（**不是** `settings.json`）：",
        "en": "[claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks)",
        "ja": "[claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_bp07_016",
      "name": {
        "zh": "5. 沙箱",
        "en": "MCP Servers",
        "ja": "MCP Servers"
      },
      "desc": {
        "zh": "沙箱为 Bash 命令提供安全隔离：",
        "en": "Configure Model Context Protocol servers for extended cap...",
        "ja": "Configure Model Context Protocol servers for extended cap..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "security"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp07_017",
      "name": {
        "zh": "6. 插件系统",
        "en": "MCP Settings",
        "ja": "MCP Settings"
      },
      "desc": {
        "zh": "6. 插件系统",
        "en": "MCP Settings",
        "ja": "MCP Settings"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp07_018",
      "name": {
        "zh": "插件设置",
        "en": "MCP Server Matching (Managed Settings)",
        "ja": "MCP Server Matching (Managed Settings)"
      },
      "desc": {
        "zh": "插件设置",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp07_019",
      "name": {
        "zh": "市场来源类型",
        "en": "Sandbox",
        "ja": "Sandbox"
      },
      "desc": {
        "zh": "`github`、`git`、`directory`、`hostPattern`、`settings`、`url`...",
        "en": "Configure bash command sandboxing for security.",
        "ja": "Configure bash command sandboxing for security."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp07_020",
      "name": {
        "zh": "7. 其他核心设置",
        "en": "Sandbox Settings",
        "ja": "Sandbox Settings"
      },
      "desc": {
        "zh": "7. 其他核心设置",
        "en": "Note:",
        "ja": "Note:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_bp07_021",
      "name": {
        "zh": "通用设置",
        "en": "Plugins",
        "ja": "Plugins"
      },
      "desc": {
        "zh": "通用设置",
        "en": "Configure Claude Code plugins and marketplaces.",
        "ja": "Configure Claude Code plugins and marketplaces."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp07_022",
      "name": {
        "zh": "Plans 和 Memory 目录",
        "en": "Plugin Settings",
        "ja": "Plugin Settings"
      },
      "desc": {
        "zh": "Plans 和 Memory 目录",
        "en": "Marketplace source types:",
        "ja": "Marketplace source types:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "memory",
        "plan"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp07_023",
      "name": {
        "zh": "Worktree（工作树）设置",
        "en": "Model Configuration",
        "ja": "Model Configuration"
      },
      "desc": {
        "zh": "\"worktree\": {",
        "en": "Model Configuration",
        "ja": "Model Configuration"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp07_024",
      "name": {
        "zh": "Attribution（署名）设置",
        "en": "Model Aliases",
        "ja": "Model Aliases"
      },
      "desc": {
        "zh": "\"attribution\": {",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp07_025",
      "name": {
        "zh": "认证辅助",
        "en": "Model Overrides",
        "ja": "Model Overrides"
      },
      "desc": {
        "zh": "认证辅助",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp07_026",
      "name": {
        "zh": "8. Power-ups（交互教程）",
        "en": "Effort Level",
        "ja": "Effort Level"
      },
      "desc": {
        "zh": "Power-ups 是 v2.1.90 引入的交互式课程，通过动画演示教授 Claude Code 的功能。每个 ...",
        "en": "effort level",
        "ja": "effort level"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 32,
      "defense": 22
    },
    {
      "id": "card_bp07_027",
      "name": {
        "zh": "使用方式",
        "en": "Model Environment Variables",
        "ja": "Model Environment Variables"
      },
      "desc": {
        "zh": "使用方式",
        "en": "Configure via `env` key:",
        "ja": "Configure via `env` key:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_bp07_028",
      "name": {
        "zh": "全部 10 个 Power-ups",
        "en": "Display & UX",
        "ja": "Display & UX"
      },
      "desc": {
        "zh": "全部 10 个 Power-ups",
        "en": "Display & UX",
        "ja": "Display & UX"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp07_029",
      "name": {
        "zh": "9. CLI 启动标志",
        "en": "Display Settings",
        "ja": "Display Settings"
      },
      "desc": {
        "zh": "从终端启动 Claude Code 时可使用的标志和子命令参考。",
        "en": "Display Settings",
        "ja": "Display Settings"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp07_030",
      "name": {
        "zh": "会话管理",
        "en": "Global Config Settings (`~/.claude.json`)",
        "ja": "Global Config Settings (`~/.claude.json`)"
      },
      "desc": {
        "zh": "会话管理",
        "en": "not",
        "ja": "not"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_bp07_031",
      "name": {
        "zh": "模型与配置",
        "en": "Status Line Configuration",
        "ja": "Status Line Configuration"
      },
      "desc": {
        "zh": "模型与配置",
        "en": "Status Line Input Fields:",
        "ja": "Status Line Input Fields:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_bp07_032",
      "name": {
        "zh": "权限与安全",
        "en": "File Suggestion Configuration",
        "ja": "File Suggestion Configuration"
      },
      "desc": {
        "zh": "权限与安全",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "permission",
        "security"
      ],
      "power": 42,
      "defense": 32
    },
    {
      "id": "card_bp07_033",
      "name": {
        "zh": "输出与格式",
        "en": "AWS & Cloud Credentials",
        "ja": "AWS & Cloud Credentials"
      },
      "desc": {
        "zh": "输出与格式",
        "en": "AWS & Cloud Credentials",
        "ja": "AWS & Cloud Credentials"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 41,
      "defense": 31
    },
    {
      "id": "card_bp07_034",
      "name": {
        "zh": "系统提示词",
        "en": "AWS Settings",
        "ja": "AWS Settings"
      },
      "desc": {
        "zh": "系统提示词",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "prompt"
      ],
      "power": 37,
      "defense": 27
    },
    {
      "id": "card_bp07_035",
      "name": {
        "zh": "代理与子代理",
        "en": "OpenTelemetry",
        "ja": "OpenTelemetry"
      },
      "desc": {
        "zh": "代理与子代理",
        "en": "Example:",
        "ja": "Example:"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp07_036",
      "name": {
        "zh": "MCP 与插件",
        "en": "Environment Variables (via `env`)",
        "ja": "Environment Variables (via `env`)"
      },
      "desc": {
        "zh": "MCP 与插件",
        "en": "Set environment variables for all Claude Code sessions.",
        "ja": "Set environment variables for all Claude Code sessions."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "mcp"
      ],
      "power": 39,
      "defense": 29
    },
    {
      "id": "card_bp07_037",
      "name": {
        "zh": "目录与工作区",
        "en": "Common Environment Variables",
        "ja": "Common Environment Variables"
      },
      "desc": {
        "zh": "目录与工作区",
        "en": "DEPRECATED",
        "ja": "DEPRECATED"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 36,
      "defense": 26
    },
    {
      "id": "card_bp07_038",
      "name": {
        "zh": "预算与限制",
        "en": "Useful Commands",
        "ja": "Useful Commands"
      },
      "desc": {
        "zh": "预算与限制",
        "en": "Useful Commands",
        "ja": "Useful Commands"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_bp07_039",
      "name": {
        "zh": "集成",
        "en": "Quick Reference: Complete Example",
        "ja": "Quick Reference: Complete Example"
      },
      "desc": {
        "zh": "集成",
        "en": "\"$schema\": \"https://json.schemastore.org/claude-code-sett...",
        "ja": "\"$schema\": \"https://json.schemastore.org/claude-code-sett..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 35,
      "defense": 25
    },
    {
      "id": "card_bp07_040",
      "name": {
        "zh": "初始化与维护",
        "en": "Sources",
        "ja": "Sources"
      },
      "desc": {
        "zh": "初始化与维护",
        "en": "Interactive lessons teaching Claude Code features with an...",
        "ja": "Interactive lessons teaching Claude Code features with an..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 34,
      "defense": 24
    },
    {
      "id": "card_bp07_041",
      "name": {
        "zh": "调试与诊断",
        "en": "Usage",
        "ja": "Usage"
      },
      "desc": {
        "zh": "调试与诊断",
        "en": "Usage",
        "ja": "Usage"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 44,
      "defense": 34
    },
    {
      "id": "card_bp07_042",
      "name": {
        "zh": "设置覆盖",
        "en": "Power-ups (10)",
        "ja": "Power-ups (10)"
      },
      "desc": {
        "zh": "设置覆盖",
        "en": "Power-ups (10)",
        "ja": "Power-ups (10)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 30,
      "defense": 20
    },
    {
      "id": "card_bp07_043",
      "name": {
        "zh": "10. 顶层子命令",
        "en": "Example: Dial the model",
        "ja": "Example: Dial the model"
      },
      "desc": {
        "zh": "作为 `claude <subcommand>` 运行：",
        "en": "The last power-up teaches model switching and effort cont...",
        "ja": "The last power-up teaches model switching and effort cont..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 33,
      "defense": 23
    },
    {
      "id": "card_bp07_044",
      "name": {
        "zh": "11. 仅启动环境变量",
        "en": "Sources",
        "ja": "Sources"
      },
      "desc": {
        "zh": "以下环境变量只能在启动 Claude Code 之前在 Shell 中设置（不能通过 `settings.json...",
        "en": "Reference for Claude Code startup flags, top-level subcom...",
        "ja": "Reference for Claude Code startup flags, top-level subcom..."
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    },
    {
      "id": "card_bp07_045",
      "name": {
        "zh": "12. 常用命令速查",
        "en": "Table of Contents",
        "ja": "Table of Contents"
      },
      "desc": {
        "zh": "12. 常用命令速查",
        "en": "1. [Session Management](#session-management)",
        "ja": "1. [Session Management](#session-management)"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 38,
      "defense": 28
    },
    {
      "id": "card_bp07_046",
      "name": {
        "zh": "13. 完整配置示例",
        "en": "Session Management",
        "ja": "Session Management"
      },
      "desc": {
        "zh": "\"$schema\": \"https://json.schemastore.org/claude-code-sett...",
        "en": "Session Management",
        "ja": "Session Management"
      },
      "rarity": "R",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 53,
      "defense": 43
    },
    {
      "id": "card_bp07_047",
      "name": {
        "zh": "14. 来源",
        "en": "Model & Configuration",
        "ja": "Model & Configuration"
      },
      "desc": {
        "zh": "14. 来源",
        "en": "Model & Configuration",
        "ja": "Model & Configuration"
      },
      "rarity": "N",
      "region": "practice",
      "chapter": "bp07",
      "tags": [
        "concept"
      ],
      "power": 43,
      "defense": 33
    }
  ]
};
