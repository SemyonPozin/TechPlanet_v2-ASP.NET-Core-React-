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
using techPlanetAPI.Configuration;

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

        builder.Services.AddDbContext<Context>((serviceProvider, options) =>
        {
            string connstr = serviceProvider.GetRequiredService<IOptions<DatabaseConfiguration>>().Value.ConnectionString;
            options.UseNpgsql(connstr);
            
        });

        builder.Services.AddScoped<IRepository<User>, UsersRepository>();
        builder.Services.AddScoped<IRepository<Product>, ProductsRepository>();
        builder.Services.AddScoped<IRepository<Order>, OrdersRepository>();

        var app = builder.Build();
        app.MapGet("/", async ([FromServices]IRepository<Product> repo) =>
        {
            
            return await repo.GetAllAsync();//.Wait();
        });

        app.Run();
    }
}