
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState as State } from './app.state.interface';
import * as fromAuth from './auth/reducer/auth.reducer';
import * as fromProduct from './product/product-reducer/product.reducer';
import * as fromDelivery from './delivery/delivery-reducer/delivery.reducer';
import * as fromPayment from './payment/payment-reducer/payment.reducer';
import * as fromOrder from './order/order-reducer/order.reducer';
import * as fromMedia from './media/reducer/media.reducer';
import * as fromCommon from './common/reducer/common.reducer';
import * as fromDashboard from './dashboard/reducer/dashboard.reducer';
import * as fromSettings from './settings/reducer/settings.reducer';


import { environment } from '../../environments/environment';

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  product: fromProduct.reducer,
  payment: fromPayment.reducer,
  delivery: fromDelivery.reducer,
  order: fromOrder.reducer,
  media: fromMedia.reducer,
  common: fromCommon.reducer,
  dashboard: fromDashboard.reducer,
  settings: fromSettings.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
  return function(state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
