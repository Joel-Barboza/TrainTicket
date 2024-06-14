using System.Drawing;
using System.Xml.Linq;
using TrainServer.Entities;

namespace TrainServer
{
    public class Node
    {
        public String startPlace;
        public SinglyLinkedList endPlaces;
        public Node next;

        public Node(String start)
        {
            this.startPlace = start;
            endPlaces = new SinglyLinkedList();
            this.next = null;
        }

    }
    public class MatrixGraph
    {

        public Node head;

        public MatrixGraph()
        {
            addVertex("puntarenas"); // 0
            addVertex("alajuela"); // 1
            addVertex("sanJose"); // 2
            addVertex("cartago"); // 3
            addVertex("heredia"); // 4
            addVertex("limon"); // 5
            addVertex("guanacaste"); // 6
            addVertex("puriscal"); // 7
            addVertex("perez"); // 8

            // Adding edges based on the matrix
            addEdge(4, "puntarenas", "alajuela");
            //RoutesDB.routes.Add(new TrainRoute(4,1, "puntarenas", "alajuela"));
            addEdge(8, "puntarenas", "puriscal");

            addEdge(4, "alajuela", "puntarenas");
            addEdge(8, "alajuela", "sanJose");
            addEdge(11, "alajuela", "puriscal");

            addEdge(8, "sanJose", "alajuela");
            addEdge(7, "sanJose", "cartago");
            addEdge(4, "sanJose", "limon");
            addEdge(2, "sanJose", "perez");

            addEdge(7, "cartago", "sanJose");
            addEdge(9, "cartago", "heredia");
            addEdge(14, "cartago", "limon");

            addEdge(9, "heredia", "cartago");
            addEdge(10, "heredia", "limon");

            addEdge(4, "limon", "sanJose");
            addEdge(14, "limon", "cartago");
            addEdge(10, "limon", "heredia");
            addEdge(2, "limon", "guanacaste");

            addEdge(2, "guanacaste", "limon");
            addEdge(1, "guanacaste", "puriscal");
            addEdge(6, "guanacaste", "perez");

            addEdge(8, "puriscal", "puntarenas");
            addEdge(11, "puriscal", "alajuela");
            addEdge(1, "puriscal", "guanacaste");
            addEdge(7, "puriscal", "perez");

            addEdge(2, "perez", "sanJose");
            addEdge(6, "perez", "guanacaste");
            addEdge(7, "perez", "puriscal");
            dijkstra("puntarenas");
        }

        public void addVertex(string name)
        {
            Node newNode = new Node(name);
            if (head == null)
            {
                newNode.endPlaces.add(0, name);
                head = newNode;
            }
            else
            {
                if (!head.endPlaces.contains(name))
                {
                    Node current = head;
                    current.endPlaces.add(0, name);

                    while (current.next != null)
                    {

                        current.next.endPlaces.add(0, name);
                        current = current.next;
                    }

                    ListNode pastSaved = head.endPlaces.head;
                    while (pastSaved.next != null)
                    {
                        newNode.endPlaces.add(0, pastSaved.endPlace);
                        pastSaved = pastSaved.next;
                    }

                    newNode.endPlaces.add(0, pastSaved.endPlace);
                    current.next = newNode;

                }

            }

        }

        public List<DijkstraRoute> dijkstra(string start)
        {
            var distances = new Dictionary<string, int>();
            var previousNodes = new Dictionary<string, string>();
            var priorityQueue = new SortedSet<(int Distance, string Node)>();

            Node currentNode = head;
            while (currentNode != null)
            {
                if (currentNode.startPlace == start)
                {
                    distances[currentNode.startPlace] = 0;
                    priorityQueue.Add((0, currentNode.startPlace));
                }
                else
                {
                    distances[currentNode.startPlace] = int.MaxValue;
                    priorityQueue.Add((int.MaxValue, currentNode.startPlace));
                }
                previousNodes[currentNode.startPlace] = null;
                currentNode = currentNode.next;
            }

            while (priorityQueue.Count > 0)
            {
                var (currentDistance, currentVertex) = priorityQueue.Min;
                priorityQueue.Remove(priorityQueue.Min);

                Node vertexNode = GetNode(currentVertex);
                if (vertexNode != null)
                {
                    ListNode neighbor = vertexNode.endPlaces.head;
                    while (neighbor != null)
                    {
                        int weight = neighbor.weigth; 
                        if (weight > 0) 
                        {
                            int newDist = currentDistance + weight;
                            if (newDist < distances[neighbor.endPlace])
                            {
                                priorityQueue.Remove((distances[neighbor.endPlace], neighbor.endPlace));
                                distances[neighbor.endPlace] = newDist;
                                previousNodes[neighbor.endPlace] = currentVertex;
                                priorityQueue.Add((newDist, neighbor.endPlace));
                            }
                        }
                        neighbor = neighbor.next;
                    }
                }
            }

            List<DijkstraRoute> dijkstraRoutes = new List<DijkstraRoute>();
            
            foreach (var kvp in distances)
            {
                // simplificacion hecha por VS en lugar de:
                // List<string> route = new List<string>;
                // route.Add(kvp.Key);
                List<string> route = [kvp.Key];
                string path = kvp.Key;
                string prev = kvp.Key;
                while (previousNodes[prev] != null)
                {
                    Console.WriteLine($"sisisi {previousNodes[prev]}");
                    route.Insert(0, previousNodes[prev]);
                    path = previousNodes[prev] + " -> " + path;
                    prev = previousNodes[prev];
                }
                dijkstraRoutes.Add(new DijkstraRoute(start, kvp.Key, kvp.Value, route.ToArray()));
                Console.WriteLine($"Distance from {start} to {kvp.Key} is {kvp.Value} via {path}");
            }
            return dijkstraRoutes;
        }

