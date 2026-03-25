"use client";

import { useState } from "react";
import { Sprout } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddHobbyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddHobby: (name: string) => void;
}

const suggestedHobbies = [
  "Guitar",
  "Painting",
  "Fitness",
  "Reading",
  "Cooking",
  "Photography",
  "Writing",
  "Gardening",
  "Coding",
];

export function AddHobbyModal({
  open,
  onOpenChange,
  onAddHobby,
}: AddHobbyModalProps) {
  const [hobbyName, setHobbyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hobbyName.trim()) {
      onAddHobby(hobbyName.trim());
      setHobbyName("");
      onOpenChange(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onAddHobby(suggestion);
    setHobbyName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        
        {/* 🌿 HEADER */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sprout className="h-5 w-5 text-green-500" />
            Plant a New Hobby
          </DialogTitle>

          <DialogDescription>
            Start small 🌱 — stay consistent, and watch it grow into something big.
          </DialogDescription>
        </DialogHeader>

        {/* 🌱 FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* INPUT */}
          <div className="space-y-2">
            <Label htmlFor="hobby-name" variant="accent">
              Hobby Name
            </Label>

            <Input
              id="hobby-name"
              name="hobbyName"
              placeholder="e.g., Learning Piano"
              value={hobbyName}
              onChange={(e) => setHobbyName(e.target.value)}
              autoFocus
            />
          </div>

          {/* 🌿 SUGGESTIONS */}
          <div className="space-y-2">
            <Label variant="muted">Quick start</Label>

            <div className="flex flex-wrap gap-2">
              {suggestedHobbies.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="
                    rounded-full px-3 py-1 text-sm
                    bg-secondary text-secondary-foreground
                    hover:bg-green-100 dark:hover:bg-green-900/40
                    transition-all duration-200
                    hover:scale-105 active:scale-95
                  "
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* 🌱 ACTIONS */}
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!hobbyName.trim()}
              className="gap-2"
            >
              🌱 Plant Hobby
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}