const Chromy = require('chromy')

let chromy = new Chromy({
  visible: true,
  launchBrowser: false,
})

let searchWord = 'startuml enduml size:>100 license:mit language:Text';

async function scrape() {
  var page = 1;

  while (true) {
    let url = 'https://github.com/search?utf8=✓&type=Code&q=' + encodeURIComponent(searchWord) + '&page=' + page;
    console.error('scrape url:' + url);
    await chromy.goto(url);

    let repos = await chromy.evaluate(() => {
      return Array.prototype.map.call(document.getElementsByClassName('code-list-item'), function(e) { return e.getElementsByTagName('a')[2].href; });
    });
    repos.forEach(function(r) {
      console.log(r);
    });

    let hasNext = await chromy.evaluate(() => {
      return document.getElementsByClassName('next_page disabled').length == 0 ? true : false;
    });
    if (!hasNext) {
      console.error('no more page');
      break;
    }

    page++;

    // sleep
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

scrape();
