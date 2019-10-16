import React from "react";
import { Form, Modal, Input, Select } from 'antd';
import api from "../../../api/api";
import 'antd/dist/antd.css'

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

const { Option } = Select;

export const CreateItemForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {    
      constructor(props) {
        super(props);
       
        this.state = {
          isLoaded: false,
          companies: null,
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
                  {companies.map(cmp => (<Option key={cmp.id} value={cmp.id}>{cmp.name}</Option>)) }
                </Select>,
                )}
              </Form.Item>
            </Form>
          </Modal> :
          <div></div>
        );
      }
    },
  )