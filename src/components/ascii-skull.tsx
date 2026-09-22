"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

// 100 columns x 77 rows. Each cell is drawn rather than typed: ':' becomes the
// Mantis mark, '=' becomes a plus, '.' stays a dot. Cells keep the 5.4 x 9px
// size that lines them up with the hero's dot grid.
const SKULL = `                                         ======:======                                              
                               ==::::::::::::::::::::::::::::::::===                                
                          ==:::::::::=====::....:=::::=:==::::::::::::::=                           
                       =::::::::=:.....::....::.............:....:::::::::::=                       
                     =:::::::::......:==:.........:..:......::.........::::::::==                   
                   =:::::::.......:=:.......:.....:::......:::...::.......::::::::=                 
                 =::::::.....::......:::::=.......::.......::.......::......:::::::::=              
               =::::::..::==........:......::....::........:..::::::::=:.........=::::=             
              ::::::...:=:...:::................::.........:.............::.......::::::=           
            =:::::....:....::...........:......::......:..:................::......:::::::=         
           =::::::..:=...:......:::.......::::=........:::...........::....:::::.....::::::=        
          =:::::.:.::..:::....::.............::........:...::....:::......::...::.....:::::::=      
         =:::::...::..::...::::..............::.......:...::...........:=:......::......::::::=     
        =::::::..........:...................:........:...::.............:........::....:=:::::     
       =:::::::........::........::....::::::...:....::....:::::..:......::.........::...=::::::    
      =:::::::........::..........::::.....::...:...::....::......:=:.:..:.....::...:::..:.:::::=   
      =:::::::.......:........::::.....:.....:..::..::...:.......::.....:::.....:.....::....:::::=  
      :::::::=:.:...:...:::::::...:....::....:...::.::......:::........:.......:::....::....::::::  
     =:::::::::.::..::.=:..........::...:.....:...:...:=:...........:::...:=::.......::.....:=::::  
     =:::::::::...::..::.......:=:..:...::......:==:.....................::.........::......:.::::= 
     ::::::::::=:..............::....:::..:==:..............:::......:=:........::...::...::..:=:::=
     =::::=::::=:::::.............::.....=:.....:..........:...::::...................:...::..:=:::=
      =::::::::::==:........:::........::.......:........:==:::....::......::............::...:::::=
     =:::::::::::::=:::=:::::...:::::=.....:::.::...::::....::...............:::.......::.....:::::=
    =::=::::::::::::::::::==:.....:=:.........::.........:=:..:::............................::::::=
   =:::::::::::::::::=::::::::::==:........:=:..........:......:::::.....................::::::::::=
  :::::::::::::::::::=::::::::::::......:=......................:::...........::::..........::::::= 
=:::::::::::::::::::::::::::::::=:..::::::.........::.......:::.........:==::...::=====::.:=::::::  
 ===::::::::::::::::::::::::::::=:......:.......:::....................:...::::::::::::::::::::::   
   =::::::=:::::::::=:::::::::::::=...............................:::::====:::::==::::=:::::::::=   
   =:=:::::::=::::=::::::::::::::::::===:...................:=:::::::::::::::=:::::::=:::::::::=    
      =:::::::::::::::::::::::::::::::::::===:::========:..:::::::::::::::=::::::::=:::::::::::     
      =:::::::::::::::::::::::::::=:::::::=:::::::=::........=:::::::::::==========::::::::=        
       =:::::::::::::::::::::::=:::::::::::::::::=:::==.......:.=::::::::::::::==:::::::=           
         =:::::::::::::::::::=::::::::::::::::::=::::::..::...:..::=:::::::====:::::::=             
        =::::::::::::::::===:::::::::::::::::::::=:=:::.:..:.::..::::::::::=::::::==                
       =:::::::::::::::::::::::::::::::::::::::= =:::::.:...::..=::::::::=:::::==                   
   =:::::::::::::::::=::::::::::::::::::::::::= :=:::::..:.::..:::::::==                            
     ::::::::::::::::::::::::::::::::::::::= =:=:::::..:.:...=                                    
     :::::::::::::::::::::::::::::::::::::::=   ::::::::.:.:..::::=                                 
    =:::::::::::::::::::::::=::::::::::::::==  =::::::::..=...::::::=                               
   =::::::::::::::::::::::::=::::::::::::::=  =::::::::..:...=    ==:                               
   =.::::.::.:....:....:....:::::::::::::::=   =:::::::..:..::::==                                  
   :.:..:..:......::::::..:::::::::::::::::=   =:::::::..:..:::::::::=                              
   :.:.:::.::....:....:..::::::::::::::::::=   =:::::::.....::::::::::=                             
   ::::.:.:..:.:.::::::::::::::::::::::::::=   =:::::::.....===:::::::::                            
   =.:::.:::::::::::::::::::::::::::::::::=    =:::::::.....=:=      =:::                           
   =::::::::=::::::::::::::::::::::::::::==     ::::::=.....:::::=     ==                           
    =::::::::::::::::::::::::::::::::::::=      :::::::.....:::::::==                               
     =::::::::::::::::::::::::::::::::=         ::::::::....===:::::::=                             
     =:::::::::::::::::::::::::::::==           =:::::::....::=  =::::=                             
     =:::::::==:::::::::::::==                   =::::::....::::=   =::                             
     :::::::::::::::::::=                        =:::::::...:=::::::=                               
     =::::::::::::::==                           =:::::::...:::::::::::=                            
       ==::::===                                 =:::::::....:::=  =::::=                           
                                                  =::::::.....::::::=  ==                           
                                                  =::::::::::::::::::::=                            
                                                   =::::::::::::::::::::::=                         
                                                   =::::::::::::=:==    ==:=                        
                                                    =:::::::::::::::::::=====                       
                                                     ::::::::::::::::::::::::::===                  
                                                     ::::::::::::::::::::::::::::::=                
                                                      :::::::::::::::=::=     =   ::                
                                                       =::::::::::::::::::::::====::=               
                                                        =:::::::::::::::::::::::::::::=             
                                                        =::::::::::::::::::::::::::::::::=          
                                                         =::::::::::::::::::::::======::::=         
                                                         ==::::::::=::::::::=          =            
                                                            =::::::::::::::::::::::=   ==           
                                                            =:::::::::::::::::::::::::::::=         
                                                            =:::::::::::::::::::::::::::::::=       
                                                              ::::::=:::::::::::=::::=====::::      
                                                                =:::::::::::=:::::=        =:=      
                                                                 ::::::::::==   ===                 
                                                                =::::::=                            
                                                                 :::=                               
                                                                 ===`;

