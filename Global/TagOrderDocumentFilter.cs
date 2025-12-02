using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Loki.Global
{
    public class TagOrderDocumentFilter : IDocumentFilter
    {
        private readonly List<string> _tagOrder;

        public TagOrderDocumentFilter(List<string> tagOrder)
        {
            _tagOrder = tagOrder;
        }

        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            var orderedTags = new List<OpenApiTag>();

            foreach (var tagName in _tagOrder)
            {
                //var tag = swaggerDoc.Tags.FirstOrDefault(t => t.Name == tagName);
                var tag = swaggerDoc.Tags.FirstOrDefault(t => t.Name.Equals(tagName, StringComparison.OrdinalIgnoreCase));

                if (tag != null)
                {
                    orderedTags.Add(tag);
                }

            }
            swaggerDoc.Tags = orderedTags;
        }
    }
}
