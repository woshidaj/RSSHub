import got from '~/utils/got.js';
import cheerio from 'cheerio';
import url from 'url';

const host = 'https://sec.today';

export default async (ctx) => {
    const link = 'https://sec.today/pulses/';
    const response = await got.get(link);
    const $ = cheerio.load(response.data);

    const out = $('div.endless_page_template div.card')
        .slice(0, 10)
        .map(function () {
            const [author] = $(this).find('div.card-body small.text-muted').text().trim().split('•');
            const itemUrl = $(this).find('h5.card-title > a').attr('href');
            const info = {
                link: url.resolve(host, itemUrl),
                description: $(this).find('p.card-text.my-1').html(),
                title: $(this).find('h5.card-title').text(),
                author,
            };
            return info;
        })
        .get();

    ctx.state.data = {
        title: '每日安全推送',
        link,
        item: out,
    };
};