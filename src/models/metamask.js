import { addWalletAddress, addContractAddress } from '@/services/api';
// import { message } from 'antd';

export default {
  namespace: 'metamask',

  state: {
    wallet: '',
    contract: '',
  },

  effects: {
    *fetchWalletAddress(_, { call, put }) {
      const response = yield call(addWalletAddress);
      yield put({
        type: 'saveWallet',
        payload: response,
      });
    },

    *fetchContractAddress(_, { call, put }) {
      const response = yield call(addContractAddress);
      yield put({
        type: 'saveContract',
        payload: response,
      });
    },
  },

  reducers: {
    saveWallet(state, action) {
      return {
        ...state,
        wallet: action.payload,
      };
    },

    saveContract(state, action) {
      return {
        ...state,
        address: action.payload,
      };
    },
  },
};
