import { useSelector } from "react-redux";
import { Box, CardContent, Grid, styled } from "@material-ui/core";
import { trim } from "../../helpers";
import "./lending.scss";
// import { Skeleton } from "@material-ui/lab";
import BasicTable from "../Zap/BasicTable";
import BasicRentalsTable from "../Zap/BasicRentalsTable";
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
import NodeModal from "../Zap/NodeModal";
import toast from "react-hot-toast";
import { messages } from "src/constants/messages";
import { PrimaryButton } from "@olympusdao/component-library";
import axios from "axios";
import EditNodeModal from "../Zap/EditNodeModal";
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

function Dashboard() {
  const ethPrice = EthPrice();
  const { address = "", isConnected } = useAccount();
  const purchaseNodeData = useAppSelector(state => state.accountGallery.items);
  
  const purchaseNode = purchaseNodeData.filter(node => node.seller_address === address)

  let pastPayout = 0
  purchaseNode.forEach(purchaseNode => {
    if (purchaseNode.seller_address === address) {
      pastPayout += purchaseNode.purchase;
    }
  })
  
  const totalNodeData = useAppSelector(state => state.adminGallery.items);
  const approveNode = totalNodeData.filter(node => node.seller_address === address && (node.status != 0 || node.approve == 1));
  const totalNode = totalNodeData.filter(node => node.seller_address === address);
  let EstimatedPayout = 0;
  totalNodeData.forEach(node => {
    if (node.seller_address === address && node.approve === 1) {
      EstimatedPayout += node.node_price;
    }
  });

  const activeEstimatedPayout = (EstimatedPayout * 30 * 24) / ethPrice;

  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [customNode, setCustomNode] = useState<string>("1.0");

  const validConnectWallet = () => {
    if (value === '3' && address == "") {
      toast.error(messages.please_connect_wallet);
    }
  };

  const handleNodeModalOpen = () => setNodeModalOpen(true);
  const [nodeModalOpen, setNodeModalOpen] = useState(false);

  return (
    <>
      <div className="lending-view">
        <PageTitle name="Lending" />
        <div className="dashboard-view">
          <div className="dashboard-infos-wrap">
            <Grid item lg={12} md={12} sm={12} xs={12} className="dashboard-card">
              <CardContent>
                <Grid container>
                  <CardContent>
                    <Typography>
                      Embark on your journey of decentralization and take charge by setting up your own node. Here, we guide you through the process of launching and managing your nodes efficiently. Whether you're a seasoned pro or just starting out, our platform makes node management seamless. Let's power up the network – together!
                    </Typography>
                  </CardContent>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <div >
                        <p className="card-value">{approveNode.length}</p>
                        <p className="card-title">Approved Nodes</p>
                      </div>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <div >
                        <p className="card-value">{totalNode.length}</p>
                        <p className="card-title">Total Nodes</p>
                      </div>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <div >
                        <p className="card-value">{activeEstimatedPayout.toFixed(6)} ETH</p>
                        <p className="card-title">Active Estimated Payout</p>
                      </div>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <div >
                        <p className="card-value">{pastPayout.toFixed(6)} ETH</p>
                        <p className="card-title">Past Payout</p>
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
                        <PanelTabs style={{ textDecoration: "none" }} label="My Nodes" value="1" />
                        <PanelTabs style={{ textDecoration: "none" }} label="Rentals" value="2" />
                        <PanelTabs style={{ textDecoration: "none" }} label="Setup GPU" value="3" onClick={handleNodeModalOpen} />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <BasicTable />
                    </TabPanel>
                    <TabPanel value="2">
                      <BasicRentalsTable />
                    </TabPanel>
                    <TabPanel value="3">
                      {address != "" ?
                        <NodeModal
                          handleClose={() => setNodeModalOpen(false)}
                          modalOpen={nodeModalOpen}
                          setCustomNode={setCustomNode}
                          currentNode={customNode}
                        /> :
                        <>
                          {validConnectWallet()}
                        </>
                      }
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
