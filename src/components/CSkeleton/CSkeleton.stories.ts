import type { Meta, StoryObj } from '@storybook/vue3';
import CSkeleton from './CSkeleton.vue';

const meta: Meta<typeof CSkeleton> = {
  title: 'Components/Skeleton',
  component: CSkeleton,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; justify-content: center;"><story/></div>',
    }),
  ],
  argTypes: {
    type: {
      options: ['default', 'text', 'chart', 'bar-chart'],
    },
    height: {
      type: 'number',
    },
    borderRadius: {
      type: 'number',
    },
    paddingBlock: {
      type: 'number',
    },
    marginBottom: {
      type: 'number',
    },
    chartGroupHeight: {
      type: 'number',
    },
    chartWidth: {
      type: 'number',
    },
    chartHeight: {
      type: 'number',
    },
    default: {
      control: false,
      description: 'Default slot',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CSkeleton serves as a placeholder to indicate that content is loading. Instead of showing a blank space or loading spinner, CSkeleton mimics the layout of the content that will eventually load, giving users a visual cue that the page is being populated with data.',
      },
    },
  },
  render: (args) => ({
    components: { CSkeleton },
    setup() {
      return {
        args,
      };
    },
    template: `
      <CSkeleton
        :type="args.type"
        :repeat="args.repeat"
        :width="args.width"
        :height="args.height"
        :border-radius="args.borderRadius"
        :padding-block="args.paddingBlock"
        :margin-bottom="args.marginBottom"
        :is-round="args.isRound"
        :chart-group-height="args.chartGroupHeight"
        :chart-width="args.chartWidth"
        :chart-height="args.chartHeight"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'default',
    width: '50%',
    paddingBlock: 10,
    repeat: 5,
  },
};
