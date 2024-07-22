export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-US", options);
};

/**
 * Capitalizes the first letter of the weather description.
 * @param description - The weather description.
 * @returns The capitalized weather description.
 */
export const formatWeatherDescription = (description: string): string => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

/**
 * Converts speed from meters/second to miles/hour.
 * @param speed - The speed in meters/second.
 * @returns The speed in miles/hour.
 */
export const convertSpeedToMph = (speed: number): number => {
  return Math.round(speed * 2.237);
};

/**
 * Converts visibility from meters to miles.
 * @param visibility - The visibility in meters.
 * @returns The visibility in miles, formatted to one decimal place.
 */
export const convertMetersToMiles = (visibility: number): number => {
  return +(visibility / 1609.34).toFixed(1);
};
