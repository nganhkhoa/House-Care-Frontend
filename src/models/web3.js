// import { message } from 'antd';

const getStatus = state => state.web3Init;

export default {
  namespace: 'web3',

  state: {
    web3Init: false,
  },

  effects: {
    *init(_, { select, put }) {
      const web3Init = yield select(getStatus);
      if (web3Init) return;
      if (window.ethereum) {
        const web3 = window.ethereum;
        // console.log(web3);
        yield put({
          type: 'setWeb3',
          payload: web3,
        });
      }
    },
  },

  reducers: {
    setWeb3(state, { payload }) {
      return {
        instance: payload,
        currentAddress: payload.selectedAddress,
        web3Init: true,
      };
    },
  },
};
