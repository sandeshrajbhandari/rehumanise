"use client"; // Needed for React hooks in Next.js (if using App Router)

import { useState } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative p-4 border rounded-lg bg-gray-100">
      
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition"
      >
        {copied ? "✅ Copied!" : "📋 Copy"}
      </button>
    </div>
  );
}