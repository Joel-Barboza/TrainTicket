namespace TrainServer
{
    public class SinglyLinkedList<T>
    {
        public Node<T> head;

        public class Node<T>
        {
            public T data;
            public Node<T> next;

            public Node(T data)
            {
                this.data = data;
                this.next = null;
            }
        }

        public void add(T data)
        {
            Node<T> newNode = new Node<T>(data);
            if (head == null)
            {
                head = newNode;
            }
            else
            {
                Node<T> current = head;
                while (current.next != null)
                {
                    current = current.next;
                }
                current.next = newNode;
            }
        }

        public void remove(T data) { }
        public Node<T> pront()
        {
            return head;
        }

        // Other methods for LinkedList implementation...
    }
}
