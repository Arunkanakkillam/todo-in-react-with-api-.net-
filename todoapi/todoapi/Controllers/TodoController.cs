using Microsoft.AspNetCore.Mvc;
using todoapi.Models;
using Microsoft.EntityFrameworkCore;
namespace todoapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> AddTodoItem(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, Todo todo)
        {
            var item = await _context.Todos.FindAsync(id);
            if (item == null) return NotFound();

            item.IsCompleted = todo.IsCompleted;
            item.Task = todo.Task;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var item = await _context.Todos.FindAsync(id);
            if (item == null) return NotFound();

            _context.Todos.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}
