/*
 *`ALL NETWORK API REQUESTS AND INTERCEPTOR BUILDER
 * @method POST - http verb for request
 * @method GET - http verb for get
 * @method DELETE - http verb for delete
 * @method PUT - http verb for update
 * @GET - send a get request to the server
 * @POST - send a post request to the server
 * @DELETE - send a delete request to the server
 * @PUT - send a put request to the server
 */

import ENV_VARIABLES, { ENV_VARIABLES_TYPES } from '../../config';

type POST_TYPES = {
  path: string;
  payload: any;
  authToken: string;
  apiVersion?: string;
};

class API {
  private BASE_URL: string;
  private API_VERSION: string;

  constructor(ENV: ENV_VARIABLES_TYPES) {
    this.BASE_URL = ENV.BABY_BLISS_BASE_URI;
    this.API_VERSION = 'v1';
  }

  get(
    path: string,
    authToken: string | null,
    apiVersion: string
  ): Promise<any> {
    return fetch(
      `${this.BASE_URL}/${apiVersion ? apiVersion : this.API_VERSION}/${path}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      }
    );
  }

  post(request: POST_TYPES): Promise<any> {
    const { apiVersion, path, payload, authToken } = request;

    const URI = `${this.BASE_URL}/${
      apiVersion ? apiVersion : this.API_VERSION
    }/${path}`;

    return fetch(URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(payload)
    });
  }

  put(request: POST_TYPES): Promise<any> {
    const { apiVersion, path, payload, authToken } = request;

    const URI = `${this.BASE_URL}/${
      apiVersion ? apiVersion : this.API_VERSION
    }/${path}`;

    return fetch(URI, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: payload ? JSON.stringify(payload) : null
    });
  }

  delete(request: POST_TYPES): Promise<any> {
    const { apiVersion, path, payload, authToken } = request;

    const URI = `${this.BASE_URL}/${
      apiVersion ? apiVersion : this.API_VERSION
    }/${path}`;

    return fetch(`${URI}/${payload.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    });
  }
}

export default new API(ENV_VARIABLES);
