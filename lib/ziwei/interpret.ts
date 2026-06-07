import type { PalaceInfo, ZiweiChart } from './types';
import { viList, viTerm } from '@/lib/i18n/ziwei-vi';

export function summarizePalace(palace: PalaceInfo): string {
  const major = palace.majorStars.length ? viList(palace.majorStars.map((s) => s.name)) : 'không có chính tinh nổi bật';
  const minor = palace.minorStars.length ? ` Phụ tinh: ${viList(palace.minorStars.slice(0, 6).map((s) => s.name))}.` : '';
  const body = palace.isBodyPalace ? ' Đây cũng là cung Thân, nên tác động thực tế trong đời sống thường rõ hơn.' : '';
  return `${palace.viName} có ${major}.${minor}${body}`;
}

export function buildLocalInterpretation(chart: ZiweiChart, focus?: { palaceIndex?: number; topic?: string }): string {
  const palace = typeof focus?.palaceIndex === 'number' ? chart.palaces[focus.palaceIndex] : chart.palaces[0];
  const topic = focus?.topic || 'tổng quan';
  const coreStars = palace?.majorStars?.map((s) => s.name) ?? [];
  const core = coreStars.length ? viList(coreStars) : 'không có chính tinh nổi bật';
  const soul = chart.soul ? viTerm(chart.soul) : 'chưa rõ';
  const body = chart.body ? viTerm(chart.body) : 'chưa rõ';

  return [
    `Đây là phần luận giải tham khảo bằng tiếng Việt cho chủ đề "${topic}".`,
    `Tổng quan lá số: Mệnh chủ ${soul}, Thân chủ ${body}, cục ${chart.fiveElementsClass || 'chưa rõ'}.`,
    palace ? summarizePalace(palace) : 'Chưa chọn cung cụ thể.',
    `Trọng tâm khi xem ${palace?.viName ?? 'cung này'} là nhóm sao ${core}. Nên đọc theo thế tam phương tứ chính, không nên chỉ kết luận từ một sao đơn lẻ.`,
    'Lưu ý: bản đóng gói này dùng diễn giải nội bộ để triển khai được ngay. Nếu muốn AI chuyên sâu, bạn có thể nối /api/interpret với OpenAI, DeepSeek hoặc hệ RAG riêng.'
  ].join('\n\n');
}
