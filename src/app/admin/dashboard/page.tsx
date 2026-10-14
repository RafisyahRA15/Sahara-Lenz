'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface Client {
  id: string
  name: string
  whatsapp: string
  package_name: string
  session_date: string
  status: string
  token: string
}

interface Photo {
  id: string
  file_url: string
  file_type: 'selection' | 'final'
  is_selected: boolean
}

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [uploading, setUploading] = useState(false)
  const [downloadingAll, setDownloadingAll] = useState(false)
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)
  
  const [newName, setNewName] = useState('')
  const [newWa, setNewWa] = useState('')
  const [newPackage, setNewPackage] = useState('The Signature')
  const [newDate, setNewDate] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    if (data) setClients(data)
  }

  async function createClient(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.from('clients').insert([
      { name: newName, whatsapp: newWa, package_name: newPackage, session_date: newDate, status: 'Waiting for Selection' }
    ]).select()

    if (!error && data) {
      setNewName('')
      setNewWa('')
      setNewDate('')
      fetchClients()
      alert('Klien berhasil ditambahkan!')
    }
  }

  async function selectClient(client: Client) {
    setSelectedClient(client)
    const { data } = await supabase.from('client_photos').select('*').eq('client_id', client.id)
    if (data) setPhotos(data)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, fileType: 'selection' | 'final') {
    if (!selectedClient || !e.target.files || e.target.files.length === 0) return
    
    setUploading(true)
    const files = Array.from(e.target.files)

    for (const file of files) {
      const fileName = `${selectedClient.id}/${Date.now()}_${file.name}`

      const { error: uploadError } = await supabase.storage.from('client-uploads').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
      
      if (uploadError) {
        console.error('Gagal upload file:', uploadError.message)
        continue
      }

      const { data: publicURLData } = supabase.storage.from('client-uploads').getPublicUrl(fileName)
      const file_url = publicURLData.publicUrl

      await supabase.from('client_photos').insert([
        { client_id: selectedClient.id, file_url, file_type: fileType, is_selected: false }
      ])
    }

    setUploading(false)
    alert('Semua foto resolusi asli berhasil diunggah!')
    selectClient(selectedClient)
  }

  async function updateStatus(newStatus: string) {
    if (!selectedClient) return
    await supabase.from('clients').update({ status: newStatus }).eq('id', selectedClient.id)
    setSelectedClient({ ...selectedClient, status: newStatus })
    fetchClients()
  }

  // Fungsi pintar untuk mengunduh banyak foto pilihan sekaligus secara otomatis berurutan
  async function downloadAllSelectedPhotos() {
    const selectedPhotos = photos.filter(p => p.is_selected)
    if (selectedPhotos.length === 0) {
      alert('Belum ada foto yang dipilih oleh klien.')
      return
    }

    setDownloadingAll(true)
    alert(`Memulai pengunduhan ${selectedPhotos.length} foto pilihan klien. Pastikan browser mengizinkan unduhan ganda (multiple downloads).`)

    try {
      for (let i = 0; i < selectedPhotos.length; i++) {
        const photo = selectedPhotos[i]
        const response = await fetch(photo.file_url)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `pilihan_klien_${i + 1}.jpg`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        // Jeda kecil 300ms agar browser HP tidak macet saat mengunduh banyak file
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      alert('Semua foto pilihan berhasil diunduh ke perangkat!')
    } catch (error) {
      console.error('Gagal download massal:', error)
      alert('Terjadi kendala saat mengunduh foto.')
    } finally {
      setDownloadingAll(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#242321] text-[#F5F0E8] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-[#B49A6C]/30 pb-4">
          <div>
            <p className="text-[#B49A6C] uppercase tracking-widest text-xs">SAHARA LENZ ADMIN</p>
            <h1 className="text-3xl font-serif">Dashboard Pengelolaan Klien</h1>
          </div>
          <a href="/" className="text-xs uppercase tracking-widest text-[#D9CBB8] hover:text-[#B49A6C]">Kembali ke Website</a>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sisi Kiri: Tambah Klien & Daftar Klien */}
          <div className="space-y-6">
            <div className="bg-[#F5F0E8]/5 p-6 rounded border border-[#B49A6C]/20">
              <h2 className="text-lg font-serif mb-4 text-[#B49A6C]">Tambah Klien Baru</h2>
              <form onSubmit={createClient} className="space-y-4 text-sm">
                <input type="text" placeholder="Nama Klien" value={newName} onChange={e => setNewName(e.target.value)} required className="w-full bg-[#242321] border border-[#B49A6C]/40 p-2 rounded text-[#F5F0E8]" />
                <input type="text" placeholder="Nomor WhatsApp (628...)" value={newWa} onChange={e => setNewWa(e.target.value)} required className="w-full bg-[#242321] border border-[#B49A6C]/40 p-2 rounded text-[#F5F0E8]" />
                <select value={newPackage} onChange={e => setNewPackage(e.target.value)} className="w-full bg-[#242321] border border-[#B49A6C]/40 p-2 rounded text-[#F5F0E8]">
                  <option value="The Essential">The Essential</option>
                  <option value="The Signature">The Signature</option>
                  <option value="The Heirloom">The Heirloom</option>
                </select>
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} required className="w-full bg-[#242321] border border-[#B49A6C]/40 p-2 rounded text-[#F5F0E8]" />
                <button type="submit" className="w-full bg-[#B49A6C] text-[#242321] py-2 uppercase tracking-widest text-xs font-medium hover:bg-[#F5F0E8] transition-all">Buat Klien & Galeri</button>
              </form>
            </div>

            <div className="bg-[#F5F0E8]/5 p-6 rounded border border-[#B49A6C]/20">
              <h2 className="text-lg font-serif mb-4 text-[#B49A6C]">Daftar Klien</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {clients.map(client => (
                  <div key={client.id} onClick={() => selectClient(client)} className={`p-3 rounded cursor-pointer border transition-all ${selectedClient?.id === client.id ? 'border-[#B49A6C] bg-[#B49A6C]/10' : 'border-transparent bg-black/20 hover:border-[#B49A6C]/50'}`}>
                    <p className="font-medium text-sm">{client.name}</p>
                    <p className="text-xs text-[#D9CBB8]/60">{client.package_name} • {client.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Detail Klien & Manajemen Foto */}
          <div className="lg:col-span-2 bg-[#F5F0E8]/5 p-6 rounded border border-[#B49A6C]/20">
            {selectedClient ? (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-serif text-[#B49A6C]">{selectedClient.name}</h2>
                    <p className="text-xs text-[#D9CBB8]/70">Status: <span className="text-[#F5F0E8] font-semibold">{selectedClient.status}</span></p>
                    <p className="text-xs text-[#D9CBB8]/70 mt-1">Tautan Galeri: <a href={`/gallery/${selectedClient.token}`} target="_blank" className="text-[#B49A6C] underline">/gallery/{selectedClient.token}</a></p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={downloadAllSelectedPhotos} 
                      disabled={downloadingAll} 
                      className="bg-emerald-600 text-white px-4 py-2 text-xs uppercase tracking-wider font-medium rounded hover:bg-emerald-500 transition-all shadow"
                    >
                      {downloadingAll ? 'Mengunduh...' : '📦 Download Semua Pilihan'}
                    </button>
                    <button onClick={() => updateStatus('Final Published')} className="bg-[#B49A6C] text-[#242321] px-4 py-2 text-xs uppercase tracking-wider font-medium rounded">Publish Final</button>
                    <button onClick={() => updateStatus('Completed')} className="bg-stone-700 text-white px-4 py-2 text-xs uppercase tracking-wider font-medium rounded">Selesai</button>
                  </div>
                </div>

                {uploading && (
                  <div className="mb-4 p-3 bg-[#B49A6C]/20 text-[#B49A6C] text-center text-xs rounded animate-pulse">
                    Mengunggah foto resolusi asli ke galeri klien...
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="border border-dashed border-[#B49A6C]/40 p-4 rounded text-center bg-black/20">
                    <p className="text-xs mb-2 text-[#D9CBB8] font-medium">Upload Foto Mentah (Resolusi Asli)</p>
                    <input type="file" accept="image/*" multiple onChange={e => handleFileUpload(e, 'selection')} className="text-xs text-[#D9CBB8] file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#B49A6C] file:text-[#242321] cursor-pointer" />
                  </div>
                  <div className="border border-dashed border-[#B49A6C]/40 p-4 rounded text-center bg-black/20">
                    <p className="text-xs mb-2 text-[#D9CBB8] font-medium">Upload Foto Edit Final (Resolusi Asli)</p>
                    <input type="file" accept="image/*" multiple onChange={e => handleFileUpload(e, 'final')} className="text-xs text-[#D9CBB8] file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#B49A6C] file:text-[#242321] cursor-pointer" />
                  </div>
                </div>

                <h3 className="text-sm uppercase tracking-widest text-[#B49A6C] mb-2">Foto Galeri Klien (Ketuk foto untuk memperbesar)</h3>
                <p className="text-xs text-[#D9CBB8]/60 mb-4">Foto dengan border hijau tebal adalah foto yang dipilih oleh klien untuk diedit.</p>
                
                <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {photos.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => setPreviewPhoto(p.file_url)}
                      className={`relative rounded overflow-hidden border-2 cursor-pointer group transition-all ${p.is_selected ? 'border-emerald-500 scale-[0.98]' : 'border-transparent hover:border-[#B49A6C]'}`}
                    >
                      <img src={p.file_url} alt="Gallery Item" className="w-full h-36 object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute bottom-1 left-1 bg-black/80 px-2 py-0.5 text-[10px] text-[#F5F0E8] rounded">
                        {p.file_type.toUpperCase()} {p.is_selected ? '✓ (Pilihan)' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-32 text-[#D9CBB8]/50 font-serif">
                Pilih salah satu klien di samping untuk melihat daftar foto.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Lightbox untuk Memperbesar Foto & Tombol Download */}
      {previewPhoto && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[80vh] mb-4 flex items-center justify-center">
            <img src={previewPhoto} alt="Preview Detail" className="max-w-full max-h-[75vh] object-contain rounded border border-[#B49A6C]/40" />
          </div>
          <div className="flex gap-4">
            <a 
              href={previewPhoto} 
              target="_blank" 
              download 
              className="bg-[#B49A6C] text-[#242321] px-6 py-2 text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#F5F0E8] transition-all"
            >
              Download Foto Ini (Resolusi Asli)
            </a>
            <button 
              onClick={() => setPreviewPhoto(null)} 
              className="bg-stone-700 text-[#F5F0E8] px-6 py-2 text-xs uppercase tracking-widest font-semibold rounded hover:bg-stone-600 transition-all"
            >
              Tutup [X]
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
