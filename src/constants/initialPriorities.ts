export const PRIORITY_COLORS = {
    Low: '#22C55E',
    Medium: '#F59E0B',
    High: '#EF4444',
} as const;

export type PriorityLevel = keyof typeof PRIORITY_COLORS;
