import { Redirect } from 'umi';
export default function LoginAuth(props: any) {
    if (sessionStorage.getItem('token')) {
        return <div>{props.children}</div>;
    }
    return <Redirect to="/login" />;
}
