import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryAndBrandService from "./categoryAndBrandService";

const initialState = {
  category: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData, thunkApi) => {
    try {
      return await categoryAndBrandService.createCategory(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const categoryAndBrandSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    RESET_CAT(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    // create category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Category created Successful");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      });
  }
});

export const {RESET_CAT} = categoryAndBrandSlice.actions;

export default categoryAndBrandSlice.reducer;
