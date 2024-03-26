import React from 'react'
import './summary-box.scss'
import Box from '../box/Box'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { colors } from '../../constants'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SummaryBox = ({ item }) => {
    return (
        <Box>
            <section className='summary-box'>
                <section className="summary-box__info">
                    <section className="summary-box__info__title">
                        <section>{item.title}</section>
                        <section>{item.subtitle}</section>
                    </section>
                    <section className="summary-box__info__value">
                        {item.value}
                    </section>
                </section>
                <section className="summary-box__chart">
                    <CircularProgressbarWithChildren
                        value={item.percent}
                        strokeWidth={10}
                        styles={buildStyles({
                            pathColor: item.percent < 50 ? colors.red : colors.purple,
                            trailColor: 'transparent',
                            strokeLinecap: 'round'
                        })}
                    >
                        <section className="summary-box__chart__value">
                            {item.percent}%
                        </section>
                    </CircularProgressbarWithChildren>
                </section>
            </section>
        </Box>
    )
}

export default SummaryBox

export const SummaryBoxSpecial = ({ item }) => {
    const chartOptions = {
        responsive: true,
        scales: {
            xAxis: {
                display: false
            },
            yAxis: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }

    const chartData = {
        labels: item.chartData.labels,
        datasets: [
            {
                label: 'Revenue',
                data: item.chartData.data,
                borderColor: '#fff',
                tension: 0.5
            }
        ]
    }
    return (
        <Box purple fullheight>
            <section className="summary-box-special">
                <section className="summary-box-special__title">
                    {item.title}
                </section>
                <section className="summary-box-special__value">
                    {item.value}
                </section>
                <section className="summary-box-special__chart">
                    <Line options={chartOptions} data={chartData} width={`250px`} />
                </section>
            </section>
        </Box>
    )
}
