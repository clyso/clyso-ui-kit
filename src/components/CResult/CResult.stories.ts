import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CResult from './CResult.vue';

const meta: Meta<typeof CResult> = {
  title: 'Components/Result',
  component: CResult,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; justify-content: center;"><story/></div>',
    }),
  ],
  argTypes: {
    type: {
      options: ['empty', 'success', 'error', 'warning', 'info'],
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    maxWidth: {
      control: 'number',
    },
    title: {
      control: false,
    },
    default: {
      control: false,
      description: 'Slot for unspecified content.',
    },
    actions: {
      control: false,
      description: 'Slot for action buttons.',
    },
    'positive-text': {
      control: false,
      description: 'Slot for positive action section.',
    },
    'negative-text': {
      control: false,
      description: 'Slot for negative action section.',
    },
    onPositiveClick: {
      table: {
        disable: true,
      },
    },
    onNegativeClick: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CResult is for showing a results summary e.g. an empty or error state.',
      },
    },
  },
  render: (args) => ({
    components: { CResult },
    setup() {
      return {
        args,
      };
    },
    template: `
      <CResult
        :type="args.type"
        :size="args.size"
        :max-width="args.maxWidth"
        :icon-name="args.iconName"
        :has-negative="args.hasNegative"
        :has-content="args.hasContent"
        :has-title="args.hasTitle"
        @positive-click="args.onPositiveClick"
        @negative-click="args.onNegativeClick"
      >
        <template #title>
          Result Title
        </template>
        
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
          sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
        
        <template #positive-text>
          Retry
        </template>
      </CResult>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'info',
    maxWidth: 400,
    onPositiveClick: fn(),
    onNegativeClick: fn(),
  },
};

export const Empty: Story = {
  render: () => ({
    components: { CResult },
    template: `
      <CResult
        type="empty"
      />
    `,
  }),
};

export const Success: Story = {
  render: () => ({
    components: { CResult },
    template: `
      <CResult
        type="success"
      >
        <template #title>
          Success
        </template>
      </CResult>
    `,
  }),
};

export const Warning: Story = {
  render: () => ({
    components: { CResult },
    template: `
      <CResult
        type="warning"
      >
        <template #title>
          Warning
        </template>

        <p>
          This warning may require your attention.
        </p>
      </CResult>
    `,
  }),
};

export const Error: Story = {
  render: () => ({
    components: { CResult },
    template: `
      <CResult
        type="error"
      />
    `,
  }),
};
