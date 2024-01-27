namespace LearningVideoApi.Dtos
{
    public class BaseDto<IdType>
    {
        public IdType Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastUpdated { get; set; }

    }
}
