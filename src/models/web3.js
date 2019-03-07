// // import { message } from 'antd';

// const getStatus = state => state.web3Init;

// export default {
//   namespace: 'web3',

//   state: {
//     web3Init: false,
//   },

//   effects: {
//     *init(_, { select, put }) {
//       const web3Init = yield select(getStatus);
//       if (web3Init) return;
//       if (window.ethereum) {
//         window.web3 = new Web3(ethereum);
//         try {
//           // Request account access if needed
//           ethereum.enable();
//           // Acccounts now exposed
//           yield put({
//             type: 'setWeb3',
//             payload: web3,
//           });
//         } catch (error) {
//           // User denied account access...
//         }
//       }
//     },
//   },

//   reducers: {
//     setWeb3(state, { payload }) {
//       console.log('ADDD');
//       console.log(payload.selectedAddress);
//       return {
//         instance: payload,
//         currentAddress: payload.selectedAddress,
//         web3Init: true,
//       };
//     },
//   },
// };
