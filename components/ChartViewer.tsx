'use client';

import { useEffect, useState } from 'react';
import ChartBoard from './ChartBoard';
import InsightPanel from './InsightPanel';
import type { PalaceInfo, ZiweiChart } from '@/lib/ziwei/types';
import { viTerm } from '@/lib/i18n/ziwei-vi';

export default function ChartViewer({ initialBirth }: { initialBirth: any }) {
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selected, setSelected] = useState<PalaceInfo | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(initialBirth?.year));

  useEffect(() => {
    if (!initialBirth?.year) return;
    let alive = true;
    async function run() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(initialBirth)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Không thể lập lá số');
        if (alive) {
          setChart(data);
          setSelected(data.palaces?.[0] ?? null);
          try { localStorage.setItem('lastZiweiChart', JSON.stringify(data)); } catch {}
        }
      } catch (e: any) {
        if (alive) setError(e.message || 'Không thể lập lá số');
      } finally {
        if (alive) setLoading(false);
      }
    }
    run();
    return () => { alive = false; };
  }, [JSON.stringify(initialBirth)]);

  if (!initialBirth?.year) {
    return <div className="notice">Bạn chưa nhập thông tin sinh. Quay lại trang chủ để lập lá số mới.</div>;
  }
  if (loading) return <div className="card">Đang lập lá số...</div>;
  if (error) return <div className="notice">{error}</div>;
  if (!chart || !selected) return <div className="notice">Không có dữ liệu lá số.</div>;

  return (
    <div className="stack">
      {chart.note && <div className="notice">{chart.note}</div>}
      <section className="card stack">
        <div className="grid-3">
          <div className="kpi"><span className="muted">Ngày dương</span><strong>{chart.solarDate}</strong></div>
          <div className="kpi"><span className="muted">Giờ sinh</span><strong>{chart.time || 'Chưa rõ'}</strong><span className="muted">{chart.timeRange}</span></div>
          <div className="kpi"><span className="muted">Cục</span><strong>{chart.fiveElementsClass || 'Chưa rõ'}</strong></div>
        </div>
        <p className="muted">
          Âm lịch: {chart.lunarDate || 'chưa rõ'} · Tứ trụ: {chart.chineseDate || 'chưa rõ'} · Mệnh chủ: {viTerm(chart.soul)} · Thân chủ: {viTerm(chart.body)} · Nguồn: {chart.source === 'iztro' ? 'iztro' : 'dự phòng'}
        </p>
      </section>
      <section className="chart-layout">
        <div className="card">
          <ChartBoard chart={chart} selectedIndex={selected.index} onSelect={setSelected} />
        </div>
        <InsightPanel chart={chart} palace={selected} />
      </section>
    </div>
  );
}
