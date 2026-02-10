import { ENDPOINTS } from "../../constants";
import { omitUndefined } from "../../utils/omitUndefined";
import { BaseService } from "../baseService";
import type {
  GetMccDescriptionResponse,
  ValidateIbanResponse,
  GetBankBySwiftResponse,
  GetMccDescriptionRequest,
  ValidateIbanRequest,
  GetBankBySwiftRequest,
} from "./utils.types";

export class UtilsService extends BaseService {
  getMccDescription(mcc?: string) {
    const payload = omitUndefined<GetMccDescriptionRequest>({ mcc });
    return this.post<GetMccDescriptionRequest, GetMccDescriptionResponse>(
      ENDPOINTS.utils.mcc,
      payload,
    );
  }

  validateIban(iban?: string) {
    const payload = omitUndefined<ValidateIbanRequest>({ iban });
    return this.post<ValidateIbanRequest, ValidateIbanResponse>(
      ENDPOINTS.utils.validateIban,
      payload,
    );
  }

  getBankBySwift(swift?: string) {
    const payload = omitUndefined<GetBankBySwiftRequest>({ swift });
    return this.post<GetBankBySwiftRequest, GetBankBySwiftResponse>(
      ENDPOINTS.utils.bankBySwift,
      payload,
    );
  }
}
