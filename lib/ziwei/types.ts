export type Gender = 'male' | 'female';

export type BirthInfo = {
  name?: string;
  year: number;
  month: number;
  day: number;
  hour: number; // 0..11, theo 12 thời thần
  gender: Gender;
  calendar?: 'solar' | 'lunar';
};

export type StarInfo = {
  name: string;
  viName: string;
  type?: string;
  brightness?: string;
  scope?: string;
  mutagen?: string;
};

export type PalaceInfo = {
  index: number;
  name: string;
  viName: string;
  heavenlyStem?: string;
  earthlyBranch?: string;
  isBodyPalace?: boolean;
  isOriginalPalace?: boolean;
  majorStars: StarInfo[];
  minorStars: StarInfo[];
  adjectiveStars: StarInfo[];
  changsheng12?: string;
  boshi12?: string;
  jiangqian12?: string;
  suiqian12?: string;
  decadal?: any;
  ages?: any;
};

export type ZiweiChart = {
  source: 'iztro' | 'fallback';
  generatedAt: string;
  birth: BirthInfo;
  solarDate: string;
  lunarDate?: string;
  chineseDate?: string;
  time?: string;
  timeRange?: string;
  sign?: string;
  zodiac?: string;
  soul?: string;
  body?: string;
  fiveElementsClass?: string;
  palaces: PalaceInfo[];
  note?: string;
  raw?: any;
};
