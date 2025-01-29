<script setup lang="ts">
  import {
    darkTheme,
    deDE,
    enUS,
    dateDeDE,
    dateEnUS,
    lightTheme,
    NConfigProvider,
    type GlobalThemeOverrides,
  } from 'naive-ui';
  import { computed } from 'vue';
  import { ColorScheme } from '../../types/theme';
  import {
    darkThemeOverrides,
    lightThemeOverrides,
  } from '../../constants/theme';
  import { I18nLocale } from '../../types/i18n';
  import { I18N_DEFAULT_LOCALE } from '../../constants';

  interface Props {
    /**
     * Color scheme: dark or light
     */
    colorScheme: ColorScheme;
    /**
     * Global locale
     */
    locale?: string;
    /**
     * Variables to override dark theme
     */
    customDarkTheme?: GlobalThemeOverrides;
    /**
     * Variables to override light theme
     */
    customLightTheme?: GlobalThemeOverrides;
  }

  const props = withDefaults(defineProps<Props>(), {
    locale: I18N_DEFAULT_LOCALE,
    customDarkTheme: undefined,
    customLightTheme: undefined,
  });

  const theme = computed(() =>
    props.colorScheme === ColorScheme.DARK ? darkTheme : lightTheme,
  );
  const themeOverrides = computed(() => {
    if (props.colorScheme === ColorScheme.DARK) {
      return props.customDarkTheme ?? darkThemeOverrides;
    }

    return props.customLightTheme ?? lightThemeOverrides;
  });

  const locale = computed(() => {
    if (props.locale === I18nLocale.DE) {
      return deDE;
    }

    return enUS;
  });
  const dateLocale = computed(() => {
    if (props.locale === I18nLocale.DE) {
      return dateDeDE;
    }

    return dateEnUS;
  });
</script>

<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
    cls-prefix="c"
  >
    <slot></slot>
  </NConfigProvider>
</template>
