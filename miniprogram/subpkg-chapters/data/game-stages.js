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
          "difficulty": 1,
          "stem": {
            "zh": "模型本身能做什么？它不能做什么？",
            "en": "What can the model itself do, and what can it NOT do on its own?",
            "ja": "モデル自体にできることとできないことは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "模型能生成内容，但不能自己执行动作",
                "en": "The model can generate content but cannot execute actions on its own",
                "ja": "モデルはコンテンツを生成できるが、自分でアクションを実行できない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型能直接调用工具，但不能生成文本",
                "en": "The model can call tools directly but cannot generate text",
                "ja": "モデルは直接ツールを呼び出せるが、テキストを生成できない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型既能生成内容，也能自己把工具结果写回 messages",
                "en": "The model can both generate content and write tool results back to messages",
                "ja": "モデルはコンテンツを生成し、ツール結果を messages に書き戻すこともできる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型能管理 Turn 的四步，无需外部循环",
                "en": "The model can manage the four steps of a Turn without an external loop",
                "ja": "モデルは外部ループなしに Turn の 4 ステップを管理できる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "模型只负责生成内容，执行动作需要 Agent Loop 这层外部代码来驱动。没有 Loop，模型只是会说话，不会干活。",
            "en": "The model only generates content. Executing actions requires the Agent Loop as an outer code layer. Without the Loop, the model can talk but cannot act.",
            "ja": "モデルはコンテンツを生成するだけです。アクションの実行には外部コードレイヤーとしての Agent Loop が必要です。"
          },
          "reward_card": "card_s01_001"
        },
        {
          "id": "q_s01_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "Agent Loop 的核心作用是什么？",
            "en": "What is the core role of the Agent Loop?",
            "ja": "Agent Loop の核心的な役割は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "将模型输出路由到工具，把工具结果回写，逐轮推进任务",
                "en": "Route model output to tools, feed results back, and drive the task forward turn by turn",
                "ja": "モデル出力をツールにルーティングし、結果を戻し、ターンごとにタスクを前進させる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "存储用户和助手之间的聊天记录供展示",
                "en": "Store chat history between user and assistant for display",
                "ja": "ユーザーとアシスタント間のチャット履歴を表示用に保存する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "直接替代模型，在本地执行所有推理",
                "en": "Directly replace the model and execute all reasoning locally",
                "ja": "モデルを直接置き換え、すべての推論をローカルで実行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "把多轮对话合并成一条消息发给模型",
                "en": "Merge multiple turns into one message to send to the model",
                "ja": "複数のターンを 1 つのメッセージにまとめてモデルに送る"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Agent Loop 是包裹在模型外的代码层：模型输出→工具执行→结果写回→下一轮模型调用，如此循环推进任务。",
            "en": "The Agent Loop wraps the model: model output -> tool execution -> results written back -> next model call, cycling to push the task forward.",
            "ja": "Agent Loop はモデルを包むコードレイヤーです: モデル出力→ツール実行→結果書き戻し→次のモデル呼び出し。"
          },
          "reward_card": "card_s01_001"
        },
        {
          "id": "q_s01_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "Agent Loop 的核心伪代码中，当 stop_reason 不是 tool_use 时应该执行什么？",
            "en": "In the Agent Loop pseudocode, what should happen when stop_reason is not tool_use?",
            "ja": "Agent Loop の擬似コードで、stop_reason が tool_use でない場合何をすべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "continue（跳到下一轮）",
                "en": "continue (skip to next iteration)",
                "ja": "continue（次のイテレーションへスキップ）"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "break（退出循环）",
                "en": "break (exit the loop)",
                "ja": "break（ループを抜ける）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "messages.clear()（清空消息历史）",
                "en": "messages.clear() (clear message history)",
                "ja": "messages.clear()（メッセージ履歴をクリア）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "raise Exception（抛出异常）",
                "en": "raise Exception (throw an exception)",
                "ja": "raise Exception（例外を投げる）"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "当 stop_reason 不是 tool_use 时，模型已完成任务，应 break 退出循环。continue 会跳过工具执行继续循环，逻辑错误。",
            "en": "When stop_reason is not tool_use, the model has finished and the loop should break. Using continue would skip tool execution and loop incorrectly.",
            "ja": "stop_reason が tool_use でない場合、モデルはタスクを完了しており、ループを break すべきです。"
          },
          "reward_card": "card_s01_001"
        },
        {
          "id": "q_s01_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "Turn 是 Agent Loop 的最小执行单元，它包含哪四步？",
            "en": "A Turn is the smallest execution unit of the Agent Loop. What are its four steps?",
            "ja": "Turn は Agent Loop の最小実行単位です。4 つのステップは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "发消息→等待→显示结果→重置状态",
                "en": "send message -> wait -> display result -> reset state",
                "ja": "メッセージ送信→待機→結果表示→状態リセット"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "初始化模型→加载工具→调用 API→记录日志",
                "en": "initialize model -> load tools -> call API -> log output",
                "ja": "モデル初期化→ツール読み込み→API 呼び出し→ログ記録"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "发消息给模型→读回复→执行工具调用→把工具结果写回消息历史",
                "en": "send to model -> read reply -> execute tool calls -> write tool results back to message history",
                "ja": "モデルへ送信→返信読み取り→ツール呼び出し実行→ツール結果をメッセージ履歴に書き戻す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "压缩历史→发消息→解析工具调用→刷新 LoopState",
                "en": "compress history -> send message -> parse tool call -> refresh LoopState",
                "ja": "履歴圧縮→メッセージ送信→ツール呼び出し解析→LoopState 更新"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "每个 Turn 必须完整走完四步：发消息给模型、读回复、执行工具调用、把工具结果写回消息历史。四步全部完成才能进入下一轮。",
            "en": "Each Turn must complete all four steps: send to model, read reply, execute tool calls, write tool results back to message history. All four must finish before the next Turn.",
            "ja": "各 Turn はすべての 4 ステップを完了する必要があります。すべて終わってから次の Turn に進みます。"
          },
          "reward_card": "card_s01_002"
        },
        {
          "id": "q_s01_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "一个 Turn 的第四步「把工具结果写回消息历史」可以省略吗？",
            "en": "Can the fourth step of a Turn -- writing tool results back to message history -- be skipped?",
            "ja": "Turn の第 4 ステップ（ツール結果をメッセージ履歴に書き戻す）は省略できますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "不能省略，否则模型下一轮看不到执行结果，任务无法推进",
                "en": "No, otherwise the model cannot see execution results next turn and the task stalls",
                "ja": "省略不可、そうしないと次のターンでモデルが実行結果を見られず、タスクが止まる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "可以省略，只要把工具结果打印到终端即可",
                "en": "Yes, as long as the tool result is printed to the terminal",
                "ja": "省略可能、ツール結果をターミナルに出力するだけで十分"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "可以省略，模型已经知道自己调了哪些工具",
                "en": "Yes, the model already knows which tools it called",
                "ja": "省略可能、モデルはどのツールを呼び出したか既に知っている"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "可以省略，模型下一轮会自动从工具系统拉取结果",
                "en": "Yes, the model will automatically pull results from the tool system next turn",
                "ja": "省略可能、モデルは次のターンにツールシステムから自動的に結果を取得する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "tool_result 不是终端日志，是必须写回 messages 的结构化数据块。少了这步，模型下一轮的输入里没有工具执行结果，任务会在原地打转。",
            "en": "tool_result is not a terminal log but a structured data block that must be written back to messages. Without this step, the model's next input lacks execution results and the task spins in place.",
            "ja": "tool_result はターミナルログではなく、messages に書き戻さなければならない構造化データブロックです。このステップがないと、次のターンでモデルが実行結果を見られずタスクが止まります。"
          },
          "reward_card": "card_s01_002"
        },
        {
          "id": "q_s01_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "Turn 的四步中，哪一步最容易被开发者遗漏？",
            "en": "Which of the four Turn steps is most often missed by developers?",
            "ja": "Turn の 4 ステップのうち、開発者が最も見落としやすいのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "第一步：发消息给模型",
                "en": "Step 1: send message to model",
                "ja": "第 1 ステップ: モデルへのメッセージ送信"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第二步：读模型回复",
                "en": "Step 2: read model reply",
                "ja": "第 2 ステップ: モデルの返信を読む"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第三步：执行工具调用",
                "en": "Step 3: execute tool calls",
                "ja": "第 3 ステップ: ツール呼び出しを実行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "第四步：把工具结果写回消息历史",
                "en": "Step 4: write tool results back to message history",
                "ja": "第 4 ステップ: ツール結果をメッセージ履歴に書き戻す"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "第四步最容易被忽略。开发者有时只打印工具结果到终端，忘记写回 messages，导致模型下一轮看不见，任务在原地打转。",
            "en": "Step 4 is most often missed. Developers sometimes only print tool results to the terminal and forget to append them to messages, leaving the model blind next turn.",
            "ja": "第 4 ステップが最も見落とされやすいです。ツール結果をターミナルに出力するだけで messages に追加するのを忘れ、次のターンでモデルが見えなくなります。"
          },
          "reward_card": "card_s01_002"
        },
        {
          "id": "q_s01_007",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "tool_result 是什么？它应该放在哪里？",
            "en": "What is a tool_result, and where should it go?",
            "ja": "tool_result とは何ですか？どこに置くべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "终端日志，打印到控制台供开发者查看",
                "en": "A terminal log printed to the console for developers to review",
                "ja": "開発者が確認するためにコンソールに出力されるターミナルログ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "临时缓存，存在内存中，Turn 结束后自动清理",
                "en": "A temporary cache stored in memory that is auto-cleared after a Turn",
                "ja": "ターン終了後に自動クリアされるメモリ内の一時キャッシュ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "结构化数据块，必须写回 messages 供模型下一轮读取",
                "en": "A structured data block that must be written back to messages for the model to read next turn",
                "ja": "次のターンにモデルが読み取るために messages に書き戻さなければならない構造化データブロック"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "元数据，附加在下一次 API 请求的 header 中",
                "en": "Metadata attached in the header of the next API request",
                "ja": "次の API リクエストのヘッダーに付加されるメタデータ"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "tool_result 是结构化数据块，必须 append 进 messages。模型下一轮调用时会读取整个 messages 列表，如果工具结果不在里面，模型就看不到执行情况。",
            "en": "tool_result is a structured data block that must be appended to messages. The model reads the full messages list each call, so if results are missing the model cannot see what happened.",
            "ja": "tool_result は messages に追加しなければならない構造化データブロックです。モデルは各呼び出しで完全な messages リストを読み取るため、結果がなければ何が起きたか分かりません。"
          },
          "reward_card": "card_s01_003"
        },
        {
          "id": "q_s01_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "工具执行成功，但开发者只把结果存进本地变量，没有 append 进 messages。下一轮会发生什么？",
            "en": "A tool executes successfully but the developer only stores the result in a local variable without appending to messages. What happens next turn?",
            "ja": "ツールが正常に実行されたが、開発者が結果をローカル変数にのみ保存して messages に追加しなかった場合、次のターンはどうなりますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "模型会从工具缓存里恢复结果，正常继续",
                "en": "The model will recover the result from tool cache and continue normally",
                "ja": "モデルはツールキャッシュから結果を回復して正常に続行する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Loop 会自动检测遗漏并补写 tool_result",
                "en": "The Loop will automatically detect the omission and append tool_result",
                "ja": "Loop が自動的に欠落を検出して tool_result を追加する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Turn 计数器报错并中断循环",
                "en": "The Turn counter throws an error and interrupts the loop",
                "ja": "Turn カウンターがエラーを投げてループを中断する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型不知道工具执行了什么，可能重复调用或产生错误推断",
                "en": "The model will not know what the tool did and may repeat the call or make incorrect inferences",
                "ja": "モデルはツールが何をしたか分からず、呼び出しを繰り返すか誤った推論をする可能性がある"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "messages 是模型下一轮的全部工作输入。工具结果不进 messages，模型等于在黑暗中工作，可能重复调用同一工具或基于空白信息产生错误推断。",
            "en": "messages is the model's entire input for the next turn. Without tool results in messages, the model works in the dark, possibly repeating calls or making wrong inferences.",
            "ja": "messages は次のターンのモデルへの全入力です。messages にツール結果がなければ、モデルは暗闇の中で動作し、同じツールを繰り返し呼び出すか誤った推論をします。"
          },
          "reward_card": "card_s01_003"
        },
        {
          "id": "q_s01_009",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "哪个场景最准确地说明了「不把 tool_result 写回 messages 的后果」？",
            "en": "Which scenario most accurately illustrates the consequence of not writing tool_result back to messages?",
            "ja": "tool_result を messages に書き戻さない結果を最も正確に示しているシナリオはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "工具报错，Loop 立即中断并向用户报告",
                "en": "The tool errors out and the Loop immediately stops and reports to the user",
                "ja": "ツールがエラーになり、Loop が即座に停止してユーザーに報告する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "LoopState 的 turn 计数不增加，停在第一轮",
                "en": "The LoopState turn counter does not increment and stays at turn one",
                "ja": "LoopState のターンカウンターが増加せず、最初のターンに留まる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Agent 读取文件成功，但模型下一轮重新发出同样的读文件请求",
                "en": "Agent reads a file successfully, but the model re-issues the same read request next turn",
                "ja": "Agent がファイルの読み取りに成功したが、次のターンでモデルが同じ読み取りリクエストを再発行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型因为缺少 system prompt 而拒绝继续回复",
                "en": "The model refuses to continue replying due to missing system prompt",
                "ja": "system prompt がないためモデルが応答を続けることを拒否する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "工具结果未进 messages，模型不知道文件已被读取，因此下一轮再次推断需要读文件并重复调用。这是典型的「模型在原地打转」症状。",
            "en": "Without the tool result in messages, the model does not know the file was read and infers it needs to read again next turn, repeating the same call. This is the classic sign of the model spinning in place.",
            "ja": "messages にツール結果がなければ、モデルはファイルが読まれたことを知らず、次のターンで再び読む必要があると推論して同じ呼び出しを繰り返します。"
          },
          "reward_card": "card_s01_003"
        },
        {
          "id": "q_s01_010",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "messages 列表的本质是什么？",
            "en": "What is the true nature of the messages list?",
            "ja": "messages リストの本質は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "模型下一轮工作要读取的工作上下文输入",
                "en": "The working context input the model reads at the start of each turn",
                "ja": "各ターンの開始時にモデルが読み取る作業コンテキスト入力"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "给用户看的聊天展示层，用于渲染对话界面",
                "en": "The display layer for users to render a chat UI",
                "ja": "チャット UI をレンダリングするためのユーザー向け表示レイヤー"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "系统日志，仅用于调试和审计",
                "en": "A system log used only for debugging and auditing",
                "ja": "デバッグと監査のためだけに使うシステムログ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "LoopState 内部的临时缓冲区，每轮清空",
                "en": "An internal temporary buffer inside LoopState that clears each turn",
                "ja": "毎ターンクリアされる LoopState 内部の一時バッファ"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "messages 不是给用户看的聊天记录，而是模型下一轮调用时的全部工作输入。每条消息（user、assistant、tool_result）都是模型推理的原料。",
            "en": "messages is not a chat display for users. It is the model's complete working input for the next call. Every message -- user, assistant, tool_result -- is raw material for model reasoning.",
            "ja": "messages はユーザー向けのチャット表示ではありません。次の呼び出しのためのモデルの完全な作業入力です。すべてのメッセージがモデルの推論の材料です。"
          },
          "reward_card": "card_s01_004"
        },
        {
          "id": "q_s01_011",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "assistant 的回复是否需要写回 messages？",
            "en": "Does the assistant reply need to be written back to messages?",
            "ja": "assistant の返信を messages に書き戻す必要がありますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "不需要，模型内部会自动记住自己的回复",
                "en": "No, the model automatically remembers its own replies internally",
                "ja": "不要、モデルは内部で自分の返信を自動的に覚えている"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只有包含工具调用的回复才需要写回",
                "en": "Only replies that contain tool calls need to be written back",
                "ja": "ツール呼び出しを含む返信のみ書き戻す必要がある"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "不需要，assistant 回复不算工具结果，不在 Loop 范围内",
                "en": "No, assistant replies are not tool results and are outside Loop scope",
                "ja": "不要、assistant の返信は tool_result ではなく Loop の範囲外"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "需要，模型是无状态的，每轮推理都从 messages 开始，必须看到自己上一轮说了什么",
                "en": "Yes, the model is stateless and reasons from messages each call, so it must see what it said last turn",
                "ja": "必要、モデルはステートレスで毎回 messages から推論するため、前のターンで何を言ったか見る必要がある"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "模型是无状态的，每次调用都从 messages 开始推理。不写回 assistant 回复，模型下一轮就不知道自己上一轮说了什么，工作上下文断裂。",
            "en": "The model is stateless and reasons from messages fresh each call. Without writing back the assistant reply, the model loses track of what it said last turn and the working context breaks.",
            "ja": "モデルはステートレスで、毎回 messages から新たに推論します。assistant の返信を書き戻さないと、前のターンで何を言ったか分からなくなり、作業コンテキストが途切れます。"
          },
          "reward_card": "card_s01_004"
        },
        {
          "id": "q_s01_012",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "下列关于 messages 的说法，哪一条是错误的？",
            "en": "Which of the following statements about messages is INCORRECT?",
            "ja": "messages についての次の記述のうち、誤っているものはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "messages 是模型每轮推理的完整输入",
                "en": "messages is the complete input for the model each turn",
                "ja": "messages は各ターンのモデルの完全な入力である"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "messages 的主要用途是在前端渲染聊天气泡",
                "en": "The primary purpose of messages is to render chat bubbles on the frontend",
                "ja": "messages の主な用途はフロントエンドでチャットバブルをレンダリングすることである"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "assistant 的每条回复都必须写回 messages",
                "en": "Every assistant reply must be written back to messages",
                "ja": "すべての assistant の返信を messages に書き戻す必要がある"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "tool_result 必须进 messages，否则模型看不到工具执行结果",
                "en": "tool_result must be in messages or the model cannot see tool execution results",
                "ja": "tool_result は messages に入れなければモデルがツール実行結果を見られない"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "messages 的用途是作为模型下一轮推理的工作上下文输入，而不是给前端渲染用的聊天展示层。把它当聊天记录来看是常见误解。",
            "en": "messages is for the model's working context, not for rendering a chat UI. Treating it as a display record is a common mistake.",
            "ja": "messages はモデルの作業コンテキストのためのものであり、チャット UI のレンダリングのためではありません。表示レコードとして扱うのは一般的な誤解です。"
          },
          "reward_card": "card_s01_004"
        },
        {
          "id": "q_s01_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "某开发者实现 messages 时，只追加用户消息和 tool_result，不追加 assistant 回复。以下哪个问题最可能出现？",
            "en": "A developer implements messages to append only user messages and tool_results, not assistant replies. Which problem is most likely to occur?",
            "ja": "ある開発者が messages にユーザーメッセージと tool_result のみを追加し、assistant の返信を追加しない実装をした。最も起こりやすい問題はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "API 会因为消息顺序不合规而返回 400 错误",
                "en": "The API will return a 400 error because message order is non-compliant",
                "ja": "メッセージの順序が規定外のため API が 400 エラーを返す"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "工具无法执行，因为 tool_use block 不在 messages 里",
                "en": "Tools cannot execute because the tool_use block is not in messages",
                "ja": "tool_use ブロックが messages にないためツールを実行できない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型无法看到自己之前的推理和工具调用，无法维持连贯的任务执行",
                "en": "The model cannot see its prior reasoning and tool calls and cannot maintain coherent task execution",
                "ja": "モデルは以前の推論とツール呼び出しを見ることができず、一貫したタスク実行を維持できない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "LoopState 的 transition_reason 字段会记录错误",
                "en": "The transition_reason field in LoopState will record an error",
                "ja": "LoopState の transition_reason フィールドにエラーが記録される"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "assistant 回复中包含模型的推理过程和 tool_use 声明。不写回 messages，模型下一轮就像失忆了一样，无法连贯地推进任务。",
            "en": "The assistant reply contains the model's reasoning and tool_use declarations. Without it in messages, the model next turn is effectively amnesiac and cannot coherently continue the task.",
            "ja": "assistant の返信にはモデルの推論と tool_use の宣言が含まれています。messages に書き戻さなければ、次のターンのモデルは実質的に記憶喪失になります。"
          },
          "reward_card": "card_s01_004"
        },
        {
          "id": "q_s01_014",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "LoopState 的作用是什么？",
            "en": "What is the purpose of LoopState?",
            "ja": "LoopState の目的は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "替代 messages 存储对话历史，减少 API 调用量",
                "en": "Replace messages to store conversation history and reduce API calls",
                "ja": "messages を置き換えて会話履歴を保存し、API 呼び出しを減らす"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "管理工具注册和权限，控制哪些工具可以被调用",
                "en": "Manage tool registration and permissions, controlling which tools can be called",
                "ja": "ツールの登録と権限を管理し、どのツールを呼び出せるかを制御する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "把 messages、轮数、transition_reason 等循环状态显式收拢进一个对象",
                "en": "Explicitly consolidate loop state such as messages, turn count, and transition_reason into one object",
                "ja": "messages、ターン数、transition_reason などのループ状態を 1 つのオブジェクトに明示的に集約する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "缓存模型响应，避免重复调用相同提示",
                "en": "Cache model responses to avoid repeated calls with identical prompts",
                "ja": "モデルの応答をキャッシュして、同じプロンプトでの繰り返し呼び出しを避ける"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "LoopState 是一个显式的状态对象，将循环运行所需的 messages、轮数、transition_reason 等字段收拢在一起，比零散的局部变量更清晰，也为后续扩展打好基础。",
            "en": "LoopState is an explicit state object that consolidates fields like messages, turn count, and transition_reason into one place, cleaner than scattered local variables and ready for future extension.",
            "ja": "LoopState は、messages、ターン数、transition_reason などのフィールドを一か所に集約する明示的な状態オブジェクトです。散在するローカル変数より明確で、将来の拡張に備えられます。"
          },
          "reward_card": "card_s01_005"
        },
        {
          "id": "q_s01_015",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "LoopState 中的 transition_reason 字段用来记录什么？",
            "en": "What does the transition_reason field in LoopState record?",
            "ja": "LoopState の transition_reason フィールドは何を記録しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每轮模型调用的延迟时间（毫秒）",
                "en": "The latency of each model call in milliseconds",
                "ja": "各モデル呼び出しのレイテンシ（ミリ秒）"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "循环退出或状态切换的原因（如完成、超限、报错）",
                "en": "The reason the loop exited or transitioned state, such as completion, limit exceeded, or error",
                "ja": "ループが終了または状態遷移した理由（完了、制限超過、エラーなど）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "当前 Turn 中 messages 的字节数",
                "en": "The byte size of messages in the current Turn",
                "ja": "現在の Turn における messages のバイトサイズ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "已注册的工具名称列表",
                "en": "The list of registered tool names",
                "ja": "登録済みツール名のリスト"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "transition_reason 记录循环退出或状态切换的原因，例如任务完成、达到最大轮数或发生错误。这是调试和监控 Agent 行为的重要字段。",
            "en": "transition_reason records why the loop exited or changed state, such as task completion, max turns reached, or error. It is key for debugging and monitoring agent behavior.",
            "ja": "transition_reason は、タスク完了、最大ターン数到達、エラーなど、ループが終了または状態を変えた理由を記録します。"
          },
          "reward_card": "card_s01_005"
        },
        {
          "id": "q_s01_016",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "为什么要把循环状态收拢进显式的 state 对象，而不是用多个零散局部变量？",
            "en": "Why consolidate loop state into an explicit state object rather than scattered local variables?",
            "ja": "なぜ散在するローカル変数ではなく、明示的な state オブジェクトにループ状態を集約するのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "可以减少 API 调用次数，降低费用",
                "en": "Can reduce the number of API calls and lower costs",
                "ja": "API 呼び出し回数を減らしてコストを下げられる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "state 对象会自动同步到 messages，省去手动写回的步骤",
                "en": "The state object auto-syncs to messages, removing the need to manually write back",
                "ja": "state オブジェクトが messages に自動同期され、手動書き戻しが不要になる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "更清晰、便于调试，同时为后续扩展（如持久化、监控）打好基础",
                "en": "Clearer, easier to debug, and lays the groundwork for future extensions such as persistence and monitoring",
                "ja": "より明確でデバッグしやすく、永続化やモニタリングなどの将来の拡張に備えられる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "避免 JavaScript 的变量作用域问题",
                "en": "Avoid JavaScript variable scoping issues",
                "ja": "JavaScript の変数スコープの問題を避ける"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "显式 state 对象让循环的所有关键状态一目了然，方便 debug 和日志记录。更重要的是，它为后续扩展（持久化、断点续跑、可观测性）预留了挂载点。",
            "en": "An explicit state object makes all key loop state visible at a glance, simplifying debug and logging. More importantly, it creates hooks for future extensions like persistence, resume-from-checkpoint, and observability.",
            "ja": "明示的な state オブジェクトはすべての重要なループ状態を一目で見えるようにします。また、永続化、チェックポイントからの再開、可観測性などの将来の拡張のためのフックを作ります。"
          },
          "reward_card": "card_s01_005"
        },
        {
          "id": "q_s01_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下列哪种 LoopState 设计最合理？",
            "en": "Which LoopState design is most reasonable?",
            "ja": "次の LoopState 設計のうち、最も合理的なものはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "把 messages 单独存放，turn 和 transition_reason 分别作为全局变量",
                "en": "Store messages separately, with turn and transition_reason as separate global variables",
                "ja": "messages を別に保存し、turn と transition_reason を別々のグローバル変数として扱う"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "{ messages: [], turn: 0, transition_reason: null }",
                "en": "{ messages: [], turn: 0, transition_reason: null }",
                "ja": "{ messages: [], turn: 0, transition_reason: null }"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只存储 tool_result，messages 每轮清空重新填充",
                "en": "Store only tool_result and clear and refill messages each turn",
                "ja": "tool_result のみ保存し、毎ターン messages をクリアして再入力する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "完全省略 state 对象，所有状态用函数参数传递",
                "en": "Omit the state object entirely and pass all state as function arguments",
                "ja": "state オブジェクトを完全に省略し、すべての状態を関数の引数として渡す"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "将 messages、turn、transition_reason 三个核心字段收拢在同一个对象里，既清晰又便于扩展。零散全局变量、逐轮清空 messages 或纯参数传递都会导致状态管理混乱。",
            "en": "Consolidating messages, turn, and transition_reason in one object is clear and extensible. Scattered globals, clearing messages each turn, or pure argument passing all lead to messy state management.",
            "ja": "messages、turn、transition_reason を 1 つのオブジェクトにまとめることで、明確で拡張しやすくなります。"
          },
          "reward_card": "card_s01_005"
        },
        {
          "id": "q_s01_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "没有 Agent Loop，一个语言模型能不能完成「写文件并运行测试」这样的多步任务？",
            "en": "Without an Agent Loop, can a language model complete a multi-step task like writing a file and running tests?",
            "ja": "Agent Loop がなければ、言語モデルはファイルを書いてテストを実行するような複数ステップのタスクを完了できますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "不能，模型只能生成文字描述，没有 Loop 就无法执行工具和回写结果",
                "en": "No, the model can only generate text descriptions and without the Loop cannot execute tools or write results back",
                "ja": "いいえ、モデルはテキストの説明を生成するだけで、Loop がなければツールを実行したり結果を書き戻したりできない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "能，只要 system prompt 足够详细就行",
                "en": "Yes, as long as the system prompt is detailed enough",
                "ja": "はい、system prompt が十分に詳細であれば可能"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "能，Turn 机制不需要 Loop 也可以独立运作",
                "en": "Yes, the Turn mechanism can operate independently without a Loop",
                "ja": "はい、Turn の仕組みは Loop なしでも独立して動作できる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "能，模型内部有持久化机制可以自己维持状态",
                "en": "Yes, the model has an internal persistence mechanism to maintain its own state",
                "ja": "はい、モデルには内部の永続化メカニズムがあり自分で状態を維持できる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "没有 Loop，模型只能产生调用工具的文字描述，但没有代码去真正执行工具、拿到结果、写回 messages 再触发下一步。Loop 是让模型从「会说」变成「会干」的关键。",
            "en": "Without the Loop, the model can only produce text describing a tool call, but there is no code to actually execute the tool, get the result, write it back, and trigger the next step. The Loop is what turns the model from talking to doing.",
            "ja": "Loop がなければ、モデルはツール呼び出しを記述するテキストを生成するだけで、実際にツールを実行し、結果を取得し、書き戻して次のステップをトリガーするコードがありません。"
          },
          "reward_card": "card_s01_001"
        },
        {
          "id": "q_s01_019",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "Agent Loop、Turn、messages、LoopState 四个概念的关系，哪种描述最准确？",
            "en": "Which description best captures the relationship among Agent Loop, Turn, messages, and LoopState?",
            "ja": "Agent Loop、Turn、messages、LoopState の 4 概念の関係を最も正確に表しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "LoopState 是主循环；Turn 是工具执行器；messages 是日志；Agent Loop 是 UI 层",
                "en": "LoopState is the main loop; Turn is the tool executor; messages is the log; Agent Loop is the UI layer",
                "ja": "LoopState がメインループ、Turn がツール実行器、messages がログ、Agent Loop が UI レイヤー"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Turn 是主循环；Agent Loop 是单轮步骤；messages 是工具调用缓存；LoopState 是结果展示层",
                "en": "Turn is the main loop; Agent Loop is a single-turn step; messages is tool call cache; LoopState is the result display layer",
                "ja": "Turn がメインループ、Agent Loop が単一ターンのステップ、messages がツール呼び出しキャッシュ、LoopState が結果表示レイヤー"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Agent Loop 是整体主循环；Turn 是它的最小执行单元；messages 是每轮共享的工作上下文；LoopState 收拢 messages 和循环元数据",
                "en": "Agent Loop is the overall main loop; Turn is its smallest execution unit; messages is the shared working context each turn; LoopState consolidates messages and loop metadata",
                "ja": "Agent Loop は全体的なメインループ、Turn はその最小実行単位、messages は各ターンの共有作業コンテキスト、LoopState は messages とループメタデータを集約する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "四个概念是平级的，可以互相替代使用",
                "en": "The four concepts are at the same level and can be used interchangeably",
                "ja": "4 つの概念は同レベルで互いに置き換えて使用できる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Agent Loop 是整体主循环框架；Turn 是每次迭代的最小四步单元；messages 是模型每轮读取的工作上下文；LoopState 则显式收拢 messages、轮数、退出原因等元数据。",
            "en": "Agent Loop is the overall framework; Turn is the minimal four-step iteration unit; messages is the model's per-turn working context; LoopState explicitly consolidates messages, turn count, and exit reason.",
            "ja": "Agent Loop は全体的なフレームワーク、Turn は最小の 4 ステップ反復単位、messages はモデルの各ターン作業コンテキスト、LoopState は messages、ターン数、終了理由などを明示的に集約します。"
          },
          "reward_card": "card_s01_001"
        },
        {
          "id": "q_s01_020",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "Agent 调用 read_file 工具成功，但下一轮模型重复发出同一个 read_file 请求。最可能的原因是？",
            "en": "An Agent calls read_file successfully, but the model issues the same read_file request again next turn. What is the most likely cause?",
            "ja": "Agent が read_file ツールを正常に呼び出したが、次のターンでモデルが同じ read_file リクエストを再発行した。最も可能性の高い原因は？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "tool_result 没有写回 messages，模型下一轮不知道文件已被读取",
                "en": "tool_result was not written back to messages, so the model does not know the file was read",
                "ja": "tool_result が messages に書き戻されなかったため、モデルがファイルが読まれたことを知らない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "LoopState 的 turn 计数器溢出，导致 Loop 重置",
                "en": "The LoopState turn counter overflowed, causing the Loop to reset",
                "ja": "LoopState のターンカウンターがオーバーフローして Loop がリセットされた"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型被设计成每个 Turn 都必须至少调用一次工具",
                "en": "The model is designed to call at least one tool per Turn",
                "ja": "モデルは各 Turn で少なくとも 1 回ツールを呼び出すよう設計されている"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "文件系统工具有幂等保护，重复调用是预期行为",
                "en": "The file system tool has idempotency protection and repeated calls are expected behavior",
                "ja": "ファイルシステムツールは冪等保護があり、繰り返し呼び出しは期待された動作"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "这是 tool_result 未写回 messages 的经典症状。模型每轮从 messages 推理，不知道上一轮已读取文件，因此重新推断需要读文件并再次调用。",
            "en": "This is the classic symptom of tool_result not being written back to messages. The model reasons from messages each turn, unaware the file was already read, and infers again that a read is needed.",
            "ja": "これは tool_result が messages に書き戻されない古典的な症状です。モデルは毎ターン messages から推論し、ファイルがすでに読まれたことを知らないため、再び読む必要があると推論します。"
          },
          "reward_card": "card_s01_003"
        },
        {
          "id": "q_s01_021",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "下列哪种做法最符合 Agent Loop 的正确实现？",
            "en": "Which practice best matches a correct Agent Loop implementation?",
            "ja": "次のどの実践が正しい Agent Loop 実装に最も合致しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每轮完整走完发消息→读回复→执行工具→写回结果四步，把 assistant 回复和 tool_result 都追加进 messages",
                "en": "Complete all four steps each turn -- send, read, execute, write back -- appending both assistant reply and tool_result to messages",
                "ja": "毎ターン送信→読み取り→実行→書き戻しの 4 ステップをすべて完了し、assistant の返信と tool_result の両方を messages に追加する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "每轮清空 messages，只保留最新一条用户消息",
                "en": "Clear messages each turn and keep only the latest user message",
                "ja": "毎ターン messages をクリアして最新のユーザーメッセージのみ残す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只在最后一轮把所有 tool_result 批量写入 messages",
                "en": "Batch-write all tool_results to messages only at the final turn",
                "ja": "最終ターンにのみすべての tool_result を一括で messages に書き込む"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "每轮把工具结果打印到终端，不写回 messages",
                "en": "Print tool results to the terminal each turn without writing them back to messages",
                "ja": "毎ターンツール結果をターミナルに出力し、messages には書き戻さない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "正确实现要求每轮完整执行四步，且 assistant 回复和 tool_result 都必须及时追加进 messages，确保模型下一轮拥有完整的工作上下文。",
            "en": "A correct implementation requires all four steps every turn, with both the assistant reply and tool_result appended to messages promptly so the model has full working context next turn.",
            "ja": "正しい実装は毎ターンすべての 4 ステップを必要とし、assistant の返信と tool_result の両方を即座に messages に追加して、次のターンでモデルが完全な作業コンテキストを持てるようにします。"
          },
          "reward_card": "card_s01_002"
        },
        {
          "id": "q_s01_022",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "下列关于 Agent Loop、Turn、messages、LoopState 的说法，哪一条正确？",
            "en": "Which of the following statements about Agent Loop, Turn, messages, and LoopState is correct?",
            "ja": "Agent Loop、Turn、messages、LoopState についての次の記述のうち、正しいものはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Agent Loop 内置在语言模型里，开发者无需自己实现",
                "en": "Agent Loop is built into the language model and developers do not need to implement it themselves",
                "ja": "Agent Loop は言語モデルに組み込まれており、開発者が自分で実装する必要はない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "messages 是给用户看的聊天气泡，不影响模型推理",
                "en": "messages is a chat bubble display for users and does not affect model reasoning",
                "ja": "messages はユーザー向けのチャットバブル表示でモデルの推論に影響しない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Turn 的步骤可以跳过第四步，只要工具执行不报错",
                "en": "Turn steps can skip the fourth step as long as the tool does not error out",
                "ja": "ツールがエラーにならない限り、Turn のステップは第 4 ステップをスキップできる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "LoopState 把 messages、turn 计数、transition_reason 收拢在一个显式对象里，是组织循环状态的推荐做法",
                "en": "LoopState consolidates messages, turn count, and transition_reason into an explicit object, which is the recommended way to organize loop state",
                "ja": "LoopState は messages、ターン数、transition_reason を明示的なオブジェクトに集約し、ループ状態を整理する推奨方法である"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "LoopState 的核心价值是把循环状态显式收拢在一起。Agent Loop 需要开发者实现，messages 是模型推理输入，Turn 四步缺一不可。",
            "en": "LoopState's value is consolidating all loop state explicitly in one place. The Agent Loop is developer-implemented, messages is model input not display, and all four Turn steps are required.",
            "ja": "LoopState の価値は、すべてのループ状態を明示的に 1 か所に集約することです。Agent Loop は開発者が実装し、messages はモデル入力であり、Turn の 4 ステップはすべて必要です。"
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
            "zh": "子智能体的核心价值是什么？",
            "en": "What is the core value of a subagent?",
            "ja": "subagent の核心的な価値は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "给局部任务一个干净的独立上下文",
                "en": "A clean, isolated context for a local task",
                "ja": "局所タスクにクリーンな独立した context を与える"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "提供更多算力，让任务跑得更快",
                "en": "More compute power to run tasks faster",
                "ja": "より多くの計算能力でタスクを速く処理する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "允许子任务直接修改父智能体的 messages",
                "en": "Let subtasks directly modify the parent messages",
                "ja": "子タスクが親の messages を直接変更できるようにする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "通过 fork 继承完整父历史来节省 token",
                "en": "Save tokens by forking the full parent history",
                "ja": "完全な親の履歴を fork して token を節約する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "子智能体的核心价值是干净上下文，不是更多算力。把局部任务放进独立 context 里做，完成后只把摘要带回父智能体，主对话保持整洁。",
            "en": "The core value of a subagent is a clean context, not more compute. Local tasks run in isolation and only a summary returns to the parent, keeping the main conversation clean.",
            "ja": "subagent の核心価値はクリーンな context であり、計算能力ではありません。局所タスクは隔離された context で実行され、完了後は summary だけが親に返ります。"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_002",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "子智能体执行完任务后，哪些内容会自动流回父智能体？",
            "en": "After a subagent completes its task, what automatically flows back to the parent?",
            "ja": "subagent がタスクを完了した後、何が自動的に親に戻りますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "子智能体的完整 messages 列表",
                "en": "The subagent's full messages list",
                "ja": "subagent の完全な messages リスト"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "所有工具调用结果和中间步骤",
                "en": "All tool call results and intermediate steps",
                "ja": "すべてのツール呼び出し結果と中間ステップ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "父智能体发起时设定的 max_turns 执行记录",
                "en": "The execution log bounded by max_turns",
                "ja": "max_turns で制限された実行ログ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "没有任何内容会自动流回，中间过程对父智能体不可见",
                "en": "Nothing flows back automatically; intermediate steps are invisible to the parent",
                "ja": "何も自動的に戻らず、中間プロセスは親には見えない"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "父智能体和子智能体的 messages 完全独立。子智能体的中间过程不会自动写回父智能体，只有父智能体主动收取的摘要才能带回来，子任务噪声不污染主对话。",
            "en": "Parent and subagent each maintain completely independent messages. Intermediate steps never auto-flow back to the parent — only a summary the parent explicitly receives returns. This keeps the main conversation clean.",
            "ja": "親と subagent の messages は完全に独立しています。中間プロセスは自動的に親に戻らず、親が明示的に受け取る summary だけが返ります。"
          },
          "reward_card": "card_s04_002"
        },
        {
          "id": "q_s04_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "子智能体默认继承父智能体的 messages 历史吗？",
            "en": "Does a subagent inherit the parent's messages history by default?",
            "ja": "subagent はデフォルトで親の messages 履歴を継承しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "是，子智能体总是继承完整父历史",
                "en": "Yes, a subagent always inherits the full parent history",
                "ja": "はい、subagent は常に完全な親の履歴を継承します"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "是，但只继承最近 10 轮",
                "en": "Yes, but only the last 10 turns",
                "ja": "はい、ただし直近 10 ターンのみ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "否，除非显式 fork，否则子智能体从空白上下文开始",
                "en": "No, unless explicitly forked, the subagent starts with a clean context",
                "ja": "いいえ、明示的に fork しない限り、subagent はクリーンな context から始まります"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "否，子智能体只继承 system prompt，不继承 messages",
                "en": "No, the subagent only inherits the system prompt, not messages",
                "ja": "いいえ、subagent は system prompt のみ継承し、messages は継承しません"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "子智能体不继承父历史，除非显式 fork。默认从空白上下文开始，是上下文隔离的基础。这样子任务的中间噪声不会污染父智能体的主对话。",
            "en": "Subagents do not inherit parent history unless explicitly forked. They start from a clean context by default, which is the foundation of context isolation and prevents subtask noise from polluting the parent.",
            "ja": "subagent は明示的に fork しない限り親の履歴を継承しません。デフォルトでクリーンな context から始まり、これが context isolation の基盤です。"
          },
          "reward_card": "card_s04_002"
        },
        {
          "id": "q_s04_004",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下面哪个场景最能体现上下文隔离的价值？",
            "en": "Which scenario best demonstrates the value of context isolation?",
            "ja": "context isolation の価値を最もよく示すシナリオはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "子智能体执行 500 步文件扫描，只把找到了哪些文件的摘要带回父智能体",
                "en": "Subagent runs a 500-step file scan and returns only a summary of files found to parent",
                "ja": "subagent が 500 ステップのファイルスキャンを実行し、見つかったファイルの summary だけを親に返す"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "父智能体把所有历史 messages 传给子智能体，让子智能体了解完整背景",
                "en": "Parent passes all history to the subagent so it understands full context",
                "ja": "親がすべての履歴を subagent に渡し、完全な背景を理解させる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "子智能体完成后把自己的全部 messages 合并进父智能体的历史",
                "en": "Subagent merges all its messages into the parent history after completion",
                "ja": "subagent が完了後にすべての messages を親の履歴にマージする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "子智能体设置 max_turns=1 确保只执行一步",
                "en": "Subagent sets max_turns=1 to ensure only one step",
                "ja": "subagent が max_turns=1 を設定して 1 ステップのみ実行する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "上下文隔离的价值在于：把大量中间步骤封闭在子智能体内，父智能体只收到精炼的摘要。500 步扫描只带回文件列表，父 messages 保持整洁，正是这一价值的典型体现。",
            "en": "Context isolation shines when a subagent runs many intermediate steps and only returns a concise summary. A 500-step scan returning just a file list keeps the parent messages clean, the classic demonstration of this value.",
            "ja": "context isolation の価値は、大量の中間ステップを subagent 内に閉じ込め、親には精炼された summary だけを返すことにあります。500 ステップのスキャンがファイルリストだけを返すのがその典型例です。"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "为什么必须给子智能体设置 max_turns 限制？",
            "en": "Why must a subagent have a max_turns limit?",
            "ja": "subagent に max_turns 制限を設定しなければならないのはなぜですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "防止子智能体消耗过多 token，节省 API 费用",
                "en": "Prevent excessive token use and save API costs",
                "ja": "token の過剰消費を防ぎ、API コストを節約するため"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "确保子智能体的 messages 能正确同步回父智能体",
                "en": "Ensure subagent messages sync correctly back to parent",
                "ja": "subagent の messages が正しく親に同期されるようにするため"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "防止子智能体无限运行，给它一个必须完成的边界",
                "en": "Prevent infinite running and give the subagent a hard boundary to finish within",
                "ja": "無限実行を防ぎ、subagent に終了すべき境界を与えるため"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "让父智能体可以在每一轮检查子智能体的进度",
                "en": "Let the parent check the subagent's progress every turn",
                "ja": "親が毎ターン subagent の進捗を確認できるようにするため"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "max_turns 是子智能体必须有的边界。没有它，子智能体可能无限循环运行。结合受限工具集（通常不允许再派生子智能体），可以防止无限递归。",
            "en": "max_turns is a mandatory boundary for subagents. Without it, a subagent could run indefinitely. Combined with a restricted tool set (typically no further subagent spawning), this prevents infinite recursion.",
            "ja": "max_turns は subagent に不可欠な境界です。それがなければ subagent は無限にループする可能性があります。制限されたツールセットと組み合わせることで無限再帰を防ぎます。"
          },
          "reward_card": "card_s04_003"
        },
        {
          "id": "q_s04_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "除了设置 max_turns，通常还需要对子智能体做哪项限制？",
            "en": "Besides max_turns, what other restriction is typically applied to a subagent?",
            "ja": "max_turns に加えて、subagent に通常適用されるもう一つの制限は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "限制子智能体只能读文件，不能写文件",
                "en": "Restrict the subagent to reading files only, no writing",
                "ja": "subagent をファイルの読み取りのみに制限し、書き込みを禁止する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "强制子智能体在完成时主动 fork 父上下文",
                "en": "Force the subagent to fork the parent context on completion",
                "ja": "完了時に subagent に親の context を強制的に fork させる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "要求子智能体每轮都把 messages 同步给父智能体",
                "en": "Require the subagent to sync messages to parent every turn",
                "ja": "subagent が毎ターン messages を親に同期することを要求する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "限制工具集，通常不允许再派生子智能体",
                "en": "Restrict the tool set, typically disallow spawning further subagents",
                "ja": "ツールセットを制限し、通常はさらなる subagent の生成を禁止する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "子智能体必须有两道边界：max_turns 防止无限运行，受限工具集（不允许再派生子智能体）防止无限递归。两者结合才能完整控制子智能体的行为范围。",
            "en": "Subagents need two boundaries: max_turns prevents infinite running, and a restricted tool set (no spawning further subagents) prevents infinite recursion. Both together fully control the subagent's scope.",
            "ja": "subagent には 2 つの境界が必要です。max_turns は無限実行を防ぎ、制限されたツールセット（subagent のさらなる生成禁止）は無限再帰を防ぎます。"
          },
          "reward_card": "card_s04_003"
        },
        {
          "id": "q_s04_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果子智能体没有 max_turns 限制且工具集不受限，最可能出现什么问题？",
            "en": "If a subagent has no max_turns limit and unrestricted tools, what is most likely to happen?",
            "ja": "subagent に max_turns 制限がなくツールセットも無制限な場合、最も起こりやすい問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "子智能体的 messages 会自动合并到父智能体，导致上下文污染",
                "en": "Subagent messages auto-merge into parent, causing context pollution",
                "ja": "subagent の messages が自動的に親にマージされ、context が汚染される"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "子智能体无法正确继承父历史，导致任务失败",
                "en": "Subagent fails to inherit parent history correctly, causing task failure",
                "ja": "subagent が親の履歴を正しく継承できず、タスクが失敗する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "可能无限递归派生新的子智能体，系统失控",
                "en": "May spawn new subagents infinitely in a recursive loop, losing control",
                "ja": "再帰的に新しい subagent を無限に生成し、システムが制御不能になる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "fork 操作会失败，因为父上下文已经过大",
                "en": "Fork operation fails because the parent context is too large",
                "ja": "親 context が大きすぎて fork 操作が失敗する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "没有 max_turns 且工具不受限时，子智能体可以继续派生新的子智能体，形成无限递归。这就是为什么子智能体必须同时具备 max_turns + 受限工具集这两道防线。",
            "en": "Without max_turns and with unrestricted tools, a subagent can spawn more subagents indefinitely, creating infinite recursion. This is why both max_turns and a restricted tool set are required as two lines of defense.",
            "ja": "max_turns がなくツールが無制限な場合、subagent はさらに subagent を生成し続け、無限再帰を引き起こします。だからこそ max_turns とツール制限の両方が必要です。"
          },
          "reward_card": "card_s04_003"
        },
        {
          "id": "q_s04_008",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪种说法正确描述了子智能体 max_turns 的作用？",
            "en": "Which statement correctly describes the role of max_turns for a subagent?",
            "ja": "subagent の max_turns の役割を正しく説明しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "max_turns 控制父智能体最多等待子智能体多少秒",
                "en": "max_turns controls how many seconds the parent waits for the subagent",
                "ja": "max_turns は親が subagent を最大何秒待つかを制御する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "max_turns 决定子智能体的 messages 列表最多保留多少条",
                "en": "max_turns sets the maximum number of messages in the subagent's list",
                "ja": "max_turns は subagent の messages リストの最大数を設定する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "max_turns 是 fork 上下文时需要指定的历史窗口大小",
                "en": "max_turns is the history window size to specify when forking context",
                "ja": "max_turns は context を fork するときに指定する履歴ウィンドウのサイズ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "max_turns 设定子智能体在被强制停止前最多能执行多少个 agent 循环",
                "en": "max_turns sets the maximum agent loop iterations before forced stop",
                "ja": "max_turns は強制停止前の最大 agent ループ回数を設定する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "max_turns 限制的是 agent 循环的执行轮数，即子智能体最多跑多少轮 think-act 循环就必须停下来，防止无限运行。它与 messages 数量、等待时间和 fork 无关。",
            "en": "max_turns limits the number of agent loop iterations, how many think-act cycles the subagent can run before being forced to stop. It is unrelated to message count, wait time, or forking.",
            "ja": "max_turns は agent ループの実行回数を制限します。subagent が強制停止される前に実行できる think-act サイクルの最大数です。messages 数、待機時間、fork とは無関係です。"
          },
          "reward_card": "card_s04_003"
        },
        {
          "id": "q_s04_009",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "什么是 fork 上下文？",
            "en": "What is a fork context?",
            "ja": "fork context とは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "父智能体把自己的 messages 历史复制给子智能体作为起点",
                "en": "Parent copies its messages history to the subagent as a starting point",
                "ja": "親が自分の messages 履歴を subagent に出発点としてコピーする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "子智能体从空白状态开始，不带任何父历史",
                "en": "Subagent starts from scratch with no parent history",
                "ja": "subagent が親の履歴なしにゼロから始まる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "子智能体完成任务后将结果 merge 回父智能体",
                "en": "Subagent merges results back into parent after task completion",
                "ja": "subagent がタスク完了後に結果を親にマージする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "父智能体暂停自身执行，等待子智能体完成",
                "en": "Parent pauses its own execution waiting for subagent to finish",
                "ja": "親が subagent の完了を待ちながら自身の実行を一時停止する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "fork 上下文是指子智能体继承父智能体已有的 messages 历史再追加新的子任务，适合基于之前讨论继续的场景。与之相对的是空白上下文，从零开始。",
            "en": "A fork context means the subagent inherits the parent's existing messages history as its starting point, then adds the new subtask. This suits continuing from previous discussion scenarios, in contrast to a clean context that starts from scratch.",
            "ja": "fork context とは、subagent が親の既存の messages 履歴を出発点として継承し、新しいサブタスクを追加することです。前の議論を続けるシナリオに適しており、ゼロから始まるクリーンな context とは対照的です。"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "空白上下文和 fork 上下文最主要的区别是什么？",
            "en": "What is the main difference between a clean context and a fork context?",
            "ja": "クリーンな context と fork context の主な違いは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "空白上下文不允许使用工具，fork 上下文可以使用工具",
                "en": "Clean context disallows tool use; fork context allows it",
                "ja": "クリーンな context はツール使用を禁止し、fork context は許可する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "空白上下文从零开始，fork 上下文继承父智能体的 messages 历史",
                "en": "Clean context starts from zero; fork context inherits parent messages history",
                "ja": "クリーンな context はゼロから始まり、fork context は親の messages 履歴を継承する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "空白上下文必须设置 max_turns，fork 上下文不需要",
                "en": "Clean context requires max_turns; fork context does not",
                "ja": "クリーンな context は max_turns が必要で、fork context は不要"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "空白上下文只能执行读操作，fork 上下文可以执行写操作",
                "en": "Clean context can only read; fork context can also write",
                "ja": "クリーンな context は読み取りのみ、fork context は書き込みも可能"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "空白上下文从零开始，适合完全独立的局部任务；fork 上下文继承父智能体已有 messages，适合基于之前讨论继续。两种方式各有适用场景，与工具权限和 max_turns 无关。",
            "en": "A clean context starts from scratch for fully independent subtasks; a fork context inherits parent messages for continuing from prior discussion. Each has its place, unrelated to tool permissions or max_turns.",
            "ja": "クリーンな context は完全に独立した局所タスクのためにゼロから始まり、fork context は前の議論を継続するために親の messages を継承します。それぞれ適切なシナリオがあります。"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_011",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "下列哪个任务更适合用空白上下文而非 fork 上下文？",
            "en": "Which task is better suited for a clean context rather than a fork context?",
            "ja": "fork context ではなくクリーンな context の方が適しているタスクはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "根据用户刚才提出的修改意见继续优化代码",
                "en": "Continue refining code based on the user's just-given feedback",
                "ja": "ユーザーが直前に提供したフィードバックに基づいてコードを改善し続ける"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "延续上下文中已经建立的代码风格进行新模块开发",
                "en": "Develop a new module continuing the coding style established in context",
                "ja": "context で確立されたコードスタイルを継続して新しいモジュールを開発する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "基于之前讨论的架构方案生成实现代码",
                "en": "Generate implementation code based on the architecture discussed before",
                "ja": "以前に議論したアーキテクチャに基づいて実装コードを生成する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "扫描整个仓库的依赖关系，与主对话完全无关",
                "en": "Scan all repo dependencies, completely unrelated to the main conversation",
                "ja": "リポジトリ全体の依存関係をスキャンする、メイン会話とは全く無関係"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "扫描整个仓库依赖是完全独立的局部任务，不需要主对话的历史背景，用空白上下文从零开始最合适。其他三个选项都需要依赖之前的对话内容，更适合 fork 上下文。",
            "en": "Scanning repo dependencies is a fully independent local task that needs no context from the main conversation, a clean context is ideal. The other options all depend on prior conversation content, making fork context more appropriate.",
            "ja": "リポジトリの依存関係スキャンはメイン会話の背景が不要な完全独立タスクで、クリーンな context が最適です。他の選択肢はすべて以前の会話内容に依存するため、fork context が適切です。"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_012",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "fork 上下文相比空白上下文的主要代价是什么？",
            "en": "What is the main cost of a fork context compared to a clean context?",
            "ja": "クリーンな context と比較した fork context の主なコストは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "fork 上下文携带了父历史，子任务的起始 token 消耗更多",
                "en": "Fork context carries parent history, so the subagent starts with more tokens consumed",
                "ja": "fork context は親の履歴を持ち、subagent の開始時に消費 token が多い"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "fork 上下文无法设置 max_turns，有无限运行风险",
                "en": "Fork context cannot set max_turns, risking infinite runs",
                "ja": "fork context は max_turns を設定できず、無限実行のリスクがある"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "fork 上下文会导致子智能体的 messages 自动写回父智能体",
                "en": "Fork context causes subagent messages to auto-write back to parent",
                "ja": "fork context は subagent の messages が自動的に親に書き戻される"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "fork 上下文不支持工具调用，只能做纯文本推理",
                "en": "Fork context does not support tool calls, only pure text reasoning",
                "ja": "fork context はツール呼び出しをサポートせず、純粋なテキスト推論のみ"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "fork 上下文继承了父历史，子智能体一开始就消耗了更多 token。对于完全独立的任务，空白上下文更高效。fork 的优势是子智能体能看到之前的讨论，适合需要上下文背景的任务。",
            "en": "A fork context inherits parent history, so the subagent starts with more tokens already consumed. For fully independent tasks, a clean context is more efficient. The advantage of fork is the subagent can see prior discussion, suited for context-dependent tasks.",
            "ja": "fork context は親の履歴を継承するため、subagent は最初から多くの token を消費します。完全独立タスクにはクリーンな context が効率的です。fork の利点は subagent が以前の議論を参照できることです。"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_013",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "父智能体和子智能体各自维护独立 messages 列表，这直接带来哪个好处？",
            "en": "Parent and subagent each maintain independent messages lists. What is the direct benefit?",
            "ja": "親と subagent がそれぞれ独立した messages リストを維持することの直接的なメリットは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "子智能体执行速度更快，因为没有父历史要处理",
                "en": "Subagent runs faster because it has no parent history to process",
                "ja": "subagent は処理すべき親の履歴がないので、より速く実行される"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "父智能体可以并行启动多个子智能体而不冲突",
                "en": "Parent can start multiple subagents in parallel without conflict",
                "ja": "親が競合なしに複数の subagent を並列起動できる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "子任务的中间过程噪声不会污染父智能体的主对话",
                "en": "Subtask intermediate noise does not pollute the parent's main conversation",
                "ja": "サブタスクの中間プロセスのノイズが親のメイン会話を汚染しない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "子智能体可以访问所有工具，因为父历史不需要传递",
                "en": "Subagent can access all tools because parent history need not be passed",
                "ja": "親の履歴を渡す必要がないため、subagent はすべてのツールにアクセスできる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "父子 messages 完全独立的核心好处：子任务在执行期间产生大量中间步骤，这些噪声全部留在子智能体自己的 messages 里，不会流入父智能体，主对话始终保持整洁清晰。",
            "en": "The core benefit of fully independent messages: all the intermediate steps and noise from the subtask stay in the subagent's own messages and never flow into the parent, keeping the main conversation clean and clear.",
            "ja": "完全独立 messages の核心的メリット：サブタスク実行中の大量の中間ステップはすべて subagent 自身の messages に留まり、親に流れ込まないため、メイン会話は常にクリーンです。"
          },
          "reward_card": "card_s04_002"
        },
        {
          "id": "q_s04_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "如果开发者错误地把子智能体的完整 messages 写回父智能体，会出现什么问题？",
            "en": "If a developer mistakenly writes the subagent's full messages back to the parent, what goes wrong?",
            "ja": "開発者が誤って subagent の完全な messages を親に書き戻した場合、何が問題になりますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "父智能体的 max_turns 会被子智能体的轮数重置",
                "en": "The parent's max_turns gets reset by the subagent's turn count",
                "ja": "親の max_turns が subagent のターン数でリセットされる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "父智能体上下文被子任务大量中间步骤撑大，主对话被噪声淹没",
                "en": "Parent context bloats with subtask intermediate steps, drowning the main conversation in noise",
                "ja": "親 context がサブタスクの大量の中間ステップで肥大化し、メイン会話がノイズに溺れる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "fork 操作会失败，因为出现循环引用",
                "en": "Fork operation fails due to circular reference",
                "ja": "循環参照により fork 操作が失敗する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "子智能体的工具调用权限会被父智能体继承，造成安全问题",
                "en": "Subagent tool permissions get inherited by parent, causing security issues",
                "ja": "subagent のツール権限が親に継承され、セキュリティ問題が発生する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "父子 messages 隔离的价值正在于此：子智能体可能产生数百步中间结果，一旦全写回父智能体，父上下文急剧膨胀，主对话的信噪比极速下降，这正是上下文隔离要避免的问题。",
            "en": "This is exactly what context isolation prevents: a subagent may produce hundreds of intermediate steps; writing them all back to the parent bloats the parent context and destroys the signal-to-noise ratio of the main conversation.",
            "ja": "これはまさに context isolation が防ぐ問題です：subagent は数百の中間ステップを生成する可能性があり、それらを全て親に書き戻すと親 context が急激に膨張し、メイン会話の信号対雑音比が急低下します。"
          },
          "reward_card": "card_s04_002"
        },
        {
          "id": "q_s04_015",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "子任务噪声不污染主对话这一特性，依赖的核心机制是什么？",
            "en": "What core mechanism enables subtask noise not polluting the main conversation?",
            "ja": "サブタスクのノイズがメイン会話を汚染しないという特性の核心メカニズムは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "子智能体设置了 max_turns，完成后强制停止",
                "en": "Subagent has max_turns and stops when the limit is reached",
                "ja": "subagent が max_turns を設定し、上限に達すると強制停止する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "父子智能体各自维护独立的 messages 列表",
                "en": "Parent and subagent maintain independent messages lists",
                "ja": "親と subagent がそれぞれ独立した messages リストを維持する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "子智能体默认使用 fork 上下文而非空白上下文",
                "en": "Subagent uses fork context by default rather than clean context",
                "ja": "subagent はデフォルトでクリーンな context ではなく fork context を使用する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "子智能体的工具集受到严格限制，无法写入父上下文",
                "en": "Subagent tool set is strictly restricted to prevent writing to parent context",
                "ja": "subagent のツールセットが厳しく制限され、親 context への書き込みができない"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "父子 messages 完全独立是上下文隔离的核心机制。子智能体的所有中间步骤都记录在自己的 messages 里，不会流入父智能体，主对话始终保持整洁。",
            "en": "Fully independent messages between parent and subagent is the core mechanism of context isolation. All intermediate steps are recorded in the subagent's own messages and never flow into the parent, keeping the main conversation clean.",
            "ja": "親と subagent の messages が完全に独立していることが context isolation の核心メカニズムです。すべての中間ステップは subagent 自身の messages に記録され、親に流れ込まず、メイン会話はクリーンです。"
          },
          "reward_card": "card_s04_002"
        },
        {
          "id": "q_s04_016",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪种说法错误地理解了子智能体的价值？",
            "en": "Which statement incorrectly understands the value of a subagent?",
            "ja": "subagent の価値を誤って理解しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "子智能体让局部任务在独立上下文中运行，不污染主对话",
                "en": "Subagent runs local tasks in isolated context without polluting main conversation",
                "ja": "subagent は局所タスクを独立した context で実行し、メイン会話を汚染しない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "子智能体完成后只把摘要带回父智能体，保持主对话整洁",
                "en": "Subagent returns only a summary to parent after completion, keeping main conversation clean",
                "ja": "subagent は完了後に summary だけを親に返し、メイン会話をクリーンに保つ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "子智能体为需要大量中间步骤的任务提供了干净的隔离空间",
                "en": "Subagent provides clean isolation for tasks needing many intermediate steps",
                "ja": "subagent は多くの中間ステップが必要なタスクにクリーンな隔離空間を提供する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "子智能体的核心价值是提供额外的模型算力，让任务并行执行更快",
                "en": "The core value of subagents is extra model compute, making parallel tasks run faster",
                "ja": "subagent の核心価値は追加の計算能力を提供し、並列タスクをより速く実行すること"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "子智能体的核心价值是干净上下文而非更多算力。误以为子智能体主要用于并行提速是常见误解，实际上它的关键在于上下文隔离，让局部任务在独立空间中完成而不污染主对话。",
            "en": "The core value of subagents is clean context, not more compute. Thinking subagents are mainly for parallel speed is a common misconception, the key is context isolation, letting local tasks run in isolation without polluting the main conversation.",
            "ja": "subagent の核心価値はクリーンな context であり、より多くの計算能力ではありません。subagent が主に並列化による高速化のためだと思うのは一般的な誤解で、重要なのは context isolation です。"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个子智能体需要基于上周与用户的设计讨论来生成文档，应该用哪种上下文启动方式？",
            "en": "A subagent needs to generate docs based on a design discussion from last week. Which context startup mode should it use?",
            "ja": "subagent が先週のユーザーとの設計議論に基づいてドキュメントを生成する必要があります。どの context 起動方式を使うべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "空白上下文，从零开始，避免消耗不必要的 token",
                "en": "Clean context, starting from scratch to avoid unnecessary token use",
                "ja": "クリーンな context、不必要な token 消費を避けてゼロから始める"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "fork 上下文，继承包含设计讨论的父历史作为起点",
                "en": "Fork context, inheriting parent history that includes the design discussion",
                "ja": "fork context、設計議論を含む親の履歴を継承して出発点とする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "先设置 max_turns=1，再决定用哪种上下文",
                "en": "Set max_turns=1 first, then decide which context type to use",
                "ja": "まず max_turns=1 を設定してから、どの context タイプを使うか決める"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "让子智能体自动检测父历史是否有用，再决定是否 fork",
                "en": "Let the subagent auto-detect if parent history is useful, then decide to fork",
                "ja": "subagent が親の履歴が有用かどうかを自動検出してから fork を決定する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "任务需要依赖上周的设计讨论，这部分内容在父智能体的 messages 里。使用 fork 上下文继承父历史，子智能体才能看到那次讨论的内容。空白上下文从零开始，子智能体看不到任何历史背景。",
            "en": "The task depends on last week's design discussion which is in the parent's messages. Using fork context lets the subagent see that discussion. A clean context starts from zero and the subagent would have no access to that background.",
            "ja": "タスクは先週の設計議論に依存しており、それは親の messages にあります。fork context を使うことで subagent がその議論を参照できます。クリーンな context ではゼロから始まり、その背景にアクセスできません。"
          },
          "reward_card": "card_s04_001"
        },
        {
          "id": "q_s04_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下列哪个选项正确描述了子智能体边界的完整定义？",
            "en": "Which option correctly describes the complete definition of a subagent's boundaries?",
            "ja": "subagent の境界の完全な定義を正しく説明しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "只需要 max_turns，确保子智能体在有限轮内完成",
                "en": "Only max_turns is needed to ensure the subagent finishes within limited turns",
                "ja": "subagent が制限されたターン内に完了することを確保するために max_turns だけが必要"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只需要受限工具集，防止子智能体执行危险操作",
                "en": "Only a restricted tool set is needed to prevent subagent from dangerous operations",
                "ja": "subagent が危険な操作を実行しないようにするためにツールセットの制限だけが必要"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "max_turns + 受限工具集，两者缺一不可",
                "en": "max_turns plus a restricted tool set, both are required",
                "ja": "max_turns と制限されたツールセットの両方が必要で、どちらも欠かせない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "max_turns + fork 上下文，确保子智能体有足够的历史背景",
                "en": "max_turns plus fork context to ensure subagent has enough history",
                "ja": "subagent が十分な履歴を持つよう max_turns と fork context が必要"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "子智能体的完整边界由两部分构成：max_turns 防止无限运行，受限工具集（通常不允许再派生子智能体）防止无限递归。两者缺一不可，fork 与否是上下文继承方式的选择，与边界控制无关。",
            "en": "A subagent's complete boundary has two parts: max_turns prevents infinite running, and a restricted tool set (typically no spawning further subagents) prevents infinite recursion. Both are required. Fork vs clean context is a context inheritance choice, unrelated to boundary control.",
            "ja": "subagent の完全な境界は 2 つの部分から構成されます：max_turns は無限実行を防ぎ、制限されたツールセットは無限再帰を防ぎます。両方が必要です。fork かどうかは context 継承の選択であり、境界制御とは無関係です。"
          },
          "reward_card": "card_s04_003"
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
