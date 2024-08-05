using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using EmployeeRegisterAPI.Data;
using EmployeeRegisterAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EmployeeRegisterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public EmployeeController(EmployeeDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);  

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // POST api/Employee
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee([FromForm] Employee employee)
        {
            // Logging received data
            Console.WriteLine("Received Employee Data:");
            Console.WriteLine($"Employee Name: {employee.EmployeeName}");
            Console.WriteLine($"Occupation: {employee.Occupation}");
            Console.WriteLine($"Image Name: {employee.ImageName}");
            Console.WriteLine($"Image File: {employee.ImageFile?.FileName}");

            if (string.IsNullOrEmpty(employee.EmployeeName))
            {
                return BadRequest("Employee Name is required.");
            }
            if (string.IsNullOrEmpty(employee.Occupation))
            {
                return BadRequest("Occupation is required.");
            }
            if (employee.ImageFile == null)
            {
                return BadRequest("Image File is required.");
            }

            employee.ImageName = await SaveImage(employee.ImageFile);
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // PUT api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id,[FromForm] Employee employee)
        {
            if (id != employee.EmployeeID)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/Employee/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeID == id);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {                
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath,"Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }
    }
}