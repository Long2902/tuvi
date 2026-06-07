import { NextRequest, NextResponse } from 'next/server';
import { generateChart } from '@/lib/ziwei/algorithm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const chart = await generateChart(body);
    return NextResponse.json(chart);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Không thể lập lá số' }, { status: 400 });
  }
}
