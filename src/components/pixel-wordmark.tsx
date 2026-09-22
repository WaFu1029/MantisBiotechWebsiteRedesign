// Each glyph is a 13-row bitmap rasterized from stroke centerlines, so every
// stroke lands exactly 3 dots thick. "1" is a dot.
const GLYPHS: Record<string, string[]> = {
  M: [
    "1110000000111",
    "1110000000111",
    "1111000001111",
    "1111100011111",
    "1111100011111",
    "1111110111111",
    "1110111110111",
    "1110011100111",
    "1110011100111",
    "1110000000111",
    "1110000000111",
    "1110000000111",
    "1110000000111",
  ],
  A: [
    "11111111111",
    "11111111111",
    "11111111111",
    "11100000111",
    "11100000111",
    "11100000111",
    "11111111111",
    "11111111111",
    "11111111111",
    "11100000111",
    "11100000111",
    "11100000111",
    "11100000111",
  ],
  N: [
    "11100000111",
    "11100000111",
    "11110000111",
    "11110000111",
    "11111000111",
    "11111100111",
    "11101110111",
    "11100111111",
    "11100011111",
    "11100001111",
    "11100001111",
    "11100000111",
    "11100000111",
  ],
  T: [
    "11111111111",
    "11111111111",
    "11111111111",
    "00001110000",
    "00001110000",
    "00001110000",
    "00001110000",
    "00001110000",
    "00001110000",
    "00001110000",
    "00001110000",
    "00001110000",
    "00001110000",
  ],
  I: [
    "111",
    "111",
    "111",
    "111",
    "111",
    "111",
    "111",
    "111",
    "111",
    "111",
    "111",
    "111",
    "111",
  ],
  S: [
    "11111111111",
    "11111111111",
    "11111111111",
    "11100000000",
    "11100000000",
    "11111111111",
    "11111111111",
    "11111111111",
    "00000000111",
    "00000000111",
    "11111111111",
    "11111111111",
    "11111111111",
  ],
};

const WORD = "MANTIS";

// Total dot columns across the word, plus 2 columns of air between letters.
const COLUMNS =
  WORD.split("").reduce((sum, letter) => sum + GLYPHS[letter][0].length, 0) +
  (WORD.length - 1) * 2;

const BRAND = [0x37, 0x63, 0xc8];
// Sunset corners: violet-pink up top left, orange down bottom right, echoing
// the hero gradient.
const TOP_LEFT = [0xd0, 0x7a, 0xb4];
const BOTTOM_RIGHT = [0xff, 0x9e, 0x60];

function mix(from: number[], to: number[], amount: number) {
  return from.map((channel, i) =>
    Math.round(channel + (to[i] - channel) * amount),
  );
}

// Tint strength for a dot at normalized position (x, y), falling off faster
// across the word than down it, since the banner is far wider than it is tall.
function cornerTint(x: number, y: number) {
  return Math.max(0, Math.min(1, 1 - (x * 2.4 + y * 0.7)));
}

function dotColor(x: number, y: number) {
  let rgb = mix(BRAND, TOP_LEFT, cornerTint(x, y) * 0.9);
  rgb = mix(rgb, BOTTOM_RIGHT, cornerTint(1 - x, 1 - y) * 0.9);
  return `rgb(${rgb.join(" ")})`;
}

export function PixelWordmark({ className }: { className?: string }) {
  return (
    <div
      aria-label={WORD}
      role="img"
      className={className}
      style={
        {
          "--cell": `calc(100cqw / ${COLUMNS})`,
        } as React.CSSProperties
      }
    >
      <div className="flex justify-center gap-[calc(var(--cell)*2)]">
        {WORD.split("").map((letter, letterIndex) => {
          // Column this letter starts at, so tints run across the whole word
          // rather than restarting per letter.
          const startColumn = WORD.split("")
            .slice(0, letterIndex)
            .reduce((sum, prev) => sum + GLYPHS[prev][0].length + 2, 0);
          const rows = GLYPHS[letter];
          return (
            <div
              key={`${letter}-${letterIndex}`}
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${GLYPHS[letter][0].length}, var(--cell))`,
              }}
            >
              {rows.flatMap((row, rowIndex) =>
                row.split("").map((bit, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="size-[var(--cell)] p-[calc(var(--cell)*0.14)]"
                  >
                    {bit === "1" ? (
                      <div
                        className="size-full rounded-full"
                        style={{
                          backgroundColor: dotColor(
                            (startColumn + colIndex) / (COLUMNS - 1),
                            rowIndex / (rows.length - 1),
                          ),
                        }}
                      />
                    ) : null}
                  </div>
                )),
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
