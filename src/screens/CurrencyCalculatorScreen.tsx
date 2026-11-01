import React, { useState, useEffect } from 'react';
import { currencyService, ConversionRecord, RatesState, SUPPORTED_CURRENCIES } from '../services/currencyService';
import { dbStorage } from '../services/dbStorage';
import { ScreenId } from '../types/touristo';
import { 
  ArrowLeftRight, 
  RefreshCw, 
  PlusCircle, 
  History, 
  Check, 
  TrendingUp, 
  Calculator,
  WifiOff,
  Radio,
  AlertTriangle,
  Info
} from 'lucide-react';

interface CurrencyCalculatorScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CurrencyCalculatorScreen: React.FC<CurrencyCalculatorScreenProps> = ({ onNavigate }) => {
  const [amount, setAmount] = useState<string>('48');
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);
  const [ratesState, setRatesState] = useState<RatesState>({
    status: 'loading',
    base: 'USD',
    rates: {},
    lastUpdated: null,
    lastUpdatedFormatted: 'Connecting to live rate server...',
    isLive: false,
  });

  const [recentHistory, setRecentHistory] = useState<ConversionRecord[]>([
    {
      id: 'hist-1',
      timestamp: 'Today',
      fromCurrency: 'EUR',
      toCurrency: 'USD',
      fromAmount: 48,
      resultAmount: 53.60,
      rate: 1.1166,
    },
    {
      id: 'hist-2',
      timestamp: 'Earlier today',
      fromCurrency: 'USD',
      toCurrency: 'INR',
      fromAmount: 100,
      resultAmount: 9507.36,
      rate: 95.0736,
    },
  ]);

  const currencies = currencyService.getSupportedCurrencies();

  // Load live exchange rates on mount and register online/offline listeners
  const loadRates = async (forceRefresh = false) => {
    setIsRefreshing(true);
    try {
      const state = await currencyService.fetchLiveRates(forceRefresh);
      setRatesState(state);
    } catch (err: any) {
      setRatesState({
        status: 'error',
        base: 'USD',
        rates: {},
        lastUpdated: null,
        lastUpdatedFormatted: 'Network error',
        isLive: false,
        errorMessage: err?.message || 'Failed to connect to currency rates API',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadRates(false);

    const handleOnline = () => loadRates(true);
    const handleOffline = () => loadRates(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const numericAmount = parseFloat(amount) || 0;
  const { result, rate, rateDisplay } = currencyService.convert(
    numericAmount,
    fromCurrency,
    toCurrency,
    ratesState.rates
  );

  const swapCurrencies = () => {
    const prevFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(prevFrom);
  };

  const handleManualRefresh = () => {
    loadRates(true);
  };

  const handleAddToExpenses = () => {
    if (numericAmount <= 0) return;

    // Calculate equivalent in INR using the live exchange rate
    const { result: amountInINR } = currencyService.convert(
      numericAmount,
      fromCurrency,
      'INR',
      ratesState.rates
    );

    dbStorage.addExpense({
      title: `Converted ${fromCurrency} ${numericAmount} to ${toCurrency}`,
      amount: numericAmount,
      currency: fromCurrency,
      amountInINR: Math.round(amountInINR) || Math.round(numericAmount),
      category: 'Shopping',
      date: new Date().toISOString().split('T')[0],
      notes: `Converted at live rate: ${rateDisplay}`,
    });

    // Record in local session history
    const newRecord: ConversionRecord = {
      id: 'conv_' + Date.now(),
      timestamp: 'Just now',
      fromCurrency,
      toCurrency,
      fromAmount: numericAmount,
      resultAmount: result,
      rate,
    };
    setRecentHistory((prev) => [newRecord, ...prev.slice(0, 4)]);

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onNavigate('expense_tracker');
    }, 1100);
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in">
      {/* Live Status Bar Banner */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-1.5">
          {ratesState.status === 'loading' ? (
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#087F68]" />
              <span>Fetching live exchange rates...</span>
            </div>
          ) : ratesState.status === 'live' ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Radio className="w-3.5 h-3.5 text-emerald-600" />
              <span>{ratesState.lastUpdatedFormatted}</span>
            </div>
          ) : ratesState.status === 'cached' ? (
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full font-semibold">
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span>{ratesState.lastUpdatedFormatted}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-full font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Rates Unavailable · Offline</span>
            </div>
          )}
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors flex items-center gap-1 font-semibold text-[11px]"
          title="Refresh latest exchange rates from live API"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#087F68] ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Warning Notice if using Cached / Stale Data (Strict Requirement: Never silently show outdated rate as live!) */}
      {ratesState.status === 'cached' && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-tight">
            <span className="font-bold">Offline / Cached Rates in Use: </span>
            <span>
              Live connection could not be established. Touristo is using your saved offline rates from{' '}
              {ratesState.lastUpdated ? ratesState.lastUpdated.toLocaleString() : 'storage'}. These rates are NOT live.
            </span>
          </div>
        </div>
      )}

      {/* Error state if completely unavailable */}
      {ratesState.status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Exchange Rate Service Connection Failed</span>
          </div>
          <p className="text-red-700">
            {ratesState.errorMessage || 'Please ensure you are connected to the internet and click Retry.'}
          </p>
          <button
            onClick={() => loadRates(true)}
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Retry Live Rate Sync
          </button>
        </div>
      )}

      {/* Top Currency Inputs Container */}
      <div className="bg-white rounded-3xl border border-[#E2E8E6] p-4 shadow-xs space-y-4">
        {/* Source Currency Input */}
        <div>
          <label className="text-xs font-bold text-[#62716F] mb-1.5 flex items-center justify-between">
            <span>You Send / Pay</span>
            <span className="text-[11px] font-normal text-slate-400">
              {currencies[fromCurrency]?.flag} {currencies[fromCurrency]?.name}
            </span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="any"
              min="0"
              className="flex-1 text-2xl font-black text-[#172B2A] bg-[#F5F7F7] border border-[#E2E8E6] rounded-2xl px-3.5 py-2.5 focus:outline-none focus:border-[#087F68]"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="bg-[#F5F7F7] border border-[#E2E8E6] font-bold text-sm text-[#172B2A] rounded-2xl px-3 py-3.5 focus:outline-none focus:border-[#087F68]"
            >
              {Object.keys(currencies).map((code) => (
                <option key={code} value={code}>
                  {currencies[code].flag} {code} - {currencies[code].name} ({currencies[code].symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Action Strip */}
        <div className="flex items-center justify-between border-y border-slate-100 py-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[#62716F]">
            <TrendingUp className="w-3.5 h-3.5 text-[#087F68]" />
            <span className="font-semibold">{rateDisplay}</span>
          </div>
          <button
            onClick={swapCurrencies}
            className="p-2 rounded-xl bg-[#E6F6EF] text-[#087F68] hover:bg-[#087F68] hover:text-white transition-colors flex items-center gap-1"
            title="Swap Currencies"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span className="text-[11px] font-bold hidden sm:inline">Swap</span>
          </button>
        </div>

        {/* Target Currency Display */}
        <div>
          <label className="text-xs font-bold text-[#62716F] mb-1.5 flex items-center justify-between">
            <span>You Receive</span>
            <span className="text-[11px] font-normal text-slate-400">
              {currencies[toCurrency]?.flag} {currencies[toCurrency]?.name}
            </span>
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 text-2xl font-black text-[#087F68] bg-[#E6F6EF]/50 border border-teal-200/60 rounded-2xl px-3.5 py-2.5">
              {result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="bg-[#F5F7F7] border border-[#E2E8E6] font-bold text-sm text-[#172B2A] rounded-2xl px-3 py-3.5 focus:outline-none focus:border-[#087F68]"
            >
              {Object.keys(currencies).map((code) => (
                <option key={code} value={code}>
                  {currencies[code].flag} {code} - {currencies[code].name} ({currencies[code].symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pale Mint Conversion-Result Card */}
      <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-[#2E7D32] font-semibold">
          <span>Converted Value</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#2F6F35]">
              {ratesState.isLive ? '🟢 Live API Rate' : '⚠️ Offline Rate'}
            </span>
          </div>
        </div>

        <div>
          <div className="text-3xl font-black text-[#144218] tracking-tight">
            {currencyService.format(result, toCurrency)}
          </div>
          <p className="text-xs text-[#2F6F35] font-medium mt-1">
            {numericAmount} {fromCurrency} at {rateDisplay}
          </p>
        </div>

        {/* Add to Expense Tracker Action Button */}
        <div className="pt-2">
          <button
            onClick={handleAddToExpenses}
            disabled={addedNotice || numericAmount <= 0}
            className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] ${
              addedNotice
                ? 'bg-[#15965F] text-white'
                : 'bg-[#087F68] hover:bg-[#075B4E] text-white'
            }`}
          >
            {addedNotice ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Expenses! Navigating...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Add this to Expense Tracker</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Conversion Rate Matrix Cheat Sheet */}
      <div className="bg-white rounded-2xl border border-[#E2E8E6] p-3.5 space-y-2">
        <div className="text-xs font-bold text-[#172B2A] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-[#087F68]" />
            Quick Reference Sheet ({fromCurrency} → {toCurrency})
          </span>
          <span className="text-[10px] text-[#62716F]">Live Multipliers</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[1, 10, 48, 100].map((val) => (
            <div 
              key={val} 
              onClick={() => setAmount(String(val))}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                numericAmount === val
                  ? 'bg-[#E6F6EF] border-[#087F68] ring-1 ring-[#087F68]'
                  : 'bg-[#F5F7F7] border-[#E2E8E6] hover:bg-slate-100'
              }`}
              title={`Click to set amount to ${val} ${fromCurrency}`}
            >
              <div className="font-bold text-[#172B2A]">{val} {fromCurrency}</div>
              <div className="text-[11px] font-semibold text-[#087F68] mt-0.5">
                {(val * rate).toFixed(2)} {toCurrency}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Conversions History */}
      <div className="bg-white rounded-2xl border border-[#E2E8E6] p-3.5 space-y-2">
        <div className="text-xs font-bold text-[#172B2A] flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-[#087F68]" />
          Recent Conversion History
        </div>
        <div className="space-y-1.5">
          {recentHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 rounded-xl bg-[#F5F7F7] text-xs"
            >
              <div>
                <span className="font-bold text-[#172B2A]">
                  {item.fromAmount} {item.fromCurrency}
                </span>
                <span className="text-slate-400 mx-1.5">→</span>
                <span className="font-bold text-[#087F68]">
                  {item.resultAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {item.toCurrency}
                </span>
              </div>
              <span className="text-[10px] text-[#62716F]">{item.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
