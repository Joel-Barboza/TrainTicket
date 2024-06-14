import React from 'react';
import Map from '../components/Map';
import RoutesGraph from '../components/RoutesGraph';

const Home = () => (
  <div className='homePage'>
    <h1>Welcome to the Train Ticket Platform</h1>
    <RoutesGraph />
    {/* <Map /> */}
  </div>
);

export default Home;
