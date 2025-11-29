'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Zapto</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Olá, <strong>{user.name}</strong>!</span>
            <Button variant="secondary" size="sm" onClick={() => logout()}>
              Sair
            </Button>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Meu Papel</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {user.role === 'agent' ? '🏢 Agente' : '👤 Cliente'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Email</h3>
            <p className="text-lg font-semibold text-gray-800 mt-2">{user.email}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Data de Cadastro</h3>
            <p className="text-lg font-semibold text-gray-800 mt-2">
              {new Date(user.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Links Úteis */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Navegação</h2>
          <div className="flex gap-4">
            <Button onClick={() => router.push('/properties')}>
              Ver Imóveis
            </Button>
            <Button variant="secondary" onClick={() => router.push('/profile')}>
              Meu Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}