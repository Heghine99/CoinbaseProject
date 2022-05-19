import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Charter, Loading } from "..";
import { getCurrencyURL } from "../../config";
import { renderChangePercent } from "../../helpers";
import './Detail.css'



const Detail = () =>{
    const [isLoading, setIsLoading] = useState(false)    
    const [error, setError] = useState(null)    
    const [currency, setCurrency] = useState({})    
    const [isShowCharter, setIsShowCharter] = useState(false)
    const params = useParams()
    
    
    useEffect(()=>{
        const url = getCurrencyURL(params.id)
        fetchCurrencyById(url)
    },[])


   const fetchCurrencyById = (url) =>{
        setIsLoading(true)
        fetch(url).then(response =>{
            return response.json()
        }).then(result => {
            setIsLoading(false);
            setCurrency(result[0])
        })
        .catch(err =>{
            setIsLoading(false);
            setError(err)
        })
    }
   
   
    const handleShowCharter = () =>{
        setIsShowCharter(true)
    }  
        
    
    
    if(isLoading){
        return <div className="loading-container">
            <Loading/>
        </div>
    }
    if(error){
        return <div>Error...</div>
    }


        return (
            <>
            {isShowCharter && <Charter/>}
            <div className="Detail">
            <h1 className="Detail-heading">
                <img src={currency.image} alt="" onClick={handleShowCharter} />
                {currency.name} ({currency.symbol})
            </h1>
            <div className="Detail-container">
                <div className="Detail-item">
                    Price
                    <span className="Detail-value">
                        $ {currency.current_price}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    Rank
                    <span className="Detail-value">
                        {currency.market_cap_rank}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    Price Change Percentage 24h
                    <span className="Detail-value">
                        {renderChangePercent(
                            currency.price_change_percentage_24h
                        )}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    24H Change
                    <span className="Detail-value">
                        $ {currency.price_change_24h}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    <span className="Detail-title">Market cap</span>
                    <span className="Detail-dollar">$</span>
                    {currency.market_cap}
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    <span className="Detail-title">Total supply</span>
                    {currency.total_supply}
                </div>
            </div>
        </div>
        </>
        )
}
export default Detail