# BFinance SDK

This SDK allows you to integrate BFinance Business services into your app.

## Installation

```ts
npm install @bfinance/sdk
```

## Initialization

- ### Configuration object

```ts
import { BFinance } from "@bfinance/sdk";

const client = new BFinance({
    baseUrl: "https://business.bfinance.app",
    apiToken: "YOUR_BEARER_TOKEN",
    timeoutMs?: 3000,
    headers?: {
        "Content-Type: application/json",
    }
});
```

Config fields

- `baseUrl` (required) — API base URL
- `apiToken` (required) — Bearer token
- `timeoutMs` (optional) — request timeout in ms
- `headers` (optional) — custom headers
- `logging` (optional) — request/response logging

```ts
logging: {
    level: "info",
    includeBody: false,
    includeHeaders: false,
},
```

- ### Authentication

The SDK uses Bearer token authorization for all requests:

- Header: Authorization: Bearer <apiToken>

Keep credentials secure and do not expose tokens in client-side apps.

## HTTP Layer: Errors, Interceptors, Base Service

The SDK uses a shared HTTP layer for all API calls.  
It provides consistent error handling, supports interceptors for logging/retries, and encapsulates common request logic in a base service class.

---

### Error Handling

All SDK methods throw standardized errors. Errors are split into two major categories:

#### 1) HTTP errors (API responded with 4xx/5xx)

These errors occur when the API returns a non-success HTTP status code.

Typical cases:

- `400` — validation error
- `401/403` — invalid or missing authorization
- `404` — resource not found
- `409` — conflict (if applicable)
- `429` — rate limit exceeded
- `5xx` — server errors

**What you get:**

- status - error
- HTTP status code
- a readable message
- errorId

#### 2) Network & client errors (no valid API response)

These errors occur when the request cannot be completed due to network or client-side problems:

- request timeout
- DNS / connectivity issues
- TLS handshake errors
- connection reset
- invalid / unparseable response body (rare)

---

#### 3) Recommended error handling pattern

```ts
{
  "statusCode": number;
  "message": string;
  "status"?: string;
  "errorId"?: string;
}
```

###### **HttpError** (API responded with 4xx/5xx)

###### Thrown when API returns non-2xx status code.

- statusCode — HTTP status code
- message — readable error message
- raw — raw response body (if any)

###### **NetworkError** (no valid API response)

###### Thrown for network/client issues:

- timeouts
- DNS/connectivity issues
- connection resets
- TLS errors

```ts
import { HttpError, NetworkError } from "@bfinance/sdk";

try {
  const customer = await client.customers.getById("123");
} catch (err) {
  if (err instanceof HttpError) {
    console.log("HTTP error:", err.statusCode, err.message, err.details);
  } else if (err instanceof NetworkError) {
    console.log("Network error:", err.message, err.details);
  } else {
    console.log("Unknown error:", err);
  }
}
```

#### 4) Logging (interceptors)

```ts
const client = new BFinance({
  baseUrl: "https://business.bfinance.app",
  apiToken: "YOUR_BEARER_TOKEN",
  logging: {
    level: "info", // "none" | "error" | "info" | "debug"
    includeBody: false,
    includeHeaders: false,
  },
});
```

## Card Management

The SDK provides card management through three modules:

- `client.prepaidCards` — prepaid cards lifecycle and operations
- `client.budgetCards` — budget-linked cards lifecycle and operations
- `client.physicalCards` — ordering and activating physical cards

> **Security:** Methods that return sensitive card data (PAN/CVC/expiry) must never be logged.

---

### Cards (`client.cards`)

#### Available methods

