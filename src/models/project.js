import { queryProjectNotice, queryTodayWork, queryWork, ChooseWork } from '@/services/api';
// import { message } from 'antd';

export default {
  namespace: 'project',

  state: {
    notice: [],
    today: [],
    work: [],
  },

  effects: {
    *fetchNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchToday(_, { call, put }) {
      const response = yield call(queryTodayWork);
      yield put({
        type: 'saveToday',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetchAllDate(_, { call, put }) {
      const response = yield call(queryWork);
      yield put({
        type: 'saveWork',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *chooseWork({ payload }, { call }) {
      const response = yield call(ChooseWork, payload);
      const { success, message } = response;
      if (success) message.success('Đăng ký công việc thành công');
      else message.error(message);
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
    saveToday(state, action) {
      return {
        ...state,
        today: action.payload,
      };
    },
    saveWork(state, action) {
      return {
        ...state,
        work: action.payload,
      };
    },
  },
};
