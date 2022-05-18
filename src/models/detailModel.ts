export default {
    namespace: 'detail',
    state: {
        film: {},
    },
    reducers: {
        ChangeFilm(prevState: any, { payload }: any) {
            return {
                ...prevState,
                film: payload,
            };
        },
    },
    effects: {
        *getFilm({ payload }: any, { call, put }: any): any {
            // console.log(action.type);
            // console.log(payload.cityId);
            let res = yield call(getData, payload);
            yield put({
                type: 'ChangeFilm',
                payload: res,
            });
        },
    },
};

async function getData(filmId: number) {
    let res = await fetch(
        `https://m.maizuo.com/gateway?filmId=${filmId}&k=987944`,
        {
            headers: {
                'X-Client-Info':
                    '{"a":"3000","ch":"1002","v":"5.2.0","e":"16511499792099075071606785","bc":"440100"}',
                'X-Host': 'mall.film-ticket.film.info',
            },
        },
    ).then((res) => res.json());
    // console.log(res.data.film);
    return res.data.film;
}
