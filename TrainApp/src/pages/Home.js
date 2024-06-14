import React from 'react';
import Map from '../components/Map';
import RoutesGraph from '../components/RoutesGraph';
// import RoutesOverview from '../components/RoutesOverview';

const Home = () => (
  <div className='homePage'>
    <h1>Welcome to the Train Ticket Platform</h1>
    <RoutesGraph />
    {/* <Map /> */}
    {/* <RoutesOverview /> */}
  </div>
);

export default Home;
