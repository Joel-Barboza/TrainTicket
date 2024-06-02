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
            MatrixGraph graph = new MatrixGraph();
            graph.addVertex("puntarenas");
            graph.addVertex("alajuela");
            graph.addVertex("sanJose");
            graph.addVertex("sanJose");
            graph.addEdge(5, "sanJose", "alajuela");
            graph.addVertex("heredia");
            graph.printGraphMatrix();
            //DoubleEndedLinkedList dd = new DoubleEndedLinkedList();
            //dd.add(0, "1");
            //dd.add(0, "2");
            //dd.add(0, "3");
            //dd.add(0, "4");
            //dd.add(0, "5");
            //dd.printList();
            return RoutesDB.routes;
        }

        [HttpPost]
        public IActionResult CreateRoute([FromBody] TrainRoute route)
        {

            RoutesDB.routes.Add(route);
            //RoutesDB.matrixGraph.addRoute(route);
            //RoutesDB.matrixGraph.addRoute(route);
            return CreatedAtAction("CreateRoute", null);
        }
    }
}
