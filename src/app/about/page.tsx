import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-charcoal text-ivory pb-16 md:pb-0">
      <Navbar />

      <section className="py-20 px-6 max-w-4xl mx-auto w-full flex-1">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.3em] text-xs uppercase mb-3 block">
            The Brand Philosophy
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-wide uppercase mb-4">
            About SAHARA LENZ
          </h1>
          <p className="text-sand text-sm tracking-wider italic">
            “Every Frame Holds a Story.”
          </p>
        </div>

        <div className="space-y-8 text-sand text-base font-light leading-relaxed border-t border-b border-gold/20 py-12">
          <p>
            <strong className="text-ivory font-serif text-lg">SAHARA LENZ</strong> hadir sebagai brand fotografi profesional yang berfokus pada dokumentasi momen berharga melalui tangkapan visual yang natural, estetik, dan penuh makna. Kami memadukan pendekatan artistik dengan gaya <span className="text-gold italic">luxury editorial</span> untuk setiap karya yang kami hasilkan.
          </p>
          <p>
            Kami percaya bahwa setiap individu, pasangan, dan keluarga memiliki narasi unik yang layak diabadikan dengan penuh ketulusan dan perhatian pada detail. Komitmen kami adalah memberikan pengalaman sesi fotografi yang eksklusif, personal, dan nyaman, dari awal sesi hingga penyerahan hasil foto final.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 border border-gold/10 bg-charcoal/40">
            <h3 className="font-serif text-lg text-ivory uppercase mb-2">Personal Approach</h3>
            <p className="text-xs text-sand/80 font-light">Pendekatan yang intim dan personal untuk menggali karakter terbaik setiap klien.</p>
          </div>
          <div className="p-6 border border-gold/10 bg-charcoal/40">
            <h3 className="font-serif text-lg text-ivory uppercase mb-2">Artistic Direction</h3>
            <p className="text-xs text-sand/80 font-light">Arahan gaya dan pose profesional yang memadukan estetika formal dan candid.</p>
          </div>
          <div className="p-6 border border-gold/10 bg-charcoal/40">
            <h3 className="font-serif text-lg text-ivory uppercase mb-2">Consistent Editing</h3>
            <p className="text-xs text-sand/80 font-light">Sentuhan warna dan editing konsisten berkelas tinggi khas galeri editorial.</p>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}
