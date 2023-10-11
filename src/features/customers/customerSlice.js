const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName": {
      return { ...state, fullName: action.payload };
    }
    default:
      return state;
  }
}

export function createcustomer(fullName, nationaID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalID: nationaID,
      createdAt: new Date().toDateString(),
    },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

//   store.dispatch(createcustomer("jonas lastname", "43243243"));
//   console.log(store.getState());
