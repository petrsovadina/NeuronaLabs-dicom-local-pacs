using Microsoft.EntityFrameworkCore;
using HealthcareApi.Models;

namespace HealthcareApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<DiagnosticResult> DiagnosticResults => Set<DiagnosticResult>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Konfigurace pro Supabase naming conventions
        modelBuilder.HasDefaultSchema("public");

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.ToTable("patients");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.LastDiagnosis).HasColumnName("last_diagnosis");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });

        modelBuilder.Entity<DiagnosticResult>(entity =>
        {
            entity.ToTable("diagnostic_results");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.PatientId).HasColumnName("patient_id");
            entity.Property(e => e.Diagnosis).HasColumnName("diagnosis");
            entity.Property(e => e.ImageUrl).HasColumnName("image_url");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");

            entity.HasOne(d => d.Patient)
                .WithMany(p => p.DiagnosticResults)
                .HasForeignKey(d => d.PatientId);
        });
    }
}
