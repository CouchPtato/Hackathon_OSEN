"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Hobby } from "@/lib/types";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hobbies: Hobby[];
  onAddTask: (task: { title: string; hobbyId: string }) => void;
}

export function AddTaskModal({ open, onOpenChange, hobbies, onAddTask }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [hobbyId, setHobbyId] = useState(hobbies[0]?.id || "");

  useEffect(() => {
    if (open && hobbies.length > 0) setHobbyId(hobbies[0].id);
  }, [open, hobbies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && hobbyId) {
      onAddTask({ title: title.trim(), hobbyId });
      setTitle("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="task-title"
            name="taskTitle"
            placeholder="Task title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            autoFocus
          />
          <select
            id="task-hobby"
            name="hobbyId"
            className="w-full border rounded-lg px-3 py-2 bg-background"
            value={hobbyId}
            onChange={e => setHobbyId(e.target.value)}
            required
          >
            {hobbies.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || !hobbyId}>
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}