// export default {
//     namespace: 'login',
//     state: {
//         isLogin: false,
//     },
//     reducers: {
//         ChangeLogin(prevState: any, { payload }: any) {
//             return {
//                 ...prevState,
//                 isLogin: payload===1?true:false,
//             };
//         },

//     },
//     effects: {
//         *authUser({ payload }: any, { call, put }: any): any {
//             // console.log(action.type);
//             // console.log(payload);
//             let res = yield call(getCList, payload);
//             yield put({
//                 type: 'ChangeLogin',
//                 payload: res,
//             });
//         },
//     },
// };

// async function getCList(payload:any ) {
//     console.log(payload);

//     let res = await fetch(
//         `/users/login`,
//         {
// 			method:'POST',
// 			body:JSON.stringify({
// 				username:payload.username,
// 				password:payload.password
// 			}),
// 			headers: {
// 				"Content-Type": "application/json",
// 			  },
//         },
//     ).then((res) => res.json());
//     console.log(res.ok);
//     return res.ok;
// }
