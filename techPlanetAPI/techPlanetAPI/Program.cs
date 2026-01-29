using DataAccessLevel;
using DataAccessLevel.Repositories;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Xml.Linq;
using techPlanetAPI.Configuration;
using techPlanetAPI.Endpoints;
using techPlanetAPI.Services;
using techPlanetAPI.Services.Authorization;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Configuration.AddJsonFile("Database.config.json", optional: false);
        builder.Services.Configure<DatabaseConfiguration>(builder.Configuration.GetSection("DatatbaseConfiguration"));
        builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));

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
        builder.Services.AddScoped<IJWTProvider, JWTProvider>();
        builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IAuthorizationHandler, PermissionsHandler>();

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,options =>
            {
                
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtOptions:SecretKey"])),
                    RoleClaimType = "role"
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["oreo"];    
                        return Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddAuthorization();

        var app = builder.Build();


        app.UseHttpsRedirection();

        app.UseAuthentication();

        app.UseAuthorization();

        app.UseCors("AllowReact");

        OrderEndpoints.MapOrderEndpoints(app);
        UserEndpoints.MapUserEndpoints(app);
        ProductEndpoints.MapProductEndpoints(app);

        app.MapGet("/", async ([FromServices]IRepository<Product> repo) =>
        {
            var products = await repo.GetAllAsync();
            return products.Count;
        });

        app.Run();
    }
}