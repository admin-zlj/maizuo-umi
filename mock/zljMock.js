export default {
    'GET /filmsInfo': {
        films: [
            {
                filmId: 5930,
                name: '神奇动物:邓布利多之谜',
                imgUrl: 'https://img0.baidu.com/it/u=2355362207,3918536407&fm=253&fmt=auto&app=120&f=JPEG?w=654&h=303',
            },
            {
                filmId: 5849,
                name: '熊出没·重返地球',
                imgUrl: 'https://img1.baidu.com/it/u=3609218443,4116297436&fm=253&fmt=auto&app=120&f=JPEG?w=1193&h=500',
            },
            {
                filmId: 5901,
                name: '这个杀手不太冷静',
                imgUrl: 'https://img1.baidu.com/it/u=3546603963,1853629284&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=349',
            },
        ],
    },

    'POST /users/login': (resp, res) => {
        // console.log(resp.body);
        if (resp.body.username === 'admin' && resp.body.password === '123') {
            res.send({
                id: 1,
                ok: 1,
            });
        } else {
            res.send({
                ok: 0,
            });
        }
    },
    'GET /user': [
        {
            id: 1,
            username: 'admin',
            password: '123',
        },
        {
            id: 2,
            username: 'admin',
            password: '123',
        },
        {
            id: 3,
            username: 'admin',
            password: '123',
        },
    ],
};
