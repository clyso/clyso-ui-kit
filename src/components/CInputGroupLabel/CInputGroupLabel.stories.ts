import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CInput from '../CInput/CInput.vue';
import CInputGroup from '../CInputGroup/CInputGroup.vue';
import CInputGroupLabel from './CInputGroupLabel.vue';

const meta: Meta<typeof CInputGroupLabel> = {
  title: 'Components/InputGroupLabel',
  component: CInputGroupLabel,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 500px"><story/></div>',
    }),
  ],
  argTypes: {
    default: {
      control: false,
      description: 'The content of the input group label.',
    },
    size: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/input#input-group.vue)**. Provides label elements inside input groups.',
      },
    },
  },
  render: (args) => ({
    components: {
      CInputGroup,
      CInput,
      CInputGroupLabel,
    },
    setup() {
      const value = ref('');

      return {
        args,
        value,
      };
    },
    template: `
      <CInputGroup>
        <CInputGroupLabel :size="args.size">https://</CInputGroupLabel>
        <CInput 
          placeholder="domain"
          :size="args.size"
          v-model:value="value"/>
        <CInputGroupLabel :size="args.size">.com</CInputGroupLabel>
      </CInputGroup>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
