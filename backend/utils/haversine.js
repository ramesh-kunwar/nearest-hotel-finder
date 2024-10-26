const haversine = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3; // Earth's radius in meters

  const lat1 = toRad(coords1[0]);
  const lat2 = toRad(coords2[0]);
  const deltaLat = toRad(coords2[0] - coords1[0]);
  const deltaLon = toRad(coords2[1] - coords1[1]);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters
  return distance;
};

// Coordinates for Dhobighat and Jwalakhel
// const dhobighatCoords = [27.6791, 85.3163];
// const jwalakhelCoords = [27.6727, 85.3187];

// const distance = haversine(dhobighatCoords, jwalakhelCoords);
// console.log(`Distance: ${(distance / 1000).toFixed(2)} km`);

module.exports = haversine;
