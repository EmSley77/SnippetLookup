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

const BarChart = () => {
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
                ticks: { color: "#000" }, // White X-axis labels
                grid: { color: "#1689b9" } // Light grid lines
            },
            y: {
                ticks: { color: "#000" }, // White Y-axis labels
                grid: { color: "#1689b9" }
            }
        },
        animation: true,
        plugins: {
            legend: { labels: { color: "#000" } }, // Legend text color
            title: { display: true, text: 'My Posts', color: "#000" }, // Chart title color
        },
    };

    const data = {
        labels: chartData.map((item) => item.title),
        datasets: [
            {
                label: 'Views + Copies',
                data: chartData.map((item) => item.number),
                backgroundColor: 'rgba(85,136,255)',  // Increased opacity
                hoverBackgroundColor: "rgba(0,35,149)", // Higher contrast on hover
                borderWidth: 3,
                borderColor:"#0a507c",
                barThickness: 50,
            },
        ],
    };

    if (loading) return <p>Loading user...</p>;

    return (
        <div className='bg-blue-100 p-6 rounded-xl shadow-xl'>

            <BarChartJs
                options={options}
                data={data} />
        </div>

    );
};

export default BarChart;
