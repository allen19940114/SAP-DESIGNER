import { create } from 'zustand'
import type { CanvasElement } from '@/types/canvas'

interface HistorySnapshot {
  elements: Record<string, CanvasElement>
  elementOrder: string[]
}

interface HistoryState {
  past: HistorySnapshot[]
  future: HistorySnapshot[]
  maxHistory: number

  pushSnapshot: (snapshot: HistorySnapshot) => void
  undo: (currentSnapshot: HistorySnapshot) => HistorySnapshot | null
  redo: (currentSnapshot: HistorySnapshot) => HistorySnapshot | null
  clear: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

export const useHistoryStore = create<HistoryState>()((set, get) => ({
  past: [],
  future: [],
  maxHistory: 50,

  pushSnapshot: (snapshot) => {
    set((state) => ({
      past: [...state.past.slice(-state.maxHistory + 1), snapshot],
      future: []
    }))
  },

  undo: (currentSnapshot) => {
    const { past } = get()
    if (past.length === 0) return null
    const snapshot = past[past.length - 1]
    set((state) => ({
      past: state.past.slice(0, -1),
      future: [currentSnapshot, ...state.future]
    }))
    return snapshot
  },

  redo: (currentSnapshot) => {
    const { future } = get()
    if (future.length === 0) return null
    const snapshot = future[0]
    set((state) => ({
      past: [...state.past, currentSnapshot],
      future: state.future.slice(1)
    }))
    return snapshot
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

  clear: () => set({ past: [], future: [] })
}))
