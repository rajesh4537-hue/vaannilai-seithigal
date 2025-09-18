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
  { day: "Today", high: 75, low: 58, condition: "Partly Cloudy", precipitation: 30, icon: "partly-cloudy" },
  { day: "Thu", high: 78, low: 62, condition: "Sunny", precipitation: 5, icon: "sunny" },
  { day: "Fri", high: 80, low: 65, condition: "Sunny", precipitation: 0, icon: "sunny" },
  { day: "Sat", high: 77, low: 63, condition: "Partly Cloudy", precipitation: 15, icon: "partly-cloudy" },
  { day: "Sun", high: 74, low: 59, condition: "Cloudy", precipitation: 40, icon: "cloudy" },
  { day: "Mon", high: 71, low: 56, condition: "Rain", precipitation: 85, icon: "rain" },
  { day: "Tue", high: 68, low: 54, condition: "Rain", precipitation: 90, icon: "rain" },
  { day: "Wed", high: 70, low: 55, condition: "Partly Cloudy", precipitation: 25, icon: "partly-cloudy" },
  { day: "Thu", high: 73, low: 58, condition: "Sunny", precipitation: 10, icon: "sunny" },
  { day: "Fri", high: 76, low: 61, condition: "Sunny", precipitation: 5, icon: "sunny" },
  { day: "Sat", high: 79, low: 64, condition: "Partly Cloudy", precipitation: 20, icon: "partly-cloudy" },
  { day: "Sun", high: 81, low: 66, condition: "Sunny", precipitation: 0, icon: "sunny" },
  { day: "Mon", high: 83, low: 68, condition: "Sunny", precipitation: 0, icon: "sunny" },
  { day: "Tue", high: 82, low: 67, condition: "Partly Cloudy", precipitation: 15, icon: "partly-cloudy" },
  { day: "Wed", high: 79, low: 65, condition: "Thunderstorms", precipitation: 70, icon: "thunderstorms" }
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