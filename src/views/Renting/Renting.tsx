import { useSelector } from "react-redux";
import { Box, CardContent, Grid, styled } from "@material-ui/core";
import { trim } from "../../helpers";
import "./renting.scss";
// import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAppSelector } from "src/hooks";
import { useAccount } from "wagmi";
import { FilterDrama } from "@mui/icons-material";
import PageTitle from "src/components/PageTitle";
import { Button, Typography } from "@mui/material";
import ActiveRentals from "../Zap/ActiveRentals";
import toast from "react-hot-toast";
import { messages } from "src/constants/messages";
import { PrimaryButton } from "@olympusdao/component-library";
import axios from "axios";
import RentalHistory from "../Zap/RentalHistory";
import { BASEURL } from "src/constants";
import { EthPrice } from "src/hooks/usePrices";
// import { IReduxState } from "../../store/slices/state.interface";
// import { IAppSlice } from "../../store/slices/app-slice";
// // import { useHistory } from "react-router-dom";
// import { usePathForNetwork, useWeb3Context } from "../../hooks";

const PanelTabs = styled(Tab)({
  textDecoration: 'none',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
  '&.Mui-selected': {
    color: '#45f4e8',
  },
  border: 'none',
  '&:hover': {
    textDecoration: 'none', // Remove underline on hover
    border: 'none',
    backgroundColor: 'transparent', // Set background color to none on hover
  },
  '&:active': {
    color: '#3fdbd1',
  }
});

const handleValidation = () => {
  console.log('deefef')
  toast.error(messages.please_connect_wallet);
}

function Renting() {
  const ethPrice = EthPrice();
  const { address = "", isConnected } = useAccount();
  
  interface PurchaseData {
    purchase: string;
    seller_info: string;
    seller_address: string;
    buyer_address: string,
    buyer_info: string,
    node_name: string;
    node_no: string,
    gpu_capacity: number,
    node_price: number,
    node_createDate: string,
    approve: number,
    status: number,
  }
  
  const totalPurchaseData = useAppSelector(state => state.adminPurchaseHistory.items);

  const rows = totalPurchaseData ? totalPurchaseData.filter(node => node.buyer_address === address && node.status === 3) : [];
  
  const uniqueActiveRows = [];
  for (let i = 0; i < rows.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < uniqueActiveRows.length; j++) {
      if (rows[i].node_no === uniqueActiveRows[j].node_no) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      uniqueActiveRows.push(rows[i]);
    }
  }
  
  const rentedNode = totalPurchaseData ? totalPurchaseData.filter(node => node.buyer_address === address && node.rent_approve == 1) : [];

  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [customNode, setCustomNode] = useState<string>("1.0");

  const handleNodeModalOpen = () => setNodeModalOpen(true);
  const [nodeModalOpen, setNodeModalOpen] = useState(false);

  return (
    <div className="renting-view">
      <PageTitle name="Renting" />
      <div className="dashboard-view">
        <div className="dashboard-infos-wrap">
          <Grid item lg={12} md={12} sm={12} xs={12} className="dashboard-card">
            <CardContent>
              <Grid container>
                <CardContent>
                  <Typography>
                    Welcome to the Renting Dashboard, where your active and past node rentals are at your fingertips. This is your hub for overseeing the nodes you've rented, designed to give you full visibility and control over your decentralized endeavors. From here, you can track the performance and status of your active rentals and review the history of your past rentals. Our platform ensures a smooth and intuitive experience, whether you're expanding your digital footprint or reviewing your rental journey. Stay connected and manage your rentals with ease - your pathway to decentralization continues here!
                  </Typography>
                </CardContent>
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <div >
                      <p className="card-value">{rentedNode.length}</p>
                      <p className="card-title">Rented Nodes</p>
                    </div>
                  </CardContent>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <div >
                      <p className="card-value">{uniqueActiveRows.length}</p>
                      <p className="card-title">Active Rentals</p>
                    </div>
                  </CardContent>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </div>
        <div className="dashboard-infos-wrap" style={{ paddingTop: "30px" }}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="dashboard-card">
              <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="" style={{ paddingLeft: '20px' }}>
                      <PanelTabs style={{ textDecoration: "none" }} label="Active Rentals" value="1" />
                      <PanelTabs style={{ textDecoration: "none" }} label="Rental History" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <ActiveRentals/>
                  </TabPanel>
                  <TabPanel value="2">
                    <RentalHistory />
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </Grid>
        </div>
      </div>
    </div>

  );
}

export default Renting;
