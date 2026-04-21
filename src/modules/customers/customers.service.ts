import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type {
  CreateCustomerRequest,
  CreateCustomerResponse,
  GetCustomerByIdResponse,
  RequestFeatureAccessRequest,
  RequestFeatureAccessResponse,
  DeleteCustomerResponse,
  ListCustomerQuestionnaires,
  GetCustomerQuestionnaireDetailes,
  SubmitQuestionnaireAnswersRequest,
  SubmitQuestionnaireAnswersResponse,
  GetSumsubTokenResponse,
  GetSumsubTokenRequest,
} from "./customers.types";

export class CustomersService extends BaseService {
  create(payload: CreateCustomerRequest) {
    return this.post<CreateCustomerRequest, CreateCustomerResponse>(
      ENDPOINTS.customers.create,
      payload,
    );
  }

  getById(customerId: string) {
    return this.get<GetCustomerByIdResponse>(
      ENDPOINTS.customers.getById(encodeURIComponent(customerId)),
    );
  }

  deleteCustomer(customerId: string) {
    return this.delete<DeleteCustomerResponse>(
      ENDPOINTS.customers.delete(encodeURIComponent(customerId)),
    );
  }

  requestFeatureAccess(
    customerId: string,
    payload: RequestFeatureAccessRequest,
  ) {
    return this.post<RequestFeatureAccessRequest, RequestFeatureAccessResponse>(
      ENDPOINTS.customers.requestFeatureAccess(encodeURIComponent(customerId)),
      payload,
    );
  }

  listCustomerQuestionnaires(customerId: string) {
    return this.get<ListCustomerQuestionnaires>(
      ENDPOINTS.customers.listCustomerQuestionnaires(
        encodeURIComponent(customerId),
      ),
    );
  }

  customerQuestionnaireDetails(customerId: string, questionnaireId: string) {
    return this.get<GetCustomerQuestionnaireDetailes>(
      ENDPOINTS.customers.customerQuestionnaireDetails(
        encodeURIComponent(customerId),
        encodeURIComponent(questionnaireId),
      ),
    );
  }

  submitQuestionnaireAnswers(
    customerId: string,
    questionnaireId: string,
    payload: SubmitQuestionnaireAnswersRequest,
  ) {
    return this.post<
      SubmitQuestionnaireAnswersRequest,
      SubmitQuestionnaireAnswersResponse
    >(
      ENDPOINTS.customers.submitQuestionnaireAnswers(
        encodeURIComponent(customerId),
        encodeURIComponent(questionnaireId),
      ),
      payload,
    );
  }

  getSumsubToken(customerId: string, payload: GetSumsubTokenRequest) {
    return this.http.request<
      GetSumsubTokenResponse,
      GetSumsubTokenRequest,
      undefined
    >(
      "GET",
      ENDPOINTS.customers.getSumsubToken(encodeURIComponent(customerId)),
      payload,
      undefined,
      undefined,
    );
  }
}
