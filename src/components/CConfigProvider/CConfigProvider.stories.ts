import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CConfigProvider from './CConfigProvider.vue';
import CButton from '../CButton/CButton.vue';
import CAlert from '../CAlert/CAlert.vue';
import CDatePicker from '../CDatePicker/CDatePicker.vue';
import CTag from '../CTag/CTag.vue';
import { ColorScheme, I18nLocale } from '../../types';
import { darkThemeOverrides, lightThemeOverrides } from '../../constants';

const meta: Meta<typeof CConfigProvider> = {
  title: 'Components/ConfigProvider',
  component: CConfigProvider,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      options: [ColorScheme.DARK, ColorScheme.LIGHT],
    },
    locale: {
      options: [I18nLocale.EN, I18nLocale.DE],
      control: 'select',
    },
    customDarkTheme: {
      control: false,
    },
    customLightTheme: {
      control: false,
    },
    default: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Config Provider is used to set global theme, set global language and set namespace for components (detached parts).',
      },
    },
  },
  render: (args) => ({
    components: {
      CConfigProvider,
      CButton,
      CAlert,
      CDatePicker,
      CTag,
    },
    setup() {
      const date = ref(null);

      return {
        args,
        date,
        ColorScheme,
        darkThemeOverrides,
        lightThemeOverrides,
      };
    },
    template: `
      <CConfigProvider 
        :color-scheme="args.colorScheme"
        :locale="args.locale"
        :style="{
          background: args.colorScheme === ColorScheme.DARK 
            ? darkThemeOverrides.common?.bodyColor 
            : lightThemeOverrides.common?.bodyColor
        }"
        style="padding: 20px; display: grid; gap: 12px; justify-items: start">
        <CButton type="primary">Button</CButton>
        <CAlert type="info">
          <template #header>Please Note!</template>

          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus libero neque omnis voluptates! Aliquid debitis, earum eius minus tempore voluptatum?
        </CAlert>
        <CDatePicker
          v-model:value="date"
          panel
        />
      </CConfigProvider>
      
      <div style="padding-left: 20px; margin-top: 12px; display: flex; gap: 4px; align-items: center">
        <b>Color Scheme:</b> 
        <CTag>{{ args.colorScheme }}</CTag>
      </div>
      <div style="padding-left: 20px; margin-top: 4px; display: flex; gap: 4px; align-items: center">
        <b>Locale:</b> 
        <CTag>{{ args.locale }}</CTag>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colorScheme: ColorScheme.DARK,
    locale: I18nLocale.EN,
  },
};
