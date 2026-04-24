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
            "zh": "在工具分发（tool dispatch）中，dispatch map 的核心作用是什么？",
            "en": "What is the core role of a dispatch map in tool dispatch?",
            "ja": "ツールディスパッチにおいて dispatch map の核心的な役割は何ですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "把工具名映射到对应的处理函数", "en": "Map tool names to their handler functions", "ja": "ツール名をハンドラ関数にマッピングする" } },
            { "id": "b", "text": { "zh": "在发给 API 前清理 messages 列表", "en": "Clean up the messages list before sending to the API", "ja": "API に送信する前に messages リストを整理する" } },
            { "id": "c", "text": { "zh": "验证文件操作路径是否在工作目录内", "en": "Validate that file paths stay inside the workspace", "ja": "ファイルパスがワークスペース内にあるか検証する" } },
            { "id": "d", "text": { "zh": "定义工具的名称、描述和参数格式", "en": "Define tool name, description, and parameter format", "ja": "ツールの名前・説明・パラメータ形式を定義する" } }
          ],
          "answer": "a",
          "explanation": {
            "zh": "dispatch map 是一个字典，把工具名（字符串）映射到具体的 handler 函数。加新工具只需加一条字典项和一个 handler，循环体本身完全不变。",
            "en": "A dispatch map is a dictionary that maps tool names to handler functions. Adding a tool only requires one new dict entry plus one handler — the loop body never changes.",
            "ja": "dispatch map はツール名をハンドラ関数に対応付ける辞書です。新しいツールを追加するには辞書エントリとハンドラを 1 つ追加するだけで、ループ本体は変わりません。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "要给 agent 新增一个工具，正确做法是什么？",
            "en": "What is the correct way to add a new tool to the agent?",
            "ja": "エージェントに新しいツールを追加する正しい方法はどれですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "修改主循环，加入 if/else 分支处理新工具", "en": "Modify the main loop with a new if/else branch", "ja": "メインループに if/else 分岐を追加して対応する" } },
            { "id": "b", "text": { "zh": "在 dispatch map 加一条字典项，再写一个 handler 函数", "en": "Add one dict entry to the dispatch map and write one handler", "ja": "dispatch map に辞書エントリを追加し handler 関数を 1 つ書く" } },
            { "id": "c", "text": { "zh": "更新消息规范化逻辑，允许新工具的字段通过", "en": "Update normalization logic to allow new tool fields through", "ja": "新しいツールのフィールドを通すよう正規化ロジックを更新する" } },
            { "id": "d", "text": { "zh": "只写 schema，不需要 handler 函数", "en": "Only write a schema — no handler function needed", "ja": "schema だけ書けばよく handler 関数は不要" } }
          ],
          "answer": "b",
          "explanation": {
            "zh": "dispatch map 设计让扩展和循环解耦：加工具 = 加 handler + 加字典项，主循环永远不变。只写 schema 没有 handler 会导致工具被调用时找不到执行入口。",
            "en": "The dispatch map decouples extension from the loop: adding a tool means one handler + one dict entry, and the loop never changes. A schema without a handler would crash at call time.",
            "ja": "dispatch map の設計により拡張とループが分離されます。ツール追加 = handler + 辞書エントリ 1 つ、ループは変わりません。handler のない schema は呼び出し時にクラッシュします。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "下列关于 dispatch map 的说法，哪一条是错误的？",
            "en": "Which of the following statements about the dispatch map is INCORRECT?",
            "ja": "dispatch map について誤った説明はどれですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "每个工具名对应一个 handler 函数", "en": "Each tool name corresponds to one handler function", "ja": "各ツール名はハンドラ関数に対応する" } },
            { "id": "b", "text": { "zh": "加新工具时主循环代码不需要改动", "en": "Adding a new tool requires no changes to the main loop", "ja": "新ツール追加時にメインループの変更は不要" } },
            { "id": "c", "text": { "zh": "dispatch map 负责验证文件路径不超出工作目录", "en": "The dispatch map validates that file paths stay within the workspace", "ja": "dispatch map がファイルパスのサンドボックス検証を担う" } },
            { "id": "d", "text": { "zh": "dispatch map 本质上是一个字典结构", "en": "A dispatch map is essentially a dictionary structure", "ja": "dispatch map は本質的に辞書構造である" } }
          ],
          "answer": "c",
          "explanation": {
            "zh": "路径沙箱是各文件工具自己的 handler 内部做的，不是 dispatch map 的职责。dispatch map 只负责把工具名路由到正确的 handler。",
            "en": "Path sandboxing is done inside each file tool's handler, not by the dispatch map itself. The dispatch map only routes tool names to the right handler.",
            "ja": "パスのサンドボックス検証は各ファイルツールの handler 内で行われ、dispatch map の責務ではありません。dispatch map はツール名を適切な handler にルーティングするだけです。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "路径沙箱（path sandbox）的作用是什么？它在哪一层实现？",
            "en": "What does path sandboxing do, and at which layer is it implemented?",
            "ja": "パスサンドボックスの目的と実装レイヤーはどれですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "靠模型自觉遵守工作目录限制，无需代码验证", "en": "Relies on the model to self-enforce workspace limits — no code validation needed", "ja": "モデルが自律的にワークスペース制限を守るため検証コードは不要" } },
            { "id": "b", "text": { "zh": "在 API 消息规范化时过滤掉越界路径", "en": "Filters out out-of-bounds paths during API message normalization", "ja": "API メッセージ正規化時に範囲外パスをフィルタリングする" } },
            { "id": "c", "text": { "zh": "在 tool schema 里限制参数格式，防止模型生成越界路径", "en": "Restricts parameter format in the tool schema to prevent out-of-bounds paths", "ja": "tool schema でパラメータ形式を制限し範囲外パスを防ぐ" } },
            { "id": "d", "text": { "zh": "在工具层的 handler 中验证路径，确保文件操作限定在工作目录内", "en": "Validates paths inside the tool handler to keep file ops within the workspace", "ja": "ツール層の handler でパスを検証し、ファイル操作をワークスペース内に限定する" } }
          ],
          "answer": "d",
          "explanation": {
            "zh": "路径沙箱在工具层的 handler 中实现，而不是依靠模型自觉或 schema 约束。这是防止模型越界访问系统文件的关键安全机制。",
            "en": "Path sandboxing is implemented in the tool-layer handler, not by relying on model self-control or schema constraints. This is the key security mechanism preventing out-of-bounds file access.",
            "ja": "パスサンドボックスはツール層の handler で実装され、モデルの自律制御や schema 制約に依存しません。これがシステムファイルへの範囲外アクセスを防ぐ重要なセキュリティ機構です。"
          },
          "reward_card": "card_s02_002"
        },
        {
          "id": "q_s02_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "如果不在工具层做路径验证，最可能出现什么风险？",
            "en": "If path validation is not done at the tool layer, what risk is most likely?",
            "ja": "ツール層でパス検証を行わない場合、最も起こりやすいリスクは何ですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "模型生成的 tool schema 格式会出错", "en": "The model-generated tool schema format will be incorrect", "ja": "モデルが生成する tool schema の形式に誤りが生じる" } },
            { "id": "b", "text": { "zh": "dispatch map 无法找到对应的 handler", "en": "The dispatch map will fail to find the corresponding handler", "ja": "dispatch map が対応する handler を見つけられなくなる" } },
            { "id": "c", "text": { "zh": "API 会拒绝接受 messages，因为格式不符合规范", "en": "The API will reject the messages due to non-compliant format", "ja": "API が規格外の形式として messages を拒否する" } },
            { "id": "d", "text": { "zh": "模型可能访问工作目录以外的系统文件", "en": "The model may access system files outside the workspace", "ja": "モデルがワークスペース外のシステムファイルにアクセスする可能性がある" } }
          ],
          "answer": "d",
          "explanation": {
            "zh": "路径沙箱的核心目的是防止模型越界访问系统文件。如果工具层不做验证，模型可以生成任意路径，访问工作目录之外的敏感文件。",
            "en": "The core purpose of path sandboxing is to prevent the model from accessing system files outside the workspace. Without tool-layer validation, the model can generate arbitrary paths reaching sensitive files.",
            "ja": "パスサンドボックスの核心目的は、モデルがワークスペース外のシステムファイルにアクセスするのを防ぐことです。ツール層での検証がなければ、任意のパスで機密ファイルにアクセスできます。"
          },
          "reward_card": "card_s02_002"
        },
        {
          "id": "q_s02_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "路径沙箱放在工具层而不是模型提示层，核心原因是？",
            "en": "Why is path sandboxing placed at the tool layer rather than in the model prompt?",
            "ja": "パスサンドボックスをモデルのプロンプト層ではなくツール層に置く核心的な理由は何ですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "工具层运行速度更快，减少延迟", "en": "The tool layer runs faster and reduces latency", "ja": "ツール層の方が高速でレイテンシを削減できる" } },
            { "id": "b", "text": { "zh": "模型不可被完全信任，代码验证比提示约束更可靠", "en": "The model cannot be fully trusted; code validation is more reliable than prompt constraints", "ja": "モデルは完全には信頼できず、コード検証の方がプロンプト制約より信頼性が高い" } },
            { "id": "c", "text": { "zh": "API 要求所有路径必须在工具层做格式检查", "en": "The API requires all paths to be format-checked at the tool layer", "ja": "API がすべてのパスをツール層で形式チェックすることを要求している" } },
            { "id": "d", "text": { "zh": "dispatch map 字典查找只支持工具层的路径格式", "en": "The dispatch map dictionary lookup only supports tool-layer path formats", "ja": "dispatch map の辞書検索はツール層のパス形式のみをサポートする" } }
          ],
          "answer": "b",
          "explanation": {
            "zh": "模型可能被越狱或误导，不能作为安全边界的唯一保障。将路径沙箱放在代码层（工具 handler）是确定性的强制约束，不依赖模型的自觉性。",
            "en": "Models can be jailbroken or misled and cannot be the sole security boundary. Placing path sandboxing in code (tool handler) provides deterministic enforcement that does not rely on model self-restraint.",
            "ja": "モデルはジェイルブレイクや誘導を受ける可能性があり、唯一のセキュリティ境界にはなれません。コード（ツール handler）にパスサンドボックスを置くことで、モデルの自制心に依存しない確定的な強制が実現します。"
          },
          "reward_card": "card_s02_002"
        },
        {
          "id": "q_s02_007",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "发给 Claude API 的 messages 有哪些格式要求？",
            "en": "What are the format requirements for messages sent to the Claude API?",
            "ja": "Claude API に送る messages の形式要件はどれですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "user/assistant 可以连续出现，顺序不限", "en": "user/assistant messages can appear consecutively in any order", "ja": "user/assistant は連続して任意の順番で現れてよい" } },
            { "id": "b", "text": { "zh": "tool_use 块不需要对应的 tool_result，模型自动补全", "en": "tool_use blocks need no matching tool_result — the model fills them in", "ja": "tool_use ブロックに対応する tool_result は不要でモデルが補完する" } },
            { "id": "c", "text": { "zh": "user/assistant 严格交替，每个 tool_use 有匹配 tool_result，只接受标准字段", "en": "Strict user/assistant alternation, each tool_use has a matching tool_result, only standard fields accepted", "ja": "user/assistant は厳密に交互、各 tool_use に tool_result が対応、標準フィールドのみ受け付ける" } },
            { "id": "d", "text": { "zh": "只需要工具名和参数，不需要维护 role 字段", "en": "Only tool name and params are needed — the role field is not required", "ja": "ツール名とパラメータだけ必要で role フィールドは不要" } }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Claude API 要求 messages 满足三个条件：user/assistant 严格交替、每个 tool_use 块有匹配的 tool_result、只接受标准字段。内部 messages 不满足这些条件时需要在发送前做规范化。",
            "en": "The Claude API requires three conditions: strict user/assistant alternation, each tool_use matched by a tool_result, and only standard fields. When internal messages violate these, normalization is needed before sending.",
            "ja": "Claude API は 3 つの条件を要求します：user/assistant の厳密な交互配置、各 tool_use に対応する tool_result、標準フィールドのみ。内部 messages がこれらを満たさない場合、送信前に正規化が必要です。"
          },
          "reward_card": "card_s02_003"
        },
        {
          "id": "q_s02_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "为什么需要在发给 API 之前对 messages 做规范化？",
            "en": "Why must messages be normalized before being sent to the API?",
            "ja": "API に送信する前に messages を正規化する必要があるのはなぜですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "内部 messages 可能包含 API 不接受的格式或字段", "en": "Internal messages may contain formats or fields the API does not accept", "ja": "内部の messages には API が受け付けない形式やフィールドが含まれる場合がある" } },
            { "id": "b", "text": { "zh": "dispatch map 要求在调用 handler 前先规范化参数", "en": "The dispatch map requires parameters to be normalized before calling the handler", "ja": "dispatch map は handler 呼び出し前にパラメータの正規化を要求する" } },
            { "id": "c", "text": { "zh": "路径沙箱验证需要规范化后的消息格式才能运行", "en": "Path sandbox validation requires normalized message format to run", "ja": "パスサンドボックス検証は正規化されたメッセージ形式を必要とする" } },
            { "id": "d", "text": { "zh": "tool schema 生成依赖规范化后的 messages 结构", "en": "Tool schema generation depends on the normalized messages structure", "ja": "tool schema の生成は正規化された messages 構造に依存する" } }
          ],
          "answer": "a",
          "explanation": {
            "zh": "agent 内部的 messages 和发给 API 的 messages 可以不同。内部可能包含调试字段、未配对的 tool_use 等，发送前需规范化以满足 API 的严格要求。",
            "en": "Internal messages and API-bound messages can differ. Internally you may have debug fields, unpaired tool_use blocks, etc. Normalization before sending ensures strict API compliance.",
            "ja": "エージェント内部の messages と API に送る messages は異なる場合があります。内部にはデバッグフィールドや未対応の tool_use などが含まれる可能性があり、送信前の正規化で API の厳格な要件を満たします。"
          },
          "reward_card": "card_s02_003"
        },
        {
          "id": "q_s02_009",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "下列哪种情况会导致 Claude API 拒绝请求？",
            "en": "Which of the following would cause the Claude API to reject a request?",
            "ja": "Claude API がリクエストを拒否する原因となるのはどれですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "消息列表里有一个 tool_use 块但没有对应的 tool_result", "en": "A tool_use block in the message list has no matching tool_result", "ja": "メッセージリストに対応する tool_result のない tool_use ブロックがある" } },
            { "id": "b", "text": { "zh": "dispatch map 包含超过 10 个工具条目", "en": "The dispatch map contains more than 10 tool entries", "ja": "dispatch map に 10 個を超えるツールエントリがある" } },
            { "id": "c", "text": { "zh": "文件 handler 在工具层做了路径验证", "en": "The file handler performs path validation at the tool layer", "ja": "ファイル handler がツール層でパス検証を実行する" } },
            { "id": "d", "text": { "zh": "tool schema 描述字段超过 200 字符", "en": "The tool schema description field exceeds 200 characters", "ja": "tool schema の description フィールドが 200 文字を超える" } }
          ],
          "answer": "a",
          "explanation": {
            "zh": "API 要求每个 tool_use 都必须有匹配的 tool_result。如果 agent 在内部记录了一个 tool_use 但没有补全对应的结果，发给 API 之前必须规范化修正，否则请求会被拒绝。",
            "en": "The API requires every tool_use to have a matching tool_result. If the agent recorded a tool_use internally without a matching result, it must be corrected during normalization before sending, or the request will be rejected.",
            "ja": "API はすべての tool_use に対応する tool_result を要求します。エージェントが内部で tool_use を記録したが対応する結果がない場合、送信前の正規化で修正しなければリクエストが拒否されます。"
          },
          "reward_card": "card_s02_003"
        },
        {
          "id": "q_s02_010",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "agent 在处理工具调用时，内部 messages 列表和发给 API 的 messages 列表有什么关系？",
            "en": "When the agent processes tool calls, what is the relationship between its internal messages list and the messages sent to the API?",
            "ja": "エージェントがツール呼び出しを処理する際、内部 messages リストと API に送る messages リストの関係はどれですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "完全相同，内部 messages 直接发给 API，无需任何处理", "en": "Identical — internal messages are sent to the API directly with no processing", "ja": "完全に同じで、内部 messages はそのまま API に送られる" } },
            { "id": "b", "text": { "zh": "内部 messages 仅供 dispatch map 路由使用，不发给 API", "en": "Internal messages are only for dispatch map routing and never sent to the API", "ja": "内部 messages は dispatch map のルーティングにのみ使われ API には送らない" } },
            { "id": "c", "text": { "zh": "内部 messages 可能包含额外状态，发送前需规范化以符合 API 要求", "en": "Internal messages may contain extra state; they must be normalized before sending to meet API requirements", "ja": "内部 messages には追加の状態が含まれる場合があり、API 要件を満たすために送信前に正規化が必要" } },
            { "id": "d", "text": { "zh": "每次调用工具后必须清空 messages，重新向 API 发送对话历史", "en": "After each tool call, messages must be cleared and conversation history resent to the API from scratch", "ja": "ツール呼び出し後は messages をクリアし、API に会話履歴を最初から再送しなければならない" } }
          ],
          "answer": "c",
          "explanation": {
            "zh": "内部 messages 可以包含调试信息、未对齐的 tool_use/tool_result 等 API 不接受的内容。发送前做规范化是标准实践，保证两者可以不同，但发出去的必须合规。",
            "en": "Internal messages can contain debug info, misaligned tool_use/tool_result pairs, and other content the API rejects. Normalization before sending is standard practice — internal and outbound messages can differ, but what goes out must comply.",
            "ja": "内部 messages にはデバッグ情報や不整合の tool_use/tool_result ペアなど API が拒否するコンテンツが含まれる場合があります。送信前の正規化は標準的な実践で、内部と送信 messages は異なってよいが、送信するものは準拠しなければなりません。"
          },
          "reward_card": "card_s02_003"
        },
        {
          "id": "q_s02_011",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "tool schema 的作用是什么？",
            "en": "What is the purpose of a tool schema?",
            "ja": "tool schema の目的は何ですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "定义工具名、描述和参数格式，告诉模型能调什么", "en": "Define tool name, description, and parameter format so the model knows what it can call", "ja": "ツール名・説明・パラメータ形式を定義し、モデルが呼び出せるものを知らせる" } },
            { "id": "b", "text": { "zh": "在工具层验证文件路径，防止越界访问", "en": "Validate file paths at the tool layer to prevent out-of-bounds access", "ja": "ツール層でファイルパスを検証し、範囲外アクセスを防ぐ" } },
            { "id": "c", "text": { "zh": "把工具名映射到 handler，实现 dispatch 路由", "en": "Map tool names to handlers for dispatch routing", "ja": "ツール名を handler にマッピングして dispatch ルーティングを実現する" } },
            { "id": "d", "text": { "zh": "规范化 messages 中的字段，确保符合 API 标准", "en": "Normalize fields in messages to ensure API compliance", "ja": "messages のフィールドを正規化して API 標準に準拠させる" } }
          ],
          "answer": "a",
          "explanation": {
            "zh": "tool schema 是给模型看的说明书，描述工具名、用途和参数格式。模型根据 schema 生成合法的 tool_use 块。每个工具 = schema（告诉模型）+ handler（真正执行）。",
            "en": "A tool schema is a specification for the model, describing the tool name, purpose, and parameter format. The model uses schemas to generate valid tool_use blocks. Each tool = schema (tells the model) + handler (does the work).",
            "ja": "tool schema はモデルへの仕様書で、ツール名・用途・パラメータ形式を説明します。モデルは schema を使って正しい tool_use ブロックを生成します。各ツール = schema（モデルへの通知）+ handler（実際の実行）。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_012",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果 tool schema 和 handler 不一一对应，会出现什么问题？",
            "en": "What problem arises when a tool schema and its handler do not match?",
            "ja": "tool schema と handler が一致しない場合、どのような問題が発生しますか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "API 会因为 messages 格式不合规而拒绝请求", "en": "The API rejects the request due to non-compliant message format", "ja": "messages の形式が不適切として API がリクエストを拒否する" } },
            { "id": "b", "text": { "zh": "模型可能按照 schema 调用工具，但 handler 无法正确处理，导致错误", "en": "The model may call the tool per the schema, but the handler cannot process it correctly, causing errors", "ja": "モデルが schema に従いツールを呼び出しても handler が正しく処理できずエラーになる" } },
            { "id": "c", "text": { "zh": "dispatch map 字典查找失败，主循环崩溃", "en": "The dispatch map lookup fails and the main loop crashes", "ja": "dispatch map の検索が失敗しメインループがクラッシュする" } },
            { "id": "d", "text": { "zh": "路径沙箱无法初始化，工作目录访问被全部阻断", "en": "The path sandbox fails to initialize, blocking all workspace access", "ja": "パスサンドボックスが初期化できず、ワークスペースへのすべてのアクセスがブロックされる" } }
          ],
          "answer": "b",
          "explanation": {
            "zh": "schema 告诉模型工具的参数格式，handler 负责实际执行。如果两者不一致，模型会按照 schema 生成 tool_use，但 handler 收到的参数结构不匹配，执行时会出错或行为异常。",
            "en": "The schema tells the model the parameter format; the handler does the work. If they mismatch, the model generates tool_use per the schema, but the handler receives mismatched parameters and fails or behaves incorrectly.",
            "ja": "schema はモデルにパラメータ形式を伝え、handler が実際の処理を行います。両者が一致しない場合、モデルは schema に従い tool_use を生成しますが、handler が受け取るパラメータ構造が合わず、エラーや異常動作が発生します。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "模型依据 tool schema 做了什么？",
            "en": "What does the model do based on tool schemas?",
            "ja": "モデルは tool schema に基づいて何をしますか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "直接执行工具的 handler 函数，绕过 dispatch map", "en": "Directly executes the tool handler, bypassing the dispatch map", "ja": "dispatch map を迂回してツールの handler を直接実行する" } },
            { "id": "b", "text": { "zh": "生成符合 schema 定义的 tool_use 块，交由 dispatch map 路由执行", "en": "Generates tool_use blocks conforming to the schema, which the dispatch map routes for execution", "ja": "schema に適合した tool_use ブロックを生成し、dispatch map がルーティングして実行する" } },
            { "id": "c", "text": { "zh": "验证 handler 函数的路径参数是否在工作目录内", "en": "Validates whether handler path parameters are within the workspace", "ja": "handler のパスパラメータがワークスペース内にあるか検証する" } },
            { "id": "d", "text": { "zh": "在发送前自动规范化 messages 以满足 API 要求", "en": "Automatically normalizes messages before sending to satisfy API requirements", "ja": "API 要件を満たすため送信前に messages を自動的に正規化する" } }
          ],
          "answer": "b",
          "explanation": {
            "zh": "模型只负责生成 tool_use 块（其格式由 schema 约束），真正的执行由 dispatch map 路由到对应 handler 完成。模型不直接执行任何代码，也不做路径验证或消息规范化。",
            "en": "The model only generates tool_use blocks (constrained by the schema); actual execution is routed via the dispatch map to the appropriate handler. The model does not directly execute code, validate paths, or normalize messages.",
            "ja": "モデルは tool_use ブロックを生成するだけで（形式は schema で制約）、実際の実行は dispatch map が適切な handler にルーティングして行います。モデルはコードを直接実行せず、パス検証やメッセージ正規化も行いません。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个完整的工具系统，schema 和 handler 分别承担什么职责？",
            "en": "In a complete tool system, what are the respective responsibilities of the schema and the handler?",
            "ja": "完全なツールシステムにおいて、schema と handler それぞれの責務は何ですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "schema 负责路径验证；handler 负责消息规范化", "en": "Schema handles path validation; handler handles message normalization", "ja": "schema がパス検証を担当し、handler がメッセージ正規化を担当する" } },
            { "id": "b", "text": { "zh": "schema 负责把工具名路由到 handler；handler 负责定义工具参数格式", "en": "Schema routes tool names to handlers; handler defines tool parameter format", "ja": "schema がツール名を handler にルーティングし、handler がツールパラメータ形式を定義する" } },
            { "id": "c", "text": { "zh": "schema 告诉模型工具的名称和参数格式；handler 真正执行工具逻辑", "en": "Schema tells the model the tool name and parameter format; handler actually executes the tool logic", "ja": "schema がモデルにツール名とパラメータ形式を伝え、handler がツールロジックを実際に実行する" } },
            { "id": "d", "text": { "zh": "schema 和 handler 都负责路径沙箱，形成双重验证", "en": "Both schema and handler handle path sandboxing, forming double validation", "ja": "schema と handler の両方がパスサンドボックスを担当し、二重検証を形成する" } }
          ],
          "answer": "c",
          "explanation": {
            "zh": "schema 是给模型的接口声明，告诉模型可以调用什么以及参数格式；handler 是运行时的实现，接收参数并真正执行逻辑。两者缺一不可，必须一一对应。",
            "en": "The schema is an interface declaration for the model, telling it what to call and with what parameters; the handler is the runtime implementation that receives parameters and executes the logic. Both are required and must match 1:1.",
            "ja": "schema はモデルへのインターフェース宣言で、何を呼び出すかとパラメータ形式を伝えます。handler は実行時の実装でパラメータを受け取りロジックを実行します。両方が必須で 1 対 1 で対応しなければなりません。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_015",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪种组合正确描述了 s02 工具分发系统的三个核心机制？",
            "en": "Which combination correctly describes the three core mechanisms of the s02 tool dispatch system?",
            "ja": "s02 ツールディスパッチシステムの 3 つのコアメカニズムを正しく説明しているのはどれですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "dispatch map（路由）+ 路径沙箱（安全）+ 消息规范化（API 合规）", "en": "Dispatch map (routing) + path sandbox (security) + message normalization (API compliance)", "ja": "dispatch map（ルーティング）+ パスサンドボックス（セキュリティ）+ メッセージ正規化（API 準拠）" } },
            { "id": "b", "text": { "zh": "tool schema（路由）+ dispatch map（安全）+ handler（API 合规）", "en": "Tool schema (routing) + dispatch map (security) + handler (API compliance)", "ja": "tool schema（ルーティング）+ dispatch map（セキュリティ）+ handler（API 準拠）" } },
            { "id": "c", "text": { "zh": "路径沙箱（路由）+ 消息规范化（安全）+ dispatch map（API 合规）", "en": "Path sandbox (routing) + message normalization (security) + dispatch map (API compliance)", "ja": "パスサンドボックス（ルーティング）+ メッセージ正規化（セキュリティ）+ dispatch map（API 準拠）" } },
            { "id": "d", "text": { "zh": "tool schema（安全）+ 消息规范化（路由）+ 路径沙箱（API 合规）", "en": "Tool schema (security) + message normalization (routing) + path sandbox (API compliance)", "ja": "tool schema（セキュリティ）+ メッセージ正規化（ルーティング）+ パスサンドボックス（API 準拠）" } }
          ],
          "answer": "a",
          "explanation": {
            "zh": "s02 的三大机制各司其职：dispatch map 负责把工具名路由到 handler，路径沙箱在工具层保障安全，消息规范化确保发给 API 的格式合规。",
            "en": "The three s02 mechanisms each have a distinct role: dispatch map routes tool names to handlers, path sandbox enforces security at the tool layer, and message normalization ensures API-compliant format.",
            "ja": "s02 の 3 つのメカニズムはそれぞれ独自の役割を持ちます：dispatch map がツール名を handler にルーティング、パスサンドボックスがツール層でセキュリティを確保、メッセージ正規化が API 準拠の形式を保証します。"
          },
          "reward_card": "card_s02_002"
        },
        {
          "id": "q_s02_016",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "新来的工程师问：'加一个新工具需要改多少地方？'正确答案是？",
            "en": "A new engineer asks: 'How many places need to change when adding a new tool?' What is the correct answer?",
            "ja": "新しいエンジニアが聞きます：'新しいツールを追加するには何箇所変更が必要ですか？'正しい答えは？"
          },
          "options": [
            { "id": "a", "text": { "zh": "只需要 1 处：在主循环加一个 if/else 分支", "en": "Only 1 place: add an if/else branch in the main loop", "ja": "1 箇所のみ：メインループに if/else 分岐を追加する" } },
            { "id": "b", "text": { "zh": "至少 3 处：主循环 + 路径验证 + 消息规范化", "en": "At least 3 places: main loop + path validation + message normalization", "ja": "少なくとも 3 箇所：メインループ + パス検証 + メッセージ正規化" } },
            { "id": "c", "text": { "zh": "不需要改任何代码，dispatch map 会自动发现新工具", "en": "No code changes needed — the dispatch map auto-discovers new tools", "ja": "コード変更不要、dispatch map が新しいツールを自動検出する" } },
            { "id": "d", "text": { "zh": "2 处：加 handler 函数 + 在 dispatch map 加一条字典项；schema 视需要加", "en": "2 places: add handler + add one entry in dispatch map; schema is added as needed", "ja": "2 箇所：handler を追加 + dispatch map に 1 エントリ追加、schema は必要に応じて追加" } }
          ],
          "answer": "d",
          "explanation": {
            "zh": "加新工具需要：1 个 handler 函数（真正执行逻辑）+ dispatch map 加一条字典项（路由）+ tool schema（告诉模型，视需要）。主循环永远不变，这是 dispatch map 设计的核心价值。",
            "en": "Adding a new tool requires: 1 handler function (logic) + 1 dispatch map entry (routing) + a tool schema (to inform the model, as needed). The main loop never changes — that is the core value of the dispatch map design.",
            "ja": "新しいツールの追加に必要なもの：handler 関数 1 つ（ロジック）+ dispatch map エントリ 1 つ（ルーティング）+ tool schema（必要に応じてモデルに通知）。メインループは変わりません。これが dispatch map 設計の核心的な価値です。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "tool schema 存在的前提是什么？如果不提供 schema，会发生什么？",
            "en": "What is the premise for a tool schema to exist? What happens if no schema is provided?",
            "ja": "tool schema が存在する前提は何ですか？schema が提供されない場合はどうなりますか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "schema 是可选的；不提供时 dispatch map 自动生成默认 schema", "en": "Schema is optional; the dispatch map auto-generates a default schema when absent", "ja": "schema はオプション；ない場合 dispatch map がデフォルト schema を自動生成する" } },
            { "id": "b", "text": { "zh": "schema 是必须的；不提供时路径沙箱无法初始化，工具被禁用", "en": "Schema is required; without it the path sandbox cannot initialize and the tool is disabled", "ja": "schema は必須；ない場合パスサンドボックスが初期化できずツールが無効化される" } },
            { "id": "c", "text": { "zh": "schema 仅用于消息规范化；不提供时 API 拒绝所有 tool_use 请求", "en": "Schema is only for message normalization; without it the API rejects all tool_use requests", "ja": "schema はメッセージ正規化のみに使われる；ない場合 API がすべての tool_use リクエストを拒否する" } },
            { "id": "d", "text": { "zh": "schema 告诉模型工具存在；不提供时模型不知道可以调用该工具，不会生成对应 tool_use", "en": "Schema informs the model the tool exists; without it the model does not know it can call the tool and will not generate a tool_use", "ja": "schema がモデルにツールの存在を伝える；ない場合モデルはそのツールを呼び出せると知らず、tool_use を生成しない" } }
          ],
          "answer": "d",
          "explanation": {
            "zh": "schema 是模型和工具系统之间的契约。模型在生成 tool_use 前必须知道工具存在及其参数格式，这些信息来自 schema。没有 schema，模型不会调用对应工具；有 schema 无 handler，调用时会报错。",
            "en": "The schema is the contract between the model and the tool system. The model must know a tool exists and its parameter format before generating tool_use — that information comes from the schema. No schema means no call; schema without handler means a runtime error.",
            "ja": "schema はモデルとツールシステム間の契約です。モデルは tool_use を生成する前にツールの存在とパラメータ形式を知る必要があり、その情報は schema から来ます。schema がなければ呼び出しは発生せず、schema があっても handler がなければ実行時エラーになります。"
          },
          "reward_card": "card_s02_001"
        },
        {
          "id": "q_s02_018",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 s02 工具系统中，下列哪个说法正确区分了 schema 和 handler 的边界？",
            "en": "In the s02 tool system, which statement correctly distinguishes the boundary between schema and handler?",
            "ja": "s02 ツールシステムにおいて、schema と handler の境界を正しく区別しているのはどれですか？"
          },
          "options": [
            { "id": "a", "text": { "zh": "schema 运行在工具层，handler 运行在 API 层", "en": "Schema runs at the tool layer; handler runs at the API layer", "ja": "schema はツール層で動作し、handler は API 層で動作する" } },
            { "id": "b", "text": { "zh": "schema 是给模型看的声明，handler 是给运行时执行的实现", "en": "Schema is a declaration for the model; handler is an implementation for the runtime to execute", "ja": "schema はモデル向けの宣言であり、handler はランタイムが実行する実装である" } },
            { "id": "c", "text": { "zh": "schema 负责路径安全验证，handler 负责消息规范化", "en": "Schema handles path security validation; handler handles message normalization", "ja": "schema がパスセキュリティ検証を担当し、handler がメッセージ正規化を担当する" } },
            { "id": "d", "text": { "zh": "schema 和 handler 都存储在 dispatch map 字典中", "en": "Both schema and handler are stored in the dispatch map dictionary", "ja": "schema と handler の両方が dispatch map 辞書に格納されている" } }
          ],
          "answer": "b",
          "explanation": {
            "zh": "schema 是接口声明，告诉模型工具的名称、描述和参数格式，决定模型'看到什么'。handler 是实现，决定工具'做什么'。两者分工明确，缺少任意一方工具都无法正常工作。",
            "en": "Schema is an interface declaration telling the model what a tool is named, what it does, and what parameters it takes — it decides what the model 'sees'. Handler is the implementation deciding what the tool 'does'. Each is necessary; neither alone suffices.",
            "ja": "schema はインターフェース宣言で、ツール名・説明・パラメータ形式をモデルに伝え、モデルが'何を見るか'を決めます。handler は実装で、ツールが'何をするか'を決めます。両方が必要で、どちらか一方だけでは機能しません。"
          },
          "reward_card": "card_s02_003"
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
          "difficulty": 1,
          "stem": {
            "zh": "TodoWrite 工具的作用范围是什么？",
            "en": "What is the scope of the TodoWrite tool?",
            "ja": "TodoWrite ツールの有効範囲はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "跨会话持久化，重启后任务仍在",
                "en": "Persists across sessions; tasks survive restarts",
                "ja": "セッションをまたいで永続化し、再起動後も残る"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "仅在当前会话内生效，会话结束后消失",
                "en": "Only active in the current session; disappears when the session ends",
                "ja": "現在のセッション内のみ有効で、セッション終了後に消える"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "在所有并行 agent 之间共享",
                "en": "Shared across all parallel agents",
                "ja": "すべての並列エージェント間で共有される"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "写入磁盘，作为项目级任务板使用",
                "en": "Written to disk as a project-level task board",
                "ja": "ディスクに書き込まれ、プロジェクト級タスクボードとして使われる"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "TodoWrite 是会话内的轻量计划工具，帮助模型聚焦下一步。任务完成后随会话一起消失，既不持久化，也不跨 agent 共享。",
            "en": "TodoWrite is a lightweight in-session planning tool that keeps the model focused on the next step. Tasks vanish with the session and are neither persisted nor shared across agents.",
            "ja": "TodoWrite はセッション内の軽量計画ツールで、モデルを次のステップに集中させます。タスクはセッションと共に消え、永続化もエージェント間共有もされません。"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "关于 TodoWrite，以下哪个描述最准确？",
            "en": "Which description best fits TodoWrite?",
            "ja": "TodoWrite を最も正確に表す説明はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "多 agent 协作的工作流编排系统",
                "en": "A workflow orchestration system for multi-agent collaboration",
                "ja": "マルチエージェント連携のワークフロー編成システム"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "后台异步任务的管理队列",
                "en": "A management queue for background async tasks",
                "ja": "バックグラウンド非同期タスクの管理キュー"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "当前会话的轻量计划，帮助模型聚焦下一步",
                "en": "A lightweight plan for the current session that helps the model focus on the next step",
                "ja": "現在のセッションの軽量プランで、モデルを次のステップに集中させる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "可供团队成员查看的持久化任务板",
                "en": "A persistent task board visible to team members",
                "ja": "チームメンバーが参照できる永続タスクボード"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "TodoWrite 的核心定位是当前会话的轻量计划，不是持久化任务板、不是多 agent 工作图、不是后台任务管理。它只帮模型在当前会话里聚焦下一步。",
            "en": "TodoWrite is fundamentally a lightweight in-session plan. It is not a persistent task board, a multi-agent workflow graph, or a background task manager. It only helps the model stay focused within the current session.",
            "ja": "TodoWrite の本質は現在セッション内の軽量プランです。永続タスクボードでも、マルチエージェントワークフローグラフでも、バックグラウンドタスク管理でもなく、現在セッション内でモデルを集中させるだけです。"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "同一时刻 todo 列表里允许存在几个 in_progress 状态的任务？",
            "en": "How many tasks can be in the in_progress state at the same time?",
            "ja": "todo リストで同時に in_progress 状態にできるタスクはいくつですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "没有限制，可以同时标记多个",
                "en": "No limit; multiple tasks can be marked at once",
                "ja": "制限なし、複数同時にマークできる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "最多两个，对应当前步骤和下一步",
                "en": "At most two, for the current step and the next step",
                "ja": "最大 2 つ、現在ステップと次ステップに対応"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只能有一个",
                "en": "Exactly one",
                "ja": "ちょうど 1 つだけ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "取决于当前会话的并行 agent 数量",
                "en": "Depends on the number of parallel agents in the session",
                "ja": "現在セッションの並列エージェント数による"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "关键约束：同一时刻只能有一个 in_progress，这强制模型聚焦当前一步，防止同时推进多件事导致计划模糊。",
            "en": "The key constraint is exactly one in_progress at any moment, forcing the model to focus on one step and preventing plan drift from parallel progress.",
            "ja": "重要な制約として、同時に in_progress にできるのは 1 つだけで、モデルは現在のステップに集中し、並行進行によるプラン拡散を防ぎます。"
          },
          "reward_card": "card_s03_002"
        },
        {
          "id": "q_s03_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "todo 列表的三种合法状态是哪些？",
            "en": "What are the three valid states for a todo item?",
            "ja": "todo アイテムの 3 つの有効な状態はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "pending / in_progress / completed",
                "en": "pending / in_progress / completed",
                "ja": "pending / in_progress / completed"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "todo / doing / done",
                "en": "todo / doing / done",
                "ja": "todo / doing / done"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "queued / running / finished",
                "en": "queued / running / finished",
                "ja": "queued / running / finished"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "open / active / closed",
                "en": "open / active / closed",
                "ja": "open / active / closed"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "三种状态为 pending（待处理）、in_progress（进行中）、completed（已完成）。其中 in_progress 同一时刻只允许一个，强制模型一次只做一件事。",
            "en": "The three states are pending, in_progress, and completed. Only one task may be in_progress at a time, enforcing single-focus execution.",
            "ja": "3 つの状態は pending、in_progress、completed です。in_progress は同時に 1 つだけで、モデルの単一集中実行を強制します。"
          },
          "reward_card": "card_s03_002"
        },
        {
          "id": "q_s03_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "为什么 in_progress 状态同一时刻只能有一个？",
            "en": "Why can only one task be in_progress at a time?",
            "ja": "なぜ in_progress は同時に 1 つだけなのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "为了节省内存，避免状态对象过多",
                "en": "To save memory by avoiding too many state objects",
                "ja": "状態オブジェクトが増えすぎてメモリを節約するため"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "微信小程序不支持并发写入",
                "en": "WeChat Mini Programs do not support concurrent writes",
                "ja": "WeChat ミニプログラムが並行書き込みをサポートしないため"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "强制模型聚焦当前一步，防止同时推进多件事导致计划漂移",
                "en": "To force the model to focus on one step at a time and prevent plan drift",
                "ja": "モデルを現在のステップに集中させ、複数同時進行によるプラン漂流を防ぐため"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "因为 TodoWrite 每次只能接受一条更新指令",
                "en": "Because TodoWrite can only accept one update instruction at a time",
                "ja": "TodoWrite が一度に 1 つの更新命令しか受け付けないため"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "一次只做一件事是 TodoWrite 的核心设计原则。in_progress 唯一性强制模型聚焦，防止同时推进多个任务导致计划模糊。",
            "en": "Doing one thing at a time is the core design principle of TodoWrite. The single in_progress constraint forces model focus and prevents plan ambiguity from parallel progress.",
            "ja": "一度に一つだけというのが TodoWrite の核心設計原則です。in_progress の一意性制約によりモデルは集中し、並行進行によるプランの曖昧化を防ぎます。"
          },
          "reward_card": "card_s03_002"
        },
        {
          "id": "q_s03_006",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "模型连续几轮没有更新 todo 计划时，系统会做什么？",
            "en": "What does the system do when the model goes several turns without updating the todo plan?",
            "ja": "モデルが数ターン todo プランを更新しない場合、システムは何をしますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "自动提醒模型，把它的注意力拉回到计划上",
                "en": "Automatically reminds the model and redirects its attention to the plan",
                "ja": "自動でモデルにリマインドし、注意をプランに引き戻す"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "自动终止当前会话，要求用户重新开始",
                "en": "Automatically terminates the session and asks the user to restart",
                "ja": "現在のセッションを自動終了し、ユーザーに再開を求める"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "替模型补写后续的计划步骤",
                "en": "Writes the remaining plan steps on behalf of the model",
                "ja": "モデルの代わりに残りのプランステップを書く"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "把所有 in_progress 任务强制标记为 completed",
                "en": "Forcibly marks all in_progress tasks as completed",
                "ja": "すべての in_progress タスクを強制的に completed にマークする"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "提醒机制是防漂移的安全网：连续几轮没更新计划时系统自动提醒，把模型注意力拉回计划。它不替模型思考，不终止会话，只是防止计划被遗忘。",
            "en": "The reminder mechanism is an anti-drift safety net: when several turns pass without a plan update, the system reminds the model and redirects its attention to the plan. It does not plan for the model or terminate the session; it only prevents the plan from being forgotten.",
            "ja": "リマインド機構は漂流防止のセーフティネットです。数ターン更新しないとシステムが自動でリマインドし、注意をプランに引き戻します。モデルの代わりに計画したりセッションを終了したりせず、計画が忘れられるのを防ぐだけです。"
          },
          "reward_card": "card_s03_003"
        },
        {
          "id": "q_s03_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "TodoWrite 的提醒机制目的是什么？",
            "en": "What is the purpose of the TodoWrite reminder mechanism?",
            "ja": "TodoWrite のリマインド機構の目的は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "替模型规划接下来应该做什么",
                "en": "To plan the next steps on behalf of the model",
                "ja": "モデルの代わりに次のステップを計画する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把模型拉回到已有计划，防止执行漂离计划",
                "en": "To pull the model back to the existing plan and prevent execution from drifting",
                "ja": "モデルを既存プランに引き戻し、実行が計画から離れるのを防ぐ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "强制模型每轮都必须更新 todo 状态",
                "en": "To force the model to update the todo state every turn",
                "ja": "毎ターン必ず todo 状態を更新するようモデルに強制する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记录模型执行过程，供事后审计",
                "en": "To record the model execution process for later auditing",
                "ja": "後の監査のためにモデルの実行プロセスを記録する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "提醒机制是防漂移的安全网，不是替模型思考的工具。它只在模型连续几轮没更新计划时触发，把模型的注意力拉回到已有计划上。",
            "en": "The reminder mechanism is an anti-drift safety net, not a planning substitute. It only triggers when the model skips updates for several turns, redirecting attention back to the existing plan.",
            "ja": "リマインド機構は漂流防止のセーフティネットであり、計画代替ツールではありません。数ターン更新をスキップしたときだけ発動し、注意を既存プランに向け直します。"
          },
          "reward_card": "card_s03_003"
        },
        {
          "id": "q_s03_008",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "提醒机制触发的条件是什么？",
            "en": "What condition triggers the reminder mechanism?",
            "ja": "リマインド機構が発動する条件は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每当模型输出超过一定长度",
                "en": "Whenever the model output exceeds a certain length",
                "ja": "モデルの出力が一定の長さを超えるたびに"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "所有任务都变成 completed 状态",
                "en": "All tasks reach the completed state",
                "ja": "すべてのタスクが completed 状態になる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型调用了非 TodoWrite 的工具",
                "en": "The model calls a tool other than TodoWrite",
                "ja": "モデルが TodoWrite 以外のツールを呼び出す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型连续几轮没有更新 todo 计划",
                "en": "The model goes several turns without updating the todo plan",
                "ja": "モデルが数ターン todo プランを更新しない"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "提醒机制在模型连续几轮没更新计划时自动触发，这是防止执行过程中计划漂移的安全网机制。",
            "en": "The reminder triggers automatically when the model goes multiple turns without updating the plan, serving as a safety net against execution drift.",
            "ja": "リマインドはモデルが複数ターンプランを更新しないときに自動発動し、実行中の計画漂流を防ぐセーフティネットとして機能します。"
          },
          "reward_card": "card_s03_003"
        },
        {
          "id": "q_s03_009",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下列关于提醒机制的说法，哪个是错误的？",
            "en": "Which statement about the reminder mechanism is incorrect?",
            "ja": "リマインド機構に関する次の説明のうち、誤っているものはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "提醒机制是防漂移的安全网",
                "en": "The reminder mechanism is an anti-drift safety net",
                "ja": "リマインド機構は漂流防止のセーフティネットである"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "提醒机制在模型连续几轮没更新计划时自动触发",
                "en": "The reminder triggers automatically when the model skips plan updates for several turns",
                "ja": "モデルが数ターンプランを更新しないとリマインドが自動発動する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "提醒机制会替模型决定下一步要做什么",
                "en": "The reminder mechanism decides what the model should do next",
                "ja": "リマインド機構がモデルの次のステップを決定する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "提醒机制把模型的注意力拉回到已有计划上",
                "en": "The reminder mechanism redirects the model's attention back to the existing plan",
                "ja": "リマインド機構はモデルの注意を既存プランに引き戻す"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "提醒机制不替模型思考，它只是把模型的注意力拉回到已有计划上。决定下一步做什么仍然是模型自己的职责。",
            "en": "The reminder mechanism does not think for the model. It only redirects attention back to the existing plan. Deciding what to do next remains the model's own responsibility.",
            "ja": "リマインド機構はモデルの代わりに考えません。既存プランへモデルの注意を向け直すだけです。次のステップを決めるのは依然としてモデル自身の責任です。"
          },
          "reward_card": "card_s03_003"
        },
        {
          "id": "q_s03_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "TodoWrite 每次调用时如何更新计划列表？",
            "en": "How does TodoWrite update the plan list on each call?",
            "ja": "TodoWrite は毎回の呼び出しでプランリストをどう更新しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "只追加新任务，不修改已有任务",
                "en": "Only appends new tasks without modifying existing ones",
                "ja": "既存タスクを変更せず新しいタスクだけを追加する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只删除已完成的任务，保留其余不变",
                "en": "Only removes completed tasks and leaves the rest unchanged",
                "ja": "完了済みタスクだけを削除し、残りはそのまま"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "提交整份最新计划列表，旧内容被覆盖",
                "en": "Submits the entire latest plan list; old content is overwritten",
                "ja": "最新のプランリスト全体を送信し、古い内容は上書きされる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "对单个任务做局部 patch，其他任务不受影响",
                "en": "Applies a partial patch to a single task without affecting others",
                "ja": "単一タスクに部分パッチを当て、他のタスクには影響しない"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "每次调用 TodoWrite 时直接提交整份最新计划列表，旧内容被覆盖。整份重写比局部增删改更简单，也不容易出错。",
            "en": "Each TodoWrite call submits the entire latest plan list and overwrites old content. Full rewrites are simpler and less error-prone than incremental operations.",
            "ja": "TodoWrite を呼び出すたびに最新のプランリスト全体を送信し、古い内容を上書きします。全体書き換えは部分的な追加・削除・変更よりシンプルでエラーが少ないです。"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_011",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "与局部增删改相比，整份重写 todo 列表的优点是什么？",
            "en": "Compared to incremental add/delete/update, what is the advantage of full-rewrite?",
            "ja": "部分的な追加・削除・変更と比べて、全体書き換えの利点は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "更简单且不容易出错",
                "en": "Simpler and less error-prone",
                "ja": "よりシンプルでエラーが少ない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "节省网络带宽，传输数据更少",
                "en": "Saves network bandwidth by transmitting less data",
                "ja": "ネットワーク帯域幅を節約し、転送データが少ない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "可以保留历史版本，支持回滚",
                "en": "Preserves history for rollback support",
                "ja": "履歴を保持してロールバックをサポートする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "允许多个 agent 同时写入而不冲突",
                "en": "Allows multiple agents to write simultaneously without conflicts",
                "ja": "複数のエージェントが競合なしに同時に書き込める"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "整份重写比局部增删改更简单不易出错：每次直接提交当前完整状态，不需要追踪每一步的差异操作，逻辑更清晰。",
            "en": "Full rewrites are simpler and less error-prone than incremental operations because you submit the complete current state each time without tracking individual diff operations.",
            "ja": "全体書き換えは部分操作よりシンプルでエラーが少ないです。毎回完全な現在状態を送信するだけで、個々の差分操作を追跡する必要がありません。"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_012",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下关于整份重写策略的说法，哪个是错误的？",
            "en": "Which statement about the full-rewrite strategy is incorrect?",
            "ja": "全体書き換え戦略に関する次の説明のうち、誤っているものはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每次调用 TodoWrite 时提交整份最新计划列表",
                "en": "Each call to TodoWrite submits the entire latest plan list",
                "ja": "TodoWrite を呼び出すたびに最新のプランリスト全体を送信する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "旧内容在新内容写入时被覆盖",
                "en": "Old content is overwritten when new content is written",
                "ja": "新しい内容が書き込まれるときに古い内容が上書きされる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "整份重写比局部增删改更简单不易出错",
                "en": "Full rewrites are simpler and less error-prone than incremental operations",
                "ja": "全体書き換えは部分的な追加・削除・変更よりシンプルでエラーが少ない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "整份重写会保存每次更新的历史记录，方便回溯",
                "en": "Full rewrites save a history of each update for easy backtracking",
                "ja": "全体書き換えは各更新の履歴を保存し、遡りを容易にする"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "整份重写不保存历史：每次调用都用最新的整份列表覆盖旧内容，不支持回溯。它的优点是简单不易出错，而不是历史追踪。",
            "en": "Full rewrite does not save history. Each call overwrites old content with the latest complete list, with no rollback support. Its advantage is simplicity and reduced error risk, not history tracking.",
            "ja": "全体書き換えは履歴を保存しません。毎回の呼び出しで古い内容を最新の完全リストで上書きし、ロールバックはサポートされません。利点はシンプルさとエラー減少であり、履歴追跡ではありません。"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_013",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "TodoWrite 不适合用来做什么？",
            "en": "What is TodoWrite NOT suitable for?",
            "ja": "TodoWrite は何に適していませんか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "跨会话的长期项目任务管理",
                "en": "Long-term project task management across sessions",
                "ja": "セッションをまたぐ長期プロジェクトタスク管理"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在当前会话中规划接下来的步骤",
                "en": "Planning the next steps in the current session",
                "ja": "現在のセッションで次のステップを計画する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "追踪当前会话内的任务完成状态",
                "en": "Tracking task completion status within the current session",
                "ja": "現在のセッション内のタスク完了状態を追跡する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "帮助模型聚焦在下一个执行步骤",
                "en": "Helping the model focus on the next execution step",
                "ja": "モデルが次の実行ステップに集中するのを助ける"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "TodoWrite 仅在当前会话内生效，会话结束后消失。它不适合跨会话的长期项目管理，那需要使用持久化存储方案。",
            "en": "TodoWrite only works within the current session and disappears when the session ends. It is not suitable for cross-session long-term project management, which requires a persistent storage solution.",
            "ja": "TodoWrite は現在のセッション内でのみ有効で、セッション終了後に消えます。セッションをまたぐ長期プロジェクト管理には適しておらず、永続化ストレージが必要です。"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个任务被标记为 in_progress 期间，正确的操作流程是什么？",
            "en": "While a task is marked in_progress, what is the correct operation flow?",
            "ja": "タスクが in_progress の間、正しい操作フローは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "可以同时把其他任务也标记为 in_progress，以提高效率",
                "en": "You can mark other tasks as in_progress simultaneously to improve efficiency",
                "ja": "効率を上げるために他のタスクも同時に in_progress にできる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "完成该任务后，先将其标记为 completed，再开始下一个",
                "en": "After finishing, mark it completed first, then start the next one",
                "ja": "タスクを完了したら先に completed にマークし、次を始める"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "系统会自动将其标记为 completed，无需手动更新",
                "en": "The system automatically marks it completed; no manual update is needed",
                "ja": "システムが自動的に completed にマークするので手動更新は不要"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "不能再调用 TodoWrite，只能等到会话结束",
                "en": "TodoWrite cannot be called again until the session ends",
                "ja": "セッションが終わるまで TodoWrite を再度呼び出せない"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "正确流程是：完成当前 in_progress 任务 → 将其标记为 completed → 再将下一个任务标记为 in_progress。同一时刻只能有一个 in_progress，这是核心约束。",
            "en": "The correct flow: finish the current in_progress task, mark it completed, then mark the next task as in_progress. Only one task can be in_progress at a time; this is the core constraint.",
            "ja": "正しいフロー：現在の in_progress タスクを完了 → completed にマーク → 次のタスクを in_progress にマーク。同時に in_progress は 1 つだけというのが核心制約です。"
          },
          "reward_card": "card_s03_002"
        },
        {
          "id": "q_s03_015",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "TodoWrite 的整份重写策略和以下哪种工程实践最类似？",
            "en": "The full-rewrite strategy of TodoWrite is most similar to which engineering practice?",
            "ja": "TodoWrite の全体書き換え戦略は、次のどのエンジニアリング実践に最も似ていますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "git merge，合并两个分支的差异",
                "en": "git merge, combining diffs from two branches",
                "ja": "2 つのブランチの差分を統合する git merge"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "数据库事务，对多步操作原子性保证",
                "en": "Database transaction guaranteeing atomicity for multi-step operations",
                "ja": "複数ステップの操作に原子性を保証するデータベーストランザクション"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "增量编译，只重新编译变更的文件",
                "en": "Incremental compilation that only recompiles changed files",
                "ja": "変更されたファイルだけを再コンパイルする増分コンパイル"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "无状态 HTTP 请求，每次发送完整参数",
                "en": "Stateless HTTP requests where full parameters are sent each time",
                "ja": "毎回完全なパラメータを送信するステートレス HTTP リクエスト"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "整份重写类似无状态 HTTP 请求：每次都提交完整的当前状态，服务端不需要维护上一次的差量，逻辑简单可靠。",
            "en": "Full rewrite is similar to stateless HTTP requests: you submit the complete current state each time, and the receiver does not need to maintain previous diffs, making the logic simple and reliable.",
            "ja": "全体書き換えはステートレス HTTP リクエストに似ています。毎回完全な現在状態を送信し、受け手は前回の差分を維持する必要がなく、ロジックがシンプルで信頼性があります。"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "有 5 个任务，当前第 3 个是 in_progress，要添加新任务，应该怎么做？",
            "en": "You have 5 tasks, task 3 is in_progress. You need to add a new task. What should you do?",
            "ja": "5 つのタスクがあり、第 3 番が in_progress です。新しいタスクを追加するにはどうすればよいですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "调用 TodoWrite 一次，提交包含新任务的完整 6 个任务列表",
                "en": "Call TodoWrite once, submitting the complete 6-task list including the new one",
                "ja": "TodoWrite を 1 回呼び出し、新しいタスクを含む 6 タスクの完全リストを送信する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "先调用 TodoWrite 删除旧列表，再调用 TodoWrite 写入新列表",
                "en": "First call TodoWrite to delete the old list, then call again to write the new list",
                "ja": "まず TodoWrite を呼んで古いリストを削除し、次に新しいリストを書き込む"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "先完成当前 in_progress 任务才能添加新任务",
                "en": "You must finish the current in_progress task before adding a new one",
                "ja": "新しいタスクを追加する前に現在の in_progress タスクを完了しなければならない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只调用 TodoWrite 一次，只传入新任务，其他任务不变",
                "en": "Call TodoWrite once, passing only the new task; other tasks remain unchanged",
                "ja": "TodoWrite を 1 回呼び出し、新しいタスクだけを渡す。他のタスクは変わらない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "TodoWrite 采用整份重写策略：每次调用都提交完整的当前计划列表。要添加新任务，只需一次调用，提交包含所有原有任务和新任务的完整列表即可。",
            "en": "TodoWrite uses a full-rewrite strategy: each call submits the complete current plan list. To add a new task, make one call submitting a complete list that includes all existing tasks plus the new one.",
            "ja": "TodoWrite は全体書き換え戦略を採用しています。毎回の呼び出しで完全な現在プランリストを送信します。新しいタスクを追加するには、既存すべてのタスクと新タスクを含む完全リストを 1 回の呼び出しで送信するだけです。"
          },
          "reward_card": "card_s03_001"
        },
        {
          "id": "q_s03_017",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪种情形说明 TodoWrite 的提醒机制发挥了作用？",
            "en": "Which scenario demonstrates the TodoWrite reminder mechanism working correctly?",
            "ja": "TodoWrite のリマインド機構が正しく機能している状況はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "模型在执行第 3 步时，系统自动把第 4 步拆分成更小的子任务",
                "en": "While executing step 3, the system automatically breaks step 4 into smaller subtasks",
                "ja": "ステップ 3 の実行中に、システムがステップ 4 をより小さなサブタスクに分割する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型连续 3 轮只写代码没更新 todo，系统提示模型检查并更新计划",
                "en": "After 3 turns of writing code without updating todo, the system prompts the model to check and update the plan",
                "ja": "3 ターン連続でコードだけ書いて todo を更新しないとき、システムがモデルに計画の確認・更新を促す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型把一个 completed 任务重新改回 pending，系统自动拒绝该操作",
                "en": "The model changes a completed task back to pending, and the system automatically rejects it",
                "ja": "モデルが completed タスクを pending に戻そうとしたとき、システムが自動的に拒否する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "会话结束时，系统将未完成的任务自动转移到下一个会话",
                "en": "At session end, the system automatically transfers incomplete tasks to the next session",
                "ja": "セッション終了時に、システムが未完了タスクを次のセッションに自動転送する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "提醒机制在模型连续几轮没更新 todo 时触发，把注意力拉回计划。选项 A 是替模型规划（不符合定义），C 和 D 描述的功能不存在。",
            "en": "The reminder triggers when the model goes several turns without updating the todo, pulling attention back to the plan. Option A describes planning on behalf of the model. Options C and D describe non-existent features.",
            "ja": "リマインドはモデルが数ターン todo を更新しないときに発動し、注意をプランに引き戻します。A はモデルの代わりに計画する（定義に反する）。C と D は存在しない機能です。"
          },
          "reward_card": "card_s03_003"
        },
        {
          "id": "q_s03_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下列哪个选项最准确地描述了 TodoWrite 的四个核心特征？",
            "en": "Which option most accurately describes the four core characteristics of TodoWrite?",
            "ja": "TodoWrite の 4 つの核心特性を最も正確に説明している選択肢はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "持久化、多 agent 共享、局部增删改、无状态约束",
                "en": "Persistent, shared across agents, incremental updates, no state constraints",
                "ja": "永続化、エージェント間共有、部分更新、状態制約なし"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "跨会话持久、无状态限制、支持并发写入、增量更新",
                "en": "Cross-session persistent, no state limits, supports concurrent writes, incremental updates",
                "ja": "セッション横断永続、状態制限なし、並行書き込みサポート、増分更新"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "会话内生效、五种状态、多个 in_progress 允许、局部增删改",
                "en": "Session-scoped, five states, multiple in_progress allowed, incremental updates",
                "ja": "セッション内有効、5 状態、複数 in_progress 許可、部分更新"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "会话内生效、三种状态（pending/in_progress/completed）、in_progress 唯一、整份重写",
                "en": "Session-scoped, three states (pending/in_progress/completed), single in_progress, full rewrite",
                "ja": "セッション内有効、3 状態（pending/in_progress/completed）、in_progress 一意、全体書き換え"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "TodoWrite 的四个核心特征：①只在当前会话内生效；②三种状态 pending/in_progress/completed；③同一时刻只能有一个 in_progress；④每次整份重写，旧内容被覆盖。",
            "en": "TodoWrite has four core characteristics: (1) session-scoped only; (2) three states: pending/in_progress/completed; (3) only one in_progress at a time; (4) full rewrite on every call, overwriting old content.",
            "ja": "TodoWrite の 4 つの核心特性：(1)現在セッション内のみ有効；(2)3 状態 pending/in_progress/completed；(3)同時に in_progress は 1 つだけ；(4)毎回全体書き換えで古い内容を上書き。"
          },
          "reward_card": "card_s03_002"
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
            "zh": "Skill 的核心定义是什么？",
            "en": "What is the core definition of a Skill?",
            "ja": "Skill の核心的な定義は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "跨会话持久化的用户偏好记录",
                "en": "A persistent cross-session record of user preferences",
                "ja": "セッションをまたいで永続化されるユーザー設定の記録"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "项目根目录下的持久配置指令文件",
                "en": "A persistent configuration file at the project root",
                "ja": "プロジェクトルートに置く永続的な設定指示ファイル"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "围绕某类任务的可复用说明书，平时只展示目录，需要时才加载全文",
                "en": "A reusable instruction set for a task type, showing only a summary until full content is needed",
                "ja": "特定タスク向けの再利用可能な手順書。普段は目次だけ見せ、必要時に全文をロードする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型的长期记忆模块，自动积累历史对话",
                "en": "A long-term memory module that automatically accumulates conversation history",
                "ja": "会話履歴を自動蓄積するモデルの長期記憶モジュール"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Skill 是围绕某类任务的可复用说明书，不是记忆也不是 CLAUDE.md。它的关键特性是平时只展示目录（轻量），需要时才把全文注入上下文（按需加载）。",
            "en": "A Skill is a reusable instruction set for a task type, not memory or CLAUDE.md. Its key property is showing only a lightweight summary by default and loading the full content on demand.",
            "ja": "Skill は特定タスク向けの再利用可能な手順書であり、記憶でも CLAUDE.md でもありません。普段は軽量な目次だけ見せ、必要時に全文をロードするのが特徴です。"
          },
          "reward_card": "card_s05_001"
        },
        {
          "id": "q_s05_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "Discovery 阶段放在 system prompt 里的信息是什么？",
            "en": "What information is placed in the system prompt during the Discovery phase?",
            "ja": "Discovery フェーズで system prompt に入れる情報は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Skill 的完整正文内容",
                "en": "The full body content of the Skill",
                "ja": "Skill の全文コンテンツ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "通过 tool_result 注入的 JSON 数据",
                "en": "JSON data injected via tool_result",
                "ja": "tool_result 経由で注入される JSON データ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md 项目指令的摘要副本",
                "en": "A summary copy of CLAUDE.md project instructions",
                "ja": "CLAUDE.md プロジェクト指示のサマリーコピー"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Skill 的名称和简短描述（轻量目录）",
                "en": "The Skill name and short description (lightweight index)",
                "ja": "Skill の名前と短い説明（軽量な目次）"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "Discovery 只需要轻量信息：Skill 的名称和描述放在 system prompt 里，让模型知道有哪些 Skill 可用。完整正文是 Loading 阶段通过 tool_result 注入的，成本更高。",
            "en": "Discovery only needs lightweight info: the Skill name and description go in the system prompt so the model knows what Skills are available. The full body is injected via tool_result during Loading, which is more expensive.",
            "ja": "Discovery に必要なのは軽量情報のみ。Skill の名前と説明を system prompt に入れてモデルに利用可能な Skill を知らせます。全文は Loading フェーズで tool_result 経由で注入され、コストが高くなります。"
          },
          "reward_card": "card_s05_002"
        },
        {
          "id": "q_s05_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "为什么 Loading 比 Discovery 「昂贵」？",
            "en": "Why is Loading more 'expensive' than Discovery?",
            "ja": "なぜ Loading は Discovery より「コストが高い」のですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Loading 需要写入磁盘，Discovery 只在内存里",
                "en": "Loading writes to disk while Discovery stays in memory",
                "ja": "Loading はディスク書き込みが必要で Discovery はメモリ内だけ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Loading 把完整正文通过 tool_result 注入上下文，消耗大量 token",
                "en": "Loading injects the full body via tool_result into the context window, consuming many tokens",
                "ja": "Loading は tool_result 経由で全文をコンテキストに注入するため大量のトークンを消費する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Loading 会同时调用多个 API，有网络延迟",
                "en": "Loading calls multiple APIs simultaneously, causing network latency",
                "ja": "Loading は複数の API を同時呼び出すのでネットワーク遅延が生じる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Loading 需要更新 CLAUDE.md，触发文件 I/O",
                "en": "Loading needs to update CLAUDE.md, triggering file I/O",
                "ja": "Loading は CLAUDE.md を更新するためファイル I/O が発生する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "Loading 的代价是把 Skill 完整正文通过 tool_result 注入上下文窗口，这会占用大量 token。Discovery 只需把名称和描述放进 system prompt，开销极小，两者分离正是为了避免 prompt 臃肿。",
            "en": "The cost of Loading is injecting the Skill's full body via tool_result into the context window, consuming many tokens. Discovery only puts name and description in the system prompt at minimal cost. This separation avoids bloating the prompt.",
            "ja": "Loading のコストは Skill の全文を tool_result 経由でコンテキストウィンドウに注入することで大量のトークンを消費します。Discovery は名前と説明を system prompt に入れるだけで低コスト。この分離がプロンプトの肥大化を防ぎます。"
          },
          "reward_card": "card_s05_003"
        },
        {
          "id": "q_s05_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "SkillRegistry 负责回答哪两个核心问题？",
            "en": "What two core questions does SkillRegistry answer?",
            "ja": "SkillRegistry が答える 2 つの核心的な問いは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "用户是谁，以及他们有什么权限",
                "en": "Who the user is and what permissions they have",
                "ja": "ユーザーが誰で、どんな権限を持つか"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "有哪些 Skill 可用，以及某个 Skill 的完整内容是什么",
                "en": "What Skills are available and what is the full content of a specific Skill",
                "ja": "どの Skill が利用可能か、および特定の Skill の全文は何か"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "上一次会话何时结束，以及记忆里存了什么",
                "en": "When the last session ended and what is stored in memory",
                "ja": "前回セッションがいつ終わったか、記憶に何が保存されているか"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "CLAUDE.md 何时修改，以及修改了哪些行",
                "en": "When CLAUDE.md was modified and which lines changed",
                "ja": "CLAUDE.md がいつ変更され、どの行が変わったか"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "SkillRegistry 统一管理所有 Skill，回答两个问题：有哪些 Skill 可用（目录）以及某个 Skill 的完整内容是什么（全文）。前者用于 Discovery，后者用于 Loading。",
            "en": "SkillRegistry manages all Skills and answers two questions: what Skills are available (the index for Discovery) and what is the full content of a specific Skill (for Loading).",
            "ja": "SkillRegistry は全 Skill を一元管理し、「どの Skill が使えるか（目次、Discovery 用）」と「特定 Skill の全文は何か（Loading 用）」の 2 問に答えます。"
          },
          "reward_card": "card_s05_001"
        },
        {
          "id": "q_s05_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "Skill 和「记忆（Memory）」最本质的区别是什么？",
            "en": "What is the most fundamental difference between a Skill and Memory?",
            "ja": "Skill と Memory（記憶）の最も本質的な違いは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Skill 存在文件里，记忆存在数据库里",
                "en": "Skills are stored in files while memory is stored in a database",
                "ja": "Skill はファイルに、記憶はデータベースに保存される"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Skill 是针对特定任务类型的操作指南（按需加载），记忆是跨会话持久化的信息",
                "en": "A Skill is an on-demand operation guide for a task type; Memory is information persisted across sessions",
                "ja": "Skill は特定タスク向けのオンデマンド操作手順書、Memory はセッション間で永続化される情報"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Skill 只在主包运行，记忆只在分包运行",
                "en": "Skills run only in the main package; memory runs only in sub-packages",
                "ja": "Skill はメインパッケージだけで動き、記憶はサブパッケージだけで動く"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "两者本质相同，只是命名不同",
                "en": "They are essentially the same, just named differently",
                "ja": "本質的には同じで名前が違うだけ"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "Skill 是针对特定任务的操作指南，按需加载一次性使用。记忆是跨会话持久化的信息，两者目的和生命周期完全不同。混淆两者会导致误以为 Skill 能记住历史对话。",
            "en": "A Skill is an operation guide for a specific task type, loaded on demand. Memory is information that persists across sessions. Their purposes and lifecycles are completely different.",
            "ja": "Skill は特定タスク向けの操作手順書でオンデマンドにロードされます。Memory はセッション間で永続化される情報です。目的とライフサイクルが全く異なります。"
          },
          "reward_card": "card_s05_002"
        },
        {
          "id": "q_s05_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果把所有 Skill 的完整正文都直接放进 system prompt，会产生什么问题？",
            "en": "What problem occurs if all Skill full-text content is placed directly in the system prompt?",
            "ja": "全 Skill の全文を system prompt に直接入れるとどんな問題が生じますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "SkillRegistry 无法初始化，系统崩溃",
                "en": "SkillRegistry cannot initialize and the system crashes",
                "ja": "SkillRegistry が初期化できずシステムがクラッシュする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "CLAUDE.md 文件会被覆盖",
                "en": "The CLAUDE.md file gets overwritten",
                "ja": "CLAUDE.md ファイルが上書きされる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "跨会话记忆丢失",
                "en": "Cross-session memory is lost",
                "ja": "セッション間の記憶が失われる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "prompt 臃肿，大量 token 被不常用的 Skill 内容占用，浪费上下文空间",
                "en": "The prompt becomes bloated, with many tokens wasted on rarely used Skill content",
                "ja": "プロンプトが肥大化し、めったに使わない Skill 内容で多くのトークンが無駄になる"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "Discovery 和 Loading 分离的根本原因就是避免 prompt 臃肿。如果所有 Skill 全文都放进 system prompt，每次对话都要消耗大量 token，而大多数 Skill 可能根本用不上。",
            "en": "The fundamental reason for separating Discovery and Loading is to avoid prompt bloat. If all Skill full text is in the system prompt, every conversation wastes many tokens on Skills that may never be used.",
            "ja": "Discovery と Loading を分離する根本的な理由はプロンプトの肥大化を防ぐことです。全 Skill の全文を system prompt に入れると、使われない Skill のために毎回大量のトークンが無駄になります。"
          },
          "reward_card": "card_s05_003"
        },
        {
          "id": "q_s05_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "Skill 的全文内容通过哪种机制注入上下文？",
            "en": "Through what mechanism is a Skill's full content injected into the context?",
            "ja": "Skill の全文コンテンツはどのメカニズムでコンテキストに注入されますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "直接写入 CLAUDE.md 项目配置文件",
                "en": "Written directly into the CLAUDE.md project config file",
                "ja": "CLAUDE.md プロジェクト設定ファイルに直接書き込む"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "通过跨会话记忆模块自动恢复",
                "en": "Automatically restored via the cross-session memory module",
                "ja": "セッション間記憶モジュールで自動復元される"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "通过 tool_result 注入上下文",
                "en": "Injected into the context via tool_result",
                "ja": "tool_result 経由でコンテキストに注入される"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "在 system prompt 初始化时一次性全部加载",
                "en": "All loaded at once during system prompt initialization",
                "ja": "system prompt 初期化時に一括でロードされる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Loading 阶段把 Skill 完整正文通过 tool_result 注入上下文，这是 Discovery/Loading 两层分离设计的关键。Discovery 用 system prompt，Loading 用 tool_result，各司其职。",
            "en": "In the Loading phase, the full Skill content is injected via tool_result. This is the key to the two-layer Discovery/Loading design: Discovery uses system prompt, Loading uses tool_result.",
            "ja": "Loading フェーズでは Skill の全文が tool_result 経由でコンテキストに注入されます。これが Discovery/Loading 二層設計の要点です。Discovery は system prompt、Loading は tool_result を使います。"
          },
          "reward_card": "card_s05_002"
        },
        {
          "id": "q_s05_008",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "CLAUDE.md 和 Skill 最主要的区别是什么？",
            "en": "What is the main difference between CLAUDE.md and a Skill?",
            "ja": "CLAUDE.md と Skill の最大の違いは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "CLAUDE.md 是项目级持久指令，始终加载；Skill 是任务专项操作指南，按需加载",
                "en": "CLAUDE.md is a persistent project-level directive always loaded; Skills are task-specific guides loaded on demand",
                "ja": "CLAUDE.md は常時ロードされるプロジェクトレベルの永続指示、Skill は必要時にロードされるタスク専用ガイド"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "两者完全相同，只是放置位置不同",
                "en": "They are identical, just placed in different locations",
                "ja": "内容は同じで置き場所が違うだけ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md 按需加载，Skill 始终在 system prompt 里",
                "en": "CLAUDE.md is loaded on demand, Skills are always in the system prompt",
                "ja": "CLAUDE.md はオンデマンドで、Skill は常に system prompt にある"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "CLAUDE.md 用于跨会话记忆，Skill 用于实时推理",
                "en": "CLAUDE.md is for cross-session memory, Skills are for real-time reasoning",
                "ja": "CLAUDE.md はセッション間記憶用、Skill はリアルタイム推論用"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "CLAUDE.md 是项目级持久指令，每次会话都会加载。Skill 是针对特定任务类型的操作指南，按需加载。两者生命周期和用途都不同，不能混淆。",
            "en": "CLAUDE.md is a persistent project-level directive loaded every session. Skills are operation guides for specific task types, loaded on demand. Their lifecycles and purposes differ.",
            "ja": "CLAUDE.md は毎セッションでロードされるプロジェクトレベルの永続指示です。Skill は特定タスク向けの操作手順書でオンデマンドにロードされます。ライフサイクルと用途が異なります。"
          },
          "reward_card": "card_s05_003"
        },
        {
          "id": "q_s05_009",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "SkillRegistry 在 Discovery 和 Loading 中分别提供什么？",
            "en": "What does SkillRegistry provide for Discovery vs Loading respectively?",
            "ja": "SkillRegistry は Discovery と Loading にそれぞれ何を提供しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Discovery 提供完整正文，Loading 提供轻量目录",
                "en": "Discovery gets full body, Loading gets lightweight index",
                "ja": "Discovery に全文、Loading に軽量目次を提供"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Discovery 提供跨会话记忆，Loading 提供 CLAUDE.md 副本",
                "en": "Discovery provides cross-session memory, Loading provides a CLAUDE.md copy",
                "ja": "Discovery はセッション間記憶を、Loading は CLAUDE.md のコピーを提供"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Discovery 提供轻量目录（名称+描述），Loading 提供完整正文",
                "en": "Discovery provides a lightweight index (name + description), Loading provides the full body",
                "ja": "Discovery に軽量目次（名前+説明）、Loading に全文を提供"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "两者都提供相同数据，只是调用方式不同",
                "en": "Both provide the same data, just called differently",
                "ja": "両方とも同じデータを提供し、呼び出し方が違うだけ"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "SkillRegistry 统一管理所有 Skill，对 Discovery 提供轻量目录（名称+描述）放入 system prompt；对 Loading 提供完整正文，通过 tool_result 注入。这正是其统一管理的价值所在。",
            "en": "SkillRegistry manages all Skills centrally: for Discovery it provides a lightweight index (name+description) for the system prompt; for Loading it provides the full body injected via tool_result.",
            "ja": "SkillRegistry は全 Skill を一元管理します。Discovery には system prompt 用の軽量目次（名前+説明）を、Loading には tool_result で注入する全文を提供します。"
          },
          "reward_card": "card_s05_001"
        },
        {
          "id": "q_s05_010",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪个场景最能说明 Discovery/Loading 两层分离设计的价值？",
            "en": "Which scenario best illustrates the value of the two-layer Discovery/Loading design?",
            "ja": "Discovery/Loading 二層設計の価値を最もよく示すシナリオはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "模型有 50 个注册的 Skill，但本次对话只调用了其中 2 个，上下文 token 没有被 48 个未用 Skill 的全文占满",
                "en": "The model has 50 registered Skills but only 2 are called in this session; the context is not filled with 48 unused Skills' full text",
                "ja": "モデルに 50 個の Skill が登録されているが今回のセッションで使ったのは 2 つだけ、残り 48 個の全文でコンテキストが埋まらない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "CLAUDE.md 文件变大后，记忆模块自动压缩它",
                "en": "When CLAUDE.md grows large, the memory module auto-compresses it",
                "ja": "CLAUDE.md が大きくなると記憶モジュールが自動圧縮する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "SkillRegistry 崩溃后，系统自动切换到跨会话记忆作为备份",
                "en": "When SkillRegistry crashes, the system switches to cross-session memory as backup",
                "ja": "SkillRegistry がクラッシュするとシステムがセッション間記憶にフォールバックする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "tool_result 失败时，Discovery 接管并完成全文加载",
                "en": "When tool_result fails, Discovery takes over to complete full-text loading",
                "ja": "tool_result が失敗すると Discovery が引き継いで全文ロードを完了させる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Discovery/Loading 两层分离的核心价值就是：注册再多的 Skill，Discovery 只把轻量目录放进 system prompt，只有被实际调用的 Skill 才触发 Loading 消耗 token。这样上下文空间被高效利用。",
            "en": "The core value of the two-layer design: no matter how many Skills are registered, Discovery only puts a lightweight index in the system prompt. Only actually invoked Skills trigger Loading and consume tokens, keeping context efficient.",
            "ja": "二層設計の核心的価値は、どれだけ多くの Skill が登録されていても Discovery は軽量目次を system prompt に入れるだけで、実際に呼ばれた Skill だけが Loading をトリガーしトークンを消費することです。"
          },
          "reward_card": "card_s05_002"
        },
        {
          "id": "q_s05_011",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个新同学说：'我把常用的 Skill 直接写进 CLAUDE.md，这样更方便。'这种做法的问题是什么？",
            "en": "A new team member says: 'I just write common Skills directly into CLAUDE.md for convenience.' What is the problem with this?",
            "ja": "新しいチームメンバーが「よく使う Skill を CLAUDE.md に直接書いた方が便利」と言います。この方法の問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "CLAUDE.md 不支持多语言，Skill 内容会乱码",
                "en": "CLAUDE.md does not support multilingual content, causing garbled Skill content",
                "ja": "CLAUDE.md は多言語をサポートしていないので Skill 内容が文字化けする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "SkillRegistry 无法读取 CLAUDE.md 里的内容",
                "en": "SkillRegistry cannot read content inside CLAUDE.md",
                "ja": "SkillRegistry は CLAUDE.md の内容を読めない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md 每次都全量加载，把 Skill 写进去等于放弃了按需加载的优势，每次会话都浪费大量 token",
                "en": "CLAUDE.md is fully loaded every session; putting Skills there abandons on-demand loading and wastes tokens every session",
                "ja": "CLAUDE.md は毎セッションで全量ロードされるため、Skill を書き込むとオンデマンドの利点を捨てて毎回トークンを無駄にする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这样 Skill 就变成了跨会话记忆，破坏了记忆模块的完整性",
                "en": "This turns Skills into cross-session memory, breaking the memory module's integrity",
                "ja": "これにより Skill がセッション間記憶になり記憶モジュールの整合性が壊れる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "CLAUDE.md 是项目级持久指令，每次会话都全量加载。把 Skill 写进去意味着即使本次根本不需要这些 Skill，它们的全文也会占用 token。这正是 Discovery/Loading 分离要解决的问题。",
            "en": "CLAUDE.md is loaded in full every session. Writing Skills there means their full text occupies tokens even when not needed. This is exactly the problem the Discovery/Loading separation solves.",
            "ja": "CLAUDE.md は毎セッションで全量ロードされます。Skill を書き込むと、使わなくても全文がトークンを占有します。これこそ Discovery/Loading 分離が解決する問題です。"
          },
          "reward_card": "card_s05_003"
        },
        {
          "id": "q_s05_012",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下对 Skill、记忆、CLAUDE.md 三者关系的描述，哪项最准确？",
            "en": "Which description of the relationship between Skills, Memory, and CLAUDE.md is most accurate?",
            "ja": "Skill、Memory、CLAUDE.md の三者関係について最も正確な説明はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "三者本质相同，都是持久化信息，只是粒度不同",
                "en": "All three are essentially persistent information, just at different granularities",
                "ja": "三者は本質的に同じ永続情報で粒度が違うだけ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Skill 是按需加载的操作指南；记忆是跨会话持久化数据；CLAUDE.md 是项目级持久指令",
                "en": "Skills are on-demand operation guides; Memory is cross-session persistent data; CLAUDE.md is a persistent project-level directive",
                "ja": "Skill はオンデマンドの操作手順書、Memory はセッション間永続データ、CLAUDE.md はプロジェクトレベルの永続指示"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Skill 和 CLAUDE.md 相同，记忆是独立的第三类",
                "en": "Skills and CLAUDE.md are the same; Memory is a separate third category",
                "ja": "Skill と CLAUDE.md は同じで、Memory だけが独立した第三のカテゴリ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记忆和 Skill 相同，CLAUDE.md 是独立的第三类",
                "en": "Memory and Skills are the same; CLAUDE.md is a separate third category",
                "ja": "Memory と Skill は同じで、CLAUDE.md だけが独立した第三のカテゴリ"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "三者各有明确定位：Skill 是按需加载的任务操作指南；记忆是跨会话持久化的信息；CLAUDE.md 是项目级持久指令。混淆三者是学习 s05 最常见的错误。",
            "en": "Each has a clear role: Skills are on-demand task guides; Memory is cross-session persistent data; CLAUDE.md is a persistent project directive. Confusing the three is the most common mistake when learning s05.",
            "ja": "三者は明確な役割を持ちます。Skill はオンデマンドのタスク手順書、Memory はセッション間永続データ、CLAUDE.md はプロジェクト永続指示です。三者を混同するのが s05 学習で最もよくある間違いです。"
          },
          "reward_card": "card_s05_001"
        },
        {
          "id": "q_s05_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "如果 SkillRegistry 不存在，Discovery 和 Loading 会面临什么问题？",
            "en": "If SkillRegistry did not exist, what problem would Discovery and Loading face?",
            "ja": "SkillRegistry がなければ、Discovery と Loading はどんな問題に直面しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Discovery 无法区分哪些是 Skill，Loading 不知道去哪里取完整正文",
                "en": "Discovery cannot distinguish Skills, and Loading does not know where to fetch full content",
                "ja": "Discovery はどれが Skill か判別できず、Loading は全文をどこから取得するかわからない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "跨会话记忆会覆盖所有 Skill 内容",
                "en": "Cross-session memory would overwrite all Skill content",
                "ja": "セッション間記憶がすべての Skill 内容を上書きする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md 会自动接管 Skill 的管理职责",
                "en": "CLAUDE.md would automatically take over Skill management",
                "ja": "CLAUDE.md が自動的に Skill 管理を引き継ぐ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "tool_result 会直接把所有 Skill 注入进 system prompt",
                "en": "tool_result would inject all Skills directly into the system prompt",
                "ja": "tool_result がすべての Skill を直接 system prompt に注入する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "SkillRegistry 是统一的管理层：它提供目录（让 Discovery 知道有哪些 Skill）和完整正文（让 Loading 知道去哪里取内容）。没有它，两层设计都会失效。",
            "en": "SkillRegistry is the unified management layer: it provides the index (so Discovery knows what Skills exist) and the full body (so Loading knows where to fetch content). Without it, both layers break down.",
            "ja": "SkillRegistry は統一管理層で、目次（Discovery がどの Skill があるか知るため）と全文（Loading がどこからコンテンツを取得するか知るため）を提供します。なければ両層とも機能しません。"
          },
          "reward_card": "card_s05_002"
        },
        {
          "id": "q_s05_014",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "Skill 的「轻量目录」包含哪些信息？",
            "en": "What information does a Skill's 'lightweight index' contain?",
            "ja": "Skill の「軽量目次」にはどんな情報が含まれますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Skill 的完整正文和所有子步骤",
                "en": "The full body and all sub-steps of the Skill",
                "ja": "Skill の全文とすべてのサブステップ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "上次调用 Skill 的时间戳和结果",
                "en": "Timestamp and result of the last Skill invocation",
                "ja": "最後に Skill を呼び出したタイムスタンプと結果"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md 中与该 Skill 相关的段落",
                "en": "Paragraphs in CLAUDE.md related to this Skill",
                "ja": "CLAUDE.md のその Skill に関連する段落"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Skill 的名称和简短描述",
                "en": "The Skill's name and short description",
                "ja": "Skill の名前と短い説明"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "轻量目录只包含名称和简短描述，这些信息足够让模型知道有哪些 Skill 可用，同时不会大量占用 token。完整正文只在 Loading 阶段才会出现。",
            "en": "The lightweight index only contains name and short description - enough for the model to know what Skills are available without consuming many tokens. Full content only appears at Loading time.",
            "ja": "軽量目次には名前と短い説明だけが含まれます。これだけでモデルはどの Skill が使えるかを把握でき、トークンを大量消費しません。全文は Loading フェーズにのみ現れます。"
          },
          "reward_card": "card_s05_003"
        },
        {
          "id": "q_s05_015",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "Skill 解决的核心问题是什么？",
            "en": "What core problem does Skill solve?",
            "ja": "Skill が解決する核心的な問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "如何在多个会话之间持久化用户数据",
                "en": "How to persist user data across multiple sessions",
                "ja": "複数のセッション間でユーザーデータを永続化する方法"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "如何减少模型的推理错误率",
                "en": "How to reduce the model's reasoning error rate",
                "ja": "モデルの推論エラー率を下げる方法"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "如何把长期可选知识从 system prompt 里拆出来，改成按需加载，节省上下文空间",
                "en": "How to extract optional long-term knowledge from the system prompt and load it on demand to save context space",
                "ja": "長期的なオプション知識を system prompt から切り出してオンデマンドでロードし、コンテキスト空間を節約する方法"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "如何让 CLAUDE.md 在多项目之间共享",
                "en": "How to share CLAUDE.md across multiple projects",
                "ja": "CLAUDE.md を複数プロジェクト間で共有する方法"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Skill 的核心价值在于把长期可选知识从 system prompt 里拆出来，通过 Discovery/Loading 两层设计实现按需加载，避免每次都让不相关的内容占用宝贵的上下文空间。",
            "en": "The core value of Skills is extracting optional long-term knowledge from the system prompt and enabling on-demand loading via the Discovery/Loading two-layer design, preventing irrelevant content from occupying precious context space.",
            "ja": "Skill の核心的価値は、長期的なオプション知識を system prompt から切り出し、Discovery/Loading の二層設計でオンデマンドロードを実現し、無関係なコンテンツが貴重なコンテキスト空間を占有しないようにすることです。"
          },
          "reward_card": "card_s05_001"
        },
        {
          "id": "q_s05_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪种情况下，Skill 的 Discovery 信息会更新，但 Loading 不需要触发？",
            "en": "In which situation is Skill's Discovery information updated but Loading does not need to be triggered?",
            "ja": "Skill の Discovery 情報は更新されるが Loading をトリガーする必要がない状況はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "向 SkillRegistry 新增一个 Skill，但本次对话没有使用它",
                "en": "A new Skill is added to SkillRegistry but not used in the current session",
                "ja": "SkillRegistry に新しい Skill が追加されたが今回のセッションでは使用しない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "用户要求查看某个 Skill 的完整操作步骤",
                "en": "The user requests to see the full operation steps of a Skill",
                "ja": "ユーザーが特定の Skill の完全な操作手順を見たいと要求する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型判断当前任务需要调用某个 Skill",
                "en": "The model determines the current task requires invoking a specific Skill",
                "ja": "モデルが現在のタスクに特定の Skill の呼び出しが必要と判断する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "CLAUDE.md 发生了变更，需要同步到 SkillRegistry",
                "en": "CLAUDE.md changed and needs to be synced to SkillRegistry",
                "ja": "CLAUDE.md が変更されて SkillRegistry に同期する必要がある"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "向 SkillRegistry 添加新 Skill 会更新 Discovery 目录（system prompt 里多出一个条目），但如果本次对话根本不使用它，就不会触发 Loading，全文内容不会注入上下文。这正体现了两层分离的效率优势。",
            "en": "Adding a new Skill to SkillRegistry updates the Discovery index (one more entry in the system prompt), but if it is never used in this session, Loading is never triggered and the full content never enters the context. This shows the efficiency advantage of the two-layer design.",
            "ja": "SkillRegistry に新 Skill を追加すると Discovery 目次が更新されます（system prompt に 1 エントリ追加）が、今回のセッションで使わなければ Loading はトリガーされず全文はコンテキストに入りません。これが二層設計の効率優位性です。"
          },
          "reward_card": "card_s05_002"
        },
        {
          "id": "q_s05_017",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下对 SkillRegistry 作用的描述，哪项是正确的？",
            "en": "Which description of SkillRegistry's role is correct?",
            "ja": "SkillRegistry の役割についての正しい説明はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "SkillRegistry 只负责存储 Skill，不参与 Discovery 或 Loading",
                "en": "SkillRegistry only stores Skills and does not participate in Discovery or Loading",
                "ja": "SkillRegistry は Skill を保存するだけで Discovery や Loading には関与しない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "SkillRegistry 是跨会话记忆的存储后端",
                "en": "SkillRegistry is the storage backend for cross-session memory",
                "ja": "SkillRegistry はセッション間記憶のストレージバックエンド"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "SkillRegistry 是 CLAUDE.md 的运行时解析器",
                "en": "SkillRegistry is the runtime parser for CLAUDE.md",
                "ja": "SkillRegistry は CLAUDE.md のランタイムパーサー"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "SkillRegistry 统一管理所有 Skill，既提供目录供 Discovery 使用，也提供全文供 Loading 使用",
                "en": "SkillRegistry centrally manages all Skills, providing the index for Discovery and the full body for Loading",
                "ja": "SkillRegistry は全 Skill を一元管理し、Discovery 用の目次と Loading 用の全文の両方を提供する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "SkillRegistry 的价值在于统一管理：它是 Discovery（提供目录）和 Loading（提供全文）两个阶段的统一入口，而不仅仅是一个被动存储。",
            "en": "SkillRegistry's value lies in unified management: it is the single entry point for both Discovery (providing the index) and Loading (providing full content), not just passive storage.",
            "ja": "SkillRegistry の価値は一元管理にあります。Discovery（目次の提供）と Loading（全文の提供）両フェーズへの統一入口であり、単なるパッシブなストレージではありません。"
          },
          "reward_card": "card_s05_003"
        },
        {
          "id": "q_s05_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "在 s05 的设计中，哪种说法最能概括 Discovery 和 Loading 分离带来的最终好处？",
            "en": "In the s05 design, which statement best summarizes the ultimate benefit of separating Discovery and Loading?",
            "ja": "s05 の設計において、Discovery と Loading の分離がもたらす最終的なメリットを最もよく表す説明はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "模型可以注册无限多的 Skill，同时保持上下文窗口只装当前任务真正需要的内容",
                "en": "The model can register unlimited Skills while keeping the context window containing only what the current task truly needs",
                "ja": "モデルは無限に Skill を登録でき、同時にコンテキストウィンドウには今のタスクに本当に必要なものだけを保持できる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "记忆模块的存储容量提高了 10 倍",
                "en": "The memory module's storage capacity increases 10x",
                "ja": "記憶モジュールのストレージ容量が 10 倍になる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md 的解析速度提升，每次加载更快",
                "en": "CLAUDE.md parsing speed improves, loading faster each time",
                "ja": "CLAUDE.md のパース速度が上がり毎回のロードが速くなる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "SkillRegistry 不再需要维护，自动与记忆同步",
                "en": "SkillRegistry no longer needs maintenance and auto-syncs with memory",
                "ja": "SkillRegistry のメンテナンスが不要になり自動的に記憶と同期する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Discovery/Loading 两层分离让 Skill 的「注册数量」和「上下文消耗」解耦：无论注册多少 Skill，上下文里只有本次任务实际用到的全文，这才是整个设计的终极价值。",
            "en": "The two-layer separation decouples 'number of registered Skills' from 'context consumption': no matter how many Skills are registered, only the full text of those actually used in the current task enters the context. This is the ultimate value of the design.",
            "ja": "二層分離により「登録 Skill 数」と「コンテキスト消費」が切り離されます。どれだけ多くの Skill を登録しても、現在のタスクで実際に使われたものの全文だけがコンテキストに入ります。これが設計の究極の価値です。"
          },
          "reward_card": "card_s05_001"
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
          "difficulty": 2,
          "stem": {
            "zh": "context window 装的是模型「这一轮」能看到的全部内容。下面哪项描述最准确？",
            "en": "The context window holds everything the model can see in one turn. Which statement is most accurate?",
            "ja": "context window はモデルが 1 ターンで見られる全内容を保持します。最も正確な説明はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "context window 有固定上限，大输出和多轮历史会快速填满它",
                "en": "The context window has a fixed limit; large outputs and multi-turn history fill it quickly",
                "ja": "context window には上限があり、大きな出力と多ターンの履歴ですぐ埋まる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "context window 是无限的，模型可以看到所有历史消息",
                "en": "The context window is unlimited; the model can see all history",
                "ja": "context window は無制限で、全履歴が見える"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "context window 只存储用户消息，不存储工具输出",
                "en": "The context window only stores user messages, not tool outputs",
                "ja": "context window はユーザーメッセージのみ保存し、tool output は含まない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "context window 越大越好，装的内容越多模型性能越高",
                "en": "The larger the context window the better; more content means higher performance",
                "ja": "context window は大きければ大きいほど良く、内容が多いほどモデル性能が高い"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "context window 有固定容量上限，不是无限的。大输出、多轮对话历史都会占用容量，活跃有用的内容才是真正重要的部分，而不是越多越好。",
            "en": "The context window has a fixed capacity limit. Large outputs and multi-turn history consume space. What matters is keeping the actively useful content, not maximizing total content.",
            "ja": "context window には固定の容量上限があります。大きな出力と多ターンの履歴はスペースを消費します。重要なのは有用なコンテンツを保持することであり、量を最大化することではありません。"
          },
          "reward_card": "card_s06_001"
        },
        {
          "id": "q_s06_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "context window 管理的核心原则是什么？",
            "en": "What is the core principle of context window management?",
            "ja": "context window 管理の核心原則は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "尽量保留所有历史消息，确保信息完整",
                "en": "Keep all history to ensure completeness",
                "ja": "情報の完全性を確保するため全履歴を保持する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "定期清空 context window，从头开始新会话",
                "en": "Periodically clear the context window and start fresh",
                "ja": "定期的に context window をクリアして新セッションを開始する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "活跃有用的内容才重要，context 不是越多越好",
                "en": "Actively useful content matters; more context is not always better",
                "ja": "有用なコンテンツが重要。context は多ければ良いというわけではない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "把所有工具输出写入磁盘后直接从 messages 中删除",
                "en": "Write all tool outputs to disk and delete them from messages",
                "ja": "全 tool output をディスクに書き込み messages から削除する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "context window 管理的核心是保持活跃有用的内容，而不是单纯追求容量更大或保留更多。无关的历史内容占用空间，反而降低质量。",
            "en": "The core of context management is keeping actively useful content, not simply maximizing capacity or retention. Irrelevant history wastes space and reduces quality.",
            "ja": "context 管理の核心は有用なコンテンツを保持することです。容量最大化や履歴保持を追い求めるのではなく、不要な履歴はスペースを無駄にし品質を下げます。"
          },
          "reward_card": "card_s06_001"
        },
        {
          "id": "q_s06_003",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "什么情况最能说明「context window 需要主动管理」这一问题？",
            "en": "Which scenario best illustrates why the context window needs active management?",
            "ja": "context window の積極的な管理が必要な理由を最もよく示すシナリオはどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "用户只发了一条短消息，模型直接回复",
                "en": "The user sends one short message and the model replies directly",
                "ja": "ユーザーが短いメッセージを 1 件送り、モデルが直接返答する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "多轮对话加上大量工具调用后，模型开始遗忘早期任务目标",
                "en": "After many turns and tool calls, the model starts forgetting early task goals",
                "ja": "多ターンと多くのツール呼び出しの後、モデルが初期のタスク目標を忘れ始める"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "工具调用失败，需要重试",
                "en": "A tool call fails and needs to be retried",
                "ja": "ツール呼び出しが失敗し、再試行が必要になる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型需要访问网络获取实时数据",
                "en": "The model needs to access the network for real-time data",
                "ja": "モデルがリアルタイムデータのためにネットワークにアクセスする必要がある"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "多轮对话加上大量工具调用会快速填满 context window，导致早期的任务目标被挤出有效范围。这正是需要主动管理、进行压缩的典型场景。",
            "en": "Multi-turn conversations combined with many tool calls rapidly fill the context window, pushing early task goals out of effective range. This is the classic scenario requiring active management and compaction.",
            "ja": "多ターンの会話と多くのツール呼び出しはすぐに context window を満たし、初期のタスク目標を有効範囲から押し出します。これが積極的な管理と圧縮が必要な典型的なシナリオです。"
          },
          "reward_card": "card_s06_001"
        },
        {
          "id": "q_s06_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "工具输出太大时，「大输出持久化」策略要求怎么做？",
            "en": "When tool output is too large, what does the large output persistence strategy require?",
            "ja": "tool output が大きすぎる場合、大出力の永続化戦略では何をすべきですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "把完整内容写入磁盘，messages 中只保留预览和文件路径",
                "en": "Write the full content to disk; keep only a preview and file path in messages",
                "ja": "完全な内容をディスクに書き込み、messages にはプレビューとファイルパスのみ保持する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "把完整内容保留在 messages 中，同时写一份到磁盘作为备份",
                "en": "Keep the full content in messages and write a backup copy to disk",
                "ja": "完全な内容を messages に保持しながら、バックアップをディスクに書き込む"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "把旧的工具结果替换为占位提示，节省空间",
                "en": "Replace old tool results with placeholder text to save space",
                "ja": "古い tool result をプレースホルダーに置き換えてスペースを節約する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "把历史对话压缩成摘要，替换原始 messages",
                "en": "Compress the conversation history into a summary to replace original messages",
                "ja": "会話履歴を要約に圧縮して元の messages を置き換える"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "大输出持久化的做法是：写磁盘存全文 + messages 里只留预览和文件路径。这样模型还能找到完整内容，但 context window 不被大块数据占满。选项 c 是微压缩，选项 d 是完整压缩，都是不同层次的策略。",
            "en": "Large output persistence means writing the full content to disk while keeping only a preview and file path in messages. The model can still locate the full content without the context window being filled by bulk data. Options c and d describe different compression strategies.",
            "ja": "大出力の永続化とは、完全な内容をディスクに書き込み、messages にはプレビューとファイルパスのみ保持することです。モデルは完全な内容を参照できますが、context window は大量データで埋まりません。"
          },
          "reward_card": "card_s06_002"
        },
        {
          "id": "q_s06_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "「大输出写磁盘留预览」这一做法解决的核心问题是什么？",
            "en": "What core problem does writing large output to disk while keeping a preview solve?",
            "ja": "大出力をディスクに書き込みプレビューを残す手法が解決する核心的な問題は何ですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "防止大块 tool_result 占满 context window，同时保留访问完整内容的能力",
                "en": "Prevent large tool_result blocks from filling the context window while retaining access to full content",
                "ja": "大きな tool_result ブロックが context window を埋めるのを防ぎつつ、完全な内容へのアクセスを保持する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "加速工具调用的响应速度",
                "en": "Speed up tool call response time",
                "ja": "ツール呼び出しの応答速度を上げる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把旧的历史对话生成摘要，减少 token 用量",
                "en": "Generate summaries of old conversation history to reduce token usage",
                "ja": "古い会話履歴の要約を生成して token 使用量を削減する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用占位提示替换不重要的旧工具结果",
                "en": "Replace unimportant old tool results with placeholder text",
                "ja": "重要でない古い tool result をプレースホルダーに置き換える"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "大输出写磁盘留预览的目的是防止 tool_result 把 context window 塞满，同时文件路径让模型随时可以读回完整内容。选项 b 是完整压缩，选项 d 是微压缩，属于其他层次的策略。",
            "en": "Writing large output to disk with a preview prevents tool_result from filling the context window, while the file path lets the model read back the full content at any time. Options b and d describe other compression layers.",
            "ja": "大出力をディスクに書き込みプレビューを残すことで、tool_result が context window を埋めるのを防ぎ、ファイルパスでモデルはいつでも完全な内容を読み返せます。"
          },
          "reward_card": "card_s06_002"
        },
        {
          "id": "q_s06_006",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪个场景最适合用「大输出写磁盘留预览」而不是其他压缩策略？",
            "en": "Which scenario best calls for writing large output to disk with a preview rather than other compression strategies?",
            "ja": "他の圧縮戦略ではなく大出力をディスクに書き込みプレビューを残す方法が最も適しているシナリオはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "单次工具调用返回了 50000 字符的 JSON 数据",
                "en": "A single tool call returns 50,000 characters of JSON data",
                "ja": "単一のツール呼び出しが 50,000 文字の JSON データを返す"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "10 轮前的一条工具结果已经不再相关",
                "en": "A tool result from 10 turns ago is no longer relevant",
                "ja": "10 ターン前の tool result がもはや関係ない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "整体对话历史超过了 context window 的 80%",
                "en": "The overall conversation history exceeds 80% of the context window",
                "ja": "全体の会話履歴が context window の 80% を超えている"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用户要求模型记住所有历史步骤",
                "en": "The user wants the model to remember all historical steps",
                "ja": "ユーザーがモデルに全ての履歴ステップを記憶させたい"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "单次工具调用产生超大输出，适合立即写磁盘留预览。选项 b（旧结果不相关）对应微压缩（占位替换），选项 c（历史过长）对应完整压缩（生成摘要）。",
            "en": "A single tool call producing an oversized output is best handled by immediately writing to disk with a preview. Option b calls for micro-compaction; option c calls for full compaction.",
            "ja": "単一のツール呼び出しで超大出力が生じる場合は、すぐにディスクに書き込みプレビューを残すのが最適です。選択肢 b は微圧縮、選択肢 c は完全圧縮に対応します。"
          },
          "reward_card": "card_s06_002"
        },
        {
          "id": "q_s06_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "「微压缩」策略对旧工具结果的处理方式是什么？",
            "en": "How does the micro-compaction strategy handle old tool results?",
            "ja": "微圧縮戦略は古い tool result をどのように処理しますか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "把旧工具结果替换为占位提示，只保留最近几个完整内容",
                "en": "Replace old tool results with placeholders; keep only the most recent ones intact",
                "ja": "古い tool result をプレースホルダーに置き換え、最近のものだけ完全に保持する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "把所有工具结果写入磁盘，messages 中保留预览",
                "en": "Write all tool results to disk and keep previews in messages",
                "ja": "全 tool result をディスクに書き込み、messages にプレビューを保持する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把整段对话历史压缩成一段摘要文字",
                "en": "Compress the entire conversation history into a single summary",
                "ja": "会話履歴全体を 1 つの要約に圧縮する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "删除所有工具调用记录，只保留用户和助手的文字消息",
                "en": "Delete all tool call records; keep only user and assistant text messages",
                "ja": "全ツール呼び出し記録を削除し、ユーザーとアシスタントのテキストメッセージのみ保持する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "微压缩是：只保留最近几个工具结果的完整内容，更旧的替换为占位提示。旧结果不必永远原样保留，占位提示已经足够提示模型。选项 a 是第一层大输出策略，选项 b 是完整压缩。",
            "en": "Micro-compaction means keeping the most recent tool results intact and replacing older ones with placeholders. Old results do not need to be retained verbatim; placeholders give the model sufficient context. Option a is the first-layer strategy; option b is full compaction.",
            "ja": "微圧縮とは、最近の tool result の完全な内容のみ保持し、古いものをプレースホルダーに置き換えることです。古い結果は逐語的に保持する必要はなく、プレースホルダーで十分です。"
          },
          "reward_card": "card_s06_003"
        },
        {
          "id": "q_s06_008",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "微压缩策略的核心假设是什么？",
            "en": "What is the core assumption behind micro-compaction?",
            "ja": "微圧縮戦略の核心的な前提は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "旧工具结果用占位提示替换就足够了，不需要保留原始内容",
                "en": "Replacing old tool results with a placeholder is sufficient; original content is not needed",
                "ja": "古い tool result をプレースホルダーに置き換えるだけで十分で、元の内容は不要"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "旧工具结果原样保留才能保证上下文完整性",
                "en": "Old tool results must be kept verbatim to ensure context completeness",
                "ja": "古い tool result は逐語的に保持しなければ context の完全性が保てない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "工具结果必须全部写入磁盘才算完整管理",
                "en": "All tool results must be written to disk for proper management",
                "ja": "全 tool result をディスクに書き込まなければ適切な管理とは言えない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只要生成摘要，旧工具结果就可以直接丢弃",
                "en": "As long as a summary is generated, old tool results can be discarded entirely",
                "ja": "要約を生成すれば古い tool result はそのまま廃棄できる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "微压缩的核心假设是：旧工具结果已不再直接相关，用占位提示替换已经足够让模型理解发生了什么。不需要写磁盘（那是第一层策略），也不需要生成摘要（那是第三层策略）。",
            "en": "The core assumption of micro-compaction is that old tool results are no longer directly relevant; a placeholder is sufficient for the model to understand what happened. Writing to disk or generating summaries are not needed here.",
            "ja": "微圧縮の核心的な前提は、古い tool result はもはや直接関係なく、プレースホルダーでモデルが何が起きたかを理解するのに十分という点です。"
          },
          "reward_card": "card_s06_003"
        },
        {
          "id": "q_s06_009",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪种情况最适合使用微压缩（占位替换），而不是大输出写磁盘或完整压缩？",
            "en": "Which situation best calls for micro-compaction rather than large-output disk persistence or full compaction?",
            "ja": "大出力のディスク永続化や完全圧縮ではなく、微圧縮が最も適している状況はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "5 轮前调用 grep 返回了中等大小的结果，现在任务已进展到下一步",
                "en": "A grep call 5 turns ago returned a medium-sized result; the task has moved to the next step",
                "ja": "5 ターン前に grep が中程度のサイズの結果を返したが、タスクは次のステップに進んでいる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "单次工具调用返回了 100KB 的文件内容",
                "en": "A single tool call returned 100KB of file content",
                "ja": "単一のツール呼び出しが 100KB のファイル内容を返した"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "整体 context 已经超过 90%，继续工作会触发截断",
                "en": "The overall context is over 90% full; continuing would trigger truncation",
                "ja": "全体の context が 90% を超えており、続けると切り捨てが発生する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用户希望模型总结这次会话并保存到文件",
                "en": "The user wants the model to summarize the session and save it to a file",
                "ja": "ユーザーがモデルにセッションを要約してファイルに保存させたい"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "5 轮前的中等输出已不再直接相关，用占位替换就足够了——这是微压缩的典型场景。选项 a（100KB 大输出）适合第一层写磁盘，选项 b（整体过长）适合第三层完整压缩。",
            "en": "A medium-sized result from 5 turns ago that is no longer relevant is the ideal case for micro-compaction with a placeholder. Option a calls for layer-1 disk persistence; option b calls for layer-3 full compaction.",
            "ja": "5 ターン前の中程度の結果でもはや関係ない場合は、プレースホルダーによる微圧縮の典型的なシナリオです。選択肢 a は第 1 層のディスク永続化、選択肢 b は第 3 層の完全圧縮に適しています。"
          },
          "reward_card": "card_s06_003"
        },
        {
          "id": "q_s06_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "「完整压缩」策略会把历史压缩成摘要。以下哪些内容应该被保留在摘要中？",
            "en": "The full compaction strategy compresses history into a summary. Which of the following should be retained in the summary?",
            "ja": "完全圧縮戦略は履歴を要約に圧縮します。要約に保持すべき内容はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "所有原始工具输出的完整文本",
                "en": "Complete text of all original tool outputs",
                "ja": "全ての元の tool output の完全なテキスト"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "目标、已完成动作、改过的文件、关键决定、未完成事项",
                "en": "Goals, completed actions, modified files, key decisions, and pending items",
                "ja": "目標、完了したアクション、変更したファイル、重要な決定、未完了の事項"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只需要保留最终目标，中间过程可以全部丢弃",
                "en": "Only the final goal needs to be kept; intermediate steps can all be discarded",
                "ja": "最終目標だけを保持すれば良く、中間ステップはすべて破棄できる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用户消息的原文，助手回复可以省略",
                "en": "Original user messages; assistant replies can be omitted",
                "ja": "ユーザーメッセージの原文のみ; アシスタントの返答は省略できる"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "完整压缩的摘要需要涵盖：目标、已完成动作、改过的文件、关键决定、未完成事项。这五类信息保证了模型能从摘要继续工作，而不是丢失上下文。仅保留目标或仅保留用户消息都不够。",
            "en": "A full compaction summary must cover: goals, completed actions, modified files, key decisions, and pending items. These five categories ensure the model can resume work from the summary without losing context.",
            "ja": "完全圧縮の要約には、目標、完了したアクション、変更したファイル、重要な決定、未完了の事項を含める必要があります。これら 5 つのカテゴリがモデルが要約から作業を再開できることを保証します。"
          },
          "reward_card": "card_s06_004"
        },
        {
          "id": "q_s06_011",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "完整压缩（把历史变成摘要）的触发时机是什么？",
            "en": "When should full compaction be triggered?",
            "ja": "完全圧縮はいつトリガーすべきですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "整体上下文太长，继续工作有截断主线目标的风险时",
                "en": "When the overall context is too long and continuing risks truncating the main task goal",
                "ja": "全体的なコンテキストが長すぎて、続けるとメインタスク目標が切り捨てられるリスクがある時"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "每次工具调用之后都应该做一次完整压缩",
                "en": "Full compaction should be done after every tool call",
                "ja": "全てのツール呼び出しの後に完全圧縮を行うべき"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "单条工具返回了超大输出时",
                "en": "When a single tool call returns an oversized output",
                "ja": "単一のツール呼び出しが超大出力を返す時"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "旧工具结果不再相关，需要腾出空间时",
                "en": "When old tool results are no longer relevant and space needs to be freed",
                "ja": "古い tool result がもはや関係なく、スペースを空ける必要がある時"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "完整压缩是最重量级的策略，只在整体 context 过长、继续下去会截断主线目标时才使用。选项 b（超大单次输出）对应第一层写磁盘，选项 d（旧结果不相关）对应微压缩。",
            "en": "Full compaction is the heaviest strategy and is used only when the overall context is too long and continuing would truncate the main task goal. Option b calls for layer-1 disk persistence; option d calls for micro-compaction.",
            "ja": "完全圧縮は最も重いレイヤーの戦略であり、全体的なコンテキストが長すぎて継続するとメインタスク目標が切り捨てられる場合にのみ使用します。"
          },
          "reward_card": "card_s06_004"
        },
        {
          "id": "q_s06_012",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "完整压缩「不是丢失信息，而是保留继续工作真正需要的部分」。以下哪项最能体现这一思想？",
            "en": "Full compaction is not losing information but retaining what is truly needed to continue working. Which option best reflects this idea?",
            "ja": "完全圧縮は情報を失うのではなく、作業を継続するために本当に必要な部分を保持することです。どの選択肢がこの考えを最もよく反映していますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "摘要应包含所有原始工具输出的逐字记录",
                "en": "The summary should include verbatim records of all original tool outputs",
                "ja": "要約には全ての元の tool output の逐語記録を含めるべき"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "摘要只需包含用户的最终指令，其他内容都是噪声",
                "en": "The summary only needs the user's final instruction; everything else is noise",
                "ja": "要約にはユーザーの最終指示のみが必要で、他は全てノイズ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "摘要保留目标和关键决定，让模型可以从摘要出发继续完成任务",
                "en": "The summary retains goals and key decisions so the model can continue the task from the summary",
                "ja": "要約は目標と重要な決定を保持し、モデルが要約からタスクを継続できるようにする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "压缩后应重新调用所有工具来恢复状态",
                "en": "After compaction, all tools should be recalled to restore state",
                "ja": "圧縮後は全ツールを再呼び出しして状態を復元すべき"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "完整压缩的精髓是摘要保留「继续工作真正需要的」内容——目标、关键决定、已完成事项等。这样模型能从摘要直接继续，而不是从头再来。逐字保留原始内容违背了压缩的目的。",
            "en": "The essence of full compaction is that the summary retains what is truly needed to continue: goals, key decisions, completed items. The model can resume directly from the summary rather than starting over. Verbatim retention defeats the purpose.",
            "ja": "完全圧縮の本質は、要約が継続に本当に必要な内容（目標、重要な決定、完了した事項）を保持することです。モデルは要約から直接作業を再開できます。"
          },
          "reward_card": "card_s06_004"
        },
        {
          "id": "q_s06_013",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "三层压缩策略的正确顺序（从局部到整体）是什么？",
            "en": "What is the correct order of the three-layer compression strategy from local to global?",
            "ja": "3 層圧縮戦略の正しい順序（局所から全体へ）は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "①大输出写磁盘留预览 → ②旧结果占位替换 → ③历史生成摘要",
                "en": "1. Write large output to disk with preview -> 2. Replace old results with placeholders -> 3. Generate summary of history",
                "ja": "1. 大出力をディスクに書き込みプレビューを残す -> 2. 古い結果をプレースホルダーに置き換える -> 3. 履歴の要約を生成する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "①历史生成摘要 → ②旧结果占位替换 → ③大输出写磁盘留预览",
                "en": "1. Generate summary of history -> 2. Replace old results with placeholders -> 3. Write large output to disk with preview",
                "ja": "1. 履歴の要約を生成 -> 2. 古い結果をプレースホルダーに置き換える -> 3. 大出力をディスクに書き込みプレビューを残す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "①旧结果占位替换 → ②大输出写磁盘留预览 → ③历史生成摘要",
                "en": "1. Replace old results with placeholders -> 2. Write large output to disk with preview -> 3. Generate summary of history",
                "ja": "1. 古い結果をプレースホルダーに置き換える -> 2. 大出力をディスクに書き込みプレビューを残す -> 3. 履歴の要約を生成する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "①大输出写磁盘留预览 → ②历史生成摘要 → ③旧结果占位替换",
                "en": "1. Write large output to disk with preview -> 2. Generate summary of history -> 3. Replace old results with placeholders",
                "ja": "1. 大出力をディスクに書き込みプレビューを残す -> 2. 履歴の要約を生成 -> 3. 古い結果をプレースホルダーに置き換える"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "三层顺序从局部到整体：第一层处理单次大输出（写磁盘留预览），第二层处理旧工具结果（占位替换），第三层处理整体 context 过长（生成摘要）。由浅入深，按需组合。",
            "en": "The three layers go from local to global: layer 1 handles single large outputs, layer 2 handles old tool results, layer 3 handles overall context length. Applied incrementally as needed.",
            "ja": "3 層は局所から全体へ: 第 1 層は単一の大出力、第 2 層は古い tool result、第 3 層は全体の context 長を処理します。"
          },
          "reward_card": "card_s06_005"
        },
        {
          "id": "q_s06_014",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "三层压缩策略的设计思路是什么？",
            "en": "What is the design philosophy behind the three-layer compression strategy?",
            "ja": "3 層圧縮戦略の設計思想は何ですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "由浅入深，按需组合，共同保持 context 健康",
                "en": "From shallow to deep, combine as needed, collectively keep context healthy",
                "ja": "浅いものから深いものへ、必要に応じて組み合わせ、共に context を健全に保つ"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "三层必须同时使用，单独使用任何一层都无效",
                "en": "All three layers must be used simultaneously; using any one alone is ineffective",
                "ja": "3 層は同時に使用しなければならず、単独では効果がない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第三层（摘要）是唯一真正有效的策略，前两层只是辅助",
                "en": "The third layer is the only truly effective strategy; the first two are auxiliary",
                "ja": "第 3 層だけが真に効果的な戦略で、前の 2 層は補助的なもの"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "每次会话开始时先做完整压缩，再逐步添加新内容",
                "en": "Perform full compaction at the start of each session before adding new content",
                "ja": "各セッションの開始時に完全圧縮を行ってから新しいコンテンツを追加する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "三层压缩由浅入深：第一层针对单次大输出，第二层针对旧工具结果，第三层针对整体历史过长。三者可按需独立或组合使用，共同维护 context 健康，不需要全部同时启用。",
            "en": "The three layers range from shallow to deep: layer 1 for single large outputs, layer 2 for old tool results, layer 3 for overall history length. They can be used independently or combined as needed to maintain context health.",
            "ja": "3 層は浅いものから深いものへ。必要に応じて単独または組み合わせて使用でき、context を健全に保ちます。"
          },
          "reward_card": "card_s06_005"
        },
        {
          "id": "q_s06_015",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "同时面对「单次工具返回大输出」和「整体 context 接近上限」两个问题，应该怎么处理？",
            "en": "When facing both a single tool returning large output and overall context near the limit, what should you do?",
            "ja": "単一ツールが大出力を返した場合と全体の context が上限に近い場合に同時に直面したとき、どうすべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "只做完整压缩（摘要），忽略大输出问题",
                "en": "Only do full compaction, ignore the large output issue",
                "ja": "完全圧縮のみを行い、大出力の問題は無視する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "先把大输出写磁盘留预览（第一层），同时或随后做完整压缩（第三层）",
                "en": "First write large output to disk with preview (layer 1), then also apply full compaction (layer 3)",
                "ja": "まず大出力をディスクに書き込みプレビューを残し（第 1 層）、次に完全圧縮も適用する（第 3 層）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只做微压缩（占位替换），两个问题都可以解决",
                "en": "Only do micro-compaction; it solves both problems",
                "ja": "微圧縮のみ行えば両方の問題が解決できる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这种情况无法处理，只能重启会话",
                "en": "This situation cannot be handled; you can only restart the session",
                "ja": "この状況は処理できず、セッションを再起動するしかない"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "三层策略可以按需组合：大输出问题用第一层（写磁盘留预览），整体 context 过长用第三层（生成摘要）。两者可以同时或先后应用，这正是「按需组合」的设计意图。",
            "en": "The three layers can be combined as needed: large output calls for layer 1; overall context length calls for layer 3. Both can be applied simultaneously or in sequence, which is the intent of combining as needed.",
            "ja": "3 層は必要に応じて組み合わせられます。大出力には第 1 層、全体の context 長には第 3 層を適用できます。"
          },
          "reward_card": "card_s06_005"
        },
        {
          "id": "q_s06_016",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪个说法正确描述了三层压缩策略中「预览」的作用？",
            "en": "Which statement correctly describes the role of a preview in the three-layer compression strategy?",
            "ja": "3 層圧縮戦略におけるプレビューの役割を正しく説明しているのはどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "预览让模型知道磁盘上有完整内容可以读取，而不必把大块数据放进 messages",
                "en": "The preview lets the model know full content is available on disk without putting bulk data in messages",
                "ja": "プレビューにより、モデルはメッセージに大量データを入れることなく、ディスクに完全なコンテンツがあることを知れる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "预览是整个输出的等价替代，不需要再读磁盘文件",
                "en": "The preview is an equivalent substitute for the full output; no need to read the disk file",
                "ja": "プレビューは完全な出力の等価な代替であり、ディスクファイルを読む必要はない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "预览只是装饰性的，不影响模型的理解",
                "en": "The preview is decorative and does not affect model understanding",
                "ja": "プレビューは装飾的なものでモデルの理解に影響しない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "预览就是占位提示，和微压缩中的占位符功能相同",
                "en": "The preview is the same as a placeholder; it has the same function as micro-compaction placeholders",
                "ja": "プレビューはプレースホルダーと同じで、微圧縮のプレースホルダーと同じ機能を持つ"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "预览的作用是在 messages 中给出一个简短提示（包含文件路径），让模型知道完整内容在磁盘上，需要时可以读取。这样 context window 不被大块数据占满，同时完整内容也没有丢失。",
            "en": "The preview provides a brief notice in messages including the file path, so the model knows the full content is on disk and can retrieve it when needed. This prevents the context window from being filled while preserving full content.",
            "ja": "プレビューの役割は、messages に簡潔な通知（ファイルパスを含む）を提供し、完全なコンテンツがディスク上にあることをモデルが知り、必要時に取得できるようにすることです。"
          },
          "reward_card": "card_s06_002"
        },
        {
          "id": "q_s06_017",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "「活跃上下文」和「context window 总容量」有什么区别？",
            "en": "What is the difference between active context and total context window capacity?",
            "ja": "アクティブコンテキストと context window の総容量の違いは何ですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "总容量是硬件上限，活跃上下文是其中真正影响当前工作的有用部分",
                "en": "Total capacity is the hard limit; active context is the useful portion that truly affects current work",
                "ja": "総容量はハード上限、アクティブコンテキストはその中で現在の作業に真に影響する有用な部分"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "两者完全相同，活跃上下文就是 context window 的全部内容",
                "en": "They are identical; active context is all the content in the context window",
                "ja": "両者は同一で、アクティブコンテキストは context window の全内容"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "活跃上下文是用户当前正在输入的消息，总容量包含历史",
                "en": "Active context is the user's current input; total capacity includes history",
                "ja": "アクティブコンテキストはユーザーが現在入力しているメッセージ、総容量は履歴を含む"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "活跃上下文是压缩后的摘要，总容量是压缩前的原始内容",
                "en": "Active context is the compressed summary; total capacity is the original pre-compression content",
                "ja": "アクティブコンテキストは圧縮後の要約、総容量は圧縮前の元のコンテンツ"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "context window 总容量是模型能处理的硬性上限，活跃上下文是其中真正有用、真正影响当前工作的部分。好的 context 管理就是让活跃有用的比例更高，而不是盲目追求填满总容量。",
            "en": "The total context window capacity is the hard limit of what the model can process. Active context is the useful portion that truly affects current work. Good context management maximizes the ratio of actively useful content.",
            "ja": "context window の総容量はモデルが処理できるハード上限です。アクティブコンテキストはその中で現在の作業に真に影響する有用な部分です。"
          },
          "reward_card": "card_s06_001"
        },
        {
          "id": "q_s06_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "完整压缩生成的摘要里没有包含「已修改的文件列表」。这会带来什么风险？",
            "en": "A full compaction summary omits the list of modified files. What risk does this create?",
            "ja": "完全圧縮の要約に変更されたファイルのリストが含まれていない場合、どのようなリスクが生じますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "没有风险，摘要只需要目标和决定，文件列表不重要",
                "en": "No risk; a summary only needs goals and decisions; the file list is not important",
                "ja": "リスクなし。要約には目標と決定だけが必要で、ファイルリストは重要でない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型可能重复修改同一文件，或不知道哪些文件已经改过，导致工作出错",
                "en": "The model may re-modify the same files or not know which files were already changed, causing errors",
                "ja": "モデルが同じファイルを再修正したり、どのファイルが既に変更されたか分からなくなり、エラーが発生する可能性がある"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "摘要会自动从磁盘读取文件列表，不需要手动包含",
                "en": "The summary will automatically read the file list from disk; no need to include it manually",
                "ja": "要約は自動的にディスクからファイルリストを読み取るため、手動で含める必要はない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "context window 会因此更快被填满",
                "en": "The context window will fill up faster as a result",
                "ja": "その結果、context window がより早く埋まる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "已修改的文件列表是完整压缩摘要中的关键信息。缺少它，模型在后续步骤中无法判断哪些文件已经改过，可能重复修改或遗漏，导致任务出错。这也正是五类摘要要素缺一不可的原因。",
            "en": "The list of modified files is essential in a full compaction summary. Without it, the model cannot determine which files have been changed in subsequent steps, potentially causing duplicate modifications or omissions.",
            "ja": "変更されたファイルのリストは完全圧縮の要約において重要な情報です。それがないと、モデルは後続のステップでどのファイルが変更されたか判断できず、重複修正や見落としが発生する可能性があります。"
          },
          "reward_card": "card_s06_004"
        },
        {
          "id": "q_s06_019",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪项对三层压缩策略的描述是错误的？",
            "en": "Which of the following descriptions of the three-layer compression strategy is INCORRECT?",
            "ja": "3 層圧縮戦略の説明として誤っているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "第一层处理单次工具产生的大输出，做法是写磁盘留预览",
                "en": "Layer 1 handles large output from a single tool call by writing to disk with a preview",
                "ja": "第 1 層は単一ツール呼び出しの大出力をディスクへの書き込みとプレビュー保持で処理する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "第二层对旧工具结果做占位替换，节省 context 空间",
                "en": "Layer 2 replaces old tool results with placeholders to save context space",
                "ja": "第 2 層は古い tool result をプレースホルダーに置き換えて context スペースを節約する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "三层策略必须按顺序全部执行，不能单独使用其中一层",
                "en": "All three layers must be executed in order; no single layer can be used alone",
                "ja": "3 層は順番通りに全て実行しなければならず、単独で 1 層だけ使用することはできない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "第三层对整体历史过长时生成摘要，作为新起点",
                "en": "Layer 3 generates a summary when overall history is too long, serving as a new starting point",
                "ja": "第 3 層は全体的な履歴が長すぎる場合に要約を生成し、新しい出発点とする"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "三层压缩策略的设计理念是「按需组合」，不要求全部执行。可以只用第一层，也可以只用第三层，或根据实际情况组合使用。说「必须全部执行」是错误的。",
            "en": "The three-layer compression strategy is designed to be combined as needed, not executed in full every time. Any single layer can be used independently, or they can be combined based on the situation.",
            "ja": "3 層圧縮戦略は必要に応じて組み合わせるよう設計されており、全てを実行することは必須ではありません。"
          },
          "reward_card": "card_s06_005"
        },
        {
          "id": "q_s06_020",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "完整压缩（第三层）与微压缩（第二层）最本质的区别是什么？",
            "en": "What is the most fundamental difference between full compaction and micro-compaction?",
            "ja": "完全圧縮と微圧縮の最も本質的な違いは何ですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "微压缩只替换个别旧工具结果；完整压缩对整段历史生成摘要作为新起点",
                "en": "Micro-compaction only replaces individual old tool results; full compaction generates a summary of the entire history as a new starting point",
                "ja": "微圧縮は個々の古い tool result を置き換えるだけ; 完全圧縮は履歴全体の要約を新しい出発点として生成する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "微压缩是写磁盘，完整压缩是占位替换",
                "en": "Micro-compaction writes to disk; full compaction uses placeholder replacement",
                "ja": "微圧縮はディスクへの書き込み; 完全圧縮はプレースホルダー置き換え"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "完整压缩比微压缩消耗更多 context，不建议频繁使用",
                "en": "Full compaction consumes more context than micro-compaction and should not be used frequently",
                "ja": "完全圧縮は微圧縮より多くの context を消費し、頻繁に使用すべきでない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "两者效果完全相同，只是操作方式不同",
                "en": "Both have identical effects; only the operation method differs",
                "ja": "両者の効果は全く同じで、操作方法が異なるだけ"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "微压缩（第二层）是局部操作：只替换个别旧工具结果为占位提示。完整压缩（第三层）是全局操作：把整段历史压缩成摘要，作为继续工作的新起点。两者作用范围和机制都不同。",
            "en": "Micro-compaction is a local operation replacing individual old tool results with placeholders. Full compaction is a global operation compressing the entire history into a summary as a new starting point. They differ in both scope and mechanism.",
            "ja": "微圧縮は局所的な操作で、個々の古い tool result をプレースホルダーに置き換えます。完全圧縮はグローバルな操作で、履歴全体を要約に圧縮して新しい出発点とします。"
          },
          "reward_card": "card_s06_003"
        },
        {
          "id": "q_s06_021",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个 agent 正在做大型代码重构任务，已经执行了 30 轮工具调用。context 用量达到 85%，最近 5 轮有 3 个超大文件读取结果。应该优先选择哪个策略组合？",
            "en": "An agent doing large code refactoring has executed 30 tool calls. Context usage is at 85% and 3 of the last 5 turns had oversized file read results. Which strategy combination should be prioritized?",
            "ja": "大規模なコードリファクタリングを行うエージェントが 30 ターンのツール呼び出しを実行しました。context 使用量は 85% で、直近 5 ターンのうち 3 つで超大ファイル読み取り結果がありました。どの戦略の組み合わせを優先すべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "只用微压缩，把 30 轮的工具结果全部占位替换",
                "en": "Use only micro-compaction to replace all 30 turns of tool results with placeholders",
                "ja": "微圧縮のみを使用して、30 ターン全ての tool result をプレースホルダーに置き換える"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "先把 3 个超大文件结果写磁盘留预览（第一层），再对整段历史做完整压缩（第三层）",
                "en": "First write the 3 oversized file results to disk with previews (layer 1), then apply full compaction to the entire history (layer 3)",
                "ja": "まず 3 つの超大ファイル結果をディスクに書き込みプレビューを残し（第 1 層）、次に履歴全体に完全圧縮を適用する（第 3 層）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "重启会话，重新开始任务",
                "en": "Restart the session and redo the task from scratch",
                "ja": "セッションを再起動してタスクを最初からやり直す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只做完整压缩（第三层），不需要单独处理超大文件",
                "en": "Only apply full compaction; no need to handle oversized files separately",
                "ja": "完全圧縮のみ適用し、超大ファイルは個別に処理する必要はない"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "这个场景同时有两个问题：3 个超大文件读取结果（第一层问题）+ 整体 context 85% 将满（第三层问题）。正确做法是组合：先用第一层（写磁盘留预览）处理超大输出，再用第三层（完整压缩）处理整体过长。",
            "en": "This scenario has two problems: 3 oversized file read results (a layer-1 problem) and overall context at 85% (a layer-3 problem). The correct approach combines layer 1 for oversized outputs then layer 3 for overall length.",
            "ja": "このシナリオには 2 つの問題があります: 3 つの超大ファイル読み取り結果（第 1 層の問題）と全体の context が 85%（第 3 層の問題）。第 1 層と第 3 層を組み合わせて対処します。"
          },
          "reward_card": "card_s06_005"
        },
        {
          "id": "q_s06_022",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下对「压缩」的理解，哪项是正确的？",
            "en": "Which of the following understandings of compaction is correct?",
            "ja": "圧縮についての以下の理解のうち、正しいのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "压缩等于删除，丢掉的信息以后无法恢复",
                "en": "Compaction equals deletion; lost information cannot be recovered",
                "ja": "圧縮は削除と同じで、失われた情報は復元できない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "压缩只适用于文本内容，代码和工具输出不能压缩",
                "en": "Compaction only applies to text content; code and tool outputs cannot be compacted",
                "ja": "圧縮はテキストコンテンツにのみ適用され、コードと tool output は圧縮できない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "压缩是保留继续工作真正需要的部分，而不是简单丢弃信息",
                "en": "Compaction retains what is truly needed to continue working, rather than simply discarding information",
                "ja": "圧縮は単に情報を廃棄するのではなく、作業を継続するために本当に必要な部分を保持すること"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "压缩后 context window 会被完全清空，从全新状态开始",
                "en": "After compaction the context window is completely cleared and starts from a blank state",
                "ja": "圧縮後は context window が完全にクリアされ、白紙の状態から始まる"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "压缩的本质不是丢弃信息，而是保留「继续工作真正需要的部分」：目标、决定、已完成事项等。无论是写磁盘留预览（第一层）、占位替换（第二层）还是摘要（第三层），都是在保留有用信息的前提下节省 context 空间。",
            "en": "Compaction is not about discarding information but about retaining what is truly needed to continue: goals, decisions, completed items. All three layers preserve useful information while saving context space.",
            "ja": "圧縮の本質は情報を廃棄することではなく、継続に本当に必要な部分（目標、決定、完了した事項など）を保持することです。3 層全てが有用な情報を保持しながら context スペースを節約します。"
          },
          "reward_card": "card_s06_005"
        }
      ]
