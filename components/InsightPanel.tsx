'use client';

import { useMemo, useState } from 'react';
import type { PalaceInfo, ZiweiChart } from '@/lib/ziwei/types';
import { summarizePalace } from '@/lib/ziwei/interpret';
import { viTerm } from '@/lib/i18n/ziwei-vi';

export default function InsightPanel({ chart, palace }: { chart: ZiweiChart; palace: PalaceInfo }) {
  const [answer, setAnswer] = useState('');
  const [pending, setPending] = useState(false);
  const summary = useMemo(() => summarizePalace(palace), [palace]);

  async function ask(topic: string) {
    setPending(true);
    setAnswer('');
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chart, focus: { palaceIndex: palace.index, topic } })
      });
      const data = await res.json();
      setAnswer(data.answer || data.error || 'Không có phản hồi.');
    } catch {
      setAnswer('Không gọi được API luận giải. Vui lòng kiểm tra lại server.');
    } finally {
      setPending(false);
    }
  }

  return (
    <aside className="card side-panel stack">
      <div>
        <p className="eyebrow">Chi tiết cung</p>
        <h2 className="section-title">{palace.viName}</h2>
        <p className="muted">{viTerm(palace.heavenlyStem)} {viTerm(palace.earthlyBranch)} {palace.isBodyPalace ? '· Thân cung' : ''}</p>
      </div>
      <div className="pre">{summary}</div>
      <div className="stack">
        <button className="btn secondary" onClick={() => ask('tổng quan cung đang chọn')} disabled={pending}>Luận tổng quan</button>
        <button className="btn secondary" onClick={() => ask('sự nghiệp và tài vận')} disabled={pending}>Hỏi về sự nghiệp/tài vận</button>
        <button className="btn secondary" onClick={() => ask('tình cảm và gia đạo')} disabled={pending}>Hỏi về tình cảm</button>
      </div>
      {pending && <p className="muted">Đang tạo luận giải...</p>}
      {answer && <div className="pre">{answer}</div>}
    </aside>
  );
}
