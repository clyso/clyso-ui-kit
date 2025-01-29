import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { ref } from 'vue';
import CRadioButton from '../CRadioButton/CRadioButton.vue';
import CRadio from '../CRadio/CRadio.vue';
import CRadioGroup from './CRadioGroup.vue';

const meta: Meta<typeof CRadioGroup> = {
  title: 'Components/RadioGroup',
  component: CRadioGroup,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="display: grid; gap: 36px"><story/></div>',
    }),
  ],
  argTypes: {
    value: {
      control: false,
    },
    name: {
      control: 'text',
    },
    size: {
      options: ['small', 'medium', 'large'],
    },
    'onUpdate:value': {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      control: 'text',
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
    components: { CRadioButton, CRadioGroup, CRadio },
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
        :disabled="args.disabled"
        :name="args.name"
        :default-value="args.defaultValue"
      >
        <CRadioButton value="yes">
          Yes
        </CRadioButton>
        <CRadioButton value="no">
          No
        </CRadioButton>
        <CRadioButton value="maybe">
          Maybe
        </CRadioButton>
      </CRadioGroup>
      
      <CRadioGroup 
        v-model:value="selectedValue"
        :size="args.size"
        :disabled="args.disabled"
        :name="args.name"
        :default-value="args.defaultValue"
        style="display: flex; gap: 12px;"
      >
        <CRadio value="yes">
          Yes
        </CRadio>
        <CRadio value="no">
          No
        </CRadio>
        <CRadio value="maybe">
          Maybe
        </CRadio>
      </CRadioGroup>
      
      <div>Answer: <strong>{{ selectedValue }}</strong></div>
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
    'onUpdate:value': fn(),
  },
};
