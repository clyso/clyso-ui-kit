import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import CButton from '../CButton/CButton.vue';
import CNotificationProvider from './CNotificationProvider.vue';
import CShortList from '../CShortList/CShortList.vue';
import CSwitch from '../CSwitch/CSwitch.vue';
import CInputNumber from '../CInputNumber/CInputNumber.vue';
import CDescriptionList from '../CDescriptionList/CDescriptionList.vue';
import CDescriptionItem from '../CDescriptionItem/CDescriptionItem.vue';
import CInput from '../CInput/CInput.vue';
import useNotification from '../../composables/useNotification';

const meta: Meta<typeof CNotificationProvider> = {
  title: 'Components/NotificationProvider',
  component: CNotificationProvider,
  tags: ['autodocs'],

  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 400px">
        <story/>
        <div style="min-height: 700px"></div>
      </div>`,
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Manages and displays notifications across the application. It provides a centralized way to trigger and control notifications, ensuring consistency in appearance and behavior.',
      },
    },
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: {
      CNotificationProvider,
      CButton,
      CShortList,
      CSwitch,
      CDescriptionList,
      CDescriptionItem,
      CInputNumber,
      CInput,
    },
    setup() {
      const { createNotification, removeNotification } = useNotification();

      const isAliveOnHover = ref(true);
      const isDurationProgressShown = ref(true);
      const duration = ref<number | null>(8000);
      const isClosable = ref(true);
      const hasIcon = ref(true);
      const iconName = ref('');
      const hasPositive = ref(true);
      const hasNegative = ref(true);

      function createInfoNotification() {
        const infoNotification = createNotification({
          type: 'info',
          title: 'More details here!',
          positiveText: 'Got it!',
          negativeText: 'Cancel',
          positiveHandler: () => {
            removeNotification(infoNotification.value.id);
          },
          negativeHandler: () => {
            removeNotification(infoNotification.value.id);
          },
          isClosable: isClosable.value,
          hasIcon: hasIcon.value,
          iconName: iconName.value || undefined,
          duration: duration.value,
          isAliveOnHover: isAliveOnHover.value,
          isDurationProgressShown: isDurationProgressShown.value,
          hasPositive: hasPositive.value,
          hasNegative: hasNegative.value,
          content: () =>
            h('div', [
              'Here is a list of 10 users currently active in the system. Review their activity if needed: ',
              h(CShortList, {
                list: [
                  'Alice Johnson',
                  'Michael Smith',
                  'Sophie Brown',
                  'David Miller',
                  'Emma Wilson',
                  'James Anderson',
                  'Olivia Martinez',
                  'Benjamin Taylor',
                  'Charlotte White',
                  'Daniel Harris',
                ],
                itemKey: (item) => item as string,
              }),
            ]),
        });
      }

      function createWarningNotification() {
        const infoNotification = createNotification({
          type: 'warning',
          title: 'Warning',
          positiveText: 'OK',
          negativeText: 'Cancel',
          positiveHandler: () => {
            removeNotification(infoNotification.value.id);
          },
          negativeHandler: () => {
            removeNotification(infoNotification.value.id);
          },
          isClosable: isClosable.value,
          hasIcon: hasIcon.value,
          iconName: iconName.value || undefined,
          duration: duration.value,
          isAliveOnHover: isAliveOnHover.value,
          isDurationProgressShown: isDurationProgressShown.value,
          hasPositive: hasPositive.value,
          hasNegative: hasNegative.value,
          content:
            'Warning notification content is displayed here. You can specify anything you want here.',
        });
      }

      function createErrorNotification() {
        const infoNotification = createNotification({
          type: 'error',
          title: 'Deletion Failed!',
          positiveText: 'Retry Deletion',
          negativeText: 'Cancel',
          positiveHandler: () => {
            alert('Deletion Retry');
            removeNotification(infoNotification.value.id);
            createSuccessNotification();
          },
          negativeHandler: () => {
            removeNotification(infoNotification.value.id);
          },
          isClosable: isClosable.value,
          hasIcon: hasIcon.value,
          iconName: iconName.value || undefined,
          duration: duration.value,
          isAliveOnHover: isAliveOnHover.value,
          isDurationProgressShown: isDurationProgressShown.value,
          hasPositive: hasPositive.value,
          hasNegative: hasNegative.value,
          content: () =>
            h('div', [
              'Here is the list of 10 users that failed to be deleted: ',
              h(CShortList, {
                list: [
                  'Alice Johnson',
                  'Michael Smith',
                  'Sophie Brown',
                  'David Miller',
                  'Emma Wilson',
                  'James Anderson',
                  'Olivia Martinez',
                  'Benjamin Taylor',
                  'Charlotte White',
                  'Daniel Harris',
                ],
                itemKey: (item) => item as string,
              }),
            ]),
        });
      }

      function createSuccessNotification() {
        const infoNotification = createNotification({
          type: 'success',
          title: 'Warning',
          positiveText: 'Hooray!',
          negativeText: 'Cancel',
          positiveHandler: () => {
            removeNotification(infoNotification.value.id);
          },
          negativeHandler: () => {
            removeNotification(infoNotification.value.id);
          },
          isClosable: isClosable.value,
          hasIcon: hasIcon.value,
          iconName: iconName.value || undefined,
          duration: duration.value,
          isAliveOnHover: isAliveOnHover.value,
          isDurationProgressShown: isDurationProgressShown.value,
          hasPositive: hasPositive.value,
          hasNegative: hasNegative.value,
          content: 'The users have been successfully deleted!',
        });
      }

      return {
        args,
        createInfoNotification,
        createWarningNotification,
        createErrorNotification,
        createSuccessNotification,
        isAliveOnHover,
        isDurationProgressShown,
        duration,
        isClosable,
        hasIcon,
        iconName,
        hasPositive,
        hasNegative,
      };
    },
    template: `
      <CNotificationProvider/>

      <div style="display: flex; gap: 12px; padding: 12px;">
        <CButton
          type="info"
          @click="createInfoNotification">Info</CButton>
        <CButton
          type="warning"
          @click="createWarningNotification">Warning</CButton>
        <CButton
          type="error"
          @click="createErrorNotification">Error</CButton>
        <CButton
          type="success"
          @click="createSuccessNotification">Success</CButton>
      </div>
      <div style="padding: 12px;">
        <CDescriptionList
          label-placement="left"
          label-alignment="center"
          columns="1">
          <CDescriptionItem>
            <template #label>isAliveOnHover (default: true)</template>

            <CSwitch v-model:value="isAliveOnHover"/>
          </CDescriptionItem>

          <CDescriptionItem>
            <template #label>isDurationProgressShown (default: true)</template>

            <CSwitch v-model:value="isDurationProgressShown"/>
          </CDescriptionItem>

          <CDescriptionItem>
            <template #label>isClosable (default: true)</template>

            <CSwitch v-model:value="isClosable"/>
          </CDescriptionItem>

          <CDescriptionItem>
            <template #label>duration (default: 8000ms)</template>

            <CInputNumber size="small" v-model:value="duration"/>
          </CDescriptionItem>

          <CDescriptionItem>
            <template #label>hasIcon (default: true)</template>

            <CSwitch v-model:value="hasIcon" />
          </CDescriptionItem>

          <CDescriptionItem
            v-if="hasIcon"
            size="large">
            <template #label>iconName (default: depends on type)</template>

            <CInput v-model:value="iconName" placeholder="person"/>
          </CDescriptionItem>

          <CDescriptionItem>
            <template #label>hasPositive (default: true)</template>

            <CSwitch v-model:value="hasPositive" />
          </CDescriptionItem>

          <CDescriptionItem>
            <template #label>hasNegative (default: true)</template>

            <CSwitch v-model:value="hasNegative" />
          </CDescriptionItem>
        </CDescriptionList>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
