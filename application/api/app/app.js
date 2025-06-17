import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(cors({
  origin: [
    process.env.CLOUDFRONT_URL,
    'http://localhost:4321' // for development
  ]
}));

app.use(express.json());

// TODO: Mock weather data - replace with actual API calls
const mockWeatherData = {
  'New York': {
    city: 'New York',
    temperature: 22,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 8,
    icon: '☀️'
  },
  'London': {
    city: 'London',
    temperature: 15,
    condition: 'Cloudy',
    humidity: 78,
    windSpeed: 12,
    icon: '☁️'
  },
  'Tokyo': {
    city: 'Tokyo',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 72,
    windSpeed: 6,
    icon: '⛅'
  },
  'Sydney': {
    city: 'Sydney',
    temperature: 25,
    condition: 'Rainy',
    humidity: 85,
    windSpeed: 15,
    icon: '🌧️'
  }
};

// Routes
app.get('/api/weather/:city', (req, res) => {
  const city = req.params.city;
  const weatherData = mockWeatherData[city];
  
  if (weatherData) {
    setTimeout(() => {
      res.json(weatherData);
    }, 500);
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

app.get('/api/cities', (req, res) => {
  const cities = Object.keys(mockWeatherData);
  res.json(cities);
});

app.get('/health', (req,res) => {
  res.status(200).send("Healthy");
})

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});