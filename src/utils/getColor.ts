const COLORS = [
  "white",
  "blue",
  "darkgreen",
  "orange",
  "violet",
  "cyan",
  "red",
  "magenta",
  "maroon",
];

/**
 * @title Get Color
 * @param {number} index The index of the color that should be acquired.
 * @returns {string} The associated name of the color.
 */
const getColor = (index: number): string => COLORS[index];

export default getColor;
