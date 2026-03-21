"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Flame, Droplet, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hobby } from "@/lib/types";
import { PixelPlant, levelToPixelStage } from "./pixel-plants";

interface PixelGardenProps {
  hobbies: Hobby[];
  onPlantClick: (hobby: Hobby) => void;
  onAddHobby: () => void;
  recentlyCaredHobbyId?: string | null;
}

// Generate random decorations for the grass
function generateDecorations(count: number, seed: number) {
  const decorations: Array<{ x: number; y: number; type: "grass" | "flower" | "dot" }> = [];
  const rand = (i: number) => ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;
  
  for (let i = 0; i < count; i++) {
    const type = rand(i) > 0.85 ? "flower" : rand(i) > 0.6 ? "grass" : "dot";
    decorations.push({
      x: rand(i * 2) * 100,
      y: rand(i * 3) * 100,
      type,
    });
  }
  return decorations;
}

// Pixel Grass Blade component
function PixelGrass({ x, y }: { x: number; y: number }) {
  const shade = ((x + y) % 2 === 0) ? "#2d5a27" : "#3d6b37";
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="2" height="4" fill={shade} />
      <rect x="2" width="2" height="6" fill="#4a8b3f" />
    </g>
  );
}

// Pixel Flower component
function PixelFlower({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="2" y="2" width="2" height="4" fill="#3d6b37" />
      <rect width="2" height="2" fill="white" />
      <rect x="4" width="2" height="2" fill="white" />
      <rect x="2" y="-2" width="2" height="2" fill="white" />
      <rect x="2" width="2" height="2" fill="#ffd700" />
    </g>
  );
}

// Pixel Dot component
function PixelDot({ x, y }: { x: number; y: number }) {
  const color = ((x + y) % 2 === 0) ? "#c9b896" : "#a89876";
  return <rect x={x} y={y} width="2" height="2" fill={color} />;
}

