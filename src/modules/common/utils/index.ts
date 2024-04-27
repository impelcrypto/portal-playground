export const getShortenAddress = (address: string, place = 6): string => {
  return address ? `${address.slice(0, place)}${'.'.repeat(place)}${address.slice(-place)}` : '';
};

// Ref: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
