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
    public class RolesConfiguration : IEntityTypeConfiguration<RoleEntity>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<RoleEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasMany(x => x.Relations)
                .WithOne(y => y.Role)
                .HasForeignKey(x => x.RoleId);
            //builder.HasMany(x => x.Users)

            var roles = Enum.GetValues<Roles>()
                .Select(p => new RoleEntity() { Id = (int)p, Name = p.ToString() });
            builder.HasData(roles);
        }
    }
}
