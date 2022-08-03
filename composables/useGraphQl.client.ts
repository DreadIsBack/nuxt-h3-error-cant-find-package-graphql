import GqlRequest from '@/models/GqlRequest';
import { FetchOptions } from 'ohmyfetch';

const klFetch = async <ResT>(request: RequestInfo, opts?: FetchOptions | undefined) => {
  let additionalOpts: FetchOptions = {};

  let contentTypeHeader: any | undefined = undefined;
  if (opts && opts.body) {
    contentTypeHeader = {
      'Content-Type': 'application/json',
    };
  }

  let authorizationHeader: any | undefined = undefined;

  additionalOpts = {
    headers: {
      ...contentTypeHeader,
      ...authorizationHeader,
    },
  } as FetchOptions;

  return $fetch<ResT>(request, { ...opts, ...additionalOpts });
};

const klFetchPost = async <ResT>(request: RequestInfo, body?: object | undefined | null) => {
  return klFetch<ResT>(request, { method: 'post', body: body });
};

export const useGraphQlNuxt = async <ResT>(request: GqlRequest) => {
  return klFetchPost<ResT>('/api/graphqlnuxt', request).then(response => {
    if (response.errors) {
      const message = `GraphQL errors: ${JSON.stringify(response.errors)}`;
      console.error(message);
      throw new Error(message);
    } else {
      return response;
    }
  });
};
