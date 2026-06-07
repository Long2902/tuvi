import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const a = body?.personA?.name || 'Người A';
  const b = body?.personB?.name || 'Người B';
  return NextResponse.json({
    answer: [
      `Bản hợp bàn mẫu cho ${a} và ${b}.`,
      'Bản đóng gói này không gọi AI bên ngoài, nên phần hợp bàn đang dùng phản hồi mẫu để deploy được ngay.',
      'Để làm hợp bàn thật, hãy lập 2 lá số bằng /api/generate rồi so sánh cung Mệnh, Phu Thê, Tài Bạch, Quan Lộc, tam phương tứ chính và tứ hóa hai bên.'
    ].join('\n\n')
  });
}
