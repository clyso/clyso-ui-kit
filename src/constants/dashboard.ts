import type { InjectionKey, Ref } from 'vue';
import type { DashboardNavMeta } from '../types/dashboard';
import { VIEWPORT_DESKTOP } from './viewport';

export const DASHBOARD_NAV_META_INJECT_KEY = Symbol('navMeta') as InjectionKey<
  Readonly<Ref<DashboardNavMeta>>
>;
export const DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY = Symbol(
  'updateNavMeta',
) as InjectionKey<(value: Partial<DashboardNavMeta>) => void>;

export const LOCAL_STORAGE_SIDEBAR_MINIMIZED_KEY = '[clyso:sidebar-minimized]';

export const getDefaultNavMeta = (): DashboardNavMeta => ({
  isSideMenuMinimized:
    localStorage.getItem(LOCAL_STORAGE_SIDEBAR_MINIMIZED_KEY) === 'true',
  isSideMenuHovered: false,
  isSideMenuOpen: false,
  isTopMenuOpen: false,
  isMobile: window.innerWidth < VIEWPORT_DESKTOP,
  viewportWidth: window.innerWidth,
  headerHeight: 88,
  sideMenuWidth: 0,
  scrollTop: 0,
});

export const DASHBOARD_SIDEBAR_MOBILE_WIDTH = 256;
export const DASHBOARD_SIDEBAR_WIDTH = 264;
export const DASHBOARD_SIDEBAR_MINIMIZED_WIDTH = 108;
