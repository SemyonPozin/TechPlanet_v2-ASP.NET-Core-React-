using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLevel.Configurations
{
    public class PermissionsRolesRelationEntityConfiguration : IEntityTypeConfiguration<PermissionsRolesRelationEntity>
    {
        public void Configure(EntityTypeBuilder<PermissionsRolesRelationEntity> builder)
        {
            builder.HasKey(x => new { x.RoleId, x.PermissionId });

            builder.HasOne(x => x.Role)
                .WithMany()
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Permission)
                .WithMany()
                .HasForeignKey(x => x.PermissionId)
                .OnDelete(DeleteBehavior.Cascade);

            var list = new List<PermissionsRolesRelationEntity>();
            list.Add(new PermissionsRolesRelationEntity() { PermissionId = 1, RoleId = 1 });
            list.Add(new PermissionsRolesRelationEntity() { PermissionId = 2, RoleId = 1 });
            list.Add(new PermissionsRolesRelationEntity() { PermissionId = 1, RoleId = 2 });
            list.Add(new PermissionsRolesRelationEntity() { PermissionId = 2, RoleId = 2 });
            list.Add(new PermissionsRolesRelationEntity() { PermissionId = 3, RoleId = 2 });
            builder.HasData(list);

        }
    }
}
