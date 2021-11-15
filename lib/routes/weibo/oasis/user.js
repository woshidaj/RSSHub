import buildData from '~/utils/common-config';

export default async (ctx) => {
    const {
        userid
    } = ctx.params;
    const link = `https://oasis.weibo.cn/v1/h5/share?uid=${userid}`;
    ctx.state.data = await buildData({
        link,
        url: link,
        title: `$('.name-main').text().trim() + ' - 用户 - 绿洲'`,
        description: `$('.desc').text().trim()`,
        item: {
            item: '.container .item',
            title: `$('.status-desc').text()`,
            description: `$('.status-desc').text() + '<br>' + $('.media-wrapper').html()`,
        },
    });
};