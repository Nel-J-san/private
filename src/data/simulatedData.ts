// Simulated data for Sydney public transport usage in Autumn 2025

// Time series data - daily usage by transport mode
export const dailyTransportData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 2, i + 1); // March 2025
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Base values with weekend dips
  const baseTrainValue = isWeekend ? 75000 : 220000;
  const baseBusValue = isWeekend ? 65000 : 185000;
  const baseFerryValue = isWeekend ? 35000 : 45000;
  const baseLightRailValue = isWeekend ? 28000 : 65000;
  
  // Add random variations
  const trainRandom = Math.random() * 20000 - 10000;
  const busRandom = Math.random() * 15000 - 7500;
  const ferryRandom = Math.random() * 8000 - 4000;
  const lightRailRandom = Math.random() * 7000 - 3500;
  
  return {
    date: `${date.getDate()}/${date.getMonth() + 1}`,
    train: Math.round(baseTrainValue + trainRandom),
    bus: Math.round(baseBusValue + busRandom),
    ferry: Math.round(baseFerryValue + ferryRandom),
    lightRail: Math.round(baseLightRailValue + lightRailRandom),
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek],
  };
});

// Weather impact data
export const weatherImpactData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 2, i + 1); // March 2025
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Simulate some rainy days
  const isRainy = [2, 8, 14, 15, 21, 27].includes(i);
  const rainMM = isRainy ? Math.round(Math.random() * 20) + 5 : 0;
  
  // Temperature between 18-28 degrees
  const temperature = Math.round(Math.random() * 10) + 18;
  
  // Transport usage with weather effects
  const baseRidership = isWeekend ? 180000 : 350000;
  const weatherImpact = isRainy ? -0.15 : 0; // 15% decrease on rainy days
  const temperatureImpact = (temperature - 22) * 0.01; // slight impact based on temperature
  
  const totalRidership = Math.round(
    baseRidership * (1 + weatherImpact + temperatureImpact)
  );
  
  return {
    date: `${date.getDate()}/${date.getMonth() + 1}`,
    temperature,
    rainMM,
    totalRidership,
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek],
  };
});

// Popular routes data
export const popularRoutesData = [
  { route: 'Central to Parramatta', passengers: 28500, transportMode: 'Train' },
  { route: 'Town Hall to Bondi Junction', passengers: 24700, transportMode: 'Train' },
  { route: 'North Sydney to Circular Quay', passengers: 22100, transportMode: 'Train' },
  { route: 'Circular Quay to Manly', passengers: 15600, transportMode: 'Ferry' },
  { route: 'Central to UNSW', passengers: 18400, transportMode: 'Bus' },
  { route: 'Parramatta to Olympic Park', passengers: 14200, transportMode: 'Train' },
  { route: 'Central to Randwick', passengers: 16800, transportMode: 'Light Rail' },
  { route: 'Circular Quay to Central', passengers: 17500, transportMode: 'Light Rail' },
  { route: 'Bondi Beach to Bondi Junction', passengers: 13900, transportMode: 'Bus' },
  { route: 'Chatswood to Epping', passengers: 19200, transportMode: 'Train' },
];

// Hourly usage data
export const hourlyUsageData = Array.from({ length: 24 }, (_, hour) => {
  // Create morning and evening peaks
  let factor = 0.2; // base factor for off-peak hours
  
  if (hour >= 7 && hour <= 9) {
    // Morning peak (7-9 AM)
    factor = 1 - (Math.abs(hour - 8) * 0.3);
  } else if (hour >= 16 && hour <= 18) {
    // Evening peak (4-6 PM)
    factor = 0.9 - (Math.abs(hour - 17) * 0.25);
  } else if ((hour >= 10 && hour <= 15) || (hour >= 19 && hour <= 21)) {
    // Mid-day and early evening
    factor = 0.5;
  }
  
  return {
    hour: `${hour}:00`,
    passengers: Math.round(factor * 45000 + (Math.random() * 5000 - 2500)),
  };
});

// KPI metrics for dashboard
export const kpiMetrics = [
  {
    title: 'Total Daily Riders',
    value: '520,834',
    change: { value: '3.2%', isPositive: true },
  },
  {
    title: 'On-Time Performance',
    value: '94.7%',
    change: { value: '1.5%', isPositive: true },
  },
  {
    title: 'Average Trip Duration',
    value: '28.3 min',
    change: { value: '0.8%', isPositive: false },
  },
  {
    title: 'Active Opal Cards',
    value: '2.4M',
    change: { value: '2.1%', isPositive: true },
  },
];

// Transport mode share data
export const transportModeShareData = [
  { name: 'Train', value: 48 },
  { name: 'Bus', value: 32 },
  { name: 'Light Rail', value: 12 },
  { name: 'Ferry', value: 8 },
];