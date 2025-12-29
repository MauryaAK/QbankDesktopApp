// import React from 'react';
import TopDealsBox from '../components/topDealsBox/TopDealsBox';
import ChartBox from '../components/charts/ChartBox';
import { useQuery } from '@tanstack/react-query';
import {
  MdGroup,
  MdInventory2,
  MdAssessment,
  MdSwapHorizontalCircle,
} from 'react-icons/md';
import {
  fetchTopDeals,
  fetchTotalProducts,
  fetchTotalProfit,
  fetchTotalRatio,
  fetchTotalRevenue,
  fetchTotalRevenueByProducts,
  fetchTotalSource,
  fetchTotalUsers,
  fetchTotalVisit,
} from '../api/ApiCollection';

const Home = () => {
  const payload = {
    role: "admin",
    page: 1,
  };
  const queryGetTotalUsers = useQuery({
    queryKey: ["totalusers", payload],
    queryFn: fetchTopDeals,
    enabled: !!payload,
  });

  const queryGetTotalProducts = useQuery({
    queryKey: ['totalproducts'],
    queryFn: fetchTotalProducts,
  });

  const queryGetTotalRatio = useQuery({
    queryKey: ['totalratio'],
    queryFn: fetchTotalRatio,
  });

  const queryGetTotalRevenue = useQuery({
    queryKey: ['totalrevenue'],
    queryFn: fetchTotalRevenue,
  });

  const queryGetTotalSource = useQuery({
    queryKey: ['totalsource'],
    queryFn: fetchTotalSource,
  });

  const queryGetTotalRevenueByProducts = useQuery({
    queryKey: ['totalrevenue-by-products'],
    queryFn: fetchTotalRevenueByProducts,
  });

  const queryGetTotalVisit = useQuery({
    queryKey: ['totalvisit'],
    queryFn: fetchTotalVisit,
  });

  const queryGetTotalProfit = useQuery({
    queryKey: ['totalprofit'],
    queryFn: fetchTotalProfit,
  });

  return (
    // screen
    <div className="home w-full p-0 m-0">
      {/* grid */}
      <h1 className='text-black'>sadjklf</h1>
    </div>
  );
};

export default Home;
