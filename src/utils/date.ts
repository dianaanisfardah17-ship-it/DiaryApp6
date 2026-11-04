const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// '2026-11-02' -> '2 Nov 2026'. Jika format tidak dikenali, kembalikan apa adanya.
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());

  if (!match) return iso;

  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];

  if (!monthName) return iso;

  return `${Number(day)} ${monthName} ${year}`;
}

// Tanggal hari ini (waktu lokal perangkat) dalam format YYYY-MM-DD.
export function getToday(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${d.getFullYear()}-${month}-${day}`;
}