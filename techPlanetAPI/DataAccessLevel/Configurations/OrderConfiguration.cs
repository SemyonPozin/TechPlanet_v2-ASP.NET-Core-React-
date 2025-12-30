using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLevel.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Price).IsRequired();
            builder.Property(x => x.Done).IsRequired();
            builder.Property(x => x.Date).IsRequired();
            builder.Property(x => x.Delivery).IsRequired();
            builder.Property(x => x.Address).IsRequired();

            builder.HasMany(x => x.products)
                .WithMany(y => y.Orders);
        }
    }
}
