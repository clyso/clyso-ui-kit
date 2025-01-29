import type { Meta, StoryObj } from '@storybook/vue3';
import CBadge from './CBadge.vue';
import CButton from '../CButton/CButton.vue';
import CAvatar from '../CAvatar/CAvatar.vue';

const meta: Meta<typeof CBadge> = {
  title: 'Components/Badge',
  component: CBadge,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; gap: 20px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    default: {
      control: false,
      description: 'The content of the badge.',
    },
    color: {
      control: 'text',
    },
    max: {
      control: 'number',
    },
    offset: {
      control: 'object',
    },
    type: {
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    value: {
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Exactly matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/badge).**\n\n Badge to be used for counters, statuses.',
      },
    },
  },
  render: (args) => ({
    components: { CBadge, CAvatar, CButton },
    setup() {
      return { args };
    },
    template: `
      <CBadge
        :name="args.name"
        :color="args.color"
        :dot="args.dot"
        :max="args.max"
        :offset="args.offset"
        :processing="args.processing"
        :show-args.zero="args.showZero"
        :show="args.show"
        :type="args.type"
        :value="args.value"
      >
        <CAvatar
          name="John Doe"
          size="large"></CAvatar>
      </CBadge>
      
      <CButton @click="() => { args.value++ }">
        +
      </CButton>
      <CButton @click="() => { args.value = Math.max(0, args.value - 1) }">
        -
      </CButton>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 9,
    max: 15,
  },
};

export const Type: Story = {
  render: () => ({
    components: { CBadge, CAvatar },
    template: `
      <CBadge
        processing
        dot
        type="default"
      >
        <CAvatar name="rory palmer"/>
      </CBadge>
      <CBadge
        :value="0"
        show-zero
        type="success"
      >
        <CAvatar src="https://picsum.photos/id/222/200/300"/>
      </CBadge>
      <CBadge
        value="info"
        type="error"
      >
        <CAvatar/>
      </CBadge>
      <CBadge
        value="info"
        dot
        type="warning"
      >
        <CAvatar src="https://picsum.photos/id/188/200/300"/>
      </CBadge>
      <CBadge
        :value="6782"
        type="info"
      >
        <CAvatar/>
      </CBadge>
    `,
  }),
};
