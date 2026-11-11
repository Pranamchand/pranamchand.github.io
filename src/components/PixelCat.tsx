import React, { useEffect, useRef, useState } from 'react';
import { useWindowManager } from '../hooks/useWindowManager';

interface CatParticle {
  id: number;
  text: string;
  dx: number;
  dy: number;
  color: string;
}

export const NEKO_SPRITES = {
  still: 'https://webneko.net/lucky/still.gif',
  alert: 'https://webneko.net/lucky/alert.gif',
  yawn: 'https://webneko.net/lucky/yawn.gif',
  itch1: 'https://webneko.net/lucky/itch1.gif',
  itch2: 'https://webneko.net/lucky/itch2.gif',
  sleep1: 'https://webneko.net/lucky/sleep1.gif',
  sleep2: 'https://webneko.net/lucky/sleep2.gif',
  nrun1: 'https://webneko.net/lucky/nrun1.gif',
  nrun2: 'https://webneko.net/lucky/nrun2.gif',
  wrun1: 'https://webneko.net/lucky/wrun1.gif',
  wrun2: 'https://webneko.net/lucky/wrun2.gif',
  erun1: 'https://webneko.net/lucky/erun1.gif',
  erun2: 'https://webneko.net/lucky/erun2.gif',
  serun1: 'https://webneko.net/lucky/serun1.gif',
  serun2: 'https://webneko.net/lucky/serun2.gif',
} as const;

const LOVE_REACTIONS = ['Meow! ♥', 'Purrr~ ♥', 'Nyaa! ✦', 'Mrrp! ♥'];
const FLEE_REACTIONS = ['Eep! 🐾', 'Too close! 💨', 'Cant catch me! 🐾'];

type CatBehaviorState =
  | 'still'
  | 'alert'
  | 'running'
  | 'itching'
  | 'yawning'
  | 'sleeping';
type RunDirection = 'n' | 'w' | 'e' | 'se' | 'sw';

const RUN_PACE = 2.15;

