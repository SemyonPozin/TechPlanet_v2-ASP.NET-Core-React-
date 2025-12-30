using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class RoleEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public List<PermissionEntity> Permissions { get; set; } = [];
        public ICollection<PermissionsRolesRelationEntity> Relations {  get; set; }

    }
}
