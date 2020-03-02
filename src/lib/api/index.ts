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

import { AsyncStorage } from 'react-native';
import ENV_VARIABLES, { ENV_VARIABLES_TYPES } from '../../config';

type POST_TYPES = { path: string; payload: any };

class API {
  private BASE_URL: string;
  static authToken: string;

  constructor(ENV: ENV_VARIABLES_TYPES) {
    this.BASE_URL = ENV.BABY_BLISS_BASE_URI;

    (async function() {
      if (API.authToken) {
        return API.authToken;
      }

      API.authToken = await AsyncStorage.getItem('@AUTH_TOKEN');
      API.authToken = `Bearer ${API.authToken}`;
    })();
  }

  get(path: string): Promise<any> {
    return fetch(`${this.BASE_URL}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: API.authToken
      }
    });
  }

  post(request: POST_TYPES): Promise<any> {
    return fetch(`${this.BASE_URL}/${request.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: API.authToken
      },
      body: JSON.stringify(request.payload)
    });
  }

  put(request: POST_TYPES): Promise<any> {
    return fetch(`${this.BASE_URL}/${request.path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: API.authToken
      },
      body: JSON.stringify(request.payload)
    });
  }

  delete(request: POST_TYPES): Promise<any> {
    return fetch(`${this.BASE_URL}/${request.path}/${request.payload.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: API.authToken
      }
    });
  }
}

export default new API(ENV_VARIABLES);
