import { viTerm } from '@/lib/i18n/ziwei-vi';
import { BRANCHES, MAIN_STARS, PALACE_ORDER, STEMS, TIME_BRANCHES } from './constants';
import type { BirthInfo, PalaceInfo, StarInfo, ZiweiChart } from './types';

function normalizeStar(star: any): StarInfo {
  const name = typeof star === 'string' ? star : star?.name ?? '';
  return {
    name,
    viName: viTerm(name),
    type: star?.type,
    brightness: star?.brightness ? viTerm(star.brightness) : undefined,
    scope: star?.scope,
    mutagen: star?.mutagen ? viTerm(star.mutagen) : undefined,
  };
}

function normalizePalace(palace: any, index: number): PalaceInfo {
  const name = palace?.name?.endsWith?.('宫') ? palace.name : `${palace?.name ?? PALACE_ORDER[index]}宫`;
  return {
    index,
    name,
    viName: viTerm(name),
    heavenlyStem: palace?.heavenlyStem,
    earthlyBranch: palace?.earthlyBranch,
    isBodyPalace: Boolean(palace?.isBodyPalace),
    isOriginalPalace: Boolean(palace?.isOriginalPalace),
    majorStars: (palace?.majorStars ?? []).map(normalizeStar),
    minorStars: (palace?.minorStars ?? palace?.softStars ?? []).map(normalizeStar),
    adjectiveStars: (palace?.adjectiveStars ?? palace?.toughStars ?? []).map(normalizeStar),
    changsheng12: palace?.changsheng12,
    boshi12: palace?.boshi12,
    jiangqian12: palace?.jiangqian12,
    suiqian12: palace?.suiqian12,
    decadal: palace?.decadal,
    ages: palace?.ages,
  };
}

function isValidDate(year: number, month: number, day: number) {
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.getUTCFullYear() === year && d.getUTCMonth() === month - 1 && d.getUTCDate() === day;
}

export function validateBirthInfo(input: any): BirthInfo {
  const year = Number(input?.year);
  const month = Number(input?.month);
  const day = Number(input?.day);
  const hour = Number(input?.hour);
  const gender = input?.gender === 'female' ? 'female' : 'male';
  if (!Number.isInteger(year) || year < 1900 || year > 2100) throw new Error('Năm sinh không hợp lệ');
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new Error('Tháng sinh không hợp lệ');
  if (!Number.isInteger(day) || day < 1 || day > 31 || !isValidDate(year, month, day)) throw new Error('Ngày sinh không hợp lệ');
  if (!Number.isInteger(hour) || hour < 0 || hour > 11) throw new Error('Giờ sinh không hợp lệ');
  return { name: String(input?.name ?? '').trim(), year, month, day, hour, gender, calendar: input?.calendar === 'lunar' ? 'lunar' : 'solar' };
}

function buildFallbackChart(birth: BirthInfo): ZiweiChart {
  const seed = birth.year + birth.month * 13 + birth.day * 17 + birth.hour * 19 + (birth.gender === 'female' ? 7 : 0);
  const time = TIME_BRANCHES[birth.hour];
  const palaces = PALACE_ORDER.map((name, index) => {
    const star1 = MAIN_STARS[(seed + index * 2) % MAIN_STARS.length];
    const star2 = MAIN_STARS[(seed + index * 2 + 5) % MAIN_STARS.length];
    return {
      index,
      name,
      viName: viTerm(name),
      heavenlyStem: STEMS[(birth.year + index) % STEMS.length],
      earthlyBranch: BRANCHES[(birth.month + birth.hour + index) % BRANCHES.length],
      isBodyPalace: index === (seed + 4) % 12,
      isOriginalPalace: index === seed % 12,
      majorStars: [star1, star2].map((s) => ({ name: s, viName: viTerm(s), type: 'major', brightness: index % 3 === 0 ? 'Miếu' : index % 3 === 1 ? 'Đắc' : 'Bình' })),
      minorStars: [],
      adjectiveStars: [],
    } as PalaceInfo;
  });

  return {
    source: 'fallback',
    generatedAt: new Date().toISOString(),
    birth,
    solarDate: `${birth.year}-${birth.month}-${birth.day}`,
    lunarDate: 'Chưa tính bằng thư viện ngoài',
    chineseDate: '',
    time: `${time.vi} thời`,
    timeRange: time.range,
    sign: '',
    zodiac: '',
    soul: palaces[0].majorStars[0]?.name,
    body: palaces.find((p) => p.isBodyPalace)?.majorStars[0]?.name,
    fiveElementsClass: 'Tham khảo',
    palaces,
    note: 'Đây là dữ liệu dự phòng khi thư viện iztro chưa cài hoặc không chạy được. Sau khi npm install trên local/Vercel, API sẽ ưu tiên dùng iztro để lập lá số đầy đủ hơn.',
  };
}

async function generateWithIztro(birth: BirthInfo): Promise<ZiweiChart | null> {
  try {
    const mod: any = await import('iztro');
    const astro = mod?.astro ?? mod?.default?.astro;
    if (!astro) return null;

    const solarDate = `${birth.year}-${birth.month}-${birth.day}`;
    const genderEn = birth.gender === 'male' ? 'male' : 'female';
    const genderZh = birth.gender === 'male' ? '男' : '女';
    let astrolabe: any;

    const callers = [
      () => astro.bySolar?.(solarDate, birth.hour, genderEn, true, 'zh-CN'),
      () => astro.bySolar?.(solarDate, birth.hour, genderZh, true, 'zh-CN'),
      () => astro.astrolabeBySolarDate?.(solarDate, birth.hour, genderEn, true, 'zh-CN'),
      () => astro.astrolabeBySolarDate?.(solarDate, birth.hour, genderZh, true, 'zh-CN'),
    ];

    for (const call of callers) {
      try {
        const result = call();
        if (result?.palaces?.length) {
          astrolabe = result;
          break;
        }
      } catch {}
    }

    if (!astrolabe?.palaces?.length) return null;

    return {
      source: 'iztro',
      generatedAt: new Date().toISOString(),
      birth,
      solarDate: astrolabe.solarDate ?? solarDate,
      lunarDate: astrolabe.lunarDate,
      chineseDate: astrolabe.chineseDate,
      time: viTerm(astrolabe.time),
      timeRange: astrolabe.timeRange,
      sign: viTerm(astrolabe.sign),
      zodiac: viTerm(astrolabe.zodiac),
      soul: astrolabe.soul,
      body: astrolabe.body,
      fiveElementsClass: viTerm(astrolabe.fiveElementsClass ?? astrolabe.fiveElementClass),
      palaces: astrolabe.palaces.map(normalizePalace),
      raw: astrolabe,
    };
  } catch {
    return null;
  }
}

export async function generateChart(input: any): Promise<ZiweiChart> {
  const birth = validateBirthInfo(input);
  const iztroChart = await generateWithIztro(birth);
  return iztroChart ?? buildFallbackChart(birth);
}
