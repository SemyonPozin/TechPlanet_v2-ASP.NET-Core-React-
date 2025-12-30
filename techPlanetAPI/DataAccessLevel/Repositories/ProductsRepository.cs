using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLevel.Repositories
{
    public class ProductsRepository : IRepository<Product>
    {
        private readonly Context _context;
        public ProductsRepository(Context context)
        {
            _context = context;
        }

        public async Task<bool> AddAsync(Product entity)
        {
            try
            {
                await _context.Products.AddAsync(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<bool> DeleteAsync(int Id)
        {
            try
            {
                await _context.Products.Where(o => o.Id == Id)
                    .ExecuteDeleteAsync();
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.AsNoTracking().ToListAsync();
        }

        public async Task<bool> UpdateAsync(int Id, Product entity)
        {
            try
            {
                Product? product = await _context.Products.FirstOrDefaultAsync(o => o.Id == Id);
                if (product != null)
                {
                    product.Name = entity.Name;
                    product.Price = entity.Price;
                    product.Brand = entity.Brand;
                    product.Img = entity.Img;
                    product.IsNew = entity.IsNew;
                    product.CountToBuy = entity.CountToBuy;
                    product.Discount = entity.Discount;
                    product.Category = entity.Category;
                    product.Description = entity.Description;

                    if(entity.Charactertics != null && entity.Charactertics.Count > 0)
                        product.Charactertics = entity.Charactertics;
                }
                else throw new Exception("no such element");
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
