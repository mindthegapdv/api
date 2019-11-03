import React from 'react';
import { Orders } from 'components/views/Orders';
import { Order } from 'components/views/Order';
import { Groups } from 'components/views/Groups';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useRouter } from 'useRouter';

const { Header, Content, Footer } = Layout;

export const Home = () => {
  const router = useRouter();
  return (
    <Layout className="layout" style={{minHeight:"100vh"}}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          selectedKeys={[router.location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">Orders</Link>
          </Menu.Item>
          <Menu.Item key="/groups">
            <Link to="/groups">Groups</Link>
          </Menu.Item>
          <Menu.Item key="/settings">Settings</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: 280, margin: 24 }}>
          <Switch>
            <Route exact path="/orders/:orderId" component={Order} />
            <Route exact path="/" component={Orders} />
            <Route path="/groups" component={Groups} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>need2feed ©2018</Footer>
    </Layout>
  )
}
