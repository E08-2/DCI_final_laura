import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import MealsPage from '../mealspage/MealsPage';

import './cartPage.scss';

const CartPage = () => {
  const { cart, setCart, user, setOrders, orders, meals } =
    useContext(MyContext);

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [placedOrder, setPlacedOrder] = useState(false);
  const [total, setTotal] = useState(0);
  const [userData, SetUserData] = useState(null);
  const [sameAddress, setSameAddress] = useState(true);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
    setTotal(sum);
  }, [cart]);

  const changeQuantity = (e, meal) => {
    const item = cart.find((elem) => elem._id === meal._id);
    item.quantity = Number(e.target.value);
    setCart([...cart]);
    console.log(item);
  };
  const addToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);
    if (item) {
      item.quantity += 1;
      setCart([...cart]);
    } else {
      if (cart.length + 1 > 3) {
        alert('Reached Maximum Quantity of Meals');
        return;
      }
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
  };
  /*   const reduceToCart = (meal) => {
    let item = cart.find((elem) => elem._id === meal._id);
    if (item) {
      item.quantity -= 1;
      setCart([...cart]);
    }
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
  }; */

  /*   const getAddress = (e) => {
    e.preventDefault();
    let userAddress = {
      houseNo: e.target.hn.value,
      street: e.target.stn.value,
      zipCode: e.target.pc.value,
      city: e.target.city.value,
      phone: e.target.phone.value,
    };
    console.log(userAddress);
    e.target.reset();
  }; */

  /*  user enters card number, date, 3dig - click confirm order
  last 4 dig card is stored in database order
  stripe sandbox to process  payment*/
  /*  const payment = ((e) => {
    e.preventDefault()
    ??setCardNum =cardNumber.slice(-4)
  })
 */
  // * Yohannes and Sameer modify the placeOrder function

  // ===========================================================================
  // The customer placing an order in the front end and post it in the back end
  //============================================================================
  const placeOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/register');
    } else if (cart.length < 3) {
      alert('Minimum order is three meals');
    } else {
      const newOrder = {
        meals: cart.map((item) => item._id),
        total: total,
        userId: user.id,
        deliveryAddress: {
          houseNo: sameAddress ? user.info.houseNo : e.target.hn.value,
          street: sameAddress ? user.info.street : e.target.stn.value,
          zipCode: sameAddress ? user.info.zipCode : e.target.zc.value,
          city: sameAddress ? user.info.city : e.target.city.value,
          phone: sameAddress ? user.info.phone : e.target.phone.value,
        },
      };

      console.log(newOrder);

      const settings = {
        method: 'POST',
        body: JSON.stringify(newOrder),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`http://localhost:3001/orders`, settings);
      const result = await response.json();
      try {
        if (response.ok) {
          setOrders([...orders, result.data._id]);
          setCart([]);
          navigate('/payment');
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const changeAddress = (e) => {
setSameAddress(e.target.checked)
  };
  // * Yohannes and Sameer modify the placeOrder function

  // ===========================================================================
  // Deleting a single ordered meal by the customer
  //============================================================================

  const deleteSingleOrderedMeal = (meal) => {
    let updatedCart = cart.filter((item) => item._id !== meal._id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    /* const selectedMealId = event.target.parentElement.id;
    const cartItem = cart.filter((cartItem) => cartItem._id != selectedMealId)
    setCart(cartItem)
    const settings = {
        method: "DELETE"
      };

      console.log(selectedMealId)

      const response = await fetch(`http://localhost:3001/orders/${selectedMealId}`, settings);
      const result = await response.json();

      try{
        if(response.ok){
          setOrders(result.meals)
        } else{
          throw new Error(result.message)
        }
      }catch(err){
        alert(err.message)
      } */
  };
  console.log(cart);

  return (
    <div>
      {placedOrder ? (
        <h2>Thanks for placing order: </h2>
      ) : (
        // <h3>This is your choice of meals:</h3>
        // <h3>order address:</h3>
        // <h3>last 3 dogits of card used for order:</h3>
        // <button>click here to return to meals</button>
        <div className="ordered-meals-container">
          {(cart.length === 3) ? null : 
          <h3 style={{color:"Red"}}>
            Please Select 3 Separate Meals From Our Meal's Selection page to
            proceed to Payment page{' '}
          </h3>}
          <h3>Your choices this week: </h3>
          {cart.map((meal) => {
            return (
              <div key={meal._id} className="ordered-meals">
                <div>
                  {' '}
                  <img src={meal.img} width="100" alt="" />{' '}
                </div>
                <h4>{meal.mealName}</h4>
                <p>{meal.price}€</p>
                <div>
                  <input
                    type="text"
                    defaultValue={meal.quantity}
                    onChange={(e) => changeQuantity(e, meal)}
                  />
                </div>
                <div
                  id={meal._id}
                  onClick={() => deleteSingleOrderedMeal(meal)}
                  className="deleteOrderedMeal"
                >
                  {' '}
                  <span>X</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="total">
        {' '}
        {cart.length > 0 && <h2> Total : {total}€ </h2>}{' '}
      </div>

      <h3>{message}</h3>

      <label>
        <b>Delivery Address Is Same as Registered Address :</b>{' '}
        <input
          style={{
            width: '50px',
            height: '25px',
            cursor: 'pointer',
            border: '3px solid black',
          }}
          type={'checkbox'}
          defaultChecked
          onChange={changeAddress} /* name="check" */
        />
        <br></br>{' '}
        <p style={{ color: 'red' }}>
          PLEASE NOTE : If your delivery address is Different than your
          REGISTERED Address than please UNCHECK the Box Above and Fill New
          Delivery Address:
        </p>
        <br></br>
      </label>
      <br></br>
      {!sameAddress && (
        <form onSubmit={placeOrder}>
          <h3>New Delivery Address: </h3>
          <label>
            House No.
            <input
              defaultValue={user.info.houseNo}
              type="number"
              name="hn"
              min={1}
            />
          </label>
          <br></br>

          <label>
            Street No.
            <input defaultValue={user.info.street} type="text" name="stn" />
          </label>
          <br></br>

          <label>
            City.
            <input defaultValue={user.info.city} type="text" name="city" />
          </label>
          <br></br>

          <label>
            Zip Code.
            <input defaultValue={user.info.zipCode} type="number" name="zc" />
          </label>
          <br />
          <label>
            Phone
            <input defaultValue={user.info.phone} type="number" name="phone" />
          </label>
          <br></br>
          <button disabled={cart.length < 3}>
            Confirm Your Selections And Proceed To Payment Page
          </button>
        </form>
      )}
      {sameAddress && (
        <button onClick={placeOrder} disabled={cart.length < 3}>
          Confirm Your Selections And Proceed To Payment Page
        </button>
      )}
    </div>
  );
};

export default CartPage;