- `cards.getDetails(cardId: string)` — retrieve details of a specific card by its ID or external ID.

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
    "maskedCardNumber": string;
    "sensetive": {
      "number": string;
      "expire": string;
      "cvc": string;
    };
    "currency": string;
    "status": string;
    "externalCardId": string;
    "balance": {
      "value": number;
      "currency": string;
    };
    "label": string;
    "cardHolder": {
      "firstName": string;
      "lastName": string;
      "customerId": string;
    };
    "email": string;
    "phone": string;
  }
}
```

- `cards.getList(params?)` — get a paginated list of cards

**Params**

```ts
{
  "page"?: number; // optional, default: 1
  "limit"?: number; // optional, default: 10
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "cards": [
      {
        "id": string;
        "maskedCardNumber": string;
        "currency": string;
        "status": string;
        "externalCardId": string;
      }
    ],
    "page": number;
    "limit": number;
  }
}
```

- `cards.issue(payload)` — issue a new card

**Payload**

```ts
{
  "typeId": string;
  "initialBalance": number;
  "firstName": string;
  "lastName": string;
  "label"?: string; // optional
  "customerId"?: string;
  "configuration"?: {
    "displayName"?: string;
    "address"?: string;
  };
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "card": {
      "id": string;
      "cardNumber": string;
      "cardExpire": string;
      "cardCVC": string;
      "cardBalance": number;
      "currency": string;
      "maskedCardNumber": string;
      "brand": string;
      "label": string;
    }
  }
}
```

- `cards.reissue(payload)` — reissue an existing card

**Payload**

```ts
{
  "cardId": string;
  "initialBalance": number;
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "card": {
      "id": string;
      "cardNumber": string;
      "cardExpire": string;
      "cardCVC": string;
      "cardBalance": number;
      "currency": string;
      "maskedCardNumber": string;
      "brand": string;
      "label": string;
    }
  }
}
```

- `cards.getTransactions(cardId: string, params?)` — get transactions for a card (paginated)

**Params**

```ts
{
  "page"?: number; // optional, default: 1
  "limit"?: number; // optional, default: 10
}
```

**Response**

```ts
{
  "status": string;
  "data": {
   "transactions": [
      {
        "id": string;
        "amount": number;
        "currency": string;
        "usdAmount": number;
        "merchant": string;
        "status": string;
        "type": string;
        "date": Date | string;
        "transactionId": string;
        "declineReason": string | null;
      }
    ]
  }
}
```

- `cards.getSensitive(cardId: string)` — retrieve sensitive card data (card number, expiration date, and CVC)

**Response**

```ts
{
  "status": string;
  "data": {
    "number": string;
    "expire": string;
    "cvc": string;
  }
}
```

- `cards.freeze(cardId: string)` — freeze a card

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `cards.unfreeze(cardId: string)` — unfreeze a card

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `cards.deleteCard(cardId: string)` — delete a card

```ts
{
"status": string;
"message": string;
}
```

- `cards.updateEmail(cardId: string, payload)` — update email associated with a card

**Payload**

```ts
{
  "email": string;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `cards.updatePhoneNumber(cardId: string, payload)` — update phone number associated with a card

**Payload**

```ts
{
  "phone": string;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `cards.topUp(cardId: string, payload)` — top up a card

**Payload**

```ts
{
  "phone": string;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `cards.setPin(cardId: string, payload)` — set card PIN

**Payload**

```ts
{
  "pin": string;
}
```

**Response**

```ts
{
"status": string;
"message": string;
}
```

- `cards.withdrawFunds(cardId: string, payload)` — withdraw funds from a card

**Payload**

```ts
{
  "amount": number;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `cards.updateVirtualCardArt(cardId: string, payload)` - updates the design (art) of a virtual card

**Payload**

```ts
{
  "cardArtId": string;
}
```

**Response**

```ts
{
  "status": string;
  "data": {}
}
```

- `cards.getAvailableCardTypes()` - returns active card types available for the current user

**Response**

```ts
{
  "status": string;
  "data": {
    "types": [
      {
        "id": string;
        "name": string;
        "cardCurrency": string;
        "price": string;
        "brand": "visa" | (string & {});
      }
    ];
  }
}
```

- `cards.getSpendingLimits(cardId: string)` — get spending limits

**Response**

```ts
{
  "status": string;
  "data": {
    "ecommerce": {
      "daily": {
        "limit": number;
        "used": number;
      },
      "monthly": {
        "limit": number;
        "used": number;
      },
      "transaction": {
        "limit": number;
      }
    },
    "pos": {
      "daily": {
        "limit": number;
        "used": number;
      },
      "monthly": {
        "limit": number;
        "used": number;
      },
      "transaction": {
        "limit": number;
      }
    }
  }
}
```

- `cards.setSpendingLimits(cardId: string, payload)` — set spending limits

**Payload**

```ts
{
  "type": string;
  "limit": number;
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "type": string;
    "limit": number;
  }
}
```

---

### Budget Cards (`client.budgetCards`)

#### Available methods

- `budgetCards.issue(payload)` — issue a new budget card

**Payload**

```ts
{
  "typeId": string;
  "budgetId": string;
  "firstName": string;
  "lastName": string;
  "label"?: string; // optional
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
    "maskedCardNumber": string;
    "currency": string;
    "status": string;
    "externalCardId": string;
    "sensitive": {
      "number": string;
      "expire": string;
      "cvc": string;
    }
  }
}
```

- `budgetCards.getSensitive(cardId: string)`

**Response**

```ts
{
  "status": string;
  "data": {
      "number": string;
      "expire": string;
      "cvc": string;
    }
}
```

- `budgetCards.freeze(cardId: string)` — freeze a budget card

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `budgetCards.unfreeze(cardId: string)` — unfreeze a budget card

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `budgetCards.delete(cardId: string)` — delete a budget card

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `budgetCards.getById(cardId: string)` — get a budget card by ID (internal ID or externalCardId)

**Response**

```ts
{
  "status": string;
  "data": {
      "id": BudgetCardId;
      "maskedCardNumber": string;
      "currency": string;
      "status": string;
      "externalCardId": string;
      "sensitive": BudgetCardSensitive;
    };
}
```

- `budgetCards.setPin(cardId: string, payload)` — set or change a card PIN

**Payload**

```ts
{
  "pin": string;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `budgetCards.updateEmail(cardId: string, payload)` — update the cardholder’s email

**Payload**

```ts
{
  "email": string;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `budgetCards.setVelocityLimits(cardId: string, payload)` — configure velocity limits

**Payload**

```ts
{
  "type": string;
  "amount": number;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `budgetCards.getSensitive(cardId: string)` — retrieve full PAN data (PAN/expiry/CVC)

**Response**

```ts
{
  "status": string;
  "data": {
    "number": string;
    "expire": string;
    "cvc": string;
  }
}
```

- `budgetCards.updatePhoneNumber(cardId: string, payload)` — update the cardholder’s phone number

**Payload**

```ts
{
  "pin": string;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

---

### Physical Cards (`client.physicalCards`)

Physical cards can be ordered and activated for both prepaid and budget cards.

#### Available methods

- `physicalCards.order(cardId: string, payload)` — order a physical card (for prepaid or budget)

**Payload**

```ts
{
  "cardType": string;
  "shippingData": {
    "firstName": string;
    "lastName": string;
    "email": string;
    "phone": string;
    "phoneCode": string;
    "addressLine1": string;
    "addressLine2": string;
    "city": string;
    "state": string;
    "postalCode": string;
    "country": string;
  }
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

- `physicalCards.activate(cardId: string, payload)` — activate a physical card

**Payload**

```ts
{
  "cardType": string;
  "code": string;
}
```

**Response**

```ts
{
  "status": string;
  "message": string;
}
```

## Customers Management

Customers are managed through the `client.customers` module.

---

### Available methods (`client.customers`)

- `customers.getById(customerId: string)` — get customer by ID

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
    "type": string;
    "status": string;
    "individualData": {
      "firstName": string;
      "lastName": string;
      "birthDate": string;
      "nationality": string;
      "nationalId": string;
      "address": {
        "line1": string;
        "city": string;
        "state": string;
        "country": string;
        "zipCode": string;
      },
      "email": string;
      "phone": string;
    },
    "featuresAccess": [
      {
        "id": string;
        "type": string;
        "cardType": string;
        "status": string;
        "rejectionReasons": string[];
      },
      {
        "id": string;
        "type": string;
        "status": string;
        "rejectionReasons": string[];
      }
    ],
    "sumsub": {
      "url": string;
    }
  }
}
```

- `customers.create(payload)` — create an customer

**Payload**

```ts
{
  "type": "individual" | "business";
  "level"?: "minimum" | "basic" | "advanced";
  "sumsubShareToken"?: string;
  "firstName"?: string;
  "lastName"?: string;
  "birthDate"?: string;
  "nationality"?: string; // ISO-3 country code
  "nationalId"?: string;
  "address"?: {
    "line1"?: string;
    "line2"?: string;
    "city"?: string;
    "state"?: string;
    "countryCode"?: string;
    "postalCode"?: string;
  };
  "phone"?: string;
  "email"?: string;
  "identityDocuments"?: {
    "type": "passport" | "driverLicense" | "idCard" | "residencePermit";
    "issuingCountry"?: string;
    "imageFront"?: string;
    "imageBack"?: string;
    "contentType"?: string;
  };
  "otherDocuments"?: {
    "type": "proofOfAddress";
    "issuingCountry"?: string;
    "content"?: string;
    "contentType"?: string;
  };
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
    "type": "individual" | "business";
    "status": string;
    "individualData": {
      "level"?: string;
      "firstName"?: string;
      "lastName"?: string;
      "nationality"?: string;
      "birthDate"?: string;
      "phone"?: string;
      "email"?: string;
    };
    "sumsub": {
      "url": string;
    };
  }
}
```

- `customers.requestFeatureAccess(customerId: string, payload)` — request access to features such as **cards** or **virtual-account**

**Payload**

```ts
{
  "accessType": string;
  "cardType": string;
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "accessType": string;
    "customerId": string;
    "status": string;
  }
}
```

- `customers.deleteCustomer(customerId: string)` — deletes a customer that belongs to the current user.

- `customers.listCustomerQuestionnaires(customerId: string)` — returns questionnaires available for the customer and whether each one is completed.

- `customers.customerQuestionnaireDetails(customerId: string, questionnaireId: string, payload)` — Returns questionnaire questions and completion status for the customer.

- `customers.submitQuestionnaireAnswers(customerId: string, questionnaireId: string, payload)` — Submits questionnaire answers for the customer.

- `customers.getSumsubToken(customerId: string, payload)` — Generates a reusable Sumsub share token for the specified customer and client ID.

## Virtual Accounts

Virtual accounts are managed through the `client.virtualAccounts` module.

---

### Available methods (`client.virtualAccounts`)

- `virtualAccounts.getList(customerId: string)` — list customer's virtual accounts

**Response**

```ts
{
  "status": string;
  "data": [
    {
      "id": string;
      "status": string;
      "depositInstructions": {
        "currency": string;
        "iban": string;
        "bic": string;
        "accountHolderName": string;
        "bankName": string;
        "bankAddress": string;
        "bankRoutingNumber": string;
        "bankAccountNumber": string;
        "beneficiaryName": string;
        "beneficiaryAddress": string;
        "paymentRails": string[];
        "clabe": string;
        "pixCode": string;
      }
    }
  ]
}
```

- `virtualAccounts.getEligibility(customerId: string)` — check eligibility for virtual account types (e.g. usd/eur/mxn/brl)

**Response**

```ts
{
  "status": string;
  "data": {
    "eligibile": boolean;
    "eligibileFor": string[];
  }
}
```

- `virtualAccounts.create(customerId: string, payload)` — create a virtual account for the customer

**Payload**

```ts
{
  "type": string;
  "destination": {
    "currency": string;
    "chain": string;
    "address": string;
  }
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "status": string;
    "depositInstructions": {
      "currency": string;
      "iban": string;
      "bic": string;
      "accountHolderName": string;
      "bankName": string;
      "bankAddress": string;
      "bankRoutingNumber": string;
      "bankAccountNumber": string;
      "beneficiaryName": string;
      "beneficiaryAddress": string;
      "paymentRails": string[];
      "clabe": string;
      "pixCode": string;
    }
  }
}
```

- `virtualAccounts.getSupportedCurrencies()` — Returns the list of supported currencies, countries, and payment rails for virtual accounts.

- `virtualAccounts.getAccounts(customerId: string)` — Lists customer’s virtual accounts.

- `virtualAccounts.getActivity(customerId: string, virtualAccountId: string, params)` — Returns activity history for a specific virtual account.

- `virtualAccounts.close(customerId: string, virtualAccountId: string)` — Closes a specific virtual account.

## Disputes

Disputes are managed through the `client.disputes` module.

A dispute can be created for a prepaid or budget card transaction.
The SDK allows you to create a dispute, check its status, and cancel it (if still pending).

---

### Available methods (`client.disputes`)

- `disputes.create(payload)` — create a dispute for a card transaction

**Payload**

```ts
{
  "cardId": string;
  "transactionId": string;
  "textEvidence": string;
  "files": string[]; // optional
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
    "status": string;
    "textEvidence": string;
    "files": string[];
    "createdAt": Date | string;
  }
}
```

- `disputes.getStatus(disputeId: string)` — retrieve dispute status

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
    "status": string;
    "response": string;
  }
}
```

