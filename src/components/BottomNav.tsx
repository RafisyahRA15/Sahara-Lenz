import Link from 'next/link';

export default function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#242321]/95 backdrop-blur-md border-t border-gold/20 py-4 px-2 z-50 flex justify-around items-center text-center shadow-2xl">
      <Link href="/" className="flex-1 py-2 text-sand hover:text-gold transition active:scale-95">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] font-serif block">Home</span>
      </Link>
      <Link href="/about" className="flex-1 py-2 text-sand hover:text-gold transition active:scale-95 border-l border-gold/10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] font-serif block">About</span>
      </Link>
      <Link href="/portfolio" className="flex-1 py-2 text-sand hover:text-gold transition active:scale-95 border-l border-gold/10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] font-serif block">Portfolio</span>
      </Link>
      <Link href="/packages" className="flex-1 py-2 text-sand hover:text-gold transition active:scale-95 border-l border-gold/10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] font-serif block">Pricelist</span>
      </Link>
      <a 
        href="https://wa.me/6281234567890?text=Halo%20SAHARA%20LENZ!" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 py-2 text-gold transition active:scale-95 border-l border-gold/10 font-bold"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] font-serif block">Chat</span>
      </a>
    </div>
  );
}
