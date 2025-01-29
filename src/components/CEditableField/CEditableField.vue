<script setup lang="ts">
  import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CInput from '../CInput/CInput.vue';
  import CTooltip from '../CTooltip/CTooltip.vue';
  import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';

  const props = withDefaults(
    defineProps<{
      /**
       * The current value of the editable field.
       */
      value: string;

      /**
       * Whether the field is editable.
       */
      isEditable?: boolean;

      /**
       * Placeholder text for the input when it's empty.
       */
      placeholder?: string;

      /**
       * Handler function executed when the value is saved. Can be synchronous or return a promise.
       */
      saveHandler?: (value: string) => void | Promise<void>;

      /**
       * The width of the input field.
       */
      inputWidth?: number;

      /**
       * Timeout (in ms) for stopping editing when the input loses focus.
       */
      blurTimeoutMs?: number;

      /**
       * Timeout (in ms) for resetting the saved state.
       */
      savedTimeoutMs?: number;

      /**
       * Timeout (in ms) for resetting the error state.
       */
      errorTimeoutMs?: number;

      /**
       * Whether to display tooltips for the save and edit buttons.
       */
      hasTooltips?: boolean;

      /**
       * Whether to align the text to the left.
       */
      isAlignedLeft?: boolean;

      /**
       * Custom validation functions for the input value.
       * Can contain multiple validators which return true/false based on the validity of the value.
       */
      validators?: Record<string, (value: string) => boolean> | null;
    }>(),
    {
      isEditable: true,
      placeholder: '',
      saveHandler: undefined,
      inputWidth: 300,
      blurTimeoutMs: 300,
      savedTimeoutMs: 2500,
      errorTimeoutMs: 1500,
      hasTooltips: false,
      isAlignedLeft: false,
      validators: null,
    },
  );

  onMounted(() => {
    setWidth();
  });

  const input = ref<InstanceType<typeof CInput> | null>(null);
  const text = ref<HTMLElement | null>(null);
  const field = ref<HTMLElement | null>(null);
  const controls = ref<HTMLElement | null>(null);
  const width = ref<number>(0);
  const fieldWidth = ref<number>(0);
  const controlsWidth = ref<number>(0);

  const editableValue = ref('');
  const isEditMode = ref(false);
  const timeout = ref<number | null>(null);
  const isSaveFocused = ref(false);

  const isSaving = ref(false);
  const isSaved = ref(false);
  const hasError = ref(false);
  const isErrorMessageShown = ref(false);

  const validation = computed<{ isValid: boolean; errors: string[] }>(() => {
    if (!props.validators || !isEditMode.value) {
      return { isValid: true, errors: [] };
    }

    return Object.entries(props.validators).reduce<{
      isValid: boolean;
      errors: string[];
    }>(
      (acc, [validatorName, validatorFn]) => {
        const isValid = validatorFn(editableValue.value);

        return {
          isValid: isValid ? acc.isValid : false,
          errors: !isValid ? [...acc.errors, validatorName] : acc.errors,
        };
      },
      { isValid: true, errors: [] },
    );
  });
  const isValid = computed(() => validation.value.isValid);
  const errors = computed(() => validation.value.errors);
  const isTouched = ref(false);

  const hasInputError = computed(
    () => isErrorMessageShown.value || (!isValid.value && isTouched.value),
  );

  const valueStyle = computed<Record<string, string>>(() => {
    const maxWidth = fieldWidth.value - controlsWidth.value;
    const editWidth =
      width.value > props.inputWidth ? width.value : props.inputWidth;
    const sanitizedEditWidth =
      maxWidth && editWidth > maxWidth ? maxWidth : editWidth;
    const sanitizedTextWidth =
      maxWidth && width.value > maxWidth ? maxWidth : width.value;

    return {
      minWidth: `${isEditMode.value ? sanitizedEditWidth : sanitizedTextWidth}px`,
    };
  });

  onMounted(() => {
    window.addEventListener('resize', setWidth);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', setWidth);
  });

  function initEditMode() {
    setWidth();
    isEditMode.value = true;
    editableValue.value = props.value;
    focusInput();
  }

  function focusInput() {
    nextTick(() => input.value?.focus());
  }

  function stopEditMode() {
    if (isSaving.value || isSaveFocused.value) {
      return;
    }

    isEditMode.value = false;
    hasError.value = false;
    isTouched.value = false;
    isErrorMessageShown.value = false;
    editableValue.value = '';
    nextTick(setWidth);
    clearStopEditModeTimeout();
  }

  function timeoutStopEditMode() {
    timeout.value = window.setTimeout(stopEditMode, props.blurTimeoutMs);
  }

  function clearStopEditModeTimeout() {
    if (!timeout.value) {
      return;
    }

    window.clearTimeout(timeout.value);
  }

  function handleFocus() {
    clearStopEditModeTimeout();
  }

  function setWidth() {
    width.value = text.value?.offsetWidth ?? width.value;
    fieldWidth.value = field.value?.offsetWidth ?? fieldWidth.value;
    controlsWidth.value = controls.value?.offsetWidth ?? controlsWidth.value;
  }

  const isSaveDisabled = computed(
    () =>
      (editableValue.value === props.value && isEditMode.value) ||
      (!isValid.value && isTouched.value),
  );

  async function save() {
    if (
      isSaveDisabled.value ||
      isSaving.value ||
      isSaved.value ||
      !isEditMode.value ||
      hasError.value
    ) {
      return;
    }

    clearStopEditModeTimeout();
    isTouched.value = true;

    if (!isValid.value) {
      focusInput();

      return;
    }

    isSaving.value = true;

    try {
      await props.saveHandler?.(editableValue.value);
      isSaved.value = true;
      timeoutResetSavedStatus();
      isSaving.value = false;
      stopEditMode();
    } catch {
      isSaving.value = false;
      hasError.value = true;
      isErrorMessageShown.value = true;
      timeoutResetErrorStatus();
      focusInput();
    }
  }

  function timeoutResetSavedStatus() {
    window.setTimeout(() => {
      isSaved.value = false;
    }, props.savedTimeoutMs);
  }

  function timeoutResetErrorStatus() {
    window.setTimeout(() => {
      hasError.value = false;
    }, props.errorTimeoutMs);
  }

  function handleSaveBlur() {
    isSaveFocused.value = false;
    timeoutStopEditMode();
  }

  function handleInput() {
    isErrorMessageShown.value = false;
  }
