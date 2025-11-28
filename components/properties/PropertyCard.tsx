'use client';

import { Property } from '@/types';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(property.price);

  return (
    <Link href={`/properties/${property.id}`}>
      <Card hoverable className="overflow-hidden">
        {/* Imagem */}
        <div className="w-full h-48 bg-gray-300 rounded-lg overflow-hidden mb-4">
          {property.images[0] ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Sem imagem
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-800 truncate">{property.title}</h3>
          
          <p className="text-gray-600 text-sm">
            {property.address.street}, {property.address.number} - {property.address.city}
          </p>

          <p className="text-blue-600 font-bold text-xl">{formattedPrice}</p>

          {/* Detalhes */}
          <div className="flex gap-4 text-sm text-gray-600 pt-2">
            <div>🛏️ {property.bedrooms} quartos</div>
            <div>🚿 {property.bathrooms} banheiros</div>
            <div>📏 {property.area}m²</div>
          </div>

          {/* Status */}
          <div className="pt-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              property.status === 'available' ? 'bg-green-100 text-green-800' :
              property.status === 'sold' ? 'bg-red-100 text-red-800' :
              property.status === 'rented' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {property.status === 'available' && 'Disponível'}
              {property.status === 'sold' && 'Vendido'}
              {property.status === 'rented' && 'Alugado'}
              {property.status === 'pending' && 'Pendente'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}