import type { RouteLocationRaw } from 'vue-router';

export interface DashboardNavMeta {
  isSideMenuMinimized: boolean;
  isSideMenuHovered: boolean;
  isSideMenuOpen: boolean;
  isTopMenuOpen: boolean;
  isMobile: boolean;
  viewportWidth: number;
  headerHeight: number;
  sideMenuWidth: number;
  scrollTop: number;
}

export interface DashboardExpandEventMeta {
  key: string;
  value: boolean;
}

export enum DashboardMenuItemType {
  LINK = 'LINK',
  BUTTON = 'BUTTON',
}

export type BooleanOrBooleanFn = boolean | (() => boolean);

interface DashboardMenuItemBase {
  key: string;
  title: string;
  type: DashboardMenuItemType;
  iconName: string;
  to: RouteLocationRaw;
  isHidden?: BooleanOrBooleanFn;
  isActive?: BooleanOrBooleanFn;
}

export type DashboardMenuLinkItem = {
  type: DashboardMenuItemType.LINK;
} & Pick<
  DashboardMenuItemBase,
  'key' | 'title' | 'iconName' | 'to' | 'isActive' | 'isHidden'
>;

export type DashboardMenuSublistItem = Omit<DashboardMenuLinkItem, 'iconName'>;

export type DashboardMenuParentItem = {
  type: DashboardMenuItemType.BUTTON;
  children: DashboardMenuSublistItem[];
} & Pick<DashboardMenuItemBase, 'key' | 'title' | 'iconName' | 'isHidden'>;

export type DashboardMenuTopLevelItem =
  | DashboardMenuParentItem
  | DashboardMenuLinkItem;
export type DashboardMenuItem =
  | DashboardMenuTopLevelItem
  | DashboardMenuSublistItem;

export interface DashboardMenuGroup {
  key: string;
  title?: string;
  isHidden?: BooleanOrBooleanFn;
  children: DashboardMenuTopLevelItem[];
}

export interface DashboardFooterLink {
  id: string;
  text: string;
  url?: string;
}
