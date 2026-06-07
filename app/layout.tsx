import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tử Vi Đẩu Số Việt hóa · Lập lá số online',
  description: 'Bản Việt hóa deployable của công cụ lập lá số Tử Vi Đẩu Số, có API route nội bộ và hướng dẫn triển khai Vercel/local.',
  keywords: ['tử vi đẩu số', 'lá số tử vi', 'zi wei dou shu', 'việt hóa', 'nextjs'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Tử Vi Đẩu Số Việt hóa',
    description: 'Lập lá số Tử Vi Đẩu Số bằng giao diện tiếng Việt.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <a className="brand" href="/">
              <span className="brand-mark">紫</span>
              <span>
                <strong>Tử Vi Đẩu Số</strong>
                <small>Bản Việt hóa</small>
              </span>
            </a>
            <nav className="nav-links">
              <a href="/chart">Lập lá số</a>
              <a href="/knowledge">Kiến thức</a>
              <a href="/library">Cổ thư</a>
              <a href="/heming">Hợp bàn</a>
            </nav>
          </header>
          {children}
          <footer className="site-footer">
            <p>
              Dự án đóng gói Việt hóa dựa trên ý tưởng/cấu trúc repo Renhuai123/ziwei-doushu. Dữ liệu lá số ưu tiên dùng thư viện <code>iztro</code> khi cài dependency.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
