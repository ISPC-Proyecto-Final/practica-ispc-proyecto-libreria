export interface Coupon{
    id_coupon: number,
    name: string, 
    discount: number;
}

export interface createCouponDTO extends Pick<Coupon, 'name' | 'discount'> { }