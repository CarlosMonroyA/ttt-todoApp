'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/context/AuthContext';

interface FormValues { email: string; password: string; }

const schema = yup.object({
    email: yup.string().email('Email inválido').required('Requerido'),
    password: yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
}).required();

export default function RegisterPage() {
    const { register: registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await registerUser(data.email, data.password);
        } catch (err) {
            alert('Falló el registro: ' + (err as Error).message);
        }
    };

    return (
        <main className="max-w-md mx-auto p-4">
            <h1 className="text-2xl mb-4">Crear Cuenta</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="w-full border px-2 py-1"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full border px-2 py-1"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-2"
                >
                    {isSubmitting ? 'Creando…' : 'Registrar'}
                </button>
            </form>
        </main>
    );
}
