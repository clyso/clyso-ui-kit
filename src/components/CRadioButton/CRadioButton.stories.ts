import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { ref } from 'vue';
import CRadioButton from './CRadioButton.vue';
import CRadioGroup from '../CRadioGroup/CRadioGroup.vue';

const meta: Meta<typeof CRadioButton> = {
  title: 'Components/RadioButton',
  component: CRadioButton,
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
          'The CRadioButton component wraps Naive UI’s NRadio to provide a customizable radio button. It supports features like checked state management, size adjustments, and custom labels. It also emits events for value changes and provides a default slot for custom content. Use it within a radio group for seamless integration with other components.',
      },
    },
  },
  render: (args) => ({
    components: { CRadioButton, CRadioGroup },
    setup() {
      const selectedValue = ref('yes');

      return {
        args,
        selectedValue,
      };
    },
    template: `
      <CRadioGroup 
        v-model:value="selectedValue"
        :size="args.size"
        name="answer-group"
      >
        <CRadioButton
          :disabled="args.disabled"
          :label="args.label"
          :name="args.name"
          :size="args.size"
          value="yes"
          @update:checked="args['onUpdate:checked']"
          @change="args.onChange"
        >
          Yes
        </CRadioButton>
        <CRadioButton
          :disabled="args.disabled"
          :label="args.label"
          :name="args.name"
          :size="args.size"
          value="no"
          @update:checked="args['onUpdate:checked']"
          @change="args.onChange"
        >
          No
        </CRadioButton>
        <CRadioButton
          :defaultChecked="args.defaultChecked"
          :disabled="args.disabled"
          :label="args.label"
          :name="args.name"
          :size="args.size"
          value="maybe"
          @update:checked="args['onUpdate:checked']"
          @change="args.onChange"
        >
          Maybe
        </CRadioButton>
      </CRadioGroup>
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
