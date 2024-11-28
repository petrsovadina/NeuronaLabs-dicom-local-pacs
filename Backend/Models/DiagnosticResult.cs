using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareApi.Models;

public class DiagnosticResult
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public required Guid PatientId { get; set; }

    [Required]
    public required string Diagnosis { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime Date { get; set; } = DateTime.UtcNow;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Patient? Patient { get; set; }
}
