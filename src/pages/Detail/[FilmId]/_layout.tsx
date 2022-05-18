import React, { useEffect, useState } from 'react';
import { connect, history, useRouteMatch } from 'umi';
import { Image, List, Button } from 'antd-mobile';
import { LeftOutline, DownOutline, UpOutline } from 'antd-mobile-icons';
import styles from './detail.less';

function Detail(props: any) {
    const [toggle, settoggle] = useState(true);
    const match: any = useRouteMatch();

    // console.log(props);
    useEffect(() => {
        props.dispatch({
            type: 'detail/getFilm',
            payload: match.params.FilmId,
        });
        return () => {};
    }, []);

    const description = (film: any) => (
        <div>
            <div className={styles.info}>{mydate(film.premiereAt)}上映</div>
            <div className={styles.info}>
                {film.nation} | {film.runtime}分钟
            </div>
            <div className={styles.info}>{film.category}</div>

            <div
                className={toggle ? styles.synopsisHidden : styles.synopsisShow}
                style={{ height: Math.ceil((film.synopsis?.length / 24) * 20) }}
            >
                {film.synopsis}
            </div>
            <div
                onClick={() => {
                    settoggle(!toggle);
                }}
                className={styles.toggle}
            >
                {' '}
                {toggle ? <DownOutline /> : <UpOutline />}
            </div>
        </div>
    );
    if (location.pathname.includes(`/detail/${match.params.FilmId}/cinemas`)) {
        return <div>{props.children}</div>;
    }
    return (
        <div>
            <div
                onClick={() => {
                    history.goBack();
                }}
                className={styles.back}
            >
                {' '}
                <LeftOutline />{' '}
            </div>
            <div className={styles.poster}>
                <Image
                    src={props.film.poster}
                    width="100%"
                    height={200}
                    fit="cover"
                />
            </div>
            <div>
                <List>
                    <List.Item
                        key={props.film.filmId}
                        description={description(props.film)}
                    >
                        <div className={styles.title}>
                            <div className={styles.name}>
                                <span> {props.film.name} </span>
                                <i>{props.film.filmType?.name}</i>
                            </div>
                            <div className={styles.grade}>
                                {props.film.grade}分
                            </div>
                        </div>
                    </List.Item>
                </List>
            </div>
            <div style={{ height: '12px', backgroundColor: '#ededed' }}></div>
            <div className={styles.actors}>演职人员</div>
            <div className={styles.actorsImg}>
                <ul className={styles.ul}>
                    {props.film.actors?.map((item: any) => (
                        <li key={item.name}>
                            <div>
                                <img src={item.avatarAddress} alt={item.name} />
                            </div>
                            <span>{item.name}</span>
                            <span className={styles.role}>{item.role}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ height: '12px', backgroundColor: '#ededed' }}></div>
            <div className={styles.actors}>剧照</div>
            <div className={styles.photos}>
                <ul className={styles.ul}>
                    {props.film.photos?.map((item: any) => (
                        <li key={item}>
                            <div>
                                <img src={item} alt={item} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ height: 50 }}></div>
            <div className={styles.button}>
                <Button
                    onClick={() => {
                        history.push(`/detail/${match.params.FilmId}/cinemas`);
                    }}
                    block
                    color="primary"
                    size="large"
                >
                    {' '}
                    选座购票{' '}
                </Button>
            </div>
        </div>
    );
}
export default connect((state: any) => {
    return {
        film: state.detail.film,
    };
})(Detail);

//格式化后台传来的时间
function mydate(str: number) {
    let date = new Date(str * 1000);
    let cdate = date.toLocaleDateString().split('/');
    let s = `${cdate[0]}-${cdate[1]}-${cdate[2]}`;
    return s;
}
