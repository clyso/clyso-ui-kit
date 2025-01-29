import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CSwitch from './CSwitch.vue';

const meta: Meta<typeof CSwitch> = {
  title: 'Components/Switch',
  component: CSwitch,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
    },
    gap: {
      control: 'number',
    },
    labelPlacement: {
      options: ['start', 'end'],
    },
    align: {
      options: ['start', 'center'],
    },
    isDisabled: {
      control: 'boolean',
    },
    default: {
      control: false,
    },
    checked: {
      control: false,
    },
    'checked-icon': {
      control: false,
      description: 'Icon of switch button when checked.',
    },
    icon: {
      control: false,
    },
    unchecked: {
      control: false,
    },
    'unchecked-icon': {
      control: false,
      description: 'Icon of switch button when unchecked.',
    },
    onBlur: {
      table: {
        disable: true,
      },
    },
    onFocus: {
      table: {
        disable: true,
      },
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
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/switch) but has additional properties.** \n\n  A customizable switch component for choosing between an on/off value.',
      },
    },
  },
  render: (args) => ({
    components: { CSwitch },
    setup() {
      return { args };
    },
    template: `
      <CSwitch
        v-model:value="args.value"
        :label-placement="args.labelPlacement"
        :is-disabled="args.isDisabled"
        :align="args.align"
        :gap="args.gap"
        :loading="args.loading"
        :round="args.round"
        @focus="args.onFocus"
        @blur="args.onBlur"
        @update:value="args['onUpdate:value']"
      >
        Label
      </CSwitch>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof CSwitch>;

export const Default: Story = {
  args: {
    value: true,
    isDisabled: false,
    labelPlacement: 'start',
    align: 'start',
    round: true,
    onBlur: fn(),
    onFocus: fn(),
    'onUpdate:value': fn(),
  },
};

export const Shape: Story = {
  args: {
    value: true,
    round: false,
  },
};

export const Size: Story = {
  render: () => ({
    components: { CSwitch },
    setup() {
      const value = ref(true);

      return { value };
    },
    template: `
      <div style="display: flex; gap: 10px;">
        <CSwitch 
          v-model:value="value"
          size="small"
        />
        <CSwitch
          v-model:value="value"
          size="medium"
        />
        <CSwitch
          v-model:value="value"
          size="large"
        />
      </div>
    `,
  }),
};
