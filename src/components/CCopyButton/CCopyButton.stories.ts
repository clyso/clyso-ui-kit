import type { Meta, StoryObj } from '@storybook/vue3';
import CCopyButton from './CCopyButton.vue';
import CButton from '../CButton/CButton.vue';

const meta: Meta<typeof CCopyButton> = {
  title: 'Components/CopyButton',
  component: CCopyButton,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    default: {
      control: false,
      description: 'For custom button elements. Provides `copyText` function.',
    },
    size: {
      control: false,
    },
    text: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A button component designed to copy text to the clipboard. It provides feedback messages for success and error states and supports customizable sizes and display duration for status messages.',
      },
    },
  },
  render: (args) => ({
    components: { CCopyButton },
    setup() {
      return { args };
    },
    template: `
      <CCopyButton 
        text="Text of tiny button."
        size="tiny"
        :statusDuration="args.statusDuration"
        :successText="args.successText"
        :errorText="args.errorText"
      />
      <CCopyButton
        text="Text of small button."
        size="small"
        :statusDuration="args.statusDuration"
        :successText="args.successText"
        :errorText="args.errorText"
      />
      <CCopyButton
        text="Text of medium button."
        :statusDuration="args.statusDuration"
        :successText="args.successText"
        :errorText="args.errorText"
      />
      <CCopyButton
        text="Text of large button."
        size="large"
        :statusDuration="args.statusDuration"
        :successText="args.successText"
        :errorText="args.errorText"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '',
    statusDuration: 1500,
  },
};

export const Custom: Story = {
  render: (args) => ({
    components: { CCopyButton, CButton },
    setup() {
      return { args };
    },
    template: `
      <CCopyButton 
        text="Custom button text."
        :status-duration="args.statusDuration"
      >
        <template #default="{ copyText }">
          <CButton @click="copyText">Copy</CButton>
        </template>
      </CCopyButton>
    `,
  }),
};
