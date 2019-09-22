import React, {Component} from "react";
import { Layout, Menu, Icon, Table, Tag, Popconfirm, Divider } from 'antd';
import './MainPage.css'
import {BrowserView} from "react-device-detect";
import api from "../../api/api";
import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout;



export class MainPage extends Component {

  state = {
    items: [],
  }
  componentDidMount() {
    api.get("/items").then(response => response.data)
    .then((data) => {
      this.setState({ items: data })
      console.log(this.state.items)
     })
}

  handleDelete(key) {
    console.log(key);
    api.post("/messages/" + key + "/delete/" );
    api.get("/messages").then(response => response.data)
    .then((data) => {
      this.setState({ items: data })
    })
  };

  handleResolve(key) {
    console.log(key);
    api.post("/messages/" + key + "/resolve/" );
    api.get("/messages").then(response => response.data)
    .then((data) => {
      this.setState({ items: data })
    })
  };

  constructor(props){
    super(props);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Serial Number',
        dataIndex: 'serial_number',
        key: 'serial_number',
      },
      {
        title: 'Donated on',
        dataIndex: 'entry_date',
        key: 'entry_date',
      },
      {
        title: 'Donated by',
        dataIndex: 'donation_company',
        key: 'donation_company',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>Edit</a>
            <Divider type="vertical" />
            <a>Donate</a>
          </span>
        ),
      },
    ];
  }
    render() {
        return (
            <div>
                <BrowserView>
                    <Layout className="layout">
                        <Header className="header-style">
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu-style" >
                                <Menu.Item key="1" onClick={this.toHomePage}> <Icon type="home" /> Inventory</Menu.Item>
                            </Menu>
                        </Header>
                        <Content className="content-style" >
                            <div className="components">
                                <h1>TxT Inventory</h1>
                                <Table rowKey="serial_number" dataSource={this.state.items} columns={this.columns} />
                            </div>
                        </Content>
                        <Footer className="footer-style" >
                            Made with <Icon type="laptop" /> by <a href="https://andreu.dev"> Andreu Gallofré </a>
                        </Footer>
                    </Layout>
                </BrowserView>
            </div>
        )
    }
}


