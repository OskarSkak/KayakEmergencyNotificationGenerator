using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kayakinsights.api.repositories
{
    using kayakinsights.api.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface ITodoRepository
    {
        // api/[GET]
        Task<IEnumerable<Todo>> GetAllTodos();
        // api/1/[GET]
        Task<Todo> GetTodo(long id);
        // api/[POST]
        Task Create(Todo todo);
        // api/[PUT]
        Task<bool> Update(Todo todo);
        // api/1/[DELETE]
        Task<bool> Delete(long id);
        Task<long> GetNextId();
    }
}
