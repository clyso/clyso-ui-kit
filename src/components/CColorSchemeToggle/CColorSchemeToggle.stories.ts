import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CColorSchemeToggle from './CColorSchemeToggle.vue';
import { ColorScheme } from '../../types';

const meta: Meta<typeof CColorSchemeToggle> = {
  title: 'Components/ColorSchemeToggle',
  component: CColorSchemeToggle,
  tags: ['autodocs'],
  argTypes: {
    value: {
      options: [ColorScheme.DARK, ColorScheme.LIGHT],
    },
    'onUpdate:value': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Custom component. A button that toggles color scheme: dark, light.',
      },
    },
  },
  render: (args) => ({
    components: { CColorSchemeToggle },
    setup() {
      return { args };
    },
    template: `
      <CColorSchemeToggle
        v-model:value="args.value" 
        @update:value="args['onUpdate:value']"
      />
      
      <div style="margin-top: 4px;">{{ args.value }}</div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ColorScheme.DARK,
    'onUpdate:value': fn(),
  },
};
