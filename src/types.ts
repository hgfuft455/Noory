export interface AdhkarItem {
  id: string;
  category: 'morning' | 'evening' | 'wake-up' | 'sleep' | 'mosque' | 'travel' | 'general';
  text: string;
  count: number;
  reference?: string;
  benefit?: string;
}

export interface HadithItem {
  id: string;
  text: string;
  narrator: string;
  source: string;
  explanation?: string;
}

export interface ProphetStory {
  id: string;
  name: string;
  story: string;
  lessons: string[];
}

export interface PrayerTime {
  name: string;
  time: string;
  icon: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}
