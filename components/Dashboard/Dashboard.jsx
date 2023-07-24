import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import Budget from './components/Budget';
import Notifications from './components/Notifications';
import Observation from './components/Observation';
import Liquidity from './components/Liquidity';
import Saving from './components/Saving';
import Goals from './components/Goals';
import DashboardFooter from './components/DashboardFooter';
const Dashboard = () => {
  return (
    <React.Fragment>
      <DashboardHeader />
      <Budget />
      <Notifications />
      <Observation />
      <Liquidity />
      <Saving />
      <Goals />
      <DashboardFooter />
    </React.Fragment>
  )
}

export default Dashboard
