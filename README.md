
# チャットボットの実装デモページ

このリポジトリはOpenAI公式が公開している[openai-assistants-quickstart](
https://github.com/openai/openai-assistants-quickstart)の実装を参考にし、これからチャットボットを実装したい方が迷わないよう最小限の構成となっています。
また、企業からのチャットボット制作を依頼された想定のレイアウトとなっています。


## セットアップ

### 1.  リポジトリのクローン

```shell
git https://github.com/chiro0114/nextjs-openai-chatbot.git
cd nextjs-openai-chatbot
```

### .env.exampleを複製し、.envに環境変数を設定

```shell
cp .env.example .env
```

.envにはOPENAI_API_KEYとOPENAI_ASSISTANT_IDを[OpenAI API](https://platform.openai.com/)から入手して入力してください。


### 3. 依存関係のインストール

```shell
npm install
```

### 4. 開発環境起動

```shell
npm run dev
```

