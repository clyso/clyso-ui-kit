import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import CDateRangePicker from './CDateRangePicker.vue';

const meta: Meta<typeof CDateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: CDateRangePicker,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 500px"><story/></div>',
    }),
  ],
  argTypes: {
    'onUpdate:value': {
      table: {
        disable: true,
      },
    },
    slot: {
      table: {
        disable: true,
      },
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
    rangeEndMode: {
      options: ['startOfDay', 'endOfDay'],
    },
    startPlaceholder: {
      control: 'text',
    },
    endPlaceholder: {
      control: 'text',
    },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component:
          'Date picker with type `daterange` ([Naive UI component](https://www.naiveui.com/en-US/dark/components/date-picker)). Has custom prop `rangeEndMode` that allows to set a boundary of the end date. Not all the properties, events, slots are listed below so please refer to Naive UI documentation.',
      },
    },
  },
  render: (args) => ({
    components: { CDateRangePicker },
    setup() {
      const date = ref<[number, number] | null>(null);

      return { args, date };
    },
    template: `
      <CDateRangePicker
        v-model:value="date"
        :format="args.format"
        :clearable="args.clearable"
        :disabled="args.disabled"
        :size="args.size"
        :placement="args.placement"
        :firstDayOfWeek="args.firstDayOfWeek"
        :panel="args.panel"
        :rangeEndMode="args.rangeEndMode"
        :start-placeholder="args.startPlaceholder"
        :end-placeholder="args.endPlaceholder"
        @update:value="args['onUpdate:value']"
      />
      <div style="margin-top: 12px">Value: {{ date ?? 'null' }}</div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'onUpdate:value': fn(),
    format: 'yyyy-MM-dd HH:mm:ss',
    startPlaceholder: 'Start date',
    endPlaceholder: 'End date',
    panel: false,
    firstDayOfWeek: 1,
    placement: 'bottom-start',
    size: 'medium',
    disabled: false,
    clearable: true,
    rangeEndMode: 'endOfDay',
  },
};
