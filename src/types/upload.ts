export enum FileUploadStatus {
  DEFAULT = 'DEFAULT',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  UPLOADING = 'UPLOADING',
  DELETING = 'DELETING',
}

export interface FileUploadItem<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  id: string;
  file: File | null;
  name: string;
  extension: string;
  size: number | null;
  uploadProgress: number;
  status: FileUploadStatus;
  meta: T;
}
