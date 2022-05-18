import React from 'react';
import { ErrorBlock, Space } from 'antd-mobile';

export default function Notfound() {
    return (
        <div>
            <Space block direction="vertical" style={{ '--gap': '16px' }}>
                <ErrorBlock status="empty" />
            </Space>
        </div>
    );
}
