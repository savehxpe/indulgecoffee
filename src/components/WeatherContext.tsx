import { useEffect, useState } from 'react';

const messages: Record<string, Record<string, string[]>> = {
  morning: {
    cold: [
      "Dawn at altitude. Double espresso weather.",
      "Mountain sunrise. Warm cup needed.",
      "Still crisp out. Coffee first, everything else second.",
    ],
    cool: [
      "Morning in the mountains. Fresh pour-over.",
      "Crisp start. The espresso machine's already warm.",
      "Good morning, Maseru. Coffee's on.",
    ],
    mild: [
      "Perfect mountain morning. Porch coffee.",
      "The sun's up. The steam's rising.",
      "Morning light at 1,600m. Come through.",
    ],
    hot: [
      "Warm morning at altitude. Iced latte season.",
      "The sun works fast up here. Cold brew on deck.",
    ],
  },
  afternoon: {
    cold: [
      "Cold afternoon. Hot cup. Warm hands.",
      "The fire's going. Your seat's waiting.",
      "Chilly at 1,600m. Espresso to the rescue.",
    ],
    cool: [
      "Afternoon breeze. Perfect coffee weather.",
      "The porch is calling. So is a flat white.",
      "Cool air, warm cup. Afternoon sorted.",
    ],
    mild: [
      "Sun's on the porch. Coffee hits different.",
      "Maseru showing off. Come soak it in.",
      "Golden afternoon. The mountains are clear.",
    ],
    hot: [
      "Afternoon heat. Cold brew on deck.",
      "Hot outside, cool inside. Iced espresso waiting.",
    ],
  },
  evening: {
    cold: [
      "Fire's lit. Come warm your hands.",
      "Evening chill at altitude. Hot chocolate weather.",
      "The fireplace is glowing. So should you.",
    ],
    cool: [
      "Golden hour. Warm cup, cool breeze.",
      "Sun's dipping. Time for a slow pour-over.",
      "Evening in the mountain kingdom. Beautiful.",
    ],
    mild: [
      "Perfect evening. Stay for a while.",
      "The sky's putting on a show. Coffee in hand.",
      "Sunsets at 1,600m. Best enjoyed with espresso.",
    ],
    hot: [
      "Evening cooling down. Porch seat, iced drink.",
      "Still warm. Still gorgeous. Still open.",
    ],
  },
  night: {
    cold: [
      "Maseru is sleeping. We'll be here in the morning.",
      "Closed. But dreaming of tomorrow's first pour.",
    ],
    cool: [
      "Resting. See you when the mountains wake.",
      "Closed for the night. Coffee tastes better after rest.",
    ],
    mild: [
      "Closed. But tomorrow's looking beautiful.",
      "Good night from the mountain kingdom.",
    ],
    hot: [
      "Warm night in Maseru. Back at 7am.",
      "Closed. Cold brew dreams 'til morning.",
    ],
  },
};

const nextOpenText = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (day === 0) { // Friday = Saturday tomorrow → check Saturday hours
    if (hour >= 15 || (hour === 15 && minute > 0)) return 'Opens tomorrow at 9am';
    return 'Opens tomorrow at 8am';
  }

  if (day === 5) { // Saturday → Sunday
    if (hour >= 17 || (hour === 17 && minute > 0)) return 'Opens tomorrow at 9am';
    return 'Opens tomorrow at 7am';
  }

  return 'Opens tomorrow at 7am';
};

const isOpen = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const mins = hour * 60 + minute;

  if (day >= 1 && day <= 5) return mins >= 7 * 60 && mins < 18 * 60;
  if (day === 6) return mins >= 8 * 60 && mins < 17 * 60;
  if (day === 0) return mins >= 9 * 60 && mins < 15 * 60;
  return false;
};

export const WeatherContext: React.FC = () => {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [timeLabel, setTimeLabel] = useState('');
  const [open, setOpen] = useState(true);
  const [nextOpen, setNextOpen] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) setTimeLabel('Morning');
    else if (hour >= 11 && hour < 17) setTimeLabel('Afternoon');
    else if (hour >= 17 && hour < 21) setTimeLabel('Evening');
    else setTimeLabel('Night');

    setOpen(isOpen());
    setNextOpen(nextOpenText());

    setLoading(true);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.314&longitude=27.482&current=temperature_2m,weather_code')
      .then((r) => {
        if (!r.ok) throw Error('fail');
        return r.json();
      })
      .then((data) => {
        const temp = data.current.temperature_2m;
        const code = data.current.weather_code;
        setWeather({ temp, code });

        const hour2 = new Date().getHours();
        let timeKey: string;
        if (hour2 >= 5 && hour2 < 11) timeKey = 'morning';
        else if (hour2 >= 11 && hour2 < 17) timeKey = 'afternoon';
        else if (hour2 >= 17 && hour2 < 21) timeKey = 'evening';
        else timeKey = 'night';

        let tempKey: string;
        if (temp < 8) tempKey = 'cold';
        else if (temp < 16) tempKey = 'cool';
        else if (temp < 24) tempKey = 'mild';
        else tempKey = 'hot';

        const lines = messages[timeKey]?.[tempKey] || messages.morning.mild;
        setMessage(lines[Math.floor(Math.random() * lines.length)]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="liquid-glass rounded-2xl p-5 max-w-md mx-auto animate-pulse">
        <div className="h-6 bg-white/[0.03] rounded mb-2" />
        <div className="h-4 bg-white/[0.03] rounded w-3/4 mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="liquid-glass rounded-2xl p-5 max-w-md mx-auto text-center">
        <p className="text-muted-foreground text-xs">Mountain conditions unavailable</p>
      </div>
    );
  }

  const conditions: Record<number, string> = { 0: 'Clear', 1: 'Clear', 2: 'Cloudy', 3: 'Cloudy', 45: 'Fog', 48: 'Fog', 51: 'Drizzle', 53: 'Drizzle', 61: 'Rain', 63: 'Rain', 65: 'Rain', 71: 'Snow', 73: 'Snow' };
  const emoji: Record<number, string> = { 0: '☀️', 1: '☀️', 2: '⛅', 3: '⛅', 45: '🌫️', 48: '🌫️', 51: '🌧️', 53: '🌧️', 61: '🌧️', 63: '🌧️', 65: '🌧️', 71: '❄️', 73: '❄️' };
  const condition = conditions[weather!.code] || 'Clear';

  const getIcon = () => {
    if (timeLabel === 'Night' || timeLabel === 'Evening') return '🌙';
    return emoji[weather!.code] || '☀️';
  };

  return (
    <div className="liquid-glass rounded-2xl p-5 max-w-md mx-auto text-center group hover:bg-white/[0.04] transition-all duration-300">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-2xl">{getIcon()}</span>
        <span className="text-white text-lg font-medium">{weather!.temp}°C</span>
        <span className="text-muted-foreground text-sm">·</span>
        <span className="text-muted-foreground text-sm">{condition}</span>
      </div>
      <p className="text-accent text-xs italic">"{message}"</p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className={`w-2 h-2 rounded-full ${open ? 'bg-emerald-500 animate-pulse' : 'bg-red-500/50'}`} />
        <span className="text-[10px] font-mono text-muted-foreground">
          {open ? `Open now · ${timeLabel}` : `Closed · ${nextOpen}`}
        </span>
      </div>
      <p className="text-[9px] text-muted-foreground/40 mt-1.5 font-mono">1,600m altitude · Maseru, Lesotho</p>
    </div>
  );
};
