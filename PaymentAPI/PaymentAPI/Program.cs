using Microsoft.EntityFrameworkCore;
using PaymentAPI.Models;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// ?? Add services to the container
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowPaymentApp", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
              {
                  if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
                  {
                      return false;
                  }

                  return uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase);
              })
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ?? Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ?? Database connection
builder.Services.AddDbContext<PaymentDetailContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

var app = builder.Build();

// ?? Enable Swagger (works in ALL environments)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "PaymentAPI v1");
    c.RoutePrefix = "swagger";
});

// ?? Middleware
app.UseHttpsRedirection();
app.UseCors("AllowPaymentApp");

app.UseAuthorization();

app.MapControllers();

// Auto-open Swagger UI after startup, even when launch profiles are not used.
app.Lifetime.ApplicationStarted.Register(() =>
{
    try
    {
        var httpsUrl = app.Urls.FirstOrDefault(u => u.StartsWith("https://", StringComparison.OrdinalIgnoreCase));
        var targetUrl = httpsUrl ?? app.Urls.FirstOrDefault() ?? "http://localhost:5000";
        var swaggerUrl = targetUrl.TrimEnd('/') + "/swagger";

        Process.Start(new ProcessStartInfo
        {
            FileName = swaggerUrl,
            UseShellExecute = true
        });
    }
    catch
    {
        // If browser launch fails, API should keep running.
    }
});

app.Run();