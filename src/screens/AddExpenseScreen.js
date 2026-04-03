import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenses } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';
import { 
  ChevronLeft, 
  Plus, 
  IndianRupee, 
  Tag, 
  FileText, 
  CreditCard, 
  Utensils, 
  ShoppingBag, 
  Zap, 
  Plane, 
  MoreHorizontal 
} from 'lucide-react-native';
import { Timestamp } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { name: 'Food', icon: Utensils, color: '#FF6B6B' },
  { name: 'Travel', icon: Plane, color: '#4DABF7' },
  { name: 'Shopping', icon: ShoppingBag, color: '#FCC419' },
  { name: 'Bills', icon: Zap, color: '#51CF66' },
  { name: 'Entertainment', icon: CreditCard, color: '#845EF7' },
  { name: 'Others', icon: MoreHorizontal, color: '#868E96' },
];

const AddExpenseScreen = ({ navigation }) => {
  const { addExpense } = useExpenses();
  const { colors, isDarkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [loading, setLoading] = useState(false);

  // Animations
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSave = async () => {
    if (!title || !amount || !category) {
      Alert.alert('Missing Information', 'Please fill in all fields to track your expense.');
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid numeric value for the expense.');
      return;
    }

    setLoading(true);
    try {
      await addExpense({
        title,
        amount: parseFloat(amount),
        category,
        date: Timestamp.now()
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Operation Failed', 'We couldn\'t save your expense right now. Please try again.');
    } finally {
      setLoading(false);
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
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: colors.background,
    },
    backBtn: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.5,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 16,
      marginBottom: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.03,
      shadowRadius: 10,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: isDarkMode ? colors.background : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    input: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
      padding: 0,
      minHeight: 30,
      width: '100%',
    },
    categorySection: {
      marginTop: 10,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      marginLeft: 4,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginLeft: 8,
    },
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 12,
    },
    categoryCard: {
      width: (width - 52) / 2,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: isDarkMode ? colors.border : 'transparent',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.03,
      shadowRadius: 10,
      elevation: 2,
    },
    categoryIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    activeDot: {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    footer: {
      padding: 24,
      backgroundColor: colors.background,
      paddingBottom: Platform.OS === 'ios' ? 0 : 24,
    },
    saveBtn: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      height: 64,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10,
    },
    saveBtnDisabled: {
      backgroundColor: colors.border,
      shadowOpacity: 0.1,
    },
    saveBtnText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '800',
      letterSpacing: -0.2,
    },
    saveBtnIcon: {
      width: 32,
      height: 32,
      borderRadius: 10,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
    }
  });

  return (
    <SafeAreaView style={themeStyles.container}>
      <View style={themeStyles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={themeStyles.backBtn}
          activeOpacity={0.7}
        >
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={themeStyles.headerTitle}>New Expense</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <ScrollView 
          style={themeStyles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ 
            opacity: contentFadeAnim, 
            transform: [{ translateY: contentSlideAnim }] 
          }}>
            <View style={themeStyles.inputContainer}>
              <View style={themeStyles.iconBox}>
                <FileText size={20} color="#6366F1" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.label}>What did you buy?</Text>
                <TextInput
                  style={themeStyles.input}
                  placeholder="e.g. Starbucks Coffee"
                  placeholderTextColor={isDarkMode ? '#475569' : '#9CA3AF'}
                  value={title}
                  onChangeText={setTitle}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={themeStyles.inputContainer}>
              <View style={themeStyles.iconBox}>
                <IndianRupee size={20} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.label}>How much did it cost?</Text>
                <TextInput
                  style={themeStyles.input}
                  placeholder="0.00"
                  placeholderTextColor={isDarkMode ? '#475569' : '#9CA3AF'}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={themeStyles.categorySection}>
              <View style={themeStyles.sectionHeader}>
                <Tag size={18} color={colors.textSecondary} />
                <Text style={themeStyles.sectionTitle}>Select Category</Text>
              </View>
              
              <View style={themeStyles.categoryGrid}>
                {CATEGORIES.map((item) => {
                  const IconComp = item.icon;
                  const isActive = category === item.name;
                  return (
                    <TouchableOpacity 
                      key={item.name}
                      style={[
                        themeStyles.categoryCard, 
                        isActive && { backgroundColor: item.color + '15', borderColor: item.color }
                      ]}
                      onPress={() => setCategory(item.name)}
                      activeOpacity={0.7}
                    >
                      <View style={[themeStyles.categoryIcon, { backgroundColor: item.color + '20' }]}>
                        <IconComp size={22} color={item.color} />
                      </View>
                      <Text style={[
                        themeStyles.categoryText,
                        isActive && { color: item.color, fontWeight: '700' }
                      ]}>
                        {item.name}
                      </Text>
                      {isActive && (
                        <View style={[themeStyles.activeDot, { backgroundColor: item.color }]} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </Animated.View>
          
          <View style={{ height: 40 }} />
        </ScrollView>

        <View style={themeStyles.footer}>
          <TouchableOpacity 
            style={[themeStyles.saveBtn, loading && themeStyles.saveBtnDisabled]} 
            onPress={handleSave}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <Text style={themeStyles.saveBtnText}>Saving Process...</Text>
            ) : (
              <>
                <Text style={themeStyles.saveBtnText}>Record Expense</Text>
                <View style={themeStyles.saveBtnIcon}>
                  <Plus size={20} color="#FFFFFF" strokeWidth={3} />
                </View>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddExpenseScreen;

