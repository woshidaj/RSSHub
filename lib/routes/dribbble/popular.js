import utils from './utils.js';

export default async (ctx) => {
    const {
        timeframe
    } = ctx.params;
    const url = `https://dribbble.com/shots/popular${timeframe ? `?timeframe=${timeframe}` : ''}`;

    const title = 'Dribbble - Popular Shots';

    ctx.state.data = await utils.getData(ctx, url, title);
};