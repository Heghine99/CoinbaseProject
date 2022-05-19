import React from "react";
import { API_URL } from "../../config";
import './Search.css'
import {Loading} from '..'

class Search extends React.Component{
    constructor(){
        super();
        this.state = {
                currencies:[],
                searchResults:[],
                searchQuery:'',
                loading:false,
        }
    }
    componentDidMount(){
        this.fetchCurrency()
    }

    fetchCurrency(){
        this.setState({isLoading:true});
        fetch(`${API_URL}`).then(res =>{
            return res.json()
        }).then(data => {
            this.setState({
                isLoading:false,
                currencies:data,
            })
        }).catch(err =>{
            this.setState({
                isLoading:false,
                error:err
            })
        }) 
    }

    handleChangeInput = (e) =>{
        const {currencies} = this.state
        const searchQuery = e.target.value;
        this.setState({searchQuery})
        console.log(searchQuery);

        if(!searchQuery){
            this.setState({
                searchResults:[]
            })
            return ''
        }    

        const arr = searchQuery.split('')
        this.setState({
            loading:true
        })
        setTimeout(()=>{
            const searchResults = currencies.filter(item =>{
                return arr.every(char => item.id.includes(char))
            } );
            this.setState({searchResults, loading:false})
            console.log(searchResults);
        },5000)
    }

    renderSearchResults(){
        const {searchQuery, searchResults, loading} = this.state;
        if(!searchQuery){
            return ''
        }
        if(searchResults.length > 0){
            return (
                <div className="Search-result-container">
                {searchResults.map(result =>
                  <div
                    key={result.id}
                    className="Search-result"
                    onClick={() => this.handleRedirect(result.id)}
                  >
                    {result.name} ({result.symbol})
                  </div>
                )}
              </div>
            )
        }
        if(!loading){
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                    No results found.
                    </div>
                </div>
            )
        }

    }

    handleRedirect(id){
        window.location = `/currency/${id}`
    }

    render(){
        const { searchQuery, loading } = this.state
        return (
        <div className='Search'>
            <div>
          <span className="Search-icon" />
          <input 
            type="text"
            value={searchQuery}
            onChange={this.handleChangeInput}
            className="Search-input"
            placeholder="Currency name"
          />

          {
          loading &&
            <div className="Search-loading">
              <Loading
                width="12px"
                height="12px"
              />
            </div>}
        </div>
        { this.renderSearchResults() }
      </div>
        )
    }
}
export default Search