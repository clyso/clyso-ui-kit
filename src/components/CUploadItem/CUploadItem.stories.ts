import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import CUploadItem from './CUploadItem.vue';
import { type FileUploadItem, FileUploadStatus } from '../../types/upload';

const meta = {
  title: 'Components/UploadItem',
  component: CUploadItem,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; gap: 12px; max-width: 640px"><story/></div>',
    }),
  ],
  argTypes: {
    item: {
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
  } as unknown as Record<string, unknown>,

  parameters: {
    docs: {
      description: {
        component:
          'CUploadItem component is designed to display a file upload item with various statuses and actions. It handles multiple file upload states, such as pending, uploading, success, error, and deletion, and offers retry, cancel, and delete options based on the status of the file.',
      },
    },
  },

  render: (args) => ({
    components: { CUploadItem },
    setup() {
      const uploadItemDefault: FileUploadItem = {
        id: '1',
        file: null,
        name: 'file-default.txt',
        extension: 'txt',
        size: 1200000,
        uploadProgress: 0,
        status: FileUploadStatus.DEFAULT,
        meta: {},
      };
      const uploadItemPending: FileUploadItem = {
        ...uploadItemDefault,
        status: FileUploadStatus.PENDING,
      };
      const uploadItemUploading: FileUploadItem = {
        ...uploadItemDefault,
        status: FileUploadStatus.UPLOADING,
        uploadProgress: 76,
      };
      const uploadItemError: FileUploadItem = {
        ...uploadItemDefault,
        status: FileUploadStatus.ERROR,
        uploadProgress: 27,
      };
      const uploadItemSuccess: FileUploadItem = {
        ...uploadItemDefault,
        status: FileUploadStatus.SUCCESS,
      };
      const uploadItemDeleting: FileUploadItem = {
        ...uploadItemDefault,
        status: FileUploadStatus.DELETING,
      };

      return {
        args,
        uploadItemDefault,
        uploadItemPending,
        uploadItemUploading,
        uploadItemError,
        uploadItemSuccess,
        uploadItemDeleting,
      };
    },
    template: `
      <div>
        <h5 style="margin-bottom: 4px;">DEFAULT</h5>
        <CUploadItem
          :item="uploadItemDefault"
          :has-cancel="args.hasCancel"
          :has-delete="args.hasDelete"
          :has-retry="args.hasRetry"
          @delete="args.onDelete"
          @cancel="args.onCancel"
          @retry="args.onRetry"
        />
      </div>

      <div>
        <h5 style="margin-bottom: 4px;;">PENDING</h5>
        <CUploadItem
          :item="uploadItemPending"
          :has-cancel="args.hasCancel"
          :has-delete="args.hasDelete"
          :has-retry="args.hasRetry"
          @delete="args.onDelete"
          @cancel="args.onCancel"
          @retry="args.onRetry"
        />
      </div>

      <div>
        <h5 style="margin-bottom: 4px;;">UPLOADING</h5>
        <CUploadItem
          :item="uploadItemUploading"
          :has-cancel="args.hasCancel"
          :has-delete="args.hasDelete"
          :has-retry="args.hasRetry"
          @delete="args.onDelete"
          @cancel="args.onCancel"
          @retry="args.onRetry"
        />
      </div>

      <div>
        <h5 style="margin-bottom: 4px;;">ERROR</h5>
        <CUploadItem
          :item="uploadItemError"
          :has-cancel="args.hasCancel"
          :has-delete="args.hasDelete"
          :has-retry="args.hasRetry"
          @delete="args.onDelete"
          @cancel="args.onCancel"
          @retry="args.onRetry"
        />
      </div>

      <div>
        <h5 style="margin-bottom: 4px;;">SUCCESS</h5>
        <CUploadItem
          :item="uploadItemSuccess"
          :has-cancel="args.hasCancel"
          :has-delete="args.hasDelete"
          :has-retry="args.hasRetry"
          @delete="args.onDelete"
          @cancel="args.onCancel"
          @retry="args.onRetry"
        />
      </div>

      <div>
        <h5 style="margin-bottom: 4px;;">DELETING</h5>
        <CUploadItem
          :item="uploadItemDeleting"
          :has-cancel="args.hasCancel"
          :has-delete="args.hasDelete"
          :has-retry="args.hasRetry"
          @delete="args.onDelete"
          @cancel="args.onCancel"
          @retry="args.onRetry"
        />
      </div>
    `,
  }),
} as Meta<typeof CUploadItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDelete: fn(),
    onCancel: fn(),
    onRetry: fn(),
  },
};
