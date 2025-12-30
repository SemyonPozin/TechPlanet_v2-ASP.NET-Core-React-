using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool Done { get; set; }
        public decimal Price { get; set; }
        public DateTime Date { get; set; }
        public string Delivery { get; set; }
        public string Address { get; set; }

        public User user {  get; set; }
        public ICollection<Product> products { get; set; }
    }
}
