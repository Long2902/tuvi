'use client';

import { useState } from 'react';

export default function HemingPage() {
  const [answer, setAnswer] = useState('');
  const [pending, setPending] = useState(false);
  async function run() {
    setPending(true);
    setAnswer('');
    const res = await fetch('/api/heming', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personA: { name: 'Người A' }, personB: { name: 'Người B' } })
    });
    const data = await res.json();
    setAnswer(data.answer || 'Không có phản hồi.');
    setPending(false);
  }
  return (
    <main className="main stack">
      <div>
        <p className="eyebrow">Hợp bàn</p>
        <h1 className="section-title">So sánh hai lá số</h1>
        <p className="muted">Route này đã được thêm để app không lỗi khi deploy. Bạn có thể nâng cấp thành form nhập 2 người sau.</p>
      </div>
      <section className="card stack">
        <button className="btn" onClick={run} disabled={pending}>{pending ? 'Đang xử lý...' : 'Chạy hợp bàn mẫu'}</button>
        {answer && <div className="pre">{answer}</div>}
      </section>
    </main>
  );
}