</script>

<template>
  <div
    ref="field"
    class="c-editable-field"
    :class="{ 'c-editable-field--aligned-left': isAlignedLeft }"
  >
    <div class="c-editable-field__control">
      <div
        class="c-editable-field__value"
        :style="valueStyle"
      >
        <CInput
          v-if="isEditMode && isEditable"
          ref="input"
          v-model:value="editableValue"
          :disabled="isSaving"
          :has-error="hasInputError"
          class="c-editable-field__input"
          :placeholder="placeholder"
          @blur="timeoutStopEditMode"
          @focus="handleFocus"
          @keydown.enter="save"
          @keyup.esc="stopEditMode"
          @input="handleInput"
        />
        <span
          v-else
          ref="text"
          class="c-editable-field__text"
        >
          <template v-if="value">
            <slot name="value">
              {{ value }}
            </slot>
          </template>
          <template v-else>
            <slot name="value-empty"> — </slot>
          </template>
        </span>
      </div>

      <div
        v-if="isEditable"
        ref="controls"
        class="c-editable-field__controls"
      >
        <Transition
          :name="isEditMode || isSaved ? undefined : 'opacity'"
          mode="out-in"
        >
          <div
            v-if="isEditMode || isSaved"
            key="save"
          >
            <CTooltip
              :disabled="!hasTooltips"
              :delay="500"
            >
              <template #trigger>
                <CButton
                  secondary
                  size="small"
                  :type="hasError ? 'error' : 'success'"
                  :disabled="isSaveDisabled"
                  :loading="isSaving"
                  class="c-editable-field__save-button"
                  :class="{
                    'c-editable-field__save-button--processing':
                      isSaving || isSaved || hasError,
                  }"
                  circle
                  @click="save"
                  @focus="isSaveFocused = true"
                  @blur="handleSaveBlur"
                >
                  <template #icon>
                    <CIcon
                      v-if="isSaved"
                      class="c-editable-field__saved-status-icon"
                      :is-inline="true"
                      name="checkmark"
                    />
                    <CIcon
                      v-else-if="hasError"
                      class="c-editable-field__error-status-icon"
                      :is-inline="true"
                      name="close"
                    />
                    <CIcon
                      v-else
                      :is-inline="true"
                      name="save"
                    />
                  </template>
                </CButton>
              </template>

              <template v-if="isSaved">
                <slot name="tooltip-saved-message"> Saved </slot>
              </template>
              <template v-else-if="hasError">
                <slot name="tooltip-error-message"> Error </slot>
              </template>
              <template v-else>
                <slot name="tooltip-save-button"> Save </slot>
              </template>
            </CTooltip>
          </div>

          <div
            v-else
            key="edit"
          >
            <CTooltip
              :disabled="!hasTooltips"
              :delay="500"
            >
              <template #trigger>
                <CButton
                  quaternary
                  size="small"
                  circle
                  class="c-editable-field__edit-button"
                  @click="initEditMode"
                >
                  <template #icon>
                    <CIcon
                      :is-inline="true"
                      name="pencil"
                    />
                  </template>
                </CButton>
              </template>

              <slot name="tooltip-edit-button"> Edit </slot>
            </CTooltip>
          </div>
        </Transition>
      </div>
    </div>

    <CCollapseTransition :show="hasInputError && Boolean($slots.error)">
      <div
        v-if="hasInputError && $slots.error"
        class="c-editable-field__error"
      >
        <slot
          name="error"
          v-bind="{ errors }"
        ></slot>
      </div>
    </CCollapseTransition>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-editable-field {
    &--aligned-left {
      .c-editable-field__text {
        animation: padding 0.1s forwards;

        @keyframes padding {
          100% {
            padding-left: 0;
          }
        }
      }
    }

    &__control {
      display: flex;
      align-items: center;
    }

    &__value {
      transition: min-width 0.1s;
      min-width: 0;
      @include utils.ellipsis;
    }

    &__text {
      line-height: 34px;
      white-space: nowrap;
      padding: 0 utils.unit(3);
    }

    &__input {
      width: 100%;
    }

    &__controls {
      display: flex;
      align-items: center;
      gap: utils.unit(1);
      padding-left: utils.unit(3);
    }

    &__save-button {
      &--processing {
        cursor: wait;
      }
    }

    &__error-status-icon,
    &__saved-status-icon {
      stroke-dasharray: 512;
      stroke-dashoffset: 512;
      animation: draw 0.5s forwards utils.$transition-duration;

      @keyframes draw {
        100% {
          stroke-dashoffset: 0;
        }
      }
    }

    &__error-status-icon {
      width: 18px;
      height: 18px;
    }

    &__saved-status-icon {
      width: 20px;
      height: 20px;
    }

    &__error {
      color: var(--error-color);
      font-size: 12px;
      padding-top: utils.unit(1);
    }
  }
</style>
