using System.Drawing;
using System.Xml.Linq;
using TrainServer.Entities;

namespace TrainServer
{
    public class Node
    {
        public String start;
        public DoubleEndedLinkedList endPlaces;
        public Node next;

        public Node(String start)
        {
            this.start = start;
            endPlaces = new DoubleEndedLinkedList();
            this.next = null;
        }

    }
    public class MatrixGraph
    {

        private Node head;


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
                        newNode.endPlaces.add(0, pastSaved.place);
                        pastSaved = pastSaved.next;
                    }

                    newNode.endPlaces.add(0, pastSaved.place);
                    current.next = newNode;

                }

            }

        }

        public void dijkstra(string start)
        {
            var distances = new Dictionary<string, int>();
            var previousNodes = new Dictionary<string, string>();
            var priorityQueue = new SortedSet<(int Distance, string Node)>();

            // Initialize distances and priority queue
            Node currentNode = head;
            while (currentNode != null)
            {
                if (currentNode.start == start)
                {
                    distances[currentNode.start] = 0;
                    priorityQueue.Add((0, currentNode.start));
                }
                else
                {
                    distances[currentNode.start] = int.MaxValue;
                    priorityQueue.Add((int.MaxValue, currentNode.start));
                }
                previousNodes[currentNode.start] = null;
                currentNode = currentNode.next;
            }

            // Process the nodes in the priority queue
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
                        int weight = neighbor.weigth; // Use the weight of the edge
                        if (weight > 0) // Ensure that there is an edge
                        {
                            int newDist = currentDistance + weight;
                            if (newDist < distances[neighbor.place])
                            {
                                priorityQueue.Remove((distances[neighbor.place], neighbor.place));
                                distances[neighbor.place] = newDist;
                                previousNodes[neighbor.place] = currentVertex;
                                priorityQueue.Add((newDist, neighbor.place));
                            }
                        }
                        neighbor = neighbor.next;
                    }
                }
            }

            // Print the results
            foreach (var kvp in distances)
            {
                string path = kvp.Key;
                string prev = kvp.Key;
                while (previousNodes[prev] != null)
                {
                    path = previousNodes[prev] + " -> " + path;
                    prev = previousNodes[prev];
                }
                Console.WriteLine($"Distance from {start} to {kvp.Key} is {kvp.Value} via {path}");
            }
        }
        private Node GetNode(string start)
        {
            Node current = head;
            while (current != null)
            {
                if (current.start == start)
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
                if (current.start == start)
                {
                    ListNode currentEnd = current.endPlaces.head;
                    while (currentEnd != null)
                    {
                        if (currentEnd.place == end)
                        {
                            currentEnd.weigth = weight;
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
            RoutesDB.matrixGraph.addEdge(route.Cost, route.Start, route.End);
            RoutesDB.matrixGraph.printGraphMatrix();
        }

         

        public void printGraphMatrix ()
        {
            Node currentRow = head;
            while (currentRow != null)
            { 
                Console.WriteLine("------" + currentRow.start);
                currentRow.endPlaces.printList();
                Console.WriteLine("--------------------------------------------");
                currentRow = currentRow.next;
            }
        }

        public bool contains(String startElem)
        {
            Node current = this.head;
            while (current != null)
            {
                if (current.start == startElem)
                {
                    return true;
                }
                current = current.next;
            }
            return false;
        }
    }
}
