import { HttpClient } from '@wix/http-client';

const baseURL = window.location.origin + window.__BASEURL__;

export const httpClient = new HttpClient({ baseURL });

export * from '@wix/http-client';