// Mantis mark, from public/brand/mantis-mark-glyph-blue.svg. Drawn once into
// an offscreen tile and stamped with drawImage -- filling this path a few
// thousand times per frame would not hold 60fps.
const MARK =
  "M174.6 66.3 68.4 191.6 51.8 191.6 72 213.4 159 133 117.1 209.7 140.7 226.6 138.7 233.9 232.8 184.2 225.8 233.5 248.7 159.3 143.1 200.6Z";
const MARK_VIEWBOX = 300;

const CELL_W = 5.4;
const CELL_H = 9;
// The mark is drawn larger than its cell -- it reads as a shape, not a
// character, so it needs the room.
const MARK_SIZE = 8.2;
// How long the skull takes to dissolve in, in milliseconds.
const INTRO_MS = 1600;
const STATE_COUNT = 8;
// Pixels of scroll per state. Lower is a faster flicker.
const SCROLL_PER_STATE = 42;
// Share of inked cells that trade places between one state and the next.
const SWAP_RATE = 0.22;
// How far a character can travel, measured along the row-major cell order --
// keeps trades local so the skull's shading survives.
const SWAP_REACH = 5;

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BASE_ROWS = SKULL.split("\n").map((row) => row.split(""));
const COLS = Math.max(...BASE_ROWS.map((row) => row.length));
const ROWS = BASE_ROWS.length;

// Every cell that holds a character, in row-major order.
const INKED: Array<[number, number]> = BASE_ROWS.flatMap((row, y) =>
  row.flatMap((char, x) => (char === " " ? [] : [[y, x] as [number, number]])),
);

