import React, { useEffect, useState } from 'react';
import "./FoodCategory.css";
import FoodCategoryItem from '../FoodCategoryItem/FoodCategoryItem';
import FoodDetails from '../FoodDetails/FoodDetails';
import Login from '../Auth/Login';
import { Link } from 'react-router-dom';
import { getDatabaseCart, addToDatabaseCart } from '../../utilities/databaseManager';

const FoodCategory = () => {
    const [loading, setLoading] = useState(true);

    var savedCarts;
    var val = true;
    if (val) {
        savedCarts = getDatabaseCart();
        console.log(savedCarts);
        val = false;
    }

    console.log(loading);

    const [foodItems, setFoodItems] = useState([]);

    var breakfast;
    var lunch;
    var dinner;
    breakfast = foodItems.filter(data => data.type === "breakfast");
    lunch = foodItems.filter(data => data.type === "lunch");
    dinner = foodItems.filter(data => data.type === "dinner");

    const [foodData, setFoodData] = useState(lunch);
    const [foodDetail, setFoodDetail] = useState(lunch);
    useEffect(() => {
        if (foodItems.length >= 1) {
            console.log(foodItems.length);
            setFoodData(lunch);
        }
    }, [foodItems]);

    const selectedMenuData = (menu, item) => {
        let newFoodData = [];
        if (menu === "breakfast" || menu === "lunch" || menu === "dinner") {
            newFoodData = item;
            console.log(newFoodData);
            setFoodData(newFoodData);
        }
        return newFoodData;
    }

    const eventTypes = "FoodCategoryItem";
    const [eventType, setEventType] = useState(eventTypes);
    const handleFoodItemRoute = (e, eventType, key) => {
        e.preventDefault();
        setEventType(eventType);
        const FoodDetails = foodData.filter(foodData => foodData.key === key);
        setFoodDetail(FoodDetails);
        console.log(FoodDetails);
        console.log(eventType);
    }

    console.log(loading);
    console.log(foodData);
    console.log(foodItems);

    useEffect(() => {
        // fetch("http://localhost:4200/foodItems")
        const dataLoad = async () => {
            const response = await fetch("https://powerful-ridge-26100.herokuapp.com/foodItems")
            const data = await response.json();
            console.log(data);
            addToDatabaseCart(data);
            setFoodItems(data);
            setLoading(false);
        }
        dataLoad()
    }, [])

    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-interval="false" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0"><span onClick={() => selectedMenuData("breakfast", breakfast)}>Breakfast</span></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1" className="active"><span onClick={() => selectedMenuData("lunch", lunch)}>Lunch</span></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"><span onClick={() => selectedMenuData("dinner", dinner)}>Dinner</span></li>
                </ol>

                {
                    loading ? <p className="text-center display-4 text-primary pb-5" style={{ textShadow: "2px 2px 4px" }
                    } > Data Loading</p > :
                        eventType === "FoodCategoryItem" || eventType === "FoodDetails" || eventType === "addCart" ?
                            <div className="carousel-inner text-center">
                                <div className="carousel-item text-center">
                                    <li></li>
                                    <div className="card-deck">
                                        {
                                            eventType === "FoodCategoryItem" &&
                                            foodData.map(foodData => <FoodCategoryItem
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodData.key}
                                                foodData={foodData}
                                            ></FoodCategoryItem>)
                                        }
                                        {
                                            eventType === "FoodDetails" &&
                                            foodDetail.map(foodDetail => <FoodDetails
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodDetail.key}
                                                eventType={eventType}
                                                foodDetail={foodDetail}
                                            ></FoodDetails>)
                                        }
                                        {
                                            eventType === "addCart" &&
                                            foodDetail.map(foodDetail => <FoodDetails
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodDetail.key}
                                                eventType={eventType}
                                                foodDetail={foodDetail}
                                            ></FoodDetails>)
                                        }
                                    </div>

                                    {
                                        eventType === "FoodCategoryItem" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary  disabled">
                                                    Checkout Your Food
                                            </button>
                                            </div>
                                        </div>
                                    }
                                    {
                                        eventType === "FoodDetails" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary disabled ">
                                                    Checkout Your Food
                                            </button>
                                            </div>
                                        </div>
                                    }
                                    {
                                        eventType === "addCart" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Link to="/login">
                                                    <button
                                                        // onClick={(e) => handleFoodItemRoute(e, "login", "login")}
                                                        type="button"
                                                        className="btn btn-primary">
                                                        Checkout Your Food
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                </div>



                                <div className="carousel-item active text-center">
                                    <li></li>
                                    <div className="card-deck">
                                        {
                                            eventType === "FoodCategoryItem" &&
                                            foodData.map(foodData => <FoodCategoryItem
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodData.key}
                                                foodData={foodData}
                                            ></FoodCategoryItem>)
                                        }
                                        {
                                            eventType === "FoodDetails" &&
                                            foodDetail.map(foodDetail => <FoodDetails
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodDetail.key}
                                                eventType={eventType}
                                                foodDetail={foodDetail}
                                            ></FoodDetails>)
                                        }
                                        {
                                            eventType === "addCart" &&
                                            foodDetail.map(foodDetail => <FoodDetails
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodDetail.key}
                                                eventType={eventType}
                                                foodDetail={foodDetail}
                                            ></FoodDetails>)
                                        }
                                    </div>

                                    {
                                        eventType === "FoodCategoryItem" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary  disabled">
                                                    Checkout Your Food
                                            </button>
                                            </div>
                                        </div>
                                    }
                                    {
                                        eventType === "FoodDetails" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary disabled">
                                                    Checkout Your Food
                                            </button>
                                            </div>
                                        </div>
                                    }
                                    {
                                        eventType === "addCart" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Link to="/login">
                                                    <button
                                                        // onClick={(e) => handleFoodItemRoute(e, "login", "login")}
                                                        type="button"
                                                        className="btn btn-primary">
                                                        Checkout Your Food
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                </div>



                                <div className="carousel-item text-center">
                                    <li></li>
                                    <div className="card-deck">
                                        {
                                            eventType === "FoodCategoryItem" &&
                                            foodData.map(foodData => <FoodCategoryItem
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodData.key}
                                                foodData={foodData}
                                            ></FoodCategoryItem>)
                                        }
                                        {
                                            eventType === "FoodDetails" &&
                                            foodDetail.map(foodDetail => <FoodDetails
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodDetail.key}
                                                eventType={eventType}
                                                foodDetail={foodDetail}
                                            ></FoodDetails>)
                                        }
                                        {
                                            eventType === "addCart" &&
                                            foodDetail.map(foodDetail => <FoodDetails
                                                handleFoodItemRoute={handleFoodItemRoute}
                                                key={foodDetail.key}
                                                eventType={eventType}
                                                foodDetail={foodDetail}
                                            ></FoodDetails>)
                                        }
                                    </div>

                                    {
                                        eventType === "FoodCategoryItem" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary  disabled">Checkout Your Food
                                            </button>
                                            </div>
                                        </div>
                                    }
                                    {
                                        eventType === "FoodDetails" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary disabled">
                                                    Checkout Your Food
                                            </button>
                                            </div>
                                        </div>
                                    }
                                    {
                                        eventType === "addCart" &&
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Link to="/login">
                                                    <button
                                                        // onClick={(e) => handleFoodItemRoute(e, "login", "login")}
                                                        type="button"
                                                        className="btn btn-primary">
                                                        Checkout Your Food
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div> : <Login></Login>
                }
            </div>
        </div >
    );
};

export default FoodCategory;