import React from 'react';
import { Lightbulb, Pin, Globe, AlertTriangle, ArrowRight } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Parses inline formatting like **bold**, *italic*, and `code`
 */
function parseInline(text: string): React.ReactNode[] {
  // Regex to match **bold**, `code`, and normal text
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-burgundy-dark">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="font-mono text-xs px-1.5 py-0.5 rounded bg-cream-warm border border-burgundy-border/40 text-burgundy font-semibold"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-charcoal">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Split into block sections
  const blocks = content.split(/\n{2,}/);

  return (
    <div className={`space-y-4 text-charcoal leading-relaxed font-sans ${className}`}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Clean Horizontal Dividers
        if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
          return <hr key={idx} className="border-t border-cream-border my-6" />;
        }

        // 2. Headings (### or ## or #)
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace(/^###\s+/, '');
          return (
            <h3
              key={idx}
              className="font-serif text-lg sm:text-xl font-bold text-burgundy-dark mt-6 mb-2 pb-1 border-b border-burgundy-border/30 flex items-center gap-2"
            >
              <span>{headingText}</span>
            </h3>
          );
        }

        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.replace(/^##\s+/, '');
          return (
            <h2
              key={idx}
              className="font-serif text-xl sm:text-2xl font-bold text-burgundy-dark mt-8 mb-3 pb-1.5 border-b-2 border-burgundy/20"
            >
              {headingText}
            </h2>
          );
        }

        if (trimmed.startsWith('# ')) {
          const headingText = trimmed.replace(/^#\s+/, '');
          return (
            <h1 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark mt-4 mb-3">
              {headingText}
            </h1>
          );
        }

        // 3. Process Flowchart lines (contains "→")
        if (trimmed.includes('→') && !trimmed.includes('\n')) {
          const steps = trimmed.split('→').map(s => s.trim());
          if (steps.length >= 3) {
            return (
              <div key={idx} className="my-5 p-4 rounded-2xl bg-cream-warm border border-burgundy-border/60 shadow-sm">
                <span className="text-[10px] font-mono uppercase font-bold text-burgundy tracking-wider block mb-2.5">
                  Process Sequence Flow
                </span>
                <div className="flex items-center flex-wrap gap-2">
                  {steps.map((step, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <span className="px-3 py-1.5 rounded-xl bg-white border border-burgundy-border/50 text-xs font-semibold text-burgundy-dark shadow-xs flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-burgundy-light text-burgundy text-[10px] flex items-center justify-center font-bold">
                          {sIdx + 1}
                        </span>
                        {parseInline(step)}
                      </span>
                      {sIdx < steps.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-burgundy/60 flex-shrink-0 animate-pulse" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          }
        }

        // 4. Callout Cards:
        // 💡 THINK ABOUT IT / KEY IDEA
        if (
          trimmed.toUpperCase().startsWith('💡 THINK ABOUT IT') ||
          trimmed.toUpperCase().startsWith('💡 KEY IDEA') ||
          trimmed.toUpperCase().startsWith('> 💡')
        ) {
          const bodyText = trimmed.replace(/^>?\s*💡\s*(THINK ABOUT IT|KEY IDEA)[:\s-]*/i, '');
          return (
            <div key={idx} className="my-4 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-200/80 text-amber-950 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-amber-800 font-serif font-bold text-sm">
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Think About It (Analogy)</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed pl-6">
                {parseInline(bodyText)}
              </p>
            </div>
          );
        }

        // 📌 KEY CONCEPT
        if (
          trimmed.toUpperCase().startsWith('📌 KEY CONCEPT') ||
          trimmed.toUpperCase().startsWith('⚡ IMPORTANT IDEA') ||
          trimmed.toUpperCase().startsWith('> 📌')
        ) {
          const bodyText = trimmed.replace(/^>?\s*(📌|⚡)\s*(KEY CONCEPT|IMPORTANT IDEA)[:\s-]*/i, '');
          return (
            <div key={idx} className="my-4 p-4 sm:p-5 rounded-2xl bg-burgundy-light/60 border-2 border-burgundy/30 text-burgundy-dark shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-burgundy font-serif font-bold text-sm">
                <Pin className="w-4 h-4 text-burgundy flex-shrink-0" />
                <span>Key Concept to Remember</span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal leading-relaxed pl-6 font-medium">
                {parseInline(bodyText)}
              </p>
            </div>
          );
        }

        // 🌍 REAL-WORLD CONNECTION / EXAMPLE
        if (
          trimmed.toUpperCase().startsWith('🌍 REAL-WORLD') ||
          trimmed.toUpperCase().startsWith('🌍 REAL-LIFE') ||
          trimmed.toUpperCase().startsWith('> 🌍')
        ) {
          const bodyText = trimmed.replace(/^>?\s*🌍\s*(REAL-WORLD CONNECTION|REAL-WORLD|REAL-LIFE EXAMPLE|REAL-LIFE)[:\s-]*/i, '');
          return (
            <div key={idx} className="my-4 p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-emerald-800 font-serif font-bold text-sm">
                <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Real-World Connection</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed pl-6">
                {parseInline(bodyText)}
              </p>
            </div>
          );
        }

        // ⚠️ COMMON CONFUSION / MISCONCEPTION
        if (
          trimmed.toUpperCase().startsWith('⚠️ COMMON CONFUSION') ||
          trimmed.toUpperCase().startsWith('⚠️ COMMON MISCONCEPTION') ||
          trimmed.toUpperCase().startsWith('> ⚠️')
        ) {
          const bodyText = trimmed.replace(/^>?\s*⚠️\s*(COMMON CONFUSION|COMMON MISCONCEPTION)[:\s-]*/i, '');
          return (
            <div key={idx} className="my-4 p-4 sm:p-5 rounded-2xl bg-rose-50/80 border-2 border-rose-200/80 text-rose-950 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-rose-800 font-serif font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>Common Confusion to Avoid</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-900/90 leading-relaxed pl-6">
                {parseInline(bodyText)}
              </p>
            </div>
          );
        }

        // 5. Code Blocks
        if (trimmed.startsWith('```')) {
          const codeLines = trimmed.split('\n');
          const lang = codeLines[0].replace('```', '').trim() || 'text';
          const code = codeLines.slice(1, -1).join('\n');
          return (
            <div key={idx} className="my-4 rounded-xl overflow-hidden border border-charcoal bg-charcoal text-cream-warm shadow-sm">
              <div className="bg-charcoal-dark px-4 py-1.5 text-[11px] font-mono text-cream-warm/60 border-b border-white/10 uppercase">
                {lang}
              </div>
              <pre className="p-4 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // 6. Bullet Lists
        if (trimmed.split('\n').every(line => line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('✓ '))) {
          const items = trimmed.split('\n').map(line => line.trim().replace(/^[-*✓]\s+/, ''));
          return (
            <ul key={idx} className="space-y-2 my-3 pl-1">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-burgundy flex-shrink-0 mt-2" />
                  <div>{parseInline(item)}</div>
                </li>
              ))}
            </ul>
          );
        }

        // 7. Standard Paragraph
        return (
          <p key={idx} className="text-charcoal leading-relaxed text-xs sm:text-sm">
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
