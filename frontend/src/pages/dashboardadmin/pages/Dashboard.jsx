import React from 'react'
import { Bar } from 'react-chartjs-2'
import Box from '../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box/SummaryBox'
import { colors, data } from '../constants'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import OverallList from '../components/overall-list/OverallList'
import RevenueList from '../components/revenue-list/RevenueList'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <section className="row">
                    <section className="col-8 col-md-12">
                        <section className="row">
                            {
                                data.summary.map((item, index) => (
                                    <section key={`summary-${index}`} className="col-6 col-md-6 col-sm-12 mb">
                                        <SummaryBox item={item} />
                                    </section>
                                ))
                            }
                        </section>
                    </section>
                    <section className="col-4 hide-md">
                        <SummaryBoxSpecial item={data.revenueSummary} />
                    </section>
                </section>
                <section className="row">
                    <section className="col-12">
                        <Box>
                            <RevenueByMonthsChart />
                        </Box>
                    </section>
                </section>
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <section className="title mb">Overall</section>
                <section className="mb">
                    <OverallList />
                </section>
                <section className="title mb">Revenue by channel</section>
                <section className="mb">
                    <RevenueList />
                </section>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Dashboard

const RevenueByMonthsChart = () => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            yAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        elements: {
            bar: {
                backgroundColor: colors.orange,
                borderRadius: 20,
                borderSkipped: 'bottom'
            }
        }
    }

    const chartData = {
        labels: data.revenueByMonths.labels,
        datasets: [
            {
                label: 'Revenue',
                data: data.revenueByMonths.data
            }
        ]
    }
    return (
        <>
            <section className="title mb">
                Revenue by months
            </section>
            <section>
                <Bar options={chartOptions} data={chartData} height={`300px`} />
            </section>
        </>
    )
}