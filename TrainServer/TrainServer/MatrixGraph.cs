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
                //ListNode currentColumn = currentRow.endPlaces.head;
                //while (currentColumn != null)
                //{
                //    currentColumn = currentColumn.next;
                //}
                Console.WriteLine("------" + currentRow.start);
                currentRow.endPlaces.printList();
                Console.WriteLine("--------------------------------------------");
                currentRow = currentRow.next;
            }
        }



       
        
        //private void addColumn(String end)
        //{
        //    if (head != null)
        //    {
        //        Node currentRow = this.head;
        //        while (currentRow != null)
        //        {
        //            currentRow.endPlaces.add(int.MaxValue, currentRow.start, end);
        //            currentRow = currentRow.next;
        //        }
        //        Node newRow = new Node(end);
                


        //    }

        //}
        

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