        private Node GetNode(string start)
        {
            Node current = head;
            while (current != null)
            {
                if (current.startPlace == start)
                {
                    return current;
                }
                current = current.next;
            }
            return null;
        }


        public void addEdge(int weight, string start, string end)
        {
            Node current = head;
            while (current != null)
            {
                if (current.startPlace == start)
                {
                    ListNode currentEnd = current.endPlaces.head;
                    while (currentEnd != null)
                    {
                        if (currentEnd.endPlace == end)
                        {
                            currentEnd.weigth = weight;
                            RoutesDB.routes.Add(new TrainRoute(weight*25, weight, start, end));
                            return;
                        }
                        currentEnd = currentEnd.next;
                    }
                }
                current = current.next;
            }
        }

        public void addRoute(TrainRoute route)
        {
            RoutesDB.matrixGraph.addVertex(route.Start);
            RoutesDB.matrixGraph.addVertex(route.End);
            RoutesDB.matrixGraph.addEdge(route.DistanceInKm, route.Start, route.End);
            //RoutesDB.routes.Add(route);
            //RoutesDB.matrixGraph.printGraphMatrix();
        }



        public void printGraphMatrix()
        {
            Node currentRow = head;
            while (currentRow != null)
            {
                Console.WriteLine("------" + currentRow.startPlace);
                currentRow.endPlaces.printList();
                Console.WriteLine("--------------------------------------------");
                currentRow = currentRow.next;
            }
        }

        public bool deleteRoute(string start, string end)
        {
            Node current = head;
            while (current != null)
            {
                if (current.startPlace == start)
                {
                    ListNode currentEnd = current.endPlaces.head;
                    while (currentEnd != null)
                    {
                        if (currentEnd.endPlace == end)
                        {
                            currentEnd.weigth = 0;
                            deleteNoConnectedVertex(end);
                            return true;
                        }
                        currentEnd = currentEnd.next;
                    }
                }
                current = current.next;
            }
            return false;
        }

        public void deleteNoConnectedVertex(string vertexName)
        {
            bool rowHasElements = false;
            bool columnHasElements = false;

            if (!contains(vertexName))
            {
                return;
            }

            Node current = head;
            while (current != null)
            {
                ListNode currentEnd = current.endPlaces.head;
                if (current.startPlace == vertexName)
                {
                    while (currentEnd != null)
                    {
                        if (currentEnd.endPlace == vertexName && currentEnd.weigth != 0)
                        {
                            rowHasElements = true;
                            break;
                        }
                        currentEnd = currentEnd.next;
                    }
                }
                else
                {
                    while (currentEnd != null)
                    {
                        if (currentEnd.endPlace == vertexName && currentEnd.weigth != 0)
                        {
                            rowHasElements = true;
                            break;
                        }
                        currentEnd = currentEnd.next;
                    }
                }
                current = current.next;
            }

            if (!rowHasElements && !columnHasElements)
            {
                deleteRow(vertexName);
                current = head;
                while (current != null)
                {
                    current.endPlaces.remove(vertexName);
                    current = current.next;
                }

            }
        }



        private bool deleteRow(string rowPlace)
        {
            if (head.startPlace == rowPlace)
            {
                head = head.next;
                return true;
            }
            Node current = head;
            while (current.next != null)
            {
                if (current.next.startPlace == rowPlace)
                {
                    current.next = current.next.next;
                    return true;
                }
                current = current.next;
            }
            return false;
        }

        public bool contains(string startElem)
        {
            Node current = this.head;
            while (current != null)
            {
                if (current.startPlace == startElem)
                {
                    return true;
                }
                current = current.next;
            }
            return false;
        }

        public string[] getPlacesList()
        {
            string[] placesList = [];
            if (head != null)
            {
                placesList = this.head.endPlaces.toArray();
            }
            return placesList;
        }
        public void matrixToRoutesDB()
        {
            Node current = this.head;
            while (current != null)
            {
                ListNode currentEndPlace = current.endPlaces.head;
                while (currentEndPlace != null)
                {
                    if (currentEndPlace.weigth != 0)
                    {
                        RoutesDB.routes.Add(new TrainRoute(currentEndPlace.weigth * 25, currentEndPlace.weigth, current.startPlace, currentEndPlace.endPlace));

                    }
                    currentEndPlace = currentEndPlace.next;

                }
                current = current.next;
            }

        }
    }
}
