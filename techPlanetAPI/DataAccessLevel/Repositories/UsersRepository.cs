using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLevel.Repositories
{
    public class UsersRepository : IRepository<User>
    {
        private readonly Context _context;
        public UsersRepository(Context context)
        {
            _context = context;
        }

        public async Task<bool> AddAsync(User entity)
        {
            try
            {
                await _context.Users.AddAsync(entity);
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
                await _context.Users.Where(o => o.Id == Id)
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

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users.AsNoTracking().ToListAsync();
        }

        public async Task<bool> UpdateAsync(int Id, User entity)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(o => o.Id == Id);
                if (user != null)
                {
                    user.Name = entity.Name;
                    user.Email = entity.Email;
                    user.PasswordHash = entity.PasswordHash;
                    user.Phone = entity.Phone;
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
