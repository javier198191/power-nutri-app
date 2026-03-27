'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, Dumbbell, Leaf, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../../lib/services/auth.service';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await authService.login(data.email, data.password);
      toast.success('¡Bienvenido de nuevo!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Dumbbell className="text-brand-purple w-8 h-8" />
          <Leaf className="text-green-500 w-6 h-6 -ml-3" />
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Power<span className="text-brand-purple">Nutri</span>
          </h1>
        </div>
        <p className="text-gray-400 text-sm">Tu transformación comienza aquí</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-purple transition-colors" />
            <input
              {...register('email')}
              type="email"
              placeholder="tu@email.com"
              className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-purple transition-colors" />
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#6A0DAD] to-black hover:from-[#5a0bbd] hover:to-gray-900 border border-brand-purple/30 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-purple-200" />
          ) : (
            'Entrar'
          )}
        </button>

        <div className="text-center">
          <a href="#" className="text-xs text-brand-purple hover:text-purple-300 transition-colors">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  );
}
