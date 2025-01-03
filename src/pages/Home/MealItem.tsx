import 'bootstrap/dist/css/bootstrap.min.css'
import truncateText from '../../utils/truncateText';
import './style/MealItem.css'
import { useState } from 'react';
import ViewModal from "./ViewModal.tsx";

interface Meal {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
}

interface MealItemProps {
    meal : Meal;

};

const MealItem: React.FC<MealItemProps> = ({ meal} ) =>{
    const [modalToggler, setModalToggler] = useState<boolean>(false);
 
    const ViewRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        setModalToggler(prev => !prev);
    };

  

    return(
        <>
            {modalToggler &&  <ViewModal setModalToggler={setModalToggler} id={meal.idMeal} />}

            <div className={`meal-item`} title={meal.strMeal}>
                         
                <div className="img-wrapper">
                    <img src={meal.strMealThumb} alt="" />
                </div>
                
                <div className="info-wrapper">
                    <p>{truncateText(meal.strMeal)}</p>
                </div>

                <div className='button-wrapper'>
                    <button className='d-block mx-auto viewRecipeBtn' onClick={ViewRecipe}>View Recipe</button>
                </div>
                
            </div>
            
        </>
    )
}

export default MealItem