import { useState, useEffect } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

export function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = new Coordinates(latitude, longitude);
        const date = new Date();
        const params = CalculationMethod.MuslimWorldLeague();
        setPrayerTimes(new PrayerTimes(coords, date, params));
      },
      () => {
        const coords = new Coordinates(21.4225, 39.8262); // Makkah
        const date = new Date();
        const params = CalculationMethod.MuslimWorldLeague();
        setPrayerTimes(new PrayerTimes(coords, date, params));
      }
    );
  }, []);

  return prayerTimes;
}
