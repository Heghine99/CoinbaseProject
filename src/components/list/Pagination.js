import React from "react";
import './Pagination.css'

const Pagination = ({page, totalPages, handleChangePagination, ...props}) =>{
    return (
        <div className='Pagination'>
            <button 
            className = 'Pagination-button'
            disabled = {page === 1}
            onClick = {()=>handleChangePagination('prev')}
            >
            &larr;
            </button>

                <span
                className = 'Pagination-info'
                >
                page <span>{page}</span> of <b>{totalPages}</b>   
                </span>
                
            <button
            className='Pagination-button'
            disabled = {page === totalPages}
            onClick = {()=>handleChangePagination('next')}
            >
             &rarr;
            </button>
        </div>
    )
}
export default Pagination