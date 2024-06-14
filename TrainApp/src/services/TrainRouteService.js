export async function GetTrainRoutes() {
  try {
    const response = await fetch("http://localhost:5134/api/routes");
    if (!response.ok) {
      throw new Error("Failed to fetch routes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting routes:", error);
    throw error;
  }
}

export async function AddTrainRoutes(start, end, cost, distanceInKm) {
  try {
    const response = await fetch("http://localhost:5134/api/routes", {
      method: "POST",
      body: JSON.stringify({
        Cost: distanceInKm*25,
        DistanceInKm: distanceInKm,
        Start: start,
        End: end,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch routes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting routes:", error);
    throw error;
  }
}

export async function GetPlacesList() {
  try {
    const response = await fetch("http://localhost:5134/api/admin/place");
    if (!response.ok) {
      throw new Error("Failed to fetch routes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting places:", error);
    throw error;
  }
}

export async function GetRouteCost(startStation, endStation) {
  try {
    const response = await fetch(`http://localhost:5134/api/cost?start=${encodeURIComponent(startStation)}&end=${encodeURIComponent(endStation)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch route cost");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting route cost:", error);
    throw error;
  }
}
export async function Delete(startStation, endStation) {
  try {
    const response = await fetch(`http://localhost:5134/api/admin/delete?start=${encodeURIComponent(startStation)}&end=${encodeURIComponent(endStation)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch route cost");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting route cost:", error);
    throw error;
  }
}