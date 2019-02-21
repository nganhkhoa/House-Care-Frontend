import { queryProjectNotice, queryTodayWork } from '@/services/api';

export default {
  namespace: 'project',

  state: {
    notice: [],
    today: [],
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
  },
};
