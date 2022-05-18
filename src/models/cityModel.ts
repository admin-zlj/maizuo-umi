export default {
    namespace: 'city',
    state: {
        cityList: [],
        cityname: '北京',
        cityId: '110100',
    },
    reducers: {
        ChangeCity(prevState: any, { payload }: any) {
            // console.log(payload.cityId);
            return {
                ...prevState,
                cityname: payload.name,
                cityId: payload.cityId,
            };
        },
        ChangeCityList(prevState: any, { payload }: any) {
            return {
                ...prevState,
                cityList: payload,
            };
        },
    },
    effects: {
        *getCityList(action: any, { call, put }: any): any {
            let res = yield call(getCList);
            yield put({
                type: 'ChangeCityList',
                payload: res,
            });
        },
    },
};

async function getCList() {
    let res = await fetch(`https://m.maizuo.com/gateway?k=6884400`, {
        headers: {
            'X-Client-Info':
                '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649421759474422087516161","bc":"110100"}',
            'X-Host': 'mall.film-ticket.city.list',
        },
    }).then((res) => res.json());

    return res.data.cities;
}
