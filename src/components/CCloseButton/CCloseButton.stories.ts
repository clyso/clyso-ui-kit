import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { ref } from 'vue';
import CCloseButton from './CCloseButton.vue';

const meta: Meta<typeof CCloseButton> = {
  title: 'Components/CloseButton',
  component: CCloseButton,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    size: {
      control: false,
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Custom component. Simple wrapper for [Button](/docs/components-button--docs) component with close icon.',
      },
    },
  },
  render: (args) => ({
    components: { CCloseButton },
    setup() {
      const checkedValue = ref(true);

      return { args, checkedValue };
    },
    template: `
      <CCloseButton 
        size="tiny"
        @click="args.onClick"
      />
      <CCloseButton 
        size="small"
        @click="args.onClick"
      />
      <CCloseButton 
        size="medium"
        @click="args.onClick"
      />
      <CCloseButton 
        size="large"
        @click="args.onClick"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
};
