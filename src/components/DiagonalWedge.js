import React from "react";

export default function DiagonalWedge({
  topSrc,
  bottomSrc,
  stroke = "#b92d2d",
  strokeWidth = 18,
  topInset = 180,
  bottomInset = 0,
  scale = 7,
  extendRight = 1200,
  extendUp = 900,
}) {
  const W = 600 * scale, H = 800 * scale;
  const BIG = 20000;

  // ⬅ raise the whole left edge so the wedge exists above 0 too
  const p1 = { x: 0, y: -extendUp };
  const p2 = { x: topInset, y: -extendUp };
  const p3 = { x: W - bottomInset + extendRight, y: H };
  const p4 = { x: 0, y: H };
  const outer = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;

  // outer diagonal overshoot
  const vx = p3.x - p2.x, vy = p3.y - p2.y;
  const vlen = Math.hypot(vx, vy) || 1;
  const ux = vx / vlen, uy = vy / vlen;
  const OVER = 4000;
  const e1 = { x: p2.x - ux * OVER, y: p2.y - uy * OVER };
  const e2 = { x: p3.x + ux * OVER, y: p3.y + uy * OVER };

  // separator + angle
  const d1 = { x: -80, y: H * 0.55 };
  const d2 = { x: W * 0.95, y: H * 0.25 };
  const angleDeg = Math.atan2(d2.y - d1.y, d2.x - d1.x) * (180 / Math.PI);
  const svx = d2.x - d1.x, svy = d2.y - d1.y;
  const slen = Math.hypot(svx, svy) || 1;
  const sux = svx / slen, suy = svy / slen;
  const s1 = { x: d1.x - sux * OVER, y: d1.y - suy * OVER };
  const s2 = { x: d2.x + sux * OVER, y: d2.y + suy * OVER };

  return (
    <svg
  viewBox={`0 ${-extendUp} ${W + extendRight} ${H + extendUp}`}
  width="100%"
  height="100%"
>

      <defs>
        <clipPath id="clip-outer" clipPathUnits="userSpaceOnUse">
          <polygon points={outer} />
        </clipPath>

        {/* TOP mask: big base + huge rotated half-plane */}
        <mask id="mask-top" maskUnits="userSpaceOnUse">
          <rect
            x={0}
            y={-extendUp}
            width={W + extendRight}
            height={H + extendUp * 2}
            fill="black"
          />
          <rect
            x={d1.x - BIG}
            y={d1.y - BIG}
            width={BIG * 2}
            height={BIG}
            transform={`rotate(${angleDeg}, ${d1.x}, ${d1.y})`}
            fill="white"
          />
        </mask>

        {/* BOTTOM mask: mirror the coverage so nothing crops oddly */}
        <mask id="mask-bottom" maskUnits="userSpaceOnUse">
          <rect
            x={0}
            y={-extendUp}
            width={W + extendRight}
            height={H + extendUp * 2}
            fill="black"
          />
          <rect
            x={d1.x - BIG}
            y={d1.y}
            width={BIG * 2}
            height={BIG}
            transform={`rotate(${angleDeg}, ${d1.x}, ${d1.y})`}
            fill="white"
          />
        </mask>
      </defs>

      {/* IMAGES (oversized so masks never reveal gaps) */}
      <g clipPath="url(#clip-outer)">
        <image
          href={topSrc}
          x={-W + 4000}
          y={-extendUp - 1000}
          width={W * 1}
          height={(H + extendUp * 1) * 1 - 400}
          preserveAspectRatio="xMidYMid slice"
          mask="url(#mask-top)"
        />
        <image
            href={bottomSrc}
            x={-W + 3000}   // 👉 shift bottom image 200px to the right
            y={-extendUp }
            width={W * 2}
            height={(H + extendUp * 2) * 1}
            preserveAspectRatio="xMidYMid slice"
            mask="url(#mask-bottom)"
            />
      </g>

      {/* OUTER edge */}
      <g clipPath="url(#clip-outer)">
        <line
          x1={e1.x} y1={e1.y}
          x2={e2.x} y2={e2.y}
          stroke={stroke}
          strokeWidth={strokeWidth * 1.2}
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* INNER separator */}
      <g clipPath="url(#clip-outer)">
        <line
          x1={s1.x} y1={s1.y}
          x2={s2.x} y2={s2.y}
          stroke={stroke}
          strokeWidth={strokeWidth * 0.6}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
