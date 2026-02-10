import { MessageResponse } from "../../types";

export type PhysicalCardType = "budget" | "prepaid" | (string & {});

export type ShippingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderPhysicalCardRequest = {
  cardType: PhysicalCardType;
  shippingData: ShippingData;
};

export type ActivatePhysicalCardRequest = {
  cardType: PhysicalCardType;
  code: string;
};

export type PhysicalCardSimpleResponse = MessageResponse;
