import got from '~/utils/got.js';

export default async (ctx) => {
    const {
        data
    } = await got({
        method: 'get',
        url: 'http://www.laosiji.com/thread/hotList',
    });

    ctx.state.data = {
        title: '老司机-24小时热门',
        link: 'http://www.laosiji.com/new_web/index.html',
        description: '老司机-24小时热门',
        item: data.map(({ title, description, id, imageInfo, createtime }) => ({
            title: title === '' ? description : title,
            link: `http://www.laosiji.com/thread/${id}.html`,
            description: `<img src="${imageInfo.url}">${description}`,
            pubDate: new Date(createtime).toUTCString(),
        })),
    };
};