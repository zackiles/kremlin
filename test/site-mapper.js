import SiteMapper from '../src/lib/site-mapper';

const sitemapper = new SiteMapper('https://www.leafly.com')
describe('/lib/site-mapper', function () {
/** it('getRobotsTxt()', function () {
    return sitemapper.getRobotsTxt();
  });
 
  it('getSitemaps() ', function () {
    return sitemapper.getSitemaps();
  });
  it('getSitemapLinks() ', function () {
    return sitemapper.getSitemapLinks().then(console.log);
  });
  it('siteMapToLinks() ', function () {
    return sitemapper.getSitemapLinks().then(SiteMapper.sitemapToLinks).then(results => {
      console.log(results);
    });
  });*/
  it('getSitemaps() ', function () {
    return sitemapper.getSitemaps().then(SiteMapper.sitemapToLinks).then(results => {
      console.log(results);
    });
  });
});
