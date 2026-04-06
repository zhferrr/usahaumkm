// Konfigurasi Google Spreadsheet
// CARA SETUP:
// 1. Buat Google Spreadsheet dengan kolom: Nama, Kategori, Harga, Stok, Gambar, Deskripsi
// 2. File > Share > Publish to web > Pilih "Entire Document" dan "Comma-separated values (.csv)"
// 3. Copy URL CSV dan ganti SPREADSHEET_URL di bawah

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3Wgs8GH63zcJcGVPUF8qDkbdSLa0vhLSvcRoOr7lXLNpC-8EH4Q8PJMiIIhzHEwGvSj6LS4iHlP19/pub?output=csv';

// Contoh format URL:
// https://docs.google.com/spreadsheets/d/e/2PACX-xxxxx/pub?output=csv

let allProducts = [];
let filteredProducts = [];

// Load products from Google Spreadsheet
async function loadProducts() {
  try {
    const response = await fetch(SPREADSHEET_URL);
    const csvText = await response.text();
    
    // Parse CSV
    const rows = csvText.split('\n').slice(1); // Skip header row
    allProducts = rows
      .filter(row => row.trim())
      .map(row => {
        const cols = parseCSVRow(row);
        return {
          nama: cols[0] || '',
          kategori: cols[1] || '',
          harga: parseInt(cols[2]) || 0,
          stok: parseInt(cols[3]) || 0,
          gambar: cols[4] || 'https://via.placeholder.com/300x300?text=No+Image',
          deskripsi: cols[5] || ''
        };
      })
      .filter(product => product.nama); // Filter out empty products

    filteredProducts = [...allProducts];
    
    // Populate categories
    populateCategories();
    
    // Display products
    displayProducts(filteredProducts);
    
    // Hide loading, show products
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('produk').classList.remove('hidden');
    
  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('loading').innerHTML = `
      <div class="text-center text-red-600">
        <p class="text-xl font-semibold mb-2">Gagal memuat produk</p>
        <p class="text-sm">Pastikan URL Google Spreadsheet sudah benar dan dipublikasikan sebagai CSV</p>
        <button onclick="loadProducts()" class="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Coba Lagi
        </button>
      </div>
    `;
  }
}

// Parse CSV row (handle commas in quotes)
function parseCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  
  return result;
}

// Populate category filter
function populateCategories() {
  const categories = [...new Set(allProducts.map(p => p.kategori))].filter(c => c);
  const categoryFilter = document.getElementById('categoryFilter');
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Display products
function displayProducts(products) {
  const productGrid = document.getElementById('productGrid');
  const noResults = document.getElementById('noResults');
  
  productGrid.innerHTML = '';
  
  if (products.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }
  
  noResults.classList.add('hidden');
  
  products.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

// Create product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300';
  
  const stockBadge = product.stok > 0 
    ? `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Stok: ${product.stok}</span>`
    : `<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Habis</span>`;
  
  card.innerHTML = `
    <div class="aspect-square overflow-hidden bg-gray-100">
      <img src="${product.gambar}" alt="${product.nama}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-800">${product.nama}</h3>
        ${stockBadge}
      </div>
      <p class="text-sm text-gray-600 mb-2">${product.kategori}</p>
      <p class="text-sm text-gray-500 mb-3 line-clamp-2">${product.deskripsi}</p>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold text-green-600">Rp ${formatRupiah(product.harga)}</span>
        <a href="https://wa.me/6281234567890?text=Halo, saya ingin pesan ${product.nama}" 
           target="_blank" 
           class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium ${product.stok === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
           ${product.stok === 0 ? 'onclick="return false;"' : ''}>
          Pesan
        </a>
      </div>
    </div>
  `;
  
  return card;
}

// Format rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID').format(number);
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
  filterProducts();
});

// Category filter
document.getElementById('categoryFilter').addEventListener('change', (e) => {
  filterProducts();
});

// Filter products
function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;
  
  filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.nama.toLowerCase().includes(searchTerm) || 
                         product.deskripsi.toLowerCase().includes(searchTerm);
    const matchesCategory = !selectedCategory || product.kategori === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  displayProducts(filteredProducts);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
