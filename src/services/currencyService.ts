export interface CurrencyMeta {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyMeta> = {
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'AU$', flag: '🇦🇺' },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'SG$', flag: '🇸🇬' },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  THB: { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  MYR: { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  NZD: { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  KRW: { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
};

export interface ConversionRecord {
  id: string;
  timestamp: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  resultAmount: number;
  rate: number;
}

export interface RatesState {
  status: 'loading' | 'live' | 'cached' | 'error';
  base: string;
  rates: Record<string, number>;
  lastUpdated: Date | null;
  lastUpdatedFormatted: string;
  isLive: boolean;
  warningMessage?: string;
  errorMessage?: string;
}

const STORAGE_KEY = 'touristo_rates_cache_v2';

export const currencyService = {
  getSupportedCurrencies(): Record<string, CurrencyMeta> {
    return SUPPORTED_CURRENCIES;
  },

  getCurrencyInfo(code: string): CurrencyMeta {
    return (
      SUPPORTED_CURRENCIES[code] || {
        code,
        name: code,
        symbol: code,
        flag: '🌐',
      }
    );
  },

  getCachedRates(): { rates: Record<string, number>; timestamp: number; base: string } | null {
    try {
      if (typeof localStorage === 'undefined') return null;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.rates && typeof parsed.rates === 'object') {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  },

  saveRatesToCache(rates: Record<string, number>, base: string, timestamp: number): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          rates,
          base,
          timestamp,
        })
      );
    } catch (e) {
      console.warn('Failed to cache exchange rates to localStorage:', e);
    }
  },

  /**
   * Fetches the latest live exchange rates from the API.
   * Handles server proxy, client direct fallback, and graceful offline cache retrieval.
   * STRICT: Never silently labels an outdated or cached rate as live data!
   */
  async fetchLiveRates(forceRefresh = false): Promise<RatesState> {
    // Check browser offline status
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const cached = this.getCachedRates();
      if (cached) {
        const cachedDate = new Date(cached.timestamp);
        return {
          status: 'cached',
          base: cached.base || 'USD',
          rates: cached.rates,
          lastUpdated: cachedDate,
          lastUpdatedFormatted: `Offline Mode · Cached from ${cachedDate.toLocaleDateString()} ${cachedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          isLive: false,
          warningMessage: 'No internet connection. Displaying saved offline rates.',
        };
      }
      return {
        status: 'error',
        base: 'USD',
        rates: {},
        lastUpdated: null,
        lastUpdatedFormatted: 'No connection & no saved rates',
        isLive: false,
        errorMessage: 'Device is offline and no cached exchange rates were found.',
      };
    }

    // Attempt 1: Fetch via internal server proxy
    try {
      const url = `/api/exchange-rates${forceRefresh ? '?refresh=true' : ''}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(7000) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result === 'success' && data.rates && data.rates.EUR && data.rates.INR) {
          const timestamp = data.lastUpdateUnix ? data.lastUpdateUnix * 1000 : Date.now();
          const updateDate = new Date(timestamp);
          const isLive = data.isLive !== false;

          // Save to local cache
          this.saveRatesToCache(data.rates, data.base || 'USD', timestamp);

          return {
            status: isLive ? 'live' : 'cached',
            base: data.base || 'USD',
            rates: data.rates,
            lastUpdated: updateDate,
            lastUpdatedFormatted: isLive
              ? `Live Rate · Updated ${updateDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : `Cached Rate · Updated ${updateDate.toLocaleDateString()} ${updateDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            isLive,
            warningMessage: isLive ? undefined : 'Live rates server returned cached data.',
          };
        }
      }
    } catch (serverErr) {
      console.warn('Server exchange rate proxy unreachable, falling back to direct public provider:', serverErr);
    }

    // Attempt 2: Direct client fetch to public open.er-api.com CORS endpoint
    try {
      const directRes = await fetch('https://open.er-api.com/v6/latest/USD', {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      });

      if (directRes.ok) {
        const directData = await directRes.json();
        if (directData && directData.rates && directData.rates.EUR && directData.rates.INR) {
          const timestamp = directData.time_last_update_unix
            ? directData.time_last_update_unix * 1000
            : Date.now();
          const updateDate = new Date(timestamp);

          this.saveRatesToCache(directData.rates, 'USD', timestamp);

          return {
            status: 'live',
            base: 'USD',
            rates: directData.rates,
            lastUpdated: updateDate,
            lastUpdatedFormatted: `Live Rate · Updated ${updateDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            isLive: true,
          };
        }
      }
    } catch (clientErr) {
      console.warn('Direct public exchange rate API fetch failed:', clientErr);
    }

    // Fallback: Check local cache if network failed
    const cached = this.getCachedRates();
    if (cached) {
      const cachedDate = new Date(cached.timestamp);
      return {
        status: 'cached',
        base: cached.base || 'USD',
        rates: cached.rates,
        lastUpdated: cachedDate,
        lastUpdatedFormatted: `Offline Rate · Last saved ${cachedDate.toLocaleDateString()} ${cachedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        isLive: false,
        warningMessage: 'Could not refresh live rates. Showing previously saved offline rates.',
      };
    }

    // Neither live API nor cache is available
    return {
      status: 'error',
      base: 'USD',
      rates: {},
      lastUpdated: null,
      lastUpdatedFormatted: 'Rates unavailable',
      isLive: false,
      errorMessage: 'Failed to connect to live exchange rate services. Please check your network and retry.',
    };
  },

  /**
   * Converts amount using rates against the USD base.
   * e.g., to convert EUR to USD:
   * rateFromUSD = rates['EUR'] (EUR per 1 USD)
   * rateToUSD = rates['USD'] = 1 (USD per 1 USD)
   * directRate = 1 / rates['EUR'] (USD per 1 EUR)
   * result = amount * directRate
   */
  convert(
    amount: number,
    from: string,
    to: string,
    ratesMap?: Record<string, number>
  ): {
    result: number;
    rate: number;
    fromSymbol: string;
    toSymbol: string;
    formattedResult: string;
    rateDisplay: string;
  } {
    const fromInfo = this.getCurrencyInfo(from);
    const toInfo = this.getCurrencyInfo(to);

    if (isNaN(amount) || amount < 0) {
      return {
        result: 0,
        rate: 1,
        fromSymbol: fromInfo.symbol,
        toSymbol: toInfo.symbol,
        formattedResult: `${toInfo.symbol} 0.00`,
        rateDisplay: `1 ${from} = 1.0000 ${to}`,
      };
    }

    if (from === to) {
      return {
        result: amount,
        rate: 1,
        fromSymbol: fromInfo.symbol,
        toSymbol: toInfo.symbol,
        formattedResult: this.format(amount, to),
        rateDisplay: `1 ${from} = 1.0000 ${to}`,
      };
    }

    // If ratesMap is provided, use it
    if (ratesMap && ratesMap[from] && ratesMap[to]) {
      const rateFromUSD = ratesMap[from];
      const rateToUSD = ratesMap[to];

      // Cross-rate calculation: (amount in From / rateFromUSD) * rateToUSD
      const directRate = rateToUSD / rateFromUSD;
      const rawResult = amount * directRate;

      // Currency rounding: 2 decimal places for standard display
      const result = Math.round(rawResult * 100) / 100;

      // Rate display precision: 4 decimals if >= 1, up to 6 decimals if small
      const ratePrecision = directRate >= 1 ? 4 : 5;
      const roundedRate = Number(directRate.toFixed(ratePrecision));

      return {
        result,
        rate: roundedRate,
        fromSymbol: fromInfo.symbol,
        toSymbol: toInfo.symbol,
        formattedResult: this.format(result, to),
        rateDisplay: `1 ${from} = ${directRate.toFixed(ratePrecision)} ${to}`,
      };
    }

    // Default safe fallback if rates are not yet loaded
    return {
      result: 0,
      rate: 1,
      fromSymbol: fromInfo.symbol,
      toSymbol: toInfo.symbol,
      formattedResult: `${toInfo.symbol} 0.00`,
      rateDisplay: `1 ${from} = 1.0000 ${to}`,
    };
  },

  format(amount: number, currencyCode: string): string {
    const info = this.getCurrencyInfo(currencyCode);
    const formattedNum = amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${info.symbol} ${formattedNum}`;
  },
};
