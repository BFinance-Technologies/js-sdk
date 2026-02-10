import { BFinanceConfig } from "./types";
import { HttpClient } from "./http/HttpClient";
import { PrepaidCardsService } from "./modules/prepaidCards/prepaidCards.service";
import { UtilsService } from "./modules/utils/utils.service";
import { BudgetCardsService } from "./modules/budgetCards/budgetCards.service";
import { PhysicalCardsService } from "./modules/physicalCards/physicalCards.service";
import { CustomersService } from "./modules/customers/customers.service";
import { VirtualAccountsService } from "./modules/virtualAccounts/virtualAccounts.service";
import { DisputesService } from "./modules/disputes/disputes.service";
import { EsimService } from "./modules/esim/esim.service";

export class BFinance {
  public readonly prepaidCards: PrepaidCardsService;
  public readonly budgetCards: BudgetCardsService;
  public readonly physicalCards: PhysicalCardsService;
  public readonly customers: CustomersService;
  public readonly virtualAccounts: VirtualAccountsService;
  public readonly disputes: DisputesService;
  public readonly esim: EsimService;
  public readonly utils: UtilsService;

  constructor(config: BFinanceConfig) {
    const http = new HttpClient(config);

    this.prepaidCards = new PrepaidCardsService(http);
    this.budgetCards = new BudgetCardsService(http);
    this.physicalCards = new PhysicalCardsService(http);
    this.customers = new CustomersService(http);
    this.virtualAccounts = new VirtualAccountsService(http);
    this.disputes = new DisputesService(http);
    this.esim = new EsimService(http);
    this.utils = new UtilsService(http);
  }
}
