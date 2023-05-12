import axios from "axios";

// const API_URL = "http://localhost:5000/api/transaction/";

// const MAIL_URL = "http://localhost:5000/send_recovery_email/";

const API_URL = "https://citadel-new-backend.onrender.com/api/transaction/";

const MAIL_URL =
  "https://citadel-new-backend.onrender.com/send_recovery_email/";

const createTransaction = async (data) => {
  const response = await axios.post(API_URL, data);

  return response.data;
};

const Edit = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "edit/" + userData.id,
    userData,
    config
  );

  return response.data;
};

const sendTransactionMail = async (data) => {
  const response = await axios.post(MAIL_URL + "transfer", data);

  return response.data;
};

const sendUpdateUser = async (data) => {
  const response = await axios.post(MAIL_URL + "update", data);

  return response.data;
};

const getTransactions = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(userId);

  const response = await axios.get(
    API_URL + "getTransaction/" + userId,
    config
  );

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
  sendTransactionMail,
  getTransactions,
  updateBalance,
  Edit,
  sendUpdateUser,
};

export default transactionService;
