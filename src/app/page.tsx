Import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
            alt="Sahara Lenz Hero"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-gold tracking-[0.4em] text-xs uppercase block">
            Luxury Editorial Photography
          </span>
          <h1 className="font-serif text-5xl md:text-7xl tracking-wide uppercase text-ivory">
            SAHARA LENZ
          </h1>
          <p className="text-sand text-sm md:text-base font-light tracking-widest max-w-xl mx-auto">
            Mengabadikan setiap babak berharga dalam hidup Anda dengan sentuhan estetika visual yang abadi dan berkelas.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/portfolio"
              className="px-8 py-3 bg-gold text-charcoal text-xs tracking-widest uppercase font-medium hover:bg-ivory transition duration-300"
            >
              Explore Portfolio
            </Link>
            <Link
              href="/packages"
              className="px-8 py-3 border border-gold text-gold text-xs tracking-widest uppercase hover:bg-gold hover:text-charcoal transition duration-300"
            >
              View Pricelist
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <span className="text-gold tracking-[0.3em] text-xs uppercase mb-3 block">
          The Philosophy
        </span>
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wider mb-6">
          Every Frame Holds a Story
        </h2>
        <p className="text-sand text-sm md:text-base font-light leading-relaxed mb-8">
          SAHARA LENZ hadir untuk Anda yang menghargai keindahan dalam kesederhanaan dan kemewahan dalam detail. Kami merangkum ekspresi, emosi, dan cerita otentik menjadi mahakarya visual yang tak lekang oleh waktu.
        </p>
        <Link
          href="/about"
          className="text-xs text-gold tracking-widest uppercase underline hover:text-ivory"
        >
          Discover Our Story &rarr;
        </Link>
      </section>

      <Footer />
    </main>
  );
}
