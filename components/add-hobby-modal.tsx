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
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            Add New Hobby
          </DialogTitle>
          <DialogDescription>
            Plant a new hobby in your garden and watch it grow!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hobby-name">Hobby Name</Label>
            <Input
              id="hobby-name"
              placeholder="e.g., Learning Piano"
              value={hobbyName}
              onChange={(e) => setHobbyName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Suggestions */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Quick add:</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedHobbies.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!hobbyName.trim()}>
              Plant Hobby
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
