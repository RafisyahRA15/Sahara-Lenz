'lib'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function PortfolioPage() {
  // Daftar kategori portofolio sesuai permintaan
  const categories = ["All", "Graduation", "Yudisium", "Portrait", "Couple", "Friends", "Family", "Group", "Wedding"];

  // Data contoh foto portofolio
  const portfolioItems = [
    { title: "Graduation Moments", category: "Graduation", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" },
    { title: "Yudisium Ceremony", category: "Yudisium", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop" },
    { title: "Editorial Portrait", category: "Portrait", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" },
    { title: "Couple Session", category: "Couple", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop" },
    { title: "Best Friends", category: "Friends", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" },
    { title: "Family Warmth", category: "Family", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" },
    { title: "Group Photography", category: "Group", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop" },
    { title: "Wedding Story", category: "Wedding", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory">
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
            Kumpulan karya dokumentasi pilihan yang merangkum setiap kisah, ekspresi, dan momen berharga.
          </p>
        </div>

        {/* Kategori Filter / Info */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className={`px-4 py-2 text-xs tracking-widest uppercase border ${
                cat === "Wedding" 
                  ? 'border-gold/30 text-sand/50 bg-charcoal cursor-not-allowed' 
                  : 'border-gold/40 text-sand hover:border-gold hover:text-gold transition'
              }`}
            >
              {cat} {cat === "Wedding" && "— Coming Soon"}
            </span>
          ))}
        </div>

        {/* Grid Portofolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden border border-gold/20 bg-charcoal/40">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out opacity-85 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl text-ivory tracking-wider uppercase">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
