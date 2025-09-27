/*
 * DynamicDashboardApp
 * Copyright (c) 2025 Saurabh Rajesh Jha
 * 
 * Released under the MIT License.
 * Free to use for non-commercial / non-profit purposes.
 * Commercial use requires separate permission.
 */
import { useState, useEffect } from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { startLoading,setData } from "../../redux/slice/slice";
import type { AppDispatch } from "../../redux/store/store";

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
type SidebarProps = {
    isVisible?: boolean,
    closeSidebar: () => void,
    data: DataType
}
function Sidebar({ isVisible, closeSidebar, data }: SidebarProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [activeTab, setActiveTab] = useState<number>(0);
    const [localWidgets, setLocalWidgets] = useState<DataType>(data);


    useEffect(() => {
        if (isVisible) {
            setLocalWidgets(data);
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }
    }, [isVisible, data]);

    const handleActiveTab = (e: React.MouseEvent<HTMLSpanElement>) => {
        const active = e.currentTarget.dataset.active;
        if (active !== undefined) setActiveTab(parseInt(active))
    }
    const handleToggleLocalWidget = (categoryId: string, widgetId: string) => {
        setLocalWidgets((prev) =>
            prev.map((category) =>
                category.id === categoryId
                    ? {
                        ...category,
                        widgets: category.widgets.map((w) =>
                            w.id === widgetId ? { ...w, isActive: !w.isActive } : w
                        ),
                    }
                    : category
            )
        );
    };

    const handleSubmit = () => {
        dispatch(startLoading());
        dispatch(setData(localWidgets));
        closeSidebar();
    };
    return (
        <div className={"sidebar-wrapper" + ` ${isVisible ? 'show' : ''}`}>
            <div className="sidebar">
                <div className="sidebar__header">
                    <span>Add Widget</span>
                    <div className="sidebar__close" onClick={closeSidebar}>x</div>
                </div>
                <p>Personalize your dashboard by adding the following widgets</p>
                <div className="tab-section">
                    {data ? data.map((category, index) => {
                        return (
                            <span key={category.name} className={`tab ${activeTab == index ? 'active' : ''}`} data-active={index} onClick={handleActiveTab}>{category.name}</span>
                        )
                    }) :
                        null
                    }
                </div>
                <div className="tab-widgets">
                    {localWidgets[activeTab]?.widgets ?
                        localWidgets[activeTab].widgets.map((widget) => {
                            return (
                                <div className="tab-widget" key={`${activeTab}-${widget.title}`}>
                                    <input type="checkbox" onChange={() => handleToggleLocalWidget(localWidgets[activeTab].id, widget.id)} name="" id="" checked={widget.isActive} />
                                    <span>{widget.title}</span>
                                </div>
                            )
                        })
                        : null}
                </div>
                <div className="cta-btns">
                    <button className="cancelBtn" onClick={closeSidebar}>Cancel</button>
                    <button className="submitBtn" onClick={handleSubmit}>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar