using HotChocolate;
using HealthcareApi.Models;
using HealthcareApi.Data;
using HealthcareApi.Services;

namespace HealthcareApi.GraphQL.Mutations;

[ExtendObjectType(Name = "Mutation")]
public class PatientMutations
{
    public async Task<Patient> CreatePatient(
        [Service] ApplicationDbContext dbContext,
        [Service] IAuditService auditService,
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

        dbContext.Patients.Add(patient);
        await dbContext.SaveChangesAsync();

        await auditService.LogAction("CreatePatient", patient.Id.ToString());

        return patient;
    }

    public async Task<DiagnosticResult> AddDiagnosticResult(
        [Service] ApplicationDbContext dbContext,
        [Service] IAuditService auditService,
        [Service] IOrthancService orthancService,
        Guid patientId,
        string diagnosis,
        IFile? image)
    {
        var imageUrl = image != null 
            ? await orthancService.StoreImage(await image.GetBytesAsync())
            : null;

        var diagnosticResult = new DiagnosticResult
        {
            PatientId = patientId,
            Diagnosis = diagnosis,
            ImageUrl = imageUrl,
            Date = DateTime.UtcNow
        };

        dbContext.DiagnosticResults.Add(diagnosticResult);
        await dbContext.SaveChangesAsync();

        await auditService.LogAction("AddDiagnosticResult", diagnosticResult.Id.ToString());

        return diagnosticResult;
    }
}
