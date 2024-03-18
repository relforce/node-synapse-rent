import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { BASEURL } from "src/constants";
import { setAll } from "src/helpers";
import { IBaseAsyncThunk } from "src/slices/interfaces";
import { RootState } from "src/store";

export const galleryAccountDetails = createAsyncThunk(
  "app/galleryAccountDetails",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch }) => {
    console.log('debug adminpurchase')
    const response = await fetch(`${BASEURL}/node/adminpurchase`);
    
    const responseJson = await response.json();
    return {
      loading: false,
      items: responseJson.items,
    } as IGalleryData;
  },
);

export interface IGalleryData {
  loading: boolean;
  items: INodeItem[];
}

export interface INodeItem {
  purchase_date: string;
  buyer_info: string;
  purchase: number;
  node_no: number;
  seller_address: string;
  node_ip: string;
  node_cpu: string;
  node_gpu: string;
  gpu_capacity: number;
  cpu_capacity: number;
  node_download: any;
  node_upload: any;
  node_usage: any;
  node_price: number;
  approve: number;
  status: number;
}

const initialState: IGalleryData = {
  loading: true,
  items: [],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    fetchGallerySuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(galleryAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(galleryAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        // state.loading = false;
      })
      .addCase(galleryAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

const baseInfo = (state: RootState) => state.app;

export default gallerySlice.reducer;

export const { fetchGallerySuccess } = gallerySlice.actions;

export const getAppState = createSelector(baseInfo, app => app);