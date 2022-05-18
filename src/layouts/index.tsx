import { useLocation } from 'react-router';
import { RouteProps } from '_@types_react-router@5.1.12@@types/react-router';
import Tabbar from './Tabbar/Tabbar';

export default function IndexLayouts(props: RouteProps) {
    let location = useLocation();
    if (
        location.pathname.includes('/detail') ||
        location.pathname.includes('/city') ||
        location.pathname.includes('/search') ||
        location.pathname.includes('/login') ||
        location.pathname.includes('/setting')
    ) {
        return <div>{props.children}</div>;
    }

    return (
        <div>
            <div>
                {props.children}
                <div style={{ height: 50 }}></div>
            </div>

            <Tabbar />
        </div>
    );
}