- `disputes.cancel(disputeId: string)` — cancel a dispute (only if pending)

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
    "status": string;
  }
}
```

## eSIM

eSIM operations are available through the `client.esim` module.

The SDK allows you to browse available countries/regions, list eSIM packages, purchase a package,
and retrieve eSIM installation and usage details.

---

### Available methods (`client.esim`)

#### Countries & Regions

- `esim.getCountries()` — get list of eSIM-supported countries

**Response**

```ts
{
  "status": string;
  "data": {
    "countries": [
      {
        "isoName": string;
        "name": string;
        "flagUrl": string;
      }
    ]
  }
}
```

- `esim.getRegions()` — get list of eSIM-supported regions

**Response**

```ts
{
  "status": string;
  "data": {
    "regions": [
      {
        "id": string;
        "name": string;
      }
    ]
  }
}
```

#### Packages

- `esim.getCountryPackages(countryCode: string, params?)` — get packages for a specific country (paginated)

**Params**

```ts
{
  "unlimited"?: string; // optional
  "sortBy"?: string; // optional
  "sortType"?: string; // optional
  "page"?: number; // optional, default: 1
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "packages": [
      {
        "id": string;
        "name": string;
        "price": number;
        "data": {
          "quantity": number;
          "unit": string;
        },
        "voice": {
          "quantity": number;
          "unit": string;
        },
        "sms": {
          "quantity": number;
        },
        "validity": {
          "quantity": number;
          "unit": string;
        },
        "unlimited": boolean;
      }
    ],
    "page": number;
    "totalPages": number;
  }
}
```

- `esim.getGlobalPackages(params?)` — get global packages (paginated)

**Params**

```ts
{
  "unlimited"?: string; // optional
  "sortBy"?: string; // optional
  "sortType"?: string; // optional
  "page"?: number; // optional, default: 1
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "packages": [
      {
        "id": string;
        "name": string;
        "price": number;
        "data": {
          "quantity": number;
          "unit": string;
        },
        "voice": {
          "quantity": number;
          "unit": string;
        },
        "sms": {
          "quantity": number;
        },
        "validity": {
          "quantity": number;
          "unit": string;
        },
        "unlimited": boolean;
      }
    ],
    "page": number;
    "totalPages": number;
  }
}
```

- `esim.getRegionalPackages(regionId: string, params?)` — get packages for a specific region (paginated)

**Params**

```ts
{
  "unlimited"?: string; // optional
  "sortBy"?: string; // optional
  "sortType"?: string; // optional
  "page"?: number; // optional, default: 1
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "packages": [
      {
        "id": string;
        "name": string;
        "price": number;
        "data": {
          "quantity": number;
          "unit": string;
        },
        "voice": {
          "quantity": number;
          "unit": string;
        },
        "sms": {
          "quantity": number;
        },
        "validity": {
          "quantity": number;
          "unit": string;
        },
        "unlimited": boolean;
      }
    ],
    "page": number;
    "totalPages": number;
  }
}
```

- `esim.getPackageDetails(packageId: string)` — get detailed package information

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
    "price": number;
    "unlimited": boolean;
    "data": {
      "quantity": number;
      "unit": string;
    },
    "voice": {
      "quantity": number;
      "unit": string;
    },
    "sms": {
      "quantity": number;
    },
    "validity": {
      "quantity": number;
      "unit": string;
    },
    "coverage": [
      {
        "name": string;
        "flagUrl": string;
        "network": [
          {
            "name": string;
            "mobileStandards": string[];
          }
        ]
      }
    ]
  }
}
```

