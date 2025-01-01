import React from "react";
import Navigation from "../../component/Navigation/Navigation";
import axios from "axios";
import './style/Categories.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react";
import MealItem from "../Home/MealItem";


interface categoryObj {
    idCategory: string;
    strCategory: string;
    strCategoryDescription: string;
    strCategoryThumb: string;
}

interface mealType{
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
}

interface loader{
    categoryLoader: boolean;
    gridListLoader: boolean
}

const Categories: React.FC = () => {
   
    const [categories, setCategories] = useState<categoryObj[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('Beef');
    const [loader, setLoader] = useState<loader>({
        categoryLoader: true ,
        gridListLoader: true 
    }); 
    
    const [data, setData] = useState<mealType[] | null>(null)
    const fetchData = (): void => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            .then((res) => {
                setCategories(res.data.categories);
                setLoader(prev => ({...prev, categoryLoader: false})); 
            })
            .catch((err) => {
                console.log(err);
                setLoader(prev => ({...prev, categoryLoader: false}));
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchMeal = (name: string) =>{
        loader.gridListLoader = true;
        setData(null)
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
        .then((res) => {
            setData(res.data.meals)
            setLoader(prev => ({...prev, gridListLoader: false}));
        })
        .catch((err) => {
            console.log(err);
            setLoader(prev => ({...prev, gridListLoader: false}));
          
        });
    }

    useEffect(() =>{
        fetchMeal('Beef');
    },[])

    const FilterMeal = (name: string): void => {
       setSelectedCategory(name)
      
        fetchMeal(name);
    };
    return (
        <>
            <Navigation />
            <div className="categories-container">
                <div className="category-filter-wrapper">
                            
                    {loader.categoryLoader ? ( 
                        <span className="loader-category-filter"></span>
                    ) : (
                        categories ? (
                            categories.map(item => (
                                <div
                                    key={item.idCategory}
                                    className={`category-item ${item.strCategory} ${selectedCategory === item.strCategory ? 'active-category' : ''}`} 
                                    onClick={() => FilterMeal(item.strCategory)}
                                >
                                    {item.strCategory}
                                </div>
                            ))
                        ) : (
                            <span>No categories available</span> 
                        )
                    )}
                </div>

                <div className="grid-meals">
                    {loader.gridListLoader &&  <span className="loader-category-list"></span>}
                   
                    {data && data.map((item,index)=> <MealItem key={index} meal={item}/> )}
                </div>

              
            </div>
        </>
    );
};

export default Categories;