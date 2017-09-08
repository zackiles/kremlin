import nodeUrl from 'url';
import robots from 'robots';
import xmlToJs from 'xml2js';
import request from './request';
import log from './log';

const robotsParser = new robots.RobotsParser();

class SiteMapper {
  constructor(site) {
    if (!site) throw new Error('No site proivded');
    this.site = nodeUrl.parse(site).href;
    this.sitemaps = [];
    this.robots = '';
  }

  getRobotsTxt() {
    if (this.robots) return Promise.resolve(this.robots);

    return new Promise((resolve, reject) => {
      robotsParser.setUrl(nodeUrl.resolve(this.site, 'robots.txt'), (parser, success) => {
        if (success) {
          this.robots = parser;
          resolve(parser);
        } else {
          log.warn(`No robots.txt found for ${this.site}`);
          reject();
        }
      });
    });
  }

  getSitemaps() {
    if (this.sitemaps.length) return Promise.resolve(this.sitemaps);

    return new Promise((resolve, reject) => {
      console.log(nodeUrl.resolve(this.site, 'robots.txt'));
      robotsParser.setUrl(nodeUrl.resolve(this.site, 'robots.txt'), (parser, success) => {
        if (success) {
          parser.getSitemaps((results) => {
            let links = [];
            _.forOwn(results, (v) => {
              links.push(nodeUrl.resolve(this.site, v));
            });
            links = _.uniq(links);
            request(links)
              .then((sitemaps) => {
                this.sitemaps = _.uniq(sitemaps);
                resolve(sitemaps);
              })
              .catch(reject);
          });
        } else {
          log.warn('No sitemaps found for', this.site);
          resolve();
        }
      });
    });
  }

  getSitemapLinks() {
    const convert = sitemaps => Promise.map(sitemaps, (s) => {
      return SiteMapper.sitemapToLinks(s).then((links) => {
        return Promise.resolve(_.uniq(_.flatten(links)));
      });
    });

    return this.sitemaps.length ? convert(this.sitemaps) : this.getSitemaps().then(convert);
  }

  static sitemapToLinks(sitemaps) {
    const convert = sitemaps => Promise.map(sitemaps, (s) => {
      return Promise.promisify(xmlToJs.parseString)(s.body).then(s => {
       /** .then(xml => _.uniq(_.map(xml.sitemapindex.sitemap, v => v.loc[0])))
        .catch((err) => {
          console.error(err)
        });
        */
        console.log(s);
      });
    });
    return _.isArray(sitemaps) ? convert(sitemaps) : convert([sitemaps]);
  }
}

export default SiteMapper;
