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
            {
              "id": "a",
              "text": {
                "zh": "把工具名映射到对应的处理函数",
                "en": "Map tool names to their handler functions",
                "ja": "ツール名をハンドラ関数にマッピングする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在发给 API 前清理 messages 列表",
                "en": "Clean up the messages list before sending to the API",
                "ja": "API に送信する前に messages リストを整理する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "验证文件操作路径是否在工作目录内",
                "en": "Validate that file paths stay inside the workspace",
                "ja": "ファイルパスがワークスペース内にあるか検証する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "定义工具的名称、描述和参数格式",
                "en": "Define tool name, description, and parameter format",
                "ja": "ツールの名前・説明・パラメータ形式を定義する"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "修改主循环，加入 if/else 分支处理新工具",
                "en": "Modify the main loop with a new if/else branch",
                "ja": "メインループに if/else 分岐を追加して対応する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在 dispatch map 加一条字典项，再写一个 handler 函数",
                "en": "Add one dict entry to the dispatch map and write one handler",
                "ja": "dispatch map に辞書エントリを追加し handler 関数を 1 つ書く"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "更新消息规范化逻辑，允许新工具的字段通过",
                "en": "Update normalization logic to allow new tool fields through",
                "ja": "新しいツールのフィールドを通すよう正規化ロジックを更新する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只写 schema，不需要 handler 函数",
                "en": "Only write a schema — no handler function needed",
                "ja": "schema だけ書けばよく handler 関数は不要"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "每个工具名对应一个 handler 函数",
                "en": "Each tool name corresponds to one handler function",
                "ja": "各ツール名はハンドラ関数に対応する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "加新工具时主循环代码不需要改动",
                "en": "Adding a new tool requires no changes to the main loop",
                "ja": "新ツール追加時にメインループの変更は不要"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "dispatch map 负责验证文件路径不超出工作目录",
                "en": "The dispatch map validates that file paths stay within the workspace",
                "ja": "dispatch map がファイルパスのサンドボックス検証を担う"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "dispatch map 本质上是一个字典结构",
                "en": "A dispatch map is essentially a dictionary structure",
                "ja": "dispatch map は本質的に辞書構造である"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "靠模型自觉遵守工作目录限制，无需代码验证",
                "en": "Relies on the model to self-enforce workspace limits — no code validation needed",
                "ja": "モデルが自律的にワークスペース制限を守るため検証コードは不要"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在 API 消息规范化时过滤掉越界路径",
                "en": "Filters out out-of-bounds paths during API message normalization",
                "ja": "API メッセージ正規化時に範囲外パスをフィルタリングする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "在 tool schema 里限制参数格式，防止模型生成越界路径",
                "en": "Restricts parameter format in the tool schema to prevent out-of-bounds paths",
                "ja": "tool schema でパラメータ形式を制限し範囲外パスを防ぐ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "在工具层的 handler 中验证路径，确保文件操作限定在工作目录内",
                "en": "Validates paths inside the tool handler to keep file ops within the workspace",
                "ja": "ツール層の handler でパスを検証し、ファイル操作をワークスペース内に限定する"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "模型生成的 tool schema 格式会出错",
                "en": "The model-generated tool schema format will be incorrect",
                "ja": "モデルが生成する tool schema の形式に誤りが生じる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "dispatch map 无法找到对应的 handler",
                "en": "The dispatch map will fail to find the corresponding handler",
                "ja": "dispatch map が対応する handler を見つけられなくなる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "API 会拒绝接受 messages，因为格式不符合规范",
                "en": "The API will reject the messages due to non-compliant format",
                "ja": "API が規格外の形式として messages を拒否する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型可能访问工作目录以外的系统文件",
                "en": "The model may access system files outside the workspace",
                "ja": "モデルがワークスペース外のシステムファイルにアクセスする可能性がある"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "工具层运行速度更快，减少延迟",
                "en": "The tool layer runs faster and reduces latency",
                "ja": "ツール層の方が高速でレイテンシを削減できる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型不可被完全信任，代码验证比提示约束更可靠",
                "en": "The model cannot be fully trusted; code validation is more reliable than prompt constraints",
                "ja": "モデルは完全には信頼できず、コード検証の方がプロンプト制約より信頼性が高い"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "API 要求所有路径必须在工具层做格式检查",
                "en": "The API requires all paths to be format-checked at the tool layer",
                "ja": "API がすべてのパスをツール層で形式チェックすることを要求している"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "dispatch map 字典查找只支持工具层的路径格式",
                "en": "The dispatch map dictionary lookup only supports tool-layer path formats",
                "ja": "dispatch map の辞書検索はツール層のパス形式のみをサポートする"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "user/assistant 可以连续出现，顺序不限",
                "en": "user/assistant messages can appear consecutively in any order",
                "ja": "user/assistant は連続して任意の順番で現れてよい"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "tool_use 块不需要对应的 tool_result，模型自动补全",
                "en": "tool_use blocks need no matching tool_result — the model fills them in",
                "ja": "tool_use ブロックに対応する tool_result は不要でモデルが補完する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "user/assistant 严格交替，每个 tool_use 有匹配 tool_result，只接受标准字段",
                "en": "Strict user/assistant alternation, each tool_use has a matching tool_result, only standard fields accepted",
                "ja": "user/assistant は厳密に交互、各 tool_use に tool_result が対応、標準フィールドのみ受け付ける"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只需要工具名和参数，不需要维护 role 字段",
                "en": "Only tool name and params are needed — the role field is not required",
                "ja": "ツール名とパラメータだけ必要で role フィールドは不要"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "内部 messages 可能包含 API 不接受的格式或字段",
                "en": "Internal messages may contain formats or fields the API does not accept",
                "ja": "内部の messages には API が受け付けない形式やフィールドが含まれる場合がある"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "dispatch map 要求在调用 handler 前先规范化参数",
                "en": "The dispatch map requires parameters to be normalized before calling the handler",
                "ja": "dispatch map は handler 呼び出し前にパラメータの正規化を要求する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "路径沙箱验证需要规范化后的消息格式才能运行",
                "en": "Path sandbox validation requires normalized message format to run",
                "ja": "パスサンドボックス検証は正規化されたメッセージ形式を必要とする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "tool schema 生成依赖规范化后的 messages 结构",
                "en": "Tool schema generation depends on the normalized messages structure",
                "ja": "tool schema の生成は正規化された messages 構造に依存する"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "消息列表里有一个 tool_use 块但没有对应的 tool_result",
                "en": "A tool_use block in the message list has no matching tool_result",
                "ja": "メッセージリストに対応する tool_result のない tool_use ブロックがある"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "dispatch map 包含超过 10 个工具条目",
                "en": "The dispatch map contains more than 10 tool entries",
                "ja": "dispatch map に 10 個を超えるツールエントリがある"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "文件 handler 在工具层做了路径验证",
                "en": "The file handler performs path validation at the tool layer",
                "ja": "ファイル handler がツール層でパス検証を実行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "tool schema 描述字段超过 200 字符",
                "en": "The tool schema description field exceeds 200 characters",
                "ja": "tool schema の description フィールドが 200 文字を超える"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "完全相同，内部 messages 直接发给 API，无需任何处理",
                "en": "Identical — internal messages are sent to the API directly with no processing",
                "ja": "完全に同じで、内部 messages はそのまま API に送られる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "内部 messages 仅供 dispatch map 路由使用，不发给 API",
                "en": "Internal messages are only for dispatch map routing and never sent to the API",
                "ja": "内部 messages は dispatch map のルーティングにのみ使われ API には送らない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "内部 messages 可能包含额外状态，发送前需规范化以符合 API 要求",
                "en": "Internal messages may contain extra state; they must be normalized before sending to meet API requirements",
                "ja": "内部 messages には追加の状態が含まれる場合があり、API 要件を満たすために送信前に正規化が必要"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "每次调用工具后必须清空 messages，重新向 API 发送对话历史",
                "en": "After each tool call, messages must be cleared and conversation history resent to the API from scratch",
                "ja": "ツール呼び出し後は messages をクリアし、API に会話履歴を最初から再送しなければならない"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "定义工具名、描述和参数格式，告诉模型能调什么",
                "en": "Define tool name, description, and parameter format so the model knows what it can call",
                "ja": "ツール名・説明・パラメータ形式を定義し、モデルが呼び出せるものを知らせる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在工具层验证文件路径，防止越界访问",
                "en": "Validate file paths at the tool layer to prevent out-of-bounds access",
                "ja": "ツール層でファイルパスを検証し、範囲外アクセスを防ぐ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "把工具名映射到 handler，实现 dispatch 路由",
                "en": "Map tool names to handlers for dispatch routing",
                "ja": "ツール名を handler にマッピングして dispatch ルーティングを実現する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "规范化 messages 中的字段，确保符合 API 标准",
                "en": "Normalize fields in messages to ensure API compliance",
                "ja": "messages のフィールドを正規化して API 標準に準拠させる"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "API 会因为 messages 格式不合规而拒绝请求",
                "en": "The API rejects the request due to non-compliant message format",
                "ja": "messages の形式が不適切として API がリクエストを拒否する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型可能按照 schema 调用工具，但 handler 无法正确处理，导致错误",
                "en": "The model may call the tool per the schema, but the handler cannot process it correctly, causing errors",
                "ja": "モデルが schema に従いツールを呼び出しても handler が正しく処理できずエラーになる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "dispatch map 字典查找失败，主循环崩溃",
                "en": "The dispatch map lookup fails and the main loop crashes",
                "ja": "dispatch map の検索が失敗しメインループがクラッシュする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "路径沙箱无法初始化，工作目录访问被全部阻断",
                "en": "The path sandbox fails to initialize, blocking all workspace access",
                "ja": "パスサンドボックスが初期化できず、ワークスペースへのすべてのアクセスがブロックされる"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "直接执行工具的 handler 函数，绕过 dispatch map",
                "en": "Directly executes the tool handler, bypassing the dispatch map",
                "ja": "dispatch map を迂回してツールの handler を直接実行する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "生成符合 schema 定义的 tool_use 块，交由 dispatch map 路由执行",
                "en": "Generates tool_use blocks conforming to the schema, which the dispatch map routes for execution",
                "ja": "schema に適合した tool_use ブロックを生成し、dispatch map がルーティングして実行する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "验证 handler 函数的路径参数是否在工作目录内",
                "en": "Validates whether handler path parameters are within the workspace",
                "ja": "handler のパスパラメータがワークスペース内にあるか検証する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "在发送前自动规范化 messages 以满足 API 要求",
                "en": "Automatically normalizes messages before sending to satisfy API requirements",
                "ja": "API 要件を満たすため送信前に messages を自動的に正規化する"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "schema 负责路径验证；handler 负责消息规范化",
                "en": "Schema handles path validation; handler handles message normalization",
                "ja": "schema がパス検証を担当し、handler がメッセージ正規化を担当する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "schema 负责把工具名路由到 handler；handler 负责定义工具参数格式",
                "en": "Schema routes tool names to handlers; handler defines tool parameter format",
                "ja": "schema がツール名を handler にルーティングし、handler がツールパラメータ形式を定義する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "schema 告诉模型工具的名称和参数格式；handler 真正执行工具逻辑",
                "en": "Schema tells the model the tool name and parameter format; handler actually executes the tool logic",
                "ja": "schema がモデルにツール名とパラメータ形式を伝え、handler がツールロジックを実際に実行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "schema 和 handler 都负责路径沙箱，形成双重验证",
                "en": "Both schema and handler handle path sandboxing, forming double validation",
                "ja": "schema と handler の両方がパスサンドボックスを担当し、二重検証を形成する"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "dispatch map（路由）+ 路径沙箱（安全）+ 消息规范化（API 合规）",
                "en": "Dispatch map (routing) + path sandbox (security) + message normalization (API compliance)",
                "ja": "dispatch map（ルーティング）+ パスサンドボックス（セキュリティ）+ メッセージ正規化（API 準拠）"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "tool schema（路由）+ dispatch map（安全）+ handler（API 合规）",
                "en": "Tool schema (routing) + dispatch map (security) + handler (API compliance)",
                "ja": "tool schema（ルーティング）+ dispatch map（セキュリティ）+ handler（API 準拠）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "路径沙箱（路由）+ 消息规范化（安全）+ dispatch map（API 合规）",
                "en": "Path sandbox (routing) + message normalization (security) + dispatch map (API compliance)",
                "ja": "パスサンドボックス（ルーティング）+ メッセージ正規化（セキュリティ）+ dispatch map（API 準拠）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "tool schema（安全）+ 消息规范化（路由）+ 路径沙箱（API 合规）",
                "en": "Tool schema (security) + message normalization (routing) + path sandbox (API compliance)",
                "ja": "tool schema（セキュリティ）+ メッセージ正規化（ルーティング）+ パスサンドボックス（API 準拠）"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "只需要 1 处：在主循环加一个 if/else 分支",
                "en": "Only 1 place: add an if/else branch in the main loop",
                "ja": "1 箇所のみ：メインループに if/else 分岐を追加する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "至少 3 处：主循环 + 路径验证 + 消息规范化",
                "en": "At least 3 places: main loop + path validation + message normalization",
                "ja": "少なくとも 3 箇所：メインループ + パス検証 + メッセージ正規化"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "不需要改任何代码，dispatch map 会自动发现新工具",
                "en": "No code changes needed — the dispatch map auto-discovers new tools",
                "ja": "コード変更不要、dispatch map が新しいツールを自動検出する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "2 处：加 handler 函数 + 在 dispatch map 加一条字典项；schema 视需要加",
                "en": "2 places: add handler + add one entry in dispatch map; schema is added as needed",
                "ja": "2 箇所：handler を追加 + dispatch map に 1 エントリ追加、schema は必要に応じて追加"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "schema 是可选的；不提供时 dispatch map 自动生成默认 schema",
                "en": "Schema is optional; the dispatch map auto-generates a default schema when absent",
                "ja": "schema はオプション；ない場合 dispatch map がデフォルト schema を自動生成する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "schema 是必须的；不提供时路径沙箱无法初始化，工具被禁用",
                "en": "Schema is required; without it the path sandbox cannot initialize and the tool is disabled",
                "ja": "schema は必須；ない場合パスサンドボックスが初期化できずツールが無効化される"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "schema 仅用于消息规范化；不提供时 API 拒绝所有 tool_use 请求",
                "en": "Schema is only for message normalization; without it the API rejects all tool_use requests",
                "ja": "schema はメッセージ正規化のみに使われる；ない場合 API がすべての tool_use リクエストを拒否する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "schema 告诉模型工具存在；不提供时模型不知道可以调用该工具，不会生成对应 tool_use",
                "en": "Schema informs the model the tool exists; without it the model does not know it can call the tool and will not generate a tool_use",
                "ja": "schema がモデルにツールの存在を伝える；ない場合モデルはそのツールを呼び出せると知らず、tool_use を生成しない"
              }
            }
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
            {
              "id": "a",
              "text": {
                "zh": "schema 运行在工具层，handler 运行在 API 层",
                "en": "Schema runs at the tool layer; handler runs at the API layer",
                "ja": "schema はツール層で動作し、handler は API 層で動作する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "schema 是给模型看的声明，handler 是给运行时执行的实现",
                "en": "Schema is a declaration for the model; handler is an implementation for the runtime to execute",
                "ja": "schema はモデル向けの宣言であり、handler はランタイムが実行する実装である"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "schema 负责路径安全验证，handler 负责消息规范化",
                "en": "Schema handles path security validation; handler handles message normalization",
                "ja": "schema がパスセキュリティ検証を担当し、handler がメッセージ正規化を担当する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "schema 和 handler 都存储在 dispatch map 字典中",
                "en": "Both schema and handler are stored in the dispatch map dictionary",
                "ja": "schema と handler の両方が dispatch map 辞書に格納されている"
              }
            }
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
            "zh": "Memory 系统存储信息的核心标准是什么？",
            "en": "What is the core criterion for storing information in Memory?",
            "ja": "Memory システムに情報を保存する核心基準は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "只要是重要信息就存入 memory",
                "en": "Store anything that seems important",
                "ja": "重要そうな情報はすべて保存する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "跨会话仍有价值且不能轻易从代码推出来的信息",
                "en": "Information valuable across sessions and not easily derived from code",
                "ja": "セッションをまたいで価値があり、コードから推測できない情報"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "当前任务中用得上的所有背景信息",
                "en": "All context needed for the current task",
                "ja": "現在のタスクに必要なすべてのコンテキスト"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用户说过的每一句话",
                "en": "Every statement made by the user",
                "ja": "ユーザーが言ったすべてのこと"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "Memory 只保存「以后还可能有价值、但代码里不容易直接看出来」的信息。不是什么都存——能从代码读到的、当前任务才用的、很快过时的，都不该进 memory。",
            "en": "Memory stores only information that remains valuable across sessions and cannot be easily derived from the current codebase. Not everything belongs in memory.",
            "ja": "Memory は将来も価値があり、コードから推測しにくい情報のみを保存します。すべてを保存するわけではありません。"
          },
          "reward_card": "card_s09_001"
        },
        {
          "id": "q_s09_002",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "用户提到「我的代码风格偏向函数式编程，尽量避免 class」。这条信息属于哪类 memory？",
            "en": "A user says 'I prefer functional programming style, avoid classes'. Which memory type is this?",
            "ja": "ユーザーが『関数型プログラミングスタイルが好き、classは避けて』と言いました。これはどの memory タイプですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "feedback",
                "en": "feedback",
                "ja": "feedback"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "project",
                "en": "project",
                "ja": "project"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "reference",
                "en": "reference",
                "ja": "reference"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "user",
                "en": "user",
                "ja": "user"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "user 类型记录用户本人的信息——偏好、背景、习惯。函数式风格是用户个人的编码偏好，属于 user 类，而非 feedback（对 AI 输出的指导）或 project（项目动态）。",
            "en": "The user type records personal user information — preferences, background, habits. A coding style preference belongs to user, not feedback or project.",
            "ja": "user タイプはユーザー自身の情報（好み、背景、習慣）を記録します。コーディングスタイルの好みは user に属します。"
          },
          "reward_card": "card_s09_002"
        },
        {
          "id": "q_s09_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "Memory 系统的文件结构是怎样的？",
            "en": "What is the file structure of the Memory system?",
            "ja": "Memory システムのファイル構造はどうなっていますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "所有 memory 写进一个大的 JSON 文件",
                "en": "All memories written into one large JSON file",
                "ja": "すべての memory を一つの大きな JSON ファイルに書く"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "每类 memory 对应一个文件夹，无索引文件",
                "en": "One folder per memory type, no index file",
                "ja": "memory タイプごとにフォルダを作り、インデックスファイルなし"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "一条 memory 一个 .md 文件（frontmatter + content），加一个 MEMORY.md 索引",
                "en": "One .md file per memory (frontmatter + content), plus a MEMORY.md index",
                "ja": "memory 1 件につき .md ファイル 1 つ（frontmatter + content）、MEMORY.md インデックスを追加"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "memory 直接写进 CLAUDE.md，不需要单独文件",
                "en": "Memory written directly into CLAUDE.md, no separate files needed",
                "ja": "memory は CLAUDE.md に直接書き、別ファイル不要"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "一条 memory 对应一个 .md 文件，文件包含 frontmatter 元信息和正文内容，另有一个 MEMORY.md 作为索引文件。这种结构简单，易于单独更新或删除某条 memory。",
            "en": "One .md file per memory entry with frontmatter metadata and content, plus a MEMORY.md index file. This structure makes individual memory entries easy to update or remove.",
            "ja": "memory 1 件につき frontmatter と内容を持つ .md ファイル 1 つ、さらに MEMORY.md インデックスファイルがあります。"
          },
          "reward_card": "card_s09_003"
        },
        {
          "id": "q_s09_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "AI 在某次对话中给了一个建议，用户回复「以后生成代码时先列出测试用例再写实现」。这属于哪类 memory？",
            "en": "The user tells the AI: 'Next time, list test cases before writing implementation'. Which memory type is this?",
            "ja": "ユーザーが『次回は実装前にテストケースを列挙して』と言いました。これはどの memory タイプですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "feedback",
                "en": "feedback",
                "ja": "feedback"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "user",
                "en": "user",
                "ja": "user"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "project",
                "en": "project",
                "ja": "project"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "reference",
                "en": "reference",
                "ja": "reference"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "feedback 类型记录用户对 AI 输出风格和行为的指导意见——「下次怎么做」「这种风格不喜欢」等。这条「先列测试再写实现」是对 AI 行为的反馈指导，不是用户个人信息，也不是项目状态。",
            "en": "The feedback type records guidance about how the AI should behave — 'next time do X'. This instruction about test-first is feedback guidance, not user background or project state.",
            "ja": "feedback タイプは AI の行動に関する指導（『次回は X して』）を記録します。これはフィードバック指導であり、ユーザー情報やプロジェクト状態ではありません。"
          },
          "reward_card": "card_s09_002"
        },
        {
          "id": "q_s09_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "下面哪种信息「不该」存入 memory？",
            "en": "Which of the following should NOT be stored in memory?",
            "ja": "次のうち memory に保存すべきでないのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "用户常用的 API 文档地址",
                "en": "A frequently referenced API documentation URL",
                "ja": "よく参照する API ドキュメントの URL"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "用户反复强调「不要使用 any 类型」",
                "en": "User repeatedly emphasizes 'never use any type'",
                "ja": "ユーザーが繰り返し強調する『any 型を使わないで』"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "用户的工作时区（每次对话都要问）",
                "en": "The user's timezone (asked every session)",
                "ja": "毎回確認が必要なユーザーのタイムゾーン"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "项目采用的数据库类型（从 package.json 可以直接读出来）",
                "en": "The database type used in the project (readable from package.json)",
                "ja": "プロジェクトのデータベース種別（package.json から読み取れる）"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "能从代码（如 package.json）直接读到的信息不该进 memory——memory 的价值在于补充代码里看不出来的东西。数据库类型在项目文件里就有，不需要 memory 重复记录。",
            "en": "Information that can be directly read from code (like package.json) should not go into memory. Memory's value is supplementing what cannot be derived from the codebase.",
            "ja": "コード（package.json など）から直接読み取れる情報は memory に入れるべきではありません。memory の価値はコードから推測できないことを補うことにあります。"
          },
          "reward_card": "card_s09_001"
        },
        {
          "id": "q_s09_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "「这个项目目前正在从 REST API 迁移到 GraphQL，预计下周完成」属于哪类 memory？",
            "en": "'This project is migrating from REST to GraphQL, expected done next week.' Which memory type?",
            "ja": "『このプロジェクトは REST から GraphQL に移行中、来週完了予定』はどの memory タイプですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "user",
                "en": "user",
                "ja": "user"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "reference",
                "en": "reference",
                "ja": "reference"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "feedback",
                "en": "feedback",
                "ja": "feedback"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "project",
                "en": "project",
                "ja": "project"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "project 类型记录项目的动态状态——当前进展、架构决策、阶段性目标等。正在进行的迁移工作是项目动态，不是用户个人信息，也不是外部资源指针。",
            "en": "The project type records the project's dynamic state — current progress, architectural decisions, phase goals. An ongoing migration is project state, not user info or an external resource.",
            "ja": "project タイプはプロジェクトの動的状態（現在の進捗、アーキテクチャ決定、フェーズ目標）を記録します。進行中の移行作業はプロジェクト状態です。"
          },
          "reward_card": "card_s09_002"
        },
        {
          "id": "q_s09_007",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "某条 memory 记录「用户偏好 TypeScript」，但代码库里 tsconfig.json 和所有源文件已经清楚说明项目是 TypeScript。这条 memory 有什么问题？",
            "en": "A memory records 'user prefers TypeScript', but tsconfig.json and all source files already show this. What is the problem?",
            "ja": "memory に『TypeScript を好む』と記録されていますが、tsconfig.json と全ソースが既にそれを示しています。この memory の問題は？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "违反了「不存能从代码读到的信息」原则，属于冗余 memory",
                "en": "Violates the 'don't store what code already shows' principle; redundant memory",
                "ja": "「コードから読み取れる情報は保存しない」原則に違反しており、冗長な memory"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "应该改为 feedback 类型",
                "en": "It should be reclassified as feedback type",
                "ja": "feedback タイプに再分類すべき"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "memory 文件应该用 JSON 格式而非 .md 格式",
                "en": "Memory files should use JSON format, not .md format",
                "ja": "memory ファイルは .md ではなく JSON 形式を使うべき"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "这条信息应该写进 CLAUDE.md 而非 memory",
                "en": "This info should go into CLAUDE.md, not memory",
                "ja": "この情報は memory ではなく CLAUDE.md に書くべき"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Memory 的核心原则之一是：能从代码重新读到的信息不应该进 memory。代码库已经清楚表明项目是 TypeScript，再存一条「用户偏好 TypeScript」就是冗余——浪费存储，也可能与代码实际状态脱节。",
            "en": "One of memory's core principles: don't store what can be re-derived from code. The codebase already shows TypeScript; storing 'user prefers TypeScript' is redundant and may drift from reality.",
            "ja": "memory の核心原則の一つ：コードから再導出できる情報は保存しない。コードベースがすでに TypeScript であることを示しているため、保存は冗長です。"
          },
          "reward_card": "card_s09_001"
        },
        {
          "id": "q_s09_008",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "MEMORY.md 文件在 memory 系统中的作用是什么？",
            "en": "What role does the MEMORY.md file play in the memory system?",
            "ja": "MEMORY.md ファイルは memory システムでどんな役割を果たしますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "作为索引文件，指向各条 memory 的 .md 文件",
                "en": "Acts as an index file pointing to individual memory .md files",
                "ja": "各 memory の .md ファイルを指すインデックスファイルとして機能する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "存储所有 memory 的完整内容",
                "en": "Stores the full content of all memories",
                "ja": "すべての memory の完全なコンテンツを格納する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "替代 CLAUDE.md 管理长期规则",
                "en": "Replaces CLAUDE.md for managing long-term rules",
                "ja": "CLAUDE.md に代わって長期ルールを管理する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记录当前任务的执行计划",
                "en": "Records the execution plan for the current task",
                "ja": "現在のタスクの実行計画を記録する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "MEMORY.md 是索引文件，列出所有 memory 条目的指针，方便快速定位。每条具体的 memory 内容存在独立的 .md 文件中。这种分离让更新和删除单条 memory 变得简单。",
            "en": "MEMORY.md is the index file listing pointers to all memory entries for quick lookup. Each actual memory entry lives in its own .md file. This separation makes updating or deleting individual entries simple.",
            "ja": "MEMORY.md はすべての memory エントリへのポインタを列挙するインデックスファイルです。各 memory の内容は独自の .md ファイルに格納されます。"
          },
          "reward_card": "card_s09_003"
        },
        {
          "id": "q_s09_009",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "「内部 Wiki 的地址是 https://wiki.internal/arch」属于哪类 memory？",
            "en": "'The internal Wiki URL is https://wiki.internal/arch'. Which memory type?",
            "ja": "『社内 Wiki の URL は https://wiki.internal/arch』はどの memory タイプですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "project",
                "en": "project",
                "ja": "project"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "user",
                "en": "user",
                "ja": "user"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "feedback",
                "en": "feedback",
                "ja": "feedback"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "reference",
                "en": "reference",
                "ja": "reference"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "reference 类型保存外部资源的指针——URL、文档链接、工具地址等。内部 Wiki 地址是一个外部资源指针，不是项目动态（project），也不是用户个人信息（user）。",
            "en": "The reference type stores pointers to external resources — URLs, documentation links, tool addresses. An internal Wiki URL is an external resource pointer, not project state or user info.",
            "ja": "reference タイプは外部リソースへのポインタ（URL、ドキュメントリンク、ツールアドレス）を保存します。社内 Wiki の URL は外部リソースポインタです。"
          },
          "reward_card": "card_s09_002"
        },
        {
          "id": "q_s09_010",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一条 memory 记录「本周正在修复登录 bug」。两周后这条 memory 还在。有什么问题？",
            "en": "A memory records 'fixing login bug this week'. Two weeks later it is still there. What is the problem?",
            "ja": "memory に『今週はログインバグを修正中』と記録されています。2 週間後もまだ残っています。問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "违反了「很快过时的信息不该进 memory」原则，属于应该及时清理的临时信息",
                "en": "Violates 'don't store rapidly-expiring info', this is temporary info that should be cleaned up",
                "ja": "『すぐに古くなる情報は保存しない』原則に違反しており、適時削除すべき一時的な情報"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "应该把这条记录从 project 类改为 feedback 类",
                "en": "Should reclassify from project to feedback type",
                "ja": "project タイプから feedback タイプに再分類すべき"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "这条信息应该写进 CLAUDE.md",
                "en": "This info should go into CLAUDE.md",
                "ja": "この情報は CLAUDE.md に書くべき"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "memory 文件 frontmatter 缺少过期时间字段",
                "en": "The memory file frontmatter is missing an expiration field",
                "ja": "memory ファイルの frontmatter に有効期限フィールドがない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "「很快过时的信息」不该进 memory，「本周修复 bug」是典型的临时性、任务级信息。这类信息属于 task/plan 管辖，任务结束就该清除，留在 memory 里只会产生噪音和误导。",
            "en": "Rapidly-expiring information should not go into memory. 'Fixing a bug this week' is typical temporary task-level info that belongs in task/plan and should be removed when done.",
            "ja": "すぐに古くなる情報は memory に入れるべきではありません。『今週バグ修正中』は task/plan が管轄する一時的なタスクレベル情報です。"
          },
          "reward_card": "card_s09_001"
        },
        {
          "id": "q_s09_011",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "memory 系统、task/plan 系统、CLAUDE.md 三者各自负责什么？",
            "en": "What do the memory system, task/plan system, and CLAUDE.md each manage?",
            "ja": "memory システム、task/plan システム、CLAUDE.md はそれぞれ何を管理しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "三者都管跨会话的长期信息",
                "en": "All three manage long-term cross-session information",
                "ja": "三つともセッションをまたぐ長期情報を管理する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "task/plan 管当前任务，memory 管跨会话价值，CLAUDE.md 管长期规则",
                "en": "task/plan manages current tasks, memory manages cross-session value, CLAUDE.md manages long-term rules",
                "ja": "task/plan は現在のタスク、memory はセッションをまたぐ価値、CLAUDE.md は長期ルールを管理する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "memory 管所有信息，task/plan 和 CLAUDE.md 只是格式变体",
                "en": "Memory manages everything; task/plan and CLAUDE.md are just format variants",
                "ja": "memory がすべてを管理し、task/plan と CLAUDE.md は形式のバリエーション"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "CLAUDE.md 管当前任务，memory 管规则，task/plan 管历史记录",
                "en": "CLAUDE.md manages current tasks, memory manages rules, task/plan manages history",
                "ja": "CLAUDE.md が現在のタスク、memory がルール、task/plan が履歴を管理する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "三者有清晰边界：task/plan 管当前任务的执行与追踪，memory 管跨会话仍有价值的信息，CLAUDE.md 管长期稳定的项目规则和约定。混用会导致信息噪音和维护困难。",
            "en": "The three have clear boundaries: task/plan tracks current task execution, memory preserves cross-session value, CLAUDE.md holds long-term stable project rules. Mixing them creates noise.",
            "ja": "三つには明確な境界があります。task/plan は現在のタスク実行、memory はセッションをまたぐ価値、CLAUDE.md は長期安定したプロジェクトルールを管理します。"
          },
          "reward_card": "card_s09_003"
        },
        {
          "id": "q_s09_012",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪项操作违反了 memory 使用规范？",
            "en": "Which of the following actions violates memory usage principles?",
            "ja": "次のうち memory の使用規則に違反するのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "将用户在多次会话中都提到的沟通风格偏好存入 user 类 memory",
                "en": "Storing a communication style preference the user mentions repeatedly into user memory",
                "ja": "複数のセッションで繰り返し言及するコミュニケーションスタイルの好みを user memory に保存する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把内部文档 URL 存入 reference 类 memory",
                "en": "Storing an internal documentation URL into reference memory",
                "ja": "社内ドキュメントの URL を reference memory に保存する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "把「今天下午要开会」存入 memory",
                "en": "Storing 'meeting this afternoon' into memory",
                "ja": "『今日の午後に会議がある』を memory に保存する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "把用户对代码审查风格的持续反馈存入 feedback 类 memory",
                "en": "Storing ongoing user feedback about code review style into feedback memory",
                "ja": "コードレビュースタイルに関する継続的なユーザーフィードバックを feedback memory に保存する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "「今天下午要开会」是典型的属于当前任务/当前时刻的临时信息，跨会话后毫无价值。这类即时性信息不该进 memory——memory 保存的是跨会话仍有价值的信息。",
            "en": "Meeting this afternoon is purely temporary, time-bound information with no cross-session value. Such immediate contextual information should not go into memory.",
            "ja": "『今日の午後の会議』は純粋に一時的で時間に縛られた情報であり、セッションをまたぐ価値がありません。memory に入れるべきではありません。"
          },
          "reward_card": "card_s09_001"
        },
        {
          "id": "q_s09_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个团队决定把「所有代码规范」都写进 memory 而不是 CLAUDE.md。这样做的主要问题是什么？",
            "en": "A team puts 'all coding standards' into memory instead of CLAUDE.md. What is the main problem?",
            "ja": "チームがすべてのコーディング規約を CLAUDE.md ではなく memory に書いています。主な問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "memory 文件大小有限制，会超出容量",
                "en": "Memory files have size limits that will be exceeded",
                "ja": "memory ファイルにはサイズ制限があり、容量を超えてしまう"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "memory 的 frontmatter 不支持存储规则类内容",
                "en": "Memory frontmatter does not support rule-type content",
                "ja": "memory の frontmatter はルール系コンテンツの保存をサポートしていない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "混淆了 memory 与 CLAUDE.md 的边界——长期稳定规则属于 CLAUDE.md，memory 管的是动态的跨会话价值信息",
                "en": "Blurs the boundary: long-term stable rules belong in CLAUDE.md; memory handles dynamic cross-session value info",
                "ja": "境界を混同している。長期安定ルールは CLAUDE.md に属し、memory は動的なセッションをまたぐ価値情報を管理する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "代码规范应该存入 reference 类 memory，不是普通 memory",
                "en": "Coding standards should go into reference memory, not general memory",
                "ja": "コーディング規約は一般 memory ではなく reference memory に入れるべき"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "CLAUDE.md 专门负责长期稳定的项目规则和约定——代码风格、架构约束、开发流程等。把这类信息放进 memory 是边界混淆，会让两个系统都难以维护，也让 AI 不清楚信息的权威性。",
            "en": "CLAUDE.md is specifically for long-term stable project rules and conventions. Putting them in memory blurs the boundary between the two systems and makes it unclear which source is authoritative.",
            "ja": "CLAUDE.md は長期安定したプロジェクトルールと規約専用です。それを memory に入れると二つのシステムの境界が曖昧になり、どちらが権威あるソースか不明確になります。"
          },
          "reward_card": "card_s09_003"
        },
        {
          "id": "q_s09_014",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "memory 文件的 .md 格式中，frontmatter 的作用是什么？",
            "en": "In a memory .md file, what is the purpose of the frontmatter?",
            "ja": "memory の .md ファイルにおける frontmatter の目的は何ですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "存储 memory 的正文内容",
                "en": "Stores the main body content of the memory",
                "ja": "memory の本文コンテンツを格納する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "作为 MEMORY.md 的替代索引",
                "en": "Serves as an alternative index replacing MEMORY.md",
                "ja": "MEMORY.md に代わる代替インデックスとして機能する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "存储该条 memory 的元信息，如类型、创建时间、标签等",
                "en": "Stores metadata for the memory entry such as type, creation time, tags",
                "ja": "memory エントリのメタ情報（タイプ、作成日時、タグなど）を格納する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "标记该文件是构建产物，不可手动编辑",
                "en": "Marks the file as a build artifact that should not be edited manually",
                "ja": "このファイルが手動編集不可のビルド成果物であることをマークする"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "frontmatter 是 .md 文件顶部用 --- 分隔的 YAML 区块，用于存储元信息：memory 的类型（user/feedback/project/reference）、创建时间、相关标签等。正文内容在 frontmatter 下方。",
            "en": "The frontmatter is the YAML block at the top of a .md file (delimited by ---) that stores metadata: memory type, creation time, tags. The actual content follows below.",
            "ja": "frontmatter は .md ファイルの先頭の --- で区切られた YAML ブロックで、メタ情報（memory タイプ、作成日時、タグ）を格納します。"
          },
          "reward_card": "card_s09_003"
        },
        {
          "id": "q_s09_015",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪个场景最适合使用 memory？",
            "en": "Which scenario is most suitable for using memory?",
            "ja": "次のうち memory を使うのに最も適したシナリオはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "记录「当前 PR #456 正在 review 中」",
                "en": "Recording 'PR #456 is currently under review'",
                "ja": "『現在 PR #456 がレビュー中』を記録する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "记录项目的 lint 规则（已在 .eslintrc 中定义）",
                "en": "Recording the project's lint rules (already defined in .eslintrc)",
                "ja": "プロジェクトの lint ルールを記録する（すでに .eslintrc に定義済み）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "记录用户多次强调「提交信息要遵循 Conventional Commits」",
                "en": "Recording that the user repeatedly emphasizes 'commit messages must follow Conventional Commits'",
                "ja": "ユーザーが繰り返し強調する『コミットメッセージは Conventional Commits に従う』を記録する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记录「今天要实现登录功能」",
                "en": "Recording 'implement login feature today'",
                "ja": "『今日はログイン機能を実装する』を記録する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "用户反复强调的提交规范是典型的 feedback 类 memory：跨会话有价值（每次提交都需要），代码里看不出来，不会很快过时。其他选项要么是临时任务信息，要么能从配置文件直接读取。",
            "en": "A repeatedly-emphasized commit convention is ideal feedback memory: valuable across sessions, not derivable from code, and not rapidly expiring. The other options are temporary tasks or info already in config files.",
            "ja": "繰り返し強調されるコミット規約は理想的な feedback memory です。セッションをまたいで価値があり、コードから導出できず、すぐに古くなりません。"
          },
          "reward_card": "card_s09_002"
        },
        {
          "id": "q_s09_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "同一条信息，既可以归入 project memory，也可以写进 CLAUDE.md。应该怎么判断放哪里？",
            "en": "The same information could go into project memory or CLAUDE.md. How do you decide?",
            "ja": "同じ情報が project memory にも CLAUDE.md にも入れられます。どちらに入れるか、どう判断しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先写进 memory，等稳定了再移到 CLAUDE.md",
                "en": "Start in memory, move to CLAUDE.md once it stabilizes",
                "ja": "まず memory に書き、安定したら CLAUDE.md に移す"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "两处都写，保证任一系统都能查到",
                "en": "Write in both places to ensure either system can find it",
                "ja": "両方に書いて、どちらのシステムでも見つけられるようにする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只看文字长短，短的放 CLAUDE.md，长的放 memory",
                "en": "Based on length: short text in CLAUDE.md, long text in memory",
                "ja": "長さで判断：短い文章は CLAUDE.md、長い文章は memory に"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "动态变化的项目状态放 memory，长期稳定的规则放 CLAUDE.md",
                "en": "Dynamic changing project state goes in memory; long-term stable rules go in CLAUDE.md",
                "ja": "動的に変化するプロジェクト状態は memory に、長期安定ルールは CLAUDE.md に入れる"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "判断标准是信息的稳定性：「当前架构决策处于讨论阶段」是动态 project memory；「所有 API 必须有文档注释」是稳定规则，属于 CLAUDE.md。两处都写会造成重复和不一致，应该避免。",
            "en": "The criterion is stability: 'current architecture is under discussion' is dynamic project memory; 'all APIs must have doc comments' is a stable rule for CLAUDE.md. Writing in both creates duplication and inconsistency.",
            "ja": "判断基準は安定性です。『現在のアーキテクチャは議論中』は動的な project memory、『すべての API にドキュメントコメントが必要』は CLAUDE.md の安定ルールです。"
          },
          "reward_card": "card_s09_003"
        },
        {
          "id": "q_s09_017",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "「跨会话」在 memory 系统中的含义是什么？",
            "en": "What does 'cross-session' mean in the context of the memory system?",
            "ja": "memory システムにおける『セッションをまたぐ』とはどういう意味ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "在同一次对话中多次使用的信息",
                "en": "Information used multiple times within the same conversation",
                "ja": "同じ会話の中で複数回使われる情報"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在不同设备之间同步的信息",
                "en": "Information synchronized across different devices",
                "ja": "異なるデバイス間で同期される情報"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "在多次独立的 AI 对话中仍然有参考价值的信息",
                "en": "Information that retains value across multiple independent AI conversations",
                "ja": "複数の独立した AI 会話をまたいで参照価値を持つ情報"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "跨越不同代码仓库的信息",
                "en": "Information spanning across different code repositories",
                "ja": "異なるコードリポジトリをまたぐ情報"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "「跨会话」指的是跨越多次独立的 AI 对话。每次新对话，AI 没有上次的记忆，memory 文件的存在让 AI 能在每次会话中读取历史积累的重要信息，保持连续性。",
            "en": "Cross-session means across multiple independent AI conversations. Each new conversation starts fresh; memory files let the AI access historically accumulated important information and maintain continuity.",
            "ja": "セッションをまたぐとは、複数の独立した AI 会話をまたぐことを意味します。新しい会話のたびに AI には記憶がなく、memory ファイルにより過去の重要情報にアクセスできます。"
          },
          "reward_card": "card_s09_001"
        },
        {
          "id": "q_s09_018",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪种做法正确描述了 feedback 类 memory 与 user 类 memory 的区别？",
            "en": "Which statement correctly describes the difference between feedback and user memory types?",
            "ja": "feedback と user の memory タイプの違いを正しく説明しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "feedback 记录 AI 对用户的建议；user 记录用户对 AI 的反馈",
                "en": "feedback records AI suggestions to user; user records user feedback to AI",
                "ja": "feedback は AI からユーザーへの提案を記録し、user はユーザーから AI へのフィードバックを記録する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "feedback 记录用户对 AI 输出风格和行为的指导；user 记录用户自身的背景、偏好、身份信息",
                "en": "feedback records guidance on AI output style and behavior; user records the user's own background, preferences, identity",
                "ja": "feedback は AI の出力スタイルと行動に関する指導を記録し、user はユーザー自身の背景、好み、身元を記録する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "两者没有区别，都记录用户相关信息",
                "en": "No difference, both record user-related information",
                "ja": "違いはなく、どちらもユーザー関連情報を記録する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "feedback 是临时的，user 是永久的",
                "en": "feedback is temporary; user is permanent",
                "ja": "feedback は一時的で、user は永続的"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "区别在于信息指向：feedback 指向 AI 的行为——「生成代码时用这种格式」「这类建议不要给」；user 指向用户本人——「用户是后端工程师」「偏好简洁代码」。两类有清晰边界，不要混用。",
            "en": "The distinction is about what the info describes: feedback is about how the AI should behave; user is about who the user is. Clear boundaries help the AI apply the right information in the right context.",
            "ja": "区別は情報が何を説明するかにあります。feedback は AI がどう振る舞うべきか、user はユーザーが誰であるかを説明します。"
          },
          "reward_card": "card_s09_002"
        },
        {
          "id": "q_s09_019",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "用户要求 AI「把我们讨论的所有内容都记进 memory」。这个请求有什么潜在风险？",
            "en": "A user asks the AI to 'save everything we discussed into memory'. What is the potential risk?",
            "ja": "ユーザーが AI に『話し合ったことをすべて memory に保存して』と頼んでいます。潜在的なリスクは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "memory 的文件数量有上限，超过后系统崩溃",
                "en": "There is a file count limit on memory; exceeding it crashes the system",
                "ja": "memory のファイル数には上限があり、超えるとシステムがクラッシュする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "违反 memory 核心原则——把大量不符合标准的信息（临时、可从代码读到、很快过时）存入 memory，导致 memory 质量下降、噪音增加",
                "en": "Violates memory's core principle — storing large amounts of non-qualifying info (temporary, code-derivable, rapidly expiring), degrading memory quality with noise",
                "ja": "memory の核心原則に違反する。大量の基準を満たさない情報（一時的、コードから導出可能、すぐに古くなる）を保存し、memory の品質を低下させノイズを増やす"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "MEMORY.md 索引文件会损坏",
                "en": "The MEMORY.md index file will become corrupted",
                "ja": "MEMORY.md インデックスファイルが破損する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只有 project 类 memory 有容量限制",
                "en": "Only project memory type has a capacity limit",
                "ja": "project memory タイプのみ容量制限がある"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "Memory 不是对话记录，不是什么都存。大量存入临时信息、可从代码读到的信息、很快过时的信息，会让 memory 质量急剧下降。未来 AI 读取 memory 时，噪音淹没真正有价值的信息，反而降低了系统有效性。",
            "en": "Memory is not a conversation log. Storing temporary, code-derivable, or rapidly-expiring information degrades memory quality. Future sessions load noisy memory, drowning out genuinely valuable entries and reducing system effectiveness.",
            "ja": "memory は会話ログではありません。一時的な情報、コードから導出可能な情報、すぐに古くなる情報を大量に保存すると、memory の品質が急速に低下します。"
          },
          "reward_card": "card_s09_001"
        },
        {
          "id": "q_s09_020",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 memory 的四个类型中，哪个类型最容易与 CLAUDE.md 的内容重叠，需要特别注意边界？",
            "en": "Among the four memory types, which one most easily overlaps with CLAUDE.md content and requires careful boundary management?",
            "ja": "memory の 4 つのタイプのうち、CLAUDE.md のコンテンツと最も重複しやすく、境界管理に特別な注意が必要なのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "reference",
                "en": "reference",
                "ja": "reference"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "user",
                "en": "user",
                "ja": "user"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "feedback",
                "en": "feedback",
                "ja": "feedback"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "project",
                "en": "project",
                "ja": "project"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "feedback 类 memory 记录对 AI 行为的持续指导，而 CLAUDE.md 也包含 AI 应遵循的规则和约定。两者最容易重叠：短期反馈放 feedback memory，当反馈变成长期稳定规则时，应迁移到 CLAUDE.md。",
            "en": "Feedback memory records ongoing AI behavior guidance, and CLAUDE.md also contains rules for AI behavior. These two overlap most easily. Short-term feedback stays in feedback memory; when it stabilizes into a long-term rule, migrate it to CLAUDE.md.",
            "ja": "feedback memory は AI 行動への継続的な指導を記録し、CLAUDE.md も AI が従うべきルールを含みます。この二つが最も重複しやすいです。"
          },
          "reward_card": "card_s09_003"
        },
        {
          "id": "q_s09_021",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "memory 系统的四个类型是哪些？",
            "en": "What are the four types in the memory system?",
            "ja": "memory システムの 4 つのタイプは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "user、feedback、project、reference",
                "en": "user, feedback, project, reference",
                "ja": "user、feedback、project、reference"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "task、plan、memory、context",
                "en": "task, plan, memory, context",
                "ja": "task、plan、memory、context"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "short-term、long-term、session、global",
                "en": "short-term, long-term, session, global",
                "ja": "short-term、long-term、session、global"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "code、config、doc、log",
                "en": "code, config, doc, log",
                "ja": "code、config、doc、log"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "memory 系统的四个类型是：user（用户信息）、feedback（反馈指导）、project（项目动态）、reference（外部资源指针）。四类各有清晰边界，不应混用。",
            "en": "The four memory types are: user (user information), feedback (guidance on AI behavior), project (project dynamics), reference (external resource pointers). Each has clear boundaries.",
            "ja": "memory システムの 4 つのタイプは：user（ユーザー情報）、feedback（フィードバック指導）、project（プロジェクト動態）、reference（外部リソースポインタ）です。"
          },
          "reward_card": "card_s09_002"
        },
        {
          "id": "q_s09_022",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个项目决定不使用 memory 系统，而是把所有持久化信息全部写进 CLAUDE.md。这会带来什么核心问题？",
            "en": "A project decides to skip memory and write all persistent info into CLAUDE.md. What is the core problem?",
            "ja": "プロジェクトが memory システムを使わず、すべての永続情報を CLAUDE.md に書くことにしました。核心的な問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "CLAUDE.md 不支持 frontmatter 格式",
                "en": "CLAUDE.md does not support frontmatter format",
                "ja": "CLAUDE.md は frontmatter 形式をサポートしていない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "CLAUDE.md 文件会变得臃肿、难以维护，把动态项目状态和长期规则混在一起，降低了两类信息的可读性和可维护性",
                "en": "CLAUDE.md becomes bloated and hard to maintain, mixing dynamic state with long-term rules, reducing readability and maintainability of both",
                "ja": "CLAUDE.md が肥大化して維持困難になり、動的状態と長期ルールが混在して、両方の情報の可読性と保守性が低下する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md 只能被 AI 读取，无法存储用户信息",
                "en": "CLAUDE.md can only be read by AI and cannot store user information",
                "ja": "CLAUDE.md は AI しか読めず、ユーザー情報を格納できない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "CLAUDE.md 在项目开始时就固定不变，不能动态更新",
                "en": "CLAUDE.md is fixed at project start and cannot be dynamically updated",
                "ja": "CLAUDE.md はプロジェクト開始時に固定され、動的に更新できない"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "CLAUDE.md 的设计初衷是存放长期稳定的规则，如果把动态的 project/feedback/user 信息也塞进去，文件会快速膨胀，规则和状态信息混杂在一起，让 AI 和开发者都难以分辨哪些是稳定约定、哪些是当前状态。",
            "en": "CLAUDE.md is designed for long-term stable rules. Mixing in dynamic project/feedback/user info causes it to bloat quickly, making it hard for both AI and developers to distinguish stable conventions from current state.",
            "ja": "CLAUDE.md は長期安定ルール用に設計されています。動的な project/feedback/user 情報も詰め込むと、ファイルが急速に肥大化し、安定した規約と現在の状態の区別が困難になります。"
          },
          "reward_card": "card_s09_003"
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
            "zh": "构建 system prompt 的核心思路是什么？",
            "en": "What is the core idea behind building a system prompt?",
            "ja": "system prompt を構築する際の核心的な考え方は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "把所有说明写成一段超长的自然语言文本",
                "en": "Write all instructions as one long natural-language paragraph",
                "ja": "すべての指示を一つの長い自然言語テキストにまとめる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把不同来源按清晰边界组装成一条流水线",
                "en": "Assemble different sources with clear boundaries into a pipeline",
                "ja": "異なるソースを明確な境界で組み立ててパイプラインにする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只保留核心指令，其余来源在对话轮次中动态追加",
                "en": "Keep only core instructions and append other sources per turn",
                "ja": "コア指示のみを保持し、他のソースはターンごとに動的に追加する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "每次调用都随机打乱各段的顺序",
                "en": "Randomly shuffle the order of segments each time",
                "ja": "毎回呼び出すたびに各セグメントの順序をランダムにシャッフルする"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "Prompt 的关键不是写一段很长的话，而是把不同来源按清晰边界组装。这样每个部分各司其职，便于维护和调试。",
            "en": "The key to a good system prompt is not writing one long text, but assembling different sources with clear boundaries so each part has a defined role.",
            "ja": "system prompt の要点は長い文章を書くことではなく、異なるソースを明確な境界で組み立てることです。各パートが役割を持ち、保守しやすくなります。"
          },
          "reward_card": "card_s10_001"
        },
        {
          "id": "q_s10_002",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "六段组装结构中，负责存放项目级别工作指令的是哪一段？",
            "en": "In the six-segment assembly structure, which segment holds project-level working instructions?",
            "ja": "六段組み立て構造において、プロジェクトレベルの作業指示を格納するのはどのセグメントですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "core（核心指令）",
                "en": "core (core instructions)",
                "ja": "core（コア指示）"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "skills（技能目录）",
                "en": "skills (skill catalog)",
                "ja": "skills（スキルカタログ）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "memory（记忆）",
                "en": "memory (memory)",
                "ja": "memory（メモリ）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "claude_md（项目指令）",
                "en": "claude_md (project instructions)",
                "ja": "claude_md（プロジェクト指示）"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "六段中 claude_md 专门负责项目指令，对应 CLAUDE.md 文件的内容。core 放核心系统行为，不是项目级说明。",
            "en": "In the six segments, claude_md is dedicated to project instructions from CLAUDE.md files. The core segment holds system-level behavior, not project-specific guidance.",
            "ja": "六段の中で claude_md はプロジェクト指示（CLAUDE.md の内容）を担当します。core はシステムレベルの動作を保持し、プロジェクト固有の説明ではありません。"
          },
          "reward_card": "card_s10_002"
        },
        {
          "id": "q_s10_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "system prompt 和 system reminder 最根本的区别是什么？",
            "en": "What is the fundamental difference between a system prompt and a system reminder?",
            "ja": "system prompt と system reminder の最も根本的な違いは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "system prompt 比 system reminder 长得多",
                "en": "A system prompt is much longer than a system reminder",
                "ja": "system prompt は system reminder よりもはるかに長い"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "system prompt 只在首次对话时发送，system reminder 每轮必发",
                "en": "system prompt is sent only on the first turn; system reminder is sent every turn",
                "ja": "system prompt は最初のターンのみ送信され、system reminder は毎ターン送信される"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "稳定说明很少变（system prompt），动态提醒每轮都可能变（system reminder）",
                "en": "Stable instructions rarely change (system prompt); dynamic reminders may change every turn (system reminder)",
                "ja": "安定した説明はほとんど変わらず（system prompt）、動的なリマインダーは毎ターン変わる可能性がある（system reminder）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "system reminder 只用于工具调用，system prompt 只用于文本生成",
                "en": "system reminder is only for tool calls; system prompt is only for text generation",
                "ja": "system reminder はツール呼び出しのみ、system prompt はテキスト生成のみに使用される"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "稳定说明很少变（system prompt），动态提醒每轮都可能变（system reminder）。两者分开管理让变化集中在 reminder 侧，降低维护成本。",
            "en": "Stable instructions rarely change (system prompt) while dynamic reminders may change every turn (system reminder). Separating them keeps changes isolated to the reminder side.",
            "ja": "安定した説明はほとんど変わりませんが（system prompt）、動的なリマインダーは毎ターン変わる可能性があります（system reminder）。分離することで変更を reminder 側に集中させ、保守コストを下げます。"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪种做法违反了 system prompt 组装的「清晰边界」原则？",
            "en": "Which practice violates the 'clear boundary' principle of system prompt assembly?",
            "ja": "次のうち、system prompt 組み立ての「明確な境界」原則に違反しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "将 tools、skills 和 memory 分段拼接，每段有独立标签",
                "en": "Concatenate tools, skills, and memory in separate sections with distinct labels",
                "ja": "tools、skills、memory を独立したラベル付きで別々に結合する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把 CLAUDE.md 内容和 core 指令直接混写在一个段落里",
                "en": "Merge CLAUDE.md content and core instructions into a single paragraph",
                "ja": "CLAUDE.md の内容とコア指示を一つの段落に混在させる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "dynamic 提醒只写当前轮次需要的临时信息",
                "en": "dynamic reminders contain only temporary info needed for the current turn",
                "ja": "dynamic リマインダーには現在のターンに必要な一時的な情報のみを記述する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "core 段只放极少变化的核心行为规则",
                "en": "core segment contains only rarely-changing core behavior rules",
                "ja": "core セグメントにはほとんど変化しないコアの動作ルールのみを配置する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "把 CLAUDE.md 内容和 core 指令混写在一起破坏了边界，导致来源不清晰，难以单独更新某一部分。六段结构正是为了避免这种混淆。",
            "en": "Merging CLAUDE.md content with core instructions destroys segment boundaries, making it unclear which source a rule comes from and harder to update individually.",
            "ja": "CLAUDE.md の内容とコア指示を混在させるとセグメントの境界が壊れ、どのソースからのルールか不明になり、個別の更新が困難になります。"
          },
          "reward_card": "card_s10_001"
        },
        {
          "id": "q_s10_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "六段结构中，「tools」段的作用是什么？",
            "en": "What is the role of the 'tools' segment in the six-segment structure?",
            "ja": "六段構造において「tools」セグメントの役割は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "存放模型可调用的工具描述",
                "en": "Hold descriptions of tools the model can invoke",
                "ja": "モデルが呼び出せるツールの説明を格納する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "存放当前任务的动态上下文提醒",
                "en": "Hold dynamic context reminders for the current task",
                "ja": "現在のタスクの動的なコンテキストリマインダーを格納する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "存放项目级别的 CLAUDE.md 内容",
                "en": "Hold project-level CLAUDE.md content",
                "ja": "プロジェクトレベルの CLAUDE.md コンテンツを格納する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "存放跨会话持久化的记忆片段",
                "en": "Hold cross-session persistent memory snippets",
                "ja": "セッションをまたぐ永続的なメモリスニペットを格納する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "tools 段专门放工具描述，让模型知道有哪些工具可用及其调用方式。这与 memory（记忆）和 claude_md（项目指令）是独立的来源。",
            "en": "The tools segment holds descriptions of callable tools so the model knows what is available. This is separate from memory and claude_md which serve different purposes.",
            "ja": "tools セグメントは呼び出し可能なツールの説明を格納し、モデルが利用可能なものを把握できるようにします。これは memory や claude_md とは独立したソースです。"
          },
          "reward_card": "card_s10_002"
        },
        {
          "id": "q_s10_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "CLAUDE.md 分层叠加时，下列哪个描述是正确的？",
            "en": "Which statement correctly describes CLAUDE.md layered stacking?",
            "ja": "CLAUDE.md の階層的な積み重ねについて、正しい説明はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "子目录的 CLAUDE.md 会覆盖项目根目录的同名规则",
                "en": "A subdirectory CLAUDE.md overrides same-named rules from the project root",
                "ja": "サブディレクトリの CLAUDE.md はプロジェクトルートの同名ルールを上書きする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只有根目录的 CLAUDE.md 会被加载，子目录的会被忽略",
                "en": "Only the root CLAUDE.md is loaded; subdirectory files are ignored",
                "ja": "ルートの CLAUDE.md のみが読み込まれ、サブディレクトリのファイルは無視される"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "全局、项目、子目录的 CLAUDE.md 全部拼进去，不互相覆盖",
                "en": "Global, project, and subdirectory CLAUDE.md files are all concatenated without overriding each other",
                "ja": "グローバル、プロジェクト、サブディレクトリの CLAUDE.md はすべて結合され、互いに上書きしない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "全局 CLAUDE.md 优先级最低，会被项目级覆盖",
                "en": "The global CLAUDE.md has lowest priority and is overridden by the project level",
                "ja": "グローバル CLAUDE.md は優先度が最も低く、プロジェクトレベルに上書きされる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "CLAUDE.md 分层叠加：全局（~/.claude/CLAUDE.md）→ 项目根目录 → 子目录，全部拼进去不互相覆盖。每层都可以补充说明，而不是替换上层。",
            "en": "CLAUDE.md stacks from global to project to subdirectory, all concatenated without overriding each other. Each layer adds to, rather than replacing, the layers above.",
            "ja": "CLAUDE.md はグローバルからプロジェクト、サブディレクトリへと積み重なり、互いに上書きせずにすべて結合されます。各層は上位層を置き換えるのではなく補足します。"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果每轮对话都需要传入当前时间、当前任务状态等信息，应该放在哪一段？",
            "en": "If you need to pass current time and task status on every conversation turn, where should it go?",
            "ja": "毎ターンの会話で現在時刻やタスク状態を渡す必要がある場合、どのセグメントに入れるべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "core（核心指令）",
                "en": "core (core instructions)",
                "ja": "core（コア指示）"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "memory（记忆）",
                "en": "memory (memory)",
                "ja": "memory（メモリ）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "skills（技能目录）",
                "en": "skills (skill catalog)",
                "ja": "skills（スキルカタログ）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "dynamic（动态提醒）",
                "en": "dynamic (dynamic reminders)",
                "ja": "dynamic（動的リマインダー）"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "动态信息（每轮都可能变化的内容，如当前时间、任务状态）属于 system reminder 的 dynamic 段。把它放进 core 或 memory 会让稳定内容变得嘈杂。",
            "en": "Dynamic information that changes each turn (like current time or task status) belongs in the dynamic segment of the system reminder. Putting it in core or memory pollutes stable content.",
            "ja": "毎ターン変化する動的情報（現在時刻、タスク状態など）は system reminder の dynamic セグメントに属します。core や memory に入れると安定したコンテンツが乱れます。"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_008",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "某团队把全局 CLAUDE.md、项目 CLAUDE.md 和子目录 CLAUDE.md 都加载进来，结果三者内容有重复。正确的处理方式是什么？",
            "en": "A team loads global, project, and subdirectory CLAUDE.md files and finds duplicate content. What is the correct approach?",
            "ja": "チームがグローバル、プロジェクト、サブディレクトリの CLAUDE.md をすべて読み込んだところ、内容が重複していました。正しい対処法は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "这是正常行为，全部拼进去不覆盖，重复说明无害",
                "en": "This is normal; all files are concatenated without override, and duplicate instructions are harmless",
                "ja": "これは正常な動作で、すべて上書きなしに結合され、重複指示は無害です"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只保留子目录的 CLAUDE.md，删除另外两个",
                "en": "Keep only the subdirectory CLAUDE.md and delete the other two",
                "ja": "サブディレクトリの CLAUDE.md のみ残し、他の2つを削除する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "必须让三个文件内容完全相同才能正常工作",
                "en": "All three files must have identical content for the system to work properly",
                "ja": "システムが正常に動作するには、3つのファイルの内容がまったく同じでなければならない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "子目录 CLAUDE.md 会自动合并去重，不必担心",
                "en": "The subdirectory CLAUDE.md auto-deduplicates on merge, no action needed",
                "ja": "サブディレクトリの CLAUDE.md は自動的に重複を除去するので対処不要です"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "CLAUDE.md 分层叠加是追加拼接而非覆盖，所以重复出现是可接受的——内容不会因重复而矛盾，只是稍显冗余。更整洁的做法是精简各层的说明，但并非必须。",
            "en": "CLAUDE.md layering is additive concatenation, not override. Duplicate entries are acceptable though slightly redundant. The cleaner practice is to keep each layer focused, but it is not required.",
            "ja": "CLAUDE.md の階層化は追加的な結合であり、上書きではありません。重複エントリは許容されますが若干冗長です。各層を簡潔に保つのがより整然としていますが、必須ではありません。"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_009",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "六段组装结构中，「memory」段存放的是什么？",
            "en": "What does the 'memory' segment hold in the six-segment assembly structure?",
            "ja": "六段組み立て構造において「memory」セグメントには何が格納されますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每轮对话生成的临时缓存",
                "en": "Temporary cache generated each conversation turn",
                "ja": "各会話ターンで生成される一時的なキャッシュ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "CLAUDE.md 文件的完整副本",
                "en": "A full copy of the CLAUDE.md file",
                "ja": "CLAUDE.md ファイルの完全なコピー"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "工具调用的返回结果",
                "en": "Return values from tool calls",
                "ja": "ツール呼び出しの戻り値"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "跨会话需要持续可见的记忆内容",
                "en": "Memory content that needs to stay visible across sessions",
                "ja": "セッションをまたいで見えている必要があるメモリコンテンツ"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "memory 段存放跨会话需要持续可见的记忆内容，比如用户偏好或已确认的决策。它与 dynamic（每轮临时信息）是不同的概念。",
            "en": "The memory segment holds content that needs to persist across sessions, such as user preferences or confirmed decisions. This is distinct from dynamic which holds per-turn temporary info.",
            "ja": "memory セグメントはセッションをまたいで持続する必要があるコンテンツ（ユーザーの好みや確認済みの決定など）を格納します。毎ターンの一時情報を持つ dynamic とは異なります。"
          },
          "reward_card": "card_s10_001"
        },
        {
          "id": "q_s10_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "把「每轮任务提醒」和「核心系统规则」放进同一个段有什么问题？",
            "en": "What is the problem with putting per-turn task reminders and core system rules in the same segment?",
            "ja": "毎ターンのタスクリマインダーとコアシステムルールを同じセグメントに入れると何が問題ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "没有问题，混在一起也能正常运行",
                "en": "No problem; mixing them still works fine",
                "ja": "問題なし。混在していても正常に動作します"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "稳定内容会随动态内容频繁刷新，增加维护难度和出错风险",
                "en": "Stable content gets refreshed frequently with dynamic content, increasing maintenance burden and error risk",
                "ja": "安定したコンテンツが動的コンテンツと一緒に頻繁に更新され、保守負担とエラーリスクが増大する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型无法同时理解两种类型的内容",
                "en": "The model cannot understand two types of content simultaneously",
                "ja": "モデルは2種類のコンテンツを同時に理解できない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "会超出 token 限制导致截断",
                "en": "It exceeds the token limit and causes truncation",
                "ja": "トークン制限を超えて切り捨てが発生する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "稳定说明和动态提醒分开管理的原因正是：把每轮都变的内容混进稳定段，会让该段变得频繁修改，增加引入错误的风险，同时让调试更困难。",
            "en": "The reason for separating stable and dynamic content is that mixing per-turn reminders into the stable segment forces frequent updates there, increasing error risk and making debugging harder.",
            "ja": "安定したコンテンツと動的コンテンツを分離する理由は、毎ターンのリマインダーを安定したセグメントに混在させると頻繁な更新が必要になり、エラーリスクが増加してデバッグが困難になるからです。"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_011",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "项目根目录有一个 CLAUDE.md，src/api/ 子目录下也有一个 CLAUDE.md。Claude 在处理 src/api/ 下的文件时，会加载哪些 CLAUDE.md？",
            "en": "There is a CLAUDE.md at the project root and another under src/api/. When Claude works on files under src/api/, which CLAUDE.md files are loaded?",
            "ja": "プロジェクトルートに CLAUDE.md があり、src/api/ サブディレクトリにも CLAUDE.md があります。Claude が src/api/ 下のファイルを処理する際、どの CLAUDE.md が読み込まれますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "只加载 src/api/ 下的 CLAUDE.md",
                "en": "Only the CLAUDE.md under src/api/ is loaded",
                "ja": "src/api/ 下の CLAUDE.md のみが読み込まれる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只加载项目根目录的 CLAUDE.md",
                "en": "Only the project root CLAUDE.md is loaded",
                "ja": "プロジェクトルートの CLAUDE.md のみが読み込まれる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "全局 + 项目根 + src/api/ 三层全部加载并拼接",
                "en": "Global + project root + src/api/ all three layers are loaded and concatenated",
                "ja": "グローバル + プロジェクトルート + src/api/ の3層すべてが読み込まれ結合される"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只有全局 CLAUDE.md 会被加载",
                "en": "Only the global CLAUDE.md is loaded",
                "ja": "グローバル CLAUDE.md のみが読み込まれる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "CLAUDE.md 分层叠加：全局（~/.claude/CLAUDE.md）→ 项目根目录 → 子目录，全部拼进去不互相覆盖。所以三层全会被加载和拼接。",
            "en": "CLAUDE.md stacks all layers: global, project root, and subdirectory are all loaded and concatenated without overriding each other.",
            "ja": "CLAUDE.md はすべての層を積み重ねます：グローバル、プロジェクトルート、サブディレクトリはすべて読み込まれ、互いに上書きせずに結合されます。"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_012",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "「skills（技能目录）」段在六段结构中负责描述什么？",
            "en": "What does the 'skills (skill catalog)' segment describe in the six-segment structure?",
            "ja": "六段構造において「skills（スキルカタログ）」セグメントは何を説明しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Claude 可以使用的、已注册的技能列表",
                "en": "The catalog of registered skills that Claude can invoke",
                "ja": "Claude が呼び出せる登録済みスキルのカタログ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型支持的所有工具函数签名",
                "en": "All tool function signatures supported by the model",
                "ja": "モデルがサポートするすべてのツール関数シグネチャ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "用户历史对话中涉及的技术栈信息",
                "en": "Tech stack information from the user's conversation history",
                "ja": "ユーザーの会話履歴に含まれる技術スタック情報"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "项目代码的架构说明",
                "en": "Architecture description of the project codebase",
                "ja": "プロジェクトコードベースのアーキテクチャ説明"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "skills 段存放已注册技能的目录，让模型知道可以调用哪些高层能力。这与 tools（底层工具函数）在粒度上是不同的。",
            "en": "The skills segment holds a catalog of registered higher-level skills Claude can invoke, distinct from tools which are lower-level function signatures.",
            "ja": "skills セグメントは Claude が呼び出せる登録済みの高レベルスキルのカタログを格納します。これは低レベルの関数シグネチャである tools とは粒度が異なります。"
          },
          "reward_card": "card_s10_002"
        },
        {
          "id": "q_s10_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个新手开发者把当前日期、用户姓名、任务目标和核心行为准则全部写进了 system prompt 的 core 段。这样做有什么潜在问题？",
            "en": "A developer puts current date, user name, task goal, and core behavior rules all in the core segment. What is the potential issue?",
            "ja": "開発者が現在の日付、ユーザー名、タスク目標、コアの動作ルールをすべて core セグメントに入れました。潜在的な問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "没有问题，core 段没有内容限制",
                "en": "No issue; the core segment has no content restrictions",
                "ja": "問題なし。core セグメントにはコンテンツ制限がありません"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只有 memory 段才允许放用户信息",
                "en": "Only the memory segment is allowed to contain user information",
                "ja": "ユーザー情報は memory セグメントのみに入れることが許可されている"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型会优先忽略 core 段中的动态信息",
                "en": "The model will preferentially ignore dynamic info in the core segment",
                "ja": "モデルは core セグメントの動的情報を優先的に無視する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "会让 core 段变成动态内容，需要每轮重建，失去稳定性优势",
                "en": "It turns core into dynamic content that must be rebuilt each turn, losing its stability benefit",
                "ja": "core を毎ターン再構築が必要な動的コンテンツにしてしまい、安定性の利点が失われる"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "稳定说明（core）和动态提醒（dynamic）分开管理的核心原因：把动态信息（如当前日期）放进 core 会使 core 每轮都需要重建，破坏其应有的稳定性。",
            "en": "The core reason for separating stable and dynamic content is that placing dynamic info like the current date in core forces it to be rebuilt every turn, undermining its stability.",
            "ja": "安定したコンテンツと動的コンテンツを分離する核心的な理由は、現在の日付などの動的情報を core に入れると毎ターン再構築が必要になり、安定性が損なわれるからです。"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_014",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "六段结构中，「core（核心指令）」段最应该放哪类内容？",
            "en": "In the six-segment structure, what type of content belongs best in the 'core' segment?",
            "ja": "六段構造において「core（コア指示）」セグメントに最も適したコンテンツの種類は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每次对话开始前需要刷新的用户状态",
                "en": "User state that needs refreshing before each conversation",
                "ja": "各会話の前にリフレッシュが必要なユーザー状態"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型的基础行为准则（极少改变）",
                "en": "Fundamental behavior rules for the model (rarely changes)",
                "ja": "モデルの基本的な動作ルール（めったに変わらない）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "CLAUDE.md 中的项目说明",
                "en": "Project descriptions from CLAUDE.md",
                "ja": "CLAUDE.md のプロジェクト説明"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "可供调用的外部 API 接口目录",
                "en": "Catalog of external API endpoints available to call",
                "ja": "呼び出し可能な外部 API エンドポイントのカタログ"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "core 段存放极少变化的基础行为准则，例如回答风格、安全边界等。项目说明属于 claude_md，动态状态属于 dynamic，两者都不应进入 core。",
            "en": "The core segment holds rarely-changing fundamental behavior rules like response style and safety boundaries. Project instructions go in claude_md and dynamic state in dynamic, neither belongs in core.",
            "ja": "core セグメントには応答スタイルや安全境界などのめったに変わらない基本的な動作ルールを格納します。プロジェクト指示は claude_md、動的状態は dynamic に属し、どちらも core に入れるべきではありません。"
          },
          "reward_card": "card_s10_002"
        },
        {
          "id": "q_s10_015",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "CLAUDE.md 的加载顺序（从外到内）是什么？",
            "en": "What is the loading order of CLAUDE.md files (from outer to inner)?",
            "ja": "CLAUDE.md ファイルの読み込み順序（外から内へ）はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "子目录 → 项目根目录 → 全局",
                "en": "Subdirectory → project root → global",
                "ja": "サブディレクトリ → プロジェクトルート → グローバル"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "项目根目录 → 全局 → 子目录",
                "en": "Project root → global → subdirectory",
                "ja": "プロジェクトルート → グローバル → サブディレクトリ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "全局（~/.claude/CLAUDE.md）→ 项目根目录 → 子目录",
                "en": "Global (~/.claude/CLAUDE.md) → project root → subdirectory",
                "ja": "グローバル（~/.claude/CLAUDE.md）→ プロジェクトルート → サブディレクトリ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只有一个 CLAUDE.md 会被使用，其余自动忽略",
                "en": "Only one CLAUDE.md is used; the rest are automatically ignored",
                "ja": "CLAUDE.md は1つだけ使用され、残りは自動的に無視される"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "CLAUDE.md 分层叠加：全局（~/.claude/CLAUDE.md）→ 项目根目录 → 子目录，全部拼进去不互相覆盖。",
            "en": "CLAUDE.md stacks in this order: global (~/.claude/CLAUDE.md) → project root → subdirectory, all concatenated without overriding each other.",
            "ja": "CLAUDE.md の積み重ね順：グローバル（~/.claude/CLAUDE.md）→ プロジェクトルート → サブディレクトリで、すべて互いに上書きせずに結合されます。"
          },
          "reward_card": "card_s10_003"
        },
        {
          "id": "q_s10_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪种场景最能体现「system prompt 是组装流水线」的优势？",
            "en": "Which scenario best demonstrates the advantage of treating the system prompt as an assembly pipeline?",
            "ja": "次のどのシナリオが「system prompt は組み立てパイプライン」の利点を最もよく示していますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "想更新工具描述时，只需修改 tools 段，不影响其他段",
                "en": "To update tool descriptions, only the tools segment needs changing without affecting other segments",
                "ja": "ツールの説明を更新する際、tools セグメントのみ変更すればよく、他のセグメントに影響しない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把所有内容写成一段文字，修改时直接全文替换",
                "en": "Write everything as one block and replace the whole text when updating",
                "ja": "すべてを1つのブロックにまとめ、更新時は全文を置き換える"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只用一个来源（core）就足够处理所有情况",
                "en": "Using only one source (core) is sufficient for all cases",
                "ja": "1つのソース（core）だけですべてのケースを処理するのに十分"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "动态内容和稳定内容混在一起，统一管理更方便",
                "en": "Mixing dynamic and stable content together is more convenient to manage",
                "ja": "動的コンテンツと安定したコンテンツを混在させると管理がより便利"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "把不同来源按清晰边界组装的最大优势就是：修改某一来源时只影响对应段，其余段不受影响。这使得维护和调试更精确。",
            "en": "The main advantage of assembling different sources with clear boundaries is that modifying one source only affects its corresponding segment, leaving others untouched, making maintenance and debugging precise.",
            "ja": "異なるソースを明確な境界で組み立てる最大の利点は、あるソースを変更しても対応するセグメントのみに影響し、他のセグメントはそのままです。これにより保守とデバッグが精確になります。"
          },
          "reward_card": "card_s10_001"
        },
        {
          "id": "q_s10_017",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果把 CLAUDE.md 的内容和 memory 的内容放进同一段，会造成什么混淆？",
            "en": "What confusion arises from putting CLAUDE.md content and memory content in the same segment?",
            "ja": "CLAUDE.md のコンテンツと memory のコンテンツを同じセグメントに入れると、どのような混乱が生じますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "项目级指令会被当作跨会话记忆来持久化，或记忆会被当作项目规则来遵循",
                "en": "Project instructions may be persisted as cross-session memory, or memory treated as project rules",
                "ja": "プロジェクト指示がセッションをまたぐメモリとして永続化されたり、メモリがプロジェクトルールとして扱われたりする可能性がある"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "会导致 token 数量超标",
                "en": "It causes the token count to exceed limits",
                "ja": "トークン数が制限を超える原因となる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型无法同时处理两种类型的内容",
                "en": "The model cannot process two types of content simultaneously",
                "ja": "モデルは2種類のコンテンツを同時に処理できない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "不会有任何问题，因为它们最终都是文字",
                "en": "No issue since both are ultimately text",
                "ja": "どちらも最終的にはテキストなので問題ない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "claude_md 和 memory 职责不同：claude_md 是项目规则（来自 CLAUDE.md），memory 是跨会话持久化的记忆。混淆会导致系统错误地管理它们的生命周期。",
            "en": "claude_md holds project rules from CLAUDE.md while memory holds cross-session persistent content. Mixing them causes the system to mismanage their lifecycle and update frequency.",
            "ja": "claude_md はプロジェクトルール（CLAUDE.md から）を保持し、memory はセッションをまたぐ永続的なコンテンツを保持します。混在させるとシステムがライフサイクルや更新頻度を誤って管理します。"
          },
          "reward_card": "card_s10_002"
        },
        {
          "id": "q_s10_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下对六段组装结构的理解，哪个是错误的？",
            "en": "Which of the following understandings of the six-segment assembly structure is incorrect?",
            "ja": "六段組み立て構造についての以下の理解のうち、誤っているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每段各管一种来源，职责明确",
                "en": "Each segment manages one source with a clear responsibility",
                "ja": "各セグメントは1つのソースを管理し、責任が明確"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "dynamic 段的内容每轮都可以不同",
                "en": "The dynamic segment's content can differ each turn",
                "ja": "dynamic セグメントのコンテンツは毎ターン異なる可能性がある"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "claude_md 段的内容等于当前项目目录下所有文件的汇总",
                "en": "The claude_md segment equals a summary of all files in the current project directory",
                "ja": "claude_md セグメントはカレントプロジェクトディレクトリ内のすべてのファイルの要約に等しい"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "core 段存放极少变化的基础行为准则",
                "en": "The core segment holds rarely-changing fundamental behavior rules",
                "ja": "core セグメントにはめったに変わらない基本的な動作ルールが格納される"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "claude_md 段存放的是 CLAUDE.md 文件中的项目指令内容，而不是项目目录下所有文件的汇总。混淆两者会误解这一段的来源和范围。",
            "en": "The claude_md segment holds project instructions from CLAUDE.md files, not a summary of all project files. Confusing the two misrepresents the source and scope of this segment.",
            "ja": "claude_md セグメントは CLAUDE.md ファイルのプロジェクト指示を格納するものであり、プロジェクトファイルすべての要約ではありません。両者を混同するとこのセグメントのソースと範囲を誤解させます。"
          },
          "reward_card": "card_s10_001"
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
          "difficulty": 1,
          "stem": {
            "zh": "Claude Code 的错误恢复将错误分为几类？",
            "en": "How many error categories does Claude Code's error recovery system define?",
            "ja": "Claude Code のエラー回復システムはエラーをいくつのカテゴリに分けますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "2 类：网络错误和模型错误",
                "en": "2 types: network errors and model errors",
                "ja": "2 種類：ネットワークエラーとモデルエラー"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "3 类：输出截断、上下文溢出、网络/API 错误",
                "en": "3 types: output truncation, context overflow, network/API errors",
                "ja": "3 種類：出力切り捨て、コンテキストオーバーフロー、ネットワーク/API エラー"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "4 类：截断、溢出、超时、权限错误",
                "en": "4 types: truncation, overflow, timeout, permission errors",
                "ja": "4 種類：切り捨て、オーバーフロー、タイムアウト、権限エラー"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "不分类，所有错误统一用退避重试处理",
                "en": "No categories, all errors use backoff retry uniformly",
                "ja": "分類しない、すべてのエラーをバックオフリトライで統一処理"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "错误分三类：输出截断（模型回复不完整）、上下文溢出（消息太长）、网络/API 错误（连接中断）。每类有不同的恢复策略，不能混为一谈。",
            "en": "Errors fall into 3 categories: output truncation (incomplete model reply), context overflow (messages too long), and network/API errors (connection interrupted). Each has a different recovery strategy.",
            "ja": "エラーは3種類に分類されます：出力切り捨て、コンテキストオーバーフロー、ネットワーク/API エラー。それぞれ異なる回復戦略が必要です。"
          },
          "reward_card": "card_s11_001"
        },
        {
          "id": "q_s11_002",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "模型输出被截断时，正确的恢复方式是？",
            "en": "When model output is truncated, what is the correct recovery approach?",
            "ja": "モデルの出力が切り捨てられた場合、正しい回復方法は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "压缩对话历史为摘要，然后重新发起请求",
                "en": "Compress conversation history into a summary, then restart the request",
                "ja": "会話履歴を要約に圧縮してからリクエストを再開する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "用指数退避重试同一条消息",
                "en": "Retry the same message with exponential backoff",
                "ja": "同じメッセージを指数バックオフでリトライする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "发送续写提示，告知不要重复、不要重来、直接从断点接着写",
                "en": "Send a continuation prompt telling the model not to repeat, not to restart, and to continue from the breakpoint",
                "ja": "繰り返さず、最初からやり直さず、ブレークポイントから続けるよう指示する継続プロンプトを送る"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "忽略截断，将已有输出直接当作完整结果使用",
                "en": "Ignore truncation and use the existing output as the complete result",
                "ja": "切り捨てを無視して、既存の出力を完全な結果として使用する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "输出截断时应发续写提示，明确告诉模型三点：不要重复已有内容、不要从头开始、直接从断点接着写。压缩摘要是处理上下文溢出的方法，退避重试是处理网络错误的方法。",
            "en": "For output truncation, send a continuation prompt that explicitly states: don't repeat existing content, don't restart, continue from the breakpoint. Compression handles context overflow; backoff retry handles network errors.",
            "ja": "出力切り捨ての場合は、既存のコンテンツを繰り返さない、最初からやり直さない、ブレークポイントから続けるという3点を明示した継続プロンプトを送ります。"
          },
          "reward_card": "card_s11_002"
        },
        {
          "id": "q_s11_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "上下文溢出（context overflow）的正确恢复路径是？",
            "en": "What is the correct recovery path for context overflow?",
            "ja": "コンテキストオーバーフローの正しい回復パスは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "发送续写提示，要求模型从断点继续",
                "en": "Send a continuation prompt asking the model to continue from the breakpoint",
                "ja": "ブレークポイントから続けるよう継続プロンプトを送る"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "删除全部历史消息，重新开始对话",
                "en": "Delete all history messages and restart the conversation",
                "ja": "すべての履歴メッセージを削除して会話を再開する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "用指数退避重试，直到连接恢复",
                "en": "Use exponential backoff retry until connection is restored",
                "ja": "接続が回復するまで指数バックオフリトライを使用する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "将旧对话压缩成摘要，以摘要为新起点继续工作",
                "en": "Compress the old conversation into a summary and use it as a new starting point to continue",
                "ja": "古い会話を要約に圧縮し、その要約を新しい出発点として作業を続ける"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "上下文溢出时，把旧对话压缩成摘要作为新起点继续。压缩不是删除历史，而是保留继续工作所需的关键信息。续写提示是处理截断的方法，退避重试是处理网络错误的方法。",
            "en": "For context overflow, compress the old conversation into a summary and use it as a new starting point. Compaction retains key information needed to continue, not simply truncating history. Continuation prompts handle truncation; backoff retry handles network errors.",
            "ja": "コンテキストオーバーフローの場合、古い会話を要約に圧縮して新しい出発点にします。圧縮は履歴を削除することではなく、作業を続けるために必要な重要情報を保持することです。"
          },
          "reward_card": "card_s11_003"
        },
        {
          "id": "q_s11_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "网络或 API 错误的正确处理方式是？",
            "en": "What is the correct way to handle network or API errors?",
            "ja": "ネットワークエラーまたは API エラーの正しい処理方法は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "将对话历史压缩为摘要，然后重新发请求",
                "en": "Compress conversation history into a summary, then resend the request",
                "ja": "会話履歴を要約に圧縮してからリクエストを再送する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "立即重试，重试次数不设上限",
                "en": "Retry immediately with no limit on retry count",
                "ja": "リトライ回数に制限を設けずに即座にリトライする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "发续写提示，告知不要重复已有内容",
                "en": "Send a continuation prompt saying not to repeat existing content",
                "ja": "既存のコンテンツを繰り返さないよう継続プロンプトを送る"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "指数退避重试，并设置重试预算上限",
                "en": "Exponential backoff retry with a retry budget cap",
                "ja": "指数バックオフリトライを行い、リトライ予算の上限を設定する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "网络错误用指数退避重试，但必须设置重试预算。不限次数重试会导致主循环永远卡住。压缩摘要是上下文溢出的方案，续写提示是截断的方案。",
            "en": "Network errors use exponential backoff retry, but a retry budget must be set. Unlimited retries can cause the main loop to hang forever. Compaction handles context overflow; continuation prompts handle truncation.",
            "ja": "ネットワークエラーには指数バックオフリトライを使用しますが、リトライ予算を設定する必要があります。無制限のリトライはメインループを永遠にハングさせる可能性があります。"
          },
          "reward_card": "card_s11_001"
        },
        {
          "id": "q_s11_005",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "如果对网络错误使用无预算的无限重试，会导致什么后果？",
            "en": "What happens if network errors are retried indefinitely without a retry budget?",
            "ja": "リトライ予算なしでネットワークエラーを無限にリトライすると何が起きますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "上下文窗口会溢出",
                "en": "The context window will overflow",
                "ja": "コンテキストウィンドウがオーバーフローする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型输出会被截断",
                "en": "Model output will be truncated",
                "ja": "モデルの出力が切り捨てられる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "主循环可能永远卡在重试里，无法向前推进",
                "en": "The main loop may get stuck retrying forever and cannot make progress",
                "ja": "メインループがリトライで永遠にスタックし、前進できなくなる可能性がある"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "对话历史会自动压缩为摘要",
                "en": "Conversation history will automatically be compressed into a summary",
                "ja": "会話履歴が自動的に要約に圧縮される"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "每条恢复路径都要有预算限制，否则主循环可能永远卡在重试里。没有预算，Agent 会无限循环却无法推进任务。上下文溢出和截断是另外两类错误，与重试预算无关。",
            "en": "Every recovery path needs a budget limit, otherwise the main loop may get stuck retrying forever. Without a budget, the agent loops infinitely without advancing the task.",
            "ja": "すべての回復パスには予算制限が必要です。そうでないと、メインループがリトライで永遠にスタックする可能性があります。予算がないと、エージェントはタスクを進めることなく無限ループします。"
          },
          "reward_card": "card_s11_004"
        },
        {
          "id": "q_s11_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "续写提示（continuation prompt）必须包含哪三个关键指令？",
            "en": "What three key instructions must a continuation prompt include?",
            "ja": "継続プロンプトに含めるべき3つの重要な指示は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "不要重复已有内容、不要从头开始、直接从断点接着写",
                "en": "Don't repeat existing content, don't restart, continue directly from the breakpoint",
                "ja": "既存のコンテンツを繰り返さない、最初からやり直さない、ブレークポイントから直接続ける"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "压缩历史、清空上下文、重新发起对话",
                "en": "Compress history, clear context, restart the conversation",
                "ja": "履歴を圧縮し、コンテキストをクリアして、会話を再開する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "设置重试预算、启用退避、记录错误日志",
                "en": "Set retry budget, enable backoff, log errors",
                "ja": "リトライ予算を設定し、バックオフを有効にし、エラーをログに記録する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "告知当前上下文长度、剩余 token 数、目标输出格式",
                "en": "Inform the model of current context length, remaining tokens, and target output format",
                "ja": "現在のコンテキスト長、残りトークン数、目標出力形式をモデルに通知する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "续写提示必须说三件事：不要重复已有内容、不要从头开始、直接从断点接着写。这三条缺一不可，否则模型会重复输出或重新生成全部内容。",
            "en": "A continuation prompt must state three things: don't repeat existing content, don't restart, continue directly from the breakpoint. All three are required, otherwise the model may repeat output or regenerate everything.",
            "ja": "継続プロンプトは3つのことを述べる必要があります：既存のコンテンツを繰り返さない、最初からやり直さない、ブレークポイントから直接続ける。3つすべてが必要です。"
          },
          "reward_card": "card_s11_002"
        },
        {
          "id": "q_s11_007",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "上下文压缩（compaction）的核心目标是什么？",
            "en": "What is the core goal of context compaction?",
            "ja": "コンテキスト圧縮（compaction）の核心目標は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "彻底清空对话历史，让模型从零开始",
                "en": "Completely clear conversation history so the model starts from scratch",
                "ja": "会話履歴を完全にクリアしてモデルをゼロから始めさせる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把旧对话变成仍然能继续工作的摘要",
                "en": "Transform old conversations into a summary that still enables continuing work",
                "ja": "古い会話を、作業を続けられる要約に変換する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "对每条消息单独重试直到成功",
                "en": "Retry each message individually until success",
                "ja": "各メッセージを個別に成功するまでリトライする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "删除最早的 N 条消息以释放 token 空间",
                "en": "Delete the earliest N messages to free up token space",
                "ja": "トークンスペースを確保するために最初のN件のメッセージを削除する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "压缩不是删除历史，而是把旧对话变成仍然能继续工作的摘要。关键是保留继续工作所需的关键信息，而不是简单地截断或清空历史。",
            "en": "Compaction is not deleting history but transforming old conversations into a summary that still enables continuing work. The key is retaining information needed to continue, not simply truncating or clearing history.",
            "ja": "圧縮は履歴を削除することではなく、古い会話を作業を続けられる要約に変換することです。重要なのは、単純に切り捨てや削除をするのではなく、継続に必要な情報を保持することです。"
          },
          "reward_card": "card_s11_003"
        },
        {
          "id": "q_s11_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下场景哪个应该用上下文压缩而不是续写提示？",
            "en": "In which scenario should you use context compaction instead of a continuation prompt?",
            "ja": "次のシナリオのうち、継続プロンプトではなくコンテキスト圧縮を使うべきはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "对话消息总长度超过上下文窗口上限",
                "en": "Total conversation message length exceeds the context window limit",
                "ja": "会話メッセージの合計長がコンテキストウィンドウの上限を超える"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型回复到一半突然停止，输出不完整",
                "en": "The model stops halfway through its reply and output is incomplete",
                "ja": "モデルが返答の途中で止まり、出力が不完全"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "API 请求超时，连接中断",
                "en": "API request times out, connection interrupted",
                "ja": "API リクエストがタイムアウトし、接続が中断"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型返回了一个格式错误的 JSON 响应",
                "en": "The model returned a malformed JSON response",
                "ja": "モデルが不正な形式の JSON レスポンスを返した"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "上下文压缩用于对话消息总长度超过上下文窗口上限（上下文溢出）的情况。模型中途停止是截断，应用续写提示；API 超时是网络错误，应用退避重试。",
            "en": "Context compaction is for when total conversation length exceeds the context window (context overflow). Mid-reply stopping is truncation requiring a continuation prompt; API timeout is a network error requiring backoff retry.",
            "ja": "コンテキスト圧縮は会話の総長がコンテキストウィンドウを超えた場合に使用します。返答途中での停止は切り捨てで継続プロンプトが必要、API タイムアウトはネットワークエラーでバックオフリトライが必要です。"
          },
          "reward_card": "card_s11_003"
        },
        {
          "id": "q_s11_009",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "为什么说「错误先分类，恢复再执行」是核心原则？",
            "en": "Why is 'classify errors first, then execute recovery' the core principle?",
            "ja": "なぜ「先にエラーを分類し、それから回復を実行する」が核心原則なのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "因为分类可以减少 API 调用次数",
                "en": "Because classification reduces the number of API calls",
                "ja": "分類することで API 呼び出し回数を削減できるから"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "因为三类错误的恢复策略不同，用错策略会让问题更严重",
                "en": "Because the three error types have different recovery strategies, and using the wrong one makes the problem worse",
                "ja": "3種類のエラーに対して異なる回復戦略があり、間違った戦略を使うと問題が悪化するから"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "因为上下文溢出是最常见的错误，应优先处理",
                "en": "Because context overflow is the most common error and should be prioritized",
                "ja": "コンテキストオーバーフローが最も一般的なエラーであり優先的に処理すべきだから"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "因为所有错误最终都需要退避重试",
                "en": "Because all errors ultimately require backoff retry",
                "ja": "すべてのエラーは最終的にバックオフリトライが必要だから"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "三类错误的恢复路径完全不同：截断用续写提示，溢出用压缩，网络错误用退避重试。如果把截断当网络错误处理（用退避重试），或把网络错误当溢出处理（用压缩），都无法解决问题甚至恶化。",
            "en": "The three error types have completely different recovery paths: truncation uses continuation prompts, overflow uses compaction, and network errors use backoff retry. Applying the wrong strategy cannot solve the problem and may worsen it.",
            "ja": "3種類のエラーの回復パスはまったく異なります：切り捨てには継続プロンプト、オーバーフローには圧縮、ネットワークエラーにはバックオフリトライ。間違った戦略を適用すると問題が解決されないどころか悪化します。"
          },
          "reward_card": "card_s11_001"
        },
        {
          "id": "q_s11_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "指数退避（exponential backoff）在错误恢复中的作用是什么？",
            "en": "What is the role of exponential backoff in error recovery?",
            "ja": "エラー回復における指数バックオフの役割は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每次重试前等待递增的时间，避免在网络不稳定时频繁冲击服务器",
                "en": "Wait for increasing intervals before each retry to avoid hammering the server during network instability",
                "ja": "ネットワーク不安定時にサーバーへの頻繁なリクエストを避けるため、リトライ前に増加する間隔を待つ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "将旧对话压缩成摘要以节省 token",
                "en": "Compress old conversations into summaries to save tokens",
                "ja": "古い会話を要約に圧縮してトークンを節約する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "告诉模型从断点继续输出，避免重复",
                "en": "Tell the model to continue output from the breakpoint to avoid repetition",
                "ja": "ブレークポイントから出力を続けるようモデルに指示して繰り返しを避ける"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "清空上下文窗口，让模型重新读取所有文件",
                "en": "Clear the context window so the model re-reads all files",
                "ja": "コンテキストウィンドウをクリアしてモデルがすべてのファイルを再読み込みできるようにする"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "指数退避让每次重试前等待递增的时间（如 1s、2s、4s），避免在网络不稳定时频繁冲击服务器。它是网络/API 错误的专属策略，与截断和溢出处理无关。",
            "en": "Exponential backoff waits for increasing intervals before each retry (e.g., 1s, 2s, 4s) to avoid hammering the server during network instability. It is the dedicated strategy for network/API errors.",
            "ja": "指数バックオフは各リトライ前に増加する間隔（例：1秒、2秒、4秒）を待ち、ネットワーク不安定時にサーバーへの頻繁なリクエストを避けます。ネットワーク/API エラー専用の戦略です。"
          },
          "reward_card": "card_s11_004"
        },
        {
          "id": "q_s11_011",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "如果续写提示没有明确说不要重复，模型最可能的行为是？",
            "en": "If a continuation prompt does not explicitly say do not repeat, what is the model most likely to do?",
            "ja": "継続プロンプトに繰り返さないことが明示されていない場合、モデルが最もしそうなことは？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "自动压缩上下文后继续",
                "en": "Automatically compress context and continue",
                "ja": "自動的にコンテキストを圧縮して続ける"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "触发退避重试机制",
                "en": "Trigger the backoff retry mechanism",
                "ja": "バックオフリトライメカニズムをトリガーする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "重新生成整个内容或重复已有部分内容",
                "en": "Regenerate the entire content or repeat part of the existing content",
                "ja": "コンテンツ全体を再生成するか、既存のコンテンツの一部を繰り返す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "拒绝执行，返回错误信息",
                "en": "Refuse to execute and return an error message",
                "ja": "実行を拒否してエラーメッセージを返す"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "续写提示必须明确说不要重复已有内容。如果缺少这条指令，模型很可能重新生成整个内容或重复已有部分，导致输出混乱。三条指令（不重复、不重来、从断点接着写）缺一不可。",
            "en": "A continuation prompt must explicitly say not to repeat existing content. Without this instruction, the model may regenerate everything or repeat parts of existing content, leading to garbled output. All three instructions are required.",
            "ja": "継続プロンプトは既存のコンテンツを繰り返さないことを明示する必要があります。この指示がなければ、モデルはコンテンツ全体を再生成するか既存部分を繰り返す可能性があります。"
          },
          "reward_card": "card_s11_002"
        },
        {
          "id": "q_s11_012",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "重试预算（retry budget）的作用是什么？",
            "en": "What is the purpose of a retry budget?",
            "ja": "リトライ予算の目的は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "限制每次重试之间的等待时间",
                "en": "Limit the waiting time between retries",
                "ja": "リトライ間の待機時間を制限する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "为恢复路径设置上限，防止主循环永远卡在重试中",
                "en": "Set an upper limit on the recovery path to prevent the main loop from getting stuck retrying forever",
                "ja": "回復パスに上限を設定し、メインループがリトライで永遠にスタックするのを防ぐ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "决定何时将对话历史压缩为摘要",
                "en": "Determine when to compress conversation history into a summary",
                "ja": "会話履歴を要約に圧縮するタイミングを決定する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "计算续写提示中断点的精确位置",
                "en": "Calculate the exact breakpoint position in the continuation prompt",
                "ja": "継続プロンプトのブレークポイントの正確な位置を計算する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "重试预算为每条恢复路径设置最大尝试次数上限。没有预算限制，主循环可能因网络持续不通或其他问题永远卡在重试循环里，无法向前推进任务。",
            "en": "A retry budget sets a maximum attempt count for each recovery path. Without a budget limit, the main loop may get stuck retrying forever due to persistent network issues or other problems, unable to advance the task.",
            "ja": "リトライ予算は各回復パスの最大試行回数の上限を設定します。予算制限がないと、ネットワークの継続的な問題などでメインループが永遠にリトライループにスタックします。"
          },
          "reward_card": "card_s11_004"
        },
        {
          "id": "q_s11_013",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪种行为是压缩（compaction）而非删除？",
            "en": "Which of the following describes compaction rather than deletion?",
            "ja": "次のうち削除ではなく圧縮（compaction）を説明しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "将旧对话提炼为能反映当前任务进展的摘要，作为新的起始上下文",
                "en": "Distill old conversations into a summary reflecting current task progress, used as the new starting context",
                "ja": "古い会話を現在のタスクの進捗を反映した要約に蒸留し、新しい開始コンテキストとして使用する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "清空所有历史消息，只保留当前用户请求",
                "en": "Clear all history messages, keeping only the current user request",
                "ja": "すべての履歴メッセージをクリアし、現在のユーザーリクエストのみを保持する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "删除最旧的 50% 消息以释放 token 空间",
                "en": "Delete the oldest 50% of messages to free up token space",
                "ja": "トークンスペースを確保するために最古の50%のメッセージを削除する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "对每条历史消息单独调用 API 进行摘要，逐条替换",
                "en": "Call the API to summarize each history message individually and replace them one by one",
                "ja": "各履歴メッセージを個別に API で要約し、1件ずつ置き換える"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "压缩（compaction）的核心是把旧对话提炼为能反映当前任务进展的摘要，用作新的起始上下文。它保留了继续工作所需的关键信息，而不是简单地删除或清空历史。",
            "en": "Compaction distills old conversations into a summary reflecting current task progress, used as the new starting context. It retains key information needed to continue work, rather than simply deleting or clearing history.",
            "ja": "圧縮（compaction）の核心は、古い会話を現在のタスクの進捗を反映した要約に蒸留し、新しい開始コンテキストとして使用することです。単純に削除やクリアするのではなく、作業継続に必要な重要情報を保持します。"
          },
          "reward_card": "card_s11_003"
        },
        {
          "id": "q_s11_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "Agent 主循环在遇到上下文溢出时，如果错误地用退避重试来处理，结果会怎样？",
            "en": "If the agent main loop handles context overflow by mistakenly using backoff retry, what happens?",
            "ja": "エージェントのメインループがコンテキストオーバーフローを誤ってバックオフリトライで処理した場合、どうなりますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "上下文会被自动压缩为摘要",
                "en": "The context will be automatically compressed into a summary",
                "ja": "コンテキストが自動的に要約に圧縮される"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "重试会成功，因为等待后上下文会自动缩短",
                "en": "Retry will succeed because the context automatically shortens after waiting",
                "ja": "待機後にコンテキストが自動的に短くなるのでリトライは成功する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "每次重试都会遇到同样的溢出错误，最终耗尽重试预算仍未解决",
                "en": "Every retry will encounter the same overflow error, eventually exhausting the retry budget without resolution",
                "ja": "毎回のリトライで同じオーバーフローエラーが発生し、最終的にリトライ予算を使い果たしても解決されない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型会自动切换到续写模式",
                "en": "The model will automatically switch to continuation mode",
                "ja": "モデルが自動的に継続モードに切り替わる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "上下文溢出的根因是消息总长度超限，退避重试无法缩短消息长度，所以每次重试都会遇到同样的溢出错误，最终耗尽重试预算仍无法解决。正确做法是压缩上下文，而不是重试。",
            "en": "Context overflow is caused by message total length exceeding the limit. Backoff retry cannot shorten message length, so every retry hits the same overflow error and the retry budget is exhausted without resolution. Correct approach is compaction, not retry.",
            "ja": "コンテキストオーバーフローの根本原因はメッセージの総長が上限を超えることです。バックオフリトライはメッセージ長を短縮できないため、毎回同じオーバーフローエラーが発生し、リトライ予算を使い果たしても解決できません。"
          },
          "reward_card": "card_s11_001"
        },
        {
          "id": "q_s11_015",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪种错误应该用续写提示处理？",
            "en": "Which of the following errors should be handled with a continuation prompt?",
            "ja": "次のうち継続プロンプトで処理すべきエラーはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "HTTP 503 服务不可用",
                "en": "HTTP 503 Service Unavailable",
                "ja": "HTTP 503 サービス利用不可"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "连接超时，请求未到达服务器",
                "en": "Connection timeout, request did not reach the server",
                "ja": "接続タイムアウト、リクエストがサーバーに届かなかった"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "消息历史累积过长，超过模型上下文窗口",
                "en": "Message history accumulated too long, exceeding the model context window",
                "ja": "メッセージ履歴が蓄積されすぎてモデルのコンテキストウィンドウを超えた"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型在生成代码时中途停止，输出只完成了一半",
                "en": "Model stopped midway while generating code, output is only half complete",
                "ja": "モデルがコード生成中に途中で止まり、出力が半分しか完成していない"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "续写提示处理的是输出截断——模型在生成内容时中途停止。HTTP 503 和连接超时是网络/API 错误，用退避重试；消息历史过长是上下文溢出，用压缩。",
            "en": "Continuation prompts handle output truncation — the model stopping midway during generation. HTTP 503 and connection timeout are network/API errors handled with backoff retry; message history too long is context overflow handled with compaction.",
            "ja": "継続プロンプトは出力切り捨て（生成中にモデルが途中で止まること）を処理します。HTTP 503と接続タイムアウトはバックオフリトライで処理するネットワーク/API エラー、メッセージ履歴が長すぎるのは圧縮で処理するコンテキストオーバーフローです。"
          },
          "reward_card": "card_s11_002"
        },
        {
          "id": "q_s11_016",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下关于三类错误与恢复路径的对应关系，哪项是正确的？",
            "en": "Which of the following correctly matches the three error types with their recovery paths?",
            "ja": "次のうち、3種類のエラーとその回復パスの対応として正しいのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "截断→压缩，溢出→续写提示，网络错误→退避重试",
                "en": "Truncation to compaction, overflow to continuation prompt, network error to backoff retry",
                "ja": "切り捨て→圧縮、オーバーフロー→継続プロンプト、ネットワークエラー→バックオフリトライ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "截断→续写提示，溢出→压缩，网络错误→退避重试",
                "en": "Truncation to continuation prompt, overflow to compaction, network error to backoff retry",
                "ja": "切り捨て→継続プロンプト、オーバーフロー→圧縮、ネットワークエラー→バックオフリトライ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "截断→退避重试，溢出→续写提示，网络错误→压缩",
                "en": "Truncation to backoff retry, overflow to continuation prompt, network error to compaction",
                "ja": "切り捨て→バックオフリトライ、オーバーフロー→継続プロンプト、ネットワークエラー→圧縮"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "截断→续写提示，溢出→退避重试，网络错误→压缩",
                "en": "Truncation to continuation prompt, overflow to backoff retry, network error to compaction",
                "ja": "切り捨て→継続プロンプト、オーバーフロー→バックオフリトライ、ネットワークエラー→圧縮"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "正确对应：输出截断→续写提示（告知不重复、不重来、从断点接着写），上下文溢出→压缩（旧对话变摘要），网络/API 错误→指数退避重试（带预算）。其他选项混淆了三类错误的处理方式。",
            "en": "Correct mapping: output truncation to continuation prompt (don't repeat, don't restart, continue from breakpoint), context overflow to compaction (old conversation to summary), network/API error to exponential backoff retry (with budget). Other options mix up the recovery strategies.",
            "ja": "正しい対応：出力切り捨て→継続プロンプト（繰り返さない、やり直さない、ブレークポイントから続ける）、コンテキストオーバーフロー→圧縮（古い会話を要約に）、ネットワーク/API エラー→指数バックオフリトライ（予算付き）。"
          },
          "reward_card": "card_s11_001"
        },
        {
          "id": "q_s11_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个 Agent 在执行长任务时遇到连续网络错误，已重试 10 次仍未成功。此时正确的做法是？",
            "en": "An agent encounters consecutive network errors during a long task and has retried 10 times without success. What is the correct action?",
            "ja": "エージェントが長いタスク実行中に連続ネットワークエラーに遭遇し、10回リトライしても成功しない。正しい対応は？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "重试预算已耗尽，应停止并向上层报告失败，而不是继续卡在重试中",
                "en": "The retry budget is exhausted; stop and report failure to the upper layer rather than continuing to retry",
                "ja": "リトライ予算が尽きたので、リトライし続けるのではなく停止して上位層に失敗を報告する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "继续无限重试，直到网络恢复",
                "en": "Continue retrying indefinitely until the network recovers",
                "ja": "ネットワークが回復するまで無限にリトライし続ける"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "改用续写提示，要求模型从最后一个断点继续",
                "en": "Switch to a continuation prompt asking the model to continue from the last breakpoint",
                "ja": "最後のブレークポイントから続けるよう継続プロンプトに切り替える"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "压缩所有对话历史，然后重新发起整个任务",
                "en": "Compress all conversation history and restart the entire task",
                "ja": "すべての会話履歴を圧縮してタスク全体を再開する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "重试预算耗尽意味着恢复路径已到达上限，此时应停止并向上层报告失败，而不是继续卡在重试循环中。这是设置重试预算的意义——保证主循环能感知到无法恢复的状态并做出下一步决策。",
            "en": "When the retry budget is exhausted, the recovery path has reached its limit. Stop and report failure to the upper layer rather than continuing in the retry loop. This is the purpose of a retry budget — ensuring the main loop can detect an unrecoverable state and make the next decision.",
            "ja": "リトライ予算が尽きたとき、回復パスは上限に達しています。リトライループを続けるのではなく、停止して上位層に失敗を報告します。これがリトライ予算を設定する目的です——メインループが回復不能な状態を検知して次の判断を下せるようにすること。"
          },
          "reward_card": "card_s11_004"
        },
        {
          "id": "q_s11_018",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在错误恢复设计中，每条恢复路径都要有预算这一原则适用于哪些路径？",
            "en": "In error recovery design, which recovery paths does the principle every recovery path needs a budget apply to?",
            "ja": "エラー回復設計において、すべての回復パスには予算が必要という原則はどのパスに適用されますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "只适用于网络/API 错误的退避重试路径",
                "en": "Only applies to the backoff retry path for network/API errors",
                "ja": "ネットワーク/API エラーのバックオフリトライパスにのみ適用される"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只适用于上下文压缩路径",
                "en": "Only applies to the context compaction path",
                "ja": "コンテキスト圧縮パスにのみ適用される"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只适用于截断续写路径",
                "en": "Only applies to the truncation continuation path",
                "ja": "切り捨て継続パスにのみ適用される"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "三条恢复路径都需要预算，否则任何一条都可能让主循环卡住",
                "en": "All three recovery paths need a budget; otherwise any one of them could cause the main loop to hang",
                "ja": "3つの回復パスすべてに予算が必要です。そうでないとどれかがメインループをハングさせる可能性があります"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "每条恢复路径都要有预算的每条指的是全部三条路径：截断续写、上下文压缩、退避重试。任何一条路径如果没有预算限制，都可能在极端情况下导致主循环永远卡住。",
            "en": "The every in every recovery path needs a budget means all three paths: truncation continuation, context compaction, and backoff retry. Any path without a budget limit could cause the main loop to hang indefinitely in extreme cases.",
            "ja": "すべての回復パスには予算が必要のすべてのは3つのパスすべてを指します：切り捨て継続、コンテキスト圧縮、バックオフリトライ。いずれかのパスに予算制限がなければ、極端な場合にメインループが永遠にハングする可能性があります。"
          },
          "reward_card": "card_s11_002"
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
          "difficulty": 1,
          "stem": {
            "zh": "Todo 和 Task 最根本的区别是什么？",
            "en": "What is the fundamental difference between a Todo and a Task?",
            "ja": "Todo と Task の最も根本的な違いは何ですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "Todo 有依赖关系，Task 没有",
                "en": "Todo has dependencies, Task does not",
                "ja": "Todo には依存関係があり、Task にはない"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "Todo 更像本轮计划，Task 更像长期工作板，区别在依赖和持久化",
                "en": "Todo is more like a current-round plan; Task is more like a long-term board, differing in dependencies and persistence",
                "ja": "Todo は今ラウンドの計画、Task は長期ボード——依存関係と永続化が違う"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Task 只能由人类创建，Todo 由 AI 自动生成",
                "en": "Tasks can only be created by humans; Todos are auto-generated by AI",
                "ja": "Task は人間のみ作成可能で、Todo は AI が自動生成する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Todo 和 Task 只是命名不同，功能完全一样",
                "en": "Todo and Task are just different names; their functionality is identical",
                "ja": "Todo と Task は名前が違うだけで機能は全く同じ"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "Todo 更像「本轮计划」，适合短暂的会话内任务；Task 更像「长期工作板」，关键区别在于它支持依赖关系（blockedBy/blocks）和跨会话持久化。",
            "en": "Todo is like a 'current-round plan' for transient in-session tasks. Task is like a 'long-term board' — the key difference is support for dependencies (blockedBy/blocks) and cross-session persistence.",
            "ja": "Todo は「今ラウンドの計画」でセッション内の一時的タスク向け。Task は「長期ボード」——依存関係（blockedBy/blocks）とセッションをまたぐ永続化が重要な違いです。"
          },
          "reward_card": "card_s12_001"
        },
        {
          "id": "q_s12_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "下列哪种场景最适合使用 Task 而不是 Todo？",
            "en": "Which scenario is best suited for using Task rather than Todo?",
            "ja": "次のどのシナリオで Todo ではなく Task を使うのが最も適切ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "在单次对话中列出三个步骤提醒自己",
                "en": "Listing three steps in a single conversation as a reminder",
                "ja": "一回の会話で 3 つのステップをメモとして列挙する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在会话内随手记录想法",
                "en": "Jotting down ideas within a session",
                "ja": "セッション内でアイデアをメモする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "跨会话追踪多个子代理之间存在依赖的工作项",
                "en": "Tracking work items with dependencies among multiple sub-agents across sessions",
                "ja": "複数のサブエージェント間で依存関係を持つ作業項目をセッションをまたいで追跡する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用自然语言描述今天要做的事",
                "en": "Describing in natural language what needs to be done today",
                "ja": "今日やることを自然言語で記述する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Task 的设计目标是跨会话持久化并支持依赖关系，因此多个子代理之间存在先后依赖、需要长期追踪的工作项才是 Task 的典型使用场景。",
            "en": "Task is designed for cross-session persistence and dependency support. The typical use case is tracking work items with sequential dependencies among multiple sub-agents over the long term.",
            "ja": "Task はセッションをまたぐ永続化と依存関係をサポートするよう設計されています。複数のサブエージェント間で順序依存があり、長期追跡が必要な作業項目が典型的な使用例です。"
          },
          "reward_card": "card_s12_001"
        },
        {
          "id": "q_s12_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "下面对 Todo 与 Task 的说法，哪一项是错误的？",
            "en": "Which of the following statements about Todo vs Task is incorrect?",
            "ja": "Todo と Task に関する次の説明のうち、誤っているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Todo 不支持持久化，会话结束即消失",
                "en": "Todos do not support persistence and disappear when the session ends",
                "ja": "Todo は永続化をサポートせず、セッション終了とともに消える"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Task 支持 blockedBy 字段来表达依赖关系",
                "en": "Task supports the blockedBy field to express dependencies",
                "ja": "Task は blockedBy フィールドで依存関係を表現できる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Task 和 Todo 都有 blockedBy 和 blocks 字段",
                "en": "Both Task and Todo have blockedBy and blocks fields",
                "ja": "Task と Todo はどちらも blockedBy と blocks フィールドを持つ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Task 更适合多代理协作和跨会话持久化",
                "en": "Task is better suited for multi-agent collaboration and cross-session persistence",
                "ja": "Task はマルチエージェント協調とセッションをまたぐ永続化に向いている"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Todo 是轻量的会话内计划，不包含 blockedBy/blocks 这样的依赖字段。只有 Task（即 TaskRecord）才定义了这两个字段，用于表达任务间的依赖关系。",
            "en": "Todo is a lightweight in-session plan and does not include dependency fields like blockedBy/blocks. Only Task (i.e., TaskRecord) defines these two fields to express inter-task dependencies.",
            "ja": "Todo はセッション内の軽量な計画であり、blockedBy/blocks のような依存フィールドを持ちません。TaskRecord だけがこれら 2 つのフィールドを定義し、タスク間の依存関係を表します。"
          },
          "reward_card": "card_s12_001"
        },
        {
          "id": "q_s12_004",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "Todo 升级为 Task 系统的核心价值体现在哪两点？",
            "en": "What are the two core values when upgrading from Todo to the Task system?",
            "ja": "Todo を Task システムに昇格させる際の中核的な価値は何の 2 点ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "更漂亮的 UI 和更快的响应速度",
                "en": "Prettier UI and faster response speed",
                "ja": "より美しい UI と高速レスポンス"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "支持自然语言描述和自动分配优先级",
                "en": "Natural language description and automatic priority assignment",
                "ja": "自然言語記述と自動優先度割り当て"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "减少代码行数和降低内存占用",
                "en": "Fewer lines of code and lower memory usage",
                "ja": "コード行数削減とメモリ消費の低下"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "依赖关系管理（blockedBy/blocks）和跨会话持久化",
                "en": "Dependency management (blockedBy/blocks) and cross-session persistence",
                "ja": "依存関係管理（blockedBy/blocks）とセッションをまたぐ永続化"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "把 Todo 升级为 Task 系统的核心在于两点：一是通过 blockedBy/blocks 字段表达任务间依赖，二是跨会话持久化，让任务状态在会话重启后仍然存在。",
            "en": "The core of upgrading Todo to the Task system lies in two points: expressing inter-task dependencies via blockedBy/blocks fields, and cross-session persistence so task state survives session restarts.",
            "ja": "Todo を Task システムに昇格させる核心は 2 点：blockedBy/blocks フィールドによるタスク間依存の表現、およびセッション再起動後もタスク状態が残るセッションをまたぐ永続化です。"
          },
          "reward_card": "card_s12_001"
        },
        {
          "id": "q_s12_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "TaskRecord 共有几个核心字段？",
            "en": "How many core fields does TaskRecord have?",
            "ja": "TaskRecord のコアフィールドはいくつありますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "3 个",
                "en": "3",
                "ja": "3 つ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "4 个",
                "en": "4",
                "ja": "4 つ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "5 个",
                "en": "5",
                "ja": "5 つ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "6 个",
                "en": "6",
                "ja": "6 つ"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "TaskRecord 有 6 个核心字段：id、subject、status、blockedBy、blocks、owner。",
            "en": "TaskRecord has 6 core fields: id, subject, status, blockedBy, blocks, and owner.",
            "ja": "TaskRecord には 6 つのコアフィールドがあります：id、subject、status、blockedBy、blocks、owner。"
          },
          "reward_card": "card_s12_002"
        },
        {
          "id": "q_s12_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 TaskRecord 中，blockedBy 和 blocks 字段分别表示什么？",
            "en": "In TaskRecord, what do the blockedBy and blocks fields each represent?",
            "ja": "TaskRecord において blockedBy と blocks フィールドはそれぞれ何を表しますか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "blockedBy 是任务创建者，blocks 是任务执行者",
                "en": "blockedBy is the task creator; blocks is the task executor",
                "ja": "blockedBy はタスク作成者、blocks はタスク実行者"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "blockedBy 是「被哪些任务阻塞」，blocks 是「阻塞哪些任务」",
                "en": "blockedBy means 'blocked by which tasks'; blocks means 'blocking which tasks'",
                "ja": "blockedBy は「どのタスクにブロックされているか」、blocks は「どのタスクをブロックしているか」"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "blockedBy 是任务状态，blocks 是任务优先级",
                "en": "blockedBy is the task status; blocks is the task priority",
                "ja": "blockedBy はタスクのステータス、blocks はタスクの優先度"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "两个字段含义相同，都表示任务的依赖列表",
                "en": "Both fields have the same meaning; both represent the task dependency list",
                "ja": "2 つのフィールドは同じ意味で、どちらもタスクの依存リストを表す"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "blockedBy 记录「哪些任务完成前本任务不能开始」，blocks 记录「本任务完成后哪些任务得以解锁」。两者构成任务依赖图的双向边。",
            "en": "blockedBy records 'which tasks must finish before this task can start'; blocks records 'which tasks are unlocked when this task completes'. Together they form bidirectional edges in the task dependency graph.",
            "ja": "blockedBy は「どのタスクが完了するまでこのタスクを開始できないか」を記録し、blocks は「このタスクの完了でどのタスクがアンロックされるか」を記録します。両者でタスク依存グラフの双方向エッジを形成します。"
          },
          "reward_card": "card_s12_002"
        },
        {
          "id": "q_s12_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "TaskRecord 的 owner 字段主要用于什么场景？",
            "en": "What is the main use case for the owner field in TaskRecord?",
            "ja": "TaskRecord の owner フィールドは主にどのような場面で使われますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "记录任务的创建时间",
                "en": "Recording the task creation time",
                "ja": "タスクの作成時刻を記録する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "标识哪个子代理当前正在处理该任务，支持多代理协作",
                "en": "Identifying which sub-agent is currently handling the task, enabling multi-agent collaboration",
                "ja": "どのサブエージェントが現在そのタスクを担当しているかを識別し、マルチエージェント協調を支援する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "存储任务的完整描述文本",
                "en": "Storing the full description text of the task",
                "ja": "タスクの完全な説明テキストを保存する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "控制任务的访问权限",
                "en": "Controlling access permissions for the task",
                "ja": "タスクのアクセス権限を制御する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "owner 字段标识哪个子代理当前持有该任务，在多代理并发工作时避免同一任务被重复领取，是任务系统支持多代理协作的关键机制。",
            "en": "The owner field identifies which sub-agent currently holds the task, preventing duplicate claims in multi-agent concurrent workflows. It is a key mechanism enabling multi-agent collaboration in the task system.",
            "ja": "owner フィールドはどのサブエージェントが現在そのタスクを保持しているかを識別し、マルチエージェント並行処理での重複取得を防ぎます。タスクシステムがマルチエージェント協調をサポートする重要な仕組みです。"
          },
          "reward_card": "card_s12_002"
        },
        {
          "id": "q_s12_008",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个 TaskRecord 的 subject 字段和 status 字段分别存储什么内容？",
            "en": "What does the subject field and the status field of a TaskRecord each store?",
            "ja": "TaskRecord の subject フィールドと status フィールドはそれぞれ何を格納しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "subject 存储任务 ID，status 存储依赖列表",
                "en": "subject stores the task ID; status stores the dependency list",
                "ja": "subject はタスク ID、status は依存リストを格納する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "subject 存储任务描述，status 存储执行者",
                "en": "subject stores the task description; status stores the executor",
                "ja": "subject はタスク記述、status は実行者を格納する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "subject 存储任务名称/描述，status 存储当前状态（如 pending/in_progress/done）",
                "en": "subject stores the task name/description; status stores the current state (e.g., pending/in_progress/done)",
                "ja": "subject はタスク名/説明、status は現在の状態（pending/in_progress/done など）を格納する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "subject 存储创建时间，status 存储优先级",
                "en": "subject stores the creation time; status stores the priority",
                "ja": "subject は作成時刻、status は優先度を格納する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "subject 存储任务的名称或自然语言描述（即「做什么」），status 存储任务当前的生命周期状态，如 pending、in_progress、done 等。",
            "en": "subject stores the task name or natural language description (the 'what to do'); status stores the task's current lifecycle state, such as pending, in_progress, or done.",
            "ja": "subject はタスクの名前または自然言語での説明（「何をするか」）を格納し、status はタスクの現在のライフサイクル状態（pending、in_progress、done など）を格納します。"
          },
          "reward_card": "card_s12_002"
        },
        {
          "id": "q_s12_009",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪项不是 TaskRecord 的核心字段？",
            "en": "Which of the following is NOT a core field of TaskRecord?",
            "ja": "次のうち TaskRecord のコアフィールドではないのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "blockedBy",
                "en": "blockedBy",
                "ja": "blockedBy"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "priority",
                "en": "priority",
                "ja": "priority"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "owner",
                "en": "owner",
                "ja": "owner"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "subject",
                "en": "subject",
                "ja": "subject"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "TaskRecord 的 6 个核心字段是：id、subject、status、blockedBy、blocks、owner。priority 不在其中——任务系统通过依赖关系（is_ready()）决定执行顺序，而非优先级数字。",
            "en": "The 6 core fields of TaskRecord are: id, subject, status, blockedBy, blocks, owner. priority is not among them — the task system determines execution order via dependencies (is_ready()), not a priority number.",
            "ja": "TaskRecord の 6 つのコアフィールドは id、subject、status、blockedBy、blocks、owner です。priority はその中にありません——タスクシステムは優先度数値ではなく依存関係（is_ready()）で実行順序を決定します。"
          },
          "reward_card": "card_s12_002"
        },
        {
          "id": "q_s12_010",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "is_ready() 函数判断任务「可以开始」的条件是什么？",
            "en": "What condition does is_ready() use to determine that a task 'can start'?",
            "ja": "is_ready() がタスクを「開始可能」と判断する条件は何ですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "任务的 owner 字段已填写",
                "en": "The task's owner field has been filled in",
                "ja": "タスクの owner フィールドが入力済みであること"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "任务的 status 为 pending 且 blockedBy 列表中的所有任务均已完成",
                "en": "The task's status is pending and all tasks in its blockedBy list are completed",
                "ja": "タスクの status が pending で、blockedBy リスト内の全タスクが完了済みであること"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "任务的 priority 为最高级",
                "en": "The task has the highest priority",
                "ja": "タスクが最高優先度であること"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "任务的创建时间最早",
                "en": "The task was created earliest",
                "ja": "タスクの作成時刻が最も早いこと"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "is_ready() 的判断逻辑是：status 为 pending（未开始）且 blockedBy 列表中所有依赖任务均已 done（完成）。只有满足这两个条件，任务才算就绪可开工。",
            "en": "is_ready() checks: status is pending (not started) AND all dependency tasks in the blockedBy list are done (completed). Both conditions must be met for a task to be considered ready to start.",
            "ja": "is_ready() のロジック：status が pending（未開始）で、かつ blockedBy リスト内の全依存タスクが done（完了）であること。この 2 条件が揃って初めてタスクは開始可能と判断されます。"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_011",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "任务系统的核心不是「保存清单」，而是什么？",
            "en": "The core of the task system is not 'saving a list'. What is it instead?",
            "ja": "タスクシステムの核心は「リストの保存」ではなく、何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "自动给任务排序",
                "en": "Automatically sorting tasks",
                "ja": "タスクの自動ソート"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "统计任务完成率",
                "en": "Calculating task completion rate",
                "ja": "タスク完了率の計算"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "通过 is_ready() 判断谁现在能开工",
                "en": "Using is_ready() to determine who can start working right now",
                "ja": "is_ready() で今すぐ着手できるタスクを判断すること"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "向用户展示漂亮的进度条",
                "en": "Showing the user a nice progress bar",
                "ja": "ユーザーに見栄えのよい進捗バーを表示すること"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "任务系统真正的核心在于 is_ready() 的就绪判断——它让系统能在任何时刻识别出「现在哪些任务的前置条件已满足、可以立即开始」，从而驱动多代理自动推进。",
            "en": "The true core of the task system is the readiness check via is_ready() — it lets the system identify at any moment which tasks have all prerequisites met and can start immediately, driving multi-agent automatic progression.",
            "ja": "タスクシステムの真の核心は is_ready() による就緒判定です——いつでも「前提条件が満たされ即座に開始できるタスク」を識別し、マルチエージェントの自動推進を駆動します。"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_012",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果一个任务的 blockedBy 列表不为空但所有依赖任务都已 done，is_ready() 会返回什么？",
            "en": "If a task's blockedBy list is non-empty but all dependency tasks are done, what does is_ready() return?",
            "ja": "タスクの blockedBy リストが空でなくても、全依存タスクが done なら is_ready() は何を返しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "false，因为 blockedBy 不为空就不能就绪",
                "en": "false, because a non-empty blockedBy means it cannot be ready",
                "ja": "false。blockedBy が空でなければ就緒にならないから"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "报错，不允许 blockedBy 不为空时调用 is_ready()",
                "en": "Error; is_ready() cannot be called when blockedBy is non-empty",
                "ja": "エラー。blockedBy が空でない場合は is_ready() を呼べない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "true，因为 blockedBy 里的所有任务都已完成，依赖已解除",
                "en": "true, because all tasks in blockedBy are done and the dependency is resolved",
                "ja": "true。blockedBy 内の全タスクが完了し依存が解消されているから"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "取决于 status 字段，与 blockedBy 无关",
                "en": "Depends on the status field and is unrelated to blockedBy",
                "ja": "status フィールドに依存し、blockedBy とは無関係"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "is_ready() 的判断是：blockedBy 列表中每一个依赖任务是否都已 done。只要全部依赖都完成了，即使 blockedBy 非空，该任务也进入就绪状态。列表非空不等于仍被阻塞。",
            "en": "is_ready() checks whether every task in the blockedBy list is done. As long as all dependencies are completed, the task becomes ready even if blockedBy is non-empty. A non-empty list does not mean still blocked.",
            "ja": "is_ready() は blockedBy リスト内の全タスクが done かどうかを確認します。全依存が完了していれば、blockedBy が空でなくてもタスクは就緒状態になります。リストが空でないことはまだブロックされていることを意味しません。"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "为什么说 is_ready() 是任务系统的「调度引擎」？",
            "en": "Why is is_ready() called the 'scheduling engine' of the task system?",
            "ja": "なぜ is_ready() がタスクシステムの「スケジューリングエンジン」と言われるのですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "因为它能自动执行任务，无需人工干预",
                "en": "Because it can automatically execute tasks without human intervention",
                "ja": "人的介入なしにタスクを自動実行できるから"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "因为它能把多个任务合并成一个任务执行",
                "en": "Because it can merge multiple tasks into one for execution",
                "ja": "複数のタスクを 1 つにまとめて実行できるから"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "因为它能在任意时刻识别出所有满足依赖条件的任务，驱动代理按图推进",
                "en": "Because it can identify at any moment all tasks whose dependencies are satisfied, driving agents to advance along the graph",
                "ja": "いつでも依存条件が満たされた全タスクを識別し、エージェントをグラフに沿って推進させるから"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "因为它会按照创建顺序严格排队分配任务",
                "en": "Because it strictly queues and assigns tasks in creation order",
                "ja": "作成順に厳格にキューイングしてタスクを割り当てるから"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "is_ready() 是判断「谁现在能开工」的核心函数。系统在每个时刻扫描所有任务，找出 is_ready() 返回 true 的任务并分派给代理，从而把静态的依赖图转化为动态的工作流推进。",
            "en": "is_ready() is the core function for determining 'who can start working now'. The system scans all tasks at each moment, finds those returning true from is_ready(), and dispatches them to agents, converting a static dependency graph into dynamic workflow progression.",
            "ja": "is_ready() は「今すぐ着手できるのは誰か」を判定するコア関数です。システムは各時点で全タスクをスキャンし is_ready() が true を返すタスクをエージェントにディスパッチし、静的な依存グラフを動的なワークフロー推進に変換します。"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_014",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "当一个任务被标记为 done 时，任务系统会自动做什么？",
            "en": "When a task is marked as done, what does the task system automatically do?",
            "ja": "タスクが done とマークされると、タスクシステムは自動的に何をしますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "删除该任务记录",
                "en": "Delete the task record",
                "ja": "タスクレコードを削除する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "向用户发送通知",
                "en": "Send a notification to the user",
                "ja": "ユーザーに通知を送信する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "重新计算所有任务的优先级",
                "en": "Recalculate the priority of all tasks",
                "ja": "全タスクの優先度を再計算する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "解锁 blocks 列表中依赖它的后续任务，使其变为就绪",
                "en": "Unlock subsequent tasks in its blocks list that depend on it, making them ready",
                "ja": "blocks リスト内の依存タスクをアンロックし、就緒状態にする"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "任务完成时，系统会检查该任务的 blocks 字段，找到所有依赖它的后续任务，并重新评估它们的 is_ready() 状态。原本被阻塞的任务可能因此变为就绪，自动推进工作流。",
            "en": "When a task completes, the system checks its blocks field, finds all subsequent tasks depending on it, and re-evaluates their is_ready() status. Previously blocked tasks may become ready, automatically advancing the workflow.",
            "ja": "タスク完了時、システムはその blocks フィールドを確認して依存する後続タスクをすべて見つけ、is_ready() の状態を再評価します。以前ブロックされていたタスクが就緒になり、ワークフローが自動推進されます。"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_015",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "任务系统被描述为「会随完成事件自动推进的工作图」，这里「工作图」的「图」指的是什么？",
            "en": "The task system is described as 'a work graph that auto-advances on completion events'. What does 'graph' refer to here?",
            "ja": "タスクシステムは「完了イベントで自動推進する作業グラフ」と表現されます。ここでの「グラフ」とは何を指しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "任务的可视化图表（如甘特图）",
                "en": "A visual chart of tasks (e.g., Gantt chart)",
                "ja": "タスクの可視化チャート（ガントチャートなど）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "由任务节点和依赖边（blockedBy/blocks）构成的有向图结构",
                "en": "A directed graph structure formed by task nodes and dependency edges (blockedBy/blocks)",
                "ja": "タスクノードと依存エッジ（blockedBy/blocks）で構成された有向グラフ構造"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "任务进度的折线图",
                "en": "A line chart showing task progress",
                "ja": "タスクの進捗を示す折れ線グラフ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "任务数量随时间变化的统计图",
                "en": "A statistical chart of task count over time",
                "ja": "時間経過によるタスク数の統計グラフ"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "「工作图」是计算机科学中的有向图（Directed Graph）——任务是节点，blockedBy/blocks 形成的依赖关系是有向边。任务完成时，相关的边被「解除」，后续节点变为可达（就绪）。",
            "en": "The 'work graph' is a directed graph in computer science — tasks are nodes, and the dependencies formed by blockedBy/blocks are directed edges. When a task completes, related edges are 'released' and subsequent nodes become reachable (ready).",
            "ja": "「作業グラフ」はコンピュータサイエンスの有向グラフです——タスクがノード、blockedBy/blocks による依存関係が有向エッジです。タスク完了時に関連エッジが「解除」され、後続ノードが到達可能（就緒）になります。"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "任务 A blocks [B, C]，任务 B blockedBy [A]，任务 C blockedBy [A, D]。当 A 完成后，哪些任务变为就绪？",
            "en": "Task A blocks [B, C]; task B blockedBy [A]; task C blockedBy [A, D]. After A completes, which tasks become ready?",
            "ja": "タスク A は [B, C] を blocks し、B は [A] を blockedBy、C は [A, D] を blockedBy。A 完了後、就緒になるのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "B 和 C 都变为就绪",
                "en": "Both B and C become ready",
                "ja": "B と C の両方が就緒になる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只有 B 变为就绪，C 仍被 D 阻塞",
                "en": "Only B becomes ready; C is still blocked by D",
                "ja": "B のみ就緒になり、C は D によって引き続きブロックされる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "B 和 C 都不变为就绪",
                "en": "Neither B nor C becomes ready",
                "ja": "B も C も就緒にならない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只有 C 变为就绪，因为 A 先在 C 的依赖中",
                "en": "Only C becomes ready because A appears first in C's dependencies",
                "ja": "C のみが就緒になる。A が C の依存に先に現れるから"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "B 的 blockedBy 只有 [A]，A 完成后 B 的所有依赖满足，B 就绪。C 的 blockedBy 是 [A, D]，A 完成后 D 未完成，C 仍被阻塞，不就绪。这正是 is_ready() 逐项检查 blockedBy 的体现。",
            "en": "B's blockedBy is only [A]; after A completes all of B's dependencies are met, so B is ready. C's blockedBy is [A, D]; after A completes, D is still incomplete so C remains blocked and not ready. This illustrates is_ready() checking each item in blockedBy.",
            "ja": "B の blockedBy は [A] のみ。A 完了後に B の全依存が満たされ B は就緒。C の blockedBy は [A, D]。A 完了後も D が未完のため C はブロックされたまま。これは is_ready() が blockedBy を 1 つずつ確認することを示しています。"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_017",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "「任务系统不是静态记录表，而是会随完成事件自动推进的工作图」这句话的核心含义是？",
            "en": "What is the core meaning of 'the task system is not a static record table but a work graph that auto-advances on completion events'?",
            "ja": "「タスクシステムは静的なレコード表ではなく、完了イベントで自動推進する作業グラフ」という言葉の核心的な意味は？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "系统会自动帮用户编写代码",
                "en": "The system automatically writes code for the user",
                "ja": "システムがユーザーのためにコードを自動的に書く"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "任务状态变化会触发依赖检查，让满足条件的后续任务自动进入就绪队列",
                "en": "Task state changes trigger dependency checks, automatically placing eligible subsequent tasks into the ready queue",
                "ja": "タスクの状態変化が依存チェックをトリガーし、条件を満たした後続タスクが自動的に就緒キューに入る"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "系统会自动删除已完成的任务以节省存储空间",
                "en": "The system automatically deletes completed tasks to save storage space",
                "ja": "システムは完了したタスクを自動削除してストレージを節約する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "任务系统只能用于记录，不能用于调度",
                "en": "The task system can only be used for recording, not for scheduling",
                "ja": "タスクシステムは記録にのみ使用でき、スケジューリングには使えない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "「自动推进」的本质是：当某任务 done 时，系统重新检查 is_ready()，把原本被阻塞但现在满足条件的后续任务推入就绪状态。这让工作流无需人工干预即可按依赖图自动流转。",
            "en": "The essence of 'auto-advances' is: when a task is done, the system re-checks is_ready() and pushes previously blocked tasks that now meet conditions into the ready state. This lets workflows advance along the dependency graph without manual intervention.",
            "ja": "「自動推進」の本質：タスクが done になると、システムが is_ready() を再チェックし、以前ブロックされていて今は条件を満たした後続タスクを就緒状態に移します。これにより手動介入なしに依存グラフに沿ってワークフローが自動的に流れます。"
          },
          "reward_card": "card_s12_003"
        },
        {
          "id": "q_s12_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下列哪种描述最准确地总结了 s12 任务系统的整体设计哲学？",
            "en": "Which description most accurately summarizes the overall design philosophy of the s12 task system?",
            "ja": "次のどの説明が s12 タスクシステムの全体的な設計哲学を最も正確にまとめていますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "用简单的列表结构存储任务，方便人类查看",
                "en": "Store tasks in a simple list structure for easy human viewing",
                "ja": "シンプルなリスト構造でタスクを保存し、人間が見やすくする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "把会话内临时计划（Todo）升级为可持久化、有依赖、能自动推进的工作图（Task），驱动多代理按序协作",
                "en": "Upgrade in-session temporary plans (Todo) to a persistent, dependency-aware, self-advancing work graph (Task) that drives multi-agent sequential collaboration",
                "ja": "セッション内の一時的な計画（Todo）を、永続化・依存関係・自動推進を備えた作業グラフ（Task）に昇格させ、マルチエージェントの順序付き協調を駆動する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "用优先级队列替代依赖图，让最重要的任务先执行",
                "en": "Replace the dependency graph with a priority queue so the most important tasks execute first",
                "ja": "依存グラフの代わりに優先度キューを使い、最重要タスクを先に実行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "把所有任务合并为单一长任务，减少调度开销",
                "en": "Merge all tasks into a single long task to reduce scheduling overhead",
                "ja": "全タスクを 1 つの長いタスクにまとめてスケジューリングのオーバーヘッドを削減する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "s12 任务系统的设计哲学是：以 TaskRecord（6 字段）为节点，以 blockedBy/blocks 为依赖边，以 is_ready() 为调度引擎，把原本无序的 Todo 清单升级为能跨会话持久化、随完成事件自动推进的有向工作图。",
            "en": "The design philosophy of the s12 task system: use TaskRecord (6 fields) as nodes, blockedBy/blocks as dependency edges, and is_ready() as the scheduling engine, upgrading unordered Todo lists into a directed work graph that persists across sessions and auto-advances on completion events.",
            "ja": "s12 タスクシステムの設計哲学：TaskRecord（6 フィールド）をノード、blockedBy/blocks を依存エッジ、is_ready() をスケジューリングエンジンとして、無秩序な Todo リストをセッションをまたぐ永続化と完了イベントによる自動推進を備えた有向作業グラフに昇格させる。"
          },
          "reward_card": "card_s12_003"
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
          "difficulty": 1,
          "stem": {
            "zh": "Claude Code 的后台任务机制中，主循环（main loop）的数量是多少？",
            "en": "In Claude Code's background task mechanism, how many main loops are there?",
            "ja": "Claude Code のバックグラウンドタスク機構において、メインループは何本ありますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "有多条，每个后台任务一条",
                "en": "Multiple, one per background task",
                "ja": "複数本、後台タスクごとに1本"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "有两条，一条前台一条后台",
                "en": "Two, one foreground and one background",
                "ja": "2本、フォアグラウンドとバックグラウンドそれぞれ1本"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "始终只有一条",
                "en": "Always exactly one",
                "ja": "常に1本だけ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "取决于并发任务数量",
                "en": "Depends on the number of concurrent tasks",
                "ja": "並行タスクの数による"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "主循环只有一条。后台任务并行的是「等待」，而不是主循环本身。慢命令在另一条执行线上跑，主循环继续推进其他工作。",
            "en": "There is always exactly one main loop. What runs in parallel is the waiting, not the loop itself. Slow commands run on a separate execution thread while the main loop continues other work.",
            "ja": "メインループは常に1本だけです。並行するのは「待機」であり、ループ自体ではありません。遅いコマンドは別の実行スレッドで動き、メインループは他の作業を進め続けます。"
          },
          "reward_card": "card_s13_001"
        },
        {
          "id": "q_s13_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "background_run 被调用后，主循环会怎样处理？",
            "en": "After background_run is called, what does the main loop do?",
            "ja": "background_run が呼ばれた後、メインループはどうなりますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "阻塞等待后台命令执行完毕",
                "en": "Block and wait for the background command to finish",
                "ja": "バックグラウンドコマンドが終わるまでブロックして待つ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "立即返回 task_id，继续推进其他工作",
                "en": "Return a task_id immediately and continue other work",
                "ja": "すぐに task_id を返し、他の作業を続ける"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "创建一条新的主循环来处理后台任务",
                "en": "Create a new main loop to handle the background task",
                "ja": "バックグラウンドタスク用の新しいメインループを作成する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "挂起当前工作，优先处理后台结果",
                "en": "Suspend current work and prioritize background results",
                "ja": "現在の作業を中断し、バックグラウンド結果を優先処理する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "background_run 的关键设计是调用后立即返回一个 task_id，不阻塞主循环。模型拿到 task_id 后可以继续推进其他工作，真正的命令在后台线程里执行。",
            "en": "The key design of background_run is that it returns a task_id immediately without blocking the main loop. The model can continue other work with the task_id, while the actual command runs on a background thread.",
            "ja": "background_run の核心的な設計は、呼び出し後すぐに task_id を返し、メインループをブロックしないことです。モデルは task_id を受け取って他の作業を続けられ、実際のコマンドはバックグラウンドスレッドで実行されます。"
          },
          "reward_card": "card_s13_002"
        },
        {
          "id": "q_s13_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "在后台任务设计中，「并行的是等待，不是主循环本身」这句话的含义是什么？",
            "en": "In background task design, what does 'what runs in parallel is the waiting, not the main loop itself' mean?",
            "ja": "バックグラウンドタスク設計において、「並行するのは待機であり、メインループ自体ではない」という意味は何ですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "主循环停止运行，只有等待逻辑在运行",
                "en": "The main loop stops and only waiting logic runs",
                "ja": "メインループが停止し、待機ロジックだけが動く"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "主循环和后台命令同时运行，主循环不会因等待而暂停",
                "en": "The main loop and background command run simultaneously; the loop doesn't pause to wait",
                "ja": "メインループとバックグラウンドコマンドが同時に動き、ループは待機で止まらない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "等待是串行的，主循环是并行的",
                "en": "Waiting is serial while the main loop is parallel",
                "ja": "待機は直列で、メインループは並列"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "后台任务完成前主循环不会收到任何通知",
                "en": "The main loop receives no notifications until the background task completes",
                "ja": "バックグラウンドタスクが完了するまでメインループは通知を受けない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "慢命令在另一条执行线上跑，主循环先去做别的事。两者同时推进，只是结果稍后通过通知回来。主循环不等待，所以并行的是「等待行为」而非循环本体。",
            "en": "Slow commands run on a separate execution thread while the main loop does other things. Both advance simultaneously; results come back later via notifications. The loop doesn't wait, so what's parallel is the 'waiting behavior', not the loop itself.",
            "ja": "遅いコマンドは別の実行スレッドで動き、メインループは他の作業をします。両者が同時に進み、結果は後で通知で届きます。ループは待機しないので、並行するのは「待機の動作」であってループ本体ではありません。"
          },
          "reward_card": "card_s13_001"
        },
        {
          "id": "q_s13_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "background_run 返回的 task_id 的主要用途是什么？",
            "en": "What is the primary use of the task_id returned by background_run?",
            "ja": "background_run が返す task_id の主な用途は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "作为日志文件的文件名",
                "en": "As the filename for the log file",
                "ja": "ログファイルのファイル名として使う"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "用于直接中止后台任务",
                "en": "To directly terminate the background task",
                "ja": "バックグラウンドタスクを直接終了させるため"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "让模型能够在稍后识别和追踪该后台任务的结果",
                "en": "Allow the model to identify and track the result of that background task later",
                "ja": "後でそのバックグラウンドタスクの結果を識別・追跡できるようにする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "决定后台任务的执行优先级",
                "en": "Determine the execution priority of the background task",
                "ja": "バックグラウンドタスクの実行優先度を決める"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "模型拿到 task_id 后可以继续做其他工作。当后台通知到来时，task_id 让模型能够识别是哪个任务完成了，从而正确处理结果。",
            "en": "With the task_id, the model can continue other work. When a background notification arrives, the task_id lets the model identify which task completed, enabling proper result handling.",
            "ja": "task_id を受け取ったモデルは他の作業を続けられます。バックグラウンド通知が届いたとき、task_id によってどのタスクが完了したか識別でき、結果を適切に処理できます。"
          },
          "reward_card": "card_s13_002"
        },
        {
          "id": "q_s13_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果 background_run 像普通工具调用一样阻塞等待，会带来什么问题？",
            "en": "What problem would occur if background_run blocked and waited like a regular tool call?",
            "ja": "background_run が通常のツール呼び出しのようにブロックして待機したら、どんな問題が起きますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "task_id 会变得不稳定",
                "en": "The task_id would become unstable",
                "ja": "task_id が不安定になる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "后台日志会写入失败",
                "en": "Background logs would fail to write",
                "ja": "バックグラウンドログの書き込みが失敗する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "通知队列会被清空",
                "en": "The notification queue would be emptied",
                "ja": "通知キューが空になる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "主循环在慢命令执行期间无法推进其他工作，失去并发优势",
                "en": "The main loop could not advance other work during slow command execution, losing concurrency benefits",
                "ja": "遅いコマンドの実行中にメインループが他の作業を進められず、並行処理の利点が失われる"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "background_run 的核心价值在于「不阻塞主循环」。如果改成阻塞等待，主循环就得等慢命令跑完才能继续，和普通同步调用没有区别，后台任务的意义就消失了。",
            "en": "The core value of background_run is 'not blocking the main loop'. If it blocked instead, the main loop would have to wait for slow commands to finish before continuing, making it no different from synchronous calls and eliminating the purpose of background tasks.",
            "ja": "background_run の核心的な価値は「メインループをブロックしない」ことです。もしブロックに変わると、遅いコマンドが終わるまでメインループが待機せざるを得なくなり、同期呼び出しと変わらなくなって、バックグラウンドタスクの意味がなくなります。"
          },
          "reward_card": "card_s13_002"
        },
        {
          "id": "q_s13_006",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "后台任务完成后，完整的输出应该存放在哪里？",
            "en": "After a background task completes, where should the full output be stored?",
            "ja": "バックグラウンドタスク完了後、完全な出力はどこに保存すべきですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "直接放入上下文窗口",
                "en": "Directly in the context window",
                "ja": "直接コンテキストウィンドウに入れる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "写入磁盘文件",
                "en": "Written to a disk file",
                "ja": "ディスクファイルに書き込む"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "存入通知队列",
                "en": "Stored in the notification queue",
                "ja": "通知キューに格納する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "发送给用户界面展示",
                "en": "Sent to the user interface for display",
                "ja": "ユーザーインターフェースに送って表示する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "完整输出写磁盘，通知里只放简短摘要。几万行日志会撑爆上下文窗口，模型真的需要全文时再调 read_file 读取。",
            "en": "The full output is written to disk, and the notification contains only a short summary. Tens of thousands of log lines would overflow the context window; the model calls read_file only when it actually needs the full content.",
            "ja": "完全な出力はディスクに書き込み、通知には短い要約だけを入れます。数万行のログはコンテキストウィンドウを溢れさせるため、モデルが本当に全文が必要なときだけ read_file を呼びます。"
          },
          "reward_card": "card_s13_003"
        },
        {
          "id": "q_s13_007",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "后台任务完成的通知中应该包含什么内容？",
            "en": "What should a background task completion notification contain?",
            "ja": "バックグラウンドタスク完了通知には何を入れるべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "任务产生的全部日志输出",
                "en": "All log output produced by the task",
                "ja": "タスクが生成したすべてのログ出力"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "任务的源代码",
                "en": "The source code of the task",
                "ja": "タスクのソースコード"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "下一个要执行的任务指令",
                "en": "Instructions for the next task to execute",
                "ja": "次に実行するタスクの指示"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "简短摘要（成功/失败 + 关键信息）",
                "en": "A short summary (success/failure + key info)",
                "ja": "短い要約（成功/失敗 + 重要情報）"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "通知负责提醒，文件负责存原文。通知里只放简短摘要，让模型知道任务完成了、是成功还是失败，完整内容需要时再调 read_file。",
            "en": "Notifications handle alerting; files store the original content. Notifications contain only a short summary so the model knows the task completed and whether it succeeded or failed. Full content is fetched via read_file when needed.",
            "ja": "通知は知らせる役割、ファイルは原文を保存する役割です。通知には短い要約だけを入れ、タスクが完了して成功か失敗かをモデルに伝えます。全内容が必要なときは read_file で取得します。"
          },
          "reward_card": "card_s13_003"
        },
        {
          "id": "q_s13_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "为什么不能把几万行日志直接塞入上下文窗口？",
            "en": "Why can't tens of thousands of log lines be stuffed directly into the context window?",
            "ja": "なぜ数万行のログを直接コンテキストウィンドウに詰め込めないのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "因为日志文件格式不被上下文窗口支持",
                "en": "Because log file formats are not supported by the context window",
                "ja": "ログファイル形式がコンテキストウィンドウでサポートされていないから"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "因为会超出窗口容量限制，挤占宝贵的上下文空间",
                "en": "Because it would exceed window capacity limits and crowd out valuable context space",
                "ja": "ウィンドウの容量制限を超え、貴重なコンテキスト空間を圧迫するから"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "因为模型读取速度太慢",
                "en": "Because the model reads too slowly",
                "ja": "モデルの読み取り速度が遅すぎるから"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "因为日志内容通常是加密的",
                "en": "Because log content is usually encrypted",
                "ja": "ログの内容は通常暗号化されているから"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "几万行日志会「撑爆」上下文窗口。上下文空间有限且宝贵，应该只存放模型当前决策所需的关键信息，完整日志按需用 read_file 获取。",
            "en": "Tens of thousands of log lines would 'overflow' the context window. Context space is limited and valuable; it should only hold key information needed for the model's current decisions. Full logs are fetched with read_file as needed.",
            "ja": "数万行のログはコンテキストウィンドウを「溢れさせ」ます。コンテキスト空間は限られた貴重なものであり、モデルの現在の判断に必要な重要情報だけを保持すべきです。全ログは必要に応じて read_file で取得します。"
          },
          "reward_card": "card_s13_003"
        },
        {
          "id": "q_s13_009",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "「通知负责提醒，文件负责存原文」这个设计原则解决了什么核心问题？",
            "en": "What core problem does the design principle 'notifications for alerting, files for storing content' solve?",
            "ja": "「通知は知らせる役割、ファイルは原文を保存する役割」という設計原則はどんな核心問題を解決しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "上下文窗口被长日志撑爆与信息可获取性之间的矛盾",
                "en": "The conflict between context window overflow from long logs and information accessibility",
                "ja": "長いログによるコンテキストウィンドウのオーバーフローと情報アクセス可能性の矛盾"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "磁盘 I/O 速度慢的问题",
                "en": "The problem of slow disk I/O",
                "ja": "ディスク I/O が遅い問題"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "多个后台任务的调度顺序问题",
                "en": "The scheduling order of multiple background tasks",
                "ja": "複数バックグラウンドタスクのスケジューリング順序の問題"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "任务结果的加密传输问题",
                "en": "The encrypted transmission of task results",
                "ja": "タスク結果の暗号化転送の問題"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "如果把全部日志塞进上下文，窗口会撑爆；如果什么都不传，模型又无法感知任务状态。通知+文件的分离设计解决了这个矛盾：摘要保持上下文简洁，完整内容按需读取。",
            "en": "Putting all logs into context overflows the window; putting nothing leaves the model unable to sense task state. The notification+file separation solves this: summaries keep context concise, full content is read on demand.",
            "ja": "全ログをコンテキストに入れるとウィンドウが溢れ、何も入れないとモデルがタスク状態を把握できません。通知+ファイルの分離設計がこの矛盾を解決します：要約でコンテキストを簡潔に保ち、全内容は必要時に読み取ります。"
          },
          "reward_card": "card_s13_003"
        },
        {
          "id": "q_s13_010",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "每次调用模型之前，应该对通知队列做什么操作？",
            "en": "Before each model call, what operation should be performed on the notification queue?",
            "ja": "モデルを呼び出す前に、通知キューに対してどんな操作をすべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "清空通知队列，不向模型注入任何信息",
                "en": "Empty the notification queue without injecting any information into the model",
                "ja": "通知キューを空にし、モデルには何も注入しない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "排空通知队列，将后台结果摘要注入 messages",
                "en": "Drain the notification queue and inject background result summaries into messages",
                "ja": "通知キューを排空し、バックグラウンド結果の要約を messages に注入する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "保留通知队列，等待所有后台任务完成",
                "en": "Keep the notification queue and wait for all background tasks to finish",
                "ja": "通知キューを保持し、すべてのバックグラウンドタスクの完了を待つ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "将通知队列中的全部原始输出追加到 messages",
                "en": "Append all raw output from the notification queue to messages",
                "ja": "通知キューのすべての生出力を messages に追記する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "每次调模型之前，先把通知队列排空，将后台结果摘要注入 messages。这样模型在下一轮就会知道哪个任务完成了、是成功还是失败，这是主循环多出的一个标准前置步骤。",
            "en": "Before each model call, drain the notification queue and inject background result summaries into messages. This way the model knows in the next round which task completed and whether it succeeded or failed. This is an extra standard pre-step added to the main loop.",
            "ja": "モデルを呼び出す前に、通知キューを排空し、バックグラウンド結果の要約を messages に注入します。これでモデルは次のラウンドでどのタスクが完了し、成功か失敗かを知れます。これがメインループに追加された標準的な前置ステップです。"
          },
          "reward_card": "card_s13_004"
        },
        {
          "id": "q_s13_011",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果调用模型前不排空通知队列，会发生什么？",
            "en": "What happens if the notification queue is not drained before calling the model?",
            "ja": "モデルを呼び出す前に通知キューを排空しないとどうなりますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "模型无法感知后台任务已完成，可能重复启动同一任务",
                "en": "The model cannot sense that background tasks completed, possibly restarting the same tasks",
                "ja": "モデルがバックグラウンドタスクの完了を感知できず、同じタスクを再起動する可能性がある"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "通知队列会自动清空",
                "en": "The notification queue will automatically empty",
                "ja": "通知キューが自動的に空になる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "后台任务会被强制中止",
                "en": "Background tasks will be forcefully terminated",
                "ja": "バックグラウンドタスクが強制終了される"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型调用会报错失败",
                "en": "The model call will fail with an error",
                "ja": "モデル呼び出しがエラーで失敗する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "通知队列是模型了解后台状态的唯一渠道。不排空就调模型，模型就看不到已完成的任务结果，可能做出错误决策（比如重启已完成的任务或忽略失败）。",
            "en": "The notification queue is the only channel for the model to learn about background state. If not drained before calling the model, the model won't see completed task results and may make wrong decisions (like restarting completed tasks or ignoring failures).",
            "ja": "通知キューはモデルがバックグラウンド状態を知る唯一のチャネルです。排空せずにモデルを呼び出すと、完了したタスクの結果が見えず、誤った判断（完了したタスクの再起動や失敗の無視など）をする可能性があります。"
          },
          "reward_card": "card_s13_004"
        },
        {
          "id": "q_s13_012",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "「排空通知队列」在主循环中处于什么位置？",
            "en": "Where does 'draining the notification queue' appear in the main loop?",
            "ja": "「通知キューの排空」はメインループのどの位置にありますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "调用模型之后，作为后处理步骤",
                "en": "After calling the model, as a post-processing step",
                "ja": "モデル呼び出し後、後処理ステップとして"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "只在后台任务失败时触发",
                "en": "Only triggered when a background task fails",
                "ja": "バックグラウンドタスクが失敗したときだけ発動する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "调用模型之前，作为标准前置步骤",
                "en": "Before calling the model, as a standard pre-step",
                "ja": "モデル呼び出し前、標準的な前置ステップとして"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "在工具调用完成后立即触发",
                "en": "Triggered immediately after a tool call completes",
                "ja": "ツール呼び出し完了直後に発動する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "每次调模型之前，先把通知队列排空，将后台结果摘要注入 messages。这是主循环在引入后台任务后多出的一个标准前置步骤。",
            "en": "Before each model call, the notification queue is drained and background result summaries are injected into messages. This is a standard pre-step added to the main loop after introducing background tasks.",
            "ja": "モデルを呼び出す前に、毎回通知キューを排空し、バックグラウンド結果の要約を messages に注入します。これはバックグラウンドタスクを導入したことでメインループに追加された標準的な前置ステップです。"
          },
          "reward_card": "card_s13_004"
        },
        {
          "id": "q_s13_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个耗时 30 秒的测试命令，用后台任务机制运行时，主循环在这 30 秒内能做什么？",
            "en": "When a 30-second test command runs as a background task, what can the main loop do during those 30 seconds?",
            "ja": "30秒かかるテストコマンドをバックグラウンドタスクとして実行した場合、メインループはその30秒間に何ができますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "什么也不能做，只能等待测试结果",
                "en": "Nothing; it can only wait for test results",
                "ja": "何もできず、テスト結果を待つだけ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "继续处理其他工作，等测试完成的通知到来再处理结果",
                "en": "Continue other work and process results when the test completion notification arrives",
                "ja": "他の作業を続け、テスト完了通知が届いたら結果を処理する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "只能轮询检查测试是否完成",
                "en": "Only poll to check if the test has finished",
                "ja": "テストが終了したかどうかをポーリングするだけ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "自动创建另一条主循环来处理其他工作",
                "en": "Automatically create another main loop to handle other work",
                "ja": "他の作業を処理するために別のメインループを自動的に作成する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "这正是后台任务的核心价值。测试命令在后台线程执行，主循环立即去处理其他工作。测试完成后通知写入队列，下一次调模型前排空队列时，模型就能知道测试结果了。",
            "en": "This is exactly the core value of background tasks. The test command runs on a background thread; the main loop immediately proceeds with other work. When the test completes, a notification is queued; when the queue is drained before the next model call, the model learns the test result.",
            "ja": "これがバックグラウンドタスクの核心的な価値です。テストコマンドはバックグラウンドスレッドで実行され、メインループはすぐに他の作業を処理します。テストが完了すると通知がキューに入り、次のモデル呼び出し前にキューを排空したとき、モデルはテスト結果を知れます。"
          },
          "reward_card": "card_s13_001"
        },
        {
          "id": "q_s13_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "模型通过 background_run 启动了一个构建任务，然后继续做代码分析。构建完成后，模型如何得知构建结果？",
            "en": "A model starts a build task via background_run, then continues code analysis. How does the model learn the build result after it completes?",
            "ja": "モデルが background_run でビルドタスクを起動して、その後コード分析を続けた場合、ビルド完了後にモデルはどうやって結果を知りますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "构建系统主动推送结果到模型",
                "en": "The build system actively pushes results to the model",
                "ja": "ビルドシステムが積極的にモデルに結果をプッシュする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "模型在调用前主动轮询构建状态",
                "en": "The model actively polls build status before each call",
                "ja": "モデルが呼び出し前に積極的にビルド状態をポーリングする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "下一次调用模型前，排空通知队列时将构建结果摘要注入 messages",
                "en": "When draining the notification queue before the next model call, the build result summary is injected into messages",
                "ja": "次のモデル呼び出し前に通知キューを排空する際、ビルド結果の要約が messages に注入される"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "构建结果被直接追加到当前对话的末尾",
                "en": "Build results are directly appended to the end of the current conversation",
                "ja": "ビルド結果が現在の会話の末尾に直接追記される"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "构建完成时通知写入队列，构建的完整输出写磁盘文件。下一次调模型前，排空队列时将摘要注入 messages，模型就知道了构建状态。如需详细日志，再调 read_file 读磁盘文件。",
            "en": "When the build completes, a notification is queued and full output is written to disk. Before the next model call, the queue is drained and the summary is injected into messages, so the model knows the build status. For detailed logs, read_file is called to read the disk file.",
            "ja": "ビルドが完了すると通知がキューに入り、完全な出力がディスクファイルに書かれます。次のモデル呼び出し前にキューを排空して要約が messages に注入され、モデルはビルド状態を知ります。詳細なログが必要なら read_file でディスクファイルを読みます。"
          },
          "reward_card": "card_s13_004"
        },
        {
          "id": "q_s13_015",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "下列哪个场景最能体现「后台任务机制」的设计价值？",
            "en": "Which scenario best demonstrates the design value of the 'background task mechanism'?",
            "ja": "次のどのシナリオが「バックグラウンドタスク機構」の設計価値を最もよく示していますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "用户输入一条简单指令，模型立刻给出回答",
                "en": "User inputs a simple command, model responds immediately",
                "ja": "ユーザーが簡単な指示を入力し、モデルがすぐに応答する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "运行单元测试（5 分钟）的同时，模型继续分析其他文件并生成报告",
                "en": "Running unit tests (5 minutes) while the model continues analyzing other files and generating reports",
                "ja": "単体テスト（5分）を実行しながら、モデルが他のファイルの分析とレポート生成を続ける"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型顺序执行三个 API 调用",
                "en": "Model executes three API calls sequentially",
                "ja": "モデルが3つのAPI呼び出しを順番に実行する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用户手动终止模型当前的任务",
                "en": "User manually terminates the model's current task",
                "ja": "ユーザーがモデルの現在のタスクを手動で終了する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "这个场景完美体现了后台任务的价值：把耗时 5 分钟的测试移到后台，主循环继续分析文件、生成报告，两件事同时推进，整体效率大幅提升。",
            "en": "This scenario perfectly demonstrates the value of background tasks: the 5-minute test runs in the background while the main loop continues analyzing files and generating reports, advancing both simultaneously for greatly improved overall efficiency.",
            "ja": "このシナリオはバックグラウンドタスクの価値を完璧に体現しています：5分かかるテストをバックグラウンドで実行しながら、メインループはファイル分析とレポート生成を続け、両方が同時に進んで全体的な効率が大幅に向上します。"
          },
          "reward_card": "card_s13_001"
        },
        {
          "id": "q_s13_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "某工程师设计了一个系统：后台任务完成后，直接将完整日志（50000 行）注入 messages。这个设计的主要问题是什么？",
            "en": "An engineer designs a system where background tasks inject their full logs (50,000 lines) directly into messages upon completion. What is the main problem with this design?",
            "ja": "あるエンジニアが、バックグラウンドタスク完了後に完全なログ（50,000行）を直接 messages に注入するシステムを設計しました。この設計の主な問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "日志格式不被 messages 字段支持",
                "en": "Log format is not supported by the messages field",
                "ja": "ログ形式が messages フィールドでサポートされていない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "注入操作会阻塞后台线程",
                "en": "The injection operation blocks the background thread",
                "ja": "注入操作がバックグラウンドスレッドをブロックする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "超大日志会撑爆上下文窗口，关键信息反而被淹没",
                "en": "Oversized logs will overflow the context window, drowning out critical information",
                "ja": "巨大なログがコンテキストウィンドウを溢れさせ、重要な情報がかえって埋もれる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "模型无法处理超过 1000 行的输入",
                "en": "The model cannot handle inputs exceeding 1000 lines",
                "ja": "モデルは1000行を超える入力を処理できない"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "5 万行日志会撑爆上下文窗口，挤掉其他重要的对话历史和指令。正确做法是：完整日志写磁盘，messages 里只注入简短摘要，真正需要时再 read_file。",
            "en": "50,000 log lines would overflow the context window, pushing out other important conversation history and instructions. The correct approach: write full logs to disk, inject only a short summary into messages, and call read_file only when the full content is actually needed.",
            "ja": "5万行のログはコンテキストウィンドウを溢れさせ、他の重要な会話履歴や指示を押し出します。正しいアプローチ：完全なログをディスクに書き、messages には短い要約だけを注入し、全内容が本当に必要なときだけ read_file を呼びます。"
          },
          "reward_card": "card_s13_003"
        },
        {
          "id": "q_s13_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "主循环中「调用模型前排空通知队列」这一步骤，与「主循环只有一条」这一约束之间是什么关系？",
            "en": "What is the relationship between the main loop step 'drain notification queue before calling model' and the constraint 'there is only one main loop'?",
            "ja": "メインループの「モデル呼び出し前に通知キューを排空する」ステップと「メインループは1本だけ」という制約はどんな関係ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "两者没有直接关系，是独立的设计决策",
                "en": "They have no direct relationship; they are independent design decisions",
                "ja": "両者は直接の関係がなく、独立した設計判断"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "正是因为只有一条主循环，后台结果无法自动传入，必须在调模型前主动注入",
                "en": "Precisely because there is only one main loop, background results cannot flow in automatically, so they must be actively injected before calling the model",
                "ja": "まさにメインループが1本だけだからこそ、バックグラウンド結果は自動的に流れ込まず、モデル呼び出し前に能動的に注入しなければならない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "排空通知队列会临时增加主循环的数量",
                "en": "Draining the notification queue temporarily increases the number of main loops",
                "ja": "通知キューの排空は一時的にメインループの数を増やす"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "多条主循环才需要通知队列，单条主循环不需要",
                "en": "Notification queues are only needed with multiple main loops, not with a single one",
                "ja": "通知キューは複数のメインループがある場合だけ必要で、1本だけなら不要"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "因为只有一条主循环，它不会自动「看到」后台线程的结果。通知队列是桥梁：后台线程把结果摘要写入队列，主循环在调模型前主动排空队列、注入 messages，这才完成了后台结果到模型的传递。",
            "en": "Because there is only one main loop, it does not automatically 'see' results from background threads. The notification queue is the bridge: background threads write result summaries to the queue; the main loop actively drains the queue and injects messages before calling the model, completing the transfer of background results to the model.",
            "ja": "メインループが1本だけだから、バックグラウンドスレッドの結果を自動的に「見る」ことができません。通知キューが橋渡し役です：バックグラウンドスレッドが結果の要約をキューに書き込み、メインループがモデル呼び出し前に能動的にキューを排空して messages に注入することで、バックグラウンド結果がモデルに届きます。"
          },
          "reward_card": "card_s13_004"
        },
        {
          "id": "q_s13_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "如果要为后台任务系统添加「任务超时自动取消」功能，最合适的实现位置是哪里？",
            "en": "To add an 'automatic cancellation on timeout' feature to the background task system, where is the most appropriate place to implement it?",
            "ja": "バックグラウンドタスクシステムに「タイムアウト時の自動キャンセル」機能を追加する場合、最も適切な実装場所はどこですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "在后台执行线程内部，到时自动终止命令并向通知队列写入超时通知",
                "en": "Inside the background execution thread, which automatically terminates the command and writes a timeout notification to the queue",
                "ja": "バックグラウンド実行スレッド内部で、時間になったら自動的にコマンドを終了し、通知キューにタイムアウト通知を書き込む"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在主循环调模型之后，检查是否有超时任务",
                "en": "After the main loop calls the model, check for timed-out tasks",
                "ja": "メインループがモデルを呼び出した後に、タイムアウトしたタスクを確認する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "在用户界面层添加超时提示",
                "en": "Add timeout prompts at the user interface layer",
                "ja": "ユーザーインターフェース層にタイムアウトのプロンプトを追加する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "在 background_run 调用处增加同步等待",
                "en": "Add synchronous waiting at the background_run call site",
                "ja": "background_run の呼び出し箇所に同期待機を追加する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "超时逻辑应在后台执行线程内处理：到时自动终止命令，然后将超时通知（失败摘要）写入通知队列。下次主循环排空队列时，模型就能知道任务超时了。这样既不阻塞主循环，又保持了通知驱动的信息流。",
            "en": "Timeout logic should be handled inside the background execution thread: automatically terminate the command when time is up, then write a timeout notification (failure summary) to the notification queue. The next time the main loop drains the queue, the model learns the task timed out. This neither blocks the main loop nor disrupts the notification-driven information flow.",
            "ja": "タイムアウトロジックはバックグラウンド実行スレッド内で処理すべきです：時間になったら自動的にコマンドを終了し、タイムアウト通知（失敗の要約）を通知キューに書き込みます。次回メインループがキューを排空したとき、モデルはタスクがタイムアウトしたことを知ります。これによりメインループをブロックせず、通知駆動の情報フローも維持されます。"
          },
          "reward_card": "card_s13_001"
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
            "zh": "后台任务与定时调度解决的核心问题分别是什么？",
            "en": "What core problems do background tasks and scheduled dispatch solve respectively?",
            "ja": "バックグラウンドタスクとスケジュール実行が解決する中核的な問題はそれぞれ何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "两者都是解决「任务如何并发执行」的问题",
                "en": "Both solve the problem of how tasks execute concurrently",
                "ja": "両方ともタスクをどう並列実行するかの問題を解決する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "后台任务解决「什么时候开始」，定时调度解决「结果什么时候回来」",
                "en": "Background tasks solve when to start; scheduled dispatch solves when results come back",
                "ja": "バックグラウンドタスクはいつ開始するかを解決し、スケジュールは結果がいつ戻るかを解決する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "两者都是解决「结果什么时候回来」的问题",
                "en": "Both solve the problem of when results come back",
                "ja": "両方とも結果がいつ戻るかの問題を解決する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "后台任务解决「结果什么时候回来」，定时调度解决「什么时候开始」",
                "en": "Background tasks solve when results come back; scheduled dispatch solves when to start",
                "ja": "バックグラウンドタスクは結果がいつ戻るかを解決し、スケジュールはいつ開始するかを解決する"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "后台任务是在等「已启动的慢操作」的结果，定时调度是在等「一件事应该在未来什么时候开始」。两者关注的时间维度不同。",
            "en": "Background tasks wait for results of already-started slow operations. Scheduled dispatch waits for when a future task should begin. They address different time dimensions.",
            "ja": "バックグラウンドタスクは既に開始した遅い処理の結果を待つもの。スケジュールは将来タスクがいつ開始すべきかを待つもの。両者は異なる時間軸に着目している。"
          },
          "reward_card": "card_s14_001"
        },
        {
          "id": "q_s14_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "调度器的核心职责用一句话描述最准确的是？",
            "en": "Which phrase best describes the core responsibility of a scheduler?",
            "ja": "スケジューラーの中心的な役割を一言で表すと最も正確なのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "替代主循环，直接执行未来的任务",
                "en": "Replace the main loop and directly execute future tasks",
                "ja": "主ループを置き換えて、将来のタスクを直接実行する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "缓存模型的输出以供定时重用",
                "en": "Cache model outputs for scheduled reuse",
                "ja": "モデルの出力をキャッシュして定期的に再利用する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "管理并发任务的优先级队列",
                "en": "Manage a priority queue of concurrent tasks",
                "ja": "並列タスクの優先度キューを管理する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记住未来，时间到了再触发",
                "en": "Remember the future and trigger when the time comes",
                "ja": "未来を記憶し、時刻が来たらトリガーする"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "调度器做的是「记住未来」——把意图先记下来，等时间到了再把它变成新的触发事件。它不替代主循环，也不直接执行任务。",
            "en": "The scheduler remembers the future: record an intent now, and turn it into a trigger event when the time comes. It does not replace the main loop or execute tasks directly.",
            "ja": "スケジューラーの仕事は未来を記憶すること——今は意図を記録し、時刻が来たら新しいトリガーイベントに変換する。主ループを置き換えたりタスクを直接実行したりはしない。"
          },
          "reward_card": "card_s14_001"
        },
        {
          "id": "q_s14_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下关于调度器与主循环的关系，哪个说法正确？",
            "en": "Which statement correctly describes the relationship between the scheduler and the main loop?",
            "ja": "スケジューラーと主ループの関係について、正しい説明はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "调度器取代主循环处理定时任务",
                "en": "The scheduler replaces the main loop to handle timed tasks",
                "ja": "スケジューラーは主ループを置き換えてタイムドタスクを処理する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "调度器不取代主循环，而是在时间到时把 prompt 送回主循环",
                "en": "The scheduler does not replace the main loop; it sends the prompt back to the main loop when the time comes",
                "ja": "スケジューラーは主ループを置き換えず、時刻が来たらpromptを主ループに戻す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "调度器是独立于主循环运行的第二套系统",
                "en": "The scheduler is a second system running independently of the main loop",
                "ja": "スケジューラーは主ループとは独立して動作する第二のシステムである"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "调度器直接调用模型 API，不经过主循环",
                "en": "The scheduler calls the model API directly, bypassing the main loop",
                "ja": "スケジューラーはモデルAPIを直接呼び出し、主ループをバイパスする"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "调度器的作用是在时间到时把 prompt 放进通知队列，最终还是由主循环把它当成新消息喂给模型。调度器不是另起一套系统。",
            "en": "The scheduler places the prompt into a notification queue when the time comes. The main loop then feeds it to the model as a new user message. The scheduler is not a separate system.",
            "ja": "スケジューラーは時刻が来たらpromptを通知キューに入れる。主ループがそれを新しいユーザーメッセージとしてモデルに渡す。スケジューラーは独立したシステムではない。"
          },
          "reward_card": "card_s14_001"
        },
        {
          "id": "q_s14_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "Cron 表达式由几个字段组成，分别代表什么？",
            "en": "How many fields does a cron expression have, and what do they represent?",
            "ja": "cron式は何個のフィールドで構成され、それぞれ何を表しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "3 个字段：时、分、秒",
                "en": "3 fields: hour, minute, second",
                "ja": "3フィールド：時、分、秒"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "4 个字段：分、时、日、月",
                "en": "4 fields: minute, hour, day, month",
                "ja": "4フィールド：分、時、日、月"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "5 个字段：分、时、日、月、周",
                "en": "5 fields: minute, hour, day-of-month, month, day-of-week",
                "ja": "5フィールド：分、時、日、月、曜日"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "6 个字段：秒、分、时、日、月、周",
                "en": "6 fields: second, minute, hour, day, month, weekday",
                "ja": "6フィールド：秒、分、時、日、月、曜日"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "标准 Cron 表达式有 5 个字段，按顺序是：分钟、小时、日期（月中第几天）、月份、星期几。",
            "en": "A standard cron expression has 5 fields in order: minute, hour, day-of-month, month, day-of-week.",
            "ja": "標準的なcron式は5フィールド（分、時、日（月の何日目）、月、曜日）で構成される。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "调度记录中的 last_fired_at 字段的主要作用是什么？",
            "en": "What is the primary purpose of the last_fired_at field in a schedule record?",
            "ja": "スケジュールレコードのlast_fired_atフィールドの主な目的は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "存储上次任务的输出结果",
                "en": "Store the output of the last task execution",
                "ja": "最後のタスク実行の出力を保存する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "记录任务执行耗时",
                "en": "Record task execution duration",
                "ja": "タスクの実行時間を記録する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "标记任务是否已被用户手动取消",
                "en": "Mark whether the task has been manually cancelled by the user",
                "ja": "タスクがユーザーによって手動キャンセルされたかどうかを示す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "防止短时间内重复触发同一任务",
                "en": "Prevent the same task from being triggered repeatedly in a short time",
                "ja": "短時間に同じタスクが繰り返しトリガーされるのを防ぐ"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "last_fired_at 记录上次触发时间，调度器在每次检查时对比当前时间，避免同一时间窗口内重复触发。",
            "en": "last_fired_at records when the task last fired. The scheduler compares it to the current time each check to avoid triggering the same task multiple times within the same window.",
            "ja": "last_fired_atは最後にトリガーされた時刻を記録する。スケジューラーは毎回チェック時に現在時刻と比較し、同じ時間窓内での重複トリガーを防ぐ。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_006",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "一条最小的调度记录至少需要包含哪些字段？",
            "en": "What fields must a minimal schedule record contain at minimum?",
            "ja": "最小限のスケジュールレコードには最低どのフィールドが必要ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "cron 表达式、任务超时设置、重试次数",
                "en": "cron expression, task timeout, retry count",
                "ja": "cron式、タスクタイムアウト、リトライ回数"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "id、触发时间戳、任务优先级",
                "en": "id, trigger timestamp, task priority",
                "ja": "id、トリガータイムスタンプ、タスク優先度"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "id、cron 表达式、要执行的 prompt、是否重复、上次触发时间",
                "en": "id, cron expression, prompt to execute, whether recurring, last fired time",
                "ja": "id、cron式、実行するprompt、繰り返しかどうか、最終トリガー時刻"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "只需要 id 和 cron 表达式",
                "en": "Only id and cron expression are needed",
                "ja": "idとcron式だけでよい"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "一条调度记录至少要有：id（唯一标识）、cron 表达式（时间规则）、触发后要执行的 prompt、是否重复（区分单次和周期）、上次触发时间（防重复触发）。",
            "en": "A schedule record needs at minimum: id, cron expression, prompt to execute on trigger, whether it recurs, and last fired time to prevent duplicate triggers.",
            "ja": "スケジュールレコードに最低限必要なのは：id、cron式、トリガー時に実行するprompt、繰り返しかどうか、最終トリガー時刻（重複防止）。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "定时任务触发后，prompt 是如何最终被模型处理的？",
            "en": "After a scheduled task triggers, how does the prompt ultimately get processed by the model?",
            "ja": "スケジュールタスクがトリガーされた後、promptは最終的にどうモデルに処理されますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "调度器直接把 prompt 发给模型 API，绕过主循环",
                "en": "The scheduler sends the prompt directly to the model API, bypassing the main loop",
                "ja": "スケジューラーがpromptをモデルAPIに直接送り、主ループをバイパスする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "prompt 被放入通知队列，主循环在下一轮把它当新用户消息喂给模型",
                "en": "The prompt is placed in a notification queue; the main loop feeds it to the model as a new user message in the next iteration",
                "ja": "promptは通知キューに入れられ、主ループが次のイテレーションで新しいユーザーメッセージとしてモデルに渡す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "调度器在后台另起一个新的主循环实例来处理",
                "en": "The scheduler starts a new main loop instance in the background to handle it",
                "ja": "スケジューラーはバックグラウンドで新しい主ループインスタンスを起動して処理する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "prompt 被追加到当前对话历史末尾，等待用户确认后再执行",
                "en": "The prompt is appended to the current conversation history and waits for user confirmation",
                "ja": "promptは現在の会話履歴の末尾に追加され、ユーザーの確認後に実行される"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "定时任务触发后，调度器把 prompt 放进通知队列；主循环在下一轮把它当成新的用户消息喂给模型。整个链路最终还是回到同一条主循环，不是另起一套系统。",
            "en": "After a scheduled task triggers, the scheduler places the prompt in a notification queue. The main loop then feeds it to the model as a new user message in the next iteration. The entire chain returns to the same main loop, not a separate system.",
            "ja": "スケジュールタスクがトリガーされると、スケジューラーはpromptを通知キューに入れる。主ループが次のイテレーションでそれを新しいユーザーメッセージとしてモデルに渡す。全体の流れは同じ主ループに戻る。"
          },
          "reward_card": "card_s14_003"
        },
        {
          "id": "q_s14_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "cron 表达式「0 9 * * 1-5」代表什么含义？",
            "en": "What does the cron expression \"0 9 * * 1-5\" mean?",
            "ja": "cron式「0 9 * * 1-5」は何を意味しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每月 1 日到 5 日的早上 9:00",
                "en": "At 9:00 AM on the 1st through 5th of each month",
                "ja": "毎月1日から5日の午前9時"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "每天早上 9:00",
                "en": "Every day at 9:00 AM",
                "ja": "毎日午前9時"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "每小时的第 9 分钟，周一到周五执行",
                "en": "At minute 9 of every hour, on weekdays",
                "ja": "毎時9分、月曜から金曜に実行"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "周一到周五每天早上 9:00",
                "en": "Every weekday (Mon-Fri) at 9:00 AM",
                "ja": "月曜から金曜の毎日午前9時"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "cron 5 个字段顺序是「分 时 日 月 周」。0 9 * * 1-5 表示：分=0，时=9，日=任意，月=任意，周=1到5（周一到周五）。即工作日每天早上 9 点整触发。",
            "en": "The 5 cron fields are: minute hour day month weekday. 0 9 * * 1-5 means minute=0, hour=9, day=any, month=any, weekday=1-5 (Mon-Fri). This fires at 9:00 AM every weekday.",
            "ja": "cron5フィールドの順序は分 時 日 月 曜日。0 9 * * 1-5は分=0、時=9、日=任意、月=任意、曜日=1〜5（月〜金）を意味する。つまり平日の毎朝9時ちょうどにトリガーされる。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_009",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果调度记录没有 last_fired_at 字段，会产生什么问题？",
            "en": "What problem arises if a schedule record lacks the last_fired_at field?",
            "ja": "スケジュールレコードにlast_fired_atフィールドがない場合、どんな問題が起きますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "调度记录无法持久化存储",
                "en": "The schedule record cannot be persisted to storage",
                "ja": "スケジュールレコードを永続的に保存できなくなる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "任务永远不会被触发",
                "en": "The task will never be triggered",
                "ja": "タスクが永遠にトリガーされなくなる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "调度器无法解析 cron 表达式",
                "en": "The scheduler cannot parse the cron expression",
                "ja": "スケジューラーがcron式を解析できなくなる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "同一时间窗口内可能重复触发，产生多余的任务",
                "en": "The task may be triggered multiple times within the same time window, creating redundant tasks",
                "ja": "同じ時間窓内でタスクが複数回トリガーされ、不要なタスクが生成される可能性がある"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "last_fired_at 是防止重复触发的核心机制。没有它，调度器每次轮询时都可能因为「时间条件仍满足」而再次触发，在短时间内产生多个重复任务。",
            "en": "last_fired_at is the key mechanism preventing duplicate triggers. Without it, each scheduler poll could fire again because the time condition is still met, creating multiple redundant tasks in a short window.",
            "ja": "last_fired_atは重複トリガーを防ぐ中心的なメカニズム。それがなければ、スケジューラーは毎回のポーリングで時間条件がまだ満たされているとして再びトリガーし、短時間に複数の重複タスクを生成する可能性がある。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "定时触发的 prompt 最终由谁负责接手执行？",
            "en": "Who is ultimately responsible for executing a scheduled prompt after it triggers?",
            "ja": "定時トリガーされたpromptは最終的に誰が引き継いで実行しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "调度器本身直接处理",
                "en": "The scheduler itself handles it directly",
                "ja": "スケジューラー自身が直接処理する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "操作系统的进程调度器",
                "en": "The operating system process scheduler",
                "ja": "オペレーティングシステムのプロセススケジューラー"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "模型（由主循环将 prompt 喂给模型）",
                "en": "The model (the main loop feeds the prompt to the model)",
                "ja": "モデル（主ループがpromptをモデルに渡す）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "一个专门的定时任务执行引擎",
                "en": "A dedicated scheduled task execution engine",
                "ja": "専用のスケジュールタスク実行エンジン"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "定时任务最终还是由模型接手。调度器只是把 prompt 送进通知队列，主循环把它当新用户消息喂给模型。不是另起一套系统，而是回到同一条主循环。",
            "en": "The model ultimately handles the scheduled task. The scheduler only places the prompt in the notification queue; the main loop feeds it to the model as a new user message. It returns to the same main loop, not a separate system.",
            "ja": "定時タスクは最終的にモデルが引き継ぐ。スケジューラーはpromptを通知キューに入れるだけで、主ループがそれを新しいユーザーメッセージとしてモデルに渡す。独立したシステムではなく、同じ主ループに戻る。"
          },
          "reward_card": "card_s14_003"
        },
        {
          "id": "q_s14_011",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "通知队列在定时调度中扮演什么角色？",
            "en": "What role does the notification queue play in scheduled dispatch?",
            "ja": "通知キューはスケジュール実行においてどんな役割を担いますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "直接触发模型 API 调用",
                "en": "Directly trigger model API calls",
                "ja": "モデルAPIコールを直接トリガーする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "连接调度器与主循环，承载时间到了后的 prompt",
                "en": "Connect the scheduler to the main loop, carrying the prompt once the time arrives",
                "ja": "スケジューラーと主ループをつなぎ、時刻が来たpromptを運ぶ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "存储模型的历史输出供后续定时任务复用",
                "en": "Store historical model outputs for reuse by future scheduled tasks",
                "ja": "モデルの過去の出力を保存して将来のスケジュールタスクで再利用する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记录每次触发的审计日志",
                "en": "Record an audit log of each trigger event",
                "ja": "各トリガーイベントの監査ログを記録する"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "通知队列是调度器与主循环之间的桥梁。时间到了，调度器把 prompt 放进队列；主循环在下一轮读取队列，把它当成新用户消息处理。",
            "en": "The notification queue bridges the scheduler and the main loop. When the time comes, the scheduler places the prompt in the queue; the main loop reads it in the next iteration and processes it as a new user message.",
            "ja": "通知キューはスケジューラーと主ループの橋渡し役。時刻が来たらスケジューラーがpromptをキューに入れ、主ループが次のイテレーションでそれを読み取り新しいユーザーメッセージとして処理する。"
          },
          "reward_card": "card_s14_003"
        },
        {
          "id": "q_s14_012",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪个场景最适合用定时调度而非后台任务来处理？",
            "en": "Which scenario is best handled with scheduled dispatch rather than a background task?",
            "ja": "次のシナリオのうち、バックグラウンドタスクではなくスケジュール実行で処理するのに最も適しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "并发执行多个文件的格式化操作",
                "en": "Concurrently formatting multiple files",
                "ja": "複数ファイルのフォーマット操作を並列実行する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "等待一个耗时 30 秒的代码分析任务完成",
                "en": "Waiting for a code analysis task that takes 30 seconds to complete",
                "ja": "30秒かかるコード分析タスクの完了を待つ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "每天早上 8 点自动生成当日工作计划",
                "en": "Automatically generating a daily work plan every morning at 8 AM",
                "ja": "毎朝8時に自動的にその日の作業計画を生成する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "等待一个已经发出的 HTTP 请求返回结果",
                "en": "Waiting for a previously sent HTTP request to return a result",
                "ja": "既に送信したHTTPリクエストの結果が返ってくるのを待つ"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "「每天早上 8 点自动生成计划」是典型的「等开始时间」问题，适合用定时调度。其他选项都是「等结果」问题，属于后台任务范畴。",
            "en": "Generating a daily plan every morning at 8 AM is a classic waiting-for-start-time problem suited for scheduled dispatch. The other options are waiting-for-results problems that fall under background tasks.",
            "ja": "毎朝8時に計画を自動生成するは典型的な開始時刻を待つ問題でスケジュール実行に適している。他の選択肢は結果を待つ問題でバックグラウンドタスクの範疇に入る。"
          },
          "reward_card": "card_s14_001"
        },
        {
          "id": "q_s14_013",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "如果想让调度任务每 15 分钟执行一次，cron 表达式应该怎么写？",
            "en": "To run a scheduled task every 15 minutes, how should the cron expression be written?",
            "ja": "スケジュールタスクを15分ごとに実行するには、cron式をどう書けばよいですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "15 * * * *",
                "en": "15 * * * *",
                "ja": "15 * * * *"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "0 */15 * * *",
                "en": "0 */15 * * *",
                "ja": "0 */15 * * *"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "*/15 * * * *",
                "en": "*/15 * * * *",
                "ja": "*/15 * * * *"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "* 15 * * *",
                "en": "* 15 * * *",
                "ja": "* 15 * * *"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "「*/15」在分钟字段表示「每隔 15 分钟」，即 0、15、30、45 分时触发。「15 * * * *」只在每小时第 15 分钟触发；「* 15 * * *」在第 15 小时的每分钟触发；「0 */15 * * *」在每 15 小时的整点触发。",
            "en": "*/15 in the minute field means every 15 minutes, firing at 0, 15, 30, 45. The expression 15 * * * * fires only at minute 15 of each hour; * 15 * * * fires every minute during hour 15; 0 */15 * * * fires at the top of every 15th hour.",
            "ja": "分フィールドの*/15は15分ごと（0、15、30、45分にトリガー）を意味する。15 * * * *は毎時15分のみ；* 15 * * *は15時の毎分；0 */15 * * *は15時間ごとの00分。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "在实现调度器时，为什么时间检查应该有一定的容差（比如±30秒），而不是要求精确匹配？",
            "en": "When implementing a scheduler, why should time checks have tolerance rather than requiring exact matches?",
            "ja": "スケジューラーを実装する際、時刻チェックに許容範囲を設けるべき理由は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "轮询本身有时间间隔，精确匹配会因轮询时机错过触发窗口",
                "en": "Polling has a time interval; exact matching could miss trigger windows between polls",
                "ja": "ポーリングには時間間隔があり、正確な一致ではポーリングのタイミングによってトリガー窓を見逃す可能性がある"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "容差可以降低 CPU 使用率",
                "en": "Tolerance reduces CPU usage",
                "ja": "許容範囲によりCPU使用率が下がる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "容差让多个任务可以并发执行",
                "en": "Tolerance allows multiple tasks to execute concurrently",
                "ja": "許容範囲により複数タスクの並列実行が可能になる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "微信小程序的计时器不够精确",
                "en": "WeChat Mini Program timers are not precise enough",
                "ja": "WeChatミニプログラムのタイマーが十分精確でない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "调度器通常每隔一段时间（如每秒或每分钟）轮询一次。如果要求精确在「09:00:00」触发，而上次轮询是 08:59:58，下次轮询是 09:00:02，就会错过。容差确保轮询间隔内的触发窗口不被遗漏。",
            "en": "Schedulers typically poll at intervals. If an exact match at 09:00:00 is required but the last poll was at 08:59:58 and the next at 09:00:02, the trigger is missed. Tolerance ensures trigger windows are not skipped between polls.",
            "ja": "スケジューラーは通常一定間隔でポーリングする。09:00:00での正確な一致が必要な場合、前のポーリングが08:59:58で次が09:00:02なら見逃す。許容範囲によりポーリング間のトリガー窓が漏れなくなる。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_015",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "假设一个调度任务的 cron 为「0 9 * * *」，last_fired_at 是今天 08:50，现在轮询时间是 09:05。调度器应该如何处理？",
            "en": "A task has cron \"0 9 * * *\", last_fired_at is today at 08:50, and the current poll time is 09:05. What should the scheduler do?",
            "ja": "cronが0 9 * * *のタスクで、last_fired_atが今日8:50、現在のポーリング時刻が9:05です。スケジューラーはどう処理すべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "触发，因为当前时间在 09:00 窗口内且 last_fired_at 早于今天 09:00",
                "en": "Trigger, because current time is within the 09:00 window and last_fired_at is before today 09:00",
                "ja": "トリガーする。現在時刻が9:00の窓内にあり、last_fired_atが今日の9:00より前だから"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "先等到 09:00 整再触发",
                "en": "Wait until exactly 09:00 before triggering",
                "ja": "9:00ちょうどまで待ってからトリガーする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "不触发，因为 09:05 不等于 09:00",
                "en": "Do not trigger, because 09:05 does not equal 09:00",
                "ja": "トリガーしない。09:05は09:00と等しくないから"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "不触发，因为 last_fired_at 已经是今天的记录",
                "en": "Do not trigger, because last_fired_at already has a record from today",
                "ja": "トリガーしない。last_fired_atにはすでに今日の記録があるから"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "调度器判断逻辑：当前时间（09:05）在目标时间（09:00）的容差范围内，且 last_fired_at（08:50）早于今天 09:00，说明今天这次还没触发过，应该触发。触发后更新 last_fired_at 为 09:05。",
            "en": "The scheduler checks: current time 09:05 is within tolerance of target 09:00, and last_fired_at 08:50 is before today 09:00, meaning the task has not fired today yet. It should trigger. After triggering, update last_fired_at to 09:05.",
            "ja": "スケジューラーの判断ロジック：現在時刻（9:05）がターゲット（9:00）の許容範囲内にあり、last_fired_at（8:50）が今日の9:00より前なので今日はまだトリガーされていない。トリガーすべき。トリガー後、last_fired_atを9:05に更新する。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "定时触发后，「通知队列 → 主循环 → 模型」这条链路带来的最重要设计好处是什么？",
            "en": "What is the most important design benefit of the notification queue to main loop to model chain after a scheduled trigger?",
            "ja": "定時トリガー後の通知キューから主ループそしてモデルへという経路がもたらす最も重要な設計上の利点は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "调度逻辑与执行逻辑解耦，统一复用主循环的对话管理能力",
                "en": "Scheduling logic is decoupled from execution logic, uniformly reusing the main loop conversation management capability",
                "ja": "スケジューリングロジックと実行ロジックが分離され、主ループの会話管理能力を統一して再利用できる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "定时任务的优先级高于普通用户消息",
                "en": "Scheduled tasks have higher priority than regular user messages",
                "ja": "スケジュールタスクは通常のユーザーメッセージより優先度が高い"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "减少了每次调度检查的计算开销",
                "en": "Reduces the computational overhead of each scheduling check",
                "ja": "各スケジュールチェックの計算オーバーヘッドを削減する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "可以让定时任务绕过上下文长度限制",
                "en": "Scheduled tasks can bypass context length limits",
                "ja": "スケジュールタスクがコンテキスト長制限を回避できる"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "通过通知队列回到主循环，调度逻辑（「什么时候触发」）与执行逻辑（「如何对话、如何调用模型」）完全解耦。执行侧只需复用主循环原有的对话管理和模型调用能力，不需要另建一套处理栈。",
            "en": "By returning to the main loop via the notification queue, scheduling logic (when to trigger) is fully decoupled from execution logic (how to converse, how to call the model). The execution side simply reuses the main loop existing capabilities without building a separate stack.",
            "ja": "通知キューを通じて主ループに戻ることで、スケジューリングロジック（いつトリガーするか）と実行ロジック（どう会話するか、モデルをどう呼ぶか）が完全に分離される。実行側は主ループの既存能力を再利用するだけで、別のスタックを構築する必要がない。"
          },
          "reward_card": "card_s14_003"
        },
        {
          "id": "q_s14_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "设计一个支持「一次性触发」和「周期性触发」的调度系统，最简洁的区分方式是什么？",
            "en": "When designing a scheduler supporting both one-shot and recurring triggers, what is the simplest way to distinguish them?",
            "ja": "単発トリガーと周期的トリガーの両方をサポートするスケジューラーを設計する場合、最もシンプルな区別方法は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "在调度记录中加入一个布尔字段（如 recurring）：false 触发后删除记录，true 则保留",
                "en": "Add a boolean field like recurring to the record: delete after triggering if false, keep if true",
                "ja": "レコードにrecurringのようなbooleanフィールドを追加する：falseならトリガー後に削除、trueなら保持"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "为两种任务分别建立独立的存储表",
                "en": "Create separate storage tables for each type of task",
                "ja": "2種類のタスクにそれぞれ独立したストレージテーブルを作成する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "为周期性任务设置更短的轮询间隔",
                "en": "Set a shorter polling interval for recurring tasks",
                "ja": "繰り返しタスクには短いポーリング間隔を設定する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "一次性触发使用时间戳，周期性触发使用 cron 表达式",
                "en": "Use timestamps for one-shot triggers and cron expressions for recurring triggers",
                "ja": "単発トリガーにはタイムスタンプ、周期的トリガーにはcron式を使う"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "在调度记录中加一个 recurring 布尔字段是最简洁的方式：触发后若 recurring=false 则删除该记录（一次性），若 recurring=true 则更新 last_fired_at 并保留（周期性）。无需两套存储，也无需两套处理逻辑。",
            "en": "Adding a recurring boolean field is the simplest approach: delete the record after triggering if recurring=false (one-shot); update last_fired_at and keep it if recurring=true (periodic). No separate storage or logic needed.",
            "ja": "recurring booleanフィールドを追加するのが最もシンプル：recurring=falseならトリガー後にレコードを削除（単発）、recurring=trueならlast_fired_atを更新して保持（定期）。別のストレージも別のロジックも不要。"
          },
          "reward_card": "card_s14_002"
        },
        {
          "id": "q_s14_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "从「后台任务（s13）→定时调度（s14）」这两章的学习顺序中，最能体现的架构设计原则是什么？",
            "en": "The learning order from background tasks s13 to scheduled dispatch s14 best illustrates which architectural design principle?",
            "ja": "バックグラウンドタスクs13からスケジュール実行s14への学習順序が最もよく体現しているアーキテクチャ設計原則は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "后台任务比定时调度更重要，应优先掌握",
                "en": "Background tasks are more important than scheduled dispatch and should be mastered first",
                "ja": "バックグラウンドタスクはスケジュール実行より重要で、先に習得すべき"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "不同的等待问题用不同的机制解决，而不是让主循环承担所有时间语义",
                "en": "Different waiting problems are solved with different mechanisms, rather than making the main loop handle all time semantics",
                "ja": "異なる待機問題は異なるメカニズムで解決し、主ループにすべての時間的語義を負わせない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "定时调度是后台任务的特例，可以完全替代",
                "en": "Scheduled dispatch is a special case of background tasks and can fully replace them",
                "ja": "スケジュール実行はバックグラウンドタスクの特殊ケースで、完全に置き換えられる"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "所有异步问题最终都可以统一为一种解决方案",
                "en": "All async problems can ultimately be unified into one solution",
                "ja": "すべての非同期問題は最終的に一つの解決策に統一できる"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "s13 解决「等结果」，s14 解决「等开始」——两者都是时间相关问题，但机制不同。这体现了「针对不同问题形状匹配不同解法」的设计原则，而不是用一个大而全的主循环承担所有时间语义。",
            "en": "s13 solves waiting for results, s14 solves waiting for a start time. Both are time-related problems but with different mechanisms. This reflects the design principle of matching different solutions to different problem shapes rather than making one main loop handle all time semantics.",
            "ja": "s13は結果を待つを解決し、s14は開始時刻を待つを解決する。両者とも時間に関連する問題だがメカニズムが異なる。これは問題の形状に異なる解決策を対応させるという設計原則を体現しており、一つの主ループにすべての時間的語義を負わせないことを示している。"
          },
          "reward_card": "card_s14_001"
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
          "difficulty": 1,
          "stem": {
            "zh": "Subagent 和 Teammate 最根本的区别是什么？",
            "en": "What is the most fundamental difference between a Subagent and a Teammate?",
            "ja": "Subagent と Teammate の最も根本的な違いは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Subagent 不能写文件，Teammate 可以",
                "en": "Subagent cannot write files, Teammate can",
                "ja": "Subagent はファイルを書けないが、Teammate は書ける"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Subagent 需要名册，Teammate 不需要",
                "en": "Subagent requires a roster, Teammate does not",
                "ja": "Subagent は名簿が必要だが、Teammate は不要"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Teammate 比 Subagent 速度更快",
                "en": "Teammate is faster than Subagent",
                "ja": "Teammate の方が Subagent より速い"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Subagent 执行完任务后消失，Teammate 长期存在可反复接活",
                "en": "Subagent disappears after finishing a task; Teammate persists and can take on work repeatedly",
                "ja": "Subagent はタスク完了後に消えるが、Teammate は長期存在して繰り返し作業を受け取れる"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "生命周期是核心区别：Subagent 干完就消失，是一次性的；Teammate 长期在线、有身份，能反复接收并处理新任务。",
            "en": "Lifecycle is the key distinction: Subagent is ephemeral (gone after one task); Teammate is persistent with an identity, able to receive and handle tasks repeatedly.",
            "ja": "ライフサイクルが核心の違いです。Subagent は一度のタスクで消えますが、Teammate はアイデンティティを持ち長期存在して繰り返しタスクを処理できます。"
          },
          "reward_card": "card_s15_001"
        },
        {
          "id": "q_s15_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下哪种场景更适合使用 Teammate 而非 Subagent？",
            "en": "Which scenario is better suited for a Teammate rather than a Subagent?",
            "ja": "次のどのシナリオが Subagent よりも Teammate に適していますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "对一个文件做一次性格式转换",
                "en": "One-time format conversion on a file",
                "ja": "ファイルへの一回限りの形式変換"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "执行单条 shell 命令并返回结果",
                "en": "Execute a single shell command and return the result",
                "ja": "単一の shell コマンドを実行して結果を返す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "作为代码审查专家持续接收不同 PR 的审查请求",
                "en": "Persistently receiving review requests for different PRs as a code review specialist",
                "ja": "コードレビュー専門家として異なる PR のレビュー依頼を継続的に受け取る"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "读取一个配置文件的内容",
                "en": "Read the content of a configuration file",
                "ja": "設定ファイルの内容を読み取る"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "Teammate 的价值在于「长期在线反复接活」。持续接收 PR 审查请求正是需要一个有身份、能多轮协作的角色，而其他选项都是一次性任务，更适合 Subagent。",
            "en": "Teammate's value lies in persistent availability. Continuously receiving PR review requests requires an identity-bearing, multi-round collaborator. The other options are one-off tasks better suited for Subagents.",
            "ja": "Teammate の価値は「継続的な稼働」にあります。PR レビュー依頼を継続受取るには、アイデンティティを持つ多ラウンド協力者が必要です。他の選択肢は Subagent 向きの一回限りのタスクです。"
          },
          "reward_card": "card_s15_001"
        },
        {
          "id": "q_s15_003",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "Subagent 生命周期结束后，如果需要再次执行同类任务，应该怎么做？",
            "en": "Once a Subagent's lifecycle ends, what should you do to perform the same type of task again?",
            "ja": "Subagent のライフサイクルが終了した後、同種のタスクを再度実行するにはどうすればよいですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "向已结束的 Subagent 发送消息唤醒它",
                "en": "Send a message to the ended Subagent to wake it up",
                "ja": "終了した Subagent にメッセージを送って起こす"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "重新创建一个新的 Subagent",
                "en": "Create a new Subagent",
                "ja": "新しい Subagent を作成する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "调用原 Subagent 的 resume() 方法",
                "en": "Call the original Subagent's resume() method",
                "ja": "元の Subagent の resume() メソッドを呼び出す"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "将 Subagent 升级为 Teammate",
                "en": "Upgrade the Subagent to a Teammate",
                "ja": "Subagent を Teammate にアップグレードする"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "Subagent 是一次性的——干完就消失，没有恢复机制。需要再次执行同类任务时，必须重新创建一个新的 Subagent。这正是 Teammate（长期存在）存在的原因之一。",
            "en": "Subagents are ephemeral—they disappear after finishing, with no recovery mechanism. To run the same type of task again, you must create a new Subagent. This is precisely why Teammates (persistent) exist.",
            "ja": "Subagent は使い捨てで、終了後に回復メカニズムはありません。同種タスクを再実行するには新しい Subagent を作成する必要があります。これが Teammate（持続）が存在する理由の一つです。"
          },
          "reward_card": "card_s15_001"
        },
        {
          "id": "q_s15_004",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "在 Agent 团队系统中，「团队三要素」是哪三个？",
            "en": "What are the three essential elements of an Agent team?",
            "ja": "エージェントチームシステムにおける「チームの三要素」は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "名册 + 邮箱 + 独立循环",
                "en": "Roster + Inbox + Independent loop",
                "ja": "名簿 + 受信箱 + 独立ループ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "任务 + 工具 + 权限",
                "en": "Task + Tool + Permission",
                "ja": "タスク + ツール + 権限"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "主代理 + 子代理 + 协调器",
                "en": "Primary agent + Sub-agent + Coordinator",
                "ja": "プライマリエージェント + サブエージェント + コーディネーター"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "输入 + 处理 + 输出",
                "en": "Input + Processing + Output",
                "ja": "入力 + 処理 + 出力"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "团队三要素：名册（成员身份记录）+ 邮箱（消息通道）+ 独立循环（每个 Teammate 有自己的运行循环），缺一不可。",
            "en": "The three team essentials: Roster (member identity record) + Inbox (message channel) + Independent loop (each Teammate has its own run loop). All three are required.",
            "ja": "チームの三要素：名簿（メンバーのアイデンティティ記録）+ 受信箱（メッセージチャンネル）+ 独立ループ（各 Teammate が独自の実行ループを持つ）。三つとも欠かせません。"
          },
          "reward_card": "card_s15_002"
        },
        {
          "id": "q_s15_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "为什么「独立循环」是团队三要素之一？",
            "en": "Why is an \"independent loop\" one of the three team essentials?",
            "ja": "なぜ「独立ループ」がチームの三要素の一つなのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "因为没有循环就无法创建 TeamConfig",
                "en": "Because TeamConfig cannot be created without a loop",
                "ja": "ループがなければ TeamConfig を作成できないから"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "因为循环能防止 Teammate 占用过多内存",
                "en": "Because loops prevent Teammates from using too much memory",
                "ja": "ループが Teammate のメモリ使用量を抑えるから"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "因为循环是发送消息的唯一方式",
                "en": "Because the loop is the only way to send messages",
                "ja": "ループがメッセージを送る唯一の手段だから"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "因为只有独立循环才能让 Teammate 并行执行任务，互不阻塞",
                "en": "Because only an independent loop allows Teammates to execute tasks in parallel without blocking each other",
                "ja": "独立ループによってのみ Teammate が並列にタスクを実行し互いをブロックしないから"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "每个 Teammate 拥有独立的运行循环，意味着它们可以并行处理各自的任务，不会互相等待。这正是团队协作比单一 Agent 高效的根本原因。",
            "en": "Each Teammate having an independent loop means they can process their tasks in parallel without waiting for each other. This is the fundamental reason why team collaboration is more efficient than a single Agent.",
            "ja": "各 Teammate が独立ループを持つことで、互いを待たずに並列でタスクを処理できます。これがチーム協力が単一エージェントより効率的な根本的な理由です。"
          },
          "reward_card": "card_s15_002"
        },
        {
          "id": "q_s15_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果一个团队没有「邮箱」机制，会出现什么问题？",
            "en": "What problem arises if a team lacks an \"inbox\" mechanism?",
            "ja": "チームに「受信箱」の仕組みがない場合、どんな問題が起きますか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "Teammate 无法接收新任务，只能由 Orchestrator 反复重建 Teammate",
                "en": "Teammates cannot receive new tasks; the Orchestrator must repeatedly recreate Teammates",
                "ja": "Teammate は新しいタスクを受け取れず、Orchestrator が Teammate を繰り返し再作成しなければならない"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "名册无法记录成员",
                "en": "The roster cannot record members",
                "ja": "名簿がメンバーを記録できない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "TeamConfig 会损坏",
                "en": "TeamConfig will be corrupted",
                "ja": "TeamConfig が破損する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "独立循环无法启动",
                "en": "Independent loops cannot start",
                "ja": "独立ループが起動できない"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "邮箱是 Teammate 接收新任务的通道。没有邮箱，Teammate 就无法感知新工作，Orchestrator 只能通过反复重建 Teammate（即退化为 Subagent 模式）来分配任务，失去了长期存在的价值。",
            "en": "The inbox is the channel through which Teammates receive new tasks. Without it, Teammates cannot detect new work, forcing the Orchestrator to repeatedly recreate Teammates (reverting to Subagent mode), losing the value of persistence.",
            "ja": "受信箱は Teammate が新タスクを受け取るチャンネルです。なければ Teammate は新しい作業を感知できず、Orchestrator は Teammate を繰り返し再作成する（Subagent モードに退化）しかなくなり、長期存在の価値が失われます。"
          },
          "reward_card": "card_s15_002"
        },
        {
          "id": "q_s15_007",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "团队的「名册」缺失会直接导致哪个核心功能失效？",
            "en": "What core functionality directly breaks when the team roster is missing?",
            "ja": "チームの「名簿」が欠けると、どのコア機能が直接失われますか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "消息路由——发送方无法知道用哪个名字寻址收件人",
                "en": "Message routing — the sender cannot know which name to use to address the recipient",
                "ja": "メッセージルーティング——送信側が受信者のアドレス指定に使う名前を知れない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "代码执行——Teammate 无法运行 JavaScript",
                "en": "Code execution — Teammates cannot run JavaScript",
                "ja": "コード実行——Teammate が JavaScript を実行できない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "文件读写——所有 I/O 操作中断",
                "en": "File I/O — all I/O operations are interrupted",
                "ja": "ファイル読み書き——すべての I/O 操作が中断する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "循环调度——独立循环无法启动",
                "en": "Loop scheduling — independent loops cannot start",
                "ja": "ループスケジューリング——独立ループが起動できない"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "名册记录了「谁在团队里」以及「如何称呼他们」。没有名册，消息无法按名字路由到正确的 Teammate，整个通信体系崩溃。",
            "en": "The roster records who is on the team and how to address them. Without it, messages cannot be routed by name to the correct Teammate, causing the entire communication system to break down.",
            "ja": "名簿は「誰がチームにいるか」と「どう呼ぶか」を記録します。なければメッセージを名前で正しい Teammate にルーティングできず、通信体系全体が崩壊します。"
          },
          "reward_card": "card_s15_002"
        },
        {
          "id": "q_s15_008",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "TeamConfig 的主要职责是什么？",
            "en": "What is the main responsibility of TeamConfig?",
            "ja": "TeamConfig の主な役割は何ですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "存储所有 Teammate 执行过的历史任务",
                "en": "Store all historical tasks executed by Teammates",
                "ja": "Teammate が実行したすべての過去タスクを保存する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "记录团队成员名册（谁在团队里、如何联系他们）",
                "en": "Record the team member roster (who's on the team, how to reach them)",
                "ja": "チームメンバーの名簿を記録する（誰がチームにいて、どう連絡するか）"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "管理每个 Teammate 的工具调用权限",
                "en": "Manage tool call permissions for each Teammate",
                "ja": "各 Teammate のツール呼び出し権限を管理する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "控制 Teammate 的代码执行速度",
                "en": "Control the code execution speed of Teammates",
                "ja": "Teammate のコード実行速度を制御する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "TeamConfig 是团队的名册，记录了所有 Teammate 的身份信息（名字、角色等），让 Orchestrator 和其他 Teammate 知道「团队里有谁」以及「怎么联系他们」。",
            "en": "TeamConfig is the team roster, recording the identity information (name, role, etc.) of all Teammates, letting the Orchestrator and other Teammates know who's on the team and how to contact them.",
            "ja": "TeamConfig はチームの名簿で、すべての Teammate のアイデンティティ情報（名前、役割など）を記録し、Orchestrator と他の Teammate が「チームに誰がいるか」と「どう連絡するか」を把握できます。"
          },
          "reward_card": "card_s15_003"
        },
        {
          "id": "q_s15_009",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "MessageEnvelope 中必须包含哪两个核心字段？",
            "en": "What two core fields must a MessageEnvelope contain?",
            "ja": "MessageEnvelope に含まれなければならない二つのコアフィールドは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "时间戳（timestamp）和内容（content）",
                "en": "Timestamp and content",
                "ja": "タイムスタンプ（timestamp）と内容（content）"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "任务 ID（taskId）和优先级（priority）",
                "en": "Task ID and priority",
                "ja": "タスク ID（taskId）と優先度（priority）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "加密密钥（key）和签名（signature）",
                "en": "Encryption key and signature",
                "ja": "暗号化キー（key）と署名（signature）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "来源（from）和去向（to）",
                "en": "Source (from) and destination (to)",
                "ja": "送信元（from）と宛先（to）"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "MessageEnvelope 就像信封，核心是「来源」（谁发的）和「去向」（发给谁）。有了这两个字段，系统才能正确路由每条消息。",
            "en": "MessageEnvelope is like an envelope — the core fields are 'from' (who sent it) and 'to' (who it's for). With these two fields, the system can correctly route each message.",
            "ja": "MessageEnvelope は封筒のようなもので、コアは「送信元」（誰が送ったか）と「宛先」（誰宛か）です。この二つのフィールドがあって初めてシステムが各メッセージを正しくルーティングできます。"
          },
          "reward_card": "card_s15_003"
        },
        {
          "id": "q_s15_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "TeamConfig 和 MessageEnvelope 在协作系统中分别承担什么角色？",
            "en": "What roles do TeamConfig and MessageEnvelope each play in a collaboration system?",
            "ja": "TeamConfig と MessageEnvelope はそれぞれ協力システムでどんな役割を担いますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "TeamConfig 是通讯录，MessageEnvelope 是每封信的信封",
                "en": "TeamConfig is the address book; MessageEnvelope is the envelope for each letter",
                "ja": "TeamConfig はアドレス帳、MessageEnvelope は各手紙の封筒"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "TeamConfig 是任务队列，MessageEnvelope 是任务描述",
                "en": "TeamConfig is the task queue; MessageEnvelope is the task description",
                "ja": "TeamConfig はタスクキュー、MessageEnvelope はタスクの説明"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "TeamConfig 是加密算法，MessageEnvelope 是解密密钥",
                "en": "TeamConfig is the encryption algorithm; MessageEnvelope is the decryption key",
                "ja": "TeamConfig は暗号化アルゴリズム、MessageEnvelope は復号キー"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "TeamConfig 是执行引擎，MessageEnvelope 是执行结果",
                "en": "TeamConfig is the execution engine; MessageEnvelope is the execution result",
                "ja": "TeamConfig は実行エンジン、MessageEnvelope は実行結果"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "类比很直观：TeamConfig 就像通讯录，记录每个人是谁；MessageEnvelope 就像每封信的信封，标明发件人和收件人。两者配合才能让消息精准投递。",
            "en": "The analogy is intuitive: TeamConfig is the address book recording who each person is; MessageEnvelope is the envelope for each letter, specifying sender and recipient. Together they enable precise message delivery.",
            "ja": "比喩はわかりやすい：TeamConfig は各人が誰かを記録するアドレス帳、MessageEnvelope は差出人と宛先を明記する封筒です。二つが組み合わさって正確な配信が可能になります。"
          },
          "reward_card": "card_s15_003"
        },
        {
          "id": "q_s15_011",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "在消息路由时，系统先查 TeamConfig 再查 MessageEnvelope，顺序颠倒会有什么后果？",
            "en": "In message routing, the system first checks TeamConfig then MessageEnvelope. What happens if the order is reversed?",
            "ja": "メッセージルーティングでシステムは TeamConfig を先に確認し次に MessageEnvelope を確認します。順序を逆にするとどうなりますか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "无法验证收件人是否在团队中，消息可能投递到不存在的 Teammate",
                "en": "Cannot verify if the recipient is on the team; the message may be delivered to a non-existent Teammate",
                "ja": "受信者がチームにいるか確認できず、存在しない Teammate にメッセージが届く可能性がある"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "消息会加密失败",
                "en": "Message encryption will fail",
                "ja": "メッセージの暗号化が失敗する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "独立循环会立即停止",
                "en": "Independent loops will immediately stop",
                "ja": "独立ループが即座に停止する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "名册会被清空",
                "en": "The roster will be wiped",
                "ja": "名簿が消去される"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "正确顺序是：先查 TeamConfig（验证「to」字段的收件人是否存在于名册），再解析 MessageEnvelope 内容。若颠倒，系统在没有验证收件人合法性的情况下就尝试投递，可能导致消息发往根本不存在的 Teammate。",
            "en": "The correct order: first check TeamConfig (verify the 'to' field recipient exists in the roster), then parse MessageEnvelope content. If reversed, the system attempts delivery without validating recipient legitimacy, potentially sending messages to nonexistent Teammates.",
            "ja": "正しい順序：まず TeamConfig を確認して（'to' フィールドの受信者が名簿に存在するか確認）、次に MessageEnvelope 内容を解析します。逆にすると、受信者の正当性を確認せずに配信を試みて、存在しない Teammate にメッセージを送る可能性があります。"
          },
          "reward_card": "card_s15_003"
        },
        {
          "id": "q_s15_012",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "Teammate 是如何接收新的工作任务的？",
            "en": "How does a Teammate receive new work assignments?",
            "ja": "Teammate はどのように新しい仕事の割り当てを受け取りますか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "Orchestrator 直接调用 Teammate 的 execute() 方法",
                "en": "Orchestrator directly calls the Teammate's execute() method",
                "ja": "Orchestrator が Teammate の execute() メソッドを直接呼び出す"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "通过全局变量共享任务队列",
                "en": "Via a globally shared task queue",
                "ja": "グローバルな共有タスクキューを通じて"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "靠检查邮箱（inbox）来接收新任务",
                "en": "By checking the inbox to receive new tasks",
                "ja": "受信箱（inbox）を確認することで新しいタスクを受け取る"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Teammate 在每次循环开始时自动生成新任务",
                "en": "Teammates auto-generate new tasks at the start of each loop",
                "ja": "Teammate は各ループの開始時に自動で新しいタスクを生成する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "邮箱驱动工作分配是核心机制：Teammate 不是靠被重新创建来接收新工作，而是在每次循环中主动检查邮箱，如果有新消息就处理。",
            "en": "Inbox-driven work assignment is the core mechanism: Teammates don't receive new work by being recreated, but by actively checking their inbox each loop iteration and processing any new messages.",
            "ja": "受信箱駆動の作業割り当てがコアメカニズムです：Teammate は再作成されるのではなく、各ループで積極的に受信箱を確認し、新しいメッセージがあれば処理します。"
          },
          "reward_card": "card_s15_004"
        },
        {
          "id": "q_s15_013",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "邮箱驱动机制相比「Orchestrator 直接调用」有什么关键优势？",
            "en": "What is the key advantage of inbox-driven mechanism compared to 'Orchestrator direct call'?",
            "ja": "受信箱駆動メカニズムが「Orchestrator の直接呼び出し」に比べてどんな重要な利点がありますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "邮箱比直接调用传输速度更快",
                "en": "Inbox transmits faster than direct calls",
                "ja": "受信箱は直接呼び出しより伝送速度が速い"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "邮箱机制让 Teammate 数量不受限制",
                "en": "Inbox mechanism removes limits on the number of Teammates",
                "ja": "受信箱メカニズムが Teammate 数の制限をなくす"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "直接调用无法传递字符串类型的参数",
                "en": "Direct calls cannot pass string-type arguments",
                "ja": "直接呼び出しは文字列型の引数を渡せない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Teammate 可以在方便时处理任务，Orchestrator 无需等待同步响应",
                "en": "Teammates can process tasks when ready; Orchestrator doesn't need to wait for synchronous responses",
                "ja": "Teammate は都合の良い時にタスクを処理でき、Orchestrator は同期レスポンスを待つ必要がない"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "邮箱驱动实现了解耦：Orchestrator 把任务放入邮箱后可以继续做别的事，不用阻塞等待；Teammate 在自己的循环中检查邮箱，时机成熟时处理。这是异步协作的核心价值。",
            "en": "Inbox-driven design achieves decoupling: the Orchestrator can continue other work after placing a task in the inbox without blocking to wait; the Teammate checks its inbox in its own loop and processes when ready. This is the core value of asynchronous collaboration.",
            "ja": "受信箱駆動は分離を実現します：Orchestrator はタスクを受信箱に入れた後、ブロックせずに他のことを続けられます。Teammate は自分のループで受信箱を確認し、準備ができた時に処理します。これが非同期協力のコアバリューです。"
          },
          "reward_card": "card_s15_004"
        },
        {
          "id": "q_s15_014",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 Teammate 的循环中，检查邮箱的步骤应该放在什么位置？",
            "en": "In a Teammate's loop, where should the inbox check step be placed?",
            "ja": "Teammate のループ内で、受信箱の確認ステップはどこに置くべきですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "每次循环迭代的开始，处理其他任何逻辑之前",
                "en": "At the start of each loop iteration, before any other logic",
                "ja": "各ループイテレーションの開始時、他のロジックより前"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "只在 Teammate 刚启动时检查一次",
                "en": "Check only once when Teammate first starts",
                "ja": "Teammate が最初に起動した時に一度だけ確認する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在当前任务执行完毕后的空闲阶段检查",
                "en": "Check during the idle phase after current task finishes",
                "ja": "現在のタスクが完了した後のアイドル段階で確認する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "由 Orchestrator 决定何时触发邮箱检查",
                "en": "The Orchestrator decides when to trigger inbox checks",
                "ja": "Orchestrator が受信箱チェックのタイミングを決める"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "邮箱检查应放在每次循环迭代的最开始——先看邮箱，再决定本轮做什么。这样才能保证 Teammate 不会错过任何新任务，实现「随时待命」的效果。",
            "en": "Inbox check should be placed at the very start of each loop iteration — check inbox first, then decide what to do this round. This ensures Teammates never miss new tasks and remain always ready.",
            "ja": "受信箱の確認は各ループイテレーションの最初に置くべきです——まず受信箱を確認してから、今回何をするかを決めます。これにより Teammate が新しいタスクを見逃さず、常に準備万端の状態を実現します。"
          },
          "reward_card": "card_s15_004"
        },
        {
          "id": "q_s15_015",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个 Teammate 的邮箱积压了 5 条未处理消息，但它当前正在执行一个长任务。这说明了什么设计权衡？",
            "en": "A Teammate's inbox has 5 unprocessed messages, but it's currently executing a long task. What design tradeoff does this illustrate?",
            "ja": "Teammate の受信箱に 5 通の未処理メッセージがあるが、現在長いタスクを実行中です。これはどんな設計上のトレードオフを示していますか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "邮箱驱动要求 Teammate 在处理消息时必须立即中断当前任务",
                "en": "Inbox-driven requires Teammates to immediately interrupt current tasks when processing messages",
                "ja": "受信箱駆動は Teammate がメッセージ処理時に現在のタスクを直ちに中断することを要求する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "邮箱机制失效，应改用直接调用",
                "en": "Inbox mechanism has failed; should switch to direct calls",
                "ja": "受信箱メカニズムが失敗したため、直接呼び出しに切り替えるべき"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "长任务应强制拆分，确保每次循环不超过一步",
                "en": "Long tasks should be forcibly split to ensure each loop does no more than one step",
                "ja": "長いタスクは強制的に分割して各ループが一ステップを超えないようにすべき"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "邮箱提供了缓冲：消息不丢失，Teammate 完成当前任务后自然处理积压，这是顺序执行和消息保留的正常权衡",
                "en": "The inbox provides buffering: messages aren't lost; Teammate naturally handles the backlog after finishing the current task — a normal tradeoff between sequential execution and message retention",
                "ja": "受信箱はバッファを提供します：メッセージは失われず、Teammate は現在のタスク完了後に自然に積み残しを処理します——これは順次実行とメッセージ保持の正常なトレードオフです"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "邮箱的核心价值之一是「缓冲」——消息不会因为 Teammate 暂时忙碌而丢失。积压是暂时的；Teammate 完成当前任务后会在下次循环中依次处理。这是顺序执行（不中断当前任务）和消息保留（不丢弃）之间的合理权衡。",
            "en": "One of the inbox's core values is 'buffering' — messages aren't lost because a Teammate is temporarily busy. Backlog is temporary; the Teammate will process queued messages in subsequent loops after finishing the current task. This is a reasonable tradeoff between sequential execution (not interrupting current task) and message retention (not discarding).",
            "ja": "受信箱のコアバリューの一つは「バッファリング」です——Teammate が一時的に忙しくてもメッセージは失われません。積み残しは一時的なもので、Teammate は現在のタスク完了後の次のループで順次処理します。これは順次実行（現在のタスクを中断しない）とメッセージ保持（廃棄しない）の合理的なトレードオフです。"
          },
          "reward_card": "card_s15_004"
        },
        {
          "id": "q_s15_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪种设计违反了「邮箱驱动工作分配」的原则？",
            "en": "Which design violates the principle of 'inbox-driven work assignment'?",
            "ja": "次のどの設計が「受信箱駆動の作業割り当て」の原則に違反していますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "每次需要 Teammate 处理新任务时，Orchestrator 都先销毁旧 Teammate 再创建新 Teammate",
                "en": "Every time Teammates need to process new tasks, the Orchestrator destroys the old Teammate and creates a new one",
                "ja": "Teammate が新しいタスクを処理するたびに、Orchestrator は古い Teammate を破棄して新しい Teammate を作成する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Orchestrator 将任务消息放入 Teammate 的邮箱，Teammate 在下次循环中取出并处理",
                "en": "Orchestrator places task messages in Teammate's inbox; Teammate picks up and processes in the next loop",
                "ja": "Orchestrator がタスクメッセージを Teammate の受信箱に入れ、Teammate が次のループで取り出して処理する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "多个任务消息排队等候，Teammate 按顺序逐一处理",
                "en": "Multiple task messages queue up; Teammate processes them one by one in order",
                "ja": "複数のタスクメッセージが並んで待ち、Teammate が順番に一つずつ処理する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Teammate 处理完邮箱消息后将结果发回 Orchestrator 的邮箱",
                "en": "Teammate sends results back to Orchestrator's inbox after processing inbox messages",
                "ja": "Teammate が受信箱メッセージを処理した後、結果を Orchestrator の受信箱に送り返す"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "「每次销毁旧 Teammate 再创建新 Teammate」正是把 Teammate 用成了 Subagent 的方式——退化成了一次性模式。邮箱驱动的核心是：Teammate 长期存在，靠检查邮箱接收新工作，而不是靠重新创建。",
            "en": "'Destroy and recreate Teammate each time' is exactly using a Teammate like a Subagent — reverting to the one-shot pattern. The core of inbox-driven: Teammates persist and receive new work by checking their inbox, not by being recreated.",
            "ja": "「毎回古い Teammate を破棄して新しい Teammate を作成する」は、Teammate を Subagent のように使っています——使い捨てパターンへの退化です。受信箱駆動のコアは：Teammate は長期存在し、再作成ではなく受信箱を確認することで新しい作業を受け取ります。"
          },
          "reward_card": "card_s15_004"
        },
        {
          "id": "q_s15_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "团队系统的四个组件（TeamConfig、MessageEnvelope、名册、邮箱）中，哪个组合构成了「消息能被正确投递」的最小必要条件？",
            "en": "Among the four team system components (TeamConfig, MessageEnvelope, Roster, Inbox), which combination is the minimum necessary condition for messages to be correctly delivered?",
            "ja": "チームシステムの四つのコンポーネント（TeamConfig、MessageEnvelope、名簿、受信箱）の中で、「メッセージが正しく配信される」最小必要条件となる組み合わせはどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "名册（知道谁在）+ MessageEnvelope（知道发给谁）+ 邮箱（消息落地处）",
                "en": "Roster (know who's present) + MessageEnvelope (know recipient) + Inbox (message landing point)",
                "ja": "名簿（誰がいるかわかる）+ MessageEnvelope（誰に送るかわかる）+ 受信箱（メッセージの着地点）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "仅需 MessageEnvelope，其余是冗余的",
                "en": "Only MessageEnvelope is needed; the rest are redundant",
                "ja": "MessageEnvelope のみ必要で、残りは冗長"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "仅需 TeamConfig 和邮箱",
                "en": "Only TeamConfig and Inbox are needed",
                "ja": "TeamConfig と受信箱のみ必要"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "四个都需要且缺一不可，去掉任何一个消息投递都会失败",
                "en": "All four are needed with none expendable; removing any one causes delivery failure",
                "ja": "四つすべてが必要で欠かせない；どれか一つを取り除くと配信失敗"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "消息正确投递需要三个条件：1) 名册（验证收件人存在，来自 TeamConfig）；2) MessageEnvelope（标明 from/to）；3) 邮箱（消息的实际落地处，Teammate 从这里取消息）。TeamConfig 本身是名册的宿主，不是独立于名册之外的第四要素。",
            "en": "Correct message delivery requires three conditions: 1) Roster (verify recipient exists, from TeamConfig); 2) MessageEnvelope (specify from/to); 3) Inbox (actual landing point, where Teammate retrieves messages). TeamConfig is the host of the roster, not a fourth element independent of the roster.",
            "ja": "メッセージの正しい配信には三つの条件が必要です：1) 名簿（受信者の存在確認、TeamConfig から）；2) MessageEnvelope（from/to を指定）；3) 受信箱（実際の着地点、Teammate がメッセージを取り出す場所）。TeamConfig は名簿のホストであり、名簿とは独立した第四の要素ではありません。"
          },
          "reward_card": "card_s15_003"
        },
        {
          "id": "q_s15_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下关于 Teammate 生命周期管理的描述，哪个最准确？",
            "en": "Which description of Teammate lifecycle management is most accurate?",
            "ja": "Teammate のライフサイクル管理についての次の説明のうち、最も正確なものはどれですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "Teammate 每完成一个任务就需要重启以清空状态",
                "en": "Teammates need to restart after each task to clear state",
                "ja": "Teammate はタスクを完了するたびに状態をクリアするために再起動が必要"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Teammate 的生命周期与单次任务绑定，任务结束即销毁",
                "en": "Teammate lifecycle is tied to a single task; destroyed when task ends",
                "ja": "Teammate のライフサイクルは単一タスクに紐づけられ、タスク終了時に破棄される"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "Teammate 跨越多个任务持续存在，通过邮箱循环接收工作，直到被显式关闭",
                "en": "Teammates persist across multiple tasks, receiving work through inbox loops until explicitly shut down",
                "ja": "Teammate は複数のタスクにわたって持続し、明示的にシャットダウンされるまで受信箱ループを通じて作業を受け取る"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Teammate 只能被 Orchestrator 创建，无法自行终止",
                "en": "Teammates can only be created by the Orchestrator and cannot terminate themselves",
                "ja": "Teammate は Orchestrator にのみ作成でき、自ら終了できない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "这是对「Subagent 干完就消失，Teammate 长期在线反复接活」的完整表述：Teammate 跨越多个任务持续存在，通过邮箱循环不断接收和处理工作，直到收到显式的关闭信号才结束生命周期。",
            "en": "This is the complete description of 'Subagent disappears after finishing, Teammate stays online to take repeated work': Teammates persist across multiple tasks, continuously receiving and processing work through inbox loops, ending their lifecycle only when an explicit shutdown signal is received.",
            "ja": "これは「Subagent は終了後に消えるが、Teammate はオンラインであり続け繰り返し作業を受け取る」の完全な説明です：Teammate は複数のタスクにわたって持続し、受信箱ループを通じて継続的に作業を受け取って処理し、明示的なシャットダウン信号を受けてのみライフサイクルを終了します。"
          },
          "reward_card": "card_s15_001"
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
          "difficulty": 1,
          "stem": {
            "zh": "结构化协议消息中，request_id 字段的主要作用是什么？",
            "en": "What is the main purpose of the request_id field in a structured protocol message?",
            "ja": "構造化プロトコルメッセージにおける request_id フィールドの主な役割は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "唯一标识一次请求，让响应能与请求准确对应",
                "en": "Uniquely identify a request so the response can be accurately matched to it",
                "ja": "リクエストを一意に識別し、レスポンスと正確に対応させる"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "标记消息的发送顺序，方便日志排序",
                "en": "Mark the order of messages for log sorting",
                "ja": "メッセージの送信順序をログ整理のためにマークする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "加密消息内容，防止其他 Agent 读取",
                "en": "Encrypt the message content to prevent other agents from reading it",
                "ja": "メッセージ内容を暗号化して他の Agent が読めないようにする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记录发送方的身份，用于权限校验",
                "en": "Record the sender's identity for permission verification",
                "ja": "送信者の ID を記録して権限チェックに使う"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "request_id 是结构化协议的核心追踪字段。有了它，响应方才能把「这个 approve: true」精确映射回对应的请求，而不是泛指某个模糊的历史操作。",
            "en": "request_id is the core tracking field of a structured protocol. It lets the responder map 'this approve: true' precisely back to the original request, rather than some vague historical action.",
            "ja": "request_id は構造化プロトコルの核心追跡フィールドです。これがあることで、レスポンダーは「この approve: true」を曖昧な過去の操作ではなく、対応するリクエストに正確にマッピングできます。"
          },
          "reward_card": "card_s16_001"
        },
        {
          "id": "q_s16_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "优雅关机（graceful shutdown）协议的正确执行顺序是？",
            "en": "What is the correct execution order of a graceful shutdown protocol?",
            "ja": "グレースフルシャットダウンプロトコルの正しい実行順序はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "协调者发送 shutdown_request → Agent 回复 shutdown_response → Agent 完成收尾后退出",
                "en": "Coordinator sends shutdown_request → Agent replies shutdown_response → Agent exits after cleanup",
                "ja": "コーディネーターが shutdown_request を送信 → Agent が shutdown_response を返信 → Agent がクリーンアップ後に終了"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "直接杀进程 → 记录日志 → 通知协调者",
                "en": "Kill process directly → log → notify coordinator",
                "ja": "プロセスを直接kill → ログ → コーディネーターに通知"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Agent 自行决定退出时机 → 发消息告知协调者 → 协调者确认",
                "en": "Agent decides when to exit → sends message to coordinator → coordinator confirms",
                "ja": "Agent が退出タイミングを自分で決める → コーディネーターにメッセージ → コーディネーターが確認"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "发送 shutdown_request → 等待超时 → 强制终止",
                "en": "Send shutdown_request → wait for timeout → force terminate",
                "ja": "shutdown_request を送信 → タイムアウトを待つ → 強制終了"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "优雅关机的关键是：请求方发出 shutdown_request，被关机方明确回复 shutdown_response（告知已批准），再进行收尾工作后退出。这与「直接杀进程」的本质区别在于被关机方有机会清理状态。",
            "en": "The key to graceful shutdown: the requester sends shutdown_request, the shutting-down party explicitly replies with shutdown_response (indicating approval), then cleans up and exits. The essential difference from 'just kill the process' is that the party being shut down gets to clean up state.",
            "ja": "グレースフルシャットダウンの要点：リクエスト側が shutdown_request を送り、シャットダウンされる側が shutdown_response で明示的に返信し（承認を示す）、クリーンアップ後に終了します。「プロセスを直接kill」との本質的な違いは、シャットダウンされる側が状態をクリーンアップできることです。"
          },
          "reward_card": "card_s16_002"
        },
        {
          "id": "q_s16_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "下列哪个场景属于「协议消息」而非「普通消息」？",
            "en": "Which of the following scenarios is a 'protocol message' rather than a 'plain message'?",
            "ja": "次のシナリオのうち、「普通のメッセージ」ではなく「プロトコルメッセージ」に該当するものはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "协调者向 Agent 发送带有 request_id 和 type: shutdown_request 的 JSON，等待 Agent 回复带有相同 request_id 的 shutdown_response",
                "en": "Coordinator sends JSON with request_id and type: shutdown_request to Agent, waits for Agent to reply with shutdown_response containing the same request_id",
                "ja": "コーディネーターが request_id と type: shutdown_request を含む JSON を Agent に送り、同じ request_id を持つ shutdown_response の返信を待つ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Agent A 询问 Agent B：「你负责哪个模块？」",
                "en": "Agent A asks Agent B: 'Which module are you responsible for?'",
                "ja": "Agent A が Agent B に「どのモジュールを担当していますか？」と尋ねる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Agent A 告知 Agent B：「文件已经写完了」",
                "en": "Agent A tells Agent B: 'The file has been written'",
                "ja": "Agent A が Agent B に「ファイルの書き込みが完了しました」と伝える"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "Agent B 向协调者报告当前任务进度",
                "en": "Agent B reports current task progress to the coordinator",
                "ja": "Agent B がコーディネーターに現在のタスク進捗を報告する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "协议消息的特征是：有固定的 type 字段、有 request_id 追踪、有明确的请求-响应配对，并管理一个可追踪的状态（「批没批准」）。选项 c 完整体现了这三个要素，而其他选项都是单向的状态通知或问询，属于普通消息。",
            "en": "Protocol messages are characterized by: a fixed type field, request_id tracking, clear request-response pairing, and managing a trackable state ('approved or not'). Option c fully embodies all three elements, while the other options are one-way status notifications or queries — plain messages.",
            "ja": "プロトコルメッセージの特徴：固定の type フィールド、request_id による追跡、明確なリクエスト-レスポンスのペアリング、追跡可能な状態の管理（「承認されたかどうか」）。選択肢cはこれら3つの要素を完全に体現しており、他の選択肢は一方向の状態通知や問い合わせで、普通のメッセージです。"
          },
          "reward_card": "card_s16_004"
        },
        {
          "id": "q_s16_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "关机协议和计划审批协议都使用 request-response 模板，这样设计的核心好处是？",
            "en": "Both the shutdown protocol and plan approval protocol use the request-response template. What is the core benefit of this design?",
            "ja": "シャットダウンプロトコルと計画承認プロトコルはどちらも request-response テンプレートを使用しています。この設計の核心的なメリットは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "减少代码行数，让实现更简洁",
                "en": "Reduce code lines, making the implementation more concise",
                "ja": "コード行数を減らし、実装をより簡潔にする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "统一结构降低认知成本：Agent 只需学会一套 request-response 骨架，即可处理所有需要「明确确认」的场景",
                "en": "Unified structure reduces cognitive cost: Agent only needs to learn one request-response skeleton to handle all scenarios requiring explicit confirmation",
                "ja": "統一構造が認知コストを下げる：Agent は一つの request-response 骨格を学ぶだけで、明確な確認が必要なすべてのシナリオに対応できる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "强制所有消息都必须有响应，防止消息丢失",
                "en": "Force all messages to have a response, preventing message loss",
                "ja": "すべてのメッセージに応答を強制し、メッセージの損失を防ぐ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "让协调者可以批量处理多个请求，提高并发效率",
                "en": "Allow the coordinator to batch process multiple requests, improving concurrency",
                "ja": "コーディネーターが複数のリクエストをバッチ処理でき、並行効率を向上させる"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "共用同一套 request-response 骨架的核心价值是「复用认知」：Agent 学会处理关机请求的模式后，不需要重新学习，直接把同一个状态机套用到计划审批场景。这降低了整个团队协作系统的心智负担。",
            "en": "The core value of sharing the same request-response skeleton is 'cognitive reuse': once an Agent learns the pattern for handling shutdown requests, it can directly apply the same state machine to the plan approval scenario without relearning. This reduces the mental burden of the entire team collaboration system.",
            "ja": "同じ request-response 骨格を共有する核心的な価値は「認知の再利用」です：Agent がシャットダウンリクエストの処理パターンを学んだ後、再学習なしに同じステートマシンを計画承認シナリオに直接適用できます。これにより、チーム協働システム全体の認知的負担が軽減されます。"
          },
          "reward_card": "card_s16_003"
        },
        {
          "id": "q_s16_005",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "一个 Agent 收到 shutdown_request 后，应该在何时回复 shutdown_response？",
            "en": "After an Agent receives a shutdown_request, when should it reply with shutdown_response?",
            "ja": "Agent が shutdown_request を受け取った後、いつ shutdown_response を返信すべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先回复 shutdown_response 确认已收到，再进行收尾操作，完成后退出",
                "en": "First reply with shutdown_response confirming receipt, then perform cleanup, then exit",
                "ja": "まず shutdown_response で受信を確認し、次にクリーンアップを実行し、最後に終了する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "完成所有收尾工作后再回复，确保回复时已经干净退出",
                "en": "Reply only after completing all cleanup work, ensuring a clean exit before replying",
                "ja": "すべてのクリーンアップ作業を完了してから返信し、返信時にはクリーンに終了していることを確認する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "立刻回复，然后继续完成当前任务，任务完成后再退出",
                "en": "Reply immediately, then continue completing the current task, exit after the task is done",
                "ja": "すぐに返信し、現在のタスクを完了してから終了する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "忽略请求，等待协调者再次发送后才回复",
                "en": "Ignore the request and wait for the coordinator to send it again before replying",
                "ja": "リクエストを無視し、コーディネーターが再送信してから返信する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "正确顺序是：收到 → 回复确认（让协调者知道消息没有丢失）→ 执行收尾 → 退出。先回复再收尾的好处是：协调者不需要等待不确定的收尾时间，它知道 Agent 已经「确认在走关机流程」了。",
            "en": "The correct order is: receive → reply to confirm (letting the coordinator know the message wasn't lost) → perform cleanup → exit. The benefit of replying before cleanup: the coordinator doesn't need to wait for an uncertain cleanup time; it knows the Agent has 'confirmed it's in the shutdown process'.",
            "ja": "正しい順序：受信 → 確認返信（コーディネーターにメッセージが失われていないことを知らせる）→ クリーンアップ実行 → 終了。クリーンアップ前に返信する利点：コーディネーターは不確定なクリーンアップ時間を待つ必要がなく、Agent が「シャットダウンプロセスに入ったことを確認した」ことがわかります。"
          },
          "reward_card": "card_s16_002"
        },
        {
          "id": "q_s16_006",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "普通消息和协议消息的本质区别是什么？",
            "en": "What is the essential difference between a plain message and a protocol message?",
            "ja": "普通のメッセージとプロトコルメッセージの本質的な違いは何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "普通消息用文本，协议消息用 JSON",
                "en": "Plain messages use text, protocol messages use JSON",
                "ja": "普通のメッセージはテキストを使い、プロトコルメッセージは JSON を使う"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "普通消息由 Agent 发送，协议消息只由协调者发送",
                "en": "Plain messages are sent by agents, protocol messages are only sent by the coordinator",
                "ja": "普通のメッセージは Agent が送り、プロトコルメッセージはコーディネーターのみが送る"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "普通消息解决「说了什么内容」，协议消息解决「这件事走到哪一步了」",
                "en": "Plain messages address 'what was said', protocol messages address 'where this matter has reached in the process'",
                "ja": "普通のメッセージは「何が言われたか」を解決し、プロトコルメッセージは「この件がどの段階まで進んだか」を解決する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "普通消息不需要回复，协议消息必须在 5 秒内回复",
                "en": "Plain messages don't need replies, protocol messages must be replied to within 5 seconds",
                "ja": "普通のメッセージは返信不要で、プロトコルメッセージは5秒以内に返信しなければならない"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "这是 s16 最核心的概念对比。普通消息传递信息（「任务完成了」「文件写好了」），但它无法追踪状态流转；协议消息用 request_id + 状态机，让「批没批准」「走到哪步了」有明确记录。",
            "en": "This is the most fundamental conceptual contrast in s16. Plain messages convey information ('task done', 'file written'), but they can't track state transitions; protocol messages use request_id + state machine, giving clear records of 'approved or not' and 'which step we're at'.",
            "ja": "これは s16 の最も核心的な概念の対比です。普通のメッセージは情報を伝えます（「タスク完了」「ファイル書き込み完了」）が、状態遷移を追跡できません。プロトコルメッセージは request_id + ステートマシンを使用し、「承認されたかどうか」「どのステップにいるか」を明確に記録します。"
          },
          "reward_card": "card_s16_004"
        },
        {
          "id": "q_s16_007",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "在关机协议中，如果 Agent 回复了 shutdown_response 但 approve 为 false，意味着什么？",
            "en": "In the shutdown protocol, if an Agent replies with shutdown_response but approve is false, what does that mean?",
            "ja": "シャットダウンプロトコルで、Agent が shutdown_response を返信したが approve が false だった場合、それは何を意味しますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "Agent 没有收到关机请求",
                "en": "The Agent did not receive the shutdown request",
                "ja": "Agent がシャットダウンリクエストを受信しなかった"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Agent 暂时无法关机，拒绝了这次请求",
                "en": "The Agent cannot shut down at this time and rejected the request",
                "ja": "Agent は現時点でシャットダウンできず、リクエストを拒否した"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "协议传输出现了错误",
                "en": "A transmission error occurred in the protocol",
                "ja": "プロトコルの伝送でエラーが発生した"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "关机请求的 request_id 不匹配",
                "en": "The request_id of the shutdown request doesn't match",
                "ja": "シャットダウンリクエストの request_id が一致しない"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "结构化协议设计的关键是：Agent 有权拒绝请求（approve: false），这让协议不是单向命令，而是真正的「请求-响应」交互。Agent 可能正在处理关键任务，需要稍后再关机。",
            "en": "A key aspect of structured protocol design: the Agent has the right to reject a request (approve: false), making the protocol not a one-way command but a true 'request-response' interaction. The Agent may be handling a critical task and need to shut down later.",
            "ja": "構造化プロトコル設計の重要点：Agent はリクエストを拒否する権限があり（approve: false）、これによりプロトコルは一方的なコマンドではなく、真の「リクエスト-レスポンス」インタラクションになります。Agent が重要なタスクを処理中で、後でシャットダウンする必要があるかもしれません。"
          },
          "reward_card": "card_s16_002"
        },
        {
          "id": "q_s16_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "计划审批协议（plan_approval_request）和关机协议（shutdown_request）共用一套骨架，以下哪个字段是两者都必须包含的？",
            "en": "The plan approval protocol and shutdown protocol share the same skeleton. Which field must both include?",
            "ja": "計画承認プロトコルとシャットダウンプロトコルは同じ骨格を共有しています。両方が必ず含めなければならないフィールドはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "plan_content（计划内容）",
                "en": "plan_content (plan content)",
                "ja": "plan_content（計画内容）"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "reason（拒绝原因）",
                "en": "reason (rejection reason)",
                "ja": "reason（拒否理由）"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "timestamp（时间戳）",
                "en": "timestamp",
                "ja": "timestamp（タイムスタンプ）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "request_id 和 type",
                "en": "request_id and type",
                "ja": "request_id と type"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "request_id 用于追踪（让响应能对应到请求），type 用于区分协议类型（shutdown vs plan_approval）。这两个字段是 request-response 骨架的最小必要元素，在所有协议消息中都存在。",
            "en": "request_id is for tracking (linking responses to requests), type is for distinguishing protocol types (shutdown vs plan_approval). These two fields are the minimal necessary elements of the request-response skeleton, present in all protocol messages.",
            "ja": "request_id は追跡用（レスポンスをリクエストに紐付ける）、type はプロトコルタイプの区別用（shutdown vs plan_approval）です。この2つのフィールドは request-response 骨格の最小必要要素で、すべてのプロトコルメッセージに存在します。"
          },
          "reward_card": "card_s16_003"
        },
        {
          "id": "q_s16_009",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "如果把「关机」和「计划审批」都用普通消息实现而不用协议，最可能出现的问题是？",
            "en": "If both 'shutdown' and 'plan approval' were implemented with plain messages instead of protocols, what problem would most likely arise?",
            "ja": "「シャットダウン」と「計画承認」をプロトコルではなく普通のメッセージで実装した場合、最も起こりやすい問題は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "消息传输延迟变高",
                "en": "Message transmission latency increases",
                "ja": "メッセージ伝送レイテンシが増加する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Agent 的代码量会翻倍",
                "en": "Agent code volume doubles",
                "ja": "Agent のコード量が倍増する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "无法追踪「这件事走到哪一步了」，协调者不知道某个关机/审批请求是否已被确认处理",
                "en": "Unable to track 'where this matter has reached', the coordinator doesn't know if a shutdown/approval request has been confirmed as processed",
                "ja": "「この件がどの段階まで進んだか」を追跡できず、コーディネーターはシャットダウン/承認リクエストが確認・処理されたかどうかわからない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "消息格式不统一导致解析出错",
                "en": "Inconsistent message formats cause parsing errors",
                "ja": "メッセージフォーマットの不一致によりパースエラーが発生する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "普通消息解决不了「状态追踪」问题。协调者发出「请关机」普通消息后，无法分辨「Agent 是没收到、收到了但在忙、还是已经在关机了」。协议消息的 request_id + 明确的 approve 回复，让这些状态变得可见。",
            "en": "Plain messages can't solve the 'state tracking' problem. After the coordinator sends a plain 'please shut down' message, it can't distinguish whether 'the Agent didn't receive it, received it but is busy, or is already shutting down'. Protocol messages with request_id + explicit approve replies make these states visible.",
            "ja": "普通のメッセージは「状態追跡」問題を解決できません。コーディネーターが「シャットダウンしてください」という普通のメッセージを送った後、「Agent が受信しなかったのか、受信したが忙しいのか、すでにシャットダウン中なのか」を区別できません。request_id と明示的な approve 返信を持つプロトコルメッセージにより、これらの状態が可視化されます。"
          },
          "reward_card": "card_s16_004"
        },
        {
          "id": "q_s16_010",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "以下哪个描述最准确地体现了「结构化协议 = request_id + 状态机」的设计理念？",
            "en": "Which description most accurately reflects the design philosophy of 'structured protocol = request_id + state machine'?",
            "ja": "「構造化プロトコル = request_id + ステートマシン」の設計思想を最も正確に表しているのはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "用数字 ID 编号消息，用状态枚举代替文字描述",
                "en": "Number messages with numeric IDs, use state enumerations instead of text descriptions",
                "ja": "数値IDでメッセージに番号を付け、状態列挙でテキスト説明を置き換える"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "每个请求有唯一标识（request_id），每次交互的状态变化（pending → approved/rejected）是明确可追踪的",
                "en": "Each request has a unique identifier (request_id), and the state change of each interaction (pending → approved/rejected) is explicitly trackable",
                "ja": "各リクエストに一意の識別子（request_id）があり、各インタラクションの状態変化（pending → approved/rejected）が明示的に追跡可能"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "把所有消息都放进一个有序队列，按顺序处理",
                "en": "Put all messages into an ordered queue and process them in order",
                "ja": "すべてのメッセージを順序付きキューに入れて順番に処理する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "用数据库持久化所有协议消息，防止消息丢失",
                "en": "Persist all protocol messages in a database to prevent message loss",
                "ja": "すべてのプロトコルメッセージをデータベースに永続化してメッセージの損失を防ぐ"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "「request_id + 状态机」的本质是让协议交互具有确定性：request_id 保证了每次交互的唯一性和可追溯性，状态机（pending → approved/rejected）保证了每次交互的结果是明确的、可验证的，而不是模糊的「应该批了吧」。",
            "en": "The essence of 'request_id + state machine' is to make protocol interactions deterministic: request_id ensures each interaction's uniqueness and traceability, the state machine (pending → approved/rejected) ensures each interaction's outcome is explicit and verifiable, not a vague 'should have been approved'.",
            "ja": "「request_id + ステートマシン」の本質は、プロトコルインタラクションを決定論的にすることです：request_id は各インタラクションの一意性と追跡可能性を保証し、ステートマシン（pending → approved/rejected）は各インタラクションの結果が明示的で検証可能であることを保証し、「たぶん承認されたはず」という曖昧さをなくします。"
          },
          "reward_card": "card_s16_001"
        },
        {
          "id": "q_s16_011",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在协议消息的 response 端，为什么必须回传 request_id？",
            "en": "On the response side of a protocol message, why must the request_id be echoed back?",
            "ja": "プロトコルメッセージのレスポンス側で、なぜ request_id を返送しなければならないのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "证明响应方已经解析了请求的完整内容",
                "en": "Prove the responder has parsed the full content of the request",
                "ja": "レスポンダーがリクエストの完全な内容を解析したことを証明する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "便于日志系统按 ID 索引和归档",
                "en": "Facilitate log systems to index and archive by ID",
                "ja": "ログシステムがIDでインデックス化とアーカイブを行いやすくする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "用于加密校验，防止伪造响应",
                "en": "Used for encryption verification to prevent forged responses",
                "ja": "暗号化検証に使用し、偽造レスポンスを防ぐ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "让请求方可以把「这个 approve: true」和「那个具体的请求」精确对应，而不是泛指",
                "en": "Allow the requester to precisely match 'this approve: true' to 'that specific request', not a vague reference",
                "ja": "リクエスト側が「この approve: true」を「あの特定のリクエスト」と正確に対応付けられるようにし、曖昧な参照を避ける"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "这是 request_id 设计的核心价值。如果请求方同时发出了多个关机请求（或者请求之间有时间间隔），响应中回传 request_id 才能让请求方知道「这个 approve 是针对哪个请求的」，避免了「批了哪个」的歧义。",
            "en": "This is the core value of request_id design. If the requester sends multiple shutdown requests simultaneously (or with time intervals between them), echoing request_id in the response lets the requester know 'which request this approve is for', avoiding the ambiguity of 'which one was approved'.",
            "ja": "これが request_id 設計の核心的な価値です。リクエスト側が複数のシャットダウンリクエストを同時に（または時間をおいて）送信した場合、レスポンスで request_id を返送することで、「この approve はどのリクエストに対するものか」をリクエスト側が知ることができ、「どれが承認されたか」の曖昧さを避けられます。"
          },
          "reward_card": "card_s16_001"
        },
        {
          "id": "q_s16_012",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "协调者向 Agent 发送了 plan_approval_request，但长时间没有收到 plan_approval_response。根据协议设计原则，协调者最合理的处理方式是？",
            "en": "The coordinator sent a plan_approval_request to an Agent but hasn't received a plan_approval_response for a long time. Based on protocol design principles, what is the most reasonable action for the coordinator?",
            "ja": "コーディネーターが Agent に plan_approval_request を送ったが、長時間 plan_approval_response を受信しません。プロトコル設計原則に基づき、コーディネーターの最も合理的な対応は？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "认为 Agent 已经隐式批准，直接开始执行计划",
                "en": "Assume the Agent has implicitly approved and start executing the plan",
                "ja": "Agent が暗黙的に承認したと見なし、計画を実行開始する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "认为 Agent 已经隐式拒绝，放弃计划",
                "en": "Assume the Agent has implicitly rejected and abandon the plan",
                "ja": "Agent が暗黙的に拒否したと見なし、計画を放棄する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "用新的 request_id 重新发送请求，或发出告警，不能假设对方的意图",
                "en": "Resend the request with a new request_id, or raise an alert — cannot assume the other party's intent",
                "ja": "新しい request_id でリクエストを再送するか、アラートを発する — 相手の意図を仮定してはならない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "直接强制关闭 Agent，重新启动一个新 Agent",
                "en": "Force close the Agent and start a new one",
                "ja": "Agent を強制終了し、新しい Agent を起動する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "协议设计的核心原则是「明确确认，不假设意图」。没有收到响应可能是：消息丢失、Agent 繁忙、Agent 崩溃等多种原因，不能把沉默当作批准或拒绝。正确做法是用新的 request_id 重发，或告警等待人工介入。",
            "en": "The core principle of protocol design is 'explicit confirmation, don't assume intent'. Not receiving a response could be due to: message loss, Agent busy, Agent crash, etc. — you cannot treat silence as approval or rejection. The correct approach is to resend with a new request_id, or alert and wait for manual intervention.",
            "ja": "プロトコル設計の核心原則は「明示的な確認、意図を仮定しない」です。レスポンスを受信しないのは、メッセージの損失、Agent のビジー状態、Agent のクラッシュなど様々な原因が考えられます。沈黙を承認や拒否として扱うことはできません。正しい対応は、新しい request_id で再送するか、アラートを出して手動介入を待つことです。"
          },
          "reward_card": "card_s16_003"
        },
        {
          "id": "q_s16_013",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "为什么说「协议消息」比「普通消息」更适合处理关机这类操作？",
            "en": "Why is a 'protocol message' more suitable than a 'plain message' for handling operations like shutdown?",
            "ja": "なぜ「プロトコルメッセージ」は「普通のメッセージ」よりシャットダウンのような操作の処理に適しているのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "协议消息传输速度更快",
                "en": "Protocol messages transmit faster",
                "ja": "プロトコルメッセージは伝送速度が速い"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "协议消息内容更短，节省带宽",
                "en": "Protocol messages are shorter, saving bandwidth",
                "ja": "プロトコルメッセージは短く、帯域幅を節約する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "关机等操作需要「明确确认对方收到并同意」，协议消息的 request-response 结构保证了这个确认是可追踪的",
                "en": "Operations like shutdown require 'explicit confirmation that the other party received and agreed', and the request-response structure of protocol messages ensures this confirmation is trackable",
                "ja": "シャットダウンのような操作は「相手が受信して同意したことの明示的な確認」が必要で、プロトコルメッセージの request-response 構造がこの確認を追跡可能にする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "微信小程序的通信 API 只支持协议消息格式",
                "en": "The WeChat Mini Program communication API only supports protocol message format",
                "ja": "WeChat ミニプログラムの通信 API はプロトコルメッセージ形式のみをサポートする"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "关机、计划审批等操作有「高后果性」——执行错了会产生严重影响。普通消息的「发了就算」无法满足这类场景的安全要求，必须有明确的 request-response 往返来确认「对方收到、理解并同意了」。",
            "en": "Operations like shutdown and plan approval have 'high consequences' — executing them incorrectly has serious impact. The 'fire and forget' nature of plain messages can't meet the safety requirements for these scenarios; there must be an explicit request-response exchange to confirm 'the other party received, understood, and agreed'.",
            "ja": "シャットダウンや計画承認などの操作は「高い影響度」があり、誤って実行すると深刻な影響が生じます。普通のメッセージの「送ったら終わり」という性質は、こうしたシナリオの安全要件を満たせません。「相手が受信し、理解し、同意した」ことを確認するための明示的な request-response の往復が必要です。"
          },
          "reward_card": "card_s16_004"
        },
        {
          "id": "q_s16_014",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个多 Agent 系统中，协调者同时向三个 Agent 发送了 shutdown_request，每个请求有不同的 request_id。Agent B 回复了 approve: true，但没有包含 request_id。这会导致什么问题？",
            "en": "In a multi-agent system, the coordinator sends shutdown_request to three agents simultaneously, each with a different request_id. Agent B replies with approve: true but without including request_id. What problem does this cause?",
            "ja": "マルチエージェントシステムで、コーディネーターが3つの Agent に同時に shutdown_request を送り、それぞれ異なる request_id を持っています。Agent B が request_id を含めずに approve: true を返信しました。どんな問題が生じますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "协调者无法判断 approve: true 对应的是哪个 request_id，无法确定是哪个 Agent 同意了关机",
                "en": "The coordinator cannot determine which request_id the approve: true corresponds to, unable to confirm which Agent agreed to shut down",
                "ja": "コーディネーターは approve: true がどの request_id に対応するかを判断できず、どの Agent がシャットダウンに同意したかを確認できない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "消息会被拒绝，Agent B 需要重新发送",
                "en": "The message will be rejected and Agent B needs to resend",
                "ja": "メッセージが拒否され、Agent B は再送信する必要がある"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "系统会自动匹配发送时间最近的 request_id",
                "en": "The system automatically matches the most recently sent request_id",
                "ja": "システムは最も最近送信された request_id を自動的に照合する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "协调者会把这个 approve: true 应用到所有三个请求",
                "en": "The coordinator applies this approve: true to all three requests",
                "ja": "コーディネーターはこの approve: true を3つのリクエストすべてに適用する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "这正是 request_id 的存在意义。在并发场景下，没有 request_id 的响应是「悬空的同意」——协调者无法知道这个 approve 指向哪个请求。这也解释了为什么 response 端必须回传原始 request_id，而不是生成新的。",
            "en": "This is exactly why request_id exists. In concurrent scenarios, a response without request_id is a 'dangling approval' — the coordinator can't know which request this approve refers to. This also explains why the response side must echo the original request_id rather than generating a new one.",
            "ja": "これがまさに request_id が存在する理由です。並行シナリオでは、request_id のないレスポンスは「宙ぶらりんの承認」であり、コーディネーターはこの approve がどのリクエストを指しているかわかりません。これはまた、レスポンス側が新しいものを生成するのではなく、元の request_id を返送しなければならない理由も説明しています。"
          },
          "reward_card": "card_s16_001"
        },
        {
          "id": "q_s16_015",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "s16 的「共享 request-response 规则」对 s15 团队协作系统的哪个方面做了扩展？",
            "en": "How does s16's 'shared request-response rules' extend the team collaboration system from s15?",
            "ja": "s16 の「共有 request-response ルール」は、s15 のチーム協働システムのどの側面を拡張していますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "增加了更多 Agent 类型，支持更大规模的团队",
                "en": "Added more Agent types to support larger teams",
                "ja": "より多くの Agent タイプを追加し、より大規模なチームをサポートする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "在普通消息基础上，为需要「明确确认」的高后果操作（关机、计划审批）引入了结构化的 request-response 协议",
                "en": "On top of plain messaging, introduced structured request-response protocols for high-consequence operations (shutdown, plan approval) that require 'explicit confirmation'",
                "ja": "普通のメッセージングに加えて、「明示的な確認」が必要な高影響度の操作（シャットダウン、計画承認）のための構造化 request-response プロトコルを導入した"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "替换了 s15 的任务队列系统，用协议消息管理所有任务",
                "en": "Replaced s15's task queue system with protocol messages managing all tasks",
                "ja": "s15 のタスクキューシステムを置き換え、プロトコルメッセージですべてのタスクを管理する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "为 Agent 增加了持久化存储，让协议消息可以跨重启保留",
                "en": "Added persistent storage for Agents so protocol messages survive restarts",
                "ja": "Agent に永続ストレージを追加し、プロトコルメッセージが再起動後も保持されるようにした"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "s16 不是替换 s15，而是在其基础上补充了一层「协议层」。s15 解决了团队成员的组织和任务分配问题，s16 在此基础上针对「高后果操作」引入了结构化的确认机制，让这类操作有明确的状态追踪。",
            "en": "s16 doesn't replace s15 — it adds a 'protocol layer' on top of it. s15 solved team member organization and task assignment; s16 builds on this by introducing a structured confirmation mechanism for 'high-consequence operations', giving these operations explicit state tracking.",
            "ja": "s16 は s15 を置き換えるのではなく、その上に「プロトコル層」を追加します。s15 がチームメンバーの組織とタスク割り当ての問題を解決したのに対し、s16 はその上に「高影響度操作」のための構造化確認メカニズムを導入し、これらの操作に明示的な状態追跡を提供します。"
          },
          "reward_card": "card_s16_003"
        },
        {
          "id": "q_s16_016",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "优雅关机协议中，Agent 收到 shutdown_request 后可以做的最重要的事是？",
            "en": "In the graceful shutdown protocol, the most important thing an Agent can do after receiving shutdown_request is?",
            "ja": "グレースフルシャットダウンプロトコルで、Agent が shutdown_request を受け取った後にできる最も重要なことは？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "立即停止所有操作，防止数据损坏",
                "en": "Immediately stop all operations to prevent data corruption",
                "ja": "データ破損を防ぐためにすべての操作を即座に停止する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "通知所有依赖自己的其他 Agent",
                "en": "Notify all other Agents that depend on it",
                "ja": "自分に依存するすべての他の Agent に通知する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "备份当前所有内存状态",
                "en": "Back up all current memory state",
                "ja": "現在のすべてのメモリ状態をバックアップする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "有机会完成当前工作的收尾，而不是被强制中断——这是「优雅」的核心含义",
                "en": "Have the opportunity to complete current work cleanly rather than being forcefully interrupted — this is the core meaning of 'graceful'",
                "ja": "強制的に中断されるのではなく、現在の作業をクリーンに完了する機会を得ること — これが「グレースフル」の核心的な意味"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "「优雅关机」的「优雅」就在于：Agent 不是被直接杀死，而是收到请求后有机会把手头的事情做完、清理状态、保存必要数据，然后体面地退出。这与操作系统的 SIGTERM（优雅关机）vs SIGKILL（强制杀死）是同一个思想。",
            "en": "The 'graceful' in 'graceful shutdown' means: the Agent isn't just killed; after receiving the request, it has the opportunity to finish what it's doing, clean up state, save necessary data, and then exit cleanly. This is the same philosophy as SIGTERM (graceful shutdown) vs SIGKILL (force kill) in operating systems.",
            "ja": "「グレースフルシャットダウン」の「グレースフル」の意味：Agent は単に殺されるのではなく、リクエストを受け取った後、進行中の作業を完了し、状態をクリーンアップし、必要なデータを保存してから、クリーンに終了する機会を得ます。これはオペレーティングシステムの SIGTERM（グレースフルシャットダウン）vs SIGKILL（強制終了）と同じ思想です。"
          },
          "reward_card": "card_s16_002"
        },
        {
          "id": "q_s16_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "某团队 Agent 系统中，协调者需要同时处理两类操作：（1）日常任务进度汇报（2）Agent 关机确认。以下哪种消息架构最合理？",
            "en": "In a team Agent system, the coordinator needs to handle two types of operations: (1) daily task progress reports (2) Agent shutdown confirmation. Which message architecture is most reasonable?",
            "ja": "チーム Agent システムで、コーディネーターは2種類の操作を処理する必要があります：(1) 日常タスクの進捗報告 (2) Agent のシャットダウン確認。どのメッセージアーキテクチャが最も合理的ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "全部用协议消息，统一结构便于解析",
                "en": "Use protocol messages for everything, unified structure for easy parsing",
                "ja": "すべてにプロトコルメッセージを使用し、統一構造で解析を容易にする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "全部用普通消息，保持简单",
                "en": "Use plain messages for everything to keep it simple",
                "ja": "すべてに普通のメッセージを使用してシンプルに保つ"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "进度汇报用普通消息（不需要明确确认），关机确认用协议消息（需要追踪状态和明确批准）",
                "en": "Progress reports use plain messages (no explicit confirmation needed), shutdown confirmation uses protocol messages (need to track state and explicit approval)",
                "ja": "進捗報告は普通のメッセージを使用（明示的な確認不要）、シャットダウン確認はプロトコルメッセージを使用（状態追跡と明示的な承認が必要）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "进度汇报用协议消息，关机确认用普通消息，两者互换以降低关机操作的仪式感",
                "en": "Progress reports use protocol messages, shutdown confirmation uses plain messages, swapping them to reduce the ceremony of shutdown operations",
                "ja": "進捗報告はプロトコルメッセージ、シャットダウン確認は普通のメッセージ、2つを入れ替えてシャットダウン操作の形式性を下げる"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "这是 s16 对消息类型分层的核心思想：不是所有消息都需要协议级别的追踪。进度汇报是低后果的单向通知，用普通消息即可；关机确认是高后果的双向确认，必须用协议消息。「按需选用工具」比「一律套用最重的机制」更合理。",
            "en": "This is the core idea of s16's message type layering: not all messages need protocol-level tracking. Progress reports are low-consequence one-way notifications that work fine as plain messages; shutdown confirmation is a high-consequence two-way confirmation that requires protocol messages. 'Using the right tool for the job' is more reasonable than 'applying the heaviest mechanism to everything'.",
            "ja": "これが s16 のメッセージタイプの階層化の核心思想です：すべてのメッセージがプロトコルレベルの追跡を必要とするわけではありません。進捗報告は低影響度の一方向通知であり、普通のメッセージで十分です。シャットダウン確認は高影響度の双方向確認であり、プロトコルメッセージが必要です。「目的に合ったツールを使う」ことが「すべてに最も重いメカニズムを適用する」よりも合理的です。"
          },
          "reward_card": "card_s16_004"
        },
        {
          "id": "q_s16_018",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "s16 的团队协议规则的设计，体现了软件工程中哪个经典原则？",
            "en": "The design of s16's team protocol rules reflects which classic principle in software engineering?",
            "ja": "s16 のチームプロトコルルールの設計は、ソフトウェアエンジニアリングのどの古典的な原則を反映していますか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "DRY（Don't Repeat Yourself）——不重复代码",
                "en": "DRY (Don't Repeat Yourself) — no repeated code",
                "ja": "DRY（Don't Repeat Yourself）— コードを繰り返さない"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "Be conservative in what you send, be liberal in what you accept（发送时保守，接受时宽容）",
                "en": "Be conservative in what you send, be liberal in what you accept",
                "ja": "送信するものには保守的に、受信するものには寛容に"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "Fail-fast（尽早失败）——遇到问题立即报错",
                "en": "Fail-fast — report errors immediately when problems occur",
                "ja": "フェイルファスト — 問題が発生したら即座にエラーを報告する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "明确优于隐含（Explicit is better than implicit）——让「批没批准」有明确的结构化记录，而不是靠推断",
                "en": "Explicit is better than implicit — giving 'approved or not' an explicit structured record rather than relying on inference",
                "ja": "明示的であることは暗黙的であることより良い — 「承認されたかどうか」を推測に頼るのではなく、明示的な構造化記録で表す"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "这来自 Python 的禅：「Explicit is better than implicit.」s16 的协议设计正是这个原则的体现——用 request_id + 明确的 approve 字段，让「这件事走到哪一步」从隐含的上下文推断变成了显式的可查询状态，这让多 Agent 协作中的「批没批准」有了确定性。",
            "en": "This comes from the Zen of Python: 'Explicit is better than implicit.' s16's protocol design embodies this principle — using request_id + explicit approve field, turning 'where has this matter reached' from implicit contextual inference into an explicit queryable state, giving 'approved or not' in multi-agent collaboration a deterministic answer.",
            "ja": "これは Python の禅から来ています：「明示的であることは暗黙的であることより良い」。s16 のプロトコル設計はこの原則を体現しています — request_id と明示的な approve フィールドを使用することで、「この件がどの段階まで進んだか」を暗黙的な文脈の推測から明示的な照会可能な状態へと変換し、マルチエージェント協働における「承認されたかどうか」に決定論的な答えを与えます。"
          },
          "reward_card": "card_s16_001"
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
          "difficulty": 1,
          "stem": {
            "zh": "在自治 agent 的设计中，「自治」的核心含义是什么？",
            "en": "In autonomous agent design, what does 'autonomy' fundamentally mean?",
            "ja": "自律 agent 設計において、「自律」の核心的な意味は何ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "agent 在 WORK 和 IDLE 两个阶段之间有序切换，不需要外部每次手动调度",
                "en": "The agent switches orderly between WORK and IDLE phases without needing manual scheduling each time",
                "ja": "agent が WORK と IDLE の 2 フェーズ間を秩序立てて切り替え、外部の手動スケジューリングが不要になること"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "agent 可以无限制地并行执行所有任务，不需要等待",
                "en": "The agent can execute all tasks in parallel without any limits or waiting",
                "ja": "agent がすべてのタスクを制限なく並列実行できること"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "agent 完全脱离 lead 的控制，独立做所有决策",
                "en": "The agent is completely free from lead control and makes all decisions independently",
                "ja": "agent が lead の制御を完全に離れ、すべての決定を独自に行うこと"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "agent 只能执行 lead 明确分配的任务，不会自己认领",
                "en": "The agent can only execute tasks explicitly assigned by the lead and never self-claims",
                "ja": "agent は lead が明示的に割り当てたタスクしか実行できないこと"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "自治不是让 agent 乱跑，而是让它在 WORK 和 IDLE 两个阶段之间有序切换。WORK 阶段执行任务，IDLE 阶段等待新工作或检查邮箱，整个循环不需要外部每轮手动触发。",
            "en": "Autonomy means orderly switching between WORK and IDLE phases, not uncontrolled execution. WORK phase executes tasks; IDLE phase waits for new work or checks the mailbox — the entire loop needs no external manual triggering each round.",
            "ja": "自律とは agent を自由に動かすことではなく、WORK と IDLE の間を秩序立てて切り替えることです。WORK フェーズではタスクを実行し、IDLE フェーズでは新しい作業の待機またはメールボックスの確認を行います。"
          },
          "reward_card": "card_s17_001"
        },
        {
          "id": "q_s17_002",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "WORK↔IDLE 双阶段循环中，agent 在 IDLE 阶段的正确行为是？",
            "en": "In the WORK↔IDLE two-phase loop, what is the correct behavior for an agent in the IDLE phase?",
            "ja": "WORK↔IDLE の 2 フェーズループにおいて、IDLE フェーズでの agent の正しい行動はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "检查邮箱是否有新指令，然后决定是否认领新任务",
                "en": "Check the mailbox for new instructions, then decide whether to claim new tasks",
                "ja": "メールボックスに新しい指示がないか確認し、新しいタスクを引き受けるかどうかを決める"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "立即开始执行任务板上第一个未认领的任务",
                "en": "Immediately start executing the first unclaimed task on the task board",
                "ja": "タスクボードの最初の未請求タスクをすぐに実行し始める"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "向 lead 发送报告，等待 lead 手动分配下一个任务",
                "en": "Send a report to the lead and wait for the lead to manually assign the next task",
                "ja": "lead に報告を送り、lead が次のタスクを手動で割り当てるのを待つ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "进入休眠，直到 lead 发送唤醒消息",
                "en": "Go to sleep until the lead sends a wake-up message",
                "ja": "lead がウェイクアップメッセージを送るまでスリープ状態になる"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "IDLE 阶段的标准行为是：先检查邮箱（mailbox）看是否有 lead 或其他 teammate 的新指令，然后再决定是否认领新任务。邮箱优先于任务板，确保明确指令不被自动行为覆盖。",
            "en": "The standard IDLE phase behavior is: first check the mailbox for new instructions from the lead or other teammates, then decide whether to claim new tasks. Mailbox takes priority over the task board, ensuring explicit instructions aren't overridden by automated behavior.",
            "ja": "IDLE フェーズの標準動作は、まずメールボックスを確認して lead や他の teammate からの新しい指示がないかチェックし、その後新しいタスクを引き受けるかどうかを決めることです。"
          },
          "reward_card": "card_s17_001"
        },
        {
          "id": "q_s17_003",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "以下关于 WORK↔IDLE 双阶段循环的说法，哪个是错误的？",
            "en": "Which of the following statements about the WORK↔IDLE two-phase loop is INCORRECT?",
            "ja": "WORK↔IDLE の 2 フェーズループについて、誤っている説明はどれですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "WORK 阶段负责执行已认领的任务",
                "en": "The WORK phase is responsible for executing claimed tasks",
                "ja": "WORK フェーズは引き受けたタスクの実行を担当する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "IDLE 阶段会先检查邮箱再考虑认领任务",
                "en": "The IDLE phase checks the mailbox before considering task claiming",
                "ja": "IDLE フェーズはタスクの引き受けを検討する前にメールボックスを確認する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "agent 在每个 IDLE 阶段都必须认领至少一个新任务，否则循环会终止",
                "en": "The agent must claim at least one new task in each IDLE phase, otherwise the loop terminates",
                "ja": "agent は各 IDLE フェーズで少なくとも 1 つの新しいタスクを引き受けなければならず、そうしないとループが終了する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "整个 WORK↔IDLE 循环不需要外部每轮手动触发",
                "en": "The entire WORK↔IDLE loop does not require external manual triggering each round",
                "ja": "WORK↔IDLE ループ全体は外部からの手動トリガーを毎ラウンド必要としない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "IDLE 阶段没有强制认领的要求。如果没有符合条件的任务（无阻塞、无主、角色匹配），agent 可以保持 IDLE 状态等待，而不是强行认领或终止循环。",
            "en": "There is no mandatory claiming requirement in the IDLE phase. If no eligible tasks exist (unblocked, unclaimed, role-matching), the agent can remain IDLE and wait, rather than forcibly claiming or terminating the loop.",
            "ja": "IDLE フェーズに強制的な引き受け要件はありません。適格なタスク（ブロックなし、未請求、役割一致）がない場合、agent は強制的に引き受けたりループを終了したりせず、IDLE 状態のまま待機できます。"
          },
          "reward_card": "card_s17_001"
        },
        {
          "id": "q_s17_004",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在 WORK↔IDLE 双阶段循环中，以下哪种情形会让 agent 从 IDLE 切换回 WORK？",
            "en": "In the WORK↔IDLE two-phase loop, which situation causes the agent to switch from IDLE back to WORK?",
            "ja": "WORK↔IDLE の 2 フェーズループで、agent が IDLE から WORK に切り替わる状況はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "收到 lead 的 shutdown_request 消息",
                "en": "Receiving a shutdown_request message from the lead",
                "ja": "lead から shutdown_request メッセージを受け取った場合"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "邮箱中有尚未读取的消息",
                "en": "There are unread messages in the mailbox",
                "ja": "メールボックスに未読メッセージがある場合"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "定时器到期，无论是否有任务",
                "en": "A timer expires, regardless of whether there are tasks",
                "ja": "タイマーが期限切れになった場合（タスクの有無に関わらず）"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "agent 成功认领了一个新任务，进入执行阶段",
                "en": "The agent successfully claims a new task and enters the execution phase",
                "ja": "agent が新しいタスクの引き受けに成功し、実行フェーズに入った場合"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "IDLE → WORK 的切换触发条件是 agent 成功认领了一个任务。认领成功后 agent 进入 WORK 阶段执行该任务。收到 shutdown_request 会终止循环，收到邮箱消息会处理消息但不一定切换到 WORK，定时器本身不是切换的触发条件。",
            "en": "The trigger for IDLE → WORK transition is the agent successfully claiming a task. After successful claiming, the agent enters WORK phase to execute it. Receiving shutdown_request terminates the loop; mailbox messages are processed but don't necessarily trigger WORK; timers alone don't trigger the switch.",
            "ja": "IDLE → WORK への切り替えのトリガーは、agent がタスクの引き受けに成功することです。引き受け成功後、agent は WORK フェーズに入り、そのタスクを実行します。"
          },
          "reward_card": "card_s17_001"
        },
        {
          "id": "q_s17_005",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "在自治 agent 的 IDLE 阶段，「先邮箱再任务板」的设计原则是为了解决什么问题？",
            "en": "In the IDLE phase of autonomous agents, why is the 'mailbox first, task board second' principle designed?",
            "ja": "自律 agent の IDLE フェーズにおいて、「まずメールボックス、次にタスクボード」の設計原則はどの問題を解決するためのものですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "防止 agent 认领被其他 agent 已锁定的任务",
                "en": "Prevent agents from claiming tasks already locked by other agents",
                "ja": "他の agent がすでにロックしているタスクを引き受けないようにする"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "减少任务板的读取次数，降低系统开销",
                "en": "Reduce the number of task board reads to lower system overhead",
                "ja": "タスクボードの読み取り回数を減らしてシステムオーバーヘッドを削減する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "确保 lead 的明确指令优先于 agent 的自动认领行为，避免指令被忽略",
                "en": "Ensure that explicit instructions from the lead take priority over the agent's automatic claiming, preventing instructions from being ignored",
                "ja": "lead からの明示的な指示が agent の自動引き受け行動より優先されるようにし、指示が無視されないようにする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "让 agent 能够批量处理多个邮件，提高效率",
                "en": "Allow agents to batch-process multiple emails for efficiency",
                "ja": "agent が複数のメールをバッチ処理して効率を上げられるようにする"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "先检查邮箱是为了确保明确指令（来自 lead 或其他 teammate 的消息）优先于自动认领行为。如果 agent 先看任务板就认领了任务，可能会错过 lead 发来的优先级更高的指令或方向调整。",
            "en": "Checking the mailbox first ensures explicit instructions (messages from the lead or other teammates) take priority over automatic claiming. If the agent checks the task board first and claims a task, it might miss higher-priority instructions or direction changes from the lead.",
            "ja": "まずメールボックスを確認するのは、明示的な指示（lead や他の teammate からのメッセージ）が自動引き受け行動より優先されるようにするためです。"
          },
          "reward_card": "card_s17_002"
        },
        {
          "id": "q_s17_006",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "关于 agent 邮箱（mailbox）的作用，以下说法正确的是？",
            "en": "Which of the following correctly describes the role of an agent's mailbox?",
            "ja": "agent のメールボックスの役割について、正しい説明はどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "邮箱用于接收来自 lead 或其他 teammate 的消息，agent 每轮 IDLE 时优先处理",
                "en": "The mailbox receives messages from the lead or other teammates, and the agent processes it with priority during each IDLE round",
                "ja": "メールボックスは lead や他の teammate からのメッセージを受け取り、agent は各 IDLE ラウンドで優先的に処理する"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "邮箱是任务板的备份，存储已完成任务的历史记录",
                "en": "The mailbox is a backup of the task board, storing the history of completed tasks",
                "ja": "メールボックスはタスクボードのバックアップで、完了したタスクの履歴を保存する"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "邮箱只用于 agent 向 lead 汇报进度，不接收外部消息",
                "en": "The mailbox is only used for agents to report progress to the lead, not for receiving external messages",
                "ja": "メールボックスは agent が lead に進捗を報告するためだけのもので、外部メッセージを受け取らない"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "邮箱和任务板是同一个数据结构，只是命名不同",
                "en": "The mailbox and task board are the same data structure with different names",
                "ja": "メールボックスとタスクボードは名前が違うだけの同じデータ構造である"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "邮箱是 agent 接收来自 lead 或其他 teammate 消息的渠道，与任务板（记录待完成任务）是独立的两个概念。agent 在 IDLE 阶段优先处理邮箱，确保重要指令不被遗漏。",
            "en": "The mailbox is the channel for agents to receive messages from the lead or other teammates, separate from the task board (which records tasks to be completed). Agents prioritize the mailbox during IDLE phase to ensure important instructions are not missed.",
            "ja": "メールボックスは agent が lead や他の teammate からのメッセージを受け取るためのチャネルで、タスクボード（完了すべきタスクを記録）とは独立した概念です。"
          },
          "reward_card": "card_s17_002"
        },
        {
          "id": "q_s17_007",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "如果 agent 在 IDLE 阶段发现邮箱中有一条来自 lead 的「暂停所有任务」指令，同时任务板上有一个符合认领条件的任务，agent 应该怎么做？",
            "en": "If an agent in IDLE phase finds a 'pause all tasks' instruction from the lead in the mailbox, and there is an eligible task on the task board, what should the agent do?",
            "ja": "IDLE フェーズの agent がメールボックスに lead からの「すべてのタスクを一時停止」という指示を見つけ、タスクボードに適格なタスクがある場合、agent はどうすべきですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "先认领任务板上的任务，完成后再处理邮箱指令",
                "en": "First claim the task from the task board, then process the mailbox instruction after completion",
                "ja": "まずタスクボードからタスクを引き受け、完了後にメールボックスの指示を処理する"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "同时处理邮件和任务，不应该让 lead 等待",
                "en": "Handle both the email and task simultaneously, the lead shouldn't be kept waiting",
                "ja": "メールとタスクを同時に処理する、lead を待たせるべきではない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "优先处理邮箱中的「暂停」指令，不认领任务，等待进一步指示",
                "en": "Prioritize the 'pause' instruction in the mailbox, do not claim the task, and wait for further instructions",
                "ja": "メールボックスの「一時停止」指示を優先し、タスクを引き受けず、さらなる指示を待つ"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "忽略邮箱指令，因为任务板的优先级更高",
                "en": "Ignore the mailbox instruction because the task board has higher priority",
                "ja": "タスクボードの優先度が高いため、メールボックスの指示を無視する"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "先邮箱再任务板的原则决定了 agent 必须优先处理邮箱中的明确指令。lead 的「暂停所有任务」指令优先于自动认领逻辑，agent 应停止认领并等待进一步指示。",
            "en": "The 'mailbox first, task board second' principle means the agent must prioritize explicit instructions in the mailbox. The lead's 'pause all tasks' instruction takes priority over automatic claiming logic; the agent should stop claiming and wait for further instructions.",
            "ja": "「まずメールボックス」の原則により、agent はメールボックス内の明示的な指示を優先しなければなりません。lead の「すべてのタスクを一時停止」という指示は自動引き受けロジックより優先されます。"
          },
          "reward_card": "card_s17_002"
        },
        {
          "id": "q_s17_008",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在多 agent 系统中，「安全认领」（safe claim）需要满足哪几个条件？",
            "en": "In a multi-agent system, what conditions must be met for a 'safe claim'?",
            "ja": "マルチエージェントシステムにおいて、「安全な引き受け」に必要な条件はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "任务状态为 done，且已通过所有验证",
                "en": "Task status is done and has passed all validations",
                "ja": "タスクのステータスが done であり、すべての検証をパスしている"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "任务为 pending 状态、无主、无阻塞依赖、角色匹配，且写入时需加锁",
                "en": "Task is pending, unowned, has no blocking dependencies, role matches, and requires a lock when writing",
                "ja": "タスクが pending 状態、オーナーなし、ブロッキング依存なし、役割一致、書き込み時にロックが必要"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "任务 ID 最小，且 lead 已明确批准认领",
                "en": "Task has the lowest ID and has been explicitly approved by the lead",
                "ja": "タスク ID が最小であり、lead が明示的に承認している"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "任务创建时间最早，且已在邮箱中通知所有 teammate",
                "en": "Task was created earliest and all teammates have been notified via mailbox",
                "ja": "タスクが最も早く作成され、メールボックスですべての teammate に通知済み"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "安全认领需要满足 5 个条件：① 任务状态为 pending（未开始）；② 无主（owner 为空）；③ 无阻塞（所有依赖已完成）；④ 角色匹配（agent 的角色能处理该类任务）；⑤ 加锁写入（防止并发认领竞态）。",
            "en": "Safe claiming requires 5 conditions: ① Task status is pending (not started); ② No owner (owner is empty); ③ No blocking (all dependencies completed); ④ Role matches (agent's role can handle this task type); ⑤ Lock when writing (prevent concurrent claiming race conditions).",
            "ja": "安全な引き受けには 5 つの条件が必要です：① タスクのステータスが pending；② オーナーなし；③ ブロックなし（すべての依存が完了）；④ 役割一致；⑤ ロックして書き込み（並行引き受けの競合を防止）。"
          },
          "reward_card": "card_s17_003"
        },
        {
          "id": "q_s17_009",
          "type": "choice",
          "difficulty": 1,
          "stem": {
            "zh": "在多 agent 并发认领任务时，为什么需要「加锁」机制？",
            "en": "Why is a 'locking' mechanism needed when multiple agents claim tasks concurrently?",
            "ja": "複数の agent が同時にタスクを引き受けようとする場合、なぜ「ロック」機構が必要ですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "防止两个 agent 同时认领同一个任务，导致重复执行",
                "en": "Prevent two agents from claiming the same task simultaneously, causing duplicate execution",
                "ja": "2 つの agent が同じタスクを同時に引き受けて二重実行が発生するのを防ぐ"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "加快任务分配速度，让所有 agent 更快得到工作",
                "en": "Speed up task distribution so all agents get work faster",
                "ja": "タスク配分を高速化して、すべての agent がより早く作業を得られるようにする"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "确保 lead 能实时监控哪些任务被认领了",
                "en": "Ensure the lead can monitor in real-time which tasks have been claimed",
                "ja": "lead がどのタスクが引き受けられたかをリアルタイムで監視できるようにする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "记录每个 agent 的工作历史，方便后续审计",
                "en": "Record the work history of each agent for later auditing",
                "ja": "後の監査のために各 agent の作業履歴を記録する"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "在多 agent 并发环境下，多个 agent 可能同时看到同一个符合条件的任务并尝试认领。没有加锁机制会导致「竞态条件」（race condition）——两个 agent 都读到任务为无主状态，都写入自己的 owner，导致重复执行。",
            "en": "In a multi-agent concurrent environment, multiple agents may simultaneously see the same eligible task and try to claim it. Without a locking mechanism, a race condition occurs — two agents both read the task as unowned and both write their owner, causing duplicate execution.",
            "ja": "マルチエージェントの並行環境では、複数の agent が同じ適格タスクを同時に見て引き受けようとする可能性があります。ロック機構がないと競合状態が発生し、2 つの agent が両方ともタスクを未請求と読んで自分の owner を書き込み、二重実行が起こります。"
          },
          "reward_card": "card_s17_003"
        },
        {
          "id": "q_s17_010",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "以下哪种任务不满足「安全认领」条件，因此不应该被认领？",
            "en": "Which of the following tasks does NOT meet the 'safe claim' conditions and therefore should not be claimed?",
            "ja": "次のうち、「安全な引き受け」の条件を満たさず、引き受けるべきでないタスクはどれですか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "状态为 pending，owner 为空，但依赖任务 task-A 还未完成",
                "en": "Status is pending, owner is empty, but dependent task task-A has not been completed yet",
                "ja": "ステータスが pending、オーナーが空だが、依存タスク task-A がまだ完了していない"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "状态为 pending，owner 为空，无依赖，角色匹配",
                "en": "Status is pending, owner is empty, no dependencies, role matches",
                "ja": "ステータスが pending、オーナーが空、依存なし、役割一致"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "状态为 pending，owner 为空，依赖已全部完成，角色匹配",
                "en": "Status is pending, owner is empty, all dependencies completed, role matches",
                "ja": "ステータスが pending、オーナーが空、依存がすべて完了、役割一致"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "lead 发送消息确认可以认领，且状态为 pending",
                "en": "The lead sent a message confirming it can be claimed, and status is pending",
                "ja": "lead がメッセージで引き受け可能と確認し、ステータスが pending"
              }
            }
          ],
          "answer": "b",
          "explanation": {
            "zh": "安全认领要求任务的所有阻塞依赖都已完成（无阻塞）。选项 b 中依赖任务 task-A 还未完成，这意味着该任务被阻塞，即使状态是 pending 且无主也不能认领。",
            "en": "Safe claiming requires all blocking dependencies to be completed (no blocking). In option b, the dependent task task-A has not been completed, meaning this task is blocked — it cannot be claimed even if status is pending and there's no owner.",
            "ja": "安全な引き受けは、すべてのブロッキング依存が完了していること（ブロックなし）を要求します。選択肢 b では依存タスク task-A がまだ完了しておらず、タスクがブロックされているため、pending かつオーナーなしでも引き受けられません。"
          },
          "reward_card": "card_s17_003"
        },
        {
          "id": "q_s17_011",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "在高并发场景下，两个 agent 同时通过了「状态为 pending 且 owner 为空」的检查，都准备写入自己为 owner。以下哪种机制能正确解决这个竞态问题？",
            "en": "In a high-concurrency scenario, two agents simultaneously pass the 'status is pending and owner is empty' check and both prepare to write themselves as owner. Which mechanism correctly resolves this race condition?",
            "ja": "高並行シナリオで、2 つの agent が同時に「ステータスが pending かつオーナーが空」のチェックをパスし、両方が自分を owner として書き込もうとしています。この競合状態を正しく解決するメカニズムはどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "让两个 agent 都写入成功，然后由系统决定谁的认领有效",
                "en": "Allow both agents to write successfully, then let the system decide whose claim is valid",
                "ja": "両方の agent の書き込みを成功させ、システムがどちらの引き受けが有効かを決める"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "使用时间戳决定优先级，时间戳更早的 agent 获得任务",
                "en": "Use timestamps to determine priority, the agent with an earlier timestamp gets the task",
                "ja": "タイムスタンプで優先度を決め、タイムスタンプが早い agent がタスクを得る"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "通过乐观锁（版本号比对）或文件锁确保只有一个 agent 能写入成功",
                "en": "Use optimistic locking (version number comparison) or file locks to ensure only one agent can write successfully",
                "ja": "楽観的ロック（バージョン番号比較）またはファイルロックを使用して、1 つの agent だけが書き込みを成功できるようにする"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "由 lead 仲裁，两个 agent 都向 lead 发送认领请求，lead 决定谁得到任务",
                "en": "Have the lead arbitrate: both agents send claim requests to the lead, and the lead decides who gets the task",
                "ja": "lead が仲裁する：両方の agent が lead に引き受けリクエストを送り、lead がどちらにタスクが行くかを決める"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "解决并发认领竞态的标准方法是使用锁机制：乐观锁通过版本号比对（CAS 操作）确保只有版本匹配的写入成功；文件锁直接阻止并发写入。时间戳方法不可靠（时钟偏斜），让 lead 仲裁会引入额外延迟和单点瓶颈。",
            "en": "The standard solution for concurrent claiming race conditions is using lock mechanisms: optimistic locking uses version number comparison (CAS operations) to ensure only version-matching writes succeed; file locks directly prevent concurrent writes. Timestamp methods are unreliable (clock skew), and lead arbitration introduces extra latency and a single-point bottleneck.",
            "ja": "並行引き受けの競合状態を解決する標準的な方法はロック機構の使用です：楽観的ロックはバージョン番号比較（CAS 操作）を使い、バージョンが一致する書き込みのみ成功させます。"
          },
          "reward_card": "card_s17_003"
        },
        {
          "id": "q_s17_012",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个多 agent 系统中，agent B 认领了一个任务但在执行到一半时崩溃了，owner 字段依然是 B 的名字。其他 agent 应该如何处理这个任务？",
            "en": "In a multi-agent system, agent B claimed a task but crashed halfway through execution, and the owner field still shows B's name. How should other agents handle this task?",
            "ja": "マルチエージェントシステムで、agent B がタスクを引き受けたが実行途中でクラッシュし、owner フィールドにはまだ B の名前があります。他の agent はこのタスクをどう処理すべきですか？"
          },
          "options": [
            {
              "id": "d",
              "text": {
                "zh": "系统需要心跳检测或超时机制释放锁，其他 agent 才能安全认领",
                "en": "The system needs heartbeat detection or timeout mechanisms to release the lock before other agents can safely claim it",
                "ja": "システムはハートビート検出またはタイムアウト機構でロックを解放する必要があり、その後で他の agent が安全に引き受けられる"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "直接忽略 owner 字段，立即认领该任务",
                "en": "Ignore the owner field directly and immediately claim the task",
                "ja": "owner フィールドを無視して、すぐにタスクを引き受ける"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "检测到任务状态为 in_progress 就跳过，永远不能被重新认领",
                "en": "Skip when the task status is detected as in_progress; it can never be re-claimed",
                "ja": "タスクのステータスが in_progress と検出されたらスキップし、永遠に再引き受けできない"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "向 lead 报告任务可能卡住，等待 lead 手动清除 owner",
                "en": "Report to the lead that the task may be stuck and wait for the lead to manually clear the owner",
                "ja": "lead にタスクが詰まっている可能性を報告し、lead が手動で owner をクリアするのを待つ"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "崩溃的 agent 留下了「幽灵 owner」（ghost owner），导致任务被锁死。正确的解决方案是系统级的心跳检测（agent 定期续约）或超时机制（超过阈值自动释放 owner），这样其他 agent 才能安全接手。直接忽略 owner 会破坏互斥保证；永不重认领会导致任务丢失；手动清除依赖 lead 干预，无法自动恢复。",
            "en": "A crashed agent leaves a 'ghost owner', causing the task to be locked. The correct solution is system-level heartbeat detection (agent periodically renews) or timeout mechanism (automatically releases owner after threshold), allowing other agents to safely take over. Ignoring owner breaks mutual exclusion; never re-claiming causes task loss; manual clearing requires lead intervention.",
            "ja": "クラッシュした agent は「ゴーストオーナー」を残し、タスクをロックします。正しい解決策はシステムレベルのハートビート検出（agent が定期的に更新）またはタイムアウト機構（閾値を超えると自動で owner を解放）で、他の agent が安全に引き継げるようにすることです。"
          },
          "reward_card": "card_s17_003"
        },
        {
          "id": "q_s17_013",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "在自治 agent 系统中，「身份重注入」（identity re-injection）是为了解决什么问题？",
            "en": "In autonomous agent systems, what problem does 'identity re-injection' solve?",
            "ja": "自律エージェントシステムにおいて、「アイデンティティ再注入」はどの問題を解決するためのものですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "agent 认领了不属于自己角色的任务，需要重新验证身份",
                "en": "An agent claimed a task not belonging to its role and needs to re-verify identity",
                "ja": "agent が自分の役割に属さないタスクを引き受け、アイデンティティの再検証が必要になった"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "上下文压缩后 agent 可能忘记自己是谁和应该遵守哪些规则，需要在恢复前重新注入身份块",
                "en": "After context compression, the agent may forget who it is and what rules to follow, requiring identity block re-injection before resuming",
                "ja": "コンテキスト圧縮後に agent が自分が誰で、どのルールに従うべきかを忘れる可能性があり、再開前にアイデンティティブロックの再注入が必要"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "每次新建 agent 实例时都需要分配唯一 ID，防止 ID 冲突",
                "en": "Every time a new agent instance is created, a unique ID must be assigned to prevent ID conflicts",
                "ja": "新しい agent インスタンスを作成するたびに一意の ID を割り当てて ID の競合を防ぐ必要がある"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "多个 agent 同时在线时需要广播各自身份，让其他 agent 知道谁在系统中",
                "en": "When multiple agents are online simultaneously, they need to broadcast their identities so other agents know who is in the system",
                "ja": "複数の agent が同時にオンラインの場合、それぞれのアイデンティティをブロードキャストして他の agent が誰がシステムにいるかを知れるようにする必要がある"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "长时间运行的 agent 会经历上下文压缩（context compression），压缩会截断早期的系统提示，导致 agent 可能「忘记」自己的角色、规则和限制。身份重注入是在恢复工作（从 IDLE 切换回 WORK）前，将包含角色、规则等关键信息的身份块重新插入上下文的做法。",
            "en": "Long-running agents experience context compression, which truncates early system prompts, causing the agent to potentially 'forget' its role, rules, and constraints. Identity re-injection is the practice of re-inserting the identity block (containing role, rules, and key information) into context before resuming work (switching from IDLE back to WORK).",
            "ja": "長時間動作する agent はコンテキスト圧縮を経験し、初期のシステムプロンプトが切り詰められて、agent が自分の役割、ルール、制約を「忘れる」可能性があります。アイデンティティ再注入は、作業再開前（IDLE から WORK に切り替える前）に、役割やルールなどの重要情報を含むアイデンティティブロックをコンテキストに再挿入する実践です。"
          },
          "reward_card": "card_s17_004"
        },
        {
          "id": "q_s17_014",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "身份重注入中的「身份块」通常包含哪些内容？",
            "en": "What does the 'identity block' in identity re-injection typically contain?",
            "ja": "アイデンティティ再注入の「アイデンティティブロック」には通常何が含まれますか？"
          },
          "options": [
            {
              "id": "b",
              "text": {
                "zh": "agent 的任务历史记录和已完成的工作列表",
                "en": "The agent's task history and list of completed work",
                "ja": "agent のタスク履歴と完了した作業のリスト"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "当前任务的详细描述和预期输出",
                "en": "Detailed description of the current task and expected output",
                "ja": "現在のタスクの詳細な説明と期待される出力"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "agent 的角色定义、行为规则、权限边界等关键约束信息",
                "en": "Key constraint information including agent's role definition, behavioral rules, and permission boundaries",
                "ja": "agent の役割定義、行動ルール、権限境界などの重要な制約情報"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "系统中所有其他 agent 的 ID 和联系方式",
                "en": "IDs and contact information of all other agents in the system",
                "ja": "システム内の他のすべての agent の ID と連絡先情報"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "身份块（identity block）是一段固定的提示文本，包含 agent 的角色定义（我是谁）、行为规则（我应该做什么/不做什么）、权限边界（我能访问哪些工具/数据）等关键约束。这些是最容易在上下文压缩中被截断的早期系统提示内容。",
            "en": "The identity block is a fixed prompt text containing the agent's role definition (who I am), behavioral rules (what I should/shouldn't do), permission boundaries (what tools/data I can access), and other key constraints. These are the early system prompt contents most likely to be truncated during context compression.",
            "ja": "アイデンティティブロックは、agent の役割定義（私は誰か）、行動ルール（何をすべき・すべきでないか）、権限境界（どのツール・データにアクセスできるか）などの重要な制約を含む固定のプロンプトテキストです。"
          },
          "reward_card": "card_s17_004"
        },
        {
          "id": "q_s17_015",
          "type": "choice",
          "difficulty": 2,
          "stem": {
            "zh": "为什么身份重注入需要在 agent 恢复工作（从 IDLE 切换回 WORK）之前进行，而不是在 WORK 阶段中途进行？",
            "en": "Why does identity re-injection need to happen before the agent resumes work (switching from IDLE back to WORK), rather than in the middle of the WORK phase?",
            "ja": "なぜアイデンティティ再注入は、エージェントが作業を再開する前（IDLE から WORK に切り替える前）に行う必要があり、WORK フェーズの途中ではないのですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "WORK 阶段中途无法修改上下文，技术上不可实现",
                "en": "Context cannot be modified in the middle of the WORK phase, technically infeasible",
                "ja": "WORK フェーズの途中ではコンテキストを変更できず、技術的に実現不可能"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "中途注入会导致 agent 忘记当前任务的进度",
                "en": "Mid-phase injection would cause the agent to forget the current task's progress",
                "ja": "途中で注入すると agent が現在のタスクの進捗を忘れる"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "防止 agent 在身份缺失状态下开始执行，避免因「忘记规则」而产生越权行为",
                "en": "Prevent the agent from starting execution in an identity-absent state, avoiding unauthorized behavior from 'forgetting rules'",
                "ja": "アイデンティティが欠如した状態で実行が開始されるのを防ぎ、「ルールを忘れる」ことによる権限外の行動を回避する"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "IDLE 阶段的计算资源更充足，适合进行身份注入操作",
                "en": "The IDLE phase has more computational resources, making it suitable for identity injection operations",
                "ja": "IDLE フェーズは計算リソースが豊富で、アイデンティティ注入操作に適している"
              }
            }
          ],
          "answer": "c",
          "explanation": {
            "zh": "身份重注入要在开始执行前完成，是为了防止 agent 在「身份缺失」状态下工作。如果先开始执行再注入，agent 可能在缺失关键约束（如权限边界、行为规则）的情况下操作，产生越权或错误行为。预先注入确保 agent 从一开始就在正确的约束下工作。",
            "en": "Identity re-injection must complete before execution begins to prevent the agent from working in an 'identity-absent' state. If execution starts before injection, the agent may operate without key constraints (such as permission boundaries and behavioral rules), causing unauthorized or erroneous behavior. Pre-injection ensures the agent works under correct constraints from the start.",
            "ja": "アイデンティティ再注入は実行開始前に完了する必要があります。これは agent が「アイデンティティ欠如」状態で作業するのを防ぐためです。先に実行を開始してから注入すると、重要な制約（権限境界、行動ルールなど）なしに操作が行われ、権限外または誤った行動が発生する可能性があります。"
          },
          "reward_card": "card_s17_004"
        },
        {
          "id": "q_s17_016",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "一个 agent 在长时间运行后，被要求执行一个超出其权限的操作，但它并没有拒绝，而是直接执行了。最可能的根本原因是？",
            "en": "After running for a long time, an agent is asked to perform an operation beyond its permissions but doesn't refuse and executes it directly. What is the most likely root cause?",
            "ja": "長時間動作した後、agent が権限を超えた操作を実行するよう求められたが、拒否せずに直接実行しました。最も可能性の高い根本原因はどれですか？"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "任务板数据损坏，导致权限检查失败",
                "en": "Task board data corruption caused permission check failure",
                "ja": "タスクボードのデータが破損して権限チェックが失敗した"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "lead 在运行时偷偷修改了该 agent 的权限",
                "en": "The lead secretly modified this agent's permissions at runtime",
                "ja": "lead が実行時にこの agent の権限をひそかに変更した"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "邮箱消息积压过多，导致系统超载",
                "en": "Too many mailbox messages backed up, causing system overload",
                "ja": "メールボックスのメッセージが溜まりすぎてシステムが過負荷になった"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "上下文压缩截断了包含权限约束的系统提示，身份块未重新注入",
                "en": "Context compression truncated the system prompt containing permission constraints, and the identity block was not re-injected",
                "ja": "コンテキスト圧縮が権限制約を含むシステムプロンプトを切り詰め、アイデンティティブロックが再注入されなかった"
              }
            }
          ],
          "answer": "d",
          "explanation": {
            "zh": "这是身份重注入缺失的典型症状。长时间运行导致上下文压缩，截断了早期的权限约束和角色边界定义。由于没有进行身份重注入，agent 在缺失这些关键约束的情况下运行，导致越权行为。这强调了每次从 IDLE 恢复 WORK 时都必须进行身份重注入的重要性。",
            "en": "This is a typical symptom of missing identity re-injection. Long runtime causes context compression, truncating early permission constraints and role boundary definitions. Without identity re-injection, the agent runs without these key constraints, leading to unauthorized behavior. This underscores the importance of identity re-injection every time resuming WORK from IDLE.",
            "ja": "これはアイデンティティ再注入が欠如している典型的な症状です。長時間の動作によりコンテキスト圧縮が起こり、初期の権限制約と役割境界定義が切り詰められます。アイデンティティ再注入なしに実行すると、これらの重要な制約なしに agent が動作し、権限外の行動につながります。"
          },
          "reward_card": "card_s17_004"
        },
        {
          "id": "q_s17_017",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "在完整的自治 agent 循环中，以下事件的正确执行顺序是？\n① 执行任务\n② 检查邮箱\n③ 身份重注入\n④ 认领任务",
            "en": "In a complete autonomous agent loop, what is the correct execution order of the following events?\n① Execute task\n② Check mailbox\n③ Identity re-injection\n④ Claim task",
            "ja": "完全な自律エージェントループにおいて、以下のイベントの正しい実行順序はどれですか？\n① タスクを実行する\n② メールボックスを確認する\n③ アイデンティティを再注入する\n④ タスクを引き受ける"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "zh": "② → ④ → ③ → ①",
                "en": "② → ④ → ③ → ①",
                "ja": "② → ④ → ③ → ①"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "③ → ② → ④ → ①",
                "en": "③ → ② → ④ → ①",
                "ja": "③ → ② → ④ → ①"
              }
            },
            {
              "id": "c",
              "text": {
                "zh": "① → ② → ③ → ④",
                "en": "① → ② → ③ → ④",
                "ja": "① → ② → ③ → ④"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "④ → ② → ③ → ①",
                "en": "④ → ② → ③ → ①",
                "ja": "④ → ② → ③ → ①"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "正确顺序是 ② → ④ → ③ → ①：先检查邮箱（获取明确指令，可能改变后续决策），再认领任务（从任务板选择合适任务），然后身份重注入（确保在正确约束下执行），最后执行任务。这对应了「先邮箱再任务板」和「恢复前重注入身份」两个核心原则。",
            "en": "The correct order is ② → ④ → ③ → ①: First check mailbox (get explicit instructions that may change subsequent decisions), then claim task (select appropriate task from task board), then identity re-injection (ensure execution under correct constraints), finally execute task. This corresponds to the two core principles: 'mailbox first, task board second' and 'inject identity before resuming'.",
            "ja": "正しい順序は ② → ④ → ③ → ① です：まずメールボックスを確認し（後続の決定を変える可能性のある明示的な指示を取得）、次にタスクを引き受け（タスクボードから適切なタスクを選択）、次にアイデンティティを再注入し（正しい制約のもとで実行を確保）、最後にタスクを実行します。"
          },
          "reward_card": "card_s17_004"
        },
        {
          "id": "q_s17_018",
          "type": "choice",
          "difficulty": 3,
          "stem": {
            "zh": "综合来看，s17 章节描述的自治 agent 系统与传统「lead 手动分配任务」模式相比，核心改进是什么？",
            "en": "Overall, what is the core improvement of the autonomous agent system described in chapter s17 compared to the traditional 'lead manually assigns tasks' model?",
            "ja": "総合的に見て、s17 章で説明されている自律エージェントシステムの従来の「lead が手動でタスクを割り当てる」モデルと比較した中心的な改善点は何ですか？"
          },
          "options": [
            {
              "id": "c",
              "text": {
                "zh": "减少了需要的 agent 数量，让一个 agent 就能完成所有工作",
                "en": "Reduced the number of agents needed, allowing one agent to complete all work",
                "ja": "必要な agent の数を減らして、1 つの agent がすべての作業を完了できるようにした"
              }
            },
            {
              "id": "b",
              "text": {
                "zh": "消除了任务板，改用纯消息传递来协调工作",
                "en": "Eliminated the task board, using pure message passing to coordinate work",
                "ja": "タスクボードを廃止し、純粋なメッセージパッシングで作業を調整するようにした"
              }
            },
            {
              "id": "a",
              "text": {
                "zh": "通过 WORK↔IDLE 循环、邮箱优先、安全认领和身份重注入，让 agent 能在不依赖 lead 每次手动分配的情况下持续自主运转",
                "en": "Through WORK↔IDLE loop, mailbox priority, safe claiming, and identity re-injection, agents can continuously and autonomously operate without depending on the lead to manually assign tasks each time",
                "ja": "WORK↔IDLE ループ、メールボックス優先、安全な引き受け、アイデンティティ再注入により、lead がその都度手動でタスクを割り当てることなく、agent が継続的に自律的に動作できるようにした"
              }
            },
            {
              "id": "d",
              "text": {
                "zh": "将所有协调逻辑移到云端，agent 本身不再需要任何决策能力",
                "en": "Moved all coordination logic to the cloud, agents no longer need any decision-making capability",
                "ja": "すべての調整ロジックをクラウドに移し、agent 自体はもはや意思決定能力を必要としない"
              }
            }
          ],
          "answer": "a",
          "explanation": {
            "zh": "s17 的核心贡献是将分散的 agent 协调机制（WORK↔IDLE 双阶段循环、邮箱优先处理、五条件安全认领、恢复前身份重注入）组合成一套完整的自治框架，使得 agent 能在无需 lead 持续干预的情况下有序自主运转，从而解放 lead 的精力。",
            "en": "The core contribution of s17 is combining distributed agent coordination mechanisms (WORK↔IDLE two-phase loop, mailbox-first processing, five-condition safe claiming, pre-resume identity re-injection) into a complete autonomous framework, enabling agents to operate orderly and autonomously without continuous lead intervention, thus freeing the lead's attention.",
            "ja": "s17 の中心的な貢献は、分散したエージェント調整メカニズム（WORK↔IDLE 2 フェーズループ、メールボックス優先処理、5 条件安全引き受け、再開前アイデンティティ再注入）を完全な自律フレームワークに組み合わせることで、lead の継続的な介入なしに agent が秩序立って自律的に動作できるようにしたことです。"
          },
          "reward_card": "card_s17_004"
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