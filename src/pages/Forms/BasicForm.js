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

// Can not select days before today and today
const disabledDate = current => current && current < moment().endOf('day');

const disabledDateTime = () => ({
  disabledHours: () => range(0, 7) + range(21, 24),
  disabledMinutes: () => range(1, 60),
  disabledSeconds: () => range(1, 60),
});

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
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
        title="Tạo yêu cầu công việc mới"
        content="Tìm kiếm một người giúp việc mới với các thông tin bên dưới."
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="Nhập tiêu đề công việc">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Xin hãy nhập tiêu đề công việc',
                  },
                ],
              })(<Input placeholder="Dọn nhà" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Chọn ngày công việc">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'Xin hãy chọn ngày',
                  },
                ],
              })(
                <DatePicker
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{ defaultValue: moment('07:00:00', 'HH:mm:ss') }}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Chọn thời lượng công việc">
              {getFieldDecorator('duration', {
                rules: [
                  {
                    required: true,
                    message: 'Chọn thời lượng công việc',
                  },
                ],
              })(
                <Select defaultValue="1">
                  <Option value="1" disable={false}>
                    1 tiếng
                  </Option>
                  <Option value="3" disable={false}>
                    3 tiếng
                  </Option>
                  <Option value="6" disable={false}>
                    6 tiếng
                  </Option>
                  <Option value="12" disable={false}>
                    12 tiếng
                  </Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Địa chỉ">
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: 'Xin hãy nhập địa chỉ',
                  },
                ],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="Số 1 đường A, quận 1" rows={4} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Ghi chú công việc">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập ghi chú công việc',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />)}
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
