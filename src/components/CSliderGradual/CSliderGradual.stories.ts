import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CSliderGradual from './CSliderGradual.vue';

const meta: Meta<typeof CSliderGradual> = {
  title: 'Components/SliderGradual',
  component: CSliderGradual,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 600px; margin: 0 auto;"><story/></div>',
    }),
  ],
  argTypes: {
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
          '**Gradual Slider** is designed to make adjustments smoother by using smaller steps at the start and gradually increasing the step size as the value increases. This is useful for large numerical ranges, providing finer control over lower values and faster movement at the higher end.',
      },
    },
  },
  render: (args) => ({
    components: { CSliderGradual },
    setup() {
      return {
        args,
      };
    },
    template: `
      <CSliderGradual
        :value="args.value"
        :is-max-value="args.isMaxValue"
        :is-reversed="args.isReversed"
        :max="args.max"
        :min="args.min"
        :middle="args.middle"
        :disabled="args.disabled"
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
    middle: 500,
    min: 0,
    max: 120000,
    'onUpdate:value': fn(),
  },
};
