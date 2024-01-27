using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Infrastructure.Entities.Comments
{
    public static class ConfigureEntity
    {
        public static void AddCommentEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CommentEntity>(entity =>
            {
                entity.ToTable("Comment");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => x.VideoId);

                entity
                    .HasOne(x => x.Video)
                    .WithMany(video => video.Comments)
                    .HasForeignKey(x => x.VideoId);

                entity
                    .HasOne(x => x.User)
                    .WithMany(user => user.Comments)
                    .HasForeignKey(x => x.UserId);

                entity
                    .HasOne(x => x.Parent)
                    .WithMany(parent => parent.Childs)
                    .HasForeignKey(x => x.ParentId);
            });
        }
    }
}
