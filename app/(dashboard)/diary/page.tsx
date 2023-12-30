import PointsCard from "@/components/PointsCard";
import DayOfMealsCard from "@/components/DayOfMealsCard";
import { getMealsByDate } from "@/utils/dbQueries";
import { getDateFromSixDaysAgo } from "@/utils/getDateFromSixDaysAgo";
import { sortMealsByDay } from "@/utils/sortMealsByDay";

const DiaryPage = async () => {
  const meals = await getMealsByDate(
    getDateFromSixDaysAgo(new Date()),
    new Date(),
  );
  const sortedMeals = sortMealsByDay(meals);

  return (
    <div>
      <h2 className="text-4xl m-8 font-bold text-center">Food Diary</h2>
      <div className="m-4 md:my-6 lg:my-8 max-w-7xl xl:mx-auto">
        <PointsCard meals={meals} />
      </div>
      {sortedMeals.map((dayOfMeals) => (
        <div key={dayOfMeals[0].eatenAt.toDateString()}>
          <div className="h-0.5 bg-slate-200"></div>
          <div className="m-4 md:my-6 lg: my-8">
            <DayOfMealsCard meals={dayOfMeals} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiaryPage;
