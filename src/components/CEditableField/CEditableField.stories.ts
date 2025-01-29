import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CEditableField from './CEditableField.vue';

const meta: Meta<typeof CEditableField> = {
  title: 'Components/EditableField',
  component: CEditableField,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; align-items: center"><story/></div>',
    }),
  ],
  argTypes: {
    value: {
      control: false,
    },
    saveHandler: {
      control: false,
    },
    inputWidth: {
      control: 'number',
    },
    blurTimeoutMs: {
      control: 'number',
    },
    savedTimeoutMs: {
      control: 'number',
    },
    errorTimeoutMs: {
      control: 'number',
    },
    validators: {
      control: false,
    },
    'value-empty': {
      control: false,
    },
    'tooltip-saved-message': {
      control: false,
    },
    'tooltip-error-message': {
      control: false,
    },
    'tooltip-save-button': {
      control: false,
    },
    'tooltip-edit-button': {
      control: false,
    },
    error: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible and customizable component for inline editing. It allows users to edit text with built-in validation, saving functionality, and error handling. Supports tooltips, save/cancel actions, and the option to align the text left, with dynamic control over input width and error states.',
      },
    },
  },
  render: (args) => ({
    components: { CEditableField },
    setup() {
      const email = ref('test@email.com');
      const emailValidators = ref({
        required: (value: string) => value.length !== 0,
        email: (value: string) => value.includes('@'),
      });

      async function handleEmailSave(value: string) {
        await new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            (Math.random() > 0.6 ? reject : resolve)();
          }, 500);
        });

        email.value = value;
      }

      return {
        args,
        emailValidators,
        email,
        handleEmailSave,
      };
    },
    template: `
      <CEditableField
        :value="email"
        :isEditable="args.isEditable"
        :placeholder="args.placeholder"
        :saveHandler="handleEmailSave"
        :inputWidth="args.inputWidth"
        :blurTimeoutMs="args.blurTimeoutMs"
        :savedTimeoutMs="args.savedTimeoutMs"
        :errorTimeoutMs="args.errorTimeoutMs"
        :hasTooltips="args.hasTooltips"
        :isAlignedLeft="args.isAlignedLeft"
        :validators="emailValidators"
      >
        <template #error="{ errors }">
          <template v-if="errors.includes('required')">
            Email is required
          </template>
          <template v-else-if="errors.includes('email')">
            Invalid email
          </template>
        </template>
      </CEditableField>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isEditable: true,
    blurTimeoutMs: 5000,
    savedTimeoutMs: 3000,
    errorTimeoutMs: 3000,
    hasTooltips: true,
  },
};
