export default class GqlRequest {
  operationName? = '';
  query = '';
  variables?: { readonly [variable: string]: unknown };
}
