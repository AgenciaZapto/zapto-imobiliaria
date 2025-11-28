// Usuário (Agent ou Client)
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'agent' | 'client' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Agente Imobiliário
export interface Agent extends User {
  creci: string; // Número CRECI
  commission: number; // Percentual de comissão
  totalProperties: number;
  totalSales: number;
  rating: number;
}

// Cliente
export interface Client extends User {
  preferredLocations: string[];
  budgetMin?: number;
  budgetMax?: number;
  propertyType?: string[];
  savedProperties: string[]; // IDs de imóveis favoritados
}

// Endereço
export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

// Imóvel
export interface Property {
  id: string;
  agentId: string;
  title: string;
  description: string;
  address: Address;
  type: 'apartment' | 'house' | 'commercial' | 'land' | 'other';
  bedrooms: number;
  bathrooms: number;
  garage: number;
  area: number; // em m²
  price: number;
  status: 'available' | 'sold' | 'rented' | 'pending';
  images: string[]; // URLs das imagens
  amenities: string[]; // piscina, churrasqueira, etc
  features: {
    hasPool: boolean;
    hasGym: boolean;
    hasSecurity: boolean;
    hasGarden: boolean;
    hasBalcony: boolean;
  };
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

// Visita/Agendamento
export interface Appointment {
  id: string;
  propertyId: string;
  clientId: string;
  agentId: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

// Contato/Lead
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  agentId?: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  createdAt: Date;
}

// Resposta da API (padrão)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Paginação
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Contexto de Autenticação
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'agent' | 'client') => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}