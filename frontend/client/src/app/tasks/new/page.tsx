// src/app/tasks/new/page.tsx
'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/lib/api';
import { CreateTaskDto, TaskStatus } from '@/types';

const schema = yup
    .object({
        title: yup.string().required('Título requerido'),
        description: yup.string(), // opcional
        status: yup
            .mixed<TaskStatus>()
            .oneOf(Object.values(TaskStatus))
            .required('Estado requerido'),
        dueDate: yup.string().required('Fecha requerida'),
    })
    .required();

export default function NewTaskPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateTaskDto>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            status: TaskStatus.PENDING,
            dueDate: '',
        },
    });

    const onSubmit: SubmitHandler<CreateTaskDto> = async (data) => {
        await api.post('/tasks', data);
        router.push('/tasks');
    };

    return (
        <main className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Nueva Tarea</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1">Título</label>
                    <input
                        {...register('title')}
                        className="w-full border px-2 py-1"
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block mb-1">Descripción</label>
                    <textarea
                        {...register('description')}
                        className="w-full border px-2 py-1"
                    />
                </div>

                <div>
                    <label className="block mb-1">Estado</label>
                    <select
                        {...register('status')}
                        className="w-full border px-2 py-1"
                    >
                        {Object.values(TaskStatus).map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                </div>

                <div>
                    <label className="block mb-1">Fecha de vencimiento</label>
                    <input
                        type="datetime-local"
                        {...register('dueDate')}
                        className="w-full border px-2 py-1"
                    />
                    {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {isSubmitting ? 'Creando…' : 'Crear'}
                </button>
            </form>
        </main>
    );
}
