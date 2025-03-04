export interface Priority {
    label: 'Low' | 'Medium' | 'High';
    color: string;
}

export interface Task {
    id: string;
    columnId: string;
    title: string;
    description: string;
    priority?: Priority;
}

export interface TasksState {
    tasks: Task[];
}
