"use client";

import { motion } from "framer-motion";

export type GrowthStage = 0 | 1 | 2 | 3 | 4;

interface PlantProps {
  stage: GrowthStage;
  isWatered?: boolean;
  className?: string;
}

// Guitar - Musical note-shaped leaves
export function GuitarPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    stem: isWatered ? "#4a7c59" : "#6b8e5e",
    leaf1: isWatered ? "#e6c95a" : "#d4b84a",
    leaf2: isWatered ? "#c4a742" : "#b39a38",
    pot: "#8b5a2b",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Pot */}
      <path d="M30 110 L35 130 L65 130 L70 110 Z" fill={colors.pot} />
      <ellipse cx="50" cy="110" rx="22" ry="6" fill="#a0522d" />
      
      {/* Soil */}
      <ellipse cx="50" cy="110" rx="18" ry="4" fill="#5d3a1a" />
      
      {/* Stem */}
      {stage >= 1 && (
        <motion.path
          d={`M50 110 Q50 ${110 - stage * 15} 50 ${110 - stage * 18}`}
          stroke={colors.stem}
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}
      
      {/* Musical note leaves */}
      {stage >= 2 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
          <ellipse cx="38" cy="75" rx="10" ry="8" fill={colors.leaf1} transform="rotate(-20 38 75)" />
          <path d="M48 75 L48 55" stroke={colors.stem} strokeWidth="2" />
        </motion.g>
      )}
      
      {stage >= 3 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
          <ellipse cx="62" cy="65" rx="10" ry="8" fill={colors.leaf2} transform="rotate(20 62 65)" />
          <path d="M52 65 L52 45" stroke={colors.stem} strokeWidth="2" />
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}>
          <ellipse cx="50" cy="45" rx="12" ry="10" fill={colors.leaf1} />
          <path d="M50 45 L50 25" stroke={colors.stem} strokeWidth="3" />
          <circle cx="50" cy="22" r="5" fill={colors.leaf2} />
        </motion.g>
      )}
      
      {/* Water drops effect */}
      {isWatered && (
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: [0, 1, 0], y: [0, 20, 40] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <circle cx="45" cy="50" r="2" fill="#87ceeb" />
          <circle cx="55" cy="55" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Fitness - Strong cactus-like plant
export function FitnessPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    main: isWatered ? "#2d5a3d" : "#3d6b4d",
    accent: isWatered ? "#1e4a2d" : "#2d5a3d",
    pot: "#c45a3a",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Pot */}
      <path d="M28 110 L33 130 L67 130 L72 110 Z" fill={colors.pot} />
      <ellipse cx="50" cy="110" rx="24" ry="7" fill="#d46a4a" />
      <ellipse cx="50" cy="110" rx="20" ry="5" fill="#5d3a1a" />
      
      {/* Main body */}
      {stage >= 1 && (
        <motion.rect
          x="42"
          y={110 - stage * 12}
          width="16"
          height={stage * 12}
          rx="8"
          fill={colors.main}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ transformOrigin: "bottom" }}
        />
      )}
      
      {/* Arms */}
      {stage >= 2 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
          <rect x="28" y="80" width="14" height="25" rx="7" fill={colors.main} transform="rotate(-15 35 92)" />
        </motion.g>
      )}
      
      {stage >= 3 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
          <rect x="58" y="70" width="14" height="30" rx="7" fill={colors.main} transform="rotate(15 65 85)" />
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}>
          {/* Flower on top */}
          <circle cx="50" cy="50" r="8" fill="#ff6b6b" />
          <circle cx="50" cy="50" r="4" fill="#ffd93d" />
        </motion.g>
      )}
      
      {isWatered && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx="42" cy="85" r="2" fill="#87ceeb" />
          <circle cx="58" cy="75" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Painting - Colorful flower
export function PaintingPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    stem: isWatered ? "#228b22" : "#3a9a3a",
    petals: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#f38181"],
    center: "#ffd93d",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Pot - artistic */}
      <path d="M25 110 L30 130 L70 130 L75 110 Z" fill="#6c5ce7" />
      <ellipse cx="50" cy="110" rx="27" ry="7" fill="#a29bfe" />
      <ellipse cx="50" cy="110" rx="22" ry="5" fill="#5d3a1a" />
      
      {/* Stem */}
      {stage >= 1 && (
        <motion.path
          d={`M50 110 C45 90 55 80 50 ${110 - stage * 15}`}
          stroke={colors.stem}
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}
      
      {/* Leaves */}
      {stage >= 2 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <ellipse cx="35" cy="85" rx="12" ry="6" fill={colors.stem} transform="rotate(-30 35 85)" />
          <ellipse cx="65" cy="80" rx="12" ry="6" fill={colors.stem} transform="rotate(30 65 80)" />
        </motion.g>
      )}
      
      {/* Flower petals */}
      {stage >= 3 && (
        <motion.g initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }}>
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="45"
              rx="8"
              ry="14"
              fill={colors.petals[i]}
              transform={`rotate(${angle} 50 55)`}
            />
          ))}
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.circle
          cx="50"
          cy="55"
          r="10"
          fill={colors.center}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        />
      )}
      
      {isWatered && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <circle cx="40" cy="60" r="2" fill="#87ceeb" />
          <circle cx="60" cy="50" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Reading - Book-shaped plant
export function ReadingPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    stem: isWatered ? "#2e7d32" : "#388e3c",
    leaves: isWatered ? "#81c784" : "#a5d6a7",
    accent: "#8d6e63",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Pot - book-like */}
      <rect x="28" y="108" width="44" height="22" rx="2" fill={colors.accent} />
      <rect x="30" y="110" width="40" height="2" fill="#6d4c41" />
      <ellipse cx="50" cy="108" rx="20" ry="4" fill="#5d3a1a" />
      
      {/* Stem */}
      {stage >= 1 && (
        <motion.path
          d={`M50 108 L50 ${108 - stage * 14}`}
          stroke={colors.stem}
          strokeWidth="5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}
      
      {/* Page-like leaves */}
      {stage >= 2 && (
        <motion.g initial={{ rotateY: 90 }} animate={{ rotateY: 0 }}>
          <path d="M50 85 Q35 80 30 70 Q35 75 50 80 Z" fill={colors.leaves} />
          <path d="M50 85 Q65 80 70 70 Q65 75 50 80 Z" fill={colors.leaves} />
        </motion.g>
      )}
      
      {stage >= 3 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
          <path d="M50 70 Q30 65 25 50 Q30 60 50 65 Z" fill={colors.leaves} />
          <path d="M50 70 Q70 65 75 50 Q70 60 50 65 Z" fill={colors.leaves} />
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
          <circle cx="50" cy="45" r="12" fill="#fff9c4" />
          <text x="50" y="50" textAnchor="middle" fontSize="12" fill={colors.accent}>A</text>
        </motion.g>
      )}
      
      {isWatered && (
        <motion.g animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <circle cx="45" cy="65" r="2" fill="#87ceeb" />
          <circle cx="55" cy="75" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Cooking - Herb plant
export function CookingPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    stem: isWatered ? "#43a047" : "#66bb6a",
    herb: isWatered ? "#558b2f" : "#7cb342",
    pot: "#ff7043",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Pot - cooking pot style */}
      <ellipse cx="50" cy="120" rx="25" ry="10" fill={colors.pot} />
      <path d="M25 120 L28 135 L72 135 L75 120" fill={colors.pot} />
      <ellipse cx="50" cy="120" rx="20" ry="7" fill="#5d3a1a" />
      
      {/* Stems and herbs */}
      {stage >= 1 && (
        <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: "bottom" }}>
          <path d="M50 120 L50 100" stroke={colors.stem} strokeWidth="3" />
          <path d="M45 120 L40 105" stroke={colors.stem} strokeWidth="2" />
          <path d="M55 120 L60 105" stroke={colors.stem} strokeWidth="2" />
        </motion.g>
      )}
      
      {stage >= 2 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <ellipse cx="50" cy="95" rx="6" ry="10" fill={colors.herb} />
          <ellipse cx="38" cy="100" rx="5" ry="8" fill={colors.herb} transform="rotate(-20 38 100)" />
          <ellipse cx="62" cy="100" rx="5" ry="8" fill={colors.herb} transform="rotate(20 62 100)" />
        </motion.g>
      )}
      
      {stage >= 3 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
          <ellipse cx="45" cy="80" rx="7" ry="12" fill={colors.herb} transform="rotate(-10 45 80)" />
          <ellipse cx="55" cy="80" rx="7" ry="12" fill={colors.herb} transform="rotate(10 55 80)" />
          <ellipse cx="50" cy="75" rx="6" ry="10" fill={colors.stem} />
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
          <ellipse cx="35" cy="70" rx="8" ry="14" fill={colors.herb} transform="rotate(-25 35 70)" />
          <ellipse cx="65" cy="70" rx="8" ry="14" fill={colors.herb} transform="rotate(25 65 70)" />
          <ellipse cx="50" cy="60" rx="10" ry="16" fill={colors.stem} />
        </motion.g>
      )}
      
      {isWatered && (
        <motion.g animate={{ opacity: [0, 0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <circle cx="42" cy="85" r="2" fill="#87ceeb" />
          <circle cx="58" cy="90" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Photography - Sunflower
export function PhotographyPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    stem: isWatered ? "#2e7d32" : "#388e3c",
    petals: isWatered ? "#ffc107" : "#ffca28",
    center: "#5d4037",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Pot */}
      <path d="M30 110 L35 130 L65 130 L70 110 Z" fill="#607d8b" />
      <ellipse cx="50" cy="110" rx="22" ry="6" fill="#78909c" />
      <ellipse cx="50" cy="110" rx="18" ry="4" fill="#5d3a1a" />
      
      {/* Stem */}
      {stage >= 1 && (
        <motion.path
          d={`M50 110 L50 ${110 - stage * 15}`}
          stroke={colors.stem}
          strokeWidth="5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}
      
      {/* Leaves */}
      {stage >= 2 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <ellipse cx="35" cy="90" rx="12" ry="7" fill={colors.stem} transform="rotate(-40 35 90)" />
          <ellipse cx="65" cy="85" rx="12" ry="7" fill={colors.stem} transform="rotate(40 65 85)" />
        </motion.g>
      )}
      
      {/* Sunflower petals */}
      {stage >= 3 && (
        <motion.g initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="50"
              rx="5"
              ry="12"
              fill={colors.petals}
              transform={`rotate(${i * 30} 50 58)`}
            />
          ))}
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.circle
          cx="50"
          cy="58"
          r="12"
          fill={colors.center}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        />
      )}
      
      {isWatered && (
        <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <circle cx="40" cy="70" r="2" fill="#87ceeb" />
          <circle cx="60" cy="65" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Writing - Quill-like plant
export function WritingPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    stem: isWatered ? "#1b5e20" : "#2e7d32",
    feather: isWatered ? "#7986cb" : "#9fa8da",
    accent: "#3f51b5",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Pot - inkwell style */}
      <ellipse cx="50" cy="115" rx="18" ry="15" fill="#37474f" />
      <ellipse cx="50" cy="108" rx="16" ry="8" fill="#455a64" />
      <ellipse cx="50" cy="108" rx="12" ry="5" fill="#263238" />
      
      {/* Main stem/quill */}
      {stage >= 1 && (
        <motion.path
          d={`M50 108 Q55 85 50 ${108 - stage * 18}`}
          stroke={colors.stem}
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}
      
      {/* Feather fronds */}
      {stage >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <path d="M50 80 Q35 75 30 85 Q40 80 50 82" fill={colors.feather} />
          <path d="M50 80 Q65 75 70 85 Q60 80 50 82" fill={colors.feather} />
        </motion.g>
      )}
      
      {stage >= 3 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <path d="M48 65 Q30 60 25 70 Q35 65 48 68" fill={colors.feather} />
          <path d="M52 65 Q70 60 75 70 Q65 65 52 68" fill={colors.feather} />
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
          <path d="M50 50 Q25 45 20 55 Q35 50 50 55" fill={colors.accent} />
          <path d="M50 50 Q75 45 80 55 Q65 50 50 55" fill={colors.accent} />
          <circle cx="50" cy="45" r="5" fill={colors.accent} />
        </motion.g>
      )}
      
      {isWatered && (
        <motion.g animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <circle cx="45" cy="70" r="2" fill="#87ceeb" />
          <circle cx="55" cy="60" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Gardening - Multiple small plants
export function GardeningPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    stem: isWatered ? "#388e3c" : "#4caf50",
    leaf: isWatered ? "#66bb6a" : "#81c784",
    flower: "#e91e63",
    pot: "#795548",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Wide planter box */}
      <rect x="15" y="108" width="70" height="22" rx="3" fill={colors.pot} />
      <rect x="18" y="108" width="64" height="4" fill="#8d6e63" />
      <rect x="20" y="110" width="60" height="3" fill="#5d3a1a" />
      
      {/* Multiple small plants */}
      {stage >= 1 && (
        <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: "bottom" }}>
          <path d="M30 108 L30 95" stroke={colors.stem} strokeWidth="2" />
          <path d="M50 108 L50 90" stroke={colors.stem} strokeWidth="3" />
          <path d="M70 108 L70 95" stroke={colors.stem} strokeWidth="2" />
        </motion.g>
      )}
      
      {stage >= 2 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <ellipse cx="30" cy="92" rx="6" ry="8" fill={colors.leaf} />
          <ellipse cx="50" cy="85" rx="8" ry="10" fill={colors.leaf} />
          <ellipse cx="70" cy="92" rx="6" ry="8" fill={colors.leaf} />
        </motion.g>
      )}
      
      {stage >= 3 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
          <ellipse cx="25" cy="85" rx="5" ry="7" fill={colors.stem} transform="rotate(-20 25 85)" />
          <ellipse cx="35" cy="85" rx="5" ry="7" fill={colors.stem} transform="rotate(20 35 85)" />
          <ellipse cx="45" cy="75" rx="6" ry="9" fill={colors.stem} transform="rotate(-15 45 75)" />
          <ellipse cx="55" cy="75" rx="6" ry="9" fill={colors.stem} transform="rotate(15 55 75)" />
          <ellipse cx="65" cy="85" rx="5" ry="7" fill={colors.stem} transform="rotate(-20 65 85)" />
          <ellipse cx="75" cy="85" rx="5" ry="7" fill={colors.stem} transform="rotate(20 75 85)" />
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
          <circle cx="30" cy="80" r="5" fill={colors.flower} />
          <circle cx="50" cy="65" r="7" fill="#ff9800" />
          <circle cx="70" cy="80" r="5" fill="#9c27b0" />
          <circle cx="30" cy="80" r="2" fill="#ffeb3b" />
          <circle cx="50" cy="65" r="3" fill="#ffeb3b" />
          <circle cx="70" cy="80" r="2" fill="#ffeb3b" />
        </motion.g>
      )}
      
      {isWatered && (
        <motion.g animate={{ opacity: [0, 0.7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <circle cx="35" cy="75" r="2" fill="#87ceeb" />
          <circle cx="50" cy="80" r="2" fill="#87ceeb" />
          <circle cx="65" cy="75" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Default plant for unknown hobbies
export function DefaultPlant({ stage, isWatered, className }: PlantProps) {
  const colors = {
    stem: isWatered ? "#4caf50" : "#66bb6a",
    leaf: isWatered ? "#81c784" : "#a5d6a7",
    pot: "#8d6e63",
  };

  return (
    <motion.svg
      viewBox="0 0 100 140"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Pot */}
      <path d="M30 110 L35 130 L65 130 L70 110 Z" fill={colors.pot} />
      <ellipse cx="50" cy="110" rx="22" ry="6" fill="#a1887f" />
      <ellipse cx="50" cy="110" rx="18" ry="4" fill="#5d3a1a" />
      
      {/* Stem */}
      {stage >= 1 && (
        <motion.path
          d={`M50 110 L50 ${110 - stage * 15}`}
          stroke={colors.stem}
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}
      
      {/* Leaves */}
      {stage >= 2 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <ellipse cx="38" cy="90" rx="10" ry="6" fill={colors.leaf} transform="rotate(-30 38 90)" />
          <ellipse cx="62" cy="85" rx="10" ry="6" fill={colors.leaf} transform="rotate(30 62 85)" />
        </motion.g>
      )}
      
      {stage >= 3 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
          <ellipse cx="35" cy="75" rx="12" ry="7" fill={colors.leaf} transform="rotate(-40 35 75)" />
          <ellipse cx="65" cy="70" rx="12" ry="7" fill={colors.leaf} transform="rotate(40 65 70)" />
        </motion.g>
      )}
      
      {stage >= 4 && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
          <ellipse cx="50" cy="55" rx="15" ry="10" fill={colors.stem} />
          <circle cx="50" cy="55" r="6" fill="#fff59d" />
        </motion.g>
      )}
      
      {isWatered && (
        <motion.g animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <circle cx="45" cy="75" r="2" fill="#87ceeb" />
          <circle cx="55" cy="80" r="2" fill="#87ceeb" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Plant selector based on hobby name
export function getPlantComponent(hobbyName: string) {
  const lowerName = hobbyName.toLowerCase();
  
  if (lowerName.includes("guitar") || lowerName.includes("music") || lowerName.includes("piano")) {
    return GuitarPlant;
  }
  if (lowerName.includes("fitness") || lowerName.includes("gym") || lowerName.includes("exercise") || lowerName.includes("workout")) {
    return FitnessPlant;
  }
  if (lowerName.includes("paint") || lowerName.includes("art") || lowerName.includes("draw")) {
    return PaintingPlant;
  }
  if (lowerName.includes("read") || lowerName.includes("book")) {
    return ReadingPlant;
  }
  if (lowerName.includes("cook") || lowerName.includes("bak") || lowerName.includes("chef")) {
    return CookingPlant;
  }
  if (lowerName.includes("photo") || lowerName.includes("camera")) {
    return PhotographyPlant;
  }
  if (lowerName.includes("writ") || lowerName.includes("journal") || lowerName.includes("blog")) {
    return WritingPlant;
  }
  if (lowerName.includes("garden") || lowerName.includes("plant")) {
    return GardeningPlant;
  }
  
  return DefaultPlant;
}
