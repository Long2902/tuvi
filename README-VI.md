# Tử Vi Đẩu Số Việt hóa - bản deployable

Đây là gói đã được chuẩn bị để bạn có thể chạy local hoặc deploy lên Vercel ngay.

## Đã làm trong gói này

- Việt hóa giao diện chính sang tiếng Việt.
- Thêm trang chủ, trang lập lá số, trang kiến thức, cổ thư, hợp bàn mẫu.
- Thêm API nội bộ:
  - `POST /api/generate`: lập lá số, ưu tiên dùng `iztro` nếu dependency đã cài.
  - `POST /api/interpret`: luận giải mẫu bằng tiếng Việt, không cần API key.
  - `POST /api/heming`: hợp bàn mẫu, không cần backend riêng.
- Xóa phụ thuộc vào `postbuild` bị thiếu file trong repo gốc.
- Thêm `.env.example`, `vercel.json`, metadata SEO tiếng Việt.
- Thêm lớp dịch thuật ngữ Trung -> Hán Việt ở `lib/i18n/ziwei-vi.ts`.

## Cách chạy local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở trình duyệt:

```txt
http://localhost:3000
```

Kiểm tra build production:

```bash
npm run build
npm run start
```

## Cách deploy lên Vercel

1. Giải nén file zip này.
2. Push toàn bộ thư mục lên GitHub của bạn.
3. Vào Vercel -> Add New Project -> Import repo.
4. Framework: Next.js.
5. Build command: `npm run build`.
6. Install command: `npm install`.
7. Thêm biến môi trường:

```env
NEXT_PUBLIC_SITE_URL=https://domain-cua-ban.com
```

8. Deploy.

## Ghi chú quan trọng

Repo gốc `Renhuai123/ziwei-doushu` ghi rõ bản open-source chưa bao gồm backend API như `/api/generate`, `/api/interpret`, `/api/heming`. Vì vậy bản zip này đã thêm các route API nội bộ để khi bạn deploy không bị lỗi 404 API.

`/api/generate` sẽ cố dùng thư viện `iztro`. Nếu môi trường chưa cài được `iztro` hoặc API thư viện thay đổi, hệ thống tự rơi về dữ liệu dự phòng để app vẫn chạy. Khi chạy sau `npm install`, bình thường sẽ dùng `iztro`.

Phần `/api/interpret` và `/api/heming` hiện là bản luận giải mẫu bằng tiếng Việt, không gọi OpenAI/DeepSeek. Nếu muốn AI thật, bạn có thể nối API này với model tùy chọn.

## File cần sửa nếu muốn việt hóa sâu hơn

- `lib/i18n/ziwei-vi.ts`: thêm thuật ngữ dịch.
- `components/ChartBoard.tsx`: giao diện 12 cung.
- `components/InsightPanel.tsx`: khung luận giải.
- `lib/ziwei/interpret.ts`: logic diễn giải tiếng Việt.
- `app/knowledge/page.tsx`: nội dung SEO/kiến thức.
- `app/library/page.tsx`: cổ thư, bài đọc.

## Attribution

Dự án này được đóng gói theo yêu cầu để triển khai, dựa trên ý tưởng và cấu trúc của repo nguồn mở:

- Upstream: `https://github.com/Renhuai123/ziwei-doushu`
- Thư viện lập lá số: `iztro`

Nội dung Tử Vi chỉ nên dùng để tham khảo.
