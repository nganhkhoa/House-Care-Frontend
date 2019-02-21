import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile: profile.data,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.profile = {};
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    return (
      <PageHeaderWrapper title="Hồ sơ người dùng">
        <Card bordered={false} loading={loading}>
          <p>{profile.username}</p>
          {/* <DescriptionList size="large" title={data.name} style={{ marginBottom: 32 }}>
            <Description term="User name">{data.username}</Description>
            <Description term="Ngày sinh">{data.DoB}</Description>
            <Description term="Email">{data.email}</Description>
            <Description term="Giới tính">{data.sex}</Description>
            <Description term="Địa chỉ">{data.address}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
            <Description term="Năm kinh nghiệm">{data.experience}</Description>
            <Description term="Loại người dùng">{data.role}</Description>
            <Description term="Địa chỉ ví điện tử">{data.walletAddress}</Description>
          </DescriptionList> */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
