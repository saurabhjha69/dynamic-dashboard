import "./DashboardHeader.css"
type DashboardHeaderProps = {
    showSidebar: () => void
}
function DashboardHeader({showSidebar}: DashboardHeaderProps) {
    return (
        <div className="header">
            <h4>CNAPP Dashboard</h4>
            <div className="tools">
                <button className="btn_addWidget" onClick={showSidebar}>
                    Add Widget +
                </button>
                <button className="btn_refresh">
                    <svg width="100%" height="100%" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.1998 10.8799L3.9998 14.0799L0.799805 10.8799" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.72 6.77007C16.6086 5.63347 15.1839 4.85371 13.6275 4.53032C12.0711 4.20693 10.4536 4.35459 8.98145 4.95439C7.5093 5.5542 6.24924 6.57899 5.362 7.898C4.47476 9.21701 4.0006 10.7703 4 12.3599V14.0901" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.7998 13.96L19.9998 10.75L23.1998 13.96" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.28027 18.0801C7.39163 19.2167 8.8164 19.9962 10.3728 20.3196C11.9292 20.643 13.5467 20.4956 15.0188 19.8958C16.491 19.2959 17.751 18.2712 18.6383 16.9521C19.5255 15.6331 19.9997 14.0796 20.0003 12.49V10.76" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
                <button className="btn_threeDots">
                    <svg width="16px" height="100%" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.444 13.832a1 1 0 1 0 1.111-1.663 1 1 0 0 0-1.11 1.662zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></g></svg>
                </button>
                <span className="date_filter">
                    <svg width="1.4vw" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7 3V8.41421L10.2929 11.7071L11.7071 10.2929L9 7.58579V3H7Z" fill="#000000"></path> </g></svg>
                    Last 2 days
                </span>
            </div>
        </div>
    )
}

export default DashboardHeader