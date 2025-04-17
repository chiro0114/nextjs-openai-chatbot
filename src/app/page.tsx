'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import Page from './components/page/page';
import AnimationWrapper from './components/chatbot/animation-wrapper';
import FloatingButton from './components/chatbot/floating-button';
import { AssistantStream } from 'openai/lib/AssistantStream.mjs';
import { TextDelta } from 'openai/resources/beta/threads/messages.mjs';

export default function Home() {
  return (
    <>
      {/*チャットボット背景のページ */}
      <Page />
      {/*チャットボット */}
      <ChatBot />
    </>
  );
}

type Role = 'user' | 'assistant';

type Message = {
  role: Role;
  text: string;
};

const ChatBot = () => {
  /* モーダルの開閉状態 */
  const [open, setOpen] = useState(false);

  /* 表示するチャットメッセージ */
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'こんにちは！ご用件をお聞かせください。' },
  ]);

  /* 入力欄 */
  const [userInput, setUserInput] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState('');

  // メッセージを表示する要素に一番下の要素を取得
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // メッセージが更新される度に一番下の要素までスクロール
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // コンポーネントの初回レンダリング時にスレッドIDを取得して保存
  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/threads`, {
        method: 'POST',
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  const sendMessage = async (text: string) => {
    const response = await fetch(`/api/threads/${threadId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        content: text,
      }),
    });

    if (!response.body) return;

    // response.bodyをfromReadableStreamに渡してopenai側の仕様にのっとって
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    sendMessage(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', text: userInput },
    ]);
    setUserInput('');
    setInputDisabled(true);
    scrollToBottom();
  };

  const handleRunCompleted = () => {
    // ストリーミングが完了したら送信ボタンを活性化
    setInputDisabled(false);
  };

  const handleReadableStream = (stream: AssistantStream) => {
    // ストリーミングを行う準備が出来た時に実行
    stream.on('textCreated', handleTextCreated);

    // ストリームが渡ってくる度に実行
    stream.on('textDelta', handleTextDelta);

    // onメソッドの第一引数に定義されていないイベントをハンドリング
    stream.on('event', (event) => {
      // ストリームが完了した時に実行
      if (event.event === 'thread.run.completed') handleRunCompleted();
    });
  };

  const handleTextCreated = () => {
    appendMessage('assistant', '');
  };

  const handleTextDelta = (delta: TextDelta) => {
    if (delta.value != null) {
      appendToLastMessage(delta.value);
    }
  };

  // ストリームでテキストが渡ってくる度に実行する関数
  const appendToLastMessage = (text?: string) => {
    setMessages((prevMessages) => {
      // messagesの最後の要素を取得
      const lastMessage = prevMessages[prevMessages.length - 1];

      // 渡ってきたtext既存のテキストを更新
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };

      // messagesの最後の要素を削除して、更新後の要素を追加
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  // サーバー側でストリーミングの準備ができたときに実行する関数
  const appendMessage = (role: Role, text: string) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  return (
    <>
      {open && (
        <AnimationWrapper>
          <div className="p-4 font-semibold border-b">ChatBot</div>
          {/* メッセージリスト */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
            {messages.map((m, i) => (
              <Message role={m.role} key={i}>
                {m.text}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* 入力欄 */}
          <div className="p-3 border-t">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="メッセージを入力"
                className="flex-1 rounded-full border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2"
                aria-label="send"
                disabled={inputDisabled}
              >
                <SendHorizontal size={20} />
              </button>
            </form>
          </div>
        </AnimationWrapper>
      )}

      {/* --- モーダルの開閉を制御するボタン --- */}
      <FloatingButton onClick={() => setOpen(!open)} />
    </>
  );
};

type MessageProps = {
  role: Role;
  children: React.ReactNode;
};

const Message = ({ role, children }: MessageProps) => {
  return (
    <div
      className={`max-w-[80%] w-fit rounded-2xl px-3 py-2 text-sm ${
        role === 'user'
          ? 'bg-blue-500 text-white ml-auto'
          : 'bg-gray-200 text-gray-900'
      }`}
    >
      {children}
    </div>
  );
};
