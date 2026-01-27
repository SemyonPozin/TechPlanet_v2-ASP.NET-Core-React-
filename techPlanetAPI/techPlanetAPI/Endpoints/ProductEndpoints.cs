using DataAccessLevel;
using DataAccessLevel.Repositories;
using Domain.Entities;
using Domain.Queries;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace techPlanetAPI.Endpoints
{
    public static class ProductEndpoints
    {
        public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder app)
        {
            var products = app.MapGroup("/Products");

            products.MapGet("", Get);
            products.MapGet("/Length", GetLength);
            products.MapGet("/Length/filters", GetLengthWithFilters);
            //products.MapGet("/{start:int}-{end:int}", GetRange);
            products.MapGet("/filters", GetRangeWithFilters);
            products.MapPost("", AddRange);

            return app;
        }

        public static async Task<IResult> Get([FromServices] IRepository<Product> repo)//HttpContext context, 
        {
            var list = await repo.GetAllAsync();
            //context.Response.Headers.ContentType = "application/json";
            return Results.Ok(list);
        }

        public static async Task<int> GetLengthWithFilters(
            //[FromQuery] string category,
            //[FromQuery] string brand,
            //[FromQuery] decimal minPrice,
            //[FromQuery] decimal maxPrice,
            [AsParameters] ProductSearchQuery query,
            [FromServices] IRepository<Product> repo)
        {
            //var list = await repo.GetAllAsync();
            //List<Product> filteredList = list.Where(p => 
            //    p.Category == category &&
            //    p.Brand == brand &&
            //    p.Price >= minPrice &&
            //    p.Price <= maxPrice
            //).ToList();

            var filteredProducts = await ((ProductsRepository)repo).GetInRange(query);


            return filteredProducts.Count;
        }
        public static async Task<int> GetLength([FromServices] IRepository<Product> repo)
        {
            var list = await repo.GetAllAsync();
            return list.Count;
        }
        public static async Task<Results<Ok, BadRequest>> Add([FromBody] Product product, [FromServices] IRepository<Product> repo)
        {
            if (await repo.AddAsync(product))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }

        public static async Task<Results<Ok, BadRequest>> AddRange(HttpContext context, [FromBody] List<Product> products, [FromServices] IRepository<Product> repo)
        {

            Console.WriteLine(context.Request.Body);
            Console.WriteLine(products[0].Price);
            if (await ((ProductsRepository)repo).AddRangeAsync(products))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }
        //public static async Task<Results<Ok<List<Product>>, NotFound>> GetRange(int start, int end, [FromServices] IRepository<Product> repo)
        //{
        //    var list = await ((ProductsRepository)repo).GetInRange(start, end);
        //    if(list.Count > 0)
        //        return TypedResults.Ok(list);
        //    else return TypedResults.NotFound();
        //}

        public static async Task<IResult> GetRangeWithFilters(
            HttpContext httpContext,
            [AsParameters] ProductSearchQuery query,
            [FromServices] Context context,
            [FromServices] IRepository<Product> repository)
        {
            var filteredProducts = await ((ProductsRepository)repository).GetInRange(query);
            httpContext.Response.Headers.Append("Content-Type", "application/json");
            return Results.Ok(filteredProducts);
        }
        //public static async Task<Results<Ok, BadRequest>> Update([FromBody] product product, [FromRoute] int id, [FromServices] IRepository<product> repo)
        //{
        //    if (await repo.UpdateAsync(id, product))
        //        return TypedResults.Ok();
        //    else return TypedResults.BadRequest();
        //}

        //public static async Task<Results<Ok, BadRequest>> Delete([FromRoute] int id, [FromServices] IRepository<product> repo)
        //{
        //    if (await repo.DeleteAsync(id))
        //        return TypedResults.Ok();
        //    else return TypedResults.BadRequest();
        //}
    }
}