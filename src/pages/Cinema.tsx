import { NavBar, Space, List, Toast, DotLoading } from 'antd-mobile';
import { SearchOutline, DownOutline } from 'antd-mobile-icons';
import { useEffect } from 'react';
import { connect, useHistory } from 'umi';

function Cinema(props: any) {
    const history = useHistory();
    useEffect(() => {
        if (props.cinemaList.length === 0) {
            props.dispatch({
                type: 'cinema/getcinemaList',
                payload: {
                    cityId: sessionStorage.getItem('cityId')
                        ? sessionStorage.getItem('cityId')
                        : props.cityId,
                },
            });
        } else {
            console.log('缓存');
        }

        return () => {};
    }, []);

    // console.log(props.cinemaList);

    const right = (
        <div
            onClick={() => {
                history.push('/search');
            }}
            style={{ fontSize: 24 }}
        >
            <Space style={{ '--gap': '16px' }}>
                <SearchOutline />
            </Space>
        </div>
    );
    const left = (
        <div
            onClick={() => {
                props.dispatch({
                    type: 'cinema/clearcinemaList',
                });
                history.push('/city');
            }}
            style={{ fontSize: 12 }}
        >
            {sessionStorage.getItem('cityname')
                ? sessionStorage.getItem('cityname')
                : props.cityname}{' '}
            <i></i>
            <DownOutline />
        </div>
    );

    return (
        <div>
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    zIndex: 999,
                }}
            >
                {' '}
                <NavBar right={right} back={null} left={left}>
                    {' '}
                    影院{' '}
                </NavBar>{' '}
            </div>
            {props.loading && (
                <div
                    style={{ fontSize: 15, color: 'gray', textAlign: 'center' }}
                >
                    {' '}
                    加载中 <DotLoading />{' '}
                </div>
            )}

            <List>
                {props.cinemaList.map((item: any) => (
                    <List.Item
                        arrow={false}
                        key={item.cinemaId}
                        description={description(item.address)}
                        extra={extra(item.lowPrice)}
                        onClick={handleListClick}
                    >
                        {children(item.name)}
                    </List.Item>
                ))}
            </List>
        </div>
    );
}

export default connect((state: any) => {
    // console.log(state);

    return {
        loading: state.loading.global,
        cinemaList: state.cinema.cinemaList,
        cityname: state.city.cityname,
        cityId: state.city.cityId,
    };
})(Cinema);

const handleListClick = () =>
    Toast.show({
        content: '暂未开放',
        maskClickable: false,
    });

const description = (address: string) => (
    <div
        style={{
            width: 220,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }}
    >
        {address}
    </div>
);
const extra = (lowPrice: number) => (
    <div style={{ color: '#FF6565' }}>
        ￥{lowPrice / 100}
        <i style={{ fontSize: 12 }}>起</i>
    </div>
);
const children = (name: string) => (
    <div
        style={{
            fontSize: 16,
            width: 220,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }}
    >
        {' '}
        {name}
    </div>
);