#### Purchase & eSIM details

- `esim.purchasePackage(packageId: string, payload?)` — purchase an eSIM package

**Payload**

```ts
{
  "externalId"?: string;
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "id": string;
  }
}
```

- `esim.getDetails(esimId: string)` — get installation details, usage, and purchased package info

**Response**

```ts
{
  "status": string;
  "data": {
    "esim": {
      "installation": {
        "lpa": string;
        "smdpAddress": string;
        "iccid": string;
      },
      "createdAt": Date | string;
      "status": string;
      "usage": {
        "data": {
          "initial": {
            "quantity": number;
            "unit": string;
          },
          "remaining": {
            "quantity": number;
            "unit": string;
          }
        }
      }
    },
    "package": {
      "id": string;
      "unlimited": boolean;
      "data": {
        "quantity": number;
        "unit": string;
      },
      "voice": {
        "quantity": number;
        "unit": string;
      },
      "sms": {
        "quantity": number;
      },
      "validity": {
        "quantity": number;
        "unit": string;
      },
      "coverage": [
        {
          "name": string;
          "flagUrl": string;
          "network": [
            {
              "name": string;
              "mobileStandards": string[];
            }
          ]
        }
      ]
    }
  }
}
```

## Utils

Utility methods are available through the `client.utils` module.

