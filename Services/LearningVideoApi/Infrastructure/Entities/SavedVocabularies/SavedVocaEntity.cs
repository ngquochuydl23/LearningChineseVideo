using LearningVideoApi.Infrastructure.Entities.Users;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Entities.Vocabularies;
using LearningVideoApi.Infrastructure.Seedworks;

namespace LearningVideoApi.Infrastructure.Entities.SavedVocabularies
{
    public class SavedVocaEntity : Entity<long>
    {
        public long UserId { get; set; }

        public string VideoId { get; set; }

        public string VocabularyId { get; set; }

        public double ShowedAtDuration { get; set; }

        public VocabularyEntity Vocabulary { get; set; }

        public UserEntity User { get; set; }

        public VideoEntity Video { get; set; }

        public SavedVocaEntity() { }

        public SavedVocaEntity(long userId, string videoId, string vocabularyId, double showedAtDuration)
        {
            UserId = userId;
            VideoId = videoId;
            VocabularyId = vocabularyId;
            ShowedAtDuration = showedAtDuration;
        }
    }
}
