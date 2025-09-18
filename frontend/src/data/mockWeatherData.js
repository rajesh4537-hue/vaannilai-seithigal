// Mock weather data for Vaannilai Seithigal - Tamil Nadu focus
export const currentWeather = {
  location: "Madurai, Tamil Nadu",
  temperature: 28,
  realFeel: 32,
  condition: "Light Rain",
  icon: "light-rain",
  humidity: 88,
  windSpeed: 15,
  windDirection: "SW",
  pressure: 29.72,
  uvIndex: 3,
  visibility: 6,
  dewPoint: 26,
  cloudCover: 85,
  heatIndex: 32
};

export const minuteCast = {
  summary: "Light to moderate rain continuing for the next 90 minutes, then tapering off",
  precipitation: [
    { time: "2:00 PM", intensity: 2 },
    { time: "2:15 PM", intensity: 2 },
    { time: "2:30 PM", intensity: 3 },
    { time: "2:45 PM", intensity: 2 },
    { time: "3:00 PM", intensity: 2 },
    { time: "3:15 PM", intensity: 1 },
    { time: "3:30 PM", intensity: 1 },
    { time: "3:45 PM", intensity: 0 }
  ]
};

export const hourlyForecast = [
  { time: "2 PM", temp: 35, condition: "Very Hot", precipitation: 0, icon: "sunny" },
  { time: "3 PM", temp: 36, condition: "Scorching", precipitation: 0, icon: "sunny" },
  { time: "4 PM", temp: 37, condition: "Extreme Heat", precipitation: 0, icon: "sunny" },
  { time: "5 PM", temp: 36, condition: "Very Hot", precipitation: 5, icon: "sunny" },
  { time: "6 PM", temp: 34, condition: "Hot", precipitation: 0, icon: "sunny" },
  { time: "7 PM", temp: 32, condition: "Hot", precipitation: 0, icon: "partly-cloudy" },
  { time: "8 PM", temp: 30, condition: "Warm", precipitation: 0, icon: "partly-cloudy" },
  { time: "9 PM", temp: 28, condition: "Pleasant", precipitation: 0, icon: "clear" },
  { time: "10 PM", temp: 27, condition: "Pleasant", precipitation: 0, icon: "clear" },
  { time: "11 PM", temp: 26, condition: "Cool", precipitation: 0, icon: "clear" },
  { time: "12 AM", temp: 25, condition: "Cool", precipitation: 0, icon: "clear" },
  { time: "1 AM", temp: 24, condition: "Cool", precipitation: 0, icon: "clear" }
];

export const dailyForecast = [
  { day: "Today", high: 37, low: 24, condition: "Very Hot & Dry", precipitation: 5, icon: "sunny" },
  { day: "Thu", high: 38, low: 25, condition: "Scorching", precipitation: 0, icon: "sunny" },
  { day: "Fri", high: 39, low: 26, condition: "Extreme Heat", precipitation: 0, icon: "sunny" },
  { day: "Sat", high: 37, low: 25, condition: "Very Hot", precipitation: 10, icon: "sunny" },
  { day: "Sun", high: 36, low: 24, condition: "Hot & Sunny", precipitation: 5, icon: "sunny" },
  { day: "Mon", high: 35, low: 23, condition: "Hot", precipitation: 0, icon: "sunny" },
  { day: "Tue", high: 34, low: 22, condition: "Hot", precipitation: 15, icon: "partly-cloudy" },
  { day: "Wed", high: 33, low: 23, condition: "Partly Cloudy", precipitation: 25, icon: "partly-cloudy" },
  { day: "Thu", high: 32, low: 24, condition: "Light Rain", precipitation: 60, icon: "light-rain" },
  { day: "Fri", high: 30, low: 23, condition: "Monsoon Rain", precipitation: 80, icon: "rain" },
  { day: "Sat", high: 29, low: 22, condition: "Heavy Rain", precipitation: 85, icon: "rain" },
  { day: "Sun", high: 31, low: 23, condition: "Thunderstorms", precipitation: 70, icon: "thunderstorms" },
  { day: "Mon", high: 33, low: 24, condition: "Partly Cloudy", precipitation: 40, icon: "partly-cloudy" },
  { day: "Tue", high: 35, low: 25, condition: "Hot & Sunny", precipitation: 20, icon: "sunny" },
  { day: "Wed", high: 36, low: 26, condition: "Very Hot", precipitation: 10, icon: "sunny" }
];

export const airQuality = {
  index: 89,
  level: "Moderate",
  description: "Air quality is acceptable for most people. Sensitive individuals may experience minor issues."
};

export const locations = [
  "Chennai",
  "Coimbatore", 
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Tirunelveli",
  "Vellore",
  "Erode",
  "Thanjavur",
  "Dindigul",
  "Kanyakumari",
  "Cuddalore",
  "Nagapattinam",
  "Thoothukudi",
  "Villupuram",
  "Karur",
  "Namakkal",
  "Dharmapuri",
  "Krishnagiri",
  "Sivagangai",
  "Ramanathapuram",
  "Pudukkottai",
  "Tiruvarur",
  "Ariyalur",
  "Perambalur",
  "Nilgiris (Ooty)",
  "Tiruppur",
  "Theni",
  "Virudhunagar",
  "Kancheepuram",
  "Tiruvallur",
  "Chengalpattu",
  "Ranipet",
  "Tirupattur",
  "Kallakurichi",
  "Tenkasi",
  "Mayiladuthurai"
];

export const monsoonAlert = {
  active: true,
  title: "Northeast Monsoon Alert",
  description: "Heavy to very heavy rainfall expected across Tamil Nadu and Puducherry",
  severity: "Orange",
  validUntil: "Nov 25, 2025 6:00 PM IST"
};

export const cycloneWatch = {
  active: false,
  name: "",
  status: "No active cyclonic activity in Bay of Bengal"
};

export const heatWave = {
  active: true,
  title: "Heat Wave Warning",
  description: "Maximum temperatures likely to be 3-5°C above normal",
  severity: "Yellow",
  validUntil: "Oct 28, 2025 6:00 PM IST"
};