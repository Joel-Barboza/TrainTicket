using TrainServer;
namespace TrainServer.Entities
{
    public class TrainRoute
    {
        public int Cost { get; set; }

        public int DistanceInKm { get; set; }

        public string Start { get; set; }

        public string End { get; set; }

        public TrainRoute(int cost, int distance, string start, string end)
        {
            Cost = cost;
            DistanceInKm = distance;
            Start = start;
            End = end;
        }
    }
}
