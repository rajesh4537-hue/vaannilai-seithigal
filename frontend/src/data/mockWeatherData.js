// Mock weather data for AccuWeather clone - Chennai, Tamil Nadu focus
export const currentWeather = {
  location: "Chennai, Tamil Nadu",
  temperature: 32,
  realFeel: 38,
  condition: "Hot and Humid",
  icon: "sunny",
  humidity: 78,
  windSpeed: 12,
  windDirection: "SW",
  pressure: 29.92,
  uvIndex: 11,
  visibility: 8,
  dewPoint: 28,
  cloudCover: 25,
  heatIndex: 42
};

export const minuteCast = {
  summary: "Heavy monsoon shower expected in 25 minutes, lasting 90 minutes",
  precipitation: [
    { time: "2:00 PM", intensity: 0 },
    { time: "2:15 PM", intensity: 0 },
    { time: "2:30 PM", intensity: 2 },
    { time: "2:45 PM", intensity: 3 },
    { time: "3:00 PM", intensity: 3 },
    { time: "3:15 PM", intensity: 3 },
    { time: "3:30 PM", intensity: 2 },
    { time: "3:45 PM", intensity: 1 }
  ]
};

export const hourlyForecast = [
  { time: "2 PM", temp: 32, condition: "Sunny", precipitation: 5, icon: "sunny" },
  { time: "3 PM", temp: 33, condition: "Monsoon Rain", precipitation: 85, icon: "rain" },
  { time: "4 PM", temp: 30, condition: "Heavy Rain", precipitation: 90, icon: "rain" },
  { time: "5 PM", temp: 28, condition: "Thunderstorms", precipitation: 75, icon: "thunderstorms" },
  { time: "6 PM", temp: 29, condition: "Light Rain", precipitation: 40, icon: "light-rain" },
  { time: "7 PM", temp: 28, condition: "Partly Cloudy", precipitation: 15, icon: "partly-cloudy" },
  { time: "8 PM", temp: 27, condition: "Cloudy", precipitation: 10, icon: "cloudy" },
  { time: "9 PM", temp: 26, condition: "Partly Cloudy", precipitation: 5, icon: "partly-cloudy" },
  { time: "10 PM", temp: 26, condition: "Clear", precipitation: 0, icon: "clear" },
  { time: "11 PM", temp: 25, condition: "Clear", precipitation: 0, icon: "clear" },
  { time: "12 AM", temp: 25, condition: "Clear", precipitation: 0, icon: "clear" },
  { time: "1 AM", temp: 24, condition: "Clear", precipitation: 0, icon: "clear" }
];

export const dailyForecast = [
  { day: "Today", high: 34, low: 26, condition: "Hot & Humid", precipitation: 30, icon: "sunny" },
  { day: "Thu", high: 35, low: 27, condition: "Monsoon Rain", precipitation: 85, icon: "rain" },
  { day: "Fri", high: 31, low: 25, condition: "Heavy Rain", precipitation: 90, icon: "rain" },
  { day: "Sat", high: 29, low: 24, condition: "Thunderstorms", precipitation: 80, icon: "thunderstorms" },
  { day: "Sun", high: 32, low: 25, condition: "Partly Cloudy", precipitation: 40, icon: "partly-cloudy" },
  { day: "Mon", high: 33, low: 26, condition: "Hot & Sunny", precipitation: 15, icon: "sunny" },
  { day: "Tue", high: 35, low: 27, condition: "Very Hot", precipitation: 10, icon: "sunny" },
  { day: "Wed", high: 36, low: 28, condition: "Scorching", precipitation: 5, icon: "sunny" },
  { day: "Thu", high: 34, low: 26, condition: "Hot & Humid", precipitation: 20, icon: "partly-cloudy" },
  { day: "Fri", high: 32, low: 25, condition: "Monsoon Rain", precipitation: 75, icon: "rain" },
  { day: "Sat", high: 30, low: 24, condition: "Heavy Rain", precipitation: 85, icon: "rain" },
  { day: "Sun", high: 31, low: 25, condition: "Light Rain", precipitation: 60, icon: "light-rain" },
  { day: "Mon", high: 33, low: 26, condition: "Partly Cloudy", precipitation: 35, icon: "partly-cloudy" },
  { day: "Tue", high: 34, low: 27, condition: "Hot & Sunny", precipitation: 20, icon: "sunny" },
  { day: "Wed", high: 35, low: 28, condition: "Thunderstorms", precipitation: 70, icon: "thunderstorms" }
];

export const airQuality = {
  index: 42,
  level: "Good",
  description: "Air quality is satisfactory for most people"
};

export const locations = [
  "New York, NY",
  "Los Angeles, CA", 
  "Chicago, IL",
  "Houston, TX",
  "Miami, FL",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan"
];