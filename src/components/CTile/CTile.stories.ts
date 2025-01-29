import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CTile from './CTile.vue';
import CButton from '../CButton/CButton.vue';
import CIcon from '../CIcon/CIcon.vue';

const meta: Meta<typeof CTile> = {
  title: 'Components/Tile',
  component: CTile,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style=""><story/></div>',
    }),
  ],
  argTypes: {
    onClose: {
      table: {
        disable: true,
      },
    },
    loading: {
      control: false,
      description: 'Loading slot.',
    },
    'loading-header': {
      control: false,
      description: 'Loading header content.',
    },
    'loading-content': {
      control: false,
      description: 'Loading content slot.',
    },
    'loading-footer': {
      control: false,
      description: 'Loading footer content.',
    },
    'loading-actions': {
      control: false,
      description: 'Loading actions slot.',
    },
    title: {
      control: false,
      description: 'Title slot.',
    },
    header: {
      control: false,
      description: 'Header content.',
    },
    'header-extra': {
      control: false,
      description: 'Header extra content.',
    },
    default: {
      control: false,
      description: 'Default slot.',
    },
    footer: {
      control: false,
      description: 'Footer content.',
    },
    actions: {
      control: false,
      description: 'Operating area content.',
    },
    processing: {
      control: false,
      description: 'Processing slot.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CTile is a block that represents a visual unit that can display content, such as text, images, or interactive elements, in a grid-like structure. Tiles are often used to present information in a clean, organized manner.',
      },
    },
  },
  render: (args) => ({
    components: { CTile, CButton, CIcon },
    setup() {
      return { args };
    },
    template: `
      <CTile
        :is-loading="args.isLoading"
        :is-closable="args.isClosable"
        :is-processing="args.isProcessing"
        @close="args.onClose"
      >
        <template #title>
          Tile Demo
        </template>

        <template #header>
          #header
        </template>

        <template #header-extra>
          <CButton type="info" size="small">
            <CIcon
              :is-inline="true"
              name="pencil"
            />
          </CButton>
        </template>
        
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores 
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum 
        dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.

        <template #actions>
          <CButton type="info" size="small">Click Me</CButton>
        </template>
        
        <template #footer>
          #footer
        </template>
      </CTile>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: fn(),
  },
};
