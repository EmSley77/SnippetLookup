import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import React, { useCallback, useEffect, useState } from 'react';
import { Bar as BarChartJs } from 'react-chartjs-2';
import usePosts from '../../hooks/usePosts';
import useAuth from '../../hooks/useAuth';
import Header from '../pages/Header';
import Footer from '../pages/Footer';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Bar = () => {

    const [chartData, setChartData] = useState([])
    const { getPostsByUserId } = usePosts();
    const { user, loading } = useAuth()



    const fetchPosts = useCallback(async () => {
        if (!user) return;

        try {
            const data = await getPostsByUserId(user.id);
            if (data) {
                // Transform data before updating state
                const chartDataArray = data.map((object) => ({
                    title: object.title,
                    number: object.views_count + object.copy_count
                }));

                setChartData(chartDataArray); // Update state once instead of multiple times       
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])


    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statistics',
            },
        },
    };


    const data = {
        labels: chartData.map((item) => item.title), // Titles from your posts
        datasets: [
            {
                label: 'Views + Copies',
                data: chartData.map((item) => item.number), // Views + Copies count
                backgroundColor: 'rgba(54, 162, 235, 2)',

            },
        ],
    };

    if (loading) {
        return <><p>Loading in user</p></>
    }
    return (
        <>
            <Header />
            <div className='p-4 h-[500px]'>

                <BarChartJs options={options} data={data} />
            </div>
            <Footer />
        </>
    );
}

export default Bar;