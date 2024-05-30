using Microsoft.AspNetCore.Mvc;
using TrainServer.Entities;

namespace TrainServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<TrainRoute>? GetAllRoutes()
        {
            SinglyLinkedList<int> lists = new SinglyLinkedList<int>();
            lists.add(3);
            Console.WriteLine(lists.pront().data);
            return RoutesDB.routes;
        }

        [HttpPost]
        public IActionResult CreateRoute([FromBody] TrainRoute route)
        {

            RoutesDB.routes.Add(route);
            return CreatedAtAction("CreateRoute", null);
        }
    }
}
