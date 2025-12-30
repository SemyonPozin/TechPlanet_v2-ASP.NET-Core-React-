using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.Entities;

namespace DataAccessLevel.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(70);
            builder.Property(x => x.Brand).IsRequired();
            builder.Property(x => x.Price).IsRequired();
            builder.Property(x => x.Img).IsRequired();
            builder.Property(x => x.IsNew).IsRequired();
            builder.Property(x => x.Discount).IsRequired();
            builder.Property(x => x.CountToBuy).IsRequired();
            builder.Property(x => x.Description).IsRequired();
            builder.Property(x => x.Category).IsRequired();

            builder.HasMany(x => x.Charactertics)
                .WithOne(y => y.product)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
