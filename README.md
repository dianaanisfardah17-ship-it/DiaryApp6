# 📖 Diary App 6

Aplikasi diary mobile sederhana yang dibuat dengan **React Native + Expo (Expo Router)** dan **TypeScript**. Pengguna bisa menulis catatan harian lengkap dengan mood, mencari dan memfilter catatan, menandai favorit, melihat detail, serta mengatur tampilan (compact mode).

## 👤 Identitas

| | |
|---|---|
| **Nama** | DIANA ANIS FARDAH |
| **NIM** | 2430511046 |
| **Program Studi** | Teknik Informatika |
| **Universitas** | Universitas Muhammadiyah Sukabumi |

## 🚀 Cara Menjalankan Project

### Prasyarat
- [Node.js](https://nodejs.org/) (disarankan versi LTS terbaru) dan npm
- Aplikasi **Expo Go** di HP (Android/iOS), *atau* emulator Android/iOS, *atau* browser untuk versi web

### Langkah-langkah

```bash
# 1. Masuk ke folder project
cd diary-app6

# 2. Install dependency
npm install

# 3. Jalankan development server
npx expo start
```

Setelah server jalan, pilih salah satu cara membuka aplikasi:

| Target | Cara |
|---|---|
| **HP (Expo Go)** | Scan QR code yang muncul di terminal (HP dan laptop harus satu jaringan Wi-Fi) |
| **Android emulator** | Tekan `a` di terminal, atau `npm run android` |
| **iOS simulator** (macOS) | Tekan `i` di terminal, atau `npm run ios` |
| **Browser (web)** | Tekan `w` di terminal, atau `npm run web` |

### Script yang tersedia

| Perintah | Fungsi |
|---|---|
| `npm start` | Menjalankan Expo dev server |
| `npm run android` | Menjalankan di Android |
| `npm run ios` | Menjalankan di iOS |
| `npm run web` | Menjalankan di browser |

## 🗂️ Struktur Folder

```
diary-app6/
├── app/
│   ├── _layout.tsx            # Root layout (DiaryProvider + Stack)
│   ├── +not-found.tsx         # Halaman 404
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Bottom tab navigation
│   │   ├── index.tsx          # Home: search, filter mood, reset filter
│   │   ├── favorites.tsx      # Daftar diary favorit
│   │   ├── create.tsx         # Form tambah diary
│   │   └── settings.tsx       # Pengaturan (compact mode, notifikasi, about)
│   └── detail/[id].tsx        # Detail diary (dynamic route)
└── src/
    ├── components/DiaryCard.tsx       # Komponen kartu diary
    ├── constants/moods.ts             # Daftar mood (emoji, label, warna)
    ├── context/DiaryContext.tsx       # State global (Context API)
    ├── hooks/
    │   ├── useDiarySearch.ts          # Custom hook: search + filter mood
    │   └── useLikedEntries.ts         # Custom hook: daftar favorit
    ├── styles/tokens.ts               # Design tokens (warna, spacing, radius, shadow)
    └── utils/date.ts                  # Format tanggal
```

## 🪝 Penjelasan Hooks

### Hooks bawaan React

| Hook | Input | Output | Dependency | Digunakan di | Alasan pemilihan |
|---|---|---|---|---|---|
| `useState` | Nilai awal (`''`, `'All'`, `new Set()`, `false`) | `[state, setState]` | – | `DiaryContext`, `useDiarySearch`, `index`, `create`, `settings` | Menyimpan data yang berubah dan perlu memicu render ulang: `query`, `selectedMood`, `entries`, `likedIds`, `compactMode`, input form. |
| `useEffect` | Fungsi efek + array dependency | Cleanup function (`clearTimeout`) | `[query]` | `useDiarySearch` | Membuat **debounce** 350 ms: `debouncedQuery` baru diperbarui setelah user berhenti mengetik. Cleanup membatalkan timer lama agar tidak menumpuk. |
| `useMemo` | Fungsi komputasi + array dependency | Nilai hasil hitung (di-cache) | `[entries, debouncedQuery, selectedMood]` (filter), `[entries, likedIds]` (favorit), `[entries, likedIds, compactMode, addEntry, toggleLike, getById]` (context) | `useDiarySearch`, `useLikedEntries`, `DiaryContext` | Filter query + mood dan daftar favorit hanya dihitung ulang saat input berubah, bukan di setiap render. `value` context distabilkan agar konsumen tidak render ulang tanpa perlu. |
| `useCallback` | Fungsi + array dependency | Fungsi dengan referensi stabil | `[]` (`addEntry`, `toggleLike`), `[entries]` (`getById`), `[router]` (`openDetail`) | `DiaryContext`, `index`, `favorites` | Referensi fungsi tidak berubah antar render sehingga aman menjadi dependency `useMemo` pada `value` context. |
| `useRef` | Nilai awal (`null`) | Objek `{ current }` berisi elemen `TextInput` | – (tidak memicu render) | `index.tsx` (`searchRef`) | Mengontrol fokus kolom Search (`focus()`) saat ikon search atau tombol clear ditekan, tanpa menyebabkan render ulang. |
| `useContext` | Objek `DiaryContext` | Nilai context (`entries`, `likedIds`, `toggleLike`, dst.) | – | `useDiary` (dipakai di semua layar) | Berbagi state global tanpa *prop drilling*. Karena `likedIds` hanya ada di satu tempat, Like di Home, Favorites, dan Detail selalu **sinkron**. |

### Hooks dari Expo Router

| Hook | Input | Output | Digunakan di | Alasan pemilihan |
|---|---|---|---|---|
| `useRouter` | – | Objek router (`push`, `replace`) | `index`, `favorites`, `create` | Pindah halaman ke Detail dan kembali ke Home setelah menyimpan diary. |
| `useLocalSearchParams` | Tipe generik parameter | Objek parameter (`id`) | `detail/[id].tsx` | Mengambil `id` dari dynamic route untuk menentukan diary yang ditampilkan. |

### Custom Hooks

| Hook | File | Input | Output | Fungsi |
|---|---|---|---|---|
| `useDiary` | `src/context/DiaryContext.tsx` | – | `entries`, `likedIds`, `compactMode`, `setCompactMode`, `addEntry`, `toggleLike`, `getById` | Akses state dan aksi global; melempar error jika dipakai di luar `DiaryProvider`. |
| `useDiarySearch` | `src/hooks/useDiarySearch.ts` | `entries: DiaryEntry[]` | `query`, `setQuery`, `selectedMood`, `setSelectedMood`, `filteredEntries`, `resultCount`, `resetFilter` | Pencarian (debounce) digabung filter mood dengan `useMemo`. Pencarian mencocokkan judul, preview, tanggal, dan isi. `resetFilter` mengosongkan query dan mood. |
| `useLikedEntries` | `src/hooks/useLikedEntries.ts` | `entries`, `likedIds: Set<number>` | `likedEntries`, `likedCount` | Menyaring diary yang di-like untuk halaman Favorites. |

### Alur sinkronisasi Like

```
DiaryContext (likedIds: Set<number>)  ←  toggleLike(id)
      ↑            ↑             ↑
    Home       Favorites      Detail
 (DiaryCard)   (DiaryCard)  (tombol Add to Favorites)
```

`toggleLike` membuat `Set` baru (`new Set(prev)`) sehingga update bersifat **immutable** dan semua layar yang memakai `useDiary()` ikut ter-update.

## 📸 Screenshot

### Home
| Daftar diary | Pencarian (`sleepy`) | Filter mood  |
|:---:|:---:|:---:|
| <img src="screenshots/01-home.png" width="220"> | <img src="screenshots/02-home-search.png" width="220"> | <img src="screenshots/03-home-mood.png" width="220"> |

### Favorit & Detail
| Like di Home | Detail diary | Halaman Favorites |
|:---:|:---:|:---:|
| <img src="screenshots/04-home-liked.png" width="220"> | <img src="screenshots/05-detail.png" width="220"> | <img src="screenshots/06-favorites.png" width="220"> |

### Create & Settings
| Form Create | Home setelah menyimpan | Settings |
|:---:|:---:|:---:|
| <img src="screenshots/07-create.png" width="220"> | <img src="screenshots/08-home-after-create.png" width="220"> | <img src="screenshots/09-settings.png" width="220"> |

### About
| Settings → About Diary App |
|:---:|
| <img src="screenshots/10-about.png" width="220"> |

Menekan kartu **About Diary App** menampilkan `Alert` berisi: *"Diary App 6 - A place to save your beautiful memories. 🌷"* (dialog ini muncul di Android/iOS, tidak di versi web).

## 🛠️ Teknologi

- Expo SDK 58 & Expo Router (file-based routing)
- React 19 & React Native 0.88
- TypeScript
- `@expo/vector-icons` (Ionicons)