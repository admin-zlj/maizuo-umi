export default {
    namespace: 'nowplaying',
    state: {
        nowplayingList: [],
        hasMore: true,
    },
    reducers: {
        ChangenowplayingList(prevState: any, { payload }: any) {
            return {
                ...prevState,
                nowplayingList: [...prevState.nowplayingList, ...payload],
                hasMore: payload.length > 0,
            };
        },
        changeHasMoreFalse(prevState: any, { payload }: any) {
            return {
                ...prevState,
                hasMore: false,
            };
        },
        changeHasMoreTrue(prevState: any, { payload }: any) {
            return {
                ...prevState,
                hasMore: true,
            };
        },
        clearNowplayingList(prevState: any, { payload }: any) {
            return {
                ...prevState,
                nowplayingList: [],
            };
        },
    },
    effects: {
        *getnowplayingList({ payload }: any, { call, put }: any): any {
            // console.log(action.type);
            // console.log(payload.count);
            let res = yield call(getCList, payload);
            yield put({
                type: 'ChangenowplayingList',
                payload: res,
            });
        },
    },
};

async function getCList(payload: any) {
    let { count, cityId } = payload;
    // console.log(cityId);
    let res = await fetch(
        `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${count}&pageSize=10&type=1&k=1345503`,
        {
            headers: {
                'X-Client-Info':
                    '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649421759474422087516161","bc":"110100"}',
                'X-Host': ' mall.film-ticket.film.list',
            },
        },
    ).then((res) => res.json());
    // console.log(res.data);
    return res.data.films;
}
