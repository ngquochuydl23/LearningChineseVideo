
using LearningVideoApi.Infrastructure.Entities.Likes;
using LearningVideoApi.Infrastructure.Entities.Users;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Seedworks;

namespace LearningVideoApi.Infrastructure.Entities.Comments
{
    public class CommentEntity : Entity<long>
    {
        public long? ParentId { get; set; }

        public string Content { get; set; }

        public string VideoId { get; set; }

        public long UserId { get; set; }

        public VideoEntity Video { get; set; }

        public UserEntity User { get; set; }

        public CommentEntity Parent { get; set; }

        public ICollection<CommentEntity> Childs { get; set; } = new List<CommentEntity>();

        public CommentEntity(string content, string videoId, long userId) : this(content, videoId, userId, null)
        {
            
        }

        public CommentEntity(string content, string videoId, long userId, long? parentId)
        {
            Content = content;
            VideoId = videoId;
            ParentId = parentId;
            UserId = userId;
        }
    }
}
