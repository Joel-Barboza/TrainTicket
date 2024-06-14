namespace TrainServer.Entities
{
    public class Ticket
    {
        public string Username { get; set; }

        public string[] Route { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }

        public Ticket()
        {
        }

        public Ticket(string user, string start, string end, string startDate, string endDate)
        {
            Username = user;
            Route = [start, end];
            FromDate = startDate;
            ToDate = endDate;
        }
    }
}
