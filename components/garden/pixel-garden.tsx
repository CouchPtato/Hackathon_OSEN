"use client";


import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Hobby } from "@/lib/types";
import { levelToPixelStage, PixelPlant } from "./pixel-plants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

// Utility to get time phase
function getTimePhase(): TimePhase {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 11) return "day";
  if (h >= 11 && h < 15) return "noon";
  if (h >= 15 && h < 18) return "dusk";
  return "night";
}

// Types for plant positions and time phase
type Position = { x: number; y: number; scale: number };
type PositionsMap = Record<string, Position>;
type TimePhase = "dawn" | "day" | "noon" | "dusk" | "night";

// Random utility
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// Generic Insect (Bee/Firefly) that hovers above plants
function Insect({
  hobbies,
  positionsMap,
  sprite,
  timePhase,
}: {
  hobbies: Hobby[];
  positionsMap: PositionsMap;
  sprite: string;
  timePhase: TimePhase;
}) {
  // Pick a random plant to hover above
  const [targetId, setTargetId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1);
  const [hover, setHover] = useState({ x: 0, y: 0 });

  // Pick a new target plant occasionally
  useEffect(() => {
    if (!hobbies.length) return;
    const pick = () => {
      const idx = Math.floor(Math.random() * hobbies.length);
      setTargetId(hobbies[idx].id);
    };
    pick();
    const interval = setInterval(pick, 8000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [hobbies]);

  // Animate random hovering above the plant
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const animate = () => {
      setOffset({
        x: rand(-8, 8),
        y: rand(-18, -10), // always above
      });
      setHover({
        x: rand(-2, 2),
        y: rand(-2, 2),
      });
      timeout = setTimeout(animate, 1800 + Math.random() * 2000);
    };
    animate();
    return () => clearTimeout(timeout);
  }, [targetId]);

  // Flip direction based on movement
  useEffect(() => {
    setDirection(offset.x > 0 ? 1 : -1);
  }, [offset.x]);

  if (!targetId || !positionsMap[targetId]) return null;
  const pos = positionsMap[targetId];

  return (
    <motion.div
      className="absolute pointer-events-none z-30"
      animate={{
        left: `${pos.x + offset.x}%`,
        top: `${pos.y + offset.y}%`,
      }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      style={{ transform: `scale(${direction}, 1)` }}
    >
      <motion.div
        animate={{ x: [0, hover.x, -hover.x, hover.x, 0], y: [0, hover.y, -hover.y, hover.y, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      >
        <img
          src={sprite}
          className={sprite.includes("bee") ? "w-14 h-14 drop-shadow-lg" : "w-6 h-6 drop-shadow-lg"}
          style={{ imageRendering: "pixelated" }}
          alt="insect"
        />
      </motion.div>
    </motion.div>
  );
}


// Insects wrapper (bees or fireflies)
function Insects({
  hobbies,
  positionsMap,
  timePhase,
}: {
  hobbies: Hobby[];
  positionsMap: PositionsMap;
  timePhase: TimePhase;
}) {
  // Use bees for dawn/day/noon, fireflies for dusk/night
  const sprite = ["dawn", "day", "noon"].includes(timePhase)
    ? "/sprites/bee.png"
    : "/sprites/firefly.png";
  return (
    <>
      <Insect hobbies={hobbies} positionsMap={positionsMap} sprite={sprite} timePhase={timePhase} />
      <Insect hobbies={hobbies} positionsMap={positionsMap} sprite={sprite} timePhase={timePhase} />
      <Insect hobbies={hobbies} positionsMap={positionsMap} sprite={sprite} timePhase={timePhase} />
    </>
  );
}


// ---------- 🌱 PLANT ----------
function GardenPlant({
  hobby,
  position,
  onClick,
  onDrag,
  onDragEnd,
}: {
  hobby: Hobby;
  position: Position;
  onClick: () => void;
  onDrag: (dx: number, dy: number) => void;
  onDragEnd: (dx: number, dy: number) => void;
}) {
  const stage = levelToPixelStage(hobby.level);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  // Mouse drag handlers
  function handleMouseDown(e: React.MouseEvent) {
    e.stopPropagation();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    setDragOffset({ x: 0, y: 0 });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }
  function handleMouseMove(e: MouseEvent) {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setDragOffset({ x: dx, y: dy });
    onDrag(dx, dy);
  }
  function handleMouseUp(e: MouseEvent) {
    setDragging(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    onDragEnd(dragOffset.x, dragOffset.y);
    setDragOffset({ x: 0, y: 0 });
    dragStart.current = null;
  }

  return (
    <motion.div
      className={`absolute cursor-pointer group ${dragging ? 'z-50' : ''}`}
      style={{
        left: `calc(${position.x}% + ${dragOffset.x}px)`,
        top: `calc(${position.y}% + ${dragOffset.y}px)`,
        zIndex: Math.floor(position.y * 10),
        transformOrigin: "bottom center",
      }}
      animate={{
        x: "-50%",
        y: "-100%",
        scale: position.scale,
      }}
      whileHover={{ scale: position.scale + 0.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={handleMouseDown}
    >
      {/* shadow handled in PixelPlant */}
      <div style={{ width: `${56 * position.scale}px`, height: `${72 * position.scale}px` }} className="flex items-end justify-center">
        <PixelPlant stage={stage} hobbyName={hobby.name} className="relative" />
      </div>

      {/* Hobby name below plant on hover */}
      {hovered && (
        <div className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded shadow z-20 pointer-events-none whitespace-nowrap">
          {hobby.name}
        </div>
      )}
    </motion.div>
  );
}

// ---------- MAIN ----------
export function PixelGarden({
  hobbies,
  onPlantClick,
  onAddHobby,
  onRemoveHobby,
}: {
  hobbies: Hobby[];
  onPlantClick: (h: Hobby) => void;
  onAddHobby: () => void;
  onRemoveHobby: (hobbyId: string) => void;
}) {
  const [positionsMap, setPositionsMap] = useState<PositionsMap>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('garden-positions');
        if (saved) return JSON.parse(saved);
      } catch { }
    }
    return {};
  });
  const [autoTimePhase, setAutoTimePhase] = useState<TimePhase>("day");
  const [manualTheme, setManualTheme] = useState<string>("auto");
  const [shovelMode, setShovelMode] = useState(false);

  // Update autoTimePhase every minute
  useEffect(() => {
    const update = () => setAutoTimePhase(getTimePhase());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // Determine which theme to use
  const timePhase: TimePhase = manualTheme === "auto" ? autoTimePhase : (manualTheme as TimePhase);

  // ---------- NON-OVERLAP LOGIC ----------
  // Restore or randomize positions for new hobbies
  useEffect(() => {
    setPositionsMap((prev) => {
      const updated: PositionsMap = { ...prev };
      const placed: Position[] = [];

      // Margins to keep the largest plant (stage 6) fully inside
      const marginX = 12; // percent, adjust as needed for plant width
      const marginY = 18; // percent, adjust as needed for plant height
      const minX = marginX;
      const maxX = 100 - marginX;
      const minY = marginY;
      const maxY = 100 - marginY;

      hobbies.forEach((h) => {
        if (!updated[h.id]) {
          let tries = 0;
          let pos: Position;

          do {
            pos = {
              x: rand(minX, maxX),
              y: rand(minY, maxY),
              scale: rand(0.8, 1),
            };
            tries++;
          } while (
            placed.some(
              (p) =>
                Math.abs(p.x - pos.x) < 12 &&
                Math.abs(p.y - pos.y) < 10
            ) &&
            tries < 50
          );

          updated[h.id] = pos;
          placed.push(pos);
        } else {
          placed.push(updated[h.id]);
        }
      });

      return updated;
    });
  }, [hobbies]);

  // Persist positions to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('garden-positions', JSON.stringify(positionsMap));
      } catch { }
    }
  }, [positionsMap]);

  return (
    <Card className="h-full glow-green">
      <CardHeader className="flex justify-between items-center gap-2">
        <CardTitle>🌻 Hobby Garden</CardTitle>
        <div className="flex gap-2 items-center">
          {/* Theme Dropdown */}
          <select
            value={manualTheme}
            onChange={e => setManualTheme(e.target.value)}
            className="rounded border px-2 py-1 text-sm bg-background text-foreground"
            title="Select Tiles Theme"
          >
            <option value="auto">Auto</option>
            <option value="dawn">Dawn</option>
            <option value="day">Day</option>
            <option value="noon">Noon</option>
            <option value="dusk">Dusk</option>
            <option value="night">Night</option>
          </select>
          <button
            onClick={() => setShovelMode((m) => !m)}
            title={shovelMode ? "Exit Shovel Mode" : "Remove Plant (Shovel Mode)"}
            className={`rounded-full bg-yellow-400 hover:bg-yellow-500 text-white p-2 shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 flex items-center justify-center ${shovelMode ? 'ring-2 ring-yellow-600' : ''}`}
            style={{ width: 36, height: 36 }}
          >
            <span style={{ fontSize: 20 }} role="img" aria-label="Shovel">🪏</span>
          </button>
          <button
            onClick={onAddHobby}
            title="Add Hobby"
            className="rounded-full bg-green-500 hover:bg-green-600 text-white p-2 shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 flex items-center justify-center"
            style={{ width: 36, height: 36 }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className={`relative min-h-[400px] overflow-hidden garden-area ${shovelMode ? 'cursor-[url(/sprites/shovel-cursor.png),pointer] cursor-pointer' : ''}`}>

        {/* 🌿 BACKGROUND (FIXED) */}

        {/* Dynamic grass background based on time of day */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/tiles/grass_${timePhase}.jpg')`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            imageRendering: "pixelated",
          }}
        />

        {/* 🌙 TIME OVERLAY (SAFE) */}
        <div
          className={`absolute inset-0 pointer-events-none ${timePhase === "dawn"
            ? "bg-orange-200/30"
            : timePhase === "noon"
              ? "bg-yellow-100/20"
              : timePhase === "dusk"
                ? "bg-purple-300/30"
                : timePhase === "night"
                  ? "bg-indigo-900/60"
                  : ""
            }`}
        />

        {/* 🐝/🪲 Insects (bees/fireflies) always above plants */}
        <Insects hobbies={hobbies} positionsMap={positionsMap} timePhase={timePhase} />

        {/* 🌱 EMPTY */}
        {hobbies.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
            🌱 Start planting your hobbies
          </div>
        )}

        {/* 🌱 PLANTS (FORCE CLICKABLE) */}
        {hobbies.map((h) => (
          <div key={h.id} className="pointer-events-auto">
            <GardenPlant
              hobby={h}
              position={positionsMap[h.id] || { x: 50, y: 70, scale: 1 }}
              onClick={() => {
                if (shovelMode) {
                  onRemoveHobby(h.id);
                } else {
                  onPlantClick(h);
                }
              }}
              onDrag={(dx, dy) => { }}
              onDragEnd={(dx, dy) => {
                // Convert pixel drag to percent (approximate)
                const garden = document.querySelector('.garden-area');
                if (!garden) return;
                const rect = garden.getBoundingClientRect();
                const percentX = (dx / rect.width) * 100;
                const percentY = (dy / rect.height) * 100;
                setPositionsMap((prev) => {
                  const newMap = {
                    ...prev,
                    [h.id]: {
                      ...prev[h.id],
                      x: Math.max(5, Math.min(95, prev[h.id].x + percentX)),
                      y: Math.max(5, Math.min(95, prev[h.id].y + percentY)),
                    },
                  };
                  // Persist immediately
                  if (typeof window !== 'undefined') {
                    try {
                      localStorage.setItem('garden-positions', JSON.stringify(newMap));
                    } catch { }
                  }
                  return newMap;
                });
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}