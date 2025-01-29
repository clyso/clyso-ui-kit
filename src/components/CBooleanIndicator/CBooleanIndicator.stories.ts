import type { Meta, StoryObj } from '@storybook/vue3';
import CBooleanIndicator from './CBooleanIndicator.vue';

const meta: Meta<typeof CBooleanIndicator> = {
  title: 'Components/BooleanIndicator',
  component: CBooleanIndicator,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; gap: 24px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Custom component that allows to display boolean values.',
      },
    },
  },
  render: (args) => ({
    components: { CBooleanIndicator },
    setup() {
      return { args };
    },
    template: `
      <CBooleanIndicator
        :value="args.value"
        :icon-style="args.iconStyle"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconStyle: {
      width: '18px',
      height: '18px',
    },
    value: true,
  },
};
