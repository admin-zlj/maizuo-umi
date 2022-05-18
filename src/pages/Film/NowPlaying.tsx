import { useEffect, useRef } from 'react';
import { Image, List, InfiniteScroll } from 'antd-mobile';
import { connect } from 'umi';

function NowPlaying(props: any) {
    const count = useRef(0);
    useEffect(() => {
        return () => {
            props.dispatch({
                type: 'nowplaying/clearNowplayingList',
            });
            props.dispatch({
                type: 'nowplaying/changeHasMoreTrue',
            });
        };
    }, []);

    async function loadMore() {
        console.log('nowplaying底部');
        count.current++;

        props.dispatch({
            type: 'nowplaying/getnowplayingList',
            payload: {
                count: count.current,
                cityId: sessionStorage.getItem('cityId')
                    ? sessionStorage.getItem('cityId')
                    : props.cityId,
            },
        });
        props.dispatch({
            type: 'nowplaying/changeHasMoreFalse',
        });
    }
    // console.log(props.nowplayingList);

    return (
        <div>
            <List>
                {props.nowplayingList.map((item: any) => (
                    <List.Item
                        onClick={() => {
                            props.history.push(`/detail/${item.filmId}`);
                        }}
                        key={item.filmId}
                        prefix={
                            <div style={{ padding: '10px 5px' }}>
                                <Image src={item.poster} width={70} />
                            </div>
                        }
                        description={description(item)}
                    >
                        <div
                            style={{
                                width: 200,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {' '}
                            {item.name}{' '}
                        </div>
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={props.hasMore} />
        </div>
    );
}
export default connect((state: any) => {
    // console.log(state.city.cityId);

    return {
        nowplayingList: state.nowplaying.nowplayingList,
        hasMore: state.nowplaying.hasMore,
        cityId: state.city.cityId,
    };
})(NowPlaying);

const description = (item: any) => (
    <div>
        <div>
            {' '}
            观众评分：{' '}
            <div
                style={{
                    display: 'inline-block',
                    fontSize: '18px',
                    color: 'red',
                }}
            >
                {item.grade}
            </div>
        </div>
        <div
            style={{
                width: 200,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            }}
        >
            主演：{item.actors.map((item: any) => item.name + '  ').toString()}
        </div>
        <div>
            {' '}
            {item.nation} | {item.runtime}分钟{' '}
        </div>
    </div>
);
