namespace TrainServer.Entities
{
    public class DijkstraRoute
    {
        public string StartVertex { get; set; }

        public string EndVertex { get; set; }

        public int TotalWeight { get; set; }

        public string[] Route { get; set; }

        public DijkstraRoute()
        {
        }

        public DijkstraRoute(string startVertex, string endVertex, int totalWeight, string[] route)
        {
            StartVertex = startVertex;
            EndVertex = endVertex;
            TotalWeight = totalWeight;
            Route = route;

        }
    }
}
