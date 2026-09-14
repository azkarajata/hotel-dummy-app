// Mengambil data dari hotels.json dan menampilkannya
document.addEventListener('DOMContentLoaded', () => {
  const hotelList = document.getElementById('hotelList');
  const searchInput = document.getElementById('searchInput');
  let allHotels = [];

  // 1. Fetch data dari file hotels.json
  fetch('hotels.json')
    .then(response => response.json())
    .then(data => {
      allHotels = data;
      renderHotels(allHotels);
    })
    .catch(err => console.error('Gagal memuat data hotel:', err));

  // 2. Fungsi untuk menampilkan kartu hotel ke HTML
  function renderHotels(hotels) {
    hotelList.innerHTML = '';

    if (hotels.length === 0) {
      hotelList.innerHTML = `<p class="text-gray-500 col-span-full text-center">Hotel tidak ditemukan.</p>`;
      return;
    }

    hotels.forEach(hotel => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300';
      
      card.innerHTML = `
        <img src="${hotel.gambar || 'https://via.placeholder.com/400x250'}" alt="${hotel.nama}" class="w-full h-48 object-cover">
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-1 rounded">
              📍 ${hotel.kota}
            </span>
            <span class="text-sm font-semibold text-yellow-500">⭐ ${hotel.rating || '4.5'}</span>
          </div>
          <h4 class="text-lg font-bold text-gray-800 mb-1">${hotel.nama}</h4>
          <p class="text-gray-600 text-sm mb-4">${hotel.deskripsi || 'Penginapan nyaman dengan fasilitas lengkap.'}</p>
          <div class="flex justify-between items-center pt-2 border-t">
            <div>
              <span class="text-xs text-gray-400">Harga / malam</span>
              <p class="text-lg font-extrabold text-blue-600">Rp ${Number(hotel.harga).toLocaleString('id-ID')}</p>
            </div>
            <button onclick="bookingDummy('${hotel.nama}')" class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
              Book Now
            </button>
          </div>
        </div>
      `;
      hotelList.appendChild(card);
    });
  }

  // 3. Fitur Filter Pencarian berdasarkan Kota/Nama
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = allHotels.filter(h => 
      h.kota.toLowerCase().includes(keyword) || 
      h.nama.toLowerCase().includes(keyword)
    );
    renderHotels(filtered);
  });
});

// Fitur simulasi booking
function bookingDummy(namaHotel) {
  alert(`🎉 Berhasil! Pemesanan dummy untuk "${namaHotel}" telah dikonfirmasi.`);
}
