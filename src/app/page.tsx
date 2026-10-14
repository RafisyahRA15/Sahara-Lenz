import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#B49A6C_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-gold tracking-[0.3em] text-xs uppercase mb-4 block">
            Luxury Editorial Photography
          </span>
          <h1 className="font-serif text-4xl md:text-6xl tracking-wide uppercase mb-6 leading-tight">
            Every Frame Holds a Story.
          </h1>
          <p className="text-sand text-base md:text-lg font-light mb-10 max-w-xl mx-auto">
            Mengabadikan momen berharga Anda melalui sentuhan artistik yang natural, elegan, dan penuh makna.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/portfolio"
              className="px-8 py-3 bg-gold text-charcoal text-xs tracking-widest uppercase font-medium hover:bg-ivory transition duration-300"
            >
              Explore Our Work
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20dengan%20jasa%20fotografi%20SAHARA%20LENZ.%20Boleh%20saya%20bertanya%20mengenai%20paket%20dan%20jadwal%20sesi%20fotografi?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gold text-gold text-xs tracking-widest uppercase hover:bg-gold/10 transition duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
