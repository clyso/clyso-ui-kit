import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { ref } from 'vue';
import CRadio from './CRadio.vue';

const meta: Meta<typeof CRadio> = {
  title: 'Components/Radio',
  component: CRadio,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; align-items: center; gap: 24px"><story/></div>',
    }),
  ],
  argTypes: {
    checked: {
      control: false,
    },
    value: {
      control: false,
    },
    label: {
      control: false,
    },
    name: {
      control: 'text',
    },
    size: {
      options: ['small', 'medium', 'large'],
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    'onUpdate:checked': {
      table: {
        disable: true,
      },
    },
    default: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The CRadio component wraps Naive UI’s NRadio to provide a customizable radio button. It supports features like checked state management, size adjustments, and custom labels. It also emits events for value changes and provides a default slot for custom content. Use it within a radio group for seamless integration with other components.',
      },
    },
  },
  render: (args) => ({
    components: { CRadio },
    setup() {
      const selectedValue = ref('yes');

      return {
        args,
        selectedValue,
      };
    },
    template: `
      <CRadio
        :checked="selectedValue === 'yes'"
        :defaultChecked="args.defaultChecked"
        :disabled="args.disabled"
        :label="args.label"
        :name="args.name"
        :size="args.size"
        value="yes"
        @update:checked="args['onUpdate:checked']"
        @change="(event) => { args.onChange?.(event); selectedValue = 'yes' }"
      >
        Yes
      </CRadio>
      <CRadio
        :checked="selectedValue === 'no'"
        :defaultChecked="args.defaultChecked"
        :disabled="args.disabled"
        :label="args.label"
        :name="args.name"
        :size="args.size"
        value="no"
        @update:checked="args['onUpdate:checked']"
        @change="(event) => { args.onChange?.(event); selectedValue = 'no' }"
      >
        No
      </CRadio>
      <CRadio
        :checked="selectedValue === 'maybe'"
        :defaultChecked="args.defaultChecked"
        :disabled="args.disabled"
        :label="args.label"
        :name="args.name"
        :size="args.size"
        value="maybe"
        @update:checked="args['onUpdate:checked']"
        @change="(event) => { args.onChange?.(event); selectedValue = 'maybe' }"
      >
        Maybe
      </CRadio>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    name: 'answer',
    size: 'medium',
    'onUpdate:checked': fn(),
    onChange: fn(),
  },
};
