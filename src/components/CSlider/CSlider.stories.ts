import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CSlider from './CSlider.vue';

const meta: Meta<typeof CSlider> = {
  title: 'Components/Slider',
  component: CSlider,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 600px; margin: 0 auto;"><story/></div>',
    }),
  ],
  argTypes: {
    formatTooltip: {
      control: false,
    },
    placement: {
      options: [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
    },
    step: {
      control: 'number',
    },
    value: {
      control: false,
    },
    thumb: {
      control: false,
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
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/slider).** <br>CSlider allows users to select a value from a range by sliding a handle along a track. The slider is typically used for adjusting values like volume, brightness, or any numerical input that needs a range of values. It can also display tooltips to indicate the exact value as the handle is moved.',
      },
    },
  },
  render: (args) => ({
    components: { CSlider },
    setup() {
      return {
        args,
      };
    },
    template: `
      <CSlider
        :disabled="args.disabled"
        :format-tooltip="args.formatTooltip"
        :keyboard="args.keyboard"
        :max="args.max"
        :min="args.min"
        :is-max-value="args.isMaxValue"
        :placement="args.placement"
        :is-reversed="args.isReversed"
        :is-range="args.isRange"
        :show-tooltip="args.showTooltip"
        :step="args.step"
        :tooltip="args.tooltip"
        :vertical="args.vertical"
        v-model:value="args.value"
        @update:value="args['onUpdate:value']"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'onUpdate:value': fn(),
  },
};

export const Range: Story = {
  render: () => ({
    components: { CSlider },
    setup() {
      const value = ref([50, 70]);

      return { value };
    },
    template: `
      <CSlider 
        :is-range="true"
        v-model:value="value"
      />
    `,
  }),
};
