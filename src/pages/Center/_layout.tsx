import React, { useEffect, useState } from 'react';
import { Image, List } from 'antd-mobile';
import {
    TagOutline,
    UserContactOutline,
    BankcardOutline,
    CouponOutline,
    PayCircleOutline,
    SetOutline,
    MailOpenOutline,
} from 'antd-mobile-icons';
import styles from './center.less';
import { history } from 'umi';
function Center(props: any) {
    const [userInfo, setUserInfo] = useState(
        JSON.parse(sessionStorage.getItem('token') as string),
    );
    useEffect(() => {
        return () => {};
    }, []);

    if (location.pathname.includes('/setting')) {
        return <div>{props.children}</div>;
    }
    return (
        <div className={styles.main}>
            <div className={styles.avatar}>
                <Image
                    className={styles.img}
                    src="https://mall.s.maizuo.com/aec6406c7d3a3cb8520bdb165f42f977.jpg"
                    width={64}
                    height={64}
                    fit="cover"
                    style={{ borderRadius: 32 }}
                />
                <div className={styles.username}>{userInfo.username}</div>
            </div>

            <ul className={styles.orderTab}>
                <li>
                    <CouponOutline />
                    <div>电影订单</div>
                </li>
                <li>
                    <TagOutline />
                    <div>商品订单</div>
                </li>
            </ul>
            <List header="">
                <List.Item prefix={<BankcardOutline />} onClick={() => {}}>
                    卖座券
                </List.Item>
                <List.Item prefix={<MailOpenOutline />} onClick={() => {}}>
                    红包
                </List.Item>
                <List.Item prefix={<PayCircleOutline />} onClick={() => {}}>
                    余额
                </List.Item>
                <List.Item prefix={<UserContactOutline />} onClick={() => {}}>
                    帮助和客服
                </List.Item>
                <List.Item
                    prefix={<SetOutline />}
                    onClick={() => {
                        history.push(`/center/setting`);
                    }}
                >
                    设置
                </List.Item>
            </List>
        </div>
    );
}
Center.wrappers = ['@/wrappers/LoginAuth'];
export default Center;
