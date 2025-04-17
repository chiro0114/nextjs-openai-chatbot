import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Page = () => {
  return (
    <div className="font-sans text-gray-800 relative">
      {/* ========= Hero Section ========= */}
      <header className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="text-blue-600">チャットボット</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="max-w-xl text-lg md:text-xl mb-2"
        >
          右下のアイコンをクリックして、チャットボットと会話を始めてください
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="max-w-xl text-lg md:text-xl mb-8"
        >
          このページのコードは
          <a
            href="https://github.com/chiro0114/stream-nextjs-demo"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHubリポジトリ
          </a>
          からご覧ください
        </motion.p>
        <ArrowDown className="animate-bounce" size={36} />
      </header>

      {/* ========= Features Section ========= */}
      <section className="min-h-[100vh] bg-white flex flex-col justify-center px-8 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '高速開発',
              desc: '最新のツールとフレームワークで時間を短縮。',
              icon: '⚡️',
            },
            {
              title: 'レスポンシブ',
              desc: 'どんなデバイスでも最適な体験を提供。',
              icon: '📱',
            },
            {
              title: '拡張性',
              desc: 'プロジェクト成長に合わせて柔軟に拡張可能。',
              icon: '🚀',
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-md hover:shadow-xl border"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========= Footer ========= */}
      <footer className="py-10 bg-gray-800 text-gray-200 text-center">
        <p className="mb-2">© 2025 Demo Company</p>
        <p className="text-sm">Crafted with React & Tailwind CSS</p>
      </footer>

      {/* ========= ChatBot ========= */}
    </div>
  );
};

export default Page;
