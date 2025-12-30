using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLevel.Configurations
{
    public class PermissionConfiguration : IEntityTypeConfiguration<PermissionEntity>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<PermissionEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasMany(x => x.Relations)
                .WithOne(y => y.Permission)
                .HasForeignKey(x => x.PermissionId);

            var permissions = Enum.GetValues<Permissions>()
                .Select(p => new PermissionEntity() { Id = (int)p, Name = p.ToString()});
            builder.HasData(permissions);
        }
    }
}
