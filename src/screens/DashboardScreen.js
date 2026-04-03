import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';
import { Plus, LogOut, Moon, Sun } from 'lucide-react-native';
import ExpenseItem from '../components/ExpenseItem';
import SummaryChart from '../components/SummaryChart';

const CATEGORIES = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Others'];

const DashboardScreen = ({ navigation }) => {
  const { logout, user } = useAuth();
  const { expenses, loading } = useExpenses();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'All') return expenses;
    return expenses.filter(item => item.category === selectedCategory);
  }, [expenses, selectedCategory]);

  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);
  }, [filteredExpenses]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  const themeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 10,
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    welcome: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    iconBtn: {
      padding: 10,
      backgroundColor: isDarkMode ? '#1A1A1A' : '#F3F4F6',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    logoutBtn: {
      padding: 10,
      backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#FEE2E2',
      borderRadius: 12,
    },
    summaryCard: {
      backgroundColor: isDarkMode ? '#161616' : colors.primary,
      margin: 24,
      padding: 24,
      borderRadius: 24,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? '#22C55E50' : 'transparent',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDarkMode ? 0.3 : 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
    summaryLabel: {
      color: isDarkMode ? colors.textSecondary : 'rgba(255,255,255,0.8)',
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    summaryAmount: {
      color: isDarkMode ? '#22C55E' : '#FFFFFF',
      fontSize: 42,
      fontWeight: '900',
      marginTop: 8,
      letterSpacing: -1,
    },
    filterSection: {
      marginBottom: 16,
    },
    filterList: {
      paddingHorizontal: 24,
      gap: 12,
    },
    categoryBtn: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 100,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryBtnActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryBtnText: {
      color: colors.textSecondary,
      fontWeight: '600',
    },
    categoryBtnTextActive: {
      color: '#FFFFFF',
    },
    listSection: {
      flex: 1,
      paddingHorizontal: 24,
    },
    listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    listTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    listCount: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    listContent: {
      paddingBottom: 100,
    },
    loader: {
      marginTop: 40,
    },
    emptyContainer: {
      alignItems: 'center',
      marginTop: 60,
    },
    emptyText: {
      color: colors.textSecondary,
      fontSize: 16,
    },
    fab: {
      position: 'absolute',
      bottom: 32,
      right: 24,
      backgroundColor: colors.primary,
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
  });

  return (
    <SafeAreaView style={themeStyles.container}>
      <View style={themeStyles.header}>
        <View>
          <Text style={themeStyles.welcome}>Hello,</Text>
          <Text style={themeStyles.userName}>{user?.email?.split('@')[0]}</Text>
        </View>
        <View style={themeStyles.actions}>
          <TouchableOpacity onPress={toggleTheme} style={themeStyles.iconBtn}>
            {isDarkMode ? <Sun size={20} color="#FBBF24" /> : <Moon size={20} color="#6366F1" />}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={themeStyles.logoutBtn}>
            <LogOut size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={themeStyles.summaryCard}>
        <Text style={themeStyles.summaryLabel}>Total Balance</Text>
        <Text style={themeStyles.summaryAmount}>₹{totalExpense}</Text>
      </View>

      <View style={themeStyles.filterSection}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                themeStyles.categoryBtn, 
                selectedCategory === item && themeStyles.categoryBtnActive
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[
                themeStyles.categoryBtnText,
                selectedCategory === item && themeStyles.categoryBtnTextActive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={themeStyles.filterList}
        />
      </View>

      <View style={themeStyles.listSection}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={themeStyles.loader} />
        ) : (
          <FlatList
            data={filteredExpenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseItem item={item} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <SummaryChart expenses={expenses} />
                <View style={themeStyles.listHeader}>
                  <Text style={themeStyles.listTitle}>Recent Expenses</Text>
                  <Text style={themeStyles.listCount}>{filteredExpenses.length} items</Text>
                </View>
              </>
            }
            ListEmptyComponent={
              <View style={themeStyles.emptyContainer}>
                <Text style={themeStyles.emptyText}>No expenses found</Text>
              </View>
            }
            contentContainerStyle={themeStyles.listContent}
          />
        )}
      </View>

      <TouchableOpacity 
        style={themeStyles.fab} 
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Plus size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardScreen;
