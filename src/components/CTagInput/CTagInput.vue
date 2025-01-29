<script setup lang="ts">
  import CButton from '../CButton/CButton.vue';
  import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CInput from '../CInput/CInput.vue';
  import CInputGroup from '../CInputGroup/CInputGroup.vue';
  import CTag from '../CTag/CTag.vue';

  const props = withDefaults(
    defineProps<{
      /**
       * Array of tags that have been inputted by the user.
       */
      tags: string[];

      /**
       * The current input string for a new tag.
       */
      tagString: string;

      /**
       * Unique identifier for the `TagInput` component.
       */
      id?: string;

      /**
       * Indicates whether the input is valid.
       */
      isValid?: boolean;

      /**
       * Indicates whether the `TagInput` component is disabled.
       */
      isDisabled?: boolean;

      /**
       * Indicates whether there is an error in the input.
       */
      hasError?: boolean;

      /**
       * The text displayed on the button used to clear all tags.
       */
      clearButtonText?: string;

      /**
       * The placeholder text for the input field.
       */
      placeholder?: string;

      /**
       * The size of the input field.
       * Can be `'tiny'`, `'small'`, `'medium'`, or `'large'`.
       */
      inputSize?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * The size of the tags displayed.
       * Can be `'tiny'`, `'small'`, `'medium'`, or `'large'`.
       */
      tagSize?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * The type of the tags displayed.
       * Can be `'default'`, `'info'`, `'warning'`, `'error'`, `'success'`, or `'primary'`.
       */
      tagType?:
        | 'default'
        | 'info'
        | 'warning'
        | 'error'
        | 'success'
        | 'primary';
    }>(),
    {
      id: undefined,
      isValid: true,
      isDisabled: false,
      hasError: false,
      clearButtonText: 'Clear All',
      placeholder: 'Tag',
      inputSize: 'large',
      tagSize: 'medium',
      tagType: 'default',
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when a new tag is added.
     */
    (e: 'add', value: string): void;

    /**
     * Emitted when an existing tag is removed.
     */
    (e: 'remove', value: string): void;

    /**
     * Emitted when the list of tags is updated.
     */
    (e: 'update:tags', value: string[]): void;

    /**
     * Emitted when the input string for a tag is updated.
     */
    (e: 'update:tagString', value: string): void;

    /**
     * Emitted when all tags are cleared.
     */
    (e: 'clear'): void;

    /**
     * Emitted when the input field loses focus.
     */
    (e: 'blur'): void;
  }>();

  function updateTagString(tagString: string) {
    emit('update:tagString', tagString);
  }

  function addTag() {
    emit('add', props.tagString);

    if (props.isDisabled || props.hasError || !props.isValid) {
      return;
    }

    emit('update:tags', [...props.tags, props.tagString]);
    emit('update:tagString', '');
  }

  function removeTag(index: number) {
    const tagToRemove = props.tags[index];

    if (!tagToRemove || props.isDisabled) {
      return;
    }

    const newTags = [...props.tags];

    newTags.splice(index, 1);

    emit('remove', tagToRemove);
    emit('update:tags', newTags);
  }

  function clearAll() {
    if (props.isDisabled) {
      return;
    }

    emit('clear');
    emit('update:tags', []);
  }
</script>

<template>
  <div class="c-tag-input">
    <div class="c-tag-input__control">
      <CInputGroup size="large">
        <CInput
          :id="id"
          :value="tagString"
          :size="inputSize"
          clearable
          :disabled="isDisabled"
          :has-error="hasError"
          placeholder="Tag"
          @update:value="updateTagString"
          @keydown.enter.prevent="addTag"
          @blur="() => emit('blur')"
        />
        <CButton
          secondary
          :size="inputSize"
          :disabled="isDisabled"
          :type="hasError ? 'error' : 'primary'"
          @click="addTag"
          @blur="() => emit('blur')"
        >
          <template #icon>
            <CIcon
              name="add"
              :is-inline="true"
            />
          </template>
        </CButton>
      </CInputGroup>

      <CCollapseTransition
        class="c-tag-input__errors-wrapper"
        :show="hasError && $slots.errors !== undefined"
      >
        <div
          class="c-tag-input__errors"
          aria-live="polite"
        >
          <slot name="errors"></slot>
        </div>
      </CCollapseTransition>
    </div>

    <CCollapseTransition
      class="c-tag-input__tags"
      :show="tags.length > 0"
    >
      <div
        v-if="tags.length > 0"
        class="c-tag-input__tags-list"
      >
        <div
          v-for="(tag, index) in tags"
          :key="tag"
          class="c-tag-input__tag-item"
        >
          <slot
            name="tag"
            v-bind="{
              tag,
              index,
              removeTag,
              isDisabled,
              tagType,
              tagSize,
            }"
          >
            <CTag
              :closable="!isDisabled"
              :type="tagType"
              :size="tagSize"
              @close="() => removeTag(index)"
            >
              {{ tag }}
            </CTag>
          </slot>
        </div>

        <CButton
          v-if="!isDisabled"
          quaternary
          size="tiny"
          @click="clearAll"
        >
          <template #icon>
            <CIcon
              name="close"
              :is-inline="true"
            />
          </template>
          <slot name="clear-button-text">
            {{ clearButtonText }}
          </slot>
        </CButton>
      </div>
    </CCollapseTransition>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-tag-input {
    &__tags {
      margin-top: utils.unit(3);
    }

    &__tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: utils.unit(2);
      width: 50%;
      min-width: min(600px, 100%);
      align-items: center;
    }

    &__errors-wrapper {
      margin-top: utils.unit(1);
    }

    &__errors {
      color: var(--error-color);
      font-size: 12px;
      line-height: 1.3;
    }
  }
</style>
