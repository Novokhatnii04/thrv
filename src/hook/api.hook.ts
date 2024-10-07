'use client';

import {
  ERequestContentType,
  ERequestMethod,
  IRequest,
  IResponse,
  IResponseError,
} from '@/api/api.type';
import { apiRoutes, ERequestName } from '@/api/api';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DEBUG, DOMAIN } from '@/config/api';
import { getCookie } from 'cookies-next';

export const useApi = <
  RequestType extends IRequest,
  ResponseType extends IResponse,
>(
  requestName: ERequestName,
  requestData: RequestType | boolean = false,
  async = false,
) => {
  const request = apiRoutes[requestName];
  const state = 'Authenticated';

  const token = getCookie('thrive.auth_token');

  const headers: HeadersInit = useMemo(() => {
    const requestHeaders: HeadersInit =
      request.contentType !== ERequestContentType.FormData
        ? {
            Accept: 'application/json',
            'Content-Type': request.contentType,
          }
        : { Accept: 'application/json' };

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    return requestHeaders;
  }, [request.contentType, token]);

  const [loading, setLoading] = useState<boolean>(!async);
  const [data, setData] = useState<(ResponseType & IResponseError) | undefined>(
    undefined,
  );
  const [responseCode, setResponseCode] = useState<number | undefined>(
    undefined,
  );

  const call = useCallback(
    async (_token: string | null = null) => {
      if (_token) {
        headers.Authorization = `Bearer ${_token}`;
      }

      let requestBody: FormData | string | undefined;
      if (
        request.contentType === ERequestContentType.FormData &&
        typeof requestData !== 'boolean'
      ) {
        const formData = new FormData();

        for (const key in requestData) {
          //@ts-ignore
          formData.append(key, requestData[key]);
        }

        requestBody = formData;
      }

      if (
        request.contentType === ERequestContentType.Json &&
        typeof requestData !== 'boolean'
      ) {
        requestBody = JSON.stringify(requestData);
      }

      let route = request.route;

      if (
        // TODO Test it. get param for post method
        // request.method === ERequestMethod.GET &&
        typeof requestData === 'object'
      ) {
        for (const key in requestData) {
          route = route.replace(`{${key}}`, requestData[key] as string);
        }
      }

      setLoading(true);
      let responseForBugsnag: Response | undefined;
      let rawResponseDataForBugsnag: string | undefined;
      let jsonResponseForBugsnag: object | undefined;

      try {
        if (DEBUG.Api) {
          // eslint-disable-next-line no-console
          console.debug(
            `Start API call: \n\tRoute: ${route}\n\tParams:${JSON.stringify(
              requestData,
            )}`,
          );
        }
        const response = await fetch(DOMAIN + '/' + route, {
          method: request.method,
          headers: headers,
          body: request.method !== ERequestMethod.GET ? requestBody : undefined,
        });

        responseForBugsnag = response;

        // if (state === EAuthState.Authenticated && response.status === 401) {
        //   await logout();
        //   return Promise.reject("Unauthorized");
        // }

        // if (response.status === 403) {
        //   await refetch();
        //   return Promise.reject("No access to this action");
        // }

        rawResponseDataForBugsnag = await response.clone().text();

        if (DEBUG.Api) {
          // eslint-disable-next-line no-console
          console.debug(`Raw response: ${await response.clone().text()}`);
        }

        let responseData;

        try {
          responseData = await response.json();
        } catch (error) {
          return Promise.reject('API error');
        }

        jsonResponseForBugsnag = responseData;

        if (DEBUG.Api) {
          // eslint-disable-next-line no-console
          console.debug(`Response json: ${await response.clone().text()}`);
        }

        setData(responseData);
        setResponseCode(response.status);

        return Promise.resolve({
          data: responseData as ResponseType & IResponseError,
          code: response.status,
        });
      } catch (error) {
        if (DEBUG.Api) {
          // eslint-disable-next-line no-console
          console.debug(`API Error: ${error}`);
        }

        // Bugsnag.notify("Api Error", (event) => {
        //   try {
        //     event.severity = "error";
        //     event.context = "Api call";
        //
        //     if (typeof error !== "undefined") {
        //       event.addMetadata("JS Error", {
        //         error: error,
        //       });
        //     }
        //
        //     event.addMetadata("Request", request);
        //     event.addMetadata(
        //       "Request data",
        //       typeof requestData === "object" ? requestData : {},
        //     );
        //     event.addMetadata("Response", responseForBugsnag || {});
        //     event.addMetadata("Raw response", {
        //       Response: rawResponseDataForBugsnag,
        //     });
        //     event.addMetadata("Json response", jsonResponseForBugsnag || {});
        //   } catch (unknownError) {
        //     console.log(`Unknown Api error: ${unknownError}`);
        //   }
        // });

        return Promise.reject('Api Error');
      } finally {
        setLoading(false);
      }
      // TODO it can be user dep needed here
    },
    [
      headers,
      // logout,
      request.contentType,
      request.method,
      request.route,
      requestData,
      state,
    ],
  );

  useEffect(() => {
    if (!async) {
      try {
        call().then(({ data: responseData, code }) => {
          if (responseData) {
            setData(responseData);
          }
          setResponseCode(code);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [async, call]);

  return { call, loading, data, code: responseCode };
};
