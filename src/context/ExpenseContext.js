import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expenseData = snapshot.docs.map(doc => {
        const data = doc.data();
        if (!data) return null;
        
        let dateValue = new Date();
        
        if (data.date) {
          try {
            if (data.date && typeof data.date.toDate === 'function') {
              dateValue = data.date.toDate();
            } else if (data.date) {
              dateValue = new Date(data.date);
            }
          } catch (e) {
            console.error("Error parsing date:", e);
            dateValue = new Date();
          }
        }
        
        return {
          id: doc.id,
          ...data,
          date: dateValue
        };
      }).filter(item => item !== null);
      setExpenses(expenseData);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addExpense = async (expense) => {
    try {
      await addDoc(collection(db, "expenses"), {
        ...expense,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding expense: ", error);
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (error) {
      console.error("Error deleting expense: ", error);
      throw error;
    }
  };

  const value = {
    expenses,
    loading,
    addExpense,
    deleteExpense
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
