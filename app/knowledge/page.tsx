const items = [
  ['14 chính tinh', 'Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân.'],
  ['12 cung', 'Mệnh, Huynh Đệ, Phu Thê, Tử Tức, Tài Bạch, Tật Ách, Thiên Di, Nô Bộc, Quan Lộc, Điền Trạch, Phúc Đức, Phụ Mẫu.'],
  ['Tứ hóa', 'Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ. Khi luận cần xem sao nào hóa, rơi vào cung nào và liên hệ với tam phương tứ chính.'],
  ['Cách đọc', 'Không nên kết luận từ một sao đơn lẻ. Hãy đọc theo cung, chính tinh, phụ tinh, sát tinh, tứ hóa, đại hạn và lưu niên.']
];

export default function KnowledgePage() {
  return (
    <main className="main stack">
      <div>
        <p className="eyebrow">Kiến thức nền</p>
        <h1 className="section-title">Tử Vi Đẩu Số cho người mới</h1>
        <p className="muted">Trang này đã được Việt hóa để bạn chỉnh sửa/thêm nội dung SEO sau khi deploy.</p>
      </div>
      <div className="grid-2">
        {items.map(([title, desc]) => (
          <article className="card stack" key={title}>
            <h2>{title}</h2>
            <p className="muted">{desc}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
