using HotChocolate.Types;
using HealthcareApi.Models;

namespace HealthcareApi.GraphQL.Types;

public class DiagnosticResultType : ObjectType<DiagnosticResult>
{
    protected override void Configure(IObjectTypeDescriptor<DiagnosticResult> descriptor)
    {
        descriptor
            .Field(d => d.Id)
            .Type<NonNullType<IdType>>();

        descriptor
            .Field(d => d.PatientId)
            .Type<NonNullType<IdType>>();

        descriptor
            .Field(d => d.Diagnosis)
            .Type<NonNullType<StringType>>();

        descriptor
            .Field(d => d.ImageUrl)
            .Type<StringType>();

        descriptor
            .Field(d => d.Date)
            .Type<NonNullType<DateTimeType>>();

        descriptor
            .Field(d => d.Patient)
            .Type<PatientType>()
            .ResolveWith<Resolvers>(r => r.GetPatient(default!, default!));
    }

    private class Resolvers
    {
        public Patient? GetPatient(DiagnosticResult diagnosticResult,
            [Service] ApplicationDbContext dbContext)
        {
            return dbContext.Patients.FirstOrDefault(p => p.Id == diagnosticResult.PatientId);
        }
    }
}
