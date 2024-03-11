using LearningVideoApi.Dtos.Video;
using LearningVideoApi.Dtos.Vocabulary;

namespace LearningVideoApi.Dtos.SavedVoca
{
    public class SavedVocaDto: BaseDto<string>
    {
        public DateTime ShowedAt { get; set; }

        public VideoDto Video { get; set; }

        public VocabularyDto Vocabulary { get; set; }
    }
}
