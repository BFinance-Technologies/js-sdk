import { ApiResponse, Id } from "../../types";

export type CustomerId = Id;

export type CustomerAddress = {
  line1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  line2?: string;
};

export type IndividualData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  nationalId: string;
  address: CustomerAddress;
  email: string;
  phone: string;
};

export type CustomersCardType = "cards" | "virtual-account" | (string & {});

export type FeatureAccess = {
  id: string;
  type: CustomersCardType;
  cardType?: string;
  status: string;
  rejectionReasons: string[];
};

export type Customer = {
  id: CustomerId;
  type: "individual" | (string & {});
  status: string;
  individualData: IndividualData;
  featuresAccess: FeatureAccess[];
  sumsub: {
    url: string;
  };
};

export type GetCustomerByIdResponse = ApiResponse<Customer>;

export type CreateIndividualCustomerRequest = {
  type: "individual";
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  nationalId?: string;
  address: CustomerAddress;
  email: string;
  phone: string;
};

export type CreateIndividualCustomerResponse = ApiResponse<{
  id: CustomerId;
  type: string;
  status: string;
  individualData: IndividualData;
  rejectionReasons: string[];
  canResubmit: boolean;
}>;

export type CreateCustomerViaSumsubRequest = {
  type: "individual";
  sumsubShareToken: string;
};

export type CreateCustomerViaSumsubResponse = ApiResponse<{
  id: CustomerId;
  type: string;
  status: string;
  sumsub: { url: string };
}>;

export type RequestFeatureAccessType =
  | "cards"
  | "virtual-account"
  | (string & {});

export type RequestFeatureAccessRequest = {
  accessType: RequestFeatureAccessType;
  cardType?: string;
};

export type RequestFeatureAccessResponse = ApiResponse<{
  accessType: string;
  customerId: CustomerId;
  status: string;
}>;
