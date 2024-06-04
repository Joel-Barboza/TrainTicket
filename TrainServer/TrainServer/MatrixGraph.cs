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

        public void dijkstra(string start)
        {
            var distances = new Dictionary<string, int>();
            var previousNodes = new Dictionary<string, string>();
            var priorityQueue = new SortedSet<(int Distance, string Node)>();

            // Initialize distances and priority queue
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
                } else
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
    }
}
