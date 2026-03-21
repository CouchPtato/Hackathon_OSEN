"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hobby } from "@/lib/types";
import { PixelPlant, levelToPixelStage } from "./pixel-plants";

// ---------- TYPES ----------
type Position = {
  x: number;
  y: number;
  scale: number;
};

type PositionsMap = Record<string, Position>;

// ---------- RANDOM ----------
const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// ---------- TIME ----------
type TimePhase = "dawn" | "day" | "noon" | "dusk" | "night";

function getTimePhase(): TimePhase {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 11) return "day";
  if (h >= 11 && h < 15) return "noon";
  if (h >= 15 && h < 18) return "dusk";
  return "night";
}

// ---------- 🐝 SMART BEE ----------
function Bee({
  hobbies,
  positionsMap,
}: {
  hobbies: Hobby[];
  positionsMap: PositionsMap;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>({
    x: 50,
    y: 30,
  });
  const [direction, setDirection] = useState(1);

  const pickTarget = () => {
    if (!hobbies.length) return null;

    const flowering = hobbies.filter((h) => h.level === "Tree");
    const pool = (flowering.length ? flowering : hobbies).sort(
      (a, b) => b.xp - a.xp
    );

    return pool[Math.floor(Math.random() * Math.min(3, pool.length))];
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const move = () => {
      setPos((prev) => {
        const target = pickTarget();

        let newX = prev.x;
        let newY = prev.y;

        if (target && positionsMap[target.id]) {
          const t = positionsMap[target.id];
          newX = t.x + rand(-5, 5);
          newY = t.y - 10 + rand(-5, 5);
        } else {
          newX = prev.x + rand(-10, 10);
          newY = prev.y + rand(-10, 10);
        }

        newX = Math.max(5, Math.min(95, newX));
        newY = Math.max(10, Math.min(80, newY));

        // update direction safely
        setDirection(newX > prev.x ? 1 : -1);

        return { x: newX, y: newY };
      });

      timeout = setTimeout(move, 2000 + Math.random() * 2000);
    };

    move();
    return () => clearTimeout(timeout);
  }, [hobbies, positionsMap]); // ✅ NO pos here

  return (
    <motion.div
      className="absolute pointer-events-none"
      animate={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
      }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{ transform: `scale(${direction}, 1)` }}
    >
      <motion.div
        animate={{ x: [0, 1, -1, 1, 0], y: [0, -1, 1, -1, 0] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      >
        <img
          src="/sprites/bee.png"
          className="w-16 h-16"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.div>
    </motion.div>
  );
}

function Bees({
  hobbies,
  positionsMap,
}: {
  hobbies: Hobby[];
  positionsMap: PositionsMap;
}) {
  return (
    <>
      <Bee hobbies={hobbies} positionsMap={positionsMap} />
      <Bee hobbies={hobbies} positionsMap={positionsMap} />
      <Bee hobbies={hobbies} positionsMap={positionsMap} />
    </>
  );
}

// ---------- 🌱 PLANT ----------
function GardenPlant({
  hobby,
  position,
  onClick,
}: {
  hobby: Hobby;
  position: Position;
  onClick: () => void;
}) {
  const stage = levelToPixelStage(hobby.level);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
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
    >
      {/* shadow */}
      <div className="absolute w-8 h-2 bg-black/30 rounded-full blur-sm bottom-6 left-1/2 -translate-x-1/2" />

      <div className="w-24 h-32">
        <PixelPlant stage={stage} hobbyName={hobby.name} />
      </div>
    </motion.div>
  );
}

// ---------- MAIN ----------
export function PixelGarden({
  hobbies,
  onPlantClick,
  onAddHobby,
}: {
  hobbies: Hobby[];
  onPlantClick: (h: Hobby) => void;
  onAddHobby: () => void;
}) {
  const [positionsMap, setPositionsMap] = useState<PositionsMap>({});
  const [timePhase, setTimePhase] = useState<TimePhase>("day");

  useEffect(() => {
    const update = () => setTimePhase(getTimePhase());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // ---------- NON-OVERLAP LOGIC ----------
  useEffect(() => {
    setPositionsMap((prev) => {
      const updated: PositionsMap = { ...prev };
      const placed: Position[] = [];

      hobbies.forEach((h) => {
        if (!updated[h.id]) {
          let tries = 0;
          let pos: Position;

          do {
            pos = {
              x: rand(10, 90),
              y: rand(55, 85),
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

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between">
        <CardTitle>🌻 Hobby Garden</CardTitle>
        <Button onClick={onAddHobby}>
          <Plus className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="relative min-h-[400px] overflow-hidden">

        {/* 🌿 BACKGROUND (FIXED) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/tiles/grass.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            imageRendering: "pixelated",
          }}
        />

        {/* 🌙 TIME OVERLAY (SAFE) */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            timePhase === "dawn"
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

        {/* 🐝 BEES (already safe) */}
        {timePhase !== "night" && (
          <Bees hobbies={hobbies} positionsMap={positionsMap} />
        )}

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
              onClick={() => onPlantClick(h)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}