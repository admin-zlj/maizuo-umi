import { useLocation, Redirect, history } from 'umi';
import { RouteProps } from '_@types_react-router@5.1.12@@types/react-router';
import { Swiper, Tabs } from 'antd-mobile';
import { useEffect, useState } from 'react';
export default function Film(props: RouteProps) {
    const [lunbo, setLunbo] = useState([]);
    const location = useLocation();
    useEffect(() => {
        fetch('http://localhost:3000/films')
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                setLunbo(res);
            });
    }, []);
    // console.log(lunbo);
    interface Ilunbo {
        filmId: number;
        name: string;
        imgUrl: string;
    }
    if (location.pathname === '/film' || location.pathname === '/film/') {
        return <Redirect to="/film/nowPlaying" />;
    }
    return (
        <div>
            <Swiper autoplay loop>
                {Array.from(lunbo).map((item: Ilunbo) => (
                    <Swiper.Item key={item.filmId}>
                        <div
                            onClick={() => {
                                history.push(`/detail/${item.filmId}`);
                            }}
                        >
                            <img
                                style={{ width: '100%', height: 200 }}
                                src={item.imgUrl}
                                alt={item.name}
                            />
                        </div>
                    </Swiper.Item>
                ))}
            </Swiper>
            <div
                style={{
                    height: 45,
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    zIndex: 999,
                }}
            >
                <Tabs
                    activeKey={location.pathname}
                    onChange={(value) => {
                        history.push(value);
                    }}
                >
                    <Tabs.Tab
                        title="正在热映"
                        key="/film/nowPlaying"
                    ></Tabs.Tab>
                    <Tabs.Tab
                        title="即将上映"
                        key="/film/comingSoon"
                    ></Tabs.Tab>
                </Tabs>
            </div>
            {props.children}
        </div>
    );
}
