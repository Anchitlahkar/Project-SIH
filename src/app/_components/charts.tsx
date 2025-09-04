import { Line, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
)

export default function Charts() {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Data Overview',
            },
        },
    }

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August ', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sample Dataset',
                data: [65, 59, 80, 81, 56, 55, 40, 56, 68, 42, 56, 74],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                tension: 0.3,
            },
        ],
    }

    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Votes',
                data: [12, 19, 3, 35, 10, 45],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ]
    }

    return (
        <div className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                    Data Charts
                </p>
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-2">
                    <div className="relative lg:row-span-1">
                        <div className="space-y-8">
                            {/* Doughnut Chart */}
                            <div className="bg-white p-4 rounded-xl shadow">
                                <Doughnut data={doughnutData} />
                            </div>
                        </div>

                    </div>
                    <div className="relative max-lg:row-start-1">

                        {/* Line Chart */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <Line options={options} data={data} />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
