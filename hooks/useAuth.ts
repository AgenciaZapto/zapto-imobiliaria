'use client';

import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '@/utils/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User, AuthContextType } from '@/types';

// Criar Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Monitorar autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Buscar dados do usuário no Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              ...userDoc.data()
            } as User);
          }
        } catch (err) {
          console.error('Erro ao buscar usuário:', err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
      throw err;
    }
  };

  // Register
  const register = async (
    email: string,
    password: string,
    name: string,
    role: 'agent' | 'client'
  ) => {
    try {
      setError(null);
      
      // Criar usuário no Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualizar nome
      await updateProfile(result.user, { displayName: name });
      
      // Salvar dados no Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        id: result.user.uid,
        email,
        name,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...(role === 'agent' && {
          creci: '',
          commission: 0,
          totalProperties: 0,
          totalSales: 0,
          rating: 5
        }),
        ...(role === 'client' && {
          preferredLocations: [],
          budgetMin: 0,
          budgetMax: 0,
          propertyType: [],
          savedProperties: []
        })
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer logout');
      throw err;
    }
  };

  // Atualizar usuário
  const updateUser = async (data: Partial<User>) => {
    try {
      setError(null);
      if (!user) throw new Error('Usuário não autenticado');
      
      await setDoc(doc(db, 'users', user.id), {
        ...data,
        updatedAt: new Date()
      }, { merge: true });
      
      setUser({ ...user, ...data });
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar usuário');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar em componentes
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}