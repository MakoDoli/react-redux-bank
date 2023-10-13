const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //later
      return {
        ...state,

        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

export function deposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertinCurrency" });

    // API Call

    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data.rates.USD);
    dispatch({ type: "account/deposit", payload: data.rates.USD }); //WHY "DISPATCH" and NOT "RETURN"?
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    // payload: { amount: amount, purpose: purpose },
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}

// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// store.dispatch(requestLoan(1000, "Buy a cheap car"));
// store.dispatch(payLoan());
// console.log(store.getState());
