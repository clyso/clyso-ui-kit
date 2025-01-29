import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { ref } from 'vue';
import CCheckbox from './CCheckbox.vue';

const meta: Meta<typeof CCheckbox> = {
  title: 'Components/Checkbox',
  component: CCheckbox,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; gap: 12px; justify-items: start;"><story/></div>',
    }),
  ],
  argTypes: {
    'onUpdate:checked': {
      table: {
        disable: true,
      },
    },
    default: {
      control: 'text',
    },
    checked: {
      control: false,
    },
    defaultChecked: {
      control: false,
    },
    size: {
      options: ['small', 'medium', 'large'],
    },
    value: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/checkbox).**\n\n',
      },
    },
  },
  render: (args) => ({
    components: { CCheckbox },
    setup() {
      const checkedValue = ref(true);

      return { args, checkedValue };
    },
    template: `
      <CCheckbox 
        v-model:checked="checkedValue"
        :disabled="args.disabled"
        :focusable="args.focusable"
        :indeterminate="args.indeterminate"
        :label="args.label"
        :size="args.size"
        :value="args.value"
        @change="args['onUpdate:checked']"
      >
        Checkbox
      </CCheckbox>
      <CCheckbox 
        v-model:checked="checkedValue"
        :disabled="args.disabled"
        :focusable="args.focusable"
        :indeterminate="args.indeterminate"
        :label="args.label"
        :size="args.size"
        :value="args.value"
        @change="args['onUpdate:checked']"
      >
        {{ args.default }}
      </CCheckbox>
      
      <div><b>Value:</b> {{ checkedValue }}</div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
    default:
      'I agree to the terms and conditions, and I acknowledge that I have read and understood the privacy policy, including how my personal data will be used and protected.',
    'onUpdate:checked': fn(),
  },
};
