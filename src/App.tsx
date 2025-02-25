import React, { useState } from "react";
import {
    DockerOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Product } from "./components/Product/Product";
import { Users } from "./components/Users/Users";
import { Setting } from "./components/Setting/Setting";
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{}} className="min-h-screen flex p-0">
            <Sider
                trigger={null}
                collapsible
                width={300}
                collapsed={collapsed}
                className="bg-white "
            >
                <div className="demo-logo-vertical" />
                <div className=" text-center m-[10px]">
                    <div className="text-2xl text-white bg-blue-400 rounded-lg  flex items-center justify-center">
                        <DockerOutlined />
                        {!collapsed && (
                            <span className="font-bold ml-[10px]">
                                Admin Panel
                            </span>
                        )}
                    </div>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    className="w-full"
                    defaultSelectedKeys={["1"]}
                >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        <Link to="/product">Product Management</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        <Link to="/contact">Users List</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UploadOutlined />}>
                        <Link to="/setting">Settings</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{ background: colorBgContainer }}
                    className={`p-0`}
                >
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
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/contact" element={<Users />} />
                    <Route path="/setting" element={<Setting />} />
                </Routes>
            </Layout>
        </Layout>
    );
};

export default App;
