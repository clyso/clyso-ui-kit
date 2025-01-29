import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CInput from '../CInput/CInput.vue';
import CInputGroup from './CInputGroup.vue';
import CInputGroupLabel from '../CInputGroupLabel/CInputGroupLabel.vue';
import CButton from '../CButton/CButton.vue';

const meta: Meta<typeof CInputGroup> = {
  title: 'Components/InputGroup',
  component: CInputGroup,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="display: grid; gap: 12px;"><story/></div>',
    }),
  ],
  argTypes: {
    default: {
      control: false,
      description: 'The content of the input group.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Matches [Naive UI component](https://www.naiveui.com/en-US/dark/components/input#input-group.vue)**. Groups elements together.',
      },
    },
  },
  render: (args) => ({
    components: {
      CInputGroup,
      CInput,
      CInputGroupLabel,
      CButton,
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
        <CInput v-model:value="value"/>
        <CInput v-model:value="value"/>
        <CInput v-model:value="value"/>
      </CInputGroup>
      
      <CInputGroup>
        <CInputGroupLabel>https://</CInputGroupLabel>
        <CInput 
          placeholder="domain"
          v-model:value="value"/>
        <CInputGroupLabel>.com</CInputGroupLabel>
      </CInputGroup>
      
      <CInputGroup>
        <CInput 
          placeholder="domain"
          v-model:value="value"/>
        <CButton type="primary">Add</CButton>
      </CInputGroup>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
