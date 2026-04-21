module.exports = {
  "stages": [
    {
      "id": "stage_s01",
      "chapter": "s01",
      "region": "core",
      "title": {
        "zh": "最小闭环",
        "en": "Minimal Closed Loop",
        "ja": "最小の閉ループ"
      },
      "questions": [
        {
          "id": "q_s01_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「这一章要解决什么问题」的正确理解是？",
            "en": "What is the correct understanding of \"What You'll Learn\" in Claude Code?",
            "ja": "Claude Code における「この章が解く問題」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第四步：把 `todo` 接成一个工具",
                "en": "第四步：把 `todo` 接成一个工具",
                "ja": "第 4 段階: `todo` を 1 つの tool として loop へ接ぐ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "版本 3：加入最大轮数和失败保护",
                "en": "版本 3：加入最大轮数和失败保护",
                "ja": "Version 3: safety bound を足す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "5. 以为 reminder 是可有可无的小装饰",
                "en": "5. 以为 reminder 是可有可无的小装饰",
                "ja": "5. session plan と durable task graph を同一視する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "把“模型 + 工具”连接成一个能持续推进任务的主循环。",
            "en": "What You'll Learn",
            "ja": "model と tool を閉ループに接続し、仕事を継続的に前へ進める最小 agent を作ること"
          },
          "reward_card": "card_s01_001"
        },
        {
          "id": "q_s01_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Problem",
                "ja": "先に言葉をそろえる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "坑 1：把子智能体当成“为了炫技的并发”",
                "en": "坑 1：把子智能体当成“为了炫技的并发”",
                "ja": "1. subagent を「並列アピール機能」だと思う"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "它如何接到主循环里",
                "en": "它如何接到主循环里",
                "ja": "它如何接到主循环里"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "1. PlanItem",
                "en": "1. PlanItem",
                "ja": "1. PlanItem"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Problem",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s01_002"
        },
        {
          "id": "q_s01_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 loop」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「loop とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "1. 以为压缩等于删除",
                "en": "1. 以为压缩等于删除",
                "ja": "1. 以为压缩等于删除"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 loop",
                "en": "The Solution",
                "ja": "loop とは何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "1. 把计划写得过长",
                "en": "1. 把计划写得过长",
                "ja": "1. plan を model の頭の中だけに置く"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "为什么它真的有用",
                "en": "为什么它真的有用",
                "ja": "なぜ本当に useful なのか"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 loop",
            "en": "The Solution",
            "ja": "loop とは何か"
          },
          "reward_card": "card_s01_003"
        },
        {
          "id": "q_s01_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 turn」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「turn とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "它如何接进整个系统",
                "en": "它如何接进整个系统",
                "ja": "この章でわざと単純化していること"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2. Tool Result Block",
                "en": "2. Tool Result Block",
                "ja": "2. Tool Result Block"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 turn",
                "en": "How It Works",
                "ja": "turn とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "这一章最关键的数据结构",
                "en": "这一章最关键的数据结构",
                "ja": "この章の核になるデータ構造"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 turn",
            "en": "Step 1.",
            "ja": "turn とは何か"
          },
          "reward_card": "card_s01_004"
        },
        {
          "id": "q_s01_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 tool_result」直接相关？",
            "en": "Which concept is directly related to \"What Changed\"?",
            "ja": "「tool_result とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "第三步：把 skill 目录放进 system prompt",
                "en": "第三步：把 skill 目录放进 system prompt",
                "ja": "第三步：把 skill 目录放进 system prompt"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "为什么这章故意不讲成任务图",
                "en": "为什么这章故意不讲成任务图",
                "ja": "なぜここで task graph まで教えないのか"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 tool_result",
                "en": "What Changed",
                "ja": "tool_result とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "它如何接到主循环里",
                "en": "它如何接到主循环里",
                "ja": "它如何接到主循环里"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 tool_result",
            "en": "What Changed",
            "ja": "tool_result とは何か"
          },
          "reward_card": "card_s01_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s01_001",
        "card_s01_002",
        "card_s01_003"
      ]
    },
    {
      "id": "stage_s02",
      "chapter": "s02",
      "region": "core",
      "title": {
        "zh": "把意图路由成动作",
        "en": "Route Intent into Action",
        "ja": "意図を実行へルーティングする"
      },
      "questions": [
        {
          "id": "q_s02_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「问题」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「問題」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "问题",
                "en": "What You'll Learn",
                "ja": "問題"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2. 只保存用户消息，不保存 assistant 消息",
                "en": "2. 只保存用户消息，不保存 assistant 消息",
                "ja": "2. 只保存用户消息，不保存 assistant 消息"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第五步：让 skill 正文只在当前需要时进入上下文",
                "en": "第五步：让 skill 正文只在当前需要时进入上下文",
                "ja": "第五步：让 skill 正文只在当前需要时进入上下文"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Problem",
                "ja": "解決策"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "问题",
            "en": "What You'll Learn",
            "ja": "問題"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_002",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「解决方案」的正确理解是？",
            "en": "What is the correct understanding of \"The Problem\" in Claude Code?",
            "ja": "Claude Code における「解決策」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "解决方案",
                "en": "The Problem",
                "ja": "解決策"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2. skill 目录信息写得太弱",
                "en": "2. skill 目录信息写得太弱",
                "ja": "2. skill 目录信息写得太弱"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "什么是 active step",
                "en": "What Changed From s02",
                "ja": "active step とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "最小心智模型",
                "en": "What's Next",
                "ja": "最小心智モデル"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "解决方案",
            "en": "The Problem",
            "ja": "解決策"
          },
          "reward_card": "card_s02_002"
        },
        {
          "id": "q_s02_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「工作原理」的正确理解是？",
            "en": "What is the correct understanding of \"The Solution\" in Claude Code?",
            "ja": "Claude Code における「仕組み」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "什么是 todo",
                "en": "How It Works",
                "ja": "todo とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "版本 1：空白上下文子智能体",
                "en": "版本 1：空白上下文子智能体",
                "ja": "Version 1: blank-context subagent"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "最小实现",
                "en": "最小实现",
                "ja": "最小実装を段階で追う"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "工作原理",
                "en": "The Solution",
                "ja": "仕組み"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "kw: run_bash(kw[\"command\"]),\n    \"read_file\":  lambda",
            "en": "The Solution",
            "ja": "kw: run_bash(kw[\"command\"]),\n    \"read_file\":  lambda"
          },
          "reward_card": "card_s02_003"
        },
        {
          "id": "q_s02_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「消息规范化」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「s01からの変更点」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "第三步：子智能体只拿必要工具",
                "en": "第三步：子智能体只拿必要工具",
                "ja": "第 3 段階: 子に渡す tool は絞る"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "2. Tool Result Block",
                "en": "2. Tool Result Block",
                "ja": "2. Tool Result Block"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md",
                "en": "CLAUDE.md",
                "ja": "CLAUDE.md"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "消息规范化",
                "en": "How It Works",
                "ja": "s01からの変更点"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "消息规范化",
            "en": "Step 1.",
            "ja": "s01からの変更点"
          },
          "reward_card": "card_s02_004"
        },
        {
          "id": "q_s02_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「为什么需要」直接相关？",
            "en": "Which concept is directly related to \"What Changed From s01\"?",
            "ja": "「試してみる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "为什么需要",
                "en": "What Changed From s01",
                "ja": "試してみる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "5. 一上来就讲太多多源加载细节",
                "en": "5. 一上来就讲太多多源加载细节",
                "ja": "5. 一上来就讲太多多源加载细节"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "1. 把所有 skill 正文永远塞进 system prompt",
                "en": "1. 把所有 skill 正文永远塞进 system prompt",
                "ja": "1. 把所有 skill 正文永远塞进 system prompt"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. 把工具结果打印出来，但不写回 `messages`",
                "en": "1. 把工具结果打印出来，但不写回 `messages`",
                "ja": "一文で覚える"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "严格交替",
            "en": "What Changed From s01",
            "ja": "試してみる"
          },
          "reward_card": "card_s02_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s02_001",
        "card_s02_002",
        "card_s02_003"
      ]
    },
    {
      "id": "stage_s03",
      "chapter": "s03",
      "region": "core",
      "title": {
        "zh": "会话级计划",
        "en": "Session Planning",
        "ja": "セッション計画"
      },
      "questions": [
        {
          "id": "q_s03_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「这一章要解决什么问题」的正确理解是？",
            "en": "What is the correct understanding of \"What You'll Learn\" in Claude Code?",
            "ja": "Claude Code における「この章が解く問題」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第四步：如果模型调用了工具，就执行",
                "en": "第四步：如果模型调用了工具，就执行",
                "ja": "第 4 段階: tool_use があればจริง行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "版本 3：加入最大轮数和失败保护",
                "en": "版本 3：加入最大轮数和失败保护",
                "ja": "Version 3: safety bound を足す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第一步：准备一个计划管理器",
                "en": "第一步：准备一个计划管理器",
                "ja": "第 1 段階: plan manager を用意する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "显式、稳定、可反复更新",
            "en": "What You'll Learn",
            "ja": "現在の plan を explicit に置いておく stable state がないこと"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "组合成一个完整循环",
                "en": "组合成一个完整循环",
                "ja": "全体を 1 つの loop にまとめる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Problem",
                "ja": "先に言葉をそろえる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. PlanItem",
                "en": "1. PlanItem",
                "ja": "1. PlanItem"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "什么是 skill",
                "en": "The Solution",
                "ja": "仕組み"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Problem",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s03_002"
        },
        {
          "id": "q_s03_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是会话内规划」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「session 内 planning とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "什么是会话内规划",
                "en": "The Solution",
                "ja": "session 内 planning とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "什么是 state",
                "en": "Try It",
                "ja": "state とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "什么是 turn",
                "en": "How It Works",
                "ja": "turn とは何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么是 loading",
                "en": "What Changed From s04",
                "ja": "試してみる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是会话内规划",
            "en": "The Solution",
            "ja": "session 内 planning とは何か"
          },
          "reward_card": "card_s03_003"
        },
        {
          "id": "q_s03_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 todo」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「todo とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "和后续章节的关系",
                "en": "和后续章节的关系",
                "ja": "5. `max_turns` のような safety bound を持たない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "3. 摘要只写成一句空话",
                "en": "3. 摘要只写成一句空话",
                "ja": "3. 摘要只写成一句空话"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 todo",
                "en": "How It Works",
                "ja": "todo とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "3. 把会话计划当成长期任务系统",
                "en": "3. 把会话计划当成长期任务系统",
                "ja": "3. plan を一度書いたら更新しない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 todo",
            "en": "Step 1.",
            "ja": "todo とは何か"
          },
          "reward_card": "card_s03_004"
        },
        {
          "id": "q_s03_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 active step」直接相关？",
            "en": "Which concept is directly related to \"What Changed From s02\"?",
            "ja": "「active step とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "实现",
                "en": "Try It",
                "ja": "教学上の簡略化"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 active step",
                "en": "What Changed From s02",
                "ja": "active step とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "3. 把 skill 当成“绝对规则”",
                "en": "3. 把 skill 当成“绝对规则”",
                "ja": "3. 把 skill 当成“绝对规则”"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "消息规范化",
                "en": "How It Works",
                "ja": "s01からの変更点"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 active step",
            "en": "What Changed From s02",
            "ja": "同時にあれもこれも進めて plan をぼかさないこと"
          },
          "reward_card": "card_s03_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s03_001",
        "card_s03_002",
        "card_s03_003"
      ]
    },
    {
      "id": "stage_s04",
      "chapter": "s04",
      "region": "core",
      "title": {
        "zh": "子任务使用全新上下文",
        "en": "Fresh Context per Subtask",
        "ja": "サブタスクごとに新しい文脈を使う"
      },
      "questions": [
        {
          "id": "q_s04_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章到底要解决什么问题」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「この章が解く問題」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "3. SkillRegistry",
                "en": "3. SkillRegistry",
                "ja": "3. SkillRegistry"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "5. 一上来就给初学者讲过多产品化层级",
                "en": "5. 一上来就给初学者讲过多产品化层级",
                "ja": "5. 一上来就给初学者讲过多产品化层级"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章到底要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "什么是“父智能体”",
                "en": "The Solution",
                "ja": "親 agent とは何か"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "把局部任务放进独立上下文里做，做完只把必要结果带回来。",
            "en": "What You'll Learn",
            "ja": "局所 task を別 context に閉じ込め、親には必要な summary だけを持ち帰る"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "什么是压缩",
                "en": "Step 1: Lever 0 -- Persisted Output",
                "ja": "試してみる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "用处 3：让后面的多 agent 协作有基础",
                "en": "用处 3：让后面的多 agent 协作有基础",
                "ja": "3. 後の multi-agent chapter の準備になる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Problem",
                "ja": "先に言葉をそろえる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "5. 以为 reminder 是可有可无的小装饰",
                "en": "5. 以为 reminder 是可有可无的小装饰",
                "ja": "5. session plan と durable task graph を同一視する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Problem",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s04_002"
        },
        {
          "id": "q_s04_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是“父智能体”」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「親 agent とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是“父智能体”",
                "en": "The Solution",
                "ja": "親 agent とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "坑 2：把父历史全部原样灌回去",
                "en": "坑 2：把父历史全部原样灌回去",
                "ja": "2. 子の history を全部親へ戻してしまう"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "初学者最容易犯的错"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是“父智能体”",
            "en": "The Solution",
            "ja": "親 agent とは何か"
          },
          "reward_card": "card_s04_003"
        },
        {
          "id": "q_s04_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是“子智能体”」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「子 agent とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "第二步：从 `SKILL.md` 里读取最小元信息",
                "en": "第二步：从 `SKILL.md` 里读取最小元信息",
                "ja": "第二步：从 `SKILL.md` 里读取最小元信息"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "最小实现",
                "en": "Try It",
                "ja": "最小实现"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "坑 1：把子智能体当成“为了炫技的并发”",
                "en": "坑 1：把子智能体当成“为了炫技的并发”",
                "ja": "1. subagent を「並列アピール機能」だと思う"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是“子智能体”",
                "en": "How It Works",
                "ja": "子 agent とは何か"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是“子智能体”",
            "en": "Step 1.",
            "ja": "子 agent とは何か"
          },
          "reward_card": "card_s04_004"
        },
        {
          "id": "q_s04_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么叫“上下文隔离”」直接相关？",
            "en": "Which concept is directly related to \"What Changed From s03\"?",
            "ja": "「context isolation とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "第五步：让 skill 正文只在当前需要时进入上下文",
                "en": "第五步：让 skill 正文只在当前需要时进入上下文",
                "ja": "第五步：让 skill 正文只在当前需要时进入上下文"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么叫“上下文隔离”",
                "en": "What Changed From s03",
                "ja": "context isolation とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. 把所有 skill 正文永远塞进 system prompt",
                "en": "1. 把所有 skill 正文永远塞进 system prompt",
                "ja": "1. 把所有 skill 正文永远塞进 system prompt"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "この章を読み終えたら何が言えるべきか"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么叫“上下文隔离”",
            "en": "What Changed From s03",
            "ja": "context isolation とは何か"
          },
          "reward_card": "card_s04_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s04_001",
        "card_s04_002",
        "card_s04_003"
      ]
    },
    {
      "id": "stage_s05",
      "chapter": "s05",
      "region": "core",
      "title": {
        "zh": "先轻发现，再深加载",
        "en": "Discover Cheaply, Load Deeply",
        "ja": "軽く見つけて、必要時に深く読む"
      },
      "questions": [
        {
          "id": "q_s05_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章要解决什么问题」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「問題」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "問題"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第四步：如果模型调用了工具，就执行",
                "en": "第四步：如果模型调用了工具，就执行",
                "ja": "第 4 段階: tool_use があればจริง行する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "什么是上下文窗口",
                "en": "The Solution",
                "ja": "仕組み"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "3. 摘要只写成一句空话",
                "en": "3. 摘要只写成一句空话",
                "ja": "3. 摘要只写成一句空话"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "把“长期可选知识”从 system prompt 主体里拆出来，改成按需加载。",
            "en": "What You'll Learn",
            "ja": "問題"
          },
          "reward_card": "card_s05_001"
        },
        {
          "id": "q_s05_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「解決策」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "什么是 loading",
                "en": "What Changed From s04",
                "ja": "試してみる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "消息规范化",
                "en": "How It Works",
                "ja": "s01からの変更点"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么是 state",
                "en": "Try It",
                "ja": "state とは何か"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Problem",
                "ja": "解決策"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Problem",
            "ja": "解決策"
          },
          "reward_card": "card_s05_002"
        },
        {
          "id": "q_s05_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 skill」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「仕組み」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "最小实现",
                "en": "最小实现",
                "ja": "最小実装を段階で追う"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 skill",
                "en": "The Solution",
                "ja": "仕組み"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "3. SkillRegistry",
                "en": "3. SkillRegistry",
                "ja": "3. SkillRegistry"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 skill",
            "en": "The Solution",
            "ja": "仕組み"
          },
          "reward_card": "card_s05_003"
        },
        {
          "id": "q_s05_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 discovery」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「s04からの変更点」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "5. 一上来就讲太多多源加载细节",
                "en": "5. 一上来就讲太多多源加载细节",
                "ja": "5. 一上来就讲太多多源加载细节"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 discovery",
                "en": "How It Works",
                "ja": "s04からの変更点"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第五步：把工具结果作为新消息写回去",
                "en": "第五步：把工具结果作为新消息写回去",
                "ja": "第 5 段階: tool_result を user-side message として write-back する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第三步：追加 assistant 回复",
                "en": "第三步：追加 assistant 回复",
                "ja": "第 3 段階: assistant response 自体も history へ戻す"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 discovery",
            "en": "Step 1.",
            "ja": "s04からの変更点"
          },
          "reward_card": "card_s05_004"
        },
        {
          "id": "q_s05_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 loading」直接相关？",
            "en": "Which concept is directly related to \"What Changed From s04\"?",
            "ja": "「試してみる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Problem",
                "ja": "先に言葉をそろえる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "3. 摘要只写成一句空话",
                "en": "3. 摘要只写成一句空话",
                "ja": "3. 摘要只写成一句空话"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "5. 以为 reminder 是可有可无的小装饰",
                "en": "5. 以为 reminder 是可有可无的小装饰",
                "ja": "5. session plan と durable task graph を同一視する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 loading",
                "en": "What Changed From s04",
                "ja": "試してみる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 loading",
            "en": "What Changed From s04",
            "ja": "試してみる"
          },
          "reward_card": "card_s05_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s05_001",
        "card_s05_002",
        "card_s05_003"
      ]
    },
    {
      "id": "stage_s06",
      "chapter": "s06",
      "region": "core",
      "title": {
        "zh": "保持活跃上下文小而稳",
        "en": "Keep Active Context Small and Stable",
        "ja": "活性コンテキストを小さく安定させる"
      },
      "questions": [
        {
          "id": "q_s06_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章要解决什么问题」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「問題」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "最小实现",
                "en": "最小实现",
                "ja": "最小实现"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第一步：准备初始消息",
                "en": "第一步：准备初始消息",
                "ja": "第 1 段階: 初期 message を作る"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "問題"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "3. 把 skill 当成“绝对规则”",
                "en": "3. 把 skill 当成“绝对规则”",
                "ja": "3. 把 skill 当成“绝对规则”"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "怎样在不丢掉主线连续性的前提下，把活跃上下文重新腾出空间。",
            "en": "What You'll Learn",
            "ja": "問題"
          },
          "reward_card": "card_s06_001"
        },
        {
          "id": "q_s06_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「解決策」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "组合成一个完整循环",
                "en": "组合成一个完整循环",
                "ja": "全体を 1 つの loop にまとめる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Problem",
                "ja": "解決策"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "什么是 discovery",
                "en": "How It Works",
                "ja": "s04からの変更点"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "第三步：整体历史过长时，做一次完整压缩",
                "en": "Key Takeaway",
                "ja": "第三步：整体历史过长时，做一次完整压缩"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Problem",
            "ja": "解決策"
          },
          "reward_card": "card_s06_002"
        },
        {
          "id": "q_s06_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是上下文窗口」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「仕組み」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "消息规范化",
                "en": "How It Works",
                "ja": "s01からの変更点"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "为什么它真的有用",
                "en": "为什么它真的有用",
                "ja": "なぜ本当に useful なのか"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第五步：让 skill 正文只在当前需要时进入上下文",
                "en": "第五步：让 skill 正文只在当前需要时进入上下文",
                "ja": "第五步：让 skill 正文只在当前需要时进入上下文"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是上下文窗口",
                "en": "The Solution",
                "ja": "仕組み"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是上下文窗口",
            "en": "The Solution",
            "ja": "レバー 0 -- persisted-output"
          },
          "reward_card": "card_s06_003"
        },
        {
          "id": "q_s06_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是活跃上下文」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「s05からの変更点」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "什么是 fork，为什么它是“下一步”，不是“起步”",
                "en": "什么是 fork，为什么它是“下一步”，不是“起步”",
                "ja": "fork とは何か、なぜ「次の段階」なのか"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "3. SkillRegistry",
                "en": "3. SkillRegistry",
                "ja": "3. SkillRegistry"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是活跃上下文",
                "en": "How It Works",
                "ja": "s05からの変更点"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. Message",
                "en": "Key Takeaway",
                "ja": "1. Message"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是活跃上下文",
            "en": "How It Works",
            "ja": "s05からの変更点"
          },
          "reward_card": "card_s06_004"
        },
        {
          "id": "q_s06_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是压缩」直接相关？",
            "en": "Which concept is directly related to \"Step 1: Lever 0 -- Persisted Output\"?",
            "ja": "「試してみる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md",
                "en": "CLAUDE.md",
                "ja": "CLAUDE.md"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是压缩",
                "en": "Step 1: Lever 0 -- Persisted Output",
                "ja": "試してみる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "最小心智模型",
                "en": "What You've Mastered",
                "ja": "最小心智モデル"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "问题",
                "en": "What You'll Learn",
                "ja": "問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是压缩",
            "en": "Step 1: Lever 0 -- Persisted Output",
            "ja": "試してみる"
          },
          "reward_card": "card_s06_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s06_001",
        "card_s06_002",
        "card_s06_003"
      ]
    },
    {
      "id": "stage_s07",
      "chapter": "s07",
      "region": "tools",
      "title": {
        "zh": "意图先过安全闸门",
        "en": "Intent Must Pass a Safety Gate",
        "ja": "意図は先に安全ゲートを通る"
      },
      "questions": [
        {
          "id": "q_s07_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章的核心目标」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「この章の核心目標」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "学完这章后，你应该能回答",
                "en": "学完这章后，你应该能回答",
                "ja": "学完这章后，你应该能回答"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "初学者最容易犯的错"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章的核心目标",
                "en": "What You'll Learn",
                "ja": "この章の核心目標"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "“意图”不能直接变成“执行”，中间必须经过权限检查。",
            "en": "What You'll Learn",
            "ja": "「model の意図」がそのまま「実行」へ落ちる"
          },
          "reward_card": "card_s07_001"
        },
        {
          "id": "q_s07_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「併読すると楽になる資料」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "1. 把所有错误都当成一种错误",
                "en": "1. 把所有错误都当成一种错误",
                "ja": "初学者が混ぜやすいポイント"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "这一章和前后章节怎么衔接",
                "en": "这一章和前后章节怎么衔接",
                "ja": "5. なぜ続行しているのかを state に残さない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "最小心智模型",
                "en": "Read Together",
                "ja": "最小心智モデル"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "併読すると楽になる資料"
          },
          "reward_card": "card_s07_002"
        },
        {
          "id": "q_s07_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "memory 为什么要和 system prompt 有关系",
                "en": "memory 为什么要和 system prompt 有关系",
                "ja": "memory 为什么要和 system prompt 有关系"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "三条恢复路径分别在补什么洞",
                "en": "三条恢复路径分别在补什么洞",
                "ja": "第 1 段階: recovery chooser を作る"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第二步：先做 deny / allow 两类规则",
                "en": "第二步：先做 deny / allow 两类规则",
                "ja": "初学者が混ぜやすいポイント"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Solution",
                "ja": "先に言葉をそろえる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Solution",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s07_003"
        },
        {
          "id": "q_s07_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是权限系统」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「permission system とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "第三步：给 bash 加最小安全检查",
                "en": "第三步：给 bash 加最小安全检查",
                "ja": "1. permission を yes/no の 2 値で考える"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么是“组装流水线”",
                "en": "What Changed from s09",
                "ja": "最小 builder"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "学完这章后，你应该能回答",
                "en": "学完这章后，你应该能回答",
                "ja": "学完这章后，你应该能回答"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是权限系统",
                "en": "Read Together",
                "ja": "permission system とは何か"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是权限系统",
            "en": "Read Together",
            "ja": "permission system とは何か"
          },
          "reward_card": "card_s07_004"
        },
        {
          "id": "q_s07_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是权限模式」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「permission mode とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "什么叫恢复",
                "en": "How It Works",
                "ja": "recovery とは何か"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是权限模式",
                "en": "How It Works",
                "ja": "permission mode とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "2. Hook ごとに別のデータ形を渡す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "1. 权限规则",
                "en": "1. 权限规则",
                "ja": "1. PermissionRule"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是权限模式",
            "en": "Step 1.",
            "ja": "permission mode とは何か"
          },
          "reward_card": "card_s07_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s07_001",
        "card_s07_002",
        "card_s07_003"
      ]
    },
    {
      "id": "stage_s08",
      "chapter": "s08",
      "region": "tools",
      "title": {
        "zh": "不改主循环也能扩展",
        "en": "Extend Without Rewriting the Loop",
        "ja": "主ループを書き換えずに拡張する"
      },
      "questions": [
        {
          "id": "q_s08_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这章要解决什么问题」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「この章が解決する問題」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "第三步：给 bash 加最小安全检查",
                "en": "第三步：给 bash 加最小安全检查",
                "ja": "1. permission を yes/no の 2 値で考える"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "为什么不能把所有东西都硬塞进一个大字符串",
                "en": "Try It",
                "ja": "2. 部分ごとにテストしやすい"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解決する問題"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么叫恢复",
                "en": "How It Works",
                "ja": "recovery とは何か"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "主循环只负责暴露“时机”，真正的附加行为交给 hook。",
            "en": "What You'll Learn",
            "ja": "この章が解決する問題"
          },
          "reward_card": "card_s08_001"
        },
        {
          "id": "q_s08_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「主線とどう併読するか」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "第 4 步才 ask",
                "en": "第 4 步才 ask",
                "ja": "4. ask を最後に置く理由"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "1. 不是所有 memory 都该放在同一个作用域",
                "en": "1. 不是所有 memory 都该放在同一个作用域",
                "ja": "1. 不是所有 memory 都该放在同一个作用域"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "主線とどう併読するか"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "教学版统一返回约定",
                "en": "How It Works",
                "ja": "まず教えるべき 3 つのイベント"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "主線とどう併読するか"
          },
          "reward_card": "card_s08_002"
        },
        {
          "id": "q_s08_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 hook」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「Hook を最も簡単に言うと」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "2. 没有重试预算",
                "en": "2. 没有重试预算",
                "ja": "1. すべての failure に同じ retry をかける"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "1. `user`",
                "en": "3. `project` -- Durable project facts not obvious from the repo",
                "ja": "4. `reference`"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 hook",
                "en": "The Solution",
                "ja": "Hook を最も簡単に言うと"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "2. HookResult",
                "en": "What You've Mastered",
                "ja": "Hook には整ったイベント情報を渡す"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "hook 让系统可扩展，但不要求主循环理解每个扩展需求。",
            "en": "The Solution",
            "ja": "主ループの決まった節目で、追加動作を差し込む拡張点"
          },
          "reward_card": "card_s08_003"
        },
        {
          "id": "q_s08_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「最小心智模型」的正确理解是？",
            "en": "What is the correct understanding of \"Read Together\" in Claude Code?",
            "ja": "Claude Code における「最小の心智モデル」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "什么是动态信息",
                "en": "Read Together",
                "ja": "1 本の大文字列より良い理由"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "4. memory 会漂移，所以回答前要先核对当前状态",
                "en": "4. memory 会漂移，所以回答前要先核对当前状态",
                "ja": "4. memory 会漂移，所以回答前要先核对当前状态"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "最小心智模型",
                "en": "Read Together",
                "ja": "最小の心智モデル"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "错误 1：把代码结构也存进 memory",
                "en": "错误 1：把代码结构也存进 memory",
                "ja": "错误 1：把代码结构也存进 memory"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "最小心智模型",
            "en": "Read Together",
            "ja": "最小の心智モデル"
          },
          "reward_card": "card_s08_004"
        },
        {
          "id": "q_s08_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「教学版统一返回约定」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「まず教えるべき 3 つのイベント」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "位置 2：拿到 response 以后",
                "en": "位置 2：拿到 response 以后",
                "ja": "compact と recovery を混ぜない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "最小实现结构",
                "en": "最小实现结构",
                "ja": "memory とこの章の関係"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "教学版统一返回约定",
                "en": "How It Works",
                "ja": "まず教えるべき 3 つのイベント"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "4. 压缩后没有告诉模型“这是续场”",
                "en": "4. 压缩后没有告诉模型“这是续场”",
                "ja": "3. compact と recovery を 1 つの話にしてしまう"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "教学版统一返回约定",
            "en": "Step 1.",
            "ja": "まず教えるべき 3 つのイベント"
          },
          "reward_card": "card_s08_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s08_001",
        "card_s08_002",
        "card_s08_003"
      ]
    },
    {
      "id": "stage_s09",
      "chapter": "s09",
      "region": "tools",
      "title": {
        "zh": "只保存跨会话还成立的东西",
        "en": "Keep Only What Survives Sessions",
        "ja": "セッションを越えて残るものだけ保存する"
      },
      "questions": [
        {
          "id": "q_s09_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章在解决什么问题」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「この章が解決する問題」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "最小实现",
                "en": "Key Takeaway",
                "ja": "最小実装を段階で追う"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章在解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解決する問題"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "什么是权限系统",
                "en": "Read Together",
                "ja": "permission system とは何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "2. Hook ごとに別のデータ形を渡す"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "这一章在解决什么问题",
            "en": "What You'll Learn",
            "ja": "この章が解決する問題"
          },
          "reward_card": "card_s09_001"
        },
        {
          "id": "q_s09_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「但先立一个边界：memory 不是什么都存」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「最初に立てるべき境界」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "CLAUDE.md 为什么要单独一段",
                "en": "CLAUDE.md 为什么要单独一段",
                "ja": "CLAUDE.md 为什么要单独一段"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "错误 3：把 memory 当成绝对真相",
                "en": "错误 3：把 memory 当成绝对真相",
                "ja": "错误 3：把 memory 当成绝对真相"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "2. 权限模式",
                "en": "2. 权限模式",
                "ja": "2. Permission Mode"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "但先立一个边界：memory 不是什么都存",
                "en": "The Problem",
                "ja": "最初に立てるべき境界"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "只有那些跨会话仍然有价值，而且不能轻易从当前仓库状态直接推出来的信息，才适合进入 memory。",
            "en": "The Problem",
            "ja": "何でも memory に入れない"
          },
          "reward_card": "card_s09_002"
        },
        {
          "id": "q_s09_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「主線とどう併読するか」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "2. 权限模式",
                "en": "2. 权限模式",
                "ja": "2. Permission Mode"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Solution",
                "ja": "主線とどう併読するか"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这一章最关键的结构化边界",
                "en": "这一章最关键的结构化边界",
                "ja": "2. 毎回変わる情報も全部同じ塊に入れる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. 不好维护",
                "en": "What You've Mastered",
                "ja": "3. 安定部分と動的部分を分けて育てられる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Solution",
            "ja": "主線とどう併読するか"
          },
          "reward_card": "card_s09_003"
        },
        {
          "id": "q_s09_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「初学者向けの 4 分類」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "task",
                "en": "task",
                "ja": "task"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "2. 把所有变化信息都塞进 system prompt",
                "en": "2. 把所有变化信息都塞进 system prompt",
                "ja": "2. 把所有变化信息都塞进 system prompt"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第 1 步先看 deny rules",
                "en": "What's Next",
                "ja": "1. deny を先に見る理由"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "Read Together",
                "ja": "初学者向けの 4 分類"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "Read Together",
            "ja": "初学者向けの 4 分類"
          },
          "reward_card": "card_s09_004"
        },
        {
          "id": "q_s09_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是“跨会话”」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「1. `user`」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "1. 不好维护",
                "en": "What You've Mastered",
                "ja": "3. 安定部分と動的部分を分けて育てられる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是“跨会话”",
                "en": "How It Works",
                "ja": "1. `user`"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "5. 恢复过程完全没有日志",
                "en": "5. 恢复过程完全没有日志",
                "ja": "4. continuation message を曖昧にする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "学完这一章，你应该真正掌握什么",
                "en": "学完这一章，你应该真正掌握什么",
                "ja": "学完这一章，你应该真正掌握什么"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是“跨会话”",
            "en": "Step 1.",
            "ja": "1. `user`"
          },
          "reward_card": "card_s09_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s09_001",
        "card_s09_002",
        "card_s09_003"
      ]
    },
    {
      "id": "stage_s10",
      "chapter": "s10",
      "region": "tools",
      "title": {
        "zh": "把输入组装成流水线",
        "en": "Assemble Inputs as a Pipeline",
        "ja": "入力をパイプラインとして組み立てる"
      },
      "questions": [
        {
          "id": "q_s10_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章为什么重要」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「なぜこの章が必要か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "这一章和前后章节怎么衔接",
                "en": "这一章和前后章节怎么衔接",
                "ja": "5. なぜ続行しているのかを state に残さない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "主線とどう併読するか"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "3. 续写提示",
                "en": "Stage 2 Complete",
                "ja": "3. Continuation Message"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章为什么重要",
                "en": "What You'll Learn",
                "ja": "なぜこの章が必要か"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "由多个来源共同组装出来的一条流水线。",
            "en": "What You'll Learn",
            "ja": "なぜこの章が必要か"
          },
          "reward_card": "card_s10_001"
        },
        {
          "id": "q_s10_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「主線とどう併読するか」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "memory 为什么要和 system prompt 有关系",
                "en": "memory 为什么要和 system prompt 有关系",
                "ja": "memory 为什么要和 system prompt 有关系"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么叫恢复",
                "en": "How It Works",
                "ja": "recovery とは何か"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "主線とどう併読するか"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "学完这章后，你应该能回答",
                "en": "学完这章后，你应该能回答",
                "ja": "5. decision に reason を残さない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "主線とどう併読するか"
          },
          "reward_card": "card_s10_002"
        },
        {
          "id": "q_s10_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「最小の心智モデル」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Solution",
                "ja": "最小の心智モデル"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "2. Hook ごとに別のデータ形を渡す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "1. `user`",
                "en": "3. `project` -- Durable project facts not obvious from the repo",
                "ja": "4. `reference`"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "plan",
                "en": "plan",
                "ja": "plan"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Solution",
            "ja": "最小の心智モデル"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 system prompt」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「最も重要な境界」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "2. 把所有变化信息都塞进 system prompt",
                "en": "2. 把所有变化信息都塞进 system prompt",
                "ja": "2. 把所有变化信息都塞进 system prompt"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这一章为什么重要",
                "en": "What You'll Learn",
                "ja": "なぜこの章が必要か"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 system prompt",
                "en": "How It Works",
                "ja": "最も重要な境界"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "1. 把 hook 当成“到处插 if”",
                "en": "1. 把 hook 当成“到处插 if”",
                "ja": "3. 何でも Hook に入れようとする"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 system prompt",
            "en": "Step 1. Define the builder.",
            "ja": "最も重要な境界"
          },
          "reward_card": "card_s10_004"
        },
        {
          "id": "q_s10_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是“组装流水线”」直接相关？",
            "en": "Which concept is directly related to \"What Changed from s09\"?",
            "ja": "「最小 builder」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "位置 1：模型调用外层",
                "en": "位置 1：模型调用外层",
                "ja": "3. backoff"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是“组装流水线”",
                "en": "What Changed from s09",
                "ja": "最小 builder"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "这章不应该讲太多什么",
                "en": "这章不应该讲太多什么",
                "ja": "3. `bash` を普通の string と同じ感覚で通す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "最小心智模型",
                "en": "Read Together",
                "ja": "最小の心智モデル"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是“组装流水线”",
            "en": "What Changed from s09",
            "ja": "最小 builder"
          },
          "reward_card": "card_s10_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s10_001",
        "card_s10_002",
        "card_s10_003"
      ]
    },
    {
      "id": "stage_s11",
      "chapter": "s11",
      "region": "tools",
      "title": {
        "zh": "先恢复，再继续",
        "en": "Recover, Then Continue",
        "ja": "回復してから続行する"
      },
      "questions": [
        {
          "id": "q_s11_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「这一章要解决什么问题」的正确理解是？",
            "en": "What is the correct understanding of \"What You'll Learn\" in Claude Code?",
            "ja": "Claude Code における「この章が解く問題」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第 2 步看 mode",
                "en": "Key Takeaway",
                "ja": "2. mode を次に見る理由"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "什么叫重试预算",
                "en": "What Changed from s10",
                "ja": "retry budget とは何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "初学者最容易犯的错"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "这一轮需要换一种继续方式。",
            "en": "What You'll Learn",
            "ja": "task そのものが失敗したのではなく、この turn の続け方を変える必要があるだけ"
          },
          "reward_card": "card_s11_001"
        },
        {
          "id": "q_s11_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「併読すると楽になる資料」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "5. 用户说“忽略 memory”时，就当它是空的",
                "en": "5. 用户说“忽略 memory”时，就当它是空的",
                "ja": "5. 用户说“忽略 memory”时，就当它是空的"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "为什么不能把所有东西都硬塞进一个大字符串",
                "en": "Try It",
                "ja": "2. 部分ごとにテストしやすい"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "边界 2：system prompt vs system reminder",
                "en": "边界 2：system prompt vs system reminder",
                "ja": "Try It"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "併読すると楽になる資料"
          },
          "reward_card": "card_s11_002"
        },
        {
          "id": "q_s11_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Solution",
                "ja": "先に言葉をそろえる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "推荐先实现的 3 种模式",
                "en": "推荐先实现的 3 种模式",
                "ja": "最初に実装すると良い 3 つの mode"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "什么是“组装流水线”",
                "en": "What Changed from s09",
                "ja": "最小 builder"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "1. 恢复状态",
                "en": "Try It",
                "ja": "1. Recovery State"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Solution",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s11_003"
        },
        {
          "id": "q_s11_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么叫恢复」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「recovery とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "1. 恢复状态",
                "en": "Try It",
                "ja": "1. Recovery State"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么叫恢复",
                "en": "How It Works",
                "ja": "recovery とは何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第一步：先做 3 个模式",
                "en": "第一步：先做 3 个模式",
                "ja": "`bash` を特別に気にする理由"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "最小心智模型",
                "en": "Read Together",
                "ja": "最小心智モデル"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么叫恢复",
            "en": "Step 1. Track recovery state.",
            "ja": "recovery とは何か"
          },
          "reward_card": "card_s11_004"
        },
        {
          "id": "q_s11_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么叫重试预算」直接相关？",
            "en": "Which concept is directly related to \"What Changed from s10\"?",
            "ja": "「retry budget とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "什么是权限系统",
                "en": "Read Together",
                "ja": "permission system とは何か"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么叫重试预算",
                "en": "What Changed from s10",
                "ja": "retry budget とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "3. 一上来就把所有事件做全",
                "en": "3. 一上来就把所有事件做全",
                "ja": "3. 一上来就把所有事件做全"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "一个实用的教学版本",
                "en": "一个实用的教学版本",
                "ja": "一个实用的教学版本"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么叫重试预算",
            "en": "What Changed from s10",
            "ja": "retry budget とは何か"
          },
          "reward_card": "card_s11_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s11_001",
        "card_s11_002",
        "card_s11_003"
      ]
    },
    {
      "id": "stage_s12",
      "chapter": "s12",
      "region": "runtime",
      "title": {
        "zh": "持久化工作图",
        "en": "Durable Work Graph",
        "ja": "永続ワークグラフ"
      },
      "questions": [
        {
          "id": "q_s12_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「这一章要解决什么问题」的正确理解是？",
            "en": "What is the correct understanding of \"What You'll Learn\" in Claude Code?",
            "ja": "Claude Code における「問題」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "为什么这章放在后台任务之后",
                "en": "为什么这章放在后台任务之后",
                "ja": "为什么这章放在后台任务之后"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "1. 一上来沉迷 cron 语法细节",
                "en": "1. 一上来沉迷 cron 语法细节",
                "ja": "1. 一上来沉迷 cron 语法细节"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "学完这一章，你应该真正掌握什么",
                "en": "学完这一章，你应该真正掌握什么",
                "ja": "学完这一章，你应该真正掌握什么"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "把“会话里的 todo”升级成“可持久化的任务图”。",
            "en": "What You'll Learn",
            "ja": "問題"
          },
          "reward_card": "card_s12_001"
        },
        {
          "id": "q_s12_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「主線とどう併読するか」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "什么是任务",
                "en": "How It Works",
                "ja": "仕組み"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "主線とどう併読するか"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "先把几个词讲明白",
                "en": "The Solution",
                "ja": "解決策"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "下一章学什么",
                "en": "下一章学什么",
                "ja": "下一章学什么"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "主線とどう併読するか"
          },
          "reward_card": "card_s12_002"
        },
        {
          "id": "q_s12_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先把几个词讲明白」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「解決策」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "什么是依赖",
                "en": "Read Together",
                "ja": "s06からの変更点"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先把几个词讲明白",
                "en": "The Solution",
                "ja": "解決策"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "`s12` 的 task 是什么",
                "en": "`s12` 的 task 是什么",
                "ja": "前の章とどうつながるか"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "关键数据结构",
                "en": "What You've Mastered",
                "ja": "3. check interval"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先把几个词讲明白",
            "en": "The Solution",
            "ja": "タスクグラフ"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是任务」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「仕組み」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "什么是任务",
                "en": "How It Works",
                "ja": "仕組み"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "下一章学什么",
                "en": "下一章学什么",
                "ja": "下一章学什么"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "和 `s03` 的区别",
                "en": "和 `s03` 的区别",
                "ja": "和 `s03` 的区别"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是任务",
            "en": "Step 1.",
            "ja": "TaskManager"
          },
          "reward_card": "card_s12_004"
        },
        {
          "id": "q_s12_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是依赖」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「s06からの変更点」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "4. 把调度触发结果直接在后台默默执行",
                "en": "4. 把调度触发结果直接在后台默默执行",
                "ja": "4. 把调度触发结果直接在后台默默执行"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是依赖",
                "en": "Read Together",
                "ja": "s06からの変更点"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "什么是 ready",
                "en": "Try It",
                "ja": "教学上の境界"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "为什么这章放在后台任务之后",
                "en": "为什么这章放在后台任务之后",
                "ja": "为什么这章放在后台任务之后"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是依赖",
            "en": "Read Together",
            "ja": "s06からの変更点"
          },
          "reward_card": "card_s12_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s12_001",
        "card_s12_002",
        "card_s12_003"
      ]
    },
    {
      "id": "stage_s13",
      "chapter": "s13",
      "region": "runtime",
      "title": {
        "zh": "把任务目标和运行槽位分开",
        "en": "Background Execution Lanes",
        "ja": "タスク目標と実行スロットを分ける"
      },
      "questions": [
        {
          "id": "q_s13_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「这一章要解决什么问题」的正确理解是？",
            "en": "What is the correct understanding of \"What You'll Learn\" in Claude Code?",
            "ja": "Claude Code における「この章が解く問題」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "第三步：完成后写通知",
                "en": "第三步：完成后写通知",
                "ja": "第 3 段階: subprocess が終わったら notification を積む"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么是 cron 表达式",
                "en": "Read Together",
                "ja": "重要なデータ構造"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Solution",
                "ja": "主線とどう併読するか"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "把“慢执行”移到后台，让主循环继续推进别的事情。",
            "en": "What You'll Learn",
            "ja": "遅い実行を background へ逃がし、main loop は次の仕事へ進めるようにすること"
          },
          "reward_card": "card_s13_001"
        },
        {
          "id": "q_s13_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「併読すると楽になる資料」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "第四步：把任务工具接给模型",
                "en": "第四步：把任务工具接给模型",
                "ja": "第四步：把任务工具接给模型"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "2. 调度通知",
                "en": "Key Takeaway",
                "ja": "なぜ `s13` の後なのか"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么是持久化调度",
                "en": "What Changed",
                "ja": "1. schedule record"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "併読すると楽になる資料"
          },
          "reward_card": "card_s13_002"
        },
        {
          "id": "q_s13_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先把几个词讲明白」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "問題"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "最小心智模型",
                "en": "What You've Mastered",
                "ja": "最小心智模型"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先把几个词讲明白",
                "en": "The Solution",
                "ja": "先に言葉をそろえる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "`s13` 的 background task 是什么",
                "en": "`s13` 的 background task 是什么",
                "ja": "初学者が混ぜやすいポイント"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先把几个词讲明白",
            "en": "The Solution",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s13_003"
        },
        {
          "id": "q_s13_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么叫前台」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「foreground とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "什么叫前台",
                "en": "How It Works",
                "ja": "foreground とは何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么是持久化调度",
                "en": "What Changed",
                "ja": "1. schedule record"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "关键数据结构",
                "en": "What You've Mastered",
                "ja": "3. check interval"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么叫前台",
            "en": "Step 1.",
            "ja": "foreground とは何か"
          },
          "reward_card": "card_s13_004"
        },
        {
          "id": "q_s13_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么叫后台」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「background とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "和 `s03` 的区别",
                "en": "和 `s03` 的区别",
                "ja": "和 `s03` 的区别"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "4. 把调度触发结果直接在后台默默执行",
                "en": "4. 把调度触发结果直接在后台默默执行",
                "ja": "4. 把调度触发结果直接在后台默默执行"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么叫后台",
                "en": "Read Together",
                "ja": "background とは何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "`s13` 的 background task 是什么",
                "en": "`s13` 的 background task 是什么",
                "ja": "初学者が混ぜやすいポイント"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么叫后台",
            "en": "Read Together",
            "ja": "background とは何か"
          },
          "reward_card": "card_s13_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s13_001",
        "card_s13_002",
        "card_s13_003"
      ]
    },
    {
      "id": "stage_s14",
      "chapter": "s14",
      "region": "runtime",
      "title": {
        "zh": "让时间也能触发工作",
        "en": "Let Time Trigger Work",
        "ja": "時間でも仕事を起動できるようにする"
      },
      "questions": [
        {
          "id": "q_s14_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章要解决什么问题」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「この章が解決する問題」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "为什么这章放在后台任务之后",
                "en": "为什么这章放在后台任务之后",
                "ja": "为什么这章放在后台任务之后"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "第三步：时间到了就发通知",
                "en": "第三步：时间到了就发通知",
                "ja": "4. 未来トリガーの仕事を裏で黙って全部実行する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解決する問題"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第四步：下一轮前排空通知",
                "en": "第四步：下一轮前排空通知",
                "ja": "第 4 段階: 次の model call 前に queue を drain する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "把一条未来要执行的意图，先记下来，等时间到了再触发。",
            "en": "What You'll Learn",
            "ja": "未来の意図を今記録して、時刻が来たら新しい仕事として戻す"
          },
          "reward_card": "card_s14_001"
        },
        {
          "id": "q_s14_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「教学上の境界」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "下一章学什么",
                "en": "下一章学什么",
                "ja": "教学上の境界"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "教学上の境界"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "最小心智模型",
                "en": "What You've Mastered",
                "ja": "最小心智模型"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "为什么这章放在后台任务之后",
                "en": "为什么这章放在后台任务之后",
                "ja": "为什么这章放在后台任务之后"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "schedule record が通知になり、通知が主ループへ戻る流れ"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「主線とどう併読するか」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Solution",
                "ja": "主線とどう併読するか"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "2. TaskStatus",
                "en": "2. TaskStatus",
                "ja": "2. TaskStatus"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. 以为“后台”就是更复杂的主循环",
                "en": "1. 以为“后台”就是更复杂的主循环",
                "ja": "2. result を queue ではなく即座に messages へ乱暴に書き込む"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "这一章和 s03、s13 的边界",
                "en": "这一章和 s03、s13 的边界",
                "ja": "这一章和 s03、s13 的边界"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Solution",
            "ja": "主線とどう併読するか"
          },
          "reward_card": "card_s14_003"
        },
        {
          "id": "q_s14_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是调度器」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「最小の心智モデル」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "`s13` 的 background task 是什么",
                "en": "`s13` 的 background task 是什么",
                "ja": "初学者が混ぜやすいポイント"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "最小实现",
                "en": "最小实现",
                "ja": "1. cron 構文だけに意識を取られる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "5. 误以为定时任务必须绝对准点",
                "en": "5. 误以为定时任务必须绝对准点",
                "ja": "5. 误以为定时任务必须绝对准点"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是调度器",
                "en": "How It Works",
                "ja": "最小の心智モデル"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是调度器",
            "en": "Step 1.",
            "ja": "scheduler 自体は第二の agent ではない"
          },
          "reward_card": "card_s14_004"
        },
        {
          "id": "q_s14_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「什么是 cron 表达式」的正确理解是？",
            "en": "What is the correct understanding of \"Read Together\" in Claude Code?",
            "ja": "Claude Code における「重要なデータ構造」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "3. 只放内存，不支持落盘",
                "en": "3. 只放内存，不支持落盘",
                "ja": "3. 只放内存，不支持落盘"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "为什么完整输出不要直接塞回 prompt",
                "en": "为什么完整输出不要直接塞回 prompt",
                "ja": "第 5 段階: preview と full output を分ける"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "第一步：让任务落盘",
                "en": "第一步：让任务落盘",
                "ja": "第一步：让任务落盘"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 cron 表达式",
                "en": "Read Together",
                "ja": "重要なデータ構造"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 cron 表达式",
            "en": "Read Together",
            "ja": "重要なデータ構造"
          },
          "reward_card": "card_s14_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s14_001",
        "card_s14_002",
        "card_s14_003"
      ]
    },
    {
      "id": "stage_s15",
      "chapter": "s15",
      "region": "network",
      "title": {
        "zh": "长驻的专职队友",
        "en": "Persistent Specialist Teammates",
        "ja": "常駐する専門チームメイト"
      },
      "questions": [
        {
          "id": "q_s15_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「这一章要解决什么问题」的正确理解是？",
            "en": "What is the correct understanding of \"What You'll Learn\" in Claude Code?",
            "ja": "Claude Code における「この章が本当に解きたい問題」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "2. 认领后的任务记录",
                "en": "Key Takeaway",
                "ja": "2. Claim 後の TaskRecord"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "最小实现",
                "en": "最小实现",
                "ja": "最小実装を段階で追う"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "这一章和全仓库的关系",
                "en": "这一章和全仓库的关系",
                "ja": "这一章和全仓库的关系"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が本当に解きたい問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "一批有身份、能长期存在、能反复协作的队友。",
            "en": "What You'll Learn",
            "ja": "名前・役割・inbox・状態を持った、長期的に存在する実行者の集まり"
          },
          "reward_card": "card_s15_001"
        },
        {
          "id": "q_s15_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「併読のすすめ」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "2. 收到请求以后只回一句自然语言",
                "en": "2. 收到请求以后只回一句自然语言",
                "ja": "4. approved / rejected を曖昧な文章だけで表す"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "4. 把协议消息和普通消息混成一种结构",
                "en": "4. 把协议消息和普通消息混成一种结构",
                "ja": "前の章とどうつながるか"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読のすすめ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "併読のすすめ"
          },
          "reward_card": "card_s15_002"
        },
        {
          "id": "q_s15_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先把几个词讲明白」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「まず用語をはっきり分ける」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "1. server 配置",
                "en": "1. server 配置",
                "ja": "2. MCP を別世界だと思う"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先把几个词讲明白",
                "en": "The Solution",
                "ja": "まず用語をはっきり分ける"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "最小心智模型",
                "en": "Message vs Protocol vs Request vs Task",
                "ja": "最小心智モデル"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "下一章学什么",
                "en": "下一章学什么",
                "ja": "下一章学什么"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先把几个词讲明白",
            "en": "The Solution",
            "ja": "まず用語をはっきり分ける"
          },
          "reward_card": "card_s15_003"
        },
        {
          "id": "q_s15_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是队友」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「teammate とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "什么是队友",
                "en": "How It Works",
                "ja": "teammate とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第二步：在 IDLE 里先看邮箱",
                "en": "第二步：在 IDLE 里先看邮箱",
                "ja": "第 2 段階: idle では先に inbox を見る"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "协议 2：计划审批",
                "en": "协议 2：计划审批",
                "ja": "第 2 段階: shutdown protocol を作る"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "最小心智模型",
                "en": "Message vs Protocol vs Request vs Task",
                "ja": "最小心智モデル"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是队友",
            "en": "Step 1.",
            "ja": "持続する actor"
          },
          "reward_card": "card_s15_004"
        },
        {
          "id": "q_s15_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是名册」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「roster とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "关键数据结构",
                "en": "What You've Mastered",
                "ja": "この章の核になるデータ構造"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "2. autonomous claim layer"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是名册",
                "en": "Read Together",
                "ja": "roster とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "4. EventRecord",
                "en": "4. EventRecord",
                "ja": "4. Event Record"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是名册",
            "en": "Read Together",
            "ja": "roster とは何か"
          },
          "reward_card": "card_s15_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s15_001",
        "card_s15_002",
        "card_s15_003"
      ]
    },
    {
      "id": "stage_s16",
      "chapter": "s16",
      "region": "network",
      "title": {
        "zh": "共享请求-响应规则",
        "en": "Shared Request-Response Rules",
        "ja": "共有された request-response 規則"
      },
      "questions": [
        {
          "id": "q_s16_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「这一章要解决什么问题」的正确理解是？",
            "en": "What is the correct understanding of \"What You'll Learn\" in Claude Code?",
            "ja": "Claude Code における「この章が解く問題」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "3. 只会 `worktree_remove`，不会解释 closeout 的含义",
                "en": "3. 只会 `worktree_remove`，不会解释 closeout 的含义",
                "ja": "3. `remove` だけを覚えて closeout の意味を教えない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "第四步：认领后先补身份，再把任务提示塞回主循环",
                "en": "第四步：认领后先补身份，再把任务提示塞回主循环",
                "ja": "第 4 段階: claim 後は identity と task hint を両方戻す"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Solution",
                "ja": "先に言葉をそろえる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "一层结构化协议。",
            "en": "What You'll Learn",
            "ja": "追跡可能な request-response protocol"
          },
          "reward_card": "card_s16_001"
        },
        {
          "id": "q_s16_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「併読すると楽になる資料」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "什么叫绑定",
                "en": "What Changed From s17",
                "ja": "binding とは何か"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "关键数据结构",
                "en": "What You've Mastered",
                "ja": "この章の核になるデータ構造"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "2. 协议消息",
                "en": "2. 协议消息",
                "ja": "`s15` から何が増えたか"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "Shutdown.",
            "ja": "併読すると楽になる資料"
          },
          "reward_card": "card_s16_002"
        },
        {
          "id": "q_s16_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先把几个词讲明白」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "第二步：在 IDLE 里先看邮箱",
                "en": "第二步：在 IDLE 里先看邮箱",
                "ja": "第 2 段階: idle では先に inbox を見る"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. 只看 `pending`，不看 `blockedBy`",
                "en": "1. 只看 `pending`，不看 `blockedBy`",
                "ja": "1. `pending` だけ見て `blockedBy` を見ない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "协议请求不是普通消息",
                "en": "协议请求不是普通消息",
                "ja": "第 3 段階: plan approval も同じ骨格で扱う"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先把几个词讲明白",
                "en": "The Solution",
                "ja": "先に言葉をそろえる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先把几个词讲明白",
            "en": "The Solution",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s16_003"
        },
        {
          "id": "q_s16_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是协议」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「protocol とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "4. 把协议消息和普通消息混成一种结构",
                "en": "4. 把协议消息和普通消息混成一种结构",
                "ja": "前の章とどうつながるか"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是协议",
                "en": "How It Works",
                "ja": "protocol とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. 没有 `request_id`",
                "en": "1. 没有 `request_id`",
                "ja": "3. request の状態を memory 内 dict にしか置かない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "什么是 worktree",
                "en": "The Solution",
                "ja": "worktree とは何か"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是协议",
            "en": "Step 1.",
            "ja": "protocol とは何か"
          },
          "reward_card": "card_s16_004"
        },
        {
          "id": "q_s16_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 request_id」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「request_id とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "什么是 request_id",
                "en": "Read Together",
                "ja": "request_id とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第二步：创建 worktree 并写入注册表",
                "en": "第二步：创建 worktree 并写入注册表",
                "ja": "第 2 段階: worktree を作り、registry に書く"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "3. Claim Event Log",
                "en": "3. Claim Event Log",
                "ja": "3. Claim Event Log"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "3. CloseoutRecord",
                "en": "3. CloseoutRecord",
                "ja": "3. CloseoutRecord"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 request_id",
            "en": "Read Together",
            "ja": "request_id とは何か"
          },
          "reward_card": "card_s16_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s16_001",
        "card_s16_002",
        "card_s16_003"
      ]
    },
    {
      "id": "stage_s17",
      "chapter": "s17",
      "region": "network",
      "title": {
        "zh": "自主认领，自主续跑",
        "en": "Self-Claim, Self-Resume",
        "ja": "自分で引き受け、自分で再開する"
      },
      "questions": [
        {
          "id": "q_s17_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「这一章要解决什么问题」的正确理解是？",
            "en": "What is the correct understanding of \"What You'll Learn\" in Claude Code?",
            "ja": "Claude Code における「この章が解く問題」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "为什么这一章放在最后",
                "en": "The Solution",
                "ja": "なぜ最後の章なのか"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "2. 收到请求以后只回一句自然语言",
                "en": "2. 收到请求以后只回一句自然语言",
                "ja": "4. approved / rejected を曖昧な文章だけで表す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "1. TaskRecord 不再只记录 `worktree`",
                "en": "What's Next",
                "ja": "1. TaskRecord 側の lane 情報"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "很多事情仍然要靠 lead 手动分配。",
            "en": "What You'll Learn",
            "ja": "仕事の割り振りが lead に集中しすぎることです。"
          },
          "reward_card": "card_s17_001"
        },
        {
          "id": "q_s17_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「併読すると楽になる資料」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "2. 协议消息",
                "en": "2. 协议消息",
                "ja": "`s15` から何が増えたか"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Teammate、Subagent、Runtime Task 到底怎么区分",
                "en": "Teammate、Subagent、Runtime Task 到底怎么区分",
                "ja": "Teammate / Subagent / Runtime Slot をどう分けるか"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "併読すると楽になる資料"
          },
          "reward_card": "card_s17_002"
        },
        {
          "id": "q_s17_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "第四步：队友每轮先看邮箱，再继续工作",
                "en": "第四步：队友每轮先看邮箱，再继续工作",
                "ja": "Step 3: 各 teammate に mailbox を持たせる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "The Solution",
                "ja": "先に言葉をそろえる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "如何接到前面章节的系统里",
                "en": "如何接到前面章节的系统里",
                "ja": "Step 4: teammate は毎ラウンド mailbox を先に確認する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "什么是协议",
                "en": "How It Works",
                "ja": "protocol とは何か"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "The Solution",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s17_003"
        },
        {
          "id": "q_s17_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么叫自治」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「自治とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "第三步：同时更新任务记录，不只是写一个 `worktree`",
                "en": "第三步：同时更新任务记录，不只是写一个 `worktree`",
                "ja": "第 3 段階: task record 側も同時に更新する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么叫自治",
                "en": "How It Works",
                "ja": "自治とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "关键数据结构",
                "en": "What You've Mastered",
                "ja": "この章の核になるデータ構造"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "身份重注入为什么重要",
                "en": "身份重注入为什么重要",
                "ja": "identity 再注入が重要な理由"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么叫自治",
            "en": "Step 1.",
            "ja": "規則付きの自律再開"
          },
          "reward_card": "card_s17_004"
        },
        {
          "id": "q_s17_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么叫认领」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「claim とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "3. Claim Event Log",
                "en": "3. Claim Event Log",
                "ja": "3. Claim Event Log"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么叫认领",
                "en": "Read Together",
                "ja": "claim とは何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "初学者最容易犯的错",
                "en": "初学者最容易犯的错",
                "ja": "2. request_id を持たせない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "自治的是“长期队友”，不是“一次性 subagent”",
                "en": "自治的是“长期队友”，不是“一次性 subagent”",
                "ja": "自治するのは long-lived teammate であって subagent ではない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么叫认领",
            "en": "Read Together",
            "ja": "owner を書き込み、他の teammate が同じ task を取らないようにする"
          },
          "reward_card": "card_s17_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s17_001",
        "card_s17_002",
        "card_s17_003"
      ]
    },
    {
      "id": "stage_s18",
      "chapter": "s18",
      "region": "network",
      "title": {
        "zh": "独立目录，独立车道",
        "en": "Separate Directory, Separate Lane",
        "ja": "別ディレクトリ、別レーン"
      },
      "questions": [
        {
          "id": "q_s18_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章要解决什么问题」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「この章が解く問題」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "关键数据结构",
                "en": "What You've Mastered",
                "ja": "この章の核になるデータ構造"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这一章和全仓库的关系",
                "en": "这一章和全仓库的关系",
                "ja": "这一章和全仓库的关系"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2. 队友之间共用同一份 messages",
                "en": "2. 队友之间共用同一份 messages",
                "ja": "1. teammate を「名前付き subagent」にする"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "每个任务应该在哪个独立工作空间里执行。",
            "en": "What You'll Learn",
            "ja": "誰が何をやるか"
          },
          "reward_card": "card_s18_001"
        },
        {
          "id": "q_s18_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「併読すると楽になる資料」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "1. TeamMember",
                "en": "Try It",
                "ja": "主要データ構造"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "6. 把 worktree 当成长期垃圾堆",
                "en": "6. 把 worktree 当成长期垃圾堆",
                "ja": "6. lane を増やすだけで掃除しない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "关键数据结构",
                "en": "What You've Mastered",
                "ja": "この章の核になるデータ構造"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "The Problem",
            "ja": "併読すると楽になる資料"
          },
          "reward_card": "card_s18_002"
        },
        {
          "id": "q_s18_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先解释几个名词」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「先に言葉をそろえる」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "为什么这一章放在最后",
                "en": "The Solution",
                "ja": "なぜ最後の章なのか"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "什么是队友",
                "en": "How It Works",
                "ja": "teammate とは何か"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "先解释几个名词",
                "en": "Read Together",
                "ja": "先に言葉をそろえる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Teammate、Subagent、Runtime Task 到底怎么区分",
                "en": "Teammate、Subagent、Runtime Task 到底怎么区分",
                "ja": "Teammate / Subagent / Runtime Slot をどう分けるか"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "先解释几个名词",
            "en": "Read Together",
            "ja": "先に言葉をそろえる"
          },
          "reward_card": "card_s18_003"
        },
        {
          "id": "q_s18_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么是 worktree」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「worktree とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "3. Claim Event Log",
                "en": "3. Claim Event Log",
                "ja": "3. Claim Event Log"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "什么是 worktree",
                "en": "The Solution",
                "ja": "worktree とは何か"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "1. Claimable Predicate",
                "en": "What's Next",
                "ja": "1. Claimable Predicate"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第二层：自治认领",
                "en": "第二层：自治认领",
                "ja": "1. protocol request layer"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么是 worktree",
            "en": "The Solution",
            "ja": "worktree とは何か"
          },
          "reward_card": "card_s18_004"
        },
        {
          "id": "q_s18_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「什么叫隔离执行」直接相关？",
            "en": "Which concept is directly related to \"How It Works\"?",
            "ja": "「isolation とは何か」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "什么叫隔离执行",
                "en": "How It Works",
                "ja": "isolation とは何か"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "3. client 注册表",
                "en": "3. client 注册表",
                "ja": "Try It"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "最小实现步骤",
                "en": "What Changed From s18",
                "ja": "システム全体へどう接続するか"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "第一步：让队友拥有 `WORK -> IDLE` 的循环",
                "en": "第一步：让队友拥有 `WORK -> IDLE` 的循环",
                "ja": "第 1 段階: WORK と IDLE を分ける"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "什么叫隔离执行",
            "en": "Step 1.",
            "ja": "isolation とは何か"
          },
          "reward_card": "card_s18_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s18_001",
        "card_s18_002",
        "card_s18_003"
      ]
    },
    {
      "id": "stage_s19",
      "chapter": "s19",
      "region": "network",
      "title": {
        "zh": "外部能力总线",
        "en": "External Capability Bus",
        "ja": "外部 capability bus"
      },
      "questions": [
        {
          "id": "q_s19_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「这一章到底在讲什么」直接相关？",
            "en": "Which concept is directly related to \"What You'll Learn\"?",
            "ja": "「この章が本当に教えるもの」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "这一章到底在讲什么",
                "en": "What You'll Learn",
                "ja": "この章が本当に教えるもの"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "1. server 配置",
                "en": "1. server 配置",
                "ja": "2. MCP を別世界だと思う"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "4. 没有邮箱，靠共享变量直接喊话",
                "en": "4. 没有邮箱，靠共享变量直接喊话",
                "ja": "3. roster を durable にしない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "这一章到底在讲什么",
            "en": "What You'll Learn",
            "ja": "この章が本当に教えるもの"
          },
          "reward_card": "card_s19_001"
        },
        {
          "id": "q_s19_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「先用最简单的话解释 MCP」直接相关？",
            "en": "Which concept is directly related to \"The Problem\"?",
            "ja": "「MCP を一番簡単に言うと」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先用最简单的话解释 MCP",
                "en": "The Problem",
                "ja": "MCP を一番簡単に言うと"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "如何接到前面章节里",
                "en": "如何接到前面章节里",
                "ja": "前の章とどうつながるか"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "3. MessageEnvelope",
                "en": "What's Next",
                "ja": "`TeamConfig`"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "什么叫自治",
                "en": "How It Works",
                "ja": "自治とは何か"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "一套让 agent 和外部工具程序对话的统一协议。",
            "en": "The Problem",
            "ja": "agent が外部 capability server と会話するための標準的な方法"
          },
          "reward_card": "card_s19_002"
        },
        {
          "id": "q_s19_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「为什么这一章放在最后」直接相关？",
            "en": "Which concept is directly related to \"The Solution\"?",
            "ja": "「なぜ最後の章なのか」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "身份重注入为什么重要",
                "en": "身份重注入为什么重要",
                "ja": "identity 再注入が重要な理由"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "3. MessageEnvelope",
                "en": "What's Next",
                "ja": "`TeamConfig`"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "为什么这一章放在最后",
                "en": "The Solution",
                "ja": "なぜ最後の章なのか"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "把“工具来源”从“本地硬编码”升级成“外部可插拔”。",
            "en": "The Solution",
            "ja": "新しい capability source"
          },
          "reward_card": "card_s19_003"
        },
        {
          "id": "q_s19_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「建议联读」直接相关？",
            "en": "Which concept is directly related to \"Read Together\"?",
            "ja": "「主線とどう併読するか」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "7. 没有事件日志",
                "en": "7. 没有事件日志",
                "ja": "7. event log を持たない"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "建议联读",
                "en": "Read Together",
                "ja": "主線とどう併読するか"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第一步：先有一份队伍名册",
                "en": "第一步：先有一份队伍名册",
                "ja": "最小実装の進め方"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が解く問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "建议联读",
            "en": "Read Together",
            "ja": "主線とどう併読するか"
          },
          "reward_card": "card_s19_004"
        },
        {
          "id": "q_s19_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「最小心智模型」的正确理解是？",
            "en": "What is the correct understanding of \"How It Works\" in Claude Code?",
            "ja": "Claude Code における「最小の心智モデル」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "这一章要解决什么问题",
                "en": "What You'll Learn",
                "ja": "この章が本当に解きたい問題"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "最小心智模型",
                "en": "How It Works",
                "ja": "最小の心智モデル"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "建议联读",
                "en": "The Problem",
                "ja": "併読すると楽になる資料"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "第三步：如果邮箱没消息，再按“当前角色”扫描可认领任务",
                "en": "第三步：如果邮箱没消息，再按“当前角色”扫描可认领任务",
                "ja": "第 3 段階: inbox が空なら role 付きで task board を走査する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "最小心智模型",
            "en": "Step 1.",
            "ja": "最小の心智モデル"
          },
          "reward_card": "card_s19_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_s19_001",
        "card_s19_002",
        "card_s19_003"
      ]
    },
    {
      "id": "stage_bp01",
      "chapter": "bp01",
      "region": "practice",
      "title": {
        "zh": "项目记忆体系",
        "en": "Project Memory System",
        "ja": "プロジェクトメモリシステム"
      },
      "questions": [
        {
          "id": "q_bp01_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「1. 编写优秀的 CLAUDE.md」直接相关？",
            "en": "Which concept is directly related to \"1. Writing a Good CLAUDE.md\"?",
            "ja": "「1. Writing a Good CLAUDE.md」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "工具调用前验证 Bash 命令",
                "en": "Display Settings",
                "ja": "Display Settings"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Frontmatter 字段（13 个）",
                "en": "Frontmatter Fields (13)",
                "ja": "Frontmatter Fields (13)"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "工作流程",
                "en": "工作流程",
                "ja": "工作流程"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "1. 编写优秀的 CLAUDE.md",
                "en": "1. Writing a Good CLAUDE.md",
                "ja": "1. Writing a Good CLAUDE.md"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "1. 编写优秀的 CLAUDE.md",
            "en": "1. Writing a Good CLAUDE.md",
            "ja": "1. Writing a Good CLAUDE.md"
          },
          "reward_card": "card_bp01_001"
        },
        {
          "id": "q_bp01_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「2. 大型 Monorepo 中的 CLAUDE.md」直接相关？",
            "en": "Which concept is directly related to \"2. CLAUDE.md in Large Monorepos\"?",
            "ja": "「2. CLAUDE.md in Large Monorepos」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "2. 大型 Monorepo 中的 CLAUDE.md",
                "en": "2. CLAUDE.md in Large Monorepos",
                "ja": "2. CLAUDE.md in Large Monorepos"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "官方捆绑技能（5 个）",
                "en": "![Official](../!/tags/official.svg) **(5)**",
                "ja": "![Official](../!/tags/official.svg) **(5)**"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型覆盖",
                "en": "Company Announcements",
                "ja": "Company Announcements"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "4. 显示与用户体验",
                "en": "Permission Structure",
                "ja": "Permission Structure"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "2. 大型 Monorepo 中的 CLAUDE.md",
            "en": "2. CLAUDE.md in Large Monorepos",
            "ja": "2. CLAUDE.md in Large Monorepos"
          },
          "reward_card": "card_bp01_002"
        },
        {
          "id": "q_bp01_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「两种加载机制」的正确理解是？",
            "en": "What is the correct understanding of \"The Two Loading Mechanisms\" in Claude Code?",
            "ja": "Claude Code における「The Two Loading Mechanisms」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "受管设置中的服务器匹配",
                "en": "Sources",
                "ja": "Sources"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "预算与限制",
                "en": "Useful Commands",
                "ja": "Useful Commands"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "3. 内置代理类型（5 个）",
                "en": "Sources",
                "ja": "Sources"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "两种加载机制",
                "en": "The Two Loading Mechanisms",
                "ja": "The Two Loading Mechanisms"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "启动时立即加载",
            "en": "upward",
            "ja": "upward"
          },
          "reward_card": "card_bp01_003"
        },
        {
          "id": "q_bp01_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「Monorepo 结构示例」的正确理解是？",
            "en": "What is the correct understanding of \"Example Monorepo Structure\" in Claude Code?",
            "ja": "Claude Code における「Example Monorepo Structure」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "5. 关键事件详解",
                "en": "MCP Settings",
                "ja": "MCP Settings"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "Monorepo 结构示例",
                "en": "Example Monorepo Structure",
                "ja": "Example Monorepo Structure"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "代理定义",
                "en": "代理定义",
                "ja": "代理定义"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Frontmatter 字段（13 个）",
                "en": "Frontmatter Fields (13)",
                "ja": "Frontmatter Fields (13)"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Monorepo 结构示例",
            "en": "Example Monorepo Structure",
            "ja": "Example Monorepo Structure"
          },
          "reward_card": "card_bp01_004"
        },
        {
          "id": "q_bp01_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「场景 1：从根目录启动 Claude Code」的正确理解是？",
            "en": "What is the correct understanding of \"Scenario 1: Running Claude Code from the Root Directory\" in Claude Code?",
            "ja": "Claude Code における「Scenario 1: Running Claude Code from the Root Directory」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "场景 1：从根目录启动 Claude Code",
                "en": "Scenario 1: Running Claude Code from the Root Directory",
                "ja": "Scenario 1: Running Claude Code from the Root Directory"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Frontmatter 字段（13 个）",
                "en": "Frontmatter Fields (13)",
                "ja": "Frontmatter Fields (13)"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型与配置",
                "en": "Status Line Configuration",
                "ja": "Status Line Configuration"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "9. CLI 启动标志",
                "en": "Display Settings",
                "ja": "Display Settings"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "场景 1：从根目录启动 Claude Code",
            "en": "Scenario 1: Running Claude Code from the Root Directory",
            "ja": "Scenario 1: Running Claude Code from the Root Directory"
          },
          "reward_card": "card_bp01_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_bp01_001",
        "card_bp01_002",
        "card_bp01_003"
      ]
    },
    {
      "id": "stage_bp02",
      "chapter": "bp02",
      "region": "practice",
      "title": {
        "zh": "斜杠命令实战",
        "en": "Slash Commands in Practice",
        "ja": "スラッシュコマンド実践"
      },
      "questions": [
        {
          "id": "q_bp02_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「Frontmatter 字段（13 个）」直接相关？",
            "en": "Which concept is directly related to \"Frontmatter Fields (13)\"?",
            "ja": "「Frontmatter Fields (13)」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "模型环境变量",
                "en": "Permissions",
                "ja": "Permissions"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "Frontmatter 字段（13 个）",
                "en": "Frontmatter Fields (13)",
                "ja": "Frontmatter Fields (13)"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "6. 决策控制模式总结",
                "en": "Model Environment Variables",
                "ja": "Model Environment Variables"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "最佳实践",
                "en": "Best Practices",
                "ja": "Best Practices"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Frontmatter 字段（13 个）",
            "en": "Frontmatter Fields (13)",
            "ja": "Frontmatter Fields (13)"
          },
          "reward_card": "card_bp02_001"
        },
        {
          "id": "q_bp02_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「官方内置命令（69 个）」直接相关？",
            "en": "Which concept is directly related to \"![Official](../!/tags/official.svg) **(69)**\"?",
            "ja": "「![Official](../!/tags/official.svg) **(69)**」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "12. 常用命令速查",
                "en": "Table of Contents",
                "ja": "Table of Contents"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "WorktreeCreate / WorktreeRemove",
                "en": "Effort Level",
                "ja": "Effort Level"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2. 配置格式",
                "en": "Settings Hierarchy",
                "ja": "Settings Hierarchy"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "官方内置命令（69 个）",
                "en": "![Official](../!/tags/official.svg) **(69)**",
                "ja": "![Official](../!/tags/official.svg) **(69)**"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "官方内置命令（69 个）",
            "en": "![Official](../!/tags/official.svg) **(69)**",
            "ja": "![Official](../!/tags/official.svg) **(69)**"
          },
          "reward_card": "card_bp02_002"
        },
        {
          "id": "q_bp02_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「参考来源」直接相关？",
            "en": "Which concept is directly related to \"Sources\"?",
            "ja": "「Sources」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "调试与诊断",
                "en": "Usage",
                "ja": "Usage"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "参考来源",
                "en": "Sources",
                "ja": "Sources"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "FileChanged",
                "en": "Model Overrides",
                "ja": "Model Overrides"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "工具权限语法",
                "en": "Plans & Memory Directories",
                "ja": "Plans & Memory Directories"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "参考来源",
            "en": "Command → Agent → Skill",
            "ja": "Command → Agent → Skill"
          },
          "reward_card": "card_bp02_003"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_bp02_001",
        "card_bp02_002",
        "card_bp02_003"
      ]
    },
    {
      "id": "stage_bp03",
      "chapter": "bp03",
      "region": "practice",
      "title": {
        "zh": "技能系统实战",
        "en": "Skills System in Practice",
        "ja": "スキルシステム実践"
      },
      "questions": [
        {
          "id": "q_bp03_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「Frontmatter 字段（13 个）」直接相关？",
            "en": "Which concept is directly related to \"Frontmatter Fields (13)\"?",
            "ja": "「Frontmatter Fields (13)」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "权限结构",
                "en": "Core Configuration",
                "ja": "Core Configuration"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "Frontmatter 字段（13 个）",
                "en": "Frontmatter Fields (13)",
                "ja": "Frontmatter Fields (13)"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "代理与子代理",
                "en": "OpenTelemetry",
                "ja": "OpenTelemetry"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "10. 来源",
                "en": "10. 来源",
                "ja": "10. 来源"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Frontmatter 字段（13 个）",
            "en": "Frontmatter Fields (13)",
            "ja": "Frontmatter Fields (13)"
          },
          "reward_card": "card_bp03_001"
        },
        {
          "id": "q_bp03_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「官方捆绑技能（5 个）」直接相关？",
            "en": "Which concept is directly related to \"![Official](../!/tags/official.svg) **(5)**\"?",
            "ja": "「![Official](../!/tags/official.svg) **(5)**」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "官方捆绑技能（5 个）",
                "en": "![Official](../!/tags/official.svg) **(5)**",
                "ja": "![Official](../!/tags/official.svg) **(5)**"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型与配置",
                "en": "Status Line Configuration",
                "ja": "Status Line Configuration"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "MCP 与插件",
                "en": "Environment Variables (via `env`)",
                "ja": "Environment Variables (via `env`)"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "代理与子代理",
                "en": "OpenTelemetry",
                "ja": "OpenTelemetry"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "官方捆绑技能（5 个）",
            "en": "![Official](../!/tags/official.svg) **(5)**",
            "ja": "![Official](../!/tags/official.svg) **(5)**"
          },
          "reward_card": "card_bp03_002"
        },
        {
          "id": "q_bp03_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「参考来源」直接相关？",
            "en": "Which concept is directly related to \"Sources\"?",
            "ja": "「Sources」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "通用设置",
                "en": "Plugins",
                "ja": "Plugins"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "会话启动时加载项目上下文",
                "en": "Status Line Configuration",
                "ja": "Status Line Configuration"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "参考来源",
                "en": "Sources",
                "ja": "Sources"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "3. 内置代理类型（5 个）",
                "en": "Sources",
                "ja": "Sources"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "参考来源",
            "en": "Command → Agent → Skill",
            "ja": "Command → Agent → Skill"
          },
          "reward_card": "card_bp03_003"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_bp03_001",
        "card_bp03_002",
        "card_bp03_003"
      ]
    },
    {
      "id": "stage_bp04",
      "chapter": "bp04",
      "region": "practice",
      "title": {
        "zh": "钩子与自动化",
        "en": "Hooks & Automation",
        "ja": "フック＆自動化"
      },
      "questions": [
        {
          "id": "q_bp04_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「1. 什么是 Hooks」的正确理解是？",
            "en": "What is the correct understanding of \"Table of Contents\" in Claude Code?",
            "ja": "Claude Code における「Table of Contents」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "1. 什么是 Hooks",
                "en": "Table of Contents",
                "ja": "Table of Contents"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "MCP 与插件",
                "en": "Environment Variables (via `env`)",
                "ja": "Environment Variables (via `env`)"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "6. 编排架构：Command → Agent → Skill",
                "en": "6. 编排架构：Command → Agent → Skill",
                "ja": "6. 编排架构：Command → Agent → Skill"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2. 配置格式",
                "en": "Settings Hierarchy",
                "ja": "Settings Hierarchy"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Command hooks（命令钩子）",
            "en": "Table of Contents",
            "ja": "Table of Contents"
          },
          "reward_card": "card_bp04_001"
        },
        {
          "id": "q_bp04_002",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「2. 配置格式」的正确理解是？",
            "en": "What is the correct understanding of \"Settings Hierarchy\" in Claude Code?",
            "ja": "Claude Code における「Settings Hierarchy」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "2. 配置格式",
                "en": "Settings Hierarchy",
                "ja": "Settings Hierarchy"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "受管设置中的服务器匹配",
                "en": "Sources",
                "ja": "Sources"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "SessionStart",
                "en": "MCP Server Matching (Managed Settings)",
                "ja": "MCP Server Matching (Managed Settings)"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "方式三：手动创建文件",
                "en": "方式三：手动创建文件",
                "ja": "方式三：手动创建文件"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "2. 配置格式",
            "en": "Managed settings",
            "ja": "Managed settings"
          },
          "reward_card": "card_bp04_002"
        },
        {
          "id": "q_bp04_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「Hook 类型」直接相关？",
            "en": "Which concept is directly related to \"Core Configuration\"?",
            "ja": "「Core Configuration」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Hook 类型",
                "en": "Core Configuration",
                "ja": "Core Configuration"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "目录与工作区",
                "en": "Common Environment Variables",
                "ja": "Common Environment Variables"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "禁用 Hooks",
                "en": "Worktree Settings",
                "ja": "Worktree Settings"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "使用 HTTP Hook",
                "en": "File Suggestion Configuration",
                "ja": "File Suggestion Configuration"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Hook 类型",
            "en": "Core Configuration",
            "ja": "Core Configuration"
          },
          "reward_card": "card_bp04_003"
        },
        {
          "id": "q_bp04_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「子代理中的 Hooks」的正确理解是？",
            "en": "What is the correct understanding of \"General Settings\" in Claude Code?",
            "ja": "Claude Code における「General Settings」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "Monorepo 结构示例",
                "en": "Example Monorepo Structure",
                "ja": "Example Monorepo Structure"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "6. 编排架构：Command → Agent → Skill",
                "en": "6. 编排架构：Command → Agent → Skill",
                "ja": "6. 编排架构：Command → Agent → Skill"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "8. 使用建议",
                "en": "8. 使用建议",
                "ja": "8. 使用建议"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "子代理中的 Hooks",
                "en": "General Settings",
                "ja": "General Settings"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "子代理中的 Hooks",
            "en": "(Managed only)",
            "ja": "(Managed only)"
          },
          "reward_card": "card_bp04_004"
        },
        {
          "id": "q_bp04_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「`/hooks` 菜单」直接相关？",
            "en": "Which concept is directly related to \"Plans & Memory Directories\"?",
            "ja": "「Plans & Memory Directories」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "6. 编排架构：Command → Agent → Skill",
                "en": "6. 编排架构：Command → Agent → Skill",
                "ja": "6. 编排架构：Command → Agent → Skill"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "`/hooks` 菜单",
                "en": "Plans & Memory Directories",
                "ja": "Plans & Memory Directories"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Spinner 自定义示例",
                "en": "Tool Permission Syntax",
                "ja": "Tool Permission Syntax"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "使用环境变量保护密钥",
                "en": "Permission Rules for MCP Tools",
                "ja": "Permission Rules for MCP Tools"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "`/hooks` 菜单",
            "en": "Example:",
            "ja": "Example:"
          },
          "reward_card": "card_bp04_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_bp04_001",
        "card_bp04_002",
        "card_bp04_003"
      ]
    },
    {
      "id": "stage_bp05",
      "chapter": "bp05",
      "region": "practice",
      "title": {
        "zh": "子代理编排",
        "en": "Subagent Orchestration",
        "ja": "サブエージェント編成"
      },
      "questions": [
        {
          "id": "q_bp05_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「1. 什么是子代理」直接相关？",
            "en": "Which concept is directly related to \"Frontmatter Fields (16)\"?",
            "ja": "「Frontmatter Fields (16)」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "7. 实用示例",
                "en": "Display & UX",
                "ja": "Display & UX"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "输出与格式",
                "en": "AWS & Cloud Credentials",
                "ja": "AWS & Cloud Credentials"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "WorktreeCreate / WorktreeRemove",
                "en": "Effort Level",
                "ja": "Effort Level"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "1. 什么是子代理",
                "en": "Frontmatter Fields (16)",
                "ja": "Frontmatter Fields (16)"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "1. 什么是子代理",
            "en": "Frontmatter Fields (16)",
            "ja": "Frontmatter Fields (16)"
          },
          "reward_card": "card_bp05_001"
        },
        {
          "id": "q_bp05_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「2. Frontmatter 字段（16 个）」直接相关？",
            "en": "Which concept is directly related to \"![Official](../!/tags/official.svg) **(5)**\"?",
            "ja": "「![Official](../!/tags/official.svg) **(5)**」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "2. Frontmatter 字段（16 个）",
                "en": "![Official](../!/tags/official.svg) **(5)**",
                "ja": "![Official](../!/tags/official.svg) **(5)**"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型别名",
                "en": "Attribution Settings",
                "ja": "Attribution Settings"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "集成",
                "en": "Quick Reference: Complete Example",
                "ja": "Quick Reference: Complete Example"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "文件写入后自动运行 Lint",
                "en": "Global Config Settings (`~/.claude.json`)",
                "ja": "Global Config Settings (`~/.claude.json`)"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "2. Frontmatter 字段（16 个）",
            "en": "![Official](../!/tags/official.svg) **(5)**",
            "ja": "![Official](../!/tags/official.svg) **(5)**"
          },
          "reward_card": "card_bp05_002"
        },
        {
          "id": "q_bp05_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「3. 内置代理类型（5 个）」直接相关？",
            "en": "Which concept is directly related to \"Sources\"?",
            "ja": "「Sources」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "3. 内置代理类型（5 个）",
                "en": "Sources",
                "ja": "Sources"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "10. 来源",
                "en": "10. 来源",
                "ja": "10. 来源"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Plans 和 Memory 目录",
                "en": "Plugin Settings",
                "ja": "Plugin Settings"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "3. 模型配置",
                "en": "Worktree Settings",
                "ja": "Worktree Settings"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "3. 内置代理类型（5 个）",
            "en": "Command → Agent → Skill",
            "ja": "Command → Agent → Skill"
          },
          "reward_card": "card_bp05_003"
        },
        {
          "id": "q_bp05_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「4. 创建自定义子代理」直接相关？",
            "en": "Which concept is directly related to \"Weather Agent\"?",
            "ja": "「Weather Agent」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "代理定义",
                "en": "代理定义",
                "ja": "代理定义"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2. Frontmatter 字段（16 个）",
                "en": "![Official](../!/tags/official.svg) **(5)**",
                "ja": "![Official](../!/tags/official.svg) **(5)**"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "1. 编写优秀的 CLAUDE.md",
                "en": "1. Writing a Good CLAUDE.md",
                "ja": "1. Writing a Good CLAUDE.md"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "4. 创建自定义子代理",
                "en": "Weather Agent",
                "ja": "Weather Agent"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "4. 创建自定义子代理",
            "en": "File",
            "ja": "File"
          },
          "reward_card": "card_bp05_004"
        },
        {
          "id": "q_bp05_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「方式一：使用 `/agents` 命令」的正确理解是？",
            "en": "What is the correct understanding of \"![How to Use](../!/tags/how-to-use.svg)\" in Claude Code?",
            "ja": "Claude Code における「![How to Use](../!/tags/how-to-use.svg)」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "模型与配置",
                "en": "Status Line Configuration",
                "ja": "Status Line Configuration"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Worktree（工作树）设置",
                "en": "Model Configuration",
                "ja": "Model Configuration"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1. 什么是子代理",
                "en": "Frontmatter Fields (16)",
                "ja": "Frontmatter Fields (16)"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "方式一：使用 `/agents` 命令",
                "en": "![How to Use](../!/tags/how-to-use.svg)",
                "ja": "![How to Use](../!/tags/how-to-use.svg)"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "方式一：使用 `/agents` 命令",
            "en": "![How to Use](../!/tags/how-to-use.svg)",
            "ja": "![How to Use](../!/tags/how-to-use.svg)"
          },
          "reward_card": "card_bp05_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_bp05_001",
        "card_bp05_002",
        "card_bp05_003"
      ]
    },
    {
      "id": "stage_bp06",
      "chapter": "bp06",
      "region": "practice",
      "title": {
        "zh": "MCP 与工具集成",
        "en": "MCP & Tool Integration",
        "ja": "MCP＆ツール統合"
      },
      "questions": [
        {
          "id": "q_bp06_001",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「1. 什么是 MCP」直接相关？",
            "en": "Which concept is directly related to \"MCP Servers for Daily Use\"?",
            "ja": "「MCP Servers for Daily Use」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "2. 推荐的日常 MCP 服务器",
                "en": "Configuration",
                "ja": "Configuration"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "匹配器参考",
                "en": "MCP Servers",
                "ja": "MCP Servers"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "1. 什么是 MCP",
                "en": "MCP Servers for Daily Use",
                "ja": "MCP Servers for Daily Use"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "4. Settings 中的 MCP 配置",
                "en": "MCP Scopes",
                "ja": "MCP Scopes"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "1. 什么是 MCP",
            "en": "Context7",
            "ja": "Context7"
          },
          "reward_card": "card_bp06_001"
        },
        {
          "id": "q_bp06_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「2. 推荐的日常 MCP 服务器」直接相关？",
            "en": "Which concept is directly related to \"Configuration\"?",
            "ja": "「Configuration」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "HTTP 响应处理",
                "en": "Permission Modes",
                "ja": "Permission Modes"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "2. 推荐的日常 MCP 服务器",
                "en": "Configuration",
                "ja": "Configuration"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "方式二：让 Claude 帮你创建",
                "en": "![How to Implement](../!/tags/how-to-implement.svg)",
                "ja": "![How to Implement](../!/tags/how-to-implement.svg)"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "3. 配置",
                "en": "Server Types",
                "ja": "Server Types"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "文档化",
            "en": "Configuration",
            "ja": "Configuration"
          },
          "reward_card": "card_bp06_002"
        },
        {
          "id": "q_bp06_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「3. 配置」直接相关？",
            "en": "Which concept is directly related to \"Server Types\"?",
            "ja": "「Server Types」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "7. 实用示例",
                "en": "Display & UX",
                "ja": "Display & UX"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "调试与诊断",
                "en": "Usage",
                "ja": "Usage"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "3. 配置",
                "en": "Server Types",
                "ja": "Server Types"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "7. 权限控制",
                "en": "7. 权限控制",
                "ja": "7. 权限控制"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "3. 配置",
            "en": "stdio",
            "ja": "stdio"
          },
          "reward_card": "card_bp06_003"
        },
        {
          "id": "q_bp06_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「传输类型」的正确理解是？",
            "en": "What is the correct understanding of \"Example `.mcp.json`\" in Claude Code?",
            "ja": "Claude Code における「Example `.mcp.json`」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "模型与配置",
                "en": "Status Line Configuration",
                "ja": "Status Line Configuration"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "传输类型",
                "en": "Example `.mcp.json`",
                "ja": "Example `.mcp.json`"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Hook 类型",
                "en": "Core Configuration",
                "ja": "Core Configuration"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "工作流程",
                "en": "工作流程",
                "ja": "工作流程"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "stdio",
            "en": "Example `.mcp.json`",
            "ja": "Example `.mcp.json`"
          },
          "reward_card": "card_bp06_004"
        },
        {
          "id": "q_bp06_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「`.mcp.json` 配置示例」的正确理解是？",
            "en": "What is the correct understanding of \"Settings for MCP Servers\" in Claude Code?",
            "ja": "Claude Code における「Settings for MCP Servers」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "模型别名",
                "en": "Attribution Settings",
                "ja": "Attribution Settings"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2. Frontmatter 字段（16 个）",
                "en": "![Official](../!/tags/official.svg) **(5)**",
                "ja": "![Official](../!/tags/official.svg) **(5)**"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "`.mcp.json` 配置示例",
                "en": "Settings for MCP Servers",
                "ja": "Settings for MCP Servers"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "官方内置命令（69 个）",
                "en": "![Official](../!/tags/official.svg) **(69)**",
                "ja": "![Official](../!/tags/official.svg) **(69)**"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "`.mcp.json` 配置示例",
            "en": "Settings for MCP Servers",
            "ja": "Settings for MCP Servers"
          },
          "reward_card": "card_bp06_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_bp06_001",
        "card_bp06_002",
        "card_bp06_003"
      ]
    },
    {
      "id": "stage_bp07",
      "chapter": "bp07",
      "region": "practice",
      "title": {
        "zh": "配置与工作流",
        "en": "Settings & Workflows",
        "ja": "設定＆ワークフロー"
      },
      "questions": [
        {
          "id": "q_bp07_001",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「1. 设置层级」的正确理解是？",
            "en": "What is the correct understanding of \"Table of Contents\" in Claude Code?",
            "ja": "Claude Code における「Table of Contents」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "会话管理",
                "en": "Global Config Settings (`~/.claude.json`)",
                "ja": "Global Config Settings (`~/.claude.json`)"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "1. 设置层级",
                "en": "Table of Contents",
                "ja": "Table of Contents"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "核心要点",
                "en": "Key Takeaways",
                "ja": "Key Takeaways"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "预算与限制",
                "en": "Useful Commands",
                "ja": "Useful Commands"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "受管设置",
            "en": "Table of Contents",
            "ja": "Table of Contents"
          },
          "reward_card": "card_bp07_001"
        },
        {
          "id": "q_bp07_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「2. 权限系统」直接相关？",
            "en": "Which concept is directly related to \"Settings Hierarchy\"?",
            "ja": "「Settings Hierarchy」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "2. 权限系统",
                "en": "Settings Hierarchy",
                "ja": "Settings Hierarchy"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Stop",
                "en": "Plugin Settings",
                "ja": "Plugin Settings"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "6. 插件系统",
                "en": "MCP Settings",
                "ja": "MCP Settings"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "SessionStart",
                "en": "MCP Server Matching (Managed Settings)",
                "ja": "MCP Server Matching (Managed Settings)"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "2. 权限系统",
            "en": "Managed settings",
            "ja": "Managed settings"
          },
          "reward_card": "card_bp07_002"
        },
        {
          "id": "q_bp07_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Claude Code 中，关于「权限结构」的正确理解是？",
            "en": "What is the correct understanding of \"Core Configuration\" in Claude Code?",
            "ja": "Claude Code における「Core Configuration」の正しい理解はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "禁用 Hooks",
                "en": "Worktree Settings",
                "ja": "Worktree Settings"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "权限结构",
                "en": "Core Configuration",
                "ja": "Core Configuration"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "PermissionRequest",
                "en": "Model Aliases",
                "ja": "Model Aliases"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "工具权限语法",
                "en": "Plans & Memory Directories",
                "ja": "Plans & Memory Directories"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "权限结构",
            "en": "Core Configuration",
            "ja": "Core Configuration"
          },
          "reward_card": "card_bp07_003"
        },
        {
          "id": "q_bp07_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪个概念与「权限模式」直接相关？",
            "en": "Which concept is directly related to \"General Settings\"?",
            "ja": "「General Settings」に直接関連する概念はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "Spinner 自定义示例",
                "en": "Tool Permission Syntax",
                "ja": "Tool Permission Syntax"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "官方内置命令（69 个）",
                "en": "![Official](../!/tags/official.svg) **(69)**",
                "ja": "![Official](../!/tags/official.svg) **(69)**"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "权限模式",
                "en": "General Settings",
                "ja": "General Settings"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "2. 大型 Monorepo 中的 CLAUDE.md",
                "en": "2. CLAUDE.md in Large Monorepos",
                "ja": "2. CLAUDE.md in Large Monorepos"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "权限模式",
            "en": "(Managed only)",
            "ja": "(Managed only)"
          },
          "reward_card": "card_bp07_004"
        },
        {
          "id": "q_bp07_005",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下关于「工具权限语法」的说法，哪个是正确的？",
            "en": "Which statement about \"Plans & Memory Directories\" is correct?",
            "ja": "「Plans & Memory Directories」について正しい説明はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "使用 HTTP Hook",
                "en": "File Suggestion Configuration",
                "ja": "File Suggestion Configuration"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "使用方式",
                "en": "使用方式",
                "ja": "使用方式"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "工具权限语法",
                "en": "Plans & Memory Directories",
                "ja": "Plans & Memory Directories"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "SessionStart",
                "en": "MCP Server Matching (Managed Settings)",
                "ja": "MCP Server Matching (Managed Settings)"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": ")` |\n| `Edit` | `Edit(path pattern)` | `Edit(src/",
            "en": "Example:",
            "ja": "Example:"
          },
          "reward_card": "card_bp07_005"
        }
      ],
      "star_thresholds": [
        0.4,
        0.7,
        1
      ],
      "reward_cards": [
        "card_bp07_001",
        "card_bp07_002",
        "card_bp07_003"
      ]
    }
  ]
};
