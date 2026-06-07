'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { TIME_BRANCHES } from '@/lib/ziwei/constants';

const currentYear = new Date().getFullYear();

export default function BirthForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: '', year: '1995', month: '1', day: '1', hour: '6', gender: 'male', calendar: 'solar'
  });
  const years = useMemo(() => Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i), []);

  function update(name: string, value: string) {
    setForm((old) => ({ ...old, [name]: value }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    const params = new URLSearchParams(form);
    router.push(`/chart?${params.toString()}`);
  }

  return (
    <form className="card stack" onSubmit={submit}>
      {!compact && (
        <div>
          <p className="eyebrow">Nhập thông tin sinh</p>
          <h2 className="section-title">Lập lá số</h2>
          <p className="muted">Nên dùng ngày dương lịch trên giấy tờ. Giờ sinh theo 12 thời thần.</p>
        </div>
      )}

      <div className="form-row">
        <label>Họ tên</label>
        <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Không bắt buộc" />
      </div>

      <div className="grid-3">
        <div className="form-row">
          <label>Năm</label>
          <select className="input" value={form.year} onChange={(e) => update('year', e.target.value)}>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label>Tháng</label>
          <select className="input" value={form.month} onChange={(e) => update('month', e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label>Ngày</label>
          <select className="input" value={form.day} onChange={(e) => update('day', e.target.value)}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-row">
          <label>Giờ sinh</label>
          <select className="input" value={form.hour} onChange={(e) => update('hour', e.target.value)}>
            {TIME_BRANCHES.map((t) => <option key={t.index} value={t.index}>{t.vi} thời · {t.range}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label>Giới tính</label>
          <select className="input" value={form.gender} onChange={(e) => update('gender', e.target.value)}>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
      </div>

      <button className="btn" type="submit" disabled={pending}>{pending ? 'Đang chuyển...' : 'Lập lá số ngay'}</button>
    </form>
  );
}
