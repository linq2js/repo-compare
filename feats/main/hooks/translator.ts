import { defaultLocale } from '@/trans';
import { createTranslator } from '@/trans/helpers/createTranslator';

const [useMainTranslation, MainText] = createTranslator(defaultLocale, 'main');

export { useMainTranslation, MainText };
