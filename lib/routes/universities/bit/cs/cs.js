import got from '~/utils/got.js';
import cheerio from 'cheerio';
import util from './utils.js';

export default async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'http://cs.bit.edu.cn/tzgg',
        https: {
            rejectUnauthorized: false,
        },
    });

    const $ = cheerio.load(response.data);

    const list = $('.box_list01 li').slice(0, 10).get();

    const result = await util.ProcessFeed(list, ctx.cache);

    ctx.state.data = {
        title: $('title').text(),
        link: 'http://cs.bit.edu.cn/tzgg',
        description: $('meta[name="description"]').attr('content'),
        item: result,
    };
};