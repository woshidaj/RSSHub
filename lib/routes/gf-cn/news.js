import got from '~/utils/got.js';

export default async (ctx) => {
    const {
        category = '1'
    } = ctx.params;

    const rootUrl = 'https://gfcn-webserver.sunborngame.com';
    const currentUrl = `${rootUrl}/website/news_list/${category}?page=0&limit=11`;
    const response = await got({
        method: 'get',
        url: currentUrl,
    });

    const list = response.data.data.list.map((item) => ({
        title: item.Title,
        link: `${rootUrl}/website/news/${item.Id}`,
        pubDate: new Date(item.Date).toUTCString(),
    }));

    const items = await Promise.all(
        list.map((item) =>
            ctx.cache.tryGet(item.link, async () => {
                const detailResponse = await got({
                    method: 'get',
                    url: item.link,
                });
                item.description = detailResponse.data.data.Content;
                item.link = item.link.replace(`${rootUrl}/website/news/`, `${rootUrl}/NewsInfo?id=`);

                return item;
            })
        )
    );

    ctx.state.data = {
        title: `少女前线 - ${category === '1' ? '新闻' : '公告'}`,
        link: currentUrl,
        item: items,
    };
};