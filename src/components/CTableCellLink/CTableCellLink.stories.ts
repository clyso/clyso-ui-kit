import type { Meta, StoryObj } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';
import CTableCellLink from './CTableCellLink.vue';
import CIcon from '../CIcon/CIcon.vue';

const meta: Meta<typeof CTableCellLink> = {
  title: 'Components/TableCellLink',
  component: CTableCellLink,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: flex; justify-content: center;"><story/></div>',
    }),
    vueRouter(),
  ],
  argTypes: {
    to: {
      control: false,
    },
    icon: {
      control: false,
    },
    default: {
      control: false,
    },
    tooltip: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CTableCellLink refers to a hyperlink that is embedded within a specific cell of a table e.g. the [CDataTable](/docs/components-datatable--docs). When users click on this link, they are directed to another location.',
      },
    },
  },
  render: (args) => ({
    components: { CTableCellLink, CIcon },
    setup() {
      return {
        args,
      };
    },
    template: `
      <CTableCellLink
        :to="args.to"
        :is-tooltip-on-overflow="args.isTooltipOnOverflow"
        :tooltip-delay-ms="args.tooltipDelayMs"
      >
        <template #icon>
          <CIcon
            :is-inline="true"
            name="globe-outline"
          />
        </template>
        Link
      </CTableCellLink>`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    to: '/',
  },
};
