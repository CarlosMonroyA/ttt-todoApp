export enum TaskStatus {
    PENDING = 'pendiente',
    IN_PROGRESS = 'en progreso',
    DONE = 'completada',
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    dueDate: string;
    userId: number;
}

export type CreateTaskDto = {
    title: string;
    description?: string;
    status: TaskStatus;
    dueDate: string;
};
