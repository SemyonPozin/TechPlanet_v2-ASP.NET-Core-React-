using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLevel.Repositories
{
    public class OrdersRepository : IRepository<Order>
    {
        private readonly Context _context;
        public OrdersRepository(Context context)
        {
            _context = context;
        }

        public async Task<bool> AddAsync(Order entity)
        {
            try
            {
                await _context.Orders.AddAsync(entity);
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
                await _context.Orders.Where(o => o.Id == Id)
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

        public async Task<List<Order>> GetAllAsync()
        {
            return await _context.Orders.AsNoTracking().ToListAsync();
        }

        public async Task<bool> UpdateAsync(int Id, Order entity)
        {
            try
            {
                Order? order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == Id);
                if (order != null)
                {
                    order.Address = entity.Address;
                    order.Price = entity.Price;
                    order.Date = entity.Date;
                    order.Delivery = entity.Delivery;
                    order.Done = entity.Done;
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