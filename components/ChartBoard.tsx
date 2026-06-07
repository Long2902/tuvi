'use client';

import type { PalaceInfo, ZiweiChart } from '@/lib/ziwei/types';
import { viTerm } from '@/lib/i18n/ziwei-vi';

export default function ChartBoard({ chart, selectedIndex, onSelect }: {
  chart: ZiweiChart;
  selectedIndex: number;
  onSelect: (palace: PalaceInfo) => void;
}) {
  return (
    <div className="chart-grid">
      {chart.palaces.map((palace) => (
        <button key={palace.index} className={`palace ${selectedIndex === palace.index ? 'active' : ''}`} onClick={() => onSelect(palace)}>
          <div className="palace-title">
            <span>{palace.viName}</span>
            <span className="badge">{viTerm(palace.heavenlyStem)} {viTerm(palace.earthlyBranch)}</span>
          </div>
          <div className="star-list">
            {palace.majorStars.length ? palace.majorStars.map((star, i) => (
              <span className="star" key={`${star.name}-${i}`}>{star.viName}{star.brightness ? ` · ${star.brightness}` : ''}</span>
            )) : <span className="muted">Vô chính diệu</span>}
          </div>
          {(palace.isBodyPalace || palace.isOriginalPalace) && (
            <div className="star-list">
              {palace.isBodyPalace && <span className="badge">Thân cung</span>}
              {palace.isOriginalPalace && <span className="badge">Lai nhân cung</span>}
            </div>
          )}
          {palace.minorStars.length > 0 && <p className="muted">Phụ tinh: {palace.minorStars.slice(0, 4).map((s) => s.viName).join(', ')}</p>}
        </button>
      ))}
    </div>
  );
}