This module provides helper functions for common validation and lookup tasks
that are often required when working with payments and banking data.

---

### Available methods (`client.utils`)

- `utils.getMccDescription(payload)` — retrieve description for a Merchant Category Code (MCC)

**Payload**

```ts
{
  "mcc"?: string; // optional
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "code": string;
    "description": string;
  }
}
```

- `utils.validateIban(iban)` — validate an IBAN

**Payload**

```ts
{
  "iban"?: string; // optional
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "valid": boolean;
  }
}
```

- `utils.getBankBySwift(swift)` — retrieve bank details by SWIFT code

**Payload**

```ts
{
  "swift"?: string; // optional
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "name": string;
    "country": string;
    "address": string;
    "swift": string;
  }
}
```

- `utils.searchAirports(params)` — Searches airports by query string.

**Params**

```ts
{
  "query": string;
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "results": AirportsResponse[];
  }
}
```

**Types**

```ts
AirportsResponse = {
  name: string;
  city: string;
  country: string;
  codes: {
    iata: string;
    icao: string;
  };
};
```

- `utils.findNearbyAirports(params)` — Finds nearby airports by latitude and longitude.

**Params**

```ts
{
  "latitude": string;
  "longitude": string;
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "results": (AirportsResponse & {
      "distance": { value: number; unit: string };
      "relevance": number;
    })[];
  }
}
```

