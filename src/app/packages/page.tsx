'use client'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function PackagesPage() {
  const packages = [
    {
      name: "Classic",
      price: "Rp200.000",
      desc: "Pilihan paling pas dan ekonomis untuk sesi wisuda personal yang ringkas dan berkesan.",
      features: [
        "Durasi: 30 Menit",
        "Kapasitas: Maksimal 5 Orang",
        "1 Orang Wisudawan",
        "Maksimal 15 Foto Hasil Edit",
        "Format file digital HD JPG",
      ],
      whatsappText: "Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20memesan%20paket%20Classic%20(Rp200.000).%20Mohon%20informasi%20mengenai%20jadwal%20yang%20tersedia.%20Terima%20kasih."
    },
    {
      name: "Premium",
      price: "Rp300.000",
      popular: true,
      desc: "Pilihan paling favorit untuk mengabadikan momen wisuda bersama keluarga tercinta dengan hasil lebih leluasa.",
      features: [
        "Durasi 1 Jam",
        "Kapasitas: Maksimal 7 Orang / Family",
        "1 Orang Wisudawan",
        "Maksimal 25 Foto Hasil Edit",
        "Format file digital HD JPG",
      ],
      whatsappText: "Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20memesan%20paket%20Premium%20(Rp300.000).%20Mohon%20informasi%20mengenai%20jadwal%20yang%20tersedia.%20Terima%20kasih."
    },
    {
      name: "Elite",
      price: "Rp400.000",
      desc: "Sesi dokumentasi lengkap untuk merayakan kelulusan bersama keluarga besar tanpa batasan jumlah orang.",
      features: [
        "Durasi 1 Jam",
        "Full Family (Bebas sebanyak apapun orang)",
        "1 Orang Wisudawan",
        "Maksimal 35 Foto Hasil Edit",
        "Format file digital HD JPG",
      ],
      whatsappText: "Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20memesan%20paket%20Elite%20(Rp400.000).%20Mohon%20informasi%20mengenai%20jadwal%20yang%20tersedia.%20Terima%20kasih."
    },
    {
      name: "Exclusive",
      price: "Rp500.000",
      desc: "Paket spesial untuk wisuda bareng sahabat/grup dengan banyak wisudawan sekaligus dalam satu sesi.",
      features: [
        "Durasi 1 Jam",
        "Hingga 3 Orang Wisudawan sekaligus",
        "Keluarga dari masing-masing wisudawan ikut serta",
        "Maksimal 40 Foto Hasil Edit",
        "Format file digital HD JPG",
      ],
      whatsappText: "Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20memesan%20paket%20Exclusive%20(Rp500.000).%20Mohon%20informasi%20mengenai%20jadwal%20yang%20tersedia.%20Terima%20kasih."
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory pb-16 md:pb-0">
      <Navbar />

      <section className="py-20 px-6 max-w-7xl mx-auto w-full flex-1">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.3em] text-xs uppercase mb-3 block">
            Investment & Packages
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-wide uppercase mb-4">
            Our Pricelist
          </h1>
          <p className="text-sand text-sm max-w-xl mx-auto font-light">
            Pilih paket fotografi wisuda yang paling sesuai untuk mengabadikan momen berharga Anda bersama SAHARA LENZ.
          </p>
        </div>

        {/* Grid Paket (4 Kolom di layar besar agar rapi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`flex flex-col justify-between p-6 border ${pkg.popular ? 'border-gold bg-charcoal/90 relative shadow-2xl scale-[1.02]' : 'border-gold/20 bg-charcoal/50'}`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-charcoal text-[10px] tracking-widest uppercase px-3 py-1 font-semibold">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="font-serif text-xl uppercase tracking-wider mb-2 text-ivory">{pkg.name}</h3>
                <div className="text-gold font-serif text-lg mb-4">{pkg.price}</div>
                <p className="text-sand text-xs leading-relaxed mb-6 font-light">{pkg.desc}</p>
                
                <div className="border-t border-gold/10 pt-4 mb-6">
                  <p className="text-[11px] uppercase tracking-widest text-sand/70 mb-3">Fasilitas:</p>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="text-xs text-sand flex items-start gap-2">
                        <span className="text-gold">✦</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={`https://wa.me/6281234567890?text=${pkg.whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 text-center text-xs tracking-widest uppercase transition duration-300 ${
                  pkg.popular 
                    ? 'bg-gold text-charcoal hover:bg-ivory font-medium' 
                    : 'border border-gold text-gold hover:bg-gold hover:text-charcoal'
                }`}
              >
                Book {pkg.name}
              </a>
            </div>
          ))}
        </div>

        {/* Catatan Wedding */}
        <div className="mt-16 text-center border-t border-gold/10 pt-8">
          <p className="text-xs tracking-widest uppercase text-sand/60">
            * Layanan Wedding — <span className="text-gold">Coming Soon</span>
          </p>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
