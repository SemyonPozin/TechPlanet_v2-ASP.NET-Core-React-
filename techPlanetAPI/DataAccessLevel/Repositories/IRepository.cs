using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLevel.Repositories
{
    public interface IRepository<T> where T : class
    {
        public Task<List<T>> GetAllAsync();
        //public T GetById();
        public Task<bool> AddAsync(T entity);
        public Task<bool> UpdateAsync(int Id, T entity);
        public Task<bool> DeleteAsync(int Id);

    }
}
