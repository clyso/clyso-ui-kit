import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { fn } from '@storybook/test';
import { GeneralHelper } from '../../helpers/index';
import CUploadList from './CUploadList.vue';
import { type FileUploadItem, FileUploadStatus } from '../../types/upload';
import CUploadDrop from '../CUploadDrop/CUploadDrop.vue';
import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';

const meta = {
  title: 'Components/UploadList',
  component: CUploadList,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="display: grid; max-width: 640px"><story/></div>',
    }),
  ],
  argTypes: {
    items: {
      control: false,
    },
    onDelete: {
      table: {
        disable: true,
      },
    },
    onCancel: {
      table: {
        disable: true,
      },
    },
    onRetry: {
      table: {
        disable: true,
      },
    },
    'pending-text': {
      control: false,
    },
    'error-text': {
      control: false,
    },
    'success-text': {
      control: false,
    },
  },

  parameters: {
    docs: {
      description: {
        component:
          'CUploadList displays a list of uploaded files with options to retry failed uploads, cancel ongoing ones, or delete items.',
      },
    },
  },

  render: (args) => ({
    components: { CUploadDrop, CCollapseTransition, CUploadList },
    setup() {
      const fileUploadItems = ref<FileUploadItem[]>([
        {
          id: GeneralHelper.uniqueId(),
          file: null,
          name: 'file.pdf',
          extension: 'pdf',
          size: 1200022,
          uploadProgress: 0,
          status: FileUploadStatus.ERROR,
          meta: {},
        },
        {
          id: GeneralHelper.uniqueId(),
          file: null,
          name: 'report.txt',
          extension: 'txt',
          size: 555000,
          uploadProgress: 0,
          status: FileUploadStatus.SUCCESS,
          meta: {},
        },
        {
          id: GeneralHelper.uniqueId(),
          file: null,
          name: 'icon-arrow.png',
          extension: 'png',
          size: 2623200,
          uploadProgress: 0,
          status: FileUploadStatus.SUCCESS,
          meta: {},
        },
        {
          id: GeneralHelper.uniqueId(),
          file: null,
          name: 'sea.jpeg',
          extension: 'jpeg',
          size: 8623200,
          uploadProgress: 0,
          status: FileUploadStatus.ERROR,
          meta: {},
        },
      ]);
      const errors = ref<Record<string, string[]>>({
        size: [],
        duplicates: [],
      });
      const MAX_SIZE = 10485760; // 1 MB

      function clearErrors() {
        errors.value.size = [];
        errors.value.duplicates = [];
      }

      function handleFileInput(items: FileUploadItem[]) {
        clearErrors();

        const validFileItems = items.reduce((res, fileItem) => {
          const isDuplicate = fileUploadItems.value.some(
            (existingFileItem) => existingFileItem.name === fileItem.name,
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

        try {
          await new Promise<void>((resolve, reject) => {
            let uploadProgress = 0;
            const interval = setInterval(() => {
              uploadProgress = uploadProgress + Math.floor(5 * Math.random());
              uploadProgress = uploadProgress > 100 ? 100 : uploadProgress;

              setFileItem(id, { uploadProgress: uploadProgress });

              if (uploadProgress === 100) {
                clearInterval(interval);
                (Math.random() > 0.2 ? resolve : reject)();
              }
            }, 100);
          });
          setFileItem(id, { status: FileUploadStatus.SUCCESS });
        } catch {
          setFileItem(id, { status: FileUploadStatus.ERROR });
        }
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
        uploadFileItem,
      };
    },
    template: `
      <CUploadDrop
        style="margin-bottom: 12px"
        :is-multiple="true"
        :has-error="!!errors.duplicates.length || !!errors.size.length"
        :accept="['txt', 'pdf', 'jpg', 'jpeg', 'png']"
        :restrict="['ext', 'bat']"
        @input="event => { handleFileInput(event); }"
        @click="clearErrors"
      >
        <template #text>
         Drag and drop your files here.
        </template>

        <template #drop-text>
          Drop your files here.
        </template>

        <template #meta>
          Accepted formats: {{ ['txt', 'pdf', 'jpg', 'jpeg', 'png'].join(', ') }}.
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
        :has-cancel="args.hasCancel"
        :has-delete="args.hasDelete"
        :has-retry="args.hasRetry"
        @delete="handleFileDelete"
        @cancel="handleFileDelete"
        @retry="fileItem => uploadFileItem(fileItem.id)"
      />
    `,
  }),
} as Meta<typeof CUploadList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDelete: fn(),
    onCancel: fn(),
    onRetry: fn(),
  },
};
