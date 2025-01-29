import type { Preview } from '@storybook/vue3';
import { themes } from '@storybook/theming';
import CConfigProvider from '../src/components/CConfigProvider/CConfigProvider.vue';
import { ColorScheme } from '../src/types/theme';
import { lightThemeOverrides } from '../src/constants/theme';
import '../src/styles/styles.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        {
          name: 'Dark',
          value: '#101014FF',
        },
        {
          name: 'Light',
          value: '#FFFFFFFF',
        },
      ],
    },
    docs: {
      theme: { ...themes.dark, fontBase: 'Poppins' },
    },
  },
  decorators: [
    (story, context) => {
      const isLight =
        context.globals.backgrounds?.value ===
        lightThemeOverrides.common.bodyColor;
      const colorScheme = isLight ? ColorScheme.LIGHT : ColorScheme.DARK;

      if (isLight) {
        document.body.classList.remove('color-scheme-dark');
      } else {
        document.body.classList.add('color-scheme-dark');
      }

      return {
        components: { story, CConfigProvider, ColorScheme },
        template: `<CConfigProvider color-scheme="${colorScheme}" ><story /></CConfigProvider>`,
      };
    },
  ],
};

export default preview;
