import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout
            style={{
                minHeight: "100vh",
                padding: 0,
                display: "flex",
            }}
        >
            <Sider
                trigger={null}
                collapsible
                width={300}
                collapsed={collapsed}
                style={{ background: "white" }}
            >
                <div className="demo-logo-vertical" />
                <div
                    className=""
                    style={{
                        fontSize: "24px",
                        color: "black",
                        textAlign: "center",
                        margin: "10px",
                        fontWeight: "bold",
                    }}
                >
                    <UserOutlined />
                    {!collapsed && (
                        <span
                            className="ant-menu-title-content"
                            style={{ marginLeft: "10px" }}
                        >
                            Admin Panel
                        </span>
                    )}{" "}
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    style={{ width: "100%" }}
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <UserOutlined />,
                            label: "Dashboard",
                        },
                        {
                            key: "2",
                            icon: <VideoCameraOutlined />,
                            label: "Products Management",
                        },
                        {
                            key: "3",
                            icon: <UploadOutlined />,
                            label: "Users List",
                        },
                        {
                            key: "4",
                            icon: <UploadOutlined />,
                            label: "Settings",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: "30px",
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
