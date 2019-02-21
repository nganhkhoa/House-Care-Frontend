import { queryCurrent } from '@/services/user';

export default {
  namespace: 'profile',

  state: {},

  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *changepasswd(_, { call, put }) {
      result = yield call(ChangePassword, payload);
      if (result.success) message.success('Đổi password thành công');
      else message.error(result.error);
    },
    // *fetchAdvanced(_, { call, put }) {
    //   const response = yield call(queryAdvancedProfile);
    //   yield put({
    //     type: 'show',
    //     payload: response,
    //   });
    // },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
