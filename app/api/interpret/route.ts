import { NextRequest, NextResponse } from 'next/server';
import { buildLocalInterpretation } from '@/lib/ziwei/interpret';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.chart?.palaces) return NextResponse.json({ error: 'Thiếu dữ liệu lá số' }, { status: 400 });
    const answer = buildLocalInterpretation(body.chart, body.focus);
    return NextResponse.json({ answer, provider: 'local-vietnamese-template' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Không thể luận giải' }, { status: 500 });
  }
}
