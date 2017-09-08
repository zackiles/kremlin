import request from '../src/lib/request';

describe('/lib/request', function () {
  it('With a string', function () {
    return request('https://google.com');
  });
  it('With an object', function () {
    return request({ url: 'https://google.com' });
  });
  it('With an array of objects', function () {
    return request([{ url: 'https://google.com' }, { url: 'https://google.com' }]);
  });
});
