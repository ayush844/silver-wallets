"use client";

import { useState } from "react";

const MnemonicView = ({ words }: { words: string[] }) => {
  const [showWords, setShowWords] = useState(false);

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-yellow-400 font-medium">
          ⚠️ Save your recovery phrase securely
        </p>

        <button
          onClick={() => setShowWords(!showWords)}
          className="rounded-lg bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-400 hover:bg-yellow-500/20 transition"
        >
          {showWords ? "Hide" : "View"}
        </button>
      </div>

      {/* Mnemonic Grid */}
      <div
        className={`grid grid-cols-3 gap-3 transition-all duration-300 ${
          showWords ? "blur-0" : "blur-md select-none"
        }`}
      >
        {words.map((word, i) => (
          <div
            key={i}
            className="rounded-lg bg-zinc-100/80 py-2 text-center text-sm font-mono text-black shadow-inner"
          >
            {showWords ? word : "•••••"}
          </div>
        ))}
      </div>

      {/* Footer Hint */}
      {!showWords && (
        <p className="mt-4 text-xs text-zinc-400 text-center">
          Click <span className="text-yellow-400">View</span> to reveal your
          recovery phrase
        </p>
      )}
    </div>
  );
};

export default MnemonicView;
