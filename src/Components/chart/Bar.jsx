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
import useAuth from '../../hooks/useAuth';
import usePosts from '../../hooks/usePosts';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Bar = () => {
    const [chartData, setChartData] = useState([]);
    const { getPostsByUserId } = usePosts();
    const { user, loading } = useAuth();

    const fetchPosts = useCallback(async () => {
        if (!user?.id) return;

        try {
            const data = await getPostsByUserId(user.id);
            if (data) {
                const chartDataArray = data.map((object) => ({
                    title: object.title,
                    number: object.views_count + object.copy_count
                }));

                setChartData(chartDataArray);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [user?.id, getPostsByUserId]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const options = {
        scales: {
            x: {
                ticks: { color: "#fff" }, // White X-axis labels
                grid: { color: "rgba(255, 255, 255, 0.2)" } // Light grid lines
            },
            y: {
                ticks: { color: "#fff" }, // White Y-axis labels
                grid: { color: "rgba(255, 255, 255, 0.2)" }
            }
        },
        animation: true,
        plugins: {
            legend: { labels: { color: "#fff" } }, // Legend text color
            title: { display: true, text: 'My Post Statistics', color: "#fff" }, // Chart title color
        },
    };

    const data = {
        labels: chartData.map((item) => item.title),
        datasets: [
            {
                label: 'Views + Copies',
                data: chartData.map((item) => item.number),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',  // Increased opacity
                hoverBackgroundColor: "rgba(54, 200, 180, 0.9)", // Higher contrast on hover
                borderWidth: 2,
                barThickness: 50,
            },
        ],
    };

    if (loading) return <p>Loading user...</p>;

    return (
        <div className='h-100 bg-gray-800 rounded-xl w-full p-6 '>

            <BarChartJs
                options={options}
                data={data} />
                </div>
        
    );
};

export default Bar;
