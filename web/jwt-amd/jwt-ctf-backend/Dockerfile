FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 7106

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["jwt-ctf-backend.csproj", "."]
RUN dotnet restore "./jwt-ctf-backend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "jwt-ctf-backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "jwt-ctf-backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY Resources/Keys /app/Resources/Keys

ENTRYPOINT ["dotnet", "jwt-ctf-backend.dll"]