import Link from 'next/link';

export default function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#242321]/95 backdrop-blur-md border-t border-gold/20 py-3 px-4 z-50 flex justify-around items-center text-center shadow-lg">
      <Link href="/" className="flex flex-col items-center text-sand hover:text-gold transition">
        <span className="text-xs uppercase tracking-widest font-serif">Home</span>
      </Link>
      <Link href="/about" className="flex flex-col items-center text-sand hover:text-gold transition">
        <span className="text-xs uppercase tracking-widest font-serif">About</span>
      </Link>
      <Link href="/portfolio" className="flex flex-col items-center text-sand hover:text-gold transition">
        <span className="text-xs uppercase tracking-widest font-serif">Portfolio</span>
      </Link>
      <Link href="/packages" className="flex flex-col items-center text-sand hover:text-gold transition">
        <span className="text-xs uppercase tracking-widest font-serif">Pricelist</span>
      </Link>
      <a 
        href="https://wa.me/6281234567890?text=Halo%20SAHARA%20LENZ!" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col items-center text-gold font-semibold transition"
      >
        <span className="text-xs uppercase tracking-widest font-serif">Chat</span>
      </a>
    </div>
  );
}
