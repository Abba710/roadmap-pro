/**
 * Core types for the roadmap application
 */

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export type ThemeColor = "green" | "purple" | "gold" | "blue" | "red" | "orange";

export interface Phase {
  id: string;
  name: string;
  theme: ThemeColor;
  icon: string;
  milestones: Milestone[];
  progress: number;
  status: string;
}

export interface ThemeColorConfig {
  gradient: string;
  bg: string;
  border: string;
  badge: string;
  progress: string;
  icon: string;
  glow: string;
}

export type ThemeColorsMap = Record<ThemeColor, ThemeColorConfig>;

/**
 * A roadmap is a collection of phases with metadata
 */
export interface Roadmap {
  id: string;
  name: string;
  description: string;
  phases: Phase[];
  createdAt: number;
  updatedAt: number;
}
