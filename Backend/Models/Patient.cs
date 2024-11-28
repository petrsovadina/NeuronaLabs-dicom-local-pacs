using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareApi.Models;

public class Patient
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public required string Name { get; set; }

    [Required]
    public required int Age { get; set; }

    [Required]
    public required string LastDiagnosis { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public List<DiagnosticResult> DiagnosticResults { get; set; } = new();
}
