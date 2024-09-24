// const haversine = (coords1, coords2) => {
//     const toRad = (value) => (Math.PI / 180) * value;

//     const lat1 = coords1[1];
//     const lon1 = coords1[0];
//     const lat2 = coords2[1];
//     const lon2 = coords2[0];

//     const R = 6371; // Radius of the Earth in km
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
//   };

const haversine = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3; // Earth's radius in meters

  const lat1 = toRad(coords1[0]);
  const lat2 = toRad(coords2[0]);
  const deltaLat = toRad(coords2[0] - coords1[0]);
  const deltaLon = toRad(coords2[1] - coords1[1]);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
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
