using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Domain.Entities;
using DataAccessLevel.Configurations;
using System.Reflection;
using System.Data;

namespace DataAccessLevel
{
    public class Context : DbContext
    {
        //private readonly string _connectionString;
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<PermissionEntity> Permissions { get; set; }
        public DbSet<RoleEntity> Roles { get; set; }
        public DbSet<ProductCharacteristics> ProductCharacteristics { get; set; }
        public Context(DbContextOptions<Context> options) : base(options) { }
        //public Context(DbContextOptions<Context> options, string connstr) : base(options)
        //{
        //    _connectionString = connstr;   
        //}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=admin;Password=1111");
        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new UserConfiguration());
            //modelBuilder.ApplyConfiguration(new ProductConfiguration());
            //modelBuilder.ApplyConfiguration(new OrderConfiguration());
            //modelBuilder.ApplyConfiguration(new PermissionConfiguration());
            //modelBuilder.ApplyConfiguration(new ProductCharacteristicsConfiguration());
            //modelBuilder.ApplyConfiguration(new RolesConfiguration());

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
