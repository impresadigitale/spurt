import { AuthState } from './auth/reducer/auth.state';
import { ProductState } from './product/product-reducer/product.state';
import { OrderState } from './order/order-reducer/order.state';
import { Media } from './media/reducer/media.state';
import { CommonState } from './common/reducer/common.state';
import { DashboardState } from './dashboard/reducer/dashboard.state';
import { PaymentState } from './payment/payment-reducer/payment.state';
import { DeliveryState } from './delivery/delivery-reducer/delivery.state';
import { SettingsState } from './settings/reducer/settings.state';



export interface AppState {
  auth: AuthState;
  media: Media;
  common: CommonState;
  product: ProductState;
  payment: PaymentState;
  order: OrderState;
  delivery: DeliveryState;
  dashboard: DashboardState;
  settings: SettingsState;
}
