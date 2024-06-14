export async function BuyTicketsService(user, start, end, startDate, endDate) {
  try {
    const response = await fetch("http://localhost:5134/api/buy", {
      method: "POST",
      body: JSON.stringify({
        Username: user,
        Route: [start, end],
        FromDate: startDate,
        ToDate: endDate
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
