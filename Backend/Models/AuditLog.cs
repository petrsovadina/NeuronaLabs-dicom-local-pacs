namespace HealthcareApi.Models;

public class AuditLog
{
    public Guid Id { get; set; }
    public required string Action { get; set; }
    public required string EntityId { get; set; }
    public string? UserId { get; set; }
    public string? IpAddress { get; set; }
    public DateTime Timestamp { get; set; }
}
