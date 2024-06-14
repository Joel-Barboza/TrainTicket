using System.Drawing;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TrainServer
{
    public class ListNode
    {
        public int weigth;
        public string endPlace;
        public ListNode next;

        public ListNode(int weigth, string place)
        {
            this.weigth = weigth;
            this.endPlace = place;
            this.next = null;
        }
    }
    public class SinglyLinkedList
    {
        public ListNode head;
        public int size = 0;

        public void add(int weigth, string place)
        {
            ListNode newNode = new ListNode(weigth, place);
            if (head == null)
            {
                head = newNode;
                size++;
            }
            else
            {
                ListNode current = head;
                while (current.next != null)
                {
                    current = current.next;
                }
                current.next = newNode;
                size++;
            }
        }

        public bool contains(string startElem)
        {
            ListNode current = this.head;
            while (current != null)
            {
                if (current.endPlace == startElem)
                {
                    return true;
                }
                current = current.next;
            }
            return false;
        }

        public bool remove(string toDelete)
        {
            if (head.endPlace == toDelete)
            {
                head = head.next;
                size--;
                return true;
            }
            ListNode current = head;
            while (current.next != null)
            {
                if (current.next.endPlace == toDelete)
                {
                    current.next = current.next.next;
                    size--;
                    return true;
                }
                current = current.next;
            }
            return false;
        }

        public void printList()
        {
            ListNode current = head;
            while (current != null)
            {

                Console.WriteLine(current.endPlace + " " + current.weigth);
                current = current.next;
            }
        }

        public string[] toArray()
        {
            List<string> list = new List<string>();

            ListNode current = head;
            while (current != null)
            {

                list.Add(current.endPlace);
                current = current.next;
            }
            string[] array = list.ToArray();
            Console.WriteLine(array);
            return array;
        }

        //public void remove(T data) { }

        // Other methods for LinkedList implementation...
    }
}
