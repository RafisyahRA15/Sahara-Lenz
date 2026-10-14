import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PackagesPage() {
  const packages = [
    {
      name: "The Essential",
      price: "Rp250.000 / jam",
      desc: "Pilihan sederhana untuk mengabadikan momen penting dengan hasil yang tetap elegan dan berkesan.",
      features: [
        "Fotografi individu",
        "Arahan pose dasar",
        "Foto formal dan candid",
        "Pemilihan foto untuk editing sesuai kesepakatan",
        "File digital hasil editing"
      ],
      whatsappText: "Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20memesan%20paket%20The%20Essential%20dengan%20harga%20Rp250.000/jam.%20Saya%20ingin%20bertanya%20mengenai%20jadwal%20dan%20detail%20sesi%20fotografi.%20Terima%20kasih."
    },
    {
      name: "The Signature",
      price: "Rp350.000 / jam",
      popular: true,
      desc: "Pilihan untuk klien yang menginginkan variasi foto lebih banyak dari sisi pose, komposisi, dan suasana.",
      features: [
        "Semua fasilitas The Essential",
        "Variasi pose dan komposisi yang lebih beragam",
        "Foto bersama keluarga atau teman sesuai kebutuhan sesi",
        "Perpaduan gaya formal, candid, dan editorial",
        "Editing foto yang konsisten"
      ],
      whatsappText: "Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20memesan%20paket%20The%20Signature%20dengan%20harga%20Rp350.000/jam.%20Saya%20ingin%20bertanya%20mengenai%20jadwal%20dan%20detail%20sesi%20fotografi.%20Terima%20kasih."
    },
    {
      name: "The Heirloom",
      price: "Rp500.000 / jam",
      desc: "Pilihan premium untuk mengabadikan momen dengan pendekatan yang lebih personal dan perhatian lebih pada detail.",
      features: [
        "Semua fasilitas The Signature",
        "Konsep sesi yang lebih personal",
        "Variasi pose dan komposisi yang lebih luas",
        "Durasi atau beberapa lokasi dapat dibicarakan sesuai kesepakatan",
        "Perhatian lebih pada detail selama sesi",
        "File digital hasil editing"
      ],
      whatsappText: "Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20memesan%20paket%20The%20Heirloom%20dengan%20harga%20Rp500.000/jam.%20Saya%20ingin%20bertanya%20mengenai%20jadwal%20dan%20detail%20sesi%20fotografi.%20Terima%20kasih."
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Navbar />

      <section className="py-20 px-6 max-w-6xl mx-auto w-full flex-1">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.3em] text-xs uppercase mb-3 block">
            Investment & Packages
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-wide uppercase mb-4">
            Our Pricelist
          </h1>
          <p className="text-sand text-sm max-w-xl mx-auto font-light">
            Pilih paket fotografi yang paling sesuai untuk mengabadikan cerita berharga Anda bersama SAHARA LENZ.
          </p>
        </div>

        {/* Grid Paket */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`flex flex-col justify-between p-8 border ${pkg.popular ? 'border-gold bg-charcoal/90 relative shadow-2xl' : 'border-gold/20 bg-charcoal/50'}`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-charcoal text-[10px] tracking-widest uppercase px-3 py-1 font-semibold">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="font-serif text-2xl uppercase tracking-wider mb-2 text-ivory">{pkg.name}</h3>
                <div className="text-gold font-serif text-xl mb-4">{pkg.price}</div>
                <p className="text-sand text-xs leading-relaxed mb-6 font-light">{pkg.desc}</p>
                
                <div className="border-t border-gold/10 pt-4 mb-8">
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
                    ? 'bg-gold text-charcoal hover:bg-ivory' 
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
    </main>
  );
}
