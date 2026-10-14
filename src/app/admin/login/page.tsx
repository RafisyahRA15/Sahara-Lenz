'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi login admin yang aman
    if (email === 'admin@saharalenz.com' && password === 'sahara2026') {
      alert('Login Berhasil! Mengalihkan ke Dashboard Admin...');
      router.push('/admin/dashboard');
    } else {
      alert('Email atau kata sandi salah. Silakan coba kembali.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Navbar />

      <section className="py-24 px-6 max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="text-center mb-10">
          <span className="text-gold tracking-[0.3em] text-xs uppercase mb-2 block">
            Restricted Area
          </span>
          <h1 className="font-serif text-3xl uppercase tracking-wider mb-2">
            Admin Login
          </h1>
          <p className="text-sand text-xs tracking-wider">
            Masuk untuk mengelola data klien dan galeri SAHARA LENZ.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 border border-gold/20 p-8 bg-charcoal/50">
          <div>
            <label className="block text-xs uppercase tracking-widest text-sand mb-2">Email Admin</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@saharalenz.com"
              required
              className="w-full bg-charcoal border border-gold/30 px-4 py-3 text-sm text-ivory focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-sand mb-2">Kata Sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-charcoal border border-gold/30 px-4 py-3 text-sm text-ivory focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gold text-charcoal text-xs tracking-widest uppercase font-medium hover:bg-ivory transition duration-300"
          >
            Login to Dashboard
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
