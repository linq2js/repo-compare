// import { Saga, signal } from 'rativ/saga';

// const startActivity = signal();
// const stopActivity = signal();
// const deviceDisconnected = signal();
// const deviceConnected = signal();

// const subscribActivityChange = () => {};
// const unsubscribeActivityDataChange = () => {};

// const handleActivityDataChange: Saga = async ({ onCancel }) => {
//   subscribActivityChange();
//   onCancel(unsubscribeActivityDataChange);
// };

// const handleDeviceDisonnected: Saga = async ({ race, when, delay }) => {
//   await when(deviceDisconnected);
//   const results = await race({ delay: delay(30000), deviceConnected });
//   if (results.deviceConnected) {
//     return;
//   }
//   stopActivity();
// };

// const mainSaga: Saga = async ({ when, infinite, race, delay }) => {
//   await when(startActivity);
//   while (true) {
//     const r1 = await race({ handleActivityDataChange, deviceDisconnected, stopActivity });
//     if (r1.stopActivity) {
//       break;
//     }
//     if (r1.deviceDisconnected) {
//       // wait in 30s if device is re-connected, continue handleActivityDataChange
//       const r2 = await race({ delay: delay(30000), deviceConnected });
//       if (r2.deviceConnected) {
//         continue;
//       }
//       break;
//     }
//   }
// };

// export { mainSaga };
