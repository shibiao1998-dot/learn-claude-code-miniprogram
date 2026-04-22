// subpkg-chapters/data/knowledge-cards.js
// 构建产物 — Phase 1 MVP: CORE 区域 s01-s06 手写，其余占位
module.exports = {
  stages: [
    // ===== CORE 区域：s01-s06 完整内容 =====
    {
      stage_id: 'stage_s01',
      cards: [
        {
          id: 'kc_s01_001',
          title: { zh: 'Agent Loop 是什么', en: 'What is the Agent Loop', ja: 'エージェントループとは' },
          icon: '🔄',
          content: {
            zh: '模型本身只会"生成内容"，不会自己执行动作。Agent Loop 是包裹在模型外的一层代码，让模型的输出能走到工具，工具结果再回到模型，反复推进任务。',
            en: 'A language model only generates content — it cannot act on its own. The Agent Loop is the code layer that routes model output to tools, feeds results back, and drives the task forward turn by turn.',
            ja: 'モデル自体はコンテンツを生成するだけで、自ら行動できません。エージェントループはモデルの出力をツールに渡し、結果をモデルに返し、タスクを進め続けるコード層です。'
          },
          code_example: 'while True:\n    response = call_model(messages)\n    if response.stop_reason != "tool_use":\n        break\n    results = execute_tools(response)\n    messages.append(results)',
          key_point: {
            zh: '没有 Loop，模型只是会说话；有了 Loop，模型才会干活',
            en: 'Without the loop, the model just talks; with it, the model acts',
            ja: 'ループがなければモデルは話すだけ、ループがあって初めて動ける'
          }
        },
        {
          id: 'kc_s01_002',
          title: { zh: 'Turn：一轮对话的四步', en: 'Turn: The Four Steps of One Round', ja: 'ターン：一回のやり取りの4ステップ' },
          icon: '🔁',
          content: {
            zh: '每一个 Turn（轮）包含：①把消息发给模型，②读取模型回复，③如果有工具调用就执行，④把工具结果写回消息历史。完成四步才进入下一轮。',
            en: 'Each turn has four steps: ① send messages to the model, ② read the reply, ③ execute any tool calls, ④ write tool results back to message history. All four steps complete before the next turn begins.',
            ja: '各ターンは4ステップ: ①メッセージをモデルに送信、②返答を読み取り、③ツール呼び出しを実行、④ツール結果をメッセージ履歴に書き込み。4ステップ完了後に次のターンへ。'
          },
          code_example: '# 四步缺一不可\nmessages.append(assistant_reply)   # 步骤 3\nmessages.append(tool_results)       # 步骤 4',
          key_point: {
            zh: 'Turn 是 Agent Loop 的最小执行单元，每轮必须完整走完四步',
            en: 'A turn is the smallest execution unit; all four steps are required',
            ja: 'ターンは最小実行単位 — 4ステップすべてが必要'
          }
        },
        {
          id: 'kc_s01_003',
          title: { zh: 'tool_result 必须写回历史', en: 'tool_result Must Return to History', ja: 'tool_result は必ず履歴に書き戻す' },
          icon: '📥',
          content: {
            zh: 'tool_result 不是打印在终端上的日志，而是必须重新写回 messages 的结构化数据块。少了这一步，模型下一轮就看不到真实执行结果，无法继续推理。',
            en: 'A tool_result is not a terminal log — it is a structured block that must be written back into the messages list. Without this step, the model cannot see what actually happened and cannot continue reasoning.',
            ja: 'tool_result はターミナルログではなく、messagesリストに書き戻す必要がある構造化データです。この手順がなければ、モデルは実際の結果を見られず推論を続けられません。'
          },
          code_example: '{\n    "type": "tool_result",\n    "tool_use_id": block.id,\n    "content": output,\n}',
          key_point: {
            zh: '工具结果必须进 messages，否则模型下一轮看不见',
            en: 'Results must enter messages or the model sees nothing next turn',
            ja: '結果をmessagesに入れないと、次のターンでモデルには見えない'
          }
        },
        {
          id: 'kc_s01_004',
          title: { zh: 'messages 是工作上下文，不是聊天记录', en: 'messages Is Working Context, Not Chat History', ja: 'messagesはチャット記録ではなく作業コンテキスト' },
          icon: '📋',
          content: {
            zh: '在 Agent 系统里，messages 不是用来展示给用户看的聊天记录，而是模型下一轮工作要读取的输入。每一条 assistant 回复也必须写回去，否则上下文会断层。',
            en: 'In an agent system, messages is not a chat display — it is the working input the model reads each turn. Every assistant reply must also be appended, or context will break between turns.',
            ja: 'エージェントシステムでmessagesはチャット表示ではなく、モデルが各ターンで読む作業入力です。アシスタントの返答もすべて追加しなければ、ターン間でコンテキストが途切れます。'
          },
          code_example: '# 必须保存 assistant 回复，不只是 user 消息\nmessages.append({\n    "role": "assistant",\n    "content": response.content\n})',
          key_point: {
            zh: 'messages = 模型下一轮的工作输入，不是聊天展示层',
            en: 'messages = next turn\'s input, not a display layer',
            ja: 'messages = 次のターンの入力 — 表示層ではない'
          }
        },
        {
          id: 'kc_s01_005',
          title: { zh: 'LoopState：显式收拢循环状态', en: 'LoopState: Explicit Loop State', ja: 'LoopState：明示的なループ状態' },
          icon: '🗂️',
          content: {
            zh: '用一个显式的 state 对象来收拢循环里的关键数据：messages、轮数、以及本轮为何继续（transition_reason）。这比用一堆零散局部变量更清晰，也是后续扩展的基础。',
            en: 'Use an explicit state object to hold loop essentials: messages, turn count, and why the loop should continue (transition_reason). This is cleaner than scattered local variables and forms the foundation for later extensions.',
            ja: 'messages、ターン数、ループ継続理由（transition_reason）を保持する明示的なstateオブジェクトを使います。散らばったローカル変数より明確で、後の拡張の基盤になります。'
          },
          code_example: 'state = {\n    "messages": [],\n    "turn_count": 1,\n    "transition_reason": None,\n}',
          key_point: {
            zh: '把循环状态显式收拢进 state，为后续扩展打好基础',
            en: 'Collect loop state explicitly in one object for future extension',
            ja: 'ループ状態を1つのオブジェクトに明示的にまとめ、将来の拡張に備える'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s02',
      cards: [
        {
          id: 'kc_s02_001',
          title: { zh: 'Dispatch Map：工具扩展的核心', en: 'Dispatch Map: The Core of Tool Extension', ja: 'DispatchMap：ツール拡張の核心' },
          icon: '🗺️',
          content: {
            zh: '工具分发不用写一堆 if/elif，用一个字典（dispatch map）把工具名映射到处理函数即可。加新工具只需加一条字典项和一个 handler 函数，循环体本身完全不变。',
            en: 'Tool dispatch does not need a chain of if/elif statements — a dictionary maps tool names to handler functions. Adding a new tool requires only one dict entry and one handler function; the loop body never changes.',
            ja: 'ツールのディスパッチにif/elifの連鎖は不要です。辞書でツール名をハンドラー関数にマッピングします。新ツールの追加は辞書エントリとハンドラー関数を1つ追加するだけで、ループ本体は変わりません。'
          },
          code_example: 'TOOL_HANDLERS = {\n    "bash":       run_bash,\n    "read_file":  run_read,\n    "write_file": run_write,\n    "edit_file":  run_edit,\n}\nhandler = TOOL_HANDLERS.get(block.name)',
          key_point: {
            zh: '加工具 = 加 handler + 加 schema，循环永远不变',
            en: 'Add tool = add handler + add schema; the loop never changes',
            ja: 'ツール追加 = ハンドラー追加 + スキーマ追加、ループは変わらない'
          }
        },
        {
          id: 'kc_s02_002',
          title: { zh: '路径沙箱：防止工具逃逸', en: 'Path Sandbox: Prevent Tool Escape', ja: 'パスサンドボックス：ツールの逃走を防ぐ' },
          icon: '🔒',
          content: {
            zh: '专用文件工具（read_file、write_file）比直接用 bash 更安全，因为可以在工具层做路径验证，确保所有文件操作都限定在工作目录内，防止模型越界访问系统文件。',
            en: 'Dedicated file tools are safer than raw bash because the tool layer can validate paths — ensuring all file operations stay inside the workspace and the model cannot access system files.',
            ja: '専用ファイルツールは生のbashより安全です。ツール層でパスを検証し、すべてのファイル操作をワークスペース内に限定し、モデルがシステムファイルにアクセスできないようにします。'
          },
          code_example: 'def safe_path(p):\n    path = (WORKDIR / p).resolve()\n    if not path.is_relative_to(WORKDIR):\n        raise ValueError("Path escapes workspace")\n    return path',
          key_point: {
            zh: '路径沙箱在工具层做，而不是靠模型自觉',
            en: 'Path sandboxing happens in the tool layer, not model self-discipline',
            ja: 'パスサンドボックスはモデルの自制ではなくツール層で実施'
          }
        },
        {
          id: 'kc_s02_003',
          title: { zh: '消息规范化：发给 API 前的清理', en: 'Message Normalization: Clean Before Sending', ja: 'メッセージ正規化：送信前の整理' },
          icon: '🧹',
          content: {
            zh: 'API 有三条硬性要求：每个 tool_use 必须有匹配的 tool_result；user/assistant 消息必须严格交替；只接受标准字段。系统复杂后需在发送前做规范化，剥离内部元数据。',
            en: 'The API has three hard rules: every tool_use needs a matching tool_result; user/assistant messages must strictly alternate; only standard fields are accepted. Complex systems need normalization before sending to strip internal metadata.',
            ja: 'APIには3つのルール: 各tool_useには対応するtool_resultが必要、user/assistantメッセージは厳密に交互、標準フィールドのみ受け付け。複雑なシステムでは送信前に正規化して内部メタデータを除去する必要があります。'
          },
          code_example: '# 发送前规范化：剥离内部字段\ndef normalize_messages(messages):\n    return [{"role": m["role"],\n             "content": m["content"]}\n            for m in messages]',
          key_point: {
            zh: '内部 messages 和发给 API 的 messages 可以不同，发前做规范化',
            en: 'Internal messages and API messages can differ — normalize before sending',
            ja: '内部messagesとAPI送信messagesは異なってよい — 送信前に正規化'
          }
        },
        {
          id: 'kc_s02_004',
          title: { zh: '工具 Schema：告诉模型能调什么', en: 'Tool Schema: Tell the Model What to Call', ja: 'ツールスキーマ：モデルに呼び出し可能なものを伝える' },
          icon: '📝',
          content: {
            zh: '工具 schema 定义了模型可以调用的工具名称、描述和参数格式。模型不会随意猜测工具，必须依据 schema 才能正确生成 tool_use 块。schema 和 handler 必须一一对应。',
            en: 'A tool schema defines the tool name, description, and parameter format. The model relies entirely on schemas to generate valid tool_use blocks — it cannot guess. Every schema must have a matching handler.',
            ja: 'ツールスキーマはツール名、説明、パラメータ形式を定義します。モデルはスキーマに基づいてのみ有効なtool_useブロックを生成できます。各スキーマには対応するハンドラーが必要です。'
          },
          code_example: '{\n    "name": "read_file",\n    "description": "Read a file from disk",\n    "input_schema": {\n        "type": "object",\n        "properties": {\n            "path": {"type": "string"}\n        },\n        "required": ["path"]\n    }\n}',
          key_point: {
            zh: '每个工具 = schema（告诉模型）+ handler（真正执行）',
            en: 'Every tool = schema (tells the model) + handler (actually runs)',
            ja: '各ツール = スキーマ（モデルに伝える）+ ハンドラー（実際に実行）'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s03',
      cards: [
        {
          id: 'kc_s03_001',
          title: { zh: 'TodoWrite 是会话内规划，不是任务系统', en: 'TodoWrite Is In-Session Planning, Not a Task System', ja: 'TodoWriteはセッション内計画、タスクシステムではない' },
          icon: '📌',
          content: {
            zh: 'TodoWrite 只在当前会话内生效，帮助模型在多步任务中聚焦"下一步是什么"。它不是持久化任务板，不是多 agent 共用的工作图，更不是后台运行时任务管理。',
            en: 'TodoWrite only lives within the current session, helping the model focus on "what is next" during multi-step tasks. It is not a persistent task board, a shared multi-agent work graph, or a background task manager.',
            ja: 'TodoWriteは現在のセッション内でのみ機能し、複数ステップのタスクで「次は何か」に集中するのを助けます。永続タスクボードでも、複数エージェント共有ワークグラフでも、バックグラウンドタスク管理でもありません。'
          },
          code_example: '',
          key_point: {
            zh: 'TodoWrite = 当前会话的轻量计划，任务完成后消失',
            en: 'TodoWrite = lightweight session plan, disappears when done',
            ja: 'TodoWrite = セッション内の軽量計画、完了後に消える'
          }
        },
        {
          id: 'kc_s03_002',
          title: { zh: '三种状态：pending / in_progress / completed', en: 'Three States: pending / in_progress / completed', ja: '3つの状態：pending / in_progress / completed' },
          icon: '✅',
          content: {
            zh: '计划条目有三种状态：pending（待做）、in_progress（进行中）、completed（已完成）。关键约束：同一时刻只能有一个 in_progress，强制模型聚焦当前一步。',
            en: 'Each plan item has three states: pending, in_progress, and completed. The key constraint is that only one item can be in_progress at a time, forcing the model to focus on one step before moving forward.',
            ja: '各計画アイテムには3つの状態があります: pending（待機中）、in_progress（進行中）、completed（完了）。重要な制約は同時にin_progressになれるのは1つだけで、モデルを現在のステップに集中させます。'
          },
          code_example: '{ "content": "Read the failing test",\n  "status": "in_progress",\n  "activeForm": "Reading the failing test" }',
          key_point: {
            zh: '一次只做一件事，in_progress 只能有一个',
            en: 'Only one thing in_progress at a time — focus enforced',
            ja: '同時にin_progressは1つだけ — 集中を強制'
          }
        },
        {
          id: 'kc_s03_003',
          title: { zh: '提醒机制：把模型拉回计划', en: 'Reminder: Pull the Model Back to the Plan', ja: 'リマインダー：モデルを計画に引き戻す' },
          icon: '🔔',
          content: {
            zh: '如果模型连续几轮都没更新计划，系统会自动提醒它更新 todo。这不是替模型思考，而是轻轻拉它回到显式的计划状态，防止任务在长对话中悄悄漂移。',
            en: 'If the model goes several turns without updating the plan, the system automatically reminds it to update todos. This does not think for the model — it gently pulls it back to the explicit plan to prevent task drift in long sessions.',
            ja: 'モデルが数ターン計画を更新しないと、システムが自動的に更新を促します。これはモデルの代わりに考えるのではなく、長いセッションでのタスクドリフトを防ぐため、明示的な計画に穏やかに引き戻します。'
          },
          code_example: 'if state["rounds_since_update"] > REMINDER_THRESHOLD:\n    system += "\\n[Reminder: Please update your todo list]"',
          key_point: {
            zh: '提醒是防漂移的安全网，不是替模型规划',
            en: 'Reminders are drift-prevention, not model guidance',
            ja: 'リマインダーはドリフト防止の安全網、モデルの代わりに計画するものではない'
          }
        },
        {
          id: 'kc_s03_004',
          title: { zh: '整份重写 vs 局部增删改', en: 'Full Rewrite vs Partial Edit', ja: '全体書き換え vs 部分的な変更' },
          icon: '✏️',
          content: {
            zh: '教学版让模型"整份重写"当前计划，而不是做局部增删改。这样更容易理解和实现：模型每次调用 todo 工具时，直接提交整份最新计划列表，旧内容被覆盖。',
            en: 'The teaching version has the model fully rewrite the current plan each time, rather than make partial edits. This is simpler: each todo tool call submits the complete updated plan, overwriting the old one.',
            ja: '教育版ではモデルが毎回計画全体を書き直します（部分的な編集ではなく）。これがよりシンプルです: 各todoツール呼び出しは完全な更新済み計画を送信し、古いものを上書きします。'
          },
          code_example: 'def update(self, items):\n    # 接受整份列表，完全替换\n    self.items = validated_items\n    return self.render()',
          key_point: {
            zh: '整份重写比局部增删更易实现，且不容易出错',
            en: 'Full rewrite is simpler to implement and less error-prone than partial edits',
            ja: '全体書き換えは部分編集より実装が簡単でエラーも少ない'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s04',
      cards: [
        {
          id: 'kc_s04_001',
          title: { zh: '子智能体的价值：干净上下文', en: 'Subagent Value: A Clean Context', ja: 'サブエージェントの価値：クリーンなコンテキスト' },
          icon: '🧼',
          content: {
            zh: '子智能体的核心价值不是"多一个模型实例"，而是"多一个干净上下文"。把局部任务放进独立上下文里做，完成后只把摘要带回父智能体，防止中间过程的噪声污染主对话。',
            en: 'The core value of a subagent is not "another model instance" — it is "a clean context." Local tasks run in an isolated context, and only a summary returns to the parent, preventing intermediate noise from polluting the main conversation.',
            ja: 'サブエージェントの核心的な価値は「別のモデルインスタンス」ではなく「クリーンなコンテキスト」です。局所的なタスクを独立したコンテキストで実行し、要約だけを親エージェントに返し、中間ノイズがメイン会話を汚染するのを防ぎます。'
          },
          code_example: 'def run_subagent(prompt):\n    # 关键：不共享父 messages，从新列表开始\n    sub_messages = [{"role": "user", "content": prompt}]',
          key_point: {
            zh: '子智能体 = 干净上下文，不是更多算力',
            en: 'Subagent = clean context, not more compute',
            ja: 'サブエージェント = クリーンなコンテキスト、計算リソースの増加ではない'
          }
        },
        {
          id: 'kc_s04_002',
          title: { zh: '上下文隔离：各自的 messages', en: 'Context Isolation: Separate messages Lists', ja: 'コンテキスト分離：それぞれのmessagesリスト' },
          icon: '🔀',
          content: {
            zh: '父智能体和子智能体各自维护独立的 messages 列表。子智能体不继承父智能体的历史（除非显式 fork），子智能体的中间过程也不会自动写回父智能体。',
            en: 'Parent and subagent each maintain their own messages list. The subagent does not inherit the parent\'s history (unless explicitly forked), and intermediate steps never automatically flow back to the parent.',
            ja: '親エージェントとサブエージェントはそれぞれ独立したmessagesリストを持ちます。サブエージェントは親の履歴を継承せず（明示的フォーク以外）、中間ステップは自動的に親に戻りません。'
          },
          code_example: '# 空白上下文 vs Fork\n# 空白：sub_messages = [{"role": "user", ...}]\n# Fork：sub_messages = list(parent_messages)\n#        sub_messages.append(new_task)',
          key_point: {
            zh: '父子 messages 完全独立，子任务噪声不污染主对话',
            en: 'Parent and child messages are fully independent — subtask noise stays isolated',
            ja: '親子messagesは完全独立 — サブタスクのノイズはメイン会話に届かない'
          }
        },
        {
          id: 'kc_s04_003',
          title: { zh: 'max_turns：防止子智能体无限运行', en: 'max_turns: Prevent Infinite Subagent Runs', ja: 'max_turns：サブエージェントの無限実行を防ぐ' },
          icon: '⏱️',
          content: {
            zh: '子智能体必须设置最大轮数限制（max_turns），防止它因任务描述不清而无限跑下去。同时应限制子智能体的工具集，通常不允许它再派生新的子智能体，防止无限递归。',
            en: 'Subagents must have a max_turns limit to prevent infinite runs from unclear task descriptions. Their tool set should also be restricted — typically no ability to spawn further subagents, preventing infinite recursion.',
            ja: 'サブエージェントには無限実行を防ぐためmax_turnsの制限が必要です。また、ツールセットも制限すべきで、通常はさらなるサブエージェントを生成する能力を与えず、無限再帰を防ぎます。'
          },
          code_example: 'class SubagentContext:\n    messages: list   # 独立上下文\n    tools: list      # 限制工具集\n    handlers: dict\n    max_turns: int   # 防止无限运行',
          key_point: {
            zh: '子智能体必须有边界：max_turns + 受限工具集',
            en: 'Subagents need boundaries: max_turns + restricted tools',
            ja: 'サブエージェントには境界が必要: max_turns + 制限されたツールセット'
          }
        },
        {
          id: 'kc_s04_004',
          title: { zh: 'Fork vs 空白上下文', en: 'Fork vs Clean Context', ja: 'フォーク vs クリーンコンテキスト' },
          icon: '🌿',
          content: {
            zh: 'Fork 是继承父智能体的已有上下文再追加子任务，适合"基于之前讨论继续"的场景。空白上下文是从零开始，适合完全独立的局部任务。先学空白上下文，再考虑 fork。',
            en: 'Fork inherits the parent\'s existing context and appends the subtask — useful when the subagent needs prior conversation. Clean context starts from scratch — best for fully independent tasks. Learn clean context first, then fork.',
            ja: 'フォークは親の既存コンテキストを継承してサブタスクを追加します — サブエージェントが以前の会話を必要とする場合に有用。クリーンコンテキストはゼロから開始 — 完全に独立したタスクに最適。まずクリーンコンテキストを学び、その後フォークを。'
          },
          code_example: '# Fork 的本质：继承上下文\nsub_messages = list(parent_messages)\nsub_messages.append({\n    "role": "user",\n    "content": subtask_prompt\n})',
          key_point: {
            zh: 'Fork = 继承父上下文；空白 = 全新开始，各有适用场景',
            en: 'Fork = inherit parent context; clean = fresh start — each has its place',
            ja: 'フォーク = 親コンテキストを継承、クリーン = 新しい開始 — それぞれの用途がある'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s05',
      cards: [
        {
          id: 'kc_s05_001',
          title: { zh: 'Skill 是按需加载的知识包', en: 'A Skill Is On-Demand Knowledge', ja: 'スキルはオンデマンドの知識パッケージ' },
          icon: '📚',
          content: {
            zh: 'Skill 是围绕某类任务的可复用说明书（如代码审查清单、Git 工作流指南）。它不是记忆，不是 CLAUDE.md，而是"平时只展示目录，真正需要时才把全文加载进上下文"。',
            en: 'A skill is a reusable task guide (e.g., code review checklist, Git workflow). It is not memory or CLAUDE.md — skills are "show only the directory by default; load the full body into context only when needed."',
            ja: 'スキルは再利用可能なタスクガイドです（コードレビューチェックリスト、Gitワークフローなど）。記憶でもCLAUDE.mdでもありません — デフォルトではディレクトリのみ表示し、必要な時だけ全文をコンテキストに読み込みます。'
          },
          code_example: '# system prompt 只放目录\nSkills available:\n  - code-review: Checklist for code changes\n  - git-workflow: Branch and commit guidance\n\n# 工具调用才加载全文\nload_skill("code-review") -> tool_result: <full content>',
          key_point: {
            zh: 'Skill = 轻量目录 + 按需全文，节省上下文空间',
            en: 'Skill = lightweight index + on-demand body — conserves context space',
            ja: 'スキル = 軽量インデックス + オンデマンド本文 — コンテキスト空間を節約'
          }
        },
        {
          id: 'kc_s05_002',
          title: { zh: 'Discovery vs Loading：两层分离', en: 'Discovery vs Loading: Two Separate Layers', ja: 'DiscoveryとLoading：2つのレイヤーの分離' },
          icon: '🔍',
          content: {
            zh: 'Discovery（发现）只需轻量信息：skill 名称 + 描述，放在 system prompt 里。Loading（加载）才昂贵：把完整正文通过 tool_result 注入上下文，按需加载。',
            en: 'Discovery needs only lightweight info: skill name + one-line description, placed in the system prompt. Loading is expensive: inject the full skill body via tool_result into context — only when the model decides it is needed.',
            ja: 'Discoveryには軽量な情報のみ必要: スキル名 + 一行説明、システムプロンプトに配置。Loadingは高コスト: tool_resultを通じて完全なスキル本文をコンテキストに注入 — モデルが必要と判断した時だけ。'
          },
          code_example: '# Discovery: system prompt\n"Skills available: code-review, git-workflow"\n\n# Loading: tool_result\nload_skill("code-review")\n# -> "<skill>完整内容...</skill>"',
          key_point: {
            zh: '目录始终可见，正文按需注入，避免 prompt 臃肿',
            en: 'Index always visible, body injected on demand — no bloated prompt',
            ja: 'インデックスは常に見える、本文はオンデマンドで注入 — プロンプトの肥大化を防ぐ'
          }
        },
        {
          id: 'kc_s05_003',
          title: { zh: 'SkillRegistry：统一管理所有知识包', en: 'SkillRegistry: Central Skill Management', ja: 'SkillRegistry：全知識パッケージの一元管理' },
          icon: '🗃️',
          content: {
            zh: '把所有 skill 放进注册表（SkillRegistry），它回答两个问题：有哪些 skill 可用，以及某个 skill 的完整内容是什么。每个 skill 一个目录，含 SKILL.md。',
            en: 'Collect all skills in a SkillRegistry that answers two questions: which skills are available, and what is the full content of a given skill. Organized as a directory structure with one folder per skill, each containing SKILL.md.',
            ja: 'すべてのスキルをSkillRegistryにまとめ、2つの質問に答えられるようにします: 利用可能なスキルは何か、特定のスキルの完全な内容は何か。各スキルに1フォルダ、SKILL.mdを含むディレクトリ構造で整理。'
          },
          code_example: 'skills/\n  code-review/\n    SKILL.md   # name, description + full body\n  git-workflow/\n    SKILL.md\n\nregistry.describe_available()  # -> 目录\nregistry.load_full_text(name)  # -> 全文',
          key_point: {
            zh: 'SkillRegistry 统一管理，目录和全文各司其职',
            en: 'SkillRegistry unifies management — index and full text serve different purposes',
            ja: 'SkillRegistryで一元管理 — インデックスと全文はそれぞれの役割がある'
          }
        },
        {
          id: 'kc_s05_004',
          title: { zh: 'Skill 不是记忆，不是 CLAUDE.md', en: 'Skills Are Not Memory or CLAUDE.md', ja: 'スキルは記憶でもCLAUDE.mdでもない' },
          icon: '⚠️',
          content: {
            zh: 'Skill 是"针对特定类型任务的操作指南"，按需加载一次。记忆是跨会话持久化的信息。CLAUDE.md 是项目级别的持久指令。三者目的不同，不要混用。',
            en: 'Skills are "task-specific operation guides" loaded on demand once. Memory is information persisted across sessions. CLAUDE.md is project-level persistent instructions. All three serve different purposes — do not confuse them.',
            ja: 'スキルは「特定タスク向けの操作ガイド」でオンデマンドで一度読み込みます。記憶はセッションをまたいで永続化される情報。CLAUDE.mdはプロジェクトレベルの永続的な指示。三者の目的は異なり、混同しないでください。'
          },
          code_example: '',
          key_point: {
            zh: 'Skill = 操作指南（按需）；记忆 = 跨会话数据；CLAUDE.md = 项目指令',
            en: 'Skill = task guide (on-demand); memory = cross-session data; CLAUDE.md = project instructions',
            ja: 'スキル = タスクガイド（オンデマンド）、記憶 = セッション横断データ、CLAUDE.md = プロジェクト指示'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s06',
      cards: [
        {
          id: 'kc_s06_001',
          title: { zh: '上下文窗口是有限的，必须主动管理', en: 'Context Window Is Finite — Manage It Actively', ja: 'コンテキストウィンドウは有限 — 積極的に管理する' },
          icon: '📊',
          content: {
            zh: '上下文窗口是模型这一轮能看到的总容量，不是无限的。随着任务推进，大输出、命令结果、多轮历史会快速填满它，导致注意力被旧内容淹没，最终任务中断。',
            en: 'The context window is the total capacity the model sees in one turn — it is not infinite. As tasks progress, large outputs, command results, and multi-turn history fill it rapidly, drowning attention in old content and eventually interrupting the task.',
            ja: 'コンテキストウィンドウはモデルが1ターンで見られる総容量で、無限ではありません。タスクが進むにつれ、大きな出力、コマンド結果、複数ターンの履歴が素早く埋まり、古いコンテンツで注意が溢れ、最終的にタスクが中断されます。'
          },
          code_example: '',
          key_point: {
            zh: '上下文不是越多越好，活跃有用的部分才重要',
            en: 'More context is not better — only the actively useful part matters',
            ja: 'コンテキストは多ければいいわけではない — 活発に有用な部分だけが重要'
          }
        },
        {
          id: 'kc_s06_002',
          title: { zh: '大输出持久化：写磁盘，留预览', en: 'Persist Large Outputs: Write to Disk, Keep Preview', ja: '大きな出力を永続化：ディスクに書き、プレビューを残す' },
          icon: '💾',
          content: {
            zh: '工具输出如果太大，不要把全文强塞进上下文。把全文写到磁盘，然后在 messages 里只保留一段预览和文件路径。模型依然知道"发生了什么"，但不必一直背着原始大输出。',
            en: 'If tool output is too large, do not force the full text into context. Save the full output to disk and keep only a preview and file path in messages. The model still knows what happened without carrying the raw large output.',
            ja: 'ツール出力が大きすぎる場合、全文を無理やりコンテキストに入れないでください。全文をディスクに保存し、messagesにはプレビューとファイルパスだけを残します。モデルは何が起こったかを知りながら、大きな生の出力を持ち続ける必要はありません。'
          },
          code_example: '"<persisted-output>\\n"\n"Full output saved to: .task_outputs/abc.txt\\n"\n"Preview:\\n<first 2000 chars>\\n"\n"</persisted-output>"',
          key_point: {
            zh: '大输出 = 磁盘存全文 + 上下文留预览',
            en: 'Large output = full text on disk + preview in context',
            ja: '大きな出力 = ディスクに全文 + コンテキストにプレビュー'
          }
        },
        {
          id: 'kc_s06_003',
          title: { zh: '微压缩：旧工具结果改成占位', en: 'Micro-Compact: Replace Old Results with Placeholders', ja: 'マイクロ圧縮：古い結果をプレースホルダーに置き換え' },
          icon: '🗜️',
          content: {
            zh: '在 messages 里只保留最近几个工具结果的完整内容，更旧的工具结果替换成简短占位提示（如"[Earlier tool result omitted]"）。防止上下文被旧结果长期霸占。',
            en: 'Keep only the last few complete tool results in messages; replace older ones with a short placeholder like "[Earlier tool result omitted]". This prevents old results from permanently occupying context space.',
            ja: 'messagesには最新のいくつかのツール結果のみ完全な内容を保持し、古いものは短いプレースホルダー（「[Earlier tool result omitted]」など）に置き換えます。古い結果がコンテキスト空間を永続的に占有するのを防ぎます。'
          },
          code_example: 'def micro_compact(messages):\n    results = collect_tool_results(messages)\n    for r in results[:-3]:  # 只保留最近3个\n        r["content"] = "[Earlier tool result omitted]"\n    return messages',
          key_point: {
            zh: '旧结果不必永远原样保留，占位提示已够用',
            en: 'Old results need not be kept forever — a placeholder suffices',
            ja: '古い結果を永遠にそのまま保持する必要はない — プレースホルダーで十分'
          }
        },
        {
          id: 'kc_s06_004',
          title: { zh: '完整压缩：把历史变成摘要', en: 'Full Compact: Summarize the History', ja: 'フル圧縮：履歴を要約に変換' },
          icon: '📝',
          content: {
            zh: '当整体上下文太长时，把历史压缩成一份摘要，并作为新的起点继续。摘要必须保留：当前目标、已完成的动作、改过的文件、做出的关键决定、还没完成的事项。',
            en: 'When the overall context is too long, compress history into a summary and use it as the new starting point. The summary must preserve: current goal, completed actions, changed files, key decisions, and remaining work.',
            ja: '全体のコンテキストが長すぎる場合、履歴を要約して新しい出発点として使用します。要約には必ず含めること: 現在の目標、完了したアクション、変更されたファイル、重要な決定、残りの作業。'
          },
          code_example: '# 压缩后的起点\n[{\n    "role": "user",\n    "content": "This conversation was compacted.\\n"\n             + summary  # 保留核心连续性\n}]',
          key_point: {
            zh: '压缩不是丢失信息，而是保留"继续工作真正需要的部分"',
            en: 'Compaction is not losing information — it is keeping only what is needed to continue',
            ja: '圧縮は情報を失うのではなく、継続に必要なものだけを保持すること'
          }
        },
        {
          id: 'kc_s06_005',
          title: { zh: '三层压缩策略总览', en: 'Three-Layer Compact Strategy Overview', ja: '3層圧縮戦略の概要' },
          icon: '🏗️',
          content: {
            zh: '上下文压缩分三层：①大输出立刻写磁盘只留预览；②旧工具结果定期替换为占位；③整体历史太长时一次性生成摘要。三层从局部到整体，按需组合使用。',
            en: 'Context compression has three layers: ① large outputs immediately written to disk with only a preview kept; ② old tool results periodically replaced with placeholders; ③ full history summarized when overall context becomes too large. Three layers, local to global, combined as needed.',
            ja: 'コンテキスト圧縮には3層あります: ①大きな出力は即座にディスクに書き込みプレビューのみ保持、②古いツール結果は定期的にプレースホルダーに置換、③全体の履歴が長くなったら一度に要約。3層を局所から全体へ、必要に応じて組み合わせ使用。'
          },
          code_example: '# 层 1: 大输出 -> 磁盘\npersist_large_output(tool_use_id, output)\n# 层 2: 旧结果 -> 占位\nmicro_compact(messages)\n# 层 3: 整体历史 -> 摘要\ncompact_history(messages)',
          key_point: {
            zh: '三层压缩由浅入深，共同保持上下文健康',
            en: 'Three compression layers from shallow to deep keep context healthy',
            ja: '3層の圧縮で浅いものから深いものまで、コンテキストを健全に保つ'
          }
        }
      ]
    },

    // ===== 占位区域：s07-s19 =====
    {
      stage_id: 'stage_s07',
      cards: [
        {
          id: 'kc_s07_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s08',
      cards: [
        {
          id: 'kc_s08_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s09',
      cards: [
        {
          id: 'kc_s09_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s10',
      cards: [
        {
          id: 'kc_s10_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s11',
      cards: [
        {
          id: 'kc_s11_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s12',
      cards: [
        {
          id: 'kc_s12_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s13',
      cards: [
        {
          id: 'kc_s13_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s14',
      cards: [
        {
          id: 'kc_s14_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s15',
      cards: [
        {
          id: 'kc_s15_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s16',
      cards: [
        {
          id: 'kc_s16_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s17',
      cards: [
        {
          id: 'kc_s17_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s18',
      cards: [
        {
          id: 'kc_s18_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s19',
      cards: [
        {
          id: 'kc_s19_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },

    // ===== 占位区域：bp01-bp07 =====
    {
      stage_id: 'stage_bp01',
      cards: [
        {
          id: 'kc_bp01_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp02',
      cards: [
        {
          id: 'kc_bp02_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp03',
      cards: [
        {
          id: 'kc_bp03_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp04',
      cards: [
        {
          id: 'kc_bp04_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp05',
      cards: [
        {
          id: 'kc_bp05_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp06',
      cards: [
        {
          id: 'kc_bp06_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp07',
      cards: [
        {
          id: 'kc_bp07_placeholder',
          title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
          icon: '🚀',
          content: {
            zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
            en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
            ja: 'この章のカードは準備中です。クイズを始めることができます。'
          },
          code_example: '',
          key_point: {
            zh: '点击下方按钮直接开始测验',
            en: 'Click below to start the quiz',
            ja: '下のボタンをクリックしてクイズを開始'
          }
        }
      ]
    }
  ]
};
