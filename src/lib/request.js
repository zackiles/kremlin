import reqFast from 'req-fast';
import ms from 'ms';

function single(options = {}) {
  const opts = _.cloneDeep(options);
  opts.timeout = ms(options.timeout || '30s');
  return Promise.promisify(reqFast)(opts);
}

function request(requests = [], options = {}) {
  let reqs = [];
  const opts = _.cloneDeep(options);
  if (Array.isArray(requests) && _.isString(requests[0])) {
    reqs = requests.map(v => ({ url: v }));
  }
  if (_.isString(requests)) reqs.push({ url: requests });
  if (_.isPlainObject(requests)) reqs.push(requests);
  return Promise.map(reqs, single, { concurrency: opts.concurrency || 1 });
}

export default request;
