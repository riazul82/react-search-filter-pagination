import React, { useEffect, useState } from 'react';
import {arr} from '../data';
import Footer from './Footer';
import Pagination from './Pagination';

const MyApp = () => {
    const [data, setData] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchTimer, setSearchTimer] = useState();
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [loader, setLoader] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(10);

    useEffect(() => {
        setData(arr);
    }, []);

    const handleSelectedCountry = (e) => {
        setSelectedCountry(e.target.value);
    }

    const handleSearchText = (e) => {
        clearTimeout(searchTimer);
        setLoader(true);
        setSearchTimer(
            setTimeout(() => {
                setSearchText(e.target.value);
                setLoader(false);
            }, 900)
        );
    }

    const filterSearchItems = (item) => {
        let mainTxt = ''.concat(item.id, item.username, item.email, item.phone, item.gender, item.category, item.country).replace(/[^a-zA-Z0-9@]/g, '').toLowerCase();
        let srchTxt = searchText.replace(/[^a-zA-Z0-9@]/g, '').toLowerCase();

        if (searchText === '' || mainTxt.includes(srchTxt)) {
            return true;
        } else {
            return false;
        }
    }

    
    const getPaginationData = (currentPage, itemsPerPage) => {
        setCurrentPage(parseInt(currentPage));
        setProjectsPerPage(parseInt(itemsPerPage));
    }

    let lastIndex = currentPage * projectsPerPage;
    let firstIndex = lastIndex - projectsPerPage;
    let filteredData = [];

    const handleFilter = () => {
        filteredData = data && data.filter((item) => {
            if (selectedCountry === 'all' && filterSearchItems(item)) {
                return item;
            } else if (item.country.toLowerCase().includes(selectedCountry) && filterSearchItems(item)) {
                return item;
            } else {
                return null;
            }
        });
    }

    return (
        <>
            {!loader && handleFilter()}
            <div className="container">
                <div className="topbar">
                    <div className="category">
                        <select id="selectCountry" value={selectedCountry} onChange={handleSelectedCountry}>
                            <option value="all">Country (All)</option>
                            <option value="bangladesh">Bangladesh</option>
                            <option value="maldives">Maldives</option>
                            <option value="thailand">Thailand</option>
                            <option value="africa">Africa</option>
                            <option value="singapur">Singapur</option>
                            <option value="malaysia">Malaysia</option>
                            <option value="usa">USA</option>
                            <option value="canada">Canada</option>
                            <option value="england">England</option>
                            <option value="egypt">Egypt</option>
                        </select>
                    </div>

                    <div className="searchBox">
                        <input type="text" placeholder="Search..." onChange={handleSearchText} />
                    </div>
                    <div className="dataCountBox">
                        <p>Items: {filteredData.length}/{data.length}</p>
                    </div>
                </div>

                <div className="dataContent">
                    <table className="dataTable">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>username</th>
                                <th>email</th>
                                <th>phone</th>
                                <th>gender</th>
                                <th>category</th>
                                <th>location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loader ? <tr style={{textAlign: 'left'}}><td style={{paddingTop: '0.4rem'}}>Searching...</td></tr> : null}
                            {!loader && ((filteredData.length) ? filteredData.slice(firstIndex, lastIndex).map((elem, index) => {
                                return <tr key={index}>
                                    <td>{elem.id}</td>
                                    <td>{elem.username}</td>
                                    <td>{elem.email}</td>
                                    <td>{elem.phone}</td>
                                    <td>{elem.gender}</td>
                                    <td>{elem.category}</td>
                                    <td>{elem.country}</td>
                                </tr>
                            }) :
                            <tr style={{textAlign: 'left'}}><td style={{paddingTop: '0.4rem'}}>No item found!</td></tr>)}
                        </tbody>
                    </table>
                </div>

                <Pagination itemsLength={filteredData.length} getPaginationData={getPaginationData} />
            </div>
            <Footer />
        </>
    );
}

export default MyApp;