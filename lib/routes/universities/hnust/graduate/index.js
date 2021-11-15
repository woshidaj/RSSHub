import got from '~/utils/got.js';
import cheerio from 'cheerio';

const map = {
    sszs: 'sszs/',
    bszs: 'bszs/',
};

export default async (ctx) => {
    const {
        type = 'sszs'
    } = ctx.params;
    const base = 'http://graduate.hnust.cn/zsgz/' + (map.hasOwnProperty(type) ? map[type] : map.sszs);
    const link = `${base}index.htm`;
    const response = await got.get(link);
    const $ = cheerio.load(response.data);
    const list = $('.item ul li').slice(4);

    ctx.state.data = {
        title: '湖南科技大学研究生院招生工作通知',
        link,
        description: '湖南科技大学研究生院招生工作通知',
        image: 'https://i.loli.net/2020/03/24/EAoPzbTsBxeOdjH.jpg',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    const date = item.find('span').text();
                    const title = item.find('a').text();
                    const url = base + item.find('a').attr('href');

                    return {
                        title,
                        description: title,
                        pubDate: new Date(date).toUTCString(),
                        link: url,
                    };
                })
                .get(),
    };
};