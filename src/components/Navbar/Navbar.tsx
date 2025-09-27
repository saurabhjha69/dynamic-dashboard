import "./Navbar.css";

type NavbarProps = {
    searchWidgets: (e) => void
}
function Navbar({ searchWidgets }: NavbarProps) {
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li><a className="first" href="#">Home
                        <svg fill="#000000" width="16px" height="16px" viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></g></svg></a></li>
                    <li><a href="#">Dashboard V2</a></li>
                </ul>
                <div className="search-box">
                    <input type="search" placeholder="Search for widgets" onInput={searchWidgets} />
                </div>
            </nav>
        </div>
    )
}

export default Navbar