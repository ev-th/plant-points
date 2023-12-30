import { getFavoriteMeals } from "@/utils/dbQueries";
import MealCard from "@/components/MealCard";

const FavoritesPage = async () => {
  const meals = await getFavoriteMeals();
  return (
    <div className="m-4 md:my-6 lg:my-8 max-w-7xl xl:mx-auto">
      <h2 className="text-4xl m-8 font-bold text-center">Favorite Meals</h2>
      <ul role="list" className="flex flex-wrap flex-row">
        {meals.map((meal) => (
          <li key={meal.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 p-1">
            <MealCard meal={meal} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
