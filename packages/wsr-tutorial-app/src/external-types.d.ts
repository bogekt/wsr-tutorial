/// <reference types="@wix/yoshi/types" />
/// <reference types="@wix/jest-yoshi-preset/types" />
/// <reference types="@wix/wix-bootstrap-renderer/declarations" />
/// <reference types="@wix/wix-bootstrap-ng/typed" />

interface Window {
  __LOCALE__: string;
  __BASEURL__: string;
  __MESSAGES__: Messages;
}

declare module '@wix/wix-node-i18n-cache';