**Types**

```ts
AirportsResponse = {
  name: string;
  city: string;
  country: string;
  codes: {
    iata: string;
    icao: string;
  };
};
```

- `utils.flightInfo(params)` — Retrieves flight information by flight number and date.

**Params**

```ts
{
  "flightNumber": string;
  "date": string;
}
```

**Response**

```ts
{
  "status": string;
  "data": {
    "status": string;
    "number": string;
    "date": string;
    "flightType": FlightType;
    "departure": Departure;
    "arrival": Arrival;
    "duration": number;
    "airline": Airline;
    "flightEquipment": FlightEquipment;
    "codeshares": Codeshare[];
  }
}
```

**Types**

```ts
FlightType = "scheduled-passenger-normal-service" | (string & {});

Departure = {
  iataCode: string;
  timestamp: string;
  terminal: string | null;
  departureGate: string | null;
};

Arrival = {
  iataCode: string;
  timestamp: string;
  terminal: string | null;
  arrivalGate: string | null;
  baggageClaim: string | null;
};

Airline = {
  iataCode: string;
  icaoCode: string;
  businessName: string;
  commonName: string | null;
  logoUrl: string;
};

FlightEquipment = {
  tailNumber: string | null;
  actualIataCode: string | null;
  scheduledIataCode: string | null;
  equipments: Equipment[];
};

Equipment = {
  iata: string;
  name: string;
  details: EquipmentDetails;
};

EquipmentDetails = {
  turboProp: boolean;
  jet: boolean;
  widebody: boolean;
  regional: boolean;
};

Codeshare = {
  fsCode: string;
  flightNumber: string;
  relationship: string;
};
```
