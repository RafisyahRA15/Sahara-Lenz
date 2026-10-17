'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

interface Photo {
  id: string
  file_url: string
  file_type: 'selection' | 'final'
  is_selected: boolean
}

interface ClientData {
  id: string
  name: string
  package_name: string
  session_date: string
  status: string
}

export default function ClientGalleryPage() {
  const params = useParams()
  const token = params.token as string

  const [client, setClient] = useState<ClientData | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'selection' | 'final'>('selection')
  const [downloadingAll, setDownloadingAll] = useState(false)

  // State untuk Lightbox / Pratinjau Layar Penuh
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchClientAndPhotos()
  }, [token])

  // Event Keyboard untuk Navigasi Panah Kiri/Kanan di Modal Lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (currentIndex === null) return
      const selectionPhotos = photos.filter(p => p.file_type === 'selection')
      
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev !== null && prev < selectionPhotos.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Escape') {
        setCurrentIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, photos])

  async function fetchClientAndPhotos() {
    setLoading(true)
    const { data: clientData } = await supabase
      .from('clients')
      .select('*')
      .eq('token', token)
      .single()

    if (!clientData) {
      setLoading(false)
      return
    }

    setClient(clientData)

    const { data: photoData } = await supabase
      .from('client_photos')
      .select('*')
      .eq('client_id', clientData.id)

    if (photoData) {
      setPhotos(photoData)
    }
    setLoading(false)
  }

  async function toggleSelectPhoto(photoId: string, currentStatus: boolean) {
    const newStatus = !currentStatus
    const { error } = await supabase
      .from('client_photos')
      .update({ is_selected: newStatus })
      .eq('id', photoId)

    if (!error) {
      setPhotos(photos.map(p => p.id === photoId ? { ...p, is_selected: newStatus } : p))
    }
  }

  async function confirmSelection() {
    if (!client) return
    const { error } = await supabase
      .from('clients')
      .update({ status: 'Selection Confirmed' })
      .eq('id', client.id)

    if (!error) {
      setClient({ ...client, status: 'Selection Confirmed' })
      alert('Pilihan foto berhasil dikonfirmasi ke SAHARA LENZ! Terima kasih.')
    }
  }

  async function downloadAllFinalPhotos() {
    const finalPhotos = photos.filter(p => p.file_type === 'final')
    if (finalPhotos.length === 0) return

    setDownloadingAll(true)
    alert(`Mengunduh ${finalPhotos.length} foto final ke perangkat Anda. Mohon tunggu sebentar...`)

    try {
      for (let i = 0; i < finalPhotos.length; i++) {
        const photo = finalPhotos[i]
        const response = await fetch(photo.file_url)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `SAHARA_LENZ_Final_${i + 1}.jpg`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      alert('Semua foto final berhasil diunduh!')
    } catch (error) {
      console.error('Gagal download massal:', error)
      alert('Terjadi kendala saat mengunduh foto.')
    } finally {
      setDownloadingAll(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#242321] text-[#F5F0E8] flex items-center justify-center font-serif">Memuat galeri eksklusif Anda...</div>
  }

  if (!client) {
    return <div className="min-h-screen bg-[#242321] text-[#F5F0E8] flex items-center justify-center font-serif">Galeri tidak ditemukan atau tautan tidak valid.</div>
  }

  const selectionPhotos = photos.filter(p => p.file_type === 'selection')
  const finalPhotos = photos.filter(p => p.file_type === 'final')
  const isCompleted = client.status === 'Completed'
  const isFinalPublished = client.status === 'Final Published' || client.status === 'Completed'

  return (
    <main className="min-h-screen bg-[#242321] text-[#F5F0E8] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-[#B49A6C] uppercase tracking-widest text-sm mb-2">SAHARA LENZ PRIVATE GALLERY</p>
          <h1 className="text-4xl font-serif font-medium mb-2">{client.name}</h1>
          <p className="text-[#D9CBB8] text-sm">Paket: {client.package_name} | Tanggal: {client.session_date || 'Belum ditentukan'}</p>
        </header>

        {/* Jika Status Completed */}
        {isCompleted ? (
          <div className="max-w-2xl mx-auto text-center bg-[#F5F0E8]/5 p-8 rounded border border-[#B49A6C]/30 space-y-6">
            <div className="w-12 h-12 mx-auto bg-[#B49A6C]/20 rounded-full flex items-center justify-center text-[#B49A6C] text-xl font-serif">
              ✦
            </div>
            <h2 className="text-3xl font-serif text-[#B49A6C]">Terima Kasih Telah Mempercayai SAHARA LENZ</h2>
            <p className="text-sm text-[#D9CBB8] leading-relaxed">
              Sesi fotografi Anda telah selesai dan diarsipkan dengan sukses. Merupakan suatu kehormatan bagi kami untuk mengabadikan momen berharga Anda.
            </p>
            <div className="bg-black/30 p-4 rounded border border-[#B49A6C]/20 text-xs text-[#D9CBB8]/80 leading-relaxed text-left">
              <p className="font-semibold text-[#B49A6C] mb-1">Informasi & Kebijakan Penyimpanan Arsip:</p>
              Seluruh file foto hasil suntingan Anda disimpan di database kami dalam jangka waktu maksimal <strong className="text-[#F5F0E8]">1 bulan</strong> sejak galeri ini diterbitkan. Lebih dari batas waktu tersebut, file akan dibersihkan secara permanen dari server web untuk menjaga keamanan privasi. Jika Anda membutuhkan file cadangan di kemudian hari, silakan hubungi admin kami.
            </div>
            <div className="pt-2">
              <a 
                href="https://wa.me/6281234567890?text=Halo%20Sahara%20Lenz,%20saya%20ingin%20menghubungi%20kembali%20terkait%20arsip%20foto."
                target="_blank"
                className="inline-block bg-[#B49A6C] text-[#242321] px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#F5F0E8] transition-all"
              >
                Hubungi Admin via WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Navigasi */}
            <div className="flex justify-center gap-4 mb-8 border-b border-[#B49A6C]/30 pb-4">
              <button 
                onClick={() => setActiveTab('selection')}
                className={`px-6 py-2 text-sm tracking-wider uppercase transition-all ${activeTab === 'selection' ? 'border-b-2 border-[#B49A6C] text-[#F5F0E8]' : 'text-[#D9CBB8]/60 hover:text-[#F5F0E8]'}`}
              >
                Photo Selection ({selectionPhotos.length})
              </button>
              <button 
                onClick={() => setActiveTab('final')}
                className={`px-6 py-2 text-sm tracking-wider uppercase transition-all ${activeTab === 'final' ? 'border-b-2 border-[#B49A6C] text-[#F5F0E8]' : 'text-[#D9CBB8]/60 hover:text-[#F5F0E8]'}`}
              >
                Final Edited Photos ({finalPhotos.length})
              </button>
            </div>

            {/* Tab 1: Photo Selection */}
            {activeTab === 'selection' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-[#F5F0E8]/5 p-4 rounded border border-[#B49A6C]/20 gap-3">
                  <p className="text-xs sm:text-sm text-[#D9CBB8]">Klik foto untuk melihat ukuran besar, geser antar foto, dan centang pilihan Anda.</p>
                  <button 
                    onClick={confirmSelection}
                    className="bg-[#B49A6C] text-[#242321] px-5 py-2 text-xs uppercase tracking-widest font-medium hover:bg-[#F5F0E8] transition-all rounded shrink-0"
                  >
                    Confirm Selection
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectionPhotos.map((photo, idx) => (
                    <div 
                      key={photo.id} 
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative cursor-pointer group rounded overflow-hidden border-2 transition-all ${photo.is_selected ? 'border-[#B49A6C] scale-[0.98]' : 'border-transparent'}`}
                    >
                      {/* LAZY LOADING DITAMBAHKAN DI SINI */}
                      <img 
                        src={photo.file_url} 
                        alt="Client Selection" 
                        loading="lazy" 
                        className="w-full h-64 object-cover" 
                      />
                      
                      {/* Watermark Halus */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                        <span className="text-white/30 font-serif tracking-[0.25em] text-xs sm:text-sm uppercase transform -rotate-12 px-2 py-1 bg-black/20 rounded">
                          SAHARA LENZ
                        </span>
                      </div>

                      {/* Tombol Centang Cepat di Thumbnail */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSelectPhoto(photo.id, photo.is_selected)
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${photo.is_selected ? 'bg-[#B49A6C] text-[#242321]' : 'bg-black/60 text-white border border-white/50 hover:bg-black'}`}
                        title="Tandai untuk diedit"
                      >
                        {photo.is_selected ? '✓' : '+'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Final Edited Photos */}
            {activeTab === 'final' && (
              <div>
                {!isFinalPublished ? (
                  <div className="text-center py-20 bg-[#F5F0E8]/5 rounded border border-[#B49A6C]/20">
                    <p className="text-xl font-serif text-[#D9CBB8] mb-2">Your edited photos are not available yet.</p>
                    <p className="text-xs text-[#D9CBB8]/60">Admin sedang melakukan proses editing terbaik untuk momen spesial Anda.</p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 bg-[#F5F0E8]/5 p-5 rounded border border-[#B49A6C]/30 space-y-3">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <p className="text-sm text-[#F5F0E8] font-medium">Koleksi Foto Final Anda Telah Siap</p>
                          <p className="text-xs text-[#D9CBB8]/70 mt-0.5">
                            Harap segera unduh seluruh foto Anda. File akan disimpan dalam sistem kami selama <strong className="text-[#B49A6C]">1 bulan</strong> ke depan sebelum dihapus permanen.
                          </p>
                        </div>
                        <button 
                          onClick={downloadAllFinalPhotos} 
                          disabled={downloadingAll}
                          className="bg-[#B49A6C] text-[#242321] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#F5F0E8] transition-all rounded shadow shrink-0"
                        >
                          {downloadingAll ? 'Mengunduh...' : '📥 Download Semua Foto'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {finalPhotos.map(photo => (
                        <div key={photo.id} className="relative group rounded overflow-hidden border border-[#B49A6C]/30">
                          {/* LAZY LOADING DITAMBAHKAN DI SINI JUGA */}
                          <img 
                            src={photo.file_url} 
                            alt="Final Edited" 
                            loading="lazy" 
                            className="w-full h-64 object-cover" 
                          />
                          <a 
                            href={photo.file_url} 
                            target="_blank" 
                            download 
                            className="absolute inset-x-0 bottom-0 bg-[#242321]/90 text-[#F5F0E8] text-center py-2 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all"
                          >
                            Download HD
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL LIGHTBOX / PRATINJAU FOTO UKURAN BESAR DENGAN TOMBOL NAVIGASI & SELECT */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          {/* Tombol Tutup */}
          <button 
            onClick={() => setCurrentIndex(null)}
            className="absolute top-4 right-6 text-white text-2xl font-serif bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
          >
            &times;
          </button>

          {/* Indikator Posisi Foto (Contoh: 15 / 700) */}
          <div className="absolute top-4 left-6 text-xs tracking-widest text-[#D9CBB8]">
            Foto {currentIndex + 1} dari {selectionPhotos.length}
          </div>

          {/* Kontainer Foto Utama */}
          <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center my-auto">
            <img 
              src={selectionPhotos[currentIndex].file_url} 
              alt="Pratinjau Besar" 
              className="max-h-[75vh] max-w-full object-contain rounded border border-[#B49A6C]/30"
            />

            {/* Tombol Panah Kiri (Sebelumnya) */}
            {currentIndex > 0 && (
              <button 
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="absolute left-2 md:-left-12 bg-black/60 hover:bg-[#B49A6C] hover:text-[#242321] text-white p-3 rounded-full transition-all text-lg font-bold"
              >
                &#10094;
              </button>
            )}

            {/* Tombol Panah Kanan (Berikutnya) */}
            {currentIndex < selectionPhotos.length - 1 && (
              <button 
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="absolute right-2 md:-right-12 bg-black/60 hover:bg-[#B49A6C] hover:text-[#242321] text-white p-3 rounded-full transition-all text-lg font-bold"
              >
                &#10095;
              </button>
            )}
          </div>

          {/* Panel Bawah Modal: Tombol Pilih / Favorit & Keterangan */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 bg-black/40 px-6 py-3 rounded-full border border-[#B49A6C]/20">
            <button
              onClick={() => toggleSelectPhoto(selectionPhotos[currentIndex].id, selectionPhotos[currentIndex].is_selected)}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 ${
                selectionPhotos[currentIndex].is_selected 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#B49A6C] text-[#242321] hover:bg-[#F5F0E8]'
              }`}
            >
              {selectionPhotos[currentIndex].is_selected ? '✓ Terpilih untuk Diedit' : '＋ Pilih Foto Ini'}
            </button>
            <span className="text-[11px] text-[#D9CBB8]/70">
              Tips: Gunakan tombol panah kiri / kanan di keyboard untuk geser cepat.
            </span>
          </div>
        </div>
      )}
    </main>
  )
}