// Each state swaps characters between nearby inked cells. Because nothing is
// ever replaced -- only moved -- every state holds exactly the same number of
// dots, marks and pluses as the original art.
const STATES: string[][][] = Array.from({ length: STATE_COUNT }, (_, state) => {
  const rows = BASE_ROWS.map((row) => [...row]);
  if (state === 0) return rows;
  const rand = mulberry32(101 + state * 7);
  const swaps = Math.round(INKED.length * SWAP_RATE);

  for (let i = 0; i < swaps; i++) {
    const a = (rand() * INKED.length) | 0;
    const reach = 1 + ((rand() * SWAP_REACH) | 0);
    const b = rand() < 0.5 ? a - reach : a + reach;
    if (b < 0 || b >= INKED.length) continue;

    const [ay, ax] = INKED[a];
    const [by, bx] = INKED[b];
    const held = rows[ay][ax];
    rows[ay][ax] = rows[by][bx];
    rows[by][bx] = held;
  }
  return rows;
});

// Inked cells in a fixed shuffled order, so the skull arrives as scattered
// specks that fill in rather than wiping across.
const REVEAL_ORDER = (() => {
  const order = [...INKED];
  const rand = mulberry32(57);
  for (let i = order.length - 1; i > 0; i--) {
    const j = (rand() * (i + 1)) | 0;
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
})();

function makeMarkTile(dpr: number, color: string) {
  const size = Math.ceil(MARK_SIZE * dpr);
  const tile = document.createElement("canvas");
  tile.width = size;
  tile.height = size;
  const ctx = tile.getContext("2d");
  if (!ctx) return null;
  const scale = size / MARK_VIEWBOX;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.fillStyle = color;
  ctx.fill(new Path2D(MARK));
  return tile;
}

const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function AsciiSkull({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<string[][]>(BASE_ROWS.map((row) => [...row]));
  const drawRef = useRef<() => void>(() => {});

  useBeforePaint(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = COLS * CELL_W;
    const height = ROWS * CELL_H;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const color = getComputedStyle(canvas).color;
    // The marks carry the image; dots and pluses are texture around them, so
    // the marks are drawn at full strength and the rest stays dimmer.
    const markColor = color.replace(
      /^rgba?\(([^)]+?)(?:,\s*[\d.]+)?\)$/,
      (_match, channels) => `rgb(${channels})`,
    );
    const mark = makeMarkTile(dpr, markColor);

    drawRef.current = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.9;
      ctx.lineCap = "butt";

      const grid = gridRef.current;
      for (let y = 0; y < ROWS; y++) {
        const row = grid[y];
        for (let x = 0; x < row.length; x++) {
          const char = row[x];
          if (char === " ") continue;
          const cx = x * CELL_W + CELL_W / 2;
          const cy = y * CELL_H + CELL_H / 2;

          if (char === ":") {
            if (mark) {
              ctx.drawImage(
                mark,
                cx - MARK_SIZE / 2,
                cy - MARK_SIZE / 2,
                MARK_SIZE,
                MARK_SIZE,
              );
            }
          } else if (char === "=") {
            ctx.beginPath();
            ctx.moveTo(cx - 1.7, cy);
            ctx.lineTo(cx + 1.7, cy);
            ctx.moveTo(cx, cy - 1.7);
            ctx.lineTo(cx, cy + 1.7);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(cx, cy, 0.75, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drawRef.current();
      return;
    }
    // Start empty, so the dissolve begins from nothing.
    gridRef.current = BASE_ROWS.map((row) => row.map(() => " "));
    drawRef.current();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let start: number | null = null;
    let revealed = 0;
    let frame = 0;
    let done = false;

    const dissolve = (now: number) => {
      start ??= now;
      const progress = Math.min(1, (now - start) / INTRO_MS);
      // Ease out, so it rushes in and settles rather than arriving at a
      // constant rate.
      const eased = 1 - Math.pow(1 - progress, 3);
      const target = Math.round(eased * REVEAL_ORDER.length);

      for (; revealed < target; revealed++) {
        const [y, x] = REVEAL_ORDER[revealed];
        gridRef.current[y][x] = BASE_ROWS[y][x];
      }
      drawRef.current();

      if (progress < 1) {
        frame = requestAnimationFrame(dissolve);
        return;
      }
      done = true;
      frame = 0;
    };

    frame = requestAnimationFrame(dissolve);

    let shown = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      // The dissolve owns the grid until it finishes.
      if (!done) return;
      const next = Math.floor(window.scrollY / SCROLL_PER_STATE) % STATE_COUNT;
      // Stays on whatever state the scroll last landed on.
      if (next === shown) return;
      shown = next;
      gridRef.current = STATES[next].map((row) => [...row]);
      drawRef.current();
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ right: "21.6px", bottom: "0px" }}
    />
  );
}
