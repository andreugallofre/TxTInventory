import React, {Component} from "react";
import { Table, Divider, Button } from 'antd';
import { CreateItemForm } from '../../Modals/CreateItem/CreateItem.js';
import api from "../../../api/api";

export class Home extends Component {

  state = {
    items: [],
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
            <a href='/'>Edit</a>
            <Divider type="vertical" />
            <a href='/'>Donate </a>
          </span>
        ),
      },
    ];
  }
    render() {
        return (
            <div>        
                <div className="components">
                    <div><h1>TxT Inventory</h1> <Button className="main-menu-btn" icon="plus-circle" type="primary" onClick={this.showModal}>Add</Button></div>
                    <Table rowKey="serial_number" dataSource={this.state.items} columns={this.columns} />
                </div>
                <CreateItemForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
            </div>
        )
    }
}
