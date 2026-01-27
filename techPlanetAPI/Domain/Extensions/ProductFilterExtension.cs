using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

using Domain.Queries;

namespace Domain.Extensions
{
    public static class ProductFilterExtension
    {
        public static IQueryable<Product> Filter(this IQueryable<Product> products, ProductSearchQuery productSearchQuery)
        {
            if (productSearchQuery.Request != null)
                products = products.Where(p => p.Name.ToLower().Contains(productSearchQuery.Request.ToLower()));

            if (productSearchQuery.Brand != null)
                products = products.Where(p => p.Brand == productSearchQuery.Brand);

            if (productSearchQuery.Category != null)
                products = products.Where(p => p.Category == productSearchQuery.Category);

            if (productSearchQuery.MinPrice != null)
                products = products.Where(p => p.Price >= productSearchQuery.MinPrice);

            if (productSearchQuery.MaxPrice != null)
                products = products.Where(p => p.Price <= productSearchQuery.MaxPrice);

            if (productSearchQuery.IsNew != null && productSearchQuery.IsNew == true)
                products = products.Where(p => p.IsNew);

            if (productSearchQuery.WithDiscount != null && productSearchQuery.WithDiscount == true)
                products = products.Where(p => p.Discount > 0);

            if (productSearchQuery.PageNum != null && productSearchQuery.PageSize != null)
                products = products.Skip((int)(productSearchQuery.PageNum - 1) * (int)productSearchQuery.PageSize).Take((int)productSearchQuery.PageSize);

            return products;
        }
    }
}
