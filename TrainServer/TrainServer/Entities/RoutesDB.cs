namespace TrainServer.Entities
{
    public class RoutesDB
    {
        public static MatrixGraph matrixGraph = new MatrixGraph();
        public static List<TrainRoute> routes = new() {
            new TrainRoute(1,1,"Cartago", "San Jose"),
            new TrainRoute(1, 1, "San Jose", "Heredia")
        };
        
    }
}
