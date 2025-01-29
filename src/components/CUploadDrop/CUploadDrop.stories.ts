import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import { GeneralHelper } from '../../helpers/index';
import CUploadList from '../CUploadList/CUploadList.vue';
import { type FileUploadItem, FileUploadStatus } from '../../types/upload';
import CUploadDrop from './CUploadDrop.vue';
import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';

const meta: Meta<typeof CUploadDrop> = {
  title: 'Components/UploadDrop',
  component: CUploadDrop,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="display: grid; max-width: 640px"><story/></div>',
    }),
  ],
  argTypes: {
    onInput: {
      table: {
        disable: true,
      },
    },
    default: {
      control: false,
    },
    'text-content': {
      control: false,
    },
    text: {
      control: false,
    },
    'drop-text': {
      control: false,
    },
    meta: {
      control: false,
    },
  },

  parameters: {
    docs: {
      description: {
        component:
          'CUploadDrop is a file upload component that allows users to select or drag and drop files for upload. It supports multiple file selection, error states, and file type restrictions. The component provides visual feedback when files are dragged over and includes slots for customizing the displayed text and metadata.',
      },
    },
  },

  render: (args) => ({
    components: { CUploadDrop, CCollapseTransition, CUploadList },
    setup() {
      const fileUploadItems = ref<FileUploadItem[]>([]);
      const errors = ref<Record<string, string[]>>({
        size: [],
        duplicates: [],
      });
      const MAX_SIZE = 1048576; // 1 MB

      function clearErrors() {
        errors.value.size = [];
        errors.value.duplicates = [];
      }

      function handleFileInput(items: FileUploadItem[]) {
        clearErrors();

        const validFileItems = items.reduce((res, fileItem) => {
          const isDuplicate = fileUploadItems.value.some(
            (exisitingFileItem) => exisitingFileItem.name === fileItem.name,
          );
          const isSizeExceeded = fileItem.size > 1000000;

          if (isDuplicate) {
            errors.value.duplicates.push(fileItem.name);

            return res;
          }

          if (isSizeExceeded) {
            errors.value.size.push(fileItem.name);

            return res;
          }

          return [...res, fileItem];
        }, []);

        fileUploadItems.value.push(...validFileItems);
        uploadFileItems(validFileItems.map((item) => item.id));
      }

      function uploadFileItems(ids: string[]) {
        ids.forEach(uploadFileItem);
      }

      async function uploadFileItem(id: string) {
        setFileItem(id, { status: FileUploadStatus.UPLOADING });

        await new Promise<void>((resolve) => {
          let uploadProgress = 0;
          const interval = setInterval(() => {
            uploadProgress = uploadProgress + Math.floor(5 * Math.random());
            uploadProgress = uploadProgress > 100 ? 100 : uploadProgress;

            setFileItem(id, { uploadProgress: uploadProgress });

            if (uploadProgress === 100) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });

        setFileItem(id, { status: FileUploadStatus.SUCCESS });
      }

      function setFileItem(
        id: string,
        fileUploadItem: Partial<FileUploadItem>,
      ) {
        const fileUploadItemIndex = fileUploadItems.value.findIndex(
          (item) => item.id === id,
        );

        if (fileUploadItemIndex === -1) {
          return;
        }

        fileUploadItems.value.splice(fileUploadItemIndex, 1, {
          ...fileUploadItems.value[fileUploadItemIndex],
          ...fileUploadItem,
        });
      }

      function handleFileDelete({ id }: FileUploadItem) {
        const fileUploadItemIndex = fileUploadItems.value.findIndex(
          (item) => item.id === id,
        );

        if (fileUploadItemIndex === -1) {
          return;
        }

        fileUploadItems.value.splice(fileUploadItemIndex, 1);
      }

      return {
        args,
        handleFileInput,
        fileUploadItems,
        errors,
        clearErrors,
        MAX_SIZE,
        handleFileDelete,
        GeneralHelper,
      };
    },
    template: `
      <CUploadDrop
        style="margin-bottom: 12px"
        :is-multiple="args.isMultiple"
        :has-error="args.hasError || !!errors.duplicates.length || !!errors.size.length"
        :is-disabled="args.isDisabled"
        :accept="args.accept"
        :restrict="args.restrict"
        @input="event => { handleFileInput(event); }"
        @click="clearErrors"
      >
        <template #text>
          <template v-if="args.isMultiple">Drag and drop your files here.</template>
          <template v-else>Drag and drop your file here.</template>
        </template>

        <template #drop-text>
          <template v-if="args.isMultiple">Drop your files here.</template>
          <template v-else>Drop your file here.</template>
        </template>

        <template #meta>
          <template v-if="args.accept?.length">Accepted formats: {{ args.accept.join(', ') }}. </template>
          Max size: {{ GeneralHelper.formatBytes(MAX_SIZE) }}
        </template>
      </CUploadDrop>

      <CCollapseTransition
        style="margin-bottom: 12px"
        :show="errors.size.lenth !== 0 || errors.duplicates.lenth !== 0">
        <div
          style="color: var(--error-color)"
          v-if="errors.duplicates.length || errors.size.length">
          <div v-if="errors.duplicates.length">
            Files already exist: {{ errors.duplicates.join(', ') }}
          </div>
          <div v-if="errors.size.length">
            Files exceed 1 MB size limit: {{ errors.size.join(', ') }}
          </div>
        </div>
      </CCollapseTransition>

      <CUploadList
        :items="fileUploadItems"
        :has-cancel="false"
        @delete="handleFileDelete"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasError: false,
    isMultiple: true,
    isDisabled: false,
    accept: ['jpg', 'jpeg'],
    restrict: ['.exe', '.bat'],
    onInput: fn(),
  },
};
