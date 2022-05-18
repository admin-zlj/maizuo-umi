import { List, NavBar } from 'antd-mobile';
import React, { useState } from 'react';
import { history } from 'umi';

export default () => {
    const [userInfo, setUserInfo] = useState(
        JSON.parse(sessionStorage.getItem('token') as string),
    );

    return (
        <div style={{ height: '100vh', backgroundColor: '#F4F4F4' }}>
            <div style={{ backgroundColor: '#fff' }}>
                <NavBar
                    onBack={() => {
                        history.goBack();
                    }}
                >
                    {' '}
                    设置{' '}
                </NavBar>
            </div>
            <div style={{ height: 10 }}> </div>
            <List header="">
                <List.Item onClick={() => {}} arrow={false} extra={userInfo.id}>
                    账号ID
                </List.Item>
                <List.Item onClick={() => {}}>修改密码</List.Item>
            </List>
            <div style={{ height: 10 }}> </div>
            <List header="">
                <List.Item onClick={() => {}}>意见反馈</List.Item>
                <List.Item onClick={() => {}}>隐私政策</List.Item>
                <List.Item onClick={() => {}}>用户协议</List.Item>
                <List.Item onClick={() => {}}>软件版本</List.Item>
            </List>
            <div style={{ height: 10 }}> </div>
            <List header="">
                <List.Item onClick={() => {}}>注销账号</List.Item>
                <List.Item
                    onClick={() => {
                        sessionStorage.removeItem('token');
                        history.push(`/login`);
                    }}
                >
                    退出登录
                </List.Item>
            </List>
            <div style={{ height: 10 }}> </div>
        </div>
    );
};
