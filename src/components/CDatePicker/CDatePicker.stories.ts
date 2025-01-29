import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CDatePicker from './CDatePicker.vue';

const meta: Meta<typeof CDatePicker> = {
  title: 'Components/DatePicker',
  // Issue with generics in components: https://github.com/storybookjs/storybook/issues/24238
  component: CDatePicker,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 500px"><story/></div>',
    }),
  ],
  argTypes: {
    slot: {
      table: {
        disable: true,
      },
    },
    type: {
      options: [
        'date',
        'datetime',
        'datetimerange',
        'month',
        'monthrange',
        'year',
        'yearrange',
        'quarter',
        'quarterrange',
        'week',
      ],
    },
    format: {
      control: 'text',
    },
    size: {
      options: ['small', 'medium', 'large'],
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
    firstDayOfWeek: {
      options: [0, 1, 2, 3, 4, 5, 6],
    },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/date-picker).** But for date range please use DateRangePicker component. Not all the properties, events, slots are listed below so please refer to Naive UI documentation.',
      },
    },
  },
  render: (args) => ({
    components: { CDatePicker },
    setup() {
      const date = ref<unknown>(null);

      return { args, date };
    },
    template: `
      <CDatePicker
        v-model:value="date"
        :format="args.format"
        :clearable="args.clearable"
        :disabled="args.disabled"
        :size="args.size"
        :placement="args.placement"
        :firstDayOfWeek="args.firstDayOfWeek"
        :panel="args.panel"
        :type="args.type"/>
      <div style="margin-top: 12px">Value: {{ date ?? 'null' }}</div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'date',
    size: 'medium',
    format: 'd MMM yyyy',
  },
};
