import React, { useEffect, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react/cjs/react.development";
import { useParams } from "react-router";
const Charter = () =>{
    const [prices, setPrices] = useState(null)
    const params = useParams()


    
    useEffect(()=>{
        fetch(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=3`)
        .then(response => {
            // console.log(response);
            return response.json()
        })
        .then(({prices}) =>{
            setPrices(prices)
        })
    },[])



    const model = useMemo(()=>{
        if(prices){
            return {
                series: [
                            {
                                name:'Price',
                                data:prices.map(item => item[1])
                            }
                        ]
            }
        }
        return null
    },[prices])
        return(
            <div>
             {model && <HighchartsReact highcharts={Highcharts} options={model}/>}
            </div>
        )
}
export default Charter