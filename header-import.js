// header-import.js
// Script ini bertanggung jawab untuk mengambil konten header dan menyuntikkannya ke dalam halaman utama.

document.addEventListener('DOMContentLoaded', async () => {
    const placeholder = document.getElementById('main-header-placeholder');
    
    if (!placeholder) {
        console.error("Placeholder dengan ID 'main-header-placeholder' tidak ditemukan.");
        return;
    }

    try {
        // Asumsi file komponen header bernama 'header.component.html'
        const response = await fetch('header.component.html');
        
        if (!response.ok) {
            throw new Error(`Gagal memuat header: ${response.statusText}`);
        }
        
        // Ambil konten HTML sebagai teks
        const headerContent = await response.text();
        
        // Suntikkan konten ke placeholder
        placeholder.innerHTML = headerContent;
        
        // Setelah konten (termasuk script di dalamnya) berhasil disuntikkan,
        // jalankan fungsi setupMobileMenu() yang seharusnya kini tersedia di window
        // (fungsi ini didefinisikan di dalam tag <script> di header.component.html).
        if (window.setupMobileMenu) {
            window.setupMobileMenu();
            // console.log("Mobile menu setup complete.");
        } else {
            console.warn("Fungsi window.setupMobileMenu tidak ditemukan setelah injeksi.");
        }

    } catch (error) {
        console.error("Kesalahan saat mengimpor header:", error);
        // Tampilkan pesan error sederhana di UI jika gagal
        placeholder.innerHTML = '<div class="text-center p-4 bg-red-100 text-red-700">Gagal memuat navigasi. Silakan periksa koneksi atau file header.</div>';
    }
});
