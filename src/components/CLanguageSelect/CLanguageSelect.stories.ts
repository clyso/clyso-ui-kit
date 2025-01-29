import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CLanguageSelect from './CLanguageSelect.vue';
import { I18nLocale } from '../../types';

const meta: Meta<typeof CLanguageSelect> = {
  title: 'Components/LanguageSelect',
  component: CLanguageSelect,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    'onUpdate:value': {
      table: {
        disable: true,
      },
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    value: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Selectbox for language selection.',
      },
    },
  },
  render: (args) => ({
    components: { CLanguageSelect },
    setup() {
      const value = ref(I18nLocale.EN);

      return {
        args,
        value,
      };
    },
    template: `
      <CLanguageSelect
        style="max-width: 100px"
        v-model:value="value"
        :value="args.value"
        :size="args.size"
        @update:value="args['onUpdate:value']"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    'onUpdate:value': fn(),
  },
};
