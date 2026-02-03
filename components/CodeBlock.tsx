import React from 'react';
import { Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  filename?: string;
  isBad?: boolean; // If true, style as "Rejected" or "Dangerous"
  highlightLines?: number[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, filename, isBad = false, highlightLines = [] }) => {
  const lines = code.split('\n');

  return (
    <div className={`rounded-lg overflow-hidden border ${isBad ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-slate-50'} my-4 transition-all duration-500 shadow-sm`}>
      {(filename) && (
        <div className={`px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center justify-between border-b ${isBad ? 'bg-red-100 border-red-200 text-red-700' : 'bg-blue-100 border-blue-200 text-blue-700'}`}>
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span>{filename}</span>
          </div>
          {isBad ? <span className="text-red-600 font-bold">DETECTED_PATTERN: AMNESIA</span> : <span className="text-emerald-600 font-bold">OPTIMIZED_PATTERN</span>}
        </div>
      )}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed relative text-slate-800">
        <pre>
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`
                ${highlightLines.includes(i + 1) ? (isBad ? 'bg-red-100 text-red-900 font-semibold' : 'bg-emerald-100 text-emerald-900 font-semibold') : 'text-slate-600'}
                px-2 -mx-2 rounded transition-colors duration-300
              `}
            >
              <span className="select-none opacity-40 w-6 inline-block text-right mr-4 text-slate-400">{i + 1}</span>
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};