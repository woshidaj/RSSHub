import got from '~/utils/got.js';
import cheerio from 'cheerio';
import parseDate from '~/utils/date.js';

export default async (ctx) => {
    const {
        id
    } = ctx.params;

    const url = `https://forum.qidian.com/NewForum/List.aspx?BookId=${id}`;

    const forum_response = await got({
        method: 'get',
        url,
        headers: {
            Referer: `https://book.qidian.com/info/${id}`,
        },
    });

    const $ = cheerio.load(forum_response.data);
    const name = $('.main-header>h1').text();
    const cover_url = $('img.forum_book').attr('src');
    const list = $('li.post-wrap>.post');

    const items = [];
    for (let i = 0; i < list.length; ++i) {
        const el = list[i];
        const title = $(el).children().eq(1).find('a');
        items.push({
            title: title.text(),
            link: `https:${title.attr('href')}`,
            description: $(el).text(),
            pubDate: parseDate($(el).find('.post-info>span').text()),
        });
    }

    ctx.state.data = {
        title: `起点 《${name}》讨论区`,
        link: url,
        image: cover_url,
        item: items,
    };
};