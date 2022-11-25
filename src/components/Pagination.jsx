import React, { useEffect, useState } from 'react';

const Pagination = ({itemsLength, getPaginationData}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const pages = [];

    for(let i = 1; i <= Math.ceil(itemsLength / parseInt(itemsPerPage)); i ++) {
        pages.push(i);
    }

    useEffect(() => {
        getPaginationData(currentPage, itemsPerPage);
        if (currentPage > pages.length) {
            setCurrentPage(1);
        }
    }, [currentPage, itemsPerPage, pages.length, getPaginationData]);

    const handleItemsPerPage = (e) => {
        setItemsPerPage(e.target.value);
    }

    const handlePageSwitch = (data) => {
        if (data === 'prev') {
            setCurrentPage((prev) => prev - 1);
        } else if (data === 'next') {
            setCurrentPage((prev) => prev + 1);
        } else {
            setCurrentPage(data);
        }
    }

    return (
        <div className="paginationBox">
            <div className="paginationBtns">
                <div className="pageSwitchPrev">
                    <button className="pageSwitchPrevBtn" 
                        onClick={() => handlePageSwitch('prev')} 
                        style={(currentPage <= 1) ? {color: '#888'} : {color: '#222'}}
                        disabled={(currentPage <= 1) ? true : false}>
                        Prev
                    </button>
                </div>
                {pages.map((num, index) => {
                    return (
                        <div key={index} className="pageSwitch">
                            <button className="pageSwitchBtn" style={(currentPage === index + 1) ? {color: '#fff', backgroundColor: 'steelblue'} : {backgroundColor: '#ccc'}} onClick={() => handlePageSwitch(num)}>{num}</button>
                        </div>
                    );
                })}
                <div className="pageSwitchNext">
                    <button className="pageSwitchNextBtn"
                        onClick={() => handlePageSwitch('next')} 
                        style={(currentPage >= Math.ceil(itemsLength / parseInt(itemsPerPage))) ? {color: '#888'} : {color: '#222'}}
                        disabled={(currentPage >= Math.ceil(itemsLength / parseInt(itemsPerPage))) ? true : false}>
                        Next
                    </button>
                </div>
            </div>
            <div className="itemsPerPage">
                <select id="selectItemsPerPage" value={itemsPerPage} onChange={handleItemsPerPage}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </select>
            </div>
        </div>
    );
}

export default Pagination;