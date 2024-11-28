using HotChocolate.Types;
using HealthcareApi.Models;

namespace HealthcareApi.GraphQL.Types;

public class PatientType : ObjectType<Patient>
{
    protected override void Configure(IObjectTypeDescriptor<Patient> descriptor)
    {
        descriptor
            .Field(p => p.Id)
            .Type<NonNullType<IdType>>();

        descriptor
            .Field(p => p.Name)
            .Type<NonNullType<StringType>>();

        descriptor
            .Field(p => p.Age)
            .Type<NonNullType<IntType>>();

        descriptor
            .Field(p => p.LastDiagnosis)
            .Type<NonNullType<StringType>>();

        descriptor
            .Field(p => p.DiagnosticResults)
            .Type<NonNullType<ListType<DiagnosticResultType>>>()
            .ResolveWith<Resolvers>(r => r.GetDiagnosticResults(default!, default!));
    }

    private class Resolvers
    {
        public IQueryable<DiagnosticResult> GetDiagnosticResults(Patient patient, 
            [Service] ApplicationDbContext dbContext)
        {
            return dbContext.DiagnosticResults.Where(d => d.PatientId == patient.Id);
        }
    }
}
