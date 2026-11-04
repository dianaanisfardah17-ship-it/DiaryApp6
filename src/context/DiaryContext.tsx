
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type DiaryEntry = {
  id: number;
  title: string;
  date: string;
  preview: string;
  body: string;
  mood: string;
};

type DiaryContextType = {
  entries: DiaryEntry[];
  likedIds: Set<number>;
  compactMode: boolean;
  setCompactMode: (value: boolean) => void;
  addEntry: (entry: Omit<DiaryEntry, 'id'>) => void;
  toggleLike: (id: number) => void;
  getById: (id: string | number) => DiaryEntry | undefined;
};

const DiaryContext = createContext<DiaryContextType | null>(null);

// 6 MOOD UTAMA
export const MOODS = [
  { emoji: '😊', label: 'Happy', color: '#FFF0C9' },
  { emoji: '😌', label: 'Calm', color: '#DFF1FF' },
  { emoji: '😢', label: 'Sad', color: '#D9E7FF' },
  { emoji: '😠', label: 'Angry', color: '#FFDADA' },
  { emoji: '😰', label: 'Anxious', color: '#DDEBEF' },
  { emoji: '😴', label: 'Tired', color: '#E9E7F5' },
];

const INITIAL_ENTRIES: DiaryEntry[] = [
  {
    id: 1,
    title: 'A Beautiful Morning',
    date: '2026-11-02',
    preview: 'Menikmati pagi yang tenang dengan secangkir kopi.',
    body: 'Hari ini aku memulai pagi dengan suasana yang tenang. Menikmati secangkir kopi dan bersyukur atas hal-hal kecil.',
    mood: '😌',
  },
  {
    id: 2,
    title: 'Little Happiness',
    date: '2026-10-31',
    preview: 'Menemukan kebahagiaan dari hal sederhana.',
    body: 'Terkadang kebahagiaan datang dari hal-hal sederhana. Hari ini aku belajar untuk lebih menghargai setiap momen.',
    mood: '😊',
  },
     {
    id: 3,
    title: 'Sleepy Afternoon',
    date: '2026-10-24',
    preview: 'Seharian terasa lelah dan ingin istirahat.',
    body: 'Kurang tidur membuat hari ini terasa panjang. Aku memutuskan untuk tidur lebih awal malam ini.',
    mood: '😴',
  },
     {
    id: 4,
    title: 'Missing Home',
    date: '2026-10-16',
    preview: 'Kangen suasana rumah dan keluarga.',
    body: 'Malam ini aku teringat masakan rumah dan obrolan di meja makan. Semoga aku bisa segera pulang.',
    mood: '😢',
  },
  {
    id: 5,
    title: 'Deadline Jitters',
    date: '2026-10-14',
    preview: 'Deadline tugas bikin gelisah.',
    body: 'Tugas menumpuk dan waktunya makin dekat. Aku mencoba menarik napas dalam dan mengerjakannya satu per satu.',
    mood: '😰',
  },
  {
    id: 6,
    title: 'Stuck in Traffic',
    date: '2026-10-12',
    preview: 'Macet panjang bikin emosi naik.',
    body: 'Perjalanan pulang tertahan macet hampir dua jam. Aku kesal, tapi akhirnya mencoba menenangkan diri dengan musik.',
    mood: '😠',
  },
 ];

export function DiaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entries, setEntries] =
    useState<DiaryEntry[]>(INITIAL_ENTRIES);

  const [likedIds, setLikedIds] =
    useState<Set<number>>(new Set());

  const [compactMode, setCompactMode] = useState(false);

  const addEntry = useCallback((entry: Omit<DiaryEntry, 'id'>) => {
    setEntries((prev) => [
      {
        id: Date.now(),
        ...entry,
      },
      ...prev,
    ]);
  }, []);

  const toggleLike = useCallback((id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const getById = useCallback(
    (id: string | number) => {
      return entries.find((entry) => entry.id === Number(id));
    },
    [entries]
  );

  const value = useMemo(
    () => ({
      entries,
      likedIds,
      compactMode,
      setCompactMode,
      addEntry,
      toggleLike,
      getById,
    }),
    [entries, likedIds, compactMode, addEntry, toggleLike, getById]
  );

  return (
    <DiaryContext.Provider value={value}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);

  if (!context) {
    throw new Error(
      'useDiary must be used inside DiaryProvider'
    );
  }

  return context;
}