export const PixelCat: React.FC = () => {
  const { isCatEnabled, setIsCatEnabled } = useWindowManager();
  const mousePosRef = useRef({ x: 860, y: 310 });
  const [catPos, setCatPos] = useState({ x: 860, y: 310 });
  const [behavior, setBehavior] = useState<CatBehaviorState>('still');
  const [direction, setDirection] = useState<RunDirection>('w');
  const [frameToggle, setFrameToggle] = useState<0 | 1>(0);
  const [isJumping, setIsJumping] = useState(false);
  const [particles, setParticles] = useState<CatParticle[]>([]);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);

  const behaviorRef = useRef<CatBehaviorState>('still');
  const directionRef = useRef<RunDirection>('w');
  const lastDirChangeRef = useRef<number>(0);
  const alertUntilRef = useRef<number>(0);
  const lastAlertAtRef = useRef<number>(0);
  const idleSinceRef = useRef<number>(performance.now());
  const isFleeingActiveRef = useRef<boolean>(false);
  const velRef = useRef<{ vx: number; vy: number }>({ vx: -1, vy: 0 });
  const particleIdRef = useRef(1);

  // Preload all WebNeko Lucky GIF sprites so frame transitions never flicker
  useEffect(() => {
    Object.values(NEKO_SPRITES).forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Alternate animation frame (run 1/2, itch 1/2, or sleep 1/2)
  useEffect(() => {
    const intervalMs =
      behavior === 'running'
        ? 170
        : behavior === 'itching'
          ? 200
          : behavior === 'sleeping'
            ? 650
            : 450;
    const interval = window.setInterval(() => {
      setFrameToggle((prev) => (prev === 0 ? 1 : 0));
    }, intervalMs);
    return () => window.clearInterval(interval);
  }, [behavior]);

  // Continuous chase (when ON) or smooth open-way flee (when OFF) loop
  useEffect(() => {
    let rafId: number;

    const selectDirection = (vx: number, vy: number, now: number): RunDirection => {
      let nextDir: RunDirection;
      if (vy < -Math.abs(vx) * 0.45 && vy < -0.28) {
        nextDir = 'n';
      } else if (vy > Math.abs(vx) * 0.4 && vy > 0.28) {
        nextDir = vx >= 0 ? 'se' : 'sw';
      } else {
        nextDir = vx < 0 ? 'w' : 'e';
      }

      if (
        nextDir !== directionRef.current &&
        now - lastDirChangeRef.current > 120
      ) {
        directionRef.current = nextDir;
        lastDirChangeRef.current = now;
        setDirection(nextDir);
      }
      return directionRef.current;
    };

    const updateIdleCycle = (now: number) => {
      const elapsed = now - idleSinceRef.current;
      let targetState: CatBehaviorState = 'still';
      if (elapsed > 4300) {
        targetState = 'sleeping';
      } else if (elapsed > 3000) {
        targetState = 'yawning';
      } else if (elapsed > 1400) {
        targetState = 'itching';
      } else {
        targetState = 'still';
      }

      if (behaviorRef.current !== targetState) {
        behaviorRef.current = targetState;
        setBehavior(targetState);
      }
    };

    // Choose a smooth, open escape vector so the cat never vibrates against walls/corners
    const computeSmoothEscapeVector = (
      catX: number,
      catY: number,
      mouseX: number,
      mouseY: number,
      minX: number,
      maxX: number,
      minY: number,
      maxY: number
    ) => {
      const awayX = catX - mouseX;
      const awayY = catY - mouseY;
      const awayAngle =
        Math.hypot(awayX, awayY) > 1
          ? Math.atan2(awayY, awayX)
          : Math.atan2((minY + maxY) / 2 - catY, (minX + maxX) / 2 - catX);

      const curAngle = Math.atan2(velRef.current.vy, velRef.current.vx);
      let bestUx = Math.cos(awayAngle);
      let bestUy = Math.sin(awayAngle);
      let bestScore = -Infinity;

      const sampleCount = 24;
      for (let i = 0; i < sampleCount; i++) {
        const theta = (i * 2 * Math.PI) / sampleCount;
        const ux = Math.cos(theta);
        const uy = Math.sin(theta);

        // How far can the cat run in this direction before hitting a screen border?
        const lookAhead = 95;
        const testX = catX + ux * lookAhead;
        const testY = catY + uy * lookAhead;

        const outLeft = Math.max(0, minX + 18 - testX);
        const outRight = Math.max(0, testX - (maxX - 18));
        const outTop = Math.max(0, minY + 18 - testY);
        const outBottom = Math.max(0, testY - (maxY - 18));
        const wallPenalty = (outLeft + outRight + outTop + outBottom) / lookAhead;

        // Also check immediate step clearance so he never pushes into a wall
        const stepX = catX + ux * 24;
        const stepY = catY + uy * 24;
        const blockedImmediate =
          stepX < minX + 4 ||
          stepX > maxX - 4 ||
          stepY < minY + 4 ||
          stepY > maxY - 4;
        if (blockedImmediate) continue;

        // Score combines: moving away from cursor + staying clear of walls + momentum continuity
        const awayAlignment = Math.cos(theta - awayAngle);
        const momentumAlignment = Math.cos(theta - curAngle);
        const score =
          awayAlignment * 1.45 - wallPenalty * 2.4 + momentumAlignment * 0.55;

        if (score > bestScore) {
          bestScore = score;
          bestUx = ux;
          bestUy = uy;
        }
      }

      // Exponential velocity smoothing so turns are fluid and never vibrate
      const blend = 0.22;
      const rawVx = velRef.current.vx * (1 - blend) + bestUx * blend;
      const rawVy = velRef.current.vy * (1 - blend) + bestUy * blend;
      const len = Math.hypot(rawVx, rawVy) || 1;
      const ux = rawVx / len;
      const uy = rawVy / len;
      velRef.current = { vx: ux, vy: uy };
      return { ux, uy };
    };

    const step = (now: number) => {
      const mouse = mousePosRef.current;
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      const minX = 36;
      const maxX = Math.max(200, vw - 68);
      const minY = 42;
      const maxY = Math.max(200, vh - 96);

      setCatPos((prev) => {
        const toMouseX = mouse.x - prev.x;
        const toMouseY = mouse.y - prev.y;
        const dist = Math.hypot(toMouseX, toMouseY);

        if (isCatEnabled) {
          isFleeingActiveRef.current = false;
          // CHASE MODE: Run towards cursor at steady pace; when reached, cycle still -> itch -> yawn -> sleep
          if (dist < 36) {
            if (
              behaviorRef.current === 'running' ||
              behaviorRef.current === 'alert'
            ) {
              behaviorRef.current = 'still';
              setBehavior('still');
              idleSinceRef.current = now;
            } else {
              updateIdleCycle(now);
            }
            return prev;
          }

          // Startled into alert.gif when waking up to chase cursor
          if (
            behaviorRef.current !== 'running' &&
            behaviorRef.current !== 'alert'
          ) {
            if (now - lastAlertAtRef.current > 900) {
              behaviorRef.current = 'alert';
              setBehavior('alert');
              alertUntilRef.current = now + 260;
              lastAlertAtRef.current = now;
              return prev;
            }
            behaviorRef.current = 'running';
            setBehavior('running');
          }

          if (behaviorRef.current === 'alert') {
            if (now < alertUntilRef.current) {
              return prev;
            }
            behaviorRef.current = 'running';
            setBehavior('running');
          }

          const ux = toMouseX / (dist || 1);
          const uy = toMouseY / (dist || 1);
          velRef.current = { vx: ux, vy: uy };
          selectDirection(ux, uy, now);

          const nextX = Math.max(minX, Math.min(maxX, prev.x + ux * RUN_PACE));
          const nextY = Math.max(minY, Math.min(maxY, prev.y + uy * RUN_PACE));
          return { x: nextX, y: nextY };
        } else {
          // FLEE MODE: Hysteresis thresholds prevent edge vibration
          const fleeStartRadius = 195;
          const fleeStopRadius = 265;

          if (!isFleeingActiveRef.current && dist < fleeStartRadius) {
            isFleeingActiveRef.current = true;
          } else if (isFleeingActiveRef.current && dist > fleeStopRadius) {
            isFleeingActiveRef.current = false;
          }

          if (isFleeingActiveRef.current) {
            if (
              behaviorRef.current !== 'running' &&
              behaviorRef.current !== 'alert'
            ) {
              if (now - lastAlertAtRef.current > 1100) {
                behaviorRef.current = 'alert';
                setBehavior('alert');
                alertUntilRef.current = now + 220;
                lastAlertAtRef.current = now;
                return prev;
              }
              behaviorRef.current = 'running';
              setBehavior('running');
            }

            if (
              behaviorRef.current === 'alert' &&
              now < alertUntilRef.current
            ) {
              return prev;
            }

            if (behaviorRef.current !== 'running') {
              behaviorRef.current = 'running';
              setBehavior('running');
            }

            const { ux, uy } = computeSmoothEscapeVector(
              prev.x,
              prev.y,
              mouse.x,
              mouse.y,
              minX,
              maxX,
              minY,
              maxY
            );

            selectDirection(ux, uy, now);
            const nextX = Math.max(
              minX,
              Math.min(maxX, prev.x + ux * RUN_PACE)
            );
            const nextY = Math.max(
              minY,
              Math.min(maxY, prev.y + uy * RUN_PACE)
            );
            return { x: nextX, y: nextY };
          } else {
            // Safely far from cursor -> sit down, scratch (itch1/itch2), yawn, then sleep
            if (
              behaviorRef.current === 'running' ||
              behaviorRef.current === 'alert'
            ) {
              behaviorRef.current = 'still';
              setBehavior('still');
              idleSinceRef.current = now;
            } else {
              updateIdleCycle(now);
            }
            return prev;
          }
        }
      });

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isCatEnabled]);

  const handleCatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsJumping(true);
    behaviorRef.current = 'alert';
    setBehavior('alert');
    alertUntilRef.current = performance.now() + 450;
    lastAlertAtRef.current = performance.now();
    idleSinceRef.current = performance.now();

    const pool = isCatEnabled ? LOVE_REACTIONS : FLEE_REACTIONS;
    const message = pool[Math.floor(Math.random() * pool.length)];
    setSpeechBubble(message);

    const baseId = particleIdRef.current;
    particleIdRef.current += 5;
    const newParticles: CatParticle[] = [
      { id: baseId + 1, text: '♥', dx: -18, dy: -26, color: '#ff375f' },
      { id: baseId + 2, text: '✦', dx: 20, dy: -30, color: '#ffcc00' },
      { id: baseId + 3, text: '♥', dx: 0, dy: -36, color: '#ff2d55' },
      { id: baseId + 4, text: '♥', dx: 24, dy: -14, color: '#ff6b8b' },
    ];
    setParticles((prev) => [...prev, ...newParticles]);

    window.setTimeout(() => {
      setIsJumping(false);
      if (behaviorRef.current === 'alert') {
        behaviorRef.current = 'still';
        setBehavior('still');
        idleSinceRef.current = performance.now();
      }
    }, 450);

    window.setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
      setSpeechBubble((curr) => (curr === message ? null : curr));
    }, 1050);
  };

  // Pick the exact WebNeko Lucky GIF sprite for current state & direction
  let spriteUrl: string = NEKO_SPRITES.still;
  let flipX = false;

  if (behavior === 'alert') {
    spriteUrl = NEKO_SPRITES.alert;
  } else if (behavior === 'yawning') {
    spriteUrl = NEKO_SPRITES.yawn;
  } else if (behavior === 'itching') {
    spriteUrl = frameToggle === 0 ? NEKO_SPRITES.itch1 : NEKO_SPRITES.itch2;
  } else if (behavior === 'sleeping') {
    spriteUrl = frameToggle === 0 ? NEKO_SPRITES.sleep1 : NEKO_SPRITES.sleep2;
  } else if (behavior === 'running') {
    if (direction === 'n') {
      spriteUrl = frameToggle === 0 ? NEKO_SPRITES.nrun1 : NEKO_SPRITES.nrun2;
    } else if (direction === 'w') {
      spriteUrl = frameToggle === 0 ? NEKO_SPRITES.wrun1 : NEKO_SPRITES.wrun2;
    } else if (direction === 'e') {
      spriteUrl = frameToggle === 0 ? NEKO_SPRITES.erun1 : NEKO_SPRITES.erun2;
    } else if (direction === 'se') {
      spriteUrl = frameToggle === 0 ? NEKO_SPRITES.serun1 : NEKO_SPRITES.serun2;
    } else {
      // 'sw' uses serun1/serun2 mirrored horizontally
      spriteUrl = frameToggle === 0 ? NEKO_SPRITES.serun1 : NEKO_SPRITES.serun2;
      flipX = true;
    }
  } else {
    spriteUrl = NEKO_SPRITES.still;
  }

  return (
    <>
      {/* Bottom-left "You like cats?" glass pill (4/5 narrower width) */}
      <div className="hidden sm:flex fixed bottom-3.5 left-4 z-[85] items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 text-[12px] font-medium text-white shadow-lg select-none">
        <span>You like cats?</span>
        <button
          type="button"
          role="switch"
          aria-checked={isCatEnabled}
          aria-label="Toggle pixel cat chase or flee mode"
          onClick={() => setIsCatEnabled((prev) => !prev)}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white ${
            isCatEnabled ? 'bg-[#0b0b0d]' : 'bg-white/30'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ${
              isCatEnabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* WebNeko Lucky Cat Companion */}
      <div
        style={{
          transform: `translate3d(${Math.round(catPos.x)}px, ${Math.round(
            catPos.y
          )}px, 0)`,
        }}
        className="hidden sm:block fixed top-0 left-0 z-[120] select-none"
      >
        {speechBubble && (
          <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white/95 text-[#1d1d1f] text-[10px] font-semibold whitespace-nowrap shadow-sm border border-black/10">
            {speechBubble}
          </div>
        )}

        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              color: p.color,
              transform: `translate(${p.dx}px, ${p.dy}px)`,
            }}
            className="pointer-events-none absolute left-3 top-1 text-xs font-bold transition-all duration-700 opacity-90 animate-ping"
          >
            {p.text}
          </span>
        ))}

        <button
          type="button"
          onClick={handleCatClick}
          aria-label="Click to pet the pixel cat"
          title="Click me!"
          style={{
            transform: `scaleX(${flipX ? -1 : 1}) ${
              isJumping ? 'translateY(-10px) scale(1.12)' : ''
            }`,
          }}
          className="cursor-pointer pointer-events-auto transition-transform duration-150 focus:outline-none"
        >
          <img
            src={spriteUrl}
            alt="Lucky Pixel Cat"
            width={44}
            height={44}
            draggable={false}
            onError={(e) => {
              const target = e.currentTarget;
              const filename = spriteUrl.split('/').pop();
              if (filename && !target.src.includes('/assets/neko/')) {
                target.src = `/assets/neko/${filename}`;
              }
            }}
            style={{ imageRendering: 'pixelated' }}
            className="w-11 h-11 object-contain pointer-events-none drop-shadow-[0_2px_5px_rgba(0,0,0,0.24)]"
          />
        </button>
      </div>
    </>
  );
};
