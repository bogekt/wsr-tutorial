import { HttpClient } from '@wix/http-client';

describe('When rendering', () => {
  const httpClient = new HttpClient();

  it('should display a title', async () => {
    const url = app.getUrl('/');
    const response = await httpClient.get(url);

    expect(response.data).toContain('Wix Full Stack Project Boilerplate');
  });
});
