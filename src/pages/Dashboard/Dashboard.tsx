/*
 * DynamicDashboardApp
 * Copyright (c) 2025 Saurabh Rajesh Jha
 * 
 * Released under the MIT License.
 * Free to use for non-commercial / non-profit purposes.
 * Commercial use requires separate permission.
 */

import { useEffect, useState } from "react";
import CategorySection from "../../components/Category/Category";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import { useDispatch, useSelector } from "react-redux";
import { setData, setError, setFailed, startLoading } from "../../redux/slice/slice";
import type { RootState } from "../../redux/store/store";
import type { AppDispatch } from "../../redux/store/store";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import { nanoid } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner/Spinner";
type Widget = {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
}

type Category = {
    id: string;
    name: string;
    widgets: Widget[]

}
type DataType = Category[]
// const initialData: DataType = 
// [
//     {
//         id: nanoid(),
//         name: "Monitoring",
//         widgets: [
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "CPU Usage Tracker",
//                 description: "Tracks real-time CPU utilization across all servers.",
//                 isActive: true,
//             },
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "Memory Consumption",
//                 description: "Monitors RAM usage and alerts when usage exceeds threshold.",
//                 isActive: true,
//             },
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "Network Traffic",
//                 description: "Displays inbound and outbound network activity per second.",
//                 isActive: false,
//             },
//         ],
//     },
//     {
//         id: nanoid(),
//         name: "Analytics",
//         widgets: [
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "User Growth",
//                 description: "Shows user sign-up trends over the last 12 months.",
//                 isActive: true,
//             },
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "Revenue Breakdown",
//                 description: "Pie chart of revenue streams by product and region.",
//                 isActive: true,
//             },
//         ],
//     },
//     {
//         id: nanoid(),
//         name: "Operations",
//         widgets: [
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "Incident Reports",
//                 description: "Dashboard of recent incidents and their resolution status.",
//                 isActive: true,
//             },
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "Deployment Status",
//                 description: "Tracks progress of ongoing deployments in production.",
//                 isActive: false,
//             },
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "Task Queue",
//                 description: "Shows pending jobs in background task queues.",
//                 isActive: true,
//             },
//             {
//                 id: `widget-${Date.now()}-${nanoid()}`,
//                 title: "Service Health",
//                 description: "Overview of uptime and response time of core services.",
//                 isActive: true,
//             },
//         ],
//     },
// ];


function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.dashboard.data)
    const status = useSelector((state: RootState) => state.dashboard.status)
    const error = useSelector((state: RootState) => state.dashboard.error)
    const [sidebarVisibility, setSidebarVisibility] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<DataType | null>(data)


    useEffect(() => {
        if (status == "idle") {
            dispatch(startLoading())
            setTimeout(() => {
                fetch('/data.json')
                    .then(res => res.json())
                    .then(data => {
                        dispatch(setData(data))
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch(setFailed())
                        dispatch(setError({error: "Error Ocurred During Loading JSON File\n"+ error.message}))
                    })
            }, 2000)
        }
        console.log("status ", status)
    }, [dispatch, status])

    useEffect(() => {
        setFilteredData(data)
    }, [data])

    const handleSidebarVisibility = () => {
        setSidebarVisibility(!sidebarVisibility)
    }
    const handleWidgetSearch = (e) => {
        const { value } = e.target;
        const regex = new RegExp(value, "i");

        const newData = data
            .map(category => {
                const widgets = category.widgets;
                const filteredWidgets = widgets.filter(
                    widget => widget.isActive && regex.test(widget.title) || widget.isActive && regex.test(widget.description)
                );
                return { ...category, widgets: filteredWidgets };
            })
            .filter(category => category.widgets.length > 0);

        console.log(newData);
        setFilteredData(newData);
    };

    return (
        <>
            <Navbar searchWidgets={handleWidgetSearch} />
            <div className="dashboard-wrapper">
                <DashboardHeader showSidebar={handleSidebarVisibility} />
                <div className="dashboard">
                    {filteredData && filteredData.map((category) => {
                        return (
                            <CategorySection data={category} key={category.id} />
                        )
                    })}
                </div>
                <Sidebar isVisible={sidebarVisibility} closeSidebar={handleSidebarVisibility} data={data} />
            </div>
            {status === "loading" ?
                <div className="loadingContainer">
                    <Spinner thickness={6} /> Loading...
                </div>
                : null}
            {status === "failed" ?
                <div className="errorContainer">
                    {error}
                </div>
                : null}
        </>
    )
}

export default Dashboard