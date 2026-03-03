import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAuth, authInterceptor, OpenIdConfiguration } from 'angular-auth-oidc-client';

import { routes } from './app.routes';
import { errorInterceptor } from './_shared/interceptors/error.interceptor';
import { loadingInterceptor } from './_shared/interceptors/loading.interceptor';
import { environment } from '../environments/environment';

const getOidcConfig = (): OpenIdConfiguration => {
  return {
    authority: environment.azureConfig.authority,
    authWellknownEndpointUrl: `${environment.azureConfig.authority}/.well-known/openid-configuration`,
    redirectUrl: `${environment.azureConfig.redirect_uri}`,
    clientId: environment.azureConfig.client_id,
    scope: environment.azureConfig.scope,
    responseType: environment.azureConfig.response_type,
    maxIdTokenIatOffsetAllowedInSeconds: 600,
    issValidationOff: true,
    autoUserInfo: false,
    useRefreshToken: true,
    silentRenew: true,
    ignoreNonceAfterRefresh: true,
    customParamsAuthRequest: {
      prompt: 'select_account',
    },
    secureRoutes: [environment.apiBaseUrl],
    postLogoutRedirectUri: `${window.location.origin}`,
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideToastr({
      timeOut: 20000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor, authInterceptor()])),
    provideAuth({
      config: getOidcConfig(),
    }),
  ],
};
