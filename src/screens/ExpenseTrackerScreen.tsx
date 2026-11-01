import React, { useState, useEffect } from 'react';
import { dbStorage } from '../services/dbStorage';
import { ExpenseItem } from '../types/touristo';
import { 
  Plus, 
  Trash2, 
  Receipt, 
  Utensils, 
  Car, 
  ShoppingBag, 
  Hotel, 
  Ticket, 
  Layers, 
  X, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export const ExpenseTrackerScreen: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'trip'>('trip');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ExpenseItem | null>(null);

  // Form State for Adding Expense
  const [formTitle, setFormTitle] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formCategory, setFormCategory] = useState<ExpenseItem['category']>('Food');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formNotes, setFormNotes] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    setExpenses(dbStorage.getExpenses());
  };

  const getFilteredExpenses = () => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    return expenses.filter((item) => {
      if (timeFilter === 'today') {
        return item.date === todayStr;
      }
      if (timeFilter === 'week') {
        const itemDate = new Date(item.date);
        const diffDays = (now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7;
      }
      return true; // 'trip' shows all for current trip
    });
  };

  const filtered = getFilteredExpenses();
  const totalSpentINR = filtered.reduce((acc, curr) => acc + curr.amountInINR, 0);

  // Category breakdown calculation
  const categoryTotals: Record<string, number> = {
    Food: 0,
    Transport: 0,
    Shopping: 0,
    Hotel: 0,
    Tickets: 0,
    Other: 0,
  };
  filtered.forEach((item) => {
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amountInINR;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food': return Utensils;
      case 'Transport': return Car;
      case 'Shopping': return ShoppingBag;
      case 'Hotel': return Hotel;
      case 'Tickets': return Ticket;
      default: return Layers;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food': return 'bg-amber-100 text-amber-700';
      case 'Transport': return 'bg-sky-100 text-sky-700';
      case 'Shopping': return 'bg-pink-100 text-pink-700';
      case 'Hotel': return 'bg-indigo-100 text-indigo-700';
      case 'Tickets': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Please enter an expense description.');
      return;
    }
    const amt = parseFloat(formAmount);
    if (isNaN(amt) || amt <= 0) {
      setFormError('Please enter a valid amount.');
      return;
    }

    dbStorage.addExpense({
      title: formTitle.trim(),
      amount: amt,
      currency: 'INR',
      amountInINR: Math.round(amt),
      category: formCategory,
      date: formDate,
      notes: formNotes.trim(),
    });

    // Reset Form
    setFormTitle('');
    setFormAmount('');
    setFormNotes('');
    setFormError('');
    setIsAddModalOpen(false);
    loadExpenses();
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dbStorage.deleteExpense(itemToDelete.id);
      setItemToDelete(null);
      loadExpenses();
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in">
      {/* Dark Teal Total Expenses Card (as specified in Reference Theme) */}
      <div className="bg-gradient-to-br from-[#075B4E] to-[#087F68] rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-emerald-100/90 mb-1">
          <span className="font-semibold uppercase tracking-wider">
            Total Travel Expenses
          </span>
          <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold">
            {timeFilter === 'today' ? 'Today' : timeFilter === 'week' ? 'Past 7 Days' : 'This Trip'}
          </span>
        </div>

        <div className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
          ₹{totalSpentINR.toLocaleString('en-IN')}
        </div>
        <p className="text-xs text-emerald-100/80 mt-1">
          Approx. ${(totalSpentINR / 87.2).toFixed(2)} USD · Budget Remaining: ₹{(150000 - totalSpentINR).toLocaleString('en-IN')}
        </p>

        {/* Add Expense Action Button */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
          <span className="text-xs text-emerald-100 font-medium">
            {filtered.length} entries recorded
          </span>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 bg-white text-[#075B4E] font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-50 transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#087F68]" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs (Today, This Week, This Trip) */}
      <div className="flex items-center p-1 bg-white border border-[#E2E8E6] rounded-2xl shadow-xs">
        <button
          onClick={() => setTimeFilter('today')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            timeFilter === 'today'
              ? 'bg-[#087F68] text-white shadow-xs'
              : 'text-[#62716F] hover:text-[#172B2A]'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setTimeFilter('week')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            timeFilter === 'week'
              ? 'bg-[#087F68] text-white shadow-xs'
              : 'text-[#62716F] hover:text-[#172B2A]'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setTimeFilter('trip')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            timeFilter === 'trip'
              ? 'bg-[#087F68] text-white shadow-xs'
              : 'text-[#62716F] hover:text-[#172B2A]'
          }`}
        >
          This Trip
        </button>
      </div>

      {/* Category-Wise Spending Breakdown */}
      <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-[#172B2A] uppercase tracking-wider">
          Category Breakdown
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(categoryTotals).map(([cat, amount]) => {
            const Icon = getCategoryIcon(cat);
            const percent = totalSpentINR > 0 ? Math.round((amount / totalSpentINR) * 100) : 0;
            return (
              <div key={cat} className="p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E2E8E6] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`p-1 rounded-md ${getCategoryColor(cat)}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-[#172B2A]">{cat}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#62716F]">{percent}%</span>
                </div>
                <div className="text-xs font-black text-[#087F68]">
                  ₹{amount.toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expense History List */}
      <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#172B2A] uppercase tracking-wider flex items-center gap-1.5">
            <Receipt className="w-3.5 h-3.5 text-[#087F68]" />
            Recent Expenses
          </h4>
          <span className="text-xs text-[#62716F]">Swipe or tap trash to delete</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#62716F]">
            No expenses logged for this filter yet. Tap "+ Add Expense" to record one!
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#F5F7F7] border border-[#E2E8E6] flex items-center justify-between hover:border-[#087F68]/30 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${getCategoryColor(item.category)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#172B2A] truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#62716F] flex items-center gap-2">
                        <span>{item.date}</span>
                        <span>·</span>
                        <span>{item.category}</span>
                      </div>
                      {item.notes && (
                        <div className="text-[10px] text-slate-500 italic truncate max-w-xs">
                          {item.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-black text-[#172B2A]">
                        ₹{item.amountInINR.toLocaleString('en-IN')}
                      </div>
                      {item.currency !== 'INR' && (
                        <div className="text-[10px] text-[#62716F]">
                          {item.currency} {item.amount}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors opacity-70 group-hover:opacity-100"
                      title="Delete expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-[#E2E8E6] overflow-hidden">
            <div className="p-4 border-b border-[#E2E8E6] flex items-center justify-between bg-[#F5F7F7]">
              <h3 className="font-bold text-sm text-[#172B2A]">Add New Expense</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="p-4 space-y-3">
              {formError && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded-xl flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">
                  Description / Merchant
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., Prepaid Auto, Thali Lunch, Taj Mahal Ticket"
                  className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#087F68]"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#62716F] mb-1 block">
                    Amount (₹ INR)
                  </label>
                  <input
                    type="number"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="e.g., 250"
                    className="w-full text-xs font-bold bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#087F68]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#62716F] mb-1 block">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full text-xs font-bold bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-2 py-2.5 focus:outline-none focus:border-[#087F68]"
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Tickets">Tickets</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">
                  Date
                </label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2 focus:outline-none focus:border-[#087F68]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g., Paid cash, received receipt"
                  className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2 focus:outline-none focus:border-[#087F68]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-sm p-4 border border-[#E2E8E6] space-y-3">
            <h4 className="font-bold text-sm text-[#172B2A]">Confirm Deletion</h4>
            <p className="text-xs text-[#62716F]">
              Are you sure you want to delete <strong>"{itemToDelete.title}"</strong> (₹{itemToDelete.amountInINR})?
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
