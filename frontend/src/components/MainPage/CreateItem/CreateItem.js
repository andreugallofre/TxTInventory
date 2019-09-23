import React from "react";
import { Form, Modal, Input, Select, DatePicker } from 'antd';
import '../MainPage.css'
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
        const config = {
          rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        return (isLoaded ?
          <Modal
            visible={visible}
            title="Add new item"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input the name of collection!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Serial Number">
                {getFieldDecorator('serial_number', {
                  rules: [{ required: true, message: 'Please input the serial number of collection!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="DatePicker[showTime]">
                {getFieldDecorator('donation_date', config)(
                  <DatePicker showTime format="YYYY/MM/DD" />,
                )}
              </Form.Item>
              <Form.Item label="Donation Company" className="collection-create-form_last-form-item">
                {getFieldDecorator('donator_company', {
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