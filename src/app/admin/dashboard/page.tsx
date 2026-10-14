'use client'

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Klien", count: "12" },
    { label: "Pesanan Berjalan", count: "4" },
    { label: "Menunggu Seleksi Foto", count: "2" },
    { label: "Sesi Selesai", count: "6" },
  ];

  const clients = [
    { name: "Sarah & Alex", package: "The Signature", date: "2026-10-20", status: "Waiting for Selection", token: "sample-token-123" },
    { name: "Budi Santoso", package: "The Essential", date: "2026-10-22", status: "Editing", token: "sample-token-456" },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Navbar />

      <section className="py-16 px-6 max-w-6xl mx-auto w-full flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gold/20 pb-6 gap-4">
          <div>
            <span className="text-gold tracking-[0.3em] text-xs uppercase mb-1 block">
              Control Panel
            </span>
            <h1 className="font-serif text-3xl uppercase tracking-wider">
              Admin Dashboard
            </h1>
          </div>
          <button 
            onClick={() => alert('Fitur tambah data klien baru akan dibuka.')}
            className="px-5 py-2.5 bg-gold text-charcoal text-xs tracking-widest uppercase font-medium hover:bg-ivory transition"
          >
            + Buat Klien & Galeri Baru
          </button>
        </div>

        {/* Ringkasan Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((st, idx) => (
            <div key={idx} className="p-6 border border-gold/20 bg-charcoal/50 text-center">
              <span className="text-2xl md:text-3xl font-serif text-gold block mb-1">{st.count}</span>
              <span className="text-[11px] uppercase tracking-widest text-sand">{st.label}</span>
            </div>
          ))}
        </div>

        {/* Daftar Klien & Pesanan */}
        <div className="border border-gold/20 bg-charcoal/50 p-6">
          <h3 className="font-serif text-xl uppercase tracking-wider mb-6 text-ivory">Daftar Klien & Status Pesanan</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold/20 text-xs tracking-widest uppercase text-gold">
                  <th className="py-3 px-4">Nama Klien</th>
                  <th className="py-3 px-4">Paket</th>
                  <th className="py-3 px-4">Tanggal Sesi</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi Galeri</th>
                </tr>
              </thead>
              <tbody className="text-xs text-sand">
                {clients.map((c, idx) => (
                  <tr key={idx} className="border-b border-gold/10 hover:bg-gold/5 transition">
                    <td className="py-4 px-4 font-medium text-ivory">{c.name}</td>
                    <td className="py-4 px-4">{c.package}</td>
                    <td className="py-4 px-4">{c.date}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase border border-gold/40 bg-charcoal text-gold">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link 
                        href={`/gallery/${c.token}`}
                        target="_blank"
                        className="text-gold underline tracking-wider uppercase hover:text-ivory"
                      >
                        Buka Galeri ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
