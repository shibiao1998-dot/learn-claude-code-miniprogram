module.exports = {
  "s01": {
    "version": "s01",
    "title": "The Agent Loop",
    "description": "A minimal agent that uses only bash to accomplish tasks",
    "steps": [
      {
        "type": "user_message",
        "content": "Create a file called hello.py that prints 'Hello, World!'",
        "annotation": "User sends a task to the agent"
      },
      {
        "type": "assistant_text",
        "content": "I'll create that file for you using bash.",
        "annotation": "The model decides to use its only tool: bash"
      },
      {
        "type": "tool_call",
        "content": "echo 'print(\"Hello, World!\")' > hello.py",
        "toolName": "bash",
        "annotation": "Tool call: the model generates a bash command"
      },
      {
        "type": "tool_result",
        "content": "",
        "toolName": "bash",
        "annotation": "Bash returns empty output (success)"
      },
      {
        "type": "assistant_text",
        "content": "Let me verify the file was created correctly.",
        "annotation": "The loop continues: model sees the result and decides next action"
      },
      {
        "type": "tool_call",
        "content": "cat hello.py",
        "toolName": "bash",
        "annotation": "Another bash call to verify"
      },
      {
        "type": "tool_result",
        "content": "print(\"Hello, World!\")",
        "toolName": "bash",
        "annotation": "File contents confirmed"
      },
      {
        "type": "assistant_text",
        "content": "Done! I've created hello.py with the print statement. You can run it with `python hello.py`.",
        "annotation": "stop_reason != 'tool_use' -> loop breaks, agent responds to user"
      }
    ]
  },
  "s02": {
    "version": "s02",
    "title": "Tools",
    "description": "Agent with read, write, edit, and bash tools",
    "steps": [
      {
        "type": "user_message",
        "content": "Add a function called greet(name) to hello.py",
        "annotation": "User requests a code modification"
      },
      {
        "type": "assistant_text",
        "content": "Let me read the current file first.",
        "annotation": "Model chooses read_file instead of bash cat"
      },
      {
        "type": "tool_call",
        "content": "hello.py",
        "toolName": "read_file",
        "annotation": "Dedicated read tool provides cleaner file access"
      },
      {
        "type": "tool_result",
        "content": "print(\"Hello, World!\")",
        "toolName": "read_file",
        "annotation": "File contents returned to the model"
      },
      {
        "type": "tool_call",
        "content": "hello.py\n---\ndef greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"World\")",
        "toolName": "write_file",
        "annotation": "write_file replaces the entire file content"
      },
      {
        "type": "tool_result",
        "content": "File written successfully",
        "toolName": "write_file",
        "annotation": "Write confirmed"
      },
      {
        "type": "assistant_text",
        "content": "I've updated hello.py with a greet(name) function that takes a name parameter.",
        "annotation": "4 tools beat 1: each tool has a clear, focused purpose"
      }
    ]
  },
  "s03": {
    "version": "s03",
    "title": "TodoWrite",
    "description": "Agent creates a visible plan before executing",
    "steps": [
      {
        "type": "user_message",
        "content": "Build a CLI calculator that supports add, subtract, multiply, divide",
        "annotation": "A multi-step task that benefits from planning"
      },
      {
        "type": "tool_call",
        "content": "[\n  { \"id\": 1, \"task\": \"Create calc.py with argument parsing\", \"status\": \"in_progress\" },\n  { \"id\": 2, \"task\": \"Implement 4 operations\", \"status\": \"pending\" },\n  { \"id\": 3, \"task\": \"Add error handling\", \"status\": \"pending\" },\n  { \"id\": 4, \"task\": \"Test all operations\", \"status\": \"pending\" }\n]",
        "toolName": "todo_write",
        "annotation": "TodoManager creates a visible plan BEFORE any code is written"
      },
      {
        "type": "tool_result",
        "content": "Todo list created with 4 tasks",
        "toolName": "todo_write",
        "annotation": "The plan is now visible and trackable"
      },
      {
        "type": "tool_call",
        "content": "calc.py\n---\nimport sys\n\ndef calculate(op, a, b):\n    ops = {'+': a+b, '-': a-b, '*': a*b, '/': a/b}\n    return ops.get(op, 'Unknown operator')\n\nif __name__ == '__main__':\n    a, op, b = float(sys.argv[1]), sys.argv[2], float(sys.argv[3])\n    print(calculate(op, a, b))",
        "toolName": "write_file",
        "annotation": "Executing task #1 and #2: create file with operations"
      },
      {
        "type": "tool_result",
        "content": "File written successfully",
        "toolName": "write_file",
        "annotation": "Code written"
      },
      {
        "type": "tool_call",
        "content": "python calc.py 10 + 5",
        "toolName": "bash",
        "annotation": "Executing task #4: testing"
      },
      {
        "type": "tool_result",
        "content": "15.0",
        "toolName": "bash",
        "annotation": "Test passes"
      },
      {
        "type": "assistant_text",
        "content": "Calculator built and tested. All 4 operations work correctly.",
        "annotation": "Visible plans improve task completion by making progress trackable"
      }
    ]
  },
  "s04": {
    "version": "s04",
    "title": "Subagents",
    "description": "Agent spawns a subagent for isolated subtask execution",
    "steps": [
      {
        "type": "user_message",
        "content": "Refactor the calculator: split into modules and add tests",
        "annotation": "Complex task suitable for delegation"
      },
      {
        "type": "assistant_text",
        "content": "I'll delegate the test writing to a subagent while I handle the refactoring.",
        "annotation": "Agent decides to split work using the Task tool"
      },
      {
        "type": "tool_call",
        "content": "Write unit tests for calc.py covering all 4 operations and edge cases like division by zero",
        "toolName": "task",
        "annotation": "Task tool spawns a subagent with its own isolated context"
      },
      {
        "type": "system_event",
        "content": "[Subagent spawned] Context: fresh messages[], same tools, scoped prompt",
        "annotation": "Subagent gets clean context -- no confusion from parent's conversation"
      },
      {
        "type": "tool_result",
        "content": "Created test_calc.py with 8 test cases. All passing.",
        "toolName": "task",
        "annotation": "Subagent completes and returns a summary to parent"
      },
      {
        "type": "tool_call",
        "content": "calc.py -> calc/operations.py, calc/cli.py",
        "toolName": "write_file",
        "annotation": "Parent continues with its own task: refactoring"
      },
      {
        "type": "tool_result",
        "content": "Files written successfully",
        "toolName": "write_file",
        "annotation": "Modules split"
      },
      {
        "type": "assistant_text",
        "content": "Refactored into calc/operations.py and calc/cli.py. Tests were written by a subagent and are all passing.",
        "annotation": "Context isolation prevents confusion between tasks"
      }
    ]
  },
  "s05": {
    "version": "s05",
    "title": "Skills",
    "description": "Agent loads external knowledge from SKILL.md files",
    "steps": [
      {
        "type": "user_message",
        "content": "Set up a new Next.js project with TypeScript",
        "annotation": "Task requires framework-specific knowledge"
      },
      {
        "type": "system_event",
        "content": "[SkillLoader] Scanning for SKILL.md files... Found: nextjs.SKILL.md",
        "annotation": "SkillLoader finds a matching skill file before the loop runs"
      },
      {
        "type": "system_event",
        "content": "[Skill injected] nextjs.SKILL.md -> tool_result message appended",
        "annotation": "Skill content is injected as a tool_result, not bloating the system prompt"
      },
      {
        "type": "assistant_text",
        "content": "I have knowledge about Next.js setup. Let me create the project structure.",
        "annotation": "Model now has framework-specific knowledge from the skill file"
      },
      {
        "type": "tool_call",
        "content": "npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir",
        "toolName": "bash",
        "annotation": "Using skill-provided knowledge for correct flags"
      },
      {
        "type": "tool_result",
        "content": "Success! Created my-app at /workspace/my-app",
        "toolName": "bash",
        "annotation": "Project created with correct configuration"
      },
      {
        "type": "assistant_text",
        "content": "Next.js project created with TypeScript, Tailwind CSS, ESLint, App Router, and src/ directory.",
        "annotation": "Skills inject via tool_result, not system prompt -- keeping context lean"
      }
    ]
  },
  "s06": {
    "version": "s06",
    "title": "Compact",
    "description": "Agent compresses context when tokens exceed threshold",
    "steps": [
      {
        "type": "user_message",
        "content": "Analyze all Python files in this project and summarize each one",
        "annotation": "A task that will generate large amounts of context"
      },
      {
        "type": "tool_call",
        "content": "find . -name '*.py' -type f",
        "toolName": "bash",
        "annotation": "Finding all files to analyze"
      },
      {
        "type": "tool_result",
        "content": "./src/main.py\n./src/utils.py\n./src/models.py\n./tests/test_main.py\n... (28 more files)",
        "toolName": "bash",
        "annotation": "32 files found -- reading all of them will generate massive context"
      },
      {
        "type": "assistant_text",
        "content": "I'll read and analyze each file systematically.",
        "annotation": "Agent begins processing files one by one"
      },
      {
        "type": "tool_call",
        "content": "./src/main.py",
        "toolName": "read_file",
        "annotation": "Reading file 1 of 32..."
      },
      {
        "type": "tool_result",
        "content": "[... 450 lines of code ...]",
        "toolName": "read_file",
        "annotation": "Large file content added to messages[]"
      },
      {
        "type": "system_event",
        "content": "[ContextManager] Token count: 148,231 / 150,000 threshold\nTriggering 3-layer compression:\n  1. Drop tool_result content > 1000 chars -> replaced with summary\n  2. Merge sequential assistant turns\n  3. Summarize oldest 50% of conversation\nResult: 148,231 -> 42,087 tokens",
        "annotation": "Compression fires automatically when approaching the limit"
      },
      {
        "type": "assistant_text",
        "content": "Continuing analysis with compressed context. Files 1-18 have been summarized, proceeding with remaining files.",
        "annotation": "Forgetting old tool results enables infinite work -- the agent can process any number of files"
      }
    ]
  },
  "s07": {
    "version": "s07",
    "title": "Tasks",
    "description": "Agent uses persistent file-based tasks with dependencies",
    "steps": [
      {
        "type": "user_message",
        "content": "Build a REST API with user auth, database, and deployment config",
        "annotation": "Multi-part task requiring dependency tracking"
      },
      {
        "type": "tool_call",
        "content": "create_task(\"Set up database schema\", deps=[])\ncreate_task(\"Implement user model\", deps=[1])\ncreate_task(\"Add auth endpoints\", deps=[2])\ncreate_task(\"Write deployment config\", deps=[3])",
        "toolName": "task_manager",
        "annotation": "TaskManager creates file-based tasks with explicit dependencies"
      },
      {
        "type": "tool_result",
        "content": "Created 4 tasks in .tasks/\n  #1 Set up database schema [ready]\n  #2 Implement user model [blocked by #1]\n  #3 Add auth endpoints [blocked by #2]\n  #4 Write deployment config [blocked by #3]",
        "toolName": "task_manager",
        "annotation": "Tasks persisted to .tasks/ directory as JSON files"
      },
      {
        "type": "tool_call",
        "content": "schema.sql\n---\nCREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT);",
        "toolName": "write_file",
        "annotation": "Working on task #1"
      },
      {
        "type": "tool_result",
        "content": "File written successfully",
        "toolName": "write_file",
        "annotation": "Schema created"
      },
      {
        "type": "tool_call",
        "content": "complete_task(1)",
        "toolName": "task_manager",
        "annotation": "Completing task #1 automatically unblocks task #2"
      },
      {
        "type": "tool_result",
        "content": "Task #1 completed. Task #2 is now ready.",
        "toolName": "task_manager",
        "annotation": "File-based persistence outlives process memory"
      },
      {
        "type": "assistant_text",
        "content": "Database schema is done. Moving to user model implementation.",
        "annotation": "Dependency graph ensures tasks execute in correct order"
      }
    ]
  },
  "s08": {
    "version": "s08",
    "title": "Background Tasks",
    "description": "Agent executes long-running tasks in background threads",
    "steps": [
      {
        "type": "user_message",
        "content": "Run the test suite and while it's running, fix the linting errors",
        "annotation": "Two tasks that can run concurrently"
      },
      {
        "type": "assistant_text",
        "content": "I'll start the tests in the background and fix linting in parallel.",
        "annotation": "Agent recognizes opportunity for concurrent execution"
      },
      {
        "type": "tool_call",
        "content": "pytest tests/ -v --timeout=300",
        "toolName": "background_task",
        "annotation": "BackgroundManager spawns a thread for long-running test suite"
      },
      {
        "type": "system_event",
        "content": "[BackgroundManager] Thread spawned: task_001\nRunning: pytest tests/ -v --timeout=300\nStatus: in_progress",
        "annotation": "Thread is running independently -- main loop continues"
      },
      {
        "type": "tool_result",
        "content": "Background task started: task_001",
        "toolName": "background_task",
        "annotation": "Control returns immediately to the agent"
      },
      {
        "type": "tool_call",
        "content": "ruff check --fix .",
        "toolName": "bash",
        "annotation": "Agent works on linting while tests run in background"
      },
      {
        "type": "tool_result",
        "content": "Fixed 12 linting errors in 5 files",
        "toolName": "bash",
        "annotation": "Linting fixed concurrently with tests"
      },
      {
        "type": "system_event",
        "content": "[Notification] Background task_001 completed\nResult: 47 tests passed, 2 failed\nFailed: test_auth.py::test_token_expiry, test_api.py::test_rate_limit",
        "annotation": "Background thread notifies main loop via notification queue"
      },
      {
        "type": "assistant_text",
        "content": "Linting is fixed. Tests finished: 47 passed, 2 failed. I'll fix the failing tests now.",
        "annotation": "Non-blocking execution via threads + queue enables parallel work"
      }
    ]
  },
  "s09": {
    "version": "s09",
    "title": "Agent Teams",
    "description": "Persistent teammates communicate via JSONL inboxes",
    "steps": [
      {
        "type": "user_message",
        "content": "Build a full-stack app: frontend in React, backend in Python, with tests",
        "annotation": "Large task requiring team collaboration"
      },
      {
        "type": "tool_call",
        "content": "spawn_teammate(\n  name: \"frontend-dev\",\n  role: \"React specialist\"\n)\nspawn_teammate(\n  name: \"backend-dev\",\n  role: \"Python API specialist\"\n)",
        "toolName": "teammate_manager",
        "annotation": "Unlike subagents (s04) that die after one task, teammates persist"
      },
      {
        "type": "system_event",
        "content": "[TeammateManager] Team created:\n  .team/config.json written\n  frontend-dev [idle] - own thread, own agent loop\n  backend-dev [idle] - own thread, own agent loop",
        "annotation": "Each teammate runs its own while(tool_use) loop in a separate thread"
      },
      {
        "type": "tool_call",
        "content": "send_message(\n  to: \"backend-dev\",\n  content: \"Build the user API: GET/POST /users\"\n)",
        "toolName": "send_message",
        "annotation": "Message appended to .team/inbox/backend-dev.jsonl"
      },
      {
        "type": "system_event",
        "content": "[backend-dev] Checking inbox... 1 new message\n  From: lead\n  Content: \"Build the user API: GET/POST /users\"\n  (inbox drained after read)",
        "annotation": "Inbox is read-then-clear: prevents duplicate processing"
      },
      {
        "type": "system_event",
        "content": "[backend-dev -> frontend-dev] Reply via inbox:\n  \"API ready: GET /users, POST /users, GET /users/:id\"\n  Written to .team/inbox/frontend-dev.jsonl",
        "annotation": "Teammates message each other through the same JSONL mechanism"
      },
      {
        "type": "assistant_text",
        "content": "Team is communicating via file-based inboxes. Each teammate has its own .jsonl file -- append to send, drain to read.",
        "annotation": "JSONL inboxes decouple sender timing from receiver timing"
      }
    ]
  },
  "s10": {
    "version": "s10",
    "title": "Team Protocols",
    "description": "Request-response protocols for shutdown and plan approval",
    "steps": [
      {
        "type": "user_message",
        "content": "Work is done. Shut down the team gracefully.",
        "annotation": "Can't just kill threads -- need coordinated shutdown"
      },
      {
        "type": "tool_call",
        "content": "shutdown_request(\n  teammate: \"backend-dev\",\n  request_id: \"req_abc123\"\n)",
        "toolName": "shutdown_teammate",
        "annotation": "request_id correlates the request with the response"
      },
      {
        "type": "system_event",
        "content": "[Shutdown FSM] req_abc123: pending\n  Lead -> backend-dev inbox:\n  { type: \"shutdown_request\", request_id: \"req_abc123\" }",
        "annotation": "FSM tracks state: pending -> approved | rejected"
      },
      {
        "type": "system_event",
        "content": "[backend-dev] Received shutdown request req_abc123\n  Current task: none (idle)\n  Decision: approve\n  -> lead inbox: { type: \"shutdown_response\", request_id: \"req_abc123\", approve: true }",
        "annotation": "Teammate decides whether to approve based on its own state"
      },
      {
        "type": "system_event",
        "content": "[Shutdown FSM] req_abc123: approved\n  backend-dev thread stopped\n  Status: idle -> shutdown",
        "annotation": "Same request_id pattern works for plan approval too"
      },
      {
        "type": "assistant_text",
        "content": "backend-dev shut down gracefully. The same request_id + FSM pattern handles plan approval: teammate submits plan, lead approves/rejects with the correlated request_id.",
        "annotation": "One pattern (request_id correlation), two applications (shutdown + plan approval)"
      }
    ]
  },
  "s11": {
    "version": "s11",
    "title": "Autonomous Agents",
    "description": "Teammates self-govern with idle cycles and auto-claiming",
    "steps": [
      {
        "type": "user_message",
        "content": "Implement the full feature backlog",
        "annotation": "Open-ended task for autonomous team execution"
      },
      {
        "type": "tool_call",
        "content": "create_tasks([\n  { title: \"User authentication\", status: \"open\" },\n  { title: \"Dashboard UI\", status: \"open\" },\n  { title: \"API rate limiting\", status: \"open\" },\n  { title: \"Integration tests\", status: \"open\" }\n])",
        "toolName": "task_manager",
        "annotation": "Tasks created with no owner -- available for auto-claiming"
      },
      {
        "type": "tool_result",
        "content": "4 tasks created on shared board",
        "toolName": "task_manager",
        "annotation": "Unassigned tasks visible to all teammates"
      },
      {
        "type": "system_event",
        "content": "[frontend-dev] Idle cycle triggered\n  1. Check inbox -> 0 messages\n  2. Poll task board -> found unowned task #2 \"Dashboard UI\"\n  3. Auto-claim task #2\n  4. Status: idle -> working",
        "annotation": "Idle cycle: check inbox, poll tasks, auto-claim, resume work"
      },
      {
        "type": "system_event",
        "content": "[backend-dev] Idle cycle triggered\n  1. Check inbox -> 0 messages\n  2. Poll task board -> found unowned task #1 \"User authentication\"\n  3. Auto-claim task #1\n  4. Status: idle -> working",
        "annotation": "Multiple teammates claim different tasks concurrently"
      },
      {
        "type": "system_event",
        "content": "[tester] Idle cycle triggered\n  1. Check inbox -> 0 messages\n  2. Poll task board -> task #4 blocked by #1, #2, #3\n  3. No claimable tasks\n  4. Status: idle (will retry in 30s)",
        "annotation": "Timeout-based polling prevents busy-waiting"
      },
      {
        "type": "assistant_text",
        "content": "Team is self-organizing: frontend-dev claimed Dashboard UI, backend-dev claimed User auth. Tester is waiting for dependencies to clear.",
        "annotation": "Polling + timeout makes teammates autonomous -- no micromanagement needed"
      }
    ]
  },
  "s12": {
    "version": "s12",
    "title": "Worktree + Task Isolation",
    "description": "Use a shared task board with optional worktree lanes for clean parallel execution",
    "steps": [
      {
        "type": "user_message",
        "content": "Implement auth refactor and login UI updates in parallel",
        "annotation": "Two active tasks in one workspace would collide"
      },
      {
        "type": "tool_call",
        "content": "task_create(subject: \"Auth refactor\")\ntask_create(subject: \"Login UI polish\")",
        "toolName": "task_manager",
        "annotation": "Shared board remains the coordination source of truth"
      },
      {
        "type": "tool_call",
        "content": "worktree_create(name: \"auth-refactor\", task_id: 1)\nworktree_create(name: \"ui-login\")\ntask_bind_worktree(task_id: 2, worktree: \"ui-login\")",
        "toolName": "worktree_manager",
        "annotation": "Lane allocation and task association are composable; task 2 binds after lane creation"
      },
      {
        "type": "system_event",
        "content": "worktree.create.before/after emitted\n.tasks/task_1.json -> { status: \"in_progress\", worktree: \"auth-refactor\" }\n.tasks/task_2.json -> { status: \"in_progress\", worktree: \"ui-login\" }\n.worktrees/index.json updated",
        "annotation": "Control-plane state remains canonical; hook-style consumers can react to lifecycle events without owning canonical state writes"
      },
      {
        "type": "tool_call",
        "content": "worktree_run(name: \"auth-refactor\", command: \"pytest tests/auth -q\")\nworktree_run(name: \"ui-login\", command: \"npm test -- login\")",
        "toolName": "worktree_run",
        "annotation": "In this teaching runtime, commands route by lane-scoped cwd; other runtimes may use session-level directory switches. The invariant is explicit execution context."
      },
      {
        "type": "tool_call",
        "content": "worktree_keep(name: \"ui-login\")\nworktree_remove(name: \"auth-refactor\", complete_task: true)\nworktree_events(limit: 10)",
        "toolName": "worktree_manager",
        "annotation": "Closeout is explicit tool-driven state transition: mix keep/remove decisions and query lifecycle events in one pass"
      },
      {
        "type": "system_event",
        "content": "worktree.keep emitted for ui-login\nworktree.remove.before/after emitted for auth-refactor\ntask.completed emitted for #1\n.worktrees/events.jsonl appended",
        "annotation": "Lifecycle transitions become explicit records while task/worktree files remain source-of-truth"
      },
      {
        "type": "assistant_text",
        "content": "Task board handles coordination, worktrees handle isolation. Parallel tracks stay clean and auditable.",
        "annotation": "Coordinate in one board, isolate by lane only where needed, and run optional policy/audit side effects from lifecycle events"
      }
    ]
  }
};
