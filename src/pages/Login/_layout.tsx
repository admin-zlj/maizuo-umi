import { Form, Input, Button, Toast } from 'antd-mobile';
import { useEffect } from 'react';
import { connect, history } from 'umi';
import styles from './login.less';

function Login(props: any) {
    const onFinish = async (values: any) => {
        // console.log(values);
        let res = await fetch(
            `http://localhost:3000/user?username=${values.username}&password=${values.password}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        ).then((res) => res.json());
        console.log(res[0]);

        if (res.length == 0) {
            Toast.show({
                icon: 'fail',
                content: '用户名或密码错误',
                maskClickable: false,
            });
        } else {
            Toast.show({
                icon: 'success',
                content: '登录成功',
                duration: 500,
                maskClickable: false,
            });
            sessionStorage.setItem('token', JSON.stringify(res[0]));
            history.push('/center');
        }
    };
    return (
        <div>
            <div className={styles.logo}>
                <img
                    src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
                    alt="logo"
                />
            </div>
            <div className="login">
                <Form
                    layout="horizontal"
                    onFinish={onFinish}
                    footer={
                        <Button
                            color="primary"
                            type="submit"
                            block
                            shape="rounded"
                            size="large"
                        >
                            {' '}
                            登 录{' '}
                        </Button>
                    }
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空!' }]}
                    >
                        <Input placeholder="请输入用户名" clearable />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '密码不能为空!' }]}
                    >
                        <Input
                            placeholder="请输入密码"
                            clearable
                            type="password"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
