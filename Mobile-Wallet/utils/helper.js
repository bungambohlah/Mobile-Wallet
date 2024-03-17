export const getRandomStrings = (array, numberOfStrings) => {
  const localCopy = array.slice(); // Create a local copy of the original array
  const randomStrings = [];

  for (let i = 0; i < numberOfStrings; i++) {
    const randomIndex = Math.floor(Math.random() * localCopy.length);
    randomStrings.push(...localCopy.splice(randomIndex, 1));
  }

  return randomStrings;
};
