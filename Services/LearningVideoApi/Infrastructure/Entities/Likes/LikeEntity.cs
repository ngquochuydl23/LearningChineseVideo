using LearningVideoApi.Infrastructure.Entities.Users;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Seedworks;

namespace LearningVideoApi.Infrastructure.Entities.Likes
{
    public class LikeEntity: Entity<long>
    {
        public long UserId { get; set; }

        public string VideoId { get; set; }

        public UserEntity User { get; set; }

        public VideoEntity Video { get; set; }

        public LikeEntity(long userId, string videoId)
        {
            UserId = userId;
            VideoId = videoId;
            CreatedAt = DateTime.Now;
        }
    }
}
