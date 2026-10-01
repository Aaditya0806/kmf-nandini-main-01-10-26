'use client';

import Link from 'next/link';

// Tiny, safe renderer for the assistant's replies: **bold**, [links](url),
// "- " / "1. " lists and paragraphs. No HTML is ever injected: everything is
// rendered as React text nodes. Only site paths and http(s) URLs become links.

function safeHref(href) {
  if (/^\/(?!\/)/.test(href)) return { internal: true, href };
  if (/^https?:\/\//i.test(href)) return { internal: false, href };
  return null;
}

function inline(text, onLink, keyBase) {
  const out = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s)]+)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyBase}-${i++}`;
    if (m[1]) {
      out.push(<strong key={key}>{m[1]}</strong>);
    } else {
      const label = m[2] || m[4];
      const link = safeHref(m[3] || m[4]);
      if (!link) out.push(label);
      else if (link.internal)
        out.push(
          <Link key={key} href={link.href} onClick={() => onLink?.(link.href)} className="font-semibold text-primary-main underline">
            {label}
          </Link>
        );
      else
        out.push(
          <a key={key} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => onLink?.(link.href)} className="font-semibold text-primary-main underline break-words">
            {label}
          </a>
        );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ text, onLink }) {
  const blocks = String(text || '').split(/\n{2,}/);
  return blocks.map((block, b) => {
    const lines = block.split('\n').filter((l) => l.trim());
    const isList = lines.length && lines.every((l) => /^\s*([-*•]|\d+[.)])\s+/.test(l));
    if (isList) {
      const ordered = /^\s*\d/.test(lines[0]);
      const Tag = ordered ? 'ol' : 'ul';
      return (
        <Tag key={b} className={`my-2 space-y-1 pl-5 ${ordered ? 'list-decimal' : 'list-disc'}`}>
          {lines.map((l, i) => (
            <li key={i}>{inline(l.replace(/^\s*([-*•]|\d+[.)])\s+/, ''), onLink, `${b}-${i}`)}</li>
          ))}
        </Tag>
      );
    }
    return (
      <p key={b} className="my-2 first:mt-0 last:mb-0">
        {lines.map((l, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {inline(l, onLink, `${b}-${i}`)}
          </span>
        ))}
      </p>
    );
  });
}
