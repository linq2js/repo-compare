import { ColorSwatch } from '@/types/ColorSwatch';

const colorSwatch = (colors: string | string[]) => {
  colors = Array.isArray(colors) ? colors : [colors];
  const result: Record<string, string> = {};
  for (let i = 1; i <= 9; i++) {
    const j = Math.ceil(i / colors.length) - 1;
    result[i * 100] = colors[j];
  }
  return result as ColorSwatch;
};

export { colorSwatch };
