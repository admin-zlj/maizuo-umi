import React, { useEffect, useMemo, useState } from 'react';
import { SearchBar, List, Toast } from 'antd-mobile';
import { connect, useHistory } from 'umi';

function Search(props: any) {
    const [text, setText] = useState('');
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

    let getcinemaList = useMemo(
        () =>
            props.cinemaList.filter(
                (item: any) =>
                    item.name.toUpperCase().includes(text.toUpperCase()) ||
                    item.address.toUpperCase().includes(text.toUpperCase()),
            ),
        [props.cinemaList, text],
    );
    return (
        <div>
            <div
                style={{
                    padding: '10px 10px',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    zIndex: 999,
                }}
            >
                {' '}
                <SearchBar
                    value={text}
                    onChange={(value) => {
                        //   console.log(value);
                        setText(value);
                    }}
                    onCancel={() => {
                        history.goBack();
                    }}
                    placeholder="请输入影院名称"
                    showCancelButton={() => true}
                />
            </div>
            <List>
                {getcinemaList.map((item: any) => (
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
        // cityname: state.city.cityname,
        cityId: state.city.cityId,
    };
})(Search);

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
