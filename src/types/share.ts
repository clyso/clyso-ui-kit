export type ShareMedia =
  | 'copyLink'
  | 'telegram'
  | 'whatsapp'
  | 'xTwitter'
  | 'facebook';
export type ShareDataObject = {
  title?: string;
  text?: string;
  url: string;
};
export type ShareData = ShareDataObject | (() => Promise<ShareDataObject>);
