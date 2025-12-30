using DataAccessLevel;
using DataAccessLevel.Repositories;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Xml.Linq;
using techPlanetAPI.Configuration;
using techPlanetAPI.Endpoints;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Configuration.AddJsonFile("Database.config.json", optional: false);
        builder.Services.Configure<DatabaseConfiguration>(builder.Configuration.GetSection("DatatbaseConfiguration"));
        //builder.Services.AddScoped<IRepository<Product>, ProductsRepository>((IServiceProvider p) =>
        //{
        //    string connstr = p.GetRequiredService<IOptions<DatabaseConfiguration>>().Value.ConnectionString;
        //    return new ProductsRepository(new Context(new Microsoft.EntityFrameworkCore.DbContextOptions<Context>(), connstr));
        //});

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReact", (policy) =>
            {
                policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
        });
            
        builder.Services.AddDbContext<Context>((serviceProvider, options) =>
        {
            string connstr = serviceProvider.GetRequiredService<IOptions<DatabaseConfiguration>>().Value.ConnectionString;
            options.UseNpgsql(connstr);
            
        });

        builder.Services.AddScoped<IRepository<User>, UsersRepository>();
        builder.Services.AddScoped<IRepository<Product>, ProductsRepository>();
        builder.Services.AddScoped<IRepository<Order>, OrdersRepository>();

        var app = builder.Build();

        app.UseCors("AllowReact");

        OrderEndpoints.MapOrderEndpoints(app);
        UserEndpoints.MapUserEndpoints(app);
        ProductEndpoints.MapProductEndpoints(app);

        app.MapGet("/", async ([FromServices]IRepository<Product> repo) =>
        {
            var products = await repo.GetAllAsync();
            if (products.Count == 0)
            {
                await repo.AddAsync(new Product()
                {
                    Name = "Apple iPhone 15 Pro 128GB",
                    Brand = "Apple",
                    Price = 4599,
                    Img = "https://alloplus.by/upload/iblock/05b/f08cdopkaoi5smbsxdl80wpqqb1vuywr.jpg",
                    IsNew = true,
                    Discount = 0,
                    CountToBuy = 1,
                    Category = "phones",
                    Description = "ewew",
                    Charactertics = new List<ProductCharacteristics>(){ new ProductCharacteristics() { Description = "dv", Name = "ds" } }
                });
            }
        });

        app.Run();
    }
}