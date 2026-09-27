interface TechGlyphProps {
  index: number;
  size?: 'compact' | 'standard' | 'large';
}

export default function TechGlyph({ index, size = 'standard' }: TechGlyphProps) {
  const normalizedIndex = ((index % 20) + 20) % 20;
  const variant = (normalizedIndex % 4) + 1;
  const column = normalizedIndex % 5;
  const row = Math.floor(normalizedIndex / 5);
  const positionX = `${column * 25}%`;
  const positionY = `${row * (100 / 3)}%`;

  return (
    <span className={`tech-glyph tech-glyph--${size} tech-glyph--v${variant}`} aria-hidden="true">
      <span className="tech-glyph__halo" />
      <span className="tech-glyph__orbit tech-glyph__orbit--outer" />
      <span className="tech-glyph__orbit tech-glyph__orbit--inner" />
      <span className="tech-glyph__axis" />
      <span className="tech-glyph__core">
        <span
          className="tech-glyph__image"
          style={{ backgroundPosition: `${positionX} ${positionY}` }}
        />
        <span className="tech-glyph__scan" />
      </span>
      <span className="tech-glyph__node tech-glyph__node--a" />
      <span className="tech-glyph__node tech-glyph__node--b" />
      <span className="tech-glyph__node tech-glyph__node--c" />
      <small>GX-{String(normalizedIndex + 1).padStart(2, '0')}</small>
    </span>
  );
}
