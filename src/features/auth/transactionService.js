import axios from "axios";

// const API_URL = "http://localhost:5000/api/transaction/";

const API_URL = "https://citadel-backend.onrender.com/api/transaction/";

const createTransaction = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);

  return response.data;
};

const getTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const updateBalance = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    amount: userData.amount,
  };

  const response = await axios.put(API_URL + userData.id, data, config);

  return response.data;
};

const transactionService = {
  createTransaction,
  getTransactions,
  updateBalance,
};

export default transactionService;
