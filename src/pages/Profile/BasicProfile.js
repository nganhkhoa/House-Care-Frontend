import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile: profile.data,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    return (
      <PageHeaderWrapper title="Hồ sơ người dùng">
        <Card bordered={false} loading={loading}>
          <DescriptionList size="large" title="Thông tin cơ bản" style={{ marginBottom: 32 }}>
            <Description term="Name">{profile.name}</Description>
            <Description term="Username">{profile.username}</Description>
            <Description term="Email">{profile.email}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
            <Description term="Loại người dùng">{profile.role}</Description>
          </DescriptionList>
          {/*
        <Description term="Ngày sinh">{profile.DoB}</Description>
        <Description term="Giới tính">{profile.sex}</Description>
        <Description term="Địa chỉ">{profile.address}</Description>
        <Description term="Năm kinh nghiệm">{profile.experience}</Description>
        <Description term="Địa chỉ ví điện tử">{profile.walletAddress}</Description>
           */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
