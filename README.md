# 📖 Diary App 6

Aplikasi diary mobile sederhana yang dibuat dengan **React Native + Expo (Expo Router)** dan **TypeScript**. Pengguna bisa menulis catatan harian lengkap dengan mood, mencari dan memfilter catatan, menandai favorit, melihat detail, serta mengatur tampilan daftar di Home (compact mode).

## 👤 Identitas

| | |
|---|---|
| **Nama** | Diana Anis Fardah |
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

Setelah server berjalan, pilih salah satu cara membuka aplikasi:

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

## ✨ Fitur

- **Home**: Menampilkan daftar diary, statistik jumlah memori dan favorit, pencarian, filter mood, serta tombol *Reset Filter*.
- **Search**: Mencari diary berdasarkan kata kunci. Menggunakan `useRef` untuk mengontrol fokus kolom pencarian. Pengguna dapat menekan ikon pencarian untuk mengaktifkan kolom Search dan tombol X untuk menghapus kata pencarian sekaligus mengembalikan fokus ke kolom tersebut.
- **Mood Filter**: Memfilter daftar diary berdasarkan mood yang dipilih.
- **Create**: Form tambah diary yang berisi judul, tanggal (`YYYY-MM-DD`), mood, dan isi cerita.
- **Detail**: Menampilkan isi diary secara lengkap dengan mood dan tombol favorit.
- **Favorites**: Menampilkan daftar diary yang sudah di-like.
- **Settings**: Menyediakan fitur *Compact Mode* untuk mengubah tampilan kartu di Home, toggle *Notifications*, dan modal *About*.

## 🗂️ Struktur Folder

```text
diary-app6/
├── app/
│   ├── _layout.tsx            # Root layout (DiaryProvider + Stack)
│   ├── +html.tsx              # Konfigurasi HTML root (web)
│   ├── +not-found.tsx         # Halaman 404
│   ├── modal.tsx              # Modal bawaan template Expo
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Bottom tab navigation
│   │   ├── index.tsx          # Home: search, useRef, filter mood, daftar diary
│   │   ├── favorites.tsx      # Daftar diary favorit
│   │   ├── create.tsx         # Form tambah diary
│   │   ├── settings.tsx       # Pengaturan (compact mode, notifikasi, About)
│   │   └── two.tsx            # Tab bawaan template (tidak dipakai di navigasi)
│   └── detail/[id].tsx        # Detail diary (dynamic route)
└── src/
    ├── components/DiaryCard.tsx       # Komponen kartu diary
    ├── constants/moods.ts             # Daftar mood + helper getMood
    ├── context/DiaryContext.tsx       # State global (Context API)
    ├── hooks/
    │   ├── useDiarySearch.ts          # Custom hook: search + filter mood
    │   └── useLikedEntries.ts         # Custom hook: daftar favorit
    ├── styles/tokens.ts               # Design tokens (warna, spacing, dll.)
    └── utils/date.ts                  # formatDate & getToday
```

## 🪝 Penjelasan Hooks

### Hooks bawaan React

| Hook | Digunakan di | Fungsi dalam project |
|---|---|---|
| `useState` | `DiaryContext.tsx`, `useDiarySearch.ts`, `index.tsx`, `create.tsx`, `settings.tsx` | Menyimpan state lokal/global, seperti daftar `entries`, `likedIds`, `compactMode`, `query`, `debouncedQuery`, `selectedMood`, `searchFocused`, input form (`title`, `date`, `body`, `mood`, `focused`), toggle `notifications`, dan `aboutVisible` (modal About). |
| `useEffect` | `useDiarySearch.ts` | Membuat **debounce** pencarian: `debouncedQuery` baru diperbarui 350 ms setelah pengguna berhenti mengetik. *Cleanup function* (`clearTimeout`) membatalkan timer lama agar tidak menumpuk. |
| `useMemo` | `DiaryContext.tsx`, `useDiarySearch.ts`, `useLikedEntries.ts` | Menghindari kalkulasi ulang yang tidak perlu: memoize `value` context, hasil `filteredEntries` (filter query + mood), dan `likedEntries` (diary yang di-like). |
| `useCallback` | `DiaryContext.tsx`, `index.tsx`, `favorites.tsx` | Memoize fungsi `addEntry`, `toggleLike`, dan `getById` di context, serta `openDetail` di Home dan Favorites, supaya referensi fungsi stabil di antara render. |
| `useRef` | `index.tsx` | Menyimpan referensi langsung ke komponen `TextInput` pada kolom Search. Digunakan untuk memanggil `.focus()` sehingga kolom pencarian dapat memperoleh fokus secara otomatis ketika ikon pencarian ditekan atau setelah tombol X digunakan untuk menghapus kata pencarian. Perubahan nilai `ref` tidak menyebabkan render ulang komponen. |
| `useContext` | `DiaryContext.tsx` (dibungkus `useDiary`) | Membaca state global dari `DiaryContext` tanpa *prop drilling*. Melempar error jika digunakan di luar `DiaryProvider`. |

### Hooks dari Expo Router

| Hook | Digunakan di | Fungsi dalam project |
|---|---|---|
| `useRouter` | `index.tsx`, `favorites.tsx`, `create.tsx` | Navigasi antar halaman: `router.push` ke halaman detail dan `router.replace('/')` kembali ke Home setelah menyimpan diary. |
| `useLocalSearchParams` | `detail/[id].tsx` | Mengambil parameter `id` dari dynamic route untuk menentukan diary mana yang ditampilkan. |

### Custom Hooks

| Hook | File | Parameter | Return | Fungsi |
|---|---|---|---|---|
| `useDiary` | `src/context/DiaryContext.tsx` | – | `entries`, `likedIds`, `compactMode`, `setCompactMode`, `addEntry`, `toggleLike`, `getById` | Akses ke state dan aksi global diary dari komponen mana pun. |
| `useDiarySearch` | `src/hooks/useDiarySearch.ts` | `entries: DiaryEntry[]` | `query`, `setQuery`, `selectedMood`, `setSelectedMood`, `filteredEntries`, `resultCount`, `resetFilter` | Mengelola pencarian (dengan debounce) dan filter mood pada daftar diary. Pencarian mencocokkan judul, preview, tanggal, dan isi. |
| `useLikedEntries` | `src/hooks/useLikedEntries.ts` | `entries`, `likedIds: Set<number>` | `likedEntries`, `likedCount` | Menyaring diary yang di-like untuk halaman Favorites beserta jumlahnya. |

## 📸 Screenshot

### Home

| Daftar diary | Pencarian (`sleepy`) | Filter mood |
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

Menekan kartu **About Diary App** menampilkan *modal* berisi teks *"Diary App 6 - A place to save your beautiful memories."*, nomor versi `Version 1.0.0`, dan tombol **Close**.

## ⚠️ Catatan & Keterbatasan

- Data diary hanya disimpan di memori (state React), sehingga **hilang saat aplikasi ditutup atau di-refresh**.
- *Compact Mode* hanya memengaruhi daftar di halaman Home, bukan halaman Favorites.
- Toggle *Notifications* di Settings baru berupa state tampilan, belum mengirim notifikasi sungguhan.
- `useRef` digunakan untuk mengontrol fokus kolom Search dan tidak digunakan untuk menyimpan data diary.

## 🛠️ Teknologi

- Expo SDK 58 & Expo Router (file-based routing)
- React 19 & React Native 0.88
- TypeScript
- `@expo/vector-icons` (Ionicons)
