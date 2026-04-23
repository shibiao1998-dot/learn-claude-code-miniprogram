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
