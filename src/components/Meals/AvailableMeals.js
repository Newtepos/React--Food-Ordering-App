import { useEffect, Fragment } from "react";
import useRequest from "../../hooks/useRequest";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const initialSetup = {
  method: "get",
  url: "https://react-http-efc44-default-rtdb.asia-southeast1.firebasedatabase.app/meals.jsonv",
};

const AvailableMeals = () => {
  const {
    sendRequest,
    responseData: meals,
    isLoading: mealsLoading,
    setIsLoading,
  } = useRequest();

  useEffect(() => {
      sendRequest(initialSetup);
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {mealsLoading ? (
          <p className={classes.loading}>Loading</p>
        ) : (
          <Fragment>
            <ul>{mealsList}</ul>
          </Fragment>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
