import { NavBar, List, IndexBar, Grid, Divider } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import { useEffect } from 'react';
import { connect, useHistory } from 'umi';
import styles from './city.less';
function City(props: any) {
    const history = useHistory();
    useEffect(() => {
        if (props.cityList.length === 0) {
            props.dispatch({
                type: 'city/getCityList',
            });
        }
        return () => {};
    }, []);
    const clickCity = (item: any) => {
        sessionStorage.setItem('cityname', item.name);
        sessionStorage.setItem('cityId', item.cityId);
        props.dispatch({
            type: 'city/ChangeCity',
            payload: {
                cityId: item.cityId,
                name: item.name,
            },
        });

        history.push('/cinema');
    };

    return (
        <div>
            <div
                className={styles.top}
                style={{
                    position: 'sticky',
                    backgroundColor: '#fff',
                }}
            >
                <NavBar
                    backArrow={<CloseOutline />}
                    onBack={() => {
                        // console.log('返回');
                        history.push('/cinema');
                    }}
                >
                    {' '}
                    当前城市{' '}
                </NavBar>
            </div>

            <div style={{ height: window.innerHeight }}>
                <IndexBar>
                    <IndexBar.Panel index={'#'}>
                        <Divider>热门城市</Divider>
                        <div style={{ padding: '0 30px' }}>
                            <Grid columns={3} gap={15}>
                                {props.cityList
                                    .filter((item: any) => item.isHot)
                                    .map((item: any) => (
                                        <Grid.Item
                                            onClick={() => {
                                                clickCity(item);
                                            }}
                                            key={item.cityId}
                                        >
                                            <div
                                                className={
                                                    styles[
                                                        'grid-demo-item-block'
                                                    ]
                                                }
                                            >
                                                {item.name}
                                            </div>
                                        </Grid.Item>
                                    ))}
                            </Grid>
                        </div>
                        <Divider />
                    </IndexBar.Panel>
                    {filtercity(props.cityList).map((group: any) => {
                        const { title, items } = group;
                        return (
                            <IndexBar.Panel
                                index={title}
                                title={title}
                                key={title}
                            >
                                <List>
                                    {items.map((item: any) => (
                                        <List.Item
                                            arrow={false}
                                            onClick={() => {
                                                clickCity(item);
                                            }}
                                            key={item.cityId}
                                        >
                                            {item.name}
                                        </List.Item>
                                    ))}
                                </List>
                            </IndexBar.Panel>
                        );
                    })}
                </IndexBar>
            </div>
        </div>
    );
}
export default connect((state: any) => {
    return {
        cityList: state.city.cityList,
    };
})(City);

function filtercity(List: string[]) {
    let arr = [...Array(26).keys()].map((i) => String.fromCharCode(i + 65));
    let newlist: any = [];
    // console.log(arr);
    arr.forEach((i) => {
        let nlist = List.filter(
            (city: any) => city.pinyin.substring(0, 1).toUpperCase() === i,
        );
        {
            nlist.length &&
                newlist.push({
                    title: i,
                    items: List.filter(
                        (city: any) =>
                            city.pinyin.substring(0, 1).toUpperCase() === i,
                    ),
                });
        }
    });

    return newlist;
}
