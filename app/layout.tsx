import type { Metadata } from 'next';
import { AuthProvider } from '@/hooks/useAuth';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zapto Imobiliária',
  description: 'Plataforma imobiliária profissional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}