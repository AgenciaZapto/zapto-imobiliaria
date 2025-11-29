'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Property } from '@/types';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function PropertiesPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock de dados - depois substituir por chamada real ao Firestore
    const mockProperties: Property[] = [
      {
        id: '1',
        agentId: 'agent-1',
        title: 'Apartamento Moderno no Centro',
        description: 'Lindo apartamento com vista para a cidade',
        address: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567'
        },
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 1,
        garage: 1,
        area: 65,
        price: 450000,
        status: 'available',
        images: ['https://via.placeholder.com/300x200'],
        amenities: ['piscina', 'academia'],
        features: {
          hasPool: true,
          hasGym: true,
          hasSecurity: false,
          hasGarden: false,
          hasBalcony: true
        },
        views: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        agentId: 'agent-1',
        title: 'Casa Espaçosa com Jardim',
        description: 'Casa perfeita para a família',
        address: {
          street: 'Avenida Paulista',
          number: '456',
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01311-100'
        },
        type: 'house',
        bedrooms: 3,
        bathrooms: 2,
        garage: 2,
        area: 150,
        price: 850000,
        status: 'available',
        images: ['https://via.placeholder.com/300x200'],
        amenities: ['jardim', 'churrasqueira'],
        features: {
          hasPool: false,
          hasGym: false,
          hasSecurity: true,
          hasGarden: true,
          hasBalcony: false
        },
        views: 320,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setProperties(mockProperties);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
            Zapto
          </Link>
          <div className="flex gap-4">
            {user?.role === 'agent' && (
              <Button size="sm">Publicar Imóvel</Button>
            )}
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Imóveis Disponíveis</h1>

        {loading ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {properties.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum imóvel encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}