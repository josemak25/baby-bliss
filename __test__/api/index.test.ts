import API from '../../src/lib/api';
import post from '../../src/libs/dummyPost.json';

describe('TEST POST ACTIONS', function() {
  test('should return non empty array of posts for the case of LOAD_POSTS action type', async () => {
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
});
