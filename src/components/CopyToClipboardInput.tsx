'use client';

import { useState } from 'react';

interface CopyToClipboardProps {
  value: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy!', err);
      });
  };

  return (
    <div className="copy-container">
      <input
        className="copy-input"
        value={copied ? "Copied!" : value}
        readOnly
      />
      <button className="copy-button" onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyToClipboard;
