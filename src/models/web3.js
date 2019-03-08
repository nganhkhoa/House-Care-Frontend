// import { message } from 'antd';
import Web3 from 'web3';

const getStatus = state => state.web3Init;

export default {
  namespace: 'web3',

  state: {
    web3Init: false,
    instance: {},
    defaultAddress: '',
  },

  effects: {
    *init(_, { call, select, put }) {
      const web3Init = yield select(getStatus);
      if (web3Init) return;
      if (window.ethereum) {
        try {
          yield call(window.ethereum.enable);
          const web3 = new Web3(ethereum);
          yield put({
            type: 'setWeb3',
            payload: {
              instance: web3,
              defaultAddress: ethereum.selectedAddress,
            },
          });
        } catch (error) {
          console.log('ERRROR', error);
          // User denied account access...
        }
      }
    },
  },

  reducers: {
    setWeb3(state, { payload }) {
      console.log(payload);
      return {
        instance: payload.instance,
        defaultAddress: payload.defaultAddress,
        web3Init: true,
      };
    },
  },
};
