using HealthcareApi.Data;
using HealthcareApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthcareApi.GraphQL;

public class Query
{
    [UseDbContext(typeof(ApplicationDbContext))]
    [UsePaging]
    public IQueryable<Patient> GetPatients([ScopedService] ApplicationDbContext context)
    {
        return context.Patients.Include(p => p.DiagnosticResults);
    }

    [UseDbContext(typeof(ApplicationDbContext))]
    public async Task<Patient?> GetPatient(
        [ScopedService] ApplicationDbContext context,
        Guid id)
    {
        return await context.Patients
            .Include(p => p.DiagnosticResults)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
}
