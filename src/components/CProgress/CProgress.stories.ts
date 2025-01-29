import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import CProgress from './CProgress.vue';

const meta: Meta<typeof CProgress> = {
  title: 'Components/Progress',
  component: CProgress,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; justify-content: center; gap: 20px;"><story/></div>',
    }),
  ],
  argTypes: {
    borderRadius: {
      control: 'number',
    },
    color: {
      control: 'text',
    },
    fillBorderRadius: {
      control: 'number',
    },
    indicatorPlacement: {
      options: ['inside', 'outside'],
    },
    percentage: {
      control: 'number',
    },
    railColor: {
      control: 'text',
    },
    railStyle: {
      control: 'text',
    },
    status: {
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    type: {
      options: ['line', 'circle', 'multiple-circle', 'dashboard'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/progress).** <br>CProgress is an element that visually represents the completion or progress of a task, process, or action. It typically consists of a bar or circle that fills as the task progresses, indicating how much of the process has been completed.',
      },
    },
  },
  render: (args) => ({
    components: { CProgress },
    setup() {
      return {
        args,
      };
    },
    template: `
      <CProgress
        :border-radius="args.borderRadius"
        :circle-gap="args.circleGap"
        :color="args.color"
        :fill-border-radius="args.fillBorderRadius"
        :gap-degree="args.gapDegree"
        :gap-offset-degree="args.gapOffsetDegree"
        :height="args.height"
        :indicator-placement="args.indicatorPlacement"
        :indicator-text-color="args.indicatorTextColor"
        :offset-degree="args.offsetDegree"
        :percentage="args.type === 'multiple-circle' ? [12, 23, 42, args.percentage] : args.percentage"
        :processing="args.processing"
        :rail-color="args.railColor"
        :rail-style="args.railStyle"
        :show-indicator="args.showIndicator"
        :status="args.status"
        :stroke-width="args.strokeWidth"
        :type="args.type"
        :unit="args.unit"
        style="max-width: 500px"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percentage: 50,
  },
};

export const Circle: Story = {
  render: () => ({
    components: { CProgress },
    setup() {
      const percentageInfo = ref(50);
      const percentageSuccess = ref(60);
      const percentageError = ref(70);
      const percentageWarning = ref(80);

      return {
        percentageInfo,
        percentageSuccess,
        percentageError,
        percentageWarning,
      };
    },
    template: `
      <CProgress
        type="circle"
        :percentage="percentageInfo"
      >
        {{ percentageInfo }} %
      </CProgress>
      <CProgress
        type="circle"
        :percentage="percentageSuccess"
        status="success"
      >
        {{ percentageSuccess }} %
      </CProgress>
      <CProgress
        type="circle"
        :percentage="percentageError"
        status="error"
      >
        {{ percentageError }} %
      </CProgress>
      <CProgress
        type="circle"
        :percentage="percentageWarning"
        status="warning"
      >
        {{ percentageWarning }} %
      </CProgress>
    `,
  }),
};

export const Processing: Story = {
  render: () => ({
    components: { CProgress },
    template: `
      <CProgress
        type="line"
        :percentage="60"
        indicator-placement="inside"
        processing
        style="max-width: 500px"
      />
    `,
  }),
};
