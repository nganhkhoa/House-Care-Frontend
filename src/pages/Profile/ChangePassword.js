import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, DatePicker, Select, Button, Card } from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
};


@connect(({ loading }) => ({
  submitting: loading.effects['profile/changepasswd'],
}))
@Form.create()
class ChangePassword extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      new_password: ''
    };
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        dispatch({
          type: 'profile/changepasswd',
          payload: values,
        });
      }
    });
  };

  handleChange = name => value => {
    this.setState({ [name]: value });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
        title="Đổi password"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="UserName">
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: 'UserName',
                    value: this.state.username,
                    onChange: this.handleChange.bind('username'),
                  },
                ],
              })(<Input placeholder="Username" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="New password">
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: 'New password',
                    value: this.state.password,
                    onChange: this.handleChange.bind('password'),
                  },
                ],
              })(<Input placeholder="New password" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Confirm password">
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: 'Confirm password',
                    value: this.state.new_password,
                    onChange: this.handleChange.bind('new_password'),
                  },
                ],
              })(<Input placeholder="Confirm password" />)}
            </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Đăng công việc
              </Button>
              <Button style={{ marginLeft: 8 }}>Hủy</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
