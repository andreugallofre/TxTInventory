import React, {Component} from "react";
import { Table, Divider, Button } from 'antd';
import { CreateItemForm } from '../../Modals/CreateItem/CreateItem.js';
import api from "../../../api/api";
import './Home.css'

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
    api.get("/items").then(response => response.data).then((data) => {
      this.setState({ items: data })
      console.log(this.state.items)
     })
  }

  handleDelete(key) {
    console.log(key);
    api.post("/messages/" + key + "/delete/" );
    api.get("/messages").then(response => response.data).then((data) => {
      this.setState({ items: data })
    })
  };

  handleResolve(key) {
    console.log(key);
    api.post("/messages/" + key + "/resolve/" );
    api.get("/messages").then(response => response.data).then((data) => {
      this.setState({ items: data })
    })
  };

  constructor(props){
    super(props);
    this.columns = [
      { title: 'Name', dataIndex: 'name', key: 'name', defaultSortOrder: 'descend', sorter: (a, b) => a.name - b.name, sortDirections: ['descend', 'ascend'] },
      { title: 'Serial Number', dataIndex: 'serial_number', key: 'serial_number', defaultSortOrder: 'descend', sorter: (a, b) => a.serial_number - b.serial_number, sortDirections: ['descend', 'ascend'] },
      { title: 'Donated on', dataIndex: 'entry_date', key: 'entry_date', defaultSortOrder: 'descend', sorter: (a, b) => a.entry_date - b.entry_date, sortDirections: ['descend', 'ascend'] },
      { title: 'Donated by', dataIndex: 'donation_company', key: 'donation_company', defaultSortOrder: 'descend', sorter: (a, b) => a.donation_company - b.donation_company, sortDirections: ['descend', 'ascend'] },
      { title: 'Value', dataIndex: 'value', key: 'value', defaultSortOrder: 'descend', sorter: (a, b) => a.value - b.value, sortDirections: ['descend', 'ascend'] },
      { title: 'Action', key: 'action', 
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
                <CreateItemForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <div>
                    <h1 className="title">TXT INVENTORY</h1> 
                    <Button className="main-menu-btn" icon="plus-circle" type="primary" onClick={this.showModal}>Add</Button>
                    <Table rowKey="serial_number" dataSource={this.state.items} columns={this.columns} />
                </div>
            </div>
        )
    }
}
