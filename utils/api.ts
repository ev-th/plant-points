const createURL = (path: String) => {
  return window.location.origin + path;
};

export const createNewMeal = async ({
  name,
  ingredientIds,
  date,
}: {
  name: string;
  ingredientIds: string[];
  date: Date;
}) => {
  const res = await fetch(
    new Request(createURL("/api/meal"), {
      method: "POST",
      body: JSON.stringify({
        name,
        ingredientIds,
        date,
      }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }

  if (res.status === 400) {
    throw new Error("Bad Request");
  }

  if (res.status === 500) {
    throw new Error("Internal Server Error");
  }
};

export const updateMeal = async ({
  id,
  name,
  ingredientIds,
  date,
}: {
  id: string;
  name: string;
  ingredientIds: string[];
  date: Date;
}) => {
  const res = await fetch(
    new Request(createURL(`/api/meal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({
        name,
        ingredientIds,
        date,
      }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }

  if (res.status === 400) {
    throw new Error("Bad Request");
  }

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (res.status === 500) {
    throw new Error("Internal Server Error");
  }
};

export const deleteMeal = async (id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/meal/${id}`), {
      method: "DELETE",
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }

  if (res.status === 400) {
    throw new Error("Bad Request");
  }

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (res.status === 500) {
    throw new Error("Internal Server Error");
  }
};
