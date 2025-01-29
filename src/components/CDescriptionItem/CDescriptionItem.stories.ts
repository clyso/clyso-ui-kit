import type { Meta, StoryObj } from '@storybook/vue3';
import CDescriptionItem from './CDescriptionItem.vue';
import CDescriptionList from '../CDescriptionList/CDescriptionList.vue';

const meta: Meta<typeof CDescriptionItem> = {
  title: 'Components/DescriptionItem',
  component: CDescriptionItem,
  tags: ['autodocs'],
  argTypes: {
    default: {
      control: false,
      description: 'The label of the item.',
    },
    label: {
      control: false,
      description: 'The value of the item.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Item in [Description List](/docs/components-descriptionlist--docs).',
      },
    },
  },
  render: (args) => ({
    components: { CDescriptionList, CDescriptionItem },
    setup() {
      return { args };
    },
    template: `
      <CDescriptionList>
        <CDescriptionItem>
          <template #label>Label 1</template>
          
          Value 1
        </CDescriptionItem>
        <CDescriptionItem>
          <template #label>Label 2</template>
          
          Value 2
        </CDescriptionItem>
      </CDescriptionList>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
