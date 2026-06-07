import BirthForm from '@/components/BirthForm';
import ShareCard from '@/components/ShareCard';

export default function HomePage() {
  return (
    <main className="main stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Next.js · Việt hóa · Vercel ready</p>
          <h1>Lập lá số Tử Vi Đẩu Số bằng tiếng Việt</h1>
          <p>
            Bản đóng gói này đã thêm API <code>/api/generate</code>, việt hóa giao diện chính, có trang lá số, trang kiến thức, cổ thư và route luận giải mẫu để deploy không bị lỗi thiếu backend.
          </p>
          <div className="grid-3" style={{ marginTop: '1.5rem' }}>
            <div className="kpi"><strong>01</strong><span>Chạy local bằng npm run dev</span></div>
            <div className="kpi"><strong>02</strong><span>Deploy trực tiếp lên Vercel</span></div>
            <div className="kpi"><strong>03</strong><span>Ưu tiên dùng iztro để lập lá số</span></div>
          </div>
        </div>
        <BirthForm />
      </section>
      <ShareCard />
    </main>
  );
}
