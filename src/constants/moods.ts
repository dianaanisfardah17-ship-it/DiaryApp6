export type MoodOption = {
  emoji: string;
  label: string;
  color: string;
};

export const MOODS: MoodOption[] = [
  { emoji: '😊', label: 'Happy', color: '#FFF0C9' },
  { emoji: '😌', label: 'Calm', color: '#DFF1FF' },
  { emoji: '😴', label: 'Tired', color: '#E9E7F5' },
  { emoji: '😢', label: 'Sad', color: '#D9E7FF' },
  { emoji: '😰', label: 'Anxious', color: '#DDEBEF' },
  { emoji: '😠', label: 'Angry', color: '#FFDADA' },
  ];

export const DEFAULT_MOOD = MOODS[0];

export function getMood(emoji: string): MoodOption {
  return MOODS.find((item) => item.emoji === emoji) ?? DEFAULT_MOOD;
}