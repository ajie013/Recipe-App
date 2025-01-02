import React, { useEffect } from 'react'
import './style/ViewModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState} from 'react';
import axios from 'axios';



interface modalProps {
    setModalToggler: React.Dispatch<React.SetStateAction<boolean>>;
    id: string | null;
};

interface ingredientsInfo {
    name: string;
    img_url: string;
}
interface mealInfo{
    strInstructions: string;
    strMeal: string;
    strTags: string;
    strCategory: string;
    strMealThumb: string;
}

const ViewModal : React.FC<modalProps> = ({setModalToggler,id}) =>{

    const [data, setData] = useState<mealInfo | null>(null);
    const [ingredients, setIngredients] = useState<ingredientsInfo[]>([])
    const [measure, setMeasure] = useState<string[]>([])
    
   
    const fetchData = () : void =>{
       
        setIngredients([])
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
            
            setData({
                strInstructions:  res.data.meals[0].strInstructions,
                strMeal:  res.data.meals[0].strMeal,
                strTags:  res.data.meals[0].strTags,
                strCategory:  res.data.meals[0].strCategory,  
                strMealThumb: res.data.meals[0].strMealThumb      
            });

            for(let i  = 1; i <= 20;i++){
                let ingredient = res.data.meals[0][`strIngredient${i}`]
                let arr = ingredient.split(" "); 
                let result = arr.join("%20");
                let url = `https://www.themealdb.com/images/ingredients/${result}.png`
                
                const newIngredient = {
                    name: res.data.meals[0][`strIngredient${i}`],
                    img_url: url
                }
               
                if(ingredient !== "" && ingredient !== " "){
                    setIngredients(prev => [...prev, newIngredient])
                }            
            }

            for(let i  = 1; i <= 20;i++){
                let measure = res.data.meals[0][`strMeasure${i}`]
                if(measure !== "" && measure !== " "){
                    setMeasure(prev => [...prev, measure])
                }            
            }
        })
        .catch((err) => {
            console.log(err);
          
          
        });
    };
   
    useEffect(() => {
        fetchData();
        document.body.classList.add('no-scroll'); // Disable scroll
        return () => {
            document.body.classList.remove('no-scroll'); // Enable scroll on cleanup
        };
    }, []);

    const CloseModal = () =>{
        setModalToggler(prev => !prev);
    };
   
    
    return(
        <>
            <div className='modal-bg' onClick={CloseModal}>
                <div className='view-modal-container' onClick={(e) => e.stopPropagation()}>
                    {data && ingredients && measure ?
                     <div className="content">
                        <div className="modal-header">
                            <p className='name'>{data.strMeal}</p>
                        </div>
                        <div className='category'>
                            <p className='category-label'>{data.strCategory}</p>
                     </div>

                        <div className='meal-photo-container'>
                            <img src={data?.strMealThumb} className='meal-photo' alt="" />
                        </div>
                        <p className='ingredients-header'>Ingredients</p>
                        <div className='ingredients-wrapper'>
                            
                            {ingredients.map((item, index) => <div key={index} className='ingredient-item'>
                                <p>{measure[0]} {item.name}</p>
                                <img src={item.img_url} className='ingredient-item-photo' alt="" />
                            </div>)}
                        </div>
                        <div className='instructions-wrapper'>
                            <p className='instructions-header'>Instruction</p>
                           
                            <p className='instruction-text'>
                            {data.strInstructions.split('.').map((item,index) => <p key={index}>{item}.</p>)}
                            </p>
                        </div>
                        
                        <div className='tag-wrapper'>
                            <p className='tag-label'>Tags: &nbsp;</p>
                            {data.strTags && typeof data.strTags === 'string' && data.strTags.includes(',') 
                            ? data.strTags.split(',').map((item, index) => <p key={index} className='tag-item'>{item.trim()}&nbsp;</p>) 
                            : <p className='tag-item'>{data.strTags ? data.strTags : 'No tags available'}&nbsp;</p>}
                        </div>

                    </div> : <span className="loader-modal"></span>}
                   
                   
                
                <FontAwesomeIcon icon={faXmark} className='x-mark' onClick={CloseModal} />
                </div>
            </div>
            
        </>
    )
}

export default ViewModal