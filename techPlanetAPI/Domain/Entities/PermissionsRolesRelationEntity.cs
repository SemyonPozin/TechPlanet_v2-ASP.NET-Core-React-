using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PermissionsRolesRelationEntity
    {
        public int RoleId { get; set; }
        public int PermissionId {  get; set; }

        public RoleEntity Role {  get; set; }
        public PermissionEntity Permission {  get; set; }
    }
}
