const API_PREFIX = "/external/api";

export const ENDPOINTS = {
  cards: {
    details: (id: string) => `${API_PREFIX}/cards/${id}`,
    list: `${API_PREFIX}/cards/list`,
    issue: `${API_PREFIX}/cards/issue`,
    reissue: `${API_PREFIX}/cards/reissue`,
    transactions: (id: string) => `${API_PREFIX}/cards/${id}/transactions`,
    sensitive: (id: string) => `${API_PREFIX}/cards/${id}/sensetive`,
    freeze: (id: string) => `${API_PREFIX}/cards/${id}/freeze`,
    unfreeze: (id: string) => `${API_PREFIX}/cards/${id}/unfreeze`,
    delete: (id: string) => `${API_PREFIX}/cards/${id}/delete`,
    topup: (id: string) => `${API_PREFIX}/cards/${id}/topup`,
    withdraw: (id: string) => `${API_PREFIX}/cards/${id}/withdraw`,
    email: (id: string) => `${API_PREFIX}/cards/${id}/email`,
    phone: (id: string) => `${API_PREFIX}/cards/${id}/phone`,
    pin: (id: string) => `${API_PREFIX}/cards/${id}/pin`,
    updateVirtualCardArt: (id: string) => `${API_PREFIX}/cards/${id}/updateArt`,
    getAvailableCardTypes: `${API_PREFIX}/cards/types`,
    limits: (id: string) => `${API_PREFIX}/cards/${id}/limits`,
  },

  budgetCards: {
    byId: (id: string) => `${API_PREFIX}/budget-cards/${id}`,
    issue: `${API_PREFIX}/budget-cards/issue`,
    sensitive: (id: string) => `${API_PREFIX}/budget-cards/${id}/sensitive`,
    freeze: (id: string) => `${API_PREFIX}/budget-cards/${id}/freeze`,
    unfreeze: (id: string) => `${API_PREFIX}/budget-cards/${id}/unfreeze`,
    delete: (id: string) => `${API_PREFIX}/budget-cards/${id}/delete`,
    pin: (id: string) => `${API_PREFIX}/budget-cards/${id}/pin`,
    email: (id: string) => `${API_PREFIX}/budget-cards/${id}/email`,
    phone: (id: string) => `${API_PREFIX}/budget-cards/${id}/phone`,
    velocity: (id: string) => `${API_PREFIX}/budget-cards/${id}/velocity`,
  },

  physicalCards: {
    order: (id: string) => `${API_PREFIX}/physical-cards/${id}/order`,
    activate: (id: string) => `${API_PREFIX}/physical-cards/${id}/activate`,
  },

  customers: {
    create: `${API_PREFIX}/customers`,
    getById: (id: string) => `${API_PREFIX}/customers/${id}`,
    delete: (id: string) => `${API_PREFIX}/customers/${id}`,
    requestFeatureAccess: (id: string) =>
      `${API_PREFIX}/customers/${id}/request`,
    listCustomerQuestionnaires: (id: string) =>
      `${API_PREFIX}/customers/${id}/questionnaires`,
    customerQuestionnaireDetails: (id: string, questionnaireId: string) =>
      `${API_PREFIX}/customers/${id}/questionnaires/${questionnaireId}`,
    submitQuestionnaireAnswers: (id: string, questionnaireId: string) =>
      `${API_PREFIX}/customers/${id}/questionnaires/${questionnaireId}/submit`,
    getSumsubToken: (id: string) => `${API_PREFIX}/customers/${id}/sumsub`,
  },

  virtualAccounts: {
    list: `${API_PREFIX}/virtual-account/list`,
    getSupportedCurrencies: `${API_PREFIX}/virtual-account/currencies`,
    create: (customerId: string) =>
      `${API_PREFIX}/virtual-account/${customerId}/create`,
    eligibility: (customerId: string) =>
      `${API_PREFIX}/virtual-account/${customerId}/eligibility`,
    getVirtualAccounts: (customerId: string) =>
      `${API_PREFIX}/virtual-account/${customerId}`,
    getVirtualAccountActivity: (customerId: string, virtualAccountId: string) =>
      `${API_PREFIX}/virtual-account/${customerId}/${virtualAccountId}/activity`,
    close: (customerId: string, virtualAccountId: string) =>
      `${API_PREFIX}/virtual-account/${customerId}/${virtualAccountId}/close`,
  },

  disputes: {
    create: `${API_PREFIX}/disputes`,
    status: (id: string) => `${API_PREFIX}/disputes/${id}/status`,
    cancel: (id: string) => `${API_PREFIX}/disputes/${id}/cancel`,
  },

  esim: {
    countries: `${API_PREFIX}/esim/countries`,
    regions: `${API_PREFIX}/esim/regions`,
    countryPackages: (country: string) =>
      `${API_PREFIX}/esim/packages/country/${country}`,
    globalPackages: `${API_PREFIX}/esim/packages/global`,
    regionalPackages: (regionId: string) =>
      `${API_PREFIX}/esim/packages/regions/${regionId}`,
    packageDetails: (id: string) => `${API_PREFIX}/esim/packages/${id}`,
    purchase: (id: string) => `${API_PREFIX}/esim/packages/${id}`,
    details: (id: string) => `${API_PREFIX}/esim/details/${id}`,
  },

  utils: {
    mcc: `${API_PREFIX}/utils/mcc`,
    validateIban: `${API_PREFIX}/utils/validateIban`,
    bankBySwift: `${API_PREFIX}/utils/getBankBySwift`,
    searchAirports: `${API_PREFIX}/utils/flights/airports/search`,
    searchNearbyAirports: `${API_PREFIX}/utils/flights/airports/nearby`,
    flightInfo: `${API_PREFIX}/utils/flights/info`,
  },

  balance: {
    get: `${API_PREFIX}/balance`,
  },

  finance: {
    deposit: `${API_PREFIX}/finance/deposit`,
  },
} as const;
