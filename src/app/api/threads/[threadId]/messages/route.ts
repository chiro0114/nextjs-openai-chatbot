import { openai } from '@/app/openai';

export const runtime = 'nodejs';

const assistantId = process.env.OPENAI_ASSISTANT_ID || '';

// リクエストを元にストリームを返却する
export async function POST(
  request: Request,
  { params }: { params: Promise<{ threadId: string }> }
) {
  const { threadId } = await params;
  const { content } = await request.json();

  // 渡ってきたリクエストを元にユーザー側のメッセージを作成
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: content,
  });

  // アシスタント側からのメッセージをストリーミング形式取得
  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  // 取得したストリームをReadbleStreamに変換して返却
  return new Response(stream.toReadableStream());
}
