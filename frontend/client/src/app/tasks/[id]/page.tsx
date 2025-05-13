'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { CreateTaskDto, Task, TaskStatus } from '@/types';

export default function EditTaskPage() {
    const { id } = useParams();
    const router = useRouter();
    const [task, setTask] = useState<Task | null>(null);
    const { register, handleSubmit, reset } = useForm<CreateTaskDto>();

    useEffect(() => {
        api.get<Task>(`/tasks/${id}`).then(res => {
            const t = res.data;
            setTask(t);
            reset({
                title: t.title,
                description: t.description,
                status: t.status,
                dueDate: new Date(t.dueDate).toISOString().slice(0, 16),
            });
        });
    }, [id, reset]);

    const onSubmit = async (data: CreateTaskDto) => {
        await api.put(`/tasks/${id}`, data);
        router.push('/tasks');
    };

    if (!task) return <p className="p-4">Cargando…</p>;

    return (
        <main className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Editar Tarea</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register('title')}
                    placeholder="Título"
                    className="w-full border px-2 py-1"
                />
                <textarea
                    {...register('description')}
                    placeholder="Descripción"
                    className="w-full border px-2 py-1"
                />
                <select
                    {...register('status')}
                    className="w-full border px-2 py-1"
                >
                    {Object.values(TaskStatus).map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <input
                    type="datetime-local"
                    {...register('dueDate')}
                    className="w-full border px-2 py-1"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Guardar Cambios
                </button>
            </form>
        </main>
    );
}
