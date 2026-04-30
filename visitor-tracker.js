// File: visitor-tracker.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        const now = new Date();
        const waktu = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
        const pesan = `⚠️ Ada yang kepoin nih! ⚠️\n\nWaktu: ${waktu}\nLokasi: ${data.city}, ${data.region}, ${data.country_name}\nIP: ${data.ip}\nPerangkat: ${data.org}`;

        // Tampilkan notifikasi (contoh di console)
        console.log(pesan);
        // Bisa juga pakai alert() atau tampilkan di elemen HTML
        // alert(pesan);
        tampilkanNotifikasi(pesan);
    })
    .catch(error => console.error('Gagal mengambil data pengunjung:', error));
});

function tampilkanNotifikasi(pesan) {
    // Buat elemen notifikasi
    const notif = document.createElement('div');
    notif.textContent = pesan;
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.backgroundColor = '#000';
    notif.style.color = '#0f0';
    notif.style.padding = '15px';
    notif.style.borderRadius = '8px';
    notif.style.zIndex = '9999';
    notif.style.fontFamily = 'monospace';
    notif.style.fontSize = '12px';
    notif.style.border = '1px solid #0f0';
    notif.style.boxShadow = '0 0 15px rgba(0,255,0,0.5)';
    document.body.appendChild(notif);

    // Notifikasi akan hilang setelah 7 detik
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transition = 'opacity 1s';
        setTimeout(() => notif.remove(), 1000);
    }, 7000);
}
