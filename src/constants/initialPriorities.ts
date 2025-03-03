export const PRIORITY_COLORS = {
    Low: '#22C55E',
    Medium: '#F59E0B',
    High: '#EF4444',
} as const;

export type PriorityLevel = keyof typeof PRIORITY_COLORS;

export type PriorityOption = {
    value: PriorityLevel | '';
    text: string;
};

export const PRIORITIES: PriorityOption[] = [
    { value: '', text: 'None' },
    { value: 'Low', text: 'Low' },
    { value: 'Medium', text: 'Medium' },
    { value: 'High', text: 'High' },
];
