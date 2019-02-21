import { queryCurrent } from '@/services/user';
import { ChangePassword } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'profile',

  state: {
    data: {
      username: '',
      name: '',
      user: '',
      role: 0,
      email: '',
      DoB: new Date(),
      address: '',
      experience: '',
      walletAddress: '',
      sex: '',
    },
  },

  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *changepasswd({ payload }, { call }) {
      const result = yield call(ChangePassword, payload);
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
