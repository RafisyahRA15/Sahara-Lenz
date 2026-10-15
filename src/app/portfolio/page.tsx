'use client'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

export default function PortfolioPage() {
  // Daftar kategori portofolio (Yudisium digabungkan/ditiadakan sesuai karya yang tersedia)
  const categories = ["All", "Graduation", "Portrait", "Couple", "Friends", "Family", "Group"];

  // State untuk filter kategori aktif
  const [activeCategory, setActiveCategory] = useState("All");

  // Data portofolio dengan foto wisuda asli dan placeholder profesional lainnya
  const portfolioItems = [
    { 
      title: "Academic Milestone - Pink Kebaya", 
      category: "Graduation", 
      img: "/grad-1.jpg", 
      desc: "Momen wisuda penuh suka cita dengan balutan kebaya bernuansa merah muda dan toga yang elegan."
    },
    { 
      title: "The Graduate Honor", 
      category: "Graduation", 
      img: "/grad-2.jpg", 
      desc: "Potret khidmat wisudawati mengenakan toga lengkap dengan kalung medali universitas."
    },
    { 
      title: "Campus Elegance", 
      category: "Graduation", 
      img: "/grad-3.jpg", 
      desc: "Sesi potret kelulusan bernuansa klasik modern di area kampus dengan detail arsitektur yang estetik."
    },
    { 
      title: "Editorial Portrait", 
      category: "Portrait", 
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      desc: "Sentuhan pencahayaan dramatis untuk menonjolkan karakter dan ekspresi personal."
    },
    { 
      title: "Couple Session", 
      category: "Couple", 
      img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
      desc: "Mengabadikan keintiman dan ikatan emosional yang tulus dalam setiap jepretan."
    },
    { 
      title: "Family Warmth", 
      category: "Family", 
      img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
      desc: "Kehangatan dan kebersamaan keluarga yang diabadikan secara natural dan abadi."
    },
  ];

  // Filter item berdasarkan kategori yang dipilih
  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory pb-16 md:pb-0">
      <Navbar />

      <section className="py-20 px-6 max-w-7xl mx-auto w-full flex-1">
        <div className="text-center mb-12">
          <span className="text-gold tracking-[0.3em] text-xs uppercase mb-3 block">
            Visual Archive
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-wide uppercase mb-4">
            Portfolio
          </h1>
          <p className="text-sand text-sm max-w-xl mx-auto font-light">
            Kumpulan karya dokumentasi pilihan yang merangkum setiap kisah, ekspresi, dan momen berharga pencapaian Anda.
          </p>
        </div>

        {/* Kategori Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-widest uppercase border transition ${
                activeCategory === cat 
                  ? 'border-gold bg-gold text-charcoal font-medium' 
                  : 'border-gold/40 text-sand hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Portofolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden border border-gold/20 bg-charcoal/40 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                </div>
              </div>
              <div className="p-6 bg-charcoal/90 border-t border-gold/10">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold mb-1 block">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl text-ivory tracking-wider uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-sand text-xs font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
