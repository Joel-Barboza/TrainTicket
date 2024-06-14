using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TrainServer.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TrainServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<TrainRoute>? GetAllRoutes()
        {
            return RoutesDB.routes;
        }

        [HttpPost]
        public IActionResult CreateRoute([FromBody] TrainRoute route)
        {

            RoutesDB.routes.Add(route);
            return CreatedAtAction("CreateRoute", null);
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AdminloginController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AdminloginController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        public IActionResult AuthAdmin([FromQuery] string user, [FromQuery] string pswrd)
        {
            // obtenidos de appsettings.json
            string AdminUser = _config.GetValue<string>("AdminUser");
            string AdminPswrd = _config.GetValue<string>("AdminPswrd");
            Console.WriteLine(AdminUser + " " + AdminPswrd);
            Console.WriteLine(user + " " + pswrd);
            if (AdminPswrd == pswrd && user == AdminUser)
            {
                Console.WriteLine("si");
                return Ok(true);
            }
            return Ok(false);
        }
    }

    [Route("api/login/[controller]")]
    [ApiController]
    public class NewController : ControllerBase
    {
        public class UserData
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
        private readonly IConfiguration _config;

        public NewController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public string[] AuthUser([FromQuery] string user, [FromQuery] string pswrd)
        {
            List<UserData> _data;
            string fileName = @"C:\Users\Usuario\Desktop\Universidad\2024_S1\Datos 1\TrainTicket\TrainServer\TrainServer\DataFiles\Users.json";
            string AdminUser = _config.GetValue<string>("AdminUser");
            try
            {
                if (System.IO.File.Exists(fileName))
                {
                    string existingJson = System.IO.File.ReadAllText(fileName);

                    if (string.IsNullOrWhiteSpace(existingJson))
                    {
                        _data = new List<UserData>();
                    }
                    else
                    {
                        _data = JsonSerializer.Deserialize<List<UserData>>(existingJson) ?? new List<UserData>();
                        bool alreadyExists = false;
                        _data.ForEach(userData =>
                        {

                            if (userData.Username == user || AdminUser == user)
                            {
                                alreadyExists = true;
                            };
                        });
                        if (alreadyExists)
                        {
                            return ["exists"];
                        }
                        else
                        {
                            return ["created"];
                        }

                    }
                }
                else
                {
                    _data = new List<UserData>();
                }

                _data.Add(new UserData { Username = user, Password = pswrd });

                string json = JsonSerializer.Serialize(_data, new JsonSerializerOptions { WriteIndented = true });
                System.IO.File.WriteAllText(fileName, json);

                Console.WriteLine(System.IO.File.ReadAllText(fileName));
                return ["created"];
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine($"JSON Exception: {jsonEx.Message}");
                BadRequest(jsonEx);
                return [];
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                BadRequest(ex);
                return [];
            }
        }
    }

    [Route("api/login/[controller]")]
    [ApiController]
    public class ExistingController : ControllerBase
    {
        public class UserData
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
        private readonly IConfiguration _config;

        public ExistingController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public string[] AuthUser([FromQuery] string user, [FromQuery] string pswrd)
        {
            List<UserData> _data;
            string fileName = @"C:\Users\Usuario\Desktop\Universidad\2024_S1\Datos 1\TrainTicket\TrainServer\TrainServer\DataFiles\Users.json";
            string AdminUser = _config.GetValue<string>("AdminUser");
            string AdminPswrd = _config.GetValue<string>("AdminPswrd");
            try
            {
                if (System.IO.File.Exists(fileName))
                {
                    string existingJson = System.IO.File.ReadAllText(fileName);

                    if (!string.IsNullOrWhiteSpace(existingJson))
                    {
                        _data = JsonSerializer.Deserialize<List<UserData>>(existingJson) ?? new List<UserData>();
                        bool succesfullyLogged = false;
                        bool isAdmin = false;
                        bool userInList = false;
                        _data.ForEach(userData =>
                        {

                            if (AdminUser == user && AdminPswrd == pswrd)
                            {
                                userInList = true;
                                succesfullyLogged = true;
                                isAdmin = true;
                            }
                            else if (userData.Username == user && userData.Password == pswrd)
                            {
                                userInList = true;
                                succesfullyLogged = true;
                            }
                            else if (userData.Username == user || AdminUser == user)
                            {
                                userInList = true;
                            };
                        });
                        if (succesfullyLogged && isAdmin)
                        {
                            return ["admin"];

                        }
                        else if (succesfullyLogged)
                        {
                            return ["success"];
                        }
                        else if (userInList)
                        {
                            return ["incorrect"];
                        }
                        return ["non-existent"];
                    }

                    else
                    {
                        return ["no-users"];
                    }
                }
                else
                {
                    return ["no-file"];
                }
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine($"JSON Exception: {jsonEx.Message}");
                BadRequest(jsonEx);
                return [];
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                BadRequest(ex);
                return [];
            }
        }
    }

    [Route("api/admin/[controller]")]
    [ApiController]
    public class PlaceController : ControllerBase
    {
        [HttpGet]
        public string[] GetAllPlaces()
        {

            //RoutesDB.routes.Add(route);

            //RoutesDB.matrixGraph.addRoute(route);
            Console.WriteLine(RoutesDB.matrixGraph.getPlacesList());
            return RoutesDB.matrixGraph.getPlacesList();/*CreatedAtAction("GetPlacesList", null);*/
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class CostController : ControllerBase
    {
        [HttpGet]
        public IActionResult ApplyDijkstra([FromQuery] string start, [FromQuery] string end)
        {
            Console.WriteLine($"Start: {start}, End: {end}");

            if (string.IsNullOrEmpty(start) || string.IsNullOrEmpty(end))
            {
                return BadRequest("Start and End parameters are required.");
            }

            var placesList = RoutesDB.matrixGraph.getPlacesList();
            if (!placesList.Contains(start) || !placesList.Contains(end))
            {
                return NotFound("One or both of the places are not found in the graph.");
            }

            List<DijkstraRoute> dijkstraRoutes = RoutesDB.matrixGraph.dijkstra(start);

            var filteredRoutes = dijkstraRoutes.Where(route => route.EndVertex == end).ToList();

            return Ok(dijkstraRoutes);
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class BuyController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateTicket([FromBody] Ticket ticket)
        {
            string fileName = @"C:\Users\Usuario\Desktop\Universidad\2024_S1\Datos 1\TrainTicket\TrainServer\TrainServer\DataFiles\SoldTickets.json";
            List<Ticket> tickets;

            try
            {
                if (System.IO.File.Exists(fileName))
                {
                    string existingJson = System.IO.File.ReadAllText(fileName);

                    if (string.IsNullOrWhiteSpace(existingJson))
                    {
                        tickets = new List<Ticket>();
                    }
                    else
                    {
                        tickets = JsonSerializer.Deserialize<List<Ticket>>(existingJson) ?? new List<Ticket>();
                    }
                }
                else
                {
                    tickets = new List<Ticket>();
                }

                tickets.Add(ticket);

                string json = JsonSerializer.Serialize(tickets, new JsonSerializerOptions { WriteIndented = true });
                System.IO.File.WriteAllText(fileName, json);

                return Ok(true);
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine($"JSON Exception: {jsonEx.Message}");
                return Ok(false);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return Ok(false);
            }
        }
    }

    [Route("api/admin/[controller]")]
    [ApiController]
    public class DeleteController : ControllerBase
    {
        [HttpGet]
        public IActionResult Delete([FromQuery] string start, [FromQuery] string end)
        {
            RoutesDB.matrixGraph.deleteRoute(start, end);
            var routeToRemove = RoutesDB.routes.FirstOrDefault(route => route.Start == start && route.End == end);
            if (routeToRemove != null)
            {
                RoutesDB.routes.Remove(routeToRemove);
            }

            return Ok(true);
        }
    }
}
    




