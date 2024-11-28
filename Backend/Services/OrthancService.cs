using RestSharp;

namespace HealthcareApi.Services;

public interface IOrthancService
{
    Task<string> StoreImage(byte[] imageData);
    Task<byte[]> GetImage(string imageId);
}

public class OrthancService : IOrthancService
{
    private readonly string _orthancUrl;
    private readonly RestClient _client;

    public OrthancService(IConfiguration configuration)
    {
        _orthancUrl = configuration["Orthanc:Url"] ?? throw new InvalidOperationException();
        _client = new RestClient(_orthancUrl);
    }

    public async Task<string> StoreImage(byte[] imageData)
    {
        var request = new RestRequest("instances", Method.Post);
        request.AddBody(imageData);

        var response = await _client.ExecuteAsync(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("Failed to store image in Orthanc");
        }

        return response.Content ?? throw new Exception("No image ID returned");
    }

    public async Task<byte[]> GetImage(string imageId)
    {
        var request = new RestRequest($"instances/{imageId}/file", Method.Get);
        var response = await _client.ExecuteAsync(request);
        
        if (!response.IsSuccessful || response.RawBytes == null)
        {
            throw new Exception("Failed to retrieve image from Orthanc");
        }

        return response.RawBytes;
    }
}
