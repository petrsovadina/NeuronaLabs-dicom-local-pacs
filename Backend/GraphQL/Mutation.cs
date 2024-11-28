using HealthcareApi.Data;
using HealthcareApi.Models;

namespace HealthcareApi.GraphQL;

public class Mutation
{
    [UseDbContext(typeof(ApplicationDbContext))]
    public async Task<Patient> CreatePatient(
        [ScopedService] ApplicationDbContext context,
        string name,
        int age,
        string lastDiagnosis)
    {
        var patient = new Patient
        {
            Name = name,
            Age = age,
            LastDiagnosis = lastDiagnosis
        };

        context.Patients.Add(patient);
        await context.SaveChangesAsync();

        return patient;
    }

    [UseDbContext(typeof(ApplicationDbContext))]
    public async Task<DiagnosticResult> UpdateDiagnostic(
        [ScopedService] ApplicationDbContext context,
        Guid patientId,
        string diagnosis,
        string? imageUrl = null)
    {
        var result = new DiagnosticResult
        {
            PatientId = patientId,
            Diagnosis = diagnosis,
            ImageUrl = imageUrl,
            Date = DateTime.UtcNow
        };

        context.DiagnosticResults.Add(result);
        await context.SaveChangesAsync();

        return result;
    }
}
