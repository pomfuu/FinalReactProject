import Sidebar from "./Sidebar";
import UserList from "./UserList";


const Dashboard = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <div className="col-10" style={{ paddingLeft: "20vw" }}>
                <UserList/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;