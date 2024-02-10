/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user`,
                    {
                        headers: {
                            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setUsers(response?.data?.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid py-5">
            <p className="fw-semibold mb-4 fs-4">User List</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(Math.min(3, Math.ceil(users.length / usersPerPage))).keys()].map((number) => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Ellipsis disabled={Math.ceil(users.length / usersPerPage) <= 3} />
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={indexOfLastUser >= users.length} />
            </Pagination>
        </div>
    );
};

export default UserList;
