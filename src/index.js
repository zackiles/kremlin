import yargs from 'yargs';
import _ from 'lodash';
import Promise from 'bluebird';
import log from './lib/log';
import request from './lib/request';
import pkg from '../package.json';

global._ = _;
global.Promise = Promise;

const { argv } = yargs;

log.info(pkg.description);
log.info(`Version: ${pkg.version}`);
log.info(`Author: ${pkg.author}`);
log.info(`Licence: ${pkg.license}`);
log.info(`Repository: ${pkg.homepage}`);
log.info(`Arguments: ${argv}`);


request({ url: 'https://lift.co' }).then((res) => {
  log.info(res);
});
