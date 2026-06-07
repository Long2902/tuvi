# Hướng dẫn triển khai nhanh

## Local

```bash
npm install
npm run dev
```

Truy cập: `http://localhost:3000`

## Vercel

```bash
git init
git add .
git commit -m "viet hoa ziwei doushu"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Sau đó import repo trên Vercel.

## Test checklist

- [ ] Trang chủ mở được.
- [ ] Form nhập ngày sinh chuyển sang `/chart`.
- [ ] `/api/generate` trả JSON.
- [ ] Trang `/chart` hiển thị 12 cung.
- [ ] Bấm từng cung đổi nội dung panel bên phải.
- [ ] Bấm "Luận tổng quan" gọi `/api/interpret` thành công.
- [ ] Trang `/knowledge`, `/library`, `/heming` không lỗi 404.
- [ ] `npm run build` chạy thành công trước khi deploy.

## Nâng cấp AI thật

Sửa file:

```txt
app/api/interpret/route.ts
app/api/heming/route.ts
```

Thêm API key trong Vercel Environment Variables, ví dụ:

```env
OPENAI_API_KEY=...
DEEPSEEK_API_KEY=...
```

Không nên hard-code API key trong code.
