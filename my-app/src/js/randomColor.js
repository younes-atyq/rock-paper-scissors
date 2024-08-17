const colors = [
  "hsl(349, 70%, 56%)",
  "hsl(230, 89%, 65%)",
  "hsl(39, 89%, 49%)",
  "hsl(261, 73%, 60%)",
  "hsl(189, 59%, 53%)",
];

const randomColor = colors[Math.floor(Math.random() * colors.length)];

export default randomColor;
