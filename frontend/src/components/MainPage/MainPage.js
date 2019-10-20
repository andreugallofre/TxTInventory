import React, {Component} from "react";
import { Layout, Menu, Icon } from 'antd';
import { Home } from './Home/Home.js';
import './MainPage.css';

const { Header, Content, Footer } = Layout;
export class MainPage extends Component {

  state = {
    items: [],
    visible: false,
    home: true
  };
  
  toHomePage = () => {
    this.setState({ home: true })
  };

  
  render() {
      return (
          <div>
              <Layout className="layout">
                  <Header className="header-style">
                      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu-style" >
                          <Menu.Item key="1" onClick={this.toHomePage}> <Icon type="home" /> Inventory</Menu.Item>
                      </Menu>
                  </Header>
                  <Content className="content-style" >
                    <div className="components">
                      { this.state.home ? <Home /> : null }
                    </div>
                  </Content>
                  <Footer className="footer-style" >
                      Made with <Icon type="laptop" /> by <a href="https://andreu.dev"> Andreu Gallofré </a>
                  </Footer>
              </Layout>
          </div>
      )
  }
}


