import {APIGatewayProxyEventV2} from 'aws-lambda';

export type {APIGatewayProxyResultV2} from 'aws-lambda';

export type AuthorizedEvent = APIGatewayProxyEventV2 & {
  headers: {
    authorization: string;
  };
};
