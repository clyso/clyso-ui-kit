import type { Meta, StoryObj } from '@storybook/vue3';
import { computed } from 'vue';
import CDescriptionList from './CDescriptionList.vue';
import CDescriptionItem from '../CDescriptionItem/CDescriptionItem.vue';
import type { KeyValueItem } from '../../types';

const meta: Meta<typeof CDescriptionList> = {
  title: 'Components/DescriptionList',
  component: CDescriptionList,
  tags: ['autodocs'],
  argTypes: {
    default: {
      control: false,
    },
    direction: {
      options: ['column', 'row'],
    },
    rows: {
      control: 'number',
    },
    columns: {
      control: 'number',
    },
    labelPlacement: {
      options: ['top', 'left'],
    },
    size: {
      options: ['small', 'medium', 'large'],
    },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component:
          'Custom component that provides a flexible way to display key/value pairs in various layouts. It allows you to customize the orientation, placement, and size of the items, making it suitable for different use cases, such as forms, detailed information panels, or settings summaries. With configurable rows and columns, the component adapts to different screen sizes and content structures, offering a clean and organized presentation.',
      },
    },
  },
  render: (args) => ({
    components: { CDescriptionList, CDescriptionItem },
    setup() {
      const itemsCount = 10;

      const items = computed<KeyValueItem[]>(() =>
        Array.from(Array(itemsCount)).map((_, index) => ({
          key: `Label ${index + 1}`,
          value: `Value ${index + 1}`,
        })),
      );

      return { args, items };
    },
    template: `
      <CDescriptionList
        :direction="args.direction"
        :rows="args.rows"
        :columns="args.columns"
        :label-placement="args.labelPlacement"
        :size="args.size"
      >
        <CDescriptionItem 
          v-for="(item, index) in items"
          :key="index">
          <template #label>{{ item.key }}</template>
          
          {{ item.value }}
        </CDescriptionItem>
      </CDescriptionList>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: 'column',
    rows: 3,
    columns: 3,
    labelPlacement: 'top',
    size: 'medium',
  },
};
