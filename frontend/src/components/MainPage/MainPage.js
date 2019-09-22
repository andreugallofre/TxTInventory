import React, {Component} from "react";
import { Layout, Menu, Icon, Table, Divider, Button, 
         Form, Modal, Input, Select} from 'antd';
import './MainPage.css'
import ReactDOM from 'react-dom';
import {BrowserView} from "react-device-detect";
import api from "../../api/api";
import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout;
const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

const Testing = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line

  class extends React.Component {
    
    constructor(props) {
      super(props);
     
      this.state = {
        isLoaded: false,
        companies: null
      };



    }

    componentDidMount() {
      api.get("/company").then(response => response.data)
      .then((data) => {
        this.setState({ companies: data, isLoaded: true})
        console.log(this.state.companies)
      })
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { isLoaded, companies } = this.state;
      
      return (isLoaded ?
        <Modal
          visible={visible}
          title="Add new item"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="Donation Company" className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: '',
              })(
              <Select showSearchn style={{ width: 200 }} initialValue="Select a person" optionFilterProp="children"
                onChange={onChange} onFocus={onFocus} onBlur={onBlur} onSearch={onSearch}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }>
                {companies.map(cmp => (<Option key={cmp.name} value={cmp.name}>{cmp.name}</Option>)) }
              </Select>,
              )}
            </Form.Item>
          </Form>
        </Modal> :
        <div>Hello world</div> // or whatever loading state you want, could be null 
      );
    }
  },
)


export class MainPage extends Component {

  state = {
    items: [],
    data: [],
    companies: [],
    test: [],
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

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
            <a>Donate </a>
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
                                <Button type="primary" onClick={this.showModal}>
                                  New Collection
                                </Button>
                                <Table rowKey="serial_number" dataSource={this.state.items} columns={this.columns} />
                            </div>
                        </Content>
                        <Footer className="footer-style" >
                            Made with <Icon type="laptop" /> by <a href="https://andreu.dev"> Andreu Gallofré </a>
                        </Footer>
                    </Layout>
                </BrowserView>
                <Testing
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
            </div>
        )
    }
}


