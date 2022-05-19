import React,{useState, useEffect} from "react";
import {API_URL} from '../../config'
import Loading from "../common/Loading";
import Pagination from "./Pagination";
import Table from "./Table";

const List = () =>{
    const [currencies, setCurrencies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)




    const fetchCurrency = ()=>{
        setLoading(true)
        fetch(`${API_URL}&page=${page}&per_page=20`).then(res =>{
            return res.json()
        }).then(data => {
            setCurrencies(data);
            setLoading(false);
            setTotalPages(5)
        }).catch(err =>{
            setLoading(false);
            setError(err)
        })
    }


    const handleChangePagination = (direction) =>{
       let currentPage = direction === 'next' ? page + 1 : page - 1;
        setPage(currentPage)    
    }


    useEffect(()=>{
        fetchCurrency()
    },[page])



    if(loading){
        return <div className="loading-container">
            <Loading/>
        </div>
    }
    if(error){
        return <div>Error</div>
    }

    
    return (
        <>
        <Table
        currencies={currencies}
        />
        <Pagination
        page={page}
        totalPages={totalPages}
        handleChangePagination={handleChangePagination}
        />
        </>
    )
}
export default List
