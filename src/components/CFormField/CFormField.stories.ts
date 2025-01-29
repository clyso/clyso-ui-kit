import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import CForm from '../CForm/CForm.vue';
import CInput from '../CInput/CInput.vue';
import CFormField from './CFormField.vue';
import CButton from '../CButton/CButton.vue';
import CAlert from '../CAlert/CAlert.vue';

const meta: Meta<typeof CFormField> = {
  title: 'Components/FormField',
  component: CFormField,
  tags: ['autodocs'],
  argTypes: {
    fieldId: {
      control: false,
    },
    hasError: {
      control: false,
    },
    errors: {
      control: false,
    },
    'head-right': {
      control: false,
    },
    label: {
      control: false,
    },
    default: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible form field component for structuring labels, inputs, and error messages. It supports slots for customizing labels, additional header content, and validation errors, with built-in styles for required fields and error states.',
      },
    },
  },
  render: (args) => ({
    components: {
      CForm,
      CFormField,
      CInput,
      CButton,
      CAlert,
    },
    setup() {
      const isSubmitted = ref(false);
      const isSubmitting = ref(false);
      const username = ref('');
      const password = ref('');
      const hasUsernameError = computed(
        () =>
          isSubmitted.value &&
          (username.value.length === 0 || !username.value.includes('@')),
      );
      const hasPasswordError = computed(
        () =>
          isSubmitted.value &&
          (username.value.length === 0 || password.value.length < 3),
      );
      const hasSubmitError = ref(false);
      const isSubmitSuccess = ref(false);

      function reset() {
        hasSubmitError.value = false;
        isSubmitted.value = false;
        isSubmitSuccess.value = false;
      }

      async function login() {
        reset();
        isSubmitted.value = true;

        if (hasPasswordError.value || hasUsernameError.value) {
          return;
        }

        isSubmitting.value = true;

        await new Promise<void>((resolve) => {
          setTimeout(resolve, 500);
        });

        if (Math.random() > 0.9) {
          hasSubmitError.value = true;
          isSubmitting.value = false;

          return;
        }

        isSubmitSuccess.value = true;
        isSubmitting.value = false;
      }

      return {
        args,
        username,
        password,
        hasUsernameError,
        hasPasswordError,
        login,
        isSubmitted,
        isSubmitting,
        isSubmitSuccess,
        hasSubmitError,
      };
    },
    template: `
      <CForm 
        class="login-form"
        style="max-width: 500px"
        @submit="login">
        <CFormField
          field-id="login-username"
          :has-error="hasUsernameError"
          :is-required="args.isRequired"
        >
          <template #label>
            Username
          </template>

          <template #default="{ hasError, fieldId }">
            <CInput
              :id="fieldId"
              v-model:value="username"
              size="large"
              :has-error="hasError"
              placeholder="user@mail.com"
              @input="() => hasSubmitError = false"
            />
          </template>

          <template #errors>
            <template v-if="username.length === 0">
              Username is required.
            </template>
            <template v-else>Username should be a valid email address.</template>
          </template>
        </CFormField>

        <CFormField
          field-id="login-password"
          :has-error="hasPasswordError"
          :is-required="args.isRequired"
        >
          <template #label>
            Password
          </template>

          <template #default="{ hasError, fieldId }">
            <CInput
              :id="fieldId"
              v-model:value="password"
              :has-error="hasError"
              size="large"
              placeholder="Password"
              type="password"
              show-password-on="click"
              @input="hasSubmitError = false"
            />
          </template>

          <template #errors>
            <template v-if="password.length === 0">
              Password is required.
            </template>
            <template v-else>Password should be at least 3 characters long.</template>
          </template>
        </CFormField>

        <template
          v-if="hasSubmitError"
          #error
        >
          <CAlert
            type="error"
            closable
            @close="hasSubmitError = false"
          >
            <template #header>
              The Credentials are incorrect.
            </template>
            
            Please verify the credentials and try to login once again.
          </CAlert>
        </template>

        <template #actions>
          <div class="form-actions">
            <CButton
              type="primary"
              size="large"
              block
              attrType="submit"
              class="form-actions__login"
              :loading="isSubmitting"
            >
              Login
            </CButton>
          </div>
        </template>
      </CForm>
      
      <div 
        v-if="isSubmitSuccess"
        style="margin-top: 12px">Success!</div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
