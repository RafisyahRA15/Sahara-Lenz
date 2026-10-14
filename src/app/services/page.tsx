import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ServicesPage() {
  const servicesList = [
    { title: "Wisuda & Yudisium", desc: "Mengabadikan pencapaian akademik Anda dengan balutan gaya formal maupun editorial yang elegan." },
    { title: "Portrait Individu", desc: "Sesi foto personal untuk menonjolkan karakter, profesionalisme, dan gaya autentik diri Anda." },
    { title: "Couple Session", desc: "Merekam keintiman, kehangatan, dan cerita cinta Anda bersama pasangan tercinta." },
    { title: "Friends & Group", desc: "Dokumentasi kebersamaan seru bersama sahabat atau rekan terdekat dalam bingkai estetik." },
    { title: "Family Photography", desc: "Menjaga kehangatan dan ikatan keluarga tetap abadi melalui potret lintas generasi yang berkesan." },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Navbar />

      <section className="py-20 px-6 max-w-5xl mx-auto w-full flex-1">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.3em] text-xs uppercase mb-3 block">
            What We Offer
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-wide uppercase mb-4">
            Our Services
          </h1>
          <p className="text-sand text-sm max-w-xl mx-auto font-light">
            Layanan fotografi profesional yang dirancang khusus untuk mengabadikan setiap babak berharga dalam hidup Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {servicesList.map((srv, idx) => (
            <div key={idx} className="p-8 border border-gold/20 bg-charcoal/50 flex flex-col justify-between">
              <div>
                <span className="text-gold text-xs tracking-widest block mb-2">0{idx + 1} - SERVICE</span>
                <h3 className="font-serif text-2xl text-ivory uppercase tracking-wider mb-3">{srv.title}</h3>
                <p className="text-sand text-xs leading-relaxed font-light mb-6">{srv.desc}</p>
              </div>
              <Link 
                href="/packages"
                className="text-xs text-gold tracking-widest uppercase hover:underline inline-flex items-center gap-1"
              >
                View Packages &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* Info Wedding */}
        <div className="p-8 border border-gold/30 bg-charcoal text-center">
          <span className="text-gold tracking-[0.2em] text-xs uppercase block mb-2">Special Service</span>
          <h3 className="font-serif text-2xl text-ivory uppercase mb-2">Wedding Photography</h3>
          <p className="text-sand text-xs mb-6">Layanan dokumentasi hari bahagia pernikahan — <strong className="text-gold uppercase tracking-wider">Coming Soon</strong></p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
