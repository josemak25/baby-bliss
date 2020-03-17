import API from '../../src/libs/api';
import post from '../../src/libs/dummyPost.json';

describe('TEST API FUNCTIONS', function() {
  test('should return data for get function when successful', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        statusCode: 200,
        message: 'success',
        payload: [post]
      })
    );

    const response = await API.get('/posts', '', '');
    expect(response).toBeDefined();
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.message).toBe('success');
    expect(response.payload).toEqual([post]);
  });
  test('should not return data for get function when unsuccessful', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        statusCode: 400,
        message: 'bad request',
        payload: null
      })
    );

    const response = await API.get('', '', '');
    expect(response).toBeDefined();
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('bad request');
    expect(response.payload).toBeNull();
  });
  test('should be able to make a post request when post function is called successfully', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        statusCode: 200,
        message: 'success',
        payload: [post]
      })
    );

    const response = await API.post({
      path: '',
      apiVersion: '',
      authToken: '',
      payload: {}
    });
    expect(response).toBeDefined();
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.message).toBe('success');
    expect(response.payload).toEqual([post]);
  });
  test('should not return data for Post function when unsuccessful', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        statusCode: 400,
        message: 'bad request',
        payload: null
      })
    );

    const response = await API.post({
      path: '',
      apiVersion: '',
      authToken: '',
      payload: {}
    });
    expect(response).toBeDefined();
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('bad request');
    expect(response.payload).toBeNull();
  });

  test('should be able to make a put request when put function is called successfully', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        statusCode: 200,
        message: 'success',
        payload: [post]
      })
    );

    const response = await API.put({
      path: '',
      apiVersion: '',
      authToken: '',
      payload: {}
    });
    expect(response).toBeDefined();
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.message).toBe('success');
    expect(response.payload).toEqual([post]);
  });
  test('should not return data for put function when unsuccessful', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        statusCode: 400,
        message: 'bad request',
        payload: null
      })
    );

    const response = await API.put({
      path: '',
      apiVersion: '',
      authToken: '',
      payload: {}
    });
    expect(response).toBeDefined();
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('bad request');
    expect(response.payload).toBeNull();
  });
});
