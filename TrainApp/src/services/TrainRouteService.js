export function GetTrainRoutes() {
    return fetch('http://localhost:5134/api/routes')
        .then(response => response.json())
        .then(data => data);
}