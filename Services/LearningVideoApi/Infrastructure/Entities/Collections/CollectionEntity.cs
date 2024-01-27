using LearningVideoApi.Infrastructure.Seedworks;

namespace LearningVideoApi.Infrastructure.Entities.Collections
{
    public class CollectionEntity: Entity<string>
    {

        public string Title { get; set; }

        public string Description { get; set; }

        public CollectionEntity(string title, string description)
        {
            Id = GenerateStringId(title);
            Title = title;
            Description = description;
        }
    }
}
