import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import _ from 'lodash';
import Promise from 'bluebird';

global._ = _;
global.Promise = Promise;
global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);
