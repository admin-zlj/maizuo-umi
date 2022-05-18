import { Redirect } from 'umi';

export default function IndexPage() {
    return (
        <div>
            {/* IndexPage */}
            <Redirect to="/film" />
        </div>
    );
}
