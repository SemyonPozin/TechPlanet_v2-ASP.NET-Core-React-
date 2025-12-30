using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLevel.Configurations
{
    public class ProductCharacteristicsConfiguration : IEntityTypeConfiguration<ProductCharacteristics>
    {
        public void Configure(EntityTypeBuilder<ProductCharacteristics> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.product)
                .WithMany(y => y.Charactertics)
                .HasForeignKey(x => x.Id);
        }
    }
}
