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

  useEffect(() => {
    fetchClientAndPhotos()
  }, [token])

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

            {/* Tab 1: Photo Selection (Dilengkapi Watermark Halus di Tengah) */}
            {activeTab === 'selection' && (
              <div>
                <div className="flex justify-between items-center mb-6 bg-[#F5F0E8]/5 p-4 rounded border border-[#B49A6C]/20">
                  <p className="text-sm text-[#D9CBB8]">Klik pada foto untuk menandai sebagai foto favorit yang ingin diedit.</p>
                  <button 
                    onClick={confirmSelection}
                    className="bg-[#B49A6C] text-[#242321] px-5 py-2 text-xs uppercase tracking-widest font-medium hover:bg-[#F5F0E8] transition-all rounded"
                  >
                    Confirm Selection
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectionPhotos.map(photo => (
                    <div 
                      key={photo.id} 
                      onClick={() => toggleSelectPhoto(photo.id, photo.is_selected)}
                      className={`relative cursor-pointer group rounded overflow-hidden border-2 transition-all ${photo.is_selected ? 'border-[#B49A6C] scale-[0.98]' : 'border-transparent'}`}
                    >
                      <img src={photo.file_url} alt="Client Selection" className="w-full h-64 object-cover" />
                      
                      {/* Watermark Halus di Tengah Foto Seleksi */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                        <span className="text-white/30 font-serif tracking-[0.25em] text-xs sm:text-sm uppercase transform -rotate-12 px-2 py-1 bg-black/20 rounded">
                          SAHARA LENZ
                        </span>
                      </div>

                      <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${photo.is_selected ? 'bg-[#B49A6C] text-[#242321]' : 'bg-black/50 text-white border border-white/50'}`}>
                        {photo.is_selected ? '✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Final Edited Photos (Bersih tanpa watermark agar klien puas mendownload hasil akhir) */}
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
                          <img src={photo.file_url} alt="Final Edited" className="w-full h-64 object-cover" />
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
    </main>
  )
}
