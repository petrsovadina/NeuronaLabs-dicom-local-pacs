FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["HealthcareApi.csproj", "./"]
RUN dotnet restore "HealthcareApi.csproj"
COPY . .
RUN dotnet build "HealthcareApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HealthcareApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HealthcareApi.dll"]
