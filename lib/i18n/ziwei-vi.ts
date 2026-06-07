export const TERM_VI: Record<string, string> = {
  // Chính tinh
  '紫微': 'Tử Vi', '天机': 'Thiên Cơ', '太阳': 'Thái Dương', '武曲': 'Vũ Khúc',
  '天同': 'Thiên Đồng', '廉贞': 'Liêm Trinh', '天府': 'Thiên Phủ', '太阴': 'Thái Âm',
  '贪狼': 'Tham Lang', '巨门': 'Cự Môn', '天相': 'Thiên Tướng', '天梁': 'Thiên Lương',
  '七杀': 'Thất Sát', '破军': 'Phá Quân',

  // Phụ tinh thường gặp
  '左辅': 'Tả Phụ', '右弼': 'Hữu Bật', '文昌': 'Văn Xương', '文曲': 'Văn Khúc',
  '天魁': 'Thiên Khôi', '天钺': 'Thiên Việt', '禄存': 'Lộc Tồn', '天马': 'Thiên Mã',
  '擎羊': 'Kình Dương', '陀罗': 'Đà La', '火星': 'Hỏa Tinh', '铃星': 'Linh Tinh',
  '地空': 'Địa Không', '地劫': 'Địa Kiếp', '天刑': 'Thiên Hình', '天姚': 'Thiên Diêu',
  '红鸾': 'Hồng Loan', '天喜': 'Thiên Hỷ', '天才': 'Thiên Tài', '天寿': 'Thiên Thọ',
  '天官': 'Thiên Quan', '天福': 'Thiên Phúc', '天巫': 'Thiên Vu', '解神': 'Giải Thần',
  '孤辰': 'Cô Thần', '寡宿': 'Quả Tú', '凤阁': 'Phượng Các', '龙池': 'Long Trì',

  // Cung
  '命宫': 'Cung Mệnh', '命': 'Mệnh',
  '兄弟宫': 'Cung Huynh Đệ', '兄弟': 'Huynh Đệ',
  '夫妻宫': 'Cung Phu Thê', '夫妻': 'Phu Thê',
  '子女宫': 'Cung Tử Tức', '子女': 'Tử Tức',
  '财帛宫': 'Cung Tài Bạch', '财帛': 'Tài Bạch',
  '疾厄宫': 'Cung Tật Ách', '疾厄': 'Tật Ách',
  '迁移宫': 'Cung Thiên Di', '迁移': 'Thiên Di',
  '交友宫': 'Cung Nô Bộc', '仆役宫': 'Cung Nô Bộc', '仆役': 'Nô Bộc', '交友': 'Nô Bộc',
  '官禄宫': 'Cung Quan Lộc', '官禄': 'Quan Lộc',
  '田宅宫': 'Cung Điền Trạch', '田宅': 'Điền Trạch',
  '福德宫': 'Cung Phúc Đức', '福德': 'Phúc Đức',
  '父母宫': 'Cung Phụ Mẫu', '父母': 'Phụ Mẫu',

  // Tứ hóa / trạng thái
  '禄': 'Lộc', '权': 'Quyền', '科': 'Khoa', '忌': 'Kỵ',
  '化禄': 'Hóa Lộc', '化权': 'Hóa Quyền', '化科': 'Hóa Khoa', '化忌': 'Hóa Kỵ',
  '庙': 'Miếu', '旺': 'Vượng', '得': 'Đắc', '利': 'Lợi', '平': 'Bình', '陷': 'Hãm',

  // Thiên can
  '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu',
  '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý',

  // Địa chi
  '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ',
  '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi',

  // Khác
  '男': 'Nam', '女': 'Nữ', 'male': 'Nam', 'female': 'Nữ',
  '木三局': 'Mộc tam cục', '火六局': 'Hỏa lục cục', '土五局': 'Thổ ngũ cục',
  '金四局': 'Kim tứ cục', '水二局': 'Thủy nhị cục'
};

export function viTerm(value?: string | null): string {
  if (!value) return '';
  if (TERM_VI[value]) return TERM_VI[value];
  let output = value;
  Object.keys(TERM_VI)
    .sort((a, b) => b.length - a.length)
    .forEach((key) => {
      output = output.split(key).join(TERM_VI[key]);
    });
  return output;
}

export function viList(values?: Array<string | null | undefined>): string {
  return (values ?? []).filter(Boolean).map((v) => viTerm(String(v))).join(', ');
}
