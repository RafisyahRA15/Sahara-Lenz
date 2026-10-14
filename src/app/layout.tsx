import './globals.css';

export const metadata = {
  title: 'SAHARA LENZ | Luxury Editorial Photography',
  description: 'Mengabadikan setiap babak berharga dalam hidup Anda dengan sentuhan estetika visual yang abadi dan berkelas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Tambahan Google Fonts untuk mendukung font Serif & sans jika diperlukan */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-charcoal text-ivory antialiased selection:bg-gold selection:text-charcoal">
        {children}
      </body>
    </html>
  );
}
