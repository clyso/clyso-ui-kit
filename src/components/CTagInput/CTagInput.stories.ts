import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';
import { fn } from '@storybook/test';
import CTagInput from './CTagInput.vue';
import CButton from '../CButton/CButton.vue';

const meta: Meta<typeof CTagInput> = {
  title: 'Components/TagInput',
  component: CTagInput,
  tags: ['autodocs'],
  argTypes: {
    errors: {
      control: false,
      description: 'The errors to show below the input.',
    },
    tag: {
      control: false,
      description: 'The tag can be rendered differently',
    },
    hasError: {
      control: false,
    },
    isValid: {
      control: false,
    },
    clearButtonText: {
      description: 'Can be provided as slot or via prop. Slot wins.',
    },
    'clear-button-text': {
      control: false,
    },
    inputSize: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    tagSize: {
      options: ['tiny', 'small', 'medium', 'large'],
    },
    tagType: {
      options: ['default', 'info', 'warning', 'error', 'success', 'primary'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The component allows to input and manage a list of tags. It provides an intuitive interface with features like tag addition, removal, and clearing, along with customizable input and tag sizes. This component is ideal for scenarios where users need to manage multiple tags or keywords efficiently.',
      },
    },
  },
  render: (args) => ({
    components: { CTagInput, CButton },
    setup() {
      const tagString = ref('');
      const isSubmitTouched = ref(false);
      const isAddTouched = ref(false);
      const tags = ref<string[]>([]);
      const action = fn();
      const isLessThanThreeSymbols = computed(() => tagString.value.length < 3);
      const isAlreadyInTheList = computed(() =>
        tags.value.includes(tagString.value),
      );
      const isLessThanThreeTags = computed(() => tags.value.length < 3);
      const hasError = computed(
        () =>
          (isAddTouched.value &&
            (isLessThanThreeSymbols.value || isAlreadyInTheList.value)) ||
          (isSubmitTouched.value && isLessThanThreeTags.value),
      );

      function submit() {
        isAddTouched.value = false;
        isSubmitTouched.value = true;
      }

      function addTag() {
        isSubmitTouched.value = true;
        isAddTouched.value = true;
      }

      function resetTouched() {
        isSubmitTouched.value = false;
        isAddTouched.value = false;
      }

      return {
        args,
        tagString,
        tags,
        action,
        isLessThanThreeSymbols,
        isAlreadyInTheList,
        isLessThanThreeTags,
        hasError,
        isAddTouched,
        resetTouched,
        submit,
        addTag,
      };
    },
    template: `
      <CTagInput
        id="default-tag-input"
        v-model:tag-string="tagString"
        v-model:tags="tags"
        :input-size="args.medium"
        :has-error="hasError"
        :is-valid="!isLessThanThreeSymbols && !isAlreadyInTheList"
        :clear-button-text="args.clearButtonText"
        @update:tag-string="() => { action(); resetTouched(); }"
        @update:tags="action"
        @add="() => { action(); addTag(); }"
        @remove="() => { action(); resetTouched(); }"
        @blur="() => { action(); resetTouched(); }"
        @clear="() => { action(); resetTouched(); }"
      >
        <template #errors>
          <template v-if="isLessThanThreeTags && !isAddTouched">Please provide at least 3 tags.</template>
          <template v-else-if="isLessThanThreeSymbols">Tag should be at least 3 symbols long.</template>
          <template v-else-if="isAlreadyInTheList">Tag is already in the list.</template>
        </template>
      </CTagInput>
      
      <CButton
        style="margin-top: 24px;"
        @click="submit"
      >Submit</CButton>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    clearButtonText: 'Clear All',
  },
};
