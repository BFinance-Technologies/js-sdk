const API_PREFIX = "/external/api";

export const ENDPOINTS = {
  prepaidCards: {
    list: `${API_PREFIX}/prepaid-cards/list`,
    issue: `${API_PREFIX}/prepaid-cards/issue`,
    reissue: `${API_PREFIX}/prepaid-cards/reissue`,
    byId: (id: string) => `${API_PREFIX}/prepaid-cards/${id}`,
    transactions: (id: string) =>
      `${API_PREFIX}/prepaid-cards/${id}/transactions`,
    sensitive: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/sensetive`,
    freeze: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/freeze`,
    unfreeze: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/unfreeze`,
    delete: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/delete`,
    email: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/email`,
    phone: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/phone`,
    pin: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/pin`,
    topup: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/topup`,
    withdraw: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/withdraw`,
    approveTransaction: (id: string) =>
      `${API_PREFIX}/prepaid-cards/${id}/transactions/approve`,
    address: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/address`,
    limits: (id: string) => `${API_PREFIX}/prepaid-cards/${id}/limits`,
  },

  budgetCards: {
    issue: `${API_PREFIX}/budget-cards/issue`,
    byId: (id: string) => `${API_PREFIX}/budget-cards/${id}`,
    freeze: (id: string) => `${API_PREFIX}/budget-cards/${id}/freeze`,
    unfreeze: (id: string) => `${API_PREFIX}/budget-cards/${id}/unfreeze`,
    delete: (id: string) => `${API_PREFIX}/budget-cards/${id}/delete`,
    pin: (id: string) => `${API_PREFIX}/budget-cards/${id}/pin`,
    email: (id: string) => `${API_PREFIX}/budget-cards/${id}/email`,
    phone: (id: string) => `${API_PREFIX}/budget-cards/${id}/phone`,
    velocity: (id: string) => `${API_PREFIX}/budget-cards/${id}/velocity`,
    sensitive: (id: string) => `${API_PREFIX}/budget-cards/${id}/sensitive`,
  },

  physicalCards: {
    order: (id: string) => `${API_PREFIX}/physical-cards/${id}/order`,
    activate: (id: string) => `${API_PREFIX}/physical-cards/${id}/activate`,
  },

  customers: {
    entry: `${API_PREFIX}/customers`,
    sumsub: `${API_PREFIX}/customers/sumsub`,
    byId: (id: string) => `${API_PREFIX}/customers/${id}`,
    requestAccess: (id: string) => `${API_PREFIX}/customers/${id}/request`,
  },

  virtualAccounts: {
    list: (customerId: string) => `${API_PREFIX}/virtual-account/${customerId}`,
    eligibility: (customerId: string) =>
      `${API_PREFIX}/virtual-account/${customerId}/eligibility`,
    create: (customerId: string) =>
      `${API_PREFIX}/virtual-account/${customerId}/create`,
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
  },
} as const;
