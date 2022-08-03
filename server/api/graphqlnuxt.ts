import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import GqlRequest from '~~/models/GqlRequest';

const queryGqlType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    properties: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      resolve: () => {
        return ['test1', 'test2'];
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryGqlType });

export default defineEventHandler(async event => {
  const body = (await useBody(event)) as GqlRequest;
  if (!body) {
    throw new Error('GraphQL request must have a body');
  }

  return await graphql({
    schema,
    source: body.query,
    operationName: body.operationName,
    variableValues: body.variables,
    contextValue: event.context,
  });
});
