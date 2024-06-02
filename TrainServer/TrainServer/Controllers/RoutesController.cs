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
            graph.addVertex("puntarenas"); // 0
            graph.addVertex("alajuela"); // 1
            graph.addVertex("sanJose"); // 2
            graph.addVertex("cartago"); // 3
            graph.addVertex("heredia"); // 4
            graph.addVertex("limon"); // 5
            graph.addVertex("guanacaste"); // 6
            graph.addVertex("puriscal"); // 7
            graph.addVertex("perez"); // 8

            // Adding edges based on the matrix
            graph.addEdge(4, "puntarenas", "alajuela");
            graph.addEdge(8, "puntarenas", "puriscal");

            graph.addEdge(4, "alajuela", "puntarenas");
            graph.addEdge(8, "alajuela", "sanJose");
            graph.addEdge(11, "alajuela", "puriscal");

            graph.addEdge(8, "sanJose", "alajuela");
            graph.addEdge(7, "sanJose", "cartago");
            graph.addEdge(4, "sanJose", "limon");
            graph.addEdge(2, "sanJose", "perez");

            graph.addEdge(7, "cartago", "sanJose");
            graph.addEdge(9, "cartago", "heredia");
            graph.addEdge(14, "cartago", "limon");

            graph.addEdge(9, "heredia", "cartago");
            graph.addEdge(10, "heredia", "limon");

            graph.addEdge(4, "limon", "sanJose");
            graph.addEdge(14, "limon", "cartago");
            graph.addEdge(10, "limon", "heredia");
            graph.addEdge(2, "limon", "guanacaste");

            graph.addEdge(2, "guanacaste", "limon");
            graph.addEdge(1, "guanacaste", "puriscal");
            graph.addEdge(6, "guanacaste", "perez");

            graph.addEdge(8, "puriscal", "puntarenas");
            graph.addEdge(11, "puriscal", "alajuela");
            graph.addEdge(1, "puriscal", "guanacaste");
            graph.addEdge(7, "puriscal", "perez");

            graph.addEdge(2, "perez", "sanJose");
            graph.addEdge(6, "perez", "guanacaste");
            graph.addEdge(7, "perez", "puriscal");
            graph.dijkstra("puntarenas");
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
