'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Task, TaskStatus } from '@/types';

export default function TasksPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<'all' | TaskStatus>('all');

    useEffect(() => {
        if (!user) return router.replace('/login');
        api.get<Task[]>('/tasks').then(res => setTasks(res.data));
    }, [user, router]);

    const filtered = filter === 'all'
        ? tasks
        : tasks.filter(t => t.status === filter);

    return (
        <main className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl mb-4">Mis Tareas</h1>

            {/* Filtros */}
            <div className="flex gap-2 mb-4">
                {['all', TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s as any)}
                        className={`px-3 py-1 border rounded ${filter === s ? 'bg-blue-600 text-white' : ''
                            }`}
                    >
                        {s === 'all' ? 'Todas' : s}
                    </button>
                ))}
            </div>

            {/* Lista */}
            <ul className="space-y-2">
                {filtered.map(task => (
                    <li
                        key={task.id}
                        className="p-3 border rounded flex justify-between items-center"
                    >
                        <div>
                            <strong>{task.title}</strong>
                            <p className="text-sm">
                                Vence: {new Date(task.dueDate).toLocaleString()}
                            </p>
                            <span className="text-xs italic">{task.status}</span>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => router.push(`/tasks/${task.id}`)}>✏️</button>
                            <button
                                onClick={async () => {
                                    await api.delete(`/tasks/${task.id}`);
                                    setTasks(tasks.filter(t => t.id !== task.id));
                                }}
                            >
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => router.push('/tasks/new')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                + Nueva Tarea
            </button>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => logout()}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                    Cerrar sesión
                </button>
            </div>

        </main>

    );
}
