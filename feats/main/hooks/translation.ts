import { defaultLocale } from '@/trans';
import { createTranslator } from '@/trans/helpers/createTranslator';

const [useMainTranslation, mainTrans] = createTranslator(defaultLocale, 'main');

export { useMainTranslation, mainTrans };
