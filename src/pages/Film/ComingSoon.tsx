import { useEffect, useRef } from 'react';
import { Image, List, InfiniteScroll } from 'antd-mobile';
import { connect } from 'umi';

function ComingSoon(props: any) {
    const count = useRef(0);
    useEffect(() => {
        return () => {
            props.dispatch({
                type: 'comingsoon/clearComingsoonList',
            });
            props.dispatch({
                type: 'comingsoon/changeHasMoreTrue',
            });
        };
    }, []);

    async function loadMore() {
        console.log('comingsoon 底部');
        count.current++;
        props.dispatch({
            type: 'comingsoon/getcomingsoonList',
            payload: {
                count: count.current,
                cityId: sessionStorage.getItem('cityId')
                    ? sessionStorage.getItem('cityId')
                    : props.cityId,
            },
        });
        props.dispatch({
            type: 'comingsoon/changeHasMoreFalse',
        });
    }

    return (
        <div>
            <List>
                {props.comingsoonList.map((item: any) => (
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
    // console.log(state.comingsoon);

    return {
        comingsoonList: state.comingsoon.comingsoonList,
        hasMore: state.comingsoon.hasMore,
        cityId: state.city.cityId,
    };
})(ComingSoon);

const description = (item: any) => (
    <div>
        <div
            style={{
                width: 200,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            }}
        >
            主演：{item.actors.map((item: any) => item.name + ' ').toString()}
        </div>
        <div>上映日期：{mydate(item.premiereAt)}</div>
        <div>
            {' '}
            {item.nation} | {item.runtime}分钟{' '}
        </div>
    </div>
);
function mydate(str: number) {
    let date = new Date(str * 1000);
    let cdate = date.toLocaleDateString().split('/');
    let s = `${cdate[1]}月${cdate[2]}日`;
    return s;
}
