export const getWeathers = async (locationId) => {
  const response = await fetch(`/weatherforecast/${locationId}`);
  const data = await response.json();
  return data;
};

export const getLocation = async (name) => {
  const response = await fetch(`/location/${name}`);
  const data = await response.json();
  return data;
};
