export default function LibraryPage() {
  return (
    <main className="main stack">
      <div>
        <p className="eyebrow">Cổ thư</p>
        <h1 className="section-title">Thư viện Tử Vi</h1>
        <p className="muted">Bạn có thể đưa dữ liệu cổ thư từ repo gốc vào thư mục <code>lib/classics</code> rồi render tại trang này.</p>
      </div>
      <article className="card stack">
        <h2>Gợi ý mở rộng</h2>
        <p className="muted">Bản zip này để deploy gọn và chạy được ngay, nên không nhúng toàn bộ dữ liệu cổ thư dài. Khi cần, bạn copy các file cổ thư của repo gốc vào và tạo danh sách bài đọc.</p>
        <div className="pre">骨髓赋 · 紫微斗数全集 · 紫微斗数全书\n\nCó thể hiển thị nguyên văn tiếng Trung kèm phần giải thích tiếng Việt bên dưới.</div>
      </article>
    </main>
  );
}