// Hobby Detail Card Modal
function HobbyDetailCard({ 
  hobby, 
  onClose 
}: { 
  hobby: Hobby; 
  onClose: () => void;
}) {
  const stage = levelToPixelStage(hobby.level);
  const waterLevel = hobby.waterLevel ?? 50;
  const xpProgress = (hobby.xp / hobby.maxXp) * 100;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card border-4 border-foreground/20 rounded-lg max-w-sm w-full overflow-hidden"
        style={{ 
          imageRendering: "pixelated",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.3)"
        }}
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with pixel border */}
        <div className="bg-primary/20 p-4 border-b-4 border-foreground/10 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="w-24 h-28 flex-shrink-0">
              <PixelPlant 
                stage={stage} 
                hobbyName={hobby.name}
                isWatered={waterLevel > 70}
                className="w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{hobby.name}</h2>
              <p className="text-sm text-muted-foreground font-mono">{hobby.level}</p>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="p-4 space-y-4">
          {/* Water Level */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-sky-400" />
                <span className="font-medium">Hydration</span>
              </div>
              <span className="font-mono">{waterLevel}%</span>
            </div>
            <div className="h-3 bg-secondary rounded border-2 border-foreground/10 overflow-hidden">
              <motion.div
                className={`h-full ${
                  waterLevel > 70 ? "bg-sky-400" : 
                  waterLevel > 30 ? "bg-sky-300" : "bg-amber-400"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${waterLevel}%` }}
              />
            </div>
          </div>
          
          {/* XP Progress */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="font-medium">Experience</span>
              </div>
              <span className="font-mono">{hobby.xp}/{hobby.maxXp} XP</span>
            </div>
            <div className="h-3 bg-secondary rounded border-2 border-foreground/10 overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex justify-between pt-2 border-t border-foreground/10">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm">
                <span className="font-bold">{hobby.streak}</span> day streak
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-mono">
                {hobby.careActions ?? 0} care actions
              </span>
            </div>
          </div>
          
          {/* Growth Stage Visual */}
          <div className="pt-2 border-t border-foreground/10">
            <p className="text-xs text-muted-foreground mb-2">Growth Progress</p>
            <div className="flex items-center justify-between">
              {["Seed", "Sprout", "Plant", "Tree"].map((level, idx) => (
                <div 
                  key={level}
                  className={`flex flex-col items-center ${
                    hobby.level === level ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-mono ${
                    hobby.level === level 
                      ? "border-primary bg-primary/20" 
                      : "border-foreground/20"
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-[10px] mt-1">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Plant in garden with hover tooltip
function GardenPlant({ 
  hobby, 
  position,
  onClick,
  isRecentlyCared,
}: { 
  hobby: Hobby;
  position: { x: number; y: number };
  onClick: () => void;
  isRecentlyCared: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const stage = levelToPixelStage(hobby.level);
  const waterLevel = hobby.waterLevel ?? 50;
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: "translate(-50%, -100%)"
      }}
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Plant */}
      <div className={`w-16 h-20 sm:w-20 sm:h-24 relative ${isRecentlyCared ? "animate-pulse" : ""}`}>
        <PixelPlant 
          stage={stage} 
          hobbyName={hobby.name}
          isWatered={waterLevel > 70}
          className="w-full h-full drop-shadow-lg"
        />
        
        {/* Recently cared glow */}
        {isRecentlyCared && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30 blur-md -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      
      {/* Hover tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <div 
              className="bg-card/95 backdrop-blur border-2 border-foreground/20 rounded px-3 py-2 whitespace-nowrap"
              style={{ 
                boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
                imageRendering: "auto"
              }}
            >
              <p className="font-bold text-sm">{hobby.name}</p>
              <div className="flex items-center gap-3 text-xs mt-1">
                <span className="text-muted-foreground">{hobby.level}</span>
                <div className="flex items-center gap-1 text-sky-400">
                  <Droplet className="h-3 w-3" />
                  {waterLevel}%
                </div>
                {hobby.streak > 0 && (
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="h-3 w-3" />
                    {hobby.streak}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Click for details</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PixelGarden({ 
  hobbies, 
  onPlantClick, 
  onAddHobby, 
  recentlyCaredHobbyId 
}: PixelGardenProps) {
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  
  // Generate grass decorations
  const decorations = useMemo(() => generateDecorations(60, 12345), []);
  
  // Seeded random for consistent positions
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Calculate plant positions in a natural garden layout
  const plantPositions = useMemo(() => {
    const positions: Array<{ x: number; y: number }> = [];
    
    hobbies.forEach((hobby, idx) => {
      const row = Math.floor(idx / 4);
      const col = idx % 4;
      const rowOffset = row % 2 === 0 ? 0 : 12;
      
      // Use hobby id as seed for consistent positioning
      const seed = hobby.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const offsetX = (seededRandom(seed) * 6 - 3);
      const offsetY = (seededRandom(seed + 1) * 8 - 4);
      
      positions.push({
        x: 15 + col * 22 + rowOffset + offsetX,
        y: 60 + row * 25 + offsetY,
      });
    });
    
    return positions;
  }, [hobbies]);
  
  const handlePlantClick = (hobby: Hobby) => {
    setSelectedHobby(hobby);
  };

  return (
    <>
      <Card className="h-full min-h-[400px] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
          <CardTitle className="flex items-center gap-2 font-mono">
            <span className="text-2xl" style={{ imageRendering: "pixelated" }}>
              {"🌻"}
            </span>
            Hobby Garden
          </CardTitle>
          <Button onClick={onAddHobby} size="sm" className="gap-1 font-mono">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Plant</span>
          </Button>
        </CardHeader>
        
        <CardContent className="p-0 relative">
          {/* Pixel Art Garden Background */}
          <div 
            className="relative w-full min-h-[350px] overflow-hidden"
            style={{ imageRendering: "pixelated" }}
          >
            {/* Sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-transparent h-1/3" />
            
            {/* Main grass background */}
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: "#5a9b4f",
                backgroundImage: `
                  linear-gradient(90deg, transparent 0%, rgba(74, 139, 63, 0.3) 50%, transparent 100%),
                  linear-gradient(0deg, #4a8b3f 0%, transparent 50%)
                `
              }}
            />
            
            {/* Pixel decorations SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ imageRendering: "pixelated" }}
              preserveAspectRatio="none"
            >
              {decorations.map((dec, i) => {
                if (dec.type === "grass") {
                  return <PixelGrass key={i} x={dec.x * 3} y={dec.y * 3.5} />;
                }
                if (dec.type === "flower") {
                  return <PixelFlower key={i} x={dec.x * 3} y={dec.y * 3.5} />;
                }
                return <PixelDot key={i} x={dec.x * 3} y={dec.y * 3.5} />;
              })}
            </svg>
            
            {/* Plants or empty state */}
            {hobbies.length === 0 ? (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-card/80 backdrop-blur rounded-lg p-6 text-center border-2 border-foreground/10">
                  <div className="w-20 h-24 mx-auto mb-4">
                    <PixelPlant stage={0} hobbyName="default" className="w-full h-full opacity-50" />
                  </div>
                  <p className="text-lg font-mono text-foreground mb-2">Plant your first hobby!</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Watch it grow as you practice
                  </p>
                  <Button onClick={onAddHobby} className="gap-2 font-mono">
                    <Plus className="h-4 w-4" />
                    Add Hobby
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Render plants */}
                {hobbies.map((hobby, idx) => (
                  <GardenPlant
                    key={hobby.id}
                    hobby={hobby}
                    position={plantPositions[idx] || { x: 50, y: 70 }}
                    onClick={() => handlePlantClick(hobby)}
                    isRecentlyCared={recentlyCaredHobbyId === hobby.id}
                  />
                ))}
              </>
            )}
            
            {/* Ground/soil strip at bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-4"
              style={{ 
                backgroundColor: "#6b4423",
                backgroundImage: "linear-gradient(to top, #5d3a1a, #6b4423)"
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedHobby && (
          <HobbyDetailCard
            hobby={selectedHobby}
            onClose={() => setSelectedHobby(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
