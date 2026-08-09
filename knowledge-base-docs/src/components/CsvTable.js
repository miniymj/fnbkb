import React, { useEffect, useState } from 'react';

/**
 * KB 내 CSV 시각화 컴포넌트
 * - src: static 기준 경로 (예: "/data/marketing-calendar/2026_holidays.csv")
 * - caption: 표 제목 (선택)
 * - limit: 표시할 행 수 (선택, 전체 행 + 다운로드 링크 표시)
 * - highlightKey: 강조할 열 이름 (예: "priority" — High/Mid/Low 색상)
 */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQ = false;
      } else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field);
        field = '';
        if (row.some((x) => x.trim() !== '')) rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field.length > 0 || row.length) {
    row.push(field);
    if (row.some((x) => x.trim() !== '')) rows.push(row);
  }
  return rows;
}

function cellStyle(v, highlightKey) {
  const s = String(v).trim();
  if (highlightKey) {
    if (/^high$/i.test(s)) return { backgroundColor: '#FCE8EC', color: '#403735', fontWeight: 700 };
    if (/^mid$/i.test(s)) return { backgroundColor: '#FBF3E4', color: '#403735' };
    if (/^low$/i.test(s)) return { backgroundColor: '#F2F2F2', color: '#403735' };
  }
  return undefined;
}

export default function CsvTable({ src, caption, limit, highlightKey }) {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(src)
      .then((r) => r.text())
      .then((t) => {
        if (alive) setRows(parseCSV(t.replace(/^\uFEFF/, '')));
      })
      .catch(() => {
        if (alive) setRows([]);
      });
    return () => {
      alive = false;
    };
  }, [src]);

  if (rows === null)
    return <p style={{ fontSize: 12, color: '#888' }}>📊 캘린더 데이터 불러오는 중…</p>;
  if (rows.length === 0)
    return <p style={{ fontSize: 12, color: '#c00' }}>데이터를 불러오지 못했습니다: {src}</p>;

  const [header, ...body] = rows;
  const shown = limit ? body.slice(0, limit) : body;
  const cell = { border: '1px solid #E5D8CE', padding: '6px 10px', fontSize: 12.5, lineHeight: 1.5 };
  const th = { ...cell, backgroundColor: '#FCE8EC', fontWeight: 700, whiteSpace: 'nowrap' };

  return (
    <div style={{ overflowX: 'auto', margin: '8px 0 16px' }}>
      {caption && <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 13 }}>{caption}</p>}
      <table style={{ borderCollapse: 'collapse', width: '100%', backgroundColor: '#FFF' }}>
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={i} style={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shown.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci} style={{ ...cell, ...(cellStyle(c, header[ci] === highlightKey ? highlightKey : undefined) || {}) }}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {limit && body.length > limit && (
        <p style={{ fontSize: 12, margin: '6px 0 0' }}>
          … 전체 {body.length}행 — <a href={src} download>📥 CSV 다운로드</a>
        </p>
      )}
    </div>
  );
}
