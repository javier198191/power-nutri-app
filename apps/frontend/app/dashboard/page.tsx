'use client';

import { useRouter } from 'next/navigation';
import { authService } from '../../lib/services/auth.service';
import { Dumbbell, Leaf, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    toast.info('Sesión cerrada');
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <nav className="flex items-center justify-between mb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-purple-500 w-8 h-8" />
          <Leaf className="text-green-500 w-6 h-6 -ml-3" />
          <h1 className="text-2xl font-bold tracking-tight">
            Power<span className="text-purple-500">Nutri</span>
          </h1>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <h2 className="text-3xl font-bold mb-4">Bienvenido al Dashboard</h2>
          <p className="text-gray-400">Esta es tu área personal de PowerNutri.</p>
        </div>
      </div>
    </main>
  );
}
