export default {
    namespace: 'cinema',
    state: {
        cinemaList: [],
    },
    reducers: {
        ChangeCinemaList(prevState: any, { payload }: any) {
            return {
                ...prevState,
                cinemaList: payload,
            };
        },
        clearcinemaList(prevState: any, { payload }: any) {
            // console.log('clear');
            return {
                ...prevState,
                cinemaList: [],
            };
        },
    },
    effects: {
        *getcinemaList({ payload }: any, { call, put }: any): any {
            // console.log(action.type);
            // console.log(payload.cityId);
            let res = yield call(getCList, payload.cityId);
            yield put({
                type: 'ChangeCinemaList',
                payload: res,
            });
        },
    },
};

async function getCList(cityId: number) {
    // console.log(cityId);

    let res = await fetch(
        `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=4332199`,
        {
            headers: {
                'X-Client-Info':
                    '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649421759474422087516161","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list',
            },
        },
    ).then((res) => res.json());
    // console.log(res.data.cinemas);
    return res.data.cinemas;
}
