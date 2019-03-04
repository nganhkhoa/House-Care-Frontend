import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Tooltip, Icon, Button, Row, Col, Card, List, Avatar, Table, Popover } from 'antd';

// import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Workplace.less';

/* eslint "no-underscore-dangle": [1, { "allow": ["_id"] }] */

@connect(({ web3, user, project, activities, chart, loading }) => ({
  web3: web3.instance,
  currentUser: user.currentUser.data,
  // project,
  today: project.today,
  activities,
  chart,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  // projectLoading: loading.effects['project/fetchNotice'],
  todayLoading: loading.effects['project/fetchToday'],
  web3Loading: loading.effects['web3/init'],
  // activitiesLoading: loading.effects['activities/fetchList'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'project/fetchToday',
    });
    dispatch({
      type: 'web3/init',
    });
    // dispatch({
    //   type: 'activities/fetchList',
    // });
    // dispatch({
    //   type: 'chart/fetch',
    // });
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/clear',
    // });
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      currentUser,
      currentUserLoading,
      // project: { notice },
      // projectLoading,
      today,
      web3,
      // activitiesLoading,
      // chart: { radarData },
    } = this.props;

    console.log(web3);

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>Xin chào, {currentUser.name}.</div>
            <div>
              {currentUser.role} | {currentUser.email}
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>Công việc đã nhận</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>Công việc trong tuần</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>Điểm đánh giá</p>
          <p>2,223</p>
        </div>
      </div>
    );

    const todayColumns = [
      {
        title: 'Owner',
        dataIndex: 'owner.name',
        key: 'owner',
        render: (name, { owner }) => {
          const userContent = (
            <div>
              <p>Username: {owner.username}</p>
              <p>Name: {owner.name}</p>
              <p>Email: {owner.email}</p>
            </div>
          );
          const userLink = `/users/${owner._id}`;
          return (
            <Popover content={userContent} title="User information">
              <Button href={userLink}>{name}</Button>
            </Popover>
          );
        },
      },
      {
        title: 'Helper',
        dataIndex: 'helper.name',
        key: 'helper',
        render: (name, { helper }) => {
          if (helper === null)
            return (
              <span>
                <Icon type="user" /> Empty{' '}
              </span>
            );
          const userContent = (
            <div>
              <p>Username: {helper.username}</p>
              <p>Name: {helper.name}</p>
              <p>Email: {helper.email}</p>
            </div>
          );
          const userLink = `/users/${helper._id}`;
          return (
            <Popover content={userContent} title="User information">
              <Button href={userLink}>{name}</Button>
            </Popover>
          );
        },
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (time, { timespan }) => {
          const start = moment(time).hour();
          const end = start + timespan;
          const tooltipTitle = `${moment(time).format('D/M: HH')} - ${end}`;
          return (
            <Tooltip title={tooltipTitle}>
              <span>
                {start}h to {end}h
              </span>
            </Tooltip>
          );
        },
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Salary',
        dataIndex: 'expectedSalary',
        key: 'salary',
        render: (salary, { timespan }) => <span>{salary * timespan * 1000} vnd</span>,
      },
    ];

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Table dataSource={today} columns={todayColumns} />
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card style={{ marginBottom: 24 }} bordered={false} title="Thông tin nổi bật">
              <div className={styles.chart} />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
