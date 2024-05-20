import { DELIVERY_STATUS } from "src/app/utils/enums/sale.enum";

export interface Delivery {
  id_delivery: number,
  name: string,
  email: string,
  telephone_number: string,
  telephone_area_code: string,
  document: number,
  address_province: string,
  address_location: string,
  address_street: string,
  postal_code: string,
  status: DELIVERY_STATUS
}

export interface CreateDeliveryDto extends Omit<Delivery, 'id_delivery'> { }
