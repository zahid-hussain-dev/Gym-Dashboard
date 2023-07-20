import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import Budget from './components/Budget';
import Notifications from './components/Notifications';
import Observation from './components/Observation';
import Liquidity from './components/Liquidity';
const Dashboard = () => {
  return (
    <React.Fragment>
      <DashboardHeader />
      <Budget />
      <Notifications />
      <Observation />
      <Liquidity />
    </React.Fragment>
  )
}

export default Dashboard
