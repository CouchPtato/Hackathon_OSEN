"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Scissors, Hand, Sparkles, Home, Plus, TreeDeciduous, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GrowthStage, getPlantComponent } from "./plant-graphics";
import { cn } from "@/lib/utils";

export interface GardenPlant {
  id: string;
  name: string;
  stage: GrowthStage;
  waterLevel: number;
  careActions: number;
  lastCared: Date | null;
  isWatered: boolean;
}

interface InteractiveGardenProps {
  onBackToHome: () => void;
}

const HOBBY_OPTIONS = [
  { name: "Guitar", icon: "🎸", color: "bg-amber-100 dark:bg-amber-900/30" },
  { name: "Fitness", icon: "💪", color: "bg-red-100 dark:bg-red-900/30" },
  { name: "Painting", icon: "🎨", color: "bg-purple-100 dark:bg-purple-900/30" },
  { name: "Reading", icon: "📚", color: "bg-blue-100 dark:bg-blue-900/30" },
  { name: "Cooking", icon: "🍳", color: "bg-orange-100 dark:bg-orange-900/30" },
  { name: "Photography", icon: "📷", color: "bg-gray-100 dark:bg-gray-900/30" },
  { name: "Writing", icon: "✍️", color: "bg-indigo-100 dark:bg-indigo-900/30" },
  { name: "Gardening", icon: "🌻", color: "bg-green-100 dark:bg-green-900/30" },
];

