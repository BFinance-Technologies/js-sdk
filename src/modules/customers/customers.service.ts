import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type {
  GetCustomerByIdResponse,
  CreateIndividualCustomerRequest,
  CreateIndividualCustomerResponse,
  CreateCustomerViaSumsubRequest,
  CreateCustomerViaSumsubResponse,
  RequestFeatureAccessRequest,
  RequestFeatureAccessResponse,
} from "./customers.types";

export class CustomersService extends BaseService {
  getById(customerId: string) {
    return this.get<GetCustomerByIdResponse>(
      ENDPOINTS.customers.byId(encodeURIComponent(customerId)),
    );
  }

  createIndividual(payload: CreateIndividualCustomerRequest) {
    return this.post<
      CreateIndividualCustomerRequest,
      CreateIndividualCustomerResponse
    >(ENDPOINTS.customers.entry, payload);
  }

  createViaSumsub(payload: CreateCustomerViaSumsubRequest) {
    return this.post<
      CreateCustomerViaSumsubRequest,
      CreateCustomerViaSumsubResponse
    >(ENDPOINTS.customers.sumsub, payload);
  }

  requestFeatureAccess(
    customerId: string,
    payload: RequestFeatureAccessRequest,
  ) {
    return this.post<RequestFeatureAccessRequest, RequestFeatureAccessResponse>(
      ENDPOINTS.customers.requestAccess(encodeURIComponent(customerId)),
      payload,
    );
  }
}
