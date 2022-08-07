import { defaultLocale } from '@/trans';
import { createTranslator } from '@/trans/helpers/createTranslator';

const [useSharedTrans, sharedTrans] = createTranslator(defaultLocale, 'shared');

export { useSharedTrans, sharedTrans };
