import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createcustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toDateString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createcustomer, updateName } = customSlice.actions;
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName": {
//       return { ...state, fullName: action.payload };
//     }
//     default:
//       return state;
//   }
// }

// export function createcustomer(fullName, nationaID) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName: fullName,
//       nationalID: nationaID,
//       createdAt: new Date().toDateString(),
//     },
//   };
// }

// export function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }

//   store.dispatch(createcustomer("jonas lastname", "43243243"));
//   console.log(store.getState());
export default customSlice.reducer;
