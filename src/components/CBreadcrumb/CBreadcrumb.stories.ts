import type { Meta, StoryObj } from '@storybook/vue3';
import CBreadcrumb from './CBreadcrumb.vue';
import CBreadcrumbItem from '../CBreadcrumbItem/CBreadcrumbItem.vue';

const meta: Meta<typeof CBreadcrumb> = {
  title: 'Components/Breadcrumb',
  component: CBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    default: {
      control: false,
      description: 'Slot for the list of the breadcrumbs.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Custom component. Simple wrapper for [BreadcrumbItem](/docs/components-breadcrumbitem--docs) component.',
      },
    },
  },
  render: (args) => ({
    components: { CBreadcrumb, CBreadcrumbItem },
    setup() {
      return { args };
    },
    template: `
      <CBreadcrumb>
        <CBreadcrumbItem :to="{ name: '/' }">
          Home
        </CBreadcrumbItem>
        <CBreadcrumbItem :to="{ name: '/' }">
          Movies
        </CBreadcrumbItem>
        <CBreadcrumbItem :to="{ name: '/' }">
          Drama
        </CBreadcrumbItem>
        <CBreadcrumbItem :is-active="true">
          Eternal Sunshine of the Spotless Mind
        </CBreadcrumbItem>
      </CBreadcrumb>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
