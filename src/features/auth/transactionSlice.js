import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";

const transferData = JSON.parse(localStorage.getItem("transferData"));

const initialState = {
  transferData: transferData ? transferData : null,
  transaction: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isEditError: false,
  isEditSuccess: false,
  isEditLoading: false,
  isCreateTransError: false,
  isCreateTransSuccess: false,
  isCreateTransLoading: false,
  message: "",
};

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transactionService.createTransaction(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const Edit = createAsyncThunk(
  "transaction/Edit",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transactionService.Edit(userData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendTransactionMail = createAsyncThunk(
  "transaction/sendTransactionMail",
  async (data, thunkAPI) => {
    try {
      return await transactionService.sendTransactionMail(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendUpdateUser = createAsyncThunk(
  "transaction/sendTransactionMail",
  async (data, thunkAPI) => {
    try {
      return await transactionService.sendUpdateUser(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transactionService.getTransactions(userId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBalance = createAsyncThunk(
  "transaction/updateBalance",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transactionService.updateBalance(userData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transactionService.getTransactions(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isCreateTransLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isCreateTransLoading = false;
        state.isCreateTransSuccess = true;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isCreateTransLoading = false;
        state.isCreateTransError = true;
        state.message = action.payload;
      })
      .addCase(getTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transaction = action.payload;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(Edit.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(Edit.fulfilled, (state) => {
        state.isEditLoading = false;
        state.isEditSuccess = true;
      })
      .addCase(Edit.rejected, (state, action) => {
        state.isEditLoading = false;
        state.isEditError = true;
        state.message = action.payload;
      })
      .addCase(updateBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
