import React, { useContext } from "react";
import { MyContext } from "../../App";
import ReactStars from "react-rating-stars-component";
import DeregisterUser from "../../components/DeregisterUser";
import { useNavigate } from 'react-router-dom';
import UserData from "../../components/UserData"
import "./mealsPage.scss";

const MealsPage = () => {
  const { meals, user, cart, setCart, isLoggedIn, deleteUserAccount, isAdmin, token } = useContext(MyContext);
  const navigate = useNavigate();
  const addToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);
    
    if(!isLoggedIn) {
      alert("Please login");
      navigate("/login")
    } else {
      if (item) {
        item.quantity += 1;
        setCart([...cart]);
      } else {if ((cart.length +1) > 3 ){
        alert('Reached Maximum Quantity of Meals')
        return 
      }
        setCart([...cart, { ...meal, quantity: 1 }]);
      }
    }
    
  };

  return (
    <div>
      <DeregisterUser deleteUserAccount={deleteUserAccount} />
      {isAdmin && <UserData token={token} user={user.id} /> } 
      
      <div>
        <h2>Welcome {user && user.info.firstName}</h2>
      </div>
      <h2>Meals page</h2>
      <div className="meals-container">
        {meals.map((meal) => {
          return (
            <div key={meal._id} className="meal">
              <img src={meal.img} width="300" alt="" />
              <h2>{meal.mealName}</h2>
              <p>{meal.description}</p>
              <h3>
                <strong>$ {meal.price}</strong>
              </h3>
              <ReactStars
                count={5}
                value={meal.rating}
                size={24}
                half={true}
                activeColor="yellow"
              />
              <div>
                <button onClick={() => addToCart(meal)}>Add To Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealsPage;
