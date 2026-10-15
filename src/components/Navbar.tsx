import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center border-b border-gold/20 bg-charcoal/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-3 group">
        <img 
          src="/logo.png" 
          alt="SAHARA LENZ Logo" 
          className="h-10 md:h-12 w-auto object-contain" 
        />
        <span className="font-serif text-2xl tracking-widest text-ivory uppercase group-hover:text-gold transition">
          SAHARA LENZ
        </span>
      </Link>
      <nav className="hidden md:flex gap-8 text-sm tracking-widest text-sand uppercase">
        <Link href="/" className="hover:text-gold transition">Home</Link>
        <Link href="/about" className="hover:text-gold transition">About</Link>
        <Link href="/portfolio" className="hover:text-gold transition">Portfolio</Link>
        <Link href="/services" className="hover:text-gold transition">Services</Link>
        <Link href="/packages" className="hover:text-gold transition">Pricelist</Link>
      </nav>
      <div>
        <a
          href="https://wa.me/6285111879116?text=Halo%20SAHARA%20LENZ!%20Saya%20tertarik%20dengan%20jasa%20fotografi."
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 text-xs tracking-widest uppercase border border-gold text-gold hover:bg-gold hover:text-charcoal transition duration-300"
        >
          Book via WhatsApp
        </a>
      </div>
    </header>
  );
}
