import Link from 'next/link';

export default function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1917]/95 backdrop-blur-md border-t border-gold/30 py-3 px-1 z-50 flex justify-around items-center text-center shadow-2xl">
      <Link href="/" className="flex-1 py-1 text-sand hover:text-gold transition active:scale-95">
        <span className="text-[10px] font-medium uppercase tracking-wider font-serif block">Home</span>
      </Link>
      <Link href="/about" className="flex-1 py-1 text-sand hover:text-gold transition active:scale-95 border-l border-gold/15">
        <span className="text-[10px] font-medium uppercase tracking-wider font-serif block">About</span>
      </Link>
      <Link href="/portfolio" className="flex-1 py-1 text-sand hover:text-gold transition active:scale-95 border-l border-gold/15">
        <span className="text-[10px] font-medium uppercase tracking-wider font-serif block">Portfolio</span>
      </Link>
      <Link href="/packages" className="flex-1 py-1 text-sand hover:text-gold transition active:scale-95 border-l border-gold/15">
        <span className="text-[10px] font-medium uppercase tracking-wider font-serif block">Pricelist</span>
      </Link>
      <a 
        href="https://wa.me/6285111879116?text=Halo%20SAHARA%20LENZ!" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 py-1 text-gold transition active:scale-95 border-l border-gold/15 font-semibold"
      >
        <span className="text-[10px] uppercase tracking-wider font-serif block">Chat</span>
      </a>
    </div>
  );
}
