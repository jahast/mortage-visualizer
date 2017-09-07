import { handleActions } from 'redux-actions';
import * as Actions from '../constants/actions';

const initialState: models.MortageParametersStoreState = {
  Interest: undefined,
  NumberOfMonths: undefined,
  TotalLoan: undefined
}

let mortageActions = handleActions<models.MortageParametersStoreState, models.GenericPayload>({

  [Actions.CHANGE_DURATION]: (state, action) => {
    return Object.assign({}, state, {NumberOfMonths: action.payload.paramUpdate * 12})
  },

  [Actions.CHANGE_INTEREST]: (state, action) => {
    return Object.assign({}, state, {Interest: action.payload.paramUpdate})
  },

  [Actions.CHANGE_TOTALLOAN]: (state, action) => {
    return Object.assign({}, state, {TotalLoan: action.payload.paramUpdate})
  }

}, initialState);

export default mortageActions;
