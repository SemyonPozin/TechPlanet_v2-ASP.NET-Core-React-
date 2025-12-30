using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Name { get; set; }
        [RegularExpression("/^(([^<>()[\\].,;:\\s@\"]+(\\.[^<>()[\\].,;:\\s@\"]+)*)|(\".+\"))@(([^<>()[\\].,;:\\s@\"]+\\.)+[^<>()[\\].,;:\\s@\"]{2,})$/iu")]
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        [RegularExpression("/^(\\+375)?(29|25|44|33|17)\\d{7}$/")]
        public string Phone { get; set; }

        public List<Order> Orders { get; set; }
        public RoleEntity Role { get; set; }
    }
}
