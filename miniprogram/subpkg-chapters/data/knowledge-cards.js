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
          id: 'kc_s07_001',
          title: { zh: '权限管道四步流程', en: 'Four-Step Permission Pipeline', ja: '権限パイプライン4段階フロー' },
          icon: '🚦',
          content: {
            zh: '权限系统不是一个简单开关，而是一条四步管道：先看 deny rules 拦截危险操作，再看当前模式（plan 阻止写入），然后看 allow rules 自动放行安全操作，最后才问用户。',
            en: 'The permission system is a four-step pipeline: deny rules block dangerous ops, mode check restricts by session style, allow rules auto-approve safe ops, then ask the user.',
            ja: '権限システムは4段階パイプライン：denyルールで危険操作をブロック、モード確認、allowルールで安全操作を自動許可、最後にユーザー確認。'
          },
          code_example: 'def check_permission(tool, input):\n    if matches_deny(tool, input): return "deny"\n    if mode == "plan" and is_write(tool): return "deny"\n    if matches_allow(tool, input): return "allow"\n    return "ask"',
          key_point: {
            zh: '任何工具调用都不应直接执行，中间必须先过一条权限管道',
            en: 'Every tool call must pass through a permission pipeline before execution',
            ja: 'すべてのツール呼び出しは実行前に権限パイプラインを通す必要がある'
          }
        },
        {
          id: 'kc_s07_002',
          title: { zh: '三种权限模式', en: 'Three Permission Modes', ja: '3つの権限モード' },
          icon: '🔑',
          content: {
            zh: '先稳住三种模式就够：default 模式下未命中规则问用户，plan 模式只允许读不允许写，auto 模式让安全操作自动过、危险操作才问。',
            en: 'Three modes cover most needs: default asks the user for unmatched rules, plan allows only reads, auto approves safe ops and asks for risky ones.',
            ja: '3つのモードで大半をカバー：defaultはルール未該当時にユーザー確認、planは読み取りのみ、autoは安全操作を自動承認し危険のみ確認。'
          },
          code_example: 'MODES = {\n    "default": "ask user when unmatched",\n    "plan":    "read-only, block all writes",\n    "auto":    "safe ops pass, risky ops ask",\n}',
          key_point: {
            zh: '先做 default / plan / auto 三种模式，已经够用',
            en: 'Start with default / plan / auto — three modes are enough',
            ja: 'default / plan / auto の3モードから始めれば十分'
          }
        },
        {
          id: 'kc_s07_003',
          title: { zh: 'Bash 命令安全检查', en: 'Bash Command Safety Check', ja: 'Bashコマンド安全チェック' },
          icon: '🛡️',
          content: {
            zh: '所有工具里 bash 最危险——read_file 只能读，write_file 只能写，但 bash 几乎能做任何事。不能把 bash 命令当普通字符串，至少要检查 sudo、rm -rf 等危险模式。',
            en: 'bash is the most dangerous tool — read_file only reads, write_file only writes, but bash can do almost anything. Check for danger patterns like sudo, rm -rf, and command substitution.',
            ja: 'bashは最も危険なツール。read_fileは読み取りのみ、write_fileは書き込みのみだがbashはほぼ何でも可能。sudo、rm -rfなどの危険パターンを検査すべきです。'
          },
          code_example: 'DANGEROUS = ["sudo", "rm -rf", "$(", "`"]\ndef is_dangerous_bash(cmd):\n    return any(p in cmd for p in DANGEROUS)',
          key_point: {
            zh: 'bash 不是普通文本，而是可执行动作描述，必须特殊对待',
            en: 'bash is not plain text but an executable action — it needs special handling',
            ja: 'bashは単なるテキストではなく実行可能なアクション — 特別な扱いが必要'
          }
        },
        {
          id: 'kc_s07_004',
          title: { zh: '权限规则数据结构', en: 'Permission Rule Data Structure', ja: '権限ルールのデータ構造' },
          icon: '📋',
          content: {
            zh: '一条权限规则最少要三个字段：针对哪个工具、匹配什么模式、命中后怎么处理。规则和决策结果分开两层，决策结果还要带上原因说明。',
            en: 'A permission rule needs three fields: which tool, what pattern to match, and what to do (allow/deny/ask). Rules and decisions are separate objects — decisions include a reason.',
            ja: '権限ルールには3フィールド：対象ツール、マッチパターン、アクション。ルールと判定結果は別オブジェクトで、判定結果には理由を含めます。'
          },
          code_example: 'rule = {\n    "tool": "bash",\n    "content": "sudo *",\n    "behavior": "deny",\n}\ndecision = {\n    "behavior": "deny",\n    "reason": "matched deny rule",\n}',
          key_point: {
            zh: '权限规则 = 工具 + 模式 + 动作，决策结果要带理由',
            en: 'Permission rule = tool + pattern + action; decisions must include a reason',
            ja: '権限ルール = ツール + パターン + アクション、判定結果には理由を含める'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s08',
      cards: [
        {
          id: 'kc_s08_001',
          title: { zh: 'Hook 是预留插口', en: 'Hook Is a Pre-built Interface', ja: 'Hookは事前予約された呼び出し口' },
          icon: '🔌',
          content: {
            zh: 'Hook 不是在主循环里塞 if/else，而是主循环在固定时机对外暴露的调用接口。主循环只需知道：现在是什么事件、交出什么上下文、收到结果怎么处理。',
            en: 'A hook is not an if/else in the main loop but a call interface exposed at fixed moments. The loop only knows: what event, what context to pass, how to handle the result.',
            ja: 'Hookはメインループのif/elseではなく、固定タイミングで公開するコールインターフェース。ループが知るのは：イベント名、渡すコンテキスト、結果の処理方法だけ。'
          },
          code_example: 'result = run_hooks("PreToolUse", {\n    "tool_name": block.name,\n    "input": block.input,\n})\nif result["exit_code"] == 1:\n    skip_tool_execution()',
          key_point: {
            zh: 'Hook 让系统可扩展，但不要求主循环理解每个扩展需求',
            en: 'Hooks make the system extensible without the main loop understanding each extension',
            ja: 'Hookはメインループに拡張の詳細を理解させずにシステムを拡張可能にする'
          }
        },
        {
          id: 'kc_s08_002',
          title: { zh: '三个核心事件', en: 'Three Core Events', ja: '3つのコアイベント' },
          icon: '📡',
          content: {
            zh: '先学三个事件就够：SessionStart 会话开始时触发（打印欢迎信息），PreToolUse 工具执行前触发（额外检查或拦截），PostToolUse 工具执行后触发（审计日志或追加说明）。',
            en: 'Three events are enough: SessionStart fires at session begin, PreToolUse fires before tool execution for checks or blocking, PostToolUse fires after for audit logs or notes.',
            ja: '3つのイベントで十分：SessionStartはセッション開始時、PreToolUseはツール実行前（チェックやブロック）、PostToolUseは実行後（監査ログや補足）に発火。'
          },
          code_example: 'HOOKS = {\n    "SessionStart": [on_session_start],\n    "PreToolUse":   [pre_tool_guard],\n    "PostToolUse":  [post_tool_log],\n}',
          key_point: {
            zh: '先学 SessionStart / PreToolUse / PostToolUse，就能搭出最小 hook 机制',
            en: 'Master SessionStart / PreToolUse / PostToolUse and you have a minimal hook system',
            ja: 'SessionStart / PreToolUse / PostToolUse を押さえれば最小限のhook機構が作れる'
          }
        },
        {
          id: 'kc_s08_003',
          title: { zh: '退出码约定 0/1/2', en: 'Exit Code Convention 0/1/2', ja: '終了コード規約 0/1/2' },
          icon: '🔢',
          content: {
            zh: '统一用三个退出码：0 表示正常继续（观察），1 表示阻止当前动作（拦截），2 表示注入补充消息再继续（补充）。hook 的三种核心作用一目了然。',
            en: 'Three unified exit codes: 0 = continue normally (observe), 1 = block the action (intercept), 2 = inject a message then continue (augment). The three core hook roles are immediately clear.',
            ja: '3つの統一終了コード：0は正常続行（観察）、1はアクションブロック（遮断）、2はメッセージ注入して続行（補強）。hookの3つの核心的役割が一目瞭然。'
          },
          code_example: 'EXIT_CONTINUE = 0  # 观察：正常继续\nEXIT_BLOCK    = 1  # 拦截：阻止当前动作\nEXIT_INJECT   = 2  # 补充：追加消息再继续',
          key_point: {
            zh: '0 = 继续，1 = 拦截，2 = 补充——hook 的三种核心作用',
            en: '0 = continue, 1 = block, 2 = inject — the three core hook actions',
            ja: '0 = 続行、1 = ブロック、2 = メッセージ注入 — hookの3つの核心アクション'
          }
        },
        {
          id: 'kc_s08_004',
          title: { zh: 'Hook 接入主循环', en: 'Integrating Hooks into the Main Loop', ja: 'Hookをメインループに統合する' },
          icon: '🔗',
          content: {
            zh: '接法很简单：工具执行前调 run_hooks("PreToolUse")，返回 1 跳过执行、返回 2 先追加消息。执行后调 run_hooks("PostToolUse") 做补充。主循环结构几乎不变。',
            en: 'Integration is simple: call run_hooks("PreToolUse") before execution — 1 skips it, 2 appends a message first. Call run_hooks("PostToolUse") after for augmentation. The loop barely changes.',
            ja: '統合はシンプル：実行前にrun_hooks("PreToolUse")を呼び、1で実行スキップ、2でメッセージ追加。実行後にrun_hooks("PostToolUse")で補足。ループ構造はほぼ不変。'
          },
          code_example: 'pre = run_hooks("PreToolUse", payload)\nif pre["exit_code"] == 1:\n    results.append(blocked_result(pre["message"]))\n    continue\noutput = run_tool(block)\nrun_hooks("PostToolUse", {**payload, "output": output})',
          key_point: {
            zh: '主循环只需在工具执行前后各插一行 run_hooks，结构几乎不变',
            en: 'Just add run_hooks before and after tool execution — the loop barely changes',
            ja: 'ツール実行前後にrun_hooks呼び出しを追加するだけ — ループ構造はほぼ不変'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s09',
      cards: [
        {
          id: 'kc_s09_001',
          title: { zh: 'Memory 只存跨会话价值', en: 'Memory Stores Only Cross-Session Value', ja: 'Memoryはセッション横断の価値だけを保存' },
          icon: '🧠',
          content: {
            zh: 'Memory 不是"什么都记"。只有跨会话仍有价值、且不能从当前仓库状态轻易推出来的信息才该存。什么都存会变成垃圾堆，让系统产生幻觉。',
            en: 'Memory is not about storing everything. Only information valuable across sessions that cannot be re-derived from the current repo state deserves storage. Storing everything turns memory into a hallucination source.',
            ja: 'Memoryは「すべてを記録」するものではない。セッション横断で価値があり、現在のリポジトリから再導出できない情報だけが保存に値します。何でも保存するとmemoryは幻覚の源になります。'
          },
          code_example: '# 该存\n"用户偏好 tabs 缩进"       # 代码看不出\n"重写因合规要求"            # git log 看不出\n# 不该存\n"src/ 有 tests/"            # 可重新读\n"当前在改认证模块"          # 是 task 不是 memory',
          key_point: {
            zh: 'Memory 保存的是"以后还可能有价值、但代码里不容易直接看出来"的信息',
            en: 'Memory stores what may matter later but cannot be easily seen in the code',
            ja: 'Memoryは「将来も価値がありうるが、コードからは読み取れない」情報を保存する'
          }
        },
        {
          id: 'kc_s09_002',
          title: { zh: '四类 Memory', en: 'Four Memory Types', ja: '4種類のMemory' },
          icon: '📂',
          content: {
            zh: '四种类型各有边界：user 存用户偏好（喜欢什么风格），feedback 存用户纠正（以前错过什么），project 存项目隐性约定（为什么这样设计），reference 存外部资源指针。',
            en: 'Four types with clear boundaries: user for preferences, feedback for corrections, project for implicit conventions, reference for external resource pointers.',
            ja: '4種類に明確な境界：userはユーザーの好み、feedbackは修正指示、projectは暗黙の約束事、referenceは外部リソースへのポインタ。'
          },
          code_example: 'MEMORY_TYPES = (\n    "user",       # 用户偏好\n    "feedback",   # 用户纠正\n    "project",    # 项目隐性约定\n    "reference",  # 外部资源指针\n)',
          key_point: {
            zh: 'user / feedback / project / reference 四类各有边界，不要混用',
            en: 'Four types — user / feedback / project / reference — each with clear boundaries',
            ja: 'user / feedback / project / reference の4種類にはそれぞれ明確な境界がある'
          }
        },
        {
          id: 'kc_s09_003',
          title: { zh: 'Memory 文件结构', en: 'Memory File Structure', ja: 'Memoryファイル構造' },
          icon: '📄',
          content: {
            zh: '每条 memory 独立一个文件，用 frontmatter 标注元信息，正文写具体内容。再加一个 MEMORY.md 索引文件让系统快速知道有哪些 memory 可用。',
            en: 'Each memory is an independent file with frontmatter metadata and content body. A MEMORY.md index lets the system quickly see what\'s available without reading every file.',
            ja: '各memoryは独立ファイルでfrontmatterにメタ情報、本文に内容を記録。MEMORY.mdインデックスで全ファイルを読まずに利用可能なmemoryを確認。'
          },
          code_example: '# .memory/prefer_tabs.md\n# ---\n# name: prefer_tabs\n# type: user\n# ---\n# User prefers tabs over spaces.\n\n# MEMORY.md (索引)\n# - prefer_tabs [user]',
          key_point: {
            zh: '一条 memory 一个文件 + MEMORY.md 索引，结构简单好维护',
            en: 'One memory per file plus a MEMORY.md index — simple and maintainable',
            ja: '1メモリ1ファイル + MEMORY.mdインデックス — シンプルで維持しやすい'
          }
        },
        {
          id: 'kc_s09_004',
          title: { zh: '不该存入 Memory 的东西', en: 'What Should Not Go into Memory', ja: 'Memoryに入れてはいけないもの' },
          icon: '⚠️',
          content: {
            zh: '文件结构可以重新读代码得到，任务进度属于 task，临时分支名很快过时，bug 修复细节看提交记录。存了不该存的，memory 会从"帮助变聪明"变成"帮助产生幻觉"。',
            en: 'File structures can be re-read from code, task progress belongs to tasks, temp branch names expire fast, bug fix details belong in commits. Wrong storage turns memory into a hallucination source.',
            ja: 'ファイル構造はコードから再読取可能、タスク進捗はtaskに属す、一時ブランチ名はすぐ無効化、バグ修正詳細はコミット履歴に。不適切な保存はmemoryを幻覚の源に変える。'
          },
          code_example: 'BAD_MEMORY = [\n    "src/ 有 tests/",       # 可重新读\n    "当前 PR #42 还差两项", # task 不是 memory\n    "feat/auth 分支",       # 很快过时\n    "用 try/except 修 bug", # 看 git log\n]',
          key_point: {
            zh: '能从代码重新读到的、属于当前任务的、很快过时的——都不该进 memory',
            en: 'If re-readable from code, part of a current task, or expires quickly — don\'t store it',
            ja: 'コードから再読取可能、現タスクに属する、すぐ無効化する情報はmemoryに入れない'
          }
        },
        {
          id: 'kc_s09_005',
          title: { zh: 'Memory 与其他系统的边界', en: 'Memory vs Other Storage Systems', ja: 'Memoryと他システムの境界' },
          icon: '🗂️',
          content: {
            zh: '简单判断法：只对这次任务有用放 task/plan，以后很多会话可能用放 memory，长期系统级固定说明放 CLAUDE.md。三者各管一层，不要混。',
            en: 'Simple rule: useful only for this task → task/plan; useful across sessions → memory; permanent system instruction → CLAUDE.md. Three layers, don\'t mix.',
            ja: '簡単な判断法：今のタスクだけならtask/plan、セッション横断ならmemory、恒久的指示ならCLAUDE.md。3層を混ぜない。'
          },
          code_example: 'def where_to_store(info):\n    if info.only_this_task:  return "task/plan"\n    if info.cross_session:   return "memory"\n    if info.permanent_rule:  return "CLAUDE.md"',
          key_point: {
            zh: 'task/plan 管当前任务，memory 管跨会话价值，CLAUDE.md 管长期规则',
            en: 'task/plan for current work, memory for cross-session value, CLAUDE.md for lasting rules',
            ja: 'task/planは現在の作業、memoryはセッション横断の価値、CLAUDE.mdは恒久ルール'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s10',
      cards: [
        {
          id: 'kc_s10_001',
          title: { zh: 'Prompt 是组装流水线', en: 'Prompt Is an Assembly Pipeline', ja: 'Promptは組み立てパイプライン' },
          icon: '🏭',
          content: {
            zh: '很多初学者把 system prompt 写成一大段固定文本。但系统长功能后工具列表会变、memory 会变、目录会变。prompt 应该升级成由多个来源共同组装的流水线。',
            en: 'Many beginners write system prompts as one big static string. But as the system grows, tools, memory, and directories change. The prompt should become an assembly pipeline from multiple sources.',
            ja: '多くの初心者はプロンプトを大きな固定テキストとして書く。しかし成長するとツール、memory、ディレクトリが変化。プロンプトは複数ソースからの組み立てパイプラインにすべき。'
          },
          code_example: 'class SystemPromptBuilder:\n    def build(self):\n        parts = []\n        parts.append(self._build_core())\n        parts.append(self._build_tools())\n        parts.append(self._build_memory())\n        parts.append(self._build_dynamic())\n        return "\\n\\n".join(p for p in parts if p)',
          key_point: {
            zh: 'Prompt 的关键不是"写一段很长的话"，而是把不同来源按清晰边界组装',
            en: 'The key is assembling sources with clear boundaries, not writing one long string',
            ja: 'プロンプトの鍵は「長い文章」ではなく、異なるソースを明確な境界で組み立てること'
          }
        },
        {
          id: 'kc_s10_002',
          title: { zh: '六段组装结构', en: 'Six-Section Assembly Structure', ja: '6セクション組み立て構造' },
          icon: '🧩',
          content: {
            zh: '把 prompt 想成六段：核心身份说明、工具列表、skills 元信息、memory 内容、CLAUDE.md 指令链、动态环境信息。每段只负责一种来源，职责清晰。',
            en: 'Think of the prompt as six sections: core identity, tool definitions, skill metadata, memory content, CLAUDE.md chain, and dynamic environment. Each handles one source.',
            ja: 'プロンプトを6セクションとして捉える：コアID、ツール定義、skillメタデータ、memory、CLAUDE.mdチェーン、動的環境情報。各セクションは1ソースのみ担当。'
          },
          code_example: 'SECTIONS = [\n    "core",       # 身份和行为说明\n    "tools",      # 工具列表\n    "skills",     # 技能元信息\n    "memory",     # 跨会话记忆\n    "claude_md",  # 指令文件链\n    "dynamic",    # 日期/目录/模式\n]',
          key_point: {
            zh: '六段各管一种来源：core + tools + skills + memory + claude_md + dynamic',
            en: 'Six sections, one source each: core + tools + skills + memory + claude_md + dynamic',
            ja: '6セクション各1ソース：core + tools + skills + memory + claude_md + dynamic'
          }
        },
        {
          id: 'kc_s10_003',
          title: { zh: '稳定说明 vs 动态提醒', en: 'Stable Instructions vs Dynamic Reminders', ja: '安定した説明 vs 動的リマインダー' },
          icon: '⚖️',
          content: {
            zh: '最重要的边界是稳定系统说明（身份、规则、工具）和每轮临时提醒（日期、新上下文）。两者不该混在一起——主 prompt 保持稳定，每轮变化用 reminder 追加。',
            en: 'The key boundary is stable instructions (identity, rules, tools) vs per-turn reminders (date, new context). Keep the main prompt stable; append changes as reminders.',
            ja: '最も重要な境界は安定したシステム説明（ID、ルール、ツール）と毎ターンのリマインダー（日付、新コンテキスト）。メインプロンプトは安定させ、変化はreminderで追加。'
          },
          code_example: '# 稳定部分（很少变）\nsystem_prompt = build_core() + build_tools()\n\n# 动态部分（每轮可变）\nreminder = f"Date: {today}\\nCWD: {cwd}\\nMode: {mode}"',
          key_point: {
            zh: '稳定说明和动态提醒分开——一个很少变，一个每轮都可能变',
            en: 'Separate stable instructions from dynamic reminders — one rarely changes, the other may change every turn',
            ja: '安定した説明と動的リマインダーは分離 — 前者はめったに変わらず後者は毎ターン変わりうる'
          }
        },
        {
          id: 'kc_s10_004',
          title: { zh: 'CLAUDE.md 分层叠加', en: 'CLAUDE.md Layered Stacking', ja: 'CLAUDE.mdの階層的積み重ね' },
          icon: '📚',
          content: {
            zh: 'CLAUDE.md 不是只有一个文件，它会分层：用户全局级、项目根目录级、当前子目录级。所有层全部拼进系统输入，不互相覆盖。规则来源可以分层叠加。',
            en: 'CLAUDE.md is layered: user global, project root, current subdirectory. All layers concatenate into system input — they don\'t override each other. Instructions stack.',
            ja: 'CLAUDE.mdは階層化：ユーザーグローバル、プロジェクトルート、サブディレクトリ。全階層がシステム入力に結合され上書きしない。指示は積み重なる。'
          },
          code_example: 'layers = [\n    load("~/.claude/CLAUDE.md"),        # 全局\n    load("/project/CLAUDE.md"),          # 项目\n    load("/project/frontend/CLAUDE.md"), # 子目录\n]\nclaude_md = "\\n".join(layers)',
          key_point: {
            zh: 'CLAUDE.md 分层叠加：全局 → 项目 → 子目录，全部拼进去不互相覆盖',
            en: 'CLAUDE.md layers stack: global → project → subdirectory, all concatenated, never overridden',
            ja: 'CLAUDE.mdは階層的積み重ね：グローバル→プロジェクト→サブディレクトリ、結合し上書きしない'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s11',
      cards: [
        {
          id: 'kc_s11_001',
          title: { zh: '三类错误三条恢复路径', en: 'Three Error Types, Three Recovery Paths', ja: '3種類のエラーと3つの復旧パス' },
          icon: '🔧',
          content: {
            zh: '只需区分三类：输出被截断（token 用完），上下文太长（装不进窗口），临时连接失败（网络抖动）。对应续写、压缩重试、退避等待三条路径。先分类再选动作。',
            en: 'Three error types: output truncated (tokens exhausted), context too long (window overflow), transient failure (network hiccup). Three paths: continue, compact, backoff. Classify first.',
            ja: '3種類のエラー：出力切り詰め（トークン枯渇）、コンテキスト超過、一時的接続障害。3つの復旧パス：続行、圧縮、バックオフ。まず分類してからアクション選択。'
          },
          code_example: 'def choose_recovery(stop_reason, error):\n    if stop_reason == "max_tokens":\n        return "continue"\n    if "prompt" in error and "long" in error:\n        return "compact"\n    if "timeout" in error or "rate" in error:\n        return "backoff"\n    return "fail"',
          key_point: {
            zh: '错误先分类，恢复再执行——不要把所有错误当一种处理',
            en: 'Classify errors first, then recover — don\'t treat all errors the same',
            ja: 'まずエラーを分類し、それから復旧 — すべてのエラーを同じに扱わない'
          }
        },
        {
          id: 'kc_s11_002',
          title: { zh: '续写提示的关键', en: 'Key to Continuation Prompts', ja: '続行プロンプトのポイント' },
          icon: '✍️',
          content: {
            zh: '输出被截断时不能只说"继续"。必须明确告诉模型：不要重新总结、不要重来、直接从中断点接着写。否则模型大概率重复已输出的内容。',
            en: 'When output is truncated, don\'t just say "continue." Explicitly tell the model: don\'t re-summarize, don\'t restart, pick up from where you stopped. Otherwise it repeats content.',
            ja: '出力切り詰め時に単に「続けて」では不十分。モデルに明示：再要約しない、やり直さない、中断点から直接続ける。そうしないと既出内容を繰り返す。'
          },
          code_example: 'CONTINUE_MSG = (\n    "Output limit hit. "\n    "Continue directly from where you stopped. "\n    "Do not restart or repeat."\n)\nmessages.append({"role": "user", "content": CONTINUE_MSG})',
          key_point: {
            zh: '续写提示必须说"不要重复、不要重来、直接接着写"',
            en: 'The continuation prompt must say "don\'t repeat, don\'t restart, continue directly"',
            ja: '続行プロンプトは「繰り返さない、やり直さない、直接続ける」と明示すべき'
          }
        },
        {
          id: 'kc_s11_003',
          title: { zh: '上下文压缩恢复', en: 'Context Compaction Recovery', ja: 'コンテキスト圧縮による復旧' },
          icon: '📦',
          content: {
            zh: '上下文太长时不是删历史，而是把旧对话变成仍能继续工作的摘要。摘要要保留：当前任务、已做的事、关键决定、下一步。压缩后告诉模型"这是前文摘要"。',
            en: 'Don\'t delete history — compress old conversations into a workable summary preserving: current task, progress, key decisions, next steps. Tell the model it\'s a summary.',
            ja: '履歴削除ではなく作業継続可能な要約に圧縮。現タスク、進捗、重要判断、次ステップを保持。圧縮後モデルに「前文の要約」と伝える。'
          },
          code_example: 'def auto_compact(messages):\n    summary = summarize(messages)\n    return [{\n        "role": "user",\n        "content": "Session compacted. Continue:\\n" + summary,\n    }]',
          key_point: {
            zh: '压缩不是删历史，而是把旧对话变成仍然能继续工作的摘要',
            en: 'Compaction turns old conversations into a workable summary, not deletion',
            ja: '圧縮は履歴の削除ではなく、作業を継続できる要約への変換'
          }
        },
        {
          id: 'kc_s11_004',
          title: { zh: '退避重试与预算', en: 'Backoff Retry and Budget', ja: 'バックオフリトライと予算' },
          icon: '⏱️',
          content: {
            zh: '超时或限流时别立刻重打，退避一会儿再试。但必须有重试预算（续写最多 3 次、退避最多 3 次）。没有预算程序可能无限循环。每条路径各算各的次数。',
            en: 'On timeout or rate limit, back off then retry. But set a budget — max 3 continuations, max 3 backoffs. Without a budget, the loop may run forever. Each path counts separately.',
            ja: 'タイムアウトやレート制限時は少し待ってリトライ。ただしリトライ予算必須（続行最大3回、バックオフ最大3回）。予算なしでは無限ループの可能性。各パスは別カウント。'
          },
          code_example: 'recovery = {\n    "continuation_attempts": 0,  # max 3\n    "compact_attempts": 0,       # max 3\n    "transport_attempts": 0,     # max 3\n}\ndef backoff_delay(attempt):\n    return min(1.0 * (2 ** attempt), 30.0)',
          key_point: {
            zh: '每条恢复路径都要有预算——没有预算，主循环可能永远卡在"继续"',
            en: 'Every recovery path needs a budget — without one the loop might retry forever',
            ja: '各復旧パスに予算が必要 — なければループが永遠にリトライし続ける可能性'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s12',
      cards: [
        {
          id: 'kc_s12_001',
          title: { zh: '从 Todo 到 Task', en: 'From Todo to Task', ja: 'TodoからTaskへ' },
          icon: '📋',
          content: {
            zh: 'Todo 是当前会话的临时清单，Task 是可持久化的工作图。Task 多了两个关键能力：依赖关系（谁先谁后）和持久化（关掉再开还在）。跨轮次、多人协作时必须用 Task。',
            en: 'Todo is a session-scoped checklist; Task is a persistent work graph. Tasks add two key capabilities: dependencies (ordering) and persistence (survive restarts). Use tasks for cross-turn and multi-agent work.',
            ja: 'Todoはセッション内の一時リスト、Taskは永続化可能な作業グラフ。Taskには2つの重要な能力：依存関係（順序付け）と永続化（再起動後も存続）。ターン横断・複数エージェント協作にはTaskが必須。'
          },
          code_example: '# Todo: 当前会话的临时步骤\ntodo = ["读文件", "改代码", "跑测试"]\n\n# Task: 持久化 + 依赖关系\ntask = {\n    "id": 1, "subject": "Write parser",\n    "status": "pending",\n    "blockedBy": [], "blocks": [2, 3],\n}',
          key_point: {
            zh: 'Todo 更像本轮计划，Task 更像长期工作板——区别在依赖和持久化',
            en: 'Todo is a session plan; Task is a persistent board — the difference is dependencies and persistence',
            ja: 'Todoはセッション計画、Taskは永続ボード — 違いは依存関係と永続化'
          }
        },
        {
          id: 'kc_s12_002',
          title: { zh: 'TaskRecord 核心结构', en: 'TaskRecord Core Structure', ja: 'TaskRecordのコア構造' },
          icon: '🏗️',
          content: {
            zh: '每个任务至少需要：id（唯一标识）、subject（一句话描述）、status（走到哪了）、blockedBy（在等谁）、blocks（完成后解锁谁）、owner（谁在做）。这六个字段就够搭起最小任务系统。',
            en: 'Each task needs at minimum: id (unique key), subject (one-line description), status (current state), blockedBy (waiting on whom), blocks (who I unlock), owner (who\'s working). Six fields build a minimal task system.',
            ja: '各タスクに最低限必要：id（一意識別子）、subject（一行説明）、status（現在の状態）、blockedBy（誰を待つか）、blocks（誰を解放するか）、owner（誰が担当）。6フィールドで最小タスクシステムが構築可能。'
          },
          code_example: 'task = {\n    "id": 1,\n    "subject": "Write parser",\n    "status": "pending",\n    "blockedBy": [],\n    "blocks": [2, 3],\n    "owner": "",\n}',
          key_point: {
            zh: 'TaskRecord 六个字段：id / subject / status / blockedBy / blocks / owner',
            en: 'TaskRecord has six fields: id / subject / status / blockedBy / blocks / owner',
            ja: 'TaskRecordは6フィールド：id / subject / status / blockedBy / blocks / owner'
          }
        },
        {
          id: 'kc_s12_003',
          title: { zh: 'is_ready() 就绪判断', en: 'is_ready() Readiness Check', ja: 'is_ready() 準備判定' },
          icon: '✅',
          content: {
            zh: '任务系统的核心不是"保存清单"，而是"判断什么时候能开工"。一条任务 ready 的条件很简单：状态还是 pending，而且 blockedBy 列表为空。这就是最关键的一条判断规则。',
            en: 'The core of a task system is not saving a list but judging when work can start. A task is ready when: status is pending AND blockedBy is empty. This single rule is the most important piece.',
            ja: 'タスクシステムの核心は「リスト保存」ではなく「いつ開始できるか判断する」こと。タスクがready：statusがpendingかつblockedByが空。この1つのルールが最も重要。'
          },
          code_example: 'def is_ready(task):\n    return (\n        task["status"] == "pending"\n        and not task["blockedBy"]\n    )',
          key_point: {
            zh: '任务系统的核心不是"保存清单"，而是 is_ready() 判断"谁现在能开工"',
            en: 'The core is not saving lists but is_ready() — judging who can start now',
            ja: '核心は「リスト保存」ではなくis_ready() — 「今誰が開始できるか」の判断'
          }
        },
        {
          id: 'kc_s12_004',
          title: { zh: '完成自动解锁后续', en: 'Completion Auto-Unlocks Downstream', ja: '完了で後続を自動解放' },
          icon: '🔓',
          content: {
            zh: '当一个任务标记完成时，系统要自动把它从所有后续任务的 blockedBy 列表中移除。这样被阻塞的任务就可能变成 ready 状态。这说明任务系统不是静态记录表，而是会随完成事件自动推进的工作图。',
            en: 'When a task completes, the system must remove it from blockedBy lists of all downstream tasks. This may make blocked tasks become ready. The task system is not a static table but a work graph that auto-advances on completion events.',
            ja: 'タスク完了時、システムは全後続タスクのblockedByリストからそれを削除。これによりブロックされていたタスクがready状態になりうる。タスクシステムは静的な表ではなく、完了イベントで自動推進する作業グラフ。'
          },
          code_example: 'def complete(self, task_id):\n    task = self.load(task_id)\n    task["status"] = "completed"\n    self.save(task)\n    for other in self.all_tasks():\n        if task_id in other["blockedBy"]:\n            other["blockedBy"].remove(task_id)\n            self.save(other)',
          key_point: {
            zh: '任务系统不是静态记录表，而是会随完成事件自动推进的工作图',
            en: 'The task system auto-advances as a work graph, not a static table',
            ja: 'タスクシステムは静的な表ではなく、完了イベントで自動推進する作業グラフ'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s13',
      cards: [
        {
          id: 'kc_s13_001',
          title: { zh: '主循环只有一条', en: 'The Main Loop Stays Single', ja: 'メインループは1つのまま' },
          icon: '🔂',
          content: {
            zh: '后台任务不是"多了一条主循环"。主循环仍然只有一条，并行的是等待而不是循环本身。慢命令在另一条执行线上跑，主循环先去做别的事，结果稍后通过通知回来。',
            en: 'Background tasks don\'t add another main loop. The main loop stays single — what\'s parallel is the waiting, not the loop itself. Slow commands run on a separate thread; the main loop continues, and results come back via notifications.',
            ja: 'バックグラウンドタスクはメインループを増やすのではない。メインループは1つのまま — 並列なのはループではなく待機。遅いコマンドは別スレッドで実行、メインループは他の作業を続け、結果は通知で戻る。'
          },
          code_example: '# 主循环（只有一条）\ntask_id = bg.run("pytest")  # 立刻返回\n# ... 继续做别的事 ...\n\n# 下一轮前排空通知\nfor n in bg.drain_notifications():\n    messages.append(user_msg(n["preview"]))',
          key_point: {
            zh: '主循环只有一条，并行的是等待，不是主循环本身',
            en: 'The main loop stays single — what\'s parallel is the waiting, not the loop',
            ja: 'メインループは1つのまま — 並列なのはループではなく待機'
          }
        },
        {
          id: 'kc_s13_002',
          title: { zh: 'background_run 立即返回', en: 'background_run Returns Immediately', ja: 'background_runは即座に返す' },
          icon: '🚀',
          content: {
            zh: 'background_run 的关键设计是：调用后立即返回一个 task_id，不会阻塞主循环。真正的命令在后台线程里执行。模型拿到 task_id 后就可以继续推进其他工作。',
            en: 'The key design of background_run: it returns a task_id immediately without blocking the main loop. The actual command runs in a background thread. The model can continue other work with the task_id.',
            ja: 'background_runの重要な設計：呼び出し後即座にtask_idを返し、メインループをブロックしない。実際のコマンドはバックグラウンドスレッドで実行。モデルはtask_idを持って他の作業を続けられる。'
          },
          code_example: 'def run(self, command):\n    task_id = new_id()\n    self.tasks[task_id] = {"status": "running"}\n    thread = threading.Thread(\n        target=self._execute,\n        args=(task_id, command),\n    )\n    thread.start()\n    return task_id  # 立刻返回，不阻塞',
          key_point: {
            zh: 'background_run 立即返回 task_id，主循环不等待',
            en: 'background_run returns task_id immediately — the main loop never waits',
            ja: 'background_runは即座にtask_idを返す — メインループは待機しない'
          }
        },
        {
          id: 'kc_s13_003',
          title: { zh: '通知队列模式', en: 'Notification Queue Pattern', ja: '通知キューパターン' },
          icon: '📬',
          content: {
            zh: '后台任务完成后不直接把全文塞回上下文——几万行日志会撑爆窗口。更好的做法是：完整输出写磁盘，通知里只放简短摘要，模型真的需要全文时再调 read_file。通知负责提醒，文件负责存原文。',
            en: 'Don\'t inject full output into context when a task completes — thousands of log lines would overflow. Write full output to disk, put only a brief summary in the notification. The model reads the file when it needs details. Notifications remind; files store.',
            ja: 'タスク完了時に全出力をコンテキストに注入しない — 数万行のログはウィンドウを溢れさせる。完全な出力はディスクに書き、通知には短い要約のみ。モデルは詳細が必要な時にread_fileで読む。通知は提醒、ファイルは保存。'
          },
          code_example: 'notification = {\n    "task_id": "a1b2c3",\n    "status": "completed",\n    "preview": "tests passed (12/12)",\n}\n# 完整输出在 .runtime-tasks/a1b2c3.log',
          key_point: {
            zh: '通知只放摘要，完整输出写文件——别把长日志全塞进上下文',
            en: 'Notifications carry summaries only; full output goes to files',
            ja: '通知は要約のみ、完全な出力はファイルに — ログをコンテキストに詰め込まない'
          }
        },
        {
          id: 'kc_s13_004',
          title: { zh: '排空通知再调模型', en: 'Drain Notifications Before Model Call', ja: 'モデル呼び出し前に通知を排空' },
          icon: '🧹',
          content: {
            zh: '每次调模型之前，先把通知队列排空，把后台结果摘要注入 messages。这样模型在下一轮就会知道哪个任务完成了、是成功还是失败。这是主循环多出的一个标准前置步骤。',
            en: 'Before each model call, drain the notification queue and inject result summaries into messages. This way the model knows which tasks completed and whether they succeeded. It\'s a standard pre-step added to the main loop.',
            ja: 'モデル呼び出し前に通知キューを排空し、結果の要約をmessagesに注入。これによりモデルは次のターンでどのタスクが完了し成功/失敗かを把握。メインループに追加される標準的な前処理ステップ。'
          },
          code_example: 'def before_model_call(messages):\n    for n in bg.drain_notifications():\n        text = f"[bg:{n[\'task_id\']}] {n[\'status\']}"\n        text += f" - {n[\'preview\']}"\n        messages.append({"role": "user", "content": text})',
          key_point: {
            zh: '每次调模型前先排空通知队列，让模型知道后台发生了什么',
            en: 'Drain notifications before each model call so the model knows what happened',
            ja: 'モデル呼び出し前に通知を排空し、バックグラウンドの状況をモデルに伝える'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s14',
      cards: [
        {
          id: 'kc_s14_001',
          title: { zh: '调度 = 记住何时开始', en: 'Scheduling = Remembering When to Start', ja: 'スケジューリング = いつ開始するかを記憶' },
          icon: '🕐',
          content: {
            zh: '后台任务解决的是"已经启动的慢操作结果什么时候回来"，定时调度解决的是"一件事应该在未来什么时候开始"。调度器做的是"记住未来"，不是"取代主循环"。',
            en: 'Background tasks solve "when does the result come back"; cron scheduling solves "when should something start in the future." The scheduler remembers the future — it does not replace the main loop.',
            ja: 'バックグラウンドタスクは「結果がいつ戻るか」を解決、cronスケジューラは「将来いつ開始すべきか」を解決。スケジューラは「未来を記憶する」のであってメインループの代替ではない。'
          },
          code_example: '# 后台任务：已经在跑，等结果\ntask_id = bg.run("pytest")\n\n# 定时调度：未来某时再开始\nscheduler.create(\n    cron="0 9 * * 1",\n    prompt="Run weekly status report",\n)',
          key_point: {
            zh: '后台任务是在"等结果"，定时调度是在"等开始"',
            en: 'Background tasks wait for results; cron scheduling waits for start time',
            ja: 'バックグラウンドタスクは「結果待ち」、cronスケジューラは「開始待ち」'
          }
        },
        {
          id: 'kc_s14_002',
          title: { zh: 'Cron 表达式与记录', en: 'Cron Expression and Record', ja: 'Cron式とレコード' },
          icon: '📅',
          content: {
            zh: 'Cron 用 5 个字段表示时间规则：分 时 日 月 周。调度记录至少要有 id、cron 表达式、触发后要执行的 prompt、是否重复、上次触发时间。last_fired_at 防止短时间内重复触发。',
            en: 'Cron uses 5 fields: minute hour day month weekday. A schedule record needs: id, cron expression, prompt to inject, recurring flag, and last_fired_at to prevent duplicate triggers.',
            ja: 'Cronは5フィールド：分 時 日 月 曜日。スケジュールレコードに必要：id、cron式、注入するprompt、繰り返しフラグ、last_fired_at（重複トリガー防止）。'
          },
          code_example: 'schedule = {\n    "id": "job_001",\n    "cron": "0 9 * * 1",\n    "prompt": "Run weekly report",\n    "recurring": True,\n    "last_fired_at": None,\n}',
          key_point: {
            zh: 'Cron 五个字段表示时间规则，调度记录要有 last_fired_at 防重复触发',
            en: 'Cron uses five fields for timing; the record needs last_fired_at to prevent re-triggers',
            ja: 'Cronは5フィールドで時間を表現、レコードにはlast_fired_atで重複トリガーを防止'
          }
        },
        {
          id: 'kc_s14_003',
          title: { zh: '定时通知回主循环', en: 'Scheduled Prompts Return to Main Loop', ja: '定時通知はメインループに戻る' },
          icon: '🔁',
          content: {
            zh: '时间到了后，调度器不是直接在后台执行任务，而是把 prompt 放进通知队列。主循环下一轮把它当成新的用户消息喂给模型。定时任务最终还是由模型接手，不是另起一套系统。',
            en: 'When time is up, the scheduler doesn\'t execute directly — it puts the prompt into the notification queue. The main loop feeds it to the model as a new user message next turn. Scheduled tasks still go through the model, not a separate system.',
            ja: '時間になるとスケジューラは直接実行せず、promptを通知キューに入れる。メインループは次のターンで新しいユーザーメッセージとしてモデルに渡す。定時タスクもモデルが処理し、別システムではない。'
          },
          code_example: 'def check_jobs(self, now):\n    for job in self.jobs:\n        if cron_matches(job["cron"], now):\n            self.queue.put({\n                "type": "scheduled_prompt",\n                "prompt": job["prompt"],\n            })\n            job["last_fired_at"] = now',
          key_point: {
            zh: '定时触发后 prompt 进通知队列，最终还是回到同一条主循环',
            en: 'Scheduled prompts enter the notification queue and return to the same main loop',
            ja: '定時トリガー後promptは通知キューに入り、同じメインループに戻る'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s15',
      cards: [
        {
          id: 'kc_s15_001',
          title: { zh: 'Teammate vs Subagent', en: 'Teammate vs Subagent', ja: 'Teammate vs Subagent' },
          icon: '👥',
          content: {
            zh: 'Subagent 是一次性外包助手——干完就消失。Teammate 是长期在线队友——有名字、有邮箱、有独立循环，可以反复接活。根本区别在生命周期，不在名字。',
            en: 'A subagent is a one-shot helper — it finishes and disappears. A teammate is a persistent collaborator with a name, inbox, and independent loop, able to take work repeatedly. The key difference is lifecycle.',
            ja: 'サブエージェントは使い捨ての助手 — 完了後消える。チームメイトは名前、受信箱、独立ループを持つ永続的な協力者で繰り返し作業を受ける。根本的な違いはライフサイクル。'
          },
          code_example: '# Subagent: 一次性\nresult = spawn_subagent("探索 auth 模块")\n# 做完就消失\n\n# Teammate: 长期在线\nspawn_teammate("alice", role="coder")\nsend_message("alice", "请负责测试")\n# alice 持续接活',
          key_point: {
            zh: 'Subagent 干完就消失，Teammate 长期在线反复接活——区别在生命周期',
            en: 'Subagents vanish after one task; teammates persist and take work repeatedly',
            ja: 'サブエージェントは1回で消える、チームメイトは永続的に繰り返し作業を受ける'
          }
        },
        {
          id: 'kc_s15_002',
          title: { zh: '团队三要素', en: 'Three Team Essentials', ja: 'チーム3要素' },
          icon: '🏛️',
          content: {
            zh: '一个最小团队系统需要三样东西：名册（团队里有谁、什么角色）、邮箱（每人一个收件箱）、独立循环（每人有自己的 messages 和 agent loop）。三者缺一，团队就立不起来。',
            en: 'A minimal team system needs three things: a roster (who\'s on the team, what role), mailboxes (one inbox per member), and independent loops (each has their own messages and agent loop). Missing any one, the team can\'t function.',
            ja: '最小限のチームシステムに必要な3要素：名簿（メンバーと役割）、メールボックス（各メンバーの受信箱）、独立ループ（各自のmessagesとエージェントループ）。1つでも欠けるとチームは機能しない。'
          },
          code_example: '# 名册\nconfig = {"members": [\n    {"name": "alice", "role": "coder"},\n    {"name": "bob",   "role": "tester"},\n]}\n# 邮箱: .team/inbox/alice.jsonl\n# 独立循环: 每人自己的 messages + loop',
          key_point: {
            zh: '团队三要素：名册 + 邮箱 + 独立循环，缺一不可',
            en: 'Three essentials: roster + mailboxes + independent loops — all required',
            ja: 'チーム3要素：名簿 + メールボックス + 独立ループ — すべて必須'
          }
        },
        {
          id: 'kc_s15_003',
          title: { zh: 'TeamConfig 与消息信封', en: 'TeamConfig and Message Envelope', ja: 'TeamConfigとメッセージ封筒' },
          icon: '📨',
          content: {
            zh: 'TeamConfig 保存在 .team/config.json，记录团队名和成员列表。消息用 MessageEnvelope 包装：谁发的、发给谁、内容是什么、什么时候发的。信封让系统能追踪每条消息的来源和去向。',
            en: 'TeamConfig lives in .team/config.json, recording team name and member list. Messages are wrapped in a MessageEnvelope: from, to, content, timestamp. The envelope lets the system track message origins and destinations.',
            ja: 'TeamConfigは.team/config.jsonに保存、チーム名とメンバーリストを記録。メッセージはMessageEnvelopeで包装：from、to、content、timestamp。封筒によりシステムがメッセージの送信元と宛先を追跡可能。'
          },
          code_example: 'config = {\n    "team_name": "default",\n    "members": [{"name": "alice", "role": "coder"}],\n}\nmessage = {\n    "type": "message",\n    "from": "lead", "content": "Review auth",\n    "timestamp": 1710000000.0,\n}',
          key_point: {
            zh: 'TeamConfig 记录名册，MessageEnvelope 包装每条消息的来源和去向',
            en: 'TeamConfig records the roster; MessageEnvelope wraps each message\'s origin and destination',
            ja: 'TeamConfigは名簿を記録、MessageEnvelopeは各メッセージの送信元と宛先を包装'
          }
        },
        {
          id: 'kc_s15_004',
          title: { zh: '邮箱驱动工作分配', en: 'Inbox-Driven Work Assignment', ja: '受信箱駆動の作業割り当て' },
          icon: '📥',
          content: {
            zh: '队友不是靠"被重新创建"来获得新任务，而是靠"下一轮先检查邮箱"来接收新工作。每轮开始前先 drain inbox，把新消息追加到自己的 messages 里，然后继续工作。',
            en: 'Teammates don\'t get new tasks by being recreated — they check their inbox at the start of each turn. Drain the inbox, append new messages to their own messages list, then continue working.',
            ja: 'チームメイトは再作成で新タスクを得るのではなく、各ターン開始時に受信箱をチェック。受信箱を排空し、新メッセージを自分のmessagesに追加してから作業を続ける。'
          },
          code_example: 'def teammate_loop(name, role, prompt):\n    messages = [{"role": "user", "content": prompt}]\n    while True:\n        inbox = bus.read_inbox(name)\n        for item in inbox:\n            messages.append(user_msg(item))\n        response = call_model(messages)\n        # ... 处理工具调用 ...',
          key_point: {
            zh: '队友靠检查邮箱接收新工作，不是靠重新创建',
            en: 'Teammates receive work by checking their inbox, not by being recreated',
            ja: 'チームメイトは受信箱チェックで新しい作業を受け取る、再作成ではなく'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s16',
      cards: [
        {
          id: 'kc_s16_001',
          title: { zh: '结构化协议设计', en: 'Structured Protocol Design', ja: '構造化プロトコル設計' },
          icon: '🤝',
          content: {
            zh: '自由文本消息解决不了"这件事到底批没批准"的问题。结构化协议用 request_id 给每个请求编号，用状态机追踪 pending→approved/rejected。这样多个请求同时存在也不会乱。',
            en: 'Free text messages can\'t answer "was this approved or not." Structured protocols assign a request_id to each request and track it through a state machine: pending → approved/rejected. Multiple concurrent requests stay organized.',
            ja: '自由テキストでは「承認されたかどうか」に答えられない。構造化プロトコルは各リクエストにrequest_idを付与し、状態マシンでpending→approved/rejectedを追跡。複数の同時リクエストも整理される。'
          },
          code_example: 'request = {\n    "request_id": "req_001",\n    "kind": "shutdown",\n    "from": "lead", "to": "alice",\n    "status": "pending",\n}\n# pending -> approved | rejected | expired',
          key_point: {
            zh: '结构化协议 = request_id + 状态机，让"批没批准"有明确追踪',
            en: 'Structured protocol = request_id + state machine for explicit approval tracking',
            ja: '構造化プロトコル = request_id + 状態マシンで承認を明示的に追跡'
          }
        },
        {
          id: 'kc_s16_002',
          title: { zh: '优雅关机协议', en: 'Graceful Shutdown Protocol', ja: 'グレースフルシャットダウンプロトコル' },
          icon: '🛑',
          content: {
            zh: '优雅关机不是直接杀线程，而是走请求-响应流程：lead 发 shutdown_request，队友明确回复同意或拒绝。同意后先收尾再退出。这背后是通用的 request-response 模板。',
            en: 'Graceful shutdown is not killing a thread — it\'s a request-response flow: lead sends shutdown_request, teammate explicitly approves or rejects. On approval, finish up then exit. This uses a universal request-response template.',
            ja: 'グレースフルシャットダウンはスレッド強制終了ではなく、リクエスト-レスポンスフロー：leadがshutdown_requestを送り、チームメイトが明示的に承認/拒否。承認後、後処理してから終了。汎用的なrequest-responseテンプレート。'
          },
          code_example: 'def request_shutdown(target):\n    req_id = new_id()\n    requests[req_id] = {"kind": "shutdown", "status": "pending"}\n    bus.send("lead", target,\n        msg_type="shutdown_request",\n        extra={"request_id": req_id})',
          key_point: {
            zh: '优雅关机 = 请求 → 明确回复 → 收尾退出，不是直接杀进程',
            en: 'Graceful shutdown = request → explicit reply → clean exit, not killing the process',
            ja: 'グレースフルシャットダウン = リクエスト → 明示的回答 → 後処理退出、プロセス強制終了ではない'
          }
        },
        {
          id: 'kc_s16_003',
          title: { zh: '计划审批协议', en: 'Plan Approval Protocol', ja: '計画審批プロトコル' },
          icon: '📝',
          content: {
            zh: '计划审批和关机协议底层模板完全一样：一方发 request，另一方明确回复 approve/reject，双方用同一个 request_id 对上号。学会一个模板就能复用到所有需要审批的场景。',
            en: 'Plan approval uses the exact same template as shutdown: one side sends a request, the other replies approve/reject, both match on request_id. Learn one template and reuse it for all approval scenarios.',
            ja: '計画審批はシャットダウンと全く同じテンプレート：一方がリクエストを送り、他方がapprove/rejectで回答、双方がrequest_idで照合。1つのテンプレートを学べば全承認シナリオで再利用可能。'
          },
          code_example: 'def submit_plan(name, plan_text):\n    req_id = new_id()\n    requests[req_id] = {"kind": "plan_approval", "status": "pending"}\n    bus.send(name, "lead",\n        msg_type="plan_approval",\n        extra={"request_id": req_id, "plan": plan_text})',
          key_point: {
            zh: '关机和审批用同一个 request-response 模板，学会一个就能复用',
            en: 'Shutdown and approval share one request-response template — learn once, reuse everywhere',
            ja: 'シャットダウンと審批は同じrequest-responseテンプレート — 一度学べばどこでも再利用'
          }
        },
        {
          id: 'kc_s16_004',
          title: { zh: '普通消息 vs 协议消息', en: 'Plain vs Protocol Messages', ja: '普通メッセージ vs プロトコルメッセージ' },
          icon: '💬',
          content: {
            zh: '邮箱里现在有两类消息：普通消息适合讨论和提醒，协议消息适合审批、关机、交接。协议消息至少要带 type、request_id、from、to、payload。普通消息解决"说了什么"，协议消息解决"这件事走到哪一步"。',
            en: 'The inbox now has two message types: plain messages for discussion and reminders, protocol messages for approvals, shutdowns, and handoffs. Protocol messages need type, request_id, from, to, payload. Plain = "what was said"; protocol = "where is this workflow."',
            ja: '受信箱に2種類：普通メッセージは議論やリマインダー、プロトコルメッセージは承認・シャットダウン・引継ぎ用。プロトコルにはtype、request_id、from、to、payloadが必要。普通=「何を言ったか」、プロトコル=「このフローはどの段階か」。'
          },
          code_example: '# 普通消息\n{"type": "message", "content": "请帮忙看看"}\n\n# 协议消息\n{"type": "shutdown_request",\n "request_id": "req_001",\n "from": "lead", "to": "alice",\n "payload": {}}',
          key_point: {
            zh: '普通消息解决"说了什么"，协议消息解决"这件事走到哪一步了"',
            en: 'Plain messages say what; protocol messages track where a workflow stands',
            ja: '普通メッセージは「何を言ったか」、プロトコルメッセージは「フローのどの段階か」'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s17',
      cards: [
        {
          id: 'kc_s17_001',
          title: { zh: 'WORK↔IDLE 双阶段循环', en: 'WORK↔IDLE Two-Phase Loop', ja: 'WORK↔IDLE 2段階ループ' },
          icon: '🔄',
          content: {
            zh: '自治队友在两个阶段间切换：WORK 阶段正常工作，IDLE 阶段检查有没有新活。空闲不是关机——是"手头没活但随时准备接新活"。长时间无事可做才真正退出。',
            en: 'Autonomous teammates alternate between two phases: WORK for normal execution, IDLE for checking new work. Idle is not shutdown — it means "nothing in hand but ready anytime." Only a prolonged idle leads to actual exit.',
            ja: '自律チームメイトは2段階を切り替え：WORK段階で通常作業、IDLE段階で新しい作業をチェック。アイドルはシャットダウンではなく「手持ちなしだがいつでも準備完了」。長時間何もなければ実際に終了。'
          },
          code_example: 'while True:\n    run_work_phase(messages)\n    should_resume = run_idle_phase(name, messages)\n    if not should_resume:\n        break  # 长时间无事，退出',
          key_point: {
            zh: '自治不是让 agent 乱跑，而是让它在 WORK 和 IDLE 间有序切换',
            en: 'Autonomy is not running wild but orderly switching between WORK and IDLE',
            ja: '自律は暴走ではなくWORKとIDLEの間で秩序ある切り替え'
          }
        },
        {
          id: 'kc_s17_002',
          title: { zh: '空闲时先邮箱再任务板', en: 'Inbox First, Task Board Second', ja: '受信箱優先、タスクボード次' },
          icon: '📋',
          content: {
            zh: 'IDLE 阶段的检查顺序很重要：先看邮箱（有人明确找我就优先处理），再扫任务板（没人找就自己找可做的任务）。邮箱优先保证了明确指令不被抢任务逻辑覆盖。',
            en: 'Check order during IDLE matters: inbox first (if someone explicitly sent work, handle it), then scan the task board (if no messages, look for claimable tasks). Inbox-first ensures explicit instructions aren\'t overridden by auto-claim logic.',
            ja: 'IDLE段階のチェック順序が重要：まず受信箱（明示的な指示を優先処理）、次にタスクボード（メッセージなければ認領可能なタスクを探す）。受信箱優先で明示的指示が自動認領ロジックに上書きされない。'
          },
          code_example: 'def idle_phase(name, role, messages):\n    inbox = bus.read_inbox(name)\n    if inbox:          # 先看邮箱\n        messages.extend(inbox)\n        return True\n    unclaimed = scan_unclaimed_tasks(role)\n    if unclaimed:      # 再看任务板\n        claim_task(unclaimed[0], name)\n        return True\n    return False       # 什么都没有',
          key_point: {
            zh: '先看邮箱再看任务板——明确指令优先于自动认领',
            en: 'Check inbox first, then task board — explicit instructions override auto-claim',
            ja: 'まず受信箱、次にタスクボード — 明示的指示が自動認領より優先'
          }
        },
        {
          id: 'kc_s17_003',
          title: { zh: '安全认领任务', en: 'Safe Task Claiming', ja: '安全なタスク認領' },
          icon: '🔒',
          content: {
            zh: '认领不是"空着就拿"。安全认领需要同时满足四个条件：任务是 pending、还没人认领、没有前置阻塞、当前队友角色匹配。而且认领动作必须加锁，防止两人同时抢同一条任务。',
            en: 'Claiming is not "grab whatever\'s free." Safe claiming requires four conditions: task is pending, no owner yet, no active blockers, and the teammate\'s role matches. The claim action must be locked to prevent two agents claiming the same task.',
            ja: '認領は「空いていれば取る」ではない。安全な認領には4条件：pendingである、オーナーなし、ブロッカーなし、チームメイトの役割が一致。認領アクションはロック必須で2エージェントの同時認領を防ぐ。'
          },
          code_example: 'def is_claimable(task, role):\n    return (\n        task["status"] == "pending"\n        and not task["owner"]\n        and not task["blockedBy"]\n        and role_matches(task, role)\n    )\nwith claim_lock:\n    if not task["owner"]:\n        task["owner"] = name',
          key_point: {
            zh: '安全认领 = pending + 无主 + 无阻塞 + 角色匹配 + 加锁',
            en: 'Safe claim = pending + no owner + no blockers + role match + lock',
            ja: '安全な認領 = pending + オーナーなし + ブロッカーなし + 役割一致 + ロック'
          }
        },
        {
          id: 'kc_s17_004',
          title: { zh: '身份重注入', en: 'Identity Re-injection', ja: 'アイデンティティ再注入' },
          icon: '🪪',
          content: {
            zh: '上下文压缩后队友可能忘记"我是谁、我的角色、我属于哪个团队"。如果身份信息变薄，后续行为就会漂移。解决方法是在恢复工作前把身份块重新注入 messages 开头。',
            en: 'After context compaction, a teammate may forget its name, role, and team. If identity context thins out, behavior drifts. The fix: re-inject an identity block at the start of messages before resuming work.',
            ja: 'コンテキスト圧縮後、チームメイトは自分の名前、役割、所属チームを忘れる可能性がある。アイデンティティが薄まると行動がずれる。対策：作業再開前にmessages冒頭にアイデンティティブロックを再注入。'
          },
          code_example: 'def ensure_identity(messages, name, role, team):\n    identity = (\n        f"You are \'{name}\', role: {role}, "\n        f"team: {team}. Continue your work."\n    )\n    messages.insert(0, {"role": "user", "content": identity})',
          key_point: {
            zh: '压缩后队友可能忘记自己是谁——恢复前要重新注入身份块',
            en: 'After compaction teammates may forget who they are — re-inject identity before resuming',
            ja: '圧縮後チームメイトは自分を忘れうる — 再開前にアイデンティティを再注入'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s18',
      cards: [
        {
          id: 'kc_s18_001',
          title: { zh: 'Task 管做什么 Worktree 管在哪做', en: 'Task = What, Worktree = Where', ja: 'Task=何を、Worktree=どこで' },
          icon: '🗂️',
          content: {
            zh: '任务系统回答"做什么、谁在做、状态如何"，worktree 回答"在哪个独立目录里做"。两者通过 task_id 关联。如果所有人在同一目录改文件，很快会互相踩到。',
            en: 'The task system answers "what, who, status"; worktree answers "in which isolated directory." They connect via task_id. Without isolation, everyone editing the same directory will step on each other.',
            ja: 'タスクシステムは「何を、誰が、状態は」に回答、worktreeは「どの独立ディレクトリで」に回答。task_idで関連付け。隔離なしでは全員が同じディレクトリで編集し互いに干渉する。'
          },
          code_example: '# 任务板\ntask = {"id": 12, "subject": "Refactor auth",\n        "worktree": "auth-refactor"}\n\n# Worktree 注册表\nwt = {"name": "auth-refactor",\n      "path": ".worktrees/auth-refactor",\n      "task_id": 12, "status": "active"}',
          key_point: {
            zh: '任务记录"做什么"，worktree 记录"在哪做"——通过 task_id 关联',
            en: 'Tasks record "what"; worktrees record "where" — linked by task_id',
            ja: 'タスクは「何を」、worktreeは「どこで」を記録 — task_idで関連付け'
          }
        },
        {
          id: 'kc_s18_002',
          title: { zh: 'WorktreeRecord 与任务绑定', en: 'WorktreeRecord and Task Binding', ja: 'WorktreeRecordとタスクバインド' },
          icon: '🔗',
          content: {
            zh: '创建 worktree 时必须同时更新两边：worktree 注册表记录路径和分支，任务记录写入 worktree 名称。只更新一边的话，系统就无法从任务板一眼看出"这个任务在哪个目录里做"。',
            en: 'When creating a worktree, update both sides: the worktree registry records path and branch, the task record gets the worktree name. Updating only one side means the task board can\'t show where work is happening.',
            ja: 'worktree作成時は両方を更新：worktreeレジストリにパスとブランチを記録、タスクレコードにworktree名を書き込み。片方だけ更新ではタスクボードから作業場所が見えない。'
          },
          code_example: 'def bind_worktree(task_id, name):\n    task = tasks.load(task_id)\n    task["worktree"] = name\n    task["worktree_state"] = "active"\n    tasks.save(task)\n    # worktree 注册表也同步更新',
          key_point: {
            zh: '创建 worktree 时任务记录和注册表要双向更新，只改一边会脱节',
            en: 'Bind worktree to task on both sides — one-sided updates break the link',
            ja: 'worktreeとタスクは双方向更新 — 片方だけでは連携が切れる'
          }
        },
        {
          id: 'kc_s18_003',
          title: { zh: '隔离执行 cwd 切换', en: 'Isolation via cwd Switching', ja: 'cwd切り替えによる隔離実行' },
          icon: '📁',
          content: {
            zh: '隔离的核心就是一行代码：subprocess.run(command, cwd=worktree_path)。同一个命令在不同 cwd 里执行，影响范围就不一样。两个任务各自在自己的 worktree 目录里跑，互不干扰。',
            en: 'The core of isolation is one line: subprocess.run(command, cwd=worktree_path). The same command in different cwd affects different files. Two tasks each run in their own worktree directory without interference.',
            ja: '隔離の核心は1行：subprocess.run(command, cwd=worktree_path)。同じコマンドでもcwdが異なれば影響範囲が異なる。2つのタスクが各自のworktreeディレクトリで干渉なく実行。'
          },
          code_example: '# 任务 A 在自己的目录里跑\nsubprocess.run("pytest", cwd=".worktrees/auth-refactor")\n\n# 任务 B 在自己的目录里跑\nsubprocess.run("pytest", cwd=".worktrees/fix-billing")',
          key_point: {
            zh: '隔离的核心是 cwd 切换——同一命令在不同目录执行，互不干扰',
            en: 'Isolation is cwd switching — same command, different directory, no interference',
            ja: '隔離の核心はcwd切り替え — 同じコマンド、異なるディレクトリ、干渉なし'
          }
        },
        {
          id: 'kc_s18_004',
          title: { zh: 'Closeout: keep 或 remove', en: 'Closeout: keep or remove', ja: 'クローズアウト：keepかremove' },
          icon: '🧹',
          content: {
            zh: '任务完成时必须显式决定 worktree 怎么收尾：keep 保留目录（方便 review 或后续追查），remove 删除目录（释放资源）。删除前要检查有没有未提交的改动。不要让收尾是隐式的。',
            en: 'When a task finishes, explicitly decide worktree fate: keep (for review or follow-up) or remove (free resources). Check for uncommitted changes before removing. Never let closeout be implicit.',
            ja: 'タスク完了時にworktreeの処理を明示的に決定：keep（レビューや追跡用に保持）またはremove（リソース解放）。削除前に未コミットの変更を確認。クローズアウトを暗黙にしない。'
          },
          code_example: 'def closeout(name, action, reason=""):\n    if action == "remove":\n        if has_uncommitted(name):\n            raise Error("uncommitted changes")\n        remove_worktree(name)\n    elif action == "keep":\n        mark_kept(name, reason)',
          key_point: {
            zh: '收尾要显式决定 keep 或 remove，删除前必须检查未提交改动',
            en: 'Explicitly choose keep or remove at closeout; check for uncommitted changes before removing',
            ja: 'クローズアウトはkeepかremoveを明示的に選択、削除前に未コミット変更を確認'
          }
        }
      ]
    },
    {
      stage_id: 'stage_s19',
      cards: [
        {
          id: 'kc_s19_001',
          title: { zh: 'MCP 是外部工具统一协议', en: 'MCP: Unified External Tool Protocol', ja: 'MCP：外部ツール統一プロトコル' },
          icon: '🔌',
          content: {
            zh: '前面所有工具都写在你的 Python 代码里。MCP 让外部程序也能把工具接进 agent——启动外部服务，问它有什么工具，模型要用时转发请求，再把结果带回主循环。本质是把工具来源从本地硬编码变成外部可插拔。',
            en: 'Previously all tools were in your Python code. MCP lets external programs plug tools into the agent — start an external service, ask what tools it has, forward requests when the model calls them, bring results back. It makes tool sources pluggable instead of hardcoded.',
            ja: 'これまで全ツールはPythonコード内。MCPは外部プログラムもエージェントにツールを接続可能に — 外部サービスを起動、利用可能なツールを照会、モデルの呼び出しを転送、結果を返す。ツールソースをハードコードからプラガブルに。'
          },
          code_example: '# 本地工具：写在代码里\nhandler = TOOL_HANDLERS["read_file"]\n\n# MCP 工具：来自外部进程\nclient = MCPClient("npx @mcp/server-postgres")\ntools = client.list_tools()\nresult = client.call_tool("query", args)',
          key_point: {
            zh: 'MCP 把工具来源从"本地硬编码"升级成"外部可插拔"',
            en: 'MCP upgrades tool sources from hardcoded to externally pluggable',
            ja: 'MCPはツールソースを「ハードコード」から「外部プラガブル」にアップグレード'
          }
        },
        {
          id: 'kc_s19_002',
          title: { zh: '工具名前缀规则', en: 'Tool Name Prefix Convention', ja: 'ツール名プレフィックス規則' },
          icon: '🏷️',
          content: {
            zh: '为了区分本地工具和 MCP 工具，用前缀命名：mcp__server__tool。比如 mcp__postgres__query 一眼就知道是 MCP 工具、来自 postgres server、原始工具名是 query。避免命名冲突。',
            en: 'To distinguish local from MCP tools, use prefix naming: mcp__server__tool. For example mcp__postgres__query immediately tells you it\'s an MCP tool from the postgres server, original name query. Prevents naming conflicts.',
            ja: 'ローカルツールとMCPツールを区別するためプレフィックス命名：mcp__server__tool。例えばmcp__postgres__queryならMCPツールでpostgresサーバー由来、元の名前はquery。名前衝突を防止。'
          },
          code_example: '# 前缀命名规则\n"mcp__postgres__query"    # MCP + server + tool\n"mcp__browser__open_tab"  # MCP + server + tool\n\n# 路由时一看前缀就知道走哪条线\nif tool.startswith("mcp__"):\n    return mcp_router.call(tool, args)',
          key_point: {
            zh: 'mcp__server__tool 前缀命名让系统一眼区分本地工具和外部工具',
            en: 'mcp__server__tool prefix naming instantly distinguishes local from external tools',
            ja: 'mcp__server__toolプレフィックスでローカルツールと外部ツールを即座に区別'
          }
        },
        {
          id: 'kc_s19_003',
          title: { zh: 'Plugin manifest 发现服务器', en: 'Plugin Manifest for Server Discovery', ja: 'Pluginマニフェストによるサーバー発見' },
          icon: '🗺️',
          content: {
            zh: 'Plugin 解决的是"这些外部工具配置怎么被发现"。最小 plugin 就是一个 plugin.json，写明插件名、版本、它提供哪些 MCP server、每个 server 的启动命令。主程序读到 manifest 就知道怎么把 server 拉起来。',
            en: 'Plugins solve "how external tool configs are discovered." A minimal plugin is a plugin.json declaring name, version, MCP servers, and launch commands. The main program reads the manifest and knows how to start each server.',
            ja: 'Pluginは「外部ツール設定をどう発見するか」を解決。最小限のpluginはplugin.jsonで名前、バージョン、MCPサーバー、起動コマンドを宣言。メインプログラムはmanifestを読んで各サーバーの起動方法を把握。'
          },
          code_example: '# plugin.json\nmanifest = {\n    "name": "my-db-tools",\n    "version": "1.0.0",\n    "mcpServers": {\n        "postgres": {\n            "command": "npx",\n            "args": ["-y", "@mcp/server-postgres"],\n        }\n    }\n}',
          key_point: {
            zh: 'Plugin manifest 告诉主程序"有哪些外部 server 可以接入、怎么启动"',
            en: 'Plugin manifests tell the main program which external servers are available and how to start them',
            ja: 'Pluginマニフェストはメインプログラムに「利用可能な外部サーバーと起動方法」を伝える'
          }
        },
        {
          id: 'kc_s19_004',
          title: { zh: '统一权限管道路由', en: 'Unified Permission Pipeline Routing', ja: '統一権限パイプラインルーティング' },
          icon: '🛡️',
          content: {
            zh: 'MCP 工具虽然来自外部，但不能绕开权限系统。统一路由器只做一件事：如果是本地工具交给 handler，如果是 MCP 工具交给 client——但两者都先过同一条权限管道。结果也要标准化回统一格式。',
            en: 'MCP tools come from outside but must not bypass the permission system. The unified router does one thing: local tools go to handlers, MCP tools go to clients — but both pass through the same permission pipeline first. Results are normalized to a unified format.',
            ja: 'MCPツールは外部由来だが権限システムをバイパスしてはならない。統一ルーターの仕事：ローカルツールはハンドラーへ、MCPツールはクライアントへ — ただし両方とも同じ権限パイプラインを先に通す。結果も統一フォーマットに正規化。'
          },
          code_example: 'def handle_tool_call(name, input):\n    decision = check_permission(name, input)\n    if decision == "deny":\n        return "Permission denied"\n    if name.startswith("mcp__"):\n        return mcp_router.call(name, input)\n    return native_handler(name, input)',
          key_point: {
            zh: '本地工具和 MCP 工具走同一条权限管道——外部不能绕开安全',
            en: 'Local and MCP tools share the same permission pipeline — external tools can\'t bypass security',
            ja: 'ローカルツールとMCPツールは同じ権限パイプラインを通る — 外部ツールもセキュリティをバイパスできない'
          }
        }
      ]
    },

    // ===== bp01-bp07：CLAUDE.md / Commands / Skills / Hooks / Subagents / MCP / Settings =====
    {
      stage_id: 'stage_bp01',
      cards: [
        {
          id: 'kc_bp01_001',
          title: { zh: '最高性价比的质量提升手段', en: 'Highest-Leverage Quality Tool', ja: '最もコスパの良い品質向上手段' },
          icon: '📝',
          content: {
            zh: '一份结构良好的 CLAUDE.md 是提升 Claude Code 输出质量的最有效方式。把编码标准、项目约定、常见陷阱写进去，Claude 每次会话都能直接读到，不用你反复提醒。',
            en: 'A well-structured CLAUDE.md is the highest-leverage way to improve Claude Code output. Put coding standards, project conventions, and common pitfalls in it — Claude reads it every session without you repeating yourself.',
            ja: '構造化されたCLAUDE.mdはClaude Codeの出力品質を向上させる最もコスパの良い方法。コーディング標準、プロジェクト規約、よくある落とし穴を書けば、毎セッションでClaudeが自動的に読み取る。'
          },
          code_example: '# CLAUDE.md 示例结构\n# ## 编码标准\n# - 使用 TypeScript strict mode\n# - 测试覆盖率 > 80%\n# ## 项目约定\n# - API 路由在 src/routes/\n# - 数据库迁移用 Prisma',
          key_point: {
            zh: 'CLAUDE.md 是最高性价比的质量提升手段——写一次，每次会话自动生效',
            en: 'CLAUDE.md is the highest-leverage quality tool — write once, applied every session',
            ja: 'CLAUDE.mdは最もコスパの良い品質向上手段 — 一度書けば毎セッション自動適用'
          }
        },
        {
          id: 'kc_bp01_002',
          title: { zh: '两种加载机制', en: 'Two Loading Mechanisms', ja: '2つの読み込みメカニズム' },
          icon: '📂',
          content: {
            zh: 'Claude Code 用两种方式加载 CLAUDE.md：祖先加载——启动时沿目录树向上找，找到的全部立即加载；后代加载——子目录的 CLAUDE.md 只在你访问该子目录的文件时才懒加载。',
            en: 'Claude Code loads CLAUDE.md two ways: ancestor loading — walks up the directory tree at startup, loading everything found immediately; descendant loading — subdirectory CLAUDE.md files are lazy-loaded only when you access files in that subdirectory.',
            ja: 'Claude Codeは2つの方法でCLAUDE.mdを読み込み：祖先ロード — 起動時にディレクトリツリーを上方に辿り全て即座に読み込み；子孫ロード — サブディレクトリのCLAUDE.mdはそのサブディレクトリのファイルにアクセスした時のみ遅延読み込み。'
          },
          code_example: '# 祖先加载（启动时立即加载）\n# /project/CLAUDE.md        <- 立即加载\n# /project/../CLAUDE.md     <- 立即加载\n\n# 后代加载（访问时才加载）\n# /project/frontend/CLAUDE.md  <- 懒加载\n# /project/backend/CLAUDE.md   <- 懒加载',
          key_point: {
            zh: '祖先目录的 CLAUDE.md 启动时立即加载，子目录的只在访问时才懒加载',
            en: 'Ancestor CLAUDE.md loads at startup; descendant ones lazy-load only on access',
            ja: '祖先ディレクトリのCLAUDE.mdは起動時に即座に読み込み、子孫はアクセス時のみ遅延読み込み'
          }
        },
        {
          id: 'kc_bp01_003',
          title: { zh: 'Monorepo 分层指令', en: 'Monorepo Layered Instructions', ja: 'Monorepo 階層指示' },
          icon: '🗂️',
          content: {
            zh: '在 monorepo 中，把共享约定放根级 CLAUDE.md（编码标准、提交格式），组件专用指令放组件目录的 CLAUDE.md（框架模式、测试约定）。这样前端开发者不会被后端指令干扰，反之亦然。',
            en: 'In a monorepo, put shared conventions in root CLAUDE.md (coding standards, commit formats) and component-specific instructions in component CLAUDE.md files (framework patterns, test conventions). Frontend devs won\'t be distracted by backend rules and vice versa.',
            ja: 'Monorepoでは共有規約をルートCLAUDE.md（コーディング標準、コミット形式）に、コンポーネント固有の指示をコンポーネントのCLAUDE.md（フレームワークパターン、テスト規約）に配置。フロントエンド開発者はバックエンドのルールに邪魔されない。'
          },
          code_example: '# /monorepo/\n# ├── CLAUDE.md          <- 共享编码标准\n# ├── frontend/\n# │   └── CLAUDE.md    <- React 专用指令\n# ├── backend/\n# │   └── CLAUDE.md    <- Go 专用指令\n# └── api/\n#     └── CLAUDE.md    <- API 专用指令',
          key_point: {
            zh: '根级放共享约定，组件目录放专用指令——各自隔离互不干扰',
            en: 'Root for shared conventions, component dirs for specific rules — isolated, no interference',
            ja: 'ルートに共有規約、コンポーネントディレクトリに専用指示 — 隔離して干渉なし'
          }
        },
        {
          id: 'kc_bp01_004',
          title: { zh: 'CLAUDE.local.md 存个人偏好', en: 'CLAUDE.local.md for Personal Prefs', ja: 'CLAUDE.local.mdで個人設定' },
          icon: '🙍',
          content: {
            zh: 'CLAUDE.local.md 不会被 git 提交，用来存不该和团队共享的个人偏好：你喜欢的回复风格、你本地的路径配置、你个人的调试习惯。和团队共享的规则放 CLAUDE.md，个人的放 .local.md。',
            en: 'CLAUDE.local.md is git-ignored — use it for personal preferences that shouldn\'t be shared: your preferred response style, local path configs, personal debugging habits. Team rules go in CLAUDE.md; personal ones in .local.md.',
            ja: 'CLAUDE.local.mdはgit管理外 — チームと共有すべきでない個人設定に使用：好みの回答スタイル、ローカルパス設定、個人的なデバッグ習慣。チームルールはCLAUDE.mdに、個人設定は.local.mdに。'
          },
          code_example: '# CLAUDE.md（团队共享，提交到 git）\n# - 使用 conventional commits\n# - PR 必须有 reviewer\n\n# CLAUDE.local.md（个人偏好，不提交）\n# - 回复用中文\n# - 本地数据库端口 5433',
          key_point: {
            zh: '团队规则放 CLAUDE.md 提交到 git，个人偏好放 CLAUDE.local.md 不提交',
            en: 'Team rules in CLAUDE.md (committed); personal prefs in CLAUDE.local.md (git-ignored)',
            ja: 'チームルールはCLAUDE.md（コミット）、個人設定はCLAUDE.local.md（git管理外）'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp02',
      cards: [
        {
          id: 'kc_bp02_001',
          title: { zh: 'Command = frontmatter + 正文', en: 'Command = frontmatter + body', ja: 'Command = frontmatter + 本文' },
          icon: '📄',
          content: {
            zh: 'Claude Code 的自定义命令就是一个 Markdown 文件：顶部 YAML frontmatter 定义元数据（名称、描述、权限），正文就是命令的 prompt。用 /命令名 触发。放在 .claude/commands/ 目录下。',
            en: 'A custom Claude Code command is a Markdown file: YAML frontmatter at top defines metadata (name, description, permissions), body is the command prompt. Triggered via /command-name. Lives in .claude/commands/ directory.',
            ja: 'Claude Codeのカスタムコマンドはマークダウンファイル：上部のYAML frontmatterでメタデータ（名前、説明、権限）を定義、本文がコマンドのprompt。/コマンド名で起動。.claude/commands/ディレクトリに配置。'
          },
          code_example: '# .claude/commands/review.md\n# ---\n# name: review\n# description: Review current changes\n# allowed-tools: Bash, Read\n# ---\n# Review the git diff and suggest improvements.',
          key_point: {
            zh: 'Command = Markdown 文件，frontmatter 定义元数据，正文就是 prompt',
            en: 'Command = Markdown file; frontmatter for metadata, body is the prompt',
            ja: 'Command = マークダウンファイル、frontmatterでメタデータ、本文がprompt'
          }
        },
        {
          id: 'kc_bp02_002',
          title: { zh: '13 个关键 frontmatter 字段', en: '13 Key frontmatter Fields', ja: '13の重要frontmatterフィールド' },
          icon: '🔧',
          content: {
            zh: '最常用的字段：name（命令名）、description（描述，用于自动补全）、allowed-tools（无需确认就能用的工具）、model（指定用哪个模型）、context: fork（在隔离子 agent 中运行）。其他字段按需使用。',
            en: 'Key fields: name (command name), description (for autocomplete), allowed-tools (tools usable without prompts), model (which model to use), context: fork (run in isolated subagent). Use other fields as needed.',
            ja: '主要フィールド：name（コマンド名）、description（自動補完用）、allowed-tools（確認なしで使えるツール）、model（使用モデル指定）、context: fork（隔離サブエージェントで実行）。その他は必要に応じて使用。'
          },
          code_example: '# 关键 frontmatter 字段\n# name: "review"            命令名\n# description: "..."        自动补全描述\n# allowed-tools: "Bash,Read" 免确认工具\n# model: "sonnet"           指定模型\n# context: "fork"           隔离运行',
          key_point: {
            zh: '最常用：name、description、allowed-tools、model、context',
            en: 'Most used: name, description, allowed-tools, model, context',
            ja: '最もよく使う：name、description、allowed-tools、model、context'
          }
        },
        {
          id: 'kc_bp02_003',
          title: { zh: '69 个内置命令分 8 类', en: '69 Built-in Commands in 8 Categories', ja: '69の組み込みコマンドが8カテゴリ' },
          icon: '📚',
          content: {
            zh: 'Claude Code 内置 69 个命令，分为 8 大类：Auth（登录登出）、Config（主题/模型/权限设置）、Context（token 使用量/上下文可视化）、Debug（诊断/反馈）、Edit（文件操作）、File（项目管理）、Git（版本控制）、Workflow（任务/代理编排）。',
            en: 'Claude Code has 69 built-in commands in 8 categories: Auth (login/logout), Config (theme/model/permissions), Context (token usage/visualization), Debug (diagnostics/feedback), Edit (file ops), File (project management), Git (version control), Workflow (task/agent orchestration).',
            ja: 'Claude Codeには69の組み込みコマンドが8カテゴリ：Auth（ログイン/ログアウト）、Config（テーマ/モデル/権限）、Context（トークン使用量/可視化）、Debug（診断/フィードバック）、Edit（ファイル操作）、File（プロジェクト管理）、Git（バージョン管理）、Workflow（タスク/エージェント編成）。'
          },
          code_example: 'COMMAND_CATEGORIES = {\n    "Auth": 5,       # 登录/登出\n    "Config": 11,    # 主题/模型/权限\n    "Context": 7,    # token/上下文\n    "Debug": 4,      # 诊断/反馈\n    "Edit": 8,       # 文件操作\n    "File": 12,      # 项目管理\n    "Git": 10,       # 版本控制\n    "Workflow": 12,  # 任务/代理\n}',
          key_point: {
            zh: '69 个内置命令分 8 类，从登录到代理编排全覆盖',
            en: '69 built-in commands in 8 categories, from login to agent orchestration',
            ja: '69の組み込みコマンドが8カテゴリ、ログインからエージェント編成まで網羅'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp03',
      cards: [
        {
          id: 'kc_bp03_001',
          title: { zh: 'Skill vs Command', en: 'Skill vs Command', ja: 'Skill vs Command' },
          icon: '🧠',
          content: {
            zh: 'Skill 和 Command 结构很像（都是 Markdown + frontmatter），但 Skill 多了一个关键能力：可以被 Claude 自动发现和调用。Command 需要用户手动输入 /名字 触发，Skill 可以在 Claude 判断需要时自动激活。',
            en: 'Skills and Commands have similar structure (Markdown + frontmatter), but Skills have one key extra ability: auto-discovery. Commands need manual /name triggers; Skills can activate automatically when Claude judges they\'re needed.',
            ja: 'SkillとCommandは似た構造（Markdown + frontmatter）だが、Skillには重要な追加能力：自動発見。Commandはユーザーが手動で/名前で起動、SkillはClaudeが必要と判断した時に自動的にアクティブ化可能。'
          },
          code_example: '# Command: 用户手动触发\n# /review -> 执行 review.md\n\n# Skill: Claude 自动发现\n# description 字段决定何时触发\n# Claude 判断"需要调试" -> 自动加载 debug skill',
          key_point: {
            zh: 'Command 要手动触发，Skill 能被 Claude 自动发现和调用',
            en: 'Commands need manual triggers; Skills can be auto-discovered and invoked by Claude',
            ja: 'Commandは手動起動、SkillはClaudeが自動発見して呼び出せる'
          }
        },
        {
          id: 'kc_bp03_002',
          title: { zh: 'description 决定触发时机', en: 'description Determines Trigger Timing', ja: 'descriptionが起動タイミングを決定' },
          icon: '🎯',
          content: {
            zh: 'Skill 的 description 字段不只是给人看的说明——它是 Claude 判断"要不要自动加载这个 skill"的核心依据。description 写得越精准，Claude 在正确时机激活的概率越高。模糊的 description 会导致不该用时乱用。',
            en: 'A Skill\'s description is not just documentation — it\'s the primary signal Claude uses to decide "should I auto-load this skill." The more precise the description, the higher the chance of correct activation timing. Vague descriptions lead to unwanted activations.',
            ja: 'Skillのdescriptionは単なる説明ではなく、Claudeが「このskillを自動ロードすべきか」を判断する主要シグナル。descriptionが正確なほど正しいタイミングでの起動確率が上がる。曖昧なdescriptionは不要な起動を招く。'
          },
          code_example: '# 好的 description: 精准触发\n# description: "Use when debugging test failures\n#   or unexpected error messages"\n\n# 差的 description: 到处乱触发\n# description: "A helpful debugging tool"',
          key_point: {
            zh: 'description 是 Claude 判断何时激活 Skill 的核心——写得精准才能触发对',
            en: 'description is how Claude decides when to activate — precision determines correct triggering',
            ja: 'descriptionはClaudeがSkillをいつ起動するか判断する核心 — 精度が正しい起動を決める'
          }
        },
        {
          id: 'kc_bp03_003',
          title: { zh: '5 个官方捆绑技能', en: '5 Official Bundled Skills', ja: '5つの公式バンドルスキル' },
          icon: '🎁',
          content: {
            zh: 'Claude Code 自带 5 个官方 Skill：simplify（审查代码质量）、batch（批量处理文件）、debug（调试失败命令）、loop（定时重复执行）、claude-api（构建 Anthropic SDK 应用）。可以直接使用，也可以作为自定义 Skill 的参考模板。',
            en: 'Claude Code ships with 5 official Skills: simplify (review code quality), batch (process files in bulk), debug (debug failed commands), loop (repeat on interval), claude-api (build Anthropic SDK apps). Use directly or as templates for custom Skills.',
            ja: 'Claude Codeには5つの公式Skill：simplify（コード品質レビュー）、batch（ファイル一括処理）、debug（失敗コマンドのデバッグ）、loop（定期繰り返し実行）、claude-api（Anthropic SDKアプリ構築）。直接使用やカスタムSkillのテンプレートとして活用可能。'
          },
          code_example: 'OFFICIAL_SKILLS = [\n    "simplify",   # 审查代码质量和重复\n    "batch",      # 批量对多文件运行命令\n    "debug",      # 调试失败的命令\n    "loop",       # 按间隔重复运行\n    "claude-api", # 构建 Anthropic SDK 应用\n]',
          key_point: {
            zh: '5 个官方 Skill：simplify / batch / debug / loop / claude-api',
            en: '5 official Skills: simplify / batch / debug / loop / claude-api',
            ja: '5つの公式Skill：simplify / batch / debug / loop / claude-api'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp04',
      cards: [
        {
          id: 'kc_bp04_001',
          title: { zh: '四种 Hook 类型', en: 'Four Hook Types', ja: '4種類のHookタイプ' },
          icon: '🔌',
          content: {
            zh: 'Claude Code 支持四种 Hook 类型：command（执行 shell 命令）、prompt（让 LLM 处理）、agent（让子代理处理）、http（发 POST 请求到 URL）。根据需求选择——简单验证用 command，复杂判断用 prompt 或 agent。',
            en: 'Claude Code supports four hook types: command (run shell command), prompt (LLM-processed), agent (handled by subagent), http (POST to URL endpoint). Choose based on needs — command for simple validation, prompt/agent for complex judgment.',
            ja: 'Claude Codeは4種類のHookをサポート：command（シェルコマンド実行）、prompt（LLM処理）、agent（サブエージェント処理）、http（URLにPOSTリクエスト）。用途に応じて選択 — 簡単な検証はcommand、複雑な判断はprompt/agent。'
          },
          code_example: '# settings.json 中的 hook 配置\nhooks = {\n    "PreToolUse": [{\n        "matcher": "Bash",\n        "hooks": [\n            {"type": "command", "command": "./validate.sh"},\n            {"type": "prompt", "prompt": "Check safety"},\n        ]\n    }]\n}',
          key_point: {
            zh: '四种类型：command / prompt / agent / http——按需求复杂度选择',
            en: 'Four types: command / prompt / agent / http — choose by complexity',
            ja: '4種類：command / prompt / agent / http — 複雑さに応じて選択'
          }
        },
        {
          id: 'kc_bp04_002',
          title: { zh: '三种事件频率', en: 'Three Event Frequencies', ja: '3種類のイベント頻度' },
          icon: '⏱️',
          content: {
            zh: 'Hook 事件按触发频率分三级：每会话一次（SessionStart/SessionEnd），每轮一次（UserPromptSubmit/Stop），每次工具调用（PreToolUse/PostToolUse）。频率越高的 hook 越要注意性能开销。',
            en: 'Hook events come in three frequencies: per-session (SessionStart/SessionEnd), per-turn (UserPromptSubmit/Stop), per-tool-call (PreToolUse/PostToolUse). Higher frequency hooks need more attention to performance overhead.',
            ja: 'Hookイベントは3つの頻度：セッションごと（SessionStart/SessionEnd）、ターンごと（UserPromptSubmit/Stop）、ツール呼び出しごと（PreToolUse/PostToolUse）。高頻度のhookほどパフォーマンスへの注意が必要。'
          },
          code_example: 'EVENT_FREQUENCY = {\n    "per_session": ["SessionStart", "SessionEnd"],\n    "per_turn":    ["UserPromptSubmit", "Stop"],\n    "per_tool":    ["PreToolUse", "PostToolUse"],\n}',
          key_point: {
            zh: '三种频率：每会话 / 每轮 / 每次工具调用——频率越高越要注意性能',
            en: 'Three frequencies: per-session / per-turn / per-tool-call — higher frequency needs more performance care',
            ja: '3種の頻度：セッションごと / ターンごと / ツール呼び出しごと — 高頻度ほどパフォーマンスに注意'
          }
        },
        {
          id: 'kc_bp04_003',
          title: { zh: '退出码语义', en: 'Exit Code Semantics', ja: '終了コードのセマンティクス' },
          icon: '🔢',
          content: {
            zh: 'Hook 的退出码决定系统行为：0 表示成功（解析 stdout 的 JSON 输出），2 表示阻断性错误（stderr 内容反馈给 Claude），其他值表示非阻断性错误（记录通知后继续）。只有退出码 2 能阻止操作。',
            en: 'Hook exit codes determine system behavior: 0 = success (parse stdout JSON), 2 = blocking error (stderr fed to Claude), other = non-blocking error (log notification, continue). Only exit code 2 can block an operation.',
            ja: 'Hookの終了コードがシステム動作を決定：0は成功（stdoutのJSONを解析）、2はブロッキングエラー（stderrをClaudeにフィード）、その他は非ブロッキングエラー（通知を記録し続行）。操作をブロックできるのは終了コード2のみ。'
          },
          code_example: 'EXIT_CODES = {\n    0: "success - parse stdout JSON",\n    2: "blocking error - stderr to Claude",\n    # other: "non-blocking - log and continue",\n}\n# 只有 exit 2 能阻止当前操作',
          key_point: {
            zh: '退出码 0 成功、2 阻断、其他继续——只有 2 能真正阻止操作',
            en: 'Exit 0 = success, 2 = block, other = continue — only 2 actually blocks',
            ja: '終了コード0は成功、2はブロック、その他は続行 — 操作を阻止できるのは2のみ'
          }
        },
        {
          id: 'kc_bp04_004',
          title: { zh: 'Matcher 配置格式', en: 'Matcher Configuration Format', ja: 'Matcher設定フォーマット' },
          icon: '⚙️',
          content: {
            zh: 'Hook 通过 matcher 字段决定何时触发。matcher 匹配工具名（如 "Bash"、"Write|Edit"）。配置在 settings.json 的 hooks 字段下，来源可以是 User/Project/Local/Plugin 四个层级。',
            en: 'Hooks use the matcher field to decide when to trigger. Matchers match tool names (e.g., "Bash", "Write|Edit"). Configured under the hooks field in settings.json, with sources from four levels: User/Project/Local/Plugin.',
            ja: 'Hookはmatcherフィールドで発火タイミングを決定。matcherはツール名にマッチ（例："Bash"、"Write|Edit"）。settings.jsonのhooksフィールドで設定、ソースは4レベル：User/Project/Local/Plugin。'
          },
          code_example: '# settings.json\n{"hooks": {\n    "PostToolUse": [{\n        "matcher": "Write|Edit",\n        "hooks": [{\n            "type": "command",\n            "command": "./scripts/lint-on-save.sh"\n        }]\n    }]\n}}',
          key_point: {
            zh: 'matcher 匹配工具名决定何时触发，配置在 settings.json 中',
            en: 'Matchers match tool names to decide when to fire; configured in settings.json',
            ja: 'matcherはツール名にマッチして発火タイミングを決定、settings.jsonで設定'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp05',
      cards: [
        {
          id: 'kc_bp05_001',
          title: { zh: '子代理 = 专用 AI 代理', en: 'Subagent = Specialized AI Agent', ja: 'サブエージェント = 専用AIエージェント' },
          icon: '🤖',
          content: {
            zh: '子代理是主会话中生成的专用 AI 代理，每个可以有自己的工具集、模型、权限模式和生命周期 Hook。通过 .claude/agents/ 目录下的 Markdown 文件定义，YAML frontmatter 控制行为。',
            en: 'Subagents are specialized AI agents spawned within the main session. Each can have its own tools, model, permission mode, and lifecycle hooks. Defined via Markdown files in .claude/agents/ with YAML frontmatter controlling behavior.',
            ja: 'サブエージェントはメインセッション内で生成される専用AIエージェント。各自のツールセット、モデル、権限モード、ライフサイクルhookを持てる。.claude/agents/のマークダウンファイルで定義、YAML frontmatterで動作を制御。'
          },
          code_example: '# .claude/agents/reviewer.md\n# ---\n# name: reviewer\n# tools: Read, Bash\n# model: sonnet\n# permissionMode: plan\n# ---\n# Review code changes for quality issues.',
          key_point: {
            zh: '子代理 = 专用 AI 代理，有自己的工具集、模型和权限',
            en: 'Subagent = specialized AI agent with its own tools, model, and permissions',
            ja: 'サブエージェント = 専用AIエージェント、独自のツール・モデル・権限を持つ'
          }
        },
        {
          id: 'kc_bp05_002',
          title: { zh: '16 个 frontmatter 字段', en: '16 frontmatter Fields', ja: '16のfrontmatterフィールド' },
          icon: '📋',
          content: {
            zh: '最关键的几个：tools（允许哪些工具）、model（用哪个模型）、permissionMode（权限模式）、isolation: worktree（在独立工作树中运行）、maxTurns（最大轮数限制）、skills（预加载的技能）。',
            en: 'Key fields: tools (which tools allowed), model (which model), permissionMode (permission level), isolation: worktree (run in isolated worktree), maxTurns (max turn limit), skills (preloaded skills).',
            ja: '主要フィールド：tools（許可ツール）、model（使用モデル）、permissionMode（権限レベル）、isolation: worktree（隔離ワークツリーで実行）、maxTurns（最大ターン制限）、skills（プリロードスキル）。'
          },
          code_example: '# 关键 frontmatter\n# tools: "Read, Write, Edit, Bash"\n# model: "sonnet"\n# permissionMode: "acceptEdits"\n# isolation: "worktree"\n# maxTurns: 20\n# skills: ["debug", "simplify"]',
          key_point: {
            zh: '最关键：tools / model / permissionMode / isolation / maxTurns / skills',
            en: 'Most important: tools / model / permissionMode / isolation / maxTurns / skills',
            ja: '最重要：tools / model / permissionMode / isolation / maxTurns / skills'
          }
        },
        {
          id: 'kc_bp05_003',
          title: { zh: '5 个内置代理类型', en: '5 Built-in Agent Types', ja: '5つの組み込みエージェントタイプ' },
          icon: '🗂️',
          content: {
            zh: 'Claude Code 自带 5 个内置代理：general-purpose（通用，所有工具）、Explore（快速搜索，只读，用 haiku）、Plan（规划研究，只读）、statusline-setup（状态栏配置）、claude-code-guide（回答 Claude Code 问题）。',
            en: '5 built-in agents: general-purpose (all tools, full capabilities), Explore (fast search, read-only, haiku model), Plan (pre-planning research, read-only), statusline-setup (status bar config), claude-code-guide (answers Claude Code questions).',
            ja: '5つの組み込みエージェント：general-purpose（全ツール）、Explore（高速検索、読み取りのみ、haikuモデル）、Plan（計画研究、読み取りのみ）、statusline-setup（ステータスバー設定）、claude-code-guide（Claude Codeの質問回答）。'
          },
          code_example: 'BUILT_IN_AGENTS = {\n    "general-purpose": "all tools, inherit model",\n    "Explore":  "read-only, haiku, fast search",\n    "Plan":     "read-only, inherit, research",\n    "statusline-setup": "Read+Edit, sonnet",\n    "claude-code-guide": "read-only, haiku",\n}',
          key_point: {
            zh: '5 个内置代理各有分工——通用 / 搜索 / 规划 / 配置 / 问答',
            en: '5 built-in agents, each specialized — general / search / planning / config / Q&A',
            ja: '5つの組み込みエージェントは各自専門 — 汎用 / 検索 / 計画 / 設定 / Q&A'
          }
        },
        {
          id: 'kc_bp05_004',
          title: { zh: 'Command→Agent→Skill 编排', en: 'Command→Agent→Skill Orchestration', ja: 'Command→Agent→Skill編成' },
          icon: '🏗️',
          content: {
            zh: 'Claude Code 的三层扩展架构形成编排链：Command 定义入口（用户用 /名字 触发），Agent 定义执行者（有自己的工具和模型），Skill 定义知识（可以被预加载到 Agent 上下文中）。三层组合实现复杂工作流。',
            en: 'Claude Code\'s three-layer extension architecture forms an orchestration chain: Commands define entry points (/name triggers), Agents define executors (own tools and model), Skills define knowledge (preloadable into agent context). Three layers combine for complex workflows.',
            ja: 'Claude Codeの3層拡張アーキテクチャが編成チェーンを形成：Commandはエントリポイント（/名前でトリガー）、Agentは実行者（独自ツールとモデル）、Skillは知識（エージェントコンテキストにプリロード可能）。3層の組み合わせで複雑なワークフローを実現。'
          },
          code_example: '# 编排链\n# Command: /deploy\n#   -> Agent: deploy-agent (tools: Bash, Write)\n#       -> Skill: pre-deploy-checklist\n#       -> Skill: rollback-procedure\n# 三层组合 = 复杂工作流',
          key_point: {
            zh: 'Command 定义入口、Agent 定义执行者、Skill 定义知识——三层组合',
            en: 'Command = entry point, Agent = executor, Skill = knowledge — three layers combined',
            ja: 'Command = エントリポイント、Agent = 実行者、Skill = 知識 — 3層の組み合わせ'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp06',
      cards: [
        {
          id: 'kc_bp06_001',
          title: { zh: '推荐日常 MCP 服务器', en: 'Recommended Daily MCP Servers', ja: '推奨日常MCPサーバー' },
          icon: '🛠️',
          content: {
            zh: '日常最实用的 5 个 MCP 服务器：Context7（拉取最新库文档避免幻觉 API）、Playwright（浏览器自动化测试）、Claude in Chrome（连接真实 Chrome 调试）、DeepWiki（获取 GitHub 仓库文档）、Excalidraw（生成架构图）。',
            en: '5 most practical daily MCP servers: Context7 (pull latest library docs, avoid hallucinated APIs), Playwright (browser automation testing), Claude in Chrome (connect real Chrome for debugging), DeepWiki (GitHub repo documentation), Excalidraw (generate architecture diagrams).',
            ja: '日常最も実用的な5つのMCPサーバー：Context7（最新ライブラリドキュメント取得、API幻覚回避）、Playwright（ブラウザ自動化テスト）、Claude in Chrome（実際のChrome接続デバッグ）、DeepWiki（GitHubリポジトリドキュメント）、Excalidraw（アーキテクチャ図生成）。'
          },
          code_example: 'RECOMMENDED_MCP = [\n    "context7",         # 最新库文档\n    "playwright",       # 浏览器自动化\n    "claude-in-chrome", # Chrome 调试\n    "deepwiki",         # GitHub 仓库文档\n    "excalidraw",       # 架构图生成\n]\n# 研究 -> 调试 -> 文档化',
          key_point: {
            zh: '日常 5 个就够：Context7 / Playwright / Chrome / DeepWiki / Excalidraw',
            en: '5 daily servers: Context7 / Playwright / Chrome / DeepWiki / Excalidraw',
            ja: '日常は5つで十分：Context7 / Playwright / Chrome / DeepWiki / Excalidraw'
          }
        },
        {
          id: 'kc_bp06_002',
          title: { zh: '.mcp.json 配置', en: '.mcp.json Configuration', ja: '.mcp.json設定' },
          icon: '⚙️',
          content: {
            zh: 'MCP 服务器在 .mcp.json 中配置。两种传输方式：stdio（启动本地进程，如 npx 命令）和 http（连接远程 URL）。用环境变量引用密钥，避免在配置文件中硬编码 API Key。',
            en: 'MCP servers are configured in .mcp.json. Two transport types: stdio (spawn local process, e.g., npx commands) and http (connect to remote URL). Use environment variables for secrets to avoid hardcoding API keys in config.',
            ja: 'MCPサーバーは.mcp.jsonで設定。2つの転送方式：stdio（ローカルプロセス起動、npxコマンドなど）とhttp（リモートURL接続）。環境変数でシークレットを参照し、設定ファイルにAPIキーをハードコードしない。'
          },
          code_example: '# .mcp.json\n{"mcpServers": {\n    "context7": {\n        "command": "npx",\n        "args": ["-y", "@upstash/context7-mcp"]\n    },\n    "remote": {\n        "type": "http",\n        "url": "https://mcp.example.com/mcp"\n    }\n}}',
          key_point: {
            zh: '.mcp.json 配置服务器，stdio 接本地进程，http 接远程 URL',
            en: '.mcp.json configures servers — stdio for local processes, http for remote URLs',
            ja: '.mcp.jsonでサーバー設定 — stdioはローカルプロセス、httpはリモートURL'
          }
        },
        {
          id: 'kc_bp06_003',
          title: { zh: 'Settings MCP 审批控制', en: 'Settings MCP Approval Control', ja: 'Settings MCP承認制御' },
          icon: '🛡️',
          content: {
            zh: '在 settings.json 中可以精细控制 MCP 服务器的审批：enableAllProjectMcpServers 自动批准所有服务器，enabledMcpjsonServers 按名称白名单批准，disabledMcpjsonServers 按名称黑名单拒绝。受管设置还能强制全组织策略。',
            en: 'settings.json provides fine-grained MCP server approval: enableAllProjectMcpServers auto-approves all, enabledMcpjsonServers whitelists by name, disabledMcpjsonServers blacklists by name. Managed settings can enforce organization-wide policies.',
            ja: 'settings.jsonでMCPサーバーの承認を細かく制御：enableAllProjectMcpServersで全自動承認、enabledMcpjsonServersで名前指定ホワイトリスト、disabledMcpjsonServersで名前指定ブラックリスト。受管設定で組織全体のポリシーを強制可能。'
          },
          code_example: '# settings.json\n{"enableAllProjectMcpServers": False,\n "enabledMcpjsonServers": [\n     "context7", "playwright"\n ],\n "disabledMcpjsonServers": [\n     "untrusted-server"\n ]}',
          key_point: {
            zh: '白名单批准、黑名单拒绝、全量批准——三种粒度控制 MCP 服务器',
            en: 'Whitelist, blacklist, or approve-all — three granularity levels for MCP server control',
            ja: 'ホワイトリスト、ブラックリスト、全承認 — 3つの粒度でMCPサーバーを制御'
          }
        }
      ]
    },
    {
      stage_id: 'stage_bp07',
      cards: [
        {
          id: 'kc_bp07_001',
          title: { zh: '五层设置优先级', en: 'Five-Layer Settings Priority', ja: '5層設定優先度' },
          icon: '🏔️',
          content: {
            zh: '设置按优先级从高到低：受管设置（组织强制不可覆盖）→ 命令行参数（单次会话）→ .claude/settings.local.json（个人项目）→ .claude/settings.json（团队共享）→ ~/.claude/settings.json（全局默认）。deny 规则具有最高安全优先级。',
            en: 'Settings priority from high to low: managed settings (org-enforced, cannot override) → CLI args (single session) → .claude/settings.local.json (personal project) → .claude/settings.json (team shared) → ~/.claude/settings.json (global default). Deny rules have highest security priority.',
            ja: '設定優先度（高→低）：受管設定（組織強制、上書き不可）→ CLIパラメータ（単一セッション）→ .claude/settings.local.json（個人プロジェクト）→ .claude/settings.json（チーム共有）→ ~/.claude/settings.json（グローバルデフォルト）。denyルールは最高セキュリティ優先度。'
          },
          code_example: 'SETTINGS_PRIORITY = [\n    "managed",         # 组织强制，不可覆盖\n    "cli_args",        # 命令行参数\n    "settings.local",  # 个人项目设置\n    "settings.json",   # 团队共享设置\n    "~/.claude/",      # 全局默认\n]',
          key_point: {
            zh: '五层优先级：受管 → CLI → local → project → global，deny 不可覆盖',
            en: 'Five layers: managed → CLI → local → project → global; deny cannot be overridden',
            ja: '5層の優先度：受管 → CLI → local → project → global、denyは上書き不可'
          }
        },
        {
          id: 'kc_bp07_002',
          title: { zh: '六种权限模式', en: 'Six Permission Modes', ja: '6つの権限モード' },
          icon: '🔑',
          content: {
            zh: '六种权限模式满足不同场景：default（标准检查带提示）、acceptEdits（自动接受编辑）、dontAsk（未预批准则自动拒绝）、bypassPermissions（跳过所有检查，危险）、auto（AI 分类器替代手动提示）、plan（只读探索）。',
            en: 'Six permission modes for different scenarios: default (standard checks with prompts), acceptEdits (auto-accept edits), dontAsk (auto-reject unless pre-approved), bypassPermissions (skip all checks, dangerous), auto (AI classifier replaces prompts), plan (read-only exploration).',
            ja: '6つの権限モード：default（標準チェック＋プロンプト）、acceptEdits（編集自動承認）、dontAsk（事前承認なしは自動拒否）、bypassPermissions（全チェックスキップ、危険）、auto（AIクラシファイアでプロンプト代替）、plan（読み取り専用探索）。'
          },
          code_example: 'PERMISSION_MODES = {\n    "default":     "standard checks with prompts",\n    "acceptEdits": "auto-accept file edits",\n    "dontAsk":     "reject unless pre-approved",\n    "bypass":      "skip all checks (dangerous)",\n    "auto":        "AI classifier decides",\n    "plan":        "read-only exploration",\n}',
          key_point: {
            zh: '六种模式从最谨慎到最自由：plan → default → acceptEdits → auto → bypass',
            en: 'Six modes from cautious to liberal: plan → default → acceptEdits → auto → bypass',
            ja: '6モード、慎重から自由へ：plan → default → acceptEdits → auto → bypass'
          }
        },
        {
          id: 'kc_bp07_003',
          title: { zh: '工具权限语法', en: 'Tool Permission Syntax', ja: 'ツール権限構文' },
          icon: '📝',
          content: {
            zh: '权限规则用工具名加括号模式表示：Bash(npm run *) 允许 npm 命令，Read(.env) 拦截读取 .env，Edit(src/**) 允许编辑 src 下所有文件。求值顺序：先 deny，再 ask，最后 allow，第一个匹配的生效。',
            en: 'Permission rules use tool name plus pattern: Bash(npm run *) allows npm commands, Read(.env) blocks reading .env, Edit(src/**) allows editing under src. Evaluation order: deny first, then ask, then allow — first match wins.',
            ja: '権限ルールはツール名+パターン：Bash(npm run *)でnpmコマンド許可、Read(.env)で.envの読み取りブロック、Edit(src/**)でsrc以下の編集許可。評価順序：deny → ask → allow、最初のマッチが有効。'
          },
          code_example: 'permissions = {\n    "deny":  ["Read(.env)", "Bash(curl *)"],\n    "ask":   ["Bash(rm *)", "Bash(git push *)"],\n    "allow": ["Edit(*)", "Bash(npm run *)",\n              "Bash(git *)"],\n}\n# 求值顺序: deny -> ask -> allow',
          key_point: {
            zh: 'Bash(pattern) / Read(path) / Edit(path) 语法，deny→ask→allow 顺序求值',
            en: 'Bash(pattern) / Read(path) / Edit(path) syntax, evaluated deny → ask → allow',
            ja: 'Bash(pattern) / Read(path) / Edit(path)構文、deny → ask → allow の順で評価'
          }
        },
        {
          id: 'kc_bp07_004',
          title: { zh: 'CLI 启动标志', en: 'CLI Launch Flags', ja: 'CLI起動フラグ' },
          icon: '🚀',
          content: {
            zh: '常用启动标志：--model 指定模型，--permission-mode 设置权限模式，--agent 用自定义代理启动，--print 非交互式单次输出，--resume 恢复之前的会话。这些标志优先级高于 settings.json 但低于受管设置。',
            en: 'Common CLI flags: --model selects model, --permission-mode sets permissions, --agent starts with custom agent, --print for non-interactive single output, --resume to continue a previous session. Flags override settings.json but not managed settings.',
            ja: 'よく使うCLIフラグ：--modelでモデル指定、--permission-modeで権限設定、--agentでカスタムエージェント起動、--printで非対話式単一出力、--resumeで前セッション再開。フラグはsettings.jsonより優先するが受管設定には勝てない。'
          },
          code_example: '# 常用启动方式\n# claude --model opus\n# claude --permission-mode plan\n# claude --agent reviewer\n# claude --print "Explain this code"\n# claude --resume',
          key_point: {
            zh: '--model / --permission-mode / --agent / --print / --resume 五个最常用标志',
            en: 'Five most used flags: --model / --permission-mode / --agent / --print / --resume',
            ja: '最もよく使う5フラグ：--model / --permission-mode / --agent / --print / --resume'
          }
        }
      ]
    }
  ]
};
