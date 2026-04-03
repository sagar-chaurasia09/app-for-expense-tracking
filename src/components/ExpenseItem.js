import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { 
  Utensils, 
  Plane, 
  ShoppingBag, 
  FileText, 
  Film, 
  CreditCard, 
  Trash2 
} from 'lucide-react-native';
import { useExpenses } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';

const CATEGORY_ICONS = {
  'Food': { icon: Utensils, color: '#F87171', bg: '#FEE2E2' },
  'Travel': { icon: Plane, color: '#60A5FA', bg: '#DBEAFE' },
  'Shopping': { icon: ShoppingBag, color: '#FBBF24', bg: '#FEF3C7' },
  'Bills': { icon: FileText, color: '#34D399', bg: '#D1FAE5' },
  'Entertainment': { icon: Film, color: '#A78BFA', bg: '#EDE9FE' },
  'Others': { icon: CreditCard, color: '#9CA3AF', bg: '#F3F4F6' },
};

const ExpenseItem = ({ item }) => {
  const { deleteExpense } = useExpenses();
  const { colors, isDarkMode } = useTheme();
  const categoryInfo = CATEGORY_ICONS[item.category] || CATEGORY_ICONS['Others'];
  const IconComponent = categoryInfo.icon;

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteExpense(item.id) 
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: isDarkMode ? 1 : 0 }]}>
      <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : categoryInfo.bg }]}>
        <IconComponent size={24} color={categoryInfo.color} />
      </View>
      
      <View style={styles.details}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>-₹{parseFloat(item.amount).toFixed(2)}</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
          <Trash2 size={18} color={isDarkMode ? '#F87171' : '#EF4444'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  deleteBtn: {
    padding: 4,
  },
});

export default ExpenseItem;
