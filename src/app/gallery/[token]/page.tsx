'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientGalleryPage() {
  const params = useParams();
  const token = params?.token;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'selection' | 'final'>('selection');

  useEffect(() => {
    if (token) {
      fetchGalleryData();
    }
  }, [token]);

  async function fetchGalleryData() {
    setLoading(true);
    // Contoh pengambilan data dari Supabase berdasarkan token galeri privat klien
    try {
      // Simulasi data jika tabel belum diisi di database
      setClientData({
        client_name: "Sarah & Alex",
        session_date: "2026-10-20",
        package_name: "The Signature",
        status: "Waiting for Selection"
      });
      
      setPhotos([
        { id: 1, url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800", type: "selection", selected: false },
        { id: 2, url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800", type: "selection", selected: true },
        { id: 3, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", type: "selection", selected: false },
      ]);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  }

  const toggleSelectPhoto = (id: number) => {
    setPhotos(photos.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-ivory flex items-center justify-center">
        <p className="tracking-widest uppercase text-xs text-gold">Loading Private Gallery...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Navbar />

      <section className="py-16 px-6 max-w-6xl mx-auto w-full flex-1">
        {/* Info Klien */}
        <div className="text-center mb-12 border-b border-gold/20 pb-8">
          <span className="text-gold tracking-[0.3em] text-xs uppercase mb-2 block">
            Private Client Gallery
          </span>
          <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-wider mb-2">
            {clientData?.client_name}
          </h1>
          <p className="text-sand text-xs tracking-widest uppercase">
            Package: {clientData?.package_name} {/* Session: {clientData?.session_date} */}
          </p>
        </div>

        {/* Tab Navigasi Galeri */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('selection')}
            className={`px-6 py-2 text-xs tracking-widest uppercase transition ${
              activeTab === 'selection' 
                ? 'bg-gold text-charcoal font-medium' 
                : 'border border-gold/30 text-sand hover:border-gold'
            }`}
          >
            Photo Selection
          </button>
          <button
            onClick={() => setActiveTab('final')}
            className={`px-6 py-2 text-xs tracking-widest uppercase transition ${
              activeTab === 'final' 
                ? 'bg-gold text-charcoal font-medium' 
                : 'border border-gold/30 text-sand hover:border-gold'
            }`}
          >
            Final Edited Photos (Coming Soon)
          </button>
        </div>

        {/* Konten Tab */}
        {activeTab === 'selection' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs text-sand uppercase tracking-wider">
                Silakan tandai foto yang ingin Anda pilih untuk proses editing.
              </p>
              <button 
                onClick={() => alert("Pilihan foto berhasil dikonfirmasi ke SAHARA LENZ!")}
                className="px-5 py-2 bg-gold text-charcoal text-xs tracking-widest uppercase hover:bg-ivory transition"
              >
                Confirm Selection
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  onClick={() => toggleSelectPhoto(photo.id)}
                  className={`relative group cursor-pointer overflow-hidden border-2 transition ${
                    photo.selected ? 'border-gold' : 'border-gold/20'
                  }`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={photo.url} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-[10px] tracking-widest uppercase font-semibold ${photo.selected ? 'bg-gold text-charcoal' : 'bg-charcoal/70 text-ivory border border-gold/40'}`}>
                      {photo.selected ? 'Selected ✓' : 'Select'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center border border-gold/10 bg-charcoal/50">
            <h3 className="font-serif text-xl text-ivory uppercase mb-2">Final Edited Photos Not Available Yet</h3>
            <p className="text-xs text-sand font-light">
              Foto hasil editing final akan segera diunggah dan dipublikasikan oleh admin setelah proses seleksi selesai.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
