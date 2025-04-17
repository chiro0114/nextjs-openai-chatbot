import { openai } from '@/app/openai';

export const runtime = 'nodejs';

// 新規スレッドを作成し、スレッドのIDを返却
export async function POST() {
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
}
