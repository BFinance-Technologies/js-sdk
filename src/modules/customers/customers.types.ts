import { ApiResponse, Id } from "../../types";

export type CustomerId = Id;

export type CustomerType = "individual" | "business";

type CustomerAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  countryCode?: string;
  postalCode?: string;
};

type IdentityDocument = {
  type: "passport" | "driverLicense" | "idCard" | "residencePermit";
  issuingCountry?: string;
  imageFront?: string;
  imageBack?: string;
  contentType?: string;
};

type OtherDocument = {
  type: "proofOfAddress";
  issuingCountry?: string;
  content?: string;
  contentType?: string;
};

export type CreateCustomerRequest = {
  type: CustomerType;
  level?: "minimum" | "basic" | "advanced";
  sumsubShareToken?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  nationality?: string; // ISO-3 country code
  nationalId?: string;
  address?: CustomerAddress;
  phone?: string;
  email?: string;
  identityDocuments?: IdentityDocument;
  otherDocuments?: OtherDocument;
};

type IndividualData = {
  level?: string;
  firstName?: string;
  lastName?: string;
  nationality?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
};

export type CreateCustomerResponse = ApiResponse<{
  id: CustomerId;
  type: CustomerType;
  status: string;
  individualData: IndividualData;
  sumsub: {
    url: string;
  };
}>;

type CustomersCardType = "cards" | "virtual-account";

type FeatureAccess = {
  id: string;
  type: CustomersCardType;
  cardType?: string;
  status: string;
  rejectionReasons: string[];
};

type IndividualDataAddress = {
  line1?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
};

type IndividualDataWithAddress = {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  nationality?: string;
  nationalId?: string;
  address?: IndividualDataAddress;
  phone?: string;
  email?: string;
};

export type Customer = {
  id: CustomerId;
  type: CustomerType;
  status: string;
  individualData: IndividualDataWithAddress;
  featuresAccess: FeatureAccess[];
  sumsub: {
    url: string;
  };
};

export type GetCustomerByIdResponse = ApiResponse<Customer>;

export type DeleteCustomerResponse = ApiResponse<{}>;

export type RequestFeatureAccessRequest =
  | {
      accessType: "cards";
      cardType: string;
    }
  | { accessType: "virtual-account"; cardType?: string };

export type RequestFeatureAccessResponse = ApiResponse<{
  accessType: string;
  customerId: CustomerId;
  status: string;
}>;

export type ListCustomerQuestionnaires = ApiResponse<{
  questionnaires: {
    id: string;
    name: string;
    completed: boolean;
    completedAt: string | null;
  }[];
}>;

export type GetCustomerQuestionnaireDetailes = ApiResponse<{
  questionnaire: {
    id: string;
    name: string;
    completed: boolean;
    questionnaire: {
      id: string;
      question: string;
      type: string;
      required: boolean;
      placeholder: string | null;
      options: string[] | null;
    }[];
    completedAt: string | null;
  };
}>;

export type SubmitQuestionnaireAnswersRequest = {
  answers: { id: string; answer: string }[];
};

export type SubmitQuestionnaireAnswersResponse = ApiResponse<{}>;

export type GetSumsubTokenRequest = {
  clientId: string;
};

export type GetSumsubTokenResponse = ApiResponse<{
  reusableToken: string;
}>;
