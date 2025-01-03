import React, { ChangeEvent, useState } from "react";
import Navigation from "../../component/Navigation/Navigation";
import './style/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import searchIcon from '../../assets/search.png'
import MealItem from "./MealItem.tsx";


type searchType = string

interface mealType {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
}

const Home: React.FC = () =>{
    
    const [search, setSearch] = useState<searchType>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<mealType[] | null>(null);
   
    const fetchData = () : void =>{
        setData(null)
        setIsLoading(true)
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((res) => {
            
            if (Array.isArray(res.data.meals)) {
                setData(res.data.meals);
               
            } else {
                setData([]); 
               
            }
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err);
            setData([])
            setIsLoading(false)
        });
    };
  
    const searchChange = (e: ChangeEvent<HTMLInputElement>) : void =>{
        setSearch(e.target.value);
       
    };

    const SearchMeal = () : void =>{
        fetchData();
    };

    return(
        <>
           <Navigation/>
         
           <div className="home-container">
               
                <div className="search-recipe-wrapper">
                    <img src={searchIcon} alt="" onClick={SearchMeal} />
                    <input type="search" className="input-search" placeholder="Search Meal Name" value={search} onChange={searchChange} required />
                </div>          
               
                <div className="grid-meals">
                    {data === null ? 
                        ("") : 
                        ( data.length > 0 ? (data.map((item, index) =>  <MealItem key={index} meal={item}  />)) : (<div className="no-data">No Data...</div>))
                    }
                </div>
            
                {isLoading &&  <span className="loader"></span>}
                
              
           </div>
        </>
    )
};


export default Home