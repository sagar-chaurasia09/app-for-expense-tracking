import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const LIGHT_COLORS = {
  'Food': '#F87171',
  'Travel': '#60A5FA',
  'Shopping': '#FBBF24',
  'Bills': '#34D399',
  'Entertainment': '#A78BFA',
  'Others': '#94A3B8',
};

const DARK_COLORS = {
  'Food': '#22C55E',
  'Travel': '#4ADE80',
  'Shopping': '#16A34A',
  'Bills': '#86EFAC',
  'Entertainment': '#065F46',
  'Others': '#064E3B',
};

const SummaryChart = ({ expenses }) => {
  const { isDarkMode, colors } = useTheme();
  const currentCategoryColors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  const chartData = Object.keys(currentCategoryColors).map(cat => {
    const total = expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
    return {
      name: cat,
      population: total,
      color: currentCategoryColors[cat],
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    };
  }).filter(data => data.population > 0);

  if (chartData.length === 0) {
    return (
      <View style={[styles.noData, { backgroundColor: colors.card, borderBlockColor: colors.border, borderWidth: isDarkMode ? 1 : 0 }]}>
        <Text style={[styles.noDataText, { color: colors.textSecondary }]}>Add expenses to see chart</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: isDarkMode ? 1 : 0 }]}>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 48}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
    borderRadius: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  noData: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginVertical: 16,
  },
  noDataText: {
    fontSize: 16,
  }
});

export default SummaryChart;
