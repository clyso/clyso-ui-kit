import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CInputNumber from './CInputNumber.vue';

const meta: Meta<typeof CInputNumber> = {
  title: 'Components/InputNumber',
  component: CInputNumber,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    'add-icon': {
      control: false,
      description: 'Icon of the add button.',
    },
    'minus-icon': {
      control: false,
      description: 'Icon of the minus button.',
    },
    prefix: {
      control: false,
      description: 'Prefix content slot.',
    },
    suffix: {
      control: false,
      description: 'Suffix content slot.',
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    status: {
      options: ['success', 'warning', 'error'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/input) but has additional properties: `hasError`, `id`.**',
      },
    },
  },
  render: (args) => ({
    components: { CInputNumber },
    setup() {
      const value = ref('');

      return {
        args,
        value,
        fn,
      };
    },
    template: `
      <CInputNumber
        :id="args.id"
        style="max-width: 500px"
        v-model:value="value"
        :input-props="args.inputProps"
        :status="args.calculatedStatus"
        :has-error="args.hasError"
        :autofocus="args.autofocus"
        :bordered="args.bordered"
        :button-placement="args.buttonPlacement"
        :clearable="args.clearable"
        :default-value="args.defaultValue"
        :disabled="args.disabled"
        :format="args.format"
        :keyboard="args.keyboard"
        :loading="args.loading"
        :max="args.max"
        :min="args.min"
        :parse="args.parse"
        :placeholder="args.placeholder"
        :precision="args.precision"
        :round="args.round"
        :readonly="args.readonly"
        :show-button="args.showButton"
        :size="args.size"
        :step="args.step"
        :update-value-on-input="args.updateValueOnInput"
        :validator="args.validator"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    id: 'input-number',
  },
};
