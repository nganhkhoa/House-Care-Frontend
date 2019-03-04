import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Tooltip, Button, Row, List, Avatar, Table, Popover } from 'antd';

// import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';

/* eslint "no-underscore-dangle": [1, { "allow": ["_id"] }] */

@connect(({ user, project, activities, chart, loading }) => ({
  currentUser: user.currentUser.data,
  // project,
  work: project.work,
  activities,
  chart,
  // currentUserLoading: loading.effects['user/fetchCurrent'],
  // projectLoading: loading.effects['project/fetchNotice'],
  todayLoading: loading.effects['project/fetchAllDate'],
  // activitiesLoading: loading.effects['activities/fetchList'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'user/fetchCurrent',
    // });
    dispatch({
      type: 'project/fetchAllDate',
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

  accept(workId) {
    // khi 1 người nhấn vào nút accept thì trường dữ liệu đó sẽ bị xóa
    // dong huy bo do se duoc them vao lich trinh cua nguoi giup viec
    // lich trinh cua nguoi thue se cap nhat ten cua nguoi giup viec
    // bảng hiển thị của những người khác cũng sẽ không có

    const { dispatch } = this.props;
    // cap nhat lai helper cho cong viec
    // dispatch({
    //   type: 'user/fetchCurrent',
    // });

    dispatch({
      type: 'project/chooseWork',
      payload: {
        workId,
      },
    });

    dispatch({
      type: 'project/fetchAllDate',
      payload: {
        workId,
      },
    });
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
      work,
      // activitiesLoading,
      // chart: { radarData },
    } = this.props;

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

    const columns = [
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
        render: (name, { helper, _id }) => {
          if (helper === null)
            return (
              <span>
                <Button type="text" size="small" onClick={this.accept(this, _id)}>
                  Accept
                </Button>
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
          const date = moment(time).format('dddd, DD-MM');
          const start = moment(time).hour();
          const end = start + timespan;
          const tooltipTitle = `${moment(time).format('D/M: HH')} - ${end}`;
          return (
            <Tooltip title={tooltipTitle}>
              <span>
                {date} {start}h to {end}h
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
      <PageHeaderWrapper loading={currentUserLoading} content={pageHeaderContent}>
        <Row>
          <Table dataSource={work} columns={columns} />
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
