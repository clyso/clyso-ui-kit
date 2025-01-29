import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CBreadcrumb from '../CBreadcrumb/CBreadcrumb.vue';
import CBreadcrumbItem from './CBreadcrumbItem.vue';

const meta: Meta<typeof CBreadcrumbItem> = {
  title: 'Components/BreadcrumbItem',
  component: CBreadcrumbItem,
  tags: ['autodocs'],
  argTypes: {
    default: {
      control: false,
    },
    onClick: {
      control: false,
    },
    to: {
      control: false,
    },
    href: {
      control: {
        type: 'text',
      },
    },
    loadingWidth: {
      control: 'text',
    },
    target: {
      options: ['_self', '_blank'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Custom component. Represents an individual item within a breadcrumb navigation.',
      },
    },
  },
  render: (args) => ({
    components: { CBreadcrumbItem, CBreadcrumb },
    setup() {
      return { args };
    },
    template: `
      <CBreadcrumb>
        <CBreadcrumbItem 
          :href="args.href"
          :target="args.target"
          :is-loading="args.isLoading"
          :loading-width="args.loadingWidth"
          @click="args.onClick">
          Home
        </CBreadcrumbItem>
        <CBreadcrumbItem
          href="https://www.imdb.com/feature/genre/?ref_=nv_ch_gr"
          :target="args.target"
          :is-loading="args.isLoading"
          :loading-width="args.loadingWidth"
          @click="args.onClick">
          Movies
        </CBreadcrumbItem>
        <CBreadcrumbItem 
          href="https://www.imdb.com/search/title/?genres=comedy&explore=genres&title_type=feature"
          :target="args.target"
          :is-loading="args.isLoading"
          :loading-width="args.loadingWidth"
          @click="args.onClick">
          Comedy
        </CBreadcrumbItem>
        <CBreadcrumbItem 
          href="https://www.imdb.com/title/tt0098627/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_weeken"
          :target="args.target"
          :is-active="args.isActive"
          :is-loading="args.isLoading"
          :loading-width="args.loadingWidth"
          @click="args.onClick">
          Weekend at Bernie's
        </CBreadcrumbItem>
      </CBreadcrumb>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isActive: true,
    loadingWidth: '120px',
    target: '_blank',
    href: 'https://www.imdb.com/',
    onClick: fn(),
  },
};
