import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 border-t border-gold/20 bg-charcoal text-ivory flex flex-col items-center text-center">
      <h2 className="font-serif text-2xl tracking-widest uppercase mb-2">SAHARA LENZ</h2>
      <p className="text-sand text-sm tracking-wider italic mb-6">“Every Frame Holds a Story.”</p>
      
      <div className="flex flex-wrap justify-center gap-6 text-xs tracking-widest uppercase text-sand mb-8">
        <Link href="/" className="hover:text-gold transition">Home</Link>
        <Link href="/about" className="hover:text-gold transition">About</Link>
        <Link href="/portfolio" className="hover:text-gold transition">Portfolio</Link>
        <Link href="/services" className="hover:text-gold transition">Services</Link>
        <Link href="/packages" className="hover:text-gold transition">Pricelist</Link>
      </div>

      <p className="text-xs text-sand/60 tracking-wider">
        &copy; {new Date().getFullYear()} SAHARA LENZ. All Rights Reserved.
      </p>
    </footer>
  );
}