const CARE_ACTIONS = [
  { id: "water", label: "Water", icon: Droplets, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "prune", label: "Prune", icon: Scissors, color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
  { id: "tend", label: "Tend", icon: Hand, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-900/20" },
  { id: "nurture", label: "Nurture", icon: Sparkles, color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
];

export function InteractiveGarden({ onBackToHome }: InteractiveGardenProps) {
  const [plants, setPlants] = useState<GardenPlant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const [showHobbyMenu, setShowHobbyMenu] = useState(false);
  const [careInProgress, setCareInProgress] = useState<string | null>(null);
  const [recentActions, setRecentActions] = useState<{ plantId: string; action: string; timestamp: Date }[]>([]);

  const addPlant = useCallback((hobbyName: string) => {
    const newPlant: GardenPlant = {
      id: `plant-${Date.now()}`,
      name: hobbyName,
      stage: 0,
      waterLevel: 50,
      careActions: 0,
      lastCared: null,
      isWatered: false,
    };
    setPlants((prev) => [...prev, newPlant]);
    setShowHobbyMenu(false);
  }, []);

  const performCareAction = useCallback((plantId: string, actionType: string) => {
    setCareInProgress(actionType);
    
    setTimeout(() => {
      setPlants((prev) =>
        prev.map((plant) => {
          if (plant.id !== plantId) return plant;
          
          const newCareActions = plant.careActions + 1;
          const newStage = Math.min(4, Math.floor(newCareActions / 2)) as GrowthStage;
          const isWatered = actionType === "water" ? true : plant.isWatered;
          
          return {
            ...plant,
            stage: newStage,
            careActions: newCareActions,
            waterLevel: actionType === "water" ? Math.min(100, plant.waterLevel + 30) : Math.max(0, plant.waterLevel - 5),
            lastCared: new Date(),
            isWatered,
          };
        })
      );

      setRecentActions((prev) => [
        { plantId, action: actionType, timestamp: new Date() },
        ...prev.slice(0, 4),
      ]);

      setCareInProgress(null);

      // Reset watered status after animation
      if (actionType === "water") {
        setTimeout(() => {
          setPlants((prev) =>
            prev.map((plant) =>
              plant.id === plantId ? { ...plant, isWatered: false } : plant
            )
          );
        }, 3000);
      }
    }, 800);
  }, []);

  const getStageLabel = (stage: GrowthStage): string => {
    switch (stage) {
      case 0: return "Seed";
      case 1: return "Sprout";
      case 2: return "Sapling";
      case 3: return "Growing";
      case 4: return "Flourishing";
      default: return "Unknown";
    }
  };

  const selectedPlantData = plants.find((p) => p.id === selectedPlant);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-garden-light/10 to-garden/20">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TreeDeciduous className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Interactive Garden</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowHobbyMenu(true)}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Plant</span>
            </Button>
            <Button
              onClick={onBackToHome}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Garden Display */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Garden Plot */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative min-h-[500px] garden-ground garden-pattern p-6">
                {/* Ground decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-garden-dark/30 to-transparent" />
                
                {plants.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full py-20 text-center"
                  >
                    <div className="text-8xl mb-6">🌱</div>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Your Garden Awaits</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Select hobbies from the menu to plant them in your garden. Each hobby grows into a unique plant!
                    </p>
                    <Button onClick={() => setShowHobbyMenu(true)} size="lg" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Plant Your First Hobby
                    </Button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 relative z-10">
                    <AnimatePresence>
                      {plants.map((plant, index) => {
                        const PlantComponent = getPlantComponent(plant.name);
                        const isSelected = selectedPlant === plant.id;
                        
                        return (
                          <motion.div
                            key={plant.id}
                            initial={{ opacity: 0, scale: 0, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                            className="relative"
                          >
                            <motion.div
                              onClick={() => setSelectedPlant(isSelected ? null : plant.id)}
                              className={cn(
                                "cursor-pointer rounded-2xl p-3 transition-all",
                                isSelected
                                  ? "bg-primary/10 ring-2 ring-primary shadow-lg"
                                  : "hover:bg-card/50"
                              )}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <PlantComponent
                                stage={plant.stage}
                                isWatered={plant.isWatered}
                                className="w-full h-32 sm:h-40"
                              />
                              <div className="text-center mt-2">
                                <p className="font-medium text-foreground text-sm">{plant.name}</p>
                                <p className="text-xs text-muted-foreground">{getStageLabel(plant.stage)}</p>
                              </div>
                              
                              {/* Water level indicator */}
                              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-blue-400 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${plant.waterLevel}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/20 rounded-full"
                      initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: "100%",
                        opacity: 0 
                      }}
                      animate={{ 
                        y: "-10%",
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Care Panel */}
          <div className="space-y-4">
            {/* Plant Care Actions */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Hand className="h-5 w-5 text-primary" />
                  Plant Care
                </h3>
                
                {selectedPlantData ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-sm text-muted-foreground">Selected Plant</p>
                      <p className="text-lg font-semibold text-foreground">{selectedPlantData.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Stage: {getStageLabel(selectedPlantData.stage)} ({selectedPlantData.careActions} actions)
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {CARE_ACTIONS.map((action) => (
                        <motion.button
                          key={action.id}
                          onClick={() => performCareAction(selectedPlantData.id, action.id)}
                          disabled={careInProgress !== null}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                            action.bgColor,
                            "hover:scale-105 active:scale-95",
                            careInProgress === action.id && "ring-2 ring-primary animate-pulse"
                          )}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <action.icon className={cn("h-6 w-6", action.color)} />
                          <span className="text-sm font-medium text-foreground">{action.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Progress to next stage */}
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress to next stage</span>
                        <span>{(selectedPlantData.careActions % 2)}/2 actions</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(selectedPlantData.careActions % 2) * 50}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Hand className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Select a plant to care for it</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </h3>
                
                {recentActions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No recent activity
                  </p>
                ) : (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {recentActions.map((action, i) => {
                        const plant = plants.find((p) => p.id === action.plantId);
                        const careAction = CARE_ACTIONS.find((c) => c.id === action.action);
                        
                        return (
                          <motion.div
                            key={`${action.plantId}-${action.timestamp.getTime()}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30"
                          >
                            <div className={cn("p-1.5 rounded-full", careAction?.bgColor)}>
                              {careAction && <careAction.icon className={cn("h-3 w-3", careAction.color)} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {careAction?.label} {plant?.name}
                              </p>
                              <p className="text-xs text-muted-foreground">Just now</p>
                            </div>
                            <Check className="h-4 w-4 text-green-500" />
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Garden Stats */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Garden Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{plants.length}</p>
                    <p className="text-xs text-muted-foreground">Total Plants</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {plants.reduce((sum, p) => sum + p.careActions, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Care Actions</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {plants.filter((p) => p.stage === 4).length}
                    </p>
                    <p className="text-xs text-muted-foreground">Flourishing</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {Math.round(plants.reduce((sum, p) => sum + p.waterLevel, 0) / Math.max(1, plants.length))}%
                    </p>
                    <p className="text-xs text-muted-foreground">Avg. Hydration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Hobby Selection Modal */}
      <AnimatePresence>
        {showHobbyMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowHobbyMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card rounded-2xl shadow-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Choose a Hobby to Plant</h2>
                <button
                  onClick={() => setShowHobbyMenu(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {HOBBY_OPTIONS.map((hobby, index) => (
                  <motion.button
                    key={hobby.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => addPlant(hobby.name)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                      hobby.color,
                      "hover:scale-105 hover:shadow-lg active:scale-95"
                    )}
                  >
                    <span className="text-3xl">{hobby.icon}</span>
                    <span className="font-medium text-foreground">{hobby.name}</span>
                  </motion.button>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Each hobby grows into a unique plant with distinct visuals!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Care action feedback */}
      <AnimatePresence>
        {careInProgress && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-card shadow-lg rounded-full px-6 py-3 flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
              <span className="font-medium text-foreground">
                {careInProgress === "water" && "Watering..."}
                {careInProgress === "prune" && "Pruning..."}
                {careInProgress === "tend" && "Tending..."}
                {careInProgress === "nurture" && "Nurturing..."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