,
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
            "zh": "权限管道的第一步是什么？",
            "en": "What is the first step in the permission pipeline?",
            "ja": "権限パイプラインの最初のステップは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "检查 deny rules，拦截危险操作",
                "en": "Check deny rules to block dangerous operations",
                "ja": "deny rules を確認して危険な操作をブロックする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "询问用户是否允许",
                "en": "Ask the user for permission",
                "ja": "ユーザーに許可を求める"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "检查 allow rules，自动放行",
                "en": "Check allow rules to auto-approve",
                "ja": "allow rules を確認して自動承認する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "判断当前是哪种权限模式",
                "en": "Determine the current permission mode",
                "ja": "現在の権限モードを判定する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "权限管道四步顺序是：先 deny rules 拦截危险操作，再看当前模式，再看 allow rules，最后才问用户。deny rules 是第一道关卡，确保危险操作最先被拦截。",
            "en": "The pipeline order is: deny rules first, then mode check, then allow rules, then ask user. deny rules act as the first gate to block dangerous operations immediately.",
            "ja": "パイプラインの順序は deny rules、モード確認、allow rules、ユーザー確認の順です。deny rules が最初のゲートとして危険な操作を即座にブロックします。"
          },
          "reward_card": "card_s07_001"
        },
        {
          "id": "q_s07_002",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "工具调用请求到达后，权限管道的正确执行顺序是？",
            "en": "After a tool call arrives, what is the correct order of the permission pipeline?",
            "ja": "ツール呼び出しが届いた後、権限パイプラインの正しい実行順序は？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "allow rules → deny rules → 当前模式 → 询问用户",
                "en": "allow rules -> deny rules -> mode check -> ask user",
                "ja": "allow rules -> deny rules -> モード確認 -> ユーザー確認"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "deny rules → 当前模式 → allow rules → 询问用户",
                "en": "deny rules -> mode check -> allow rules -> ask user",
                "ja": "deny rules -> モード確認 -> allow rules -> ユーザー確認"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "当前模式 → deny rules → allow rules → 询问用户",
                "en": "mode check -> deny rules -> allow rules -> ask user",
                "ja": "モード確認 -> deny rules -> allow rules -> ユーザー確認"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "询问用户 → deny rules → allow rules → 当前模式",
                "en": "ask user -> deny rules -> allow rules -> mode check",
                "ja": "ユーザー確認 -> deny rules -> allow rules -> モード確認"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "正确顺序是 deny→模式→allow→问用户。deny rules 最先执行，确保危险操作第一时间被拦截；allow rules 放行安全操作，避免打扰用户；只有两类规则都未命中才会询问用户。",
            "en": "The correct order is deny->mode->allow->ask user. deny rules run first to catch dangerous operations immediately; allow rules approve safe ones without bothering the user; the user is only asked as a last resort.",
            "ja": "正しい順序は deny->モード->allow->ユーザー確認です。deny rules が最初に実行されて危険な操作を即座に捕捉し、allow rules が安全な操作を承認してユーザーを煩わせず、どちらにも該当しない場合のみユーザーに確認します。"
          },
          "reward_card": "card_s07_001"
        },
        {
          "id": "q_s07_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在权限管道中，allow rules 的作用是什么？",
            "en": "What is the role of allow rules in the permission pipeline?",
            "ja": "権限パイプラインにおいて allow rules の役割は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "拦截危险操作，阻止执行",
                "en": "Block dangerous operations from executing",
                "ja": "危険な操作をブロックして実行を阻止する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "决定当前是 plan 模式还是 auto 模式",
                "en": "Determine whether the current mode is plan or auto",
                "ja": "現在のモードが plan か auto かを決定する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "让安全操作自动通过，不再询问用户",
                "en": "Auto-approve safe operations so the user is not asked",
                "ja": "安全な操作を自動承認してユーザーへの確認を省略する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记录操作日志供审计使用",
                "en": "Log operations for audit purposes",
                "ja": "監査用に操作ログを記録する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "allow rules 负责识别已知安全的操作并自动放行，避免对每次无害操作都打扰用户。拦截危险操作是 deny rules 的职责，模式判断是独立的第二步。",
            "en": "allow rules identify known-safe operations and approve them automatically, avoiding interrupting the user for every harmless action. Blocking dangerous ops is deny rules' job; mode checking is a separate second step.",
            "ja": "allow rules は既知の安全な操作を識別して自動承認し、無害なアクションごとにユーザーを中断させないようにします。危険な操作のブロックは deny rules の役割で、モード確認は独立した第 2 ステップです。"
          },
          "reward_card": "card_s07_001"
        },
        {
          "id": "q_s07_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "plan 模式下，写操作（write_file 等）会怎样处理？",
            "en": "In plan mode, how are write operations (e.g., write_file) handled?",
            "ja": "plan モードでは、書き込み操作（write_file など）はどのように処理されますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先询问用户，再决定是否执行",
                "en": "Ask the user first, then decide whether to execute",
                "ja": "まずユーザーに確認してから実行するかどうか決める"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "由 allow rules 决定是否放行",
                "en": "allow rules decide whether to approve",
                "ja": "allow rules が承認するかどうかを決める"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只记录意图，延迟到会话结束再统一执行",
                "en": "Record intent only, execute all at once at session end",
                "ja": "意図のみ記録し、セッション終了時にまとめて実行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "直接被拒绝，不允许任何写操作",
                "en": "Directly rejected; no write operations are allowed",
                "ja": "直接拒否され、書き込み操作は一切許可されない"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "plan 模式的核心特征是只允许读操作、阻止所有写操作。这确保 Claude 在规划阶段只能收集信息而无法改变系统状态，是三种模式中限制最严格的。",
            "en": "The defining feature of plan mode is allowing only reads and blocking all writes. This ensures Claude can only gather information during planning without changing system state -- the most restrictive of the three modes.",
            "ja": "plan モードの核心的な特徴は読み取り操作のみを許可し、すべての書き込み操作をブロックすることです。これにより Claude は計画段階で情報収集のみが可能でシステム状態を変更できず、3 つのモードの中で最も制限が厳しいです。"
          },
          "reward_card": "card_s07_002"
        },
        {
          "id": "q_s07_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "auto 模式与 default 模式的核心区别是什么？",
            "en": "What is the key difference between auto mode and default mode?",
            "ja": "auto モードと default モードの核心的な違いは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "auto 模式让安全操作自动通过，危险操作才询问；default 模式未命中规则就询问",
                "en": "auto mode auto-approves safe ops and only asks for dangerous ones; default mode asks whenever no rule matches",
                "ja": "auto モードは安全な操作を自動承認して危険な操作のみ確認し、default モードはルールに一致しない場合に確認する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "auto 模式完全不需要权限系统，所有操作直接执行",
                "en": "auto mode bypasses the permission system entirely",
                "ja": "auto モードは権限システムを完全にバイパスする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "default 模式只允许读操作，auto 模式允许读写",
                "en": "default mode only allows reads; auto mode allows reads and writes",
                "ja": "default モードは読み取りのみ許可し、auto モードは読み書きを許可する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "auto 模式下 deny rules 不生效",
                "en": "deny rules do not apply in auto mode",
                "ja": "auto モードでは deny rules が適用されない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "default 模式下，未命中任何规则的操作都会询问用户；auto 模式则让 allow rules 覆盖更多安全操作，只有真正危险的操作才打扰用户。两种模式都经过完整的权限管道，deny rules 依然有效。",
            "en": "In default mode, any operation not matched by a rule prompts the user; in auto mode allow rules cover more safe operations so only genuinely dangerous ones ask the user. Both modes still run through the full pipeline and deny rules still apply.",
            "ja": "default モードではルールに一致しない操作がユーザーに確認を求め、auto モードでは allow rules がより多くの安全な操作をカバーして本当に危険な操作のみユーザーに確認します。両モードとも完全なパイプラインを経由し deny rules は引き続き有効です。"
          },
          "reward_card": "card_s07_002"
        },
        {
          "id": "q_s07_006",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下三种权限模式中，哪种对写操作限制最严格？",
            "en": "Among the three permission modes, which is most restrictive for write operations?",
            "ja": "3 つの権限モードのうち、書き込み操作に最も厳しい制限を設けているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "auto 模式",
                "en": "auto mode",
                "ja": "auto モード"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "plan 模式",
                "en": "plan mode",
                "ja": "plan モード"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "default 模式",
                "en": "default mode",
                "ja": "default モード"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "三种模式对写操作的限制相同",
                "en": "All three modes restrict writes equally",
                "ja": "3 つのモードはすべて書き込み制限が同じ"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "plan 模式完全禁止写操作，是三种模式中限制最严的。auto 模式最宽松（安全写操作可自动通过），default 模式居中（未命中规则才询问）。",
            "en": "plan mode completely prohibits write operations, making it the most restrictive of the three. auto mode is most permissive (safe writes auto-pass), default mode is in between (asks when no rule matches).",
            "ja": "plan モードは書き込み操作を完全に禁止し、3 つのモードの中で最も制限が厳しいです。auto モードが最も寛容（安全な書き込みは自動通過）で、default モードはその中間（ルール不一致時に確認）です。"
          },
          "reward_card": "card_s07_002"
        },
        {
          "id": "q_s07_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "为什么说 bash 工具调用必须「特殊对待」，而不能像 read_file 一样处理？",
            "en": "Why must bash tool calls be treated specially rather than like read_file calls?",
            "ja": "なぜ bash ツール呼び出しは read_file のように処理せず「特別扱い」しなければならないのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "bash 调用比 read_file 慢，需要单独排队",
                "en": "bash calls are slower than read_file and need a separate queue",
                "ja": "bash 呼び出しは read_file より遅いため別のキューが必要"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "bash 调用需要额外的日志记录",
                "en": "bash calls require extra logging",
                "ja": "bash 呼び出しには追加のログ記録が必要"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "bash 命令是可执行动作描述，几乎能做任何事，危险程度远超读写文件",
                "en": "bash commands are executable action descriptions that can do almost anything, far more dangerous than file reads/writes",
                "ja": "bash コマンドはほぼ何でもできる実行可能なアクション記述であり、ファイルの読み書きよりはるかに危険"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "read_file 也需要特殊处理，两者一样危险",
                "en": "read_file also needs special treatment; they are equally dangerous",
                "ja": "read_file も特別な処理が必要で、両者は同等に危険"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "read_file 只能读文件，write_file 只能写文件，功能都是单一的。bash 则不同——它是一段可执行动作描述，能删文件、启进程、修改系统设置……几乎没有限制，因此必须专门检查 sudo、rm -rf 等危险模式。",
            "en": "read_file only reads files and write_file only writes files -- their scope is narrow. bash is an executable action description that can delete files, spawn processes, modify system settings, and more, so it requires dedicated checks for dangerous patterns like sudo and rm -rf.",
            "ja": "read_file はファイルを読むだけで write_file はファイルを書くだけであり、スコープは狭いです。bash は実行可能なアクション記述でファイルの削除、プロセスの起動、システム設定の変更などほぼ何でもできるため、sudo や rm -rf などの危険なパターンの専用チェックが必要です。"
          },
          "reward_card": "card_s07_003"
        },
        {
          "id": "q_s07_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "对 bash 命令进行安全检查时，至少应该检测哪些危险模式？",
            "en": "When checking bash commands for safety, which dangerous patterns should be detected at minimum?",
            "ja": "bash コマンドの安全チェック時に最低限検出すべき危険なパターンはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "所有包含空格的命令",
                "en": "All commands that contain spaces",
                "ja": "スペースを含むすべてのコマンド"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "超过 50 个字符的命令",
                "en": "Commands longer than 50 characters",
                "ja": "50 文字を超えるコマンド"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "任何包含 python 或 node 的命令",
                "en": "Any command containing python or node",
                "ja": "python または node を含むすべてのコマンド"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "sudo、rm -rf 等高权限或不可逆操作",
                "en": "sudo, rm -rf, and other high-privilege or irreversible operations",
                "ja": "sudo、rm -rf などの高権限または不可逆な操作"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "bash 安全检查的最低标准是识别不可逆或提权操作，典型代表是 sudo（获取超级权限）和 rm -rf（递归删除文件）。命令长度、是否含空格等与危险性无关。",
            "en": "The minimum bar for bash safety checks is identifying irreversible or privilege-escalating operations, typified by sudo (gaining superuser access) and rm -rf (recursive deletion). Command length or containing spaces has no bearing on danger.",
            "ja": "bash 安全チェックの最低基準は不可逆または権限昇格操作の識別であり、典型例は sudo（スーパーユーザー権限の取得）と rm -rf（再帰的削除）です。コマンドの長さやスペースの有無は危険性と無関係です。"
          },
          "reward_card": "card_s07_003"
        },
        {
          "id": "q_s07_009",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "bash 命令与 read_file、write_file 相比，危险性更高的根本原因是？",
            "en": "What is the fundamental reason bash commands are more dangerous than read_file or write_file?",
            "ja": "bash コマンドが read_file や write_file より危険な根本的な理由は？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "bash 命令执行速度更快，来不及拦截",
                "en": "bash commands execute faster, leaving no time to intercept",
                "ja": "bash コマンドは実行が速くインターセプトする時間がない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "bash 能执行几乎任意系统操作，功能边界远比 read/write 宽",
                "en": "bash can execute almost any system operation; its scope is far broader than read/write",
                "ja": "bash はほぼ任意のシステム操作を実行でき、そのスコープは read/write よりはるかに広い"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "bash 是网络工具，可能发送数据到外部",
                "en": "bash is a network tool that may send data externally",
                "ja": "bash はネットワークツールで外部にデータを送信する可能性がある"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "bash 不支持权限规则，必须绕过管道",
                "en": "bash does not support permission rules and must bypass the pipeline",
                "ja": "bash は権限ルールをサポートしておらずパイプラインをバイパスする必要がある"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "read_file 只读文件、write_file 只写文件，操作边界非常清晰。bash 则是一个通用执行器，能够组合任意系统调用，因此其能力边界几乎无限，危险性也远超其他工具。",
            "en": "read_file only reads and write_file only writes -- their boundaries are clear. bash is a general-purpose executor that can combine arbitrary system calls, so its capability boundary is nearly unlimited, making it far more dangerous.",
            "ja": "read_file は読むだけで write_file は書くだけで境界が明確です。bash は任意のシステム呼び出しを組み合わせられる汎用実行器であり、その能力の境界はほぼ無限で他のツールよりはるかに危険です。"
          },
          "reward_card": "card_s07_003"
        },
        {
          "id": "q_s07_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "一条 PermissionRule 最少需要哪三个字段？",
            "en": "What are the minimum three fields a PermissionRule must have?",
            "ja": "PermissionRule が最低限持つべき 3 つのフィールドは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "工具名、用户名、时间戳",
                "en": "tool name, username, timestamp",
                "ja": "ツール名、ユーザー名、タイムスタンプ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "针对哪个工具、匹配什么模式、命中后怎么处理",
                "en": "which tool, what pattern to match, what action to take on match",
                "ja": "対象のツール、マッチするパターン、マッチ時のアクション"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "规则 ID、优先级、描述",
                "en": "rule ID, priority, description",
                "ja": "ルール ID、優先度、説明"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "工具名、执行结果、日志级别",
                "en": "tool name, execution result, log level",
                "ja": "ツール名、実行結果、ログレベル"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "PermissionRule 的最小三要素是：工具（针对哪个工具生效）、模式（匹配什么样的参数或命令）、动作（命中后允许、拒绝还是询问）。规则 ID、优先级等是辅助字段，不是必需的最小结构。",
            "en": "The minimum three elements of a PermissionRule are: tool (which tool it applies to), pattern (what arguments or commands to match), and action (allow, deny, or ask on match). Rule ID and priority are supplementary fields, not minimum requirements.",
            "ja": "PermissionRule の最小 3 要素は、ツール（どのツールに適用するか）、パターン（どの引数やコマンドにマッチするか）、アクション（マッチ時に許可・拒否・確認のいずれか）です。ルール ID や優先度は補助フィールドで最小構造には不要です。"
          },
          "reward_card": "card_s07_001"
        },
        {
          "id": "q_s07_011",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "权限决策结果（PermissionDecision）和权限规则（PermissionRule）为什么要分成两层，而不是合并？",
            "en": "Why are PermissionDecision and PermissionRule kept as two separate layers rather than merged?",
            "ja": "PermissionDecision と PermissionRule はなぜ統合せず 2 つの層に分けるのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "规则和决策合并可以减少代码量",
                "en": "Merging rules and decisions reduces code volume",
                "ja": "ルールと決定を統合するとコード量が減る"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "决策结果需要加密，所以单独存储",
                "en": "Decisions need encryption so they are stored separately",
                "ja": "決定結果は暗号化が必要なので別々に保存する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "规则描述通用匹配逻辑，决策记录具体情境下的结果和理由，职责不同",
                "en": "Rules describe generic match logic; decisions record the outcome and rationale for a specific context -- different responsibilities",
                "ja": "ルールは汎用的なマッチロジックを記述し、決定は特定のコンテキストにおける結果と理由を記録する -- 責務が異なる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这只是代码风格偏好，无实际功能差异",
                "en": "It is just a code style preference with no functional difference",
                "ja": "これは単なるコードスタイルの好みで機能的な違いはない"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "规则是静态的匹配模板（工具+模式+动作），适合复用；决策是运行时产生的具体结论，需要附带理由、上下文等信息。两层分离使规则可以被多次调用，决策则携带每次判断的完整依据。",
            "en": "Rules are static match templates (tool+pattern+action) suited for reuse; decisions are runtime conclusions that need rationale and context. Separating the two lets rules be reused across many calls while each decision carries full justification for that specific invocation.",
            "ja": "ルールは再利用に適した静的なマッチテンプレート（ツール+パターン+アクション）で、決定は理由やコンテキストを含む実行時の具体的な結論です。2 層に分けることでルールを多数の呼び出しで再利用でき、各決定はその特定の呼び出しの完全な根拠を持ちます。"
          },
          "reward_card": "card_s07_001"
        },
        {
          "id": "q_s07_012",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "某次工具调用没有命中任何 deny rule，也没有命中任何 allow rule，当前处于 default 模式。管道接下来会怎么做？",
            "en": "A tool call matches no deny rule and no allow rule, and the current mode is default. What does the pipeline do next?",
            "ja": "あるツール呼び出しが deny rule にも allow rule にもマッチせず、現在のモードが default の場合、パイプラインは次に何をしますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "自动拒绝，视为潜在危险操作",
                "en": "Automatically reject it as a potentially dangerous operation",
                "ja": "潜在的に危険な操作として自動拒否する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "自动允许，因为没有明确拒绝规则",
                "en": "Automatically allow it because no explicit deny rule matched",
                "ja": "明示的な deny rule がマッチしなかったので自動許可する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "切换到 plan 模式并重新评估",
                "en": "Switch to plan mode and re-evaluate",
                "ja": "plan モードに切り替えて再評価する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "询问用户是否允许",
                "en": "Ask the user for permission",
                "ja": "ユーザーに許可を求める"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "在 default 模式下，如果操作既没被 deny rules 拦截，也没被 allow rules 放行，管道会到达最后一步：询问用户。这正是 default 模式与 auto 模式的核心区别——auto 模式会通过更宽松的 allow rules 覆盖更多操作，减少询问次数。",
            "en": "In default mode, when an operation passes deny rules but is not covered by allow rules, the pipeline reaches its final step: asking the user. This is exactly the core difference from auto mode -- auto mode uses broader allow rules to cover more operations and ask less often.",
            "ja": "default モードでは、操作が deny rules を通過しても allow rules でカバーされていない場合、パイプラインは最終ステップであるユーザーへの確認に到達します。これが auto モードとの核心的な違いで、auto モードはより広い allow rules を使ってより多くの操作をカバーし確認頻度を減らします。"
          },
          "reward_card": "card_s07_002"
        },
        {
          "id": "q_s07_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "plan 模式下，一条 allow rule 明确允许 write_file 操作，该操作会被执行吗？",
            "en": "In plan mode, if an allow rule explicitly permits a write_file operation, will it be executed?",
            "ja": "plan モードで allow rule が write_file 操作を明示的に許可している場合、その操作は実行されますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "会执行，因为 allow rule 优先级高于模式检查",
                "en": "Yes, because allow rules have higher priority than mode checks",
                "ja": "はい、allow rules はモード確認より優先度が高いから"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "不会执行，plan 模式在管道第二步就阻止所有写操作",
                "en": "No, plan mode blocks all write operations at the second step of the pipeline",
                "ja": "いいえ、plan モードはパイプラインの第 2 ステップですべての書き込み操作をブロックする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "会执行，但会在日志中标记为异常",
                "en": "Yes, but it is flagged as anomalous in logs",
                "ja": "はい、ただしログに異常としてフラグが立てられる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "取决于 deny rules 是否有对应拦截规则",
                "en": "It depends on whether deny rules have a matching block rule",
                "ja": "deny rules に対応するブロックルールがあるかどうかによる"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "管道的第二步是模式检查，plan 模式在此直接阻止所有写操作，执行不会继续到 allow rules 阶段。allow rules 是第三步，排在模式检查之后，因此在 plan 模式下 allow rules 无法覆盖写操作的限制。",
            "en": "The second pipeline step is mode check, and plan mode blocks all writes there before reaching allow rules. allow rules are the third step, after mode check, so in plan mode they cannot override the write restriction.",
            "ja": "パイプラインの第 2 ステップはモード確認で、plan モードはそこで allow rules に到達する前にすべての書き込みをブロックします。allow rules はモード確認の後の第 3 ステップなので、plan モードでは書き込み制限を上書きできません。"
          },
          "reward_card": "card_s07_002"
        },
        {
          "id": "q_s07_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "在权限系统中，`rm -rf /tmp/cache` 的危险性与 `rm -rf /` 的危险性是否需要区分对待？",
            "en": "In the permission system, should 'rm -rf /tmp/cache' and 'rm -rf /' be treated differently in terms of danger?",
            "ja": "権限システムにおいて、'rm -rf /tmp/cache' と 'rm -rf /' の危険性は区別して扱う必要がありますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "不需要，两者都包含 rm -rf，一律拒绝即可",
                "en": "No, both contain rm -rf and should be rejected uniformly",
                "ja": "いいえ、両方とも rm -rf を含むので一律拒否でよい"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "不需要，bash 工具调用统一走安全审计队列，不做细粒度区分",
                "en": "No, bash calls go through a unified audit queue without fine-grained distinction",
                "ja": "いいえ、bash 呼び出しは統一した監査キューを経由し細粒度の区別はしない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "需要，细粒度规则可以区分高危和低危 bash 命令，避免过度拦截",
                "en": "Yes, fine-grained rules can distinguish high-risk from lower-risk bash commands to avoid over-blocking",
                "ja": "はい、細粒度のルールで高リスクと低リスクの bash コマンドを区別して過度なブロックを避けられる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "需要，只有影响根目录的命令才危险，tmp 目录可以自动放行",
                "en": "Yes, only commands affecting the root directory are dangerous; tmp directories can auto-pass",
                "ja": "はい、ルートディレクトリに影響するコマンドのみ危険で tmp ディレクトリは自動許可できる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "PermissionRule 的模式字段支持细粒度匹配，可以区分 rm -rf /（根目录，极危险）和 rm -rf /tmp/cache（临时缓存，可接受）。一律拒绝 rm -rf 会导致合法操作无法执行；精细规则才能平衡安全与可用性。",
            "en": "The pattern field of PermissionRule supports fine-grained matching, distinguishing rm -rf / (root, extremely dangerous) from rm -rf /tmp/cache (temp cache, acceptable). Blanket rejection of rm -rf blocks legitimate operations; precise rules balance security with usability.",
            "ja": "PermissionRule のパターンフィールドは細粒度マッチングをサポートし、rm -rf /（ルート、極めて危険）と rm -rf /tmp/cache（一時キャッシュ、許容可能）を区別できます。rm -rf の一律拒否は正当な操作をブロックし、精密なルールがセキュリティと使いやすさのバランスを実現します。"
          },
          "reward_card": "card_s07_003"
        },
        {
          "id": "q_s07_015",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪种说法正确描述了权限决策结果（PermissionDecision）应该携带的信息？",
            "en": "Which statement correctly describes what a PermissionDecision should carry?",
            "ja": "PermissionDecision が持つべき情報を正しく説明しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "只需要一个布尔值：允许或拒绝",
                "en": "Only a boolean: allow or deny",
                "ja": "ブール値（許可または拒否）のみ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只需要结果和时间戳，理由不重要",
                "en": "Only the result and timestamp; rationale is unimportant",
                "ja": "結果とタイムスタンプのみ、理由は重要ではない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只需要记录触发的规则 ID",
                "en": "Only the ID of the triggered rule",
                "ja": "トリガーされたルールの ID のみ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "决策结果加上作出该决策的理由",
                "en": "The decision outcome plus the rationale for making that decision",
                "ja": "決定の結果とその決定を下した理由"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "PermissionDecision 不只是 yes/no，还必须携带理由（比如「命中了哪条规则」「为什么是危险操作」），这样上层系统才能向用户解释为什么某个操作被拒绝，也有助于调试规则。",
            "en": "A PermissionDecision is not just yes/no -- it must carry rationale (e.g., which rule matched, why the operation is dangerous) so that the upper system can explain rejections to users and help debug rules.",
            "ja": "PermissionDecision は単なる yes/no ではなく、理由（どのルールにマッチしたか、なぜ危険な操作かなど）を持たなければなりません。これにより上位システムがユーザーに拒否の理由を説明でき、ルールのデバッグにも役立ちます。"
          },
          "reward_card": "card_s07_001"
        },
        {
          "id": "q_s07_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "如果把权限管道的 deny rules 和 allow rules 顺序对调（先 allow 后 deny），会导致什么问题？",
            "en": "If deny rules and allow rules are swapped (allow first, then deny), what problem arises?",
            "ja": "deny rules と allow rules の順序を逆にした場合（先に allow、次に deny）、どのような問題が生じますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "性能会变差，但安全性不受影响",
                "en": "Performance degrades but safety is unaffected",
                "ja": "パフォーマンスが低下するが安全性には影響しない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "用户会被询问更多次，体验变差",
                "en": "Users are asked more frequently, worsening the experience",
                "ja": "ユーザーへの確認が増えて体験が悪化する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "危险操作可能被 allow rule 先放行，deny rule 永远不会执行到",
                "en": "Dangerous operations could be approved by allow rules first, so deny rules never get a chance to run",
                "ja": "危険な操作が先に allow rules で承認されてしまい、deny rules が実行される機会がなくなる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "deny rules 会失效，所有操作都能被 allow rules 放行",
                "en": "deny rules become ineffective and all ops can be approved by allow rules",
                "ja": "deny rules が無効になり allow rules ですべての操作を承認できてしまう"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "管道是顺序执行、命中即停的。如果 allow rules 先执行，一条宽泛的 allow rule（如「允许所有 bash」）可能在 deny rules 检查之前就放行了危险命令。deny 必须最先执行，才能保证安全底线不被 allow 覆盖。",
            "en": "The pipeline executes sequentially and stops on first match. If allow rules run first, a broad allow rule (e.g., 'allow all bash') could approve dangerous commands before deny rules ever check them. deny must run first to guarantee the safety floor cannot be overridden by allow.",
            "ja": "パイプラインは順番に実行され最初のマッチで停止します。allow rules が先に実行されると、広い allow rule（例：'すべての bash を許可'）が deny rules のチェック前に危険なコマンドを承認してしまいます。deny が最初に実行されることで安全の底線が allow に上書きされないことを保証します。"
          },
          "reward_card": "card_s07_001"
        },
        {
          "id": "q_s07_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "在 auto 模式下，一个 bash 命令既没命中 deny rules，也没命中 allow rules，会发生什么？",
            "en": "In auto mode, a bash command matches no deny rule and no allow rule. What happens?",
            "ja": "auto モードで bash コマンドが deny rule にも allow rule にもマッチしない場合、何が起こりますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "询问用户，auto 模式并非跳过所有确认",
                "en": "Ask the user; auto mode does not skip all confirmations",
                "ja": "ユーザーに確認する、auto モードはすべての確認をスキップするわけではない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "切换到 plan 模式重新评估",
                "en": "Switch to plan mode and re-evaluate",
                "ja": "plan モードに切り替えて再評価する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "自动拒绝，因为 auto 模式只允许 allow rules 明确放行的操作",
                "en": "Auto-reject, because auto mode only allows what allow rules explicitly approve",
                "ja": "自動拒否される、なぜなら auto モードは allow rules が明示的に承認したものだけを許可するから"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "自动执行，因为 auto 模式下所有命令都不需要确认",
                "en": "Auto-execute, because in auto mode all commands skip confirmation",
                "ja": "自動実行される、なぜなら auto モードではすべてのコマンドが確認をスキップするから"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "auto 模式的作用是让更多安全操作通过 allow rules 自动放行，从而减少询问次数——而不是消除所有询问。当 allow rules 也未命中时，管道仍然会询问用户，危险操作不会自动执行。",
            "en": "auto mode makes more safe operations pass through allow rules automatically, reducing how often the user is asked -- it does not eliminate all confirmations. When allow rules also miss, the pipeline still asks the user; dangerous operations are never auto-executed.",
            "ja": "auto モードはより多くの安全な操作を allow rules で自動的に通過させることでユーザーへの確認頻度を減らしますが、すべての確認をなくすわけではありません。allow rules もミスした場合、パイプラインはまだユーザーに確認し、危険な操作は自動実行されません。"
          },
          "reward_card": "card_s07_002"
        },
        {
          "id": "q_s07_018",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "权限系统存在的根本原因是什么？",
            "en": "What is the fundamental reason for having a permission system?",
            "ja": "権限システムが存在する根本的な理由は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "为了限制 Claude 每分钟能执行的操作数量",
                "en": "To limit the number of operations Claude can run per minute",
                "ja": "Claude が 1 分間に実行できる操作数を制限するため"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "工具调用意图不能直接变成执行，中间必须经过安全审查",
                "en": "A tool call intent cannot directly become execution; it must pass through safety review first",
                "ja": "ツール呼び出しの意図は直接実行にはならず、まず安全審査を通過しなければならない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "为了把用户请求翻译成机器可执行的格式",
                "en": "To translate user requests into machine-executable format",
                "ja": "ユーザーリクエストをマシン実行可能な形式に変換するため"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "为了记录所有工具调用的日志",
                "en": "To log all tool calls",
                "ja": "すべてのツール呼び出しをログに記録するため"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "权限系统存在的核心原因是：模型的「意图」不能不经审查就直接变成「执行」。每一个工具调用都必须先经过权限管道，决定是允许、拒绝还是询问用户，才能真正执行。",
            "en": "The core reason for the permission system is that a model's intent cannot become execution without review. Every tool call must first pass through the permission pipeline to decide allow, deny, or ask the user before actually executing.",
            "ja": "権限システムの核心的な存在理由は、モデルの「意図」が審査なしに直接「実行」にならないようにすることです。すべてのツール呼び出しは実際に実行される前に権限パイプラインを通過して許可・拒否・ユーザー確認を決定しなければなりません。"
          },
          "reward_card": "card_s07_003"
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
            "zh": "Hook 在 Claude Code 主循环中扮演什么角色？",
            "en": "What role does a Hook play in the Claude Code main loop?",
            "ja": "Claude Code のメインループで Hook はどのような役割を担いますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "主循环在固定时机暴露的调用接口，让扩展行为在外部实现",
                "en": "A call interface exposed at fixed moments, letting extension logic live outside the main loop",
                "ja": "固定タイミングで公開される呼び出し口で、拡張動作を外部に実装させる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "主循环内部的 if/else 分支，用于判断不同工具请求",
                "en": "An if/else branch inside the main loop for handling different tool requests",
                "ja": "メインループ内部の if/else 分岐で異なるツールリクエストを処理する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "一个独立进程，与主循环并行运行并共享状态",
                "en": "A separate process running in parallel with the main loop, sharing state",
                "ja": "メインループと並行して動作し状態を共有する独立プロセス"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "主循环结束后才运行的清理函数",
                "en": "A cleanup function that runs only after the main loop finishes",
                "ja": "メインループ終了後にのみ実行されるクリーンアップ関数"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Hook 不是主循环内的 if/else，而是主循环在固定时机暴露的调用接口。主循环只需知道：什么事件、交出什么上下文、收到结果怎么处理。",
            "en": "A Hook is not an if/else inside the main loop but a call interface exposed at fixed moments. The main loop only needs to know: what event, what context to pass, and how to handle the result.",
            "ja": "Hook はメインループ内の if/else ではなく、固定タイミングで公開される呼び出し口です。メインループはイベント種別・渡すコンテキスト・結果の処理方法だけを知っていれば十分です。"
          },
          "reward_card": "card_s08_001"
        },
        {
          "id": "q_s08_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "使用 Hook 而不是在主循环中直接写 if/else 的核心优势是什么？",
            "en": "What is the core advantage of using Hooks instead of writing if/else directly in the main loop?",
            "ja": "メインループに直接 if/else を書く代わりに Hook を使う核心的な利点は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "执行速度更快，减少函数调用开销",
                "en": "Faster execution by reducing function call overhead",
                "ja": "関数呼び出しのオーバーヘッドを減らし実行速度が上がる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "系统可扩展，且主循环无需理解每个扩展需求",
                "en": "System becomes extensible and the main loop does not need to understand each extension requirement",
                "ja": "システムが拡張可能になり、メインループは各拡張要件を理解しなくてよい"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "避免工具执行出错，提高稳定性",
                "en": "Prevents tool execution errors and improves stability",
                "ja": "ツール実行エラーを防ぎ安定性を向上させる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Hook 可以直接修改主循环的内部状态",
                "en": "Hooks can directly modify the main loop's internal state",
                "ja": "Hook がメインループの内部状態を直接変更できる"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "Hook 让系统可扩展，但不要求主循环理解每个扩展需求。每个新扩展只需注册自己的 hook，主循环代码保持不变。",
            "en": "Hooks make the system extensible without requiring the main loop to understand each extension. Each new extension just registers its hook and the main loop code stays unchanged.",
            "ja": "Hook によってシステムは拡張可能になり、メインループは各拡張を理解する必要がありません。新しい拡張は hook を登録するだけで、メインループのコードは変わりません。"
          },
          "reward_card": "card_s08_002"
        },
        {
          "id": "q_s08_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "SessionStart Hook 在什么时候触发？",
            "en": "When does the SessionStart Hook fire?",
            "ja": "SessionStart Hook はいつ発火しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每次工具执行前",
                "en": "Before each tool execution",
                "ja": "ツール実行のたびに実行前"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "每次工具执行后",
                "en": "After each tool execution",
                "ja": "ツール実行のたびに実行後"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "会话开始时触发一次",
                "en": "Once when the session starts",
                "ja": "セッション開始時に一度だけ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "主循环每次迭代结束时",
                "en": "At the end of each main loop iteration",
                "ja": "メインループの各イテレーション終了時"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "SessionStart 在会话开始时触发，适合做初始化操作。PreToolUse 在工具执行前触发，PostToolUse 在工具执行后触发。",
            "en": "SessionStart fires once when the session starts, suitable for initialization. PreToolUse fires before tool execution and PostToolUse fires after.",
            "ja": "SessionStart はセッション開始時に一度発火し、初期化に適しています。PreToolUse はツール実行前、PostToolUse はツール実行後に発火します。"
          },
          "reward_card": "card_s08_002"
        },
        {
          "id": "q_s08_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "PreToolUse Hook 的主要用途是什么？",
            "en": "What is the main purpose of the PreToolUse Hook?",
            "ja": "PreToolUse Hook の主な用途は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "工具执行后做审计记录",
                "en": "Audit logging after tool execution",
                "ja": "ツール実行後に監査ログを記録する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "会话初始化，加载配置文件",
                "en": "Session initialization and loading config files",
                "ja": "セッション初期化と設定ファイルの読み込み"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "追加补充说明消息到上下文",
                "en": "Appending supplemental messages to context",
                "ja": "補足メッセージをコンテキストに追加する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "工具执行前检查或拦截，阻止危险操作",
                "en": "Checking or intercepting before tool execution to block dangerous operations",
                "ja": "ツール実行前に検査または割り込み、危険な操作をブロックする"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "PreToolUse 在工具执行前触发，主要用于检查或拦截。如果返回退出码 1，可以阻止该工具被执行。",
            "en": "PreToolUse fires before tool execution and is mainly used for checking or intercepting. Returning exit code 1 blocks the tool from executing.",
            "ja": "PreToolUse はツール実行前に発火し、主に検査または割り込みに使われます。終了コード 1 を返すとツールの実行をブロックできます。"
          },
          "reward_card": "card_s08_002"
        },
        {
          "id": "q_s08_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "PostToolUse Hook 最适合做什么？",
            "en": "What is PostToolUse Hook best suited for?",
            "ja": "PostToolUse Hook は何に最も適していますか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "拦截危险工具调用，阻止其执行",
                "en": "Intercepting dangerous tool calls to block execution",
                "ja": "危険なツール呼び出しを割り込んで実行をブロックする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在会话开始前加载全局配置",
                "en": "Loading global config before the session starts",
                "ja": "セッション開始前にグローバル設定を読み込む"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "工具执行后审计或追加补充说明",
                "en": "Auditing or appending supplemental notes after tool execution",
                "ja": "ツール実行後に監査したり補足説明を追加したりする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "修改工具的返回值再交给主循环",
                "en": "Modifying the tool return value before passing it back to the main loop",
                "ja": "ツールの戻り値を変更してメインループに返す"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "PostToolUse 在工具执行后触发，适合做审计记录或追加补充说明。拦截操作应在 PreToolUse 阶段完成。",
            "en": "PostToolUse fires after tool execution and is suited for audit logging or appending supplemental notes. Interception should be done in the PreToolUse stage.",
            "ja": "PostToolUse はツール実行後に発火し、監査記録や補足説明の追加に適しています。割り込み操作は PreToolUse 段階で行うべきです。"
          },
          "reward_card": "card_s08_002"
        },
        {
          "id": "q_s08_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "Hook 返回退出码 0 时，主循环会怎么处理？",
            "en": "When a Hook returns exit code 0, what does the main loop do?",
            "ja": "Hook が終了コード 0 を返したとき、メインループはどう処理しますか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "阻止当前工具执行，跳过该步骤",
                "en": "Block the current tool execution and skip the step",
                "ja": "現在のツール実行をブロックしてステップをスキップする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "先注入一条补充消息，再继续执行",
                "en": "Inject a supplemental message first, then continue execution",
                "ja": "補足メッセージを先に注入してから実行を続ける"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "终止整个会话，退出主循环",
                "en": "Terminate the entire session and exit the main loop",
                "ja": "セッション全体を終了しメインループを抜ける"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "正常继续（观察模式），不做额外处理",
                "en": "Continue normally (observe mode) with no extra handling",
                "ja": "通常通り続行（観察モード）し、追加処理なし"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "退出码约定：0 = 正常继续（观察），1 = 阻止当前动作（拦截），2 = 注入补充消息再继续（补充）。0 是最轻量的结果。",
            "en": "Exit code convention: 0 = continue normally (observe), 1 = block current action (intercept), 2 = inject supplemental message then continue (supplement). 0 is the lightest outcome.",
            "ja": "終了コード規約: 0 = 通常続行（観察）、1 = 現在のアクションをブロック（割り込み）、2 = 補足メッセージを注入してから続行（補足）。0 が最も軽量な結果です。"
          },
          "reward_card": "card_s08_003"
        },
        {
          "id": "q_s08_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "当 Hook 需要阻止一个危险的工具调用时，应该返回哪个退出码？",
            "en": "When a Hook needs to block a dangerous tool call, which exit code should it return?",
            "ja": "Hook が危険なツール呼び出しをブロックする必要があるとき、どの終了コードを返すべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "0",
                "en": "0",
                "ja": "0"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "1",
                "en": "1",
                "ja": "1"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "2",
                "en": "2",
                "ja": "2"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "-1",
                "en": "-1",
                "ja": "-1"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "退出码 1 = 阻止当前动作（拦截）。0 是继续，2 是注入补充消息后继续，-1 不在约定内。",
            "en": "Exit code 1 = block the current action (intercept). 0 means continue, 2 means inject a supplemental message then continue, -1 is not part of the convention.",
            "ja": "終了コード 1 = 現在のアクションをブロック（割り込み）。0 は続行、2 は補足メッセージを注入して続行、-1 は規約外です。"
          },
          "reward_card": "card_s08_003"
        },
        {
          "id": "q_s08_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "Hook 返回退出码 2 时，主循环会采取什么行动？",
            "en": "When a Hook returns exit code 2, what action does the main loop take?",
            "ja": "Hook が終了コード 2 を返したとき、メインループはどのような行動をとりますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "继续执行，不做任何额外处理",
                "en": "Continue execution with no extra handling",
                "ja": "追加処理なしで実行を続ける"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "跳过当前工具，直接进入下一步",
                "en": "Skip the current tool and proceed to the next step",
                "ja": "現在のツールをスキップして次のステップに進む"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "先注入一条补充消息，再继续执行工具",
                "en": "Inject a supplemental message first, then continue tool execution",
                "ja": "先に補足メッセージを注入し、その後ツール実行を続ける"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "重试当前工具，最多重试 3 次",
                "en": "Retry the current tool up to 3 times",
                "ja": "現在のツールを最大 3 回リトライする"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "退出码 2 = 注入补充消息再继续。主循环先把 hook 提供的额外信息追加到上下文，然后照常执行工具。",
            "en": "Exit code 2 = inject a supplemental message then continue. The main loop appends the extra information provided by the hook to the context, then executes the tool as normal.",
            "ja": "終了コード 2 = 補足メッセージを注入してから続行。メインループは hook が提供した追加情報をコンテキストに追加し、その後通常通りツールを実行します。"
          },
          "reward_card": "card_s08_003"
        },
        {
          "id": "q_s08_009",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "下列关于退出码 0、1、2 的描述，哪一项是正确的？",
            "en": "Which of the following descriptions of exit codes 0, 1, and 2 is correct?",
            "ja": "終了コード 0・1・2 についての以下の説明のうち、正しいものはどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "0 = 拦截，1 = 继续，2 = 补充",
                "en": "0 = intercept, 1 = continue, 2 = supplement",
                "ja": "0 = 割り込み、1 = 続行、2 = 補足"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "0 = 继续，1 = 补充，2 = 拦截",
                "en": "0 = continue, 1 = supplement, 2 = intercept",
                "ja": "0 = 続行、1 = 補足、2 = 割り込み"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "0 = 继续，1 = 拦截，2 = 补充",
                "en": "0 = continue, 1 = intercept, 2 = supplement",
                "ja": "0 = 続行、1 = 割り込み、2 = 補足"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "0 = 补充，1 = 拦截，2 = 继续",
                "en": "0 = supplement, 1 = intercept, 2 = continue",
                "ja": "0 = 補足、1 = 割り込み、2 = 続行"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "退出码约定：0 = 继续（观察），1 = 拦截（阻止当前动作），2 = 补充（注入消息再继续）。这是 Hook 系统的核心约定。",
            "en": "Exit code convention: 0 = continue (observe), 1 = intercept (block current action), 2 = supplement (inject message then continue). This is the core convention of the Hook system.",
            "ja": "終了コード規約: 0 = 続行（観察）、1 = 割り込み（現在のアクションをブロック）、2 = 補足（メッセージを注入してから続行）。これは Hook システムの核心的な規約です。"
          },
          "reward_card": "card_s08_003"
        },
        {
          "id": "q_s08_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "主循环在哪两个位置调用 run_hooks 来接入 Hook 系统？",
            "en": "At which two positions does the main loop call run_hooks to integrate the Hook system?",
            "ja": "メインループはどの 2 箇所で run_hooks を呼び出して Hook システムと連携しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "会话开始前和会话结束后",
                "en": "Before the session starts and after the session ends",
                "ja": "セッション開始前とセッション終了後"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型响应前和模型响应后",
                "en": "Before the model responds and after the model responds",
                "ja": "モデルが応答する前と応答した後"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "工具执行前（PreToolUse）和工具执行后（PostToolUse）",
                "en": "Before tool execution (PreToolUse) and after tool execution (PostToolUse)",
                "ja": "ツール実行前（PreToolUse）とツール実行後（PostToolUse）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用户输入前和工具执行前",
                "en": "Before user input and before tool execution",
                "ja": "ユーザー入力前とツール実行前"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "工具执行前调 run_hooks('PreToolUse')，返回 1 跳过执行、返回 2 先追加消息。执行后调 run_hooks('PostToolUse') 做补充。主循环结构几乎不变。",
            "en": "Call run_hooks('PreToolUse') before tool execution (return 1 skips execution, return 2 appends a message first), and call run_hooks('PostToolUse') after execution for supplementation. The main loop structure barely changes.",
            "ja": "ツール実行前に run_hooks('PreToolUse') を呼び（1 を返すと実行をスキップ、2 を返すと先にメッセージを追加）、実行後に run_hooks('PostToolUse') を呼んで補足します。メインループの構造はほとんど変わりません。"
          },
          "reward_card": "card_s08_001"
        },
        {
          "id": "q_s08_011",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在主循环中接入 Hook 后，主循环本身的结构会发生什么变化？",
            "en": "After integrating Hooks into the main loop, what happens to the main loop structure itself?",
            "ja": "メインループに Hook を組み込んだ後、メインループ自体の構造はどう変化しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "需要大规模重构，为每种 hook 类型添加分支",
                "en": "Requires large-scale refactoring to add branches for each hook type",
                "ja": "各 hook タイプに分岐を追加するために大規模なリファクタリングが必要"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只需在工具执行前后各插入一行 run_hooks，结构几乎不变",
                "en": "Only needs one run_hooks call inserted before and after tool execution; structure barely changes",
                "ja": "ツール実行の前後に run_hooks を 1 行ずつ挿入するだけで、構造はほとんど変わらない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "主循环需要了解并处理每种扩展的逻辑",
                "en": "The main loop needs to understand and handle the logic of each extension",
                "ja": "メインループは各拡張のロジックを理解して処理する必要がある"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "主循环变为事件驱动模型，完全重写",
                "en": "The main loop becomes an event-driven model and is completely rewritten",
                "ja": "メインループはイベント駆動モデルに変わり、完全に書き直される"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "主循环只需在工具执行前后各插一行 run_hooks，结构几乎不变。这正是 Hook 设计的优雅之处——扩展不影响主干。",
            "en": "The main loop only needs one run_hooks call inserted before and after tool execution; the structure barely changes. This is the elegance of Hook design — extensions do not affect the main trunk.",
            "ja": "メインループはツール実行の前後に run_hooks を 1 行ずつ挿入するだけで、構造はほとんど変わりません。これが Hook 設計の優雅さで、拡張がメインの流れに影響しません。"
          },
          "reward_card": "card_s08_001"
        },
        {
          "id": "q_s08_012",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果希望在执行某个工具后，自动向上下文追加一段安全提示，应该用哪个 Hook 事件配合哪个退出码？",
            "en": "To automatically append a safety note to context after a tool executes, which Hook event and exit code should you use?",
            "ja": "ツール実行後に安全上の注意をコンテキストに自動追加するには、どの Hook イベントとどの終了コードを使うべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "PreToolUse + 退出码 1",
                "en": "PreToolUse + exit code 1",
                "ja": "PreToolUse + 終了コード 1"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "SessionStart + 退出码 0",
                "en": "SessionStart + exit code 0",
                "ja": "SessionStart + 終了コード 0"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "PostToolUse + 退出码 2",
                "en": "PostToolUse + exit code 2",
                "ja": "PostToolUse + 終了コード 2"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "PreToolUse + 退出码 2",
                "en": "PreToolUse + exit code 2",
                "ja": "PreToolUse + 終了コード 2"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "PostToolUse 在工具执行后触发，退出码 2 表示注入补充消息再继续。两者组合正好实现'执行后自动追加说明'的需求。",
            "en": "PostToolUse fires after tool execution and exit code 2 means inject a supplemental message then continue. The combination achieves the requirement of automatically appending notes after execution.",
            "ja": "PostToolUse はツール実行後に発火し、終了コード 2 は補足メッセージを注入して続行することを意味します。この組み合わせが実行後に自動で注釈を追加する要件を実現します。"
          },
          "reward_card": "card_s08_003"
        },
        {
          "id": "q_s08_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪种场景最适合使用 PreToolUse Hook 配合退出码 1？",
            "en": "Which scenario is best handled by a PreToolUse Hook with exit code 1?",
            "ja": "次のシナリオのうち、PreToolUse Hook と終了コード 1 の組み合わせに最も適しているのはどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "会话开始时自动打印欢迎语",
                "en": "Automatically printing a welcome message when the session starts",
                "ja": "セッション開始時にウェルカムメッセージを自動表示する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "记录每次工具调用的结果到日志文件",
                "en": "Logging the result of each tool call to a log file",
                "ja": "各ツール呼び出しの結果をログファイルに記録する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "检测到 rm -rf / 命令时立即阻止执行",
                "en": "Immediately blocking execution when rm -rf / is detected",
                "ja": "rm -rf / コマンドを検出したときに即座に実行をブロックする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "在工具执行成功后注入一条总结消息",
                "en": "Injecting a summary message after successful tool execution",
                "ja": "ツール実行成功後に要約メッセージを注入する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "PreToolUse 在工具执行前触发，退出码 1 阻止执行，两者组合完美匹配'检测危险命令并阻止'的需求。记录日志适合 PostToolUse+0，注入总结适合 PostToolUse+2，打印欢迎语适合 SessionStart+0。",
            "en": "PreToolUse fires before tool execution and exit code 1 blocks it. The combination perfectly matches the requirement to detect a dangerous command and block it. Logging suits PostToolUse+0, injecting a summary suits PostToolUse+2, and printing a welcome message suits SessionStart+0.",
            "ja": "PreToolUse はツール実行前に発火し、終了コード 1 でブロックします。この組み合わせは危険なコマンドを検出してブロックする要件にぴったりです。ログ記録は PostToolUse+0、要約注入は PostToolUse+2、ウェルカムメッセージは SessionStart+0 が適しています。"
          },
          "reward_card": "card_s08_003"
        },
        {
          "id": "q_s08_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下列关于 Hook 系统设计原则的说法，哪一项是错误的？",
            "en": "Which of the following statements about the Hook system design principle is incorrect?",
            "ja": "Hook システムの設計原則に関する以下の記述のうち、誤っているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "主循环只需知道：什么事件、交出什么上下文、收到结果怎么处理",
                "en": "The main loop only needs to know: what event, what context to pass, and how to handle the result",
                "ja": "メインループが知るべきは、イベント種別・渡すコンテキスト・結果の処理方法だけ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "每添加一个新 hook，主循环必须增加对应的 if/else 分支",
                "en": "Every new hook added requires a corresponding if/else branch to be added to the main loop",
                "ja": "新しい hook を追加するたびに、メインループに対応する if/else 分岐を追加しなければならない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Hook 让系统可扩展，同时不要求主循环理解每个扩展需求",
                "en": "Hooks make the system extensible while not requiring the main loop to understand each extension need",
                "ja": "Hook はシステムを拡張可能にし、メインループは各拡張要件を理解しなくてよい"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "先学 SessionStart / PreToolUse / PostToolUse 就能搭出最小 hook 机制",
                "en": "Learning SessionStart / PreToolUse / PostToolUse first is enough to build a minimal hook mechanism",
                "ja": "SessionStart / PreToolUse / PostToolUse を先に学べば最小の hook 機構を構築できる"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "Hook 的设计目标恰恰是避免每次扩展都要改主循环。新 hook 注册到 hook 列表即可，主循环通过 run_hooks 统一调用，无需任何新的 if/else 分支。",
            "en": "The whole point of Hook design is to avoid modifying the main loop with every extension. A new hook is simply registered in the hook list; the main loop calls it uniformly via run_hooks with no new if/else branches needed.",
            "ja": "Hook 設計の目的はまさに、拡張のたびにメインループを変更することを避けることです。新しい hook は hook リストに登録するだけで、メインループは run_hooks で一括呼び出しし、新しい if/else 分岐は不要です。"
          },
          "reward_card": "card_s08_001"
        },
        {
          "id": "q_s08_015",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个 Hook 想在工具执行前做权限检查，允许则继续、拒绝则阻止。正确的退出码逻辑是？",
            "en": "A Hook wants to do a permission check before tool execution: allow means continue, deny means block. What is the correct exit code logic?",
            "ja": "Hook がツール実行前に権限チェックをして、許可なら続行・拒否ならブロックしたい。正しい終了コードのロジックは？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "允许返回 2，拒绝返回 0",
                "en": "Allow returns 2, deny returns 0",
                "ja": "許可は 2 を返す、拒否は 0 を返す"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "允许返回 1，拒绝返回 2",
                "en": "Allow returns 1, deny returns 2",
                "ja": "許可は 1 を返す、拒否は 2 を返す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "允许返回 0，拒绝返回 2",
                "en": "Allow returns 0, deny returns 2",
                "ja": "許可は 0 を返す、拒否は 2 を返す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "允许返回 0，拒绝返回 1",
                "en": "Allow returns 0, deny returns 1",
                "ja": "許可は 0 を返す、拒否は 1 を返す"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "0 = 正常继续（允许通过），1 = 阻止当前动作（拒绝执行）。这是退出码约定的直接应用：允许→0，拒绝→1。",
            "en": "0 = continue normally (allow through), 1 = block current action (deny execution). This is a direct application of the exit code convention: allow -> 0, deny -> 1.",
            "ja": "0 = 通常続行（許可）、1 = 現在のアクションをブロック（拒否）。これは終了コード規約の直接的な適用です: 許可 -> 0、拒否 -> 1。"
          },
          "reward_card": "card_s08_003"
        },
        {
          "id": "q_s08_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下列四种说法中，哪一种准确描述了 Hook 系统中三个核心事件的触发时机？",
            "en": "Which of the following accurately describes the trigger timing of the three core Hook events?",
            "ja": "以下の 4 つの記述のうち、3 つのコア Hook イベントの発火タイミングを正確に説明しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "SessionStart 每次工具调用前、PreToolUse 会话开始时、PostToolUse 会话结束时",
                "en": "SessionStart before each tool call, PreToolUse when the session starts, PostToolUse when the session ends",
                "ja": "SessionStart はツール呼び出しのたびに実行前、PreToolUse はセッション開始時、PostToolUse はセッション終了時"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "SessionStart 会话开始时、PreToolUse 工具执行前、PostToolUse 工具执行后",
                "en": "SessionStart when the session starts, PreToolUse before tool execution, PostToolUse after tool execution",
                "ja": "SessionStart はセッション開始時、PreToolUse はツール実行前、PostToolUse はツール実行後"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "SessionStart 工具执行后、PreToolUse 会话开始时、PostToolUse 工具执行前",
                "en": "SessionStart after tool execution, PreToolUse when the session starts, PostToolUse before tool execution",
                "ja": "SessionStart はツール実行後、PreToolUse はセッション開始時、PostToolUse はツール実行前"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "SessionStart 工具执行前、PreToolUse 工具执行后、PostToolUse 会话开始时",
                "en": "SessionStart before tool execution, PreToolUse after tool execution, PostToolUse when the session starts",
                "ja": "SessionStart はツール実行前、PreToolUse はツール実行後、PostToolUse はセッション開始時"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "SessionStart 会话开始触发，PreToolUse 工具执行前触发（检查或拦截），PostToolUse 工具执行后触发（审计或追加说明）。先记住这三个事件就能搭出最小 hook 机制。",
            "en": "SessionStart fires when the session starts, PreToolUse fires before tool execution (check or intercept), PostToolUse fires after tool execution (audit or append notes). Memorizing these three events is enough to build a minimal hook mechanism.",
            "ja": "SessionStart はセッション開始時、PreToolUse はツール実行前（検査または割り込み）、PostToolUse はツール実行後（監査または補足追加）に発火します。この 3 つを覚えれば最小の hook 機構を構築できます。"
          },
          "reward_card": "card_s08_002"
        },
        {
          "id": "q_s08_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪种场景需要同时用到两个不同的 Hook 事件？",
            "en": "Which scenario requires using two different Hook events at the same time?",
            "ja": "以下のシナリオのうち、2 つの異なる Hook イベントを同時に使う必要があるのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "拦截包含 sudo 的 bash 命令",
                "en": "Intercepting bash commands that contain sudo",
                "ja": "sudo を含む bash コマンドを割り込んでブロックする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "记录所有工具调用的耗时到日志",
                "en": "Logging the execution time of all tool calls",
                "ja": "全ツール呼び出しの実行時間をログに記録する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "会话开始时打印欢迎语，同时拦截危险工具",
                "en": "Printing a welcome message when the session starts while also intercepting dangerous tools",
                "ja": "セッション開始時にウェルカムメッセージを表示しつつ、危険なツールも割り込んでブロックする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "工具执行后追加一条安全提示",
                "en": "Appending a safety note after tool execution",
                "ja": "ツール実行後に安全上の注意を追加する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "打印欢迎语需要 SessionStart，拦截危险工具需要 PreToolUse，两个需求对应两个不同事件。单个需求只需一个事件即可满足。",
            "en": "Printing a welcome message needs SessionStart; intercepting dangerous tools needs PreToolUse. Two requirements correspond to two different events. A single requirement only needs one event.",
            "ja": "ウェルカムメッセージの表示は SessionStart が必要で、危険なツールのブロックは PreToolUse が必要です。2 つの要件が 2 つの異なるイベントに対応します。単一の要件は 1 つのイベントで十分です。"
          },
          "reward_card": "card_s08_002"
        },
        {
          "id": "q_s08_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "有人说 Hook 就是主循环里为每种扩展写的 if/else，这种说法错在哪里？",
            "en": "Someone says a Hook is just an if/else written in the main loop for each extension. What is wrong with this statement?",
            "ja": "Hook とはメインループの中に各拡張のために書かれた if/else だという主張の誤りはどこにありますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Hook 只能在会话开始时执行，不能在工具执行前后触发",
                "en": "Hooks can only execute at session start, not before or after tool execution",
                "ja": "Hook はセッション開始時にしか実行できず、ツール実行の前後では発火しない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Hook 必须返回退出码，if/else 不需要",
                "en": "Hooks must return an exit code; if/else does not",
                "ja": "Hook は終了コードを返さなければならないが、if/else は不要"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Hook 是主循环暴露的调用接口，扩展逻辑在外部实现，主循环无需理解每个扩展",
                "en": "Hooks are call interfaces exposed by the main loop; extension logic lives outside, and the main loop does not need to understand each extension",
                "ja": "Hook はメインループが公開する呼び出し口で、拡張ロジックは外部に実装され、メインループは各拡張を理解しなくてよい"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "if/else 比 Hook 执行速度慢，所以不推荐",
                "en": "if/else is slower than Hooks, so it is not recommended",
                "ja": "if/else は Hook より実行速度が遅いため推奨されない"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Hook 不是主循环里的 if/else。Hook 是主循环在固定时机暴露的调用接口，真正的扩展逻辑在外部实现。主循环只需知道事件、上下文和如何处理结果，不需要理解每个扩展的具体需求。",
            "en": "A Hook is not an if/else inside the main loop. It is a call interface the main loop exposes at fixed moments; the actual extension logic lives outside. The main loop only needs to know the event, the context, and how to handle the result — it does not need to understand each extension's specifics.",
            "ja": "Hook はメインループ内の if/else ではありません。固定タイミングでメインループが公開する呼び出し口であり、実際の拡張ロジックは外部に実装されます。メインループはイベント・コンテキスト・結果の処理方法だけを知ればよく、各拡張の詳細を理解する必要はありません。"
          },
          "reward_card": "card_s08_001"
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
