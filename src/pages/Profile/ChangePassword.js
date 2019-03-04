import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './style.less';

const FormItem = Form.Item;
// const { Option } = Select;
// const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['profile/changepasswd'],
}))
@Form.create()
class ChangePassword extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      retypeNewPassword: '',
    };
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { newPassword, retypeNewPassword } = this.state;
        if (newPassword !== retypeNewPassword) return;
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
    const { password, newPassword, retypeNewPassword } = this.state;
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
      <PageHeaderWrapper title="Đổi password">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {/*
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
            */}
            <FormItem {...formItemLayout} label="Old password">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'password',
                    value: password,
                    onChange: this.handleChange.bind('password'),
                  },
                ],
              })(<Input type="password" placeholder="Old password" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="New password">
              {getFieldDecorator('new_password', {
                rules: [
                  {
                    required: true,
                    message: 'New password',
                    value: newPassword,
                    onChange: this.handleChange.bind('newPassword'),
                  },
                ],
              })(<Input type="password" placeholder="New password" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Confirm password">
              {getFieldDecorator('retype_new_password', {
                rules: [
                  {
                    required: true,
                    message: 'Confirm password',
                    value: retypeNewPassword,
                    onChange: this.handleChange.bind('retypeNewPassword'),
                  },
                ],
              })(<Input type="password" placeholder="Confirm password" />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit
              </Button>
              <Button style={{ marginLeft: 8 }}>Hủy</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ChangePassword;
