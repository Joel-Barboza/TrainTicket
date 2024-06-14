export async function GetGoogleMaps() {
    const address = "1600 Amphitheatre Parkway, Mountain View, CA";
    const response = await fetch(`http://localhost:5134/api/googlemaps/geocode/json?address=${encodeURIComponent(address)}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}
