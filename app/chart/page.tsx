import BirthForm from '@/components/BirthForm';
import ChartViewer from '@/components/ChartViewer';

export default function ChartPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const get = (key: string, fallback = '') => {
    const value = searchParams?.[key];
    return Array.isArray(value) ? value[0] ?? fallback : value ?? fallback;
  };
  const initialBirth = get('year') ? {
    name: get('name'),
    year: Number(get('year')),
    month: Number(get('month')),
    day: Number(get('day')),
    hour: Number(get('hour')),
    gender: get('gender') === 'female' ? 'female' : 'male',
    calendar: get('calendar') || 'solar',
  } : null;

  return (
    <main className="main stack">
      <div>
        <p className="eyebrow">Lá số</p>
        <h1 className="section-title">Bàn lá số Tử Vi Đẩu Số</h1>
        <p className="muted">Chọn từng cung để xem sao và luận giải tiếng Việt.</p>
      </div>
      {!initialBirth && <BirthForm compact />}
      <ChartViewer initialBirth={initialBirth} />
    </main>
  );
}
